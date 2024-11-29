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
import { limpezasEOcorrenciasFields } from "../../../helpers/Fields";
import { CreateLimpezaOcorrenciaModal } from "../../../modals/CreateLimpezaOcorrenciaModal";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { DeleteModal } from "../../../modals/DeleteModal";
import { UpdateLimpezaOcorrenciaModal } from "../../../modals/UpdateLimpezaOcorrenciaModal";
import { TerminalsContext, DeviceContextType } from "../../../context/TerminalsContext";
import { useLocation } from "react-router-dom";

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

export const NkioskCleaning = () => {
    const { navbarColor, footerColor } = useColor();
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    const { devices, fetchAllDevices } = useContext(TerminalsContext) as DeviceContextType;
    const [cleaning, setCleaning] = useState<LimpezasEOcorrencias[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['dataCreate', 'responsavel', 'observacoes', 'deviceName']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [selectedRows, setSelectedRows] = useState<LimpezasEOcorrencias[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedCleaning, setSelectedCleaning] = useState<LimpezasEOcorrencias | null>(null);
    const [initialData, setInitialData] = useState<Partial<LimpezasEOcorrencias> | null>(null);
    const [currentCleaningIndex, setCurrentCleaningIndex] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCleaningForDelete, setSelectedCleaningForDelete] = useState<string | null>(null);
    const location = useLocation();
    const tipo = 1;

    // Função para buscar as limpezas
    const fetchAllLimpezas = async () => {
        try {
            const data = await apiService.fetchAllCleaningsAndOccurrences(tipo);
            if (Array.isArray(data)) {
                setCleaning(data);
            } else {
                setCleaning([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de limpezas:', error);
        }
    };

    // Função para buscar as limpezas entre datas
    const fetchLimpezasBetweenDates = async () => {
        try {
            const data = await apiService.fetchAllCleaningsAndOccurrences(tipo, startDate, endDate);
            if (Array.isArray(data)) {
                setCleaning(data);
            } else {
                setCleaning([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de limpezas:', error);
        }
    };

    // Função para adicionar limpezas
    const handleAddLimpezas = async (limpezas: LimpezasEOcorrencias) => {
        try {
            const data = await apiService.addCleaning(limpezas);
            setCleaning([...cleaning, data]);
            toast.success(data.message || 'Limpeza adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar nova limpeza:', error);
        } finally {
            refreshLimpezas();
        }
    };

    // Função para atualizar limpezas
    const handleUpdateCleaning = async (limpezas: LimpezasEOcorrencias) => {
        try {
            const data = await apiService.updateCleaning(limpezas);
            const updatedCleaning = cleaning.map(cleaning => cleaning.id === data.id ? data : cleaning);
            setCleaning(updatedCleaning);
            toast.success(data.message || 'Limpeza atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar a limpeza:', error);
        } finally {
            refreshLimpezas();
        }
    }

    // Função para apagar limpezas
    const handleDeleteCleaning = async (id: string) => {
        try {
            const data = await apiService.deleteCleaning(id);
            toast.success(data.message || 'Limpeza apagada com sucesso!');
        } catch (error) {
            console.error('Erro ao apagar a limpeza:', error);
        } finally {
            refreshLimpezas();
        }
    };

    // Busca os pagamentos dos terminais ao carregar a página
    useEffect(() => {
        const fetchDevices = async () => {
            const data = await fetchAllDevices();
            if (data.length > 0) {
                fetchAllLimpezas();
            }
        }
        fetchDevices();
    }, [location]);

    // Função para atualizar as recolhas do moedeiro
    const refreshLimpezas = () => {
        fetchAllLimpezas();
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
        setSelectedColumns(['dataCreate', 'responsavel', 'observacoes', 'deviceName']);
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
        const sortedSelectedRows = state.selectedRows.sort((a, b) => new Date(b.dataCreate).getTime() - new Date(a.dataCreate).getTime());
        setSelectedRows(sortedSelectedRows);
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define os dados iniciais ao duplicar
    const handleDuplicate = (entity: Partial<LimpezasEOcorrencias>) => {
        setInitialData(entity);
        setShowAddModal(true);
        setSelectedCleaning(null);
        setShowUpdateModal(false);
    }

    // Função para abrir o modal de atualização
    const handleEditLimpezas = (entity: LimpezasEOcorrencias) => {
        setSelectedCleaning(entity);
        setShowUpdateModal(true);
    }

    // Seleciona a entidade anterior
    const handleNextCleaning = () => {
        if (currentCleaningIndex < cleaning.length - 1) {
            setCurrentCleaningIndex(currentCleaningIndex + 1);
            setSelectedCleaning(cleaning[currentCleaningIndex + 1]);
        }
    };

    // Seleciona a entidade seguinte
    const handlePrevCleaning = () => {
        if (currentCleaningIndex > 0) {
            setCurrentCleaningIndex(currentCleaningIndex - 1);
            setSelectedCleaning(cleaning[currentCleaningIndex - 1]);
        }
    };

    // Função para abrir o modal de apagar limpeza
    const handleOpenDeleteModal = (id: string) => {
        setSelectedCleaningForDelete(id);
        setShowDeleteModal(true);
    };

    // Filtra os dados da tabela
    const filteredDataTable = cleaning.filter(getCoin =>
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
    .sort((a, b) => new Date(b.dataCreate).getTime() - new Date(a.dataCreate).getTime());

    // Define as colunas da tabela
    const columns: TableColumn<LimpezasEOcorrencias>[] = limpezasEOcorrenciasFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: LimpezasEOcorrencias) => {
                switch (field.key) {
                    case 'dataCreate':
                        return new Date(row.dataCreate).toLocaleString() || '';
                    case 'deviceId':
                        return devices.find(device => device.zktecoDeviceID === row.deviceId)?.deviceName || '';
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
                sortFunction: (rowA, rowB) => new Date(rowB.dataCreate).getTime() - new Date(rowA.dataCreate).getTime()
            };
        });

    // Define a coluna de ações
    const actionColumn: TableColumn<LimpezasEOcorrencias> = {
        name: 'Ações',
        cell: (row: LimpezasEOcorrencias) => (
            <div style={{ display: 'flex' }}>
                <OverlayTrigger
                    placement="left"
                    overlay={<Tooltip className="custom-tooltip">Duplicar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-copy' onClick={() => handleDuplicate(row)} />
                </OverlayTrigger>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditLimpezas(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.id)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: LimpezasEOcorrencias) => row.id,
        ignoreRowClick: true,
    };

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="datatable-container">
                <div className="datatable-title-text">
                    <span style={{ color: '#009739' }}>Limpezas</span>
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
                            placement="left"
                            overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
                        >
                            <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshLimpezas} />
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="left"
                            overlay={<Tooltip className="custom-tooltip">Adicionar</Tooltip>}
                        >
                            <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="left"
                            overlay={<Tooltip className="custom-tooltip">Colunas</Tooltip>}
                        >
                            <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        </OverlayTrigger>
                        <ExportButton allData={filteredDataTable} selectedData={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={limpezasEOcorrenciasFields} />
                        <PrintButton data={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={limpezasEOcorrenciasFields} />
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
                            placement="left"
                            overlay={<Tooltip className="custom-tooltip">Buscar</Tooltip>}
                        >
                            <CustomOutlineButton icon="bi-search" onClick={fetchLimpezasBetweenDates} iconSize='1.1em' />
                        </OverlayTrigger>
                    </div>
                </div>
                <div className='table-css'>
                    <DataTable
                        columns={[...columns, actionColumn]}
                        data={filteredDataTable}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        paginationPerPage={15}
                        onRowDoubleClicked={handleEditLimpezas}
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
                title="Adicionar Limpeza"
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleAddLimpezas}
                fields={limpezasEOcorrenciasFields}
                initialValuesData={initialData || {}}
            />
            {selectedCleaning && (
                <UpdateLimpezaOcorrenciaModal
                    title="Atualizar Limpeza"
                    open={showUpdateModal}
                    onClose={() => setShowUpdateModal(false)}
                    onUpdate={handleUpdateCleaning}
                    fields={limpezasEOcorrenciasFields}
                    onDuplicate={handleDuplicate}
                    entity={selectedCleaning}
                    canMoveNext={currentCleaningIndex < cleaning.length - 1}
                    canMovePrev={currentCleaningIndex > 0}
                    onNext={handleNextCleaning}
                    onPrev={handlePrevCleaning}
                />
            )}
            <DeleteModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDeleteCleaning}
                entityId={selectedCleaningForDelete}
            />
        </div>
    );
}