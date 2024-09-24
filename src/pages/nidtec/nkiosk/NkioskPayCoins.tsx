import DataTable, { TableColumn } from "react-data-table-component";
import { useColor } from "../../../context/ColorContext";
import { NavBar } from "../../../components/NavBar";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { Footer } from "../../../components/Footer";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { SelectFilter } from "../../../components/SelectFilter";
import { useEffect, useState } from "react";
import * as apiService from "../../../helpers/apiService";
import { KioskTransaction } from "../../../helpers/Types";
import { transactionFields } from "../../../helpers/Fields";
import { customStyles } from "../../../components/CustomStylesDataTable";

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T00:00`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T23:59`;
}

export const NkioskPayCoins = () => {
    const { navbarColor, footerColor } = useColor();
    const currentDate = new Date();
    const [payCoins, setPayCoins] = useState<KioskTransaction[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['eventTime', 'eventDoorId', 'deviceSN']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(currentDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const eventDoorId = '2';
    const deviceSN = 'AGB7234900595';

    // Função para buscar os pagamentos no moedeiro
    const fetchAllPayCoins = async () => {
        try {
            const data = await apiService.fetchKioskTransactionsByEventDoorIdAndDeviceSNAsync(eventDoorId, deviceSN);
            if (Array.isArray(data)) {
                setPayCoins(data);
            } else {
                setPayCoins([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de pagamento de moedas:', error);
        }
    };

    // Função para buscar os pagamentos do moedeiro entre datas
    const fetchPaymentsCoinBetweenDates = async () => {
        try {
            const data = await apiService.fetchKioskTransactionsByEventDoorIdAndDeviceSNAsync(eventDoorId, deviceSN, startDate, endDate);
            if (Array.isArray(data)) {
                setPayCoins(data);
            } else {
                setPayCoins([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de pagamento de moedas:', error);
        }
    }

    // Busca os pagamentos no moedeiro ao carregar a página
    useEffect(() => {
        fetchAllPayCoins();
    }, []);

    // Função para atualizar os pagamentos no moedeiro
    const refreshAds = () => {
        fetchAllPayCoins();
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
        setSelectedColumns(['eventTime', 'eventDoorId', 'deviceSN']);
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

    // Define as colunas da tabela
    const columns: TableColumn<KioskTransaction>[] = transactionFields
        .filter(field => selectedColumns.includes(field.key))
        .concat({ key: 'value', label: 'Valor', type: 'string' })
        .map(field => {
            const formatField = (row: KioskTransaction) => {
                switch (field.key) {
                    case 'value':
                        return '0,50';
                    case 'eventDoorId':
                        return 'Moedeiro';
                    case 'eventTime':
                        return new Date(row[field.key]).toLocaleString() || '';
                    case 'createTime':
                        return new Date(row[field.key]).toLocaleString() || '';
                    case 'updateTime':
                        return new Date(row[field.key]).toLocaleString() || '';
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                name: (
                    <>
                        {field.label}
                        {field.key !== 'value' && <SelectFilter column={field.key} setFilters={setFilters} data={payCoins} />}
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Filtra os dados da tabela
    const filteredDataTable = payCoins.filter(payCoin =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (payCoin[key] != null && String(payCoin[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) && 
        Object.values(payCoin).some(value => {
            if (value == null) {
                return false;
            } else if (value instanceof Date) {
                return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
            } else {
                return value.toString().toLowerCase().includes(filterText.toLowerCase());
            }
        })
    );

    // Calcula o total do valor dos pagamentos
    const totalAmount = filteredDataTable.length * 0.50;  

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span style={{ color: '#009739' }}>Pagamentos Moedas</span>
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
                        <CustomOutlineButton icon="bi-search" onClick={fetchPaymentsCoinBetweenDates} iconSize='1.1em' />
                    </div>
                </div>
            </div>
            <div className='content-wrapper'>
                <div className='table-css'>
                    <DataTable
                        columns={columns}
                        data={filteredDataTable}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        noDataComponent="Não há dados disponíveis para exibir."
                        customStyles={customStyles}
                    />
                </div>
                <div className="total-amount">
                    <strong>Valor Total: </strong>{totalAmount.toFixed(2)}€
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={transactionFields}
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