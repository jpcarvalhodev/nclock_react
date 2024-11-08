import DataTable, { TableColumn } from "react-data-table-component";
import { useColor } from "../../../context/ColorContext";
import { NavBar } from "../../../components/NavBar";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { Footer } from "../../../components/Footer";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { SelectFilter } from "../../../components/SelectFilter";
import { useEffect, useState } from "react";
import * as apiService from "../../../helpers/apiService";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";
import { PrintButton } from "../../../components/PrintButton";
import { Cameras } from "../../../helpers/Types";
import { cameraFields } from "../../../helpers/Fields";
import { set } from "date-fns";
import { toast } from "react-toastify";
import { CreateOnlineCameraModal } from "../../../modals/CreateOnlineCameraModal";
import { UpdateOnlineCameraModal } from "../../../modals/UpdateOnlineCameraModal";
import { Button } from "react-bootstrap";
import { DeleteModal } from "../../../modals/DeleteModal";

export const NviewOnlineCameras = () => {
    const { navbarColor, footerColor } = useColor();
    const [cameras, setCameras] = useState<Cameras[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['createdDate', 'numeroCamera', 'nomeCamera', 'ip', 'url']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [selectedRows, setSelectedRows] = useState<Cameras[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCamerasToDelete, setSelectedCamerasToDelete] = useState<string | null>(null);
    const [selectedCameras, setSelectedCameras] = useState<Cameras | null>(null);

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
            console.error('Erro ao buscar os dados das câmeras:', error);
        }
    };

    // Função para adicionar uma câmera
    const handleAddCamera = async (camera: Cameras) => {
        try {
            const data = await apiService.addCamera(camera);
            setCameras([...cameras, data]);
            toast.success(data.message || 'Câmera adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar a câmera:', error);
        } finally {
            refreshCameras();
        }
    };

    // Função para atualizar uma câmera
    const handleUpdateCamera = async (camera: Cameras) => {
        try {
            const data = await apiService.updateCamera(camera);
            setCameras(cameras.map(c => c.id === data.id ? data : c));
            toast.success(data.message || 'Câmera atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar a câmera:', error);
        } finally {
            refreshCameras();
        }
    };

    // Função para excluir uma câmera
    const handleDeleteCamera = async (id: string) => {
        try {
            const data = await apiService.deleteCamera(id);
            toast.success(data.message || 'Câmera excluída com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir a câmera:', error);
        } finally {
            refreshCameras();
        }
    }

    // Busca os logs ao carregar a página
    useEffect(() => {
        fetchAllCameras();
    }, []);

    // Função para atualizar as câmeras
    const refreshCameras = () => {
        fetchAllCameras();
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Função para selecionar as colunas
    const toggleColumn = (columnName: string) => {
        if (selectedColumns.includes(columnName)) {
            setSelectedColumns(selectedColumns.filter(col => col !== columnName));
        } else {
            setSelectedColumns([...selectedColumns, columnName]);
        }
    };

    // Função para resetar as colunas
    const resetColumns = () => {
        setSelectedColumns(['createdDate', 'numeroCamera', 'nomeCamera', 'ip', 'url']);
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
    const handleEditCameras = (cameras: Cameras) => {
        setSelectedCameras(cameras);
        setShowUpdateModal(true);
    };

    // Define a abertura do modal de apagar controle de acesso
    const handleOpenDeleteModal = (id: string) => {
        setSelectedCamerasToDelete(id);
        setShowDeleteModal(true);
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define as colunas da tabela
    const columns: TableColumn<Cameras>[] = cameraFields
        .filter(field => selectedColumns.includes(field.key))
        .filter(field => field.key !== 'passwordCamera')
        .sort((a, b) => { if (a.key === 'createdDate') return -1; else if (b.key === 'createdDate') return 1; else return 0; })
        .map(field => {
            const formatField = (row: Cameras) => {
                switch (field.key) {
                    case 'url':
                        const cameraUrl = row[field.key];
                        if (cameraUrl) {
                            return (
                                <a href={cameraUrl} target="_blank" rel="noopener noreferrer">
                                    Visualizar Câmera
                                </a>
                            );
                        } else {
                            return '';
                        }
                    case 'createdDate':
                        return new Date(row.createdDate).toLocaleString();
                    case 'updatedDate':
                        return new Date(row.createdDate).toLocaleString();
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={cameras} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
                sortFunction: (rowA, rowB) => new Date(rowB.createdDate).getTime() - new Date(rowA.createdDate).getTime()
            };
        });

    // Filtra os dados da tabela
    const filteredDataTable = cameras.filter(getCoin =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (getCoin[key] != null && String(getCoin[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.values(getCoin).some(value => {
            if (value == null) {
                return false;
            } else if (value instanceof Date) {
                return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
            } else {
                return value.toString().toLowerCase().includes(filterText.toLowerCase());
            }
        })
    );

    // Define as colunas de ação
    const actionColumn: TableColumn<Cameras> = {
        name: 'Ações',
        cell: (row: Cameras) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditCameras(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.id)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: Cameras) => row.id,
        ignoreRowClick: true,
    };

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="datatable-container">
                <div className="datatable-title-text">
                    <span style={{ color: '#0050a0' }}>Câmeras Online</span>
                </div>
                <div className="datatable-header">
                    <div>
                        <input
                            className='search-input'
                            type="text"
                            placeholder="Pesquisa"
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                        />
                    </div>
                    <div className="buttons-container-others">
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshCameras} />
                        <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                    </div>
                </div>
                <div className='table-css'>
                    <DataTable
                        columns={[...columns, actionColumn]}
                        data={filteredDataTable}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        paginationPerPage={15}
                        selectableRows
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={clearSelectionToggle}
                        selectableRowsHighlight
                        onRowDoubleClicked={handleEditCameras}
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
                        defaultSortAsc={true}
                        defaultSortFieldId="createdDate"
                    />
                </div>
            </div>
            <CreateOnlineCameraModal
                title="Adicionar Câmera"
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleAddCamera}
                fields={cameraFields}
                initialValues={{}}
            />
            {selectedCameras && (
                <UpdateOnlineCameraModal
                    open={showUpdateModal}
                    onClose={() => setShowUpdateModal(false)}
                    onUpdate={handleUpdateCamera}
                    entity={selectedCameras}
                    fields={cameraFields}
                    title="Atualizar Câmera"
                />
            )}
            <DeleteModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDeleteCamera}
                entityId={selectedCamerasToDelete}
            />
            <Footer style={{ backgroundColor: footerColor }} />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={cameraFields.filter(field => field.key !== 'passwordCamera')}
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
