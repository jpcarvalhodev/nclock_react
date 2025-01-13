import { useEffect, useState } from 'react';

import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";

import '../../css/PagesStyles.css';
import DataTable, { TableColumn } from 'react-data-table-component';

import { PrintButton } from '../../components/PrintButton';
import { SelectFilter } from '../../components/SelectFilter';
import { TreeViewData } from '../../components/TreeView';
import { useNavbar } from "../../context/NavbarContext";
import { employeeFields } from '../../helpers/Fields';
import { Employee } from '../../helpers/Types';
import { ColumnSelectorModal } from '../../modals/ColumnSelectorModal';
import { CreateModalEmployees } from '../../modals/CreateModalEmployees';
import { DeleteModal } from '../../modals/DeleteModal';
import { UpdateModalEmployees } from '../../modals/UpdateModalEmployees';
import { CustomOutlineButton } from '../../components/CustomOutlineButton';
import { ExportButton } from '../../components/ExportButton';

import Split from 'react-split';

import { ExpandedComponentEmpZoneExtEnt } from '../../components/ExpandedComponentEmpZoneExtEnt';
import { customStyles } from '../../components/CustomStylesDataTable';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TextField, TextFieldProps } from '@mui/material';
import { usePersons } from '../../context/PersonsContext';

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a interface para as propriedades do componente CustomSearchBox
function CustomSearchBox(props: TextFieldProps) {
    return (
        <TextField
            {...props}
            className="SearchBox"
        />
    );
}

