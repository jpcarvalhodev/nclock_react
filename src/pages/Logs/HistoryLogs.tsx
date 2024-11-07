import DataTable, { TableColumn } from "react-data-table-component";
import { useColor } from "../../context/ColorContext";
import { NavBar } from "../../components/NavBar";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { Footer } from "../../components/Footer";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { SelectFilter } from "../../components/SelectFilter";
import { useEffect, useState } from "react";
import * as apiService from "../../helpers/apiService";
import { customStyles } from "../../components/CustomStylesDataTable";
import { ExportButton } from "../../components/ExportButton";
import { PrintButton } from "../../components/PrintButton";
import { Logs } from "../../helpers/Types";
import { logsFields } from "../../helpers/Fields";

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

export const HistoryLogs = () => {
    const { navbarColor, footerColor } = useColor();
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    const [logs, setLogs] = useState<Logs[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['userName', 'taskName', 'description', 'createdDate']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [selectedRows, setSelectedRows] = useState<Logs[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));

    // Função para buscar os logs
    const fetchAllLogs = async () => {
        try {
            const data = await apiService.fetchAllHistoryLogs();
            if (Array.isArray(data)) {
                setLogs(data);
            } else {
                setLogs([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de logs:', error);
        }
    };

    // Função para buscar os logs entre datas
    const fetchLogsBetweenDates = async () => {
        try {
            const data = await apiService.fetchAllHistoryLogs(startDate, endDate);
            if (Array.isArray(data)) {
                setLogs(data);
            } else {
                setLogs([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de logs:', error);
        }
    }

    // Busca os logs ao carregar a página
    useEffect(() => {
        fetchAllLogs();
    }, []);

    // Função para atualizar os logs
    const refreshLogs = () => {
        fetchAllLogs();
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
        setSelectedColumns(['userName', 'taskName', 'description', 'createdDate']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Define a função de seleção de linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: Logs[];
    }) => {
        setSelectedRows(state.selectedRows);
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define as colunas da tabela
    const columns: TableColumn<Logs>[] = logsFields
        .filter(field => selectedColumns.includes(field.key))
        .sort((a, b) => { if (a.key === 'createdDate') return -1; else if (b.key === 'createdDate') return 1; else return 0; })
        .map(field => {
            const formatField = (row: Logs) => {
                switch (field.key) {
                    case 'createdDate':
                        return new Date(row.createdDate).toLocaleString();
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={logs} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
                sortFunction: (rowA, rowB) => new Date(rowB.createdDate).getTime() - new Date(rowA.createdDate).getTime()
            };
        });

    // Filtra os dados da tabela
    const filteredDataTable = logs.filter(getCoin =>
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
    );

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="datatable-container">
                <div className="datatable-title-text">
                    <span style={{ color: '#000000' }}>Logs de Histórico</span>
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
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshLogs} />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        <ExportButton allData={logs} selectedData={selectedRows} fields={logsFields} />
                        <PrintButton data={logs} fields={logsFields} />
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
                        <CustomOutlineButton icon="bi-search" onClick={fetchLogsBetweenDates} iconSize='1.1em' />
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
                        defaultSortFieldId="createdDate"
                    />
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={logsFields}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
                />
            )}
        </div>
    );
};
