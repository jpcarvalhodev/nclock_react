import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import * as apiService from "../api/apiService";
import { AccessControl, Activity, Alerts, AllDevices, Auxiliaries, AuxOut, Cameras, Devices, DoorDevice, Doors, EmployeesOnDevice, Events, KioskTransaction, MBDevice, MBDeviceCloseOpen, Movements, Readers, TimePeriod, TimePlan } from '../types/Types';

// Define o tipo de contexto
export interface DeviceContextType {
    devices: Devices[];
    mbDevices: MBDevice[];
    mbCloseOpen: MBDeviceCloseOpen[];
    setMbCloseOpen: (mbCloseOpen: MBDeviceCloseOpen[]) => void;
    employeeDevices: EmployeesOnDevice[];
    door: Doors[];
    aux: Auxiliaries[];
    auxData: AuxOut[];
    cameras: Cameras[];
    events: Alerts[];
    setEvents: (events: Alerts[]) => void;
    fetchAllDevices: () => Promise<AllDevices[]>;
    fetchAllEmployeeDevices: (zktecoDeviceID: Devices) => Promise<void>;
    fetchAllKioskTransaction: (zktecoDeviceID: Devices) => Promise<KioskTransaction[]>;
    fetchAllKioskTransactionOnDevice: (zktecoDeviceID: Devices) => Promise<KioskTransaction[]>;
    fetchAllDoorData: () => Promise<Doors[]>;
    fetchAllAux: () => Promise<Auxiliaries[]>;
    fetchAllAuxData: () => Promise<AuxOut[]>;
    fetchAllMBDevices: () => Promise<MBDevice[]>;
    fetchAllMBCloseOpen: () => Promise<MBDeviceCloseOpen[]>;
    sendAllEmployeesToDevice: (zktecoDeviceID: Devices, employee: string[] | null) => Promise<void>;
    saveAllEmployeesOnDeviceToDB: (zktecoDeviceID: Devices, employee?: string[] | null) => Promise<void>;
    saveAllAttendancesEmployeesOnDevice: (zktecoDeviceID: Devices) => Promise<void>;
    syncTimeManuallyToDevice: (device: Devices) => Promise<void>;
    deleteAllUsersOnDevice: (device: Devices, employee: string[] | null) => Promise<void>;
    openDeviceDoor: (deviceSN: string, doorData: DoorDevice) => Promise<void>;
    restartDevice: (device: Devices) => Promise<void>;
    restartMBDevice: (mbDevice: Partial<MBDevice>) => Promise<void>;
    sendClockToDevice: (serialNumber: string, timeZoneId?: string) => Promise<void>;
    handleAddDevice: (device: AllDevices) => Promise<void>;
    handleUpdateDevice: (device: AllDevices) => Promise<void>;
    handleDeleteDevice: (zktecoDeviceID: string) => Promise<void>;
    handleAddMBDevice: (device: MBDevice) => Promise<void>;
    handleUpdateMBDevice: (device: MBDevice) => Promise<void>;
    handleDeleteMBDevice: (id: string) => Promise<void>;
    accessControl: AccessControl[];
    fetchAccessControl: () => Promise<AccessControl[]>;
    handleAddAccessControl: (newAccessControl: Partial<AccessControl>) => Promise<void>;
    handleUpdateAccessControl: (newAccessControl: Partial<AccessControl>) => Promise<void>;
    handleDeleteAccessControl: (id: string[]) => Promise<void>;
    period: TimePeriod[];
    fetchTimePeriods: () => Promise<TimePeriod[]>;
    handleAddPeriod: (newPeriod: Partial<TimePeriod>) => Promise<void>;
    handleUpdatePeriod: (updatedPeriod: TimePeriod) => Promise<void>;
    handleDeletePeriod: (id: string[]) => Promise<void>;
    handleUpdateDoor: (door: Doors) => Promise<void>;
    handleUpdateAux: (aux: Auxiliaries) => Promise<void>;
    fetchCameras: () => Promise<Cameras[]>;
    timePlans: TimePlan[];
    fetchTimePlans: () => Promise<TimePlan[]>;
    handleAddTimePlan: (timePlan: TimePlan) => Promise<void>;
    handleUpdateTimePlan: (timePlan: TimePlan) => Promise<void>;
    handleDeleteTimePlan: (id: string[]) => Promise<void>;
    handleDeletePeriodTimePlan: (planoId: string, id: string[]) => Promise<void>;
    fetchReaders: (deviceId: string) => Promise<Readers[]>;
    handleUpdateReaders: (reader: Readers) => Promise<void>;
    fetchEventsDevice: (startDate?: string, endDate?: string) => Promise<Events[]>;
    fetchEventsAndTransactionDevice: (startDate?: string, endDate?: string) => Promise<Movements[]>;
    fetchDeviceActivities: (sn?: string[], startDate?: string, endDate?: string, pageNo?: string, pageSize?: string) => Promise<Activity[]>;
    totalMovementPages: number;
    totalMovementRows: number;
    totalEventPages: number;
}

