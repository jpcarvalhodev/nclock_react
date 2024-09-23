import DataTable, { TableColumn } from "react-data-table-component";
import { useColor } from "../../../context/ColorContext";
import { NavBar } from "../../../components/NavBar";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { Footer } from "../../../components/Footer";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { SelectFilter } from "../../../components/SelectFilter";
import { useEffect, useState } from "react";
import * as apiService from "../../../helpers/apiService";
import { KioskTransaction } from "../../../helpers/Types";
import { transactionFields } from "../../../helpers/Fields";
import { customStyles } from "../../../components/CustomStylesDataTable";

export const NkioskMoveDoorman = () => {
    const { navbarColor, footerColor } = useColor();
    const [moveDoorman, setMoveDoorman] = useState<KioskTransaction[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['eventTime', 'eventName', 'eventDoorId', 'deviceSN']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const eventDoorId = '4';
    const deviceSN = 'AGB7234900595';

    // Função para buscar os movimentos de videoporteiro
    const fetchAllMoveDoorman = async () => {
        try {
            const data = await apiService.fetchKioskTransactionsByEventDoorIdAndDeviceSNAsync(eventDoorId, deviceSN);
            if (Array.isArray(data)) {
                setMoveDoorman(data);
            } else {
                setMoveDoorman([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos de videoporteiro:', error);
        }
    };

    // Busca os movimentos de videoporteiro ao carregar a página
    useEffect(() => {
        fetchAllMoveDoorman();
    }, []);

    // Função para atualizar os movimentos de videoporteiro
    const refreshAds = () => {
        fetchAllMoveDoorman();
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
        setSelectedColumns(['eventTime', 'eventName', 'eventDoorId', 'deviceSN']);
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

    // Filtra os dados da tabela
    const filteredDataTable = moveDoorman
        .filter(listMovement =>
            listMovement.eventName === 'Door Opens' || listMovement.eventName === 'Open the door by pressing the exit button'
        )
        .filter(moveDoormans =>
            Object.keys(filters).every(key =>
                filters[key] === "" || (moveDoormans[key] != null && String(moveDoormans[key]).toLowerCase().includes(filters[key].toLowerCase()))
            ) &&
            Object.values(moveDoormans).some(value => {
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
    const columns: TableColumn<KioskTransaction>[] = transactionFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: KioskTransaction) => {
                switch (field.key) {
                    case 'eventDoorId':
                        return 'Video Porteiro';
                    case 'eventTime':
                        return new Date(row[field.key]).toLocaleString() || '';
                    case 'createTime':
                        return new Date(row[field.key]).toLocaleString() || '';
                    case 'updateTime':
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
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span style={{ color: '#009739' }}>Movimentos Video Porteiro</span>
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
                    columns={transactionFields}
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