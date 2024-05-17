import Split from 'react-split';
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar"
import { TreeViewData } from "../../components/TreeView";
import { useEffect, useState } from "react";
import { Employee } from "../../helpers/Types";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { ExportButton } from "../../components/ExportButton";
import { employeeFields } from "../../helpers/Fields";
import { fetchWithAuth } from "../../components/FetchWithAuth";
import { toast } from "react-toastify";
import { PersonsDataTable } from "../../components/PersonsDataTable";
import { CreateModalEmployees } from "../../modals/CreateModalEmployees";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { UpdateModalEmployees } from "../../modals/UpdateModalEmployees";
import { DeleteModal } from "../../modals/DeleteModal";

// Define a página movimentos
export const Movement = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
    const [filterText, setFilterText] = useState('');
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [showAllEmployees, setShowAllEmployees] = useState(true);
    const [selectedColumns, setSelectedColumns] = useState(['enrollNumber', 'name', 'shortName']);
    const [resetSelection, setResetSelection] = useState(false);
    const defaultColumns = ['enrollNumber', 'name', 'shortName'];
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState<Employee | null>(null);

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
                setEmployees(prevEmployees => prevEmployees.map(emp => emp.employeeID === updatedEmployee.employeeID ? updatedEmployee : emp));
                toast.success('Funcionário atualizado com sucesso');
            } else {
                await response.text();
                toast.success(response.statusText || 'Atualização realizada com sucesso');
            }

        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
            toast.error('Erro ao conectar ao servidor');
        } finally {
            handleCloseUpdateModal();
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

            setEmployees(prevEmployees => prevEmployees.filter(emp => emp.employeeID !== employeeID));
            toast.success('Funcionário excluído com sucesso');
        } catch (error) {
            console.error('Erro ao excluir funcionário:', error);
            toast.error('Erro ao conectar ao servidor');
        } finally {
            handleCloseDeleteModal();
            refreshEmployees();
        }
    }

    // Atualiza a lista de funcionários ao carregar a página
    useEffect(() => {
        fetchAllEmployees();
    }, []);

    // Atualiza a seleção ao resetar
    useEffect(() => {
        if (resetSelection) {
            setResetSelection(false);
        }
    }, [resetSelection]);

    // Define a seleção da árvore
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        if (selectedIds.length === 0) {
            setFilteredEmployees(employees);
        } else {
            const filtered = employees.filter(employee => selectedIds.includes(employee.employeeID));
            setFilteredEmployees(filtered);
        }
    };

    // Função para alternar a visibilidade das colunas
    const handleColumnToggle = (columnKey: string) => {
        if (selectedColumns.includes(columnKey)) {
            setSelectedColumns(selectedColumns.filter(key => key !== columnKey));
        } else {
            setSelectedColumns([...selectedColumns, columnKey]);
        }
    };

    // Função para selecionar todas as colunas
    const handleSelectAllColumns = () => {
        const allColumnKeys = employeeFields.map(field => field.key);
        setSelectedColumns(allColumnKeys);
    };

    // Função para resetar as colunas
    const handleResetColumns = () => {
        setSelectedColumns(defaultColumns);
    };

    // Função para atualizar os funcionários
    const refreshEmployees = () => {
        setFilteredEmployees(employees);
    };

    // Função para abrir o modal de adicionar
    const openAddModal = () => {
        setShowAddModal(true);
    };

    // Função para fechar o modal de adicionar
    const closeAddModal = () => {
        setShowAddModal(false);
    };

    // Função para abrir o modal de atualizar
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    // Função para abrir o modal de excluir
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    // Função para abrir o modal de seleção de colunas
    const openColumnSelector = () => {
        setShowColumnSelector(true);
    };

    // Função para fechar o modal de seleção de colunas
    const closeColumnSelector = () => {
        setShowColumnSelector(false);
    };

    // Função para limpar a seleção
    const clearSelection = () => {
        setSelectedEmployeeIds([]);
        setFilteredEmployees(employees);
    };

    // Função para filtrar os funcionários
    const handleFilteredEmployees = (filtered: Employee[]) => {
        setFilteredEmployees(filtered);
    };

    return (
        <div className="main-container">
            <NavBar />
            <div className="content-container">
                <Split className='split' sizes={[20, 80]} minSize={250} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewData onSelectEmployees={handleSelectFromTreeView} />
                    </div>
                    <div className="datatable-container">
                        <div className="datatable-title-text">
                            <span>Movimentos</span>
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
                    onClose={closeAddModal}
                    onSave={handleAddEmployee}
                    fields={employeeFields}
                    initialValues={{}}
                />
            )}
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
                    onClose={handleCloseDeleteModal}
                    onDelete={handleDeleteEmployee}
                    entityId={selectedEmployeeToDelete ? selectedEmployeeToDelete.employeeID : ''}
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
}