import { createContext, useState, useContext } from 'react';
import { ReactNode } from 'react';
import { Devices, Employee, EmployeeDevices } from '../helpers/Types';
import { toast } from 'react-toastify';
import * as apiService from "../helpers/apiService";

// Define o tipo de contexto
export interface DeviceContextType {
    devices: Devices[];
    employeeDevices: Employee[];
    deviceStatus: string[];
    deviceStatusCount: StatusCounts;
    fetchAllDevices: () => Promise<void>;
    fetchAllEmployeesOnDevice: (zktecoDeviceID: Devices) => Promise<void>;
    fetchAllEmployeeDevices: () => Promise<void>;
    sendAllEmployeesToDevice: (zktecoDeviceID: Devices, employee: string | null) => Promise<void>;
    saveAllEmployeesOnDeviceToDB: (zktecoDeviceID: Devices, employee: string | null) => Promise<void>;
    saveAllAttendancesEmployeesOnDevice: (zktecoDeviceID: Devices) => Promise<void>;
    syncTimeManuallyToDevice: (device: Devices) => Promise<void>;
    deleteAllUsersOnDevice: (device: Devices, employee: string | null) => Promise<void>;
    openDeviceDoor: (device: Devices) => Promise<void>;
    restartDevice: (device: Devices) => Promise<void>;
    handleAddDevice: (device: Devices) => Promise<void>;
    handleUpdateDevice: (device: Devices) => Promise<void>;
    handleDeleteDevice: (zktecoDeviceID: string) => Promise<void>;
}

// Define a interface para o status
interface StatusCounts {
    Activo: number;
    Inactivo: number;
}

// Cria o contexto	
export const TerminalsContext = createContext<DeviceContextType | undefined>(undefined);

