import DataTable, { TableColumn } from "react-data-table-component";
import { useNavbar } from "../../../context/NavbarContext";
import { NavBar } from "../../../components/NavBar";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { Footer } from "../../../components/Footer";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { SelectFilter } from "../../../components/SelectFilter";
import { useContext, useEffect, useMemo, useState } from "react";
import * as apiService from "../../../helpers/apiService";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { KioskTransactionMB } from "../../../helpers/Types";
import { transactionMBFields } from "../../../helpers/Fields";
import { ExportButton } from "../../../components/ExportButton";
import Split from "react-split";
import { TerminalsContext, DeviceContextType, TerminalsProvider } from "../../../context/TerminalsContext";
import { PrintButton } from "../../../components/PrintButton";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { TextFieldProps, TextField } from "@mui/material";
import { useKiosk } from "../../../context/KioskContext";
import { TreeViewDataNkioskPay } from "../../../components/TreeViewNkioskPay";

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

export const NkioskListPayments = () => {
    const { navbarColor, footerColor } = useNavbar();
    const { devices, mbDevices, fetchAllDevices, fetchAllMBDevices } = useContext(TerminalsContext) as DeviceContextType;
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    const { payTerminal, fetchAllPayTerminal, payCoins, fetchAllPayCoins } = useKiosk();
    const [listPayments, setListPayments] = useState<KioskTransactionMB[]>([]);
    const [listPaymentMB, setListPaymentMB] = useState<KioskTransactionMB[]>([]);
    const [listPaymentCoin, setListPaymentCoin] = useState<KioskTransactionMB[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['timestamp', 'transactionType', 'amount', 'statusMessage', 'deviceSN']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [selectedRows, setSelectedRows] = useState<KioskTransactionMB[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<KioskTransactionMB[]>([]);
    const eventDoorId = '2';

    // Função para buscar os pagamentos dos terminais
    const settingVariables = () => {
        setListPaymentMB(payTerminal);
        setListPaymentCoin(payCoins);
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

    // Busca os pagamentos dos terminais
    useEffect(() => {
        fetchAllPayTerminal();
        fetchAllPayCoins();
        fetchAllDevices();
        fetchAllMBDevices();
    }, []);

    // Atualiza a lista de pagamentos ao receber novos dados
    useEffect(() => {
        settingVariables();
        mergePaymentData();
    }, [payTerminal, payCoins]);

    // Função para atualizar as listagens de pagamentos
    const refreshListPayments = () => {
        fetchAllPayTerminal();
        fetchAllPayCoins();
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
        setSelectedColumns(['timestamp', 'transactionType', 'amount', 'statusMessage', 'deviceSN']);
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
        const sortedSelectedRows = state.selectedRows.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setSelectedRows(sortedSelectedRows);
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Filtra os dados da tabela
    const filteredDataTable = useMemo(() => {
        return filteredDevices.filter(listPayment =>
            new Date(listPayment.timestamp) >= new Date(startDate) && new Date(listPayment.timestamp) <= new Date(endDate) &&
            Object.keys(filters).every(key =>
                filters[key] === "" || (listPayment[key] != null && String(listPayment[key]).toLowerCase().includes(filters[key].toLowerCase()))
            ) &&
            (filterText === '' || Object.entries(listPayment).some(([key, value]) => {
                if (key === 'transactionType') {
                    const typeText = value === 1 ? 'Multibanco' : 'Moedeiro';
                    return typeText.toLowerCase().includes(filterText.toLowerCase());
                }
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
            }))
        ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }, [listPayments, filters, filterText, filteredDevices, startDate, endDate]);

    // Define as colunas da tabela
    const columns: TableColumn<KioskTransactionMB>[] = transactionMBFields
        .filter(field => selectedColumns.includes(field.key))
        .sort((a, b) => { if (a.key === 'timestamp') return -1; else if (b.key === 'timestamp') return 1; else return 0; })
        .map((field) => {
            const formatField = (row: KioskTransactionMB) => {
                switch (field.key) {
                    case 'tpId':
                        const terminalMatch = mbDevices.find(terminal => terminal.id === row.tpId)
                        const terminalName = terminalMatch?.nomeQuiosque || '';
                        return terminalName || '';
                    case 'deviceSN':
                        return devices.find(device => device.serialNumber === row.deviceSN)?.deviceName || '';
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
                                <a style={{ color: "black", textDecoration: 'none' }} href={fullImageUrl} target="_blank" rel="noopener noreferrer">
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
    const transformTransactionWithNames = (transaction: { tpId: string; deviceSN: string; amount: any; }) => {
        const terminalMatch = mbDevices.find(terminal => terminal.id === transaction.tpId);
        const terminalName = terminalMatch?.nomeQuiosque || '';

        const deviceMatch = devices.find(device => device.serialNumber === transaction.deviceSN);
        const deviceName = deviceMatch?.deviceName || '';

        return {
            ...transaction,
            tpId: terminalName,
            deviceSN: deviceName,
            amount: `${transaction.amount}€`,
        };
    };

    // Transforma os dados dos pagamentos com nomes substituídos
    const listTerminalsWithNames = listPayments.map(transformTransactionWithNames);

    // Transforma as linhas selecionadas com nomes substituídos
    const selectedRowsWithNames = selectedRows.map(transformTransactionWithNames);

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return transactionMBFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <TerminalsProvider>
            <div className="main-container">
                <NavBar style={{ backgroundColor: navbarColor }} />
                <div className='content-container'>
                    <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                        <div className="treeview-container">
                            <TreeViewDataNkioskPay onSelectDevices={handleSelectFromTreeView} />
                        </div>
                        <div className="datatable-container">
                            <div className="datatable-title-text">
                                <span style={{ color: '#009739' }}>Recebimentos Totais</span>
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
                                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshListPayments} />
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip className="custom-tooltip">Colunas</Tooltip>}
                                    >
                                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                                    </OverlayTrigger>
                                    <ExportButton allData={listTerminalsWithNames} selectedData={selectedRows.length > 0 ? selectedRowsWithNames : listTerminalsWithNames} fields={getSelectedFields()} />
                                    <PrintButton data={selectedRows.length > 0 ? selectedRowsWithNames : listTerminalsWithNames} fields={getSelectedFields()} />
                                </div>
                                <div className="date-range-search">
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
                                        <CustomOutlineButton icon="bi-search" onClick={fetchPaymentsBetweenDates} iconSize='1.1em' />
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
                                    defaultSortFieldId="timestamp"
                                />
                                <div style={{ marginLeft: 10, marginTop: -5 }}>
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