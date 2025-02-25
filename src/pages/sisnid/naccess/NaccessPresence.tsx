import DataTable, { TableColumn } from "react-data-table-component";

import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";

import "../../../css/PagesStyles.css";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";

import { useEffect, useMemo, useState } from "react";

import { PrintButton } from "../../../components/PrintButton";
import { SelectFilter } from "../../../components/SelectFilter";
import { useAttendance } from "../../../context/MovementContext";

import { usePersons } from "../../../context/PersonsContext";
import { accessesFields, employeeFields } from "../../../fields/Fields";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { UpdateModalEmployees } from "../../../modals/UpdateModalEmployees";
import { Accesses, Employee } from "../../../types/Types";

import Split from "react-split";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { TreeViewDataNaccess } from "../../../components/TreeViewNaccess";
import { SearchBoxContainer } from "../../../components/SearchBoxContainer";
import { CustomSpinner } from "../../../components/CustomSpinner";
import { useMediaQuery } from "react-responsive";

// Define a interface para os filtros
interface Filters {
  [key: string]: string;
}

// Define a interface para os dados de presença de funcionários
interface EmployeeAccessWithPresence extends Accesses {
  isPresent: boolean;
}

// Função para converter a data para o formato ISO
const convertToISO = (dateString: string) => {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("/");
  return `${year}-${month}-${day}T${timePart}`;
};

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T00:00`;
};

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T23:59`;
};

