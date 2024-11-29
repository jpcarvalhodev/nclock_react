import { useContext, useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Department, Employee, EmployeeCard, Group } from '../helpers/Types';
import { employeeFields } from '../helpers/Fields';
import { UpdateModalEmployees } from '../modals/UpdateModalEmployees';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { DeleteModal } from '../modals/DeleteModal';
import { ExpandedComponentEmpZoneExtEnt } from './ExpandedComponentEmpZoneExtEnt';
import { CustomOutlineButton } from './CustomOutlineButton';
import { customStyles } from './CustomStylesDataTable';
import { SelectFilter } from './SelectFilter';
import { PersonsContext, PersonsContextType, PersonsProvider } from '../context/PersonsContext';

// Define a interface para o estado de dados
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
    onDuplicate: (employee: Employee) => void;
    onSelectedRowsChange: (selectedRows: Employee[]) => void;
}

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define o componente
export const PersonsDataTable = ({ selectedEmployeeIds, selectedColumns, filterText, filteredEmployees, resetSelection, data, onRefreshData, filteredData, onDuplicate, onSelectedRowsChange }: PersonsDataTableProps) => {
    const {
        fetchAllEmployees,
        handleUpdateEmployee,
        handleDeleteEmployee,
        handleUpdateEmployeeCard,
        handleAddEmployeeCard,
    } = useContext(PersonsContext) as PersonsContextType;
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState<Employee | null>(null);
    const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
    const [resetSelectionInternal, setResetSelectionInternal] = useState(false);
    const [filters, setFilters] = useState<Filters>({});
    const [currentEmployeeIndex, setCurrentEmployeeIndex] = useState(0);

    // Define a função de busca dos funcionários
    const fetchEmployees = () => {
        fetchAllEmployees({
            postFetch: filteredData => {
                onRefreshData({ ...data, employees: filteredData });
            }
        });
    };

    // Função para atualizar um funcionário
    const updateEmployeeAndCard = async (employee: Employee, card: Partial<EmployeeCard>) => {
        await handleUpdateEmployee(employee);
        if (card.cardId) {
            await handleUpdateEmployeeCard(card as EmployeeCard);
        } else {
            await handleAddEmployeeCard(card as EmployeeCard);
        }
        refreshEmployees();
    };

    // Função para deletar um funcionário
    const deleteEmployee = async (employeeId: string) => {
        await handleDeleteEmployee(employeeId);
        refreshEmployees();
    };

    // Busca todos os dados
    useEffect(() => {
        fetchEmployees();
    }, []);

    // Atualiza a lista de funcionários
    const refreshEmployees = () => {
        fetchEmployees();
    }

    // Gerencia a aplicação de filtros e atualizar o estado no componente pai
    useEffect(() => {
        let filteredByIDs = selectedEmployeeIds.length > 0
            ? data.employees.filter(emp => selectedEmployeeIds.includes(emp.employeeID))
            : data.employees;

        let filteredBySearchText = filteredByIDs.filter(emp =>
            Object.values(emp).some(value => String(value).toLowerCase().includes(filterText.toLowerCase()))
        );

        const filteredByColumnFilters = filteredBySearchText.filter(employee =>
            Object.keys(filters).every(key =>
                filters[key] === "" || String(employee[key]).toLowerCase() === filters[key].toLowerCase()
            )
        );

        const sortedFilteredData = filteredByColumnFilters.sort((a, b) => parseInt(a.enrollNumber) - parseInt(b.enrollNumber));

        filteredEmployees(sortedFilteredData);
    }, [selectedEmployeeIds, filterText, filters, data.employees]);

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

    // Atualiza o índice do funcionário selecionado
    useEffect(() => {
        if (selectedEmployee) {
            const sortedEmployees = data.employees.sort((a, b) => Number(a.enrollNumber) - Number(b.enrollNumber));
            const employeeIndex = sortedEmployees.findIndex(emp => emp.employeeID === selectedEmployee.employeeID);
            setCurrentEmployeeIndex(employeeIndex);
        }
    }, [selectedEmployee, data.employees]);

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
        const sortedEmployees = data.employees.sort((a, b) => Number(a.enrollNumber) - Number(b.enrollNumber));
        const employeeIndex = sortedEmployees.findIndex(emp => emp.employeeID === employee.employeeID);
        setCurrentEmployeeIndex(employeeIndex);
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
        const sortedSelectedRows = state.selectedRows.sort((a, b) => parseInt(a.enrollNumber) - parseInt(b.enrollNumber));
        setSelectedRows(sortedSelectedRows);
        onSelectedRowsChange(sortedSelectedRows);
    };

    // Seleciona o funcionário anterior
    const handleNextEmployee = () => {
        const sortedEmployees = data.employees.sort((a, b) => Number(a.enrollNumber) - Number(b.enrollNumber));
        if (currentEmployeeIndex < sortedEmployees.length - 1) {
            setCurrentEmployeeIndex(currentEmployeeIndex + 1);
            setSelectedEmployee(sortedEmployees[currentEmployeeIndex + 1]);
        }
    };

    // Seleciona o funcionário seguinte
    const handlePrevEmployee = () => {
        const sortedEmployees = data.employees.sort((a, b) => Number(a.enrollNumber) - Number(b.enrollNumber));
        if (currentEmployeeIndex > 0) {
            setCurrentEmployeeIndex(currentEmployeeIndex - 1);
            setSelectedEmployee(sortedEmployees[currentEmployeeIndex - 1]);
        }
    };

    // Função que manipula a duplicação e fecha o modal de atualização
    const handleDuplicateAndClose = (employee: Employee) => {
        if (onDuplicate) {
            onDuplicate(employee);
        }
        setShowUpdateModal(false);
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
                    case 'birthday':
                        return new Date(row.birthday).toLocaleString() || '';
                    case 'admissionDate':
                        return new Date(row.admissionDate).toLocaleString() || '';
                    case 'bIissuance':
                        return new Date(row.bIissuance).toLocaleString() || '';
                    case 'biValidity':
                        return new Date(row.biValidity).toLocaleString() || '';
                    case 'exitDate':
                        return new Date(row.exitDate).toLocaleString() || '';
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
                    case 'photo':
                        return row.photo ? 'Imagem disponível' : 'Sem imagem';
                    case 'statusFprint':
                        return row.statusFprint ? 'Activo' : 'Inactivo';
                    case 'statusFace':
                        return row.statusFprint ? 'Activo' : 'Inactivo';
                    case 'statusPalm':
                        return row.statusFprint ? 'Activo' : 'Inactivo';
                    default:
                        return row[field.key] || '';
                }
            };

            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredData} />
                    </>
                ),
                selector: (row: Employee) => {
                    if (field.key === 'enrollNumber') {
                        return parseInt(row.enrollNumber) || 0;
                    }
                    return row[field.key] || '';
                },
                sortable: true,
                cell: (row: Employee) => formatField(row)
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
                    <OverlayTrigger
                        placement="left"
                        overlay={<Tooltip className="custom-tooltip">Duplicar</Tooltip>}
                    >
                        <CustomOutlineButton className='action-button' icon='bi bi-copy' onClick={() => handleDuplicateAndClose(row)} />
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="left"
                        overlay={<Tooltip className="custom-tooltip">Editar</Tooltip>}
                    >
                        <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditEmployee(row)} />
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="left"
                        overlay={<Tooltip className="custom-tooltip">Apagar</Tooltip>}
                    >
                        <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row)} >
                            <i className="bi bi-trash-fill"></i>
                        </Button>
                    </OverlayTrigger>
                </div>
            ) : null
        ),
        selector: (row: Employee) => row.employeeID,
        ignoreRowClick: true,
    };

    return (
        <PersonsProvider>
            <div>
                <>
                    <DataTable
                        columns={[...columns, actionColumn]}
                        data={filteredData}
                        highlightOnHover
                        pagination
                        paginationComponentOptions={paginationOptions}
                        paginationPerPage={15}
                        onRowDoubleClicked={handleRowDoubleClicked}
                        expandableRows
                        expandableRowsComponent={({ data }) => expandableRowComponent(data)}
                        selectableRows
                        onSelectedRowsChange={handleRowSelected}
                        selectableRowsHighlight
                        clearSelectedRows={resetSelectionInternal}
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
                        defaultSortAsc={true}
                        defaultSortFieldId='enrollNumber'
                    />
                    {selectedEmployee && (
                        <UpdateModalEmployees
                            open={showUpdateModal}
                            onClose={handleCloseUpdateModal}
                            onDuplicate={handleDuplicateAndClose}
                            onUpdate={updateEmployeeAndCard}
                            entity={selectedEmployee}
                            fields={employeeFields}
                            title="Atualizar Pessoa"
                            onPrev={handlePrevEmployee}
                            onNext={handleNextEmployee}
                            canMoveNext={currentEmployeeIndex < data.employees.length - 1}
                            canMovePrev={currentEmployeeIndex > 0}
                        />
                    )}
                    {showDeleteModal && (
                        <DeleteModal
                            open={showDeleteModal}
                            onClose={() => setShowDeleteModal(false)}
                            onDelete={deleteEmployee}
                            entityId={selectedEmployeeToDelete ? selectedEmployeeToDelete.employeeID : ''}
                        />
                    )}
                </>
            </div>
        </PersonsProvider>
    );
};