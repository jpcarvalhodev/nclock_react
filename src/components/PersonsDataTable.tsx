import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { fetchWithAuth } from './FetchWithAuth';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { Employee } from '../helpers/Types';
import { employeeFields } from '../helpers/Fields';
import { UpdateModal } from '../modals/UpdateModal';
import { Button } from 'react-bootstrap';
import { DeleteModal } from '../modals/DeleteModal';

interface PersonsDataTableProps {
    selectedEmployeeIds: string[];
    selectedColumns: string[];
    showAllEmployees: boolean;
    filterText: string;
    filteredEmployees: (filtered: Employee[]) => void;
}

export const PersonsDataTable = ({ selectedEmployeeIds, selectedColumns, showAllEmployees, filterText, filteredEmployees }: PersonsDataTableProps) => {
    const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState<Employee | null>(null);

    const fetchAllEmployees = async () => {
        setIsLoading(true);
        try {
            const response = await fetchWithAuth('https://localhost:7129/api/Employees/GetAllEmployees');
            if (!response.ok) {
                toast.error('Falha ao carregar dados dos funcionários');
                console.error('Erro ao carregar todos os funcionários:', response.status);
                return;
            }
            const employeesData = await response.json();
            setAllEmployees(employeesData);
            setEmployees(employeesData);
        } catch (error) {
            toast.error('Erro ao buscar dados dos funcionários');
            console.error('Erro da API:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllEmployees();
    }, []);

    useEffect(() => {
        if (selectedEmployeeIds.length > 0) {
            const filteredEmployees = allEmployees.filter(emp => selectedEmployeeIds.includes(emp.employeeID));
            setEmployees(filteredEmployees);
        } else {
            setEmployees(allEmployees);
        }
    }, [selectedEmployeeIds, allEmployees]);

    const emptyEmployee = employeeFields.reduce((acc, field) => ({
        ...acc,
        [field.key]: ''
    }), {});

    useEffect(() => {
        if (selectedEmployeeIds.length > 0) {
            const filteredEmployees = allEmployees.filter(emp => selectedEmployeeIds.includes(emp.employeeID));
            setEmployees(filteredEmployees);
        } else {
            setEmployees(allEmployees);
        }
    }, [selectedEmployeeIds, allEmployees]);

    const handleUpdateEmployee = async (employee: Employee) => {
        try {
            const response = await fetchWithAuth(`https://localhost:7129/api/Employees/UpdateEmployee/${employee.employeeID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee)
            });

            if (!response.ok) {
                const errorText = await response.text();
                toast.error(`Erro ao atualizar funcionário: ${errorText}`);
                return;
            }

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const updatedEmployee = await response.json();
                setEmployees(prevEmployees => prevEmployees.map(emp => emp.employeeID === updatedEmployee.employeeID ? updatedEmployee : emp));
            } else {
                await response.text();
                toast.success('Funcionário atualizado com sucesso');
            }

        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
            toast.error('Falha ao conectar ao servidor');
        } finally {
            handleCloseUpdateModal();
            fetchAllEmployees();
        }
    };

    const handleDeleteEmployee = async (employeeID: string) => {
        try {
            const response = await fetchWithAuth(`https://localhost:7129/api/Employees/DeleteEmployee/${employeeID}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                toast.error(`Erro ao excluir funcionário: ${errorText}`);
                return;
            }

            setEmployees(prevEmployees => prevEmployees.filter(emp => emp.employeeID !== employeeID));
            toast.success('Funcionário excluído com sucesso');
        } catch (error) {
            console.error('Erro ao excluir funcionário:', error);
            toast.error('Falha ao conectar ao servidor');
        } finally {
            fetchAllEmployees();
        }
    }

    useEffect(() => {
        let filtered = employees;
    
        if (filterText) {
            filtered = filtered.filter(employee =>
                Object.keys(employee).some(key => {
                    const value = employee[key];
                    return value != null && value.toString().toLowerCase().includes(filterText.toLowerCase());
                })
            );
        }
    
        if (!showAllEmployees && selectedEmployeeIds.length > 0) {
            filtered = filtered.filter(employee => selectedEmployeeIds.includes(employee.employeeID));
        }
    
        filteredEmployees(filtered);
    }, [employees, filterText, selectedEmployeeIds, showAllEmployees, filteredEmployees]);     

    const handleOpenDeleteModal = (employee: Employee) => {
        setSelectedEmployeeToDelete(employee);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedEmployeeToDelete(null);
    };

    const handleRowDoubleClicked = (row: Employee) => {
        setSelectedEmployee(row);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedEmployee(null);
    };

    const data = employees.length >= 5 ? employees : [...employees, ...Array(5 - employees.length).fill(emptyEmployee)];

    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    const tableColumns = employeeFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => ({
            name: field.label,
            selector: (row: Employee) => row[field.key],
            sortable: true,
        }));

    const actionColumn: TableColumn<Employee> = {
        name: 'Ações',
        cell: (row: Employee) => (
            row.employeeID ? (
                <div>
                    <Button variant="outline-danger" onClick={() => handleOpenDeleteModal(row)}>
                        <i className="bi bi-trash-fill"></i>
                    </Button>{' '}
                </div>
            ) : null
        ),
        selector: (row: Employee) => row.employeeID,
        ignoreRowClick: true,
    };

    return (
        <div>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <DataTable
                        columns={[...tableColumns, actionColumn]}
                        data={data}
                        noHeader
                        highlightOnHover
                        pagination
                        paginationComponentOptions={paginationOptions}
                        onRowDoubleClicked={handleRowDoubleClicked}
                    />
                    {selectedEmployee && (
                        <UpdateModal
                            open={showUpdateModal}
                            onClose={handleCloseUpdateModal}
                            onUpdate={handleUpdateEmployee}
                            entity={selectedEmployee}
                            fields={employeeFields}
                            title="Atualizar Funcionário"
                        />
                    )}
                    {showDeleteModal && (
                        <DeleteModal
                            open={showDeleteModal}
                            onClose={handleCloseDeleteModal}
                            onDelete={handleDeleteEmployee}
                            entityId={selectedEmployeeToDelete ? selectedEmployeeToDelete.employeeID : ''}
                        />
                    )}
                </>
            )}
        </div>
    );
};