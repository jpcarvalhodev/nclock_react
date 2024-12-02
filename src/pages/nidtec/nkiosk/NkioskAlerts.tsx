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
import { MBDeviceStatus } from "../../../helpers/Types";
import { mbDeviceStatusFields } from "../../../helpers/Fields";
import { DeviceContextType, TerminalsContext } from "../../../context/TerminalsContext";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

export const NkioskAlerts = () => {
    const { navbarColor, footerColor } = useColor();
    const { mbDevices } = useContext(TerminalsContext) as DeviceContextType;
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    const [alerts, setAlerts] = useState<MBDeviceStatus[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['tpId', 'tipoStatus', 'nomeStatus', 'timespam']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [selectedRows, setSelectedRows] = useState<MBDeviceStatus[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));

    // Função para buscar as limpezas
    const fetchAllTasks = async () => {
        try {
            const data = await apiService.fetchAllAlerts();
            if (Array.isArray(data)) {
                setAlerts(data);
            } else {
                setAlerts([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de alertas:', error);
        }
    };

    // Função para buscar os alertas entre datas
    const fetchAlertsBetweenDates = async () => {
        try {
            const data = await apiService.fetchAllAlerts(startDate, endDate);
            if (Array.isArray(data)) {
                setAlerts(data);
            } else {
                setAlerts([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de alertas:', error);
        }
    }

    // Busca os pagamentos dos terminais ao carregar a página
    useEffect(() => {
        fetchAllTasks();
    }, []);

    // Função para atualizar as recolhas do moedeiro
    const refreshTasks = () => {
        fetchAllTasks();
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
        setSelectedColumns(['tpId', 'tipoStatus', 'nomeStatus', 'timespam']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Define a função de seleção de linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: MBDeviceStatus[];
    }) => {
        const sortedSelectedRows = state.selectedRows.sort((a, b) => new Date(b.timespam).getTime() - new Date(a.timespam).getTime());
        setSelectedRows(sortedSelectedRows);
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Filtra os dados da tabela
    const filteredDataTable = alerts.filter(getCoin =>
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
    .sort((a, b) => new Date(b.timespam).getTime() - new Date(a.timespam).getTime());

    // Define as colunas da tabela
    const columns: TableColumn<MBDeviceStatus>[] = mbDeviceStatusFields
        .filter(field => selectedColumns.includes(field.key))
        .filter(field => field.key !== 'tipoStatus')
        .sort((a, b) => { if (a.key === 'timespam') return -1; else if (b.key === 'timespam') return 1; else return 0; })
        .map(field => {
            const formatField = (row: MBDeviceStatus) => {
                switch (field.key) {
                    case 'timespam':
                        return new Date(row.timespam).toLocaleString() || '';
                    case 'tpId':
                        return mbDevices.find(device => device.id === row.tpId)?.nomeQuiosque || '';
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
                sortFunction: (rowA, rowB) => new Date(rowB.timespam).getTime() - new Date(rowA.timespam).getTime()
            };
        });

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="datatable-container">
                <div className="datatable-title-text">
                    <span style={{ color: '#009739' }}>Alertas</span>
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
                            <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshTasks} />
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip className="custom-tooltip">Colunas</Tooltip>}
                        >
                            <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        </OverlayTrigger>
                        <ExportButton allData={filteredDataTable} selectedData={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={mbDeviceStatusFields.filter(field => field.key !== 'tipoStatus')} />
                        <PrintButton data={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={mbDeviceStatusFields.filter(field => field.key !== 'tipoStatus')} />
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
                            <CustomOutlineButton icon="bi-search" onClick={fetchAlertsBetweenDates} iconSize='1.1em' />
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
                        defaultSortFieldId="timespam"
                    />
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={mbDeviceStatusFields.filter(field => field.key !== 'tipoStatus')}
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
