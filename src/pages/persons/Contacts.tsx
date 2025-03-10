import { useEffect, useMemo, useState } from "react";

import "../../css/PagesStyles.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";

import Split from "react-split";
import * as apiService from "../../api/apiService";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { customStyles } from "../../components/CustomStylesDataTable";
import { ExpandedComponentEmpZoneExtEnt } from "../../components/ExpandedComponentEmpZoneExtEnt";
import { ExportButton } from "../../components/ExportButton";
import { PrintButton } from "../../components/PrintButton";
import { SelectFilter } from "../../components/SelectFilter";
import { TreeViewData } from "../../components/TreeView";

import { usePersons } from "../../context/PersonsContext";
import { employeeFields } from "../../fields/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { CreateModalEmployees } from "../../modals/CreateModalEmployees";
import { DeleteModal } from "../../modals/DeleteModal";
import { UpdateModalEmployees } from "../../modals/UpdateModalEmployees";
import { Employee } from "../../types/Types";

import { SearchBoxContainer } from "../../components/SearchBoxContainer";
import { CustomSpinner } from "../../components/CustomSpinner";
import { AddEmployeeToPersonFilterModal } from "../../modals/AddEmployeeToPersonFilterModal";
import { useMediaQuery } from "react-responsive";

// Define a interface para os filtros
interface Filters {
  [key: string]: string;
}