// Cria o contexto	
export const TerminalsContext = createContext<DeviceContextType | undefined>(undefined);

// Provedor do contexto
export const TerminalsProvider = ({ children }: { children: ReactNode }) => {
    const [devices, setDevices] = useState<Devices[]>([]);
    const [mbDevices, setMBDevices] = useState<MBDevice[]>([]);
    const [mbCloseOpen, setMbCloseOpen] = useState<MBDeviceCloseOpen[]>([]);
    const [employeeDevices, setEmployeeDevices] = useState<EmployeesOnDevice[]>([]);
    const [accessControl, setAccessControl] = useState<AccessControl[]>([]);
    const [period, setPeriod] = useState<TimePeriod[]>([]);
    const [door, setDoor] = useState<Doors[]>([]);
    const [auxData, setAuxData] = useState<AuxOut[]>([]);
    const [aux, setAux] = useState<Auxiliaries[]>([]);
    const [cameras, setCameras] = useState<Cameras[]>([]);
    const [timePlans, setTimePlans] = useState<TimePlan[]>([]);
    const [events, setEvents] = useState<Alerts[]>([]);
    const [totalMovementPages, setTotalMovementPages] = useState<number>(1);
    const [totalMovementRows, setTotalMovementRows] = useState<number>(0);
    const [totalEventPages, setTotalEventPages] = useState<number>(1);

    // Função para buscar todos os dispositivos
    const fetchAllDevices = async (): Promise<AllDevices[]> => {
        try {
            const data = await apiService.fetchAllDevices();
            const dataMb = await apiService.fetchAllMBDevices();
            setDevices([...data, ...dataMb]);
            return data;
        } catch (error) {
            console.error('Erro ao buscar dispositivos:', error);
        }
        return [];
    };

    // Função para buscar todos os funcionários por dispositivos standalone
    const fetchAllEmployeeDevices = async (zktecoDeviceID: Devices) => {
        try {
            const employeesData = await apiService.fetchAllEmployeeDevices(zktecoDeviceID);
            setEmployeeDevices(employeesData);
        } catch (error) {
            console.error('Erro ao apagar dispositivos:', error);
        }
    }

    // Função para buscar todas as actividades de quiosque
    const fetchAllKioskTransaction = async (zktecoDeviceID: Devices): Promise<KioskTransaction[]> => {
        try {
            const transactionData = await apiService.fetchAllKioskTransactions(zktecoDeviceID);
            return transactionData;
        } catch (error) {
            console.error('Erro ao buscar transações:', error);
        }
        return [];
    }

    // Função para buscar todas as actividades de quiosque no dispositivo
    const fetchAllKioskTransactionOnDevice = async (zktecoDeviceID: Devices): Promise<KioskTransaction[]> => {
        try {
            const transactionData = await apiService.fetchAllKioskTransactionsOnDevice(zktecoDeviceID);
            return transactionData;
        } catch (error) {
            console.error('Erro ao buscar transações:', error);
        }
        return [];
    }

    // Função para buscar todos os dados das portas
    const fetchAllDoorData = async (): Promise<Doors[]> => {
        try {
            const doorData = await apiService.fetchAllDoors();
            setDoor(doorData)
            return doorData;
        } catch (error) {
            console.error('Erro ao buscar dados da porta:', error);
        }
        return [];
    }

    // Função para buscar todos os dados auxiliares
    const fetchAllAux = async (): Promise<Auxiliaries[]> => {
        try {
            const data = await apiService.fetchAllAux();
            setAux(data);
            return data;
        } catch (error) {
            console.error('Erro ao buscar dados auxiliares:', error);
        }
        return [];
    }

    // Função para buscar todos os dados auxiliares
    const fetchAllAuxData = async (): Promise<AuxOut[]> => {
        try {
            const data = await apiService.fetchOutAuxEnabled();
            setAuxData(data);
            return data;
        } catch (error) {
            console.error('Erro ao buscar dados auxiliares:', error);
        }
        return [];
    }

    // Função para buscar todos os dispositivos de multibanco
    const fetchAllMBDevices = async (): Promise<MBDevice[]> => {
        try {
            const data = await apiService.fetchAllMBDevices();
            setMBDevices(data);
            return data;
        } catch (error) {
            console.error('Erro ao buscar dispositivos:', error);
        }
        return [];
    }

    // Função para buscar o fecho e abertura de todos os dispositivos multibanco
    const fetchAllMBCloseOpen = async (): Promise<MBDeviceCloseOpen[]> => {
        try {
            const data = await apiService.fetchAllTPCloseOpen();
            setMbCloseOpen(data);
            return data;
        } catch (error) {
            console.error('Erro ao buscar dispositivos:', error);
        }
        return [];
    }

    // Função para enviar todos os funcionários para o dispositivo
    const sendAllEmployeesToDevice = async (zktecoDeviceID: Devices, employeeID?: string[] | null) => {
        try {
            const data = await apiService.sendAllEmployeesToDevice(zktecoDeviceID, employeeID);
            toast.success(data.message || 'Utilizadores enviados com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar os utilizadores:', error);
        }
    };

    // Função para salvar todos os funcionários no dispositivo
    const saveAllEmployeesOnDeviceToDB = async (zktecoDeviceID: Devices, employeeID?: string[] | null) => {
        try {
            const data = await apiService.saveAllEmployeesOnDeviceToDB(zktecoDeviceID, employeeID);
            toast.success(data.message || 'Utilizadores recolhidos com sucesso!');

        } catch (error) {
            console.error('Erro ao buscar utilizadores:', error);
        }
    };

    // Função para buscar todas as assiduidades no dispositivo
    const saveAllAttendancesEmployeesOnDevice = async (zktecoDeviceID: Devices) => {
        try {
            const data = await apiService.saveAllAttendancesEmployeesOnDevice(zktecoDeviceID);
            toast.success(data.message || 'Assiduidades recolhidas com sucesso!');

        } catch (error) {
            console.error('Erro ao buscar dispositivos:', error);
        }
    };

    // Função para sincronizar a hora manualmente para o dispositivo
    const syncTimeManuallyToDevice = async (zktecoDeviceID: Devices) => {
        try {
            const data = await apiService.syncTimeManuallyToDevice(zktecoDeviceID);
            toast.success(data.message || 'Hora sincronizada com sucesso!');

        } catch (error) {
            console.error('Erro ao sincronizar a hora:', error);
        }
    };

    // Função para abrir a porta via dispositivo
    const openDeviceDoor = async (deviceSN: string, doorData: DoorDevice) => {
        try {
            const data = await apiService.openDeviceDoor(deviceSN, doorData);
            toast.success(data.message || 'Porta aberta com sucesso!');

        } catch (error) {
            console.error('Erro ao abrir a porta:', error);
        }
    };

    // Função para apagar os utilizadores do dispositivo
    const deleteAllUsersOnDevice = async (zktecoDeviceID: Devices, employeeID?: string[] | null) => {
        try {
            const data = await apiService.deleteAllUsersOnDevice(zktecoDeviceID, employeeID);
            toast.success(data.message || 'Utilizadores apagados com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar os utilizadores:', error);
        }
    };

    // Função para reiniciar o dispositivo
    const restartDevice = async (zktecoDeviceID: Devices) => {
        try {
            const data = await apiService.restartDevice(zktecoDeviceID);
            toast.success(data.message || 'Dispositivo reiniciado com sucesso!');

        } catch (error) {
            console.error('Erro ao reiniciar o dispositivo:', error);
        }
    };

    // Função para reiniciar o dispositivo de multibanco
    const restartMBDevice = async (mbDevice: Partial<MBDevice>) => {
        try {
            const data = await apiService.restartMBDevice(mbDevice);
            toast.success(data.message || 'Comando enviado com sucesso!');

        } catch (error) {
            console.error('Erro ao reiniciar o dispositivo:', error);
        }
    }

    // Função para enviar o horário para o dispositivo
    const sendClockToDevice = async (serialNumber: string, timeZoneId?: string) => {
        try {
            const data = await apiService.sendClockToDevice(serialNumber, timeZoneId);
            toast.success(data.message || 'Hora enviada com sucesso!');

        } catch (error) {
            console.error('Erro ao enviar a hora:', error);
        }
    };

    // Define a função de adição de dispositivos
    const handleAddDevice = async (device: AllDevices) => {
        try {
            const deviceData = await apiService.addDevice(device);
            setDevices([...devices, deviceData]);
            toast.success(deviceData.message || 'dispositivo adicionado com sucesso!');

        } catch (error) {
            console.error('Erro ao adicionado dispositivos:', error);
        } finally {
            fetchAllDevices();
        }
    };

    // Atualiza um funcionário
    const handleUpdateDevice = async (device: AllDevices) => {
        try {
            const updatedDevice = await apiService.updateDevice(device);
            const updatedDevices = devices.map(d => d.zktecoDeviceID === updatedDevice.zktecoDeviceID ? updatedDevice : d);
            setDevices(updatedDevices);
            toast.success(updatedDevice.message || 'Atualização realizada com sucesso!');

        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
        } finally {
            fetchAllDevices();
        }
    };

    // Função para deletar um dispositivo
    const handleDeleteDevice = async (zktecoDeviceID: string) => {
        try {
            const deleteDevice = await apiService.deleteDevice(zktecoDeviceID);
            toast.success(deleteDevice.message || 'dispositivo apagado com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar dispositivos:', error);
        } finally {
            fetchAllDevices();
        }
    };

    // Função para adicionar um dispositivo de multibanco
    const handleAddMBDevice = async (device: MBDevice) => {
        try {
            const deviceData = await apiService.addMBDevice(device);
            setMBDevices([...mbDevices, deviceData]);
            toast.success(deviceData.message || 'dispositivo adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionado dispositivos:', error);
        } finally {
            fetchAllMBDevices();
        }
    }

    // Função para atualizar um dispositivo de multibanco
    const handleUpdateMBDevice = async (device: MBDevice) => {
        try {
            const updatedDevice = await apiService.updateMBDevice(device);
            const updatedDevices = mbDevices.map(d => d.id === updatedDevice.id ? updatedDevice : d);
            setMBDevices(updatedDevices);
            toast.success(updatedDevice.message || 'Atualização realizada com sucesso!');

        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
        } finally {
            fetchAllMBDevices();
        }
    }

    // Função para apagar um dispositivo de multibanco
    const handleDeleteMBDevice = async (id: string) => {
        try {
            const deleteDevice = await apiService.deleteMBDevice(id);
            toast.success(deleteDevice.message || 'dispositivo apagado com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar dispositivos:', error);
        } finally {
            fetchAllMBDevices();
        }
    }

    // Função para buscar a listagem de controle de acesso
    const fetchAccessControl = async (): Promise<AccessControl[]> => {
        try {
            const data = await apiService.fetchAllAccessControl();
            const sortedData = data.sort((a: AccessControl, b: AccessControl) => a.nome.localeCompare(b.nome));
            setAccessControl(sortedData);
            return sortedData;
        } catch (error) {
            console.error('Erro ao buscar os dados de controle de acesso:', error);
        }
        return [];
    };

    // Função para adicionar o controle de acesso
    const handleAddAccessControl = async (newAccessControl: Partial<AccessControl>) => {
        try {
            const data = await apiService.addAccessControl(newAccessControl);
            setAccessControl(prevAccessControls => [...prevAccessControls, data]);
            toast.success(data.message || 'Controle de acesso adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar o controle de acesso:', error);
        } finally {
            fetchAccessControl();
        }
    };

    // Função para editar o controle de acesso
    const handleUpdateAccessControl = async (newAccessControl: Partial<AccessControl>) => {
        try {
            const data = await apiService.updateAccessControl(newAccessControl);
            setAccessControl(prevAccessControls => [...prevAccessControls, data]);
            toast.success(data.message || 'Controle de acesso atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao editar o controle de acesso:', error);
        } finally {
            fetchAccessControl();
        }
    };

    // Função para deletar o controle de acesso
    const handleDeleteAccessControl = async (id: string[]) => {
        try {
            const data = await apiService.deleteAccessControl(id);
            setAccessControl(prevAccessControl => [...prevAccessControl, data]);
            toast.success(data.message || 'Controle de acesso apagado com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar o controle de acesso:', error);
        } finally {
            fetchAccessControl();
        }
    }

    // Função para buscar os dados dos períodos
    const fetchTimePeriods = async (): Promise<TimePeriod[]> => {
        try {
            const data = await apiService.fetchAllTimePeriods();
            setPeriod(data);
            return data;
        } catch (error) {
            console.error('Erro ao buscar os dados dos períodos:', error);
        }
        return [];
    };

    // Função para adicionar um período
    const handleAddPeriod = async (newPeriod: Partial<TimePeriod>) => {
        try {
            const data = await apiService.addTimePeriod(newPeriod);
            setPeriod([...period, data]);
            toast.success(data.value || 'Período adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar o período:', error);
        } finally {
            fetchTimePeriods();
        }
    }

    // Função para atualizar um período
    const handleUpdatePeriod = async (updatedPeriod: TimePeriod) => {
        try {
            const data = await apiService.updateTimePeriod(updatedPeriod);
            const updatedPeriods = period.map(p => p.id === data.id ? data : p);
            setPeriod(updatedPeriods);
            toast.success('Período atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar o período:', error);
        } finally {
            fetchTimePeriods();
        }
    }

    // Função para eliminar um período
    const handleDeletePeriod = async (id: string[]) => {
        try {
            await apiService.deleteTimePeriod(id);
            toast.success('Período eliminado com sucesso!');
        } catch (error) {
            console.error('Erro ao eliminar o período:', error);
        } finally {
            fetchTimePeriods();
        }
    }

    // Função para lidar com a atualização das portas
    const handleUpdateDoor = async (door: Doors) => {
        try {
            const data: Doors = await apiService.updateDoor(door);
            if (Array.isArray(data)) {
                const updatedDoors = door.map((d: Doors) => d.id === data.id ? data : d);
                setDoor(updatedDoors);
            } else {
                setDoor((prev) => prev.map((item) => (item.id === data.id ? data : item)));
            }
            toast.success(data.message || 'Porta atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar a porta:', error);
        } finally {
            fetchAllDoorData();
        }
    }

    // Função para lidar com a atualização das auxiliares
    const handleUpdateAux = async (aux: Auxiliaries) => {
        try {
            const data: Auxiliaries = await apiService.updateAllAux(aux);
            if (Array.isArray(data)) {
                const updatedAux = aux.map((d: Auxiliaries) => d.id === data.id ? data : d);
                setAux(updatedAux);
            } else {
                setAux((prev) => prev.map((item) => (item.id === data.id ? data : item)));
            }
            toast.success(data.message || 'Auxiliar atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar a porta:', error);
        } finally {
            fetchAllAux();
        }
    }

    // Função para buscar todas as câmeras
    const fetchCameras = async (): Promise<Cameras[]> => {
        try {
            const data = await apiService.fetchAllCameras();
            setCameras(data);
            return data;
        } catch (error) {
            console.error('Erro ao buscar as câmeras:', error);
        }
        return [];
    }

    // Função para buscar todos os planos de horário
    const fetchTimePlans = async (): Promise<TimePlan[]> => {
        try {
            const data = await apiService.fetchAllTimePlans();
            setTimePlans(data);
            return data;
        } catch (error) {
            console.error('Erro ao buscar os planos de tempo:', error);
        }
        return [];
    }

    // Função para adicionar um plano de horário
    const handleAddTimePlan = async (timePlan: TimePlan) => {
        try {
            const data = await apiService.createTimePlan(timePlan);
            setTimePlans([...timePlans, data]);
            toast.success(data.message || 'Plano de horário adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar o plano de tempo:', error);
        } finally {
            fetchTimePlans();
        }
    }

    // Função para atualizar um plano de horário
    const handleUpdateTimePlan = async (timePlan: TimePlan) => {
        try {
            const data = await apiService.updateTimePlan(timePlan);
            setTimePlans(prevTimePlan => [...prevTimePlan, data]);
            toast.success(data.message || 'Plano de horário atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar o plano de tempo:', error);
        } finally {
            fetchTimePlans();
        }
    }

    // Função para eliminar um plano de horário
    const handleDeleteTimePlan = async (id: string[]) => {
        try {
            const data = await apiService.deleteTimePlan(id);
            toast.success(data.message || 'Plano de horário eliminado com sucesso!');
        } catch (error) {
            console.error('Erro ao eliminar o plano de tempo:', error);
        } finally {
            fetchTimePlans();
        }
    }

    // Função para eliminar um período de tempo ao plano de horário
    const handleDeletePeriodTimePlan = async (planoId: string, id: string[]) => {
        try {
            await apiService.deletePeriodoTimePlan(planoId, id);
            toast.success('Período eliminado com sucesso!');
        } catch (error) {
            console.error('Erro ao eliminar o período:', error);
        } finally {
            fetchTimePlans();
        }
    }

    // Função para buscar todos os leitores
    const fetchReaders = async (deviceId: string): Promise<Readers[]> => {
        try {
            const data = await apiService.fetchAllReaders(deviceId);
            return data;
        } catch (error) {
            console.error('Erro ao buscar os leitores:', error);
        }
        return [];
    }

    // Função para atualizar um leitor
    const handleUpdateReaders = async (reader: Readers) => {
        try {
            const data = await apiService.updateReaders(reader);
            toast.success(data.message || 'Leitor atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar o leitor:', error);
        }
    }

    // Função para buscar todos os eventos do dispositivo
    const fetchEventsDevice = async (startDate?: string, endDate?: string, pageNo?: string, pageSize?: string): Promise<Events[]> => {
        try {
            const data = await apiService.fetchAllEventDevice(startDate, endDate, pageNo, pageSize);
            setEvents(data.data);
            setTotalEventPages(data.totalPages);
            return data.data;
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
        return [];
    }

    // Função para buscar todos os eventos e transações do dispositivo
    const fetchEventsAndTransactionDevice = async (startDate?: string, endDate?: string, pageNo?: string, pageSize?: string): Promise<Movements[]> => {
        try {
            const data = await apiService.fetchAllEventAndTransactionDevice(startDate, endDate, pageNo, pageSize);
            return data.data;
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
        return [];
    }

    // Função para buscar todas as atividades do dispositivo
    const fetchDeviceActivities = async (sn?: string[], startDate?: string, endDate?: string, pageNo?: string, pageSize?: string): Promise<Activity[]> => {
        try {
            const data = await apiService.fetchAllDeviceActivities(sn, startDate, endDate, pageNo, pageSize);
            setTotalMovementPages(data.totalPages);
            setTotalMovementRows(data.totalRows);
            return data.data;
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
        return [];
    }

    // Busca todos os dispositivos ao carregar a página
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchAllDevices();
            fetchAllMBDevices();
            fetchAllMBCloseOpen();
            fetchAccessControl();
            fetchTimePeriods();
            fetchAllDoorData();
            fetchAllAux();
            fetchAllAuxData();
            fetchTimePlans();
            fetchCameras();
            fetchEventsDevice();
            fetchEventsAndTransactionDevice();
            fetchDeviceActivities();
        }
    }, []);

    // Define o valor do contexto
    const contextValue: DeviceContextType = {
        devices,
        mbDevices,
        mbCloseOpen,
        setMbCloseOpen,
        employeeDevices,
        door,
        aux,
        auxData,
        cameras,
        events,
        setEvents,
        fetchAllDevices,
        fetchAllEmployeeDevices,
        fetchAllKioskTransaction,
        fetchAllKioskTransactionOnDevice,
        fetchAllDoorData,
        fetchAllAux,
        fetchAllAuxData,
        fetchAllMBDevices,
        fetchAllMBCloseOpen,
        sendAllEmployeesToDevice,
        saveAllEmployeesOnDeviceToDB,
        saveAllAttendancesEmployeesOnDevice,
        syncTimeManuallyToDevice,
        deleteAllUsersOnDevice,
        openDeviceDoor,
        restartDevice,
        restartMBDevice,
        sendClockToDevice,
        handleAddDevice,
        handleUpdateDevice,
        handleDeleteDevice,
        handleAddMBDevice,
        handleUpdateMBDevice,
        handleDeleteMBDevice,
        accessControl,
        fetchAccessControl,
        handleAddAccessControl,
        handleUpdateAccessControl,
        handleDeleteAccessControl,
        period,
        fetchTimePeriods,
        handleAddPeriod,
        handleUpdatePeriod,
        handleDeletePeriod,
        handleUpdateDoor,
        handleUpdateAux,
        fetchCameras,
        timePlans,
        fetchTimePlans,
        handleAddTimePlan,
        handleUpdateTimePlan,
        handleDeleteTimePlan,
        handleDeletePeriodTimePlan,
        fetchReaders,
        handleUpdateReaders,
        fetchEventsDevice,
        fetchEventsAndTransactionDevice,
        fetchDeviceActivities,
        totalMovementPages,
        totalMovementRows,
        totalEventPages
    };

    return (
        <TerminalsContext.Provider value={contextValue}>
            {children}
        </TerminalsContext.Provider>
    );
};

// Hook personalizado para uso fácil do contexto
export const useTerminals = () => {
    const context = useContext(TerminalsContext);
    if (context === undefined) {
        throw new Error('useTerminals must be used within a TerminalsProvider');
    }
    return context;
}
