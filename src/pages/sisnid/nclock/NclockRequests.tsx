import { useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Split from "react-split";
import { toast } from "react-toastify";

import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";
import { PrintButton } from "../../../components/PrintButton";
import { SelectFilter } from "../../../components/SelectFilter";
import { TreeViewDataNclock } from "../../../components/TreeViewNclock";
import {
  employeeAttendanceTimesFields,
  employeeFields,
} from "../../../fields/Fields";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { CreateModalAttendance } from "../../../modals/CreateModalAttendance";
import { DeleteModal } from "../../../modals/DeleteModal";
import { UpdateModalAttendance } from "../../../modals/UpdateModalAttendance";
import { Employee, EmployeeAttendanceTimes } from "../../../types/Types";

import * as apiService from "../../../api/apiService";
import "../../../css/PagesStyles.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { UpdateModalEmployees } from "../../../modals/UpdateModalEmployees";

import { usePersons } from "../../../context/PersonsContext";
import { useAttendance } from "../../../context/AttendanceContext";
import { SearchBoxContainer } from "../../../components/SearchBoxContainer";
import { CustomSpinner } from "../../../components/CustomSpinner";
import { useMediaQuery } from "react-responsive";

// Define a interface para os filtros
interface Filters {
  [key: string]: string;
}

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T00:00`;
};

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T23:59`;
};

