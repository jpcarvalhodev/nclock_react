import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { fetchWithAuth } from './FetchWithAuth';
import { toast } from 'react-toastify';
import { Department, Employee, Group } from '../helpers/Types';
import { employeeFields } from '../helpers/Fields';
import { UpdateModalEmployees } from '../modals/UpdateModalEmployees';
import { Button } from 'react-bootstrap';
import { DeleteModal } from '../modals/DeleteModal';
import { ExpandedComponentEmpZoneExtEnt } from './ExpandedComponentEmpZoneExtEnt';
import { CustomOutlineButton } from './CustomOutlineButton';
import { customStyles } from './CustomStylesDataTable';

// Define a interface para o estado dos dados
interface DataState {
    departments: Department[];
    groups: Group[];
    employees: Employee[];
}

// Define as propriedades da tabela de pessoas
interface PersonsDataTableProps {
    selectedEmployeeIds: string[];
    selectedColumns: string[];
    showAllEmployees: boolean;
    filterText: string;
    filteredEmployees: (filtered: Employee[]) => void;
    resetSelection: boolean;
    data: DataState;
    onRefreshData: (data: DataState) => void;
    filteredData: Employee[];
}

// Define o componente
export const PersonsDataTable = ({ selectedEmployeeIds, selectedColumns, filterText, filteredEmployees, resetSelection, data, onRefreshData, filteredData }: PersonsDataTableProps) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState<Employee | null>(null);
    const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
    const [resetSelectionInternal, setResetSelectionInternal] = useState(false);

    // Função para buscar todos os funcionários
    const fetchAllEmployees = async () => {
        try {
            const response = await fetchWithAuth('Employees/GetAllEmployees');
            if (!response.ok) {
                toast.error('Erro ao buscar funcionários');
                return;
            }
            const employeesData = await response.json();
            onRefreshData({
                ...data,
                employees: employeesData
            });
        } catch (error) {
            console.error('Erro ao buscar funcionários:', error);
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
                const updatedEmployees = data.employees.map(emp => emp.employeeID === updatedEmployee.employeeID ? updatedEmployee : emp);
                onRefreshData({
                    ...data,
                    employees: updatedEmployees
                });
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
            const updatedEmployees = data.employees.filter(emp => emp.employeeID !== employeeID);
            onRefreshData({
                ...data,
                employees: updatedEmployees,
            });
            toast.success('Funcionário excluído com sucesso');
        } catch (error) {
            console.error('Erro ao excluir funcionário:', error);
            toast.error('Erro ao conectar ao servidor');
        } finally {
            setShowDeleteModal(false);
            refreshEmployees();
        }
    }

    // Busca os funcionários
    useEffect(() => {
        fetchAllEmployees();
    }, []);

    // Atualiza a lista de funcionários
    const refreshEmployees = () => {
        fetchAllEmployees();
    }

    // Filtra os funcionários
    const handleFilteredEmployees = (employees: Employee[]) => {
        filteredEmployees(employees);
    }

    // Filtra os funcionários
    useEffect(() => {
        let filteredByIDs = selectedEmployeeIds.length > 0
            ? data.employees.filter((emp: Employee) => selectedEmployeeIds.includes(emp.employeeID))
            : data.employees;

        let filteredBySearchText = filteredByIDs.filter((employee) =>
            Object.values(employee).some((value) =>
                String(value).toLowerCase().includes(filterText.toLowerCase())
            )
        );
        handleFilteredEmployees(filteredBySearchText);
    }, [selectedEmployeeIds, filterText, data.employees]);

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

    // Fecha o modal de edição de funcionário
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedEmployee(null);
    };

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

    // Função para formatar a data e a hora
    function formatDateAndTime(input: string | Date): string {
        const date = typeof input === 'string' ? new Date(input) : input;
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        };
        return new Intl.DateTimeFormat('pt-PT', options).format(date);
    }

    // Define as colunas da tabela
    const columns: TableColumn<Employee>[] = employeeFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: Employee) => {
                switch (field.key) {
                    case 'birthday':
                        return row.birthday ? formatDateAndTime(row[field.key]) : '';
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
            <>
                <DataTable
                    columns={[...columns, actionColumn]}
                    data={filteredData}
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
                        onClose={() => setShowDeleteModal(false)}
                        onDelete={handleDeleteEmployee}
                        entityId={selectedEmployeeToDelete ? selectedEmployeeToDelete.employeeID : ''}
                    />
                )}
            </>
        </div>
    );
};