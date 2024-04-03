import { useState, useEffect } from 'react';
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import '../css/PagesStyles.css';
import Button from 'react-bootstrap/Button';
import DataTable, { TableColumn } from 'react-data-table-component';
import { ColumnSelectorModal } from '../modals/ColumnSelectorModal';
import { Employee } from '../types/Types';
import { CreateModal } from '../modals/CreateModal';
import { UpdateModal } from '../modals/UpdateModal';
import { DeleteModal } from '../modals/DeleteModal';

export const Employees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['number', 'name', 'shortName']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployeeIdToDelete, setSelectedEmployeeIdToDelete] = useState<string | null>(null);

    const fields = [
        { label: 'Number', key: 'number', type: 'number', required: true },
        { label: 'Name', key: 'name', type: 'string', required: true },
        { label: 'Short Name', key: 'shortName', type: 'string', required: true },
        { label: 'Name Acronym', key: 'nameAcronym', type: 'string', required: true },
        { label: 'Comments', key: 'comments', type: 'string' },
        { label: 'Photo', key: 'photo', type: 'string' },
        { label: 'Address', key: 'address', type: 'string' },
        { label: 'Zipcode', key: 'zipcode', type: 'string' },
        { label: 'Locality', key: 'locality', type: 'string' },
        { label: 'Village', key: 'village', type: 'string' },
        { label: 'District', key: 'district', type: 'string' },
        { label: 'Phone', key: 'phone', type: 'number' },
        { label: 'Mobile', key: 'mobile', type: 'number' },
        { label: 'Email', key: 'email', type: 'string' },
        { label: 'Birthday', key: 'birthday', type: 'string' },
        { label: 'Nacionality', key: 'nacionality', type: 'string' },
        { label: 'Gender', key: 'gender', type: 'string' },
        { label: 'BI Number', key: 'biNumber', type: 'string' },
        { label: 'BI Issuance', key: 'biIssuance', type: 'string' },
        { label: 'BI Validity', key: 'biValidity', type: 'string' },
        { label: 'NIF', key: 'nif', type: 'number' },
        { label: 'Admission Date', key: 'admissionDate', type: 'string' },
        { label: 'Exit Date', key: 'exitDate', type: 'string' },
        { label: 'RGPD Aut', key: 'rgpdAut', type: 'string' },
        { label: 'Department ID', key: 'departmentId', type: 'string' },
        { label: 'Department Name', key: 'departmentName', type: 'string' },
        { label: 'Profession ID', key: 'professionId', type: 'string' },
        { label: 'Profession Name', key: 'professionName', type: 'string' },
        { label: 'Category ID', key: 'categoryId', type: 'string' },
        { label: 'Category Name', key: 'categoryName', type: 'string' },
        { label: 'Group ID', key: 'groupId', type: 'string' },
        { label: 'Group Name', key: 'groupName', type: 'string' },
        { label: 'Zone ID', key: 'zoneId', type: 'string' },
        { label: 'Zone Name', key: 'zoneName', type: 'string' },
        { label: 'External Entity ID', key: 'externalEntityId', type: 'string' },
        { label: 'External Entity Name', key: 'externalEntityName', type: 'string' },
    ];

    const fetchEmployees = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://localhost:7129/api/Employees', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error fetching employees');
            }

            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching the employees', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const refreshEmployees = () => {
        fetchEmployees();
    };

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleOpenUpdateModal = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setSelectedEmployee(null);
        setShowUpdateModal(false);
    };

    const handleAddEmployee = async (employee: Employee) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://localhost:7129/api/Employees', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee)
            });

            if (!response.ok) {
                throw new Error('Error adding new employee');
            }

            const data = await response.json();
            setEmployees([...employees, data]);
        } catch (error) {
            console.error('Error adding new employee:', error);
        }

        handleCloseAddModal();
        refreshEmployees();
    };

    const handleUpdateEmployee = async (employee: Employee) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://localhost:7129/api/Employees`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee)
            });

            if (!response.ok) {
                throw new Error('Error updating employee');
            }

            const updatedEmployees = employees.map(employee => {
                return employee.id === employee.id ? employee : employee;
            });
            setEmployees(updatedEmployees);
        } catch (error) {
            console.error('Error updating employee:', error);
        }

        handleCloseUpdateModal();
        refreshEmployees();
    };

    const filteredItems = employees.filter(item =>
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
        setSelectedColumns(['number', 'name', 'shortName']);
    };

    const tableColumns = selectedColumns.map(columnName => ({
        name: columnName,
        selector: (row: Employee) => row[columnName],
        sortable: true,
    }));

    const handleEditEmployee = (employee: Employee) => {
        setSelectedEmployeeId(employee.id);
        handleOpenUpdateModal(employee);
    };

    const handleOpenDeleteModal = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setSelectedEmployeeIdToDelete(null);
        setShowDeleteModal(false);
    };

    const handleDeleteEmployee = async (id: string) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://localhost:7129/api/Employees/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error deleting employee');
            }

            const updatedEmployees = employees.filter(employee => employee.id !== id);
            setEmployees(updatedEmployees);
        } catch (error) {
            console.error('Error deleting employee:', error);
        }

        handleCloseDeleteModal();
        refreshEmployees();
    }    

    const actionColumn: TableColumn<Employee> = {
        name: 'Actions',
        cell: (row: Employee) => (
            <div>
                <Button variant="outline-primary" onClick={() => handleEditEmployee(row)}>Editar</Button>{' '}
                <Button variant="outline-danger" onClick={() => handleOpenDeleteModal(row)}>Apagar</Button>{' '}
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
                <Button variant="outline-primary" onClick={refreshEmployees}>Atualizar</Button>{' '}
                <Button variant="outline-primary" onClick={handleOpenAddModal}>Adicionar</Button>{' '}
                <Button variant="outline-primary" onClick={() => setOpenColumnSelector(true)}>Visualizar</Button>{' '}
                <CreateModal
                    title="Adicionar Funcionário"
                    open={showAddModal}
                    onClose={handleCloseAddModal}
                    onSave={handleAddEmployee}
                    fields={fields}
                    initialValues={{}}
                />
                {selectedEmployee && (
                    <UpdateModal
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={handleUpdateEmployee}
                        entity={selectedEmployee}
                        fields={fields}
                        title="Atualizar Funcionário"
                    />
                )}
                <DeleteModal
                    open={showDeleteModal}
                    onClose={handleCloseDeleteModal}
                    onDelete={handleDeleteEmployee}
                    entityId={selectedEmployeeIdToDelete}
                />
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
