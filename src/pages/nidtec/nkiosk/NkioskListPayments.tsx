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
import { KioskTransactionList } from "../../../helpers/Types";
import { transactionListFields } from "../../../helpers/Fields";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const NkioskListPayments = () => {
    const { navbarColor, footerColor } = useColor();
    const [listPayments, setListPayments] = useState<KioskTransactionList[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['eventTime', 'eventName', 'eventNo', 'eventDoorId']);
    const [filters, setFilters] = useState<Record<string, string>>({});

    // Função para buscar as listagens de pagamentos
    const fetchAllListPayments = async () => {
        try {
            const data = await apiService.fetchKioskTransactionDoorAsync();
            if (Array.isArray(data)) {
                const filteredData = data.filter(item => item.eventDoorId === 1 || item.eventDoorId === 2);
                setListPayments(filteredData);
            } else {
                setListPayments([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de listagem de pagamentos:', error);
        }
    };

    // Busca as listagens de pagamentos ao carregar a página
    useEffect(() => {
        fetchAllListPayments();
    }, []);

    // Função para atualizar as listagens de pagamentos
    const refreshAds = () => {
        fetchAllListPayments();
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
        setSelectedColumns(['eventTime', 'eventName', 'eventNo', 'eventDoorId']);
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
    const columns: TableColumn<KioskTransactionList>[] = transactionListFields
        .filter(field => selectedColumns.includes(field.key))
        .concat([{ key: 'value', label: 'Valor', type: 'string' }])
        .map((field) => {
            const formatField = (row: KioskTransactionList) => {
                switch (field.key) {
                    case 'value':
                        return '0,50€';
                    case 'eventDoorId':
                        return row.eventDoorId === 1 ? 'Terminal' : 'Moedeiro';
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                name: (
                    <>
                        {field.label}
                        {field.key !== 'value' && <SelectFilter column={field.key} setFilters={setFilters} data={listPayments} />}
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Filtra os dados da tabela
    const filteredDataTable = listPayments.filter(listPayment =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (listPayment[key] != null && String(listPayment[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.values(listPayment).some(value => {
            if (value == null) {
                return false;
            } else if (value instanceof Date) {
                return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
            } else {
                return value.toString().toLowerCase().includes(filterText.toLowerCase());
            }
        })
    );

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
                <div className='table-css' style={{ flex: 1 }}>
                    <DataTable
                        columns={columns}
                        data={filteredDataTable}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        noDataComponent="Não há dados disponíveis para exibir."
                        customStyles={customStyles}
                    />
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={transactionListFields}
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