import Split from 'react-split';
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar"
import { useContext, useEffect, useState } from "react";
import { Employee, EmployeeAttendanceTimes, EmployeeCard } from "../../../helpers/Types";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { ExportButton } from "../../../components/ExportButton";
import { employeeAttendanceTimesFields, employeeFields } from "../../../helpers/Fields";
import { toast } from "react-toastify";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { DeleteModal } from "../../../modals/DeleteModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { customStyles } from '../../../components/CustomStylesDataTable';
import { CreateModalAttendance } from '../../../modals/CreateModalAttendance';
import { UpdateModalAttendance } from '../../../modals/UpdateModalAttendance';
import { TreeViewDataNclock } from '../../../components/TreeViewNclock';
import "../../../css/PagesStyles.css";
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { SelectFilter } from '../../../components/SelectFilter';
import { AttendanceContext, AttendanceContextType, AttendanceProvider } from '../../../context/MovementContext';
import { useColor } from '../../../context/ColorContext';
import { PrintButton } from '../../../components/PrintButton';
import { PersonsContext, PersonsContextType } from '../../../context/PersonsContext';
import { UpdateModalEmployees } from '../../../modals/UpdateModalEmployees';

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a página de pedidos
export const NclockRequests = () => {
    const {
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        fetchAllAttendances,
        fetchAllAttendancesBetweenDates,
        handleAddAttendance,
        handleUpdateAttendance,
        handleDeleteAttendance,
    } = useContext(AttendanceContext) as AttendanceContextType;
    const { navbarColor, footerColor } = useColor();
    const { employees, handleUpdateEmployee, handleUpdateEmployeeCard, handleAddEmployeeCard } = useContext(PersonsContext) as PersonsContextType;
    const [attendanceRequests, setAttendanceRequests] = useState<EmployeeAttendanceTimes[]>([]);
    const [filteredAttendances, setFilteredAttendances] = useState<EmployeeAttendanceTimes[]>([]);
    const [selectedAttendances, setSelectedAttendances] = useState<EmployeeAttendanceTimes[]>([]);
    const [showAddAttendanceModal, setShowAddAttendanceModal] = useState(false);
    const [showUpdateAttendanceModal, setShowUpdateAttendanceModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['employeeId', 'observation', 'attendanceTime']);
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
    const [currentAttendanceIndex, setCurrentAttendanceIndex] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee>();

    // Função para buscar todos as assiduidades
    const fetchRequests = () => {
        fetchAllAttendances({
            filterFunc: data => data.filter(att => att.type === 3),
            postFetch: filteredData => {
                setAttendanceRequests(filteredData);
            }
        });
    };

    // Função para buscar todos as assiduidades entre datas
    const fetchRequestsBetweenDates = () => {
        fetchAllAttendancesBetweenDates({
            filterFunc: data => data.filter(att => att.type === 3),
            postFetch: filteredData => {
                setFilteredAttendances(filteredData);
            }
        });
    };

    // Função para adicionar um movimento
    const addAttendance = async (attendance: EmployeeAttendanceTimes) => {
        await handleAddAttendance(attendance);
        refreshAttendance();
    }

    // Função para atualizar um movimento
    const updateAttendance = async (attendance: EmployeeAttendanceTimes) => {
        await handleUpdateAttendance(attendance);
        refreshAttendance();
    }

    // Função para deletar um movimento
    const deleteAttendance = async (attendanceTimeId: string) => {
        await handleDeleteAttendance(attendanceTimeId);
        refreshAttendance();
    }

    // Função para atualizar um funcionário e um cartão
    const updateEmployeeAndCard = async (employee: Employee, card: Partial<EmployeeCard>) => {
        await handleUpdateEmployee(employee);
        if (card.cardId) {
            await handleUpdateEmployeeCard(card as EmployeeCard);
        } else {
            await handleAddEmployeeCard(card as EmployeeCard);
        }
        window.location.reload();
    };

    // Atualiza os dados de renderização
    useEffect(() => {
        fetchRequests();
    }, []);

    // Atualiza a seleção ao resetar
    useEffect(() => {
        if (resetSelection) {
            setResetSelection(false);
        }
    }, [resetSelection]);

    // Função para filtrar as presenças com base no texto de pesquisa
    useEffect(() => {
        const lowercasedFilter = filterText.toLowerCase();
        const filteredData = attendanceRequests.filter(att => {
            return att.employeeName ? att.employeeName.toLowerCase().includes(lowercasedFilter) : false;
        });
        setFilteredAttendances(filteredData);
    }, [filterText, attendanceRequests]);

    // Atualiza a seleção ao mudar o filtro
    useEffect(() => {
        if (selectedEmployeeIds.length > 0) {
            const newFilteredAttendances = attendanceRequests.filter(att => selectedEmployeeIds.includes(att.employeeId));
            setFilteredAttendances(newFilteredAttendances);
        } else if (attendanceRequests.length > 0) {
            setFilteredAttendances(attendanceRequests);
        }
    }, [selectedEmployeeId, selectedEmployeeIds]);

    // Atualiza o índice selecionado
    useEffect(() => {
        if (selectedAttendances && selectedAttendances.length > 0) {
            const sortedAttendances = filteredAttendances.sort((a, b) => a.attendanceTime.toString().localeCompare(b.attendanceTime.toString()));
            const attendanceIndex = sortedAttendances.findIndex(att => att.attendanceTimeId === selectedAttendances[0].attendanceTimeId);
            setCurrentAttendanceIndex(attendanceIndex);
        }
    }, [selectedAttendances, filteredAttendances]);

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
        setSelectedColumns(['employeeId', 'observation', 'attendanceTime']);
    };

    // Função para atualizar os funcionários
    const refreshAttendance = () => {
        fetchRequests();
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

    // Seleciona a assiduidade anterior
    const handleNextAttendance = () => {
        if (currentAttendanceIndex < filteredAttendances.length - 1) {
            setCurrentAttendanceIndex(currentAttendanceIndex + 1);
            setSelectedAttendances([filteredAttendances[currentAttendanceIndex + 1]]);
        }
    };

    // Seleciona a assiduidade seguinte
    const handlePrevDepartment = () => {
        if (currentAttendanceIndex > 0) {
            setCurrentAttendanceIndex(currentAttendanceIndex - 1);
            setSelectedAttendances([filteredAttendances[currentAttendanceIndex - 1]]);
        }
    };

    // Remove o campo de número, nome, modo de entrada/saída e tipo
    const filteredColumns = employeeAttendanceTimesFields.filter(field => field.key !== 'enrollNumber' && field.key !== 'employeeName' && field.key !== 'inOutMode' && field.key !== 'type' && field.key !== 'deviceNumber' && field.key !== 'deviceId' && field.key !== 'verifyMode' && field.key !== 'workCode');

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

    // Função para abrir o modal de edição
    const handleOpenEditModal = (person: EmployeeAttendanceTimes) => {
        const employeeDetails = employees.find(emp => emp.name === person.nameUser);
        if (employeeDetails) {
            setSelectedEmployee(employeeDetails);
            setShowEditModal(true);
        } else {
            console.error("Funcionário não encontrado:", person.nameUser);
        }
    };

    // Define as colunas
    const columns: TableColumn<EmployeeAttendanceTimes>[] = employeeAttendanceTimesFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            if (field.key === 'employeeId') {
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
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Duplicar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-copy' onClick={() => handleDuplicate(row)} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Editar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-pencil-fill' onClick={() => handleEditAssiduity([row])} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Apagar</Tooltip>}
                >
                    <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.attendanceTimeId)}>
                        <i className="bi bi-trash-fill"></i>
                    </Button>
                </OverlayTrigger>
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
                                <span>Pedidos</span>
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
                                    <ExportButton allData={filteredDataTable} selectedData={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={employeeAttendanceTimesFields} />
                                    <PrintButton data={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={employeeAttendanceTimesFields} />
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
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip className="custom-tooltip">Buscar</Tooltip>}
                                    >
                                        <CustomOutlineButton icon="bi-search" onClick={fetchRequestsBetweenDates} iconSize='1.1em' />
                                    </OverlayTrigger>
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
                                striped
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
                        title='Adicionar Pedido de Assiduidade'
                        fields={employeeAttendanceTimesFields}
                        initialValues={initialData}
                        entityType='pedidos'
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
                        entityType='pedidos'
                        onNext={handlePrevDepartment}
                        onPrev={handleNextAttendance}
                        canMoveNext={currentAttendanceIndex > 0}
                        canMovePrev={currentAttendanceIndex < filteredAttendances.length - 1}
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
        </AttendanceProvider>
    );
}