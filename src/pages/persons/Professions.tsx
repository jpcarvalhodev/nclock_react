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
import { professionFields } from "../../fields/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { CreateModalCatProfTypes } from "../../modals/CreateModalCatProfTypes";
import { DeleteModal } from "../../modals/DeleteModal";
import { UpdateModalCatProfTypes } from "../../modals/UpdateModalCatProfTypes";
import { Profession } from "../../types/Types";
import { SearchBoxContainer } from "../../components/SearchBoxContainer";
import { CustomSpinner } from "../../components/CustomSpinner";

// Define a interface para os filtros
interface Filters {
  [key: string]: string;
}

// Define a página de profissões
export const Professions = () => {
  const {
    professions,
    fetchAllProfessions,
    handleAddProfession,
    handleUpdateProfession,
    handleDeleteProfessions,
  } = usePersons();
  const [selectedProfession, setSelectedProfession] =
    useState<Profession | null>(null);
  const [filterText, setFilterText] = useState("");
  const [openColumnSelector, setOpenColumnSelector] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "code",
    "description",
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProfessionForDelete, setSelectedProfessionForDelete] =
    useState<any | null>(null);
  const [filters, setFilters] = useState<Filters>({});
  const [selectedRows, setSelectedRows] = useState<Profession[]>([]);
  const [initialData, setInitialData] = useState<Partial<Profession> | null>(
    null
  );
  const [currentProfessionIndex, setCurrentProfessionIndex] = useState(0);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  // Função para adicionar uma nova profissão
  const addProfession = async (profession: Profession) => {
    await handleAddProfession(profession);
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para atualizar uma profissão
  const updateProfession = async (profession: Profession) => {
    await handleUpdateProfession(profession);
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para apagar uma profissão
  const deleteProfessions = async (professionID: string[]) => {
    await handleDeleteProfessions(professionID);
    setClearSelectionToggle((prev) => !prev);
  };

  // Busca as profissões ao carregar a página
  useEffect(() => {
    fetchAllProfessions();
  }, []);

  // Função para atualizar a lista de profissões
  const refreshProfessions = () => {
    fetchAllProfessions();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para abrir o modal de editar profissão
  const handleEditProfession = (profession: Profession) => {
    setSelectedProfession(profession);
    const sortedProfession = professions.sort((a, b) => a.code - b.code);
    const professionIndex = sortedProfession.findIndex(
      (p) => p.professionID === profession.professionID
    );
    setCurrentProfessionIndex(professionIndex);
    setShowUpdateModal(true);
  };

  // Fecha o modal de edição de profissão
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedProfession(null);
  };

  // Função para abrir o modal de apagar profissão
  const handleOpenDeleteModal = (professionID: string) => {
    setSelectedProfessionForDelete(professionID);
    setShowDeleteModal(true);
  };

  // Função para deletar várias profissões
  const handleSelectedProfessionToDelete = () => {
    const profIds = Array.from(
      new Set(selectedRows.map((prof) => prof.professionID))
    );
    setSelectedProfessionForDelete(profIds);
    setShowDeleteModal(true);
  };

  // Configurando a função onDelete para iniciar o processo de exclusão
  const startDeletionProcess = () => {
    let profIds;

    if (Array.isArray(selectedProfessionForDelete)) {
      profIds = selectedProfessionForDelete;
    } else if (selectedProfessionForDelete) {
      profIds = [selectedProfessionForDelete];
    } else {
      profIds = Array.from(
        new Set(selectedRows.map((prof) => prof.professionID))
      );
    }

    setShowDeleteModal(false);
    deleteProfessions(profIds);
  };

  // Função para alternar a visibilidade das colunas
  const toggleColumn = (columnName: string) => {
    if (selectedColumns.includes(columnName)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== columnName));
    } else {
      setSelectedColumns([...selectedColumns, columnName]);
    }
  };

  // Função para resetar as colunas
  const resetColumns = () => {
    setSelectedColumns(["code", "description"]);
  };

  // Função para selecionar todas as colunas
  const onSelectAllColumns = (allColumnKeys: string[]) => {
    setSelectedColumns(allColumnKeys);
  };

  // Função para lidar com a seleção de linhas
  const handleRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Profession[];
  }) => {
    const sortedSelectedRows = state.selectedRows.sort(
      (a, b) => a.code - b.code
    );
    setSelectedRows(sortedSelectedRows);
  };

  // Opções de paginação de EN em PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Mapeia os nomes das colunas
  const columnNamesMap = professionFields.reduce<Record<string, string>>(
    (acc, field) => {
      acc[field.key] = field.label;
      return acc;
    },
    {}
  );

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
    if (!Array.isArray(professions)) {
      return [];
    }
    return professions
      .filter(
        (profession) =>
          Object.keys(filters).every(
            (key) =>
              filters[key] === "" ||
              (profession[key] != null &&
                String(profession[key])
                  .toLowerCase()
                  .includes(filters[key].toLowerCase()))
          ) &&
          Object.entries(profession).some(([key, value]) => {
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
      )
      .sort((a, b) => a.code - b.code);
  }, [professions, filters, filterText]);

  // Seleciona a entidade anterior
  const handleNextProfession = () => {
    const sortedProfession = professions.sort((a, b) => a.code - b.code);
    if (currentProfessionIndex < sortedProfession.length - 1) {
      setCurrentProfessionIndex(currentProfessionIndex + 1);
      setSelectedProfession(sortedProfession[currentProfessionIndex + 1]);
    }
  };

  // Seleciona a entidade seguinte
  const handlePrevProfession = () => {
    const sortedProfession = professions.sort((a, b) => a.code - b.code);
    if (currentProfessionIndex > 0) {
      setCurrentProfessionIndex(currentProfessionIndex - 1);
      setSelectedProfession(sortedProfession[currentProfessionIndex - 1]);
    }
  };

  // Define os dados iniciais ao duplicar
  const handleDuplicate = (entity: Partial<Profession>) => {
    setInitialData(entity);
    setShowAddModal(true);
    setSelectedProfession(null);
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

  // Define a coluna de ações
  const actionColumn: TableColumn<Profession> = {
    name: "Ações",
    cell: (row: Profession) => (
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
            onClick={() => handleEditProfession(row)}
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
            onClick={() => handleOpenDeleteModal(row.professionID)}
          />
        </OverlayTrigger>
      </div>
    ),
    selector: (row: Profession) => row.professionID,
    ignoreRowClick: true,
  };

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return professionFields.filter((field) =>
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
      <div className="filter-refresh-add-edit-upper-class">
        <div className="datatable-title-text">
          <span style={{ color: "#000000" }}>Profissões</span>
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
                onClick={refreshProfessions}
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
                icon="bi bi-trash"
                onClick={handleSelectedProfessionToDelete}
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
        <CreateModalCatProfTypes
          title="Adicionar Profissão"
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={addProfession}
          fields={professionFields}
          initialValues={initialData || {}}
          entityType="profissões"
        />
        {selectedProfession && (
          <UpdateModalCatProfTypes
            open={showUpdateModal}
            onClose={handleCloseUpdateModal}
            onUpdate={updateProfession}
            entity={selectedProfession}
            fields={professionFields}
            onDuplicate={handleDuplicate}
            title="Atualizar Profissão"
            entityType="profissões"
            canMoveNext={currentProfessionIndex < professions.length - 1}
            canMovePrev={currentProfessionIndex > 0}
            onNext={handleNextProfession}
            onPrev={handlePrevProfession}
          />
        )}
        <DeleteModal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={startDeletionProcess}
          entityId={selectedProfessionForDelete}
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
              onRowDoubleClicked={handleEditProfession}
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
                  fields={professionFields}
                />
              )}
              noDataComponent="Não existem dados disponíveis para mostrar."
              customStyles={customStyles}
              striped
              responsive
              persistTableHead={true}
              defaultSortAsc={true}
              defaultSortFieldId="code"
            />
          )}
        </div>
      </div>
      {openColumnSelector && (
        <ColumnSelectorModal
          columns={professionFields}
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
