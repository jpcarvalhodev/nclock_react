import { useEffect, useMemo, useState } from "react";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../../components/CustomStylesDataTable";
import "../../css/Terminals.css";
import { Button, Form, Tab, Tabs } from "react-bootstrap";
import { SelectFilter } from "../../components/SelectFilter";
import { Devices, Employee, EmployeeDevices } from "../../helpers/Types";
import { deviceFields, employeeDeviceFields } from "../../helpers/Fields";
import { fetchWithAuth } from "../../components/FetchWithAuth";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { DeleteModal } from "../../modals/DeleteModal";
import { toast } from "react-toastify";
import { CreateModalDevices } from "../../modals/CreateModalDevices";
import { UpdateModalDevices } from "../../modals/UpdateModalDevices";
import { Spinner } from 'react-bootstrap';
import fprintScan from "../../assets/img/terminais/fprintScan.png";
import faceScan from "../../assets/img/terminais/faceScan.png";
import palmScan from "../../assets/img/terminais/palmScan.png";
import card from "../../assets/img/terminais/card.png";

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a interface para o status
interface StatusCounts {
    Activo: number;
    Inactivo: number;
}

// Define a interface para os contadores de dispositivos
interface DeviceStatusCounts {
    Activo: number;
    Inactivo: number;
}

// Define as propriedades dos terminais
interface TerminalProps {
    onDuplicate?: (devices: Devices) => void;
}

