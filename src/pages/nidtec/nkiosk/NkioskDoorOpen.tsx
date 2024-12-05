import { useContext, useEffect, useState } from "react";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { Button, OverlayTrigger, Tab, Tabs, Tooltip } from "react-bootstrap";
import { SelectFilter } from "../../../components/SelectFilter";
import { ManualOpenDoor } from "../../../helpers/Types";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { toast } from "react-toastify";
import { Spinner } from 'react-bootstrap';
import { useColor } from "../../../context/ColorContext";
import * as apiService from "../../../helpers/apiService";
import { manualOpenDoorFields } from "../../../helpers/Fields";
import { ManualDoorOpenModal } from "../../../modals/ManualDoorOpenModal";
import Split from "react-split";
import { TerminalsContext, DeviceContextType } from "../../../context/TerminalsContext";
import { TreeViewDataNkioskDisp } from "../../../components/TreeViewNkioskDisp";
import { ExportButton } from "../../../components/ExportButton";
import { PrintButton } from "../../../components/PrintButton";

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}`;
}

// Define o componente de terminais
export const NkioskDoorOpen = () => {
    const { navbarColor, footerColor } = useColor();
    const { devices } = useContext(TerminalsContext) as DeviceContextType;
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    const [manualOpenDoor, setManualOpenDoor] = useState<ManualOpenDoor[]>([]);
    const [filters, setFilters] = useState<Filters>({});
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['createdDate', 'nomeResponsavel', 'deviceName', 'doorName', 'observacoes']);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [selectedManualOpen, setSelectedManualOpen] = useState<ManualOpenDoor | null>(null);
    const [loadingManualOpen, setLoadingManualOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [filterText, setFilterText] = useState<string>('');
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<ManualOpenDoor[]>([]);
    const [selectedRows, setSelectedRows] = useState<ManualOpenDoor[]>([]);

    // Função para buscar os dados de aberturas manuais
    const fetchAllManualOpen = async () => {
        try {
            const data = await apiService.fetchAllManualDoorOpen();
            if (Array.isArray(data)) {
                setManualOpenDoor(data);
            } else {
                setManualOpenDoor([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de aberturas manuais:', error);
        }
    }

    // Função para buscar os dados de aberturas manuais entre datas
    const fetchManualOpenBetweenDates = async () => {
        try {
            const data = await apiService.fetchAllManualDoorOpen(startDate, endDate);
            if (Array.isArray(data)) {
                setManualOpenDoor(data);
            } else {
                setManualOpenDoor([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de aberturas manuais:', error);
        }
    }

    // Atualiza os dados de renderização
    useEffect(() => {
        fetchAllManualOpen();
    }, []);

    // Função para atualizar os dados de aberura manual
    const refreshAllManualOpen = () => {
        fetchAllManualOpen();
    }

    // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
    useEffect(() => {
        if (selectedDevicesIds.length > 0) {
            const filterDevices = devices.filter(device => selectedDevicesIds.includes(device.serialNumber));
            const devicesFiltered = manualOpenDoor.filter(door => filterDevices.some(device => device.deviceName === door.deviceName));
            setFilteredDevices(devicesFiltered);
        } else {
            setFilteredDevices(manualOpenDoor);
        }
    }, [selectedDevicesIds, manualOpenDoor, devices]);

    // Função para resetar as colunas
    const handleResetColumns = () => {
        setSelectedColumns(['createdDate', 'nomeResponsavel', 'deviceName', 'doorName', 'observacoes']);
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
        const allColumnKeys = manualOpenDoorFields.map(field => field.key);
        setSelectedColumns(allColumnKeys);
    };

    // Define a seleção da árvore
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        setSelectedDevicesIds(selectedIds);
    };

    // Define a função de seleção de linhas de dispositivos
    const handleDeviceRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: ManualOpenDoor[];
    }) => {
        setSelectedRows(state.selectedRows);
        setSelectedManualOpen(state.selectedRows[0] || null);
    };

    // Filtra os dados da tabela de dispositivos
    const filteredDataTable = filteredDevices.filter(device =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (device[key] != null && String(device[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.values(device).some(value => {
            if (value == null) {
                return false;
            } else if (value instanceof Date) {
                return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
            } else {
                return value.toString().toLowerCase().includes(filterText.toLowerCase());
            }
        })
    );

    // Define as colunas de dispositivos
    const columns: TableColumn<ManualOpenDoor>[] = manualOpenDoorFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: ManualOpenDoor) => {
                switch (field.key) {
                    case 'createdDate':
                        return new Date(row.createdDate).toLocaleString() || '';
                    default:
                        return row[field.key];
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
                sortFunction: (rowA, rowB) => new Date(rowB.createdDate).getTime() - new Date(rowA.createdDate).getTime()
            };
        });

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Função para abrir manualmente
    const handleOpenManualDoor = () => {
        setLoadingManualOpen(true);
        setModalOpen(true);
    }

    // Função para fechar a abertura manual
    const handleCloseManualDoor = () => {
        setLoadingManualOpen(false);
        setModalOpen(false);
    }

    // Função para enviar a abertura manualmente
    const handleManualOpenSave = async (door: Partial<ManualOpenDoor>) => {
        setModalOpen(false);
        try {
            const data = await apiService.addManualOpenDoor(door);
            setManualOpenDoor([...manualOpenDoor, data]);
            setLoadingManualOpen(false);
            toast.success(data.message || 'Abertura manual com sucesso!');
        } catch (error) {
            setLoadingManualOpen(false);
            console.error('Erro ao abrir manualmente', error);
        } finally {
            fetchAllManualOpen();
        }
    }

    // Calcula o valor total dos movimentos
    const totalAmount = filteredDataTable.length;

    // Função para gerar os dados com nomes substituídos para o export/print
    const transformTransactionWithNames = (transaction: { deviceName: string; }) => {
    
        const deviceMatch = devices.find(device => device.deviceName === transaction.deviceName);
    
        return {
            ...transaction,
            deviceSN: deviceMatch,
        };
    };

    // Dados com nomes substituídos
    const manualOpenWithNames = filteredDataTable.map(transformTransactionWithNames);

    // Transforma as linhas selecionadas com nomes substituídos
    const selectedRowsWithNames = selectedRows.map(transformTransactionWithNames);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='content-container'>
                <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewDataNkioskDisp onSelectDevices={handleSelectFromTreeView} />
                    </div>
                    <div className="datatable-container">
                        <div className="datatable-title-text" style={{ color: '#009739' }}>
                            <span>Aberturas Manuais</span>
                        </div>
                        <div className="datatable-header">
                            <div className="buttons-container-others-mb">
                                <input
                                    className='search-input'
                                    type="text"
                                    placeholder="Pesquisa"
                                    value={filterText}
                                    onChange={e => setFilterText(e.target.value)}
                                />
                                <div className="custom-buttons">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
                                    >
                                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshAllManualOpen} />
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip className="custom-tooltip">Colunas</Tooltip>}
                                    >
                                        <CustomOutlineButton icon="bi-eye" onClick={() => setShowColumnSelector(true)} />
                                    </OverlayTrigger>
                                    <ExportButton allData={manualOpenWithNames} selectedData={selectedRows.length > 0 ? selectedRowsWithNames : manualOpenWithNames} fields={manualOpenDoorFields} />
                                    <PrintButton data={selectedRows.length > 0 ? selectedRowsWithNames : manualOpenWithNames} fields={manualOpenDoorFields} />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip className="custom-tooltip">Abrir</Tooltip>}
                                        >
                                            <CustomOutlineButton icon="bi bi-power" onClick={handleOpenManualDoor} iconSize='1.1em' />
                                        </OverlayTrigger>
                                        {loadingManualOpen && (
                                            <Spinner animation="border" size="sm" style={{ marginLeft: '5px' }} />
                                        )}
                                    </div>
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
                                        <CustomOutlineButton icon="bi-search" onClick={fetchManualOpenBetweenDates} iconSize='1.1em' />
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </div>
                        <div className="deviceMobile">
                            <DataTable
                                columns={columns}
                                data={filteredDataTable}
                                pagination
                                paginationComponentOptions={paginationOptions}
                                paginationPerPage={15}
                                selectableRows
                                onSelectedRowsChange={handleDeviceRowSelected}
                                selectableRowsHighlight
                                noDataComponent="Não existem dados disponíveis para exibir."
                                customStyles={customStyles}
                                defaultSortAsc={true}
                                defaultSortFieldId="createdDate"
                            />
                        </div>
                        <div style={{ marginLeft: 10 }}>
                            <strong>Movimentos de Abertura Manual: </strong>{totalAmount}
                        </div>
                    </div>
                </Split>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {showColumnSelector && (
                <ColumnSelectorModal
                    columns={manualOpenDoorFields}
                    selectedColumns={selectedColumns}
                    onClose={() => setShowColumnSelector(false)}
                    onColumnToggle={handleColumnToggle}
                    onResetColumns={handleResetColumns}
                    onSelectAllColumns={handleSelectAllColumns}
                />
            )}
            <ManualDoorOpenModal
                title="Abertura Manual"
                open={modalOpen}
                onClose={handleCloseManualDoor}
                onSave={handleManualOpenSave}
                fields={manualOpenDoorFields}
            />
        </div>
    );
};