import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import Split from "react-split";
import { toast } from "react-toastify";

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
import * as apiService from "../../../api/apiService";
import { auxOutFields, employeeFields, newTransactionCardFields, transactionCardFields } from "../../../fields/Fields";
import { Employee, KioskTransactionCard, NewTransactionCard } from "../../../types/Types";
import { AuxOutModal } from "../../../modals/AuxOutModal";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { CreateModalNewCard } from "../../../modals/CreateModalNewCard";
import { UpdateModalEmployees } from "../../../modals/UpdateModalEmployees";
import { usePersons } from "../../../context/PersonsContext";
import { useTerminals } from "../../../context/TerminalsContext";


// Define a interface SaveData
interface SaveData {
    deviceSN: string;
    auxData: FormData;
}

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

export const NkioskMoveCard = () => {
    const { navbarColor, footerColor } = useNavbar();
    const { employees, handleUpdateEmployee } = usePersons();
    const { devices } = useTerminals();
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    const { moveCard, setMoveCard, fetchAllMoveCard, handleAddNewMoveCard } = useKiosk();
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
    const [showAuxOutModal, setShowAuxOutModal] = useState(false);
    const [loadingAuxOut, setLoadingAuxOut] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
    const [showAddModal, setShowAddModal] = useState(false);
    const eventDoorId = '3';

    // Função para adicionar um novo movimento de cartão
    const addNewCard = async (newCard: NewTransactionCard) => {
        await handleAddNewMoveCard(newCard);
    };

    // Função para buscar os movimentos dos cartões entre datas
    const fetchMovementCardBetweenDates = async () => {
        try {
            if (devices.length === 0) {
                setMoveCard([]);
                return;
            }

            const promises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId, device.serialNumber, startDate, endDate);
            });

            const allData = await Promise.all(promises);

            const validData = allData.filter(data => Array.isArray(data) && data.length > 0);

            const combinedData = validData.flat();

            setMoveCard(combinedData);
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos de cartões hoje:', error);
            setMoveCard([]);
        }
    };

    // Função para buscar os movimentos dos cartões hoje
    const fetchCardMovementsToday = async () => {
        try {
            if (devices.length === 0) {
                setMoveCard([]);
                return;
            }

            const promises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId, device.serialNumber, formatDateToStartOfDay(currentDate), formatDateToEndOfDay(currentDate));
            });

            const allData = await Promise.all(promises);

            const validData = allData.filter(data => Array.isArray(data) && data.length > 0);

            const combinedData = validData.flat();

            setMoveCard(combinedData);

            setStartDate(formatDateToStartOfDay(currentDate));
            setEndDate(formatDateToEndOfDay(currentDate));
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos de cartões hoje:', error);
            setMoveCard([]);
        }
    };

    // Função para buscar os pagamentos dos terminais de ontem
    const fetchCardMovementsForPreviousDay = async () => {
        const prevDate = new Date(startDate);
        prevDate.setDate(prevDate.getDate() - 1);

        const start = formatDateToStartOfDay(prevDate);
        const end = formatDateToEndOfDay(prevDate);

        try {
            if (devices.length === 0) {
                setMoveCard([]);
                return;
            }

            const promises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId, device.serialNumber, start, end);
            });

            const allData = await Promise.all(promises);

            const validData = allData.filter(data => Array.isArray(data) && data.length > 0);

            const combinedData = validData.flat();

            setMoveCard(combinedData);

            setStartDate(start);
            setEndDate(end);
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos de cartões ontem:', error);
            setMoveCard([]);
        }
    };

    // Função para buscar os pagamentos dos terminais de amanhã
    const fetchCardMovementsForNextDay = async () => {
        const newDate = new Date(endDate);
        newDate.setDate(newDate.getDate() + 1);

        if (newDate > new Date()) {
            console.error("Não é possível buscar movimentos para uma data no futuro.");
            return;
        }

        const start = formatDateToStartOfDay(newDate);
        const end = formatDateToEndOfDay(newDate);

        try {
            if (devices.length === 0) {
                setMoveCard([]);
                return;
            }

            const promises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId, device.serialNumber, start, end);
            });

            const allData = await Promise.all(promises);

            const validData = allData.filter(data => Array.isArray(data) && data.length > 0);

            const combinedData = validData.flat();

            setMoveCard(combinedData);

            setStartDate(start);
            setEndDate(end);
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos de cartões amanhã:', error);
            setMoveCard([]);
        }
    };

    // Busca os movimentos dos cartões ao carregar a página
    useEffect(() => {
        fetchAllMoveCard();
    }, []);

    // Função para atualizar um funcionário e um cartão
    const updateEmployeeAndCard = async (employee: Employee) => {
        await handleUpdateEmployee(employee);
        window.location.reload();
    };

    // Função para atualizar as publicidades
    const refreshMoveCard = () => {
        fetchAllMoveCard();
        setStartDate(formatDateToStartOfDay(pastDate));
        setEndDate(formatDateToEndOfDay(currentDate));
        setClearSelectionToggle((prev) => !prev);
    };

    // Função para abrir a auxiliar
    const handleOpenAuxOut = async (SaveData: SaveData) => {
        const { deviceSN, auxData } = SaveData;
        try {
            const data = await apiService.openAuxDoor({ deviceSN, auxData });
            toast.success(data.message || 'Torniquete aberto com sucesso!');
        } catch (error) {
            console.error('Erro ao abrir a auxiliar:', error);
        }
        setShowAuxOutModal(false);
        setLoadingAuxOut(false);
    }

    // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
    useEffect(() => {
        if (selectedDevicesIds.length > 0) {
            const employeeShortNames = selectedDevicesIds.map(employeeId => {
                const employee = employees.find(emp => emp.employeeID === employeeId);
                return employee ? employee.shortName : null;
            }).filter(name => name !== null);

            const filtered = moveCard.filter(listMovement =>
                employeeShortNames.includes(listMovement.nameUser)
            );
            setFilteredDevices(filtered);
        } else {
            setFilteredDevices(moveCard);
        }
    }, [selectedDevicesIds, moveCard]);

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
    const filteredDataTable = filteredDevices.filter(moveCards =>
        new Date(moveCards.eventTime) >= new Date(startDate) && new Date(moveCards.eventTime) <= new Date(endDate) &&
        Object.keys(filters).every(key =>
            filters[key] === "" || (moveCards[key] != null && String(moveCards[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(moveCards).some(([key, value]) => {
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
                        return 'Torniquete';
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
    const moveCardWithNames = moveCard.map(transformTransactionWithNames);

    // Transforma as linhas selecionadas com nomes substituídos
    const selectedRowsWithNames = selectedRows.map(transformTransactionWithNames);

    // Calcula o valor total dos movimentos
    const totalAmount = filteredDataTable.length;

    // Função para abrir o modal para escolher porta
    const openAuxOutModal = () => {
        setShowAuxOutModal(true);
        setLoadingAuxOut(true);
    };

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
                            <span style={{ color: '#009739' }}>Movimentos do Torniquete</span>
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
                                    <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshMoveCard} />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Adicionar</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Colunas</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                                </OverlayTrigger>
                                <ExportButton allData={moveCardWithNames} selectedData={selectedRows.length > 0 ? selectedRowsWithNames : moveCardWithNames} fields={getSelectedFields()} />
                                <PrintButton data={selectedRows.length > 0 ? selectedRowsWithNames : moveCardWithNames} fields={getSelectedFields()} />
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Braço</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-arrow-bar-down" onClick={openAuxOutModal} />
                                </OverlayTrigger>
                            </div>
                            <div className="date-range-search">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Torniquete Dia Anterior</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-arrow-left-circle" onClick={fetchCardMovementsForPreviousDay} iconSize='1.1em' />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Torniquete Hoje</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-calendar-event" onClick={fetchCardMovementsToday} iconSize='1.1em' />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Torniquete Dia Seguinte</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-arrow-right-circle" onClick={fetchCardMovementsForNextDay} iconSize='1.1em' disabled={new Date(endDate) >= new Date(new Date().toISOString().substring(0, 10))} />
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
                                    <CustomOutlineButton icon="bi-search" onClick={fetchMovementCardBetweenDates} iconSize='1.1em' />
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
                            <strong>Movimentos do Torniquete: </strong>{totalAmount}
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
            <CreateModalNewCard
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={addNewCard}
                fields={newTransactionCardFields}
                title="Adicionar Picagem Manual"
            />
            {loadingAuxOut && (
                <AuxOutModal
                    title="Escolha a Auxiliar para Abrir"
                    open={showAuxOutModal}
                    onClose={() => {
                        setShowAuxOutModal(false);
                        setLoadingAuxOut(false);
                    }}
                    onSave={handleOpenAuxOut}
                    fields={auxOutFields}
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