export const Terminals = ({ onDuplicate }: TerminalProps) => {
    const [devices, setDevices] = useState<Devices[]>([]);
    const [deviceStatus, setDeviceStatus] = useState<string[]>([]);
    const [employeeDevices, setEmployeeDevices] = useState<EmployeeDevices[]>([]);
    const [employeesBio, setEmployeesBio] = useState<EmployeeDevices[]>([]);
    const [employeesCard, setEmployeesCard] = useState<EmployeeDevices[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [initialData, setInitialData] = useState<Employee | null>(null);
    const [mainTabKey, setMainTabKey] = useState('tasks');
    const [userTrackTabKey, setUserTrackTabKey] = useState('users-software');
    const [userTabKey, setUserTabKey] = useState('users');
    const [filters, setFilters] = useState<Filters>({});
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['deviceNumber', 'deviceName', 'ipAddress']);
    const [selectedUserColums, setSelectedUserColumns] = useState<string[]>(['enrollNumber', 'employeeName', 'cardNumber', 'statusFprint', 'statusFace']);
    const [selectedDeviceToDelete, setSelectedDeviceToDelete] = useState<string>('');
    const [selectedUserToDelete, setSelectedUserToDelete] = useState<string>('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [resetSelection, setResetSelection] = useState(false);
    const [selectedDeviceRows, setSelectedDeviceRows] = useState<Devices[]>([]);
    const [selectedUserRows, setSelectedUserRows] = useState<EmployeeDevices[]>([]);
    const [deviceStatusCount, setDeviceStatusCount] = useState<DeviceStatusCounts>({ Activo: 0, Inactivo: 0 });
    const [selectedTerminal, setSelectedTerminal] = useState<Devices | null>(null);
    const [loading, setLoading] = useState(false);

    // Função para contar o status
    const countStatus = (statusArray: string[]): StatusCounts => {
        const counts: StatusCounts = { Activo: 0, Inactivo: 0 };
        statusArray.forEach(status => {
            if (status in counts) {
                counts[status as keyof StatusCounts]++;
            }
        });
        return counts;
    };

    // Função para buscar todos os dispositivos
    const fetchAllDevices = async () => {
        try {
            const response = await fetchWithAuth('Zkteco/GetAllDevices');
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            setDevices(data);

            const filteredStatus = data.map((device: Devices) => device.status ? 'Activo' : 'Inactivo');
            setDeviceStatus(filteredStatus);
            const statusCounts = countStatus(filteredStatus);
            setDeviceStatusCount(statusCounts);

        } catch (error) {
            console.error('Erro ao buscar dispositivos:', error);
        }
    };

    // Função para buscar todos os funcionários no dispositivo e salvar no DB
    const fetchAllEmployeesOnDevice = async (zktecoDevicesID: Devices) => {
        try {
            const response = await fetchWithAuth(`Zkteco/SaveAllEmployeesOnDeviceToDB/${zktecoDevicesID}`);
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            setDevices(data);
            toast.success(data.value || 'Funcionários recolhidos com sucesso!');

        } catch (error) {
            console.error('Erro ao buscar dispositivos:', error);
        }
    };

    // Função para enviar todos os funcionários para o dispositivo
    const sendAllEmployeesToDevice = async (zktecoDevicesID: Devices) => {
        try {
            const response = await fetchWithAuth(`Zkteco/SendEmployeesToDevice/${zktecoDevicesID}`);
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            setDevices(data);
            toast.success(data.value || 'Funcionários enviados com sucesso!');

        } catch (error) {
            console.error('Erro ao buscar dispositivos:', error);
        }
    };

    // Função para buscar todas as assiduidades no dispositivo
    const getAllAttendancesEmployeesOnDevice = async (zktecoDevicesID: Devices) => {
        try {
            const response = await fetchWithAuth(`Zkteco/GetAllAttendancesEmployeesOnDevice/${zktecoDevicesID}`);
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            setDevices(data);
            toast.success(data.value || 'Assiduidades recolhidas com sucesso!');

        } catch (error) {
            console.error('Erro ao buscar dispositivos:', error);
        }
    };

    // Função para sincronizar a hora manualmente para o dispositivo
    const syncTimeManuallyToDevice = async (device: Devices) => {
        try {
            const deviceWithTime = {
                ...device,
                dateTimeNow: new Date().toISOString()
            };

            const response = await fetchWithAuth('Zkteco/SyncTimeManuallyToDevice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deviceWithTime)
            });

            if (!response.ok) {
                toast.error('Falha ao sincronizar a hora');
                return;
            }

            const data = await response.json();
            setDevices(data);
            toast.success(data.value || 'Hora sincronizada com sucesso!');

        } catch (error) {
            console.error('Erro ao sincronizar a hora:', error);
            toast.error('Erro ao conectar ao servidor');
        }
    };


    // Define a função de adição de dispositivos
    const handleAddDevice = async (device: Devices) => {
        try {
            const response = await fetchWithAuth('Zkteco/CreateDevice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(device)
            });

            if (!response.ok) {
                return;
            }
            const deviceData = await response.json();
            setDevices([...devices, deviceData]);
            toast.success(deviceData.value || 'dispositivo apagado com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar dispositivos:', error);
        } finally {
            setShowAddModal(false);
            refreshAll();
        }
    };

    // Atualiza um funcionário
    const handleUpdateDevice = async (device: Devices) => {
        try {
            const response = await fetchWithAuth(`Zkteco/UpdateDevice`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(device)
            });

            if (!response.ok) {
                return;
            }

            const contentType = response.headers.get('Content-Type');
            (contentType && contentType.includes('application/json'))
            const updatedDevice = await response.json();
            const updatedDevices = devices.map(d => d.ZktecoDeviceID === updatedDevice.ZktecoDeviceID ? updatedDevice : d);
            setDevices(updatedDevices);
            toast.success(updatedDevice.value || 'Atualização realizada com sucesso!');

        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
            toast.error('Erro ao conectar ao servidor');
        } finally {
            setShowUpdateModal(false);
            refreshAll();
        }
    };

    // Função para deletar um dispositivo
    const handleDeleteDevice = async (ZktecoDeviceID: string) => {
        try {
            const response = await fetchWithAuth(`Zkteco/DeleteDevice?deviceId=${ZktecoDeviceID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return;
            }
            const deleteDevice = await response.json();
            toast.success(deleteDevice.value || 'dispositivo apagado com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar dispositivos:', error);
        } finally {
            setShowDeleteModal(false);
            refreshAll();
        }
    };

    // Função para buscar todos os funcionários por dispositivos
    const fetchAllEmployeeDevices = async () => {
        try {
            const response = await fetchWithAuth('Employees/GetAllEmployeesDevice');
            if (!response.ok) {
                return;
            }
            const employeesData = await response.json();
            setEmployeeDevices(employeesData);

            const filteredEmployees = employeesData.filter((employee: EmployeeDevices) =>
                employee.statusFprint === true || employee.statusFace === true
            );
            setEmployeesBio(filteredEmployees);

            const filteredCardEmployees = employeesData.filter((employee: EmployeeDevices) =>
                employee.cardNumber !== "0"
            );
            setEmployeesCard(filteredCardEmployees)
        } catch (error) {
            console.error('Erro ao apagar dispositivos:', error);
        }
    }

    // Função para apagar um funcionário
    const handleDeleteEmployee = async (employeeID: string) => {
        try {
            const response = await fetchWithAuth(`Employees/DeleteEmployee/${employeeID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return;
            }
            const deleteEmployee = await response.json();
            toast.success(deleteEmployee.value || 'Funcionário apagado com sucesso!')

        } catch (error) {
            console.error('Erro ao apagar funcionário:', error);
        } finally {
            setShowDeleteModal(false);
            refreshAll();
        }
    };

    // Atualiza os dados de renderização
    useEffect(() => {
        fetchAllDevices();
        fetchAllEmployeeDevices();
    }, []);

    // Atualiza a seleção ao resetar
    useEffect(() => {
        if (resetSelection) {
            setResetSelection(false);
        }
    }, [resetSelection]);

    // Função para atualizar tudo
    const refreshAll = () => {
        fetchAllDevices();
    };

    // Função para resetar as colunas
    const handleResetColumns = () => {
        setSelectedColumns(['deviceNumber', 'deviceName', 'ipAddress']);
    };

    const handleMainSelect = (k: string | null) => {
        if (k) {
            setMainTabKey(k);
        }
    };

    const handleUserTrackSelect = (k: string | null) => {
        if (k) {
            setUserTrackTabKey(k);
        }
    };

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
        selectedRows: Devices[];
    }) => {
        setSelectedDeviceRows(state.selectedRows);
        setSelectedTerminal(state.selectedRows[0] || null);
    };

    // Define a função de seleção de linhas de utilizadores
    const handleUserRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: EmployeeDevices[];
    }) => {
        setSelectedUserRows(state.selectedRows);
    };

    // Filtra os utilizadores no terminal
    const filteredUsersInTerminal = useMemo(() => {
        if (!selectedTerminal) {
            return [];
        }
        return employeeDevices.filter(employee => employee.deviceNumber === selectedTerminal.deviceNumber);
    }, [employeeDevices, selectedTerminal]);

    // Função para formatar a data e a hora
    function formatDateAndTime(input: string | Date): string {
        const date = typeof input === 'string' ? new Date(input) : input;
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        };
        return new Intl.DateTimeFormat('pt-PT', options).format(date);
    }

    const excludedColumns = ['readerCount', 'auxInCount', 'auxOutCount', 'maxUserCount', 'maxAttLogCount', 'maxFingerCount', 'maxUserFingerCount', 'faceAlg', 'fpAlg'];

    // Define as colunas de dispositivos
    const deviceColumns: TableColumn<Devices>[] = deviceFields
        .filter(field => selectedColumns.includes(field.key))
        .filter(field => !excludedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: Devices) => {
                switch (field.key) {
                    case 'code':
                        return row.code === 0 ? "" : row.code;
                    case 'machineNumber':
                        return row.code === 0 ? "" : row.machineNumber;
                    case 'cardNumber':
                        return row.cardNumber === 0 ? "" : row.cardNumber;
                    case 'productTime':
                        return formatDateAndTime(row[field.key]);
                    case 'status':
                        return row.status ? 'Activo' : 'Inactivo';
                    default:
                        return row[field.key];
                }
            };
            return {
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={devices} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Filtra os dados da tabela de dispositivos
    const filteredDeviceDataTable = devices.filter(device =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(device[key]) === String(filters[key])
        )
    );

    const stateColumns: TableColumn<Devices>[] = deviceFields
        .filter(field => excludedColumns.includes(field.key) || field.key === 'deviceName')
        .map(field => {
            return {
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={devices} />
                    </>
                ),
                selector: row => row[field.key],
                sortable: true,
            };
        });

    // Filtra os dados da tabela de estado de dispositivos
    const filteredStateDataTable = devices.filter(device =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(device[key]) === String(filters[key])
        )
    );

    // Formata as 3 colunas abaixo em uma única coluna
    const formatCombinedStatus = (row: EmployeeDevices) => {
        return (
            <>
                {row.cardNumber !== "0" && <img src={card} alt="Card" style={{ width: 20, marginRight: 5 }} />}
                {row.statusFprint && <img src={fprintScan} alt="Fingerprint" style={{ width: 20, marginRight: 5 }} />}
                {row.statusFace && <img src={faceScan} alt="Face" style={{ width: 20, marginRight: 5 }} />}
                {row.statusPalm && <img src={palmScan} alt="Palm" style={{ width: 20, marginRight: 5 }} />}
            </>
        );
    };

    const excludedUserColumns = ['statusFprint', 'statusFace', 'statusPalm'];

    // Define as colunas de utilizadores
    const userColumns: TableColumn<EmployeeDevices>[] = employeeDeviceFields
        .filter(field => selectedUserColums.includes(field.key))
        .filter(field => !excludedUserColumns.includes(field.key))
        .map(field => {
            const formatField = (row: EmployeeDevices) => {
                switch (field.key) {
                    case 'cardNumber':
                        return row.cardNumber === "0" ? "" : row.cardNumber;
                    default:
                        return row[field.key] || '';
                }
            };

            return {
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={employeeDevices} />
                    </>
                ),
                selector: (row: EmployeeDevices) => formatField(row),
                sortable: true,
            };
        })
        .concat([
            {
                name: (
                    <>
                        Modo de Verificação
                    </>
                ),
                selector: row => formatCombinedStatus(row),
                sortable: true,
            }
        ]);

    // Filtra os dados da tabela de utilizadores
    const filteredUserDataTable = employeeDevices.filter(employee =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(employee[key]) === String(filters[key])
        )
    );

    // Define os dados da tabela de biometria
    const filteredBioDataTable = employeesBio.filter(employee =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(employee[key]) === String(filters[key])
        )
    );

    // Filtra os dados da tabela de cartões
    const filteredCardDataTable = employeesCard.filter(employee =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(employee[key]) === String(filters[key])
        )
    );

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define a função de abertura do modal de edição dos dispositivos
    const handleEditDevices = (row: Devices) => {
        setSelectedTerminal(row);
        setShowUpdateModal(true);
    };

    // Define a função de fechamento do modal de atualização
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedTerminal(null);
    }

    // Define a função de abertura do modal de exclusão dos dispositivos
    const handleOpenDeleteModal = (id: string, type: 'device' | 'user') => {
        if (type === 'device') {
            setSelectedDeviceToDelete(id);
        } else {
            setSelectedUserToDelete(id);
        }
        setShowDeleteModal(true);
    };


    // Função que manipula a duplicação e fecha o modal de atualização
    const handleDuplicateAndClose = (devices: Devices) => {
        if (onDuplicate) {
            onDuplicate(devices);
        }
        setShowUpdateModal(false);
    };

    // Define as colunas de ação de dispositivos
    const devicesActionColumn: TableColumn<Devices> = {
        name: 'Ações',
        cell: (row: Devices) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditDevices(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.zktecoDevicesID, 'device')}>
                    <i className="bi bi-trash-fill"></i>
                </Button>
            </div>
        ),
        selector: (row: Devices) => row.employeeID,
        ignoreRowClick: true,
    };

    // Define a cor do status
    const getStatusColor = (statuses: string[]): string => {
        const isActive = statuses.some(status => status === 'Activo');
        return isActive ? 'green' : 'red';
    };

    // Define a cor de fundo do status
    const backgroundColor = getStatusColor(deviceStatus);

    // Condicionais separadas para identificar o que deve ser deletado
    const isDeviceToDelete = !!selectedDeviceToDelete;
    const isUserToDelete = !!selectedUserToDelete;

    return (
        <div className="main-container">
            <NavBar />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span>Terminais</span>
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
                            Status: {deviceStatusCount && `${deviceStatusCount['Activo'] || 0} Activo(s), ${deviceStatusCount['Inactivo'] || 0} Inactivo(s)`}
                        </span>
                    </div>
                </div>
            </div>
            <div className="content-section" style={{ display: 'flex', flex: 1 }}>
                <div style={{ flex: 1.5, overflow: "auto" }}>
                    <DataTable
                        columns={[...deviceColumns, devicesActionColumn]}
                        data={filteredDeviceDataTable}
                        onRowDoubleClicked={handleEditDevices}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        selectableRows
                        onSelectedRowsChange={handleDeviceRowSelected}
                        selectableRowsHighlight
                        noDataComponent="Não há dados disponíveis para exibir."
                        customStyles={customStyles}
                    />
                </div>
                <div style={{ flex: 2, overflow: "auto" }}>
                    <Tabs
                        id="controlled-tab-terminals"
                        activeKey={mainTabKey}
                        onSelect={handleMainSelect}
                        className="nav-modal"
                        style={{ marginBottom: 10 }}
                    >
                        <Tab eventKey="tasks" title="Actividade">
                            <p>DATATABLE DE TAREFAS</p>
                            {/* <DataTable
                                columns={[...tableColumns, actionColumn]}
                                data={filteredDataTable}
                                onRowDoubleClicked={handleEditDepartment}
                                pagination
                                paginationComponentOptions={paginationOptions}
                                noDataComponent="Não há dados disponíveis para exibir."
                                customStyles={customStyles}
                            /> */}
                            <p>DATATABLE DE ACTIVIDADE</p>
                            {/* <DataTable
                                columns={[...tableColumns, actionColumn]}
                                data={filteredDataTable}
                                onRowDoubleClicked={handleEditDepartment}
                                pagination
                                paginationComponentOptions={paginationOptions}
                                noDataComponent="Não há dados disponíveis para exibir."
                                customStyles={customStyles}
                            /> */}
                        </Tab>
                        <Tab eventKey="user-track" title="Manutenção de utilizadores">
                            <Tabs
                                id="controlled-tab-terminals-user-track"
                                activeKey={userTrackTabKey}
                                onSelect={handleUserTrackSelect}
                                className="nav-modal"
                                style={{ marginBottom: 10 }}
                            >
                                <Tab eventKey="users-software" title="Utilizadores no software">
                                    <div style={{ display: "flex" }}>
                                        <div style={{ overflowX: "auto", flex: 5 }}>
                                            <DataTable
                                                columns={userColumns}
                                                data={filteredUserDataTable}
                                                pagination
                                                paginationComponentOptions={paginationOptions}
                                                selectableRows
                                                onSelectedRowsChange={handleUserRowSelected}
                                                selectableRowsHighlight
                                                noDataComponent="Não há dados disponíveis para exibir."
                                                customStyles={customStyles}
                                            />
                                        </div>
                                        <div style={{ flex: 1, flexDirection: "column" }}>
                                            <Button variant="outline-primary" size="sm" className="button-terminals-users-track">
                                                <i className="bi bi-person-fill-up" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                                Enviar utilizadores seleccionados
                                            </Button>
                                            <Button variant="outline-primary" size="sm" className="button-terminals-users-track" onClick={() => {
                                                if (selectedUserRows.length > 0) {
                                                    const userId = selectedUserRows[0].employeeID;
                                                    handleOpenDeleteModal(userId, 'user');
                                                } else {
                                                    toast.error('Selecione um utilizador primeiro!');
                                                }
                                            }}>
                                                <i className="bi bi-person-x-fill" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                                Remover utilizadores seleccionados
                                            </Button>
                                            <Button variant="outline-primary" size="sm" className="button-terminals-users-track">
                                                <i className="bi bi-person-fill-down" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                                Recolher utilizadores seleccionados
                                            </Button>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="users-terminal" title="Utilizadores no terminal">
                                    <DataTable
                                        columns={userColumns}
                                        data={filteredUsersInTerminal}
                                        pagination
                                        paginationComponentOptions={paginationOptions}
                                        selectableRows
                                        onSelectedRowsChange={handleUserRowSelected}
                                        selectableRowsHighlight
                                        noDataComponent={selectedTerminal ? "Não há dados disponíveis para exibir." : "Selecione um terminal para exibir os utilizadores."}
                                        customStyles={customStyles}
                                    />
                                </Tab>
                                <Tab eventKey="facial-taken" title="Biometria recolhida">
                                    <DataTable
                                        columns={userColumns}
                                        data={filteredBioDataTable}
                                        pagination
                                        paginationComponentOptions={paginationOptions}
                                        selectableRows
                                        onSelectedRowsChange={handleUserRowSelected}
                                        selectableRowsHighlight
                                        noDataComponent="Não há dados disponíveis para exibir."
                                        customStyles={customStyles}
                                    />
                                </Tab>
                                <Tab eventKey="cards-taken" title="Cartões recolhidos">
                                    <DataTable
                                        columns={userColumns}
                                        data={filteredCardDataTable}
                                        pagination
                                        paginationComponentOptions={paginationOptions}
                                        selectableRows
                                        onSelectedRowsChange={handleUserRowSelected}
                                        selectableRowsHighlight
                                        noDataComponent="Não há dados disponíveis para exibir."
                                        customStyles={customStyles}
                                    />
                                </Tab>
                            </Tabs>
                        </Tab>
                        <Tab eventKey="state" title="Estado">
                            <DataTable
                                columns={stateColumns}
                                data={filteredStateDataTable}
                                pagination
                                paginationComponentOptions={paginationOptions}
                                selectableRows
                                onSelectedRowsChange={handleDeviceRowSelected}
                                selectableRowsHighlight
                                noDataComponent="Não há dados disponíveis para exibir."
                                customStyles={customStyles}
                            />
                        </Tab>
                    </Tabs>
                </div>
            </div>
            <div>
                <Tabs
                    id="controlled-tab-terminals-buttons"
                    activeKey={userTabKey}
                    onSelect={handleUserSelect}
                    className="nav-modal"
                    style={{ marginBottom: 10, marginTop: 10 }}
                >
                    <Tab eventKey="users" title="Utilizadores">
                        <div style={{ display: "flex", marginTop: 10, marginBottom: 10, padding: 10 }}>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={async () => {
                                if (selectedTerminal) {
                                    setLoading(true);
                                    await fetchAllEmployeesOnDevice(selectedTerminal);
                                    setLoading(false);
                                } else {
                                    toast.error('Selecione um terminal primeiro!');
                                }
                            }}>
                                {loading ? (
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                ) : (
                                    <i className="bi bi-arrow-down-circle" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                )}
                                Recolher utilizadores
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={async () => {
                                if (selectedTerminal) {
                                    setLoading(true);
                                    await sendAllEmployeesToDevice(selectedTerminal);
                                    setLoading(false);
                                } else {
                                    toast.error('Selecione um terminal primeiro!');
                                }
                            }}>
                                {loading ? (
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                ) : (
                                    <i className="bi bi-arrow-up-circle" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                )}
                                Enviar todos os utilizadores
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-arrow-repeat" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Sincronizar utilizadores
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={async () => {
                                if (selectedTerminal) {
                                    setLoading(true);
                                    await getAllAttendancesEmployeesOnDevice(selectedTerminal);
                                    setLoading(false);
                                } else {
                                    toast.error('Selecione um terminal primeiro!');
                                }
                            }}>
                                {loading ? (
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                ) : (
                                    <i className="bi bi-arrow-left-right" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                )}
                                Recolher movimentos
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={() => {
                                if (selectedUserRows.length > 0) {
                                    const userId = selectedUserRows[0].employeeID;
                                    handleOpenDeleteModal(userId, 'user');
                                } else {
                                    toast.error('Selecione um utilizador primeiro!');
                                }
                            }}>
                                <i className="bi bi-trash" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Apagar utilizadores
                            </Button>
                            <div className="col-3">
                                <Form.Check type="checkbox" label="Utilizadores" className="mb-2" />
                                <Form.Check type="checkbox" label="Biometria digital" className="mb-2" />
                                <Form.Check type="checkbox" label="Biometria facial" className="mb-2" />
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="onOff" title="Ligação">
                        <div style={{ display: "flex", marginTop: 10, marginBottom: 10, padding: 10 }}>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-power" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Ligar
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-bootstrap-reboot" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Reiniciar
                            </Button>
                        </div>
                    </Tab>
                    <Tab eventKey="access" title="Acessos">
                        <div style={{ display: "flex", marginTop: 10, marginBottom: 10, padding: 10 }}>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-clock-history" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Enviar horários
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-door-open" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Abrir porta
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-pc" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Actualizar multiverificação
                            </Button>
                        </div>
                    </Tab>
                    <Tab eventKey="configuration" title="Configurações">
                        <div style={{ display: "flex", marginTop: 10, marginBottom: 10, padding: 10 }}>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={async () => {
                                if (selectedTerminal) {
                                    setLoading(true);
                                    await syncTimeManuallyToDevice(selectedTerminal);
                                    setLoading(false);
                                } else {
                                    toast.error('Selecione um terminal primeiro!');
                                }
                            }}>
                                {loading ? (
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                ) : (
                                    <i className="bi bi-calendar-check" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                )}
                                Acertar a hora
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-gear-wide" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Enviar configurações
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-send-arrow-up" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Enviar códigos de tarefas
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-bell" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Sincronizar toques da sirene
                            </Button>
                        </div>
                    </Tab>
                    <Tab eventKey="files" title="Ficheiros">
                        <div style={{ display: "flex", marginTop: 10, marginBottom: 10, padding: 10 }}>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-arrow-bar-down" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Importar movimentos
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-person-fill-down" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Importar utilizadores
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-fingerprint" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Importar biometria digital
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-file-arrow-down" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Importar movimentos do log
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-files-alt" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Importar movimentos do log (auto)
                            </Button>
                        </div>
                    </Tab>
                </Tabs>
            </div>
            <Footer />
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
            <CreateModalDevices
                title="Adicionar Terminal"
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleAddDevice}
                fields={deviceFields}
                initialValues={initialData || {}}
            />
            {selectedTerminal && (
                <UpdateModalDevices
                    open={showUpdateModal}
                    onClose={handleCloseUpdateModal}
                    onDuplicate={handleDuplicateAndClose}
                    onUpdate={handleUpdateDevice}
                    entity={selectedTerminal}
                    fields={deviceFields}
                    title="Atualizar Terminal"
                />
            )}
            {showDeleteModal && (isDeviceToDelete || isUserToDelete) && (
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={isDeviceToDelete ? handleDeleteDevice : handleDeleteEmployee}
                    entityId={isDeviceToDelete ? selectedDeviceToDelete : selectedUserToDelete}
                />
            )}
        </div>
    );
};