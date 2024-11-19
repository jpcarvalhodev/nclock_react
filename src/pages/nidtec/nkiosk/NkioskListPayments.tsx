import DataTable, { TableColumn } from "react-data-table-component";
import { useColor } from "../../../context/ColorContext";
import { NavBar } from "../../../components/NavBar";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { Footer } from "../../../components/Footer";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { SelectFilter } from "../../../components/SelectFilter";
import { useContext, useEffect, useMemo, useState } from "react";
import * as apiService from "../../../helpers/apiService";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { KioskTransactionMB, MBDevice, } from "../../../helpers/Types";
import { transactionMBFields } from "../../../helpers/Fields";
import { ExportButton } from "../../../components/ExportButton";
import Split from "react-split";
import { TerminalsContext, DeviceContextType, TerminalsProvider } from "../../../context/TerminalsContext";
import { PrintButton } from "../../../components/PrintButton";
import { TreeViewDataNkiosk } from "../../../components/TreeViewNkiosk";

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

// Define a interface ChartData
interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        fill: boolean;
        borderColor: string;
        tension: number;
    }[];
}

export const NkioskListPayments = () => {
    const { navbarColor, footerColor } = useColor();
    const { devices, fetchAllMBDevices } = useContext(TerminalsContext) as DeviceContextType;
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    const [listPayments, setListPayments] = useState<KioskTransactionMB[]>([]);
    const [listPaymentMB, setListPaymentMB] = useState<KioskTransactionMB[]>([]);
    const [listPaymentCoin, setListPaymentCoin] = useState<KioskTransactionMB[]>([]);
    const [terminalData, setTerminalData] = useState<MBDevice[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['timestamp', 'transactionType', 'amount', 'tpId', 'deviceSN']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [selectedRows, setSelectedRows] = useState<KioskTransactionMB[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<KioskTransactionMB[]>([]);
    const eventDoorId = '2';

    // Função para buscar as listagens de pagamentos em MB
    const fetchAllListPaymentsMB = async () => {
        try {
            const data = await apiService.fetchKioskTransactionsByMBAndDeviceSN();
            if (Array.isArray(data)) {
                setListPaymentMB(data);
            } else {
                setListPaymentMB([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de listagem de pagamentos pelo terminal:', error);
        }
    };

    // Função para buscar as listagens de pagamentos em moedas
    const fetchAllListPaymentsCoins = async () => {
        try {
            if (devices.length === 0) {
                setListPaymentCoin([]);
                return;
            }

            const promises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsByPayCoins(eventDoorId, device.serialNumber, startDate, endDate);
            });

            const allData = await Promise.all(promises);

            const validData = allData.filter(data => Array.isArray(data) && data.length > 0);

            const combinedData = validData.flat();

            setListPaymentCoin(combinedData);
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos de cartões:', error);
            setListPaymentCoin([]);
        }
    }

    // Função para buscar as listagens de pagamentos entre datas
    const fetchPaymentsBetweenDates = async () => {
        try {
            if (devices.length === 0) {
                setListPaymentMB([]);
                setListPaymentCoin([]);
                return;
            }

            const mbPromises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsByMBAndDeviceSN(startDate, endDate);
            });

            const coinPromises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsByPayCoins(eventDoorId, device.serialNumber, startDate, endDate);
            });

            const allMBData = await Promise.all(mbPromises);
            const allCoinData = await Promise.all(coinPromises);

            const validMBData = allMBData.filter(data => Array.isArray(data) && data.length > 0);
            const combinedMBData = validMBData.flat();

            const validCoinData = allCoinData.filter(data => Array.isArray(data) && data.length > 0);
            const combinedCoinData = validCoinData.flat();

            setListPaymentMB(combinedMBData);
            setListPaymentCoin(combinedCoinData);
        } catch (error) {
            console.error('Erro ao buscar os dados de listagem de pagamentos:', error);
            setListPaymentMB([]);
            setListPaymentCoin([]);
        }
    }

    // Função para buscar os dados dos terminais
    const fetchTerminalData = async () => {
        try {
            const data = await fetchAllMBDevices();
            if (Array.isArray(data)) {
                setTerminalData(data);
            } else {
                setTerminalData([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados dos terminais:', error);
        }
    }

    // Unifica os dados de transações MB e moedas
    const mergePaymentData = () => {
        const unifiedData: KioskTransactionMB[] = [
            ...listPaymentMB.map((payment) => ({
                id: payment.id,
                transactionType: payment.transactionType,
                amount: payment.amount,
                statusCode: payment.statusCode,
                statusMessage: payment.statusMessage,
                clientTicket: payment.clientTicket,
                merchantTicket: payment.merchantTicket,
                email: payment.email,
                timestamp: payment.timestamp,
                tpId: payment.tpId,
                deviceSN: payment.deviceSN,
            })),
            ...listPaymentCoin.map((payment) => ({
                id: payment.id,
                transactionType: payment.transactionType,
                amount: payment.amount,
                statusCode: payment.statusCode,
                statusMessage: payment.statusMessage,
                clientTicket: payment.clientTicket,
                merchantTicket: payment.merchantTicket,
                email: payment.email,
                timestamp: payment.timestamp,
                tpId: payment.tpId,
                deviceSN: payment.deviceSN,
            }))
        ];

        setListPayments(unifiedData);
    };

    // Atualiza a lista de pagamentos ao receber novos dados
    useEffect(() => {
        mergePaymentData();
    }, [listPaymentMB, listPaymentCoin]);

    // Busca as listagens de pagamentos ao carregar a página
    useEffect(() => {
        fetchAllListPaymentsMB();
        fetchAllListPaymentsCoins();
        fetchTerminalData();
    }, [devices]);

    // Função para atualizar as listagens de pagamentos
    const refreshListPayments = () => {
        fetchAllListPaymentsMB();
        fetchAllListPaymentsCoins();
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
    useEffect(() => {
        if (selectedDevicesIds.length > 0) {
            const filtered = listPayments.filter(payTerminals => selectedDevicesIds.includes(payTerminals.deviceSN) || selectedDevicesIds.includes(payTerminals.tpId));
            setFilteredDevices(filtered);
        } else {
            setFilteredDevices(listPayments);
        }
    }, [selectedDevicesIds, listPayments]); 

    // Define a seleção da árvore
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        setSelectedDevicesIds(selectedIds);
    };

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
        setSelectedColumns(['timestamp', 'transactionType', 'amount', 'tpId', 'deviceSN']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Define a função de seleção de linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: KioskTransactionMB[];
    }) => {
        setSelectedRows(state.selectedRows);
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Filtra os dados da tabela
    const filteredDataTable = useMemo(() => {
        return filteredDevices.filter(listPayment =>
            Object.keys(filters).every(key =>
                filters[key] === "" || (listPayment[key] != null && String(listPayment[key]).toLowerCase().includes(filters[key].toLowerCase()))
            ) &&
            Object.values(listPayment).some(value => {
                if (value == null) {
                    return false;
                } else if (typeof value === 'number') {
                    return value.toString().includes(filterText);
                } else if (value instanceof Date) {
                    return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
                } else if (typeof value === 'string') {
                    return value.toLowerCase().includes(filterText.toLowerCase());
                }
                return false;
            }));
    }, [listPayments, filters, filterText, filteredDevices]);

    // Define as colunas da tabela
    const columns: TableColumn<KioskTransactionMB>[] = transactionMBFields
        .filter(field => selectedColumns.includes(field.key))
        .sort((a, b) => { if (a.key === 'timestamp') return -1; else if (b.key === 'timestamp') return 1; else return 0; })
        .map((field) => {
            const formatField = (row: KioskTransactionMB) => {
                switch (field.key) {
                    case 'tpId':
                        const terminalMatch = terminalData.find(terminal => terminal.id === row.tpId)
                        const terminalName = terminalMatch?.nomeQuiosque || '';
                        return terminalName || 'Clérigos Moedeiro';
                    case 'deviceSN':
                        return devices.find(device => device.serialNumber === row.deviceSN)?.deviceName || 'Sem Dados';
                    case 'transactionType':
                        return row.transactionType === 1 ? 'Multibanco' : 'Moedeiro';
                    case 'timestamp':
                        return new Date(row.timestamp).toLocaleString() || '';
                    case 'amount':
                        return `${row[field.key]}€`;
                    case 'clientTicket':
                    case 'merchantTicket':
                        const imageUrl = row[field.key];
                        if (imageUrl) {
                            const uploadPath = imageUrl.substring(imageUrl.indexOf('/Uploads'));
                            const fullImageUrl = `${apiService.baseURL}${uploadPath}`;
                            return (
                                <a href={fullImageUrl} target="_blank" rel="noopener noreferrer">
                                    Visualizar ticket
                                </a>
                            );
                        } else {
                            return '';
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
                sortFunction: (rowA, rowB) => new Date(rowB.timestamp).getTime() - new Date(rowA.timestamp).getTime()
            };
        });

    // Calcula o valor total dos pagamentos no terminal
    const totalAmountTransactions = filteredDataTable.reduce((total, transaction) => {
        const amount = transaction.amount ? String(transaction.amount) : '0';
        return total + (typeof transaction.amount === 'number' ? transaction.amount : parseFloat(amount) || 0);
    }, 0);

    // Calcula o valor total dos pagamentos no moedeiro
    const totalAmountFixed = filteredDataTable.length * 0.50;

    // Calcula o total do valor dos pagamentos
    const totalAmount = totalAmountTransactions + totalAmountFixed;

    // Função para gerar os dados com nomes substituídos para o export/print
    const payTerminalsCoinsWithNames = listPayments.map(transaction => {
        const terminalMatch = terminalData.find(terminal => terminal.id === transaction.tpId);
        const terminalName = terminalMatch?.nomeQuiosque || 'Sem Dados';

        const deviceMatch = devices.find(device => device.serialNumber === transaction.deviceSN);
        const deviceName = deviceMatch?.deviceName || 'Sem Dados';

        return {
            ...transaction,
            tpId: terminalName,
            deviceSN: deviceName,
            amount: `${transaction.amount}€`,
        };
    });

    return (
        <TerminalsProvider>
            <div className="main-container">
                <NavBar style={{ backgroundColor: navbarColor }} />
                <div className='content-container'>
                    <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                        <div className="treeview-container">
                            <TreeViewDataNkiosk onSelectDevices={handleSelectFromTreeView} />
                        </div>
                        <div className="datatable-container">
                            <div className="datatable-title-text">
                                <span style={{ color: '#009739' }}>Listagem de Pagamentos</span>
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
                                    <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshListPayments} />
                                    <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                                    <ExportButton allData={payTerminalsCoinsWithNames} selectedData={selectedRows} fields={transactionMBFields} />
                                    <PrintButton data={payTerminalsCoinsWithNames} fields={transactionMBFields} />
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
                                    <CustomOutlineButton icon="bi-search" onClick={fetchPaymentsBetweenDates} iconSize='1.1em' />
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
                                    defaultSortFieldId="timestamp"
                                />
                                <div style={{ marginLeft: 10 }}>
                                    <strong>Valor Total: </strong>{totalAmount.toFixed(2)}€
                                </div>
                            </div>
                        </div>
                    </Split>
                </div>
                <Footer style={{ backgroundColor: footerColor }} />
                {openColumnSelector && (
                    <ColumnSelectorModal
                        columns={transactionMBFields}
                        selectedColumns={selectedColumns}
                        onClose={() => setOpenColumnSelector(false)}
                        onColumnToggle={toggleColumn}
                        onResetColumns={resetColumns}
                        onSelectAllColumns={onSelectAllColumns}
                    />
                )}
            </div>
        </TerminalsProvider>
    );
}