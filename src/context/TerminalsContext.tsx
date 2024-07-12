import { createContext, useState, useContext } from 'react';
import { ReactNode } from 'react';
import { fetchWithAuth } from '../components/FetchWithAuth';
import { Devices, EmployeeDevices } from '../helpers/Types';
import { toast } from 'react-toastify';

// Define o tipo de contexto
export interface DeviceContextType {
    devices: Devices[];
    employeeDevices: EmployeeDevices[];
    employeesBio: EmployeeDevices[];
    employeesCard: EmployeeDevices[];
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

// Define a interface para os dados do corpo da requisição deleteAllUsersOnDevice 
interface BodyData {
    zktecoDeviceID: Devices;
    employeeID?: string;
}

// Cria o contexto	
export const TerminalsContext = createContext<DeviceContextType | undefined>(undefined);

// Provedor do contexto
export const TerminalsProvider = ({ children }: { children: ReactNode }) => {
    const [devices, setDevices] = useState<Devices[]>([]);
    const [employeeDevices, setEmployeeDevices] = useState<EmployeeDevices[]>([]);
    const [employeesBio, setEmployeesBio] = useState<EmployeeDevices[]>([]);
    const [employeesCard, setEmployeesCard] = useState<EmployeeDevices[]>([]);
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
            const response = await fetchWithAuth('Zkteco/GetAllDevices');
            if (!response.ok) {
                return;
            }
            const data = await response.json();
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
            const response = await fetchWithAuth(`Zkteco/SaveAllEmployeesOnDeviceToDB/${zktecoDeviceID}`);

            if (!response.ok) {
                return;
            }
            const data = await response.json();
            toast.success(data.value || 'Funcionários recolhidos com sucesso!');

        } catch (error) {
            console.error('Erro ao buscar dispositivos:', error);
        }
    };

    // Função para buscar todos os funcionários por dispositivos
    const fetchAllEmployeeDevices = async () => {
        try {
            const response = await fetchWithAuth('Employees/GetAllEmployeesDevice');
            if (!response.ok) {
                return;
            }
            const employeesData = await response.json();
            setEmployeeDevices(employeesData);

            const filteredEmployees = employeesData.filter((employee: EmployeeDevices) =>
                employee.statusFprint === true || employee.statusFace === true
            );
            setEmployeesBio(filteredEmployees);

            const filteredCardEmployees = employeesData.filter((employee: EmployeeDevices) =>
                employee.cardNumber !== "0"
            );
            setEmployeesCard(filteredCardEmployees)
        } catch (error) {
            console.error('Erro ao apagar dispositivos:', error);
        }
    }

    // Função para enviar todos os funcionários para o dispositivo
    const sendAllEmployeesToDevice = async (zktecoDeviceID: Devices, employeeID?: string | null) => {
        try {
            let url = `Zkteco/SendEmployeesToDevice/${zktecoDeviceID}`;
            if (employeeID !== null) {
                url += `?employeeIds=${employeeID}`;
            }

            let bodyData: BodyData = { zktecoDeviceID };
            if (employeeID) {
                bodyData.employeeID = employeeID;
            }

            const response = await fetchWithAuth(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData)
            });

            if (!response.ok) {
                toast.error('Falha ao enviar os utilizadores');
                return;
            }

            /* const data = await response.json();
            toast.success(data.value || 'Utilizadores apagados com sucesso!'); */
            toast.success('Utilizadores enviados com sucesso!');

        } catch (error) {
            console.error('Erro ao enviar os utilizadores:', error);
            toast.error('Erro ao conectar ao servidor');
        }
    };

    // Função para salvar todos os funcionários no dispositivo
    const saveAllEmployeesOnDeviceToDB = async (zktecoDeviceID: Devices, employeeID?: string | null) => {
        try {
            let url = `Zkteco/SaveAllEmployeesOnDeviceToDB/${zktecoDeviceID}`;
            if (employeeID !== null) {
                url += `?employeeIds=${employeeID}`;
            }

            let bodyData: BodyData = { zktecoDeviceID };
            if (employeeID) {
                bodyData.employeeID = employeeID;
            }

            const response = await fetchWithAuth(url);

            if (!response.ok) {
                return;
            }
            const data = await response.json();
            toast.success(data.value || 'Utilizadores recolhidos com sucesso!');

        } catch (error) {
            console.error('Erro ao buscar utilizadores:', error);
        }
    };

    // Função para buscar todas as assiduidades no dispositivo
    const saveAllAttendancesEmployeesOnDevice = async (zktecoDeviceID: Devices) => {
        try {
            const response = await fetchWithAuth(`Zkteco/SaveAllAttendancesEmployeesOnDeviceToDB/${zktecoDeviceID}`);

            if (!response.ok) {
                return;
            }
            const data = await response.json();
            toast.success(data.value || 'Assiduidades recolhidas com sucesso!');

        } catch (error) {
            console.error('Erro ao buscar dispositivos:', error);
        }
    };

    // Função para sincronizar a hora manualmente para o dispositivo
    const syncTimeManuallyToDevice = async (zktecoDeviceID: Devices) => {
        try {
            const response = await fetchWithAuth(`Zkteco/SyncTimeToDevice?deviceId=${zktecoDeviceID}`);

            if (!response.ok) {
                toast.error('Falha ao sincronizar a hora');
                return;
            }

            const data = await response.json();
            toast.success(data.value || 'Hora sincronizada com sucesso!');

        } catch (error) {
            console.error('Erro ao sincronizar a hora:', error);
            toast.error('Erro ao conectar ao servidor');
        }
    };

    // Função para abrir a porta via dispositivo
    const openDeviceDoor = async (zktecoDeviceID: Devices) => {
        try {
            const response = await fetchWithAuth(`Zkteco/OpenDeviceDoor/${zktecoDeviceID}delay=5`);

            if (!response.ok) {
                toast.error('Falha ao abrir a porta');
                return;
            }

            const data = await response.json();
            toast.success(data.value || 'Porta aberta com sucesso!');

        } catch (error) {
            console.error('Erro ao abrir a porta:', error);
            toast.error('Erro ao conectar ao servidor');
        }
    };

    // Função para apagar os utilizadores do dispositivo
    const deleteAllUsersOnDevice = async (zktecoDeviceID: Devices, employeeID?: string | null) => {
        try {
            let url = `Zkteco/DeleteEmployeesToDevice/${zktecoDeviceID}`;
            if (employeeID !== null) {
                url += `?employeeIds=${employeeID}`;
            }

            let bodyData: BodyData = { zktecoDeviceID };
            if (employeeID) {
                bodyData.employeeID = employeeID;
            }

            const response = await fetchWithAuth(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData)
            });

            if (!response.ok) {
                toast.error('Falha ao apagar os utilizadores');
                return;
            }

            /* const data = await response.json();
            toast.success(data.value || 'Utilizadores apagados com sucesso!'); */
            toast.success('Utilizadores apagados com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar os utilizadores:', error);
            toast.error('Erro ao conectar ao servidor');
        }
    };

    // Função para reiniciar o dispositivo
    const restartDevice = async (zktecoDeviceID: Devices) => {
        try {
            const response = await fetchWithAuth(`Zkteco/RestartDevice/${zktecoDeviceID}`);

            if (!response.ok) {
                toast.error('Falha ao reiniciar o dispositivo');
                return;
            }

            const data = await response.json();
            toast.success(data.value || 'Dispositivo reiniciado com sucesso!');

        } catch (error) {
            console.error('Erro ao reiniciar o dispositivo:', error);
            toast.error('Erro ao conectar ao servidor');
        }
    };

    // Define a função de adição de dispositivos
    const handleAddDevice = async (device: Devices) => {
        try {
            const response = await fetchWithAuth('Zkteco/CreateDevice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(device)
            });

            if (!response.ok) {
                return;
            }
            const deviceData = await response.json();
            setDevices([...devices, deviceData]);
            toast.success(deviceData.value || 'dispositivo apagado com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar dispositivos:', error);
        }
    };

    // Atualiza um funcionário
    const handleUpdateDevice = async (device: Devices) => {
        try {
            const response = await fetchWithAuth(`Zkteco/UpdateDevice/${device.zktecoDeviceID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(device)
            });

            if (!response.ok) {
                return;
            }

            const contentType = response.headers.get('Content-Type');
            (contentType && contentType.includes('application/json'))
            const updatedDevice = await response.json();
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
            const response = await fetchWithAuth(`Zkteco/DeleteDevice?deviceId=${zktecoDeviceID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return;
            }
            const deleteDevice = await response.json();
            toast.success(deleteDevice.value || 'dispositivo apagado com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar dispositivos:', error);
        }
    };

    // Define o valor do contexto
    const contextValue: DeviceContextType = {
        devices,
        employeeDevices,
        employeesBio,
        employeesCard,
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
