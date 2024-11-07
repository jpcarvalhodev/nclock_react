import DataTable, { TableColumn } from "react-data-table-component";
import { useColor } from "../../../context/ColorContext";
import { NavBar } from "../../../components/NavBar";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { Footer } from "../../../components/Footer";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { SelectFilter } from "../../../components/SelectFilter";
import { useContext, useEffect, useState } from "react";
import * as apiService from "../../../helpers/apiService";
import { KioskTransactionMB, MBDevice } from "../../../helpers/Types";
import { transactionMBFields } from "../../../helpers/Fields";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";
import Split from "react-split";
import { TreeViewDataNkiosk } from "../../../components/TreeViewNkiosk";
import { DeviceContextType, TerminalsContext, TerminalsProvider } from "../../../context/TerminalsContext";
import { PrintButton } from "../../../components/PrintButton";

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

export const NkioskPayCoins = () => {
    const { navbarColor, footerColor } = useColor();
    const { devices, fetchAllMBDevices } = useContext(TerminalsContext) as DeviceContextType;
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    const [payCoins, setPayCoins] = useState<KioskTransactionMB[]>([]);
    const [terminalData, setTerminalData] = useState<MBDevice[]>([]);
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

    // Função para buscar os pagamentos no moedeiro
    const fetchAllPayCoins = async () => {
        try {
            if (devices.length === 0) {
                setPayCoins([]);
                return;
            }
    
            const promises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsByPayCoins(eventDoorId, device.serialNumber);
            });
    
            const allData = await Promise.all(promises);
    
            const validData = allData.filter(data => Array.isArray(data) && data.length > 0);

            const combinedData = validData.flat();
    
            setPayCoins(combinedData);
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos de cartões:', error);
            setPayCoins([]);
        }
    };

    // Função para buscar os pagamentos do moedeiro entre datas
    const fetchPaymentsCoinBetweenDates = async () => {
        try {
            if (devices.length === 0) {
                setPayCoins([]);
                return;
            }
    
            const promises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsByPayCoins(eventDoorId, device.serialNumber, startDate, endDate);
            });
    
            const allData = await Promise.all(promises);
    
            const validData = allData.filter(data => Array.isArray(data) && data.length > 0);

            const combinedData = validData.flat();
    
            setPayCoins(combinedData);
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos de cartões:', error);
            setPayCoins([]);
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

    // Busca os pagamentos no moedeiro ao carregar a página
    useEffect(() => {
        fetchAllPayCoins();
        fetchTerminalData();
    }, [devices]);

    // Função para atualizar os pagamentos no moedeiro
    const refreshPayCoins = () => {
        fetchAllPayCoins();
        fetchTerminalData();
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
    useEffect(() => {
        if (selectedDevicesIds.length > 0) {
            const filtered = payCoins.filter(payCoin => selectedDevicesIds.includes(payCoin.deviceSN));
            setFilteredDevices(filtered);
        } else {
            setFilteredDevices(payCoins);
        }
    }, [selectedDevicesIds, payCoins]);

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
        .filter(field => field.key !== 'clientTicket' && field.key !== 'merchantTicket' && field.key !== 'tpId' && field.key !== 'email')
        .sort((a, b) => { if (a.key === 'timestamp') return -1; else if (b.key === 'timestamp') return 1; else return 0; })
        .map(field => {
            const formatField = (row: KioskTransactionMB) => {
                switch (field.key) {
                    case 'tpId':
                        const terminalMatch = terminalData.find(terminal => terminal.id === row.tpId)
                        const terminalName = terminalMatch?.nomeQuiosque || '';
                        return terminalName || 'Sem Dados';
                    case 'deviceSN':
                        return devices.find(device => device.serialNumber === row.deviceSN)?.deviceName || 'Sem Dados';
                    case 'timestamp':
                        return new Date(row.timestamp).toLocaleString();
                    case 'transactionType':
                        return row[field.key] === 1 ? 'Multibanco' : 'Moedeiro';
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={payCoins} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
                sortFunction: (rowA, rowB) => new Date(rowB.timestamp).getTime() - new Date(rowA.timestamp).getTime()
            };
        });

    // Filtra os dados da tabela
    const filteredDataTable = filteredDevices.filter(payCoin =>
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

    // Remove IDs duplicados na tabela caso existam
    const uniqueFilteredDataTable = Array.from(
        new Map(filteredDataTable.map(item => [item.id, item])).values()
    );

    // Calcula o total do valor dos pagamentos
    const totalAmount = filteredDataTable.length * 0.50;

    // Função para gerar os dados com nomes substituídos para o export/print
    const payCoinsWithNames = payCoins.map(transaction => {
        const terminalMatch = terminalData.find(terminal => terminal.id === transaction.tpId);
        const terminalName = terminalMatch?.nomeQuiosque || 'Sem Dados';

        const deviceMatch = devices.find(device => device.serialNumber === transaction.deviceSN);
        const deviceName = deviceMatch?.deviceName || 'Sem Dados';

        return {
            ...transaction,
            tpId: terminalName,
            deviceSN: deviceName,
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
                                <span style={{ color: '#009739' }}>Pagamentos no Moedeiro</span>
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
                                    <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshPayCoins} />
                                    <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                                    <ExportButton allData={payCoinsWithNames} selectedData={selectedRows} fields={transactionMBFields.filter(field => field.key !== 'clientTicket' && field.key !== 'merchantTicket' && field.key !== 'tpId' && field.key !== 'email')} />
                                    <PrintButton data={payCoinsWithNames} fields={transactionMBFields.filter(field => field.key !== 'clientTicket' && field.key !== 'merchantTicket' && field.key !== 'tpId' && field.key !== 'email')} />
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
                                    <CustomOutlineButton icon="bi-search" onClick={fetchPaymentsCoinBetweenDates} iconSize='1.1em' />
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
                                    noDataComponent="Não existem dados disponíveis para exibir."
                                    customStyles={customStyles}
                                    defaultSortAsc={true}
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
                        columns={transactionMBFields.filter(field => field.key !== 'clientTicket' && field.key !== 'merchantTicket' && field.key !== 'tpId' && field.key !== 'email')}
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