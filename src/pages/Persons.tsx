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

    const fetchAllEmployees = async () => {
        try {
            const response = await fetchWithAuth('https://localhost:7129/api/Employees/GetAllEmployees');
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

    const handleAddEmployee = async (employee: Employee) => {
        try {
            const response = await fetchWithAuth('https://localhost:7129/api/Employees/CreateEmployee', {
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
        fetchAllEmployees();
    };

    const handleSelectEmployees = (employeeIds: string[]) => {
        setSelectedEmployeeIds(employeeIds);
    };

    const refreshEmployeeData = () => {
        fetchAllEmployees();
    }

    const clearSelection = () => {
        setSelectedEmployeeIds([]);
        setResetSelection(prev => !prev);
        setShowAllEmployees(true);
    };

    useEffect(() => {
        if (resetSelection) {
            setResetSelection(false);
        }
    }, [resetSelection]);

    const handleColumnToggle = (columnKey: string) => {
        if (selectedColumns.includes(columnKey)) {
            setSelectedColumns(selectedColumns.filter(key => key !== columnKey));
        } else {
            setSelectedColumns([...selectedColumns, columnKey]);
        }
    };

    const handleResetColumns = () => {
        setSelectedColumns(defaultColumns);
    };

    const handleSelectAllColumns = () => {
        const allColumnKeys = employeeFields.map(field => field.key);
        setSelectedColumns(allColumnKeys);
    };

    const handleFilteredEmployees = (filtered: Employee[]) => {
        setFilteredEmployees(filtered);
    };

    const openAddModal = () => setShowAddModal(true);
    const closeAddModal = () => setShowAddModal(false);
    const openColumnSelector = () => setShowColumnSelector(true);
    const closeColumnSelector = () => setShowColumnSelector(false);

    return (
        <div className="main-container">
            <NavBar />
            <div className="content-container">
                <Split className='split' sizes={[20, 80]} minSize={250} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewData onSelectEmployees={handleSelectEmployees} />
                    </div>
                    <div className="datatable-container">
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
                                <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshEmployeeData} iconSize='1.1em' />
                                <CustomOutlineButton icon="bi-plus" onClick={openAddModal} iconSize='1.1em' />
                                <CustomOutlineButton icon="bi-eye" onClick={openColumnSelector} iconSize='1.1em' />
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
                        />
                    </div>

                </Split>
            </div>
            <Footer />
            {showAddModal && (
                <CreateModalEmployees
                    title="Adicionar Pessoa"
                    open={showAddModal}
                    onClose={closeAddModal}
                    onSave={handleAddEmployee}
                    fields={employeeFields}
                    initialValues={{}}
                />
            )}
            {showColumnSelector && (
                <ColumnSelectorModal
                    columns={employeeFields}
                    selectedColumns={selectedColumns}
                    onClose={closeColumnSelector}
                    onColumnToggle={handleColumnToggle}
                    onResetColumns={handleResetColumns}
                    onSelectAllColumns={handleSelectAllColumns}
                />
            )}
        </div>
    );
};