// Define a página de Contactos
export const Contacts = () => {
  const {
    disabledEmployees,
    data,
    fetchAllDisabledEmployees,
    fetchEmployeesById,
    handleAddEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee,
    totalEmployeePages,
    totalEmployeeRecords
  } = usePersons();
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [filterText, setFilterText] = useState("");
  const [openColumnSelector, setOpenColumnSelector] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "enrollNumber",
    "name",
    "shortName",
    "status",
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState<
    any | null
  >(null);
  const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [initialData, setInitialData] = useState<Employee | null>(null);
  const [filters, setFilters] = useState<Filters>({});
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [currentEmployeeIndex, setCurrentEmployeeIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showNewAddModal, setShowNewAddModal] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalRows, setTotalRows] = useState(0);

  // Função para buscar os dados da paginação
  const fetchPaginationPersons = async (pageNo: string, perPage: string) => {
    setLoading(true);
    try {
      const data = await apiService.fetchAllEmployeesWithDisabled(
        pageNo,
        perPage,
        "Contacto"
      );
      setFilteredEmployees(data.data);
      setTotalRows(data.totalRecords);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar funcionários paginados:", error);
      setLoading(false);
    }
  };

  // Função para adicionar um funcionário e um cartão
  const addEmployeeAndCard = async (employee: Partial<Employee>) => {
    await handleAddEmployee(employee as Employee);
    refreshEmployees();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para atualizar um funcionário e um cartão
  const updateEmployeeAndCard = async (employee: Employee) => {
    await handleUpdateEmployee(employee);
    refreshEmployees();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para deletar funcionários sequencialmente
  const deleteSelectedEmployees = async (employeeIds: string[]) => {
    await handleDeleteEmployee(employeeIds);
    refreshEmployees();
    setClearSelectionToggle((prev) => !prev);
  };

  // Busca os funcionários paginados ao mudar a página
  useEffect(() => {
    fetchPaginationPersons(currentPage.toString(), perPage.toString());
  }, [currentPage, perPage]);

  // Atualiza os funcionários
  const refreshEmployees = () => {
    fetchAllDisabledEmployees("1", "20", "Contacto");
    setTotalRows(totalEmployeeRecords);
    setClearSelectionToggle((prev) => !prev);
  };

  // Atualiza o índice do funcionário selecionado
  useEffect(() => {
    if (selectedEmployee) {
      const sortedEmployees = filteredEmployees.sort(
        (a, b) => Number(a.enrollNumber) - Number(b.enrollNumber)
      );
      const employeeIndex = sortedEmployees.findIndex(
        (emp) => emp.employeeID === selectedEmployee.employeeID
      );
      setCurrentEmployeeIndex(employeeIndex);
    }
  }, [selectedEmployee, data.employees]);

  // Callback disparado ao mudar a página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Callback disparado ao mudar o tamanho da página
  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  // Função para adicionar um funcionário a um novo tipo
  const handleAddEmployeeToNewType = async (employeeData: {
    employee: Employee;
    employeeCards?: any[];
  }) => {
    await updateEmployeeAndCard(employeeData.employee);
    setFilteredEmployees((prev) => {
      const updatedEmployees = [
        ...prev,
        {
          ...employeeData.employee,
          employeeCards: employeeData.employeeCards || [],
        },
      ];
      return updatedEmployees;
    });
  };

  // Define a seleção da árvore
  const handleSelectFromTreeView = async (selectedIds: string[]) => {
    setSelectedEmployeeIds(selectedIds);

    if (selectedIds.length > 0) {
      try {
        const foundEmployees = await fetchEmployeesById(selectedIds);
        if (foundEmployees) {
          setFilteredEmployees(foundEmployees);
          setTotalRows(foundEmployees.length);
        } else {
          setFilteredEmployees([]);
        }
      } catch (error) {
        console.error("Erro ao buscar funcionários por ID:", error);
      }
    } else {
      refreshEmployees();
      setFilteredEmployees(disabledEmployees);
    }
  };

  // Define a função para abrir o modal de apagar contacto
  const handleOpenDeleteModal = (employeeID: string) => {
    setSelectedEmployeeToDelete(employeeID);
    setShowDeleteModal(true);
  };

  // Define a função para abrir o modal de atualizar contacto
  const toggleColumn = (columnName: string) => {
    if (selectedColumns.includes(columnName)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== columnName));
    } else {
      setSelectedColumns([...selectedColumns, columnName]);
    }
  };

  // Define a função para resetar as colunas
  const resetColumns = () => {
    setSelectedColumns(["enrollNumber", "name", "shortName"]);
  };

  // Define a função para selecionar todas as colunas
  const onSelectAllColumns = (allColumnKeys: string[]) => {
    setSelectedColumns(allColumnKeys);
  };

  // Define a função selecionar uma linha
  const handleRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Employee[];
  }) => {
    const sortedSelectedRows = state.selectedRows.sort(
      (a, b) => parseInt(a.enrollNumber) - parseInt(b.enrollNumber)
    );
    setSelectedRows(sortedSelectedRows);
  };

  // Função para deletar vários funcionários
  const handleSelectedEmployeesToDelete = () => {
    const employeeIds = Array.from(
      new Set(selectedRows.map((employee) => employee.employeeID))
    );
    setSelectedEmployeeToDelete(employeeIds);
    setShowDeleteModal(true);
  };

  // Configurando a função onDelete para iniciar o processo de exclusão
  const startDeletionProcess = () => {
    let employeeIds;

    if (Array.isArray(selectedEmployeeToDelete)) {
      employeeIds = selectedEmployeeToDelete;
    } else if (selectedEmployeeToDelete) {
      employeeIds = [selectedEmployeeToDelete];
    } else {
      employeeIds = Array.from(
        new Set(selectedRows.map((emp) => emp.employeeID))
      );
    }

    setShowDeleteModal(false);
    deleteSelectedEmployees(employeeIds);
  };

  // Define a função de duplicar contactos
  const handleDuplicate = (data: Employee) => {
    setInitialData(data);
    setShowAddModal(true);
    setShowUpdateModal(false);
    setSelectedEmployee(null);
  };

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
    if (!Array.isArray(filteredEmployees)) {
      return [];
    }
    return filteredEmployees.filter(
      (employee) =>
        Object.keys(filters).every(
          (key) =>
            filters[key] === "" ||
            (employee[key] != null &&
              String(employee[key])
                .toLowerCase()
                .includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(employee).some(([key, value]) => {
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
  }, [filteredEmployees, filters, filterText]);

  // Define as colunas
  const columns: TableColumn<Employee>[] = employeeFields
    .filter((field) => selectedColumns.includes(field.key))
    .map((field) => {
      const formatField = (row: Employee) => {
        switch (field.key) {
          case "birthday":
          case "admissionDate":
          case "bIissuance":
          case "biValidity":
          case "exitDate": {
            const formattedDate = new Date(row[field.key]).toLocaleString();
            if (formattedDate === "01/01/1970, 01:00:00") {
              return "";
            }
            return formattedDate;
          }
          case "status":
            return row.status ? "Activo" : "Inactivo";
          case "statusEmail":
            return row.statusEmail ? "Activo" : "Inactivo";
          case "rgpdAut":
            return row.rgpdAut ? "Autorizado" : "Não Autorizado";
          case "departmentId":
            return row.departmentName || "";
          case "professionId":
            return row.professionName || "";
          case "categoryId":
            return row.categoryName || "";
          case "groupId":
            return row.groupName || "";
          case "zoneId":
            return row.zoneName || "";
          case "externalEntityId":
            return row.externalEntityName || "";
          case "accPlanoAcessoId":
            return row.accPlanoAcessoName || "";
          case "photo":
            return row.photo ? "Imagem disponível" : "Sem imagem";
          case "cardNumber":
            return row.employeeCards?.[0]?.cardNumber || "";
          case "entidadeId":
            return row.entidadeName || "";
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
              data={filteredDataTable}
            />
          </>
        ),
        selector: (row: Employee) => {
          if (field.key === "enrollNumber") {
            return parseInt(row.enrollNumber) || 0;
          }
          return row[field.key] || "";
        },
        sortable: true,
        cell: (row: Employee) => formatField(row),
      };
    });

  // Define a função para editar um contacto
  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    const sortedEmployees = filteredEmployees.sort(
      (a, b) => Number(a.enrollNumber) - Number(b.enrollNumber)
    );
    const employeeIndex = sortedEmployees.findIndex(
      (emp) => emp.employeeID === employee.employeeID
    );
    setCurrentEmployeeIndex(employeeIndex);
    setShowUpdateModal(true);
  };

  // Seleciona o funcionário anterior
  const handleNextEmployee = () => {
    const sortedEmployees = filteredEmployees.sort(
      (a, b) => Number(a.enrollNumber) - Number(b.enrollNumber)
    );
    if (currentEmployeeIndex < sortedEmployees.length - 1) {
      setCurrentEmployeeIndex(currentEmployeeIndex + 1);
      setSelectedEmployee(sortedEmployees[currentEmployeeIndex + 1]);
    }
  };

  // Seleciona o funcionário seguinte
  const handlePrevEmployee = () => {
    const sortedEmployees = filteredEmployees.sort(
      (a, b) => Number(a.enrollNumber) - Number(b.enrollNumber)
    );
    if (currentEmployeeIndex > 0) {
      setCurrentEmployeeIndex(currentEmployeeIndex - 1);
      setSelectedEmployee(sortedEmployees[currentEmployeeIndex - 1]);
    }
  };

  // Define o componente de paginação para troca de EN por PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Define o componente de linha expandida
  const expandableRowComponent = (row: Employee) => (
    <ExpandedComponentEmpZoneExtEnt data={row} fields={employeeFields} />
  );

  // Define a coluna de ações
  const actionColumn: TableColumn<Employee> = {
    name: "Ações",
    cell: (row: Employee) => (
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
            onClick={() => handleEditEmployee(row)}
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
            onClick={() => handleOpenDeleteModal(row.employeeID)}
          />
        </OverlayTrigger>
      </div>
    ),
    selector: (row: Employee) => row.employeeID,
    ignoreRowClick: true,
  };

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return employeeFields.filter((field) =>
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
              <span style={{ color: "#000000" }}>Contactos</span>
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
                    onClick={refreshEmployees}
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
                  overlay={<Tooltip className="custom-tooltip">Novo</Tooltip>}
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
                  overlay={
                    <Tooltip className="custom-tooltip">Adicionar</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-person-plus"
                    onClick={() => setShowNewAddModal(true)}
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
                    onClick={() => setOpenColumnSelector(true)}
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
                    onClick={handleSelectedEmployeesToDelete}
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
                    onRowDoubleClicked={handleEditEmployee}
                    pagination
                    paginationComponentOptions={paginationOptions}
                    paginationRowsPerPageOptions={[20, 50, 100]}
                    expandableRows
                    expandableRowsComponent={({ data }) =>
                      expandableRowComponent(data)
                    }
                    selectableRows
                    onSelectedRowsChange={handleRowSelected}
                    clearSelectedRows={clearSelectionToggle}
                    selectableRowsHighlight
                    noDataComponent="Não existem dados disponíveis para mostrar."
                    customStyles={customStyles}
                    striped
                    responsive
                    persistTableHead={true}
                    defaultSortAsc={true}
                    defaultSortFieldId="enrollNumber"
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
                        onClick={() => handlePageChange(totalEmployeePages)}
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
            <TreeViewData onSelectEmployees={handleSelectFromTreeView} />
          </div>
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span style={{ color: "#000000" }}>Contactos</span>
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
                    onClick={refreshEmployees}
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
                  overlay={<Tooltip className="custom-tooltip">Novo</Tooltip>}
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
                  overlay={
                    <Tooltip className="custom-tooltip">Adicionar</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-person-plus"
                    onClick={() => setShowNewAddModal(true)}
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
                    onClick={() => setOpenColumnSelector(true)}
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
                    onClick={handleSelectedEmployeesToDelete}
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
                    onRowDoubleClicked={handleEditEmployee}
                    pagination
                    paginationComponentOptions={paginationOptions}
                    paginationRowsPerPageOptions={[20, 50, 100]}
                    expandableRows
                    expandableRowsComponent={({ data }) =>
                      expandableRowComponent(data)
                    }
                    selectableRows
                    onSelectedRowsChange={handleRowSelected}
                    clearSelectedRows={clearSelectionToggle}
                    selectableRowsHighlight
                    noDataComponent="Não existem dados disponíveis para mostrar."
                    customStyles={customStyles}
                    striped
                    responsive
                    persistTableHead={true}
                    defaultSortAsc={true}
                    defaultSortFieldId="enrollNumber"
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
                        onClick={() => handlePageChange(totalEmployeePages)}
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
      <CreateModalEmployees
        title="Adicionar Contacto"
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={addEmployeeAndCard}
        fields={employeeFields}
        initialValues={initialData || {}}
      />
      {selectedEmployee && (
        <UpdateModalEmployees
          open={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          onDuplicate={handleDuplicate}
          onUpdate={updateEmployeeAndCard}
          entity={selectedEmployee}
          fields={employeeFields}
          title="Atualizar Contacto"
          canMoveNext={currentEmployeeIndex < data.employees.length - 1}
          canMovePrev={currentEmployeeIndex > 0}
          onNext={handleNextEmployee}
          onPrev={handlePrevEmployee}
        />
      )}
      <DeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={startDeletionProcess}
        entityId={selectedEmployeeToDelete}
      />
      {openColumnSelector && (
        <ColumnSelectorModal
          columns={employeeFields}
          selectedColumns={selectedColumns}
          onClose={() => setOpenColumnSelector(false)}
          onColumnToggle={toggleColumn}
          onResetColumns={resetColumns}
          onSelectAllColumns={onSelectAllColumns}
        />
      )}
      <AddEmployeeToPersonFilterModal
        title="Adicionar Pessoa aos Contactos"
        open={showNewAddModal}
        onClose={() => setShowNewAddModal(false)}
        onUpdate={handleAddEmployeeToNewType}
        entity={filteredDataTable}
        type="Contacto"
      />
    </div>
  );
};
