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
import {
  Accesses,
  AttendanceResults,
  AttendanceTime,
  EmployeeAttendanceTimes,
} from "../types/Types";

// Definindo o tipo de contexto
export interface AttendanceContextType {
  attendance: EmployeeAttendanceTimes[];
  setAttendance: (attendance: EmployeeAttendanceTimes[]) => void;
  access: Accesses[];
  accessForGraph: Accesses[];
  totalPages: number;
  totalRecords: number;
  attendanceNoPagination: EmployeeAttendanceTimes[];
  fetchAllAttendancesNoPagination: (
    type?: number,
    pageNo?: string,
    pageSize?: string,
    enrollNumbers?: string[],
    startDate?: string,
    endDate?: string
  ) => Promise<EmployeeAttendanceTimes[]>;
  fetchAllAttendances: (
    type?: number,
    pageNo?: "1",
    pageSize?: "20",
    enrollNumbers?: string[],
    startDate?: string,
    endDate?: string
  ) => Promise<EmployeeAttendanceTimes[]>;
  fetchAllInitialAccessesbyDevice: (
    sn?: string[],
    startDate?: string,
    endDate?: string,
    pageNo?: "1",
    pageSize?: "20"
  ) => Promise<Accesses[]>;
  fetchAllAccessesbyDevice: (
    sn?: string[],
    startDate?: string,
    endDate?: string,
    pageNo?: string,
    pageSize?: string
  ) => Promise<Accesses[]>;
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
  fetchDailyTransactions: (
    startDate?: string,
    endDate?: string,
    enrollNumbers?: string[],
    pageNo?: string,
    pageSize?: string
  ) => Promise<AttendanceResults[]>;
  handleProcessResults: (startDate: string, endDate: string) => Promise<void>;
  attendanceResults: AttendanceResults[];
  setAttendanceResults: (attendanceResults: AttendanceResults[]) => void;
  fetchDailyTransactionsNoPagination: (
    startDate?: string,
    endDate?: string,
    enrollNumbers?: string[],
    pageNo?: string,
    pageSize?: string
  ) => Promise<AttendanceResults[]>;
  attendanceResultsNoPagination: AttendanceResults[];
  setAttendanceResultsNoPagination: (
    attendanceResults: AttendanceResults[]
  ) => void;
  resultsTotalPages: number;
  resultsTotalRecords: number;
  attendanceTotalPages: number;
  attendanceTotalRecords: number;
  attendanceTimes: AttendanceTime[];
}

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
  const [access, setAccess] = useState<Accesses[]>([]);
  const [accessForGraph, setAccessForGraph] = useState<Accesses[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [attendanceResults, setAttendanceResults] = useState<
    AttendanceResults[]
  >([]);
  const [attendanceResultsNoPagination, setAttendanceResultsNoPagination] =
    useState<AttendanceResults[]>([]);
  const [resultsTotalPages, setResultsTotalPages] = useState<number>(1);
  const [resultsTotalRecords, setResultsTotalRecords] = useState<number>(0);
  const [attendanceTotalPages, setAttendancesTotalPages] = useState<number>(1);
  const [attendanceTotalRecords, setAttendancesTotalRecords] =
    useState<number>(0);
  const [attendanceNoPagination, setAttendanceNoPagination] = useState<
    EmployeeAttendanceTimes[]
  >([]);
  const [attendanceTimes, setAttendanceTimes] = useState<AttendanceTime[]>([]);

  // Função para buscar todas as assiduidades sem paginação
  const fetchAllAttendancesNoPagination = async (
    type?: number,
    pageNo?: string,
    pageSize?: string,
    enrollNumbers?: string[],
    startDate?: string,
    endDate?: string
  ): Promise<EmployeeAttendanceTimes[]> => {
    try {
      const data = await apiService.fetchAllAttendances(
        undefined,
        undefined,
        undefined,
        undefined,
        pageNo,
        pageSize
      );
      setAttendanceNoPagination(data.data);
      return data.data;
    } catch (error) {
      console.error("Erro ao buscar assiduidades:", error);
    }
    return [];
  };

  // Função para buscar todas as assiduidades
  const fetchAllAttendances = async (
    type?: number,
    pageNo?: "1",
    pageSize?: "20",
    enrollNumbers?: string[],
    startDate?: string,
    endDate?: string
  ): Promise<EmployeeAttendanceTimes[]> => {
    try {
      const data = await apiService.fetchAllAttendances(
        undefined,
        pageNo,
        pageSize,
        undefined,
        undefined,
        undefined,
      );
      setAttendance(data.data);
      setAttendancesTotalPages(data.totalPages);
      setAttendancesTotalRecords(data.totalRecords);
      return data.data;
    } catch (error) {
      console.error("Erro ao buscar assiduidades:", error);
    }
    return [];
  };

  // Função para buscar todos os acessos por dispositivo
  const fetchAllInitialAccessesbyDevice = async (
    sn?: string[],
    startDate?: string,
    endDate?: string,
    pageNo?: "1",
    pageSize?: "20"
  ): Promise<Accesses[]> => {
    try {
      const data = await apiService.fetchAllAccessesByDevice(
        undefined,
        undefined,
        undefined,
        pageNo,
        pageSize
      );
      setAccess(data.data);
      setTotalPages(data.totalPages);
      setTotalRecords(data.totalRecords);

      const token = localStorage.getItem("token");
      const url = `${
        process.env.REACT_APP_WS_DOOR
      }/transactions?access_token=${encodeURIComponent(token!)}`;
      const socket = new WebSocket(url);

      socket.onopen = () => {
        console.log("WebSocket conectado");
      };

      socket.onmessage = (event) => {
        try {
          const newData = JSON.parse(event.data);
          setAccess((prevAccesses) => [newData.data, ...prevAccesses]);
        } catch (error) {
          console.error("Erro ao processar mensagem do WebSocket:", error);
        }
      };

      socket.onerror = (error) => {
        console.error("Erro no WebSocket:", error);
      };

      socket.onclose = () => {
        console.log("WebSocket desconectado");
      };

      return data.data;
    } catch (error) {
      console.error("Erro ao buscar acessos:", error);
    }
    return [];
  };

  // Função para buscar todos os acessos por dispositivo
  const fetchAllAccessesbyDevice = async (
    sn?: string[],
    startDate?: string,
    endDate?: string,
    pageNo?: string,
    pageSize?: string
  ): Promise<Accesses[]> => {
    try {
      const data = await apiService.fetchAllAccessesByDevice(
        sn,
        undefined,
        undefined,
        pageNo,
        pageSize
      );
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

  // Função para buscar todos os acessos
  const fetchDailyTransactionsNoPagination = async (
    startDate?: string,
    endDate?: string,
    enrollNumbers?: string[],
    pageNo?: string,
    pageSize?: string
  ): Promise<AttendanceResults[]> => {
    try {
      const data = await apiService.fetchAllDailyTransactions(
        startDate,
        endDate,
        enrollNumbers,
        pageNo,
        pageSize
      );
      setAttendanceResultsNoPagination(data.data);
      return data.data;
    } catch (error) {
      console.error("Erro ao buscar resultados:", error);
    }
    return [];
  };

  // Função para buscar todos os acessos
  const fetchDailyTransactions = async (
    startDate?: string,
    endDate?: string,
    enrollNumbers?: string[],
    pageNo?: string,
    pageSize?: string
  ): Promise<AttendanceResults[]> => {
    try {
      const data = await apiService.fetchAllDailyTransactions(
        startDate,
        endDate,
        enrollNumbers,
        pageNo,
        pageSize
      );
      setAttendanceResults(data.data);
      setResultsTotalPages(data.totalPages);
      setResultsTotalRecords(data.totalRecords);
      return data.data;
    } catch (error) {
      console.error("Erro ao buscar resultados:", error);
    }
    return [];
  };

  // Função para processar os resultados
  const handleProcessResults = async (startDate: string, endDate: string) => {
    try {
      const data = await apiService.AddAttendanceResults(startDate, endDate);
      toast.success(data.value || "Processamento realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao realizar novo processamento:", error);
    }
  };

  /* // Função para buscar todos os horários
  const fetchAllAttendanceTimes = async () => {
    try {
      const data = await apiService.fetchAllAttendanceTimes();
      setAttendanceTimes(response.message.data);
    } catch (error) {
      console.error("Erro ao buscar todos os horários:", error);
    }
    return [];
  } */

  // Busca todas as assiduidades ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchAllAttendancesNoPagination();
      fetchAllAttendances(undefined, "1", "20", undefined, undefined, undefined);
      fetchAllInitialAccessesbyDevice(
        undefined,
        undefined,
        undefined,
        "1",
        "20"
      );
      fetchAllAccessesbyDevice();
      fetchDailyTransactions(undefined, undefined, undefined, "1", "20");
      fetchDailyTransactionsNoPagination();
    }
  }, []);

  // Definindo o valor do contexto
  const contextValue = {
    attendance,
    setAttendance,
    access,
    accessForGraph,
    totalPages,
    totalRecords,
    fetchAllAttendancesNoPagination,
    fetchAllAttendances,
    fetchAllInitialAccessesbyDevice,
    fetchAllAccessesbyDevice,
    fetchAllAccessesbyDoor,
    handleAddAccess,
    handleAddAttendance,
    handleAddImportedAttendance,
    handleUpdateAttendance,
    handleDeleteAttendance,
    fetchDailyTransactions,
    handleProcessResults,
    attendanceResults,
    setAttendanceResults,
    fetchDailyTransactionsNoPagination,
    attendanceResultsNoPagination,
    setAttendanceResultsNoPagination,
    resultsTotalPages,
    resultsTotalRecords,
    attendanceTotalPages,
    attendanceTotalRecords,
    attendanceNoPagination,
    attendanceTimes
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
