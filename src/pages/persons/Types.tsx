import DataTable, { TableColumn } from "react-data-table-component";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { customStyles } from "../../components/CustomStylesDataTable";
import { ExportButton } from "../../components/ExportButton";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { categoryFields, externalEntityTypeFields } from "../../helpers/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ExternalEntityTypes } from "../../helpers/Types";
import { toast } from "react-toastify";
import { SelectFilter } from "../../components/SelectFilter";
import { CreateModalCatProfTypes } from "../../modals/CreateModalCatProfTypes";
import { UpdateModalCatProfTypes } from "../../modals/UpdateModalCatProfTypes";
import { DeleteModal } from "../../modals/DeleteModal";
import * as apiService from "../../helpers/apiService";

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a página de tipos de entidades externas
export const Types = () => {
    const [externalEntityTypes, setexternalEntityTypes] = useState<ExternalEntityTypes[]>([]);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['order', 'name']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedExternalEntityType, setSelectedExternalEntityType] = useState<ExternalEntityTypes | null>(null);
    const [selectedExternalEntityTypeForDelete, setSelectedExternalEntityTypeForDelete] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({});

    // Função para buscar os tipos das entidades externas
    const fetchAllExternalEntityTypes = async () => {
        try {
            const data = await apiService.fetchAllExternalEntityTypes();
            setexternalEntityTypes(data);
        } catch (error) {
            console.error('Erro ao buscar os dados das entidades externas:', error);
        }
    };

    // Função para adicionar um tipo de uma entidade externa
    const handleAddExternalEntityTypes = async (externalEntityType: ExternalEntityTypes) => {
        try {
            const data = await apiService.addExternalEntityTypes(externalEntityType);
            setexternalEntityTypes([...externalEntityTypes, data]);
            toast.success(data.value || 'Tipo de entidade externa adicionada com sucesso!');

        } catch (error) {
            console.error('Erro ao adicionar nova entidade externa:', error);
        } finally {
            setShowAddModal(false);
            refreshExternalEntitiesTypes();
        }
    };

    // Função para atualizar um tipo de uma entidade externa
    const handleUpdateExternalEntityTypes = async (externalEntityType: ExternalEntityTypes) => {
        try {
            const updatedExternalEntityType = await apiService.updateExternalEntityTypes(externalEntityType);
            setexternalEntityTypes(externalEntitiesType => externalEntitiesType.map(entity => entity.externalEntityTypeID === updatedExternalEntityType.externalEntityTypeID ? updatedExternalEntityType : entity));
            toast.success(updatedExternalEntityType.value || 'Tipo de entidade externa atualizado com sucesso!');

        } catch (error) {
            console.error('Erro ao atualizar entidade externa:', error);
        } finally {
            setShowUpdateModal(false);
            refreshExternalEntitiesTypes();
        }
    };

    // Função para apagar um tipo de uma entidade externa
    const handleDeleteExternalEntityTypes = async (externalEntityTypeID: string) => {
        try {
            const deleteExtEntType = await apiService.deleteExternalEntityTypes(externalEntityTypeID);
            toast.success(deleteExtEntType.value || 'Tipo de entidade externa apagada com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar entidade externa:', error);
        } finally {
            setShowDeleteModal(false);
            refreshExternalEntitiesTypes();
        }
    };

    // Atualiza as entidades externas
    useEffect(() => {
        fetchAllExternalEntityTypes();
    }, []);

    // Função para atualizar as entidades externas
    const refreshExternalEntitiesTypes = () => {
        fetchAllExternalEntityTypes();
    };

    // Função para abrir o modal de editar entidade externa
    const handleEditExternalEntity = (externalEntityType: ExternalEntityTypes) => {
        setSelectedExternalEntityType(externalEntityType);
        setShowUpdateModal(true);
    };

    // Fecha o modal de edição de entidade externa
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedExternalEntityType(null);
    };

    // Função para abrir o modal de apagar entidade externa
    const handleOpenDeleteModal = (externalEntityTypeID: string) => {
        setSelectedExternalEntityTypeForDelete(externalEntityTypeID);
        setShowDeleteModal(true);
    };

    // Filtra as categorias
    const filteredItems = externalEntityTypes.filter(item =>
        Object.keys(item).some(key =>
            String(item[key]).toLowerCase().includes(filterText.toLowerCase())
        )
    );

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
        setSelectedColumns(['order', 'name']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Mapeia os nomes das colunas
    const columnNamesMap = externalEntityTypeFields.reduce<Record<string, string>>((acc, field) => {
        acc[field.key] = field.label;
        return acc;
    }, {});

    // Define as colunas da tabela
    const tableColumns = selectedColumns
        .map(columnKey => ({
            name: (
                <>
                    {columnNamesMap[columnKey]}
                    <SelectFilter column={columnKey} setFilters={setFilters} data={externalEntityTypes} />
                </>
            ),
            selector: (row: Record<string, any>) => row[columnKey],
            sortable: true,
        }));

    // Filtra os dados da tabela
    const filteredDataTable = externalEntityTypes.filter(externalEntityType =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(externalEntityType[key]) === String(filters[key])
        )
    );

    // Define a coluna de ações
    const actionColumn: TableColumn<ExternalEntityTypes> = {
        name: 'Ações',
        cell: (row: ExternalEntityTypes) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditExternalEntity(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.externalEntityTypeID)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: ExternalEntityTypes) => row.categoryID,
        ignoreRowClick: true,
    };

    return (
        <div className="main-container">
            <NavBar />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span>Tipos</span>
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
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshExternalEntitiesTypes} />
                        <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        <ExportButton allData={externalEntityTypes} selectedData={filteredItems} fields={externalEntityTypeFields} />
                    </div>
                </div>
            </div>
            <div className='content-wrapper'>
                <div className='table-css'>
                    <DataTable
                        columns={[...tableColumns, actionColumn]}
                        data={filteredDataTable}
                        onRowDoubleClicked={handleEditExternalEntity}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        noDataComponent="Não há dados disponíveis para exibir."
                        customStyles={customStyles}
                    />
                </div>
            </div>
            <Footer />
            <CreateModalCatProfTypes
                title="Adicionar Tipo"
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleAddExternalEntityTypes}
                fields={externalEntityTypeFields}
                initialValues={{}}
                entityType="tipos"
            />
            {selectedExternalEntityType && (
                <UpdateModalCatProfTypes
                    open={showUpdateModal}
                    onClose={handleCloseUpdateModal}
                    onUpdate={handleUpdateExternalEntityTypes}
                    entity={selectedExternalEntityType}
                    fields={externalEntityTypeFields}
                    title="Atualizar Tipo"
                    entityType="tipos"
                />
            )}
            <DeleteModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDeleteExternalEntityTypes}
                entityId={selectedExternalEntityTypeForDelete}
            />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={categoryFields}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
                />
            )}
        </div >
    );
};