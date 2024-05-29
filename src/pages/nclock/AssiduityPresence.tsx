import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../../components/CustomStylesDataTable";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import "../../css/PagesStyles.css";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { ExportButton } from "../../components/ExportButton";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../components/FetchWithAuth";
import { useEffect, useState } from "react";
import { EmployeeAttendanceTimes } from "../../helpers/Types";
import { employeeAttendanceTimesFields } from "../../helpers/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { UpdateModalAttendance } from "../../modals/UpdateModalAttendance";

export const AssiduityPresence = () => {
    const [attendance, setAttendance] = useState<EmployeeAttendanceTimes[]>([]);
    const [selectedAttendances, setSelectedAttendances] = useState<EmployeeAttendanceTimes[]>([]);
    const [filterText, setFilterText] = useState('');
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [showUpdateAttendanceModal, setShowUpdateAttendanceModal] = useState(false);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['employeeName', 'inOutMode', 'attendanceTime']);
    const [selectedRows, setSelectedRows] = useState<EmployeeAttendanceTimes[]>([]);

    // Função para buscar todos as assiduidades
    const fetchAllAttendances = async () => {
        const currentDate = new Date().toLocaleDateString('pt-PT');
        try {
            const response = await fetchWithAuth('Attendances/GetAllAttendances');
            if (!response.ok) {
                toast.error('Erro ao buscar assiduidades');
                return;
            }
            const allAttendanceData: EmployeeAttendanceTimes[] = await response.json();
            const todaysAttendances = allAttendanceData.filter(att => {
                const attendanceDate = new Date(att.attendanceTime);
                return attendanceDate.toLocaleDateString('pt-PT') === currentDate;
            });
            setAttendance(todaysAttendances);
        } catch (error) {
            console.error('Erro ao buscar assiduidades:', error);
        }
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

    // Atualiza a lista de funcionários ao carregar a página
    useEffect(() => {
        fetchAllAttendances();
    }, []);

    // Função para atualizar os dados da tabela
    const refreshAttendance = () => {
        fetchAllAttendances();
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

    return (
        <div className="main-container">
            <NavBar />
            <div className="datatable-container">
                <div className="datatable-title-text">
                    <span>Presenças de Assiduidade</span>
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
                        <ExportButton allData={attendance} selectedData={attendance} fields={employeeAttendanceTimesFields.map(field => ({ key: field.key, label: field.label }))} />
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={attendance}
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
            <Footer />
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
};