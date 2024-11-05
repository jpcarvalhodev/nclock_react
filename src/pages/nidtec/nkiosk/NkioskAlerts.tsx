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

export const NkioskAlerts = () => {
    const { navbarColor, footerColor } = useColor();
    const { mbDevices } = useContext(TerminalsContext) as DeviceContextType;
    const [alerts, setAlerts] = useState<MBDeviceStatus[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['tpId', 'tipoStatus', 'nomeStatus', 'timespam']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [selectedRows, setSelectedRows] = useState<MBDeviceStatus[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);

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
        setSelectedRows(state.selectedRows);
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define as colunas da tabela
    const columns: TableColumn<MBDeviceStatus>[] = mbDeviceStatusFields
        .filter(field => selectedColumns.includes(field.key))
        .sort((a, b) => { if (a.key === 'timespam') return -1; else if (b.key === 'timespam') return 1; else return 0; })
        .map(field => {
            const formatField = (row: MBDeviceStatus) => {
                switch (field.key) {
                    case 'timespam':
                        return new Date(row.timespam).toLocaleString();
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
                        <SelectFilter column={field.key} setFilters={setFilters} data={alerts} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
                sortFunction: (rowA, rowB) => new Date(rowB.timespam).getTime() - new Date(rowA.timespam).getTime()
            };
        });

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
    );

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
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshTasks} />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        <ExportButton allData={alerts} selectedData={selectedRows} fields={mbDeviceStatusFields} />
                        <PrintButton data={alerts} fields={mbDeviceStatusFields} />
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
                    columns={mbDeviceStatusFields}
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
