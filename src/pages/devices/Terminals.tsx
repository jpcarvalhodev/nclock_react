import React, { useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { toast } from "react-toastify";

import card from "../../assets/img/terminais/card.png";
import faceScan from "../../assets/img/terminais/faceScan.png";
import fprintScan from "../../assets/img/terminais/fprintScan.png";
import key from "../../assets/img/terminais/key.png";
import palmScan from "../../assets/img/terminais/palmScan.png";
import warning from "../../assets/img/modals/warning.png";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { customStyles } from "../../components/CustomStylesDataTable";
import { ExportButton } from "../../components/ExportButton";

import "../../css/Terminals.css";
import {
  Button,
  Form,
  Modal,
  OverlayTrigger,
  Spinner,
  Tab,
  Tabs,
  Tooltip,
} from "react-bootstrap";

import * as apiService from "../../api/apiService";
import { PrintButton } from "../../components/PrintButton";
import { SelectFilter } from "../../components/SelectFilter";
import { useAttendance } from "../../context/MovementContext";

import { usePersons } from "../../context/PersonsContext";
import { useTerminals } from "../../context/TerminalsContext";
import {
  activityFields,
  deviceFields,
  doorFields,
  employeeCardFields,
  employeeFields,
  employeesOnDeviceFields,
  mbDeviceFields,
  movementFields,
} from "../../fields/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { CreateModalDevices } from "../../modals/CreateModalDevices";
import { DeleteModal } from "../../modals/DeleteModal";
import { DoorModal } from "../../modals/DoorModal";
import { UpdateModalDevices } from "../../modals/UpdateModalDevices";
import {
  Activity,
  AllDevices,
  DoorDevice,
  Employee,
  EmployeeAndCard,
  EmployeeCard,
  EmployeesOnDevice,
  MBDevice,
  Movements,
} from "../../types/Types";
import { CustomSpinner } from "../../components/CustomSpinner";
import { UpdateModalEmployees } from "../../modals/UpdateModalEmployees";
import { SearchBoxContainer } from "../../components/SearchBoxContainer";

// Define a interface para os filtros
interface Filters {
  [key: string]: string;
}

// Define a interface para os dados de biometria
interface FingerprintTemplate {
  FPTmpLength: number;
  enrollNumber: string;
  FPTmpIndex: number;
  FPTmpFlag: number;
  FPTmpData: string;
}

// Define a interface para os dados de face
interface FaceTemplate {
  enrollNumber: string;
  FaceTmpIndex: number;
  FaceTmpData: string;
  FaceTmpLength: number;
}

// Junta os campos de utilizadores e cartões
const combinedEmployeeFields = [
  ...employeeFields,
  ...employeeCardFields,
].filter(
  (field, index, self) => index === self.findIndex((f) => f.key === field.key)
);

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T00:00`;
};

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T23:59`;
};

