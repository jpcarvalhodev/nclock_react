import DataTable, { TableColumn } from "react-data-table-component";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { customStyles } from "../../components/CustomStylesDataTable";
import { ExportButton } from "../../components/ExportButton";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { categoryFields, externalEntityTypeFields } from "../../helpers/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { useState, useEffect, useContext } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ExternalEntityTypes } from "../../helpers/Types";
import { SelectFilter } from "../../components/SelectFilter";
import { CreateModalCatProfTypes } from "../../modals/CreateModalCatProfTypes";
import { UpdateModalCatProfTypes } from "../../modals/UpdateModalCatProfTypes";
import { DeleteModal } from "../../modals/DeleteModal";
import { useColor } from "../../context/ColorContext";
import { PrintButton } from "../../components/PrintButton";
import { TextFieldProps, TextField } from "@mui/material";
import { PersonsContext, PersonsContextType } from "../../context/PersonsContext";

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

// Define a página de tipos de entidades externas
export const Types = () => {
    const { navbarColor, footerColor } = useColor();
    const {
        dataEE,
        fetchAllExternalEntitiesData,
        handleAddExternalEntityTypes,
        handleUpdateExternalEntityTypes,
        handleDeleteExternalEntityTypes,
    } = useContext(PersonsContext) as PersonsContextType;
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['order', 'name']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedExternalEntityType, setSelectedExternalEntityType] = useState<ExternalEntityTypes | null>(null);
    const [selectedExternalEntityTypeForDelete, setSelectedExternalEntityTypeForDelete] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({});
    const [initialData, setInitialData] = useState<Partial<ExternalEntityTypes> | null>(null);
    const [currentExternalEntityTypeIndex, setCurrentExternalEntityTypeIndex] = useState(0);
    const [selectedRows, setSelectedRows] = useState<ExternalEntityTypes[]>([]);

    // Função para adicionar um tipo de uma entidade externa
    const addExternalEntityTypes = async (externalEntityType: ExternalEntityTypes) => {
        await handleAddExternalEntityTypes(externalEntityType);
    };

    // Função para atualizar um tipo de uma entidade externa
    const updateExternalEntityTypes = async (externalEntityType: ExternalEntityTypes) => {
        await handleUpdateExternalEntityTypes(externalEntityType);
    };

    // Função para apagar um tipo de uma entidade externa
    const deleteExternalEntityTypes = async (externalEntityTypeID: string) => {
        await handleDeleteExternalEntityTypes(externalEntityTypeID);
    };

    // Atualiza as entidades externas
    useEffect(() => {
        fetchAllExternalEntitiesData();
    }, []);

    // Função para atualizar as entidades externas
    const refreshExternalEntitiesTypes = () => {
        fetchAllExternalEntitiesData();
    };

    // Função para abrir o modal de editar entidade externa
    const handleEditExternalEntity = (externalEntityType: ExternalEntityTypes) => {
        setSelectedExternalEntityType(externalEntityType);
        const sortedTypes = dataEE.externalEntityTypes.sort((a, b) => a.order - b.order);
        const typeIndex = sortedTypes.findIndex(type => type.externalEntityTypeID === externalEntityType.externalEntityTypeID);
        setCurrentExternalEntityTypeIndex(typeIndex);
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

    // Função para selecionar as linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: ExternalEntityTypes[];
    }) => {
        const sortedSelectedRows = state.selectedRows.sort((a, b) => a.order - b.order);
        setSelectedRows(sortedSelectedRows);
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

    // Filtra os dados da tabela
    const filteredDataTable = dataEE.externalEntityTypes.filter(externalEntityType =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(externalEntityType[key]) === String(filters[key])
        )
    ).sort((a, b) => a.order - b.order);

    // Define os dados iniciais ao duplicar
    const handleDuplicate = (entity: Partial<ExternalEntityTypes>) => {
        setInitialData(entity);
        setShowAddModal(true);
        setSelectedExternalEntityType(null);
        setShowUpdateModal(false);
    }

    // Seleciona a entidade anterior
    const handleNextType = () => {
        const sortedTypes = dataEE.externalEntityTypes.sort((a, b) => a.order - b.order);
        if (currentExternalEntityTypeIndex < sortedTypes.length - 1) {
            setCurrentExternalEntityTypeIndex(currentExternalEntityTypeIndex + 1);
            setSelectedExternalEntityType(sortedTypes[currentExternalEntityTypeIndex + 1]);
        }
    };

    // Seleciona a entidade seguinte
    const handlePrevType = () => {
        const sortedTypes = dataEE.externalEntityTypes.sort((a, b) => a.order - b.order);
        if (currentExternalEntityTypeIndex > 0) {
            setCurrentExternalEntityTypeIndex(currentExternalEntityTypeIndex - 1);
            setSelectedExternalEntityType(sortedTypes[currentExternalEntityTypeIndex - 1]);
        }
    };

    // Define as colunas da tabela
    const tableColumns = selectedColumns
        .map(columnKey => ({
            id: columnKey,
            name: (
                <>
                    {columnNamesMap[columnKey]}
                    <SelectFilter column={columnKey} setFilters={setFilters} data={filteredDataTable} />
                </>
            ),
            selector: (row: Record<string, any>) => row[columnKey],
            sortable: true,
        }));

    // Define a coluna de ações
    const actionColumn: TableColumn<ExternalEntityTypes> = {
        name: 'Ações',
        cell: (row: ExternalEntityTypes) => (
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
                    <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.externalEntityTypeID)} >
                        <i className="bi bi-trash-fill"></i>
                    </Button>
                </OverlayTrigger>
            </div>
        ),
        selector: (row: ExternalEntityTypes) => row.categoryID,
        ignoreRowClick: true,
    };

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return externalEntityTypeFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span style={{ color: '#000000' }}>Tipos</span>
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
                            <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshExternalEntitiesTypes} iconSize='1.1em' />
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
            </div>
            <div className='content-wrapper'>
                <div className='table-css'>
                    <DataTable
                        columns={[...tableColumns, actionColumn]}
                        data={filteredDataTable}
                        onRowDoubleClicked={handleEditExternalEntity}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        paginationPerPage={20}
                        selectableRows
                        onSelectedRowsChange={handleRowSelected}
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
                        striped
                        defaultSortAsc={true}
                        defaultSortFieldId="order"
                    />
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            <CreateModalCatProfTypes
                title="Adicionar Tipo"
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={addExternalEntityTypes}
                fields={externalEntityTypeFields}
                initialValues={initialData || {}}
                entityType="tipos"
            />
            {selectedExternalEntityType && (
                <UpdateModalCatProfTypes
                    open={showUpdateModal}
                    onClose={handleCloseUpdateModal}
                    onUpdate={updateExternalEntityTypes}
                    entity={selectedExternalEntityType}
                    fields={externalEntityTypeFields}
                    onDuplicate={handleDuplicate}
                    title="Atualizar Tipo"
                    entityType="tipos"
                    canMoveNext={currentExternalEntityTypeIndex < dataEE.externalEntityTypes.length - 1}
                    canMovePrev={currentExternalEntityTypeIndex > 0}
                    onNext={handleNextType}
                    onPrev={handlePrevType}
                />
            )}
            <DeleteModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={deleteExternalEntityTypes}
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