// Formata a data para DD/MM/YYYY
const formatDateDDMMYYYY = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Define a página de pedidos
export const NclockRequests = () => {
  const {
    attendance,
    setAttendance,
    attendanceNoPagination,
    fetchAllAttendances,
    handleAddAttendance,
    handleUpdateAttendance,
    handleDeleteAttendance,
    attendanceTotalPages,
    attendanceTotalRecords,
  } = useAttendance();
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);
  const { disabledEmployeesNoPagination, handleUpdateEmployee } = usePersons();
  const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
  const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
  const [selectedAttendances, setSelectedAttendances] = useState<
    EmployeeAttendanceTimes[]
  >([]);
  const [showAddAttendanceModal, setShowAddAttendanceModal] = useState(false);
  const [showUpdateAttendanceModal, setShowUpdateAttendanceModal] =
    useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "employeeName",
    "enrollNumber",
    "observation",
    "attendanceTime",
  ]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [resetSelection, setResetSelection] = useState(false);
  const [selectedRows, setSelectedRows] = useState<EmployeeAttendanceTimes[]>(
    []
  );
  const [filterText, setFilterText] = useState("");
  const [selectedAttendanceToDelete, setSelectedAttendanceToDelete] = useState<
    string | null
  >(null);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [initialData, setInitialData] = useState<
    Partial<EmployeeAttendanceTimes>
  >({});
  const [currentAttendanceIndex, setCurrentAttendanceIndex] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const [perPage, setPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  // Função para buscar os dados da paginação
  const fetchPaginationRequests = async (pageNo: string, perPage: string) => {
    setLoading(true);
    try {
      const data = await apiService.fetchAllAttendances(
        3,
        pageNo,
        perPage,
        undefined,
        undefined,
        undefined
      );
      setAttendance(data.data);
      setTotalRows(data.totalRecords);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar pedidos paginados:", error);
      setLoading(false);
    }
  };

  // Função para buscar todos os pedidos entre datas
  const fetchRequestsBetweenDates = async () => {
    try {
      const data = await apiService.fetchAllAttendances(
        3,
        undefined,
        undefined,
        undefined,
        startDate,
        endDate
      );
      setAttendance(data.data);
      setTotalRows(data.totalRecords);
    } catch (error) {
      console.error("Erro ao buscar pedidos entre datas:", error);
    }
  };

  // Função para buscar os pedidos de hoje
  const fetchRequestsToday = async () => {
    const today = new Date();
    const start = formatDateToStartOfDay(today);
    const end = formatDateToEndOfDay(today);
    if (selectedEmployeeIds.length > 0) {
      try {
        const data = await apiService.fetchAllAttendances(
          3,
          undefined,
          undefined,
          selectedEmployeeIds,
          start,
          end
        );
        setAttendance(data.data);
        setTotalRows(data.totalRecords);
      } catch (error) {
        console.error("Erro ao buscar pedidos hoje:", error);
      }
    } else {
      try {
        const data = await apiService.fetchAllAttendances(
          3,
          undefined,
          undefined,
          undefined,
          start,
          end
        );
        setAttendance(data.data);
        setTotalRows(data.totalRecords);
      } catch (error) {
        console.error("Erro ao buscar pedidos hoje:", error);
      }
    }
    setStartDate(start);
    setEndDate(end);
  };

  // Função para buscar os pedidos de ontem
  const fetchRequestsForPreviousDay = async () => {
    const prevDate = new Date(startDate);
    prevDate.setDate(prevDate.getDate() - 1);

    const start = formatDateToStartOfDay(prevDate);
    const end = formatDateToEndOfDay(prevDate);

    if (selectedEmployeeIds.length > 0) {
      try {
        const data = await apiService.fetchAllAttendances(
          3,
          undefined,
          undefined,
          selectedEmployeeIds,
          start,
          end
        );
        setAttendance(data.data);
        setTotalRows(data.totalRecords);
      } catch (error) {
        console.error("Erro ao buscar pedidos ontem:", error);
      }
    } else {
      try {
        const data = await apiService.fetchAllAttendances(
          3,
          undefined,
          undefined,
          undefined,
          start,
          end
        );
        setAttendance(data.data);
        setTotalRows(data.totalRecords);
      } catch (error) {
        console.error("Erro ao buscar pedidos ontem:", error);
      }
    }
    setStartDate(start);
    setEndDate(end);
  };

  // Função para buscar os pedidos de amanhã
  const fetchRequestsForNextDay = async () => {
    const newDate = new Date(endDate);
    newDate.setDate(newDate.getDate() + 1);

    if (newDate > new Date()) {
      return;
    }

    const start = formatDateToStartOfDay(newDate);
    const end = formatDateToEndOfDay(newDate);

    if (selectedEmployeeIds.length > 0) {
      try {
        const data = await apiService.fetchAllAttendances(
          ~3,
          undefined,
          undefined,
          selectedEmployeeIds,
          start,
          end
        );
        setAttendance(data.data);
        setTotalRows(data.totalRecords);
      } catch (error) {
        console.error("Erro ao buscar pedidos amanhã:", error);
      }
    } else {
      try {
        const data = await apiService.fetchAllAttendances(
          3,
          undefined,
          undefined,
          undefined,
          start,
          end
        );
        setAttendance(data.data);
        setTotalRows(data.totalRecords);
      } catch (error) {
        console.error("Erro ao buscar pedidos amanhã:", error);
      }
    }
    setStartDate(start);
    setEndDate(end);
  };

  // Função para adicionar um movimento
  const addAttendance = async (attendance: EmployeeAttendanceTimes) => {
    await handleAddAttendance(attendance);
    refreshAttendance();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para atualizar um movimento
  const updateAttendance = async (attendance: EmployeeAttendanceTimes) => {
    await handleUpdateAttendance(attendance);
    refreshAttendance();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para deletar um movimento
  const deleteAttendance = async (attendanceTimeId: string) => {
    await handleDeleteAttendance(attendanceTimeId);
    refreshAttendance();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para atualizar um funcionário e um cartão
  const updateEmployeeAndCard = async (employee: Employee) => {
    await handleUpdateEmployee(employee);
    refreshAttendance();
    setClearSelectionToggle((prev) => !prev);
  };

  // Busca os dados se a paginação mudar
  useEffect(() => {
    fetchPaginationRequests(String(currentPage), String(perPage));
  }, [currentPage, perPage]);

  // Busca os dados conforme o filtro de data mudar
  useEffect(() => {
    if (startDate && endDate) {
      fetchRequestsBetweenDates();
    }
  }, [startDate, endDate]);

  // Atualiza a seleção ao resetar
  useEffect(() => {
    if (resetSelection) {
      setResetSelection(false);
    }
  }, [resetSelection]);

  // Define a seleção de funcionários
  const handleSelectFromTreeView = async (selectedIds: string[]) => {
    setSelectedEmployeeIds(selectedIds);

    if (selectedIds.length > 0) {
      try {
        const foundEmployees = await apiService.fetchAllAttendances(
          3,
          undefined,
          undefined,
          selectedIds,
          undefined,
          undefined
        );
        if (foundEmployees.data) {
          setAttendance(
            foundEmployees.data.filter((item: any) => item.type === 3)
          );
          setTotalRows(foundEmployees.totalRecords);
        } else {
          setAttendance([]);
        }
      } catch (error) {
        console.error("Erro ao buscar funcionários por número:", error);
      }
    } else {
      refreshAttendance();
      setAttendance(attendance);
    }
  };

  // Callback disparado ao mudar a página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Callback disparado ao mudar o tamanho da página
  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
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
    const allColumnKeys = employeeAttendanceTimesFields.map(
      (field) => field.key
    );
    setSelectedColumns(allColumnKeys);
  };

  // Função para resetar as colunas
  const handleResetColumns = () => {
    setSelectedColumns([
      "employeeName",
      "enrollNumber",
      "observation",
      "attendanceTime",
    ]);
  };

  // Função para atualizar os funcionários
  const refreshAttendance = () => {
    fetchAllAttendances(3, "1", "20", undefined, undefined, undefined);
    setTotalRows(attendanceTotalRecords);
    setCurrentPage(1);
    setPerPage(20);
    setStartDate(formatDateToStartOfDay(pastDate));
    setEndDate(formatDateToEndOfDay(currentDate));
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para abrir o modal de adição de assiduidade
  const handleOpenAddAttendanceModal = () => {
    if (selectedEmployeeIds.length > 0) {
      setInitialData({
        ...initialData,
        selectedEmployeeIds: selectedEmployeeIds[0],
      });
      setShowAddAttendanceModal(true);
    } else {
      toast.warn("Selecione um funcionário primeiro!");
    }
  };

  // Seleciona a assiduidade anterior
  const handleNextAttendance = () => {
    if (currentAttendanceIndex < attendance.length - 1) {
      setCurrentAttendanceIndex(currentAttendanceIndex + 1);
      setSelectedAttendances([attendance[currentAttendanceIndex + 1]]);
    }
  };

  // Seleciona a assiduidade seguinte
  const handlePrevDepartment = () => {
    if (currentAttendanceIndex > 0) {
      setCurrentAttendanceIndex(currentAttendanceIndex - 1);
      setSelectedAttendances([attendance[currentAttendanceIndex - 1]]);
    }
  };

  // Remove o campo de número, nome, modo de entrada/saída e tipo
  const filteredColumns = employeeAttendanceTimesFields.filter(
    (field) =>
      field.key !== "employeeId" &&
      field.key !== "inOutMode" &&
      field.key !== "type" &&
      field.key !== "deviceNumber" &&
      field.key !== "deviceId" &&
      field.key !== "verifyMode" &&
      field.key !== "workCode"
  );

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
    if (!Array.isArray(attendance)) {
      return [];
    }

    const applyFilter = (list: EmployeeAttendanceTimes[]) => {
      return list.filter(
        (item) =>
          Object.keys(filters).every((key) => {
            if (filters[key] === "") return true;
            return (
              item[key] != null &&
              String(item[key])
                .toLowerCase()
                .includes(filters[key].toLowerCase())
            );
          }) &&
          Object.entries(item).some(([key, value]) => {
            if (selectedColumns.includes(key) && value != null) {
              if (key === "attendanceTime") {
                const date = new Date(value);
                const formatted = formatDateDDMMYYYY(date);
                return formatted
                  .toLowerCase()
                  .includes(filterText.toLowerCase());
              } else if (value instanceof Date) {
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
    };

    if (filterText.trim() === "") {
      return applyFilter(attendance);
    }

    if (Array.isArray(attendanceNoPagination)) {
      const filteredFull = applyFilter(attendanceNoPagination);
      const combined = [...applyFilter(attendance), ...filteredFull];
      const seen = new Set<string>();
      const deduplicated: EmployeeAttendanceTimes[] = [];
      for (const item of combined) {
        const key = `${item.employeeId}-${item.deviceId}-${item.attendanceTime}`;
        if (!seen.has(key)) {
          seen.add(key);
          deduplicated.push(item);
        }
      }
      return deduplicated;
    }

    return applyFilter(attendance);
  }, [
    attendance,
    attendanceNoPagination,
    filters,
    filterText,
    selectedColumns,
  ]);

  // Define os dados iniciais ao duplicar
  const handleDuplicate = (attendance: Partial<EmployeeAttendanceTimes>) => {
    setInitialData(attendance);
    setShowAddAttendanceModal(true);
  };

  // Função para abrir o modal de edição
  const handleOpenEditModal = (person: EmployeeAttendanceTimes) => {
    const employeeDetails = disabledEmployeesNoPagination.find(
      (emp) => emp.employeeID === person.employeeId
    );
    if (employeeDetails) {
      setSelectedEmployee(employeeDetails);
      setShowEditModal(true);
    } else {
      console.error("Funcionário não encontrado:", person.employeeName);
    }
  };

  // Define as colunas
  const columns: TableColumn<EmployeeAttendanceTimes>[] =
    employeeAttendanceTimesFields
      .filter((field) => selectedColumns.includes(field.key))
      .map((field) => {
        if (field.key === "employeeName") {
          return {
            ...field,
            name: (
              <>
                {field.label}
                <SelectFilter
                  column={field.key}
                  setFilters={setFilters}
                  data={attendance}
                />
              </>
            ),
            cell: (row: EmployeeAttendanceTimes) => (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleOpenEditModal(row)}
              >
                {row.employeeName}
              </div>
            ),
          };
        }
        const formatField = (row: EmployeeAttendanceTimes) => {
          switch (field.key) {
            case "attendanceTime":
              return new Date(row.attendanceTime).toLocaleString() || "";
            case "inOutMode":
              switch (row[field.key]) {
                case 0:
                  return "Entrada";
                case 1:
                  return "Saída";
                case 2:
                  return "Pausa - Entrada";
                case 3:
                  return "Pausa - Saída";
                case 4:
                  return "Hora Extra - Entrada";
                case 5:
                  return "Hora Extra - Saída";
                default:
                  return "";
              }
            default:
              return row[field.key];
          }
        };
        return {
          id: field.key,
          name: (
            <>
              {field.label}
              {field.key !== "attendanceTime" && (
                <SelectFilter
                  column={field.key}
                  setFilters={setFilters}
                  data={filteredDataTable}
                />
              )}
            </>
          ),
          selector: (row) => formatField(row),
          sortable: true,
          sortFunction: (rowA, rowB) =>
            new Date(rowB.attendanceTime).getTime() -
            new Date(rowA.attendanceTime).getTime(),
        };
      });

  // Define as opções de paginação de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Define a função selecionar uma linha
  const handleRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: EmployeeAttendanceTimes[];
  }) => {
    setSelectedRows(state.selectedRows);
  };

  // Define a função de abertura do modal de edição
  const handleEditAssiduity = (row: EmployeeAttendanceTimes[]) => {
    setSelectedAttendances(row);
    setShowUpdateAttendanceModal(true);
  };

  // Define a função de abertura do modal de exclusão
  const handleOpenDeleteModal = (employeeId: string) => {
    setSelectedAttendanceToDelete(employeeId);
    setShowDeleteModal(true);
  };

  // Define as colunas de ação
  const actionColumn: TableColumn<EmployeeAttendanceTimes> = {
    name: "Ações",
    cell: (row: EmployeeAttendanceTimes) => (
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
            onClick={() => handleEditAssiduity([row])}
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
            onClick={() => handleOpenDeleteModal(row.attendanceTimeId)}
          />
        </OverlayTrigger>
      </div>
    ),
    selector: (row: EmployeeAttendanceTimes) => row.employeeID,
    ignoreRowClick: true,
  };

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return employeeAttendanceTimesFields.filter((field) =>
      selectedColumns.includes(field.key)
    );
  };

  // Controla o loading da tabela
  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    if (filteredDataTable.length > 0) {
      clearTimeout(timeout);
      setLoading(false);
    }

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="main-container">
      <div className="content-container">
        {isMobile && (
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span>Pedidos</span>
            </div>
            <div className="datatable-header">
              <div>
                <SearchBoxContainer
                  onSearch={(value) => setFilterText(value)}
                />
              </div>
              <div className="buttons-container">
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
                    onClick={refreshAttendance}
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
                  overlay={
                    <Tooltip className="custom-tooltip">Adicionar</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-plus"
                    onClick={handleOpenAddAttendanceModal}
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
                  overlay={
                    <Tooltip className="custom-tooltip">Colunas</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-eye"
                    onClick={() => setShowColumnSelector(true)}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
                <ExportButton
                  allData={filteredDataTable}
                  selectedData={
                    selectedRows.length > 0 ? selectedRows : filteredDataTable
                  }
                  fields={getSelectedFields()}
                />
                <PrintButton
                  data={
                    selectedRows.length > 0 ? selectedRows : filteredDataTable
                  }
                  fields={getSelectedFields()}
                />
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
                    <Tooltip className="custom-tooltip">Pedidos Hoje</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-calendar-event"
                    onClick={fetchRequestsToday}
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
                  overlay={
                    <Tooltip className="custom-tooltip">
                      Pedidos Dia Anterior
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-left-circle"
                    onClick={fetchRequestsForPreviousDay}
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
                  overlay={
                    <Tooltip className="custom-tooltip">
                      Pedidos Dia Seguinte
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-right-circle"
                    onClick={fetchRequestsForNextDay}
                    iconSize="1.1em"
                    disabled={
                      new Date(endDate) >=
                      new Date(new Date().toISOString().substring(0, 10))
                    }
                  />
                </OverlayTrigger>
              </div>
              <div className="date-range-search">
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
                  overlay={<Tooltip className="custom-tooltip">Buscar</Tooltip>}
                >
                  <CustomOutlineButton
                    icon="bi-search"
                    onClick={fetchRequestsBetweenDates}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
              </div>
            </div>
            <div className="content-wrapper">
              <div className="table-css">
                {loading ? (
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
                    columns={[...columns, actionColumn]}
                    data={filteredDataTable}
                    onRowDoubleClicked={(row) => {
                      setSelectedAttendances([row]);
                      setShowUpdateAttendanceModal(true);
                    }}
                    pagination
                    paginationComponentOptions={paginationOptions}
                    selectableRows
                    paginationRowsPerPageOptions={[20, 50]}
                    onSelectedRowsChange={handleRowSelected}
                    clearSelectedRows={clearSelectionToggle}
                    selectableRowsHighlight
                    noDataComponent="Não existem dados disponíveis para mostrar."
                    customStyles={customStyles}
                    striped
                    responsive
                    persistTableHead={true}
                    defaultSortAsc={true}
                    defaultSortFieldId="attendanceTime"
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
                        onClick={() => handlePageChange(attendanceTotalPages)}
                      >
                        <i className="bi bi-chevron-double-right" />
                      </span>
                    }
                    progressPending={loading}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    paginationServer
                    paginationTotalRows={totalRows}
                    paginationDefaultPage={currentPage}
                    paginationPerPage={perPage}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        <Split
          className="split"
          sizes={[15, 85]}
          minSize={100}
          expandToMin={true}
          gutterSize={15}
          gutterAlign="center"
          snapOffset={0}
          dragInterval={1}
        >
          <div
            className={`treeview-container ${
              perPage >= 50 ? "treeview-container-full-height" : ""
            }`}
          >
            <TreeViewDataNclock onSelectEmployees={handleSelectFromTreeView} />
          </div>
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span>Pedidos</span>
            </div>
            <div className="datatable-header">
              <div>
                <SearchBoxContainer
                  onSearch={(value) => setFilterText(value)}
                />
              </div>
              <div className="buttons-container">
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
                    onClick={refreshAttendance}
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
                  overlay={
                    <Tooltip className="custom-tooltip">Adicionar</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-plus"
                    onClick={handleOpenAddAttendanceModal}
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
                  overlay={
                    <Tooltip className="custom-tooltip">Colunas</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-eye"
                    onClick={() => setShowColumnSelector(true)}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
                <ExportButton
                  allData={filteredDataTable}
                  selectedData={
                    selectedRows.length > 0 ? selectedRows : filteredDataTable
                  }
                  fields={getSelectedFields()}
                />
                <PrintButton
                  data={
                    selectedRows.length > 0 ? selectedRows : filteredDataTable
                  }
                  fields={getSelectedFields()}
                />
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
                    <Tooltip className="custom-tooltip">Pedidos Hoje</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-calendar-event"
                    onClick={fetchRequestsToday}
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
                  overlay={
                    <Tooltip className="custom-tooltip">
                      Pedidos Dia Anterior
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-left-circle"
                    onClick={fetchRequestsForPreviousDay}
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
                  overlay={
                    <Tooltip className="custom-tooltip">
                      Pedidos Dia Seguinte
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-right-circle"
                    onClick={fetchRequestsForNextDay}
                    iconSize="1.1em"
                    disabled={
                      new Date(endDate) >=
                      new Date(new Date().toISOString().substring(0, 10))
                    }
                  />
                </OverlayTrigger>
              </div>
              <div className="date-range-search">
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
                  overlay={<Tooltip className="custom-tooltip">Buscar</Tooltip>}
                >
                  <CustomOutlineButton
                    icon="bi-search"
                    onClick={fetchRequestsBetweenDates}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
              </div>
            </div>
            <div className="content-wrapper">
              <div className="table-css">
                {loading ? (
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
                    columns={[...columns, actionColumn]}
                    data={filteredDataTable}
                    onRowDoubleClicked={(row) => {
                      setSelectedAttendances([row]);
                      setShowUpdateAttendanceModal(true);
                    }}
                    pagination
                    paginationComponentOptions={paginationOptions}
                    selectableRows
                    paginationRowsPerPageOptions={[20, 50]}
                    onSelectedRowsChange={handleRowSelected}
                    clearSelectedRows={clearSelectionToggle}
                    selectableRowsHighlight
                    noDataComponent="Não existem dados disponíveis para mostrar."
                    customStyles={customStyles}
                    striped
                    responsive
                    persistTableHead={true}
                    defaultSortAsc={true}
                    defaultSortFieldId="attendanceTime"
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
                        onClick={() => handlePageChange(attendanceTotalPages)}
                      >
                        <i className="bi bi-chevron-double-right" />
                      </span>
                    }
                    progressPending={loading}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    paginationServer
                    paginationTotalRows={totalRows}
                    paginationDefaultPage={currentPage}
                    paginationPerPage={perPage}
                  />
                )}
              </div>
            </div>
          </div>
        </Split>
      </div>
      {showAddAttendanceModal && (
        <CreateModalAttendance
          open={showAddAttendanceModal}
          onClose={() => setShowAddAttendanceModal(false)}
          onSave={addAttendance}
          title="Adicionar Pedido de Assiduidade"
          fields={employeeAttendanceTimesFields}
          initialValues={initialData}
          entityType="pedidos"
        />
      )}
      {selectedAttendances.length > 0 && showUpdateAttendanceModal && (
        <UpdateModalAttendance
          open={showUpdateAttendanceModal}
          onClose={() => setShowUpdateAttendanceModal(false)}
          onUpdate={updateAttendance}
          entity={selectedAttendances[0]}
          fields={employeeAttendanceTimesFields}
          onDuplicate={handleDuplicate}
          title="Atualizar Assiduidade"
          entityType="pedidos"
          onNext={handlePrevDepartment}
          onPrev={handleNextAttendance}
          canMoveNext={currentAttendanceIndex > 0}
          canMovePrev={currentAttendanceIndex < attendance.length - 1}
        />
      )}
      {selectedAttendanceToDelete && showDeleteModal && (
        <DeleteModal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={deleteAttendance}
          entityId={selectedAttendanceToDelete}
        />
      )}
      {showColumnSelector && (
        <ColumnSelectorModal
          columns={filteredColumns}
          selectedColumns={selectedColumns}
          onClose={() => setShowColumnSelector(false)}
          onColumnToggle={handleColumnToggle}
          onResetColumns={handleResetColumns}
          onSelectAllColumns={handleSelectAllColumns}
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
    </div>
  );
};
