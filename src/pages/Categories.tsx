import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Category } from "../helpers/Types";
import Button from "react-bootstrap/esm/Button";
import { CreateModal } from "../modals/CreateModal";
import { UpdateModal } from "../modals/UpdateModal";
import { DeleteModal } from "../modals/DeleteModal";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { fetchWithAuth } from "../components/FetchWithAuth";
import { categoryFields } from "../helpers/Fields";

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
            const response = await fetchWithAuth('https://localhost:7129/api/Categories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar os dados das categorias');
            }

            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Erro ao buscar os dados das categorias:', error);
        }
    };

    const handleAddCategory = async (category: Category) => {
        try {
            const response = await fetchWithAuth('https://localhost:7129/api/Categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category)
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar nova categoria');
            }

            const data = await response.json();
            setCategories([...categories, data]);
        } catch (error) {
            console.error('Erro ao adicionar nova categoria:', error);
        }

        setShowAddModal(false);
        refreshCategories();
    };

    const handleUpdateCategory = async (category: Category) => {
        try {
            const response = await fetchWithAuth(`https://localhost:7129/api/Categories/${category.categoryID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar categoria');
            }

            const updatedCategory = await response.json();
            setCategories(categories.map(c => c.categoryID === updatedCategory.categoryID ? updatedCategory : c));

        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
        }

        handleCloseUpdateModal();
        refreshCategories();
    };

    const handleDeleteCategory = async (categoryID: string) => {
        try {
            const response = await fetchWithAuth(`https://localhost:7129/api/Categories/${categoryID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao apagar categoria');
            }

            refreshCategories();
        } catch (error) {
            console.error('Erro ao apagar categoria:', error);
        }
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
        rowsPerPageText: 'Linhas por página'
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

    const ExpandedComponent: React.FC<{ data: Category }> = ({ data }) => (
        <div className="expanded-details-container">
            {Object.entries(data).map(([key, value], index) => {
                if (key === 'id') return null;
                let displayValue = value;
                if (typeof value === 'object' && value !== null) {
                    displayValue = JSON.stringify(value, null, 2);
                }
                const displayName = columnNamesMap[key] || key;
                return !['id', 'algumOutroCampoParaExcluir'].includes(key) && (
                    <p key={index}>
                        <span className="detail-key">{`${displayName}: `}</span>
                        {displayValue}
                    </p>
                );
            })}
        </div>
    );

    const actionColumn: TableColumn<Category> = {
        name: 'Ações',
        cell: (row: Category) => (
            <div>
                <CustomOutlineButton icon="bi-pencil-square" onClick={() => handleEditCategory(row)}></CustomOutlineButton>{' '}
                <Button variant="outline-danger" onClick={() => handleOpenDeleteModal(row.categoryID)}>
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: Category) => row.categoryID,
    };

    return (
        <div>
            <NavBar />
            <div className='filter-refresh-add-edit-upper-class'>
                <input
                    className='filter-input'
                    type="text"
                    placeholder="Pesquisa"
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                />
                <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshCategories} />
                <CustomOutlineButton icon="bi-plus" onClick={handleOpenAddModal} iconSize='1.1em' />
                <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                <CreateModal
                    title="Adicionar Categoria"
                    open={showAddModal}
                    onClose={handleCloseAddModal}
                    onSave={handleAddCategory}
                    fields={categoryFields}
                    initialValues={{}}
                />
                {selectedCategory && (
                    <UpdateModal
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={() => handleUpdateCategory(selectedCategory)}
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
                        pagination
                        paginationComponentOptions={paginationOptions}
                        expandableRows
                        expandableRowsComponent={ExpandedComponent}
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