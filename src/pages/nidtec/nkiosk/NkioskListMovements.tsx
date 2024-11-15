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
import { KioskTransactionCard } from "../../../helpers/Types";
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

export const NkioskListMovements = () => {
    const { navbarColor, footerColor } = useColor();
    const { devices } = useContext(TerminalsContext) as DeviceContextType;
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    const [listMovements, setListMovements] = useState<KioskTransactionCard[]>([]);
    const [listMovementCard, setListMovementCard] = useState<KioskTransactionCard[]>([]);
    const [listMovementKiosk, setListMovementKiosk] = useState<KioskTransactionCard[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['eventTime', 'nameUser', 'cardNo', 'eventDoorId', 'deviceSN']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [selectedRows, setSelectedRows] = useState<KioskTransactionCard[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<KioskTransactionCard[]>([]);
    const eventDoorId = '3';
    const eventDoorId2 = '4';

    // Função para buscar as listagens de movimentos de cartão
    const fetchAllListMovementsCard = async () => {
        try {
            if (devices.length === 0) {
                setListMovementCard([]);
                return;
            }
            const promises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId, device.serialNumber);
            });
    
            const allData = await Promise.all(promises);
    
            const validData = allData.filter(data => Array.isArray(data) && data.length > 0);

            const combinedData = validData.flat();
            
            setListMovementCard(combinedData);
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos de cartões:', error);
            setListMovementCard([]);
        }
    };

    // Função para buscar as listagens de movimentos do quiosque
    const fetchAllListMovementsKiosk = async () => {
        try {
            if (devices.length === 0) {
                setListMovementKiosk([]);
                return;
            }
            const promises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId, device.serialNumber);
            });
    
            const allData = await Promise.all(promises);
    
            const validData = allData.filter(data => Array.isArray(data) && data.length > 0);

            const combinedData = validData.flat();
            
            setListMovementKiosk(combinedData);
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos de cartões:', error);
            setListMovementKiosk([]);
        }
    };

    // Função para buscar os movimentos entre datas
    const fetchMovementCardBetweenDates = async () => {
        try {
            if (devices.length === 0) {
                setListMovementCard([]);
                setListMovementKiosk([]);
                return;
            }
    
            const promisesMovementCard = devices.map(device =>
                apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId, device.deviceSN, startDate, endDate)
            );
    
            const promisesMovementKiosk = devices.map(device =>
                apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId2, device.deviceSN, startDate, endDate)
            );
    
            const resultsMovementCard = await Promise.all(promisesMovementCard);
            const resultsMovementKiosk = await Promise.all(promisesMovementKiosk);
    
            const validDataCard = resultsMovementCard.filter(data => Array.isArray(data) && data.length > 0).flat();
            const validDataKiosk = resultsMovementKiosk.filter(data => Array.isArray(data) && data.length > 0).flat();
    
            setListMovementCard(validDataCard);
            setListMovementKiosk(validDataKiosk);
        } catch (error) {
            console.error('Erro ao buscar os dados de listagem de movimentos', error);
            setListMovementCard([]);
            setListMovementKiosk([]);
        }
    };

    // Unifica os dados de movimentos de cartão e porteiro
    const mergeMovementData = () => {
        const unifiedData: KioskTransactionCard[] = [
            ...listMovementCard.map((movement) => ({
                id: movement.id,
                cardNo: movement.cardNo,
                nameUser: movement.nameUser,
                deviceSN: movement.deviceSN,
                eventNo: movement.eventNo,
                eventName: movement.eventName,
                eventDoorId: movement.eventDoorId,
                eventDoorName: movement.eventDoorName,
                eventTime: movement.eventTime,
                pin: movement.pin,
                verifyModeNo: movement.verifyModeNo,
            })),
            ...listMovementKiosk.map((movement) => ({
                id: movement.id,
                cardNo: movement.cardNo,
                nameUser: movement.nameUser,
                deviceSN: movement.deviceSN,
                eventNo: movement.eventNo,
                eventName: movement.eventName,
                eventDoorId: movement.eventDoorId,
                eventDoorName: movement.eventDoorName,
                eventTime: movement.eventTime,
                pin: movement.pin,
                verifyModeNo: movement.verifyModeNo,
            }))
        ];

        setListMovements(unifiedData);
    };

    // Atualiza a lista de movimentos ao receber novos dados
    useEffect(() => {
        mergeMovementData();
    }, [listMovementCard, listMovementKiosk]);

    // Busca as listagens de movimentos ao carregar a página
    useEffect(() => {
        fetchAllListMovementsCard();
        fetchAllListMovementsKiosk();
    }, [devices]);

    // Função para atualizar as listagens de movimentos
    const refreshListMovements = () => {
        fetchAllListMovementsCard();
        fetchAllListMovementsKiosk();
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
    useEffect(() => {
        if (selectedDevicesIds.length > 0) {
            const filtered = listMovements.filter(listMovement => selectedDevicesIds.includes(listMovement.deviceSN));
            setFilteredDevices(filtered);
        } else {
            setFilteredDevices(listMovements);
        }
    }, [selectedDevicesIds, listMovements]);

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
        setSelectedColumns(['eventTime', 'nameUser', 'cardNo', 'eventDoorId', 'deviceSN']);
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

    // Filtra os dados da tabela com base no filtro de 'eventName'
    const filteredDataTable = filteredDevices
        .filter(listMovement =>
            Object.keys(filters).every(key =>
                filters[key] === "" || (listMovement[key] != null && String(listMovement[key]).toLowerCase().includes(filters[key].toLowerCase()))
            ) &&
            Object.values(listMovement).some(value => {
                if (value == null) {
                    return false;
                } else if (value instanceof Date) {
                    return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
                } else {
                    return value.toString().toLowerCase().includes(filterText.toLowerCase());
                }
            })
        );

    // Combina os dois arrays, removendo duplicatas baseadas na chave 'key'
    const combinedMovements = [...transactionCardFields, ...transactionCardFields].reduce((acc, current) => {
        if (!acc.some(field => field.key === current.key)) {
            acc.push(current);
        }
        return acc;
    }, [] as typeof transactionCardFields);

    const columns: TableColumn<KioskTransactionCard>[] = combinedMovements
        .filter(field => selectedColumns.includes(field.key))
        .sort((a, b) => (a.key === 'eventTime' ? -1 : b.key === 'eventTime' ? 1 : 0))
        .map(field => {
            const formatField = (row: KioskTransactionCard) => {
                const value = row[field.key as keyof KioskTransactionCard];
                switch (field.key) {
                    case 'deviceSN':
                        return devices[0].deviceName || 'Sem Dados';
                    case 'eventDoorId':
                        return row.eventDoorId === 4 ? 'Quiosque' : 'Torniquete';
                    case 'eventTime':
                        return new Date(row.eventTime).toLocaleString();
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

    // Calcula o valor total dos movimentos
    const totalAmount = filteredDataTable.length;
    
    // Função para gerar os dados com nomes substituídos para o export/print
    const moveCardKioskWithNames = listMovements.map(transaction => {

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
                                <span style={{ color: '#009739' }}>Listagem de Movimentos</span>
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
                                    <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshListMovements} />
                                    <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                                    <ExportButton allData={moveCardKioskWithNames} selectedData={selectedRows} fields={combinedMovements} />
                                    <PrintButton data={moveCardKioskWithNames} fields={combinedMovements} />
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
                                    <CustomOutlineButton icon="bi-search" onClick={fetchMovementCardBetweenDates} iconSize='1.1em' />
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
                                <div style={{ marginLeft: 10 }}>
                                    <strong>Movimentos Totais: </strong>{totalAmount}
                                </div>
                            </div>
                        </div>
                    </Split>
                </div>
                <Footer style={{ backgroundColor: footerColor }} />
                {openColumnSelector && (
                    <ColumnSelectorModal
                        columns={combinedMovements}
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