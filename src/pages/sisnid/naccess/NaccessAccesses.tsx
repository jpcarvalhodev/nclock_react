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
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";

import "../../../css/PagesStyles.css";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { useAttendance } from '../../../context/MovementContext';
import { useNavbar } from "../../../context/NavbarContext";
import { usePersons } from '../../../context/PersonsContext';
import { UpdateModalEmployees } from '../../../modals/UpdateModalEmployees';

import { TextField, TextFieldProps } from '@mui/material';
import { Accesses, Employee } from "../../../types/Types";
import { accessesFields, employeeFields } from "../../../fields/Fields";
import { TreeViewDataNaccess } from "../../../components/TreeViewNaccess";

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

// Define a página de acessos
export const NaccessAccesses = () => {
    const {
        access,
        fetchAllAccesses,
    } = useAttendance();
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    const { navbarColor, footerColor } = useNavbar();
    const { employees, handleUpdateEmployee } = usePersons();
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [filteredAccess, setFilteredAccess] = useState<Accesses[]>([]);
    const [showAddAccessModal, setShowAddAccessModal] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['eventTime', 'cardNo', 'nameUser', 'pin', 'deviceSN']);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [resetSelection, setResetSelection] = useState(false);
    const [selectedRows, setSelectedRows] = useState<Accesses[]>([]);
    const [filterText, setFilterText] = useState('');
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
    const [filters, setFilters] = useState<Filters>({});
    const [initialData, setInitialData] = useState<Partial<Accesses>>({});
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee>();

    // Função para atualizar um funcionário e um cartão
    const updateEmployeeAndCard = async (employee: Employee) => {
        await handleUpdateEmployee(employee);
        refreshAccess();
        setClearSelectionToggle((prev) => !prev);
    };

    // Busca os movimentos ao carregar a página
    useEffect(() => {
        fetchAllAccesses();
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
        const filteredData = access.filter(att => {
            return Object.entries(att).some(([key, value]) => {
                if (selectedColumns.includes(key)) {
                    if (key === 'eventTime') {
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
        setFilteredAccess(filteredData);
    }, [filterText, access]);

    // Atualiza a seleção ao mudar o filtro
    useEffect(() => {
        if (selectedEmployeeIds.length > 0) {
            const newFilteredAccess = access.filter(acc => selectedEmployeeIds.includes(acc.pin));
            setFilteredAccess(newFilteredAccess);
        } else if (access.length > 0) {
            setFilteredAccess(access);
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
        const allColumnKeys = accessesFields.map(field => field.key);
        setSelectedColumns(allColumnKeys);
    };

    // Função para resetar as colunas
    const handleResetColumns = () => {
        setSelectedColumns(['eventTime', 'nameUser', 'pin', 'cardNo', 'deviceSN']);
    };

    // Função para atualizar os funcionários
    const refreshAccess = () => {
        fetchAllAccesses();
        setStartDate(formatDateToStartOfDay(pastDate));
        setEndDate(formatDateToEndOfDay(currentDate));
        setClearSelectionToggle((prev) => !prev);
    };

    /* // Função para abrir o modal de adição de assiduidade
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
    } */

    // Filtra os dados da tabela
    const filteredDataTable = filteredAccess.filter(attendances =>
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
    );

    // Função para abrir o modal de edição
    const handleOpenEditModal = (person: Accesses) => {
        const employeeDetails = employees.find(emp => emp.employeeID === person.employeeId);
        if (employeeDetails) {
            setSelectedEmployee(employeeDetails);
            setShowEditModal(true);
        } else {
            console.error("Funcionário não encontrado:", person.employeeName);
        }
    };

    // Define as colunas
    const columns: TableColumn<Accesses>[] = accessesFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            if (field.key === 'nameUser') {
                return {
                    ...field,
                    name: field.label,
                    cell: (row: Accesses) => (
                        <div style={{ cursor: 'pointer' }} onClick={() => handleOpenEditModal(row)}>
                            {row.employeeName}
                        </div>
                    )
                };
            }
            const formatField = (row: Accesses) => {
                switch (field.key) {
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
                sortFunction: (rowA, rowB) => new Date(rowB.eventTime).getTime() - new Date(rowA.eventTime).getTime()
            };
        });

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return accessesFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="content-container">
                <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewDataNaccess onSelectEmployees={handleSelectFromTreeView} />
                    </div>
                    <div className="datatable-container">
                        <div className="datatable-title-text">
                            <span>Acessos</span>
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
                                    <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshAccess} iconSize='1.1em'
                                    />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Adicionar</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-plus" onClick={() => toast.warn('Funcionalidade ainda não implementada')} iconSize='1.1em'
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
                            {/* <div className="date-range-search">
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
                            </div> */}
                        </div>
                        <DataTable
                            columns={columns}
                            data={filteredDataTable}
                            pagination
                            paginationComponentOptions={paginationOptions}
                            selectableRows
                            paginationPerPage={20}
                            clearSelectedRows={clearSelectionToggle}
                            selectableRowsHighlight
                            noDataComponent="Não existem dados disponíveis para exibir."
                            customStyles={customStyles}
                            striped
                            defaultSortAsc={true}
                            defaultSortFieldId="eventTime"
                        />
                    </div>
                </Split>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {/* {showAddAccessModal && (
                <CreateModalAttendance
                    open={showAddAccessModal}
                    onClose={() => setShowAddAccessModal(false)}
                    onSave={addAttendance}
                    title='Adicionar Assiduidade'
                    fields={employeeAttendanceTimesFields}
                    initialValues={initialData}
                    entityType='movimentos'
                />
            )} */}
            {showColumnSelector && (
                <ColumnSelectorModal
                    columns={accessesFields}
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