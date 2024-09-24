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
import { KioskTransactionCard, KioskTransactionCardDoorman, KioskTransactionList } from "../../../helpers/Types";
import { transactionCardFields, transactionListFields } from "../../../helpers/Fields";

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T00:00`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T23:59`;
}

export const NkioskListMovements = () => {
    const { navbarColor, footerColor } = useColor();
    const currentDate = new Date();
    const [listMovements, setListMovements] = useState<KioskTransactionCardDoorman[]>([]);
    const [listMovementCard, setListMovementCard] = useState<KioskTransactionCard[]>([]);
    const [listMovementDoorman, setListMovementDoorman] = useState<KioskTransactionList[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['eventTime', 'cardNo', 'eventName', 'nameUser', 'eventDoorId']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(currentDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const eventDoorId = '3';
    const deviceSN = 'AGB7234900595';

    // Função para buscar as listagens de movimentos de cartão
    const fetchAllListMovementsCard = async () => {
        try {
            const data = await apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId, deviceSN);
            if (Array.isArray(data)) {
                setListMovementCard(data);
            } else {
                setListMovementCard([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de listagem de movimentos de cartão:', error);
        }
    };

    // Função para buscar as listagens de movimentos de porteiro
    const fetchAllListMovementsDoorman = async () => {
        try {
            const data = await apiService.fetchKioskTransactionDoorAsync();
            if (Array.isArray(data)) {
                const filteredData = data.filter(item => item.eventDoorId === 4);
                setListMovementDoorman(filteredData);
            } else {
                setListMovementDoorman([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de listagem de movimentos de porteiro:', error);
        }
    };

    // Função para buscar os movimentos dos cartões entre datas
    const fetchMovementCardBetweenDates = async () => {
        try {
            const data = await apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId, deviceSN, startDate, endDate);
            const dataDoorman = await apiService.fetchTransactionsByDatesFilters(eventDoorId, deviceSN, startDate, endDate);
            if (Array.isArray(data)) {
                setListMovementCard(data);
                setListMovementDoorman(dataDoorman);
            } else {
                setListMovementCard([]);
                setListMovementDoorman([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de listagem de movimentos', error);
        }
    }

    // Unifica os dados de movimentos de cartão e porteiro
    const mergeMovementData = () => {
        const unifiedData: KioskTransactionCardDoorman[] = [
            ...listMovementCard.map((movement) => ({
                id: movement.id,
                cardNo: movement.cardNo,
                nameUser: movement.nameUser,
                eventNo: movement.eventNo,
                eventName: movement.eventName,
                eventDoorId: movement.eventDoorId,
                eventDoorName: movement.eventDoorName,
                eventTime: movement.eventTime,
                pin: movement.pin,
                verifyModeNo: movement.verifyModeNo,
            })),
            ...listMovementDoorman.map((movement) => ({
                id: movement.id,
                cardNo: movement.cardNo,
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
    }, [listMovementCard, listMovementDoorman]);

    // Busca as listagens de movimentos ao carregar a página
    useEffect(() => {
        fetchAllListMovementsCard();
        fetchAllListMovementsDoorman();
    }, []);

    // Função para atualizar as listagens de movimentos
    const refreshAds = () => {
        fetchAllListMovementsCard();
        fetchAllListMovementsDoorman();
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
        setSelectedColumns(['eventTime', 'cardNo', 'eventName', 'nameUser', 'eventDoorId']);
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

    // Filtra os dados da tabela com base no filtro de 'eventName'
    const filteredDataTable = listMovements
        .filter(listMovement =>
            listMovement.eventName === 'Door Opens' || listMovement.eventName === 'Open the door by pressing the exit button'
        )
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
    const combinedMovements = [...transactionCardFields, ...transactionListFields].reduce((acc, current) => {
        if (!acc.some(field => field.key === current.key)) {
            acc.push(current);
        }
        return acc;
    }, [] as typeof transactionCardFields);

    // Define as colunas da tabela
    const columns: TableColumn<KioskTransactionCardDoorman>[] = combinedMovements
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: KioskTransactionCardDoorman) => {
                switch (field.key) {
                    case 'eventDoorId':
                        return row.eventDoorId === 4 ? 'Video Porteiro' : 'Cartão';
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
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='filter-refresh-add-edit-upper-class'>
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
                        <CustomOutlineButton icon="bi-search" onClick={fetchMovementCardBetweenDates} iconSize='1.1em' />
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
    );
}