// Define a página de visitantes
export const Visitors = () => {
    const {
        disabledEmployees,
        data,
        setDisabledEmployees,
        fetchAllDisabledEmployees,
        handleAddEmployee,
        handleUpdateEmployee,
        handleDeleteEmployee,
    } = usePersons();
    const { navbarColor, footerColor } = useNavbar();
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['enrollNumber', 'name', 'shortName']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState<any | null>(null);
    const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [initialData, setInitialData] = useState<Employee | null>(null);
    const [filters, setFilters] = useState<Filters>({});
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
    const [currentEmployeeIndex, setCurrentEmployeeIndex] = useState(0);

    // Define a função de busca dos funcionários
    const fetchEmployees = () => {
        fetchAllDisabledEmployees({
            filterFunc: data => data.filter(emp => emp.type === 'Visitante'),
            postFetch: filteredData => {
                setDisabledEmployees(filteredData);
                setFilteredEmployees(filteredData);
            }
        });
    };

    // Função para adicionar um funcionário e um cartão
    const addEmployeeAndCard = async (employee: Partial<Employee>) => {
        await handleAddEmployee(employee as Employee);
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Função para atualizar um funcionário e um cartão
    const updateEmployeeAndCard = async (employee: Employee) => {
        await handleUpdateEmployee(employee);
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Função para deletar funcionários sequencialmente
    const deleteSelectedEmployees = async (employeeIds: string[]) => {
        await handleDeleteEmployee(employeeIds);
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Busca os funcionários
    useEffect(() => {
        fetchEmployees();
    }, []);

    // Atualiza os funcionários
    const refreshEmployees = () => {
        fetchEmployees();
        setSelectedEmployeeIds([]);
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Função para filtrar as presenças com base no texto de pesquisa
    useEffect(() => {
        const lowercasedFilter = filterText.toLowerCase();
        const filteredData = disabledEmployees.filter(emp => {
            return emp.name ? emp.name.toLowerCase().includes(lowercasedFilter) : false;
        });
        setFilteredEmployees(filteredData);
    }, [filterText, disabledEmployees]);

    // Atualiza os funcionários filtrados com base nos funcionários selecionados
    useEffect(() => {
        if (selectedEmployeeIds.length > 0) {
            const filtered = disabledEmployees.filter(employee => selectedEmployeeIds.includes(employee.employeeID));
            setFilteredEmployees(filtered);
        } else {
            setFilteredEmployees(disabledEmployees);
        }
    }, [selectedEmployeeIds, disabledEmployees]);

    // Atualiza o índice do funcionário selecionado
    useEffect(() => {
        if (selectedEmployee) {
            const sortedEmployees = filteredEmployees.sort((a, b) => Number(a.enrollNumber) - Number(b.enrollNumber));
            const employeeIndex = sortedEmployees.findIndex(emp => emp.employeeID === selectedEmployee.employeeID);
            setCurrentEmployeeIndex(employeeIndex);
        }
    }, [selectedEmployee, data.employees]);

    // Define a seleção da árvore
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        setSelectedEmployeeIds(selectedIds);
    };

    // Atualiza a lista de visitantes filtrados ao mudar a lista de visitantes
    useEffect(() => {
        setFilteredEmployees(disabledEmployees);
    }, [disabledEmployees]);

    // Função para abrir o modal de deletar visitante
    const handleOpenDeleteModal = (employeeID: string) => {
        setSelectedEmployeeToDelete(employeeID);
        setShowDeleteModal(true);
    };

    // Função para selecionar as colunas a serem exibidas
    const toggleColumn = (columnName: string) => {
        if (selectedColumns.includes(columnName)) {
            setSelectedColumns(selectedColumns.filter(col => col !== columnName));
        } else {
            setSelectedColumns([...selectedColumns, columnName]);
        }
    };

    // Função para resetar as colunas exibidas
    const resetColumns = () => {
        setSelectedColumns(['enrollNumber', 'name', 'shortName']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Função para lidar com a seleção de linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: Employee[];
    }) => {
        const sortedSelectedRows = state.selectedRows.sort((a, b) => parseInt(a.enrollNumber) - parseInt(b.enrollNumber));
        setSelectedRows(sortedSelectedRows);
    };

    // Função para deletar vários funcionários
    const handleSelectedEmployeesToDelete = () => {
        const employeeIds = Array.from(new Set(selectedRows.map(employee => employee.employeeID)));
        setSelectedEmployeeToDelete(employeeIds);
        setShowDeleteModal(true);
    };

    // Configurando a função onDelete para iniciar o processo de exclusão
    const startDeletionProcess = () => {
        let employeeIds;

        if (Array.isArray(selectedEmployeeToDelete)) {
            employeeIds = selectedEmployeeToDelete;
        } else if (selectedEmployeeToDelete) {
            employeeIds = [selectedEmployeeToDelete];
        } else {
            employeeIds = Array.from(new Set(selectedRows.map(emp => emp.employeeID)));
        }

        setShowDeleteModal(false);
        deleteSelectedEmployees(employeeIds);
    };

    // Define a função de duplicar funcionários
    const handleDuplicate = (data: Employee) => {
        setInitialData(data);
        setShowAddModal(true);
        setShowUpdateModal(false);
        setSelectedEmployee(null);
    };

    // Filtra os dados da tabela
    const filteredDataTable = filteredEmployees.filter(employee =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (employee[key] != null && String(employee[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(employee).some(([key, value]) => {
            if (selectedColumns.includes(key) && value != null) {
                if (value instanceof Date) {
                    return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
                } else {
                    return value.toString().toLowerCase().includes(filterText.toLowerCase());
                }
            }
            return false;
        })
    )

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
                    case 'cardNumber':
                        return row.employeeCards?.[0]?.cardNumber || '';
                    case 'entidadeId':
                        return row.entidadeName || '';
                    default:
                        return row[field.key] || '';
                }
            };

            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredDataTable} />
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

    // Seleciona o funcionário anterior
    const handleNextEmployee = () => {
        const sortedEmployees = filteredEmployees.sort((a, b) => Number(a.enrollNumber) - Number(b.enrollNumber));
        if (currentEmployeeIndex < sortedEmployees.length - 1) {
            setCurrentEmployeeIndex(currentEmployeeIndex + 1);
            setSelectedEmployee(sortedEmployees[currentEmployeeIndex + 1]);
        }
    };

    // Seleciona o funcionário seguinte
    const handlePrevEmployee = () => {
        const sortedEmployees = filteredEmployees.sort((a, b) => Number(a.enrollNumber) - Number(b.enrollNumber));
        if (currentEmployeeIndex > 0) {
            setCurrentEmployeeIndex(currentEmployeeIndex - 1);
            setSelectedEmployee(sortedEmployees[currentEmployeeIndex - 1]);
        }
    };

    // Função para editar um visitante
    const handleEditEmployee = (employee: Employee) => {
        setSelectedEmployee(employee);
        const sortedEmployees = filteredEmployees.sort((a, b) => Number(a.enrollNumber) - Number(b.enrollNumber));
        const employeeIndex = sortedEmployees.findIndex(emp => emp.employeeID === employee.employeeID);
        setCurrentEmployeeIndex(employeeIndex);
        setShowUpdateModal(true);
    };

    // Função de paginação de EN em PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Componente expandido da tabela
    const expandableRowComponent = (row: Employee) => (
        <ExpandedComponentEmpZoneExtEnt data={row} fields={employeeFields} />
    );

    // Coluna de ações
    const actionColumn: TableColumn<Employee> = {
        name: 'Ações',
        cell: (row: Employee) => (
            <div style={{ display: 'flex' }}>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Duplicar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-copy' onClick={() => handleDuplicate(row)} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Editar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-pencil-fill' onClick={() => handleEditEmployee(row)} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Apagar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-trash-fill' onClick={() => handleOpenDeleteModal(row.employeeID)} />
                </OverlayTrigger>
            </div>
        ),
        selector: (row: Employee) => row.employeeID,
        ignoreRowClick: true,
    };

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return employeeFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="content-container">
                <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewData onSelectEmployees={handleSelectFromTreeView} />
                    </div>
                    <div className="datatable-container">
                        <div className="datatable-title-text">
                            <span style={{ color: '#000000' }}>Visitantes</span>
                        </div>
                        <div className="datatable-header">
                            <div>
                                <CustomSearchBox
                                    label="Pesquisa"
                                    variant="outlined"
                                    size='small'
                                    value={filterText}
                                    onChange={e => setFilterText(e.target.value)}
                                    style={{ marginTop: -5 }}
                                />
                            </div>
                            <div className="buttons-container">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshEmployees} iconSize='1.1em' />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Adicionar</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Colunas</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} iconSize='1.1em' />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Apagar Selecionados</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-trash-fill" onClick={handleSelectedEmployeesToDelete} iconSize='1.1em' />
                                </OverlayTrigger>
                                <ExportButton allData={filteredDataTable} selectedData={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={getSelectedFields()} />
                                <PrintButton data={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={getSelectedFields()} />
                            </div>
                        </div>
                        <DataTable
                            columns={[...columns, actionColumn]}
                            data={filteredDataTable}
                            onRowDoubleClicked={handleEditEmployee}
                            pagination
                            paginationComponentOptions={paginationOptions}
                            paginationPerPage={20}
                            expandableRows
                            expandableRowsComponent={({ data }) => expandableRowComponent(data)}
                            selectableRows
                            onSelectedRowsChange={handleRowSelected}
                            clearSelectedRows={clearSelectionToggle}
                            selectableRowsHighlight
                            noDataComponent="Não existem dados disponíveis para exibir."
                            customStyles={customStyles}
                            striped
                            defaultSortAsc={true}
                            defaultSortFieldId="enrollNumber"
                        />
                    </div>
                </Split>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            <CreateModalEmployees
                title="Adicionar Visitante"
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={addEmployeeAndCard}
                fields={employeeFields}
                initialValues={initialData || {}}
            />
            {selectedEmployee && (
                <UpdateModalEmployees
                    open={showUpdateModal}
                    onClose={() => setShowUpdateModal(false)}
                    onDuplicate={handleDuplicate}
                    onUpdate={updateEmployeeAndCard}
                    entity={selectedEmployee}
                    fields={employeeFields}
                    title="Atualizar Visitante"
                    canMoveNext={currentEmployeeIndex < data.employees.length - 1}
                    canMovePrev={currentEmployeeIndex > 0}
                    onNext={handleNextEmployee}
                    onPrev={handlePrevEmployee}
                />
            )}
            <DeleteModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={startDeletionProcess}
                entityId={selectedEmployeeToDelete}
            />
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
        </div>
    );
}