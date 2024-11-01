import { useContext, useEffect, useState } from "react";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../../components/CustomStylesDataTable";
import { Button, Tab, Tabs } from "react-bootstrap";
import { SelectFilter } from "../../components/SelectFilter";
import { MBDevice } from "../../helpers/Types";
import { mbDeviceFields } from "../../helpers/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { toast } from "react-toastify";
import { Spinner } from 'react-bootstrap';
import { DeviceContextType, TerminalsContext, TerminalsProvider } from "../../context/TerminalsContext";
import { useColor } from "../../context/ColorContext";
import { CreateModalDeviceMB } from "../../modals/CreateModalDeviceMB";
import Split from "react-split";
import { UpdateModalDeviceMB } from "../../modals/UpdateModalDeviceMB";
import { TreeViewDataMBTerminals } from "../../components/TreeViewMBTerminals";
import { DeleteModal } from "../../modals/DeleteModal";

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define o componente de terminais
export const TerminalsMB = () => {
    const {
        mbDevices,
        fetchAllMBDevices,
        restartMBDevice,
        handleAddMBDevice,
        handleUpdateMBDevice,
        handleDeleteMBDevice,
    } = useContext(TerminalsContext) as DeviceContextType;
    const { navbarColor, footerColor } = useColor();
    const [showAddModal, setShowAddModal] = useState(false);
    const [userTabKey, setUserTabKey] = useState('onOff');
    const [filters, setFilters] = useState<Filters>({});
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['nomeQuiosque', 'estadoTerminal', 'timeReboot']);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [resetSelection, setResetSelection] = useState(false);
    const [selectedTerminal, setSelectedTerminal] = useState<MBDevice | null>(null);
    const [loadingRestartDevice, setLoadingRestartDevice] = useState(false);
    const [loadingTurnOffDevice, setLoadingTurnOffDevice] = useState(false);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<MBDevice[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [selectedMBDeviceToDelete, setSelectedMBDeviceToDelete] = useState<string | null>(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Função para atualizar todos os dispositivos
    const refreshMBDevices = () => {
        fetchAllMBDevices();
    }

    // Função para adicionar um dispositivo
    const addDevice = async (device: MBDevice) => {
        await handleAddMBDevice(device);
        refreshMBDevices();
    }

    // Função para atualizar um dispositivo
    const updateDevice = async (device: MBDevice) => {
        await handleUpdateMBDevice(device);
        refreshMBDevices();
    }

    const deleteDevice = async (id: string) => {
        await handleDeleteMBDevice(id);
        refreshMBDevices();
    }

    // Atualiza os dados de renderização
    useEffect(() => {
        fetchAllMBDevices();
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
            const filtered = mbDevices.filter(mbDevices => selectedDevicesIds.includes(mbDevices.id));
            setFilteredDevices(filtered);
        } else {
            setFilteredDevices(mbDevices);
        }
    }, [selectedDevicesIds, mbDevices]);

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
        const allColumnKeys = mbDeviceFields.map(field => field.key);
        setSelectedColumns(allColumnKeys);
    };

    // Define a seleção da árvore
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        setSelectedDevicesIds(selectedIds);
    };

    // Define a função de abertura do modal de edição dos dispositivos
    const handleEditDevices = (row: MBDevice) => {
        setSelectedTerminal(row);
        setShowUpdateModal(true);
    };

    // Define a abertura do modal de apagar controle de acesso
    const handleOpenDeleteModal = (id: string) => {
        setSelectedMBDeviceToDelete(id);
        setShowDeleteModal(true);
    };

    // Define a função de seleção de linhas de dispositivos
    const handleDeviceRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: MBDevice[];
    }) => {
        setSelectedTerminal(state.selectedRows[0] || null);
    };

    // Define as colunas de dispositivos
    const columns: TableColumn<MBDevice>[] = mbDeviceFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: MBDevice) => {
                switch (field.key) {
                    case 'estadoTerminal':
                        return row[field.key] === 1 ? 'Ligado' : 'Desligado';
                    case 'timeReboot':
                        return row[field.key] === '00:00:00' ? 'Sem tempo de reinício' : row[field.key];
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

    // Define as colunas de ação de dispositivos
    const devicesActionColumn: TableColumn<MBDevice> = {
        name: 'Ações',
        cell: (row: MBDevice) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditDevices(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.id)}>
                    <i className="bi bi-trash-fill"></i>
                </Button>
            </div>
        ),
        selector: (row: MBDevice) => row.id,
        ignoreRowClick: true,
    };

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Função para reiniciar o dispositivo
    const handleRestartDevice = async () => {
        if (selectedTerminal) {
            setLoadingRestartDevice(true);
            const tpId = selectedTerminal.id;
            const type = 1;
            const status = 0;
            const mbDevice = { tpId, type, status };
            await restartMBDevice(mbDevice);
            setLoadingRestartDevice(false);
        } else {
            toast.error('Selecione um terminal primeiro!');
        }
    }

    // Função para desligar o dispositivo
    const handleTurnOffDevice = async () => {
        if (selectedTerminal) {
            setLoadingTurnOffDevice(true);
            const tpId = selectedTerminal.id;
            const type = 2;
            const status = 0;
            const mbDevice = { tpId, type, status };
            await restartMBDevice(mbDevice);
            setLoadingTurnOffDevice(false);
        } else {
            toast.error('Selecione um terminal primeiro!');
        }
    }

    return (
        <TerminalsProvider>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <NavBar style={{ backgroundColor: navbarColor }} />
                <div className='content-container'>
                    <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                        <div className="treeview-container">
                            <TreeViewDataMBTerminals onSelectDevices={handleSelectFromTreeView} />
                        </div>
                        <div className="datatable-container">
                            <div className="datatable-title-text" style={{ color: '#000000' }}>
                                <span>Terminais Multibanco</span>
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
                                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshMBDevices} />
                                        <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                                        <CustomOutlineButton icon="bi-eye" onClick={() => setShowColumnSelector(true)} iconSize='1.1em' />
                                    </div>
                                </div>
                            </div>
                            <div className="deviceMobile">
                                <DataTable
                                    columns={[...columns, devicesActionColumn]}
                                    data={filteredDataTable}
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    selectableRows
                                    onSelectedRowsChange={handleDeviceRowSelected}
                                    selectableRowsHighlight
                                    onRowDoubleClicked={handleEditDevices}
                                    noDataComponent="Não existem dados disponíveis para exibir."
                                    customStyles={customStyles}
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
                                        <Tab eventKey="onOff" title="Ligação">
                                            <div style={{ display: "flex", marginTop: 10 }}>
                                                <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={handleTurnOffDevice}>
                                                    {loadingTurnOffDevice ? (
                                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                                    ) : (
                                                        <i className="bi bi-power" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                                    )}
                                                    Executar Fecho
                                                </Button>
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
                        </div>
                    </Split>
                </div>
                <Footer style={{ backgroundColor: footerColor }} />
                {showColumnSelector && (
                    <ColumnSelectorModal
                        columns={mbDeviceFields}
                        selectedColumns={selectedColumns}
                        onClose={() => setShowColumnSelector(false)}
                        onColumnToggle={handleColumnToggle}
                        onResetColumns={handleResetColumns}
                        onSelectAllColumns={handleSelectAllColumns}
                    />
                )}
                <CreateModalDeviceMB
                    title="Adicionar Terminal Multibanco"
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={addDevice}
                    fields={mbDeviceFields}
                    initialValues={{}}
                />
                {selectedTerminal && (
                    <UpdateModalDeviceMB
                        title="Editar Terminal Multibanco"
                        open={showUpdateModal}
                        onClose={() => setShowUpdateModal(false)}
                        onUpdate={updateDevice}
                        entity={selectedTerminal}
                        fields={mbDeviceFields}
                    />
                )}
                {showDeleteModal && (
                    <DeleteModal
                        open={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                        onDelete={deleteDevice}
                        entityId={selectedMBDeviceToDelete}
                    />
                )
                }
            </div>
        </TerminalsProvider>
    );
};