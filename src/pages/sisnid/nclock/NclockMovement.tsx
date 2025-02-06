import { useEffect, useState } from "react";
import DataTable, { TableColumn } from 'react-data-table-component';
import Split from 'react-split';
import { toast } from "react-toastify";

import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { customStyles } from '../../../components/CustomStylesDataTable';
import { ExportButton } from "../../../components/ExportButton";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar"
import { PrintButton } from '../../../components/PrintButton';
import { SelectFilter } from '../../../components/SelectFilter';
import { TreeViewDataNclock } from '../../../components/TreeViewNclock';
import { employeeAttendanceTimesFields, employeeFields } from "../../../fields/Fields";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { CreateModalAttendance } from '../../../modals/CreateModalAttendance';
import { Employee, EmployeeAttendanceTimes } from "../../../types/Types";

import "../../../css/PagesStyles.css";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { useAttendance } from '../../../context/MovementContext';

import { usePersons } from '../../../context/PersonsContext';
import { UpdateModalEmployees } from '../../../modals/UpdateModalEmployees';

import { TextField, TextFieldProps } from '@mui/material';

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a interface para as propriedades do componente CustomSearchBox
function CustomSearchBox(props: TextFieldProps) {
    return (
        <TextField
            {...props}
            className="SearchBox"
        />
    );
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
    const { fetchAllAttendances, fetchAllAttendancesBetweenDates, handleAddAttendance } = useAttendance();
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    
    const { employees, handleUpdateEmployee } = usePersons();
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [attendanceMovement, setAttendanceMovement] = useState<EmployeeAttendanceTimes[]>([]);
    const [filteredAttendances, setFilteredAttendances] = useState<EmployeeAttendanceTimes[]>([]);
    const [showAddAttendanceModal, setShowAddAttendanceModal] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['employeeName', 'inOutMode', 'attendanceTime']);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [resetSelection, setResetSelection] = useState(false);
    const [selectedRows, setSelectedRows] = useState<EmployeeAttendanceTimes[]>([]);
    const [filterText, setFilterText] = useState('');
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
    const [filters, setFilters] = useState<Filters>({});
    const [initialData, setInitialData] = useState<Partial<EmployeeAttendanceTimes>>({});
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee>();

    // Função para buscar todos as assiduidades
    const fetchMovements = () => {
        fetchAllAttendances({
            filterFunc: data => data.filter(att => att.type !== 3),
            postFetch: filteredData => {
                setAttendanceMovement(filteredData);
            }
        });
    };

    // Função para buscar todos as assiduidades entre datas
    const fetchMovementsBetweenDates = () => {
        fetchAllAttendancesBetweenDates({
            filterFunc: data => data.filter(att => att.type !== 3),
            postFetch: filteredData => {
                setFilteredAttendances(filteredData);
            }
        });
    }

    // Função para buscar os pagamentos dos terminais de hoje
    const fetchMovementsToday = async () => {
        const today = new Date();
        const start = formatDateToStartOfDay(today);
        const end = formatDateToEndOfDay(today);
        try {
            await fetchAllAttendancesBetweenDates({
                filterFunc: data => data.filter(att => att.type !== 3),
                postFetch: filteredData => {
                    setFilteredAttendances(filteredData);
                    setStartDate(start);
                    setEndDate(end);
                }
            });
        } catch (error) {
            console.error("Erro ao buscar movimentos de hoje:", error);
        }
    }

    // Função para buscar os pagamentos dos terminais de ontem
    const fetchMovementsForPreviousDay = async () => {
        const prevDate = new Date(startDate);
        prevDate.setDate(prevDate.getDate() - 1);

        const start = formatDateToStartOfDay(prevDate);
        const end = formatDateToEndOfDay(prevDate);

        try {
            await fetchAllAttendancesBetweenDates({
                filterFunc: data => data.filter(att => att.type !== 3),
                postFetch: filteredData => {
                    setFilteredAttendances(filteredData);
                    setStartDate(start);
                    setEndDate(end);
                }
            });
        } catch (error) {
            console.error("Erro ao buscar movimentos do dia anterior:", error);
        }
    };

    // Função para buscar os pagamentos dos terminais de amanhã
    const fetchMovementsForNextDay = async () => {
        const newDate = new Date(endDate);
        newDate.setDate(newDate.getDate() + 1);

        if (newDate > new Date()) {
            console.error("Não é possível buscar movimentos para uma data no futuro.");
            return;
        }

        const start = formatDateToStartOfDay(newDate);
        const end = formatDateToEndOfDay(newDate);

        try {
            await fetchAllAttendancesBetweenDates({
                filterFunc: data => data.filter(att => att.type !== 3),
                postFetch: filteredData => {
                    setFilteredAttendances(filteredData);
                    setStartDate(start);
                    setEndDate(end);
                }
            });
        } catch (error) {
            console.error("Erro ao buscar movimentos do dia seguinte:", error);
        }
    };

    // Função para adicionar um movimento
    const addAttendance = async (attendance: EmployeeAttendanceTimes) => {
        await handleAddAttendance(attendance);
        refreshAttendance();
        setClearSelectionToggle((prev) => !prev);
    }

    // Função para atualizar um funcionário e um cartão
    const updateEmployeeAndCard = async (employee: Employee) => {
        await handleUpdateEmployee(employee);
        refreshAttendance();
        setClearSelectionToggle((prev) => !prev);
    };

    // Busca os movimentos ao carregar a página
    useEffect(() => {
        fetchMovements();
    }, []);

    // Atualiza a seleção ao resetar
    useEffect(() => {
        if (resetSelection) {
            setResetSelection(false);
        }
    }, [resetSelection]);

    // Função para filtrar os movimentos com base no texto de pesquisa
    useEffect(() => {
        const lowercasedFilter = filterText.toLowerCase();
        const filteredData = attendanceMovement.filter(att => {
            return Object.entries(att).some(([key, value]) => {
                if (selectedColumns.includes(key)) {
                    if (key === 'attendanceTime') {
                        const formattedDate = new Date(value).toLocaleString('pt');
                        return formattedDate.toLowerCase().includes(lowercasedFilter);
                    } else if (typeof value === 'string') {
                        return value.toLowerCase().includes(lowercasedFilter);
                    } else if (value != null) {
                        return value.toString().toLowerCase().includes(lowercasedFilter);
                    }
                }
                return false;
            });
        });
        setFilteredAttendances(filteredData);
    }, [filterText, attendanceMovement]);

    // Atualiza a seleção ao mudar o filtro
    useEffect(() => {
        if (selectedEmployeeIds.length > 0) {
            const newFilteredAttendances = attendanceMovement.filter(att => selectedEmployeeIds.includes(att.employeeId));
            setFilteredAttendances(newFilteredAttendances);
        } else if (attendanceMovement.length > 0) {
            setFilteredAttendances(attendanceMovement);
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

    // Função para atualizar os funcionários
    const refreshAttendance = () => {
        fetchMovements();
        setStartDate(formatDateToStartOfDay(pastDate));
        setEndDate(formatDateToEndOfDay(currentDate));
        setClearSelectionToggle((prev) => !prev);
    };

    // Função para abrir o modal de adição de assiduidade
    const handleOpenAddAttendanceModal = () => {
        if (selectedEmployeeIds.length > 0) {
            setInitialData({
                ...initialData,
                selectedEmployeeIds: selectedEmployeeIds[0]
            });
            setShowAddAttendanceModal(true);
        } else {
            toast.warn('Selecione um funcionário primeiro!');
        }
    }

    // Define a função selecionar uma linha
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: EmployeeAttendanceTimes[];
    }) => {
        setSelectedRows(state.selectedRows);
    };

    // Remove o campo de observação, número, nome do funcionário e o tipo
    const filteredColumns = employeeAttendanceTimesFields.filter(field => field.key !== 'observation' && field.key !== 'enrollNumber' && field.key !== 'employeeName' && field.key !== 'type' && field.key !== 'deviceNumber');

    // Filtra os dados da tabela
    const filteredDataTable = filteredAttendances.filter(attendances =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (attendances[key] != null && String(attendances[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(attendances).some(([key, value]) => {
            if (selectedColumns.includes(key) && value != null) {
                if (value instanceof Date) {
                    return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
                } else {
                    return value.toString().toLowerCase().includes(filterText.toLowerCase());
                }
            }
            return false;
        })
    ).sort((a, b) => new Date(b.attendanceTime).getTime() - new Date(a.attendanceTime).getTime());

    // Função para abrir o modal de edição
    const handleOpenEditModal = (person: EmployeeAttendanceTimes) => {
        const employeeDetails = employees.find(emp => emp.employeeID === person.employeeId);
        if (employeeDetails) {
            setSelectedEmployee(employeeDetails);
            setShowEditModal(true);
        } else {
            console.error("Funcionário não encontrado:", person.employeeName);
        }
    };

    // Define as colunas
    const columns: TableColumn<EmployeeAttendanceTimes>[] = employeeAttendanceTimesFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            if (field.key === 'employeeName') {
                return {
                    ...field,
                    name: field.label,
                    cell: (row: EmployeeAttendanceTimes) => (
                        <div style={{ cursor: 'pointer' }} onClick={() => handleOpenEditModal(row)}>
                            {row.employeeName}
                        </div>
                    )
                };
            }
            const formatField = (row: EmployeeAttendanceTimes) => {
                switch (field.key) {
                    case 'attendanceTime':
                        return new Date(row.attendanceTime).toLocaleString() || '';
                    case 'deviceId':
                        return row.deviceNumber || '';
                    case 'inOutMode':
                        if (row.inOutModeDescription) {
                            return row.inOutModeDescription || '';
                        } else {
                            switch (row[field.key]) {
                                case 0: return 'Entrada';
                                case 1: return 'Saída';
                                case 2: return 'Pausa - Entrada';
                                case 3: return 'Pausa - Saída';
                                case 4: return 'Hora Extra - Entrada';
                                case 5: return 'Hora Extra - Saída';
                                default: return '';
                            }
                        }
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredDataTable} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
                sortFunction: (rowA, rowB) => new Date(rowB.attendanceTime).getTime() - new Date(rowA.attendanceTime).getTime()
            };
        });

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return employeeAttendanceTimesFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <div className="main-container">
            
            <div className="content-container">
                <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewDataNclock onSelectEmployees={handleSelectFromTreeView} />
                    </div>
                    <div className="datatable-container">
                        <div className="datatable-title-text">
                            <span>Movimentos</span>
                        </div>
                        <div className="datatable-header">
                            <div>
                                <CustomSearchBox
                                    label="Pesquisa"
                                    variant="outlined"
                                    size='small'
                                    value={filterText}
                                    onChange={e => setFilterText(e.target.value)}
                                    style={{ marginTop: -5 }}
                                />
                            </div>
                            <div className="buttons-container">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshAttendance} iconSize='1.1em'
                                    />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Adicionar</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-plus" onClick={handleOpenAddAttendanceModal} iconSize='1.1em'
                                    />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Colunas</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-eye" onClick={() => setShowColumnSelector(true)} iconSize='1.1em'
                                    />
                                </OverlayTrigger>
                                <ExportButton allData={filteredDataTable} selectedData={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={getSelectedFields()} />
                                <PrintButton data={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={getSelectedFields()} />
                            </div>
                            <div className="date-range-search">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Movimentos Hoje</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-calendar-event" onClick={fetchMovementsToday} iconSize='1.1em' />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Movimentos Dia Anterior</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-arrow-left-circle" onClick={fetchMovementsForPreviousDay} iconSize='1.1em' />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Movimentos Dia Seguinte</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-arrow-right-circle" onClick={fetchMovementsForNextDay} iconSize='1.1em' disabled={new Date(endDate) >= new Date(new Date().toISOString().substring(0, 10))} />
                                </OverlayTrigger>
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
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Buscar</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-search" onClick={fetchMovementsBetweenDates} iconSize='1.1em' />
                                </OverlayTrigger>
                            </div>
                        </div>
                        <div className='content-wrapper'>
                            <div className='table-css'>
                                <DataTable
                                    columns={columns}
                                    data={filteredDataTable}
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    selectableRows
                                    paginationPerPage={20}
                                    clearSelectedRows={clearSelectionToggle}
                                    onSelectedRowsChange={handleRowSelected}
                                    selectableRowsHighlight
                                    noDataComponent="Não existem dados disponíveis para exibir."
                                    customStyles={customStyles}
                                    striped
                                    defaultSortAsc={true}
                                    defaultSortFieldId="attendanceTime"
                                />
                            </div>
                        </div>
                    </div>
                </Split>
            </div>
            
            {showAddAttendanceModal && (
                <CreateModalAttendance
                    open={showAddAttendanceModal}
                    onClose={() => setShowAddAttendanceModal(false)}
                    onSave={addAttendance}
                    title='Adicionar Assiduidade'
                    fields={employeeAttendanceTimesFields}
                    initialValues={initialData}
                    entityType='movimentos'
                />
            )}
            {showColumnSelector && (
                <ColumnSelectorModal
                    columns={filteredColumns.filter(field => field.key !== 'employeeId')}
                    selectedColumns={selectedColumns}
                    onClose={() => setShowColumnSelector(false)}
                    onColumnToggle={handleColumnToggle}
                    onResetColumns={handleResetColumns}
                    onSelectAllColumns={handleSelectAllColumns}
                />
            )}
            {selectedEmployee && (
                <UpdateModalEmployees
                    open={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    onUpdate={updateEmployeeAndCard}
                    entity={selectedEmployee}
                    fields={employeeFields}
                    title="Atualizar Funcionário"
                />
            )}
        </div>
    );
}