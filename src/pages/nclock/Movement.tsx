import Split from 'react-split';
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar"
import { useEffect, useState } from "react";
import { Department, Employee, EmployeeAttendanceTimes, Group } from "../../helpers/Types";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { ExportButton } from "../../components/ExportButton";
import { employeeAttendanceTimesFields } from "../../helpers/Fields";
import { fetchWithAuth } from "../../components/FetchWithAuth";
import { toast } from "react-toastify";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { DeleteModal } from "../../modals/DeleteModal";
import DataTable from 'react-data-table-component';
import { customStyles } from '../../components/CustomStylesDataTable';
import { CreateModalAttendance } from '../../modals/CreateModalAttendance';
import { UpdateModalAttendance } from '../../modals/UpdateModalAttendance';
import { TreeViewDataNclock } from '../../components/TreeViewNclock';

// Define a interface para o estado de dados
interface DataState {
    departments: Department[];
    groups: Group[];
    employees: Employee[];
    attendance: EmployeeAttendanceTimes[];
}

// Define a página movimentos
export const Movement = () => {
    const [attendance, setAttendance] = useState<EmployeeAttendanceTimes[]>([]);
    const [filteredAttendances, setFilteredAttendances] = useState<EmployeeAttendanceTimes[]>([]);
    const [selectedAttendances, setSelectedAttendances] = useState<EmployeeAttendanceTimes[]>([]);
    const [showAddAttendanceModal, setShowAddAttendanceModal] = useState(false);
    const [showUpdateAttendanceModal, setShowUpdateAttendanceModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['enrollNumber', 'employeeName', 'inOutMode']);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [resetSelection, setResetSelection] = useState(false);
    const [selectedRows, setSelectedRows] = useState<EmployeeAttendanceTimes[]>([]);
    const [filterText, setFilterText] = useState('');
    const [selectedAttendanceToDelete, setSelectedAttendanceToDelete] = useState<EmployeeAttendanceTimes | null>(null);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeAttendanceTimes | null>(null);
    const [data, setData] = useState<DataState>({
        departments: [],
        groups: [],
        employees: [],
        attendance: [],
    });

    // Função para buscar todos as assiduidades
    const fetchAllAttendances = async () => {
        try {
            const response = await fetchWithAuth('Attendances/GetAllAttendances');
            if (!response.ok) {
                toast.error('Erro ao buscar assiduidades');
                return;
            }
            const attendanceData = await response.json();
            setAttendance(attendanceData);
        } catch (error) {
            console.error('Erro ao buscar assiduidades:', error);
        }
    }

    // Função para adicionar uma nova assiduidade
    const handleAddAttendance = async (attendances: EmployeeAttendanceTimes) => {
        try {
            const response = await fetchWithAuth('Attendances/CreatedAttendanceTime', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(attendances)
            });

            if (!response.ok) {
                toast.error('Erro ao adicionar nova assiduidade');
                return;
            }
            const newAttendance = await response.json();
            setAttendance([...attendance, newAttendance]);
            toast.success('assiduidade adicionada com sucesso');
        } catch (error) {
            console.error('Erro ao adicionar nova assiduidade:', error);
        }
        setShowAddAttendanceModal(false);
        refreshAttendance();
    };

    // Função para atualizar uma assiduidade
    const handleUpdateAttendance = async (attendances: EmployeeAttendanceTimes) => {
        try {
            const response = await fetchWithAuth(`Attendances/UpdatedAttendanceTime`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(attendances)
            });

            if (!response.ok) {
                toast.error('Erro ao atualizar assiduidade');
                return;
            }

            const updatedAttendance = await response.json();
            setAttendance(prevAttendance => prevAttendance.map(att => att.attendanceID === updatedAttendance.attendanceID ? updatedAttendance : att));
            toast.success('assiduidade atualizada com sucesso');
        } catch (error) {
            console.error('Erro ao atualizar assiduidade:', error);
        }
        setShowUpdateAttendanceModal(false);
        refreshAttendance();
    };

    // Função para deletar uma assiduidade
    const handleDeleteAttendance = async () => {

        try {
            const response = await fetchWithAuth(`Attendances/DeleteAttendanceTime`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                toast.error('Erro ao apagar assiduidade');
            }

            toast.success('assiduidade apagada com sucesso');
        } catch (error) {
            console.error('Erro ao apagar assiduidade:', error);
        }
        setShowDeleteModal(false);
        refreshAttendance();
    };

    // Atualiza a lista de funcionários ao carregar a página
    useEffect(() => {
        fetchAllAttendances();
    }, []);

    // Atualiza a seleção ao resetar
    useEffect(() => {
        if (resetSelection) {
            setResetSelection(false);
        }
    }, [resetSelection]);

    useEffect(() => {
        console.log("Dados de assiduidade completos: ", attendance);
    }, [attendance]);

    useEffect(() => {
        console.log("Funcionário selecionado: ", selectedEmployee);
    }, [selectedEmployee]);

    // Atualiza a seleção ao mudar o filtro
    useEffect(() => {
        if (selectedEmployee) {
            const newFilteredAttendances = attendance.filter(att => att.employeeId === selectedEmployee.employeeId);
            setFilteredAttendances(newFilteredAttendances);
        } else {
            setFilteredAttendances([]);
        }
    }, [attendance, selectedEmployee]);

    // Define a seleção de funcionários
    const handleSelectFromTreeView = (selectedEmployeeIds: string[]) => {
        const employeeAttendance = attendance.find(att => att.employeeId === selectedEmployeeIds[0]);
        setSelectedEmployee(employeeAttendance || null);
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
        const allColumnKeys = employeeAttendanceTimesFields.map(field => field.key);
        setSelectedColumns(allColumnKeys);
    };

    // Função para resetar as colunas
    const handleResetColumns = () => {
        setSelectedColumns(['enrollNumber', 'employeeName', 'inOutMode']);
    };

    // Função para atualizar os funcionários
    const refreshAttendance = () => {
        fetchAllAttendances();
    };

    // Função para limpar a seleção
    const clearSelection = () => {
        setResetSelection(true);
        setSelectedAttendances([]);
    };

    // Função para retornar o nome das colunas
    const columnNamesMap = employeeAttendanceTimesFields.reduce<Record<string, string>>((acc, field) => {
        acc[field.key] = field.label;
        return acc;
    }, {});

    // Função para selecionar uma linha
    const tableColumns = selectedColumns
        .map(columnKey => ({
            name: columnNamesMap[columnKey] || columnKey,
            selector: (row: Record<string, any>) => row[columnKey],
            sortable: true,
        }));

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define a função de seleção de linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: EmployeeAttendanceTimes[];
    }) => {
        setSelectedRows(state.selectedRows);
    };

    return (
        <div className="main-container">
            <NavBar />
            <div className="content-container">
                <Split className='split' sizes={[20, 80]} minSize={250} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewDataNclock onSelectEmployees={handleSelectFromTreeView} data={data} />
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
                                <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshAttendance} iconSize='1.1em' />
                                <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddAttendanceModal(true)} iconSize='1.1em' />
                                <CustomOutlineButton icon="bi-eye" onClick={() => setShowColumnSelector(true)} iconSize='1.1em' />
                                <CustomOutlineButton icon="bi-x" onClick={clearSelection} iconSize='1.1em' />
                                <ExportButton allData={attendance} selectedData={filteredAttendances} fields={employeeAttendanceTimesFields.map(field => ({ key: field.key, label: field.label }))} />
                            </div>
                        </div>
                        <DataTable
                            columns={tableColumns}
                            data={filteredAttendances}
                            onRowDoubleClicked={(row) => {
                                setSelectedAttendances([row]);
                                setShowUpdateAttendanceModal(true);
                            }}
                            pagination
                            paginationComponentOptions={paginationOptions}
                            selectableRows
                            onSelectedRowsChange={handleRowSelected}
                            clearSelectedRows={clearSelectionToggle}
                            selectableRowsHighlight
                            noDataComponent="Não há dados disponíveis para exibir."
                            customStyles={customStyles}
                        />

                    </div>
                </Split>
            </div>
            <Footer />
            {showAddAttendanceModal && (
                <CreateModalAttendance
                    open={showAddAttendanceModal}
                    onClose={() => setShowAddAttendanceModal(false)}
                    onSave={handleAddAttendance}
                    title='Adicionar Assiduidade'
                    fields={employeeAttendanceTimesFields}
                    initialValues={{}}
                />
            )}
            {selectedAttendances.length > 0 && showUpdateAttendanceModal && (
                <UpdateModalAttendance
                    open={showUpdateAttendanceModal}
                    onClose={() => setShowUpdateAttendanceModal(false)}
                    onUpdate={handleUpdateAttendance}
                    entity={selectedAttendances[0]}
                    fields={employeeAttendanceTimesFields}
                    title='Atualizar Assiduidade'
                />
            )}
            {selectedAttendanceToDelete && showDeleteModal && (
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteAttendance}
                    entityId={selectedAttendanceToDelete.employeeId}
                />
            )}
            {showColumnSelector && (
                <ColumnSelectorModal
                    columns={employeeAttendanceTimesFields}
                    selectedColumns={selectedColumns}
                    onClose={() => setShowColumnSelector(false)}
                    onColumnToggle={handleColumnToggle}
                    onResetColumns={handleResetColumns}
                    onSelectAllColumns={handleSelectAllColumns}
                />
            )}
        </div>
    );
}