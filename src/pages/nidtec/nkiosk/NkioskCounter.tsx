import DataTable, { TableColumn } from "react-data-table-component";
import { useColor } from "../../../context/ColorContext";
import { NavBar } from "../../../components/NavBar";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { Footer } from "../../../components/Footer";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { SelectFilter } from "../../../components/SelectFilter";
import { useContext, useEffect, useState } from "react";
import * as apiService from "../../../helpers/apiService";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";
import { PrintButton } from "../../../components/PrintButton";
import { DeviceContextType, TerminalsContext } from "../../../context/TerminalsContext";
import { Counter } from "../../../helpers/Types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { counterFields } from "../../../helpers/Fields";
import { TreeViewDataNkioskDisp } from "../../../components/TreeViewNkioskDisp";
import Split from "react-split";

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

export const NkioskCounter = () => {
    const { navbarColor, footerColor } = useColor();
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    const { devices } = useContext(TerminalsContext) as DeviceContextType;
    const [counter, setCounter] = useState<Counter[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['eventTime', 'pin', 'nameUser', 'eventType', 'deviceSN']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [selectedRows, setSelectedRows] = useState<Counter[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<Counter[]>([]);

    // Função para buscar os contadores
    const fetchAllCounter = async (startDate?: string, endDate?: string) => {
        try {
            const data = await apiService.fetchAllContador(startDate, endDate);
            if (Array.isArray(data)) {
                setCounter(data);
            } else {
                setCounter([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados do contador:', error);
        }
    };

    // Busca os pagamentos dos terminais ao carregar a página
    useEffect(() => {
        fetchAllCounter();
    }, []);

    // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
    useEffect(() => {
        if (selectedDevicesIds.length > 0) {
            const filtered = counter.filter(count => selectedDevicesIds.includes(count.deviceSN));
            setFilteredDevices(filtered);
        } else {
            setFilteredDevices(counter);
        }
    }, [selectedDevicesIds, counter]);

    // Função para atualizar as recolhas do moedeiro
    const refreshCounter = () => {
        fetchAllCounter();
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
        setSelectedColumns(['eventTime', 'pin', 'nameUser', 'eventType', 'deviceSN']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Define a função de seleção de linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: Counter[];
    }) => {
        const sortedSelectedRows = state.selectedRows.sort((a, b) => new Date(b.eventTime).getTime() - new Date(a.eventTime).getTime());
        setSelectedRows(sortedSelectedRows);
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define a seleção da árvore
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        setSelectedDevicesIds(selectedIds);
    };

    // Filtra os dados da tabela
    const filteredDataTable = filteredDevices.filter(getCoin =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (getCoin[key] != null && String(getCoin[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.values(getCoin).some(value => {
            if (value == null) {
                return false;
            } else if (value instanceof Date) {
                return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
            } else {
                return value.toString().toLowerCase().includes(filterText.toLowerCase());
            }
        })
    )
        .sort((a, b) => new Date(b.eventTime).getTime() - new Date(a.eventTime).getTime());

    // Define as colunas da tabela
    const columns: TableColumn<Counter>[] = counterFields
        .filter(field => selectedColumns.includes(field.key))
        .sort((a, b) => { if (a.key === 'deviceSN') return 1; else if (b.key === 'deviceSN') return -1; else return 0; })
        .map(field => {
            const formatField = (row: Counter) => {
                switch (field.key) {
                    case 'deviceSN':
                        return devices.find(device => device.serialNumber === row.deviceSN)?.deviceName || '';
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
                sortFunction: (rowA, rowB) => new Date(rowB.dataRecolha).getTime() - new Date(rowA.dataRecolha).getTime()
            };
        });

    // Função para gerar os dados com nomes substituídos para o export/print
    const transformTransactionWithNames = (transaction: { deviceSN: string; }) => {

        const deviceMatch = devices.find(device => device.serialNumber === transaction.deviceSN);
        const deviceName = deviceMatch?.deviceName || 'Sem Dados';

        return {
            ...transaction,
            deviceSN: deviceName,
        };
    };

    // Dados dos pagamentos com nomes substituídos
    const getCounterWithNames = filteredDataTable.map(transformTransactionWithNames);

    // Transforma as linhas selecionadas com nomes substituídos
    const selectedRowsWithNames = selectedRows.map(transformTransactionWithNames);

    // Calcula o total de movimentos Torniquete
    const totalCardAmount = filteredDataTable.filter(transaction => transaction.eventType !== 'Quiosque').length;
    
    // Calcula o total de movimentos Quiosque
    const totalKioskAmount = filteredDataTable.filter(transaction => transaction.eventType === 'Quiosque').length;

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='content-container'>
                <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewDataNkioskDisp onSelectDevices={handleSelectFromTreeView} />
                    </div>
                    <div className="datatable-container">
                        <div className="datatable-title-text">
                            <span style={{ color: '#009739' }}>Contador de Dados</span>
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
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshCounter} />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Colunas</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                                </OverlayTrigger>
                                <ExportButton allData={getCounterWithNames} selectedData={selectedRows.length > 0 ? selectedRowsWithNames : getCounterWithNames} fields={counterFields} />
                                <PrintButton data={selectedRows.length > 0 ? selectedRowsWithNames : getCounterWithNames} fields={counterFields} />
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
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Buscar</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-search" onClick={() => fetchAllCounter(startDate, endDate)} iconSize='1.1em' />
                                </OverlayTrigger>
                            </div>
                        </div>
                        <div className='table-css'>
                            <DataTable
                                columns={columns}
                                data={filteredDataTable}
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
                        <div style={{ marginLeft: 10, marginTop: 5 }}>
                            <strong>Total de Movimentos Torniquete: </strong>{totalCardAmount}
                        </div>
                        <div style={{ marginLeft: 10, marginTop: 5 }}>
                            <strong>Total de Movimentos Quiosque: </strong>{totalKioskAmount}
                        </div>
                    </div>
                </Split>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={counterFields}
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