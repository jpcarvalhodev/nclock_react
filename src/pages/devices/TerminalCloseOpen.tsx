import { useContext, useEffect, useState } from "react";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../../components/CustomStylesDataTable";
import { SelectFilter } from "../../components/SelectFilter";
import { MBDevice, MBDeviceCloseOpen } from "../../helpers/Types";
import { mbDeviceCloseOpenFields } from "../../helpers/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { DeviceContextType, TerminalsContext, TerminalsProvider } from "../../context/TerminalsContext";
import { useColor } from "../../context/ColorContext";
import * as apiService from "../../helpers/apiService";
import { TreeViewDataNkiosk } from "../../components/TreeViewNkiosk";
import Split from "react-split";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ExportButton } from "../../components/ExportButton";
import { PrintButton } from "../../components/PrintButton";

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T00:00`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T23:59`;
}

// Define o componente de terminais
export const TerminalCloseOpen = () => {
    const {
        fetchAllMBDevices,
        fetchAllMBCloseOpen,
    } = useContext(TerminalsContext) as DeviceContextType;
    const { navbarColor, footerColor } = useColor();
    const [mbOpenCloseDevices, setOpenCloseDevices] = useState<MBDeviceCloseOpen[]>([]);
    const [mbDevices, setMbDevices] = useState<MBDevice[]>([]);
    const [filters, setFilters] = useState<Filters>({});
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['timestamp', 'tpId', 'fechoImage', 'aberturaImage']);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [resetSelection, setResetSelection] = useState(false);
    const [selectedDeviceRows, setSelectedDeviceRows] = useState<MBDeviceCloseOpen[]>([]);
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<MBDeviceCloseOpen[]>([]);

    // Função para buscar todos os dispositivos multibanco
    const fetchAllDevices = async () => {
        try {
            const data = await fetchAllMBCloseOpen();
            setOpenCloseDevices(data);

            const tpData = await fetchAllMBDevices();
            setMbDevices(tpData);
        } catch (error) {
            console.error('Erro ao buscar terminais multibanco:', error);
        }
    }

    // Função para buscar todos os dispositivos multibanco entre datas
    const fetchAllDevicesBetweenDates = async () => {
        try {
            const data = await apiService.fetchAllTPCloseOpen(startDate, endDate);
            setOpenCloseDevices(data);
        } catch (error) {
            console.error('Erro ao buscar terminais multibanco:', error);
        }
    }

    // Função para atualizar todos os dispositivos
    const refreshOpenCloseDevices = () => {
        fetchAllDevices();
    }

    // Atualiza os dados de renderização
    useEffect(() => {
        fetchAllDevices();
    }, []);

    // Atualiza a seleção ao resetar
    useEffect(() => {
        if (resetSelection) {
            setResetSelection(false);
        }
    }, [resetSelection]);

    // Atualiza os dispositivos filtrados da treeview
    useEffect(() => {
        if (selectedDevicesIds.length > 0) {
            const filtered = mbOpenCloseDevices.filter(devices => selectedDevicesIds.includes(devices.tpId));
            setFilteredDevices(filtered);
        } else {
            setFilteredDevices(mbOpenCloseDevices);
        }
    }, [selectedDevicesIds, mbOpenCloseDevices]);

    // Define a seleção da árvore
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        setSelectedDevicesIds(selectedIds);
    };

    // Função para resetar as colunas
    const handleResetColumns = () => {
        setSelectedColumns(['timestamp', 'tpId', 'fechoImage', 'aberturaImage']);
    };

    // Função para alternar a visibilidade das colunas
    const handleColumnToggle = (columnKey: string) => {
        if (selectedColumns.includes(columnKey)) {
            setSelectedColumns(selectedColumns.filter(key => key !== columnKey));
        } else {
            setSelectedColumns([...selectedColumns, columnKey]);
        }
    };

    // Função para selecionar todas as colunas
    const handleSelectAllColumns = () => {
        const allColumnKeys = mbDeviceCloseOpenFields.map(field => field.key);
        setSelectedColumns(allColumnKeys);
    };

    // Define a função de seleção de linhas de dispositivos
    const handleDeviceRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: MBDeviceCloseOpen[];
    }) => {
        const sortedSelectedRows = state.selectedRows.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setSelectedDeviceRows(sortedSelectedRows);
    };

    // Filtra os dados da tabela de dispositivos
    const filteredDeviceDataTable = filteredDevices.filter(device =>
        new Date(device.timestamp) >= new Date(startDate) && new Date(device.timestamp) <= new Date(endDate) &&
        Object.keys(filters).every(key =>
            filters[key] === "" || String(device[key]) === String(filters[key])
        )
    );

    // Define as colunas de dispositivos
    const columns: TableColumn<MBDeviceCloseOpen>[] = mbDeviceCloseOpenFields
        .filter(field => selectedColumns.includes(field.key))
        .sort((a, b) => { if (a.key === 'timestamp') return -1; else if (b.key === 'timestamp') return 1; else return 0; })
        .map(field => {
            const formatField = (row: MBDeviceCloseOpen) => {
                switch (field.key) {
                    case 'tpId':
                        const matchedDevice = mbDevices.find(device => device.id === row.tpId);
                        return matchedDevice ? matchedDevice.nomeQuiosque || '' : '';
                    case 'timestamp':
                        return new Date(row.timestamp).toLocaleString() || '';
                    case 'fechoImage':
                        const imageUrlFecho = row[field.key];
                        if (imageUrlFecho) {
                            const uploadPath = imageUrlFecho.substring(imageUrlFecho.indexOf('/Uploads'));
                            const fullImageUrl = `${apiService.baseURL}${uploadPath}`;
                            return (
                                <a href={fullImageUrl} target="_blank" rel="noopener noreferrer">
                                    Ticket Fecho
                                </a>
                            );
                        } else {
                            return '';
                        }
                    case 'aberturaImage':
                        const imageUrlAbertura = row[field.key];
                        if (imageUrlAbertura) {
                            const uploadPath = imageUrlAbertura.substring(imageUrlAbertura.indexOf('/Uploads'));
                            const fullImageUrl = `${apiService.baseURL}${uploadPath}`;
                            return (
                                <a href={fullImageUrl} target="_blank" rel="noopener noreferrer">
                                    Ticket Abertura
                                </a>
                            );
                        } else {
                            return '';
                        }
                    default:
                        return row[field.key];
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredDeviceDataTable} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
                sortFunction: (rowA, rowB) => new Date(rowB.timestamp).getTime() - new Date(rowA.timestamp).getTime()
            };
        });

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    return (
        <TerminalsProvider>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <NavBar style={{ backgroundColor: navbarColor }} />
                <div className='content-container'>
                    <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                        <div className="treeview-container">
                            <TreeViewDataNkiosk onSelectDevices={handleSelectFromTreeView} />
                        </div>
                        <div className="datatable-container">
                            <div className="datatable-title-text" style={{ color: '#000000' }}>
                                <span>Fechos e Aberturas dos Terminais Multibanco</span>
                            </div>
                            <div className="datatable-header">
                                <div className="buttons-container-others">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
                                    >
                                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshOpenCloseDevices} />
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip className="custom-tooltip">Colunas</Tooltip>}
                                    >
                                        <CustomOutlineButton icon="bi-eye" onClick={() => setShowColumnSelector(true)} />
                                    </OverlayTrigger>
                                    <ExportButton allData={filteredDeviceDataTable} selectedData={selectedDeviceRows.length > 0 ? selectedDeviceRows : filteredDeviceDataTable} fields={mbDeviceCloseOpenFields} />
                                    <PrintButton data={selectedDeviceRows.length > 0 ? selectedDeviceRows : filteredDeviceDataTable} fields={mbDeviceCloseOpenFields} />
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
                                        <CustomOutlineButton icon="bi-search" onClick={fetchAllDevicesBetweenDates} iconSize='1.1em' />
                                    </OverlayTrigger>
                                </div>
                            </div>
                            <div className="deviceMobile">
                                <DataTable
                                    columns={columns}
                                    data={filteredDeviceDataTable}
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    paginationPerPage={20}
                                    selectableRows
                                    onSelectedRowsChange={handleDeviceRowSelected}
                                    selectableRowsHighlight
                                    noDataComponent="Não existem dados disponíveis para exibir."
                                    customStyles={customStyles}
                                    striped
                                    defaultSortAsc={true}
                                    defaultSortFieldId="timestamp"
                                />
                            </div>
                        </div>
                    </Split>
                </div>
                <Footer style={{ backgroundColor: footerColor }} />
                {showColumnSelector && (
                    <ColumnSelectorModal
                        columns={mbDeviceCloseOpenFields}
                        selectedColumns={selectedColumns}
                        onClose={() => setShowColumnSelector(false)}
                        onColumnToggle={handleColumnToggle}
                        onResetColumns={handleResetColumns}
                        onSelectAllColumns={handleSelectAllColumns}
                    />
                )}
            </div>
        </TerminalsProvider>
    );
};