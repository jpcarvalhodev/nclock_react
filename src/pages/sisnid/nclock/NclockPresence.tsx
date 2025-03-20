import DataTable, { TableColumn } from "react-data-table-component";

import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";

import "../../../css/PagesStyles.css";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";

import { useEffect, useMemo, useState } from "react";

import { PrintButton } from "../../../components/PrintButton";
import { SelectFilter } from "../../../components/SelectFilter";
import { TreeViewDataNclockPresence } from "../../../components/TreeViewNclockPresence";
import { useAttendance } from "../../../context/MovementContext";

import { usePersons } from "../../../context/PersonsContext";
import {
  employeeAttendanceTimesFields,
  employeeFields,
} from "../../../fields/Fields";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { UpdateModalEmployees } from "../../../modals/UpdateModalEmployees";
import { Employee, EmployeeAttendanceTimes } from "../../../types/Types";

import Split from "react-split";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { SearchBoxContainer } from "../../../components/SearchBoxContainer";
import { CustomSpinner } from "../../../components/CustomSpinner";
import { useMediaQuery } from "react-responsive";

// Define a interface para os filtros
interface Filters {
  [key: string]: string;
}

// Define a interface para os dados de presença de funcionários
interface EmployeeAttendanceWithPresence extends EmployeeAttendanceTimes {
  isPresent: boolean;
}

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T00:00`;
};

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T23:59`;
};

// Função para verificar se a data é de hoje
const isToday = (date: string | Date): boolean => {
  const eventDate = typeof date === "string" ? new Date(date) : date;
  const today = new Date();

  return (
    eventDate.getDate() === today.getDate() &&
    eventDate.getMonth() === today.getMonth() &&
    eventDate.getFullYear() === today.getFullYear()
  );
};

// Função para formatar a data e hora
const formatDateTime = (date: string | Date): string => {
  if (!date) return "";

  const eventDate = typeof date === "string" ? new Date(date) : date;

  return eventDate.toLocaleString("pt-PT", {
    timeZone: "Europe/Lisbon",
    hour12: false,
  });
};

