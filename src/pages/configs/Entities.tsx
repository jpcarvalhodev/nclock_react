import DataTable, { TableColumn } from "react-data-table-component";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { NavBar } from "../../components/NavBar";
import { useColor } from "../../context/ColorContext";
import { Footer } from "../../components/Footer";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { useEffect, useState } from "react";
import { customStyles } from "../../components/CustomStylesDataTable";
import * as apiService from "../../helpers/apiService";
import { Entity } from "../../helpers/Types";
import { toast } from "react-toastify";
import { SelectFilter } from "../../components/SelectFilter";
import { Button } from "react-bootstrap";
import { DeleteModal } from "../../modals/DeleteModal";
import { entityFields } from "../../helpers/Fields";
import { ExpandedComponentEmpZoneExtEnt } from "../../components/ExpandedComponentEmpZoneExtEnt";
import { CreateEntityModal } from "../../modals/CreateEntityModal";
import { UpdateEntityModal } from "../../modals/UpdateEntityModal";

export const Entities = () => {
    const { navbarColor, footerColor } = useColor();
    const [entityData, setEntityData] = useState<Entity[]>([]);
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['createdDate', 'nome', 'nif', 'email', 'enabled']);
    const [filterText, setFilterText] = useState("");
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
    const [selectedEntityToDelete, setSelectedEntityToDelete] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [initialData, setInitialData] = useState<Partial<Entity>>({});
    const [currentEntityIndex, setCurrentEntityIndex] = useState(0);

    // Função para carregar os dados das entidades
    const fetchCompanyConfig = async () => {
        try {
            const data = await apiService.fetchAllCompanyConfig();
            if (Array.isArray(data)) {
                setEntityData(data);
            } else {
                setEntityData([]);
            }
        } catch (error) {
            console.error('Erro ao carregar os empresas:', error);
        }
    }

    // Função para adicionar os dados da entidade
    const handleAddCompanyData = async (entityData: FormData) => {
        try {
            const data = await apiService.addCompanyConfig(entityData);
            if (Array.isArray(data)) {
                setEntityData(data);
            }
            toast.success(data.value || 'Dados da empresa adicionados com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar os dados da empresa:', error);
        } finally {
            fetchCompanyConfig();
        }
    }

    // Função para atualizar os dados da entidade
    const handleUpdateCompanyData = async (entityData: FormData) => {
        try {
            const data = await apiService.updateCompanyConfig(entityData);
            if (Array.isArray(data)) {
                setEntityData(data);
            }
            toast.success(data.value || 'Dados da empresa atualizados com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar os dados da empresa:', error);
        } finally {
            fetchCompanyConfig();
        }
    }

    // Função para apagar os dados da entidade
    const handleDeleteCompanyData = async (id: string) => {
        try {
            const data = await apiService.deleteCompanyConfig(id);
            toast.success(data.value || 'Dados da empresa apagados com sucesso!');
        } catch (error) {
            console.error('Erro ao apagar os dados da empresa:', error);
        } finally {
            fetchCompanyConfig();
        }
    }

    // Busca os utilizadores ao carregar a página
    useEffect(() => {
        fetchCompanyConfig();
    }, []);

    // Função para atualizar as entidade
    const refreshEntity = () => {
        fetchCompanyConfig();
    };

    // Função para editar uma entidade
    const handleEditEntity = (User: Entity) => {
        setSelectedEntity(User);
        setShowUpdateModal(true);
    };

    // Fecha o modal de edição de entidade
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedEntity(null);
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
        setSelectedColumns(['createdDate', 'nome', 'nif', 'email', 'enabled']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Define o componente de linha expandida
    const expandableRowComponent = (row: Entity) => (
        <ExpandedComponentEmpZoneExtEnt data={row} fields={entityFields} />
    );

    // Define a função de duplicar funcionários
    const handleDuplicate = (data: Partial<Entity>) => {
        setInitialData(data);
        setShowAddModal(true);
        setSelectedEntity(null);
        setShowUpdateModal(false);
    }

     // Seleciona a entidade anterior
     const handleNextEntity = () => {
        if (currentEntityIndex < entityData.length - 1) {
            setCurrentEntityIndex(currentEntityIndex + 1);
            setSelectedEntity(entityData[currentEntityIndex + 1]);
        }
    };

    // Seleciona a entidade seguinte
    const handlePrevEntity = () => {
        if (currentEntityIndex > 0) {
            setCurrentEntityIndex(currentEntityIndex - 1);
            setSelectedEntity(entityData[currentEntityIndex - 1]);
        }
    };

    // Define a abertura do modal de apagar entidade
    const handleOpenDeleteModal = (id: string) => {
        setSelectedEntityToDelete(id);
        setShowDeleteModal(true);
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Filtra os dados da tabela
    const filteredDataTable = entityData.filter(user =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(user[key]) === String(filters[key])
        )
    );

    const excludedColumns = ['logotipo'];

    // Define as colunas da tabela
    const columns: TableColumn<Entity>[] = entityFields
        .filter(field => selectedColumns.includes(field.key))
        .filter(field => !excludedColumns.includes(field.key))
        .sort((a, b) => { if (a.key === 'createdDate') return -1; else if (b.key === 'createdDate') return 1; else return 0; })
        .map(field => {
            const formatField = (row: Entity) => {
                switch (field.key) {
                    case 'createdDate':
                    case 'updatedDate':
                        return new Date(row[field.key]).toLocaleString() || '';
                    case 'enabled':
                        return row[field.key] ? 'Activo' : 'Inactivo';
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredDataTable} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
                sortFunction: (rowA, rowB) => new Date(rowB.createdDate).getTime() - new Date(rowA.createdDate).getTime()
            };
        });

    // Define a coluna de ações
    const actionColumn: TableColumn<Entity> = {
        name: 'Ações',
        cell: (row: Entity) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton className="action-button" icon='bi bi-copy' onClick={() => handleDuplicate(row)} />
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditEntity(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.id)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: Entity) => row.id,
        ignoreRowClick: true,
    };

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span style={{ color: '#000000' }}>Entidades</span>
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
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshEntity} />
                        <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                    </div>
                </div>
            </div>
            <div className='content-wrapper'>
                <div className='table-css'>
                    <DataTable
                        columns={[...columns, actionColumn]}
                        data={filteredDataTable}
                        onRowDoubleClicked={handleEditEntity}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        paginationPerPage={15}
                        selectableRows
                        expandableRows
                        expandableRowsComponent={({ data }) => expandableRowComponent(data)}
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
                        defaultSortAsc={true}
                        defaultSortFieldId='createdDate'
                    />
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            <CreateEntityModal
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleAddCompanyData}
                fields={entityFields}
                initialValues={initialData || {}}
                title="Adicionar Entidade"
            />
            {selectedEntity && (
                <UpdateEntityModal
                    open={showUpdateModal}
                    onClose={handleCloseUpdateModal}
                    onUpdate={handleUpdateCompanyData}
                    fields={entityFields}
                    entity={selectedEntity}
                    onDuplicate={handleDuplicate}
                    title="Atualizar Entidade"
                    onNext={handleNextEntity}
                    onPrev={handlePrevEntity}
                    canMoveNext={currentEntityIndex < entityData.length - 1}
                    canMovePrev={currentEntityIndex > 0}
                />
            )}
            <DeleteModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDeleteCompanyData}
                entityId={selectedEntityToDelete}
            />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={entityFields.filter(field => !excludedColumns.includes(field.key))}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
                />
            )}
        </div>
    );
}