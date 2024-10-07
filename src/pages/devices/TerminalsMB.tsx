import { useContext, useEffect, useState } from "react";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../../components/CustomStylesDataTable";
import { Button, Tab, Tabs } from "react-bootstrap";
import { SelectFilter } from "../../components/SelectFilter";
import { Devices, MBDevice } from "../../helpers/Types";
import { deviceFields, mbDeviceFields } from "../../helpers/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { toast } from "react-toastify";
import { Spinner } from 'react-bootstrap';
import { DeviceContextType, TerminalsContext, TerminalsProvider } from "../../context/TerminalsContext";
import { useColor } from "../../context/ColorContext";
import { restartMBDevice } from "../../helpers/apiService";

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define o componente de terminais
export const TerminalsMB = () => {
    const {
        mbDevices,
        deviceStatus,
        deviceStatusCount,
        fetchAllDevices,
        restartDevice,
        handleAddMBDevice
    } = useContext(TerminalsContext) as DeviceContextType;
    const { navbarColor, footerColor } = useColor();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [userTabKey, setUserTabKey] = useState('onOff');
    const [filters, setFilters] = useState<Filters>({});
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['nomeQuiosque', 'estadoTerminal', 'timeReboot']);
    const [selectedDeviceToDelete, setSelectedDeviceToDelete] = useState<string>('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [resetSelection, setResetSelection] = useState(false);
    const [selectedDeviceRows, setSelectedDeviceRows] = useState<MBDevice[]>([]);
    const [selectedTerminal, setSelectedTerminal] = useState<MBDevice | null>(null);
    const [loadingRestartDevice, setLoadingRestartDevice] = useState(false);

    // Função para adicionar um dispositivo
    const addDevice = async (device: MBDevice) => {
        await handleAddMBDevice(device);
        setShowAddModal(false);
        refreshAll();
    }

    /* // Função para atualizar um dispositivo
    const updateDevice = async (device: Devices) => {
        await handleUpdateDevice(device);
        setShowUpdateModal(false);
        refreshAll();
    } */

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

    // Função para atualizar todos os dispositivos
    const refreshAll = () => {
        fetchAllDevices();
    }

    // Função para resetar as colunas
    const handleResetColumns = () => {
        setSelectedColumns(['nomeQuiosque', 'estadoTerminal', 'timeReboot']);
    };


    // Função para alternar a visibilidade das abas
    const handleUserSelect = (k: string | null) => {
        if (k) {
            setUserTabKey(k);
        }
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
        const allColumnKeys = deviceFields.map(field => field.key);
        setSelectedColumns(allColumnKeys);
    };

    // Define a função de seleção de linhas de dispositivos
    const handleDeviceRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: MBDevice[];
    }) => {
        setSelectedDeviceRows(state.selectedRows);
        setSelectedTerminal(state.selectedRows[0] || null);
    };

    // Define as colunas de dispositivos
    const deviceColumns: TableColumn<MBDevice>[] = mbDeviceFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: MBDevice) => {
                switch (field.key) {
                    case 'estadoTerminal':
                        return row.disabled === 1 ? 'Activo' : 'Inactivo';
                    default:
                        return row[field.key];
                }
            };
            return {
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={mbDevices} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Filtra os dados da tabela de dispositivos
    const filteredDeviceDataTable = mbDevices.filter(device =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(device[key]) === String(filters[key])
        )
    );

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define a função de abertura do modal de edição dos dispositivos
    const handleEditDevices = (row: MBDevice) => {
        setSelectedTerminal(row);
        setShowUpdateModal(true);
    };

    // Define a função de fechamento do modal de atualização
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedTerminal(null);
    }

    // Define as colunas de ação de dispositivos
    const devicesActionColumn: TableColumn<MBDevice> = {
        name: 'Ações',
        cell: (row: MBDevice) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditDevices(row)} />
            </div>
        ),
        selector: (row: MBDevice) => row.id,
        ignoreRowClick: true,
    };

    // Define a cor do status
    const getStatusColor = (statuses: string[]): string => {
        const isActive = statuses.some(status => status === 'Activo');
        return isActive ? 'green' : 'red';
    };

    // Define a cor de fundo do status
    const backgroundColor = getStatusColor(deviceStatus);

    // Função para reiniciar o dispositivo
    const handleRestartDevice = async () => {
        if (selectedTerminal) {
            setLoadingRestartDevice(true);
            await restartMBDevice(selectedTerminal.id);
            setLoadingRestartDevice(false);
        } else {
            toast.error('Selecione um terminal primeiro!');
        }
    }

    return (
        <TerminalsProvider>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <NavBar style={{ backgroundColor: navbarColor }} />
                <div className='filter-refresh-add-edit-upper-class'>
                    <div className="datatable-title-text" style={{ color: '#000000' }}>
                        <span>Terminais Multibanco</span>
                    </div>
                    <div className="datatable-header">
                        <div className="buttons-container-others" style={{ flexGrow: 1 }}>
                            <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshAll} />
                            <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                            <CustomOutlineButton icon="bi-eye" onClick={() => setShowColumnSelector(true)} iconSize='1.1em' />
                            <span style={{
                                color: 'white',
                                backgroundColor: backgroundColor,
                                borderRadius: '4px',
                                padding: '2px 10px',
                                display: 'inline-block',
                                marginLeft: 'auto',
                                marginRight: '30px'
                            }}>
                                Status: {deviceStatusCount && `${deviceStatusCount['Activo'] || 0} Online, ${deviceStatusCount['Inactivo'] || 0} Offline`}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="content-section deviceTabsMobile" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <div className="deviceMobile">
                        <DataTable
                            columns={[...deviceColumns, devicesActionColumn]}
                            data={filteredDeviceDataTable}
                            onRowDoubleClicked={handleEditDevices}
                            pagination
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                            paginationComponentOptions={paginationOptions}
                            selectableRows
                            onSelectedRowsChange={handleDeviceRowSelected}
                            selectableRowsHighlight
                            noDataComponent="Não há dados disponíveis para exibir."
                            customStyles={customStyles}
                        />
                    </div>
                    <div style={{ marginTop: 'auto' }}>
                        <Tabs
                            id="controlled-tab-terminals-buttons"
                            activeKey={userTabKey}
                            onSelect={handleUserSelect}
                            className="nav-modal"
                            style={{ marginBottom: 10, marginTop: 10 }}
                        >
                            <Tab eventKey="onOff" title="Ligação">
                                <div style={{ display: "flex", marginTop: 10, marginBottom: 10 }}>
                                    <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={handleRestartDevice}>
                                        {loadingRestartDevice ? (
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                        ) : (
                                            <i className="bi bi-bootstrap-reboot" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                        )}
                                        Reiniciar
                                    </Button>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <Footer style={{ backgroundColor: footerColor }} />
                {showColumnSelector && (
                    <ColumnSelectorModal
                        columns={deviceFields}
                        selectedColumns={selectedColumns}
                        onClose={() => setShowColumnSelector(false)}
                        onColumnToggle={handleColumnToggle}
                        onResetColumns={handleResetColumns}
                        onSelectAllColumns={handleSelectAllColumns}
                    />
                )}
                {/* <CreateModalDevices
                    title="Adicionar Terminal"
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={addDevice}
                    fields={deviceFields}
                    initialValues={initialData || {}}
                /> */}
                {/* {selectedTerminal && (
                    <UpdateModalDevices
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onDuplicate={handleDuplicate}
                        onUpdate={updateDevice}
                        entity={selectedTerminal}
                        fields={deviceFields}
                        title="Atualizar Terminal"
                    />
                )} */}
                {/* {showDeleteModal && (
                    <DeleteModal
                        open={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                        onDelete={deleteDevice}
                        entityId={selectedDeviceToDelete}
                    />
                )} */}
            </div>
        </TerminalsProvider>
    );
};