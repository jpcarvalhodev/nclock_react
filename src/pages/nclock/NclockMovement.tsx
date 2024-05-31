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
import DataTable, { TableColumn } from 'react-data-table-component';
import { customStyles } from '../../components/CustomStylesDataTable';
import { CreateModalAttendance } from '../../modals/CreateModalAttendance';
import { UpdateModalAttendance } from '../../modals/UpdateModalAttendance';
import { TreeViewDataNclock } from '../../components/TreeViewNclock';
import "../../css/PagesStyles.css";
import { Button } from 'react-bootstrap';

// Define a interface para o estado de dados
interface DataState {
    departments: Department[];
    groups: Group[];
    employees: Employee[];
    attendance: EmployeeAttendanceTimes[];
}

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T00:00`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T23:59`;
}

// Define a página movimentos
export const NclockMovement = () => {
    const currentDate = new Date();
    const [attendance, setAttendance] = useState<EmployeeAttendanceTimes[]>([]);
    const [filteredAttendances, setFilteredAttendances] = useState<EmployeeAttendanceTimes[]>([]);
    const [selectedAttendances, setSelectedAttendances] = useState<EmployeeAttendanceTimes[]>([]);
    const [showAddAttendanceModal, setShowAddAttendanceModal] = useState(false);
    const [showUpdateAttendanceModal, setShowUpdateAttendanceModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['employeeId', 'inOutMode', 'attendanceTime']);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [resetSelection, setResetSelection] = useState(false);
    const [selectedRows, setSelectedRows] = useState<EmployeeAttendanceTimes[]>([]);
    const [filterText, setFilterText] = useState('');
    const [selectedAttendanceToDelete, setSelectedAttendanceToDelete] = useState<string | null>(null);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeAttendanceTimes | null>(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(currentDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [data, setData] = useState<DataState>({
        departments: [],
        groups: [],
        employees: [],
        attendance: [],
    });

    // Função para buscar todos as assiduidades
    const fetchAllAttendances = async () => {
        const response = await fetchWithAuth('Attendances/GetAllAttendances');
        if (!response.ok) {
            toast.error('Erro ao buscar assiduidades');
            return;
        }
        const data = await response.json();
        const attendanceData = data.filter((att: EmployeeAttendanceTimes) => att.type !== 3);
        setAttendance(attendanceData);
        filterAttendanceDataForToday(attendanceData);
    };
    if (!attendance.length) {
        fetchAllAttendances();
    }

    // Função para buscar as assiduidades entre datas
    const fetchAllAttendancesBetweenDates = async () => {
        try {
            const response = await fetchWithAuth(`Attendances/GetAttendanceTimesBetweenDates?fromDate=${startDate}&toDate=${endDate}`);
            if (!response.ok) {
                toast.error('Erro ao buscar assiduidades');
                return;
            }
            const data = await response.json();
            const attendanceData = data.filter((att: EmployeeAttendanceTimes) => att.typeDescription !== 3);
            setFilteredAttendances(attendanceData);
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
            const response = await fetchWithAuth(`Attendances/UpdatedAttendanceTime?attendanceTimeId=${attendances.attendanceTimeId}`, {
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

    // Atualiza os dados de renderização
    useEffect(() => {
        fetchAllAttendances();
    } , []);

    // Atualiza a seleção ao resetar
    useEffect(() => {
        if (resetSelection) {
            setResetSelection(false);
        }
    }, [resetSelection]);

    // Função para filtrar as presenças com base no texto de pesquisa
    useEffect(() => {
        const lowercasedFilter = filterText.toLowerCase();
        const filteredData = attendance.filter(att => {
            return att.employeeName.toLowerCase().includes(lowercasedFilter);
        });
        setFilteredAttendances(filteredData);
    }, [filterText, attendance]);

    // Atualiza a seleção ao mudar o filtro
    useEffect(() => {
        if (selectedEmployeeIds.length > 0) {
            const newFilteredAttendances = attendance.filter(att => selectedEmployeeIds.includes(att.employeeId));
            setFilteredAttendances(newFilteredAttendances);
        } else if (attendance.length > 0) {
            setFilteredAttendances(attendance);
        }
    }, [selectedEmployeeId]);

    // Filtragem de dados de assiduidade para hoje
    const filterAttendanceDataForToday = (attendanceData: EmployeeAttendanceTimes[]) => {
        const today = new Date();
        const startOfDay = formatDateToStartOfDay(today);
        const endOfDay = formatDateToEndOfDay(today);

        const filteredData = attendanceData.filter(att => {
            const attDate = new Date(att.attendanceTime);
            return attDate >= new Date(startOfDay) && attDate <= new Date(endOfDay);
        });
        if (filteredAttendances.length !== filteredData.length) {
            setFilteredAttendances(filteredData);
        }
    }

    // Define a seleção de funcionários
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        setSelectedEmployeeIds(selectedIds);
        setSelectedEmployeeId(selectedIds[0]);
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
        setSelectedColumns(['employeeId', 'inOutMode', 'attendanceTime']);
    };

    // Função para atualizar os funcionários
    const refreshAttendance = () => {
        fetchAllAttendances();
    };

    // Função para limpar a seleção
    const clearSelection = () => {
        setResetSelection(true);
        setFilteredAttendances([]);
        setSelectedEmployee(null);
        setSelectedEmployeeId(null);
        setAttendance([]);
    };

    // Função para abrir o modal de adição de assiduidade
    const handleOpenAddAttendanceModal = () => {
        if (selectedEmployeeId) {
            setShowAddAttendanceModal(true);
        } else {
            toast.error('Selecione um funcionário para adicionar uma assiduidade');
        }
    }

    // Função para formatar a data e a hora
    function formatDateAndTime(input: string | Date): string {
        const date = typeof input === 'string' ? new Date(input) : input;
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        };
        return new Intl.DateTimeFormat('pt-PT', options).format(date);
    }

    // Remove o campo de observação
    const filteredColumns = employeeAttendanceTimesFields.filter(field => field.key !== 'observation' && field.key !== 'enrollNumber' && field.key !== 'employeeName');

    // Define as colunas
    const columns: TableColumn<EmployeeAttendanceTimes>[] = employeeAttendanceTimesFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: EmployeeAttendanceTimes) => {
                switch (field.key) {
                    case 'attendanceTime':
                        return formatDateAndTime(row[field.key]);
                    case 'employeeId':
                        return row.employeeName;
                    case 'inOutMode':
                        return row[field.key] === 0 ? 'Entrada'
                            : row[field.key] === 1 ? 'Saída'
                                : row[field.key] === 2 ? 'Pausa - Entrada'
                                    : row[field.key] === 3 ? 'Pausa - Saída'
                                        : row[field.key] === 4 ? 'Hora Extra - Entrada'
                                            : row[field.key] === 5 ? 'Hora Extra - Saída' : '';
                    default:
                        return row[field.key];
                }
            };
            return {
                name: field.label,
                selector: row => formatField(row),
                sortable: true,
            };
        });

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

    // Define a função de abertura do modal de edição
    const handleEditAssiduity = (row: EmployeeAttendanceTimes[]) => {
        setSelectedAttendances(row);
        setShowUpdateAttendanceModal(true);
    };

    // Define a função de abertura do modal de exclusão
    const handleOpenDeleteModal = (employeeId: string) => {
        setSelectedAttendanceToDelete(employeeId);
        setShowDeleteModal(true);
    };

    // Define as colunas de ação
    const actionColumn: TableColumn<EmployeeAttendanceTimes> = {
        name: 'Ações',
        cell: (row: EmployeeAttendanceTimes) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditAssiduity([row])} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.attendanceTimeId)}>
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: EmployeeAttendanceTimes) => row.employeeID,
        ignoreRowClick: true,
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
                                <CustomOutlineButton icon="bi-plus" onClick={handleOpenAddAttendanceModal} iconSize='1.1em' />
                                <CustomOutlineButton icon="bi-eye" onClick={() => setShowColumnSelector(true)} iconSize='1.1em' />
                                <CustomOutlineButton icon="bi-x" onClick={clearSelection} iconSize='1.1em' />
                                <ExportButton allData={attendance} selectedData={filteredAttendances} fields={employeeAttendanceTimesFields.map(field => ({ key: field.key, label: field.label }))} />
                            </div>
                            <div className="date-range-search">
                                <input
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                    className='search-input'
                                />
                                <span> até </span>
                                <input
                                    type="datetime-local"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    className='search-input'
                                />
                                <CustomOutlineButton icon="bi-search" onClick={fetchAllAttendancesBetweenDates} iconSize='1.1em' />
                            </div>
                        </div>
                        <DataTable
                            columns={[...columns, actionColumn]}
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
                    entityType='movimentos'
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
                    entityType='movimentos'
                />
            )}
            {selectedAttendanceToDelete && showDeleteModal && (
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteAttendance}
                    entityId={selectedAttendanceToDelete}
                />
            )}
            {showColumnSelector && (
                <ColumnSelectorModal
                    columns={filteredColumns}
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