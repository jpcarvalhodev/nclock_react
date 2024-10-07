import DataTable, { TableColumn } from "react-data-table-component";
import { useColor } from "../../../context/ColorContext";
import { NavBar } from "../../../components/NavBar";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { Footer } from "../../../components/Footer";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { SelectFilter } from "../../../components/SelectFilter";
import { useEffect, useState } from "react";
import * as apiService from "../../../helpers/apiService";
import { KioskTransactionMB } from "../../../helpers/Types";
import { transactionMBFields } from "../../../helpers/Fields";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";
import Split from "react-split";
import { TreeViewDataNkiosk } from "../../../components/TreeViewNkiosk";

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

export const NkioskPayTerminal = () => {
    const { navbarColor, footerColor } = useColor();
    const currentDate = new Date();
    const [payTerminal, setPayTerminal] = useState<KioskTransactionMB[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['transactionType', 'amount', 'timestamp', 'statusMessage']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(currentDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [selectedRows, setSelectedRows] = useState<KioskTransactionMB[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<KioskTransactionMB[]>([]);
    const eventDoorId = '1';
    const deviceSN = 'AGB7234900595';

    // Função para buscar os pagamentos dos terminais
    const fetchAllPayTerminal = async () => {
        try {
            const data = await apiService.fetchKioskTransactionsByMBAndDeviceSN(eventDoorId, deviceSN);
            if (Array.isArray(data)) {
                setPayTerminal(data);
            } else {
                setPayTerminal([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de pagamento dos terminais:', error);
        }
    };

    // Função para buscar os pagamentos dos terminais entre datas
    const fetchPaymentsBetweenDates = async () => {
        try {
            const data = await apiService.fetchKioskTransactionsByMBAndDeviceSN(eventDoorId, deviceSN, startDate, endDate);
            if (Array.isArray(data)) {
                setPayTerminal(data);
            } else {
                setPayTerminal([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de pagamento dos terminais:', error);
        }
    }

    // Busca os pagamentos dos terminais ao carregar a página
    useEffect(() => {
        fetchAllPayTerminal();
    }, []);

    // Função para atualizar os pagamentos dos terminais
    const refreshPayTerminal = () => {
        fetchAllPayTerminal();
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
    useEffect(() => {
        if (selectedDevicesIds.length > 0) {
            const filtered = payTerminal.filter(payTerminals => selectedDevicesIds.includes(payTerminals.deviceSN));
            setFilteredDevices(filtered);
        } else {
            setFilteredDevices(payTerminal);
        }
    }, [selectedDevicesIds, payTerminal]);

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
        setSelectedColumns(['transactionType', 'amount', 'timestamp', 'statusMessage']);
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
        selectedRows: KioskTransactionMB[];
    }) => {
        setSelectedRows(state.selectedRows);
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define as colunas da tabela
    const columns: TableColumn<KioskTransactionMB>[] = transactionMBFields
        .filter(field => selectedColumns.includes(field.key))
        .sort((a, b) => { if (a.key === 'timestamp') return -1; else if (b.key === 'timestamp') return 1; else return 0; })
        .map(field => {
            const formatField = (row: KioskTransactionMB) => {
                switch (field.key) {
                    case 'timestamp':
                        return new Date(row[field.key]).toLocaleString() || '';
                    case 'transactionType':
                        return row[field.key] === 1 ? 'Multibanco' : 'Moedeiro';
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
                        <SelectFilter column={field.key} setFilters={setFilters} data={payTerminal} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Filtra os dados da tabela
    const filteredDataTable = filteredDevices.filter(payTerminals =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (payTerminals[key] != null && String(payTerminals[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.values(payTerminals).some(value => {
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
    const totalAmount = filteredDataTable.reduce((total, transaction) => {
        return total + (typeof transaction.amount === 'number' ? transaction.amount : parseFloat(transaction.amount) || 0);
    }, 0);

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='content-container'>
                <Split className='split' sizes={[20, 80]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewDataNkiosk onSelectDevices={handleSelectFromTreeView} />
                    </div>
                    <div className="datatable-container">
                        <div className="datatable-title-text">
                            <span style={{ color: '#009739' }}>Pagamentos no Terminal</span>
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
                                <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshPayTerminal} />
                                <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                                <ExportButton allData={payTerminal} selectedData={selectedRows} fields={transactionMBFields} />
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
                        <div className='table-css'>
                            <DataTable
                                columns={columns}
                                data={filteredDataTable}
                                pagination
                                paginationComponentOptions={paginationOptions}
                                selectableRows
                                onSelectedRowsChange={handleRowSelected}
                                clearSelectedRows={clearSelectionToggle}
                                selectableRowsHighlight
                                noDataComponent="Não há dados disponíveis para exibir."
                                customStyles={customStyles}
                            />
                        </div>
                        <div style={{ marginLeft: 30 }}>
                            <strong>Valor Total: </strong>{totalAmount.toFixed(2)}€
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
    );
}