// Define a página de presença
export const NaccessPresence = () => {
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);
  const { accessForGraph, fetchAllAccessesbyDevice } = useAttendance();
  const { employeesNoPagination, handleUpdateEmployee } = usePersons();
  const [accessPresence, setAccessPresence] = useState<
    EmployeeAccessWithPresence[]
  >([]);
  const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
  const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
  const [filterText, setFilterText] = useState("");
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "eventTime",
    "cardNo",
    "nameUser",
    "pin",
  ]);
  const [selectedRows, setSelectedRows] = useState<Accesses[]>([]);
  const [selectedEmployeeIds, setselectedEmployeeIds] = useState<string>("");
  const [filteredAccess, setFilteredAccess] = useState<Accesses[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const [perPage, setPerPage] = useState(20);

  // Função para filtrar as presenças
  useEffect(() => {
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    const filtered = accessForGraph.filter((acc) => {
      const isoDateString = convertToISO(acc.eventTime);
      const eventDateTime = new Date(isoDateString);

      return (
        Number(acc.pin) !== 0 &&
        eventDateTime >= sDate &&
        eventDateTime <= eDate
      );
    });

    const latestAccessByPin = new Map<string, Accesses>();
    filtered.forEach((acc) => {
      const pinString = String(acc.pin).trim();
      const existing = latestAccessByPin.get(pinString);

      if (!existing) {
        latestAccessByPin.set(pinString, acc);
      } else {
        const existingDate = new Date(convertToISO(existing.eventTime));
        const currentDate = new Date(convertToISO(acc.eventTime));
        if (currentDate > existingDate) {
          latestAccessByPin.set(pinString, acc);
        }
      }
    });

    const isToday = (date: Date) => {
      const now = new Date();
      return (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    };

    const presenceArray: EmployeeAccessWithPresence[] = Array.from(
      latestAccessByPin.values()
    ).map((acc) => {
      const isoDateString = convertToISO(acc.eventTime);
      const eventDateTime = new Date(isoDateString);

      const presentToday = acc.inOutStatus === 0 && isToday(eventDateTime);

      return {
        ...acc,
        isPresent: presentToday,
      };
    });

    const employeesWithoutAccess = employeesNoPagination.filter((emp) => {
      const enrollString = String(emp.enrollNumber).trim();
      return !latestAccessByPin.has(enrollString);
    });

    const absentRecords: EmployeeAccessWithPresence[] =
      employeesWithoutAccess.map((emp) => {
        const defaultCardNo =
          emp.employeeCards?.length > 0 ? emp.employeeCards[0].cardNumber : "";

        return {
          id: "",
          cardNo: defaultCardNo,
          pin: String(emp.enrollNumber).trim(),
          nameUser: emp.name,
          eventTime: "",
          inOutStatus: null,
          inOutMode: null,
          deviceSN: "",
          eventDoorId: "",
          deviceName: "",
          eventName: "",
          eventDoorName: "",
          readerName: "",
          isPresent: false,
        };
      });

    const combinedData = [...presenceArray, ...absentRecords];
    setAccessPresence(combinedData);
  }, [startDate, endDate, accessForGraph, employeesNoPagination]);

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
    fetchAllAccessesbyDevice();
    setClearSelectionToggle((prev) => !prev);
  };

  // Atualiza a seleção ao mudar o filtro
  useEffect(() => {
    if (selectedEmployeeIds && selectedEmployeeIds.length > 0) {
      const newFilteredAccess = accessPresence.filter((att) =>
        selectedEmployeeIds.includes(String(att.pin))
      );
      setFilteredAccess(newFilteredAccess);
    } else {
      setFilteredAccess(accessPresence);
    }
  }, [selectedEmployeeIds, accessPresence]);

  // Define a seleção de funcionários
  const handleSelectFromTreeView = (selectedIds: string[]) => {
    setselectedEmployeeIds(selectedIds[0] || "");
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
    setSelectedColumns(["eventTime", "cardNo", "nameUser", "pin"]);
  };

  // Definindo a coluna de Presença primeiro
  const presenceColumn: TableColumn<Accesses> = {
    name: (
      <>
        Presença
        <SelectFilter
          column={"isPresent"}
          setFilters={setFilters}
          data={filteredAccess}
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
  };

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
    if (!Array.isArray(filteredAccess)) {
      return [];
    }
    return filteredAccess.filter(
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
  }, [filteredAccess, filters, filterText]);

  // Função para abrir o modal de edição
  const handleOpenEditModal = (person: Accesses) => {
    const employeeDetails = employeesNoPagination.find(
      (emp) => emp.shortName === person.nameUser
    );
    if (employeeDetails) {
      setSelectedEmployee(employeeDetails);
      setShowEditModal(true);
    } else {
      console.error("Funcionário não encontrado:", person.nameUser);
    }
  };

  // Remove o campo deviceSN e eventDoorId
  const filteredColumns = accessesFields.filter(
    (field) => field.key !== "deviceSN" && field.key !== "eventDoorId"
  );

  // Adicionando as outras colunas
  const otherColumns: TableColumn<Accesses>[] = accessesFields
    .filter((field) => selectedColumns.includes(field.key))
    .sort((a, b) => {
      if (a.key === "eventTime") return 1;
      else if (b.key === "eventTime") return -1;
      else return 0;
    })
    .sort((a, b) => {
      if (a.key === "nameUser") return -1;
      else if (b.key === "nameUser") return 1;
      else return 0;
    })
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
          case "inOutMode":
            switch (row[field.key]) {
              case 0:
                return "Entrada";
              case 1:
                return "Saída";
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
      };
    });

  // Combinando colunas, com a coluna de Presença primeiro
  const columns: TableColumn<Accesses>[] = [presenceColumn, ...otherColumns];

  // Define as opções de paginação de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
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
    }, 1000);

    if (filteredDataTable.length > 0) {
      clearTimeout(timeout);
      setLoading(false);
    }

    return () => clearTimeout(timeout);
  }, [filteredDataTable]);

  // Função para calcular a quantidade de presentes e ausentes
  const calculatePresenceCounts = () => {
    const presentes = accessForGraph.filter((item) => item.isPresent).length;
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
                    defaultSortAsc={false}
                    defaultSortFieldId="eventTime"
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
          <div className={`treeview-container ${perPage >= 50 ? "treeview-container-full-height" : ""}`}>
            <TreeViewDataNaccess onSelectEmployees={handleSelectFromTreeView} />
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
                    defaultSortAsc={false}
                    defaultSortFieldId="eventTime"
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