// Provedor do contexto
export const TerminalsProvider = ({ children }: { children: ReactNode }) => {
    const [devices, setDevices] = useState<Devices[]>([]);
    const [employeeDevices, setEmployeeDevices] = useState<Employee[]>([]);
    const [deviceStatus, setDeviceStatus] = useState<string[]>([]);
    const [deviceStatusCount, setDeviceStatusCount] = useState<StatusCounts>({ Activo: 0, Inactivo: 0 });

    // Função para contar o status
    const countStatus = (statusArray: string[]): StatusCounts => {
        const counts: StatusCounts = { Activo: 0, Inactivo: 0 };
        statusArray.forEach(status => {
            if (status in counts) {
                counts[status as keyof StatusCounts]++;
            }
        });
        return counts;
    };

    // Função para buscar todos os dispositivos
    const fetchAllDevices = async () => {
        try {
            const data = await apiService.fetchAllDevices();
            setDevices(data);

            const filteredStatus = data.map((device: Devices) => device.status ? 'Activo' : 'Inactivo');
            setDeviceStatus(filteredStatus);
            const statusCounts = countStatus(filteredStatus);
            setDeviceStatusCount(statusCounts);

        } catch (error) {
            console.error('Erro ao buscar dispositivos:', error);
        }
    };

    // Função para buscar todos os funcionários no dispositivo e salvar no DB
    const fetchAllEmployeesOnDevice = async (zktecoDeviceID: Devices) => {
        try {
            const data = await apiService.fetchAllEmployeesOnDevice(zktecoDeviceID);
            toast.success(data.value || 'Funcionários recolhidos com sucesso!');

        } catch (error) {
            console.error('Erro ao buscar dispositivos:', error);
        }
    };

    // Função para buscar todos os funcionários por dispositivos
    const fetchAllEmployeeDevices = async () => {
        try {
            const employeesData = await apiService.fetchAllEmployeeDevices();
            setEmployeeDevices(employeesData);
        } catch (error) {
            console.error('Erro ao apagar dispositivos:', error);
        }
    }

    // Função para enviar todos os funcionários para o dispositivo
    const sendAllEmployeesToDevice = async (zktecoDeviceID: Devices, employeeID?: string | null) => {
        try {
            const data = await apiService.sendAllEmployeesToDevice(zktecoDeviceID, employeeID);
            toast.success(data.value || 'Utilizadores apagados com sucesso!');

        } catch (error) {
            console.error('Erro ao enviar os utilizadores:', error);
            toast.error('Erro ao conectar ao servidor');
        }
    };

    // Função para salvar todos os funcionários no dispositivo
    const saveAllEmployeesOnDeviceToDB = async (zktecoDeviceID: Devices, employeeID?: string | null) => {
        try {
            const data = await apiService.saveAllEmployeesOnDeviceToDB(zktecoDeviceID, employeeID);
            toast.success(data.value || 'Utilizadores recolhidos com sucesso!');

        } catch (error) {
            console.error('Erro ao buscar utilizadores:', error);
        }
    };

    // Função para buscar todas as assiduidades no dispositivo
    const saveAllAttendancesEmployeesOnDevice = async (zktecoDeviceID: Devices) => {
        try {
            const data = await apiService.saveAllAttendancesEmployeesOnDevice(zktecoDeviceID);
            toast.success(data.value || 'Assiduidades recolhidas com sucesso!');

        } catch (error) {
            console.error('Erro ao buscar dispositivos:', error);
        }
    };

    // Função para sincronizar a hora manualmente para o dispositivo
    const syncTimeManuallyToDevice = async (zktecoDeviceID: Devices) => {
        try {
            const data = await apiService.syncTimeManuallyToDevice(zktecoDeviceID);
            toast.success(data.value || 'Hora sincronizada com sucesso!');

        } catch (error) {
            console.error('Erro ao sincronizar a hora:', error);
            toast.error('Erro ao conectar ao servidor');
        }
    };

    // Função para abrir a porta via dispositivo
    const openDeviceDoor = async (zktecoDeviceID: Devices) => {
        try {
            const data = await apiService.openDeviceDoor(zktecoDeviceID);
            toast.success(data.value || 'Porta aberta com sucesso!');

        } catch (error) {
            console.error('Erro ao abrir a porta:', error);
            toast.error('Erro ao conectar ao servidor');
        }
    };

    // Função para apagar os utilizadores do dispositivo
    const deleteAllUsersOnDevice = async (zktecoDeviceID: Devices, employeeID?: string | null) => {
        try {
            const data = await apiService.deleteAllUsersOnDevice(zktecoDeviceID, employeeID);
            toast.success(data.value || 'Utilizadores apagados com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar os utilizadores:', error);
            toast.error('Erro ao conectar ao servidor');
        }
    };

    // Função para reiniciar o dispositivo
    const restartDevice = async (zktecoDeviceID: Devices) => {
        try {
            const data = await apiService.restartDevice(zktecoDeviceID);
            toast.success(data.value || 'Dispositivo reiniciado com sucesso!');

        } catch (error) {
            console.error('Erro ao reiniciar o dispositivo:', error);
            toast.error('Erro ao conectar ao servidor');
        }
    };

    // Define a função de adição de dispositivos
    const handleAddDevice = async (device: Devices) => {
        try {
            const deviceData = await apiService.addDevice(device);
            setDevices([...devices, deviceData]);
            toast.success(deviceData.value || 'dispositivo apagado com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar dispositivos:', error);
        }
    };

    // Atualiza um funcionário
    const handleUpdateDevice = async (device: Devices) => {
        try {
            const updatedDevice = await apiService.updateDevice(device);
            const updatedDevices = devices.map(d => d.zktecoDeviceID === updatedDevice.zktecoDeviceID ? updatedDevice : d);
            setDevices(updatedDevices);
            toast.success(updatedDevice.value || 'Atualização realizada com sucesso!');

        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
            toast.error('Erro ao conectar ao servidor');
        }
    };

    // Função para deletar um dispositivo
    const handleDeleteDevice = async (zktecoDeviceID: string) => {
        try {
            const deleteDevice = await apiService.deleteDevice(zktecoDeviceID);
            toast.success(deleteDevice.value || 'dispositivo apagado com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar dispositivos:', error);
        }
    };

    // Define o valor do contexto
    const contextValue: DeviceContextType = {
        devices,
        employeeDevices,
        deviceStatus,
        deviceStatusCount,
        fetchAllDevices,
        fetchAllEmployeesOnDevice,
        fetchAllEmployeeDevices,
        sendAllEmployeesToDevice,
        saveAllEmployeesOnDeviceToDB,
        saveAllAttendancesEmployeesOnDevice,
        syncTimeManuallyToDevice,
        deleteAllUsersOnDevice,
        openDeviceDoor,
        restartDevice,
        handleAddDevice,
        handleUpdateDevice,
        handleDeleteDevice,
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
