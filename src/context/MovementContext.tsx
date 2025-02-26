import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

import * as apiService from "../api/apiService";
import { Accesses, EmployeeAttendanceTimes } from "../types/Types";

// Definindo o tipo de contexto
export interface AttendanceContextType {
  attendance: EmployeeAttendanceTimes[];
  access: Accesses[];
  accessForGraph: Accesses[];
  totalPages: number;
  setTotalPages: (totalPages: number) => void;
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  fetchAllAttendances: (
    options?: FetchOptions
  ) => Promise<EmployeeAttendanceTimes[]>;
  fetchAllAttendancesBetweenDates: (
    options?: FetchOptions
  ) => Promise<EmployeeAttendanceTimes[]>;
  fetchAllInitialAccessesbyDevice: (pageNo?: "1", pageSize?: "20") => Promise<Accesses[]>;
  fetchAllAccessesbyDevice: (sn?: string, pageNo?: string, pageSize?: string) => Promise<Accesses[]>;
  fetchAllAccessesbyDoor: (
    eventDoorId: number,
    deviceSN: string
  ) => Promise<Accesses[]>;
  handleAddAccess: (access: Accesses) => Promise<void>;
  handleAddAttendance: (attendance: EmployeeAttendanceTimes) => Promise<void>;
  handleAddImportedAttendance: (
    attendance: Partial<EmployeeAttendanceTimes>[]
  ) => Promise<void>;
  handleUpdateAttendance: (
    attendance: EmployeeAttendanceTimes
  ) => Promise<void>;
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
};

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T23:59`;
};

// Criando o contexto
export const AttendanceContext = createContext<
  AttendanceContextType | undefined
>(undefined);

// Criando o provedor do contexto
export const AttendanceProvider = ({ children }: { children: ReactNode }) => {
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);
  const [attendance, setAttendance] = useState<EmployeeAttendanceTimes[]>([]);
  const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
  const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
  const [access, setAccess] = useState<Accesses[]>([]);
  const [accessForGraph, setAccessForGraph] = useState<Accesses[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Função para buscar todas as assiduidades
  const fetchAllAttendances = useCallback(
    async (options?: FetchOptions): Promise<EmployeeAttendanceTimes[]> => {
      try {
        let data = await apiService.fetchAllAttendances();
        if (options?.filterFunc) {
          data = options.filterFunc(data);
        }
        if (options?.postFetch) {
          options.postFetch(data);
        }
        setAttendance(data);
        setStartDate(formatDateToStartOfDay(pastDate));
        setEndDate(formatDateToEndOfDay(currentDate));
        return data;
      } catch (error) {
        console.error("Erro ao buscar assiduidades:", error);
        return [];
      }
    },
    []
  );

  // Função para buscar as assiduidades entre datas
  const fetchAllAttendancesBetweenDates = useCallback(
    async (options?: FetchOptions): Promise<EmployeeAttendanceTimes[]> => {
      try {
        let data = await apiService.fetchAllAttendancesBetweenDates(
          startDate,
          endDate
        );
        if (options?.filterFunc) {
          data = options.filterFunc(data);
        }
        if (options?.postFetch) {
          options.postFetch(data);
        }
        return data;
      } catch (error) {
        console.error("Erro ao buscar assiduidades:", error);
        return [];
      }
    },
    [startDate, endDate]
  );

  // Função para buscar todos os acessos por dispositivo
  const fetchAllInitialAccessesbyDevice = async (pageNo?: "1", pageSize?: "20"): Promise<Accesses[]> => {
    try {
      const data = await apiService.fetchAllAccessesByDevice(pageNo, pageSize);
      setAccess(data.data);
      setTotalPages(data.totalPages);
      return data.data;
    } catch (error) {
      console.error("Erro ao buscar acessos:", error);
    }
    return [];
  };

  // Função para buscar todos os acessos por dispositivo
  const fetchAllAccessesbyDevice = async (sn?: string, pageNo?: string, pageSize?: string): Promise<Accesses[]> => {
    try {
      const data = await apiService.fetchAllAccessesByDevice(sn, pageNo, pageSize);
      setAccessForGraph(data.data);
      return data.data;
    } catch (error) {
      console.error("Erro ao buscar acessos:", error);
    }
    return [];
  };

  // Função para buscar todos os acessos
  const fetchAllAccessesbyDoor = async (
    eventDoorId: number,
    deviceSN: string
  ): Promise<Accesses[]> => {
    try {
      const data = await apiService.fetchAllAccessesByDoor(
        eventDoorId,
        deviceSN
      );
      setAccess(data);
      return data;
    } catch (error) {
      console.error("Erro ao buscar acessos:", error);
    }
    return [];
  };

  // Função para adicionar um novo acesso
  const handleAddAccess = async (accesses: Accesses) => {
    try {
      const newAccess = await apiService.addAccessTransaction(accesses);
      setAccess([...access, newAccess]);
      toast.success(newAccess.message || "acesso adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar novo acesso:", error);
    } finally {
      fetchAllAccessesbyDevice();
    }
  };

  // Função para adicionar uma nova assiduidade
  const handleAddAttendance = async (attendances: EmployeeAttendanceTimes) => {
    try {
      const newAttendance = await apiService.addAttendance(attendances);
      setAttendance([...attendance, newAttendance]);
      toast.success(
        newAttendance.value || "assiduidade adicionada com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao adicionar nova assiduidade:", error);
    } finally {
      fetchAllAttendances();
    }
  };

  // Função para adicionar assiduidades importadas
  const handleAddImportedAttendance = async (
    attendances: Partial<EmployeeAttendanceTimes>[]
  ) => {
    try {
      const newAttendance = await apiService.addImportedAttendance(attendances);
      setAttendance([...attendance, newAttendance]);
      toast.success(
        newAttendance.value || "assiduidades adicionadas com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao adicionar nova assiduidade:", error);
    }
  };

  // Função para atualizar uma assiduidade
  const handleUpdateAttendance = async (
    attendances: EmployeeAttendanceTimes
  ) => {
    try {
      const updatedAttendance = await apiService.updateAttendance(attendances);
      setAttendance((prevAttendance) =>
        prevAttendance.map((att) =>
          att.attendanceID === updatedAttendance.attendanceID
            ? updatedAttendance
            : att
        )
      );
      toast.success(
        updatedAttendance.value || "assiduidade atualizada com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao atualizar assiduidade:", error);
    } finally {
      fetchAllAttendances();
    }
  };

  // Função para deletar uma assiduidade
  const handleDeleteAttendance = async (attendanceTimeId: string) => {
    try {
      const deleteAttendance = await apiService.deleteAttendance(
        attendanceTimeId
      );
      toast.success(
        deleteAttendance.value || "assiduidade apagada com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao apagar assiduidade:", error);
    } finally {
      fetchAllAttendances();
    }
  };

  // Busca todas as assiduidades ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchAllAttendances();
      fetchAllAccessesbyDevice();
    }
  }, []);

  // Definindo o valor do contexto
  const contextValue = {
    attendance,
    access,
    accessForGraph,
    totalPages,
    setTotalPages,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    fetchAllAttendances,
    fetchAllAttendancesBetweenDates,
    fetchAllInitialAccessesbyDevice,
    fetchAllAccessesbyDevice,
    fetchAllAccessesbyDoor,
    handleAddAccess,
    handleAddAttendance,
    handleAddImportedAttendance,
    handleUpdateAttendance,
    handleDeleteAttendance,
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
  if (!context)
    throw new Error("useAttendance must be used within an AttendanceProvider");
  return context;
};
