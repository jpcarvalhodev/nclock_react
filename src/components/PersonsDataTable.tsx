import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { fetchWithAuth } from './FetchWithAuth';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { Employee } from '../helpers/Types';
import { employeeFields } from '../helpers/Fields';

interface PersonsDataTableProps {
    selectedEmployeeIds: string[];
}

export const PersonsDataTable = ({ selectedEmployeeIds }: PersonsDataTableProps) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchEmployeesDetails = async () => {
            setIsLoading(true);
            try {
                const validEmployeeIds = selectedEmployeeIds.filter(id => id.startsWith('emp-'));

                if (validEmployeeIds.length === 0) {
                    console.log('Nenhum ID de funcionário válido para buscar.');
                    setIsLoading(false);
                    return;
                }

                const responses = await Promise.all(
                    validEmployeeIds.map(employeeID =>
                        fetchWithAuth(`https://localhost:7129/api/Employees/GetEmployeeById/${employeeID}`, {
                            credentials: 'include'
                        })
                    )
                );

                const employeesData = await Promise.all(responses.map(res => {
                    if (!res.ok) {
                        console.log('Erro com a requisição:', res.status);
                        throw new Error('Falha na requisição');
                    }
                    return res.json();
                }));

                setEmployees(employeesData);
            } catch (error) {
                toast.error('Erro ao buscar detalhes dos funcionários');
                console.error('Erro na API:', error);
            }
            setIsLoading(false);
        };

        if (selectedEmployeeIds.length > 0) {
            fetchEmployeesDetails();
        } else {
            setEmployees([]);
            setIsLoading(false);
        }
    }, [selectedEmployeeIds]);

    const columns = employeeFields.map(field => ({
        name: field.label,
        selector: (row: Employee) => row[field.key],
        sortable: true,
    }));

    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    return (
        <div>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <DataTable
                    columns={columns}
                    data={employees.length > 0 ? employees : Array(5).fill({})}
                    noHeader
                    highlightOnHover
                    pagination
                    paginationComponentOptions={paginationOptions}
                />
            )}
        </div>
    );
};