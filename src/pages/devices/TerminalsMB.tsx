import { useContext, useEffect, useState } from "react";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../../components/CustomStylesDataTable";
import { Button, OverlayTrigger, Tab, Tabs, Tooltip } from "react-bootstrap";
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
import { ExportButton } from "../../components/ExportButton";
import { PrintButton } from "../../components/PrintButton";
import { TextField, TextFieldProps } from "@mui/material";

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
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
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['nomeQuiosque', 'modelo', 'estadoTerminal', 'timeReboot']);
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
    const [initialData, setInitialData] = useState<Partial<MBDevice> | null>(null);
    const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);
    const [selectedRows, setSelectedRows] = useState<MBDevice[]>([]);

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
        setSelectedColumns(['nomeQuiosque', 'modelo', 'estadoTerminal', 'timeReboot']);
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
        setSelectedRows(state.selectedRows);
        setSelectedTerminal(state.selectedRows[0] || null);
    };

    // Define a função de duplicar funcionários
    const handleDuplicate = (data: Partial<MBDevice>) => {
        setInitialData(data);
        setShowAddModal(true);
        setSelectedTerminal(null);
        setShowUpdateModal(false);
    }

    // Seleciona a entidade anterior
    const handleNextDevice = () => {
        if (currentDeviceIndex < mbDevices.length - 1) {
            setCurrentDeviceIndex(currentDeviceIndex + 1);
            setSelectedTerminal(mbDevices[currentDeviceIndex + 1]);
        }
    };

    // Seleciona a entidade seguinte
    const handlePrevDevice = () => {
        if (currentDeviceIndex > 0) {
            setCurrentDeviceIndex(currentDeviceIndex - 1);
            setSelectedTerminal(mbDevices[currentDeviceIndex - 1]);
        }
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
    const columns: TableColumn<MBDevice>[] = mbDeviceFields
        .filter(field => selectedColumns.includes(field.key))
        .sort((a, b) => { if (a.key === 'estadoTerminal') return 1; else if (b.key === 'estadoTerminal') return -1; else return 0; })
        .map(field => {
            const formatField = (row: MBDevice) => {
                switch (field.key) {
                    case 'estadoTerminal':
                        return (
                            <div style={{
                                height: '10px',
                                width: '10px',
                                backgroundColor: row.estadoTerminal ? 'green' : 'red',
                                borderRadius: '50%',
                                display: 'inline-block'
                            }} />
                        );
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
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredDataTable} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Define as colunas de ação de dispositivos
    const devicesActionColumn: TableColumn<MBDevice> = {
        name: 'Ações',
        cell: (row: MBDevice) => (
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
                    <CustomOutlineButton className="action-button" icon='bi bi-pencil-fill' onClick={() => handleEditDevices(row)} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Apagar</Tooltip>}
                >
                    <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.id)}>
                        <i className="bi bi-trash-fill"></i>
                    </Button>
                </OverlayTrigger>
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
                                <span>Terminais</span>
                            </div>
                            <div className="datatable-header">
                                <div className="buttons-container-others-mb">
                                    <CustomSearchBox
                                        label="Pesquisa"
                                        variant="outlined"
                                        size='small'
                                        value={filterText}
                                        onChange={e => setFilterText(e.target.value)}
                                        style={{ marginTop: -5 }}
                                    />
                                    <div className="custom-buttons">
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
                                        >
                                            <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshMBDevices} />
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
                                            <CustomOutlineButton icon="bi-eye" onClick={() => setShowColumnSelector(true)} />
                                        </OverlayTrigger>
                                        <ExportButton allData={filteredDataTable} selectedData={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={mbDeviceFields} />
                                        <PrintButton data={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={mbDeviceFields} />
                                    </div>
                                </div>
                            </div>
                            <div className="deviceMobile">
                                <DataTable
                                    columns={[...columns, devicesActionColumn]}
                                    data={filteredDataTable}
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    paginationPerPage={20}
                                    selectableRows
                                    onSelectedRowsChange={handleDeviceRowSelected}
                                    selectableRowsHighlight
                                    onRowDoubleClicked={handleEditDevices}
                                    noDataComponent="Não existem dados disponíveis para exibir."
                                    customStyles={customStyles}
                                    striped
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
                    initialValues={initialData || {}}
                />
                {selectedTerminal && (
                    <UpdateModalDeviceMB
                        title="Editar Terminal Multibanco"
                        open={showUpdateModal}
                        onClose={() => setShowUpdateModal(false)}
                        onUpdate={updateDevice}
                        entity={selectedTerminal}
                        fields={mbDeviceFields}
                        onDuplicate={handleDuplicate}
                        onPrev={handlePrevDevice}
                        onNext={handleNextDevice}
                        canMovePrev={currentDeviceIndex > 0}
                        canMoveNext={currentDeviceIndex < mbDevices.length - 1}
                    />
                )}
                {showDeleteModal && (
                    <DeleteModal
                        open={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                        onDelete={deleteDevice}
                        entityId={selectedMBDeviceToDelete}
                    />
                )}
            </div>
        </TerminalsProvider>
    );
};