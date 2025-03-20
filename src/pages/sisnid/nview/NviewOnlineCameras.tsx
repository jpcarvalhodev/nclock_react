import { useEffect, useMemo, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { toast } from "react-toastify";

import * as apiService from "../../../api/apiService";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";

import { PrintButton } from "../../../components/PrintButton";
import { SelectFilter } from "../../../components/SelectFilter";

import { cameraFields } from "../../../fields/Fields";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { CreateOnlineCameraModal } from "../../../modals/CreateOnlineCameraModal";
import { DeleteModal } from "../../../modals/DeleteModal";
import { UpdateOnlineCameraModal } from "../../../modals/UpdateOnlineCameraModal";
import { Cameras } from "../../../types/Types";
import { SearchBoxContainer } from "../../../components/SearchBoxContainer";
import { CustomSpinner } from "../../../components/CustomSpinner";

// Formata a data para DD/MM/YYYY
const formatDateDDMMYYYY = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const NviewOnlineCameras = () => {
  const [cameras, setCameras] = useState<Cameras[]>([]);
  const [filterText, setFilterText] = useState<string>("");
  const [openColumnSelector, setOpenColumnSelector] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "createdDate",
    "numeroCamera",
    "nomeCamera",
    "ip",
    "url",
  ]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedRows, setSelectedRows] = useState<Cameras[]>([]);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCamerasToDelete, setSelectedCamerasToDelete] = useState<
    string | null
  >(null);
  const [selectedCameras, setSelectedCameras] = useState<Cameras | null>(null);
  const [initialData, setInitialData] = useState<Partial<Cameras> | null>(null);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Função para buscar as câmeras
  const fetchAllCameras = async () => {
    try {
      const data = await apiService.fetchAllCameras();
      if (Array.isArray(data)) {
        setCameras(data);
      } else {
        setCameras([]);
      }
    } catch (error) {
      console.error("Erro ao buscar os dados das câmeras:", error);
      setCameras([]);
    }
  };

  // Função para adicionar uma câmera
  const handleAddCamera = async (camera: Cameras) => {
    try {
      const data = await apiService.addCamera(camera);
      setCameras([...cameras, data]);
      toast.success(data.message || "Câmera adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar a câmera:", error);
    } finally {
      refreshCameras();
      setClearSelectionToggle((prev) => !prev);
    }
  };

  // Função para atualizar uma câmera
  const handleUpdateCamera = async (camera: Cameras) => {
    try {
      const data = await apiService.updateCamera(camera);
      setCameras(cameras.map((c) => (c.id === data.id ? data : c)));
      toast.success(data.message || "Câmera atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a câmera:", error);
    } finally {
      refreshCameras();
      setClearSelectionToggle((prev) => !prev);
    }
  };

  // Função para excluir uma câmera
  const handleDeleteCamera = async (id: string) => {
    try {
      const data = await apiService.deleteCamera(id);
      toast.success(data.message || "Câmera excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir a câmera:", error);
    } finally {
      refreshCameras();
      setClearSelectionToggle((prev) => !prev);
    }
  };

  // Busca os logs ao carregar a página
  useEffect(() => {
    fetchAllCameras();
  }, []);

  // Função para atualizar as câmeras
  const refreshCameras = () => {
    fetchAllCameras();
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
    setSelectedColumns([
      "createdDate",
      "numeroCamera",
      "nomeCamera",
      "ip",
      "url",
    ]);
  };

  // Função para selecionar todas as colunas
  const onSelectAllColumns = (allColumnKeys: string[]) => {
    setSelectedColumns(allColumnKeys);
  };

  // Define a função de seleção de linhas
  const handleRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Cameras[];
  }) => {
    setSelectedRows(state.selectedRows);
  };

  // Define a função de edição de controle de acesso
  const handleEditCameras = (selectedCamera: Cameras) => {
    const sortedCameras = [...cameras].sort(
      (a: Cameras, b: Cameras) => a.numeroCamera - b.numeroCamera
    );
    const camerasIndex = sortedCameras.findIndex(
      (cam: Cameras) => cam.id === selectedCamera.id
    );
    setSelectedCameras(selectedCamera);
    setCurrentCameraIndex(camerasIndex);
    setShowUpdateModal(true);
  };

  // Define a abertura do modal de apagar controle de acesso
  const handleOpenDeleteModal = (id: string) => {
    setSelectedCamerasToDelete(id);
    setShowDeleteModal(true);
  };

  // Opções de paginação da tabela com troca de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Define os dados iniciais ao duplicar
  const handleDuplicate = (entity: Partial<Cameras>) => {
    setInitialData(entity);
    setShowAddModal(true);
    setSelectedCameras(null);
    setShowUpdateModal(false);
  };

  // Seleciona a entidade anterior
  const handleNextCamera = () => {
    const sortedCameras = cameras.sort(
      (a: Cameras, b: Cameras) => a.numeroCamera - b.numeroCamera
    );
    if (currentCameraIndex < sortedCameras.length - 1) {
      setCurrentCameraIndex(currentCameraIndex + 1);
      setSelectedCameras(sortedCameras[currentCameraIndex + 1]);
    }
  };

  // Seleciona a entidade seguinte
  const handlePrevCamera = () => {
    const sortedCameras = cameras.sort(
      (a: Cameras, b: Cameras) => a.numeroCamera - b.numeroCamera
    );
    if (currentCameraIndex > 0) {
      setCurrentCameraIndex(currentCameraIndex - 1);
      setSelectedCameras(sortedCameras[currentCameraIndex - 1]);
    }
  };

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
    if (!Array.isArray(cameras)) {
      return [];
    }
    return cameras.filter(
      (getCoin) =>
        Object.keys(filters).every(
          (key) =>
            filters[key] === "" ||
            (getCoin[key] != null &&
              String(getCoin[key])
                .toLowerCase()
                .includes(filters[key].toLowerCase()))
        ) &&
        Object.values(getCoin).some(([key, value]) => {
          if (key === "createdDate") {
            const date = new Date(value);
            const formatted = formatDateDDMMYYYY(date);
            return formatted.toLowerCase().includes(filterText.toLowerCase());
          } else if (value == null) {
            return false;
          } else if (value instanceof Date) {
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
        })
    );
  }, [cameras, filters, filterText]);

  // Define as colunas da tabela
  const columns: TableColumn<Cameras>[] = cameraFields
    .filter((field) => selectedColumns.includes(field.key))
    .filter((field) => field.key !== "passwordCamera")
    .sort((a, b) => {
      if (a.key === "createdDate") return -1;
      else if (b.key === "createdDate") return 1;
      else return 0;
    })
    .map((field) => {
      const formatField = (row: Cameras) => {
        switch (field.key) {
          case "url":
            const cameraUrl = row[field.key];
            if (cameraUrl) {
              return (
                <a href={cameraUrl} target="_blank" rel="noopener noreferrer">
                  Visualizar Câmera
                </a>
              );
            } else {
              return "";
            }
          case "createdDate":
            return new Date(row.createdDate).toLocaleString() || "";
          case "updatedDate":
            return new Date(row.createdDate).toLocaleString() || "";
          default:
            return row[field.key] || "";
        }
      };
      return {
        id: field.key,
        name: (
          <>
            {field.label}
            {field.key !== "createdDate" && (
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
          new Date(rowB.createdDate).getTime() -
          new Date(rowA.createdDate).getTime(),
      };
    });

  // Define as colunas de ação
  const actionColumn: TableColumn<Cameras> = {
    name: "Ações",
    cell: (row: Cameras) => (
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
            onClick={() => handleEditCameras(row)}
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
    selector: (row: Cameras) => row.id,
    ignoreRowClick: true,
  };

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return cameraFields.filter((field) => selectedColumns.includes(field.key));
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
      <div className="datatable-container" style={{ flex: 1 }}>
        <div className="datatable-title-text">
          <span>Câmeras Online</span>
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
                onClick={refreshCameras}
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
              selectableRows
              onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={clearSelectionToggle}
              selectableRowsHighlight
              onRowDoubleClicked={handleEditCameras}
              noDataComponent="Não existem dados disponíveis para mostrar."
              customStyles={customStyles}
              striped
              responsive
              persistTableHead={true}
              defaultSortAsc={true}
              defaultSortFieldId="createdDate"
            />
          )}
        </div>
      </div>
      <CreateOnlineCameraModal
        title="Adicionar Câmera"
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddCamera}
        fields={cameraFields}
        initialValues={initialData || {}}
      />
      {selectedCameras && (
        <UpdateOnlineCameraModal
          open={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={handleUpdateCamera}
          entity={selectedCameras}
          fields={cameraFields}
          onDuplicate={handleDuplicate}
          title="Atualizar Câmera"
          canMoveNext={currentCameraIndex < cameras.length - 1}
          canMovePrev={currentCameraIndex > 0}
          onNext={handleNextCamera}
          onPrev={handlePrevCamera}
        />
      )}
      <DeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteCamera}
        entityId={selectedCamerasToDelete}
      />
      {openColumnSelector && (
        <ColumnSelectorModal
          columns={cameraFields.filter(
            (field) => field.key !== "passwordCamera"
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
