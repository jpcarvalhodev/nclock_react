import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import '../../css/PagesStyles.css';
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { ExternalEntity, ExternalEntityTypes } from "../../helpers/Types";
import Button from "react-bootstrap/esm/Button";
import { DeleteModal } from "../../modals/DeleteModal";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { externalEntityFields } from "../../helpers/Fields";
import { ExportButton } from "../../components/ExportButton";
import { toast } from "react-toastify";
import { ExpandedComponentEmpZoneExtEnt } from "../../components/ExpandedComponentEmpZoneExtEnt";
import { CreateModalExtEnt } from "../../modals/CreateModalExtEnt";
import { UpdateModalExtEnt } from "../../modals/UpdateModalExtEnt";
import { customStyles } from "../../components/CustomStylesDataTable";
import { SelectFilter } from "../../components/SelectFilter";
import * as apiService from "../../helpers/apiService";

interface DataState {
    externalEntity: ExternalEntity[];
    externalEntityTypes: ExternalEntityTypes[];
}

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a página de Entidades Externas
export const ExternalEntities = () => {
    const [externalEntities, setExternalEntities] = useState<ExternalEntity[]>([]);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name', 'nif']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedExternalEntity, setSelectedExternalEntity] = useState<ExternalEntity | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedExternalEntityForDelete, setSelectedExternalEntityForDelete] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({});
    const [data, setData] = useState<DataState>({
        externalEntity: [],
        externalEntityTypes: [],
    });

    // Busca as entidades externas e os tipos de entidades externas
    const fetchAllExternalEntitiesData = async () => {
        try {
            const { ExternalEntities, ExternalEntityTypes } = await apiService.fetchAllExternalEntitiesData() as { ExternalEntities: ExternalEntity[]; ExternalEntityTypes: ExternalEntityTypes[]; };
            setData({
                externalEntity: ExternalEntities,
                externalEntityTypes: ExternalEntityTypes,
            });
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    // Função para adicionar uma nova entidade externa
    const handleAddExternalEntity = async (externalEntity: ExternalEntity) => {
        try {
            const data = await apiService.addExternalEntity(externalEntity);
            setExternalEntities([...externalEntities, data]);
            toast.success(data.value || 'Entidade externa adicionada com sucesso!');

        } catch (error) {
            console.error('Erro ao adicionar nova entidade externa:', error);
        }
        setShowAddModal(false);
        refreshExternalEntities();
    };

    // Função para atualizar uma entidade externa
    const handleUpdateExternalEntity = async (externalEntity: ExternalEntity) => {
        try {
            const updatedExternalEntity = await apiService.addExternalEntity(externalEntity);
            setExternalEntities(externalEntities => externalEntities.map(entity => entity.externalEntityID === updatedExternalEntity.externalEntityID ? updatedExternalEntity : entity));
            toast.success(updatedExternalEntity.value || 'Entidade Externa atualizada com sucesso');

        } catch (error) {
            console.error('Erro ao atualizar entidade externa:', error);
        } finally {
            setShowUpdateModal(false);
            refreshExternalEntities();
        }
    };

    // Função para apagar uma entidade externa
    const handleDeleteExternalEntity = async (externalEntityID: string) => {
        try {
            const deleteExtEnt = await apiService.deleteExternalEntity(externalEntityID);
            toast.success(deleteExtEnt.value || 'Entidade externa apagada com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar entidade externa:', error);
        } finally {
            setShowDeleteModal(false);
            refreshExternalEntities();
        }
    };

    // Atualiza as entidades externas
    useEffect(() => {
        fetchAllExternalEntitiesData();
    }, []);

    // Função para atualizar as entidades externas
    const refreshExternalEntities = () => {
        fetchAllExternalEntitiesData();
    };

    // Função para abrir o modal de editar entidade externa
    const handleEditExternalEntity = (externalEntity: ExternalEntity) => {
        setSelectedExternalEntity(externalEntity);
        setShowUpdateModal(true);
    };

    // Fecha o modal de edição de entidade externa
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedExternalEntity(null);
    };

    // Função para abrir o modal de apagar entidade externa
    const handleOpenDeleteModal = (externalEntityID: string) => {
        setSelectedExternalEntityForDelete(externalEntityID);
        setShowDeleteModal(true);
    };

    // Filtra as entidades externas
    const filteredItems = externalEntities.filter(item =>
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
        setSelectedColumns(['name', 'nif']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Define as opções de paginação de EN em PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página'
    };

    // Função para formatar a data e a hora
    function formatDateAndTime(input: string | Date): string {
        const date = typeof input === 'string' ? new Date(input) : input;
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        };
        return new Intl.DateTimeFormat('pt-PT', options).format(date);
    }

    // Define as colunas da tabela
    const columns: TableColumn<ExternalEntity>[] = externalEntityFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: ExternalEntity) => {
                switch (field.key) {
                    case 'dateInserted':
                    case 'dateUpdated':
                        return row[field.key] ? formatDateAndTime(row[field.key]) : '';
                    case 'externalEntityTypeId':
                        const typeName = data.externalEntityTypes.find(type => type.externalEntityTypeID === row.externalEntityTypeId)?.name;
                        return typeName;
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={data.externalEntity} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Filtra os dados da tabela
    const filteredDataTable = data.externalEntity.filter(externalEntity =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(externalEntity[key]) === String(filters[key])
        )
    );

    // Define o componente de linha expandida
    const expandableRowComponent = (row: ExternalEntity) => (
        <ExpandedComponentEmpZoneExtEnt data={row} fields={externalEntityFields} />
    );

    // Define a coluna de ações
    const actionColumn: TableColumn<ExternalEntity> = {
        name: 'Ações',
        cell: (row: ExternalEntity) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditExternalEntity(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.externalEntityID)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: ExternalEntity) => row.externalEntityID,
        ignoreRowClick: true,
    };

    return (
        <div className="main-container">
            <NavBar />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span>Entidades Externas</span>
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
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshExternalEntities} />
                        <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        <ExportButton allData={externalEntities} selectedData={filteredItems} fields={externalEntityFields} />
                    </div>
                </div>
                <CreateModalExtEnt
                    title="Adicionar Entidade Externa"
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddExternalEntity}
                    fields={externalEntityFields}
                    initialValues={{}}
                />
                {selectedExternalEntity && (
                    <UpdateModalExtEnt
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={handleUpdateExternalEntity}
                        entity={selectedExternalEntity}
                        fields={externalEntityFields}
                        title="Atualizar Entidade Externa"
                    />
                )}
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteExternalEntity}
                    entityId={selectedExternalEntityForDelete}
                />
            </div>
            <div className='content-wrapper'>
                <div className='table-css'>
                    <DataTable
                        columns={[...columns, actionColumn]}
                        data={filteredDataTable}
                        onRowDoubleClicked={handleEditExternalEntity}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        expandableRows
                        expandableRowsComponent={({ data }) => expandableRowComponent(data)}
                        noDataComponent="Não há dados disponíveis para exibir."
                        customStyles={customStyles}
                    />
                </div>
            </div>
            <Footer />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={externalEntityFields}
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
