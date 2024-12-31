import { createContext, useState, useContext , ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';

import * as apiService from "../helpers/apiService";
import { AccessControl, Devices, DoorDevice, Doors, Employee, EmployeesOnDevice, KioskTransaction, MBDevice, MBDeviceCloseOpen, MBDeviceStatus, TimePeriod } from '../helpers/Types';

// Define o tipo de contexto
export interface DeviceContextType {
    devices: Devices[];
    mbDevices: MBDevice[];
    mbCloseOpen: MBDeviceCloseOpen[];
    setMbCloseOpen: (mbCloseOpen: MBDeviceCloseOpen[]) => void;
    employeeDevices: EmployeesOnDevice[];
    fetchAllDevices: () => Promise<Devices[]>;
    fetchAllEmployeeDevices: (zktecoDeviceID: Devices) => Promise<void>;
    fetchAllKioskTransaction: (zktecoDeviceID: Devices) => Promise<KioskTransaction[]>;
    fetchAllKioskTransactionOnDevice: (zktecoDeviceID: Devices) => Promise<KioskTransaction[]>;
    fetchAllDoorData: () => Promise<Doors[]>;
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
    sendClockToDevice: (serialNumber: string, timeZoneId: string) => Promise<void>;
    handleAddDevice: (device: Devices) => Promise<void>;
    handleUpdateDevice: (device: Devices) => Promise<void>;
    handleDeleteDevice: (zktecoDeviceID: string) => Promise<void>;
    handleAddMBDevice: (device: MBDevice) => Promise<void>;
    handleUpdateMBDevice: (device: MBDevice) => Promise<void>;
    handleDeleteMBDevice: (id: string) => Promise<void>;
    accessControl: AccessControl[];
    fetchAccessControl: () => Promise<void>;
    handleAddAccessControl: (newAccessControl: Partial<AccessControl>) => Promise<void>;
    handleUpdateAccessControl: (newAccessControl: Partial<AccessControl>) => Promise<void>;
    handleDeleteAccessControl: (employeesId: string[], doorId: string) => Promise<void>;
    period: TimePeriod[];
    fetchTimePeriods: () => Promise<void>;
    handleAddPeriod: (newPeriod: Partial<TimePeriod>) => Promise<void>;
    handleUpdatePeriod: (updatedPeriod: TimePeriod) => Promise<void>;
    handleDeletePeriod: (id: string) => Promise<void>;
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

    // Função para buscar todos os dispositivos
    const fetchAllDevices = async (): Promise<Devices[]> => {
        try {
            const data = await apiService.fetchAllDevices();
            setDevices(data);
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
            return doorData;
        } catch (error) {
            console.error('Erro ao buscar dados da porta:', error);
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
            toast.success(data.message || 'Dispositivo reiniciado com sucesso!');

        } catch (error) {
            console.error('Erro ao reiniciar o dispositivo:', error);
        }
    }

    // Função para enviar o horário para o dispositivo
    const sendClockToDevice = async (serialNumber: string, timeZoneId: string) => {
        try {
            const data = await apiService.sendClockToDevice(serialNumber, timeZoneId);
            toast.success(data.message || 'Hora enviada com sucesso!');

        } catch (error) {
            console.error('Erro ao enviar a hora:', error);
        }
    };

    // Define a função de adição de dispositivos
    const handleAddDevice = async (device: Devices) => {
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
    const handleUpdateDevice = async (device: Devices) => {
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
    const fetchAccessControl = async () => {
        try {
            const data = await apiService.fetchAllAccessControl();
            setAccessControl(data);
        } catch (error) {
            console.error('Erro ao buscar os dados de controle de acesso:', error);
        }
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
            setAccessControl(prevAccessControls => prevAccessControls.map(item => item.acId === data.acId ? { ...item, acc: [data.acc] } : item));
            toast.success(data.message || 'Controle de acesso atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao editar o controle de acesso:', error);
        } finally {
            fetchAccessControl();
        }
    };

    // Função para deletar o controle de acesso
    const handleDeleteAccessControl = async (employeesId: string[], doorId: string) => {
        try {
            const data = await apiService.deleteAccessControl(employeesId, doorId);
            setAccessControl(prevAccessControl => [...prevAccessControl, data]);
            toast.success(data.message || 'Controle de acesso apagado com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar o controle de acesso:', error);
        } finally {
            fetchAccessControl();
        }
    }

    // Função para buscar os dados dos períodos
    const fetchTimePeriods = async () => {
        try {
            const data = await apiService.fetchAllTimePeriods();
            setPeriod(data);
        } catch (error) {
            console.error('Erro ao buscar os dados dos períodos:', error);
        }
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
    const handleDeletePeriod = async (id: string) => {
        try {
            await apiService.deleteTimePeriod(id);
            toast.success('Período eliminado com sucesso!');
        } catch (error) {
            console.error('Erro ao eliminar o período:', error);
        } finally {
            fetchTimePeriods();
        }
    }

    // Busca todos os dispositivos ao carregar a página
    useEffect(() => {
        fetchAllDevices();
        fetchAllMBDevices();
        fetchAllMBCloseOpen();
        fetchAccessControl();
        fetchTimePeriods();
    }, []);

    // Define o valor do contexto
    const contextValue: DeviceContextType = {
        devices,
        mbDevices,
        mbCloseOpen,
        setMbCloseOpen,
        employeeDevices,
        fetchAllDevices,
        fetchAllEmployeeDevices,
        fetchAllKioskTransaction,
        fetchAllKioskTransactionOnDevice,
        fetchAllDoorData,
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
