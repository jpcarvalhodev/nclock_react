import DataTable, { TableColumn } from "react-data-table-component";
import { useColor } from "../../../context/ColorContext";
import { NavBar } from "../../../components/NavBar";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { Footer } from "../../../components/Footer";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { SelectFilter } from "../../../components/SelectFilter";
import { useContext, useEffect, useState } from "react";
import * as apiService from "../../../helpers/apiService";
import { Devices, KioskTransactionMB } from "../../../helpers/Types";
import { transactionMBFields } from "../../../helpers/Fields";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";
import Split from "react-split";
import { TreeViewDataNkiosk } from "../../../components/TreeViewNkiosk";
import { TerminalsContext, DeviceContextType, TerminalsProvider } from "../../../context/TerminalsContext";

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

export const NkioskPayTerminal = () => {
    const { navbarColor, footerColor } = useColor();
    const { devices } = useContext(TerminalsContext) as DeviceContextType;
    const currentDate = new Date();
    const [payTerminal, setPayTerminal] = useState<KioskTransactionMB[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['timestamp', 'transactionType', 'amount', 'deviceSN']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(currentDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [selectedRows, setSelectedRows] = useState<KioskTransactionMB[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<KioskTransactionMB[]>([]);

    const deviceSN = 'AGB7234900595';
    const matchedDevice = devices.find(device => device.serialNumber === deviceSN);
    const deviceName = matchedDevice?.name || 'Quiosque Clérigos Porto';

    // Função para buscar os pagamentos dos terminais
    const fetchAllPayTerminal = async () => {
        try {
            const data = await apiService.fetchKioskTransactionsByMBAndDeviceSN();
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
            const data = await apiService.fetchKioskTransactionsByMBAndDeviceSN(startDate, endDate);
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
        setSelectedColumns(['timestamp', 'transactionType', 'amount', 'deviceSN']);
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
                    case 'tpId':
                        return row.tpId === '00000000-0000-0000-0000-000000000000' ? 'Sem Terminal' : row.tpId;
                    case 'deviceSN':
                        return deviceName;
                    case 'timestamp':
                        return new Date(row[field.key]).toLocaleString() || '';
                    case 'transactionType':
                        return row[field.key] === 1 ? 'Multibanco' : 'Moedeiro';
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
                        <SelectFilter column={field.key} setFilters={setFilters} data={payTerminal} />
                    </>
                ),
                selector: (row: KioskTransactionMB) => {
                    if (field.key === 'timestamp') {
                        return new Date(row[field.key]).getTime();
                    }
                    return formatField(row);
                },
                sortable: true,
                cell: (row: KioskTransactionMB) => {
                    if (field.key === 'timestamp') {
                        return new Date(row.timestamp).toLocaleString();
                    }
                    return formatField(row);
                }
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

    // Remove IDs duplicados na tabela caso existam
    const uniqueFilteredDataTable = Array.from(
        new Map(filteredDataTable.map(item => [item.id, item])).values()
    );

    // Calcula o total do valor dos pagamentos
    const totalAmount = filteredDataTable.reduce((total, transaction) => {
        return total + (typeof transaction.amount === 'number' ? transaction.amount : parseFloat(transaction.amount) || 0);
    }, 0);

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
                                <span style={{ color: '#009739' }}>Pagamentos Multibanco</span>
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
                                    data={uniqueFilteredDataTable}
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    paginationPerPage={15}
                                    selectableRows
                                    onSelectedRowsChange={handleRowSelected}
                                    clearSelectedRows={clearSelectionToggle}
                                    selectableRowsHighlight
                                    noDataComponent="Não há dados disponíveis para exibir."
                                    customStyles={customStyles}
                                    defaultSortAsc={false}
                                    defaultSortFieldId="timestamp"
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
        </TerminalsProvider>
    );
}