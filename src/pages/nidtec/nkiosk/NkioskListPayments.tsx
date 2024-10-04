import DataTable, { TableColumn } from "react-data-table-component";
import { useColor } from "../../../context/ColorContext";
import { NavBar } from "../../../components/NavBar";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { Footer } from "../../../components/Footer";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { SelectFilter } from "../../../components/SelectFilter";
import { useEffect, useMemo, useState } from "react";
import * as apiService from "../../../helpers/apiService";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { KioskTransactionMB, } from "../../../helpers/Types";
import { transactionMBFields } from "../../../helpers/Fields";
import { ExportButton } from "../../../components/ExportButton";
import { Line } from "react-chartjs-2";

// URL base das imagens
const baseURL = "https://localhost:9090/";

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T00:00`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T23:59`;
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
    const currentDate = new Date();
    const [listPayments, setListPayments] = useState<KioskTransactionMB[]>([]);
    const [listPaymentMB, setListPaymentMB] = useState<KioskTransactionMB[]>([]);
    const [listPaymentCoin, setListPaymentCoin] = useState<KioskTransactionMB[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['eventTime', 'timestamp', 'transactionType']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(currentDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [selectedRows, setSelectedRows] = useState<KioskTransactionMB[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [lineChartData, setLineChartData] = useState<ChartData>({ labels: [], datasets: [] });
    const eventDoorId = '1';
    const eventDoorId2 = '2';
    const deviceSN = 'AGB7234900595';

    // Função para buscar as listagens de pagamentos em MB
    const fetchAllListPaymentsMB = async () => {
        try {
            const data = await apiService.fetchKioskTransactionsByMBAndDeviceSN(eventDoorId, deviceSN);
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
            const data = await apiService.fetchKioskTransactionsByPayCoins(eventDoorId2, deviceSN);
            if (Array.isArray(data)) {
                setListPaymentCoin(data);
            } else {
                setListPaymentCoin([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de listagem de pagamentos por moedas:', error);
        }
    }

    // Função para buscar os pagamentos dos terminais entre datas
    const fetchPaymentsBetweenDates = async () => {
        try {
            const data = await apiService.fetchKioskTransactionsByMBAndDeviceSN(eventDoorId, deviceSN, startDate, endDate);
            const dataCoin = await apiService.fetchKioskTransactionsByEventDoorIdAndDeviceSNAsync(eventDoorId2, deviceSN, startDate, endDate);
            if (Array.isArray(data)) {
                setListPaymentMB(data);
                setListPaymentCoin(dataCoin);
            } else {
                setListPaymentMB([]);
                setListPaymentCoin([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de listagem de pagamentos:', error);
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
    }, []);

    // Função para atualizar as listagens de pagamentos
    const refreshListPayments = () => {
        fetchAllListPaymentsMB();
        fetchAllListPaymentsCoins();
        setClearSelectionToggle(!clearSelectionToggle);
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
        setSelectedColumns(['eventTime', 'timestamp', 'transactionType']);
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
        return listPayments.filter(listPayment =>
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
    }, [listPayments, filters, filterText]);

    // Define as colunas da tabela
    const columns: TableColumn<KioskTransactionMB>[] = transactionMBFields
        .filter(field => selectedColumns.includes(field.key))
        .map((field) => {
            const formatField = (row: KioskTransactionMB) => {
                switch (field.key) {
                    case 'transactionType':
                        return row.transactionType === 1 ? 'Terminal' : 'Moedeiro';
                    case 'timestamp':
                        return row.timestamp ? new Date(row.timestamp).toLocaleString() : '';
                    case 'clientTicket':
                    case 'merchantTicket':
                        const imageUrl = row[field.key];
                        if (imageUrl) {
                            const uploadPath = imageUrl.substring(imageUrl.indexOf('/Uploads'));
                            const fullImageUrl = `${baseURL}${uploadPath}`;
                            return (
                                <a href={fullImageUrl} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={fullImageUrl}
                                        alt={field.label}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    />
                                </a>
                            );
                        } else {
                            return 'Sem Ticket';
                        }
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredDataTable} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
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

    // Calcula o montante total de pagamentos por mês
    const calculateMonthlyTotals = (transactions: KioskTransactionMB[]) => {
        const monthlyTotals = Array(12).fill(0);
        transactions.forEach(transaction => {
            if (transaction.timestamp && transaction.amount) {
                const date = new Date(transaction.timestamp);
                const month = date.getMonth();
                const amount = parseFloat(transaction.amount.replace(',', '.'));
                if (!isNaN(amount)) {
                    monthlyTotals[month] += amount;
                }
            }
        });
        return monthlyTotals;
    };

    // Atualiza os dados do gráfico com base nos pagamentos filtrados
    useEffect(() => {
        const monthlyTotals = calculateMonthlyTotals(listPayments);
        console.log(monthlyTotals);
        const newLineData = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [
                {
                    label: 'Total de Pagamentos por Mês',
                    data: monthlyTotals,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }
            ]
        };
        setLineChartData(newLineData);
    }, [listPayments]);

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='filter-refresh-add-edit-upper-class'>
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
                        <ExportButton allData={listPayments} selectedData={selectedRows} fields={transactionMBFields} />
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
                        <CustomOutlineButton icon="bi-search" onClick={fetchPaymentsBetweenDates} iconSize='1.1em' />
                    </div>
                </div>
            </div>
            <div className='content-wrapper-payment'>
                <div className="chart-container">
                    <div className="departments-groups-chart" style={{ flex: 1 }}>
                        <h2 className="departments-groups-chart-text">Total de Pagamentos: { }</h2>
                        <Line className="departments-groups-chart-data" data={lineChartData} style={{ marginLeft: 50 }} />
                    </div>
                </div>
                <div className="chart-container" style={{ flex: 1, overflowX: 'auto' }}>
                    <DataTable
                        columns={columns}
                        data={filteredDataTable}
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                        paginationComponentOptions={paginationOptions}
                        selectableRows
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={clearSelectionToggle}
                        selectableRowsHighlight
                        noDataComponent="Não há dados disponíveis para exibir."
                        customStyles={customStyles}
                    />
                    <div style={{ marginLeft: 30 }}>
                        <strong>Valor Total: </strong>{totalAmount.toFixed(2)}€
                    </div>
                </div>
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
    );
}