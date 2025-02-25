import { useEffect, useMemo, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import Split from "react-split";

import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { customStyles } from "../../components/CustomStylesDataTable";
import { ExpandedComponentEmpZoneExtEnt } from "../../components/ExpandedComponentEmpZoneExtEnt";
import { ExportButton } from "../../components/ExportButton";

import { PrintButton } from "../../components/PrintButton";
import { SelectFilter } from "../../components/SelectFilter";
import { TreeViewDataUsers } from "../../components/TreeViewRegisteredUsers";

import { usePersons } from "../../context/PersonsContext";
import { registerFields } from "../../fields/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { CreateModalRegisterUsers } from "../../modals/CreateModalRegisterUsers";
import { DeleteModal } from "../../modals/DeleteModal";
import { UpdateModalRegisterUsers } from "../../modals/UpdateModalRegisterUser";
import { Register } from "../../types/Types";
import { SearchBoxContainer } from "../../components/SearchBoxContainer";
import { CustomSpinner } from "../../components/CustomSpinner";
import { useMediaQuery } from "react-responsive";

export const NewUsers = () => {
  const {
    registeredUsers,
    fetchAllRegisteredUsers,
    handleAddUsers,
    handleUpdateUser,
    handleDeleteUser,
  } = usePersons();
  const [openColumnSelector, setOpenColumnSelector] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "name",
    "userName",
    "emailAddress",
    "roles",
  ]);
  const [filterText, setFilterText] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Register | null>(null);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState<
    string | null
  >(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [initialData, setInitialData] = useState<Partial<Register> | null>(
    null
  );
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [selectedRows, setSelectedRows] = useState<Register[]>([]);
  const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<Register[]>([]);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 500 });

  // Busca os utilizadores ao carregar a página
  useEffect(() => {
    fetchAllRegisteredUsers();
  }, []);

  // Função para atualizar os utilizadores
  const refreshUsers = () => {
    fetchAllRegisteredUsers();
    setClearSelectionToggle((prev) => !prev);
  };

  // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
  useEffect(() => {
    if (selectedDevicesIds.length > 0) {
      const filteredData = registeredUsers.filter((user) =>
        selectedDevicesIds.includes(user.name)
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(registeredUsers);
    }
  }, [selectedDevicesIds, registeredUsers]);

  // Função para editar um utilizador
  const handleEditUsers = (User: Register) => {
    setSelectedUser(User);
    setShowUpdateModal(true);
  };

  // Fecha o modal de edição de utilizadores
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedUser(null);
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para selecionar as colunas
  const toggleColumn = (columnName: string) => {
    if (selectedColumns.includes(columnName)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== columnName));
    } else {
      setSelectedColumns([...selectedColumns, columnName]);
    }
  };

  // Função para resetar as colunas
  const resetColumns = () => {
    setSelectedColumns(["name", "userName", "emailAddress", "roles"]);
  };

  // Função para selecionar todas as colunas
  const onSelectAllColumns = (allColumnKeys: string[]) => {
    setSelectedColumns(allColumnKeys);
  };

  // Define a abertura do modal de apagar controle de acesso
  const handleOpenDeleteModal = (id: string) => {
    setSelectedUserToDelete(id);
    setShowDeleteModal(true);
  };

  // Função para duplicar um utilizador
  const handleDuplicate = (user: Partial<Register>) => {
    setShowAddModal(true);
    setInitialData(user);
    setSelectedUser(null);
    setShowUpdateModal(false);
  };

  // Opções de paginação da tabela com troca de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Seleciona a linha da tabela
  const handleRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Register[];
  }) => {
    setSelectedRows(state.selectedRows);
  };

  // Define a seleção da árvore
  const handleSelectFromTreeView = (selectedIds: string[]) => {
    setSelectedDevicesIds(selectedIds);
  };

  // Seleciona a entidade anterior
  const handleNextUser = () => {
    if (currentUserIndex < registeredUsers.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
      setSelectedUser(registeredUsers[currentUserIndex + 1]);
    }
  };

  // Seleciona a entidade seguinte
  const handlePrevUser = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
      setSelectedUser(registeredUsers[currentUserIndex - 1]);
    }
  };

  // Define o componente de linha expandida
  const expandableRowComponent = (row: Register) => (
    <ExpandedComponentEmpZoneExtEnt data={row} fields={registerFields} />
  );

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
    if (!Array.isArray(filteredData)) {
      return [];
    }
    return filteredData.filter(
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
  }, [filteredData, filters, filterText]);

  // Define a colunas excluídas
  const excludedColumns = ["id", "password", "confirmPassword"];

  // Define as colunas da tabela
  const columns: TableColumn<Register>[] = registerFields
    .filter((field) => selectedColumns.includes(field.key))
    .filter((field) => !excludedColumns.includes(field.key))
    .map((field) => {
      const formatField = (row: Register) => {
        switch (field.key) {
          case "roles":
            return row.roles
              ? row.roles.join(", ")
              : "Conta sem tipo especificado";
          case "profileImage":
            return row.profileImage ? "Imagem disponível" : "Sem imagem";
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
        selector: (row) => formatField(row),
        sortable: true,
      };
    });

  // Define a coluna de ações
  const actionColumn: TableColumn<Register> = {
    name: "Ações",
    cell: (row: Register) => (
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
            icon="bi bi-pencil-fill"
            onClick={() => handleEditUsers(row)}
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
            icon="bi bi-trash-fill"
            onClick={() => handleOpenDeleteModal(row.id)}
          />
        </OverlayTrigger>
      </div>
    ),
    selector: (row: Register) => row.id,
    ignoreRowClick: true,
  };

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return registerFields.filter((field) =>
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

  return (
    <div className="dashboard-container">
      <div className="content-container">
        {isMobile && (
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span style={{ color: "#000000" }}>Utilizadores</span>
            </div>
            <div className="datatable-header">
              <div>
                <SearchBoxContainer
                  onSearch={(value) => setFilterText(value)}
                />
              </div>
              <div className="buttons-container-others">
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
                    onClick={refreshUsers}
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
                  overlay={
                    <Tooltip className="custom-tooltip">Colunas</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-eye"
                    onClick={() => setOpenColumnSelector(true)}
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
                    onRowDoubleClicked={handleEditUsers}
                    pagination
                    paginationComponentOptions={paginationOptions}
                    paginationPerPage={20}
                    paginationRowsPerPageOptions={[20, 50]}
                    selectableRows
                    onSelectedRowsChange={handleRowSelected}
                    clearSelectedRows={clearSelectionToggle}
                    expandableRows
                    expandableRowsComponent={({ data }) =>
                      expandableRowComponent(data)
                    }
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
          <div className="treeview-container">
            <TreeViewDataUsers onSelectDevices={handleSelectFromTreeView} />
          </div>
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span style={{ color: "#000000" }}>Utilizadores</span>
            </div>
            <div className="datatable-header">
              <div>
                <SearchBoxContainer
                  onSearch={(value) => setFilterText(value)}
                />
              </div>
              <div className="buttons-container-others">
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
                    onClick={refreshUsers}
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
                  overlay={
                    <Tooltip className="custom-tooltip">Colunas</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-eye"
                    onClick={() => setOpenColumnSelector(true)}
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
                    onRowDoubleClicked={handleEditUsers}
                    pagination
                    paginationComponentOptions={paginationOptions}
                    paginationPerPage={20}
                    paginationRowsPerPageOptions={[20, 50]}
                    selectableRows
                    onSelectedRowsChange={handleRowSelected}
                    clearSelectedRows={clearSelectionToggle}
                    expandableRows
                    expandableRowsComponent={({ data }) =>
                      expandableRowComponent(data)
                    }
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
            </div>
          </div>
        </Split>
      </div>
      <CreateModalRegisterUsers
        title="Adicionar Registo de Utilizador"
        open={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setClearSelectionToggle((prev) => !prev);
        }}
        onSave={handleAddUsers}
        fields={registerFields}
        initialValues={initialData || {}}
      />
      {selectedUser && (
        <UpdateModalRegisterUsers
          open={showUpdateModal}
          onClose={handleCloseUpdateModal}
          onUpdate={handleUpdateUser}
          entity={selectedUser}
          fields={registerFields}
          onDuplicate={handleDuplicate}
          title="Atualizar Registo de Utilizador"
          canMoveNext={currentUserIndex < registeredUsers.length - 1}
          canMovePrev={currentUserIndex > 0}
          onNext={handleNextUser}
          onPrev={handlePrevUser}
        />
      )}
      <DeleteModal
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setClearSelectionToggle((prev) => !prev);
        }}
        onDelete={handleDeleteUser}
        entityId={selectedUserToDelete}
      />
      {openColumnSelector && (
        <ColumnSelectorModal
          columns={registerFields.filter(
            (field) => !excludedColumns.includes(field.key)
          )}
          selectedColumns={selectedColumns}
          onClose={() => setOpenColumnSelector(false)}
          onColumnToggle={toggleColumn}
          onResetColumns={resetColumns}
          onSelectAllColumns={onSelectAllColumns}
        />
      )}
    </div>
  );
};
