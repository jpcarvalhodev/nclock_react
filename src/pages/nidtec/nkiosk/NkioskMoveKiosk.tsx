import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import Split from "react-split";

import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import { PrintButton } from "../../../components/PrintButton";
import { SelectFilter } from "../../../components/SelectFilter";
import { TreeViewDataNkioskMove } from "../../../components/TreeViewNkioskMove";
import { useKiosk } from "../../../context/KioskContext";
import { useNavbar } from "../../../context/NavbarContext";
import { useTerminals } from "../../../context/TerminalsContext";
import * as apiService from "../../../api/apiService";
import { employeeFields, transactionCardFields } from "../../../fields/Fields";
import { Employee, KioskTransactionCard } from "../../../types/Types";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { UpdateModalEmployees } from "../../../modals/UpdateModalEmployees";
import { usePersons } from "../../../context/PersonsContext";

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T00:00`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T23:59`;
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

export const NkioskMoveKiosk = () => {
    const { navbarColor, footerColor } = useNavbar();
    const { employees, handleUpdateEmployee } = usePersons();
    const { devices } = useTerminals();
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    const { moveKiosk, setMoveKiosk, fetchAllMoveKiosk } = useKiosk();
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['eventTime', 'nameUser', 'pin', 'cardNo', 'eventDoorId', 'eventName', 'deviceSN']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [selectedRows, setSelectedRows] = useState<KioskTransactionCard[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<KioskTransactionCard[]>([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
    const eventDoorId = '4';

    // Função para buscar os movimentos de quiosque entre datas
    const fetchMovementsKioskBetweenDates = async () => {
        try {
            if (devices.length === 0) {
                setMoveKiosk([]);
                return;
            }
            const promises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId, device.serialNumber, startDate, endDate);
            });

            const allData = await Promise.all(promises);

            const validData = allData.filter(data => Array.isArray(data) && data.length > 0);

            const combinedData = validData.flat();

            setMoveKiosk(combinedData);
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos no quiosque:', error);
            setMoveKiosk([]);
        }
    };

    // Função para buscar os movimentos de quiosque hoje
    const fetchKioskMovementsToday = async () => {
        try {
            if (devices.length === 0) {
                setMoveKiosk([]);
                return;
            }
            const promises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId, device.serialNumber, formatDateToStartOfDay(currentDate), formatDateToEndOfDay(currentDate));
            });

            const allData = await Promise.all(promises);

            const validData = allData.filter(data => Array.isArray(data) && data.length > 0);

            const combinedData = validData.flat();

            setMoveKiosk(combinedData);
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos no quiosque hoje:', error);
            setMoveKiosk([]);
        }
    };

    // Busca os movimentos de quiosque ao carregar a página
    useEffect(() => {
        fetchAllMoveKiosk();
    }, []);

    // Função para atualizar um funcionário e um cartão
    const updateEmployeeAndCard = async (employee: Employee) => {
        await handleUpdateEmployee(employee);
        window.location.reload();
    };

    // Função para atualizar os movimentos de quiosque
    const refreshMoveKiosk = () => {
        fetchAllMoveKiosk();
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
    useEffect(() => {
        if (selectedDevicesIds.length > 0) {
            const employeeShortNames = selectedDevicesIds.map(employeeId => {
                const employee = employees.find(emp => emp.employeeID === employeeId);
                return employee ? employee.shortName : null;
            }).filter(name => name !== null);

            const filtered = moveKiosk.filter(listMovement =>
                employeeShortNames.includes(listMovement.nameUser)
            );
            setFilteredDevices(filtered);
        } else {
            setFilteredDevices(moveKiosk);
        }
    }, [selectedDevicesIds, moveKiosk]);

    // Função para selecionar as colunas
    const toggleColumn = (columnName: string) => {
        if (selectedColumns.includes(columnName)) {
            setSelectedColumns(selectedColumns.filter(col => col !== columnName));
        } else {
            setSelectedColumns([...selectedColumns, columnName]);
        }
    };

    // Função para resetar as colunas
    const resetColumns = () => {
        setSelectedColumns(['eventTime', 'nameUser', 'pin', 'cardNo', 'eventDoorId', 'eventName', 'deviceSN']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Define a seleção da árvore
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        setSelectedDevicesIds(selectedIds);
    };

    // Define a função de seleção de linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: KioskTransactionCard[];
    }) => {
        const sortedSelectedRows = state.selectedRows.sort((a, b) => new Date(b.eventTime).getTime() - new Date(a.eventTime).getTime());
        setSelectedRows(sortedSelectedRows);
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Filtra os dados da tabela
    const filteredDataTable = filteredDevices.filter(moveKiosks =>
        new Date(moveKiosks.eventTime) >= new Date(startDate) && new Date(moveKiosks.eventTime) <= new Date(endDate) &&
        Object.keys(filters).every(key =>
            filters[key] === "" || (moveKiosks[key] != null && String(moveKiosks[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(moveKiosks).some(([key, value]) => {
            if (selectedColumns.includes(key) && value != null) {
                if (value instanceof Date) {
                    return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
                } else {
                    return value.toString().toLowerCase().includes(filterText.toLowerCase());
                }
            }
            return false;
        })
    ).sort((a, b) => new Date(b.eventTime).getTime() - new Date(a.eventTime).getTime());

    // Função para abrir o modal de edição
    const handleOpenEditModal = (person: KioskTransactionCard) => {
        const employeeDetails = employees.find(emp => emp.shortName === person.nameUser);
        if (employeeDetails) {
            setSelectedEmployee(employeeDetails);
            setShowEditModal(true);
        } else {
            console.error("Funcionário não encontrado:", person.nameUser);
        }
    };

    // Define as colunas da tabela
    const columns: TableColumn<KioskTransactionCard>[] = transactionCardFields
        .filter(field => selectedColumns.includes(field.key))
        .sort((a, b) => (a.key === 'eventTime' ? -1 : b.key === 'eventTime' ? 1 : 0))
        .map(field => {
            if (field.key === 'nameUser') {
                return {
                    ...field,
                    name: field.label,
                    cell: (row: KioskTransactionCard) => (
                        <div style={{ cursor: 'pointer' }} onClick={() => handleOpenEditModal(row)}>
                            {row.nameUser}
                        </div>
                    )
                };
            }
            const formatField = (row: KioskTransactionCard) => {
                const value = row[field.key as keyof KioskTransactionCard];
                switch (field.key) {
                    case 'deviceSN':
                        return devices.find(device => device.serialNumber === value)?.deviceName ?? '';
                    case 'eventDoorId':
                        return 'Quiosque';
                    case 'eventTime':
                        return new Date(row.eventTime).toLocaleString() || '';
                    default:
                        return value ?? '';
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

    // Função para gerar os dados com nomes substituídos para o export/print
    const transformTransactionWithNames = (transaction: { deviceSN: string; }) => {

        const deviceMatch = devices.find(device => device.serialNumber === transaction.deviceSN);
        const deviceName = deviceMatch?.deviceName || '';

        return {
            ...transaction,
            deviceSN: deviceName,
        };
    };

    // Dados com nomes substituídos para o export/print
    const moveKioskWithNames = moveKiosk.map(transformTransactionWithNames);

    // Transforma as linhas selecionadas com nomes substituídos
    const selectedRowsWithNames = selectedRows.map(transformTransactionWithNames);

    // Calcula o valor total dos movimentos
    const totalAmount = filteredDataTable.length;

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return transactionCardFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='content-container'>
                <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewDataNkioskMove onSelectDevices={handleSelectFromTreeView} />
                    </div>
                    <div className="datatable-container">
                        <div className="datatable-title-text">
                            <span style={{ color: '#009739' }}>Movimentos do Quiosque</span>
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
                            <div className="buttons-container-others">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshMoveKiosk} />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Colunas</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                                </OverlayTrigger>
                                <ExportButton allData={moveKioskWithNames} selectedData={selectedRows.length > 0 ? selectedRowsWithNames : moveKioskWithNames} fields={getSelectedFields()} />
                                <PrintButton data={selectedRows.length > 0 ? selectedRowsWithNames : moveKioskWithNames} fields={getSelectedFields()} />
                            </div>
                            <div className="date-range-search">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Entradas Hoje</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-calendar-event" onClick={fetchKioskMovementsToday} iconSize='1.1em' />
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
                                    <CustomOutlineButton icon="bi-search" onClick={fetchMovementsKioskBetweenDates} iconSize='1.1em' />
                                </OverlayTrigger>
                            </div>
                        </div>
                        <div className='table-css'>
                            <DataTable
                                columns={columns}
                                data={filteredDataTable}
                                pagination
                                paginationComponentOptions={paginationOptions}
                                paginationPerPage={20}
                                selectableRows
                                onSelectedRowsChange={handleRowSelected}
                                clearSelectedRows={clearSelectionToggle}
                                selectableRowsHighlight
                                noDataComponent="Não existem dados disponíveis para exibir."
                                customStyles={customStyles}
                                striped
                                defaultSortAsc={true}
                                defaultSortFieldId="eventTime"
                            />
                        </div>
                        <div style={{ marginLeft: 10, marginTop: -5 }}>
                            <strong>Movimentos do Quiosque: </strong>{totalAmount}
                        </div>
                    </div>
                </Split>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={transactionCardFields}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
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