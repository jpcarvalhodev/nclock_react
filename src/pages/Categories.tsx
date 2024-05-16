import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Category } from "../helpers/Types";
import Button from "react-bootstrap/esm/Button";
import { DeleteModal } from "../modals/DeleteModal";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { fetchWithAuth } from "../components/FetchWithAuth";
import { categoryFields } from "../helpers/Fields";
import { ExportButton } from "../components/ExportButton";
import { toast } from "react-toastify";
import { ExpandedComponentGeneric } from "../components/ExpandedComponentGeneric";
import { UpdateModalCatProf } from "../modals/UpdateModalCatProf";
import { CreateModalCatProf } from "../modals/CreateModalCatProf";
import { customStyles } from "../components/CustomStylesDataTable";

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

    const fetchCategories = async () => {
        try {
            const response = await fetchWithAuth('Categories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                toast.error('Erro ao buscar os dados das categorias');
            }

            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Erro ao buscar os dados das categorias:', error);
        }
    };

    const handleAddCategory = async (category: Category) => {
        try {
            const response = await fetchWithAuth('Categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category)
            });

            if (!response.ok) {
                toast.error('Erro ao adicionar nova categoria');
            }

            const data = await response.json();
            setCategories([...categories, data]);
            toast.success('Categoria adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar nova categoria:', error);
        }

        setShowAddModal(false);
        refreshCategories();
    };

    const handleUpdateCategory = async (category: Category) => {
        try {
            const response = await fetchWithAuth(`Categories/${category.categoryID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category)
            });

            if (!response.ok) {
                toast.error(`Erro ao atualizar categoria`);
                return;
            }

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const updatedCategory = await response.json();
                setCategories(categories => categories.map(c => c.categoryID === updatedCategory.categoryID ? updatedCategory : c));
                toast.success('Categoria atualizada com sucesso!');
            } else {
                await response.text();
                toast.success(response.statusText || 'Atualização realizada com sucesso');
            }
        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
            toast.error('Falha ao conectar ao servidor');
        } finally {
            handleCloseUpdateModal();
            refreshCategories();
        }
    };

    const handleDeleteCategory = async (categoryID: string) => {
        try {
            const response = await fetchWithAuth(`Categories/${categoryID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                toast.error('Erro ao apagar categoria');
            }

            toast.success('Categoria apagada com sucesso!');
        } catch (error) {
            console.error('Erro ao apagar categoria:', error);
        }
        refreshCategories();
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const refreshCategories = () => {
        fetchCategories();
    };

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleCloseUpdateModal = () => {
        setSelectedCategory(null);
        setShowUpdateModal(false);
    };

    const handleEditCategory = (category: Category) => {
        setSelectedCategory(category);
        setShowUpdateModal(true);
    };

    const handleOpenDeleteModal = (categoryID: string) => {
        setSelectedCategoryForDelete(categoryID);
        setShowDeleteModal(true);
    };

    const filteredItems = categories.filter(item =>
        Object.keys(item).some(key =>
            String(item[key]).toLowerCase().includes(filterText.toLowerCase())
        )
    );

    const toggleColumn = (columnName: string) => {
        if (selectedColumns.includes(columnName)) {
            setSelectedColumns(selectedColumns.filter(col => col !== columnName));
        } else {
            setSelectedColumns([...selectedColumns, columnName]);
        }
    };

    const resetColumns = () => {
        setSelectedColumns(['code', 'description']);
    };

    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    const columnNamesMap = categoryFields.reduce<Record<string, string>>((acc, field) => {
        acc[field.key] = field.label;
        return acc;
    }, {});

    const tableColumns = selectedColumns
        .map(columnKey => ({
            name: columnNamesMap[columnKey] || columnKey,
            selector: (row: Record<string, any>) => row[columnKey],
            sortable: true,
        }));

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
                    <div className="search-box">
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
                        <CustomOutlineButton icon="bi-plus" onClick={handleOpenAddModal} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        <ExportButton allData={categories} selectedData={filteredItems} fields={categoryFields} />
                    </div>
                </div>
                <CreateModalCatProf
                    title="Adicionar Categoria"
                    open={showAddModal}
                    onClose={handleCloseAddModal}
                    onSave={handleAddCategory}
                    fields={categoryFields}
                    initialValues={{}}
                    entityType="categorias"
                />
                {selectedCategory && (
                    <UpdateModalCatProf
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={handleUpdateCategory}
                        entity={selectedCategory}
                        fields={categoryFields}
                        title="Atualizar Categoria"
                    />
                )}
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteCategory}
                    entityId={selectedCategoryForDelete}
                />
            </div>
            <div>
                <div className='table-css'>
                    <DataTable
                        columns={[...tableColumns, actionColumn]}
                        data={filteredItems}
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