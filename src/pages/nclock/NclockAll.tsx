import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../../components/CustomStylesDataTable";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import "../../css/PagesStyles.css";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { ExportButton } from "../../components/ExportButton";
import { fetchWithAuth } from "../../components/FetchWithAuth";
import { useEffect, useState } from "react";
import { Department, Employee, EmployeeAttendanceTimes, Group } from "../../helpers/Types";
import { employeeAttendanceTimesFields } from "../../helpers/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import Split from 'react-split';
import { TreeViewDataNclock } from "../../components/TreeViewNclock";
import { SelectFilter } from "../../components/SelectFilter";

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

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a página de todas as assiduidades
export const NclockAll = () => {
    const currentDate = new Date();
    const [attendance, setAttendance] = useState<EmployeeAttendanceTimes[]>([]);
    const [filterText, setFilterText] = useState('');
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['employeeName', 'inOutMode', 'attendanceTime', 'observation']);
    const [selectedRows, setSelectedRows] = useState<EmployeeAttendanceTimes[]>([]);
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
    const [filteredAttendances, setFilteredAttendances] = useState<EmployeeAttendanceTimes[]>([]);
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(currentDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [filters, setFilters] = useState<Filters>({});
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
                return;
            }
            const attendanceData = await response.json();
            setAttendance(attendanceData);
        } catch (error) {
            console.error('Erro ao buscar assiduidades:', error);
        }
    };

    // Função para buscar as assiduidades entre datas
    const fetchAllAttendancesBetweenDates = async () => {
        try {
            const response = await fetchWithAuth(`Attendances/GetAttendanceTimesBetweenDates?fromDate=${startDate}&toDate=${endDate}`);
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            setFilteredAttendances(data);
        } catch (error) {
            console.error('Erro ao buscar assiduidades:', error);
        }
    }

    // Atualiza a lista de funcionários ao carregar a página
    useEffect(() => {
        fetchAllAttendances();
    }, []);

    // Função para atualizar os dados da tabela
    const refreshAttendance = () => {
        fetchAllAttendances();
    };

    // Função para filtrar as presenças com base no texto de pesquisa
    useEffect(() => {
        const lowercasedFilter = filterText.toLowerCase();
        const filteredData = attendance.filter(att => {
            return att.employeeName ? att.employeeName.toLowerCase().includes(lowercasedFilter) : false;
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
    }, [selectedEmployeeId, selectedEmployeeIds]);

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
        setSelectedColumns(['employeeName', 'inOutMode', 'attendanceTime', 'observation']);
    };

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

    // Remove o campo de observação, número, nome do funcionário e o tipo
    const filteredColumns = employeeAttendanceTimesFields.filter(field => field.key !== 'employeeId' && field.key !== 'enrollNumber' && field.key !== 'type' && field.key !== 'deviceNumber' && field.key !== 'deviceId' && field.key !== 'verifyMode' && field.key !== 'workCode');

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
                        switch (row[field.key]) {
                            case 0: return 'Entrada';
                            case 1: return 'Saída';
                            case 2: return 'Pausa - Entrada';
                            case 3: return 'Pausa - Saída';
                            case 4: return 'Hora Extra - Entrada';
                            case 5: return 'Hora Extra - Saída';
                            default: return '';
                        }
                    default:
                        return row[field.key];
                }
            };
            return {
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredAttendances} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Filtra os dados da tabela
    const filteredDataTable = filteredAttendances.filter(attendances =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(attendances[key]) === String(filters[key])
        )
    );

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
                <Split className='split' sizes={[20, 80]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewDataNclock onSelectEmployees={handleSelectFromTreeView} data={data} />
                    </div>
                    <div className="datatable-container">
                        <div className="datatable-title-text">
                            <span>Todos (Movimentos e Pedidos)</span>
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
                                <CustomOutlineButton icon="bi-eye" onClick={() => setShowColumnSelector(true)} iconSize='1.1em' />
                                <ExportButton allData={attendance} selectedData={selectedRows} fields={employeeAttendanceTimesFields} />
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
                            columns={columns}
                            data={filteredDataTable}
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
};