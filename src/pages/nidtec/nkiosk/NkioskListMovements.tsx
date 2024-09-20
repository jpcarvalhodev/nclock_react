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
import { KioskTransactionList } from "../../../helpers/Types";
import { transactionListFields } from "../../../helpers/Fields";

export const NkioskListMovements = () => {
    const { navbarColor, footerColor } = useColor();
    const [listMovements, setListMovements] = useState<KioskTransactionList[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['eventTime', 'cardNo', 'eventName', 'eventNo', 'eventDoorId']);
    const [filters, setFilters] = useState<Record<string, string>>({});

    // Função para buscar as listagens de movimentos
    const fetchAllListMovements = async () => {
        try {
            const data = await apiService.fetchKioskTransactionDoorAsync();
            if (Array.isArray(data)) {
                const filteredData = data.filter(item => item.eventDoorId === 3 || item.eventDoorId === 4);
                setListMovements(filteredData);
            } else {
                setListMovements([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de listagem de movimentos:', error);
        }
    };

    // Busca as listagens de movimentos ao carregar a página
    useEffect(() => {
        fetchAllListMovements();
    }, []);

    // Função para atualizar as listagens de movimentos
    const refreshAds = () => {
        fetchAllListMovements();
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
        setSelectedColumns(['eventTime', 'cardNo', 'eventName', 'eventNo', 'eventDoorId']);
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

    // Define as colunas da tabela
    const columns: TableColumn<KioskTransactionList>[] = transactionListFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: KioskTransactionList) => {
                switch (field.key) {
                    case 'eventDoorId':
                        return row.eventDoorId === 3 ? 'Cartão' : 'Video Porteiro';
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={listMovements} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Filtra os dados da tabela
    const filteredDataTable = listMovements.filter(listMovement =>
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
                    columns={transactionListFields}
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