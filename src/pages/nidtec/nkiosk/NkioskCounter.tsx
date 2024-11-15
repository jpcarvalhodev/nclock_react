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
import { toast } from "react-toastify";
import { DeviceContextType, TerminalsContext } from "../../../context/TerminalsContext";
import { RecolhaMoedeiroEContador } from "../../../helpers/Types";
import { recolhaMoedeiroEContadorFields } from "../../../helpers/Fields";
import { CreateRecolhaMoedeiroEContadorModal } from "../../../modals/CreateRecolhaMoedeiroEContadorModal";
import { Button, Spinner, Tab, Tabs } from "react-bootstrap";

export const NkioskCounter = () => {
    const { navbarColor, footerColor } = useColor();
    const { devices } = useContext(TerminalsContext) as DeviceContextType;
    const [counter, setCounter] = useState<RecolhaMoedeiroEContador[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['dataRecolha', 'pessoaResponsavel', 'numeroMoedas', 'valorTotal', 'deviceID']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [selectedRows, setSelectedRows] = useState<RecolhaMoedeiroEContador[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [userTabKey, setUserTabKey] = useState<string>('endCounter');
    const [loadingEndCounter, setLoadingEndCounter] = useState(false);
    const [selectedCounter, setSelectedCounter] = useState<RecolhaMoedeiroEContador | null>(null);

    // Função para buscar os contadores
    const fetchAllCounter = async () => {
        try {
            const data = await apiService.fetchAllContador();
            if (Array.isArray(data)) {
                setCounter(data);
            } else {
                setCounter([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados do contador:', error);
        }
    };

    // Função para iniciar contador
    const handleStartContador = async (contador: RecolhaMoedeiroEContador) => {
        try {
            const data = await apiService.startContador(contador);
            setCounter([...counter, data]);
            toast.success(data.message || 'Contador iniciado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar contador:', error);
        } finally {
            setShowAddModal(false);
            refreshCounter();
        }
    };

    // Busca os pagamentos dos terminais ao carregar a página
    useEffect(() => {
        fetchAllCounter();
    }, []);

    // Função para atualizar as recolhas do moedeiro
    const refreshCounter = () => {
        fetchAllCounter();
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Função para alternar a visibilidade das abas
    const handleUserSelect = (k: string | null) => {
        if (k) {
            setUserTabKey(k);
        }
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
        setSelectedColumns(['dataRecolha', 'pessoaResponsavel', 'numeroMoedas', 'valorTotal', 'deviceID']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Define a função de seleção de linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: RecolhaMoedeiroEContador[];
    }) => {
        setSelectedRows(state.selectedRows);
        setSelectedCounter(state.selectedRows[0] || null);
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Filtra os dados da tabela
    const filteredDataTable = counter.filter(getCoin =>
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

    // Define as colunas da tabela
    const columns: TableColumn<RecolhaMoedeiroEContador>[] = recolhaMoedeiroEContadorFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: RecolhaMoedeiroEContador) => {
                switch (field.key) {
                    case 'dataRecolha':
                        return new Date(row.dataRecolha).toLocaleString();
                    case 'dataFimIntervencao':
                        return new Date(row.dataFimIntervencao).toLocaleString();
                    case 'deviceID':
                        return devices.find(device => device.zktecoDeviceID === row.deviceID)?.deviceName || '';
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

    // Função para encerrar o contador selecionado
    const handleEndCounter = async () => {
        if (selectedCounter) {
            setLoadingEndCounter(true);
            const data = await apiService.endContador(selectedCounter.id);
            toast.success(data.message || 'Contador encerrado com sucesso!');
            setLoadingEndCounter(false);
            refreshCounter();
        } else {
            toast.error('Selecione um contador primeiro!');
        }
    }

    // Função para gerar os dados com nomes substituídos para o export/print
    const getCounterWithNames = counter.map(transaction => {

        const deviceMatch = devices.find(device => device.zktecoDeviceID === transaction.deviceID);
        const deviceName = deviceMatch?.deviceName || 'Sem Dados';

        return {
            ...transaction,
            deviceID: deviceName,
        };
    });

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="datatable-container">
                <div className="datatable-title-text">
                    <span style={{ color: '#009739' }}>Contadores</span>
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
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshCounter} />
                        <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        <ExportButton allData={getCounterWithNames} selectedData={selectedRows} fields={recolhaMoedeiroEContadorFields} />
                        <PrintButton data={getCounterWithNames} fields={recolhaMoedeiroEContadorFields} />
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
                        defaultSortFieldId="dataRecolha"
                    />
                </div>
                <div className="content-section deviceTabsMobile" style={{ marginTop: 'auto' }}>
                    <div>
                        <Tabs
                            id="controlled-tab-terminals-buttons"
                            activeKey={userTabKey}
                            onSelect={handleUserSelect}
                            className="nav-modal"
                        >
                            <Tab eventKey="endCounter" title="Contador">
                                <div style={{ display: "flex", marginTop: 10 }}>
                                    <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={handleEndCounter}>
                                        {loadingEndCounter ? (
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                        ) : (
                                            <i className="bi bi-stop-circle" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                        )}
                                        Encerrar
                                    </Button>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={recolhaMoedeiroEContadorFields}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
                />
            )}
            <CreateRecolhaMoedeiroEContadorModal
                title="Iniciar Contador"
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleStartContador}
                fields={recolhaMoedeiroEContadorFields}
            />
        </div>
    );
}