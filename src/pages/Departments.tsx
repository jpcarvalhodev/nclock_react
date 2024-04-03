import { useState, useEffect } from 'react';
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import '../css/PagesStyles.css';
import Button from 'react-bootstrap/Button';
import DataTable, { TableColumn } from 'react-data-table-component';
import { ColumnSelectorModal } from '../modals/ColumnSelectorModal';
import { Department } from '../types/Types';
import { CreateModal } from '../modals/CreateModal';
import { UpdateModal } from '../modals/UpdateModal';

export const Departments = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['code', 'name']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

    const fields = [
        { label: 'Code', key: 'code', type: 'number', required: true },
        { label: 'Name', key: 'name', type: 'string', required: true },
        { label: 'Description', key: 'description', type: 'string' },
        { label: 'Parent ID', key: 'paiId', type: 'number' },
    ];

    const fetchDepartments = async () => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch('https://localhost:7129/api/Departaments', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Error fetching departments data');
            }
    
            const data = await response.json();
            setDepartments(data);
        } catch (error) {
            console.error('Error fetching the departments', error);
        }
    };

    const deleteDepartment = async (id: string) => {
        try {
            const response = await fetch(`https://localhost:7129/api/Departaments/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Error deleting department');
            }
    
            refreshDepartments();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const refreshDepartments = () => {
        fetchDepartments();
    };

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleOpenUpdateModal = (department: Department) => {
        setSelectedDepartment(department);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setSelectedDepartment(null);
        setShowUpdateModal(false);
    };

    const handleAddDepartment = async (department: Department) => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch('https://localhost:7129/api/Departaments', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(department)
            });
    
            if (!response.ok) {
                throw new Error('Error adding new department');
            }
    
            const data = await response.json();
            setDepartments([...departments, data]);
            handleCloseAddModal();
        } catch (error) {
            console.error('Error adding new department:', error);
        }
    };

    const handleUpdateDepartment = async (department: Department) => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch(`https://localhost:7129/api/Departaments/${department.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(department)
            });
    
            if (!response.ok) {
                throw new Error('Error updating department');
            }
    
            const updatedDepartments = departments.map(department => {
                return department.id === department.id ? department : department;
            });
            setDepartments(updatedDepartments);
        } catch (error) {
            console.error('Error updating department:', error);
        }
    
        handleCloseUpdateModal();
        refreshDepartments();
    };

    const filteredItems = departments.filter(item =>
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
        setSelectedColumns(['code', 'name']);
    };

    let tableColumns = selectedColumns.map(columnName => ({
        name: columnName,
        selector: (row: Department) => row[columnName],
        sortable: true,
    }));

    const handleEditDepartment = (department: Department) => {
        setSelectedDepartmentId(department.id);
        handleOpenUpdateModal(department);
    };

    const actionColumn: TableColumn<Department> = {
        name: 'Actions',
        cell: (row: Department) => (
            <div>
                <Button variant="outline-primary" onClick={() => handleEditDepartment(row)}>Editar</Button>{' '}
                <Button variant="outline-primary" onClick={() => deleteDepartment(row.id)}>Apagar</Button>{' '}
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
                <Button variant="outline-primary" onClick={refreshDepartments}>Atualizar</Button>{' '}
                <Button variant="outline-primary" onClick={handleOpenAddModal}>Adicionar</Button>{' '}
                <Button variant="outline-primary" onClick={() => setOpenColumnSelector(true)}>Visualizar</Button>{' '}
                <CreateModal
                    title="Adicionar Departamento"
                    open={showAddModal}
                    onClose={handleCloseAddModal}
                    onSave={handleAddDepartment}
                    fields={fields}
                    initialValues={{}}
                />
                {selectedDepartment && (
                    <UpdateModal
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={handleUpdateDepartment}
                        entity={selectedDepartment}
                        fields={fields}
                        title="Atualizar Departamento"
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
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={Object.keys(filteredItems[0])}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                />
            )}
            <Footer />
        </div>
    );
}