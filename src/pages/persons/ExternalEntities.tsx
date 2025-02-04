import { useEffect, useState } from "react";

import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import '../../css/PagesStyles.css';
import { PrintButton } from "../../components/PrintButton";
import { SelectFilter } from "../../components/SelectFilter";
import { useNavbar } from "../../context/NavbarContext";
import { usePersons } from "../../context/PersonsContext";
import { externalEntityFields } from "../../fields/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { CreateModalExtEnt } from "../../modals/CreateModalExtEnt";
import { DeleteModal } from "../../modals/DeleteModal";
import { UpdateModalExtEnt } from "../../modals/UpdateModalExtEnt";
import { ExternalEntity } from "../../types/Types";

import DataTable, { TableColumn } from 'react-data-table-component';

import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { ExportButton } from "../../components/ExportButton";
import { ExpandedComponentEmpZoneExtEnt } from "../../components/ExpandedComponentEmpZoneExtEnt";
import { customStyles } from "../../components/CustomStylesDataTable";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { TextField, TextFieldProps } from "@mui/material";


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
    />
  );
}

// Define a página de Entidades Externas
export const ExternalEntities = () => {
    const { navbarColor, footerColor } = useNavbar();
    const { dataEE, fetchAllExternalEntitiesData, handleAddExternalEntity, handleUpdateExternalEntity, handleDeleteExternalEntity } = usePersons();
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name', 'nif']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedExternalEntity, setSelectedExternalEntity] = useState<ExternalEntity | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedExternalEntityForDelete, setSelectedExternalEntityForDelete] = useState<any | null>(null);
    const [filters, setFilters] = useState<Filters>({});
    const [initialData, setInitialData] = useState<Partial<ExternalEntity> | null>(null);
    const [currentExtEntIndex, setCurrentExtEntIndex] = useState(0);
    const [selectedRows, setSelectedRows] = useState<ExternalEntity[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);

    // Função para adicionar uma nova entidade externa
    const addExternalEntity = async (externalEntity: ExternalEntity) => {
        await handleAddExternalEntity(externalEntity);
        setClearSelectionToggle((prev) => !prev);
    };

    // Função para atualizar uma entidade externa
    const updateExternalEntity = async (externalEntity: ExternalEntity) => {
        await handleUpdateExternalEntity(externalEntity);
        setClearSelectionToggle((prev) => !prev);
    };

    // Função para apagar uma entidade externa
    const deleteExternalEntity = async (externalEntityID: string[]) => {
        await handleDeleteExternalEntity(externalEntityID);
        setClearSelectionToggle((prev) => !prev);
    };

    // Busca as entidades externas ao carregar a página
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
        setClearSelectionToggle((prev) => !prev);
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

    // Função para deletar vários departamentos
    const handleSelectedEntExtToDelete = () => {
        const entExtIds = Array.from(new Set(selectedRows.map(ee => ee.externalEntityID)));
        setSelectedExternalEntityForDelete(entExtIds);
        setShowDeleteModal(true);
    };

    // Configurando a função onDelete para iniciar o processo de exclusão
    const startDeletionProcess = () => {
        let entExtIds;

        if (Array.isArray(selectedExternalEntityForDelete)) {
            entExtIds = selectedExternalEntityForDelete;
        } else if (selectedExternalEntityForDelete) {
            entExtIds = [selectedExternalEntityForDelete];
        } else {
            entExtIds = Array.from(new Set(selectedRows.map(ee => ee.externalEntityID)));
        }

        setShowDeleteModal(false);
        deleteExternalEntity(entExtIds);
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
            filters[key] === "" || (externalEntity[key] != null && String(externalEntity[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(externalEntity).some(([key, value]) => {
            if (selectedColumns.includes(key) && value != null) {
                if (value instanceof Date) {
                    return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
                } else {
                    return value.toString().toLowerCase().includes(filterText.toLowerCase());
                }
            }
            return false;
        })
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
                    <CustomOutlineButton className="action-button" icon='bi bi-trash-fill' onClick={() => handleOpenDeleteModal(row.externalEntityID)} />
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
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip className="custom-tooltip">Apagar Selecionados</Tooltip>}
                        >
                            <CustomOutlineButton icon="bi bi-trash-fill" onClick={handleSelectedEntExtToDelete} iconSize='1.1em' />
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
                    onDelete={startDeletionProcess}
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
                        clearSelectedRows={clearSelectionToggle}
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
