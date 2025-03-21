import { useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";
import { PrintButton } from "../../../components/PrintButton";
import { SelectFilter } from "../../../components/SelectFilter";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";

import "../../../css/PagesStyles.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { usePersons } from "../../../context/PersonsContext";

import { EmployeeVisitorMotive } from "../../../types/Types";
import { employeeVisitorMotiveFields } from "../../../fields/Fields";
import { SearchBoxContainer } from "../../../components/SearchBoxContainer";
import { CustomSpinner } from "../../../components/CustomSpinner";
import { DeleteModal } from "../../../modals/DeleteModal";
import { CreateModalMotive } from "../../../modals/CreateModalMotive";
import { UpdateModalMotive } from "../../../modals/UpdateModalMotive";

// Define a interface para os filtros
interface Filters {
  [key: string]: string;
}

// Define a página de acessos
export const NvisitorMotive = () => {
  const {
    employeeVisitorMotive,
    fetchVisitorsMotive,
    handleAddVisitorMotive,
    handleUpdateVisitorMotive,
    handleDeleteVisitorMotive,
  } = usePersons();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "descricao",
  ]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [resetSelection, setResetSelection] = useState(false);
  const [selectedRows, setSelectedRows] = useState<EmployeeVisitorMotive[]>([]);
  const [filterText, setFilterText] = useState("");
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [filters, setFilters] = useState<Filters>({});
  const [initialData, setInitialData] = useState<
    Partial<EmployeeVisitorMotive>
  >({});
  const [selectedVisitorMotive, setSelectedVisitorMotive] =
    useState<EmployeeVisitorMotive | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMotiveForDelete, setSelectedMotiveForDelete] = useState<
    any | null
  >(null);
  const [currentMotiveIndex, setCurrentMotiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Função para adicionar um motivo
  const addMotive = async (visitor: Partial<EmployeeVisitorMotive>) => {
    await handleAddVisitorMotive(visitor);
    refreshMotive();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para atualizar um motivo
  const updateMotive = async (visitor: Partial<EmployeeVisitorMotive>) => {
    await handleUpdateVisitorMotive(visitor);
    refreshMotive();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para deletar motivos sequencialmente
  const deleteVisitor = async (employeeIds: string[]) => {
    await handleDeleteVisitorMotive(employeeIds);
    refreshMotive();
    setClearSelectionToggle((prev) => !prev);
  };

  // Atualiza a seleção ao resetar
  useEffect(() => {
    if (resetSelection) {
      setResetSelection(false);
    }
  }, [resetSelection]);

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
    const allColumnKeys = employeeVisitorMotiveFields.map((field) => field.key);
    setSelectedColumns(allColumnKeys);
  };

  // Função para resetar as colunas
  const handleResetColumns = () => {
    setSelectedColumns(["descricao"]);
  };

  // Função para atualizar os motivos
  const refreshMotive = () => {
    fetchVisitorsMotive();
    setClearSelectionToggle((prev) => !prev);
  };

  // Define a função selecionar uma linha
  const handleRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: EmployeeVisitorMotive[];
  }) => {
    setSelectedRows(state.selectedRows);
  };

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
    if (!Array.isArray(employeeVisitorMotive)) {
      return [];
    }
    return employeeVisitorMotive.filter(
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
  }, [employeeVisitorMotive, filters, filterText, selectedColumns]);

  // Define os dados iniciais ao duplicar
  const handleDuplicate = (entity: Partial<EmployeeVisitorMotive>) => {
    setInitialData(entity);
    setShowAddModal(true);
    setSelectedVisitorMotive(null);
    setShowUpdateModal(false);
  };

  // Função para abrir o modal de apagar motivo
  const handleOpenDeleteModal = (id: string) => {
    setSelectedMotiveForDelete(id);
    setShowDeleteModal(true);
  };

  // Função para deletar vários motivos
  const handleSelectedVisitorToDelete = () => {
    const motiveIds = Array.from(new Set(selectedRows.map((emp) => emp.id)));
    setSelectedMotiveForDelete(motiveIds);
    setShowDeleteModal(true);
  };

  // Configurando a função onDelete para iniciar o processo de exclusão
  const startDeletionProcess = () => {
    let motiveIds;

    if (Array.isArray(selectedMotiveForDelete)) {
      motiveIds = selectedMotiveForDelete;
    } else if (selectedMotiveForDelete) {
      motiveIds = [selectedMotiveForDelete];
    } else {
      motiveIds = Array.from(new Set(selectedRows.map((emp) => emp.id)));
    }

    setShowDeleteModal(false);
    deleteVisitor(motiveIds);
  };

  // Seleciona o motivo anterior
  const handleNextMotive = () => {
    const sortedMotive = employeeVisitorMotive.sort(
      (a, b) =>
        a.descricao.localeCompare(b.descricao) -
        b.descricao.localeCompare(a.descricao)
    );
    if (currentMotiveIndex < sortedMotive.length - 1) {
      setCurrentMotiveIndex(currentMotiveIndex + 1);
      setSelectedVisitorMotive(sortedMotive[currentMotiveIndex + 1]);
    }
  };

  // Seleciona o motivo seguinte
  const handlePrevMotive = () => {
    const sortedMotive = employeeVisitorMotive.sort(
      (a, b) =>
        a.descricao.localeCompare(b.descricao) -
        b.descricao.localeCompare(a.descricao)
    );
    if (currentMotiveIndex > 0) {
      setCurrentMotiveIndex(currentMotiveIndex - 1);
      setSelectedVisitorMotive(sortedMotive[currentMotiveIndex - 1]);
    }
  };

  // Função para editar um motivo
  const handleEditMotive = (visitor: EmployeeVisitorMotive) => {
    setSelectedVisitorMotive(visitor);
    const sortedMotive = employeeVisitorMotive.sort(
      (a, b) =>
        a.descricao.localeCompare(b.descricao) -
        b.descricao.localeCompare(a.descricao)
    );
    const motiveIndex = sortedMotive.findIndex((emp) => emp.id === visitor.id);
    setCurrentMotiveIndex(motiveIndex);
    setShowUpdateModal(true);
  };

  // Define as colunas
  const columns: TableColumn<EmployeeVisitorMotive>[] =
    employeeVisitorMotiveFields.map((field) => {
      const formatField = (row: EmployeeVisitorMotive) => {
        switch (field.key) {
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

  // Define as opções de paginação de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Define a coluna de ações
  const actionColumn: TableColumn<EmployeeVisitorMotive> = {
    name: "Ações",
    cell: (row: EmployeeVisitorMotive) => (
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
            onClick={() => handleEditMotive(row)}
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
    selector: (row: EmployeeVisitorMotive) => row.id,
    ignoreRowClick: true,
  };

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return employeeVisitorMotiveFields.filter((field) =>
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
      <div className="datatable-container">
        <div className="datatable-title-text">
          <span>Motivos</span>
        </div>
        <div className="datatable-header" style={{ marginBottom: 0 }}>
          <div>
            <SearchBoxContainer onSearch={(value) => setFilterText(value)} />
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
              overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
            >
              <CustomOutlineButton
                icon="bi-arrow-clockwise"
                onClick={refreshMotive}
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
              data={selectedRows.length > 0 ? selectedRows : filteredDataTable}
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
                pagination
                paginationComponentOptions={paginationOptions}
                selectableRows
                paginationPerPage={20}
                paginationRowsPerPageOptions={[20, 50]}
                clearSelectedRows={clearSelectionToggle}
                selectableRowsHighlight
                onRowDoubleClicked={handleEditMotive}
                onSelectedRowsChange={handleRowSelected}
                noDataComponent="Não existem dados disponíveis para mostrar."
                customStyles={customStyles}
                striped
                responsive
                persistTableHead={true}
                defaultSortAsc={true}
                defaultSortFieldId="descricao"
              />
            )}
          </div>
        </div>
      </div>
      {showColumnSelector && (
        <ColumnSelectorModal
          columns={employeeVisitorMotiveFields}
          selectedColumns={selectedColumns}
          onClose={() => setShowColumnSelector(false)}
          onColumnToggle={handleColumnToggle}
          onResetColumns={handleResetColumns}
          onSelectAllColumns={handleSelectAllColumns}
        />
      )}
      <CreateModalMotive
        open={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setInitialData({});
        }}
        onSave={addMotive}
        initialValues={initialData || {}}
        fields={employeeVisitorMotiveFields}
        title="Adicionar Motivo"
      />
      {selectedVisitorMotive && (
        <UpdateModalMotive
          open={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={updateMotive}
          onDuplicate={handleDuplicate}
          entity={selectedVisitorMotive}
          fields={employeeVisitorMotiveFields}
          title="Atualizar Motivo"
          canMoveNext={currentMotiveIndex < employeeVisitorMotive.length - 1}
          canMovePrev={currentMotiveIndex > 0}
          onPrev={handlePrevMotive}
          onNext={handleNextMotive}
        />
      )}
      <DeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={startDeletionProcess}
        entityId={selectedMotiveForDelete}
      />
    </div>
  );
};
