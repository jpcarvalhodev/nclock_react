import { useEffect, useMemo, useState } from "react";

import "../../css/PagesStyles.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { customStyles } from "../../components/CustomStylesDataTable";
import { ExpandedComponentGeneric } from "../../components/ExpandedComponentGeneric";
import { ExportButton } from "../../components/ExportButton";
import { PrintButton } from "../../components/PrintButton";
import { SelectFilter } from "../../components/SelectFilter";

import { usePersons } from "../../context/PersonsContext";
import { groupFields } from "../../fields/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { CreateModalDeptGrp } from "../../modals/CreateModalDeptGrp";
import { DeleteModal } from "../../modals/DeleteModal";
import { UpdateModalDeptGrp } from "../../modals/UpdateModalDeptGrp";
import { Group } from "../../types/Types";

import { SearchBoxContainer } from "../../components/SearchBoxContainer";
import { CustomSpinner } from "../../components/CustomSpinner";

// Define a interface para os filtros
interface Filters {
  [key: string]: string;
}

// Define a página de grupos
export const Groups = () => {
  const {
    groups,
    fetchAllGroups,
    handleAddGroup,
    handleUpdateGroup,
    handleDeleteGroup,
  } = usePersons();
  const [filterText, setFilterText] = useState("");
  const [openColumnSelector, setOpenColumnSelector] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "name",
    "description",
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGroupForDelete, setSelectedGroupForDelete] = useState<
    any | null
  >(null);
  const [filters, setFilters] = useState<Filters>({});
  const [initialData, setInitialData] = useState<Partial<Group> | null>(null);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [selectedRows, setSelectedRows] = useState<Group[]>([]);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  // Função para adicionar um grupo
  const addGroup = async (group: Group) => {
    await handleAddGroup(group);
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para atualizar um grupo
  const updateGroup = async (group: Group) => {
    await handleUpdateGroup(group);
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para apagar um grupo
  const deleteGroup = async (groupID: string[]) => {
    await handleDeleteGroup(groupID);
    setClearSelectionToggle((prev) => !prev);
  };

  // Busca os grupos ao carregar a página
  useEffect(() => {
    fetchAllGroups();
  }, []);

  // Atualiza o índice do funcionário selecionado
  useEffect(() => {
    if (selectedGroup) {
      const sortedGroups = groups.sort((a, b) => a.name.localeCompare(b.name));
      const groupIndex = sortedGroups.findIndex(
        (grp) => grp.groupID === selectedGroup.groupID
      );
      setCurrentGroupIndex(groupIndex);
    }
  }, [selectedGroup, groups]);

  // Função para atualizar os grupos
  const refreshGroups = () => {
    fetchAllGroups();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para abrir o modal de atualizar grupo
  const handleEditGroup = (group: Group) => {
    setSelectedGroup(group);
    setShowUpdateModal(true);
  };

  // Função para fechar o modal de atualizar grupo
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedGroup(null);
  };

  // Função para abrir o modal de apagar grupo
  const handleOpenDeleteModal = (groupID: string) => {
    setSelectedGroupForDelete(groupID);
    setShowDeleteModal(true);
  };

  // Função para apagar os grupos selecionados
  const handleSelectedGroupsToDelete = () => {
    const groupIds = Array.from(
      new Set(selectedRows.map((grp) => grp.groupID))
    );
    setSelectedGroupForDelete(groupIds);
    setShowDeleteModal(true);
  };

  // Configurando a função onDelete para iniciar o processo de exclusão
  const startDeletionProcess = () => {
    let groupIds;

    if (Array.isArray(selectedGroupForDelete)) {
      groupIds = selectedGroupForDelete;
    } else if (selectedGroupForDelete) {
      groupIds = [selectedGroupForDelete];
    } else {
      groupIds = Array.from(new Set(selectedRows.map((grp) => grp.groupID)));
    }

    setShowDeleteModal(false);
    deleteGroup(groupIds);
  };

  // Função para selecionar as linhas
  const handleRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Group[];
  }) => {
    setSelectedRows(state.selectedRows);
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
    setSelectedColumns(["name", "description"]);
  };

  // Função para selecionar todas as colunas
  const onSelectAllColumns = (allColumnKeys: string[]) => {
    setSelectedColumns(allColumnKeys);
  };

  // Opções de paginação de EN em PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Seleciona o grupo anterior
  const handleNextGroup = () => {
    if (currentGroupIndex < groups.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
      setSelectedGroup(groups[currentGroupIndex + 1]);
    }
  };

  // Seleciona o grupo seguinte
  const handlePrevGroup = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(currentGroupIndex - 1);
      setSelectedGroup(groups[currentGroupIndex - 1]);
    }
  };

  // Mapeia os nomes das colunas
  const columnNamesMap = groupFields.reduce<Record<string, string>>(
    (acc, field) => {
      acc[field.key] = field.label;
      return acc;
    },
    {}
  );

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
    if (!Array.isArray(groups)) {
      return [];
    }
    return groups.filter(
      (group) =>
        Object.keys(filters).every(
          (key) =>
            filters[key] === "" ||
            (group[key] != null &&
              String(group[key])
                .toLowerCase()
                .includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(group).some(([key, value]) => {
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
  }, [groups, filters, filterText]);

  // Define os dados iniciais ao duplicar
  const handleDuplicate = (entity: Partial<Group>) => {
    setInitialData(entity);
    setShowAddModal(true);
    setSelectedGroup(null);
    setShowUpdateModal(false);
  };

  // Define as colunas da tabela
  const tableColumns = selectedColumns.map((columnKey) => ({
    id: columnKey,
    name: (
      <>
        {columnNamesMap[columnKey]}
        <SelectFilter
          column={columnKey}
          setFilters={setFilters}
          data={filteredDataTable}
        />
      </>
    ),
    selector: (row: Record<string, any>) => row[columnKey],
    sortable: true,
  }));

  // Coluna de ações
  const actionColumn: TableColumn<Group> = {
    name: "Ações",
    cell: (row: Group) => (
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
            onClick={() => handleEditGroup(row)}
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
            onClick={() => handleOpenDeleteModal(row.groupID)}
          />
        </OverlayTrigger>
      </div>
    ),
    selector: (row: Group) => row.groupID,
    ignoreRowClick: true,
  };

  // Função para gerar os dados com nomes substituídos para o export/print
  const groupWithNames = groups.map((transaction) => {
    const groupMatch = groups.find((group) => group.paiId === transaction.code);
    const groupName = groupMatch?.name || "";

    return {
      ...transaction,
      paiId: groupName,
    };
  });

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return groupFields.filter((field) => selectedColumns.includes(field.key));
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
    <div className="main-container">
      <div className="filter-refresh-add-edit-upper-class">
        <div className="datatable-title-text">
          <span style={{ color: "#000000" }}>Grupos</span>
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
                onClick={refreshGroups}
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
                icon="bi bi-trash-fill"
                onClick={handleSelectedGroupsToDelete}
                iconSize="1.1em"
              />
            </OverlayTrigger>
            <ExportButton
              allData={groupWithNames}
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
        <CreateModalDeptGrp
          title="Adicionar Grupo"
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={addGroup}
          fields={groupFields}
          initialValues={initialData || {}}
          entityType="group"
        />
        {selectedGroup && (
          <UpdateModalDeptGrp
            open={showUpdateModal}
            onClose={handleCloseUpdateModal}
            onUpdate={updateGroup}
            entity={selectedGroup}
            entityType="group"
            title="Atualizar Grupo"
            fields={groupFields}
            onDuplicate={handleDuplicate}
            onNext={handleNextGroup}
            onPrev={handlePrevGroup}
            canMovePrev={currentGroupIndex > 0}
            canMoveNext={currentGroupIndex < groups.length - 1}
          />
        )}
        <DeleteModal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={startDeletionProcess}
          entityId={selectedGroupForDelete}
        />
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
              columns={[...tableColumns, actionColumn]}
              data={filteredDataTable}
              onRowDoubleClicked={handleEditGroup}
              pagination
              paginationComponentOptions={paginationOptions}
              paginationPerPage={20}
              paginationRowsPerPageOptions={[20, 50]}
              selectableRows
              onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={clearSelectionToggle}
              expandableRows
              expandableRowsComponent={(props) => (
                <ExpandedComponentGeneric
                  data={props.data}
                  fields={groupFields}
                />
              )}
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
      {openColumnSelector && (
        <ColumnSelectorModal
          columns={groupFields}
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
