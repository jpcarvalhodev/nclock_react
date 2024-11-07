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
import { transactionCardFields } from "../../../helpers/Fields";
import { ExportButton } from "../../../components/ExportButton";
import Split from "react-split";
import { TreeViewDataNkiosk } from "../../../components/TreeViewNkiosk";
import { TerminalsContext, DeviceContextType, TerminalsProvider } from "../../../context/TerminalsContext";
import { PrintButton } from "../../../components/PrintButton";

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

export const NkioskMoveVP = () => {
    const { navbarColor, footerColor } = useColor();
    const { devices } = useContext(TerminalsContext) as DeviceContextType;
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    const [moveVP, setMoveVP] = useState<KioskTransactionCard[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['eventDoorId', 'deviceSN', 'eventName', 'eventTime', 'eventNo']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [selectedRows, setSelectedRows] = useState<KioskTransactionCard[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<KioskTransactionCard[]>([]);
    const eventDoorId = '3';

    // Função para buscar os movimentos de videoporteiro
    const fetchAllMoveVP = async () => {
        try {
            if (devices.length === 0) {
                setMoveVP([]);
                return;
            }
            const promises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsVideoPorteiro(eventDoorId, device.serialNumber);
            });
    
            const allData = await Promise.all(promises);
    
            const validData = allData.filter(data => Array.isArray(data) && data.length > 0);

            const combinedData = validData.flat();
            
            setMoveVP(combinedData);
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos do video porteiro:', error);
            setMoveVP([]);
        }
    };

    // Função para buscar os movimentos de videoporteiro entre datas
    const fetchMovementVPBetweenDates = async () => {
        try {
            if (devices.length === 0) {
                setMoveVP([]);
                return;
            }
            const promises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsVideoPorteiro(eventDoorId, device.serialNumber, startDate, endDate);
            });
    
            const allData = await Promise.all(promises);
    
            const validData = allData.filter(data => Array.isArray(data) && data.length > 0);

            const combinedData = validData.flat();
            
            setMoveVP(combinedData);
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos do video porteiro:', error);
            setMoveVP([]);
        }
    };

    // Busca os movimentos de videoporteiro publicidades ao carregar a página
    useEffect(() => {
        fetchAllMoveVP();
    }, [devices]);

    // Função para atualizar as movimentos de videoporteiro
    const refreshMoveCard = () => {
        fetchAllMoveVP();
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
    useEffect(() => {
        if (selectedDevicesIds.length > 0) {
            const filtered = moveVP.filter(moveVPs => selectedDevicesIds.includes(moveVPs.deviceSN));
            setFilteredDevices(filtered);
        } else {
            setFilteredDevices(moveVP);
        }
    }, [selectedDevicesIds, moveVP]);

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
        setSelectedColumns(['eventDoorId', 'deviceSN', 'eventName', 'eventTime', 'eventNo']);
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
        setSelectedRows(state.selectedRows);
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
    );

    // Remove IDs duplicados na tabela caso existam
    const uniqueFilteredDataTable: KioskTransactionCard[] = Array.from(
        new Set(filteredDataTable.map(item => item.eventTime))
    ).map(eventTime => {
        return filteredDataTable.find(item => item.eventTime === eventTime);
    }).filter((item): item is KioskTransactionCard => item !== undefined);

    console.log(uniqueFilteredDataTable);

    // Define as colunas da tabela
    const columns: TableColumn<KioskTransactionCard>[] = transactionCardFields
        .filter(field => selectedColumns.includes(field.key))
        .filter(field => field.key !== 'cardNo' && field.key !== 'nameUser')
        .sort((a, b) => (a.key === 'eventTime' ? -1 : b.key === 'eventTime' ? 1 : 0))
        .sort((a, b) => (a.key === 'deviceSN' ? 1 : b.key === 'deviceSN' ? -1 : 0))
        .sort((a, b) => (a.key === 'eventNo' ? 1 : b.key === 'eventNo' ? -1 : 0))
        .map(field => {
            const formatField = (row: KioskTransactionCard) => {
                const value = row[field.key as keyof KioskTransactionCard];
                switch (field.key) {
                    case 'deviceSN':
                        return devices.find(device => device.serialNumber === value)?.deviceName ?? '';
                    case 'eventDoorId':
                        return 'Video Porteiro';
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
    const moveVPWithNames = moveVP.map(transaction => {

        const deviceMatch = devices.find(device => device.serialNumber === transaction.deviceSN);
        const deviceName = deviceMatch?.deviceName || 'Sem Dados';

        return {
            ...transaction,
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
                                <span style={{ color: '#009739' }}>Aberturas do Video Porteiro</span>
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
                                    <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshMoveCard} />
                                    <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                                    <ExportButton allData={moveVPWithNames} selectedData={selectedRows} fields={transactionCardFields.filter(field => field.key !== 'cardNo' && field.key !== 'nameUser')} />
                                    <PrintButton data={moveVPWithNames} fields={transactionCardFields.filter(field => field.key !== 'cardNo' && field.key !== 'nameUser')} />
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
                                    <CustomOutlineButton icon="bi-search" onClick={fetchMovementVPBetweenDates} iconSize='1.1em' />
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
                                    defaultSortFieldId="eventTime"
                                />
                            </div>
                        </div>
                    </Split>
                </div>
                <Footer style={{ backgroundColor: footerColor }} />
                {openColumnSelector && (
                    <ColumnSelectorModal
                        columns={transactionCardFields.filter(field => field.key !== 'cardNo' && field.key !== 'nameUser')}
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