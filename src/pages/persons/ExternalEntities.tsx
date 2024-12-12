import { useContext, useEffect, useState } from "react";
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
import { ExpandedComponentEmpZoneExtEnt } from "../../components/ExpandedComponentEmpZoneExtEnt";
import { CreateModalExtEnt } from "../../modals/CreateModalExtEnt";
import { UpdateModalExtEnt } from "../../modals/UpdateModalExtEnt";
import { customStyles } from "../../components/CustomStylesDataTable";
import { SelectFilter } from "../../components/SelectFilter";
import { useColor } from "../../context/ColorContext";
import { PrintButton } from "../../components/PrintButton";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { TextFieldProps, TextField } from "@mui/material";
import { PersonsContext, PersonsContextType } from "../../context/PersonsContext";

// Define a interface para os dados do estado
interface DataState {
    externalEntity: ExternalEntity[];
    externalEntityTypes: ExternalEntityTypes[];
}

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a interface para as propriedades do componente CustomSearchBox
function CustomSearchBox(props: TextFieldProps) {
    return (
        <TextField
            {...props}
            className="SearchBox"
            InputLabelProps={{
                className: "SearchBox-label"
            }}
            InputProps={{
                className: "SearchBox-input",
                ...props.InputProps,
            }}
        />
    );
}

