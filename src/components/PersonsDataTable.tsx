import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { fetchWithAuth } from './FetchWithAuth';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { Employee } from '../helpers/Types';
import { employeeFields } from '../helpers/Fields';
import { UpdateModal } from '../modals/UpdateModal';

interface PersonsDataTableProps {
    selectedEmployeeIds: string[];
}

export const PersonsDataTable = ({ selectedEmployeeIds }: PersonsDataTableProps) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    const emptyEmployee = employeeFields.reduce((acc, field) => ({
        ...acc,
        [field.key]: ''
    }), {});

    const fetchEmployeesDetails = async () => {
        setIsLoading(true);
        try {
            const responses = await Promise.all(
                selectedEmployeeIds.map(employeeID =>
                    fetchWithAuth(`https://localhost:7129/api/Employees/GetEmployeeById/${employeeID}`)
                )
            );

            const employeesData = await Promise.all(responses.map(res => {
                if (!res.ok) {
                    console.log('Erro na requisição:', res.status);
                    toast.error('A requisição falhou');
                }
                return res.json();
            }));

            setEmployees(employeesData);
        } catch (error) {
            toast.error('Erro ao buscar dados dos funcionários');
            console.error('Erro da API:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedEmployeeIds.length > 0) {
            fetchEmployeesDetails();
        } else {
            setEmployees([]);
        }
    }, [selectedEmployeeIds]);

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
            fetchEmployeesDetails();
        }
    };  

    const columns = employeeFields.map(field => ({
        name: field.label,
        selector: (row: Employee) => row[field.key],
        sortable: true,
    }));

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

    return (
        <div>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <DataTable
                        columns={columns}
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
                </>
            )}
        </div>
    );
};