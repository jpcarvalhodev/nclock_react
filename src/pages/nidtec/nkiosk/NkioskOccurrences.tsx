import DataTable, { TableColumn } from "react-data-table-component";
import { useColor } from "../../../context/ColorContext";
import { NavBar } from "../../../components/NavBar";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { Footer } from "../../../components/Footer";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { SelectFilter } from "../../../components/SelectFilter";
import { useContext, useEffect, useState } from "react";
import * as apiService from "../../../helpers/apiService";
import { LimpezasEOcorrencias } from "../../../helpers/Types";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";
import { PrintButton } from "../../../components/PrintButton";
import { toast } from "react-toastify";
import { DeviceContextType, TerminalsContext } from "../../../context/TerminalsContext";
import { limpezasEOcorrenciasFields } from "../../../helpers/Fields";
import { CreateLimpezaOcorrenciaModal } from "../../../modals/CreateLimpezaOcorrenciaModal";

export const NkioskOccurrences = () => {
    const { navbarColor, footerColor } = useColor();
    const { devices } = useContext(TerminalsContext) as DeviceContextType;
    const [occurrences, setOccurrences] = useState<LimpezasEOcorrencias[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['dataCreate','responsavel', 'observacoes', 'deviceName']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [selectedRows, setSelectedRows] = useState<LimpezasEOcorrencias[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const tipo = 2;

    // Função para buscar as limpezas
    const fetchAllOcorrencias = async () => {
        try {
            const data = await apiService.fetchAllCleaningsAndOccurrences(tipo);
            if (Array.isArray(data)) {
                setOccurrences(data);
            } else {
                setOccurrences([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de ocorrências:', error);
        }
    };

    // Função para adicionar limpezas
    const handleAddOcorrencia = async (occurrence: LimpezasEOcorrencias) => {
        try {
            const data = await apiService.addOccurrence(occurrence);
            setOccurrences([...occurrences, data]);
            toast.success(data.message || 'Ocorrência adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar nova ocorrência:', error);
        } finally {
            setShowAddModal(false);
            fetchAllOcorrencias();
        }
    };

    // Busca os pagamentos dos terminais ao carregar a página
    useEffect(() => {
        fetchAllOcorrencias();
    }, []);

    // Função para atualizar as recolhas do moedeiro
    const refreshOcorrencias = () => {
        fetchAllOcorrencias();
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
        setSelectedColumns(['dataCreate','responsavel', 'observacoes', 'deviceName']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Define a função de seleção de linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: LimpezasEOcorrencias[];
    }) => {
        setSelectedRows(state.selectedRows);
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define as colunas da tabela
    const columns: TableColumn<LimpezasEOcorrencias>[] = limpezasEOcorrenciasFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: LimpezasEOcorrencias) => {
                switch (field.key) {
                    case 'dataCreate':
                        return new Date(row.dataCreate).toLocaleString();
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={occurrences} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
                sortFunction: (rowA, rowB) => new Date(rowB.dataCreate).getTime() - new Date(rowA.dataCreate).getTime()
            };
        });

    // Filtra os dados da tabela
    const filteredDataTable = occurrences.filter(getCoin =>
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
                    <span style={{ color: '#009739' }}>Ocorrências</span>
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
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshOcorrencias} />
                        <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        <ExportButton allData={occurrences} selectedData={selectedRows} fields={limpezasEOcorrenciasFields.filter(field => field.key !== 'deviceId')} />
                        <PrintButton data={occurrences} fields={limpezasEOcorrenciasFields.filter(field => field.key !== 'deviceId')} />
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
                        defaultSortFieldId="dataCreate"
                    />
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={limpezasEOcorrenciasFields.filter(field => field.key !== 'deviceId')}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
                />
            )}
            <CreateLimpezaOcorrenciaModal
                title="Adicionar Ocorrência"
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleAddOcorrencia}
                fields={limpezasEOcorrenciasFields}
            />
        </div>
    );
}