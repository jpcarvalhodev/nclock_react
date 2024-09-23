import DataTable, { TableColumn } from "react-data-table-component";
import { useColor } from "../../../context/ColorContext";
import { NavBar } from "../../../components/NavBar";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { Footer } from "../../../components/Footer";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { SelectFilter } from "../../../components/SelectFilter";
import { useEffect, useState } from "react";
import * as apiService from "../../../helpers/apiService";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { KioskTransactionList, KioskTransactionMB, KioskTransactionMBCoin, } from "../../../helpers/Types";
import { transactionListFields, transactionMBFields } from "../../../helpers/Fields";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// URL base das imagens
const baseURL = "https://localhost:9090/";

export const NkioskListPayments = () => {
    const { navbarColor, footerColor } = useColor();
    const [listPayments, setListPayments] = useState<KioskTransactionMBCoin[]>([]);
    const [listPaymentMB, setListPaymentMB] = useState<KioskTransactionMB[]>([]);
    const [listPaymentCoin, setListPaymentCoin] = useState<KioskTransactionList[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['eventTime', 'timestamp', 'transactionType']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const eventDoorId = '1';
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
            console.error('Erro ao buscar os dados de listagem de pagamentos:', error);
        }
    };

    // Função para buscar as listagens de pagamentos em moedas
    const fetchAllListPaymentsCoins = async () => {
        try {
            const data = await apiService.fetchKioskTransactionDoorAsync();
            if (Array.isArray(data)) {
                const filteredData = data.filter(item => item.eventDoorId === 2);
                setListPaymentCoin(filteredData);
            } else {
                setListPaymentCoin([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de listagem de pagamentos:', error);
        }
    }

    // Unifica os dados de transações MB e moedas
    const mergePaymentData = () => {
        const unifiedData: KioskTransactionMBCoin[] = [
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
                eventTime: payment.eventTime,
                pin: payment.pin,
                cardNo: payment.cardNo,
                eventNo: payment.eventNo,
                eventName: payment.eventName,
                eventDoorId: payment.eventDoorId,
                eventDoorName: payment.eventDoorName,
                verifyModeNo: payment.verifyModeNo,
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
    const refreshAds = () => {
        fetchAllListPaymentsMB();
        fetchAllListPaymentsCoins();
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

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Filtra os dados da tabela
    const filteredDataTable = listPayments.filter(listPayment =>
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
        })
    );

    // Combina os campos para a tabela
    const combinedPayments = [...transactionMBFields, ...transactionListFields];

    // Define as colunas da tabela
    const columns: TableColumn<KioskTransactionMBCoin>[] = combinedPayments
        .filter(field => selectedColumns.includes(field.key))
        .concat([{ key: 'value', label: 'Valor', type: 'string' }])
        .map((field) => {
            const formatField = (row: KioskTransactionMBCoin) => {
                switch (field.key) {
                    case 'value':
                        return '0,50€';
                    case 'transactionType':
                        return row.transactionType === 'Terminal Pagamento' ? 'Terminal' : 'Moedeiro';
                    case 'eventDoorId':
                        return row.eventDoorId === 2 ? 'Moedeiro' : 'Terminal';
                    case 'timestamp':
                        return row.timestamp ? new Date(row.timestamp).toLocaleString() : '';
                    case 'eventDoorName':
                        return row.eventDoorId === 2 ? 'Moedeiro' : 'Terminal';
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
                        {field.key !== 'value' && <SelectFilter column={field.key} setFilters={setFilters} data={filteredDataTable} />}
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    const totalValue = listPayments.length * 0.50;

    const data = [
        { nome: 'Total Recebido - €', valor: totalValue }
    ];

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
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshAds} />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                    </div>
                </div>
            </div>
            <div className='content-wrapper-payment'>
                <div className='chart-container' style={{ flex: 1 }}>
                    <BarChart width={500} height={300} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="nome" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="valor" fill="#009739" />
                    </BarChart>
                </div>
                <div className='table-css' style={{ flex: 1, overflowX: 'auto' }}>
                    <DataTable
                        columns={columns}
                        data={filteredDataTable}
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                        paginationComponentOptions={paginationOptions}
                        noDataComponent="Não há dados disponíveis para exibir."
                        customStyles={customStyles}
                    />
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={combinedPayments}
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