import { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DataTable, { TableColumn } from 'react-data-table-component';

import { usePersons } from '../context/PersonsContext';
import { employeeFields } from '../fields/Fields';
import { Department, Employee, Group } from '../types/Types';
import { DeleteModal } from '../modals/DeleteModal';
import { UpdateModalEmployees } from '../modals/UpdateModalEmployees';

import { CustomOutlineButton } from './CustomOutlineButton';
import { customStyles } from './CustomStylesDataTable';
import { ExpandedComponentEmpZoneExtEnt } from './ExpandedComponentEmpZoneExtEnt';
import { SelectFilter } from './SelectFilter';


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
    clearSelectedRows: boolean;
}

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define o componente
export const PersonsDataTable = ({ selectedEmployeeIds, selectedColumns, filterText, filteredEmployees, data, onRefreshData, filteredData, onDuplicate, onSelectedRowsChange }: PersonsDataTableProps) => {
    const {
        fetchAllDisabledEmployees,
        handleUpdateEmployee,
        handleDeleteEmployee,
    } = usePersons();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState<Employee | null>(null);
    const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
    const [filters, setFilters] = useState<Filters>({});
    const [currentEmployeeIndex, setCurrentEmployeeIndex] = useState(0);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);

    // Define a função de busca dos funcionários
    const fetchEmployees = () => {
        fetchAllDisabledEmployees({
            postFetch: filteredData => {
                onRefreshData({ ...data, employees: filteredData });
            }
        });
    };

    // Função para atualizar um funcionário
    const updateEmployeeAndCard = async (employee: Employee) => {
        await handleUpdateEmployee(employee);
        fetchEmployees();
        setClearSelectionToggle((prev) => !prev);
    };

    // Função para deletar um funcionário
    const deleteEmployee = async (employeeId: string) => {
        await handleDeleteEmployee([employeeId]);
        fetchEmployees();
        setClearSelectionToggle((prev) => !prev);
    };

    // Busca todos os dados
    useEffect(() => {
        fetchEmployees();
    }, []);

    // Gerencia a aplicação de filtros e atualizar o estado no componente pai
    useEffect(() => {
        let filteredByIDs = selectedEmployeeIds.length > 0
            ? data.employees.filter(emp => selectedEmployeeIds.includes(emp.employeeID))
            : data.employees;

        let filteredBySearchText = filteredByIDs.filter(emp =>
            Object.entries(emp).some(([key, value]) =>
                selectedColumns.includes(key) &&
                value != null &&
                String(value).toLowerCase().includes(filterText.toLowerCase())
            )
        );

        const filteredByColumnFilters = filteredBySearchText.filter(employee =>
            Object.keys(filters).every(key =>
                filters[key] === "" || String(employee[key]).toLowerCase() === filters[key].toLowerCase()
            )
        );

        const sortedFilteredData = filteredByColumnFilters.sort((a, b) => parseInt(a.enrollNumber) - parseInt(b.enrollNumber));

        filteredEmployees(sortedFilteredData);
    }, [selectedEmployeeIds, filterText, filters, data.employees, selectedColumns]);

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
                    case 'accPlanoAcessoId':
                        return row.accPlanoAcessoName || '';
                    case 'photo':
                        return row.photo ? 'Imagem disponível' : 'Sem imagem';
                    case 'statusFprint':
                        return row.statusFprint ? 'Activo' : 'Inactivo';
                    case 'statusFace':
                        return row.statusFprint ? 'Activo' : 'Inactivo';
                    case 'statusPalm':
                        return row.statusFprint ? 'Activo' : 'Inactivo';
                    case 'cardNumber':
                        return row.employeeCards?.[0]?.cardNumber || '';
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
                        placement="top"
                        overlay={<Tooltip className="custom-tooltip">Duplicar</Tooltip>}
                    >
                        <CustomOutlineButton className='action-button' icon='bi bi-copy' iconSize='0.8em' onClick={() => handleDuplicateAndClose(row)} />
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip className="custom-tooltip">Editar</Tooltip>}
                    >
                        <CustomOutlineButton className="action-button" icon='bi bi-pencil-fill' iconSize='0.8em' onClick={() => handleEditEmployee(row)} />
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip className="custom-tooltip">Apagar</Tooltip>}
                    >
                        <CustomOutlineButton className="action-button" icon='bi bi-trash-fill' iconSize='0.8em' onClick={() => handleOpenDeleteModal(row)} />
                    </OverlayTrigger>
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
                    paginationPerPage={20}
                    paginationRowsPerPageOptions={[20, 50, 100]}
                    onRowDoubleClicked={handleRowDoubleClicked}
                    expandableRows
                    expandableRowsComponent={({ data }) => expandableRowComponent(data)}
                    selectableRows
                    onSelectedRowsChange={handleRowSelected}
                    selectableRowsHighlight
                    clearSelectedRows={clearSelectionToggle}
                    noDataComponent="Não existem dados disponíveis para exibir."
                    customStyles={customStyles}
                    striped
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
    );
};