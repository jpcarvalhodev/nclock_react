import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { ExternalEntity, ExternalEntityTypes } from "../helpers/Types";
import Button from "react-bootstrap/esm/Button";
import { DeleteModal } from "../modals/DeleteModal";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { fetchWithAuth } from "../components/FetchWithAuth";
import { externalEntityFields } from "../helpers/Fields";
import { ExportButton } from "../components/ExportButton";
import { toast } from "react-toastify";
import { ExpandedComponentEmpZoneExtEnt } from "../components/ExpandedComponentEmpZoneExtEnt";
import { CreateModalExtEnt } from "../modals/CreateModalExtEnt";
import { UpdateModalExtEnt } from "../modals/UpdateModalExtEnt";
import { customStyles } from "../components/CustomStylesDataTable";
import { SelectFilter } from "../components/SelectFilter";

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a interface para o estado de dados
interface DataState {
    externalEntityTypes: ExternalEntityTypes[];
    externalEntityTypeMap: { [key: string]: string };
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
        externalEntityTypes: [],
        externalEntityTypeMap: {}
    });

    // Busca as entidades externas e os tipos de entidades externas
    const fetchData = async () => {
        try {
            const typesResponse = await fetchWithAuth('ExternalEntityTypes');
            if (!typesResponse.ok) {
                toast.error('Falha ao buscar dados dos tipos de entidades externas');
                return;
            }
            const types = await typesResponse.json();
            const typeMap = types.reduce((acc: { [key: string]: string }, type: ExternalEntityTypes) => {
                acc[type.externalEntityTypeID] = type.name;
                return acc;
            }, {});

            const entitiesResponse = await fetchWithAuth('ExternalEntities');
            if (!entitiesResponse.ok) {
                toast.error('Erro ao buscar os dados das entidades externas');
                return;
            }
            let externalEntities = await entitiesResponse.json();

            externalEntities = externalEntities.map((entity: ExternalEntity) => ({
                ...entity,
                externalEntityTypeName: typeMap[entity.externalEntityTypeId]
            }));
            console.log('Entidades externas:', externalEntities);
            setExternalEntities(externalEntities);
            setData(prev => ({ ...prev, externalEntityType: types, externalEntityTypeMap: typeMap }));
        } catch (error) {
            console.error('Erro ao buscar dados dos tipos:', error);
            toast.error('Falha ao buscar dados dos tipos de entidades externas');
        }
    }

    // Função para adicionar uma nova entidade externa
    const handleAddExternalEntity = async (externalEntity: ExternalEntity) => {
        try {
            const response = await fetchWithAuth('ExternalEntities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(externalEntity)
            });
            if (!response.ok) {
                toast.error('Erro ao adicionar nova entidade externa');
            }
            const data = await response.json();
            setExternalEntities([...externalEntities, data]);
            toast.success('Entidade externa adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar nova entidade externa:', error);
        }
        setShowAddModal(false);
        refreshExternalEntities();
    };

    // Função para atualizar uma entidade externa
    const handleUpdateExternalEntity = async (externalEntity: ExternalEntity) => {
        try {
            const response = await fetchWithAuth(`ExternalEntities/${externalEntity.externalEntityID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(externalEntity)
            });

            if (!response.ok) {
                toast.error(`Erro ao atualizar entidade externa`);
                return;
            }

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const updatedExternalEntity = await response.json();
                setExternalEntities(externalEntities => externalEntities.map(entity => entity.externalEntityID === updatedExternalEntity.externalEntityID ? updatedExternalEntity : entity));
                toast.success('Entidade externa atualizada com sucesso!');
            } else {
                await response.text();
                toast.success(response.statusText || 'Atualização realizada com sucesso');
            }
        } catch (error) {
            console.error('Erro ao atualizar entidade externa:', error);
            toast.error('Falha ao conectar ao servidor');
        } finally {
            setShowUpdateModal(false);
            refreshExternalEntities();
        }
    };

    // Função para apagar uma entidade externa
    const handleDeleteExternalEntity = async (externalEntityID: string) => {
        try {
            const response = await fetchWithAuth(`ExternalEntities/${externalEntityID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                toast.error('Erro ao apagar entidade externa');
            }

            toast.success('Entidade externa apagada com sucesso!');
        } catch (error) {
            console.error('Erro ao apagar entidade externa:', error);
        }
        refreshExternalEntities();
    };

    // Atualiza as entidades externas
    useEffect(() => {
        fetchData();
    }, []);

    // Função para atualizar as entidades externas
    const refreshExternalEntities = () => {
        fetchData();
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
                        return data.externalEntityTypeMap[row.externalEntityTypesName] || '';
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={externalEntities} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Filtra os dados da tabela
    const filteredDataTable = externalEntities.filter(externalEntity =>
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
