import { useState, useEffect, useContext } from 'react';
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import '../../css/PagesStyles.css';
import Button from 'react-bootstrap/Button';
import DataTable, { TableColumn } from 'react-data-table-component';
import { ColumnSelectorModal } from '../../modals/ColumnSelectorModal';
import { Employee, EmployeeCard } from '../../helpers/Types';
import { CreateModalEmployees } from '../../modals/CreateModalEmployees';
import { UpdateModalEmployees } from '../../modals/UpdateModalEmployees';
import { DeleteModal } from '../../modals/DeleteModal';
import { CustomOutlineButton } from '../../components/CustomOutlineButton';
import { employeeFields } from '../../helpers/Fields';
import { ExportButton } from '../../components/ExportButton';
import Split from 'react-split';
import { TreeViewData } from '../../components/TreeView';
import { ExpandedComponentEmpZoneExtEnt } from '../../components/ExpandedComponentEmpZoneExtEnt';
import { customStyles } from '../../components/CustomStylesDataTable';
import { SelectFilter } from '../../components/SelectFilter';
import { PersonsContext, PersonsContextType, PersonsProvider } from '../../context/PersonsContext';
import { useColor } from '../../context/ColorContext';
import { PrintButton } from '../../components/PrintButton';
import { toast } from 'react-toastify';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TextFieldProps, TextField } from '@mui/material';

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
            InputLabelProps={{
                className: "SearchBox-label"
            }}
            InputProps={{
                className: "SearchBox-input",
                ...props.InputProps,
            }}
        />
    );
}

// Define a página de utentes
export const User = () => {
    const {
        employees,
        data,
        setData,
        setEmployees,
        fetchAllEmployees,
        fetchAllCardData,
        handleAddEmployee,
        handleUpdateEmployee,
        handleDeleteEmployee,
        handleAddEmployeeCard,
        handleUpdateEmployeeCard,
    } = useContext(PersonsContext) as PersonsContextType;
    const { navbarColor, footerColor } = useColor();
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['enrollNumber', 'name', 'shortName']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState<string | null>(null);
    const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [initialData, setInitialData] = useState<Employee | null>(null);
    const [filters, setFilters] = useState<Filters>({});
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
    const [currentEmployeeIndex, setCurrentEmployeeIndex] = useState(0);

    // Define a função de busca dos funcionários
    const fetchEmployees = () => {
        fetchAllEmployees({
            filterFunc: data => data.filter(emp => emp.type === 'Utente'),
            postFetch: filteredData => {
                setEmployees(filteredData);
                setFilteredEmployees(filteredData);
            }
        });
    };

    // Função para adicionar um funcionário e um cartão
    const addEmployeeAndCard = async (employee: Partial<Employee>, card: Partial<EmployeeCard>) => {
        await handleAddEmployee(employee as Employee);
        const employees = await fetchAllEmployees();
        const employeeCards = await fetchAllCardData();
        const lastEmployee = employees.sort((a, b) => Number(b.enrollNumber) - Number(a.enrollNumber))[0];

        const cardExists = employeeCards.some((employeeCard: EmployeeCard) => employeeCard.employeeID === lastEmployee.employeeID);
        const cardDataProvided = card && Object.keys(card).length > 0;

        if (!cardExists && !cardDataProvided) {
            toast.warn('Cartão não adicionado porque os dados não foram fornecidos');
        } else {
            const newEmployeeCard = {
                ...card,
                employeeID: lastEmployee.employeeID
            };
            await handleAddEmployeeCard(newEmployeeCard as EmployeeCard);
            setData({ ...data, employees: employees });
        }
        refreshEmployees();
    };

    // Função para atualizar um funcionário e um cartão
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
    }

    // Busca todos os dados
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
        const filteredData = employees.filter(emp => {
            return emp.name ? emp.name.toLowerCase().includes(lowercasedFilter) : false;
        });
        setFilteredEmployees(filteredData);
    }, [filterText, employees]);

    // Atualiza os funcionários filtrados com base nos funcionários selecionados
    useEffect(() => {
        if (selectedEmployeeIds.length > 0) {
            const filtered = employees.filter(employee => selectedEmployeeIds.includes(employee.employeeID));
            setFilteredEmployees(filtered);
        } else {
            setFilteredEmployees(employees);
        }
    }, [selectedEmployeeIds, employees]);

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

    // Atualiza a lista de utentes ao mudar a lista de utentes
    useEffect(() => {
        setFilteredEmployees(employees);
    }, [employees]);

    // Abre o modal de deletar utente
    const handleOpenDeleteModal = (employeeID: string) => {
        setSelectedEmployeeToDelete(employeeID);
        setShowDeleteModal(true);
    };

    // Função para selecionar as colunas
    const toggleColumn = (columnName: string) => {
        if (selectedColumns.includes(columnName)) {
            setSelectedColumns(selectedColumns.filter(col => col !== columnName));
        } else {
            setSelectedColumns([...selectedColumns, columnName]);
        }
    };

    // Função para resetar as colunas
    const resetColumns = () => {
        setSelectedColumns(['enrollNumber', 'name', 'shortName']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Função para selecionar as linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: Employee[];
    }) => {
        const sortedSelectedRows = state.selectedRows.sort((a, b) => parseInt(a.enrollNumber) - parseInt(b.enrollNumber));
        setSelectedRows(sortedSelectedRows);
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
            filters[key] === "" || String(employee[key]) === String(filters[key])
        )
    );

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

    // Função para editar um utente
    const handleEditEmployee = (employee: Employee) => {
        setSelectedEmployee(employee);
        const sortedEmployees = filteredEmployees.sort((a, b) => Number(a.enrollNumber) - Number(b.enrollNumber));
        const employeeIndex = sortedEmployees.findIndex(emp => emp.employeeID === employee.employeeID);
        setCurrentEmployeeIndex(employeeIndex);
        setShowUpdateModal(true);
    };

    // Opções de paginação de EN em PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Componente de linha expandida
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
                    <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.employeeID)} >
                        <i className="bi bi-trash-fill"></i>
                    </Button>
                </OverlayTrigger>
            </div>
        ),
        selector: (row: Employee) => row.employeeID,
        ignoreRowClick: true,
    };

    return (
        <PersonsProvider>
            <div className="main-container">
                <NavBar style={{ backgroundColor: navbarColor }} />
                <div className="content-container">
                    <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                        <div className="treeview-container">
                            <TreeViewData onSelectEmployees={handleSelectFromTreeView} entity='users' />
                        </div>
                        <div className="datatable-container">
                            <div className="datatable-title-text">
                                <span style={{ color: '#000000' }}>Utentes</span>
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
                                    <ExportButton allData={filteredDataTable} selectedData={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={employeeFields} />
                                    <PrintButton data={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={employeeFields} />
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
                    title="Adicionar Utente"
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
                        title="Atualizar Utente"
                        canMoveNext={currentEmployeeIndex < data.employees.length - 1}
                        canMovePrev={currentEmployeeIndex > 0}
                        onNext={handleNextEmployee}
                        onPrev={handlePrevEmployee}
                    />
                )}
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={deleteEmployee}
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
        </PersonsProvider>
    );
}