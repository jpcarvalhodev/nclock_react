import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Category } from "../types/Types";
import Button from "react-bootstrap/esm/Button";
import { CreateModal } from "../modals/CreateModal";
import { UpdateModal } from "../modals/UpdateModal";

export const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['code', 'description']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const fields = [
        { label: 'Code', key: 'code', type: 'number', required: true },
        { label: 'Description', key: 'description', type: 'string', required: true },
        { label: 'Acronym', key: 'acronym', type: 'string' },
    ];

    const fetchCategories = async () => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch('https://localhost:7129/api/Categories', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Error fetching categories data');
            }
    
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching the categories', error);
        }
    };    

    const deleteCategory = (id: string) => {
        fetch(`https://localhost:7129/api/Categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deleting category');
                }
                refreshCategories();
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const refreshCategories = () => {
        fetchCategories();
    };

    const handleAddCategory = async (category: Category) => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch('https://localhost:7129/api/Categories', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category)
            });
    
            if (!response.ok) {
                throw new Error('Error adding new category');
            }
    
            const data = await response.json();
            setCategories([...categories, data]);
        } catch (error) {
            console.error('Error adding new category:', error);
        }
    
        setShowAddModal(false);
        refreshCategories();
    };

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleOpenUpdateModal = (category: Category) => {
        setSelectedCategory(category);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setSelectedCategory(null);
        setShowUpdateModal(false);
    };

    const handleEditCategory = (category: Category) => {
        setSelectedCategoryId(category.id);
        handleOpenUpdateModal(category);
    };

    const handleUpdateCategory = async (category: Category) => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch(`https://localhost:7129/api/Categories/${category.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category)
            });
    
            if (!response.ok) {
                throw new Error('Error updating category');
            }
    
            const updatedCategories = categories.map(cat => {
                return cat.id === category.id ? category : cat;
            });
            setCategories(updatedCategories);
        } catch (error) {
            console.error('Error updating category:', error);
        }
    
        handleCloseUpdateModal();
        refreshCategories();
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

    let tableColumns = selectedColumns.map(columnName => ({
        name: columnName,
        selector: (row: Category) => row[columnName],
        sortable: true,
    }));

    const actionColumn: TableColumn<Category> = {
        name: 'Actions',
        cell: (row: Category) => (
            <div>
                <Button variant="outline-primary" onClick={() => handleEditCategory(row)}>Editar</Button>{' '}
                <Button variant="outline-primary" onClick={() => deleteCategory(row.id)}>Apagar</Button>{' '}
            </div>
        ),
        selector: undefined,
    };

    return (
        <div>
            <NavBar />
            <div className='filter-refresh-add-edit-upper-class'>
                <input
                    className='filter-input'
                    type="text"
                    placeholder="Filtro"
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                />
                <Button variant="outline-primary" onClick={refreshCategories}>Atualizar</Button>{' '}
                <Button variant="outline-primary" onClick={handleOpenAddModal}>Adicionar</Button>{' '}
                <Button variant="outline-primary" onClick={() => setOpenColumnSelector(true)}>Visualizar</Button>{' '}
                <CreateModal
                    title="Adicionar Categoria"
                    open={showAddModal}
                    onClose={handleCloseAddModal}
                    onSave={handleAddCategory}
                    fields={fields}
                    initialValues={{}}
                />
                {selectedCategory && (
                    <UpdateModal
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={handleUpdateCategory}
                        entity={selectedCategory}
                        fields={fields}
                        title="Atualizar Categoria"
                    />
                )}
            </div>
            <div>
                <div className='table-css'>
                    <DataTable
                        columns={[...tableColumns, actionColumn]}
                        data={filteredItems}
                        pagination
                    />
                </div>
            </div>
            <Footer />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={Object.keys(filteredItems[0])}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                />
            )}
        </div >
    );
}