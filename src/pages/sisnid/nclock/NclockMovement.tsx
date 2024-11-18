import Split from 'react-split';
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar"
import { useContext, useEffect, useState } from "react";
import { EmployeeAttendanceTimes } from "../../../helpers/Types";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { ExportButton } from "../../../components/ExportButton";
import { employeeAttendanceTimesFields } from "../../../helpers/Fields";
import { toast } from "react-toastify";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { DeleteModal } from "../../../modals/DeleteModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { customStyles } from '../../../components/CustomStylesDataTable';
import { CreateModalAttendance } from '../../../modals/CreateModalAttendance';
import { UpdateModalAttendance } from '../../../modals/UpdateModalAttendance';
import { TreeViewDataNclock } from '../../../components/TreeViewNclock';
import "../../../css/PagesStyles.css";
import { Button } from 'react-bootstrap';
import { SelectFilter } from '../../../components/SelectFilter';
import { AttendanceContext, AttendanceContextType, AttendanceProvider } from '../../../context/MovementContext';
import { useColor } from '../../../context/ColorContext';
import { PrintButton } from '../../../components/PrintButton';

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a página movimentos
export const NclockMovement = () => {
    const {
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        fetchAllAttendances,
        fetchAllAttendancesBetweenDates,
        handleAddAttendance,
        handleUpdateAttendance,
        handleDeleteAttendance
    } = useContext(AttendanceContext) as AttendanceContextType;
    const { navbarColor, footerColor } = useColor();
    const [attendanceMovement, setAttendanceMovement] = useState<EmployeeAttendanceTimes[]>([]);
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
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
    const [filters, setFilters] = useState<Filters>({});
    const [initialData, setInitialData] = useState<Partial<EmployeeAttendanceTimes>>({});

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

    // Função para adicionar um movimento
    const addAttendance = async (attendance: EmployeeAttendanceTimes) => {
        await handleAddAttendance(attendance);
        setShowAddAttendanceModal(false);
        refreshAttendance();
    }

    // Função para atualizar um movimento
    const updateAttendance = async (attendance: EmployeeAttendanceTimes) => {
        await handleUpdateAttendance(attendance);
        setShowUpdateAttendanceModal(false);
        refreshAttendance();
    }

    // Função para deletar um movimento
    const deleteAttendance = async (attendanceTimeId: string) => {
        await handleDeleteAttendance(attendanceTimeId);
        setShowDeleteModal(false);
        refreshAttendance();
    }

    // Atualiza os dados de renderização
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
            return att.employeeName ? att.employeeName.toLowerCase().includes(lowercasedFilter) : false;
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
        setSelectedColumns(['employeeId', 'inOutMode', 'attendanceTime']);
    };

    // Função para atualizar os funcionários
    const refreshAttendance = () => {
        fetchMovements();
    };

    // Função para abrir o modal de adição de assiduidade
    const handleOpenAddAttendanceModal = () => {
        if (selectedEmployeeId) {
            setShowAddAttendanceModal(true);
        } else {
            toast.error('Selecione um funcionário para adicionar uma assiduidade');
        }
    }

    // Remove o campo de observação, número, nome do funcionário e o tipo
    const filteredColumns = employeeAttendanceTimesFields.filter(field => field.key !== 'observation' && field.key !== 'enrollNumber' && field.key !== 'employeeName' && field.key !== 'type' && field.key !== 'deviceNumber');

    // Filtra os dados da tabela
    const filteredDataTable = filteredAttendances.filter(attendances =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(attendances[key]) === String(filters[key])
        )
    );

    // Define os dados iniciais ao duplicar
    const handleDuplicate = (attendance: Partial<EmployeeAttendanceTimes>) => {
        setInitialData(attendance);
        setShowAddAttendanceModal(true);
    }

    // Define as colunas
    const columns: TableColumn<EmployeeAttendanceTimes>[] = employeeAttendanceTimesFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: EmployeeAttendanceTimes) => {
                switch (field.key) {
                    case 'attendanceTime':
                        return new Date(row.attendanceTime).toLocaleString() || '';
                    case 'deviceId':
                        return row.deviceNumber || '';
                    case 'employeeId':
                        return row.employeeName || '';
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
        <AttendanceProvider>
            <div className="main-container">
                <NavBar style={{ backgroundColor: navbarColor }} />
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
                                    <ExportButton allData={filteredDataTable} selectedData={selectedRows} fields={employeeAttendanceTimesFields} />
                                    <PrintButton data={filteredDataTable} fields={employeeAttendanceTimesFields} />
                                </div>
                                <div className="date-range-search">
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={e => setStartDate(e.target.value)}
                                        className='search-input'
                                    />
                                    <span> até </span>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={e => setEndDate(e.target.value)}
                                        className='search-input'
                                    />
                                    <CustomOutlineButton icon="bi-search" onClick={fetchMovementsBetweenDates} iconSize='1.1em' />
                                </div>
                            </div>
                            <DataTable
                                columns={[...columns, actionColumn]}
                                data={filteredDataTable}
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
                                noDataComponent="Não existem dados disponíveis para exibir."
                                customStyles={customStyles}
                                defaultSortAsc={true}
                                defaultSortFieldId="attendanceTime"
                            />
                        </div>
                    </Split>
                </div>
                <Footer style={{ backgroundColor: footerColor }} />
                {showAddAttendanceModal && (
                    <CreateModalAttendance
                        open={showAddAttendanceModal}
                        onClose={() => setShowAddAttendanceModal(false)}
                        onSave={addAttendance}
                        title='Adicionar Assiduidade'
                        fields={employeeAttendanceTimesFields}
                        initialValues={initialData || {}}
                        entityType='movimentos'
                    />
                )}
                {selectedAttendances.length > 0 && showUpdateAttendanceModal && (
                    <UpdateModalAttendance
                        open={showUpdateAttendanceModal}
                        onClose={() => setShowUpdateAttendanceModal(false)}
                        onUpdate={updateAttendance}
                        entity={selectedAttendances[0]}
                        fields={employeeAttendanceTimesFields}
                        onDuplicate={handleDuplicate}
                        title='Atualizar Assiduidade'
                        entityType='movimentos'
                    />
                )}
                {selectedAttendanceToDelete && showDeleteModal && (
                    <DeleteModal
                        open={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                        onDelete={deleteAttendance}
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
        </AttendanceProvider>
    );
}