import { useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Split from "react-split";

import * as apiService from "../../../api/apiService";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";
import { PrintButton } from "../../../components/PrintButton";
import { SelectFilter } from "../../../components/SelectFilter";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";

import "../../../css/PagesStyles.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { usePersons } from "../../../context/PersonsContext";
import { UpdateModalEmployees } from "../../../modals/UpdateModalEmployees";

import { Employee, EmployeeVisitor } from "../../../types/Types";
import { employeeFields, employeeVisitorFields } from "../../../fields/Fields";
import { SearchBoxContainer } from "../../../components/SearchBoxContainer";
import { CustomSpinner } from "../../../components/CustomSpinner";
import { useMediaQuery } from "react-responsive";
import { TreeViewNaccessVisitorsData } from "../../../components/TreeViewNaccessVisitors";
import { DeleteModal } from "../../../modals/DeleteModal";
import { CreateModalVisitor } from "../../../modals/CreateModalVisitor";
import { UpdateModalVisitor } from "../../../modals/UpdateModalVisitor";

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

// Define a página de acessos
export const NvisitorVisitors = () => {
  const {
    disabledEmployeesNoPagination,
    employeeVisitor,
    setEmployeeVisitor,
    registeredUsers,
    totalVisitorPages,
    totalVisitorRecords,
    fetchEmployeeVisitor,
    handleAddEmployeeVisitor,
    handleUpdateEmployeeVisitor,
    handleDeleteEmployeeVisitor,
    handleUpdateEmployee,
  } = usePersons();
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);
  const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
  const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "estado",
    "dataInicio",
    "dataFim",
    "dataSaida",
    "idVisitante",
    "idPessoa",
    "idInserido",
    "empresaNome",
  ]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [resetSelection, setResetSelection] = useState(false);
  const [selectedRows, setSelectedRows] = useState<EmployeeVisitor[]>([]);
  const [filterText, setFilterText] = useState("");
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [initialData, setInitialData] = useState<Partial<EmployeeVisitor>>({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [selectedEmployeeVisitor, setSelectedEmployeeVisitor] =
    useState<EmployeeVisitor | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVisitorForDelete, setSelectedVisitorForDelete] = useState<
    any | null
  >(null);
  const [currentVisitorIndex, setCurrentVisitorIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalRows, setTotalRows] = useState(0);

  // Função para buscar os dados da paginação
  const fetchPaginationEmployeeVisitor = async (
    pageNo: string,
    perPage: string
  ) => {
    setLoading(true);
    try {
      const data = await apiService.fetchAllEmployeeVisitors(
        undefined,
        undefined,
        pageNo,
        perPage
      );
      setEmployeeVisitor(data.data);
      setTotalRows(data.totalRecords);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar visitantes paginados:", error);
      setEmployeeVisitor([]);
      setLoading(false);
    }
  };

  // Função para buscar todos os visitantes entre datas
  const fetchVisitorsBetweenDates = async () => {
    try {
      const data = await apiService.fetchAllEmployeeVisitors(
        startDate,
        endDate
      );
      setEmployeeVisitor(data.data);
      setTotalRows(data.totalRecords);
    } catch (error) {
      console.error("Erro ao buscar visitantes entre datas:", error);
    }
  };

  // Função para buscar os visitantes de hoje
  const fetchVisitorsToday = async () => {
    const today = new Date();
    const start = formatDateToStartOfDay(today);
    const end = formatDateToEndOfDay(today);
    try {
      const data = await apiService.fetchAllEmployeeVisitors(
        undefined,
        start,
        end
      );
      setEmployeeVisitor(data.data);
      setTotalRows(data.totalRecords);
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error("Erro ao buscar visitantes hoje:", error);
    }
  };

  // Função para buscar os visitantes de ontem
  const fetchVisitorsForPreviousDay = async () => {
    const prevDate = new Date(startDate);
    prevDate.setDate(prevDate.getDate() - 1);

    const start = formatDateToStartOfDay(prevDate);
    const end = formatDateToEndOfDay(prevDate);

    try {
      const data = await apiService.fetchAllEmployeeVisitors(start, end);
      setEmployeeVisitor(data.data);
      setTotalRows(data.totalRecords);
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error("Erro ao buscar visitantes ontem:", error);
    }
  };

  // Função para buscar os visitantes de amanhã
  const fetchVisitorsForNextDay = async () => {
    const newDate = new Date(endDate);
    newDate.setDate(newDate.getDate() + 1);

    if (newDate > new Date()) {
      return;
    }

    const start = formatDateToStartOfDay(newDate);
    const end = formatDateToEndOfDay(newDate);

    try {
      const data = await apiService.fetchAllEmployeeVisitors(start, end);
      setEmployeeVisitor(data.data);
      setTotalRows(data.totalRecords);
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error("Erro ao buscar visitantes amanhã:", error);
    }
  };

  // Função para adicionar um visitante
  const addVisitor = async (visitor: Partial<EmployeeVisitor>) => {
    await handleAddEmployeeVisitor(visitor);
    refreshVisitor();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para atualizar um visitante
  const updateVisitor = async (visitor: Partial<EmployeeVisitor>) => {
    await handleUpdateEmployeeVisitor(visitor);
    refreshVisitor();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para deletar visitantes sequencialmente
  const deleteVisitor = async (employeeIds: string[]) => {
    await handleDeleteEmployeeVisitor(employeeIds);
    refreshVisitor();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para atualizar um funcionário e um cartão
  const updateEmployeeAndCard = async (employee: Employee) => {
    await handleUpdateEmployee(employee);
    refreshVisitor();
    setClearSelectionToggle((prev) => !prev);
  };

  // Busca os dados se a paginação mudar
  useEffect(() => {
    fetchPaginationEmployeeVisitor(String(currentPage), String(perPage));
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
        const foundEmployees = await apiService.fetchAllEmployeeVisitors(
          undefined,
          undefined,
          undefined,
          undefined,
          selectedIds
        );
        if (foundEmployees.data) {
          setEmployeeVisitor(foundEmployees.data);
          setTotalRows(foundEmployees.totalRecords);
        } else {
          setEmployeeVisitor([]);
        }
      } catch (error) {
        console.error("Erro ao buscar visitantes por ID:", error);
      }
    } else {
      refreshVisitor();
      setEmployeeVisitor(employeeVisitor);
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
    const allColumnKeys = employeeVisitorFields.map((field) => field.key);
    setSelectedColumns(allColumnKeys);
  };

  // Função para resetar as colunas
  const handleResetColumns = () => {
    setSelectedColumns([
      "estado",
      "dataInicio",
      "dataFim",
      "dataSaida",
      "idVisitante",
      "idPessoa",
      "idInserido",
      "empresaNome",
    ]);
  };

  // Função para atualizar os visitantes
  const refreshVisitor = () => {
    fetchEmployeeVisitor(undefined, undefined, "1", "20");
    setTotalRows(totalVisitorRecords);
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
    selectedRows: EmployeeVisitor[];
  }) => {
    setSelectedRows(state.selectedRows);
  };

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
    if (!Array.isArray(employeeVisitor)) {
      return [];
    }
    return employeeVisitor.filter(
      (emp) =>
        Object.keys(filters).every(
          (key) =>
            filters[key] === "" ||
            (emp[key] != null &&
              String(emp[key])
                .toLowerCase()
                .includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(emp).some(([key, value]) => {
          if (selectedColumns.includes(key) && value != null) {
            if (key === "dataInicio" || key === "dataFim" || key === "dataSaida") {
              const date = new Date(value);
              const formatted = formatDateDDMMYYYY(date);
              return formatted.toLowerCase().includes(filterText.toLowerCase());
            }
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
  }, [employeeVisitor, filters, filterText, selectedColumns]);

  // Função para abrir o modal de edição
  const handleOpenEditModal = (person: EmployeeVisitor) => {
    const employeeDetails = disabledEmployeesNoPagination.find(
      (emp) =>
        emp.employeeID === person.idVisitante ||
        emp.employeeID === person.idPessoa
    );

    if (employeeDetails) {
      setSelectedEmployee(employeeDetails);
      setShowEditModal(true);
    } else {
      console.error("Funcionário não encontrado");
    }
  };

  // Define os dados iniciais ao duplicar
  const handleDuplicate = (entity: Partial<EmployeeVisitor>) => {
    setInitialData(entity);
    setShowAddModal(true);
    setSelectedEmployeeVisitor(null);
    setShowUpdateModal(false);
  };

  // Função para editar um visitante
  const handleEditVisitor = (visitor: EmployeeVisitor) => {
    setSelectedEmployeeVisitor(visitor);
    const sortedVisitors = employeeVisitor.sort(
      (a, b) =>
        new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime()
    );
    const visitorIndex = sortedVisitors.findIndex(
      (emp) => emp.id === visitor.id
    );
    setCurrentVisitorIndex(visitorIndex);
    setShowUpdateModal(true);
  };

  // Seleciona o visitante anterior
  const handleNextVisitor = () => {
    const sortedVisitors = employeeVisitor.sort(
      (a, b) =>
        new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime()
    );
    if (currentVisitorIndex < sortedVisitors.length - 1) {
      setCurrentVisitorIndex(currentVisitorIndex + 1);
      setSelectedEmployeeVisitor(sortedVisitors[currentVisitorIndex + 1]);
    }
  };

  // Seleciona o visitante seguinte
  const handlePrevVisitor = () => {
    const sortedVisitors = employeeVisitor.sort(
      (a, b) =>
        new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime()
    );
    if (currentVisitorIndex > 0) {
      setCurrentVisitorIndex(currentVisitorIndex - 1);
      setSelectedEmployeeVisitor(sortedVisitors[currentVisitorIndex - 1]);
    }
  };

  // Função para abrir o modal de apagar visitante
  const handleOpenDeleteModal = (id: string) => {
    setSelectedVisitorForDelete(id);
    setShowDeleteModal(true);
  };

  // Função para deletar vários visitantes
  const handleSelectedVisitorToDelete = () => {
    const visitorIds = Array.from(new Set(selectedRows.map((emp) => emp.id)));
    setSelectedVisitorForDelete(visitorIds);
    setShowDeleteModal(true);
  };

  // Configurando a função onDelete para iniciar o processo de exclusão
  const startDeletionProcess = () => {
    let visitorIds;

    if (Array.isArray(selectedVisitorForDelete)) {
      visitorIds = selectedVisitorForDelete;
    } else if (selectedVisitorForDelete) {
      visitorIds = [selectedVisitorForDelete];
    } else {
      visitorIds = Array.from(new Set(selectedRows.map((emp) => emp.id)));
    }

    setShowDeleteModal(false);
    deleteVisitor(visitorIds);
  };

  // Função para remover propriedades com null ou "" antes de alterar o estado
  const cleanObject = (obj: Record<string, any>) => {
    return Object.keys(obj).reduce((acc, key) => {
      const value = obj[key];
      if (value !== null && value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);
  };

  // Função para alterar o estado de um visitante
  const handleUpdateEstado = async (
    visitor: EmployeeVisitor,
    newEstado: number,
    newDataSaida?: Date
  ) => {
    const { companions, ...visitorWithoutCompanions } = visitor;
    const updatedVisitor = {
      ...visitorWithoutCompanions,
      estado: newEstado,
      dataSaida: newDataSaida,
    };

    const cleanedVisitor = cleanObject(updatedVisitor);

    const payload = {
      visitor: cleanedVisitor,
      companionEmployeeIds: companions.map((comp) => comp.employeeId),
    };

    await updateVisitor(payload as unknown as EmployeeVisitor);
  };

  // Define as colunas
  const columns: TableColumn<EmployeeVisitor>[] = employeeVisitorFields
    .filter((field) => selectedColumns.includes(field.key))
    .map((field) => {
      if (field.key === "idVisitante") {
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
          cell: (row: EmployeeVisitor) => {
            const visitor = disabledEmployeesNoPagination.find(
              (emp) => String(emp.employeeID) === String(row.idVisitante)
            );
            return (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleOpenEditModal(row)}
              >
                {visitor ? visitor.name : ""}
              </div>
            );
          },
        };
      }
      if (field.key === "idPessoa") {
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
          cell: (row: EmployeeVisitor) => {
            const person = disabledEmployeesNoPagination.find(
              (emp) => String(emp.employeeID) === String(row.idPessoa)
            );
            return (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleOpenEditModal(row)}
              >
                {person ? person.name : ""}
              </div>
            );
          },
        };
      }
      const formatField = (row: EmployeeVisitor) => {
        switch (field.key) {
          case "dataInicio":
          case "dataFim":
          case "dataSaida": {
            const rawValue = row[field.key];
            if (!rawValue) return "";
            const formattedDate = new Date(String(rawValue)).toLocaleString();
            return formattedDate === "01/01/1970, 01:00:00"
              ? ""
              : formattedDate;
          }
          case "estado":
            switch (row[field.key]) {
              case 0:
                return "Pronto para Iniciar";
              case 1:
                return "Em Andamento";
              case 2:
                return "Terminado";
              case 3:
                return "Em Espera";
              default:
                return row[field.key] || "";
            }
          case "idInserido":
            const employee = registeredUsers.find(
              (emp) => emp.id === row[field.key]
            );
            return employee ? employee.userName : "";
          default:
            return row[field.key] || "";
        }
      };
      return {
        id: field.key,
        name: (
          <>
            {field.label}
            {field.key !== "dataInicio" && (
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
          new Date(rowB.dataInicio).getTime() -
          new Date(rowA.dataInicio).getTime(),
      };
    });

  // Define as opções de paginação de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Define a coluna de ações
  const actionColumn: TableColumn<EmployeeVisitor> = {
    name: "Ações",
    cell: (row: EmployeeVisitor) => (
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
            onClick={() => handleEditVisitor(row)}
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
            onClick={() => handleOpenDeleteModal(row.id)}
          />
        </OverlayTrigger>
        {row.estado === 0 && (
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
            overlay={<Tooltip className="custom-tooltip">Iniciar</Tooltip>}
          >
            <CustomOutlineButton
              className="action-button"
              icon="bi bi-play"
              onClick={() => handleUpdateEstado(row, 1)}
            />
          </OverlayTrigger>
        )}
        {row.estado === 3 && (
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
            overlay={<Tooltip className="custom-tooltip">Continuar</Tooltip>}
          >
            <CustomOutlineButton
              className="action-button"
              icon="bi bi-play"
              onClick={() => handleUpdateEstado(row, 1)}
            />
          </OverlayTrigger>
        )}
        {row.estado === 1 && (
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
            overlay={<Tooltip className="custom-tooltip">Pausar</Tooltip>}
          >
            <CustomOutlineButton
              className="action-button"
              icon="bi bi-pause"
              onClick={() => handleUpdateEstado(row, 3)}
            />
          </OverlayTrigger>
        )}
        {(row.estado === 1 || row.estado === 3) && (
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
            overlay={<Tooltip className="custom-tooltip">Terminar</Tooltip>}
          >
            <CustomOutlineButton
              className="action-button"
              icon="bi bi-stop"
              onClick={() =>
                handleUpdateEstado(
                  row,
                  2,
                  new Date(new Date().toISOString().substring(0, 16))
                )
              }
            />
          </OverlayTrigger>
        )}
      </div>
    ),
    selector: (row: EmployeeVisitor) => row.id,
    ignoreRowClick: true,
  };

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return employeeVisitorFields.filter((field) =>
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
              <span>Visitantes</span>
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
                    onClick={refreshVisitor}
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
                    onClick={() => setShowAddModal(true)}
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
                      Apagar Selecionados
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-trash"
                    onClick={handleSelectedVisitorToDelete}
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
                    onClick={fetchVisitorsToday}
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
                    onClick={fetchVisitorsForPreviousDay}
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
                    onClick={fetchVisitorsForNextDay}
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
                    onClick={fetchVisitorsBetweenDates}
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
                    pagination
                    paginationComponentOptions={paginationOptions}
                    onRowDoubleClicked={handleEditVisitor}
                    selectableRows
                    paginationRowsPerPageOptions={[20, 50]}
                    clearSelectedRows={clearSelectionToggle}
                    selectableRowsHighlight
                    onSelectedRowsChange={handleRowSelected}
                    noDataComponent="Não existem dados disponíveis para mostrar."
                    customStyles={customStyles}
                    striped
                    responsive
                    persistTableHead={true}
                    defaultSortAsc={true}
                    defaultSortFieldId="dataInicio"
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
                        onClick={() => handlePageChange(totalVisitorPages)}
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
            <TreeViewNaccessVisitorsData
              onSelectEmployees={handleSelectFromTreeView}
            />
          </div>
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span>Visitantes</span>
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
                    onClick={refreshVisitor}
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
                    onClick={() => setShowAddModal(true)}
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
                      Apagar Selecionados
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-trash"
                    onClick={handleSelectedVisitorToDelete}
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
                    onClick={fetchVisitorsToday}
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
                    onClick={fetchVisitorsForPreviousDay}
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
                    onClick={fetchVisitorsForNextDay}
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
                    onClick={fetchVisitorsBetweenDates}
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
                    pagination
                    paginationComponentOptions={paginationOptions}
                    onRowDoubleClicked={handleEditVisitor}
                    selectableRows
                    paginationRowsPerPageOptions={[20, 50]}
                    clearSelectedRows={clearSelectionToggle}
                    selectableRowsHighlight
                    onSelectedRowsChange={handleRowSelected}
                    noDataComponent="Não existem dados disponíveis para mostrar."
                    customStyles={customStyles}
                    striped
                    responsive
                    persistTableHead={true}
                    defaultSortAsc={true}
                    defaultSortFieldId="dataInicio"
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
                        onClick={() => handlePageChange(totalVisitorPages)}
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
          columns={employeeVisitorFields}
          selectedColumns={selectedColumns}
          onClose={() => setShowColumnSelector(false)}
          onColumnToggle={handleColumnToggle}
          onResetColumns={handleResetColumns}
          onSelectAllColumns={handleSelectAllColumns}
        />
      )}
      <CreateModalVisitor
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={addVisitor}
        fields={employeeVisitorFields}
        title="Adicionar Visitante"
        initialValues={initialData || {}}
      />
      {selectedEmployeeVisitor && (
        <UpdateModalVisitor
          open={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={updateVisitor}
          onDuplicate={handleDuplicate}
          entity={selectedEmployeeVisitor}
          fields={employeeVisitorFields}
          title="Atualizar Visitante"
          canMoveNext={currentVisitorIndex < employeeVisitor.length - 1}
          canMovePrev={currentVisitorIndex > 0}
          onPrev={handlePrevVisitor}
          onNext={handleNextVisitor}
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
      <DeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={startDeletionProcess}
        entityId={selectedVisitorForDelete}
      />
    </div>
  );
};
