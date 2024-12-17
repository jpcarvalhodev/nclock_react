import { useContext, useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import '../../css/PagesStyles.css';
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Category } from "../../helpers/Types";
import { DeleteModal } from "../../modals/DeleteModal";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { categoryFields } from "../../helpers/Fields";
import { ExportButton } from "../../components/ExportButton";
import { ExpandedComponentGeneric } from "../../components/ExpandedComponentGeneric";
import { UpdateModalCatProfTypes } from "../../modals/UpdateModalCatProfTypes";
import { CreateModalCatProfTypes } from "../../modals/CreateModalCatProfTypes";
import { customStyles } from "../../components/CustomStylesDataTable";
import { SelectFilter } from "../../components/SelectFilter";
import { useColor } from "../../context/ColorContext";
import { PrintButton } from "../../components/PrintButton";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
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
    />
  );
}

// Define a página de categorias
export const Categories = () => {
    const { navbarColor, footerColor } = useColor();
    const {
        categories,
        fetchAllCategories,
        handleAddCategory,
        handleUpdateCategory,
        handleDeleteCategory,
    } = useContext(PersonsContext) as PersonsContextType;
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['code', 'description']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategoryForDelete, setSelectedCategoryForDelete] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({});
    const [initialData, setInitialData] = useState<Partial<Category> | null>(null);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [selectedRows, setSelectedRows] = useState<Category[]>([]);

    // Função para adicionar uma categoria
    const addCategory = async (category: Category) => {
        await handleAddCategory(category);
    };

    // Função para atualizar uma categoria
    const updateCategory = async (category: Category) => {
        await handleUpdateCategory(category);
    } 

    // Função para apagar uma categoria
    const deleteCategory = async (categoryID: string) => {
        await handleDeleteCategory(categoryID);
    };

    // Função para atualizar as categorias
    const refreshCategories = () => {
        fetchAllCategories();
    };

    // Função para editar uma categoria
    const handleEditCategory = (category: Category) => {
        setSelectedCategory(category);
        const sortedCategories = categories.sort((a, b) => a.code - b.code);
        const categoryIndex = sortedCategories.findIndex(c => c.categoryID === category.categoryID);
        setCurrentCategoryIndex(categoryIndex);
        setShowUpdateModal(true);
    };

    // Fecha o modal de edição de categoria
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedCategory(null);
    };

    // Função para abrir o modal de apagar categoria
    const handleOpenDeleteModal = (categoryID: string) => {
        setSelectedCategoryForDelete(categoryID);
        setShowDeleteModal(true);
    };

    // Define a função selecionar uma linha
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: Category[];
    }) => {
        const sortedSelectedRows = state.selectedRows.sort((a, b) => a.code - b.code);
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

    // Seleciona a entidade anterior
    const handleNextCategory = () => {
        const sortedCategories = categories.sort((a, b) => a.code - b.code);
        if (currentCategoryIndex < sortedCategories.length - 1) {
            setCurrentCategoryIndex(currentCategoryIndex + 1);
            setSelectedCategory(sortedCategories[currentCategoryIndex + 1]);
        }
    };

    // Seleciona a entidade seguinte
    const handlePrevCategory = () => {
        const sortedCategories = categories.sort((a, b) => a.code - b.code);
        if (currentCategoryIndex > 0) {
            setCurrentCategoryIndex(currentCategoryIndex - 1);
            setSelectedCategory(sortedCategories[currentCategoryIndex - 1]);
        }
    };

    // Função para resetar as colunas
    const resetColumns = () => {
        setSelectedColumns(['code', 'description']);
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
    const columnNamesMap = categoryFields.reduce<Record<string, string>>((acc, field) => {
        acc[field.key] = field.label;
        return acc;
    }, {});

    // Filtra os dados da tabela
    const filteredDataTable = categories.filter(category =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(category[key]) === String(filters[key])
        )
    ).sort((a, b) => a.code - b.code);

    // Define os dados iniciais ao duplicar
    const handleDuplicate = (entity: Partial<Category>) => {
        setInitialData(entity);
        setShowAddModal(true);
        setSelectedCategory(null);
        setShowUpdateModal(false);
    }

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
    const actionColumn: TableColumn<Category> = {
        name: 'Ações',
        cell: (row: Category) => (
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
                    <CustomOutlineButton className="action-button" icon='bi bi-pencil-fill' onClick={() => handleEditCategory(row)} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Apagar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-trash-fill' onClick={() => handleOpenDeleteModal(row.categoryID)} />
                </OverlayTrigger>
            </div>
        ),
        selector: (row: Category) => row.categoryID,
        ignoreRowClick: true,
    };

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return categoryFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span style={{ color: '#000000' }}>Categorias</span>
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
                            <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshCategories} />
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
                            <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        </OverlayTrigger>
                        <ExportButton allData={filteredDataTable} selectedData={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={getSelectedFields()} />
                        <PrintButton data={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={getSelectedFields()} />
                    </div>
                </div>
                <CreateModalCatProfTypes
                    title="Adicionar Categoria"
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={addCategory}
                    fields={categoryFields}
                    initialValues={initialData || {}}
                    entityType="categorias"
                />
                {selectedCategory && (
                    <UpdateModalCatProfTypes
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={updateCategory}
                        entity={selectedCategory}
                        fields={categoryFields}
                        onDuplicate={handleDuplicate}
                        title="Atualizar Categoria"
                        entityType="categorias"
                        canMoveNext={currentCategoryIndex < categories.length - 1}
                        canMovePrev={currentCategoryIndex > 0}
                        onPrev={handlePrevCategory}
                        onNext={handleNextCategory}
                    />
                )}
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={deleteCategory}
                    entityId={selectedCategoryForDelete}
                />
            </div>
            <div className='content-wrapper'>
                <div className='table-css'>
                    <DataTable
                        columns={[...tableColumns, actionColumn]}
                        data={filteredDataTable}
                        onRowDoubleClicked={handleEditCategory}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        paginationPerPage={20}
                        selectableRows
                        onSelectedRowsChange={handleRowSelected}
                        expandableRows
                        expandableRowsComponent={(props) => <ExpandedComponentGeneric data={props.data} fields={categoryFields} />}
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
                        striped
                        defaultSortAsc={true}
                        defaultSortFieldId="code"
                    />
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
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
}