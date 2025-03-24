import { useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Split from "react-split";
import { toast } from "react-toastify";

import * as apiService from "../../../api/apiService";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";
import { PrintButton } from "../../../components/PrintButton";
import { SelectFilter } from "../../../components/SelectFilter";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";

import "../../../css/PagesStyles.css";
import { Nav, OverlayTrigger, Tab, Tooltip } from "react-bootstrap";

import { useAttendance } from "../../../context/MovementContext";

import { usePersons } from "../../../context/PersonsContext";
import { CreateModalAccess } from "../../../modals/CreateModalAccess";
import { UpdateModalEmployees } from "../../../modals/UpdateModalEmployees";

import { Accesses, Employee } from "../../../types/Types";
import { accessesFields, employeeFields } from "../../../fields/Fields";
import { TreeViewDataNaccess } from "../../../components/TreeViewNaccess";
import { SearchBoxContainer } from "../../../components/SearchBoxContainer";
import { CustomSpinner } from "../../../components/CustomSpinner";
import { useMediaQuery } from "react-responsive";
import { se } from "date-fns/locale";

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

// Define a função para unificar as chaves
function unifyKeys(item: any): Accesses {
  const newItem = { ...item };

  if ("CardNo" in newItem) {
    newItem.cardNo = newItem.CardNo;
    delete newItem.CardNo;
  }
  if ("NameUser" in newItem) {
    newItem.nameUser = newItem.NameUser;
    delete newItem.NameUser;
  }
  if ("DeviceSN" in newItem) {
    newItem.deviceSN = newItem.DeviceSN;
    delete newItem.DeviceSN;
  }
  if ("DeviceName" in newItem) {
    newItem.deviceName = newItem.DeviceName;
    delete newItem.DeviceName;
  }
  if ("EventNo" in newItem) {
    newItem.eventNo = newItem.EventNo;
    delete newItem.EventNo;
  }
  if ("EventName" in newItem) {
    newItem.eventName = newItem.EventName;
    delete newItem.EventName;
  }
  if ("EventDoorId" in newItem) {
    newItem.eventDoorId = newItem.EventDoorId;
    delete newItem.EventDoorId;
  }
  if ("EventDoorName" in newItem) {
    newItem.eventDoorName = newItem.EventDoorName;
    delete newItem.EventDoorName;
  }
  if ("EventType" in newItem) {
    newItem.eventType = newItem.EventType;
    delete newItem.EventType;
  }
  if ("EventTime" in newItem) {
    newItem.eventTime = newItem.EventTime;
    delete newItem.EventTime;
  }
  if ("InOutStatus" in newItem) {
    newItem.inOutStatus = newItem.InOutStatus;
    delete newItem.InOutStatus;
  }
  if ("ReaderName" in newItem) {
    newItem.readerName = newItem.ReaderName;
    delete newItem.ReaderName;
  }
  if ("VerifyModeNo" in newItem) {
    newItem.verifyModeNo = newItem.VerifyModeNo;
    delete newItem.VerifyModeNo;
  }

  return newItem as Accesses;
}

// Define a página de acessos
export const NaccessAccesses = () => {
  const {
    access,
    totalPages,
    totalRecords,
    fetchAllInitialAccessesbyDevice,
    handleAddAccess,
    accessForGraph,
  } = useAttendance();
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);
  const { disabledEmployeesNoPagination, handleUpdateEmployee } = usePersons();
  const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
  const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
  const [filteredAccess, setFilteredAccess] = useState<Accesses[]>([]);
  const [showAddAccessModal, setShowAddAccessModal] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "eventTime",
    "cardNo",
    "nameUser",
    "pin",
    "deviceName",
    "eventDoorName",
    "readerName",
    "eventName",
  ]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [resetSelection, setResetSelection] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Accesses[]>([]);
  const [filterText, setFilterText] = useState("");
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [initialData, setInitialData] = useState<Partial<Accesses>>({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalRows, setTotalRows] = useState(0);

  // Função para buscar os dados da paginação
  const fetchPaginationAccesses = async (pageNo: string, perPage: string) => {
    setLoading(true);
    try {
      const data = await apiService.fetchAllAccessesByDevice(
        undefined,
        undefined,
        undefined,
        pageNo,
        perPage
      );
      setFilteredAccess(data.data);
      setTotalRows(data.totalRecords);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar acessos paginados:", error);
      setFilteredAccess([]);
      setLoading(false);
    }
  };

  // Função para buscar todos os acessos entre datas
  const fetchAccessesBetweenDates = async () => {
    try {
      const data = await apiService.fetchAllAccessesByDevice(
        undefined,
        startDate,
        endDate
      );
      setFilteredAccess(data.data);
      setTotalRows(data.totalRecords);
    } catch (error) {
      console.error("Erro ao buscar acessos entre datas:", error);
      setFilteredAccess([]);
    }
  };

  // Função para buscar os acessos de hoje
  const fetchAccessesToday = async () => {
    const today = new Date();
    const start = formatDateToStartOfDay(today);
    const end = formatDateToEndOfDay(today);
    if (selectedEmployeeIds.length > 0) {
      try {
        const data = await apiService.fetchAllAccessesByEnrollNumber(
          undefined,
          selectedEmployeeIds,
          start,
          end,
          "1",
          "20"
        );
        setFilteredAccess(data.data);
        setTotalRows(data.totalRecords);
      } catch (error) {
        console.error("Erro ao buscar acessos hoje:", error);
        setFilteredAccess([]);
      }
    } else {
      try {
        const data = await apiService.fetchAllAccessesByDevice(
          undefined,
          start,
          end
        );
        setFilteredAccess(data.data);
        setTotalRows(data.totalRecords);
      } catch (error) {
        console.error("Erro ao buscar acessos hoje:", error);
        setFilteredAccess([]);
      }
    }
    setStartDate(start);
    setEndDate(end);
  };

  // Função para buscar os acessos de ontem
  const fetchAccessesForPreviousDay = async () => {
    const prevDate = new Date(startDate);
    prevDate.setDate(prevDate.getDate() - 1);

    const start = formatDateToStartOfDay(prevDate);
    const end = formatDateToEndOfDay(prevDate);

    if (selectedEmployeeIds.length > 0) {
      try {
        const data = await apiService.fetchAllAccessesByEnrollNumber(
          undefined,
          selectedEmployeeIds,
          start,
          end,
          "1",
          "20"
        );
        setFilteredAccess(data.data);
        setTotalRows(data.totalRecords);
      } catch (error) {
        console.error("Erro ao buscar acessos ontem:", error);
        setFilteredAccess([]);
      }
    } else {
      try {
        const data = await apiService.fetchAllAccessesByDevice(
          undefined,
          start,
          end
        );
        setFilteredAccess(data.data);
        setTotalRows(data.totalRecords);
      } catch (error) {
        console.error("Erro ao buscar acessos ontem:", error);
        setFilteredAccess([]);
      }
    }
    setStartDate(start);
    setEndDate(end);
  };

  // Função para buscar os acessos de amanhã
  const fetchAccessesForNextDay = async () => {
    const newDate = new Date(endDate);
    newDate.setDate(newDate.getDate() + 1);

    if (newDate > new Date()) {
      return;
    }

    const start = formatDateToStartOfDay(newDate);
    const end = formatDateToEndOfDay(newDate);

    if (selectedEmployeeIds.length > 0) {
      try {
        const data = await apiService.fetchAllAccessesByEnrollNumber(
          undefined,
          selectedEmployeeIds,
          start,
          end,
          "1",
          "20"
        );
        setFilteredAccess(data.data);
        setTotalRows(data.totalRecords);
      } catch (error) {
        console.error("Erro ao buscar acessos amanhã:", error);
        setFilteredAccess([]);
      }
    } else {
      try {
        const data = await apiService.fetchAllAccessesByDevice(
          undefined,
          start,
          end
        );
        setFilteredAccess(data.data);
        setTotalRows(data.totalRecords);
      } catch (error) {
        console.error("Erro ao buscar acessos amanhã:", error);
        setFilteredAccess([]);
      }
    }
    setStartDate(start);
    setEndDate(end);
  };

  // Função para adicionar um acesso
  const addAccess = async (access: Accesses) => {
    await handleAddAccess(access);
    refreshAccess();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para atualizar um funcionário e um cartão
  const updateEmployeeAndCard = async (employee: Employee) => {
    await handleUpdateEmployee(employee);
    refreshAccess();
    setClearSelectionToggle((prev) => !prev);
  };

  // Sempre que access mudar, atualiza o filteredAccess
  useEffect(() => {
    const unifiedAccess = access.map((item) => unifyKeys(item));

    const seen = new Set<string>();
    const deduplicated: Accesses[] = [];

    for (const item of unifiedAccess) {
      const key = `${item.deviceSN}-${item.pin}-${item.eventTime}`;
      if (!seen.has(key)) {
        seen.add(key);
        deduplicated.push(item);
      }
    }

    setFilteredAccess(deduplicated);
  }, [access]);

  // Busca os dados se a paginação mudar
  useEffect(() => {
    fetchPaginationAccesses(String(currentPage), String(perPage));
  }, [currentPage, perPage]);

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

  // Define a seleção de funcionários
  const handleSelectFromTreeView = async (selectedIds: string[]) => {
    setSelectedEmployeeIds(selectedIds);

    if (selectedIds.length > 0) {
      try {
        const foundEmployees = await apiService.fetchAllAccessesByEnrollNumber(
          undefined,
          selectedIds,
          undefined,
          undefined,
          undefined,
          undefined
        );
        if (foundEmployees.data) {
          setFilteredAccess(foundEmployees.data);
          setTotalRows(foundEmployees.totalRecords);
        } else {
          setFilteredAccess([]);
        }
      } catch (error) {
        console.error("Erro ao buscar funcionários por número:", error);
      }
    } else {
      refreshAccess();
      setFilteredAccess(access);
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
    const allColumnKeys = accessesFields.map((field) => field.key);
    setSelectedColumns(allColumnKeys);
  };

  // Função para resetar as colunas
  const handleResetColumns = () => {
    setSelectedColumns([
      "eventTime",
      "cardNo",
      "nameUser",
      "pin",
      "deviceName",
      "eventDoorName",
      "readerName",
      "eventName",
    ]);
  };

  // Função para atualizar os funcionários
  const refreshAccess = () => {
    fetchAllInitialAccessesbyDevice(undefined, undefined, undefined, "1", "20");
    setTotalRows(totalRecords);
    setCurrentPage(1);
    setPerPage(20);
    setStartDate(formatDateToStartOfDay(pastDate));
    setEndDate(formatDateToEndOfDay(currentDate));
    setClearSelectionToggle((prev) => !prev);
  };

  // Define a função selecionar uma linha
  const handleRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Accesses[];
  }) => {
    const sortedSelectedRows = state.selectedRows.sort(
      (a, b) => Number(a.pin) - Number(b.pin)
    );
    setSelectedRows(sortedSelectedRows);
  };

  // Função para abrir o modal de adição de acesso
  const handleOpenAddAccessModal = () => {
    if (selectedEmployeeIds.length > 0) {
      setInitialData({
        ...initialData,
        selectedEmployeeIds: selectedEmployeeIds[0],
      });
      setShowAddAccessModal(true);
    } else {
      toast.warn("Selecione um funcionário primeiro!");
    }
  };

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
    if (!Array.isArray(filteredAccess)) {
      return [];
    }

    const applyFilter = (list: Accesses[]) => {
      return list.filter(
        (attendances) =>
          Object.keys(filters).every((key) => {
            if (filters[key] === "") return true;
            if (attendances[key] == null) return false;
            return String(attendances[key])
              .toLowerCase()
              .includes(filters[key].toLowerCase());
          }) &&
          Object.entries(attendances).some(([key, value]) => {
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
    };

    const filteredMain = applyFilter(filteredAccess);

    if (filterText.trim() !== "" && Array.isArray(accessForGraph)) {
      const filteredGraph = applyFilter(accessForGraph);

      const combined = [...filteredMain, ...filteredGraph];

      const seen = new Set<string>();
      const deduplicated: Accesses[] = [];
      for (const item of combined) {
        const key = `${item.deviceSN}-${item.pin}-${item.eventTime}`;
        if (!seen.has(key)) {
          seen.add(key);
          deduplicated.push(item);
        }
      }

      return deduplicated;
    }

    return filteredMain;
  }, [filteredAccess, accessForGraph, filters, filterText, selectedColumns]);

  // Função para abrir o modal de edição
  const handleOpenEditModal = (person: Accesses) => {
    const employeeDetails = disabledEmployeesNoPagination.find(
      (emp) => emp.shortName === person.nameUser
    );
    if (employeeDetails) {
      setSelectedEmployee(employeeDetails);
      setShowEditModal(true);
    } else {
      console.error("Funcionário não encontrado:", person.nameUser);
    }
  };

  // Define as colunas
  const columns: TableColumn<Accesses>[] = accessesFields
    .filter(
      (field) =>
        selectedColumns.includes(field.key) && field.key !== "eventDoorId"
    )
    .map((field) => {
      if (field.key === "nameUser") {
        return {
          ...field,
          name: (
            <>
              {field.label}
              <SelectFilter
                column={field.key}
                setFilters={setFilters}
                data={filteredDataTable}
              />
            </>
          ),
          cell: (row: Accesses) => (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleOpenEditModal(row)}
            >
              {row.nameUser}
            </div>
          ),
        };
      }
      const formatField = (row: Accesses) => {
        switch (field.key) {
          case "deviceName":
            return (
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
                  <Tooltip className="custom-tooltip">{row[field.key]}</Tooltip>
                }
              >
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row[field.key]}
                </span>
              </OverlayTrigger>
            );
          case "eventDoorName":
            return (
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
                  <Tooltip className="custom-tooltip">{row[field.key]}</Tooltip>
                }
              >
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row[field.key]}
                </span>
              </OverlayTrigger>
            );
          case "readerName":
            return (
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
                  <Tooltip className="custom-tooltip">{row[field.key]}</Tooltip>
                }
              >
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row[field.key]}
                </span>
              </OverlayTrigger>
            );
          case "eventName":
            return (
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
                  <Tooltip className="custom-tooltip">{row[field.key]}</Tooltip>
                }
              >
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row[field.key]}
                </span>
              </OverlayTrigger>
            );
          default:
            return row[field.key] || "";
        }
      };
      return {
        id: field.key,
        name: (
          <>
            {field.label}
            {field.key !== "eventTime" && (
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
          new Date(rowB.eventTime).getTime() -
          new Date(rowA.eventTime).getTime(),
      };
    });

  // Define as opções de paginação de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return accessesFields.filter((field) =>
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
              <span>Acessos</span>
            </div>
            <div className="datatable-header" style={{ marginBottom: 0 }}>
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
                    onClick={refreshAccess}
                    iconSize="1.1em"
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
                  overlay={
                    <Tooltip className="custom-tooltip">Adicionar</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-plus"
                    onClick={handleOpenAddAccessModal}
                    iconSize="1.1em"
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
                    onClick={fetchAccessesToday}
                    iconSize="1.1em"
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
                  overlay={
                    <Tooltip className="custom-tooltip">
                      Movimentos Dia Anterior
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-left-circle"
                    onClick={fetchAccessesForPreviousDay}
                    iconSize="1.1em"
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
                  overlay={
                    <Tooltip className="custom-tooltip">
                      Movimentos Dia Seguinte
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-right-circle"
                    onClick={fetchAccessesForNextDay}
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
                    onClick={fetchAccessesBetweenDates}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
              </div>
            </div>
            <Tab.Container defaultActiveKey="movimentos">
              <Nav
                variant="tabs"
                className="nav-modal"
                style={{ marginTop: 0 }}
              >
                <Nav.Item>
                  <Nav.Link
                    eventKey="movimentos"
                    style={{ padding: "0.25rem 0.5rem", fontSize: "0.85rem" }}
                  >
                    Movimentos
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="movimentos">
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
                          columns={columns}
                          data={filteredDataTable}
                          pagination
                          paginationComponentOptions={paginationOptions}
                          selectableRows
                          paginationRowsPerPageOptions={[20, 50, 100]}
                          clearSelectedRows={clearSelectionToggle}
                          selectableRowsHighlight
                          onSelectedRowsChange={handleRowSelected}
                          noDataComponent="Não existem dados disponíveis para mostrar."
                          customStyles={customStyles}
                          striped
                          responsive
                          persistTableHead={true}
                          defaultSortAsc={true}
                          defaultSortFieldId="eventTime"
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
                              onClick={() => handlePageChange(totalPages)}
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
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
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
            <TreeViewDataNaccess onSelectEmployees={handleSelectFromTreeView} />
          </div>
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span>Acessos</span>
            </div>
            <div className="datatable-header" style={{ marginBottom: 0 }}>
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
                    onClick={refreshAccess}
                    iconSize="1.1em"
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
                  overlay={
                    <Tooltip className="custom-tooltip">Adicionar</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-plus"
                    onClick={handleOpenAddAccessModal}
                    iconSize="1.1em"
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
                    onClick={fetchAccessesToday}
                    iconSize="1.1em"
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
                  overlay={
                    <Tooltip className="custom-tooltip">
                      Movimentos Dia Anterior
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-left-circle"
                    onClick={fetchAccessesForPreviousDay}
                    iconSize="1.1em"
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
                  overlay={
                    <Tooltip className="custom-tooltip">
                      Movimentos Dia Seguinte
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-right-circle"
                    onClick={fetchAccessesForNextDay}
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
                    onClick={fetchAccessesBetweenDates}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
              </div>
            </div>
            <Tab.Container defaultActiveKey="movimentos">
              <Nav
                variant="tabs"
                className="nav-modal"
                style={{ marginTop: 0 }}
              >
                <Nav.Item>
                  <Nav.Link
                    eventKey="movimentos"
                    style={{ padding: "0.25rem 0.5rem", fontSize: "0.85rem" }}
                  >
                    Movimentos
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="movimentos">
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
                          columns={columns}
                          data={filteredDataTable}
                          pagination
                          paginationComponentOptions={paginationOptions}
                          selectableRows
                          paginationRowsPerPageOptions={[20, 50, 100]}
                          clearSelectedRows={clearSelectionToggle}
                          selectableRowsHighlight
                          onSelectedRowsChange={handleRowSelected}
                          noDataComponent="Não existem dados disponíveis para mostrar."
                          customStyles={customStyles}
                          striped
                          responsive
                          persistTableHead={true}
                          defaultSortAsc={true}
                          defaultSortFieldId="eventTime"
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
                              onClick={() => handlePageChange(totalPages)}
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
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Split>
      </div>
      {showAddAccessModal && (
        <CreateModalAccess
          open={showAddAccessModal}
          onClose={() => setShowAddAccessModal(false)}
          onSave={addAccess}
          title="Adicionar Acesso"
          fields={accessesFields}
          initialValues={initialData}
        />
      )}
      {showColumnSelector && (
        <ColumnSelectorModal
          columns={accessesFields.filter(
            (field) => field.key !== "eventDoorId"
          )}
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
