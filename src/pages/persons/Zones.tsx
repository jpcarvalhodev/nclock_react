import { useEffect, useMemo, useState } from "react";

import "../../css/PagesStyles.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { customStyles } from "../../components/CustomStylesDataTable";
import { ExpandedComponentEmpZoneExtEnt } from "../../components/ExpandedComponentEmpZoneExtEnt";
import { ExportButton } from "../../components/ExportButton";
import { PrintButton } from "../../components/PrintButton";
import { SelectFilter } from "../../components/SelectFilter";

import { usePersons } from "../../context/PersonsContext";
import { zoneFields } from "../../fields/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { CreateModalZones } from "../../modals/CreateModalZones";
import { DeleteModal } from "../../modals/DeleteModal";
import { UpdateModalZones } from "../../modals/UpdateModalZones";
import { Zone } from "../../types/Types";
import { SearchBoxContainer } from "../../components/SearchBoxContainer";
import { CustomSpinner } from "../../components/CustomSpinner";

// Define a interface para os filtros
interface Filters {
  [key: string]: string;
}

// Define a página de Zonas
export const Zones = () => {
  const {
    zones,
    fetchAllZones,
    handleAddZone,
    handleUpdateZone,
    handleDeleteZone,
  } = usePersons();
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [filterText, setFilterText] = useState("");
  const [openColumnSelector, setOpenColumnSelector] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "name",
    "acronym",
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedZoneForDelete, setSelectedZoneForDelete] = useState<
    any | null
  >(null);
  const [filters, setFilters] = useState<Filters>({});
  const [initialData, setInitialData] = useState<Partial<Zone>>();
  const [currentZoneIndex, setCurrentZoneIndex] = useState(0);
  const [selectedRows, setSelectedRows] = useState<Zone[]>([]);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  // Função para adicionar uma zona
  const addZone = async (zone: Zone) => {
    await handleAddZone(zone);
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para atualizar uma zona
  const updateZone = async (zone: Zone) => {
    await handleUpdateZone(zone);
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para apagar uma zona
  const deleteZone = async (zoneID: string[]) => {
    await handleDeleteZone(zoneID);
    setClearSelectionToggle((prev) => !prev);
  };

  // Busca as zonas ao carregar a página
  useEffect(() => {
    fetchAllZones();
  }, []);

  // Atualiza o índice do funcionário selecionado
  useEffect(() => {
    if (selectedZone) {
      const sortedZone = zones.sort((a, b) => a.name.localeCompare(b.name));
      const zoneIndex = sortedZone.findIndex(
        (zone) => zone.zoneID === selectedZone.zoneID
      );
      setCurrentZoneIndex(zoneIndex);
    }
  }, [selectedZone, zones]);

  // Função para atualizar as zonas
  const refreshZones = () => {
    fetchAllZones();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para abrir o modal de editar zona
  const handleEditZone = (zone: Zone) => {
    setSelectedZone(zone);
    setShowUpdateModal(true);
  };

  // Fecha o modal de edição de zona
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedZone(null);
  };

  // Função para abrir o modal de apagar zona
  const handleOpenDeleteModal = (zoneID: string) => {
    setSelectedZoneForDelete(zoneID);
    setShowDeleteModal(true);
  };

  // Função para deletar várias zonas
  const handleSelectedZonesToDelete = () => {
    const zoneIds = Array.from(
      new Set(selectedRows.map((zone) => zone.zoneID))
    );
    setSelectedZoneForDelete(zoneIds);
    setShowDeleteModal(true);
  };

  // Configurando a função onDelete para iniciar o processo de exclusão
  const startDeletionProcess = () => {
    let zoneIds;

    if (Array.isArray(selectedZoneForDelete)) {
      zoneIds = selectedZoneForDelete;
    } else if (selectedZoneForDelete) {
      zoneIds = [selectedZoneForDelete];
    } else {
      zoneIds = Array.from(new Set(selectedRows.map((zone) => zone.zoneID)));
    }

    setShowDeleteModal(false);
    deleteZone(zoneIds);
  };

  // Função para alternar a visibilidade das colunas
  const toggleColumn = (columnName: string) => {
    if (selectedColumns.includes(columnName)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== columnName));
    } else {
      setSelectedColumns([...selectedColumns, columnName]);
    }
  };

  // Função para lidar com a seleção de linhas
  const handleRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Zone[];
  }) => {
    setSelectedRows(state.selectedRows);
  };

  // Função para resetar as colunas
  const resetColumns = () => {
    setSelectedColumns(["name", "acronym"]);
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

  // Define os dados iniciais ao duplicar
  const handleDuplicate = (entity: Partial<Zone>) => {
    setInitialData(entity);
    setShowAddModal(true);
    setSelectedZone(null);
    setShowUpdateModal(false);
  };

  // Seleciona a entidade anterior
  const handleNextZone = () => {
    if (currentZoneIndex < zones.length - 1) {
      setCurrentZoneIndex(currentZoneIndex + 1);
      setSelectedZone(zones[currentZoneIndex + 1]);
    }
  };

  // Seleciona a entidade seguinte
  const handlePrevZone = () => {
    if (currentZoneIndex > 0) {
      setCurrentZoneIndex(currentZoneIndex - 1);
      setSelectedZone(zones[currentZoneIndex - 1]);
    }
  };

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
    return zones.filter(
      (zone) =>
        Object.keys(filters).every(
          (key) =>
            filters[key] === "" ||
            (zone[key] != null &&
              String(zone[key])
                .toLowerCase()
                .includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(zone).some(([key, value]) => {
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
  }, [zones, filters, filterText]);

  // Define as colunas da tabela
  const columns: TableColumn<Zone>[] = zoneFields
    .filter((field) => selectedColumns.includes(field.key))
    .map((field) => {
      const formatField = (row: Zone) => {
        switch (field.key) {
          case "photo":
            return row.photo ? "Imagem disponível" : "Sem imagem";
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
        selector: (row: Zone) => {
          if (field.key === "name") {
            return row[field.key] ?? "";
          }
          return formatField(row);
        },
        sortable: true,
        cell: (row: Zone) => {
          if (field.key === "name") {
            return row[field.key] ?? "";
          }
          return formatField(row);
        },
      };
    });

  // Componente de linha expandida
  const expandableRowComponent = (row: Zone) => (
    <ExpandedComponentEmpZoneExtEnt data={row} fields={zoneFields} />
  );

  // Coluna de ações
  const actionColumn: TableColumn<Zone> = {
    name: "Ações",
    cell: (row: Zone) => (
      <div style={{ display: "flex" }}>
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
          overlay={<Tooltip className="custom-tooltip">Editar</Tooltip>}
        >
          <CustomOutlineButton
            className="action-button"
            icon="bi bi-pencil-fill"
            onClick={() => handleEditZone(row)}
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
          overlay={<Tooltip className="custom-tooltip">Apagar</Tooltip>}
        >
          <CustomOutlineButton
            className="action-button"
            icon="bi bi-trash-fill"
            onClick={() => handleOpenDeleteModal(row.zoneID)}
          />
        </OverlayTrigger>
      </div>
    ),
    selector: (row: Zone) => row.zoneID,
    ignoreRowClick: true,
  };

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return zoneFields.filter((field) => selectedColumns.includes(field.key));
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
          <span style={{ color: "#000000" }}>Zonas</span>
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
                onClick={refreshZones}
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
                onClick={handleSelectedZonesToDelete}
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
        <CreateModalZones
          title="Adicionar Zona"
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={addZone}
          fields={zoneFields}
          initialValues={initialData || {}}
        />
        {selectedZone && (
          <UpdateModalZones
            open={showUpdateModal}
            onClose={handleCloseUpdateModal}
            onUpdate={updateZone}
            entity={selectedZone}
            fields={zoneFields}
            onDuplicate={handleDuplicate}
            title="Atualizar Zona"
            canMoveNext={currentZoneIndex < zones.length - 1}
            canMovePrev={currentZoneIndex > 0}
            onNext={handleNextZone}
            onPrev={handlePrevZone}
          />
        )}
        <DeleteModal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={startDeletionProcess}
          entityId={selectedZoneForDelete}
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
              columns={[...columns, actionColumn]}
              data={filteredDataTable}
              onRowDoubleClicked={handleEditZone}
              pagination
              paginationComponentOptions={paginationOptions}
              paginationPerPage={20}
              selectableRows
              onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={clearSelectionToggle}
              expandableRows
              expandableRowsComponent={({ data }) =>
                expandableRowComponent(data)
              }
              noDataComponent="Não existem dados disponíveis para exibir."
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
          columns={zoneFields}
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
