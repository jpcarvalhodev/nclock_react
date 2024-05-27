import { useEffect, useState } from 'react';
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { PersonsDataTable } from "../components/PersonsDataTable";
import { TreeViewData } from "../components/TreeView";
import { CustomOutlineButton } from '../components/CustomOutlineButton';
import Split from 'react-split';
import '../css/PagesStyles.css';
import { CreateModalEmployees } from '../modals/CreateModalEmployees';
import { employeeFields } from '../helpers/Fields';
import { Department, Employee, Group } from '../helpers/Types';
import { fetchWithAuth } from '../components/FetchWithAuth';
import { toast } from 'react-toastify';
import { ColumnSelectorModal } from '../modals/ColumnSelectorModal';
import { ExportButton } from '../components/ExportButton';

// Define a interface para o estado de dados
interface DataState {
    departments: Department[];
    groups: Group[];
    employees: Employee[];
}

// Define a página de pessoas
export const Persons = () => {
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState(['enrollNumber', 'name', 'shortName']);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [resetSelection, setResetSelection] = useState(false);
    const [showAllEmployees, setShowAllEmployees] = useState(true);
    const [filteredData, setFilteredData] = useState<Employee[]>([]);
    const [filterText, setFilterText] = useState('');
    const defaultColumns = ['enrollNumber', 'name', 'shortName'];
    const [data, setData] = useState<DataState>({
        departments: [],
        groups: [],
        employees: []
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const deptResponse = await fetchWithAuth('Departaments/Employees');
                const groupResponse = await fetchWithAuth('Groups/Employees');
                const employeesResponse = await fetchWithAuth('Employees/GetAllEmployees');

                if (!deptResponse.ok || !groupResponse.ok || !employeesResponse.ok) {
                    toast.error('Falha ao buscar dados');
                    return;
                }

                const [departments, groups, allEmployees] = await Promise.all([
                    deptResponse.json(),
                    groupResponse.json(),
                    employeesResponse.json(),
                ]);

                setData({
                    departments,
                    groups,
                    employees: allEmployees
                });
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                toast.error('Falha ao buscar dados');
            }
        }
        fetchData();
    }, []);

    // Função para buscar todos os funcionários
    const fetchAllEmployees = async () => {
        try {
            const response = await fetchWithAuth('Employees/GetAllEmployees');
            if (!response.ok) {
                toast.error('Erro ao buscar funcionários');
                return;
            }
            const employeesData = await response.json();
            setEmployees(employeesData);
            setData(prevData => ({
                ...prevData,
                employees: employeesData
            }));
        } catch (error) {
            console.error('Erro ao buscar funcionários:', error);
        }
    }

    // Atualiza a lista de funcionários ao carregar a página
    useEffect(() => {
        fetchAllEmployees();
    }, []);

    // Função para adicionar um novo funcionário
    const handleAddEmployee = async (employee: Employee) => {
        try {
            const response = await fetchWithAuth('Employees/CreateEmployee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee)
            });

            if (!response.ok) {
                toast.error('Erro ao adicionar novo funcionário');
                return;
            }
            const employeesData = await response.json();
            setEmployees([...employees, employeesData]);
            setData(prevData => ({
                ...prevData,
                employees: [...prevData.employees, employeesData]
              }));
            toast.success('Funcionário adicionado com sucesso');
        } catch (error) {
            console.error('Erro ao adicionar novo funcionário:', error);
        }
        setShowAddModal(false);
        refreshEmployees();
    };

    // Função para selecionar funcionários
    const handleSelectEmployees = (employeeIds: string[]) => {
        setSelectedEmployeeIds(employeeIds);
        setShowAllEmployees(employeeIds.length === 0);
    };

    // Função para atualizar a lista de funcionários
    const refreshEmployees = () => {
        fetchAllEmployees();
    }

    // Função para limpar a seleção
    const clearSelection = () => {
        setSelectedEmployeeIds([]);
        setResetSelection(prev => !prev);
        setShowAllEmployees(true);
    };

    // Atualiza a seleção ao resetar
    useEffect(() => {
        if (resetSelection) {
            setResetSelection(false);
        }
    }, [resetSelection]);

    // Função para alternar a visibilidade das colunas
    const handleColumnToggle = (columnKey: string) => {
        if (selectedColumns.includes(columnKey)) {
            setSelectedColumns(selectedColumns.filter(key => key !== columnKey));
        } else {
            setSelectedColumns([...selectedColumns, columnKey]);
        }
    };

    // Função para resetar as colunas
    const handleResetColumns = () => {
        setSelectedColumns(defaultColumns);
    };

    // Função para selecionar todas as colunas
    const handleSelectAllColumns = () => {
        const allColumnKeys = employeeFields.map(field => field.key);
        setSelectedColumns(allColumnKeys);
    };

    // Função para filtrar funcionários
    const handleFilteredEmployees = (employees: Employee[]) => {
        setFilteredData(employees);
    };

    return (
        <div className="main-container">
            <NavBar />
            <div className="content-container">
                <Split className='split' sizes={[20, 80]} minSize={250} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewData onSelectEmployees={handleSelectEmployees} data={data} />
                    </div>
                    <div className="datatable-container">
                        <div className="datatable-title-text">
                            <span>Pessoas</span>
                        </div>
                        <div className="datatable-header">
                            <div className="search-box">
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
                                <CustomOutlineButton icon="bi-eye" onClick={() => setShowColumnSelector(true)} iconSize='1.1em' />
                                <CustomOutlineButton icon="bi-x" onClick={clearSelection} iconSize='1.1em' />
                                <ExportButton allData={employees} selectedData={filteredData} fields={employeeFields.map(field => ({ key: field.key, label: field.label }))} />
                            </div>
                        </div>
                        <PersonsDataTable
                            selectedEmployeeIds={selectedEmployeeIds}
                            selectedColumns={selectedColumns}
                            showAllEmployees={showAllEmployees}
                            filterText={filterText}
                            filteredEmployees={handleFilteredEmployees}
                            resetSelection={resetSelection}
                            data={data}
                            onRefreshData={setData}
                            filteredData={filteredData}
                        />
                    </div>
                </Split>
            </div>
            <Footer />
            {showAddModal && (
                <CreateModalEmployees
                    title="Adicionar Pessoa"
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddEmployee}
                    fields={employeeFields}
                    initialValues={{}}
                />
            )}
            {showColumnSelector && (
                <ColumnSelectorModal
                    columns={employeeFields}
                    selectedColumns={selectedColumns}
                    onClose={() => setShowColumnSelector(false)}
                    onColumnToggle={handleColumnToggle}
                    onResetColumns={handleResetColumns}
                    onSelectAllColumns={handleSelectAllColumns}
                />
            )}
        </div>
    );
};