// Define a página de Entidades Externas
export const ExternalEntities = () => {
    const { navbarColor, footerColor } = useColor();
    const {
        dataEE,
        fetchAllExternalEntitiesData,
        handleAddExternalEntity,
        handleUpdateExternalEntity,
        handleDeleteExternalEntity,
    } = useContext(PersonsContext) as PersonsContextType;
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name', 'nif']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedExternalEntity, setSelectedExternalEntity] = useState<ExternalEntity | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedExternalEntityForDelete, setSelectedExternalEntityForDelete] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({});
    const [initialData, setInitialData] = useState<Partial<ExternalEntity> | null>(null);
    const [currentExtEntIndex, setCurrentExtEntIndex] = useState(0);
    const [selectedRows, setSelectedRows] = useState<ExternalEntity[]>([]);

    // Função para adicionar uma nova entidade externa
    const addExternalEntity = async (externalEntity: ExternalEntity) => {
        await handleAddExternalEntity(externalEntity);
    };

    // Função para atualizar uma entidade externa
    const updateExternalEntity = async (externalEntity: ExternalEntity) => {
        await handleUpdateExternalEntity(externalEntity);
    };

    // Função para apagar uma entidade externa
    const deleteExternalEntity = async (externalEntityID: string) => {
        await handleDeleteExternalEntity(externalEntityID);
    };

    // Atualiza as entidades externas
    useEffect(() => {
        fetchAllExternalEntitiesData();
    }, []);

    // Atualiza o índice do funcionário selecionado
    useEffect(() => {
        if (selectedExternalEntity) {
            const sortedExtEnt = dataEE.externalEntity.sort((a, b) => a.name.localeCompare(b.name));
            const extEntIndex = sortedExtEnt.findIndex(extEnt => extEnt.externalEntityID === selectedExternalEntity.externalEntityID);
            setCurrentExtEntIndex(extEntIndex);
        }
    }, [selectedExternalEntity, dataEE.externalEntity]);

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

    // Função para selecionar as linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: ExternalEntity[];
    }) => {
        setSelectedRows(state.selectedRows);
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

    // Filtra os dados da tabela
    const filteredDataTable = dataEE.externalEntity.filter(externalEntity =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(externalEntity[key]) === String(filters[key])
        )
    );

    // Define os dados iniciais ao duplicar uma entidade externa
    const handleDuplicate = (entity: Partial<ExternalEntity>) => {
        setInitialData(entity);
        setShowAddModal(true);
        setShowUpdateModal(false);
        setSelectedExternalEntity(null);
    }

    // Seleciona a entidade anterior
    const handleNextExtEnt = () => {
        if (currentExtEntIndex < dataEE.externalEntity.length - 1) {
            setCurrentExtEntIndex(currentExtEntIndex + 1);
            setSelectedExternalEntity(dataEE.externalEntity[currentExtEntIndex + 1]);
        }
    };

    // Seleciona a entidade seguinte
    const handlePrevExtEnt = () => {
        if (currentExtEntIndex > 0) {
            setCurrentExtEntIndex(currentExtEntIndex - 1);
            setSelectedExternalEntity(dataEE.externalEntity[currentExtEntIndex - 1]);
        }
    };

    // Define as colunas da tabela
    const columns: TableColumn<ExternalEntity>[] = externalEntityFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: ExternalEntity) => {
                switch (field.key) {
                    case 'dateInserted':
                    case 'dateUpdated':
                        return row[field.key] ? new Date(row[field.key]).toLocaleString() : '';
                    case 'externalEntityTypeId':
                        const typeName = dataEE.externalEntityTypes.find(type => type.externalEntityTypeID === row.externalEntityTypeId)?.name;
                        return typeName;
                    case 'photo':
                        return row.photo ? 'Imagem disponível' : 'Sem imagem';
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
                selector: (row: ExternalEntity) => {
                    if (field.key === 'name') {
                        return row[field.key] ?? '';
                    }
                    return formatField(row);
                },
                sortable: true,
                cell: (row: ExternalEntity) => {
                    if (field.key === 'name') {
                        return row[field.key] ?? '';
                    }
                    return formatField(row);
                }
            };
        });

    // Define o componente de linha expandida
    const expandableRowComponent = (row: ExternalEntity) => (
        <ExpandedComponentEmpZoneExtEnt data={row} fields={externalEntityFields} />
    );

    // Define a coluna de ações
    const actionColumn: TableColumn<ExternalEntity> = {
        name: 'Ações',
        cell: (row: ExternalEntity) => (
            <div style={{ display: 'flex' }}>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Duplicar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-copy' onClick={() => handleDuplicate(row)} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Editar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-pencil-fill' onClick={() => handleEditExternalEntity(row)} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Apagar</Tooltip>}
                >
                    <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.externalEntityID)} >
                        <i className="bi bi-trash-fill"></i>
                    </Button>
                </OverlayTrigger>
            </div>
        ),
        selector: (row: ExternalEntity) => row.externalEntityID,
        ignoreRowClick: true,
    };

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return externalEntityFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span style={{ color: '#000000' }}>Entidades Externas</span>
                </div>
                <div className="datatable-header">
                    <div>
                        <CustomSearchBox
                            label="Pesquisa"
                            variant="outlined"
                            size='small'
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                            style={{ marginTop: -5 }}
                        />
                    </div>
                    <div className="buttons-container-others">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
                        >
                            <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshExternalEntities} iconSize='1.1em' />
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip className="custom-tooltip">Adicionar</Tooltip>}
                        >
                            <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip className="custom-tooltip">Colunas</Tooltip>}
                        >
                            <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} iconSize='1.1em' />
                        </OverlayTrigger>
                        <ExportButton allData={filteredDataTable} selectedData={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={getSelectedFields()} />
                        <PrintButton data={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={getSelectedFields()} />
                    </div>
                </div>
                <CreateModalExtEnt
                    title="Adicionar Entidade Externa"
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={addExternalEntity}
                    fields={externalEntityFields}
                    initialValues={initialData || {}}
                />
                {selectedExternalEntity && (
                    <UpdateModalExtEnt
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={updateExternalEntity}
                        entity={selectedExternalEntity}
                        fields={externalEntityFields}
                        onDuplicate={handleDuplicate}
                        title="Atualizar Entidade Externa"
                        canMoveNext={currentExtEntIndex < dataEE.externalEntity.length - 1}
                        canMovePrev={currentExtEntIndex > 0}
                        onNext={handleNextExtEnt}
                        onPrev={handlePrevExtEnt}
                    />
                )}
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={deleteExternalEntity}
                    entityId={selectedExternalEntityForDelete}
                />
            </div>
            <div className='content-wrapper'>
                <div className='table-css'>
                    <DataTable
                        columns={[...columns, actionColumn]}
                        data={filteredDataTable}
                        onRowDoubleClicked={handleEditExternalEntity}
                        paginationPerPage={20}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        selectableRows
                        onSelectedRowsChange={handleRowSelected}
                        expandableRows
                        expandableRowsComponent={({ data }) => expandableRowComponent(data)}
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
                        striped
                        defaultSortAsc={true}
                        defaultSortFieldId="name"
                    />
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
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
