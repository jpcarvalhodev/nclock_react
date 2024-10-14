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

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
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
        setSelectedDeviceRows(state.selectedRows);
    };

    // Define as colunas de dispositivos
    const columns: TableColumn<MBDeviceCloseOpen>[] = mbDeviceCloseOpenFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: MBDeviceCloseOpen) => {
                switch (field.key) {
                    case 'tpId':
                        const matchedDevice = mbDevices.find(device => device.id === row.tpId);
                        return matchedDevice ? matchedDevice.nomeQuiosque || '' : '';
                    case 'timestamp':
                        return new Date(row.timestamp).toLocaleString();
                    case 'fechoImage':
                    case 'aberturaImage':
                        const imageUrl = row[field.key];
                        if (imageUrl) {
                            const uploadPath = imageUrl.substring(imageUrl.indexOf('/Uploads'));
                            const fullImageUrl = `${apiService.baseURL}${uploadPath}`;
                            return (
                                <a href={fullImageUrl} target="_blank" rel="noopener noreferrer">
                                    Visualizar ticket
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
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={mbOpenCloseDevices} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Filtra os dados da tabela de dispositivos
    const filteredDeviceDataTable = mbOpenCloseDevices.filter(device =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(device[key]) === String(filters[key])
        )
    );

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    return (
        <TerminalsProvider>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <NavBar style={{ backgroundColor: navbarColor }} />
                <div className='filter-refresh-add-edit-upper-class'>
                    <div className="datatable-title-text" style={{ color: '#000000' }}>
                        <span>Fechos e Aberturas dos Terminais Multibanco</span>
                    </div>
                    <div className="datatable-header">
                        <div className="buttons-container-others">
                            <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshOpenCloseDevices} />
                            <CustomOutlineButton icon="bi-eye" onClick={() => setShowColumnSelector(true)} iconSize='1.1em' />
                        </div>
                    </div>
                </div>
                <div className="content-section deviceTabsMobile" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <div className="deviceMobile">
                        <DataTable
                            columns={columns}
                            data={filteredDeviceDataTable}
                            pagination
                            paginationComponentOptions={paginationOptions}
                            paginationPerPage={15}
                            selectableRows
                            onSelectedRowsChange={handleDeviceRowSelected}
                            selectableRowsHighlight
                            noDataComponent="Não existem dados disponíveis para exibir."
                            customStyles={customStyles}
                        />
                    </div>
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