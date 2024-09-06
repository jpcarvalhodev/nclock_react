import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../../components/CustomStylesDataTable";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import "../../css/PagesStyles.css";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { useContext, useEffect, useState } from "react";
import { Department, Employee, EmployeeAttendanceTimes, Group } from "../../helpers/Types";
import { employeeAttendanceTimesFields } from "../../helpers/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import Split from 'react-split';
import { TreeViewDataNclock } from "../../components/TreeViewNclock";
import { SelectFilter } from "../../components/SelectFilter";
import { AttendanceContext, AttendanceContextType, AttendanceProvider } from "../../context/MovementContext";

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a interface para os dados de presença de funcionários
interface EmployeeAttendanceWithPresence extends EmployeeAttendanceTimes {
    isPresent: boolean;
}

// Este objeto mapeará IDs de funcionários para seus respectivos status de presença
interface EmployeeStatus {
    [key: string]: EmployeeAttendanceTimes & { isPresent: boolean };
}

// Define a página de presença
export const NclockPresence = () => {
    const {
        fetchAllAttendances,
    } = useContext(AttendanceContext) as AttendanceContextType;
    const [attendancePresence, setAttendancePresence] = useState<EmployeeAttendanceWithPresence[]>([]);
    const [filterText, setFilterText] = useState('');
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['employeeName', 'inOutMode', 'attendanceTime']);
    const [selectedRows, setSelectedRows] = useState<EmployeeAttendanceTimes[]>([]);
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
    const [filteredAttendances, setFilteredAttendances] = useState<EmployeeAttendanceTimes[]>([]);
    const [filters, setFilters] = useState<Filters>({});

    // Função para buscar todos as assiduidades
    const fetchPresence = () => {
        const currentDate = new Date().toLocaleDateString('pt-PT');

        fetchAllAttendances({
            filterFunc: data => data.filter(att => att.type !== 3)
        }).then(allAttendanceData => {
            const employeeStatusMap: EmployeeStatus = {};

            allAttendanceData.forEach((emp: EmployeeAttendanceTimes) => {
                employeeStatusMap[emp.employeeId] = {
                    ...emp,
                    isPresent: false
                };
            });

            allAttendanceData.forEach((att: EmployeeAttendanceTimes) => {
                const attendanceDate = new Date(att.attendanceTime).toLocaleDateString('pt-PT');
                if (attendanceDate === currentDate && [0, 2, 4].includes(att.inOutMode)) {
                    employeeStatusMap[att.employeeId] = {
                        ...att,
                        isPresent: true
                    };
                }
            });

            const attendances = Object.values(employeeStatusMap);
            setAttendancePresence(attendances);
            setFilteredAttendances(attendances);
        }).catch(error => {
            console.error("Error fetching presence data:", error);
        });
    };

    // Atualiza a lista de funcionários ao carregar a página
    useEffect(() => {
        fetchPresence();
    }, []);

    // Função para atualizar os dados da tabela
    const refreshAttendance = () => {
        fetchPresence();
    };

    // Função para filtrar as presenças com base no texto de pesquisa
    useEffect(() => {
        const lowercasedFilter = filterText.toLowerCase();
        const filteredData = attendancePresence.filter(att => {
            return att.employeeName && att.employeeName.toLowerCase().includes(lowercasedFilter);
        });
        setFilteredAttendances(filteredData);
    }, [filterText, attendancePresence]);

    // Atualiza a seleção ao mudar o filtro
    useEffect(() => {
        if (selectedEmployeeIds.length > 0) {
            const newFilteredAttendances = attendancePresence.filter(att => selectedEmployeeIds.includes(att.employeeId));
            setFilteredAttendances(newFilteredAttendances);
        } else if (attendancePresence.length > 0) {
            setFilteredAttendances(attendancePresence);
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
        setSelectedColumns(['employeeName', 'inOutMode', 'attendanceTime']);
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
    const filteredColumns = employeeAttendanceTimesFields.filter(field => field.key !== 'observation' && field.key !== 'enrollNumber' && field.key !== 'employeeId' && field.key !== 'type' && field.key !== 'deviceNumber' && field.key !== 'deviceId' && field.key !== 'verifyMode' && field.key !== 'workCode');

    // Definindo a coluna de Presença primeiro
    const presenceColumn: TableColumn<EmployeeAttendanceTimes> = {
        name: 'Presença',
        selector: row => row.isPresent ? 'Presente' : 'Ausente',
        format: row => (
            <span style={{
                color: row.isPresent ? 'green' : 'red',
                backgroundColor: row.isPresent ? '#d4edda' : '#f8d7da',
                borderRadius: '4px',
                padding: '2px 10px',
                display: 'inline-block'
            }}>
                {row.isPresent ? 'Presente' : 'Ausente'}
            </span>
        ),
        sortable: true
    };

    // Adicionando as outras colunas
    const otherColumns: TableColumn<EmployeeAttendanceTimes>[] = employeeAttendanceTimesFields
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

    // Combinando colunas, com a coluna de Presença primeiro
    const columns: TableColumn<EmployeeAttendanceTimes>[] = [presenceColumn, ...otherColumns];

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
        <AttendanceProvider>
            <div className="main-container">
                <NavBar color="#0050a0" />
                <div className="content-container">
                    <Split className='split' sizes={[20, 80]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                        <div className="treeview-container">
                            <TreeViewDataNclock onSelectEmployees={handleSelectFromTreeView} />
                        </div>
                        <div className="datatable-container">
                            <div className="datatable-title-text">
                                <span>Presenças</span>
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
                                    <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshAttendance} iconSize='1.1em' />
                                    <CustomOutlineButton icon="bi-eye" onClick={() => setShowColumnSelector(true)} iconSize='1.1em' />
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
                <Footer color="#0050a0" />
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
        </AttendanceProvider>
    );
};