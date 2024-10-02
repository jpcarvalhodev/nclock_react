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
import { AccessControl } from "../../../helpers/Types";
import { accessControlFields } from "../../../helpers/Fields";
import { ExportButton } from "../../../components/ExportButton";
import { DeleteModal } from "../../../modals/DeleteModal";
import { CreateAccessControlModal } from "../../../modals/CreateAccessControlModal";
import { UpdateAccessControlModal } from "../../../modals/UpdateAccessControlModal";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

export const NkioskAccess = () => {
    const { navbarColor, footerColor } = useColor();
    const [accessControl, setAccessControl] = useState<AccessControl[]>([]);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['shortName', 'enrollNumber', 'doorName', 'timezoneName', 'createrName']);
    const [selectedRows, setSelectedRows] = useState<AccessControl[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState<boolean>(false);
    const [openColumnSelector, setOpenColumnSelector] = useState<boolean>(false);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [filterText, setFilterText] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAccessToDelete, setSelectedAccessToDelete] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedAccessControl, setSelectedAccessControl] = useState<AccessControl | null>(null);

    // Função para buscar a listagem de controle de acesso
    const fetchAccessControl = async () => {
        try {
            const data = await apiService.fetchAllAccessControl();
            setAccessControl(data);
        } catch (error) {
            console.error('Erro ao buscar os dados de controle de acesso:', error);
        }
    };

    // Função para adicionar o controle de acesso
    const handleAddAccessControl = async (newAccessControl: AccessControl) => {
        try {
            const data = await apiService.addAccessControl(newAccessControl);
            if (data) {
                setAccessControl(prevAccessControl => [...prevAccessControl, data]);
            }
            toast.success(data.message || 'Controle de acesso adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar o controle de acesso:', error);
        } finally {
            refreshAccessControl();
        }
    };

    // Função para editar o controle de acesso
    const handleUpdateAccessControl = async (newAccessControl: AccessControl) => {
        try {
            const data = await apiService.updateAccessControl(newAccessControl);
            setAccessControl(prevAccessControls => prevAccessControls.map(item => item.id === data.id ? data : item));
            toast.success(data.message || 'Controle de acesso atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao editar o controle de acesso:', error);
        } finally {
            refreshAccessControl();
        }
    };    

    // Função para deletar o controle de acesso
    const handleDeleteAccessControl = async (id: string) => {
        try {
            const data = await apiService.deleteAccessControl(id);
            if (data) {
                setAccessControl(prevAccessControl => [...prevAccessControl, data]);
            }
            toast.success(data.message || 'Controle de acesso apagado com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar o controle de acesso:', error);
        } finally {
            refreshAccessControl();
        }
    }

    // Busca as listagens de movimentos ao carregar a página
    useEffect(() => {
        fetchAccessControl();
    }, []);

    // Função para atualizar as listagens de movimentos
    const refreshAccessControl = () => {
        fetchAccessControl();
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
        setSelectedColumns(['shortName', 'enrollNumber', 'doorName', 'timezoneName', 'createrName']);
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

    // Define a abertura do modal de apagar controle de acesso
    const handleOpenDeleteModal = (id: string) => {
        setSelectedAccessToDelete(id);
        setShowDeleteModal(true);
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Filtra os dados da tabela
    const filteredDataTable = accessControl.filter(accessControls =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (accessControls[key] != null && String(accessControls[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.values(accessControls).some(value => {
            if (value == null) {
                return false;
            } else if (typeof value === 'number') {
                return value.toString().includes(filterText);
            } else if (value instanceof Date) {
                return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
            } else if (typeof value === 'string') {
                return value.toLowerCase().includes(filterText.toLowerCase());
            }
            return false;
        })
    );

    // Define as colunas que não devem ser exibidas
    const excludedColumns = ['employeesId', 'doorId', 'timezoneId'];

    // Filtra as colunas para remover as colunas excluídas
    const filteredColumns = accessControlFields.filter(column => !excludedColumns.includes(column.key));

    // Define as colunas da tabela
    const columns: TableColumn<AccessControl>[] = accessControlFields
        .filter(field => selectedColumns.includes(field.key))
        .filter(field => !excludedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: AccessControl) => {
                switch (field.key) {
                    case 'doorName':
                        return row.doorName === 'C3 Pro-door4' ? 'Video Porteiro' : 'Cartão';
                    case 'createDate':
                        return new Date(row.createDate).toLocaleString();
                    case 'updateDate':
                        return new Date(row.updateDate).toLocaleString();
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredDataTable} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Define as colunas de ação
    const actionColumn: TableColumn<AccessControl> = {
        name: 'Ações',
        cell: (row: AccessControl) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditAccessControl(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.acId)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: AccessControl) => row.acId,
        ignoreRowClick: true,
    };

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span style={{ color: '#009739' }}>Listagem de Controle de Acesso</span>
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
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshAccessControl} />
                        <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        <ExportButton allData={accessControl} selectedData={selectedRows} fields={accessControlFields} />
                    </div>
                </div>
            </div>
            <div className='content-wrapper'>
                <div className='table-css'>
                    <DataTable
                        columns={[...columns, actionColumn]}
                        data={filteredDataTable}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        onRowDoubleClicked={handleEditAccessControl}
                        selectableRows
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={clearSelectionToggle}
                        selectableRowsHighlight
                        noDataComponent="Não há dados disponíveis para exibir."
                        customStyles={customStyles}
                    />
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={filteredColumns}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
                />
            )}
            <DeleteModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDeleteAccessControl}
                entityId={selectedAccessToDelete}
            />
            <CreateAccessControlModal
                title="Adicionar Acesso"
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleAddAccessControl}
                fields={accessControlFields}
                initialValues={{}}
            />
            {selectedAccessControl && (
                <UpdateAccessControlModal
                    title="Atualizar Acesso"
                    open={showUpdateModal}
                    onClose={() => setShowUpdateModal(false)}
                    onUpdate={handleUpdateAccessControl}
                    fields={accessControlFields}
                    entity={selectedAccessControl}
                />
            )}
        </div>
    );
}