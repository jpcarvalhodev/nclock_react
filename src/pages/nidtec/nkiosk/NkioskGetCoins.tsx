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
import { UpdateRecolhaMoedeiroModal } from "../../../modals/UpdateRecolhaMoedeiroModal";

export const NkioskGetCoins = () => {
    const { navbarColor, footerColor } = useColor();
    const { devices } = useContext(TerminalsContext) as DeviceContextType;
    const [getCoins, setGetCoins] = useState<RecolhaMoedeiroEContador[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['dataRecolha', 'pessoaResponsavel', 'numeroMoedas', 'valorTotalRecolhido', 'diferencaMoedas', 'deviceID']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [selectedRows, setSelectedRows] = useState<RecolhaMoedeiroEContador[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedRecolhaMoedeiro, setSelectedRecolhaMoedeiro] = useState<any>(null);

    // Função para buscar as recolhas do moedeiro
    const fetchAllCoinRecoveredData = async () => {
        try {
            const data = await apiService.fetchRecolhasMoedeiro();
            if (Array.isArray(data)) {
                setGetCoins(data);
            } else {
                setGetCoins([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de recolha do moedeiro:', error);
        }
    };

    // Função para adicionar recolha do moedeiro
    const handleAddRecolhaMoedeiro = async (recolhaMoedeiro: RecolhaMoedeiroEContador) => {
        try {
            const data = await apiService.addRecolhaMoedeiro(recolhaMoedeiro);
            setGetCoins([...getCoins, data]);
            toast.success(data.message || 'Recolha do moedeiro adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar recolha do moedeiro:', error);
        } finally {
            setShowAddModal(false);
            refreshRecolhaMoedeiro();
        }
    };

    // Função para atualizar recolha do moedeiro
    const handleUpdateRecolhaMoedeiro = async (recolhaMoedeiro: RecolhaMoedeiroEContador) => {
        try {
            const data = await apiService.updateRecolhaMoedeiro(recolhaMoedeiro);
            setGetCoins(getCoins.map(item => (item.id === data.id ? data : item)));
            toast.success(data.message || 'Recolha do moedeiro atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar recolha do moedeiro:', error);
        } finally {
            setShowUpdateModal(false);
            refreshRecolhaMoedeiro();
        }
    };

    // Busca os pagamentos dos terminais ao carregar a página
    useEffect(() => {
        fetchAllCoinRecoveredData();
    }, []);

    // Função para atualizar as recolhas do moedeiro
    const refreshRecolhaMoedeiro = () => {
        fetchAllCoinRecoveredData();
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Função para editar uma recolha do moedeiro
    const handleEditRecolhas = (recolhaMoedeiro: RecolhaMoedeiroEContador) => {
        setSelectedRecolhaMoedeiro(recolhaMoedeiro);
        setShowUpdateModal(true);
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
        setSelectedColumns(['dataRecolha', 'pessoaResponsavel', 'numeroMoedas', 'valorTotalRecolhido', 'diferencaMoedas', 'deviceID']);
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
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define as colunas da tabela
    const columns: TableColumn<RecolhaMoedeiroEContador>[] = recolhaMoedeiroEContadorFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: RecolhaMoedeiroEContador) => {
                switch (field.key) {
                    case 'dataRecolha':
                        return new Date(row.dataRecolha).toLocaleString();
                    case 'dataFimRecolha':
                        return new Date(row.dataFimRecolha).toLocaleString();
                    case 'deviceID':
                        return devices.find(device => device.zktecoDeviceID === row.deviceID)?.deviceName || 'Sem Dados';
                    case 'numeroMoedasSistema':
                        return `${row[field.key]}€`;
                    case 'valorTotalRecolhido':
                        return `${row[field.key]}€`;
                    case 'diferencaEuros':
                        return `${row[field.key]}€`;
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={getCoins} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
                sortFunction: (rowA, rowB) => new Date(rowB.dataRecolha).getTime() - new Date(rowA.dataRecolha).getTime()
            };
        });

    // Filtra os dados da tabela
    const filteredDataTable = getCoins.filter(getCoin =>
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

    // Calcula o total do valor das recolhas
    const totalAmount = filteredDataTable.reduce((total, getCoins) => {
        return total + (typeof getCoins.valorTotal === 'number' ? getCoins.valorTotal : parseFloat(getCoins.valorTotal) || 0);
    }, 0);

    // Função para gerar os dados com nomes substituídos para o export/print
    const getCoinsWithNames = getCoins.map(transaction => {

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
                    <span style={{ color: '#009739' }}>Recolhas do Moedeiro</span>
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
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshRecolhaMoedeiro} />
                        <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        <ExportButton allData={getCoinsWithNames} selectedData={selectedRows} fields={recolhaMoedeiroEContadorFields} />
                        <PrintButton data={getCoinsWithNames} fields={recolhaMoedeiroEContadorFields} />
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
                        onRowDoubleClicked={handleEditRecolhas}
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
                        defaultSortAsc={true}
                        defaultSortFieldId="dataRecolha"
                    />
                </div>
                <div style={{ marginLeft: 30 }}>
                    <strong>Valor Total das Recolhas: </strong>{totalAmount.toFixed(2)}€
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
                title="Nova Recolha do Moedeiro"
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleAddRecolhaMoedeiro}
                fields={recolhaMoedeiroEContadorFields}
            />
            {selectedRecolhaMoedeiro && (
                <UpdateRecolhaMoedeiroModal
                    open={showUpdateModal}
                    onClose={() => setShowUpdateModal(false)}
                    onUpdate={handleUpdateRecolhaMoedeiro}
                    entity={selectedRecolhaMoedeiro}
                    fields={recolhaMoedeiroEContadorFields}
                    title="Atualizar Recolha do Moedeiro"
                />
            )}
        </div>
    );
}