import DataTable, { TableColumn } from "react-data-table-component";
import { useColor } from "../../../context/ColorContext";
import { NavBar } from "../../../components/NavBar";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { Footer } from "../../../components/Footer";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { SelectFilter } from "../../../components/SelectFilter";
import { useEffect, useState } from "react";
import * as apiService from "../../../helpers/apiService";
import { KioskTransactionCard } from "../../../helpers/Types";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { transactionCardFields } from "../../../helpers/Fields";
import { ExportButton } from "../../../components/ExportButton";
import Split from "react-split";
import { TreeViewDataNkiosk } from "../../../components/TreeViewNkiosk";

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T00:00`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T23:59`;
}

export const NkioskMoveCard = () => {
    const { navbarColor, footerColor } = useColor();
    const currentDate = new Date();
    const [moveCard, setMoveCard] = useState<KioskTransactionCard[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['cardNo', 'nameUser', 'eventName', 'eventTime']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(currentDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [selectedRows, setSelectedRows] = useState<KioskTransactionCard[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<KioskTransactionCard[]>([]);
    const eventDoorId = '3';
    const deviceSN = 'AGB7234900595';

    // Função para buscar as publicidades
    const fetchAllMoveCard = async () => {
        try {
            const data = await apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId, deviceSN);
            if (Array.isArray(data)) {
                setMoveCard(data);
            } else {
                setMoveCard([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos de cartões:', error);
        }
    };

    // Função para buscar os movimentos dos cartões entre datas
    const fetchMovementCardBetweenDates = async () => {
        try {
            const data = await apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId, deviceSN, startDate, endDate);
            if (Array.isArray(data)) {
                setMoveCard(data);
            } else {
                setMoveCard([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos de cartões:', error);
        }
    }

    // Busca as publicidades ao carregar a página
    useEffect(() => {
        fetchAllMoveCard();
    }, []);

    // Função para atualizar as publicidades
    const refreshMoveCard = () => {
        fetchAllMoveCard();
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
    useEffect(() => {
        if (selectedDevicesIds.length > 0) {
            const filtered = moveCard.filter(moveCards => selectedDevicesIds.includes(moveCards.deviceSN));
            setFilteredDevices(filtered);
        } else {
            setFilteredDevices(moveCard);
        }
    }, [selectedDevicesIds, moveCard]);

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
        setSelectedColumns(['cardNo', 'nameUser', 'eventName', 'eventTime']);
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

    // Define as colunas da tabela
    const columns: TableColumn<KioskTransactionCard>[] = transactionCardFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: KioskTransactionCard) => {
                switch (field.key) {
                    case 'eventDoorId':
                        return 'Cartão';
                    case 'eventTime':
                        return new Date(row[field.key]).toLocaleString() || '';
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
                            <span style={{ color: '#009739' }}>Movimentos do Torniquete</span>
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
                                <ExportButton allData={moveCard} selectedData={selectedRows} fields={transactionCardFields} />
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
                                <CustomOutlineButton icon="bi-search" onClick={fetchMovementCardBetweenDates} iconSize='1.1em' />
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
    );
}