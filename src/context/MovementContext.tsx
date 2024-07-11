import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { Department, Employee, EmployeeAttendanceTimes, Group } from "../helpers/Types";
import { fetchWithAuth } from "../components/FetchWithAuth";
import { toast } from "react-toastify";

// Define a interface para o estado de dados
interface DataState {
    departments: Department[];
    groups: Group[];
    employees: Employee[];
}

// Definindo o tipo de contexto
export interface AttendanceContextType {
    attendance: EmployeeAttendanceTimes[];
    data: DataState;
    startDate: string;
    endDate: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    fetchAllAttendances: (options?: FetchOptions) => Promise<EmployeeAttendanceTimes[]>;
    fetchAllAttendancesBetweenDates: (options?: FetchOptions) => Promise<EmployeeAttendanceTimes[]>;
    handleAddAttendance: (attendance: EmployeeAttendanceTimes) => Promise<void>;
    handleUpdateAttendance: (attendance: EmployeeAttendanceTimes) => Promise<void>;
    handleDeleteAttendance: (attendanceTimeId: string) => Promise<void>;
}

// Expandindo as opções de busca
interface FetchOptions {
    filterFunc?: (data: EmployeeAttendanceTimes[]) => EmployeeAttendanceTimes[];
    postFetch?: (data: EmployeeAttendanceTimes[]) => void;
}

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T00:00`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T23:59`;
}

// Criando o contexto
export const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

// Criando o provedor do contexto
export const AttendanceProvider = ({ children }: { children: ReactNode }) => {
    const currentDate = new Date();
    const [attendance, setAttendance] = useState<EmployeeAttendanceTimes[]>([]);
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(currentDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [data, setData] = useState<DataState>({
        departments: [],
        groups: [],
        employees: []
    });

    // Função para buscar todas as assiduidades
    const fetchAllAttendances = useCallback(async (options?: FetchOptions): Promise<EmployeeAttendanceTimes[]> => {
        try {
            const response = await fetchWithAuth('Attendances/GetAllAttendances');
            if (!response.ok) {
                return [];
            }
            let data = await response.json();
            if (options?.filterFunc) {
                data = options.filterFunc(data);
            }
            if (options?.postFetch) {
                options.postFetch(data);
            }
            return data;
        } catch (error) {
            console.error('Erro ao buscar assiduidades:', error);
            return [];
        }
    }, []);

    // Função para buscar as assiduidades entre datas
    const fetchAllAttendancesBetweenDates = useCallback(async (options?: FetchOptions): Promise<EmployeeAttendanceTimes[]> => {
        try {
            const response = await fetchWithAuth(`Attendances/GetAttendanceTimesBetweenDates?fromDate=${startDate}&toDate=${endDate}`);
            if (!response.ok) {
                return [];
            }
            let data = await response.json();
            if (options?.filterFunc) {
                data = options.filterFunc(data);
            }
            if (options?.postFetch) {
                options.postFetch(data);
            }
            return data;
        } catch (error) {
            console.error('Erro ao buscar assiduidades:', error);
            return [];
        }
    }, [startDate, endDate]);

    // Função para adicionar uma nova assiduidade
    const handleAddAttendance = async (attendances: EmployeeAttendanceTimes) => {
        try {
            const response = await fetchWithAuth('Attendances/CreatedAttendanceTime', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(attendances)
            });
            if (!response.ok) {
                return;
            }
            const newAttendance = await response.json();
            setAttendance([...attendance, newAttendance]);
            toast.success(newAttendance.value || 'assiduidade adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar nova assiduidade:', error);
        }
    };

    // Função para atualizar uma assiduidade
    const handleUpdateAttendance = async (attendances: EmployeeAttendanceTimes) => {
        try {
            const response = await fetchWithAuth(`Attendances/UpdatedAttendanceTime?attendanceTimeId=${attendances.attendanceTimeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(attendances)
            });

            if (!response.ok) {
                return;
            }
            const updatedAttendance = await response.json();
            setAttendance(prevAttendance => prevAttendance.map(att => att.attendanceID === updatedAttendance.attendanceID ? updatedAttendance : att));
            toast.success(updatedAttendance.value || 'assiduidade atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar assiduidade:', error);
        }
    };

    // Função para deletar uma assiduidade
    const handleDeleteAttendance = async (attendanceTimeId: string) => {
        try {
            const response = await fetchWithAuth(`Attendances/DeleteAttendanceTime?attendanceTimeId=${attendanceTimeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return;
            }
            const deleteAttendance = await response.json();
            toast.success(deleteAttendance.value || 'assiduidade apagada com sucesso!');
        } catch (error) {
            console.error('Erro ao apagar assiduidade:', error);
        }
    };

    // Definindo o valor do contexto
    const contextValue = {
        attendance,
        data,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        fetchAllAttendances,
        fetchAllAttendancesBetweenDates,
        handleAddAttendance,
        handleUpdateAttendance,
        handleDeleteAttendance
    };

    return (
        <AttendanceContext.Provider value={contextValue}>
            {children}
        </AttendanceContext.Provider>
    );
};

// Hook personalizado para usar o contexto
export const useAttendance = () => {
    const context = useContext(AttendanceContext);
    if (!context) throw new Error('useAttendance must be used within an AttendanceProvider');
    return context;
};