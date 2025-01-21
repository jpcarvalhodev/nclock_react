import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import Split from "react-split";
import { toast } from "react-toastify";

import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import { PrintButton } from "../../../components/PrintButton";
import { SelectFilter } from "../../../components/SelectFilter";
import { TreeViewDataDevice } from "../../../components/TreeViewDevice";
import { useKiosk } from "../../../context/KioskContext";
import { useNavbar } from "../../../context/NavbarContext";
import * as apiService from "../../../api/apiService";
import { recolhaMoedeiroEContadorFields, resetFields } from "../../../fields/Fields";
import { RecolhaMoedeiroEContador, ResetCoin } from "../../../types/Types";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { CreateRecolhaMoedeiroEContadorModal } from "../../../modals/CreateRecolhaMoedeiroEContadorModal";
import { DeleteModal } from "../../../modals/DeleteModal";
import { ResetCoinModal } from "../../../modals/ResetCoinModal";
import { UpdateRecolhaMoedeiroModal } from "../../../modals/UpdateRecolhaMoedeiroModal";
import { useTerminals } from "../../../context/TerminalsContext";

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T00:00`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T23:59`;
}

// Define a interface para as propriedades do componente CustomSearchBox
function CustomSearchBox(props: TextFieldProps) {
    return (
        <TextField
            {...props}
            className="SearchBox"
        />
    );
}

