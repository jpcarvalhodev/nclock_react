import { useContext, useEffect, useState } from 'react';
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { PersonsDataTable } from "../../components/PersonsDataTable";
import { TreeViewData } from "../../components/TreeView";
import { CustomOutlineButton } from '../../components/CustomOutlineButton';
import Split from 'react-split';
import '../../css/PagesStyles.css';
import { CreateModalEmployees } from '../../modals/CreateModalEmployees';
import { employeeFields } from '../../helpers/Fields';
import { Employee, EmployeeCard } from '../../helpers/Types';
import { ColumnSelectorModal } from '../../modals/ColumnSelectorModal';
import { ExportButton } from '../../components/ExportButton';
import { PersonsContext, PersonsContextType, PersonsProvider } from '../../context/PersonsContext';
import { useColor } from '../../context/ColorContext';
import { PrintButton } from '../../components/PrintButton';
import { toast } from 'react-toastify';

// Define a página de pessoas
export const Persons = () => {
    const {
        employees,
        data,
        setData,
        setEmployees,
        fetchAllEmployees,
        fetchAllCardData,
        handleAddEmployee,
        handleAddEmployeeCard
    } = useContext(PersonsContext) as PersonsContextType;
    const { navbarColor, footerColor } = useColor();
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState(['enrollNumber', 'name', 'shortName']);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [resetSelection, setResetSelection] = useState(false);
    const [showAllEmployees, setShowAllEmployees] = useState(true);
    const [filteredData, setFilteredData] = useState<Employee[]>([]);
    const [filterText, setFilterText] = useState('');
    const defaultColumns = ['enrollNumber', 'name', 'shortName'];
    const [initialData, setInitialData] = useState<Employee | null>(null);

    // Define a função de busca dos funcionários
    const fetchEmployees = () => {
        fetchAllEmployees({
            postFetch: filteredData => {
                setEmployees(filteredData);
            }
        });
    };

    // Função para adicionar um funcionário e um cartão
    const addEmployeeAndCard = async (employee: Partial<Employee>, card: Partial<EmployeeCard>) => {
        await handleAddEmployee(employee as Employee);

        const employees = await fetchAllEmployees();
        setData({ ...data, employees: employees });
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

    // Função para selecionar funcionários
    const handleSelectEmployees = (employeeIds: string[]) => {
        setSelectedEmployeeIds(employeeIds);
        setShowAllEmployees(employeeIds.length === 0);
    };

    // Busca todos os dados
    useEffect(() => {
        fetchEmployees();
    }, []);

    // Função para atualizar a lista de funcionários
    const refreshEmployees = () => {
        fetchEmployees();
        setSelectedEmployeeIds([]);
    }

    // Define a função de duplicar funcionários
    const handleDuplicate = (data: Employee) => {
        setInitialData(data);
        setShowAddModal(true);
    }

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

    return (
        <PersonsProvider>
            <div className="main-container">
                <NavBar style={{ backgroundColor: navbarColor }} />
                <div className="content-container">
                    <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                        <div className="treeview-container">
                            <TreeViewData onSelectEmployees={handleSelectEmployees} entity='all' />
                        </div>
                        <div className="datatable-container">
                            <div className="datatable-title-text">
                                <span style={{ color: '#000000' }}>Pessoas</span>
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
                                    <CustomOutlineButton icon="bi-eye" onClick={() => setShowColumnSelector(true)} iconSize='1.1em' />
                                    <ExportButton allData={filteredData} selectedData={filteredData} fields={employeeFields} />
                                    <PrintButton data={filteredData} fields={employeeFields} />
                                </div>
                            </div>
                            <PersonsDataTable
                                selectedEmployeeIds={selectedEmployeeIds}
                                selectedColumns={selectedColumns}
                                showAllEmployees={showAllEmployees}
                                filterText={filterText}
                                filteredEmployees={setFilteredData}
                                resetSelection={resetSelection}
                                data={data}
                                onRefreshData={setData}
                                filteredData={filteredData}
                                onDuplicate={handleDuplicate}
                            />
                        </div>
                    </Split>
                </div>
                <Footer style={{ backgroundColor: footerColor }} />
                {showAddModal && (
                    <CreateModalEmployees
                        title="Adicionar Pessoa"
                        open={showAddModal}
                        onClose={() => setShowAddModal(false)}
                        onSave={addEmployeeAndCard}
                        fields={employeeFields}
                        initialValues={initialData || {}}
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
        </PersonsProvider>
    );
};