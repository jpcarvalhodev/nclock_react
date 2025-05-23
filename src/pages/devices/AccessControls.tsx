import { useEffect, useMemo, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";

import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { customStyles } from "../../components/CustomStylesDataTable";
import { ExportButton } from "../../components/ExportButton";

import { PrintButton } from "../../components/PrintButton";
import { SelectFilter } from "../../components/SelectFilter";

import { useTerminals } from "../../context/TerminalsContext";
import { accessControlFields } from "../../fields/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { CreateAccessControlModal } from "../../modals/CreateAccessControlModal";
import { DeleteModal } from "../../modals/DeleteModal";
import { UpdateAccessControlModal } from "../../modals/UpdateAccessControlModal";
import { AccessControl } from "../../types/Types";
import { SearchBoxContainer } from "../../components/SearchBoxContainer";
import { CustomSpinner } from "../../components/CustomSpinner";

export const AccessControls = () => {
  const {
    accessControl,
    fetchAccessControl,
    handleAddAccessControl,
    handleUpdateAccessControl,
    handleDeleteAccessControl,
  } = useTerminals();
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "nome",
    "activo",
  ]);
  const [selectedRows, setSelectedRows] = useState<AccessControl[]>([]);
  const [clearSelectionToggle, setClearSelectionToggle] =
    useState<boolean>(false);
  const [openColumnSelector, setOpenColumnSelector] = useState<boolean>(false);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterText, setFilterText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAccessToDelete, setSelectedAccessToDelete] = useState<
    any | null
  >(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAccessControl, setSelectedAccessControl] =
    useState<AccessControl | null>(null);
  const [initialData, setInitialData] = useState<Partial<AccessControl> | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  // Função para adicionar o controle de acesso
  const addAccessControl = async (newAccessControl: Partial<AccessControl>) => {
    await handleAddAccessControl(newAccessControl);
    refreshAccessControl();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para editar o controle de acesso
  const updateAccessControl = async (
    newAccessControl: Partial<AccessControl>
  ) => {
    await handleUpdateAccessControl(newAccessControl);
    setClearSelectionToggle((prev) => !prev);
    refreshAccessControl();
  };

  // Função para deletar o controle de acesso
  const deleteAccessControl = async (id: string[]) => {
    await handleDeleteAccessControl(id);
    setClearSelectionToggle((prev) => !prev);
    refreshAccessControl();
  };

  // Função para atualizar as listagens de movimentos
  const refreshAccessControl = () => {
    fetchAccessControl();
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
    setSelectedColumns(["nome", "activo"]);
  };

  // Função para selecionar todas as colunas
  const onSelectAllColumns = (allColumnKeys: string[]) => {
    setSelectedColumns(allColumnKeys);
  };

  // Define a função de seleção de linhas
  const handleRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: AccessControl[];
  }) => {
    setSelectedRows(state.selectedRows);
  };

  // Define a função de edição de controle de acesso
  const handleEditAccessControl = (accessControl: AccessControl) => {
    setSelectedAccessControl(accessControl);
    setShowUpdateModal(true);
  };

  // Define a abertura do modal de apagar planos de acesso
  const handleOpenDeleteModal = (timePlan: string) => {
    setSelectedAccessToDelete(timePlan);
    setShowDeleteModal(true);
  };

  // Função para deletar vários planos de acesso
  const handleSelectedAccessPlanToDelete = () => {
    const acPlanIds = Array.from(
      new Set(selectedRows.map((timeplan) => timeplan.id))
    );
    setSelectedAccessToDelete(acPlanIds);
    setShowDeleteModal(true);
  };

  // Configurando a função onDelete para iniciar o processo de exclusão
  const startDeletionProcess = () => {
    let acPlanIds;

    if (Array.isArray(selectedAccessToDelete)) {
      acPlanIds = selectedAccessToDelete;
    } else if (selectedAccessToDelete) {
      acPlanIds = [selectedAccessToDelete];
    } else {
      acPlanIds = Array.from(
        new Set(selectedRows.map((timeplan) => timeplan.id))
      );
    }

    setShowDeleteModal(false);
    deleteAccessControl(acPlanIds);
  };

  // Fecha o modal de atualização de controle de acesso
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedAccessControl(null);
    refreshAccessControl();
  };

  // Define a função de duplicar funcionários
  const handleDuplicate = (data: Partial<AccessControl>) => {
    setInitialData({ ...data, nome: "" });
    setShowAddModal(true);
    setSelectedAccessControl(null);
    setShowUpdateModal(false);
  };

  // Função para selecionar o próximo controle de acesso
  const handleNextAccessControl = () => {
    const currentIndex = accessControl.findIndex(
      (control) => control.id === selectedAccessControl?.id
    );
    if (currentIndex >= 0 && currentIndex < accessControl.length - 1) {
      const newEntity = { ...accessControl[currentIndex + 1] };
      setSelectedAccessControl(newEntity);
    }
  };

  // Função para selecionar o controle de acesso anterior
  const handlePrevAccessControl = () => {
    const currentIndex = accessControl.findIndex(
      (control) => control.id === selectedAccessControl?.id
    );
    if (currentIndex > 0) {
      const newEntity = { ...accessControl[currentIndex - 1] };
      setSelectedAccessControl(newEntity);
    }
  };

  // Opções de paginação da tabela com troca de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
    if (!Array.isArray(accessControl)) {
      return [];
    }
    return accessControl.filter(
      (accessControls) =>
        Object.keys(filters).every(
          (key) =>
            filters[key] === "" ||
            (accessControls[key] != null &&
              String(accessControls[key])
                .toLowerCase()
                .includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(accessControls).some(([key, value]) => {
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
  }, [accessControl, filters, filterText, selectedColumns]);

  // Define a coluna de ações
  const actionColumn: TableColumn<AccessControl> = {
    name: "Ações",
    cell: (row: AccessControl) => (
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
            onClick={() => handleEditAccessControl(row)}
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
      </div>
    ),
    selector: (row: AccessControl) => row.id,
    ignoreRowClick: true,
  };

  // Define as colunas da tabela
  const columns: TableColumn<AccessControl>[] = accessControlFields
    .filter((field) => selectedColumns.includes(field.key))
    .map((field) => {
      const formatField = (row: AccessControl) => {
        switch (field.key) {
          case "activo":
            return row[field.key] ? "Activo" : "Inactivo";
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

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return accessControlFields.filter((field) =>
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
    <div className="dashboard-container">
      <div className="datatable-container">
        <div className="datatable-title-text">
          <span style={{ color: "#000000" }}>Planos de Acessos</span>
        </div>
        <div className="datatable-header">
          <div>
            <SearchBoxContainer onSearch={(value) => setFilterText(value)} />
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
              overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
            >
              <CustomOutlineButton
                icon="bi-arrow-clockwise"
                onClick={refreshAccessControl}
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
              overlay={<Tooltip className="custom-tooltip">Adicionar</Tooltip>}
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
                onClick={() => setOpenColumnSelector(true)}
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
                onClick={handleSelectedAccessPlanToDelete}
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
              data={selectedRows.length > 0 ? selectedRows : filteredDataTable}
              fields={getSelectedFields()}
            />
          </div>
        </div>
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
              paginationPerPage={20}
              paginationRowsPerPageOptions={[20, 50]}
              onRowDoubleClicked={handleEditAccessControl}
              selectableRows
              onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={clearSelectionToggle}
              selectableRowsHighlight
              noDataComponent="Não existem dados disponíveis para mostrar."
              customStyles={customStyles}
              striped
              responsive
              persistTableHead={true}
            />
          )}
        </div>
      </div>
      {openColumnSelector && (
        <ColumnSelectorModal
          columns={accessControlFields.filter(
            (field) => field.key === "nome" || field.key === "activo"
          )}
          selectedColumns={selectedColumns}
          onClose={() => setOpenColumnSelector(false)}
          onColumnToggle={toggleColumn}
          onResetColumns={resetColumns}
          onSelectAllColumns={onSelectAllColumns}
        />
      )}
      {selectedAccessToDelete && (
        <DeleteModal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={startDeletionProcess}
          entityId={selectedAccessToDelete}
        />
      )}
      <CreateAccessControlModal
        title="Adicionar Plano de Acesso"
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={addAccessControl}
        initialValuesData={initialData || {}}
      />
      {selectedAccessControl && (
        <UpdateAccessControlModal
          title="Atualizar Plano de Acesso"
          open={showUpdateModal}
          onClose={handleCloseUpdateModal}
          onDuplicate={handleDuplicate}
          onUpdate={updateAccessControl}
          entity={selectedAccessControl}
          onPrev={handlePrevAccessControl}
          onNext={handleNextAccessControl}
          canMovePrev={
            selectedAccessControl &&
            accessControl.findIndex(
              (control) => control.id === selectedAccessControl.id
            ) > 0
          }
          canMoveNext={
            selectedAccessControl &&
            accessControl.findIndex(
              (control) => control.id === selectedAccessControl.id
            ) <
              accessControl.length - 1
          }
        />
      )}
    </div>
  );
};