// Define a página de presença
export const NclockPresence = () => {
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);
  const { fetchAllAttendances } = useAttendance();
  const { employeesNoPagination, handleUpdateEmployee } = usePersons();
  const [attendancePresence, setAttendancePresence] = useState<
    EmployeeAttendanceWithPresence[]
  >([]);
  const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
  const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
  const [filterText, setFilterText] = useState("");
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "employeeName",
    "inOutMode",
    "attendanceTime",
  ]);
  const [selectedRows, setSelectedRows] = useState<EmployeeAttendanceTimes[]>(
    []
  );
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [filteredAttendances, setFilteredAttendances] = useState<
    EmployeeAttendanceTimes[]
  >([]);
  const [filters, setFilters] = useState<Filters>({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const [perPage, setPerPage] = useState(20);

  // Função para filtrar as presenças
  useEffect(() => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const tomorrow = new Date(todayStart);
    tomorrow.setDate(tomorrow.getDate() + 1);

    fetchAllAttendances({
      filterFunc: (data) => data.filter((att) => att.type !== 3),
    })
      .then((allAttendanceData) => {
        const filtered = allAttendanceData.filter((att) => {
          const attDate = new Date(att.attendanceTime);
          return attDate >= todayStart && attDate < tomorrow;
        });

        const earliestByEmployee = new Map<string, EmployeeAttendanceTimes>();
        filtered.forEach((att) => {
          const existing = earliestByEmployee.get(att.employeeId);
          if (!existing) {
            earliestByEmployee.set(att.employeeId, att);
          } else {
            const existingTime = new Date(existing.attendanceTime).getTime();
            const currentTime = new Date(att.attendanceTime).getTime();
            if (currentTime < existingTime) {
              earliestByEmployee.set(att.employeeId, att);
            }
          }
        });

        const presenceArray = Array.from(earliestByEmployee.values()).map(
          (att) => ({
            ...att,
            isPresent: true,
          })
        );

        const absentRecords = employeesNoPagination
          .filter((emp) => !earliestByEmployee.has(emp.employeeID))
          .map((emp) => ({
            id: emp.employeeID,
            employeeId: emp.employeeID,
            employeeName: emp.name,
            attendanceTime: "",
            inOutMode: "",
            enrollNumber: emp.enrollNumber ?? "",
            type: 0,
            deviceId: "",
            deviceNumber: 0,
            observation: "",
            verifyMode: 0,
            workCode: 0,
            isPresent: false,
          }));

        const combinedData = [...presenceArray, ...absentRecords];
        setAttendancePresence(combinedData);
        setFilteredAttendances(combinedData);
      })
      .catch((error) => {
        console.error("Erro ao tentar buscar os dados:", error);
      });
  }, [employeesNoPagination]);

  // Handler para filtrar pela data de hoje
  const handleTodayPresence = () => {
    const today = new Date();
    setStartDate(formatDateToStartOfDay(today));
    setEndDate(formatDateToEndOfDay(today));
  };

  // Handler para retroceder um dia a partir do startDate atual
  const handlePreviousDayPresence = () => {
    const previousDay = new Date(startDate);
    previousDay.setDate(previousDay.getDate() - 1);

    setStartDate(formatDateToStartOfDay(previousDay));
    setEndDate(formatDateToEndOfDay(previousDay));
  };

  // Handler para avançar um dia a partir do startDate atual
  const handleNextDayPresence = () => {
    const nextDay = new Date(startDate);
    nextDay.setDate(nextDay.getDate() + 1);

    setStartDate(formatDateToStartOfDay(nextDay));
    setEndDate(formatDateToEndOfDay(nextDay));
  };

  // Função para atualizar um funcionário e um cartão
  const updateEmployeeAndCard = async (employee: Employee) => {
    await handleUpdateEmployee(employee);
    refreshAttendance();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para atualizar os dados da tabela
  const refreshAttendance = () => {
    fetchAllAttendances({
      filterFunc: (data: EmployeeAttendanceTimes[]) =>
        data.filter((att: EmployeeAttendanceTimes) => att.type !== 3),
    });
    setClearSelectionToggle((prev) => !prev);
  };

  // Atualiza a seleção ao mudar o filtro
  useEffect(() => {
    if (selectedEmployeeIds.length > 0) {
      const newFilteredAttendances = attendancePresence.filter((att) =>
        selectedEmployeeIds.includes(att.employeeId)
      );
      setFilteredAttendances(newFilteredAttendances);
    } else if (attendancePresence.length > 0) {
      setFilteredAttendances(attendancePresence);
    }
  }, [attendancePresence, selectedEmployeeIds]);

  // Define a seleção de funcionários
  const handleSelectFromTreeView = (selectedIds: string[]) => {
    setSelectedEmployeeIds(selectedIds);
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
    setSelectedColumns(["employeeName", "inOutMode", "attendanceTime"]);
  };

  // Remove o campo de observação, número, nome do funcionário e o tipo
  const filteredColumns = employeeAttendanceTimesFields.filter(
    (field) =>
      field.key !== "observation" &&
      field.key !== "enrollNumber" &&
      field.key !== "employeeId" &&
      field.key !== "type" &&
      field.key !== "deviceNumber" &&
      field.key !== "deviceId" &&
      field.key !== "verifyMode" &&
      field.key !== "workCode"
  );

  // Definindo a coluna de Presença primeiro
  const presenceColumn: TableColumn<EmployeeAttendanceTimes> = {
    id: "isPresent",
    name: (
      <>
        Presença
        <SelectFilter
          column={"isPresent"}
          setFilters={setFilters}
          data={filteredAttendances}
        />
      </>
    ),
    selector: (row) => (row.isPresent ? "Presente" : "Ausente"),
    format: (row) => (
      <span
        style={{
          color: row.isPresent ? "green" : "red",
          backgroundColor: row.isPresent ? "#d4edda" : "#f8d7da",
          borderRadius: "4px",
          padding: "2px 10px",
          display: "inline-block",
        }}
      >
        {row.isPresent ? "Presente" : "Ausente"}
      </span>
    ),
    sortable: true,
    sortFunction: (rowA, rowB) => {
      if (rowA.isPresent === rowB.isPresent) {
        const aTime = new Date(rowA.attendanceTime).getTime();
        const bTime = new Date(rowB.attendanceTime).getTime();
        return bTime - aTime;
      }
      return rowA.isPresent ? -1 : 1;
    },
  };

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
    if (!Array.isArray(filteredAttendances)) {
      return [];
    }
    return filteredAttendances.filter(
      (attendances) =>
        Object.keys(filters).every(
          (key) =>
            filters[key] === "" ||
            (attendances[key] != null &&
              String(attendances[key])
                .toLowerCase()
                .includes(filters[key].toLowerCase()))
        ) &&
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
  }, [filteredAttendances, filters, filterText]);

  // Função para abrir o modal de edição
  const handleOpenEditModal = (person: EmployeeAttendanceTimes) => {
    const employeeDetails = employeesNoPagination.find(
      (emp) => emp.employeeID === person.employeeId
    );
    if (employeeDetails) {
      setSelectedEmployee(employeeDetails);
      setShowEditModal(true);
    } else {
      console.error("Funcionário não encontrado:", person.employeeName);
    }
  };

  // Adicionando as outras colunas
  const otherColumns: TableColumn<EmployeeAttendanceTimes>[] =
    employeeAttendanceTimesFields
      .filter((field) => selectedColumns.includes(field.key))
      .sort((a, b) => {
        if (a.key === "attendanceTime") return 1;
        else if (b.key === "attendanceTime") return -1;
        else return 0;
      })
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
                  data={filteredAttendances}
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
              return isToday(row.attendanceTime)
                ? formatDateTime(row.attendanceTime)
                : "";
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

  // Combinando colunas, com a coluna de Presença primeiro
  const columns: TableColumn<EmployeeAttendanceTimes>[] = [
    presenceColumn,
    ...otherColumns,
  ];

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
    const sortedSelectedRows = state.selectedRows.sort(
      (a, b) => Number(a.enrollNumber) - Number(b.enrollNumber)
    );
    setSelectedRows(sortedSelectedRows);
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

  // Função para calcular a quantidade de presentes e ausentes
  const calculatePresenceCounts = () => {
    const presentes = filteredDataTable.filter((item) => item.isPresent).length;
    const ausentes = employeesNoPagination.length - presentes;
    return { presentes, ausentes };
  };
  const { presentes, ausentes } = calculatePresenceCounts();

  return (
    <div className="main-container">
      <div className="content-container">
        {isMobile && (
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span>Presenças</span>
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
                    <Tooltip className="custom-tooltip">Presenças Hoje</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-calendar-event"
                    iconSize="1.1em"
                    onClick={handleTodayPresence}
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
                      Presenças Dia Anterior
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-left-circle"
                    iconSize="1.1em"
                    onClick={handlePreviousDayPresence}
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
                      Presenças Dia Seguinte
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-right-circle"
                    iconSize="1.1em"
                    onClick={handleNextDayPresence}
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
                  <CustomOutlineButton icon="bi-search" iconSize="1.1em" />
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
                    data={filteredDataTable}
                    pagination
                    paginationComponentOptions={paginationOptions}
                    selectableRows
                    paginationPerPage={perPage}
                    paginationRowsPerPageOptions={[20, 50]}
                    onChangeRowsPerPage={(newPerPage, page) => {
                      setPerPage(newPerPage);
                    }}
                    onSelectedRowsChange={handleRowSelected}
                    clearSelectedRows={clearSelectionToggle}
                    selectableRowsHighlight
                    noDataComponent="Não existem dados disponíveis para mostrar."
                    customStyles={customStyles}
                    striped
                    responsive
                    persistTableHead={true}
                    defaultSortAsc={true}
                    defaultSortFieldId="isPresent"
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
            <TreeViewDataNclockPresence onSelectEmployees={handleSelectFromTreeView} />
          </div>
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span>Presenças</span>
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
                    <Tooltip className="custom-tooltip">Presenças Hoje</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-calendar-event"
                    iconSize="1.1em"
                    onClick={handleTodayPresence}
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
                      Presenças Dia Anterior
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-left-circle"
                    iconSize="1.1em"
                    onClick={handlePreviousDayPresence}
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
                      Presenças Dia Seguinte
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-right-circle"
                    iconSize="1.1em"
                    onClick={handleNextDayPresence}
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
                  <CustomOutlineButton icon="bi-search" iconSize="1.1em" />
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
                    data={filteredDataTable}
                    pagination
                    paginationComponentOptions={paginationOptions}
                    selectableRows
                    paginationPerPage={perPage}
                    paginationRowsPerPageOptions={[20, 50]}
                    onChangeRowsPerPage={(newPerPage, page) => {
                      setPerPage(newPerPage);
                    }}
                    onSelectedRowsChange={handleRowSelected}
                    clearSelectedRows={clearSelectionToggle}
                    selectableRowsHighlight
                    noDataComponent="Não existem dados disponíveis para mostrar."
                    customStyles={customStyles}
                    striped
                    responsive
                    persistTableHead={true}
                    defaultSortAsc={true}
                    defaultSortFieldId="isPresent"
                  />
                )}
              </div>
              <div style={{ marginLeft: 10 }}>
                <strong>Presentes: </strong>
                {presentes} | <strong>Ausentes: </strong>
                {ausentes}
              </div>
            </div>
          </div>
        </Split>
      </div>
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