// Define o componente de terminais
export const Terminals = () => {
  const {
    devices,
    fetchAllDevices,
    fetchAllKioskTransactionOnDevice,
    sendAllEmployeesToDevice,
    saveAllEmployeesOnDeviceToDB,
    syncTimeManuallyToDevice,
    deleteAllUsersOnDevice,
    openDeviceDoor,
    restartDevice,
    sendClockToDevice,
    handleAddDevice,
    handleUpdateDevice,
    handleDeleteDevice,
    fetchAllAux,
    fetchAllDoorData,
    fetchDeviceActivities,
    totalMovementPages,
    totalMovementRows,
    fetchAllMBDevices,
    restartMBDevice,
    handleAddMBDevice,
    handleUpdateMBDevice,
    handleDeleteMBDevice,
  } = useTerminals();
  const { handleAddImportedAttendance } = useAttendance();
  const {
    employeesNoPagination,
    handleUpdateEmployee,
    handleImportEmployeeCard,
    handleImportEmployeeFP,
    handleImportEmployeeFace,
  } = usePersons();
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);
  const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
  const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
  const [employeesBio, setEmployeesBio] = useState<EmployeeAndCard[]>([]);
  const [employeeCards, setEmployeeCards] = useState<EmployeeAndCard[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [initialData, setInitialData] = useState<Partial<AllDevices> | null>(
    null
  );
  const [mainTabKey, setMainTabKey] = useState("tasks");
  const [userTrackTabKey, setUserTrackTabKey] = useState("users-software");
  const [userTabKey, setUserTabKey] = useState("users");
  const [filters, setFilters] = useState<Filters>({});
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "deviceNumber",
    "deviceName",
    "nomeQuiosque",
    "model",
    "modelo",
    "ipAddress",
    "status",
    "estadoTerminal",
    "enabled",
  ]);
  const [selectedUserColums, setSelectedUserColumns] = useState<string[]>([
    "enrollNumber",
    "name",
    "cardNumber",
    "statusFprint",
    "statusFace",
  ]);
  const [selectedBioColums, setSelectedBioColumns] = useState<string[]>([
    "enrollNumber",
    "name",
    "statusFprint",
    "statusFace",
  ]);
  const [selectedCardColums, setSelectedCardColumns] = useState<string[]>([
    "enrollNumber",
    "name",
    "cardNumber",
  ]);
  const [selectedDeviceToDelete, setSelectedDeviceToDelete] =
    useState<string>("");
  const [selectedDeviceMBToDelete, setSelectedDeviceMBToDelete] =
    useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [resetSelection, setResetSelection] = useState(false);
  const [selectedDeviceRows, setSelectedDeviceRows] = useState<AllDevices[]>(
    []
  );
  const [selectedUserRows, setSelectedUserRows] = useState<EmployeeAndCard[]>(
    []
  );
  const [selectedTerminal, setSelectedTerminal] = useState<AllDevices | null>(
    null
  );
  const [selectedMBTerminal, setSelectedMBTerminal] =
    useState<AllDevices | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<AllDevices | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingAllUser, setLoadingAllUser] = useState(false);
  const [loadingSyncAllUser, setLoadingSyncAllUser] = useState(false);
  const [loadingMovements, setLoadingMovements] = useState(false);
  const [loadingSyncTime, setLoadingSyncTime] = useState(false);
  const [loadingOpenDoor, setLoadingOpenDoor] = useState(false);
  const [loadingDeleteAllUsers, setLoadingDeleteAllUsers] = useState(false);
  const [loadingRestartDevice, setLoadingRestartDevice] = useState(false);
  const [loadingDeleteSelectedUsers, setLoadingDeleteSelectedUsers] =
    useState(false);
  const [loadingSendSelectedUsers, setLoadingSendSelectedUsers] =
    useState(false);
  const [loadingFetchSelectedUsers, setLoadingFetchSelectedUsers] =
    useState(false);
  const [loadingImportAttendance, setLoadingImportAttendance] = useState(false);
  const [loadingImportAttendanceLog, setLoadingImportAttendanceLog] =
    useState(false);
  const [loadingImportUsers, setLoadingImportUsers] = useState(false);
  const [loadingImportBio, setLoadingImportBio] = useState(false);
  const [loadingImportFace, setLoadingImportFace] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(true);
  const [showFingerprintUsers, setShowFingerprintUsers] = useState(false);
  const [showFacialRecognitionUsers, setShowFacialRecognitionUsers] =
    useState(false);
  const fileInputAttendanceRef = React.createRef<HTMLInputElement>();
  const fileInputUserRef = React.createRef<HTMLInputElement>();
  const fileInputFPRef = React.createRef<HTMLInputElement>();
  const fileInputFaceRef = React.createRef<HTMLInputElement>();
  const [movements, setMovements] = useState<Movements[]>([]);
  const [transactions, setTransactions] = useState<Activity[]>([]);
  const [loadingActivityData, setLoadingActivityData] = useState(false);
  const [loadingSendClock, setLoadingSendClock] = useState(false);
  const [showDoorModal, setShowDoorModal] = useState(false);
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [loadingMovementData, setLoadingMovementData] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [filterText, setFilterText] = useState("");
  const [deviceLoading, setDeviceLoading] = useState(false);
  const [stateLoading, setStateLoading] = useState(false);
  const [userSoftwareLoading, setUserSoftwareLoading] = useState(false);
  const [userTerminalLoading, setUserTerminalLoading] = useState(false);
  const [bioLoading, setBioLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [loadingTurnOffDevice, setLoadingTurnOffDevice] = useState(false);
  const [showDeleteMBModal, setShowDeleteMBModal] = useState(false);
  const [filteredUsersInTerminal, setFilteredUsersInTerminal] = useState<
    EmployeesOnDevice[]
  >([]);
  const [refreshIntervalTasks, setRefreshIntervalTasks] = useState(10000);

  // Função para buscar todos as biometrias
  const fetchEmployeesBio = () => {
    const filteredEmployeesBio = employeesNoPagination.filter(
      (employee) =>
        employee.statusFprint === true || employee.statusFace === true
    );
    const sortedEmployeesBio = filteredEmployeesBio.slice().sort((a, b) => {
      const aNum = parseInt(a.enrollNumber || "0", 10);
      const bNum = parseInt(b.enrollNumber || "0", 10);
      return aNum - bNum;
    });
    setEmployeesBio(sortedEmployeesBio);
  };

  // Função para buscar todos os cartões
  const fetchEmployeesCards = () => {
    const filteredEmployeesWithCards = employeesNoPagination.filter(
      (employee) => employee.employeeCards.length > 0
    );
    const sortedEmployeeCards = filteredEmployeesWithCards
      .slice()
      .sort((a, b) => {
        const aNum = parseInt(a.enrollNumber || "0", 10);
        const bNum = parseInt(b.enrollNumber || "0", 10);
        return aNum - bNum;
      });
    setEmployeeCards(sortedEmployeeCards);
  };

  // Função para buscar todas as tarefas de dispositivos
  useEffect(() => {
    let intervalTasks: NodeJS.Timeout;

    const fetchTasks = async () => {
      if (!selectedTerminal) return;
      try {
        setLoadingActivityData(true);
        const fetchedActivity = await fetchDeviceActivities(
          [`${selectedTerminal.serialNumber}`],
          undefined,
          undefined,
          String(currentPage),
          String(perPage)
        );
        setTransactions(fetchedActivity);
        setLoadingActivityData(false);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        setLoadingActivityData(false);
      }
    };

    fetchTasks();

    if (selectedTerminal && refreshIntervalTasks > 0) {
      intervalTasks = setInterval(fetchTasks, refreshIntervalTasks);
    }

    return () => {
      if (intervalTasks) clearInterval(intervalTasks);
    };
  }, [selectedTerminal, refreshIntervalTasks, perPage, currentPage]);

  // Função para buscar todos os movimentos de dispositivos via websocket
  useEffect(() => {
    if (!selectedTerminal) return;

    setLoadingMovementData(true);
    const token = localStorage.getItem("token");
    const url = `${
      process.env.REACT_APP_WS_DOOR
    }/activities?access_token=${encodeURIComponent(token!)}`;
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("Conexão WebSocket aberta.");
      setLoadingMovementData(false);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMovements((prevMovements) => [data.data, ...prevMovements]);
      } catch (error) {
        console.error("Erro ao processar mensagem WebSocket:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
      setLoadingMovementData(false);
    };

    socket.onclose = () => {
      console.log("Conexão WebSocket fechada.");
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [selectedTerminal]);

  // Função para buscar todas as tarefas entre datas
  const fetchAllActivityBetweenDates = async () => {
    setRefreshIntervalTasks(0);
    try {
      const data = await fetchDeviceActivities(undefined, startDate, endDate);
      if (data.length > 0) {
        setTransactions(data);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error("Erro ao buscar as tarefas:", error);
    }
  };

  // Função para buscar as tarefas de hoje
  const fetchActivityToday = async () => {
    setRefreshIntervalTasks(0);
    const today = new Date();
    const start = formatDateToStartOfDay(today);
    const end = formatDateToEndOfDay(today);
    try {
      const data = await fetchDeviceActivities(undefined, start, end);
      if (data.length > 0) {
        setTransactions(data);
      } else {
        setTransactions([]);
      }
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error("Erro ao buscar as tarefas de hoje:", error);
    }
  };

  // Função para buscar as tarefas de ontem
  const fetchActivityForPreviousDay = async () => {
    setRefreshIntervalTasks(0);
    const prevDate = new Date(startDate);
    prevDate.setDate(prevDate.getDate() - 1);

    const start = formatDateToStartOfDay(prevDate);
    const end = formatDateToEndOfDay(prevDate);

    try {
      const data = await fetchDeviceActivities(undefined, start, end);
      if (data.length > 0) {
        setTransactions(data);
      } else {
        setTransactions([]);
      }
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error("Erro ao buscar as tarefas do dia anterior:", error);
    }
  };

  // Função para buscar as tarefas de amanhã
  const fetchActivityForNextDay = async () => {
    setRefreshIntervalTasks(0);
    const newDate = new Date(endDate);
    newDate.setDate(newDate.getDate() + 1);

    if (newDate > new Date()) {
      return;
    }

    const start = formatDateToStartOfDay(newDate);
    const end = formatDateToEndOfDay(newDate);

    try {
      const data = await fetchDeviceActivities(undefined, start, end);
      if (data.length > 0) {
        setTransactions(data);
      } else {
        setTransactions([]);
      }
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error("Erro ao buscar as tarefas do dia seguinte:", error);
    }
  };

  // Função para adicionar um dispositivo
  const addDevice = async (device: AllDevices) => {
    await handleAddDevice(device);
    refreshAll();
    setClearSelectionToggle((prev) => !prev);
    window.location.reload();
  };

  // Função para atualizar um dispositivo
  const updateDevice = async (device: AllDevices) => {
    await handleUpdateDevice(device);
    refreshAll();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para excluir um dispositivo
  const deleteDevice = async () => {
    if (selectedDeviceToDelete) {
      await handleDeleteDevice(selectedDeviceToDelete);
      refreshAll();
      setClearSelectionToggle((prev) => !prev);
    }
  };

  // Função para adicionar um dispositivo multibanco
  const addMBDevice = async (device: MBDevice) => {
    await handleAddMBDevice(device);
    refreshAll();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para atualizar um dispositivo multibanco
  const updateMBDevice = async (device: MBDevice) => {
    await handleUpdateMBDevice(device);
    refreshAll();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para apagar um dispositivo multibanco
  const deleteMBDevice = async (id: string) => {
    await handleDeleteMBDevice(id);
    refreshAll();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para atualizar um funcionário e um cartão
  const updateEmployeeAndCard = async (employee: Employee) => {
    await handleUpdateEmployee(employee);
    refreshAll();
  };

  // Função para carregar biometrias e cartões
  useEffect(() => {
    fetchEmployeesBio();
    fetchEmployeesCards();
  }, [employeesNoPagination]);

  // Atualiza a seleção ao resetar
  useEffect(() => {
    if (resetSelection) {
      setResetSelection(false);
    }
  }, [resetSelection]);

  // Callback disparado ao mudar a página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Callback disparado ao mudar o tamanho da página
  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  // Função para atualizar todos os dispositivos
  const refreshAll = () => {
    fetchAllDevices();
    fetchEmployeesBio();
    fetchEmployeesCards();
    fetchAllAux();
    fetchAllDoorData();
    fetchAllMBDevices();
    setStartDate(formatDateToStartOfDay(pastDate));
    setEndDate(formatDateToEndOfDay(currentDate));
    setClearSelectionToggle((prev) => !prev);
    setSelectedTerminal(null);
  };

  // Função para resetar as colunas
  const handleResetColumns = () => {
    setSelectedColumns([
      "deviceNumber",
      "deviceName",
      "model",
      "ipAddress",
      "status",
      "enabled",
    ]);
  };

  const handleMainSelect = (k: string | null) => {
    if (k) {
      setMainTabKey(k);
    }
  };

  const handleUserTrackSelect = (k: string | null) => {
    if (k) {
      setUserTrackTabKey(k);
    }
  };

  const handleUserSelect = (k: string | null) => {
    if (k) {
      setUserTabKey(k);
    }
  };

  // Função para alternar a visibilidade das colunas
  const handleColumnToggle = (columnKey: string) => {
    if (selectedColumns.includes(columnKey)) {
      setSelectedColumns(selectedColumns.filter((key) => key !== columnKey));
    } else {
      setSelectedColumns([...selectedColumns, columnKey]);
    }
  };

  // Função para selecionar todas as colunas
  const handleSelectAllColumns = () => {
    const allColumnKeys = deviceFields.map((field) => field.key);
    setSelectedColumns(allColumnKeys);
  };

  // Define a função de seleção de linhas de dispositivos
  const handleDeviceRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: AllDevices[];
  }) => {
    if (state.selectedRows.length === 0) {
      setSelectedTerminal(null);
      setSelectedMBTerminal(null);
      setSelectedDeviceRows([]);
      return;
    }

    const sortedDevices = devices.sort(
      (a, b) => a.deviceNumber - b.deviceNumber
    );
    setSelectedDeviceRows(sortedDevices);
    const firstSelected = state.selectedRows[0];
    if (firstSelected && firstSelected.deviceNumber !== undefined) {
      setSelectedTerminal(firstSelected);
    } else {
      setSelectedMBTerminal(firstSelected);
    }
  };

  // Define a função de seleção de linhas de utilizadores
  const handleUserRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: (EmployeeAndCard | EmployeesOnDevice)[];
  }) => {
    setSelectedUserRows(state.selectedRows);
  };

  // Filtra os utilizadores no terminal
  useEffect(() => {
    if (selectedTerminal) {
      setUserTerminalLoading(true);
      const fetchEmployeeTerminal = async () => {
        await apiService
          .fetchAllEmployeeDevices(selectedTerminal.zktecoDeviceID)
          .then((data) => {
            setFilteredUsersInTerminal(data);
            setUserTerminalLoading(false);
          })
          .catch((error) => {
            console.error("Erro ao buscar utilizadores no terminal:", error);
            setFilteredUsersInTerminal([]);
            setUserTerminalLoading(false);
          });
      };

      fetchEmployeeTerminal();
    } else {
      setFilteredUsersInTerminal([]);
      setUserTerminalLoading(false);
    }
  }, [selectedTerminal]);

  // Filtra os utilizadores no dispositivo
  const filteredUsersInSoftware = useMemo(() => {
    if (employeesNoPagination) {
      return employeesNoPagination;
    } else {
      return [];
    }
  }, [employeesNoPagination]);

  // Define as colunas de funcionário no dispositivo
  const employeeOnDeviceColumns: TableColumn<EmployeesOnDevice>[] =
    employeesOnDeviceFields.map((field) => {
      const formatField = (row: EmployeesOnDevice) => {
        switch (field.key) {
          case "pin":
            return Number(row.pin) || "Número inválido";
          case "cardno":
            return row.cardno === "0" ? "" : row.cardno;
          default:
            return row[field.key];
        }
      };
      return {
        id: field.key,
        name: (
          <>
            {field.label}
            <SelectFilter
              column={field.key}
              setFilters={setFilters}
              data={filteredUsersInTerminal}
            />
          </>
        ),
        selector: (row) => formatField(row),
        sortable: true,
      };
    });

  // Função para abrir o modal de edição
  const handleOpenEditModal = (person: EmployeeAndCard) => {
    const employeeDetails = employeesNoPagination.find(
      (emp) => emp.name === person.name
    );
    if (employeeDetails) {
      setSelectedEmployee(employeeDetails);
      setShowEditModal(true);
    } else {
      console.error("Funcionário não encontrado:", person.name);
    }
  };

  // Define as colunas excluídas de dispositivos
  const excludedColumns = [
    "readerCount",
    "auxInCount",
    "auxOutCount",
    "maxUserCount",
    "maxAttLogCount",
    "maxFingerCount",
    "maxUserFingerCount",
    "faceAlg",
    "fpAlg",
  ];

  // Filtra os dados da tabela de dispositivos
  const filteredDeviceDataTable = useMemo(() => {
    if (!Array.isArray(devices)) {
      return [];
    }
    return devices.filter(
      (device) =>
        Object.keys(filters).every(
          (key) =>
            filters[key] === "" ||
            (device[key] != null &&
              String(device[key])
                .toLowerCase()
                .includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(device).some(([key, value]) => {
          if (selectedColumns.includes(key) && value != null) {
            if (value instanceof Date) {
              return value
                .toLocaleString()
                .toLowerCase()
                .includes(filterText.toLowerCase());
            } else {
              return value
                .toString()
                .toLowerCase()
                .includes(filterText.toLowerCase());
            }
          }
          return false;
        })
    );
  }, [devices, filters, filterText]);

  // Ordena os dispositivos por nome com a mesclagem
  const sortedDevices = [...devices].sort((a, b) => {
    const nameA = (a.deviceName || a.nomeQuiosque || "").toLowerCase();
    const nameB = (b.deviceName || b.nomeQuiosque || "").toLowerCase();
    return nameA.localeCompare(nameB);
  });

  // Seleciona a entidade anterior
  const handleNextDevice = () => {
    if (currentDeviceIndex < sortedDevices.length - 1) {
      setCurrentDeviceIndex(currentDeviceIndex + 1);
      setSelectedDevice(sortedDevices[currentDeviceIndex + 1]);
    }
  };

  // Seleciona a entidade seguinte
  const handlePrevDevice = () => {
    if (currentDeviceIndex > 0) {
      setCurrentDeviceIndex(currentDeviceIndex - 1);
      setSelectedDevice(sortedDevices[currentDeviceIndex - 1]);
    }
  };

  // Junta os campos de dispositivos e de multibanco
  const allDeviceFields = [...deviceFields, ...mbDeviceFields];

  // Define as chaves que serão mescladas
  const mergedKeys = [
    "deviceName",
    "nomeQuiosque",
    "model",
    "modelo",
    "status",
    "estadoTerminal",
  ];

  // Cria as colunas mescladas se pelo menos uma das chaves estiver selecionada
  const mergedColumns: TableColumn<AllDevices>[] = [];

  if (
    selectedColumns.some(
      (key) => key === "deviceName" || key === "nomeQuiosque"
    )
  ) {
    mergedColumns.push({
      id: "name",
      name: (
        <>
          Nome
          <SelectFilter
            column="deviceName"
            setFilters={setFilters}
            data={filteredDeviceDataTable}
          />
        </>
      ),
      selector: (row) => row.deviceName || row.nomeQuiosque || "",
      sortable: true,
      cell: (row) => (
        <OverlayTrigger
          placement="top"
          delay={0}
          container={document.body}
          popperConfig={{
            strategy: "fixed",
            modifiers: [
              { name: "preventOverflow", options: { boundary: "window" } },
            ],
          }}
          overlay={
            <Tooltip className="custom-tooltip">
              {row.deviceName || row.nomeQuiosque || ""}
            </Tooltip>
          }
        >
          <span
            style={{
              cursor: "pointer",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.deviceName || row.nomeQuiosque || ""}
          </span>
        </OverlayTrigger>
      ),
    });
  }

  if (selectedColumns.some((key) => key === "model" || key === "modelo")) {
    mergedColumns.push({
      id: "model",
      name: (
        <>
          Modelo
          <SelectFilter
            column="model"
            setFilters={setFilters}
            data={filteredDeviceDataTable}
          />
        </>
      ),
      selector: (row) => row.model || row.modelo || "",
      sortable: true,
    });
  }

  if (
    selectedColumns.some((key) => key === "status" || key === "estadoTerminal")
  ) {
    mergedColumns.push({
      id: "status",
      name: (
        <>
          Estado
          <SelectFilter
            column="status"
            setFilters={setFilters}
            data={filteredDeviceDataTable}
          />
        </>
      ),
      selector: (row) => {
        const statusVal =
          row.status !== undefined ? row.status : row.estadoTerminal;
        return statusVal ? "Online" : "Offline";
      },
      sortable: true,
      cell: (row) => {
        const statusVal =
          row.status !== undefined ? row.status : row.estadoTerminal;
        return (
          <div
            style={{
              height: "10px",
              width: "10px",
              backgroundColor: statusVal ? "green" : "red",
              borderRadius: "50%",
              display: "inline-block",
            }}
            title={statusVal ? "Online" : "Offline"}
          />
        );
      },
    });
  }

  // Filtra os outros campos que foram selecionados, mas que não fazem parte dos campos mesclados
  const otherColumns: TableColumn<AllDevices>[] = allDeviceFields
    .filter(
      (field) =>
        selectedColumns.includes(field.key) &&
        !excludedColumns.includes(field.key)
    )
    .filter((field) => !mergedKeys.includes(field.key))
    .map((field) => {
      const formatField = (row: AllDevices) => {
        switch (field.key) {
          case "code":
            return row.code === 0 ? "" : row.code;
          case "machineNumber":
            return row.machineNumber || "";
          case "cardNumber":
            return row.cardNumber === 0 ? "" : row.cardNumber;
          case "productTime":
            return row.productTime
              ? new Date(row.productTime).toLocaleString()
              : "";
          case "timeReboot":
            return row.timeReboot === "00:00:00"
              ? "Sem tempo de reinício"
              : row.timeReboot;
          case "enabled":
            return row.enabled === undefined
              ? ""
              : row.enabled
              ? "Activo"
              : "Inactivo";
          default:
            return row[field.key] || "";
        }
      };

      return {
        id: field.key,
        name: (
          <>
            {field.label}
            <SelectFilter
              column={field.key}
              setFilters={setFilters}
              data={filteredDeviceDataTable}
            />
          </>
        ),
        selector: (row) => formatField(row),
        sortable: true,
      };
    });

  // Combine as colunas mescladas e as demais
  const deviceColumns: TableColumn<AllDevices>[] = [
    ...mergedColumns,
    ...otherColumns,
  ];

  // Define as colunas de transações
  const transactionColumns: TableColumn<Activity>[] = activityFields.map(
    (field) => {
      const formatField = (row: Activity) => {
        const applyTooltip = (text: string) => (
          <OverlayTrigger
            placement="top"
            delay={0}
            container={document.body}
            popperConfig={{
              strategy: "fixed",
              modifiers: [
                {
                  name: "preventOverflow",
                  options: {
                    boundary: "window",
                  },
                },
              ],
            }}
            overlay={<Tooltip className="custom-tooltip">{text}</Tooltip>}
          >
            <span
              style={{
                cursor: "pointer",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {text}
            </span>
          </OverlayTrigger>
        );

        switch (field.key) {
          case "createdDate":
          case "endDate": {
            const formattedDate = new Date(row[field.key]).toLocaleString();
            if (formattedDate === "01/01/1970, 01:00:00") {
              return "";
            }
            return applyTooltip(formattedDate);
          }
          case "deviceSN": {
            const deviceName =
              devices.find((device) => device.serialNumber === row[field.key])
                ?.deviceName || "";
            return applyTooltip(deviceName);
          }
          case "eventName":
          case "respName":
          case "estado":
            return applyTooltip(row[field.key]);
          default:
            return row[field.key];
        }
      };
      return {
        id: field.key,
        name: (
          <>
            {field.label}
            {field.key !== "createdDate" && field.key !== "endDate" && (
              <SelectFilter
                column={field.key}
                setFilters={setFilters}
                data={transactions}
              />
            )}
          </>
        ),
        selector: (row) => formatField(row),
        sortable: true,
        sortFunction: (rowA, rowB) =>
          new Date(rowB.createdDate).getTime() -
          new Date(rowA.createdDate).getTime(),
      };
    }
  );

  // Define as colunas de movimentos
  const movementColumns: TableColumn<Movements>[] = movementFields.map(
    (field) => {
      const formatField = (row: Movements) => {
        const applyTooltip = (text: string) => (
          <OverlayTrigger
            placement="top"
            delay={0}
            container={document.body}
            popperConfig={{
              strategy: "fixed",
              modifiers: [
                {
                  name: "preventOverflow",
                  options: {
                    boundary: "window",
                  },
                },
              ],
            }}
            overlay={<Tooltip className="custom-tooltip">{text}</Tooltip>}
          >
            <span
              style={{
                cursor: "pointer",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {text}
            </span>
          </OverlayTrigger>
        );

        switch (field.key) {
          case "CreatedDate": {
            const formattedDate = new Date(row[field.key]).toLocaleString();
            if (formattedDate === "01/01/1970, 01:00:00") {
              return "";
            }
            return applyTooltip(formattedDate);
          }
          case "DeviceSN": {
            const deviceName =
              devices.find((device) => device.serialNumber === row[field.key])
                ?.deviceName || "";
            return applyTooltip(deviceName);
          }
          case "Message":
          case "Tipo":
            return applyTooltip(row[field.key]);
          default:
            return row[field.key];
        }
      };
      return {
        id: field.key,
        name: (
          <>
            {field.label}
            {field.key !== "CreatedDate" && (
              <SelectFilter
                column={field.key}
                setFilters={setFilters}
                data={transactions}
              />
            )}
          </>
        ),
        selector: (row) => formatField(row),
        sortable: true,
        sortFunction: (rowA, rowB) =>
          new Date(rowB.CreatedDate).getTime() -
          new Date(rowA.CreatedDate).getTime(),
      };
    }
  );

  // Filtra os dados da tabela de estado de dispositivos
  const filteredStateDataTable = useMemo(() => {
    if (!Array.isArray(devices)) {
      return [];
    }
    return devices.filter((device) =>
      Object.keys(filters).every(
        (key) =>
          filters[key] === "" ||
          String(device[key]).toLowerCase().includes(filters[key].toLowerCase())
      )
    );
  }, [devices, filters]);

  // Cria a coluna mesclada para exibir deviceName ou nomeQuiosque
  const mergedStateColumn: TableColumn<AllDevices> = {
    id: "name",
    name: (
      <>
        Nome
        <SelectFilter
          column="deviceName"
          setFilters={setFilters}
          data={filteredStateDataTable}
        />
      </>
    ),
    selector: (row) => row.deviceName || row.nomeQuiosque || "",
    sortable: true,
    cell: (row) => (
      <OverlayTrigger
        placement="top"
        delay={0}
        container={document.body}
        popperConfig={{
          strategy: "fixed",
          modifiers: [
            { name: "preventOverflow", options: { boundary: "window" } },
          ],
        }}
        overlay={
          <Tooltip className="custom-tooltip">
            {row.deviceName || row.nomeQuiosque || ""}
          </Tooltip>
        }
      >
        <span
          style={{
            cursor: "pointer",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {row.deviceName || row.nomeQuiosque || ""}
        </span>
      </OverlayTrigger>
    ),
  };

  // Outras colunas de estado que você deseja exibir (exceto deviceName e nomeQuiosque)
  const otherStateColumns: TableColumn<AllDevices>[] = allDeviceFields
    .filter(
      (field) => field.key !== "deviceName" && field.key !== "nomeQuiosque"
    )
    .filter((field) => excludedColumns.includes(field.key))
    .map((field) => ({
      name: (
        <>
          {field.label}
          <SelectFilter
            column={field.key}
            setFilters={setFilters}
            data={filteredStateDataTable}
          />
        </>
      ),
      selector: (row) => row[field.key],
      sortable: true,
    }));

  // Combina a coluna mesclada com as demais
  const stateColumns: TableColumn<AllDevices>[] = [
    mergedStateColumn,
    ...otherStateColumns,
  ];

  // Formata as colunas especiais na tabela de utilizadores, biometria e cartões
  const formatUserStatus = (row: EmployeeAndCard) => {
    const hasValidCardNumber = row.employeeCards?.some(
      (card) => card.cardNumber && card.cardNumber !== ""
    );
    const hasValidPassword = row.employeeCards?.some(
      (card) => card.devicePassword && card.devicePassword !== ""
    );
    return (
      <>
        {hasValidCardNumber && (
          <img src={card} alt="Card" style={{ width: 20, marginRight: 5 }} />
        )}
        {row.statusFprint && (
          <img
            src={fprintScan}
            alt="Fingerprint"
            style={{ width: 20, marginRight: 5 }}
          />
        )}
        {row.statusFace && (
          <img
            src={faceScan}
            alt="Face"
            style={{ width: 20, marginRight: 5 }}
          />
        )}
        {row.statusPalm && (
          <img
            src={palmScan}
            alt="Palm"
            style={{ width: 20, marginRight: 5 }}
          />
        )}
        {hasValidPassword && (
          <img src={key} alt="Key" style={{ width: 20, marginRight: 5 }} />
        )}
      </>
    );
  };
  const formatBioStatus = (row: EmployeeAndCard) => {
    return (
      <>
        {row.statusFprint && (
          <img
            src={fprintScan}
            alt="Fingerprint"
            style={{ width: 20, marginRight: 5 }}
          />
        )}
        {row.statusFace && (
          <img
            src={faceScan}
            alt="Face"
            style={{ width: 20, marginRight: 5 }}
          />
        )}
        {row.statusPalm && (
          <img
            src={palmScan}
            alt="Palm"
            style={{ width: 20, marginRight: 5 }}
          />
        )}
      </>
    );
  };
  const formatCardStatus = (row: EmployeeAndCard) => {
    const hasCard = row.employeeCards?.some(
      (card) => card.cardNumber && card.cardNumber !== ""
    );
    const hasValidPassword = row.employeeCards?.some(
      (card) => card.devicePassword && card.devicePassword !== ""
    );
    return (
      <>
        {hasCard && (
          <img src={card} alt="Card" style={{ width: 20, marginRight: 5 }} />
        )}
        {hasValidPassword && (
          <img src={key} alt="Key" style={{ width: 20, marginRight: 5 }} />
        )}
      </>
    );
  };

  // Define as colunas excluídas de utilizadores
  const excludedUserColumns = [
    "statusFprint",
    "statusFace",
    "statusPalm",
    "cardNumber",
  ];

  // Define as colunas de utilizadores
  const userColumns: TableColumn<EmployeeAndCard>[] = combinedEmployeeFields
    .filter((field) => selectedUserColums.includes(field.key))
    .filter((field) => !excludedUserColumns.includes(field.key))
    .map((field) => {
      if (field.key === "name") {
        return {
          ...field,
          name: field.label,
          cell: (row: EmployeeAndCard) => (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleOpenEditModal(row)}
            >
              {row.name}
            </div>
          ),
        };
      }
      const formatField = (row: EmployeeAndCard) => {
        switch (field.key) {
          case "cardNumber":
            return row.cardNumber === "0" ? "" : row.cardNumber;
          case "enrollNumber":
            return Number(row.enrollNumber) || "";
          default:
            return row[field.key] || "";
        }
      };
      return {
        id: field.key,
        name: (
          <>
            {field.label}
            <SelectFilter
              column={field.key}
              setFilters={setFilters}
              data={filteredUsersInSoftware}
            />
          </>
        ),
        selector: (row: EmployeeAndCard) => formatField(row),
        sortable: true,
      };
    })
    .concat([
      {
        id: "verificationMode",
        name: <>Modo de Verificação</>,
        selector: (row) => formatUserStatus(row),
        sortable: true,
      },
    ]);

  // Define as colunas excluídas de utilizadores
  const excludedBioColumns = ["statusFprint", "statusFace", "statusPalm"];

  // Define os dados da tabela de biometria
  const filteredBioDataTable = useMemo(() => {
    if (!Array.isArray(employeesBio)) {
      return [];
    }
    return employeesBio.filter((employee) =>
      Object.keys(filters).every(
        (key) =>
          filters[key] === "" || String(employee[key]) === String(filters[key])
      )
    );
  }, [employeesBio]);

  // Define as colunas de utilizadores
  const bioColumns: TableColumn<EmployeeAndCard>[] = combinedEmployeeFields
    .filter((field) => selectedBioColums.includes(field.key))
    .filter((field) => !excludedBioColumns.includes(field.key))
    .map((field) => {
      if (field.key === "name") {
        return {
          ...field,
          name: field.label,
          cell: (row: EmployeeAndCard) => (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleOpenEditModal(row)}
            >
              {row.name}
            </div>
          ),
        };
      }
      const formatField = (row: EmployeeAndCard) => {
        switch (field.key) {
          case "enrollNumber":
            return Number(row.enrollNumber) || "";
          default:
            return row[field.key] || "";
        }
      };
      return {
        name: (
          <>
            {field.label}
            <SelectFilter
              column={field.key}
              setFilters={setFilters}
              data={filteredBioDataTable}
            />
          </>
        ),
        selector: (row: EmployeeAndCard) => formatField(row),
        sortable: true,
      };
    })
    .concat([
      {
        name: <>Modo de Verificação</>,
        selector: (row) => formatBioStatus(row),
        sortable: true,
      },
    ]);

  // Define as colunas excluídas de utilizadores
  const excludedCardColumns = ["statusFprint", "statusFace", "statusPalm"];

  // Filtra os dados da tabela de cartões
  const filteredCardDataTable = useMemo(() => {
    if (!Array.isArray(employeeCards)) {
      return [];
    }
    return employeeCards.filter((employee) =>
      Object.keys(filters).every(
        (key) =>
          filters[key] === "" || String(employee[key]) === String(filters[key])
      )
    );
  }, [employeeCards]);

  // Define as colunas de utilizadores
  const cardColumns: TableColumn<EmployeeAndCard>[] = combinedEmployeeFields
    .filter((field) => selectedCardColums.includes(field.key))
    .filter((field) => !excludedCardColumns.includes(field.key))
    .map((field) => {
      if (field.key === "name") {
        return {
          ...field,
          name: field.label,
          cell: (row: EmployeeAndCard) => (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleOpenEditModal(row)}
            >
              {row.name}
            </div>
          ),
        };
      }
      const formatField = (row: EmployeeAndCard) => {
        switch (field.key) {
          case "cardNumber": {
            const firstCard = row.employeeCards?.find(
              (card) => card.cardNumber && card.cardNumber !== "0"
            );
            return firstCard?.cardNumber || "";
          }
          case "enrollNumber":
            return Number(row.enrollNumber) || "";
          default:
            return row[field.key] || "";
        }
      };
      return {
        id: field.key,
        name: (
          <>
            {field.label}
            <SelectFilter
              column={field.key}
              setFilters={setFilters}
              data={filteredCardDataTable}
            />
          </>
        ),
        selector: (row: EmployeeAndCard) => formatField(row),
        sortable: true,
      };
    })
    .concat([
      {
        id: "verificationMode",
        name: <>Modo de Verificação</>,
        selector: (row) => formatCardStatus(row),
        sortable: true,
      },
    ]);

  // Define as opções de paginação de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Define a função de abertura do modal de edição dos dispositivos
  const handleEditDevices = (row: AllDevices) => {
    setSelectedDevice(row);
    const sortedDevices = devices.sort(
      (a, b) => a.deviceNumber - b.deviceNumber
    );
    const devicesIndex = sortedDevices.findIndex(
      (device) => device.zktecoDeviceID === row.zktecoDeviceID
    );
    setCurrentDeviceIndex(devicesIndex);
    setShowUpdateModal(true);
  };

  // Define a função de abertura do modal de exclusão dos dispositivos
  const handleOpenDeleteModal = (device: AllDevices) => {
    if (device.zktecoDeviceID) {
      setSelectedDeviceToDelete(device.zktecoDeviceID);
      setShowDeleteModal(true);
    } else if (device.id) {
      setSelectedDeviceMBToDelete(device.id);
      setShowDeleteMBModal(true);
    }
  };

  // Função que manipula a duplicação
  const handleDuplicate = (devices: Partial<AllDevices>) => {
    setInitialData({
      ...devices,
      deviceNumber: devices.deviceNumber ? devices.deviceNumber + 1 : 1,
      ipAddress: "",
      macAddress: "",
      firmware: "",
      serialNumber: "",
      port: 0,
    });
    setShowAddModal(true);
    setShowUpdateModal(false);
    setSelectedTerminal(null);
  };

  // Função que manipula o filtro de utilizadores
  const handleAllUsersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setShowAllUsers(isChecked);
    if (isChecked) {
      setShowFingerprintUsers(false);
      setShowFacialRecognitionUsers(false);
    }
  };

  // Função que manipula o filtro de utilizadores de biometria digital
  const handleFingerprintUsersChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = e.target.checked;
    setShowFingerprintUsers(isChecked);
    if (isChecked) {
      setShowAllUsers(false);
    } else {
      checkAllFiltersOff(false, showFacialRecognitionUsers);
    }
  };

  // Função que manipula o filtro de utilizadores de biometria facial
  const handleFacialRecognitionUsersChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = e.target.checked;
    setShowFacialRecognitionUsers(isChecked);
    if (isChecked) {
      setShowAllUsers(false);
    } else {
      checkAllFiltersOff(showFingerprintUsers, false);
    }
  };

  // Função que verifica se todos os filtros estão desligados
  const checkAllFiltersOff = (fingerprint: boolean, facial: boolean) => {
    if (!fingerprint && !facial) {
      setShowAllUsers(true);
    }
  };

  // Define as colunas de ação de dispositivos
  const devicesActionColumn: TableColumn<AllDevices> = {
    name: "Ações",
    cell: (row: AllDevices) => (
      <div style={{ display: "flex" }}>
        <OverlayTrigger
          placement="top"
          delay={0}
          container={document.body}
          popperConfig={{
            modifiers: [
              {
                name: "preventOverflow",
                options: {
                  boundary: "window",
                },
              },
            ],
          }}
          overlay={<Tooltip className="custom-tooltip">Duplicar</Tooltip>}
        >
          <CustomOutlineButton
            className="action-button"
            icon="bi bi-copy"
            onClick={() => handleDuplicate(row)}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          delay={0}
          container={document.body}
          popperConfig={{
            modifiers: [
              {
                name: "preventOverflow",
                options: {
                  boundary: "window",
                },
              },
            ],
          }}
          overlay={<Tooltip className="custom-tooltip">Editar</Tooltip>}
        >
          <CustomOutlineButton
            className="action-button"
            icon="bi bi-pencil"
            onClick={() => handleEditDevices(row)}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          delay={0}
          container={document.body}
          popperConfig={{
            modifiers: [
              {
                name: "preventOverflow",
                options: {
                  boundary: "window",
                },
              },
            ],
          }}
          overlay={<Tooltip className="custom-tooltip">Apagar</Tooltip>}
        >
          <CustomOutlineButton
            className="action-button"
            icon="bi bi-trash"
            onClick={() => handleOpenDeleteModal(row)}
          />
        </OverlayTrigger>
      </div>
    ),
    selector: (row: AllDevices) => row.zktecoDeviceID,
    ignoreRowClick: true,
  };

  // Função para controlar a mudança de arquivo dos movimentos
  const handleAttendanceFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          const fileName = file.name;
          const parsedData = parseAttendanceData(result, fileName);
          await handleAddImportedAttendance(parsedData as any);
        } else {
          console.error(
            "Erro: o conteúdo do arquivo não é uma string ou number"
          );
        }
      };
      setLoadingImportAttendance(false);
      setLoadingImportAttendanceLog(false);
      reader.readAsText(file);
    }
  };

  // Função para formatar os dados de movimentos para a API
  const parseAttendanceData = (text: string, fileName: string) => {
    const deviceSN = fileName.split("_")[0];
    const lines = text.split("\n");
    return lines
      .filter((line) => line.trim().length > 0)
      .map((line) => {
        const parts = line.trim().split(/\s+/);
        const enrollNumber = parts[0];
        const attendanceDateTime = `${parts[1]}T${parts[2]}.000Z`;
        const deviceNumber = parts[3];
        const inOutMode = parts[4];
        const verifyMode = parts[5];
        const workCode = parts[6];

        return {
          deviceSN: deviceSN,
          enrollNumber: enrollNumber,
          attendanceTime: attendanceDateTime,
          deviceNumber: parseInt(deviceNumber, 10),
          inOutMode: parseInt(inOutMode, 10),
          verifyMode: parseInt(verifyMode, 10),
          workCode: parseInt(workCode, 10),
        };
      });
  };

  // Função para controlar a mudança de arquivo dos utilizadores
  const handleUserFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const buffer = e.target?.result as ArrayBuffer;
        const data = parseUserData(buffer);
        await handleImportEmployeeCard(data);
      };
      setLoadingImportUsers(false);
      reader.readAsArrayBuffer(file);
    }
  };

  // Função para formatar os dados de utilizadores para a API
  const parseUserData = (buffer: ArrayBuffer): Partial<EmployeeCard>[] => {
    const dataView = new DataView(buffer);
    const users: Partial<EmployeeCard>[] = [];
    let offset = 0;
    const USER_STRUCT_SIZE = calcUserStructSize();
    while (offset + USER_STRUCT_SIZE <= buffer.byteLength) {
      offset += 2;
      const devicePrivelage = dataView.getUint8(offset);
      offset += 1;
      const devicePassword = decodeString(dataView, offset, 8);
      offset += 8;
      const employeeName = decodeString(dataView, offset, 24);
      offset += 24;
      const cardNumber = dataView.getUint32(offset, true);
      offset += 4;
      offset += 1 + 8;
      const enrollNumber = decodeString(dataView, offset, 24);
      offset += 24;

      users.push({
        devicePrivelage,
        devicePassword,
        employeeName,
        cardNumber: cardNumber.toString(),
        enrollNumber,
        deviceEnabled: true,
      });
    }

    return users;
  };

  // Função para calcular o tamanho da estrutura do utilizador
  const calcUserStructSize = (): number => {
    return 2 + 1 + 8 + 24 + 4 + 1 + 8 + 24;
  };

  // Função para decodificar a string
  const decodeString = (
    dataView: DataView,
    offset: number,
    length: number
  ): string => {
    const bytes = new Uint8Array(dataView.buffer, offset, length);
    return new TextDecoder("windows-1252")
      .decode(bytes)
      .replace(/\0/g, "")
      .trim();
  };

  // Função para controlar a mudança de arquivo da biometria
  const handleFPFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const buffer = e.target?.result as ArrayBuffer;
        const data = parseFPData(buffer);
        await handleImportEmployeeFP(data);
      };
      setLoadingImportUsers(false);
      reader.readAsArrayBuffer(file);
    }
  };

  // Função para formatar os dados de biometria para a API
  const parseFPData = (buffer: ArrayBuffer): FingerprintTemplate[] => {
    const dataView = new DataView(buffer);
    const templates: FingerprintTemplate[] = [];
    let offset = 0;

    while (offset < buffer.byteLength) {
      const FPTmpLength = dataView.getUint16(offset, true);
      offset += 2;
      const enrollNumberNumeric = dataView.getUint16(offset, true);
      offset += 2;
      const enrollNumber = enrollNumberNumeric.toString();
      const FPTmpIndex = dataView.getUint8(offset);
      offset += 1;
      const FPTmpFlag = dataView.getUint8(offset);
      offset += 1;

      const TemplateSize = FPTmpLength - (2 + 2 + 1 + 1);
      const FPTmpData = new Uint8Array(buffer, offset, TemplateSize);
      offset += TemplateSize;

      const templateBase64 = btoa(String.fromCharCode(...FPTmpData));

      templates.push({
        FPTmpLength,
        enrollNumber,
        FPTmpIndex,
        FPTmpFlag,
        FPTmpData: templateBase64,
      });
    }

    return templates;
  };

  // Função para controlar a mudança de arquivo da face
  const handleFaceFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        const parsedData = parseFaceData(content);
        await handleImportEmployeeFace(parsedData);
      };
      reader.readAsText(file);
    }
  };

  // Função para formatar os dados de face para a API
  const parseFaceData = (dataString: string): FaceTemplate[] => {
    const lines = dataString.split("\n");
    const results: FaceTemplate[] = [];

    lines.forEach((line) => {
      if (line.includes("Pin=")) {
        const enrollNumber = line.match(/Pin=(\d+)/)?.[1];
        const FaceTmpIndexMatch = line.match(/Index=(\d+)/);
        const FaceTmpDataMatch = line.match(/Tmp=([a-zA-Z0-9+/=]+)/);

        if (enrollNumber && FaceTmpIndexMatch && FaceTmpDataMatch) {
          const FaceTmpIndex = parseInt(FaceTmpIndexMatch[1], 10);
          const FaceTmpData = FaceTmpDataMatch[1];
          const FaceTmpLength = FaceTmpData.length;

          results.push({
            enrollNumber,
            FaceTmpIndex,
            FaceTmpData,
            FaceTmpLength,
          });
        }
      }
    });

    return results;
  };

  // Funções para acionar o popup de seleção de arquivo dos movimentos, utilizadores e biometria
  const triggerFileAttendanceSelectPopup = () => {
    fileInputAttendanceRef.current?.click();
    setLoadingImportAttendance(true);
    setTimeout(() => {
      if (!fileInputAttendanceRef.current?.value) {
        setLoadingImportAttendance(false);
      }
    }, 5000);
  };
  const triggerFileAttendanceLogSelectPopup = () => {
    fileInputAttendanceRef.current?.click();
    setLoadingImportAttendanceLog(true);
    setTimeout(() => {
      if (!fileInputAttendanceRef.current?.value) {
        setLoadingImportAttendanceLog(false);
      }
    }, 5000);
  };
  const triggerFileUserSelectPopup = () => {
    fileInputUserRef.current?.click();
    setLoadingImportUsers(true);
    setTimeout(() => {
      if (!fileInputUserRef.current?.value) {
        setLoadingImportUsers(false);
      }
    }, 5000);
  };
  const triggerFileFPSelectPopup = () => {
    fileInputFPRef.current?.click();
    setLoadingImportBio(true);
    setTimeout(() => {
      if (!fileInputFPRef.current?.value) {
        setLoadingImportBio(false);
      }
    }, 5000);
  };
  const triggerFileFaceSelectPopup = () => {
    fileInputFaceRef.current?.click();
    setLoadingImportFace(true);
    setTimeout(() => {
      if (!fileInputFaceRef.current?.value) {
        setLoadingImportFace(false);
      }
    }, 5000);
  };

  // Função para enviar os utilizadores selecionados
  const handleSendSelectedUsers = async () => {
    if (selectedTerminal && selectedUserRows.length) {
      setLoadingSendSelectedUsers(true);
      const userIds = selectedUserRows.map((user) => user.employeeID);
      await sendAllEmployeesToDevice(selectedTerminal.zktecoDeviceID, userIds);
      setLoadingSendSelectedUsers(false);
      setClearSelectionToggle((prev) => !prev);
    } else {
      toast.warn("Selecione um terminal e pelo menos um utilizador!");
    }
  };

  // Função para excluir os utilizadores selecionados
  const handleDeleteSelectedUsers = async () => {
    if (selectedTerminal && selectedUserRows.length) {
      setLoadingDeleteSelectedUsers(true);
      const userIds = selectedUserRows.map((user) => user.employeeID);
      await deleteAllUsersOnDevice(selectedTerminal.zktecoDeviceID, userIds);
      setLoadingDeleteSelectedUsers(false);
      setClearSelectionToggle((prev) => !prev);
    } else {
      toast.warn("Selecione um terminal e pelo menos um utilizador!");
    }
  };

  // Função para recolher os utilizadores selecionados
  const handleFetchSelectedUsers = async () => {
    if (selectedTerminal && selectedUserRows.length) {
      setLoadingFetchSelectedUsers(true);
      const userIds = selectedUserRows.map((user) => user.employeeID);
      await saveAllEmployeesOnDeviceToDB(
        selectedTerminal.zktecoDeviceID,
        userIds
      );
      setLoadingFetchSelectedUsers(false);
      setClearSelectionToggle((prev) => !prev);
    } else {
      toast.warn("Selecione um terminal e pelo menos um utilizador!");
    }
  };

  // Função para recolher todos os utilizadores
  const handleUsers = async () => {
    if (selectedTerminal) {
      setLoadingUser(true);
      await saveAllEmployeesOnDeviceToDB(selectedTerminal.zktecoDeviceID);
      setLoadingUser(false);
      setClearSelectionToggle((prev) => !prev);
    } else {
      toast.warn("Selecione um terminal primeiro!");
    }
  };

  // Função para enviar todos os utilizadores
  const handleAllUsers = async () => {
    if (selectedTerminal) {
      openConfirmModal(async () => {
        setLoadingAllUser(true);
        await sendAllEmployeesToDevice(selectedTerminal.zktecoDeviceID, null);
        setLoadingAllUser(false);
        setClearSelectionToggle((prev) => !prev);
      }, "Quer enviar utilizadores para o terminal marcado?");
    } else {
      toast.warn("Selecione um terminal primeiro!");
    }
  };

  /* // Função para sincronizar todos os utilizadores
  const handleSyncAllUsers = async () => {
    if (selectedTerminal) {
      setLoadingSyncAllUser(true);
      await saveAllEmployeesOnDeviceToDB(selectedTerminal.zktecoDeviceID);
      await sendAllEmployeesToDevice(selectedTerminal.zktecoDeviceID, null);
      setLoadingSyncAllUser(false);
      setClearSelectionToggle((prev) => !prev);
    } else {
      toast.warn("Selecione um terminal primeiro!");
    }
  }; */

  // Função para manipular os movimentos
  const handleMovements = async () => {
    if (selectedTerminal) {
      setLoadingMovements(true);
      await fetchAllKioskTransactionOnDevice(selectedTerminal.zktecoDeviceID);
      setLoadingMovements(false);
      setClearSelectionToggle((prev) => !prev);
    } else {
      toast.warn("Selecione um terminal primeiro!");
    }
  };

  // Função para excluir todos os utilizadores
  const handleDeleteAllUsers = async () => {
    if (selectedTerminal) {
      openConfirmModal(async () => {
        setLoadingDeleteAllUsers(true);
        await deleteAllUsersOnDevice(selectedTerminal.zktecoDeviceID, null);
        setLoadingDeleteAllUsers(false);
        setClearSelectionToggle((prev) => !prev);
      }, "Apagar todos os utilizadores no terminal marcado?");
    } else {
      toast.warn("Selecione um terminal primeiro!");
    }
  };

  // Função para reiniciar o dispositivo
  const handleRestartDevice = async () => {
    if (selectedTerminal) {
      setLoadingRestartDevice(true);
      await restartDevice(selectedTerminal.zktecoDeviceID);
      setLoadingRestartDevice(false);
      setClearSelectionToggle((prev) => !prev);
    } else if (selectedMBTerminal) {
      setLoadingRestartDevice(true);
      const tpId = selectedMBTerminal.id;
      const type = 1;
      const status = 0;
      const mbDevice = { tpId, type, status };
      await restartMBDevice(mbDevice);
      setLoadingRestartDevice(false);
    } else {
      toast.error("Selecione um terminal primeiro!");
    }
  };

  // Função para desligar o dispositivo multibanco
  const handleTurnOffDevice = async () => {
    if (selectedTerminal) {
      setLoadingTurnOffDevice(true);
      const tpId = selectedTerminal.id;
      const type = 2;
      const status = 0;
      const mbDevice = { tpId, type, status };
      await restartMBDevice(mbDevice);
      setLoadingTurnOffDevice(false);
    } else {
      toast.error("Selecione um terminal multibanco primeiro!");
    }
  };

  // Função para enviar o horário ao dispositivo
  const handleSendClock = async () => {
    if (selectedTerminal) {
      setLoadingSendClock(true);
      if (selectedTerminal?.serialNumber) {
        await sendClockToDevice(selectedTerminal.serialNumber);
      } else {
        console.error("Serial number is undefined");
      }
      setLoadingSendClock(false);
      setClearSelectionToggle((prev) => !prev);
    } else {
      toast.warn("Selecione um terminal primeiro!");
    }
  };

  // Função para abrir a porta ligada ao dispositivo
  const handleOpenDoor = async (sn: string, doorData: DoorDevice) => {
    await openDeviceDoor(sn, doorData);
    setLoadingOpenDoor(false);
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para sincronizar a hora
  const handleSyncTime = async () => {
    if (selectedTerminal) {
      setLoadingSyncTime(true);
      await syncTimeManuallyToDevice(selectedTerminal.zktecoDeviceID);
      setLoadingSyncTime(false);
      setClearSelectionToggle((prev) => !prev);
    } else {
      toast.warn("Selecione um terminal primeiro!");
    }
  };

  // Função para abrir o modal para escolher porta
  const openDoorModal = () => {
    if (selectedTerminal) {
      setShowDoorModal(true);
      setLoadingOpenDoor(true);
    } else {
      toast.warn("Selecione um terminal primeiro!");
    }
  };

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return deviceFields.filter((field) => selectedColumns.includes(field.key));
  };

  // Função para confirmar a ação nos botões após a abertura do modal de confirmação
  const handleConfirm = () => {
    if (confirmAction) confirmAction();
    setShowConfirmModal(false);
  };

  // Função para abrir o modal de confirmação
  const openConfirmModal = (action: () => void, message: string) => {
    setConfirmAction(() => action);
    setConfirmMessage(message);
    setShowConfirmModal(true);
  };

  // Controla o loading da tabela de dispositivos
  useEffect(() => {
    setDeviceLoading(true);

    const timeout = setTimeout(() => {
      setDeviceLoading(false);
    }, 500);

    if (filteredDeviceDataTable.length > 0) {
      clearTimeout(timeout);
      setDeviceLoading(false);
    }

    return () => clearTimeout(timeout);
  }, []);

  // Controla o loading da tabela de estado
  useEffect(() => {
    setStateLoading(true);

    const timeout = setTimeout(() => {
      setStateLoading(false);
    }, 500);

    if (filteredStateDataTable.length > 0) {
      clearTimeout(timeout);
      setStateLoading(false);
    }

    return () => clearTimeout(timeout);
  }, []);

  // Controla o loading da tabela de utilizadores no software
  useEffect(() => {
    setUserSoftwareLoading(true);

    const timeout = setTimeout(() => {
      setUserSoftwareLoading(false);
    }, 500);

    if (filteredUsersInSoftware.length > 0) {
      clearTimeout(timeout);
      setUserSoftwareLoading(false);
    }

    return () => clearTimeout(timeout);
  }, []);

  // Controla o loading da tabela de biometrias
  useEffect(() => {
    setBioLoading(true);

    const timeout = setTimeout(() => {
      setBioLoading(false);
    }, 500);

    if (filteredBioDataTable.length > 0) {
      clearTimeout(timeout);
      setBioLoading(false);
    }

    return () => clearTimeout(timeout);
  }, []);

  // Controla o loading da tabela de cartões
  useEffect(() => {
    setCardLoading(true);

    const timeout = setTimeout(() => {
      setCardLoading(false);
    }, 500);

    if (filteredCardDataTable.length > 0) {
      clearTimeout(timeout);
      setCardLoading(false);
    }

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <img
              style={{ width: 80, marginBottom: 20 }}
              src={warning}
              alt="alerta"
            />
            {confirmMessage || "Tem certeza que deseja prosseguir?"}
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f2f2f2" }}>
          <Button
            variant="outline-dark"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancelar
          </Button>
          <Button variant="outline-dark" onClick={handleConfirm}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="dashboard-container">
        <div className="filter-refresh-add-edit-upper-class">
          <div className="datatable-title-text" style={{ color: "#000000" }}>
            <span>Equipamentos</span>
          </div>
          <div className="datatable-header">
            <div>
              <SearchBoxContainer onSearch={(value) => setFilterText(value)} />
            </div>
            <div className="buttons-container-others" style={{ flexGrow: 1 }}>
              <OverlayTrigger
                placement="top"
                delay={0}
                container={document.body}
                popperConfig={{
                  strategy: "fixed",
                  modifiers: [
                    {
                      name: "preventOverflow",
                      options: {
                        boundary: "window",
                      },
                    },
                  ],
                }}
                overlay={
                  <Tooltip className="custom-tooltip">Atualizar</Tooltip>
                }
              >
                <CustomOutlineButton
                  icon="bi-arrow-clockwise"
                  onClick={refreshAll}
                />
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                delay={0}
                container={document.body}
                popperConfig={{
                  strategy: "fixed",
                  modifiers: [
                    {
                      name: "preventOverflow",
                      options: {
                        boundary: "window",
                      },
                    },
                  ],
                }}
                overlay={
                  <Tooltip className="custom-tooltip">Adicionar</Tooltip>
                }
              >
                <CustomOutlineButton
                  icon="bi-plus"
                  onClick={() => setShowAddModal(true)}
                  iconSize="1.1em"
                />
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                delay={0}
                container={document.body}
                popperConfig={{
                  strategy: "fixed",
                  modifiers: [
                    {
                      name: "preventOverflow",
                      options: {
                        boundary: "window",
                      },
                    },
                  ],
                }}
                overlay={<Tooltip className="custom-tooltip">Colunas</Tooltip>}
              >
                <CustomOutlineButton
                  icon="bi-eye"
                  onClick={() => setShowColumnSelector(true)}
                />
              </OverlayTrigger>
              <ExportButton
                allData={filteredDeviceDataTable}
                selectedData={
                  selectedDeviceRows.length > 0
                    ? selectedDeviceRows
                    : filteredDeviceDataTable
                }
                fields={getSelectedFields()}
              />
              <PrintButton
                data={
                  selectedDeviceRows.length > 0
                    ? selectedDeviceRows
                    : filteredDeviceDataTable
                }
                fields={getSelectedFields()}
              />
            </div>
          </div>
        </div>
        <div
          className="content-section deviceTabsMobile"
          style={{ display: "flex", flex: 1 }}
        >
          <div style={{ flex: 1.5 }} className="deviceMobile">
            {deviceLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                }}
              >
                <CustomSpinner />
              </div>
            ) : (
              <DataTable
                columns={[...deviceColumns, devicesActionColumn]}
                data={filteredDeviceDataTable}
                onRowDoubleClicked={handleEditDevices}
                pagination
                paginationPerPage={20}
                paginationRowsPerPageOptions={[20, 50]}
                paginationComponentOptions={paginationOptions}
                selectableRows
                selectableRowsSingle
                onSelectedRowsChange={handleDeviceRowSelected}
                selectableRowsHighlight
                noDataComponent="Não existem dados disponíveis para mostrar."
                customStyles={customStyles}
                striped
                responsive
                persistTableHead={true}
                defaultSortAsc={true}
                defaultSortFieldId="name"
              />
            )}
          </div>
          <div style={{ flex: 2, overflow: "auto" }}>
            <Tabs
              id="controlled-tab-terminals"
              activeKey={mainTabKey}
              onSelect={handleMainSelect}
              className="nav-modal"
              style={{ marginBottom: 10, marginTop: 0 }}
            >
              <Tab eventKey="tasks" title="Actividade">
                <div>
                  <p className="activityTabContent">Tarefas dos Equipamentos</p>
                  {selectedTerminal && selectedDeviceRows.length > 0 ? (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: 10,
                        }}
                      >
                        <div>
                          <Form.Group
                            controlId="refreshInterval"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Form.Label
                              style={{ marginBottom: 0, marginRight: 5 }}
                            >
                              Tempo entre atualizações:
                            </Form.Label>
                            <Form.Select
                              value={refreshIntervalTasks}
                              onChange={(e) =>
                                setRefreshIntervalTasks(Number(e.target.value))
                              }
                              className="form-control custom-select-font-size w-auto"
                            >
                              <option value={0}>Desligar</option>
                              <option value={5000}>5 segundos</option>
                              <option value={10000}>10 segundos</option>
                              <option value={20000}>20 segundos</option>
                            </Form.Select>
                          </Form.Group>
                        </div>
                        <div className="buttons-container-data-range">
                          <OverlayTrigger
                            placement="top"
                            delay={0}
                            container={document.body}
                            popperConfig={{
                              strategy: "fixed",
                              modifiers: [
                                {
                                  name: "preventOverflow",
                                  options: {
                                    boundary: "window",
                                  },
                                },
                              ],
                            }}
                            overlay={
                              <Tooltip className="custom-tooltip">
                                Movimentos Hoje
                              </Tooltip>
                            }
                          >
                            <CustomOutlineButton
                              icon="bi bi-calendar-event"
                              iconSize="1.1em"
                              onClick={fetchActivityToday}
                            />
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            delay={0}
                            container={document.body}
                            popperConfig={{
                              strategy: "fixed",
                              modifiers: [
                                {
                                  name: "preventOverflow",
                                  options: {
                                    boundary: "window",
                                  },
                                },
                              ],
                            }}
                            overlay={
                              <Tooltip className="custom-tooltip">
                                Movimentos Dia Anterior
                              </Tooltip>
                            }
                          >
                            <CustomOutlineButton
                              icon="bi bi-arrow-left-circle"
                              iconSize="1.1em"
                              onClick={fetchActivityForPreviousDay}
                            />
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            delay={0}
                            container={document.body}
                            popperConfig={{
                              strategy: "fixed",
                              modifiers: [
                                {
                                  name: "preventOverflow",
                                  options: {
                                    boundary: "window",
                                  },
                                },
                              ],
                            }}
                            overlay={
                              <Tooltip className="custom-tooltip">
                                Movimentos Dia Seguinte
                              </Tooltip>
                            }
                          >
                            <CustomOutlineButton
                              icon="bi bi-arrow-right-circle"
                              iconSize="1.1em"
                              onClick={fetchActivityForNextDay}
                            />
                          </OverlayTrigger>
                        </div>
                        <div
                          className="date-range-search"
                          style={{ margin: 0 }}
                        >
                          <input
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="search-input"
                          />
                          <span> até </span>
                          <input
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="search-input"
                          />
                          <OverlayTrigger
                            placement="top"
                            delay={0}
                            container={document.body}
                            popperConfig={{
                              strategy: "fixed",
                              modifiers: [
                                {
                                  name: "preventOverflow",
                                  options: {
                                    boundary: "window",
                                  },
                                },
                              ],
                            }}
                            overlay={
                              <Tooltip className="custom-tooltip">
                                Buscar
                              </Tooltip>
                            }
                          >
                            <CustomOutlineButton
                              icon="bi-search"
                              iconSize="1.1em"
                              onClick={fetchAllActivityBetweenDates}
                            />
                          </OverlayTrigger>
                        </div>
                      </div>
                      {loadingActivityData ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "200px",
                          }}
                        >
                          <CustomSpinner />
                        </div>
                      ) : (
                        <DataTable
                          columns={transactionColumns}
                          data={transactions}
                          pagination
                          paginationRowsPerPageOptions={[5, 10]}
                          paginationComponentOptions={paginationOptions}
                          selectableRows
                          selectableRowsSingle
                          noDataComponent="Não há actividades disponíveis para exibir."
                          customStyles={customStyles}
                          striped
                          responsive
                          persistTableHead={true}
                          defaultSortAsc={true}
                          defaultSortFieldId="createdDate"
                          paginationIconFirstPage={
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => handlePageChange(1)}
                            >
                              <i className="bi bi-chevron-double-left" />
                            </span>
                          }
                          paginationIconLastPage={
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handlePageChange(totalMovementPages)
                              }
                            >
                              <i className="bi bi-chevron-double-right" />
                            </span>
                          }
                          progressPending={loadingActivityData}
                          onChangePage={handlePageChange}
                          onChangeRowsPerPage={handleRowsPerPageChange}
                          paginationServer
                          paginationTotalRows={totalMovementRows}
                          paginationDefaultPage={currentPage}
                          paginationPerPage={perPage}
                        />
                      )}
                    </>
                  ) : (
                    <p style={{ textAlign: "center" }}>
                      Selecione um equipamento para ver as actividades.
                    </p>
                  )}
                </div>
                <div>
                  <p className="activityTabContent">
                    Movimentos dos Equipamentos
                  </p>
                  {selectedTerminal && selectedDeviceRows.length > 0 ? (
                    <>
                      {loadingMovementData ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "200px",
                          }}
                        >
                          <CustomSpinner />
                        </div>
                      ) : (
                        <DataTable
                          columns={movementColumns}
                          data={movements}
                          pagination
                          paginationPerPage={5}
                          paginationRowsPerPageOptions={[5, 10]}
                          paginationComponentOptions={paginationOptions}
                          selectableRows
                          selectableRowsSingle
                          noDataComponent="Não há movimentos disponíveis para exibir."
                          customStyles={customStyles}
                          striped
                          responsive
                          persistTableHead={true}
                          defaultSortAsc={true}
                          defaultSortFieldId="CreatedDate"
                        />
                      )}
                    </>
                  ) : (
                    <p style={{ textAlign: "center" }}>
                      Selecione um equipamento para ver os movimentos.
                    </p>
                  )}
                </div>
              </Tab>
              <Tab eventKey="user-track" title="Manutenção de utilizadores">
                <Tabs
                  id="controlled-tab-terminals-user-track"
                  activeKey={userTrackTabKey}
                  onSelect={handleUserTrackSelect}
                  className="nav-modal"
                  style={{ marginBottom: 10 }}
                >
                  <Tab
                    eventKey="users-software"
                    title="Utilizadores no software"
                  >
                    <div
                      style={{ display: "flex" }}
                      className="user-track-tab-mobile"
                    >
                      <div style={{ flex: 5 }}>
                        {userSoftwareLoading ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "200px",
                            }}
                          >
                            <CustomSpinner />
                          </div>
                        ) : (
                          <DataTable
                            columns={userColumns}
                            data={filteredUsersInSoftware}
                            pagination
                            paginationPerPage={20}
                            paginationRowsPerPageOptions={[20, 50]}
                            paginationComponentOptions={paginationOptions}
                            selectableRows
                            clearSelectedRows={clearSelectionToggle}
                            onSelectedRowsChange={handleUserRowSelected}
                            selectableRowsHighlight
                            noDataComponent="Não existem dados disponíveis para mostrar."
                            customStyles={customStyles}
                            striped
                            responsive
                            persistTableHead={true}
                            defaultSortAsc={true}
                            defaultSortFieldId="enrollNumber"
                          />
                        )}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          marginLeft: 10,
                        }}
                      >
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="button-terminals-users-track"
                          onClick={handleSendSelectedUsers}
                        >
                          {loadingSendSelectedUsers ? (
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            <i
                              className="bi bi-person-fill-up"
                              style={{ marginRight: 5, fontSize: "1rem" }}
                            ></i>
                          )}
                          Enviar utilizadores seleccionados
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="button-terminals-users-track"
                          onClick={handleDeleteSelectedUsers}
                        >
                          {loadingDeleteSelectedUsers ? (
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            <i
                              className="bi bi-person-x-fill"
                              style={{ marginRight: 5, fontSize: "1rem" }}
                            ></i>
                          )}
                          Remover utilizadores seleccionados
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="button-terminals-users-track"
                          onClick={handleFetchSelectedUsers}
                        >
                          {loadingFetchSelectedUsers ? (
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            <i
                              className="bi bi-person-fill-down"
                              style={{ marginRight: 5, fontSize: "1rem" }}
                            ></i>
                          )}
                          Recolher utilizadores seleccionados
                        </Button>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    eventKey="users-terminal"
                    title="Utilizadores no equipamento"
                  >
                    {userTerminalLoading ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "200px",
                        }}
                      >
                        <CustomSpinner />
                      </div>
                    ) : (
                      <DataTable
                        columns={employeeOnDeviceColumns}
                        data={filteredUsersInTerminal}
                        pagination
                        paginationPerPage={20}
                        paginationRowsPerPageOptions={[20, 50]}
                        paginationComponentOptions={paginationOptions}
                        selectableRows
                        clearSelectedRows={clearSelectionToggle}
                        onSelectedRowsChange={handleUserRowSelected}
                        selectableRowsHighlight
                        noDataComponent={
                          selectedTerminal
                            ? "Não há dados disponíveis para exibir."
                            : "Selecione um terminal para exibir os utilizadores."
                        }
                        customStyles={customStyles}
                        striped
                        responsive
                        persistTableHead={true}
                        defaultSortAsc={true}
                        defaultSortFieldId="pin"
                      />
                    )}
                  </Tab>
                  <Tab eventKey="facial-taken" title="Biometria recolhida">
                    {bioLoading ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "200px",
                        }}
                      >
                        <CustomSpinner />
                      </div>
                    ) : (
                      <DataTable
                        columns={bioColumns}
                        data={filteredBioDataTable}
                        pagination
                        paginationPerPage={20}
                        paginationRowsPerPageOptions={[20, 50]}
                        paginationComponentOptions={paginationOptions}
                        selectableRows
                        clearSelectedRows={clearSelectionToggle}
                        onSelectedRowsChange={handleUserRowSelected}
                        selectableRowsHighlight
                        noDataComponent="Não existem dados disponíveis para mostrar."
                        customStyles={customStyles}
                        striped
                        responsive
                        persistTableHead={true}
                        defaultSortAsc={true}
                        defaultSortFieldId="enrollNumber"
                      />
                    )}
                  </Tab>
                  <Tab eventKey="cards-taken" title="Cartões recolhidos">
                    {cardLoading ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "200px",
                        }}
                      >
                        <CustomSpinner />
                      </div>
                    ) : (
                      <DataTable
                        columns={cardColumns}
                        data={filteredCardDataTable}
                        pagination
                        paginationPerPage={20}
                        paginationRowsPerPageOptions={[20, 50]}
                        paginationComponentOptions={paginationOptions}
                        selectableRows
                        clearSelectedRows={clearSelectionToggle}
                        onSelectedRowsChange={handleUserRowSelected}
                        selectableRowsHighlight
                        noDataComponent="Não existem dados disponíveis para mostrar."
                        customStyles={customStyles}
                        striped
                        responsive
                        persistTableHead={true}
                        defaultSortAsc={true}
                        defaultSortFieldId="enrollNumber"
                      />
                    )}
                  </Tab>
                </Tabs>
              </Tab>
              <Tab eventKey="state" title="Estado">
                {stateLoading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "200px",
                    }}
                  >
                    <CustomSpinner />
                  </div>
                ) : (
                  <DataTable
                    columns={stateColumns}
                    data={filteredStateDataTable}
                    pagination
                    paginationPerPage={20}
                    paginationRowsPerPageOptions={[20, 50]}
                    paginationComponentOptions={paginationOptions}
                    selectableRows
                    selectableRowsSingle
                    onSelectedRowsChange={handleDeviceRowSelected}
                    selectableRowsHighlight
                    noDataComponent="Não existem dados disponíveis para mostrar."
                    customStyles={customStyles}
                    striped
                    responsive
                    persistTableHead={true}
                  />
                )}
              </Tab>
            </Tabs>
          </div>
        </div>
        <div>
          <Tabs
            id="controlled-tab-terminals-buttons"
            activeKey={userTabKey}
            onSelect={handleUserSelect}
            className="nav-modal"
            style={{ marginBottom: 10, marginTop: 10 }}
          >
            <Tab eventKey="users" title="Utilizadores">
              <div
                style={{
                  display: "flex",
                  marginTop: 10,
                  marginBottom: 10,
                  padding: 5,
                }}
                className="tabs-buttons-terminal"
              >
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="button-terminals-users"
                  onClick={handleUsers}
                >
                  {loadingUser ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="bi bi-arrow-down-circle"
                      style={{ marginRight: 5, fontSize: "1rem" }}
                    ></i>
                  )}
                  Recolher utilizadores
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="button-terminals-users"
                  onClick={handleAllUsers}
                >
                  {loadingAllUser ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="bi bi-arrow-up-circle"
                      style={{ marginRight: 5, fontSize: "1rem" }}
                    ></i>
                  )}
                  Enviar utilizadores
                </Button>
                {/* <Button
                  variant="outline-primary"
                  size="sm"
                  className="button-terminals-users"
                  onClick={handleSyncAllUsers}
                >
                  {loadingSyncAllUser ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="bi bi-arrow-repeat"
                      style={{ marginRight: 5, fontSize: "1rem" }}
                    ></i>
                  )}
                  Sincronizar utilizadores
                </Button> */}
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="button-terminals-users"
                  onClick={handleMovements}
                >
                  {loadingMovements ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="bi bi-arrow-left-right"
                      style={{ marginRight: 5, fontSize: "1rem" }}
                    ></i>
                  )}
                  Recolher movimentos
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="button-terminals-users"
                  onClick={handleDeleteAllUsers}
                >
                  {loadingDeleteAllUsers ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="bi bi-trash"
                      style={{ marginRight: 5, fontSize: "1rem" }}
                    ></i>
                  )}
                  Apagar utilizadores
                </Button>
                <div className="col-3">
                  <Form.Check
                    type="checkbox"
                    label="Utilizadores"
                    checked={showAllUsers}
                    onChange={handleAllUsersChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Biometria digital"
                    checked={showFingerprintUsers}
                    onChange={handleFingerprintUsersChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Biometria facial"
                    checked={showFacialRecognitionUsers}
                    onChange={handleFacialRecognitionUsersChange}
                  />
                </div>
              </div>
            </Tab>
            <Tab eventKey="onOff" title="Ligação">
              <div
                style={{
                  display: "flex",
                  marginTop: 10,
                  marginBottom: 10,
                  padding: 5,
                }}
                className="tabs-buttons-terminal"
              >
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="button-terminals-users"
                  onClick={handleRestartDevice}
                >
                  {loadingRestartDevice ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="bi bi-bootstrap-reboot"
                      style={{ marginRight: 5, fontSize: "1rem" }}
                    ></i>
                  )}
                  Reiniciar Terminal
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="button-terminals-users"
                  onClick={handleTurnOffDevice}
                >
                  {loadingTurnOffDevice ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="bi bi-power"
                      style={{ marginRight: 5, fontSize: "1rem" }}
                    ></i>
                  )}
                  Executar Fecho
                </Button>
              </div>
            </Tab>
            <Tab eventKey="access" title="Acessos">
              <div
                style={{
                  display: "flex",
                  marginTop: 10,
                  marginBottom: 10,
                  padding: 5,
                }}
                className="tabs-buttons-terminal"
              >
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="button-terminals-users"
                  onClick={handleSendClock}
                >
                  {loadingSendClock ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="bi bi-clock-history"
                      style={{ marginRight: 4, fontSize: "1rem" }}
                    ></i>
                  )}
                  Enviar horários
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="button-terminals-users"
                  onClick={openDoorModal}
                >
                  {loadingOpenDoor ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="bi bi-door-open"
                      style={{ marginRight: 5, fontSize: "1rem" }}
                    ></i>
                  )}
                  Abrir porta
                </Button>
                {/* <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                    <i className="bi bi-pc" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    Actualizar multiverificação
                                </Button> */}
              </div>
            </Tab>
            <Tab eventKey="configuration" title="Configurações">
              <div
                style={{
                  display: "flex",
                  marginTop: 10,
                  marginBottom: 10,
                  padding: 5,
                }}
                className="tabs-buttons-terminal"
              >
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="button-terminals-users"
                  onClick={handleSyncTime}
                >
                  {loadingSyncTime ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="bi bi-calendar-check"
                      style={{ marginRight: 5, fontSize: "1rem" }}
                    ></i>
                  )}
                  Acertar a hora
                </Button>
                {/* <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                    <i className="bi bi-gear-wide" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    Enviar configurações
                                </Button> */}
                {/* <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                    <i className="bi bi-send-arrow-up" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    Enviar códigos de tarefas
                                </Button> */}
                {/* <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                    <i className="bi bi-bell" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    Sincronizar toques da sirene
                                </Button> */}
              </div>
            </Tab>
            <Tab eventKey="files" title="Ficheiros">
              <div
                style={{
                  display: "flex",
                  marginTop: 10,
                  marginBottom: 10,
                  padding: 5,
                }}
                className="tabs-buttons-terminal"
              >
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="button-terminals-users"
                  onClick={triggerFileAttendanceSelectPopup}
                >
                  {loadingImportAttendance ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="bi bi-arrow-bar-down"
                      style={{ marginRight: 5, fontSize: "1rem" }}
                    ></i>
                  )}
                  Importar movimentos
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="button-terminals-users"
                  onClick={triggerFileUserSelectPopup}
                >
                  {loadingImportUsers ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="bi bi-person-fill-down"
                      style={{ marginRight: 5, fontSize: "1rem" }}
                    ></i>
                  )}
                  Importar utilizadores
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="button-terminals-users"
                  onClick={triggerFileFPSelectPopup}
                >
                  {loadingImportBio ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="bi bi-fingerprint"
                      style={{ marginRight: 5, fontSize: "1rem" }}
                    ></i>
                  )}
                  Importar biometria digital
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="button-terminals-users"
                  onClick={triggerFileFaceSelectPopup}
                >
                  {loadingImportFace ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="bi bi-person-square"
                      style={{ marginRight: 5, fontSize: "1rem" }}
                    ></i>
                  )}
                  Importar biometria Facial
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="button-terminals-users"
                  onClick={triggerFileAttendanceLogSelectPopup}
                >
                  {loadingImportAttendanceLog ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="bi bi-file-arrow-down"
                      style={{ marginRight: 5, fontSize: "1rem" }}
                    ></i>
                  )}
                  Importar movimentos do log
                </Button>
              </div>
            </Tab>
          </Tabs>
        </div>
        {showColumnSelector && (
          <ColumnSelectorModal
            columns={allDeviceFields.filter(
              (field) =>
                field.key !== "estadoTerminal" &&
                field.key !== "modelo" &&
                field.key !== "nomeQuiosque"
            )}
            selectedColumns={selectedColumns}
            onClose={() => setShowColumnSelector(false)}
            onColumnToggle={handleColumnToggle}
            onResetColumns={handleResetColumns}
            onSelectAllColumns={handleSelectAllColumns}
          />
        )}
        <CreateModalDevices
          title="Adicionar Equipamentos"
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onDeviceSave={addDevice}
          onMBSave={addMBDevice}
          fields={allDeviceFields}
          initialValues={initialData || {}}
        />
        {selectedDevice && (
          <UpdateModalDevices
            open={showUpdateModal}
            onClose={() => setShowUpdateModal(false)}
            onDuplicate={handleDuplicate}
            onDeviceUpdate={updateDevice}
            onMBUpdate={updateMBDevice}
            entity={{
              ...selectedDevice,
              id: selectedDevice?.zktecoDeviceID || selectedDevice?.id,
            }}
            fields={allDeviceFields}
            title="Atualizar Equipamentos"
            onPrev={handlePrevDevice}
            onNext={handleNextDevice}
            canMovePrev={currentDeviceIndex > 0}
            canMoveNext={currentDeviceIndex < devices.length - 1}
          />
        )}
        {showDeleteModal && (
          <DeleteModal
            open={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onDelete={deleteDevice}
            entityId={selectedDeviceToDelete}
            message={<>Apagar o terminal selecionado?</>}
          />
        )}
        {showDeleteMBModal && (
          <DeleteModal
            open={showDeleteMBModal}
            onClose={() => setShowDeleteMBModal(false)}
            onDelete={deleteMBDevice}
            entityId={selectedDeviceMBToDelete}
            message={<>Apagar o terminal multibanco selecionado?</>}
          />
        )}
        {selectedTerminal && (
          <DoorModal
            title="Escolha a Porta para Abrir"
            open={showDoorModal}
            onClose={() => {
              setShowDoorModal(false);
              setLoadingOpenDoor(false);
            }}
            onSave={(data) =>
              data.serialNumber && handleOpenDoor(data.serialNumber, data)
            }
            entity={{
              ...selectedTerminal,
              id: selectedTerminal?.zktecoDeviceID || "",
            }}
            fields={doorFields}
          />
        )}
        {selectedEmployee && (
          <UpdateModalEmployees
            open={showEditModal}
            onClose={() => setShowEditModal(false)}
            onUpdate={updateEmployeeAndCard}
            entity={selectedEmployee}
            fields={employeeFields}
            title="Atualizar Funcionário"
          />
        )}
        <input
          type="file"
          accept=".dat,.txt"
          ref={fileInputAttendanceRef}
          style={{ display: "none" }}
          onChange={handleAttendanceFileChange}
        />
        <input
          type="file"
          accept=".dat,.txt"
          ref={fileInputUserRef}
          style={{ display: "none" }}
          onChange={handleUserFileChange}
        />
        <input
          type="file"
          accept=".fp10"
          ref={fileInputFPRef}
          style={{ display: "none" }}
          onChange={handleFPFileChange}
        />
        <input
          type="file"
          accept=".dat"
          ref={fileInputFaceRef}
          style={{ display: "none" }}
          onChange={handleFaceFileChange}
        />
      </div>
    </>
  );
};
