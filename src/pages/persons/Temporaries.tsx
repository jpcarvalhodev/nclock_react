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

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a página de provisórios
export const Temporaries = () => {
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

    // Define a função de busca dos funcionários
    const fetchEmployees = () => {
        fetchAllEmployees({
            filterFunc: data => data.filter(emp => emp.type === 'Provisório'),
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
        setShowAddModal(false);
    };

    // Função para atualizar um funcionário e um cartão
    const updateEmployeeAndCard = async (employee: Employee, card: Partial<EmployeeCard>) => {
        await handleUpdateEmployee(employee);
        if (card.cardId) {
            await handleUpdateEmployeeCard(card as EmployeeCard);
        } else {
            await handleAddEmployeeCard(card as EmployeeCard);
        }
        setShowUpdateModal(false);
        refreshEmployees();
    };

    // Função para deletar um funcionário provisório
    const deleteEmployee = async (employeeId: string) => {
        await handleDeleteEmployee(employeeId);
        setShowDeleteModal(false);
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

    // Define a seleção da árvore
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        setSelectedEmployeeIds(selectedIds);
    };

    // Atualiza a lista de funcionários ao mudar a lista de funcionários
    useEffect(() => {
        setFilteredEmployees(employees);
    }, [employees]);

    // Função para abrir o modal de deletar funcionário provisório
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

    // Função para lidar com a seleção de linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: Employee[];
    }) => {
        setSelectedRows(state.selectedRows);
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

    // Função para editar um funcionário provisório
    const handleEditEmployee = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowUpdateModal(true);
    };

    // Dados da paginação de EN em PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Componente de linha expandida
    const expandableRowComponent = (row: Employee) => (
        <ExpandedComponentEmpZoneExtEnt data={row} fields={employeeFields} />
    );

    // Coluna de ação
    const actionColumn: TableColumn<Employee> = {
        name: 'Ações',
        cell: (row: Employee) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditEmployee(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.employeeID)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
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
                            <TreeViewData onSelectEmployees={handleSelectFromTreeView} entity='temporaries' />
                        </div>
                        <div className="datatable-container">
                            <div className="datatable-title-text">
                                <span style={{ color: '#000000' }}>Provisórios</span>
                            </div>
                            <div className="datatable-header">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Pesquisa"
                                        value={filterText}
                                        onChange={e => setFilterText(e.target.value)}
                                        className='search-input'
                                    />
                                </div>
                                <div className="buttons-container">
                                    <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshEmployees} iconSize='1.1em' />
                                    <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                                    <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} iconSize='1.1em' />
                                    <ExportButton allData={filteredDataTable} selectedData={selectedRows} fields={employeeFields} />
                                    <PrintButton data={filteredDataTable} fields={employeeFields} />
                                </div>
                            </div>
                            <DataTable
                                columns={[...columns, actionColumn]}
                                data={filteredDataTable}
                                onRowDoubleClicked={handleEditEmployee}
                                pagination
                                paginationComponentOptions={paginationOptions}
                                paginationPerPage={15}
                                expandableRows
                                expandableRowsComponent={({ data }) => expandableRowComponent(data)}
                                selectableRows
                                onSelectedRowsChange={handleRowSelected}
                                clearSelectedRows={clearSelectionToggle}
                                selectableRowsHighlight
                                noDataComponent="Não existem dados disponíveis para exibir."
                                customStyles={customStyles}
                                defaultSortAsc={true}
                                defaultSortFieldId='enrollNumber'
                            />
                        </div>
                    </Split>
                </div>
                <Footer style={{ backgroundColor: footerColor }} />
                <CreateModalEmployees
                    title="Adicionar Provisório"
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
                        title="Atualizar Provisório"
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