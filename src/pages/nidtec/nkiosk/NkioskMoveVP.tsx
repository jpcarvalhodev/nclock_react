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
import { TreeViewDataNkioskMove } from "../../../components/TreeViewNkioskMove";
import { TerminalsContext, DeviceContextType, TerminalsProvider } from "../../../context/TerminalsContext";

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
    const [moveVP, setMoveVP] = useState<KioskTransactionCard[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['eventDoorId', 'deviceSN', 'eventName', 'eventTime']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(currentDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [selectedRows, setSelectedRows] = useState<KioskTransactionCard[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<KioskTransactionCard[]>([]);
    const eventDoorId = '3';

    const deviceSN = 'AGB7234900595';
    const matchedDevice = devices.find(device => device.serialNumber === deviceSN);
    const deviceName = matchedDevice?.name || 'Quiosque Clérigos Porto';

    // Função para buscar as publicidades
    const fetchAllMoveVP = async () => {
        try {
            const data = await apiService.fetchKioskTransactionsVideoPorteiro(eventDoorId, deviceSN);
            if (Array.isArray(data)) {
                setMoveVP(data);
            } else {
                setMoveVP([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos do video porteiro:', error);
        }
    };

    // Função para buscar os movimentos dos cartões entre datas
    const fetchMovementVPBetweenDates = async () => {
        try {
            const data = await apiService.fetchKioskTransactionsVideoPorteiro(eventDoorId, deviceSN, startDate, endDate);
            if (Array.isArray(data)) {
                setMoveVP(data);
            } else {
                setMoveVP([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos do video porteiro:', error);
        }
    }

    // Busca as publicidades ao carregar a página
    useEffect(() => {
        fetchAllMoveVP();
    }, []);

    // Função para atualizar as publicidades
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
        setSelectedColumns(['eventDoorId', 'deviceSN', 'eventName', 'eventTime']);
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

    // Define as colunas da tabela
    const columns: TableColumn<KioskTransactionCard>[] = transactionCardFields
        .filter(field => selectedColumns.includes(field.key))
        .sort((a, b) => (a.key === 'eventTime' ? -1 : b.key === 'eventTime' ? 1 : 0))
        .sort((a, b) => (a.key === 'deviceSN' ? 1 : b.key === 'deviceSN' ? -1 : 0))
        .map(field => {
            const formatField = (row: KioskTransactionCard) => {
                const value = row[field.key as keyof KioskTransactionCard];
                switch (field.key) {
                    case 'deviceSN':
                        return deviceName;
                    case 'eventDoorId':
                        return 'Video Porteiro';
                    case 'eventTime':
                        if (typeof value === 'string') {
                            const [datePart, timePart] = value.split(' ');
                            const [day, month, year] = datePart.split('/');
                            const formattedDateString = `${year}-${month}-${day}T${timePart}`;
                            return new Date(formattedDateString).toLocaleString() || '';
                        } else if (value instanceof Date) {
                            return value.toLocaleString() || '';
                        }
                        return '';
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
                selector: (row: KioskTransactionCard) => {
                    const value = row[field.key as keyof KioskTransactionCard];

                    if (field.key === 'eventTime') {
                        if (typeof value === 'string') {
                            const [datePart, timePart] = value.split(' ');
                            const [day, month, year] = datePart.split('/');
                            const formattedDateString = `${year}-${month}-${day}T${timePart}`;
                            return new Date(formattedDateString).getTime();
                        } else if (value instanceof Date) {
                            return value.getTime();
                        }
                        return '';
                    }
                    return formatField(row);
                },
                sortable: true,
                cell: (row: KioskTransactionCard) => {
                    return formatField(row);
                }
            };
        });

    return (
        <TerminalsProvider>
            <div className="main-container">
                <NavBar style={{ backgroundColor: navbarColor }} />
                <div className='content-container'>
                    <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                        <div className="treeview-container">
                            <TreeViewDataNkioskMove onSelectDevices={handleSelectFromTreeView} />
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
                                    <ExportButton allData={moveVP} selectedData={selectedRows} fields={transactionCardFields} />
                                    <CustomOutlineButton icon="bi-printer" />
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
                                    noDataComponent="Não há dados disponíveis para exibir."
                                    customStyles={customStyles}
                                    defaultSortAsc={false}
                                    defaultSortFieldId="eventTime"
                                />
                            </div>
                        </div>
                    </Split>
                </div>
                <Footer style={{ backgroundColor: footerColor }} />
                {openColumnSelector && (
                    <ColumnSelectorModal
                        columns={transactionCardFields}
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