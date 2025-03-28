import { useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Split from "react-split";

import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";
import { PrintButton } from "../../../components/PrintButton";
import { SelectFilter } from "../../../components/SelectFilter";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";

import "../../../css/PagesStyles.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { useAttendance } from "../../../context/MovementContext";

import { UpdateModalEmployees } from "../../../modals/UpdateModalEmployees";

import { SearchBoxContainer } from "../../../components/SearchBoxContainer";
import { CustomSpinner } from "../../../components/CustomSpinner";
import { useMediaQuery } from "react-responsive";
import * as apiService from "../../../api/apiService";
import { AttendanceResults, Employee } from "../../../types/Types";
import {
  attendanceResultsFields,
  employeeFields,
} from "../../../fields/Fields";
import { usePersons } from "../../../context/PersonsContext";
import { TreeViewDataNaccess } from "../../../components/TreeViewNaccess";

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

// Formata para somente a data
const formatOnlyDate = (value?: string | Date | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (date.getTime() === 0) return "";
  return date.toLocaleDateString();
};

// Formata para somente a hora
const formatOnlyTime = (value?: string | Date | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (date.getTime() === 0) return "";
  return date.toLocaleTimeString();
};

// Define a página movimentos
export const NclockResults = () => {
  const {
    fetchDailyTransactions,
    attendanceResults,
    setAttendanceResults,
    attendanceResultsNoPagination,
    resultsTotalPages,
    resultsTotalRecords,
  } = useAttendance();
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);
  const { disabledEmployeesNoPagination, handleUpdateEmployee } = usePersons();
  const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
  const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "estado",
    "tipo",
    "enrollNumber",
    "employeeName",
    "date",
    "E1",
    "S1",
    "E2",
    "S2",
    "objectivo",
    "ausencia",
    "falta",
    "efectivo",
    "extra",
    "naoDefinido",
  ]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [resetSelection, setResetSelection] = useState(false);
  const [selectedRows, setSelectedRows] = useState<AttendanceResults[]>([]);
  const [flattenedData, setFlattenedData] = useState<AttendanceResults[]>([]);
  const [filterText, setFilterText] = useState("");
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [filters, setFilters] = useState<Filters>({});
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalRows, setTotalRows] = useState(0);

  // Função para buscar os dados da paginação
  const fetchPaginationResults = async (pageNo: string, perPage: string) => {
    setLoading(true);
    try {
      const data = await apiService.fetchAllDailyTransactions(
        undefined,
        undefined,
        undefined,
        pageNo,
        perPage
      );
      setAttendanceResults(data.data);
      setTotalRows(data.totalRecords);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar resultados paginados:", error);
      setLoading(false);
    }
  };

  // Função para buscar todos os resultados entre datas
  const fetchResultsBetweenDates = async () => {
    try {
      const data = await apiService.fetchAllDailyTransactions(
        startDate,
        endDate
      );
      setAttendanceResults(data.data);
      setTotalRows(data.totalRecords);
    } catch (error) {
      console.error("Erro ao buscar resultados entre datas:", error);
    }
  };

  // Função para buscar os resultados de hoje
  const fetchResultsToday = async () => {
    const today = new Date();
    const start = formatDateToStartOfDay(today);
    const end = formatDateToEndOfDay(today);
    if (selectedEmployeeIds.length > 0) {
      try {
        const data = await apiService.fetchAllDailyTransactions(
          start,
          end,
          selectedEmployeeIds
        );
        setAttendanceResults(data.data);
        setTotalRows(data.totalRecords);
      } catch (error) {
        console.error("Erro ao buscar resultados hoje:", error);
      }
    } else {
      try {
        const data = await apiService.fetchAllDailyTransactions(start, end);
        setAttendanceResults(data.data);
        setTotalRows(data.totalRecords);
      } catch (error) {
        console.error("Erro ao buscar resultados hoje:", error);
      }
    }
    setStartDate(start);
    setEndDate(end);
  };

  // Função para buscar os resultados de ontem
  const fetchResultsForPreviousDay = async () => {
    const prevDate = new Date(startDate);
    prevDate.setDate(prevDate.getDate() - 1);

    const start = formatDateToStartOfDay(prevDate);
    const end = formatDateToEndOfDay(prevDate);

    if (selectedEmployeeIds.length > 0) {
      try {
        const data = await apiService.fetchAllDailyTransactions(
          start,
          end,
          selectedEmployeeIds
        );
        setAttendanceResults(data.data);
        setTotalRows(data.totalRecords);
      } catch (error) {
        console.error("Erro ao buscar resultados ontem:", error);
      }
    } else {
      try {
        const data = await apiService.fetchAllDailyTransactions(start, end);
        setAttendanceResults(data.data);
        setTotalRows(data.totalRecords);
      } catch (error) {
        console.error("Erro ao buscar resultados ontem:", error);
      }
    }
    setStartDate(start);
    setEndDate(end);
  };

  // Função para buscar os resultados de amanhã
  const fetchResultsForNextDay = async () => {
    const newDate = new Date(endDate);
    newDate.setDate(newDate.getDate() + 1);

    if (newDate > new Date()) {
      return;
    }

    const start = formatDateToStartOfDay(newDate);
    const end = formatDateToEndOfDay(newDate);

    if (selectedEmployeeIds.length > 0) {
      try {
        const data = await apiService.fetchAllDailyTransactions(
          start,
          end,
          selectedEmployeeIds
        );
        setAttendanceResults(data.data);
        setTotalRows(data.totalRecords);
      } catch (error) {
        console.error("Erro ao buscar resultados amanhã:", error);
      }
    } else {
      try {
        const data = await apiService.fetchAllDailyTransactions(start, end);
        setAttendanceResults(data.data);
        setTotalRows(data.totalRecords);
      } catch (error) {
        console.error("Erro ao buscar resultados amanhã:", error);
      }
    }
    setStartDate(start);
    setEndDate(end);
  };

  // Função para atualizar um funcionário e um cartão
  const updateEmployeeAndCard = async (employee: Employee) => {
    await handleUpdateEmployee(employee);
    refreshAttendanceResults();
    setClearSelectionToggle((prev) => !prev);
  };

  // Busca os dados se a paginação mudar
  useEffect(() => {
    fetchPaginationResults(String(currentPage), String(perPage));
  }, [currentPage, perPage]);

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
        const foundEmployees = await apiService.fetchAllDailyTransactions(
          undefined,
          undefined,
          selectedIds
        );
        if (foundEmployees.data) {
          setAttendanceResults(foundEmployees.data);
          setTotalRows(foundEmployees.totalRecords);
        } else {
          setAttendanceResults([]);
        }
      } catch (error) {
        console.error("Erro ao buscar funcionários por número:", error);
      }
    } else {
      refreshAttendanceResults();
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
    const allColumnKeys = attendanceResultsFields.map((field) => field.key);
    setSelectedColumns(allColumnKeys);
  };

  // Função para abrir o modal de edição
  const handleOpenEditModal = (person: AttendanceResults) => {
    const employeeDetails = disabledEmployeesNoPagination.find(
      (emp) => emp.name === person.employeeName
    );
    if (employeeDetails) {
      setSelectedEmployee(employeeDetails);
      setShowEditModal(true);
    } else {
      console.error("Funcionário não encontrado:", person.nameUser);
    }
  };

  // Função para resetar as colunas
  const handleResetColumns = () => {
    setSelectedColumns([
      "estado",
      "tipo",
      "enrollNumber",
      "employeeName",
      "date",
      "E1",
      "S1",
      "E2",
      "S2",
      "objectivo",
      "ausencia",
      "falta",
      "efectivo",
      "extra",
      "naoDefinido",
    ]);
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

  // Função para atualizar os funcionários
  const refreshAttendanceResults = () => {
    fetchDailyTransactions(undefined, undefined, undefined, "1", "20");
    setTotalRows(resultsTotalRecords);
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
    selectedRows: AttendanceResults[];
  }) => {
    setSelectedRows(state.selectedRows);
  };

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
    if (!Array.isArray(attendanceResults)) {
      return [];
    }

    const applyFilter = (list: AttendanceResults[]) => {
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

    const filteredMain = applyFilter(attendanceResults);

    if (
      filterText.trim() !== "" &&
      Array.isArray(attendanceResultsNoPagination)
    ) {
      const filteredGraph = applyFilter(attendanceResultsNoPagination);

      const combined = [...filteredMain, ...filteredGraph];

      const seen = new Set<string>();
      const deduplicated: AttendanceResults[] = [];
      for (const item of combined) {
        const key = `${item.enrollNumber}-${item.employeeName}-${item.date}`;
        if (!seen.has(key)) {
          seen.add(key);
          deduplicated.push(item);
        }
      }

      return deduplicated;
    }

    return filteredMain;
  }, [
    attendanceResults,
    attendanceResultsNoPagination,
    filters,
    filterText,
    selectedColumns,
  ]);

  // Define as colunas
  const columns: TableColumn<AttendanceResults>[] = (
    attendanceResultsFields ?? []
  )
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
                data={filteredDataTable}
              />
            </>
          ),
          cell: (row: AttendanceResults) => (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleOpenEditModal(row)}
            >
              {row.employeeName}
            </div>
          ),
        };
      }
      const formatField = (row: AttendanceResults) => {
        switch (field.key) {
          case "date":
            return formatOnlyDate(row[field.key]).toLocaleString() || "";
          case "E1":
          case "S1":
          case "E2":
          case "S2":
          case "E3":
          case "S3":
          case "E4":
          case "S4":
            return formatOnlyTime(row[field.key]).toLocaleString() || "";
          case "estado": {
            switch (row[field.key]) {
              case 1:
                return (
                  <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <div
                      style={{
                        height: "10px",
                        width: "10px",
                        backgroundColor: "red",
                        borderRadius: "50%",
                        marginRight: "5px",
                      }}
                      title="Não Validado"
                    />
                    Não Validado
                  </div>
                );
              case 2:
                return (
                  <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <div
                      style={{
                        height: "10px",
                        width: "10px",
                        backgroundColor: "yellow",
                        borderRadius: "50%",
                        marginRight: "5px",
                      }}
                      title="Em curso"
                    />
                    Em curso
                  </div>
                );
              case 3:
                return (
                  <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <div
                      style={{
                        height: "10px",
                        width: "10px",
                        backgroundColor: "green",
                        borderRadius: "50%",
                        marginRight: "5px",
                      }}
                      title="Validado"
                    />
                    Validado
                  </div>
                );
              default:
                return "";
            }
          }
          default:
            return row[field.key] || "";
        }
      };
      return {
        id: field.key,
        name: (
          <>
            {field.label}
            {field.key !== "date" && (
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
          new Date(rowB.date).getTime() - new Date(rowA.date).getTime(),
      };
    });

  // Define as opções de paginação de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return attendanceResultsFields.filter((field) =>
      selectedColumns.includes(field.key)
    );
  };

  // Achata os dados para exibição na tabela
  useEffect(() => {
    const newData = filteredDataTable.map((item) => {
      const t = item.times;
      return {
        ...item,
        E1: t?.E1 ?? null,
        S1: t?.S1 ?? null,
        E2: t?.E2 ?? null,
        S2: t?.S2 ?? null,
        E3: t?.E3 ?? null,
        S3: t?.S3 ?? null,
        E4: t?.E4 ?? null,
        S4: t?.S4 ?? null,
      };
    });
    setFlattenedData(newData);
  }, [filteredDataTable]);

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
              <span>Resultados</span>
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
                    onClick={refreshAttendanceResults}
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
                    <Tooltip className="custom-tooltip">Validar</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-check-circle"
                    onClick={() => setShowColumnSelector(true)}
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
                      Remover Validação
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-ban"
                    onClick={() => setShowColumnSelector(true)}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
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
                      Resultados Hoje
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-calendar-event"
                    onClick={fetchResultsToday}
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
                      Resultados Dia Anterior
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-left-circle"
                    onClick={fetchResultsForPreviousDay}
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
                      Resultados Dia Seguinte
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-right-circle"
                    onClick={fetchResultsForNextDay}
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
                    onClick={fetchResultsBetweenDates}
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
                    columns={columns}
                    data={flattenedData}
                    pagination
                    paginationComponentOptions={paginationOptions}
                    selectableRows
                    paginationRowsPerPageOptions={[20, 50]}
                    clearSelectedRows={clearSelectionToggle}
                    onSelectedRowsChange={handleRowSelected}
                    selectableRowsHighlight
                    noDataComponent="Não existem dados disponíveis para mostrar."
                    customStyles={customStyles}
                    striped
                    responsive
                    persistTableHead={true}
                    defaultSortAsc={true}
                    defaultSortFieldId="date"
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
                        onClick={() => handlePageChange(resultsTotalPages)}
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
            <TreeViewDataNaccess onSelectEmployees={handleSelectFromTreeView} />
          </div>
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span>Resultados</span>
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
                    onClick={refreshAttendanceResults}
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
                    <Tooltip className="custom-tooltip">Validar</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-check-circle"
                    onClick={() => setShowColumnSelector(true)}
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
                      Remover Validação
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-ban"
                    onClick={() => setShowColumnSelector(true)}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
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
                      Resultados Hoje
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-calendar-event"
                    onClick={fetchResultsToday}
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
                      Resultados Dia Anterior
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-left-circle"
                    onClick={fetchResultsForPreviousDay}
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
                      Resultados Dia Seguinte
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-right-circle"
                    onClick={fetchResultsForNextDay}
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
                    onClick={fetchResultsBetweenDates}
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
                    columns={columns}
                    data={flattenedData}
                    pagination
                    paginationComponentOptions={paginationOptions}
                    selectableRows
                    paginationRowsPerPageOptions={[20, 50]}
                    clearSelectedRows={clearSelectionToggle}
                    onSelectedRowsChange={handleRowSelected}
                    selectableRowsHighlight
                    noDataComponent="Não existem dados disponíveis para mostrar."
                    customStyles={customStyles}
                    striped
                    responsive
                    persistTableHead={true}
                    defaultSortAsc={true}
                    defaultSortFieldId="date"
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
                        onClick={() => handlePageChange(resultsTotalPages)}
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
      {showColumnSelector && (
        <ColumnSelectorModal
          columns={attendanceResultsFields}
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
