import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import '../../css/PagesStyles.css';
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Category } from "../../helpers/Types";
import Button from "react-bootstrap/esm/Button";
import { DeleteModal } from "../../modals/DeleteModal";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { categoryFields } from "../../helpers/Fields";
import { ExportButton } from "../../components/ExportButton";
import { toast } from "react-toastify";
import { ExpandedComponentGeneric } from "../../components/ExpandedComponentGeneric";
import { UpdateModalCatProfTypes } from "../../modals/UpdateModalCatProfTypes";
import { CreateModalCatProfTypes } from "../../modals/CreateModalCatProfTypes";
import { customStyles } from "../../components/CustomStylesDataTable";
import { SelectFilter } from "../../components/SelectFilter";
import * as apiService from "../../helpers/apiService";

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a página de categorias
export const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['code', 'description']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategoryForDelete, setSelectedCategoryForDelete] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({});

    // Função para buscar as categorias
    const fetchAllCategories = async () => {
        try {
            const data = await apiService.fetchAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Erro ao buscar os dados das categorias:', error);
        }
    };

    // Função para adicionar uma categoria
    const handleAddCategory = async (category: Category) => {
        try {
            const data = await apiService.addCategory(category);
            setCategories([...categories, data]);
            toast.success(data.value || 'Categoria adicionada com sucesso!');

        } catch (error) {
            console.error('Erro ao adicionar nova categoria:', error);
        } finally {
            setShowAddModal(false);
            refreshCategories();
        }
    };

    // Função para atualizar uma categoria
    const handleUpdateCategory = async (category: Category) => {
        try {
            const updatedCategory = await apiService.updateCategory(category);
            setCategories(categories => categories.map(c => c.categoryID === updatedCategory.categoryID ? updatedCategory : c));
            toast.success(updatedCategory.value || 'Categoria atualizada com sucesso!');

        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
        } finally {
            setShowUpdateModal(false);
            refreshCategories();
        }
    };

    // Função para apagar uma categoria
    const handleDeleteCategory = async (categoryID: string) => {
        try {
            const deleteCategory = await apiService.deleteCategory(categoryID);
            toast.success(deleteCategory.value || 'Categoria apagada com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar categoria:', error);
        } finally {
            setShowDeleteModal(false);
            refreshCategories();
        }
    };

    // Busca as categorias ao carregar a página
    useEffect(() => {
        fetchAllCategories();
    }, []);

    // Função para atualizar as categorias
    const refreshCategories = () => {
        fetchAllCategories();
    };

    // Função para editar uma categoria
    const handleEditCategory = (category: Category) => {
        setSelectedCategory(category);
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

    // Filtra as categorias
    const filteredItems = categories.filter(item =>
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

    // Define as colunas da tabela
    const tableColumns = selectedColumns
        .map(columnKey => ({
            name: (
                <>
                    {columnNamesMap[columnKey]}
                    <SelectFilter column={columnKey} setFilters={setFilters} data={categories} />
                </>
            ),
            selector: (row: Record<string, any>) => row[columnKey],
            sortable: true,
        }));

    // Filtra os dados da tabela
    const filteredDataTable = categories.filter(category =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(category[key]) === String(filters[key])
        )
    );

    // Define a coluna de ações
    const actionColumn: TableColumn<Category> = {
        name: 'Ações',
        cell: (row: Category) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditCategory(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.categoryID)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: Category) => row.categoryID,
        ignoreRowClick: true,
    };

    return (
        <div className="main-container">
            <NavBar />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span>Categorias</span>
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
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshCategories} />
                        <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        <ExportButton allData={categories} selectedData={filteredItems} fields={categoryFields} />
                    </div>
                </div>
                <CreateModalCatProfTypes
                    title="Adicionar Categoria"
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddCategory}
                    fields={categoryFields}
                    initialValues={{}}
                    entityType="categorias"
                />
                {selectedCategory && (
                    <UpdateModalCatProfTypes
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={handleUpdateCategory}
                        entity={selectedCategory}
                        fields={categoryFields}
                        title="Atualizar Categoria"
                        entityType="categorias"
                    />
                )}
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteCategory}
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
                        expandableRows
                        expandableRowsComponent={(props) => <ExpandedComponentGeneric data={props.data} fields={categoryFields} />}
                        noDataComponent="Não há dados disponíveis para exibir."
                        customStyles={customStyles}
                    />
                </div>
            </div>
            <Footer />
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