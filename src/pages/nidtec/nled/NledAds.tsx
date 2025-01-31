import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import Split from "react-split";

import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import { PrintButton } from "../../../components/PrintButton";
import { SelectFilter } from "../../../components/SelectFilter";
import { TreeViewDataNled } from "../../../components/TreeViewNled";
import { useAds } from "../../../context/AdsContext";
import { useNavbar } from "../../../context/NavbarContext";
import { useTerminals } from "../../../context/TerminalsContext";
import { adsFields } from "../../../fields/Fields";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { CreateModalAds } from "../../../modals/CreateModalAds";
import { DeleteModal } from "../../../modals/DeleteModal";
import { UpdateModalAds } from "../../../modals/UpdateModalAds";
import { Ads } from "../../../types/Types";

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

export const NledAds = () => {
    const { navbarColor, footerColor } = useNavbar();
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 365);
    const { devices } = useTerminals();
    const { ads, setAds, fetchAds, handleAddAds, handleUpdateAds, handleDeleteAds } = useAds();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['createDate', 'nomeArquivo', 'tipoArquivo', 'creador', 'dataFim']);
    const [selectedAds, setSelectedAds] = useState<Ads | null>(null);
    const [selectedAdsForDelete, setSelectedAdsForDelete] = useState<string | null>(null);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [filterText, setFilterText] = useState('');
    const [initialData, setInitialData] = useState<Partial<Ads>>({});
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<Ads[]>([]);
    const [currentAdsIndex, setCurrentAdsIndex] = useState(0);
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [selectedRows, setSelectedRows] = useState<Ads[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);

    // Função para buscar os ads de hoje
    const fetchAdsToday = async () => {
        const today = new Date();
        const start = formatDateToStartOfDay(today);
        const end = formatDateToEndOfDay(today);
        try {
            const data = await fetchAds(start, end);
            if (Array.isArray(data)) {
                setAds(data);
            } else {
                setAds([]);
            }
            setStartDate(start);
            setEndDate(end);
        } catch (error) {
            console.error('Erro ao buscar os dados de ads hoje:', error);
        }
    }

    // Função para buscar os ads de ontem
    const fetchAdsForPreviousDay = async () => {
        const prevDate = new Date(startDate);
        prevDate.setDate(prevDate.getDate() - 1);

        const start = formatDateToStartOfDay(prevDate);
        const end = formatDateToEndOfDay(prevDate);

        try {
            const data = await fetchAds(start, end);
            if (Array.isArray(data)) {
                setAds(data);
            } else {
                setAds([]);
            }
            setStartDate(start);
            setEndDate(end);
        } catch (error) {
            console.error('Erro ao buscar os dados de ads ontem:', error);
        }
    }

    // Função para buscar os ads de amanhã
    const fetchAdsForNextDay = async () => {
        const newDate = new Date(endDate);
        newDate.setDate(newDate.getDate() + 1);

        if (newDate > new Date()) {
            console.error("Não é possível buscar ads para uma data no futuro.");
            return;
        }

        const start = formatDateToStartOfDay(newDate);
        const end = formatDateToEndOfDay(newDate);

        try {
            const data = await fetchAds(start, end);
            if (Array.isArray(data)) {
                setAds(data);
            } else {
                setAds([]);
            }
            setStartDate(start);
            setEndDate(end);
        } catch (error) {
            console.error('Erro ao buscar os dados de ads amanhã:', error);
        }
    }

    // Função para adicionar uma publicidade
    const addAds = async (ads: FormData) => {
        await handleAddAds(ads);
    }

    // Função para atualizar uma publicidade
    const updateAds = async (ads: Ads, ad: FormData) => {
        await handleUpdateAds(ads, ad);
    }

    // Função para atualizar as publicidades
    const refreshAds = () => {
        fetchAds();
        setStartDate(formatDateToStartOfDay(pastDate));
        setEndDate(formatDateToEndOfDay(currentDate));
        setClearSelectionToggle((prev) => !prev);
    };

    // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
    useEffect(() => {
        if (selectedDevicesIds.length > 0) {
            const filterDevices = ads.filter(ad => selectedDevicesIds.includes(ad.deviceSN));
            setFilteredDevices(filterDevices);
        } else {
            setFilteredDevices(ads);
        }
    }, [selectedDevicesIds, ads, devices]);

    // Atualiza o índice selecionado
    useEffect(() => {
        if (selectedAds && selectedAds.length > 0) {
            const sortedAds = ads.sort((a, b) => a.createDate.toString().localeCompare(b.createDate.toString()));
            const adsIndex = sortedAds.findIndex(ad => ad.id === selectedAds[0].id);
            setCurrentAdsIndex(adsIndex);
        }
    }, [selectedAds, ads]);

    // Função para editar uma publicidade
    const handleEditAds = (ads: Ads) => {
        setSelectedAds(ads);
        setShowUpdateModal(true);
    };

    // Fecha o modal de edição de publicidade
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedAds(null);
        setClearSelectionToggle((prev) => !prev);
    };

    // Função para abrir o modal de apagar publicidade
    const handleOpenDeleteModal = (id: string) => {
        setSelectedAdsForDelete(id);
        setShowDeleteModal(true);
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
        setSelectedColumns(['createDate', 'nomeArquivo', 'tipoArquivo', 'creador', 'dataFim']);
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

    // Define os dados iniciais do modal de adicionar publicidade
    const handleDuplicate = (entity: Partial<Ads>) => {
        setInitialData(entity);
        setShowAddModal(true);
        setSelectedAds(null);
        setShowUpdateModal(false);
    }

    // Define a seleção da árvore
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        setSelectedDevicesIds(selectedIds);
    };

    // Seleciona a publicidade anterior
    const handleNextAds = () => {
        if (currentAdsIndex < ads.length - 1) {
            setCurrentAdsIndex(currentAdsIndex + 1);
            setSelectedAds(ads[currentAdsIndex + 1]);
        }
    };

    // Seleciona a publicidade seguinte
    const handlePrevAds = () => {
        if (currentAdsIndex > 0) {
            setCurrentAdsIndex(currentAdsIndex - 1);
            setSelectedAds(ads[currentAdsIndex - 1]);
        }
    };

    // Define a função selecionar uma linha
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: Ads[];
    }) => {
        const sortedSelectedRows = state.selectedRows.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());
        setSelectedRows(sortedSelectedRows);
    };

    // Define as colunas da tabela
    const columns: TableColumn<Ads>[] = adsFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: Ads) => {
                switch (field.key) {
                    case 'tipoArquivo':
                        return (row[field.key] === 1) ? 'Imagem' : 'Vídeo';
                    case 'createDate':
                        return new Date(row[field.key]).toLocaleString() || '';
                    case 'updateDate':
                        return new Date(row[field.key]).toLocaleString() || '';
                    case 'dataFim':
                        if (row[field.key] === null) {
                            return '';
                        } else {
                            return new Date(row[field.key]).toLocaleString();
                        }
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={ads} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Filtra os dados da tabela
    const filteredDataTable = filteredDevices.filter((ad: Ads) =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (ad[key] != null && String(ad[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(ad).some(([key, value]) => {
            if (selectedColumns.includes(key) && value != null) {
                if (value instanceof Date) {
                    return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
                } else {
                    return value.toString().toLowerCase().includes(filterText.toLowerCase());
                }
            }
            return false;
        })
    );

    // Define a coluna de ações
    const actionColumn: TableColumn<Ads> = {
        name: 'Ações',
        cell: (row: Ads) => (
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
                    <CustomOutlineButton className="action-button" icon='bi bi-pencil-fill' onClick={() => handleEditAds(row)} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Apagar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-trash-fill' onClick={() => handleOpenDeleteModal(row.id)} />
                </OverlayTrigger>
            </div>
        ),
        selector: (row: Ads) => row.id,
        ignoreRowClick: true,
    };

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return adsFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='content-container'>
                <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewDataNled onSelectDevices={handleSelectFromTreeView} />
                    </div>
                    <div className="datatable-container">
                        <div className="datatable-title-text">
                            <span >Publicidade</span>
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
                                    <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshAds} />
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
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Ads Hoje</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-calendar-event" onClick={fetchAdsToday} iconSize='1.1em' />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Ads Dia Anterior</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-arrow-left-circle" onClick={fetchAdsForPreviousDay} iconSize='1.1em' />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Ads Dia Seguinte</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-arrow-right-circle" onClick={fetchAdsForNextDay} iconSize='1.1em' disabled={new Date(endDate) >= new Date(new Date().toISOString().substring(0, 10))} />
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
                                    <CustomOutlineButton icon="bi-search" onClick={() => fetchAds(startDate, endDate)} iconSize='1.1em' />
                                </OverlayTrigger>
                            </div>
                        </div>
                        <div className='content-wrapper'>
                            <div className='table-css'>
                                <DataTable
                                    columns={[...columns, actionColumn]}
                                    data={filteredDataTable}
                                    onRowDoubleClicked={handleEditAds}
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    clearSelectedRows={clearSelectionToggle}
                                    paginationPerPage={20}
                                    selectableRows
                                    onSelectedRowsChange={handleRowSelected}
                                    noDataComponent="Não existem dados disponíveis para exibir."
                                    customStyles={customStyles}
                                    striped
                                    defaultSortAsc={false}
                                    defaultSortFieldId="nomeArquivo"
                                />
                            </div>
                        </div>
                    </div>
                </Split>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={adsFields}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
                />
            )}
            <CreateModalAds
                title="Publicidades"
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={addAds}
                fields={adsFields}
                initialValues={initialData || {}}
                entities="all"
            />
            {selectedAds && (
                <UpdateModalAds
                    open={showUpdateModal}
                    onClose={handleCloseUpdateModal}
                    onUpdate={(entity) => updateAds(selectedAds, entity as FormData)}
                    entity={selectedAds}
                    fields={adsFields}
                    onDuplicate={handleDuplicate}
                    title="Publicidades"
                    entities="all"
                    onPrev={handleNextAds}
                    onNext={handlePrevAds}
                    canMoveNext={currentAdsIndex > 0}
                    canMovePrev={currentAdsIndex < ads.length - 1}
                />
            )}
            <DeleteModal
                open={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setClearSelectionToggle((prev) => !prev);
                }}
                onDelete={handleDeleteAds}
                entityId={selectedAdsForDelete}
            />
        </div>
    );
}