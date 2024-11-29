import DataTable, { TableColumn } from "react-data-table-component";
import { useColor } from "../../../context/ColorContext";
import { NavBar } from "../../../components/NavBar";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { Footer } from "../../../components/Footer";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { SelectFilter } from "../../../components/SelectFilter";
import { useContext, useEffect, useState } from "react";
import * as apiService from "../../../helpers/apiService";
import { KioskTransactionCard } from "../../../helpers/Types";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { auxOutFields, transactionCardFields } from "../../../helpers/Fields";
import { ExportButton } from "../../../components/ExportButton";
import Split from "react-split";
import { TerminalsContext, DeviceContextType, TerminalsProvider } from "../../../context/TerminalsContext";
import { PrintButton } from "../../../components/PrintButton";
import { useLocation } from "react-router-dom";
import { AuxOutModal } from "../../../modals/AuxOutModal";
import { toast } from "react-toastify";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { TreeViewDataNkioskDisp } from "../../../components/TreeViewNkioskDisp";

// Define a interface SaveData
interface SaveData {
    deviceSN: string;
    auxData: FormData;
}

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

export const NkioskMoveCard = () => {
    const { navbarColor, footerColor } = useColor();
    const { devices, fetchAllDevices } = useContext(TerminalsContext) as DeviceContextType;
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    const [moveCard, setMoveCard] = useState<KioskTransactionCard[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['eventTime', 'nameUser', 'pin', 'eventDoorId', 'deviceSN']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [selectedRows, setSelectedRows] = useState<KioskTransactionCard[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<KioskTransactionCard[]>([]);
    const [showAuxOutModal, setShowAuxOutModal] = useState(false);
    const [loadingAuxOut, setLoadingAuxOut] = useState(false);
    const location = useLocation();
    const eventDoorId = '3';

    // Função para buscar os movimentos dos cartões
    const fetchAllMoveCard = async () => {
        try {
            if (devices.length === 0) {
                setMoveCard([]);
                return;
            }

            const promises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId, device.serialNumber);
            });

            const allData = await Promise.all(promises);

            const validData = allData.filter(data => Array.isArray(data) && data.length > 0);

            const combinedData = validData.flat();

            setMoveCard(combinedData);
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos de cartões:', error);
            setMoveCard([]);
        }
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
            console.error('Erro ao buscar os dados de movimentos de cartões:', error);
            setMoveCard([]);
        }
    };

    // Busca as publicidades ao carregar a página
    useEffect(() => {
        const fetchDevices = async () => {
            const data = await fetchAllDevices();
            if (data.length > 0) {
                fetchAllMoveCard();
            }
        }
        fetchDevices();
    }, [location]);

    // Função para atualizar as publicidades
    const refreshMoveCard = () => {
        fetchAllMoveCard();
        setClearSelectionToggle(!clearSelectionToggle);
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
            const filtered = moveCard.filter(moveCards => selectedDevicesIds.includes(moveCards.deviceSN));
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
        setSelectedColumns(['eventTime', 'nameUser', 'pin', 'eventDoorId', 'deviceSN']);
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
        Object.keys(filters).every(key =>
            filters[key] === "" || (moveCards[key] != null && String(moveCards[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.values(moveCards).some(value => {
            if (value == null) {
                return false;
            } else if (value instanceof Date) {
                return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
            } else {
                return value.toString().toLowerCase().includes(filterText.toLowerCase());
            }
        })
    )
    .sort((a, b) => new Date(b.eventTime).getTime() - new Date(a.eventTime).getTime());

    // Define as colunas da tabela
    const columns: TableColumn<KioskTransactionCard>[] = transactionCardFields
        .filter(field => selectedColumns.includes(field.key))
        .sort((a, b) => (a.key === 'eventTime' ? -1 : b.key === 'eventTime' ? 1 : 0))
        .map(field => {
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
        const deviceName = deviceMatch?.deviceName || 'Sem Dados';
    
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

    return (
        <TerminalsProvider>
            <div className="main-container">
                <NavBar style={{ backgroundColor: navbarColor }} />
                <div className='content-container'>
                    <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                        <div className="treeview-container">
                            <TreeViewDataNkioskDisp onSelectDevices={handleSelectFromTreeView} />
                        </div>
                        <div className="datatable-container">
                            <div className="datatable-title-text">
                                <span style={{ color: '#009739' }}>Movimentos do Torniquete</span>
                            </div>
                            <div className="datatable-header">
                                <div>
                                    <input
                                        className='search-input'
                                        type="text"
                                        placeholder="Pesquisa"
                                        value={filterText}
                                        onChange={e => setFilterText(e.target.value)}
                                    />
                                </div>
                                <div className="buttons-container-others">
                                    <OverlayTrigger
                                        placement="left"
                                        overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
                                    >
                                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshMoveCard} />
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="left"
                                        overlay={<Tooltip className="custom-tooltip">Colunas</Tooltip>}
                                    >
                                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                                    </OverlayTrigger>
                                    <ExportButton allData={moveCardWithNames} selectedData={selectedRows.length > 0 ? selectedRowsWithNames : moveCardWithNames} fields={transactionCardFields} />
                                    <PrintButton data={selectedRows.length > 0 ? selectedRowsWithNames : moveCardWithNames} fields={transactionCardFields} />
                                    <OverlayTrigger
                                        placement="left"
                                        overlay={<Tooltip className="custom-tooltip">Abaixar</Tooltip>}
                                    >
                                        <CustomOutlineButton icon="bi bi-arrow-bar-down" onClick={openAuxOutModal} />
                                    </OverlayTrigger>
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
                                        placement="left"
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
                                    paginationPerPage={15}
                                    selectableRows
                                    onSelectedRowsChange={handleRowSelected}
                                    clearSelectedRows={clearSelectionToggle}
                                    selectableRowsHighlight
                                    noDataComponent="Não existem dados disponíveis para exibir."
                                    customStyles={customStyles}
                                    defaultSortAsc={true}
                                    defaultSortFieldId="eventTime"
                                />
                            </div>
                            <div style={{ marginLeft: 10 }}>
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
            </div>
        </TerminalsProvider>
    );
}