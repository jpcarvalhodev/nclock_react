import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { EmployeeAttendanceTimes } from "../helpers/Types";
import { fetchWithAuth } from "../components/FetchWithAuth";
import { toast } from "react-toastify";

// Definindo o tipo de contexto
export interface AttendanceContextType {
    attendance: EmployeeAttendanceTimes[];
    fetchAllAttendances: (options?: FetchOptions) => Promise<void>;
    fetchAllAttendancesBetweenDates: () => Promise<void>;
    handleAddAttendance: (attendance: EmployeeAttendanceTimes) => Promise<void>;
    handleUpdateAttendance: (attendance: EmployeeAttendanceTimes) => Promise<void>;
    handleDeleteAttendance: (attendanceTimeId: string) => Promise<void>;
}

// Definindo as opções de busca
interface FetchOptions {
    filterFunc?: (data: EmployeeAttendanceTimes[]) => EmployeeAttendanceTimes[];
    additionalFilters?: (data: EmployeeAttendanceTimes[]) => EmployeeAttendanceTimes[];
}

// Criando o contexto
export const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

// Criando o provedor do contexto
export const AttendanceProvider = ({ children }: { children: ReactNode }) => {
    const [attendance, setAttendance] = useState<EmployeeAttendanceTimes[]>([]);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    // Função para buscar todos as assiduidades
    const fetchAllAttendances = useCallback(async (options?: FetchOptions) => {
        try {
            const response = await fetchWithAuth('Attendances/GetAllAttendances');
            if (!response.ok) {
                throw new Error('Failed to fetch attendances');
            }
            let data = await response.json();
            if (options?.filterFunc) {
                data = options.filterFunc(data);
            }
            if (options?.additionalFilters) {
                data = options.additionalFilters(data);
            }
            setAttendance(data);
        } catch (error) {
            console.error('Erro ao buscar assiduidades:', error);
            toast.error(`Erro ao buscar assiduidades: ${error}`);
        }
    }, []);        

    // Função para buscar as assiduidades entre datas
    const fetchAllAttendancesBetweenDates = async () => {
        try {
            const response = await fetchWithAuth(`Attendances/GetAttendanceTimesBetweenDates?fromDate=${startDate}&toDate=${endDate}`);
            if (!response.ok) {
                return;
            }
        } catch (error) {
            console.error('Erro ao buscar assiduidades:', error);
        }
    };

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

    const contextValue = {
        attendance,
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

export const useAttendance = () => {
    const context = useContext(AttendanceContext);
    if (!context) throw new Error('useAttendance must be used within an AttendanceProvider');
    return context;
};