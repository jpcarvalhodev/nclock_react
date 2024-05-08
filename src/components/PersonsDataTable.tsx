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

interface PersonsDataTableProps {
    selectedEmployeeIds: string[];
    selectedColumns: string[];
    showAllEmployees: boolean;
    filterText: string;
    filteredEmployees: (filtered: Employee[]) => void;
    resetSelection: boolean;
}

export const PersonsDataTable = ({ selectedEmployeeIds, selectedColumns, filterText, filteredEmployees, resetSelection }: PersonsDataTableProps) => {
    const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState<Employee | null>(null);
    const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
    const [resetSelectionInternal, setResetSelectionInternal] = useState(false);

    const fetchAllEmployees = async () => {
        setIsLoading(true);
        try {
            const response = await fetchWithAuth('Employees/GetAllEmployees');
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
            toast.error('Falha ao conectar ao servidor');
        } finally {
            fetchAllEmployees();
        }
    }

    const memoizedFilteredEmployees = useCallback(filteredEmployees, []);

    useEffect(() => {
        let filteredByIDs = selectedEmployeeIds.length > 0
            ? allEmployees.filter((emp) =>
                selectedEmployeeIds.includes(emp.employeeID) ||
                !emp.departmentId ||
                !emp.groupId
            )
            : allEmployees;

        let filteredBySearchText = filteredByIDs.filter((employee) =>
            Object.values(employee).some((value) =>
                String(value).toLowerCase().includes(filterText.toLowerCase())
            )
        );

        setEmployees(filteredBySearchText);
        memoizedFilteredEmployees(filteredBySearchText);
    }, [selectedEmployeeIds, filterText, allEmployees, memoizedFilteredEmployees]);

    useEffect(() => {
        if (resetSelection) {
            setResetSelectionInternal(true);
        }
    }, [resetSelection]);

    useEffect(() => {
        if (resetSelectionInternal) {
            setResetSelectionInternal(false);
            setSelectedRows([]);
        }
    }, [resetSelectionInternal]);

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

    const handleEditEmployee = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowUpdateModal(true);
    }

    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: Employee[];
    }) => {
        setSelectedRows(state.selectedRows);
        filteredEmployees(state.selectedRows);
    };

    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

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
                        return row.professionCode || '';
                    case 'categoryId':
                        return row.categoryCode || '';
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

    const expandableRowComponent = (row: Employee) => (
        <ExpandedComponentEmpZoneExtEnt data={row} fields={employeeFields} />
    );

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
                    />
                    {selectedEmployee && (
                        <UpdateModalEmployees
                            open={showUpdateModal}
                            onClose={handleCloseUpdateModal}
                            onUpdate={handleUpdateEmployee}
                            entity={selectedEmployee}
                            fields={employeeFields}
                            title="Atualizar Pessoa"
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