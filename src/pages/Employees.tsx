import { useState, useEffect } from 'react';
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import '../css/PagesStyles.css';
import Button from 'react-bootstrap/Button';
import DataTable, { TableColumn } from 'react-data-table-component';
import { ColumnSelectorModal } from '../modals/ColumnSelectorModal';
import { Employee } from '../helpers/Types';
import { CreateModal } from '../modals/CreateModal';
import { UpdateModal } from '../modals/UpdateModal';
import { DeleteModal } from '../modals/DeleteModal';
import { CustomOutlineButton } from '../components/CustomOutlineButton';
import { fetchWithAuth } from '../components/FetchWithAuth';
import { employeeFields } from '../helpers/Fields';

export const Employees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['number', 'name', 'shortName']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState<string | null>(null);

    const fetchEmployees = async () => {
        try {
            const response = await fetchWithAuth('https://localhost:7129/api/Employees');
            if (!response.ok) {
                throw new Error('Error fetching employees');
            }
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching the employees', error);
        }
    };

    const handleAddEmployee = async (employee: Employee) => {
        try {
            const response = await fetchWithAuth('https://localhost:7129/api/Employees', {
                method: 'POST',
                headers: {
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
        try {
            const response = await fetchWithAuth(`https://localhost:7129/api/Employees/${employee.employeeID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee)
            });

            if (!response.ok) {
                throw new Error('Error updating employee');
            }

            const updatedEmployees = employees.map(emp => emp.id === employee.id ? employee : emp);
            setEmployees(updatedEmployees);
        } catch (error) {
            console.error('Error updating employee:', error);
        }

        handleCloseUpdateModal();
        refreshEmployees();
    };

    const handleDeleteEmployee = async (employeeID: string) => {
        console.log(employeeID);

        try {
            const response = await fetchWithAuth(`https://localhost:7129/api/Employees/${employeeID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error deleting employee');
            }
            refreshEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
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

    const handleCloseUpdateModal = () => {
        setSelectedEmployee(null);
        setShowUpdateModal(false);
    };

    const handleOpenDeleteModal = (employeeID: string) => {
        setSelectedEmployeeToDelete(employeeID);
        setShowDeleteModal(true);
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

    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    const columnNamesMap = employeeFields.reduce<Record<string, string>>((acc, field) => {
        acc[field.key] = field.label;
        return acc;
    }, {});

    const tableColumns = selectedColumns
        .map(columnKey => ({
            name: columnNamesMap[columnKey] || columnKey,
            selector: (row: Record<string, any>) => row[columnKey],
            sortable: true,
        }));

    const handleEditEmployee = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowUpdateModal(true);
    };

    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    const ExpandedComponent: React.FC<{ data: Employee }> = ({ data }) => (
        <div className="expanded-details-container">
            {Object.entries(data).map(([key, value], index) => {
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

    const actionColumn: TableColumn<Employee> = {
        name: 'Ações',
        cell: (row: Employee) => (
            <div>
                <CustomOutlineButton icon="bi-pencil-square" onClick={() => handleEditEmployee(row)}></CustomOutlineButton>{' '}
                <Button variant="outline-danger" onClick={() => handleOpenDeleteModal(row.employeeId)}>
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: Employee) => row.employeeID,
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
                <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshEmployees} />
                <CustomOutlineButton icon="bi-plus" onClick={handleOpenAddModal} iconSize='1.1em' />
                <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                <CreateModal
                    title="Adicionar Funcionário"
                    open={showAddModal}
                    onClose={handleCloseAddModal}
                    onSave={handleAddEmployee}
                    fields={employeeFields}
                    initialValues={{}}
                />
                {selectedEmployee && (
                    <UpdateModal
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={() => handleUpdateEmployee(selectedEmployee)}
                        entity={selectedEmployee}
                        fields={employeeFields}
                        title="Atualizar Funcionário"
                    />
                )}
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteEmployee}
                    entityId={selectedEmployeeToDelete}
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
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={employeeFields}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
                />
            )}
            <Footer />
        </div>
    );
}