export const NkioskGetCoins = () => {
    const { navbarColor, footerColor } = useNavbar();
    const { devices } = useTerminals();
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    const { getCoins, setGetCoins, fetchAllCoin, handleAddRecolhaMoedeiro, handleUpdateRecolhaMoedeiro, handleDeleteRecolhaMoedeiro } = useKiosk();
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['dataRecolha', 'pessoaResponsavel', 'numeroMoedas', 'valorTotalRecolhido', 'diferencaMoedas', 'deviceID']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [selectedRows, setSelectedRows] = useState<RecolhaMoedeiroEContador[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedRecolhaMoedeiro, setSelectedRecolhaMoedeiro] = useState<any>(null);
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [initialData, setInitialData] = useState<Partial<RecolhaMoedeiroEContador> | null>(null);
    const [currentGetCoinIndex, setCurrentGetCoinIndex] = useState(0);
    const [loadingReset, setLoadingReset] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<RecolhaMoedeiroEContador[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedRecolhasForDelete, setSelectedRecolhasForDelete] = useState<any | null>(null);

    // Função para buscar as recolhas do moedeiro entre datas
    const fetchCoinsBetweenDates = async () => {
        try {
            const data = await apiService.fetchRecolhasMoedeiro(startDate, endDate);
            if (Array.isArray(data)) {
                setGetCoins(data);
            } else {
                setGetCoins([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de recolha do moedeiro:', error);
        }
    };

    // Função para buscar os dados de aberturas manuais de hoje
    const fetchRecolhasToday = async () => {
        const today = new Date();
        const start = formatDateToStartOfDay(today);
        const end = formatDateToEndOfDay(today);
        try {
            const data = await apiService.fetchRecolhasMoedeiro(start, end);
            if (Array.isArray(data)) {
                setGetCoins(data);
            } else {
                setGetCoins([]);
            }
            setStartDate(start);
            setEndDate(end);
        } catch (error) {
            console.error('Erro ao buscar os dados de recolha do moedeiro hoje:', error);
        }
    }

    // Função para buscar os dados de aberturas manuais de ontem
    const fetchRecolhasForPreviousDay = async () => {
        const prevDate = new Date(startDate);
        prevDate.setDate(prevDate.getDate() - 1);

        const start = formatDateToStartOfDay(prevDate);
        const end = formatDateToEndOfDay(prevDate);

        try {
            const data = await apiService.fetchRecolhasMoedeiro(start, end);
            if (Array.isArray(data)) {
                setGetCoins(data);
            } else {
                setGetCoins([]);
            }
            setStartDate(start);
            setEndDate(end);
        } catch (error) {
            console.error('Erro ao buscar os dados de recolha do moedeiro ontem:', error);
        }
    };

    // Função para buscar os dados de aberturas manuais de amanhã
    const fetchRecolhasForNextDay = async () => {
        const newDate = new Date(endDate);
        newDate.setDate(newDate.getDate() + 1);

        if (newDate > new Date()) {
            console.error("Não é possível buscar recolhas para uma data no futuro.");
            return;
        }

        const start = formatDateToStartOfDay(newDate);
        const end = formatDateToEndOfDay(newDate);

        try {
            const data = await apiService.fetchRecolhasMoedeiro(start, end);
            if (Array.isArray(data)) {
                setGetCoins(data);
            } else {
                setGetCoins([]);
            }
            setStartDate(start);
            setEndDate(end);
        } catch (error) {
            console.error('Erro ao buscar os dados de recolha do moedeiro amanhã:', error);
        }
    };

    // Função para adicionar recolha do moedeiro
    const addRecolhaMoedeiro = async (recolhaMoedeiro: RecolhaMoedeiroEContador) => {
        await handleAddRecolhaMoedeiro(recolhaMoedeiro);
        setClearSelectionToggle((prev) => !prev);
    };

    // Função para atualizar recolha do moedeiro
    const updateRecolhaMoedeiro = async (recolhaMoedeiro: RecolhaMoedeiroEContador) => {
        await handleUpdateRecolhaMoedeiro(recolhaMoedeiro);
        setClearSelectionToggle((prev) => !prev);
    };

    // Função para apagar recolha do moedeiro
    const deleteRecolhaMoedeiro = async (id: string[]) => {
        await handleDeleteRecolhaMoedeiro(id);
        setClearSelectionToggle((prev) => !prev);
    };

    // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
    useEffect(() => {
        if (selectedDevicesIds.length > 0) {
            const filtered = getCoins.filter(moveCards => selectedDevicesIds.includes(moveCards.deviceSN));
            setFilteredDevices(filtered);
        } else {
            setFilteredDevices(getCoins);
        }
    }, [selectedDevicesIds, getCoins]);

    // Função para atualizar as recolhas do moedeiro
    const refreshRecolhaMoedeiro = () => {
        fetchAllCoin();
        setStartDate(formatDateToStartOfDay(pastDate));
        setEndDate(formatDateToEndOfDay(currentDate));
        setClearSelectionToggle((prev) => !prev);
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
        const sortedSelectedRows = state.selectedRows.sort((a, b) => new Date(b.dataRecolha).getTime() - new Date(a.dataRecolha).getTime());
        setSelectedRows(sortedSelectedRows);
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define a seleção da árvore
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        setSelectedDevicesIds(selectedIds);
    };

    // Seleciona a entidade anterior
    const handleNextGetCoin = () => {
        if (currentGetCoinIndex < getCoins.length - 1) {
            setCurrentGetCoinIndex(currentGetCoinIndex + 1);
            setSelectedRecolhaMoedeiro(getCoins[currentGetCoinIndex + 1]);
        }
    };

    // Seleciona a entidade seguinte
    const handlePrevGetCoin = () => {
        if (currentGetCoinIndex > 0) {
            setCurrentGetCoinIndex(currentGetCoinIndex - 1);
            setSelectedRecolhaMoedeiro(getCoins[currentGetCoinIndex - 1]);
        }
    };

    // Filtra os dados da tabela
    const filteredDataTable = filteredDevices.filter(getCoin =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (getCoin[key] != null && String(getCoin[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(getCoin).some(([key, value]) => {
            if (selectedColumns.includes(key) && value != null) {
                if (value instanceof Date) {
                    return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
                } else {
                    return value.toString().toLowerCase().includes(filterText.toLowerCase());
                }
            }
            return false;
        })
    ).sort((a, b) => new Date(b.dataRecolha).getTime() - new Date(a.dataRecolha).getTime());

    // Define a função de duplicar funcionários
    const handleDuplicate = (data: Partial<RecolhaMoedeiroEContador>) => {
        setInitialData(data);
        setShowAddModal(true);
        setSelectedRecolhaMoedeiro(null);
        setShowUpdateModal(false);
    }

    // Função para abrir o modal de atualização
    const handleEditRecolha = (entity: RecolhaMoedeiroEContador) => {
        setSelectedRecolhaMoedeiro(entity);
        setShowUpdateModal(true);
    }

    // Função para abrir o modal de apagar recolhas
    const handleOpenDeleteModal = (id: string) => {
        setSelectedRecolhasForDelete(id);
        setShowDeleteModal(true);
    };

    // Função para apagar recolhas selecionadas
    const handleSelectedRecolhasToDelete = () => {
        const coinsIds = Array.from(new Set(selectedRows.map(recolhas => recolhas.id)));
        setSelectedRecolhasForDelete(coinsIds);
        setShowDeleteModal(true);
    };

    // Configurando a função onDelete para iniciar o processo de exclusão
    const startDeletionProcess = () => {
        let coinIds;

        if (Array.isArray(selectedRecolhasForDelete)) {
            coinIds = selectedRecolhasForDelete;
        } else if (selectedRecolhasForDelete) {
            coinIds = [selectedRecolhasForDelete];
        } else {
            coinIds = Array.from(new Set(selectedRows.map(coin => coin.id)));
        }

        setShowDeleteModal(false);
        deleteRecolhaMoedeiro(coinIds);
    };

    // Define as colunas da tabela
    const columns: TableColumn<RecolhaMoedeiroEContador>[] = recolhaMoedeiroEContadorFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: RecolhaMoedeiroEContador) => {
                switch (field.key) {
                    case 'dataRecolha':
                        return new Date(row.dataRecolha).toLocaleString() || '';
                    case 'dataFimRecolha':
                        return new Date(row.dataFimRecolha).toLocaleString() || '';
                    case 'deviceID':
                        return devices.find(device => device.zktecoDeviceID === row.deviceID)?.deviceName || 'Sem Dados';
                    case 'numeroMoedas':
                        return row[field.key] || '0';
                    case 'numeroMoedasSistema':
                        return row[field.key] || '0';
                    case 'diferencaMoedas':
                        return row[field.key] || '0';
                    case 'valorTotalRecolhido':
                        return `${row[field.key]}€` || '0€';
                    case 'valorTotalSistema':
                        return `${row[field.key]}€` || '0€';;
                    case 'diferencaEuros':
                        return `${row[field.key]}€` || '0€';;
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

    // Define a coluna de ações
    const actionColumn: TableColumn<RecolhaMoedeiroEContador> = {
        name: 'Ações',
        cell: (row: RecolhaMoedeiroEContador) => (
            <div style={{ display: 'flex' }}>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Duplicar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-copy' onClick={() => handleDuplicate(row)} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Editar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-pencil-fill' onClick={() => handleEditRecolha(row)} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Apagar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-trash-fill' onClick={() => handleOpenDeleteModal(row.id)} />
                </OverlayTrigger>
            </div>
        ),
        selector: (row: RecolhaMoedeiroEContador) => row.id,
        ignoreRowClick: true,
    };

    // Calcula o total do valor das recolhas
    const totalAmount = filteredDataTable.reduce((total, getCoins) => {
        return total + (typeof getCoins.valorTotalRecolhido === 'number' ? getCoins.valorTotalRecolhido : parseFloat(getCoins.valorTotal) || 0);
    }, 0);

    // Calcula o total do valor das diferenças
    const totalAmountDifference = filteredDataTable.reduce((total, getCoins) => {
        return total + (typeof getCoins.diferencaEuros === 'number' ? getCoins.diferencaEuros : parseFloat(getCoins.valorTotal) || 0);
    }, 0);

    // Função para gerar os dados com nomes substituídos para o export/print
    const transformTransactionWithNames = (transaction: { deviceID: string; }) => {

        const deviceMatch = devices.find(device => device.zktecoDeviceID === transaction.deviceID);
        const deviceName = deviceMatch?.deviceName || 'Sem Dados';

        return {
            ...transaction,
            deviceID: deviceName,
        };
    };

    // Dados dos pagamentos com nomes substituídos
    const getCoinsWithNames = filteredDataTable.map(transformTransactionWithNames);

    // Transforma as linhas selecionadas com nomes substituídos
    const selectedRowsWithNames = selectedRows.map(transformTransactionWithNames);

    // Função para abrir manualmente
    const handleReset = () => {
        setLoadingReset(true);
        setModalOpen(true);
    }

    // Função para fechar o modal de reset
    const handleCloseReset = () => {
        setLoadingReset(false);
        setModalOpen(false);
    }

    // Função para enviar a abertura manualmente
    const handleResetCoins = async (resetCoin: ResetCoin) => {
        setModalOpen(false);
        try {
            const data = await apiService.resetRecolhaMoedeiro(resetCoin);
            setLoadingReset(false);
            toast.success(data.message || 'Abertura manual com sucesso!');
        } catch (error) {
            setLoadingReset(false);
            console.error('Erro ao abrir manualmente', error);
        } finally {
            fetchAllCoin();
        }
    }

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return recolhaMoedeiroEContadorFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='content-container'>
                <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewDataDevice onSelectDevices={handleSelectFromTreeView} />
                    </div>
                    <div className="datatable-container">
                        <div className="datatable-title-text">
                            <span style={{ color: '#009739' }}>Recolhas do Moedeiro</span>
                        </div>
                        <div className="datatable-header">
                            <div>
                                <CustomSearchBox
                                    label="Pesquisa"
                                    variant="outlined"
                                    size='small'
                                    value={filterText}
                                    onChange={e => setFilterText(e.target.value)}
                                    style={{ marginTop: -5 }}
                                />
                            </div>
                            <div className="buttons-container-others">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshRecolhaMoedeiro} />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Adicionar</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Colunas</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Apagar Selecionados</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-trash-fill" onClick={handleSelectedRecolhasToDelete} iconSize='1.1em' />
                                </OverlayTrigger>
                                <ExportButton allData={getCoinsWithNames} selectedData={selectedRows.length > 0 ? selectedRowsWithNames : getCoinsWithNames} fields={getSelectedFields()} />
                                <PrintButton data={selectedRows.length > 0 ? selectedRowsWithNames : getCoinsWithNames} fields={getSelectedFields()} />
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Reset</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-stop-circle" onClick={handleReset} iconSize='1.1em' />
                                </OverlayTrigger>
                                {loadingReset && (
                                    <Spinner animation="border" size="sm" style={{ marginLeft: '5px' }} />
                                )}
                            </div>
                            <div className="date-range-search">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Recolhas Dia Anterior</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-arrow-left-circle" onClick={fetchRecolhasForPreviousDay} iconSize='1.1em' />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Recolhas Hoje</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-calendar-event" onClick={fetchRecolhasToday} iconSize='1.1em' />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Recolhas Dia Seguinte</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-arrow-right-circle" onClick={fetchRecolhasForNextDay} iconSize='1.1em' disabled={new Date(endDate) >= new Date(new Date().toISOString().substring(0, 10))} />
                                </OverlayTrigger>
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
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Buscar</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-search" onClick={fetchCoinsBetweenDates} iconSize='1.1em' />
                                </OverlayTrigger>
                            </div>
                        </div>
                        <div className='table-css'>
                            <DataTable
                                columns={[...columns, actionColumn]}
                                data={filteredDataTable}
                                pagination
                                paginationComponentOptions={paginationOptions}
                                paginationPerPage={20}
                                selectableRows
                                onSelectedRowsChange={handleRowSelected}
                                clearSelectedRows={clearSelectionToggle}
                                selectableRowsHighlight
                                onRowDoubleClicked={handleEditRecolhas}
                                noDataComponent="Não existem dados disponíveis para exibir."
                                customStyles={customStyles}
                                striped
                                defaultSortAsc={true}
                                defaultSortFieldId="dataRecolha"
                            />
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{ marginLeft: 10, marginRight: 10 }}>
                                <strong>Valor Total: </strong>Recolhas - {totalAmount.toFixed(2)}€ | Diferença - {totalAmountDifference.toFixed(2)}€
                            </div>
                        </div>
                    </div>
                </Split>
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
                onSave={addRecolhaMoedeiro}
                fields={recolhaMoedeiroEContadorFields}
                initialValuesData={initialData || {}}
            />
            {selectedRecolhaMoedeiro && (
                <UpdateRecolhaMoedeiroModal
                    open={showUpdateModal}
                    onClose={() => setShowUpdateModal(false)}
                    onUpdate={updateRecolhaMoedeiro}
                    entity={selectedRecolhaMoedeiro}
                    fields={recolhaMoedeiroEContadorFields}
                    onDuplicate={handleDuplicate}
                    title="Atualizar Recolha do Moedeiro"
                    canMoveNext={currentGetCoinIndex < getCoins.length - 1}
                    canMovePrev={currentGetCoinIndex > 0}
                    onNext={handleNextGetCoin}
                    onPrev={handlePrevGetCoin}
                />
            )}
            <DeleteModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={startDeletionProcess}
                entityId={selectedRecolhasForDelete}
            />
            {modalOpen && (
                <ResetCoinModal
                    open={modalOpen}
                    onClose={handleCloseReset}
                    onSave={handleResetCoins}
                    fields={resetFields}
                    title="Reset de Recolha do Moedeiro"
                />
            )}
        </div>
    );
}