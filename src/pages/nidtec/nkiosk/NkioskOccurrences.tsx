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
import { DeleteModal } from "../../../modals/DeleteModal";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { UpdateLimpezaOcorrenciaModal } from "../../../modals/UpdateLimpezaOcorrenciaModal";
import { TerminalsContext, DeviceContextType } from "../../../context/TerminalsContext";
import { useLocation } from "react-router-dom";
import Split from "react-split";
import { TreeViewDataNkioskDisp } from "../../../components/TreeViewNkioskDisp";
import { TextFieldProps, TextField } from "@mui/material";

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
            InputLabelProps={{
                className: "SearchBox-label"
            }}
            InputProps={{
                className: "SearchBox-input",
                ...props.InputProps,
            }}
        />
    );
}

export const NkioskOccurrences = () => {
    const { navbarColor, footerColor } = useColor();
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    const { devices, fetchAllDevices } = useContext(TerminalsContext) as DeviceContextType;
    const [occurrences, setOccurrences] = useState<LimpezasEOcorrencias[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['dataCreate', 'responsavel', 'observacoes', 'deviceName']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [selectedRows, setSelectedRows] = useState<LimpezasEOcorrencias[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedOcurrencesForDelete, setSelectedOcurrencesForDelete] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<Partial<LimpezasEOcorrencias> | null>(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedOccurrence, setSelectedOccurrence] = useState<LimpezasEOcorrencias | null>(null);
    const [currentOccurrenceIndex, setCurrentOccurrenceIndex] = useState(0);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<LimpezasEOcorrencias[]>([]);
    const location = useLocation();
    const tipo = 2;

    // Função para buscar as Ocorrências
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

    // Função para buscar as Ocorrências entre datas
    const fetchOcorrenciasBetweenDates = async () => {
        try {
            const data = await apiService.fetchAllCleaningsAndOccurrences(tipo, startDate, endDate);
            if (Array.isArray(data)) {
                setOccurrences(data);
            } else {
                setOccurrences([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de ocorrências:', error);
        }
    };

    // Função para adicionar Ocorrências
    const handleAddOcorrencia = async (occurrence: LimpezasEOcorrencias) => {
        try {
            const data = await apiService.addOccurrence(occurrence);
            setOccurrences([...occurrences, data]);
            toast.success(data.message || 'Ocorrência adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar nova ocorrência:', error);
        } finally {
            fetchAllOcorrencias();
        }
    };

    // Função para atualizar ocorrências
    const handleUpdateOcorrencia = async (occurrence: LimpezasEOcorrencias) => {
        try {
            const data = await apiService.updateOccurrence(occurrence);
            setOccurrences(occurrences.map(oc => (oc.id === data.id ? data : oc)));
            toast.success(data.message || 'Ocorrência atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar ocorrência:', error);
        } finally {
            fetchAllOcorrencias();
        }
    };

    // Função para apagar Ocorrências
    const handleDeleteOcurrences = async (id: string) => {
        try {
            const data = await apiService.deleteOccurrence(id);
            toast.success(data.message || 'Ocorrência apagada com sucesso!');
        } catch (error) {
            console.error('Erro ao apagar ocorrência:', error);
        } finally {
            fetchAllOcorrencias();
        }
    }

    // Busca os pagamentos dos terminais ao carregar a página
    useEffect(() => {
        const fetchDevices = async () => {
            const data = await fetchAllDevices();
            if (data.length > 0) {
                fetchAllOcorrencias();
            }
        }
        fetchDevices();
    }, [location]);

    // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
    useEffect(() => {
        if (selectedDevicesIds.length > 0) {
            const filtered = occurrences.filter(moveCards => selectedDevicesIds.includes(moveCards.deviceSN));
            setFilteredDevices(filtered);
        } else {
            setFilteredDevices(occurrences);
        }
    }, [selectedDevicesIds, occurrences]);

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

    // Define a seleção da árvore
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        setSelectedDevicesIds(selectedIds);
    };

    // Define os dados iniciais ao duplicar
    const handleDuplicate = (entity: Partial<LimpezasEOcorrencias>) => {
        setInitialData(entity);
        setShowAddModal(true);
        setSelectedOccurrence(null);
        setShowUpdateModal(false);
    }

    // Função para abrir o modal de atualização
    const handleEditOcorrencias = (entity: LimpezasEOcorrencias) => {
        setSelectedOccurrence(entity);
        setShowUpdateModal(true);
    }

    // Seleciona a entidade anterior
    const handleNextOccurences = () => {
        if (currentOccurrenceIndex < occurrences.length - 1) {
            setCurrentOccurrenceIndex(currentOccurrenceIndex + 1);
            setSelectedOccurrence(occurrences[currentOccurrenceIndex + 1]);
        }
    };

    // Seleciona a entidade seguinte
    const handlePrevOccurences = () => {
        if (currentOccurrenceIndex > 0) {
            setCurrentOccurrenceIndex(currentOccurrenceIndex - 1);
            setSelectedOccurrence(occurrences[currentOccurrenceIndex - 1]);
        }
    };

    // Função para abrir o modal de apagar limpeza
    const handleOpenDeleteModal = (id: string) => {
        setSelectedOcurrencesForDelete(id);
        setShowDeleteModal(true);
    };

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
                        <SelectFilter column={field.key} setFilters={setFilters} data={occurrences} />
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
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Duplicar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-copy' onClick={() => handleDuplicate(row)} />
                </OverlayTrigger>
                <CustomOutlineButton className="action-button" icon='bi bi-pencil-fill' onClick={() => handleEditOcorrencias(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.id)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: LimpezasEOcorrencias) => row.id,
        ignoreRowClick: true,
    };

    // Filtra os dados da tabela
    const filteredDataTable = filteredDevices.filter(getCoin =>
        new Date(getCoin.dataCreate) >= new Date(startDate) && new Date(getCoin.dataCreate) <= new Date(endDate) &&
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

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return limpezasEOcorrenciasFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='content-container'>
                <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewDataNkioskDisp onSelectDevices={handleSelectFromTreeView} />
                    </div>
                    <div className="datatable-container">
                        <div className="datatable-title-text">
                            <span style={{ color: '#009739' }}>Ocorrências</span>
                        </div>
                        <div className="datatable-header">
                            <div>
                                <CustomSearchBox
                                    label="Pesquisa"
                                    variant="outlined"
                                    size='small'
                                    value={filterText}
                                    onChange={e => setFilterText(e.target.value)}
                                    style={{ marginTop: -5}}
                                />
                            </div>
                            <div className="buttons-container-others">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshOcorrencias} />
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
                                <ExportButton allData={filteredDataTable} selectedData={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={getSelectedFields()} />
                                <PrintButton data={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={getSelectedFields()} />
                            </div>
                            <div className="date-range-search">
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
                                    <CustomOutlineButton icon="bi-search" onClick={fetchOcorrenciasBetweenDates} iconSize='1.1em' />
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
                                onRowDoubleClicked={handleEditOcorrencias}
                                selectableRowsHighlight
                                noDataComponent="Não existem dados disponíveis para exibir."
                                customStyles={customStyles}
                                striped
                                defaultSortAsc={true}
                                defaultSortFieldId="dataCreate"
                            />
                        </div>
                    </div>
                </Split>
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
                initialValuesData={initialData || {}}
            />
            {selectedOccurrence && (
                <UpdateLimpezaOcorrenciaModal
                    title="Atualizar Ocorrência"
                    open={showUpdateModal}
                    onClose={() => setShowUpdateModal(false)}
                    onUpdate={handleUpdateOcorrencia}
                    fields={limpezasEOcorrenciasFields}
                    entity={selectedOccurrence}
                    onDuplicate={handleDuplicate}
                    canMoveNext={currentOccurrenceIndex < occurrences.length - 1}
                    canMovePrev={currentOccurrenceIndex > 0}
                    onNext={handleNextOccurences}
                    onPrev={handlePrevOccurences}
                />
            )}
            <DeleteModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDeleteOcurrences}
                entityId={selectedOcurrencesForDelete}
            />
        </div>
    );
}