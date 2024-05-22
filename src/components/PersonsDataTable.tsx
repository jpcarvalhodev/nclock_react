import { useCallback, useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { fetchWithAuth } from './FetchWithAuth';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { Employee } from '../helpers/Types';
import { employeeFields } from '../helpers/Fields';
import { UpdateModalEmployees } from '../modals/UpdateModalEmployees';
import { Button } from 'react-bootstrap';
import { DeleteModal } from '../modals/DeleteModal';
import { ExpandedComponentEmpZoneExtEnt } from './ExpandedComponentEmpZoneExtEnt';
import { CustomOutlineButton } from './CustomOutlineButton';
import { customStyles } from './CustomStylesDataTable';

// Define as propriedades da tabela de pessoas
interface PersonsDataTableProps {
    selectedEmployeeIds: string[];
    selectedColumns: string[];
    showAllEmployees: boolean;
    filterText: string;
    filteredEmployees: (filtered: Employee[]) => void;
    resetSelection: boolean;
    employees: Employee[];
}

// Define o componente
export const PersonsDataTable = ({ selectedEmployeeIds, selectedColumns, filterText, filteredEmployees, resetSelection, employees: propEmployees }: PersonsDataTableProps) => {
    const [employees, setEmployees] = useState<Employee[]>(propEmployees); // Inicializar com prop
    const [isLoading, setIsLoading] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState<Employee | null>(null);
    const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
    const [resetSelectionInternal, setResetSelectionInternal] = useState(false);

    // Atualiza a lista de funcionários quando a propriedade employees é alterada
    useEffect(() => {
        setEmployees(propEmployees);
    }, [propEmployees]);

    // Função para buscar todos os funcionários
    const fetchAllEmployees = async () => {
        setIsLoading(true);
        try {
            const response = await fetchWithAuth('Employees/GetAllEmployees');
            if (!response.ok) {
                toast.error('Erro ao buscar funcionários');
                return;
            }
            const employeesData = await response.json();
            setEmployees(employeesData);
        } catch (error) {
            console.error('Erro ao buscar funcionários:', error);
        } finally {
            setIsLoading(false);
        }
    }

    // Atualiza um funcionário
    const handleUpdateEmployee = async (employee: Employee) => {
        try {
            const response = await fetchWithAuth(`Employees/UpdateEmployee/${employee.employeeID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee)
            });

            if (!response.ok) {
                toast.error(`Erro ao atualizar funcionário`);
                return;
            }

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const updatedEmployee = await response.json();
                setEmployees(prevEmployees => prevEmployees.map(emp => emp.employeeID === updatedEmployee.employeeID ? updatedEmployee : emp));
                toast.success('Funcionário atualizado com sucesso');
            } else {
                await response.text();
                toast.success(response.statusText || 'Atualização realizada com sucesso');
            }

        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
            toast.error('Erro ao conectar ao servidor');
        } finally {
            setShowUpdateModal(false);
            refreshEmployees();
        }
    };

    // Exclui um funcionário
    const handleDeleteEmployee = async (employeeID: string) => {
        try {
            const response = await fetchWithAuth(`Employees/DeleteEmployee/${employeeID}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                toast.error(`Erro ao excluir funcionário`);
                return;
            }

            setEmployees(prevEmployees => prevEmployees.filter(emp => emp.employeeID !== employeeID));
            toast.success('Funcionário excluído com sucesso');
        } catch (error) {
            console.error('Erro ao excluir funcionário:', error);
            toast.error('Erro ao conectar ao servidor');
        } finally {
            setShowDeleteModal(false);
            refreshEmployees();
        }
    }

    const refreshEmployees = () => {
        fetchAllEmployees();
    }

    // Memoriza a função de filtragem de funcionários
    const memorizedFilteredEmployees = useCallback(filteredEmployees, []);

    // Filtra os funcionários
    useEffect(() => {
        let filteredByIDs = selectedEmployeeIds.length > 0
            ? propEmployees.filter((emp) => selectedEmployeeIds.includes(emp.employeeID))
            : propEmployees;

        let filteredBySearchText = filteredByIDs.filter((employee) =>
            Object.values(employee).some((value) =>
                String(value).toLowerCase().includes(filterText.toLowerCase())
            )
        );

        setEmployees(filteredBySearchText);
        memorizedFilteredEmployees(filteredBySearchText);
    }, [selectedEmployeeIds, filterText, propEmployees, memorizedFilteredEmployees]);

    // Reseta a seleção de funcionários
    useEffect(() => {
        if (resetSelection) {
            setResetSelectionInternal(true);
        }
    }, [resetSelection]);

    // Reseta a seleção interna de funcionários
    useEffect(() => {
        if (resetSelectionInternal) {
            setResetSelectionInternal(false);
            setSelectedRows([]);
        }
    }, [resetSelectionInternal]);

    // Abre o modal de exclusão de funcionário
    const handleOpenDeleteModal = (employee: Employee) => {
        setSelectedEmployeeToDelete(employee);
        setShowDeleteModal(true);
    };

    // Abre o modal de edição de funcionário
    const handleRowDoubleClicked = (row: Employee) => {
        setSelectedEmployee(row);
        setShowUpdateModal(true);
    };

    // Abre o modal de edição de funcionário
    const handleEditEmployee = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowUpdateModal(true);
    }

    // Seleciona as linhas da tabela
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: Employee[];
    }) => {
        setSelectedRows(state.selectedRows);
        filteredEmployees(state.selectedRows);
    };

    // Define as opções de paginação
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define as colunas da tabela
    const columns: TableColumn<Employee>[] = employeeFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: Employee) => {
                switch (field.key) {
                    case 'status':
                        return row.status ? 'Activo' : 'Inactivo';
                    case 'statusEmail':
                        return row.statusEmail ? 'Activo' : 'Inactivo';
                    case 'rgpdAut':
                        return row.rgpdAut ? 'Autorizado' : 'Não Autorizado';
                    case 'departmentId':
                        return row.departmentName || '';
                    case 'professionId':
                        return row.professionName || '';
                    case 'categoryId':
                        return row.categoryName || '';
                    case 'groupId':
                        return row.groupName || '';
                    case 'zoneId':
                        return row.zoneName || '';
                    case 'externalEntityId':
                        return row.externalEntityName || '';
                    default:
                        return row[field.key] || '';
                }
            };

            return {
                name: field.label,
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Define o componente de linha expandida
    const expandableRowComponent = (row: Employee) => (
        <ExpandedComponentEmpZoneExtEnt data={row} fields={employeeFields} />
    );

    // Define a coluna de ações
    const actionColumn: TableColumn<Employee> = {
        name: 'Ações',
        cell: (row: Employee) => (
            row.employeeID ? (
                <div style={{ display: 'flex' }}>
                    <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditEmployee(row)} />
                    <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row)} >
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
                        columns={[...columns, actionColumn]}
                        data={employees}
                        highlightOnHover
                        pagination
                        paginationComponentOptions={paginationOptions}
                        onRowDoubleClicked={handleRowDoubleClicked}
                        expandableRows
                        expandableRowsComponent={({ data }) => expandableRowComponent(data)}
                        selectableRows
                        onSelectedRowsChange={handleRowSelected}
                        selectableRowsHighlight
                        clearSelectedRows={resetSelectionInternal}
                        noDataComponent="Não há dados disponíveis para exibir."
                        customStyles={customStyles}
                    />
                    {selectedEmployee && (
                        <UpdateModalEmployees
                            open={showUpdateModal}
                            onClose={() => setShowUpdateModal(false)}
                            onUpdate={handleUpdateEmployee}
                            entity={selectedEmployee}
                            fields={employeeFields}
                            title="Atualizar Pessoa"
                        />
                    )}
                    {showDeleteModal && (
                        <DeleteModal
                            open={showDeleteModal}
                            onClose={() => setShowDeleteModal(false)}
                            onDelete={handleDeleteEmployee}
                            entityId={selectedEmployeeToDelete ? selectedEmployeeToDelete.employeeID : ''}
                        />
                    )}
                </>
            )}
        </div>
    );
};