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
import { Employee } from '../helpers/Types';
import { fetchWithAuth } from '../components/FetchWithAuth';
import { toast } from 'react-toastify';
import { ColumnSelectorModal } from '../modals/ColumnSelectorModal';
import { ExportButton } from '../components/ExportButton';
import { set } from 'date-fns';

// Define a página de pessoas
export const Persons = () => {
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState(['enrollNumber', 'name', 'shortName']);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [resetSelection, setResetSelection] = useState(false);
    const [showAllEmployees, setShowAllEmployees] = useState(true);
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
    const [filterText, setFilterText] = useState('');
    const defaultColumns = ['enrollNumber', 'name', 'shortName'];

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
            const data = await response.json();
            setEmployees([...employees, data]);
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
    const handleFilteredEmployees = (filtered: Employee[]) => {
        setFilteredEmployees(filtered);
    };

    return (
        <div className="main-container">
            <NavBar />
            <div className="content-container">
                <Split className='split' sizes={[20, 80]} minSize={250} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewData onSelectEmployees={handleSelectEmployees} />
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
                                <ExportButton allData={employees} selectedData={filteredEmployees} fields={employeeFields.map(field => ({ key: field.key, label: field.label }))} />
                            </div>
                        </div>
                        <PersonsDataTable
                            selectedEmployeeIds={selectedEmployeeIds}
                            selectedColumns={selectedColumns}
                            showAllEmployees={showAllEmployees}
                            filterText={filterText}
                            filteredEmployees={handleFilteredEmployees}
                            resetSelection={resetSelection}
                            employees={employees}
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