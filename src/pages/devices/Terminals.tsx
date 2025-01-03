import React, { useContext, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { toast } from "react-toastify";

import card from "../../assets/img/terminais/card.png";
import faceScan from "../../assets/img/terminais/faceScan.png";
import fprintScan from "../../assets/img/terminais/fprintScan.png";
import palmScan from "../../assets/img/terminais/palmScan.png";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { customStyles } from "../../components/CustomStylesDataTable";
import { ExportButton } from "../../components/ExportButton";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";

import "../../css/Terminals.css";
import { Button, Form, OverlayTrigger, Spinner, Tab, Tabs, Tooltip } from "react-bootstrap";

import { PrintButton } from "../../components/PrintButton";
import { SelectFilter } from "../../components/SelectFilter";
import { AttendanceContext, AttendanceContextType } from "../../context/MovementContext";
import { useNavbar } from "../../context/NavbarContext";
import { PersonsContext, PersonsContextType } from "../../context/PersonsContext";
import { DeviceContextType, TerminalsContext, TerminalsProvider } from "../../context/TerminalsContext";
import * as apiService from "../../helpers/apiService";
import { deviceFields, doorFields, employeeCardFields, employeeFields, employeesOnDeviceFields, transactionFields } from "../../helpers/Fields";
import { Devices, DoorDevice, Employee, EmployeeAndCard, EmployeeCard, EmployeesOnDevice, KioskTransaction } from "../../helpers/Types";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { CreateModalDevices } from "../../modals/CreateModalDevices";
import { DeleteModal } from "../../modals/DeleteModal";
import { DoorModal } from "../../modals/DoorModal";
import { UpdateModalDevices } from "../../modals/UpdateModalDevices";

import { id } from "date-fns/locale";

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a interface para os dados de biometria
interface FingerprintTemplate {
    FPTmpLength: number;
    enrollNumber: string;
    FPTmpIndex: number;
    FPTmpFlag: number;
    FPTmpData: string;
}

// Define a interface para os dados de face
interface FaceTemplate {
    enrollNumber: string;
    FaceTmpIndex: number;
    FaceTmpData: string;
    FaceTmpLength: number;
}

// Define a interface para os movimentos
interface Movement {
    UserID: string;
    IsInvalid: string;
    State: string;
    VerifyStyle: string;
    Time: string;
}

// Define a interface para os dados de utilizadores e cartões
interface MergedEmployeeAndCard extends Omit<Employee, 'enrollNumber'>, Partial<Omit<EmployeeCard, 'id'>> {
    enrollNumber: string;
}

// Junta os campos de utilizadores e cartões
const combinedEmployeeFields = [...employeeFields, ...employeeCardFields];

// Define o componente de terminais
export const Terminals = () => {
    const {
        devices,
        employeeDevices,
        fetchAllDevices,
        fetchAllEmployeeDevices,
        fetchAllKioskTransaction,
        fetchAllKioskTransactionOnDevice,
        sendAllEmployeesToDevice,
        saveAllEmployeesOnDeviceToDB,
        saveAllAttendancesEmployeesOnDevice,
        syncTimeManuallyToDevice,
        deleteAllUsersOnDevice,
        openDeviceDoor,
        restartDevice,
        sendClockToDevice,
        handleAddDevice,
        handleUpdateDevice,
        handleDeleteDevice,
    } = useContext(TerminalsContext) as DeviceContextType;
    const {
        handleAddImportedAttendance,
    } = useContext(AttendanceContext) as AttendanceContextType;
    const {
        fetchAllEmployees,
        fetchAllCardData,
        handleImportEmployeeCard,
        handleImportEmployeeFP,
        handleImportEmployeeFace
    } = useContext(PersonsContext) as PersonsContextType;
    const { navbarColor, footerColor } = useNavbar();
    const [employees, setEmployees] = useState<EmployeeAndCard[]>([]);
    const [employeesBio, setEmployeesBio] = useState<EmployeeAndCard[]>([]);
    const [employeeCards, setEmployeeCards] = useState<EmployeeAndCard[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [initialData, setInitialData] = useState<Partial<Devices> | null>(null);
    const [mainTabKey, setMainTabKey] = useState('tasks');
    const [userTrackTabKey, setUserTrackTabKey] = useState('users-software');
    const [userTabKey, setUserTabKey] = useState('users');
    const [filters, setFilters] = useState<Filters>({});
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['deviceNumber', 'deviceName', 'model', 'ipAddress', 'status', 'enabled']);
    const [selectedUserColums, setSelectedUserColumns] = useState<string[]>(['enrollNumber', 'name', 'cardNumber', 'statusFprint', 'statusFace']);
    const [selectedBioColums, setSelectedBioColumns] = useState<string[]>(['enrollNumber', 'name', 'statusFprint', 'statusFace']);
    const [selectedCardColums, setSelectedCardColumns] = useState<string[]>(['enrollNumber', 'name', 'cardNumber']);
    const [selectedDeviceToDelete, setSelectedDeviceToDelete] = useState<string>('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [resetSelection, setResetSelection] = useState(false);
    const [selectedDeviceRows, setSelectedDeviceRows] = useState<Devices[]>([]);
    const [selectedUserRows, setSelectedUserRows] = useState<EmployeeAndCard[]>([]);
    const [selectedTerminal, setSelectedTerminal] = useState<Devices | null>(null);
    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingAllUser, setLoadingAllUser] = useState(false);
    const [loadingSyncAllUser, setLoadingSyncAllUser] = useState(false);
    const [loadingMovements, setLoadingMovements] = useState(false);
    const [loadingSyncTime, setLoadingSyncTime] = useState(false);
    const [loadingOpenDoor, setLoadingOpenDoor] = useState(false);
    const [loadingDeleteAllUsers, setLoadingDeleteAllUsers] = useState(false);
    const [loadingRestartDevice, setLoadingRestartDevice] = useState(false);
    const [loadingDeleteSelectedUsers, setLoadingDeleteSelectedUsers] = useState(false);
    const [loadingSendSelectedUsers, setLoadingSendSelectedUsers] = useState(false);
    const [loadingFetchSelectedUsers, setLoadingFetchSelectedUsers] = useState(false);
    const [loadingImportAttendance, setLoadingImportAttendance] = useState(false);
    const [loadingImportAttendanceLog, setLoadingImportAttendanceLog] = useState(false);
    const [loadingImportUsers, setLoadingImportUsers] = useState(false);
    const [loadingImportBio, setLoadingImportBio] = useState(false);
    const [loadingImportFace, setLoadingImportFace] = useState(false);
    const [showAllUsers, setShowAllUsers] = useState(true);
    const [showFingerprintUsers, setShowFingerprintUsers] = useState(false);
    const [showFacialRecognitionUsers, setShowFacialRecognitionUsers] = useState(false);
    const fileInputAttendanceRef = React.createRef<HTMLInputElement>();
    const fileInputUserRef = React.createRef<HTMLInputElement>();
    const fileInputFPRef = React.createRef<HTMLInputElement>();
    const fileInputFaceRef = React.createRef<HTMLInputElement>();
    const [movements, setMovements] = useState<Movement[]>([]);
    const [transactions, setTransactions] = useState<KioskTransaction[]>([]);
    const [loadingActivityData, setLoadingActivityData] = useState(false);
    const [loadingSendClock, setLoadingSendClock] = useState(false);
    const [showDoorModal, setShowDoorModal] = useState(false);
    const [loadingUsersInTerminalData, setLoadingUsersInTerminalData] = useState(false);
    const [loadingTerminals, setLoadingTerminals] = useState(false);
    const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);

    // Função para buscar todos os utilizadores e cartões
    const fetchEmployeesAndCards = async () => {
        const employeesData: Employee[] = await fetchAllEmployees();
        setEmployees(employeesData);

        const filteredEmployeesBio = employeesData.filter(
            (employee) => employee.statusFprint === true || employee.statusFace === true
        );
        const sortedEmployeesBio = filteredEmployeesBio.slice().sort((a, b) => {
            const aNum = parseInt(a.enrollNumber || "0", 10);
            const bNum = parseInt(b.enrollNumber || "0", 10);
            return aNum - bNum;
        });
        setEmployeesBio(sortedEmployeesBio);

        const allEmployeeCards = employeesData.flatMap(
            (employee) => employee.employeeCards || []
        );

        const filteredCards = allEmployeeCards.filter(
            (card) => card.cardNumber !== "0"
        );

        const sortedCards = filteredCards.slice().sort((a, b) => {
            const aNum = parseInt(a.cardNumber || "0", 10);
            const bNum = parseInt(b.cardNumber || "0", 10);
            return aNum - bNum;
        });

        setEmployeeCards(sortedCards);
    };

    // Função para buscar todas as transações de quiosques
    useEffect(() => {
        const fetchTransactions = async () => {
            if (selectedTerminal) {
                setLoadingActivityData(true);
                try {
                    const fetchedTransactions = await fetchAllKioskTransaction(selectedTerminal.zktecoDeviceID);
                    setTransactions(fetchedTransactions);
                    setLoadingActivityData(false);
                } catch (error) {
                    console.error("Erro ao buscar transações:", error);
                }
            } else {
                setTransactions([]);
                setLoadingActivityData(false);
            }
        };
        fetchTransactions();
    }, [selectedTerminal]);

    // Função para buscar todos os utilizadores no terminal
    useEffect(() => {
        const fetchUsersInTerminal = async () => {
            if (selectedTerminal && selectedTerminal.status) {
                setLoadingUsersInTerminalData(true);
                try {
                    await fetchAllEmployeeDevices(selectedTerminal.zktecoDeviceID);
                    setLoadingUsersInTerminalData(false);
                } catch (error) {
                    console.error("Erro ao buscar utilizadores no terminal:", error);
                }
            } else {
                setLoadingUsersInTerminalData(false);
            }
        }
        fetchUsersInTerminal();
    }, [selectedTerminal]);

    // Função para adicionar um dispositivo
    const addDevice = async (device: Devices) => {
        setLoadingTerminals(true);
        await handleAddDevice(device);
        setLoadingTerminals(false);
        refreshAll();
        setClearSelectionToggle(!clearSelectionToggle);
    }

    // Função para atualizar um dispositivo
    const updateDevice = async (device: Devices) => {
        await handleUpdateDevice(device);
        refreshAll();
        setClearSelectionToggle(!clearSelectionToggle);
    }

    // Função para excluir um dispositivo
    const deleteDevice = async () => {
        if (selectedDeviceToDelete) {
            await handleDeleteDevice(selectedDeviceToDelete);
            refreshAll();
            setClearSelectionToggle(!clearSelectionToggle);
        }
    }

    // Atualiza os dados de renderização
    useEffect(() => {
        fetchAllDevices();
        fetchEmployeesAndCards();
        fetchAllCardData();
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
        fetchEmployeesAndCards();
        setClearSelectionToggle(!clearSelectionToggle);
    }

    // Função para resetar as colunas
    const handleResetColumns = () => {
        setSelectedColumns(['deviceNumber', 'deviceName', 'model', 'ipAddress', 'status', 'enabled']);
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
        const sortedDevices = devices.sort((a, b) => a.deviceNumber - b.deviceNumber);
        setSelectedDeviceRows(sortedDevices);
        setSelectedTerminal(state.selectedRows[0] || null);
    };

    // Define a função de seleção de linhas de utilizadores
    const handleUserRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: (EmployeeAndCard | EmployeesOnDevice)[];
    }) => {
        setSelectedUserRows(state.selectedRows);
    };

    // Filtra os utilizadores no terminal
    const filteredUsersInTerminal = useMemo(() => {
        if (selectedTerminal) {
            return employeeDevices;
        } else {
            return [];
        }
    }, [employeeDevices, selectedTerminal]);

    // Define as colunas de funcionário no dispositivo
    const filteredUsersInSoftware = useMemo(() => {
        if (employees) {
            return employees;
        } else {
            return [];
        }
    }, [employees, selectedTerminal]);

    // Define as colunas de funcionário no dispositivo
    const employeeOnDeviceColumns: TableColumn<EmployeesOnDevice>[] = employeesOnDeviceFields
        .map(field => {
            const formatField = (row: EmployeesOnDevice) => {
                switch (field.key) {
                    case 'pin':
                        return Number(row.pin) || 'Número inválido';
                    default:
                        return row[field.key];
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredUsersInTerminal} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    const excludedColumns = ['readerCount', 'auxInCount', 'auxOutCount', 'maxUserCount', 'maxAttLogCount', 'maxFingerCount', 'maxUserFingerCount', 'faceAlg', 'fpAlg'];

    // Filtra os dados da tabela de dispositivos
    const filteredDeviceDataTable = devices.filter(device =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(device[key]) === String(filters[key])
        )
    );

    // Seleciona a entidade anterior
    const handleNextDevice = () => {
        const sortedDevices = devices.sort((a, b) => a.deviceNumber - b.deviceNumber);
        if (currentDeviceIndex < sortedDevices.length - 1) {
            setCurrentDeviceIndex(currentDeviceIndex + 1);
            setSelectedTerminal(sortedDevices[currentDeviceIndex + 1]);
        }
    };

    // Seleciona a entidade seguinte
    const handlePrevDevice = () => {
        const sortedDevices = devices.sort((a, b) => a.deviceNumber - b.deviceNumber);
        if (currentDeviceIndex > 0) {
            setCurrentDeviceIndex(currentDeviceIndex - 1);
            setSelectedTerminal(sortedDevices[currentDeviceIndex - 1]);
        }
    };

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
                        return new Date(row.productTime).toLocaleString() || '';
                    case 'status':
                        return (
                            <div style={{
                                height: '10px',
                                width: '10px',
                                backgroundColor: row.status ? 'green' : 'red',
                                borderRadius: '50%',
                                display: 'inline-block'
                            }} title={row.status ? 'Online' : 'Offline'} />
                        );
                    case 'enabled':
                        return row.enabled ? 'Activo' : 'Inactivo';
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
            };
        });

    // Define as colunas de transações de quiosques
    const transactionColumns: TableColumn<KioskTransaction>[] = transactionFields
        .filter(field => field.key !== 'id' && field.key !== 'eventId' && field.key !== 'createTime' && field.key !== 'updateTime')
        .map(field => {
            const formatField = (row: KioskTransaction) => {
                switch (field.key) {
                    case 'eventTime':
                        return new Date(row[field.key]).toLocaleString() || '';
                    case 'eventDoorId':
                        switch (row[field.key]) {
                            case 1:
                                return 'Terminal';
                            case 2:
                                return 'Moedeiro';
                            case 3:
                                return 'Cartão'
                            case 4:
                                return 'Video Porteiro'
                            default:
                                return row[field.key];
                        }
                    case 'deviceSN':
                        return devices.find(device => device.serialNumber === row[field.key])?.deviceName || '';
                    default:
                        return row[field.key];
                }
            };
            return {
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={transactions} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Filtra os dados da tabela de estado de dispositivos
    const filteredStateDataTable = devices.filter(device =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(device[key]) === String(filters[key])
        )
    );

    // Define as colunas de estado de dispositivos
    const stateColumns: TableColumn<Devices>[] = deviceFields
        .filter(field => excludedColumns.includes(field.key) || field.key === 'deviceName')
        .map(field => {
            return {
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredStateDataTable} />
                    </>
                ),
                selector: row => row[field.key],
                sortable: true,
            };
        });

    // Formata as colunas especiais na tabela de utilizadores, biometria e cartões
    const formatUserStatus = (row: EmployeeAndCard) => {
        const hasValidCardNumber = row.employeeCards?.some(
            (card) => card.cardNumber && card.cardNumber !== "0"
        );
        return (
            <>
                {hasValidCardNumber && <img src={card} alt="Card" style={{ width: 20, marginRight: 5 }} />}
                {row.statusFprint && <img src={fprintScan} alt="Fingerprint" style={{ width: 20, marginRight: 5 }} />}
                {row.statusFace && <img src={faceScan} alt="Face" style={{ width: 20, marginRight: 5 }} />}
                {row.statusPalm && <img src={palmScan} alt="Palm" style={{ width: 20, marginRight: 5 }} />}
            </>
        );
    };
    const formatBioStatus = (row: EmployeeAndCard) => {
        return (
            <>
                {row.statusFprint && <img src={fprintScan} alt="Fingerprint" style={{ width: 20, marginRight: 5 }} />}
                {row.statusFace && <img src={faceScan} alt="Face" style={{ width: 20, marginRight: 5 }} />}
                {row.statusPalm && <img src={palmScan} alt="Palm" style={{ width: 20, marginRight: 5 }} />}
            </>
        );
    };
    const formatCardStatus = (row: EmployeeAndCard) => {
        const hasCard = row.employeeCards?.some(
            (card) => card.cardNumber && card.cardNumber !== "0"
        );
        return (
            <>
                {hasCard && <img src={card} alt="Card" style={{ width: 20, marginRight: 5 }} />}
            </>
        );
    };

    // Define as colunas excluídas de utilizadores    
    const excludedUserColumns = ['statusFprint', 'statusFace', 'statusPalm', 'cardNumber'];

    // Define as colunas de utilizadores
    const userColumns: TableColumn<EmployeeAndCard>[] = combinedEmployeeFields
        .filter(field => selectedUserColums.includes(field.key))
        .filter(field => !excludedUserColumns.includes(field.key))
        .map(field => {
            const formatField = (row: EmployeeAndCard) => {
                switch (field.key) {
                    case 'cardNumber':
                        return row.cardNumber === "0" ? "" : row.cardNumber;
                    case 'enrollNumber':
                        return Number(row.enrollNumber) || '';
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredUsersInSoftware} />
                    </>
                ),
                selector: (row: EmployeeAndCard) => formatField(row),
                sortable: true,
            };
        })
        .concat([
            {
                id: 'verificationMode',
                name: (
                    <>
                        Modo de Verificação
                    </>
                ),
                selector: row => formatUserStatus(row),
                sortable: true,
            }
        ]);

    // Define as colunas excluídas de utilizadores    
    const excludedBioColumns = ['statusFprint', 'statusFace', 'statusPalm'];

    // Define os dados da tabela de biometria
    const filteredBioDataTable = employeesBio.filter(employee =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(employee[key]) === String(filters[key])
        )
    );

    // Define as colunas de utilizadores
    const bioColumns: TableColumn<EmployeeAndCard>[] = combinedEmployeeFields
        .filter(field => selectedBioColums.includes(field.key))
        .filter(field => !excludedBioColumns.includes(field.key))
        .map(field => {
            const formatField = (row: EmployeeAndCard) => {
                switch (field.key) {
                    case 'enrollNumber':
                        return Number(row.enrollNumber) || '';
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredBioDataTable} />
                    </>
                ),
                selector: (row: EmployeeAndCard) => formatField(row),
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
                selector: row => formatBioStatus(row),
                sortable: true,
            }
        ]);

    // Define as colunas excluídas de utilizadores    
    const excludedCardColumns = ['statusFprint', 'statusFace', 'statusPalm'];

    // Filtra os dados da tabela de cartões
    const filteredCardDataTable = employees.filter(employee =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(employee[key]) === String(filters[key])
        )
    );

    // Define as colunas de utilizadores
    const cardColumns: TableColumn<EmployeeAndCard>[] = combinedEmployeeFields
        .filter(field => selectedCardColums.includes(field.key))
        .filter(field => !excludedCardColumns.includes(field.key))
        .map(field => {
            const formatField = (row: EmployeeAndCard) => {
                switch (field.key) {
                    case 'cardNumber': {
                        const firstCard = row.employeeCards?.find(
                            (card) => card.cardNumber && card.cardNumber !== "0"
                        );
                        return firstCard?.cardNumber || "";
                    }
                    case 'enrollNumber':
                        return Number(row.enrollNumber) || '';
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredCardDataTable} />
                    </>
                ),
                selector: (row: EmployeeAndCard) => formatField(row),
                sortable: true,
            };
        })
        .concat([
            {
                id: 'verificationMode',
                name: (
                    <>
                        Modo de Verificação
                    </>
                ),
                selector: row => formatCardStatus(row),
                sortable: true,
            }
        ]);

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define a função de abertura do modal de edição dos dispositivos
    const handleEditDevices = (row: Devices) => {
        setSelectedTerminal(row);
        const sortedDevices = devices.sort((a, b) => a.deviceNumber - b.deviceNumber);
        const devicesIndex = sortedDevices.findIndex(device => device.zktecoDeviceID === row.zktecoDeviceID);
        setCurrentDeviceIndex(devicesIndex);
        setShowUpdateModal(true);
    };

    // Define a função de abertura do modal de exclusão dos dispositivos
    const handleOpenDeleteModal = async (zktecoDeviceID: string) => {
        setSelectedDeviceToDelete(zktecoDeviceID);
        setShowDeleteModal(true);
    };

    // Função que manipula a duplicação
    const handleDuplicate = (devices: Partial<Devices>) => {
        setInitialData(devices);
        setShowAddModal(true);
        setShowUpdateModal(false);
        setSelectedTerminal(null);
    };

    // Função que manipula o filtro de utilizadores
    const handleAllUsersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setShowAllUsers(isChecked);
        if (isChecked) {
            setShowFingerprintUsers(false);
            setShowFacialRecognitionUsers(false);
        }
    };

    // Função que manipula o filtro de utilizadores de biometria digital
    const handleFingerprintUsersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setShowFingerprintUsers(isChecked);
        if (isChecked) {
            setShowAllUsers(false);
        } else {
            checkAllFiltersOff(false, showFacialRecognitionUsers);
        }
    };

    // Função que manipula o filtro de utilizadores de biometria facial
    const handleFacialRecognitionUsersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setShowFacialRecognitionUsers(isChecked);
        if (isChecked) {
            setShowAllUsers(false);
        } else {
            checkAllFiltersOff(showFingerprintUsers, false);
        }
    };

    // Função que verifica se todos os filtros estão desligados
    const checkAllFiltersOff = (fingerprint: boolean, facial: boolean) => {
        if (!fingerprint && !facial) {
            setShowAllUsers(true);
        }
    };

    // Define as colunas de ação de dispositivos
    const devicesActionColumn: TableColumn<Devices> = {
        name: 'Ações',
        cell: (row: Devices) => (
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
                    <CustomOutlineButton className="action-button" icon='bi bi-trash-fill' onClick={() => handleOpenDeleteModal(row.zktecoDeviceID)} />
                </OverlayTrigger>
            </div>
        ),
        selector: (row: Devices) => row.employeeID,
        ignoreRowClick: true,
    };

    // Função para controlar a mudança de arquivo dos movimentos
    const handleAttendanceFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const result = e.target?.result;
                if (typeof result === 'string') {
                    const fileName = file.name;
                    const parsedData = parseAttendanceData(result, fileName);
                    await handleAddImportedAttendance(parsedData);
                } else {
                    console.error('Erro: o conteúdo do arquivo não é uma string ou number');
                }
            };
            setLoadingImportAttendance(false);
            setLoadingImportAttendanceLog(false);
            reader.readAsText(file);
        }
    };

    // Função para formatar os dados de movimentos para a API
    const parseAttendanceData = (text: string, fileName: string) => {
        const deviceSN = fileName.split('_')[0];
        const lines = text.split('\n');
        return lines.filter(line => line.trim().length > 0).map(line => {
            const parts = line.trim().split(/\s+/);
            const enrollNumber = parts[0];
            const attendanceDateTime = `${parts[1]}T${parts[2]}.000Z`;
            const deviceNumber = parts[3];
            const inOutMode = parts[4];
            const verifyMode = parts[5];
            const workCode = parts[6];

            return {
                deviceSN: deviceSN,
                enrollNumber: enrollNumber,
                attendanceTime: attendanceDateTime,
                deviceNumber: parseInt(deviceNumber, 10),
                inOutMode: parseInt(inOutMode, 10),
                verifyMode: parseInt(verifyMode, 10),
                workCode: parseInt(workCode, 10),
            };
        });
    };

    // Função para controlar a mudança de arquivo dos utilizadores
    const handleUserFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const buffer = e.target?.result as ArrayBuffer;
                const data = parseUserData(buffer);
                for (const item of data) {
                    await handleImportEmployeeCard(item);
                }
            };
            setLoadingImportUsers(false);
            reader.readAsArrayBuffer(file);
        }
    };

    // Função para formatar os dados de utilizadores para a API
    const parseUserData = (buffer: ArrayBuffer): Partial<EmployeeCard>[] => {
        const dataView = new DataView(buffer);
        const users: Partial<EmployeeCard>[] = [];
        let offset = 0;
        const USER_STRUCT_SIZE = calcUserStructSize();
        while (offset + USER_STRUCT_SIZE <= buffer.byteLength) {
            offset += 2;
            const devicePrivelage = dataView.getUint8(offset); offset += 1;
            const devicePassword = decodeString(dataView, offset, 8); offset += 8;
            const employeeName = decodeString(dataView, offset, 24); offset += 24;
            const cardNumber = dataView.getUint32(offset, true); offset += 4;
            offset += 1 + 8;
            const enrollNumber = decodeString(dataView, offset, 24); offset += 24;

            users.push({ devicePrivelage, devicePassword, employeeName, cardNumber: cardNumber.toString(), enrollNumber, deviceEnabled: true });
        }

        return users;
    };

    // Função para calcular o tamanho da estrutura do utilizador
    const calcUserStructSize = (): number => {
        return 2 + 1 + 8 + 24 + 4 + 1 + 8 + 24;
    };

    // Função para decodificar a string
    const decodeString = (dataView: DataView, offset: number, length: number): string => {
        const bytes = new Uint8Array(dataView.buffer, offset, length);
        return new TextDecoder('utf-8').decode(bytes).replace(/\0/g, '');
    };

    // Função para controlar a mudança de arquivo da biometria
    const handleFPFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const buffer = e.target?.result as ArrayBuffer;
                const data = parseFPData(buffer);
                await handleImportEmployeeFP(data);
            };
            setLoadingImportUsers(false);
            reader.readAsArrayBuffer(file);
        }
    };

    // Função para formatar os dados de biometria para a API
    const parseFPData = (buffer: ArrayBuffer): FingerprintTemplate[] => {
        const dataView = new DataView(buffer);
        const templates: FingerprintTemplate[] = [];
        let offset = 0;

        while (offset < buffer.byteLength) {
            const FPTmpLength = dataView.getUint16(offset, true); offset += 2;
            const enrollNumberNumeric = dataView.getUint16(offset, true); offset += 2;
            const enrollNumber = enrollNumberNumeric.toString();
            const FPTmpIndex = dataView.getUint8(offset); offset += 1;
            const FPTmpFlag = dataView.getUint8(offset); offset += 1;

            const TemplateSize = FPTmpLength - (2 + 2 + 1 + 1);
            const FPTmpData = new Uint8Array(buffer, offset, TemplateSize);
            offset += TemplateSize;

            const templateBase64 = btoa(String.fromCharCode(...FPTmpData));

            templates.push({ FPTmpLength, enrollNumber, FPTmpIndex, FPTmpFlag, FPTmpData: templateBase64 });
        }

        return templates;
    };

    // Função para controlar a mudança de arquivo da face
    const handleFaceFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const content = e.target?.result as string;
                const parsedData = parseFaceData(content);
                await handleImportEmployeeFace(parsedData);
            };
            reader.readAsText(file);
        }
    };

    // Função para formatar os dados de face para a API
    const parseFaceData = (dataString: string): FaceTemplate[] => {
        const lines = dataString.split('\n');
        const results: FaceTemplate[] = [];

        lines.forEach(line => {
            if (line.includes('Pin=')) {
                const enrollNumber = line.match(/Pin=(\d+)/)?.[1];
                const FaceTmpIndexMatch = line.match(/Index=(\d+)/);
                const FaceTmpDataMatch = line.match(/Tmp=([a-zA-Z0-9+/=]+)/);

                if (enrollNumber && FaceTmpIndexMatch && FaceTmpDataMatch) {
                    const FaceTmpIndex = parseInt(FaceTmpIndexMatch[1], 10);
                    const FaceTmpData = FaceTmpDataMatch[1];
                    const FaceTmpLength = FaceTmpData.length;

                    results.push({ enrollNumber, FaceTmpIndex, FaceTmpData, FaceTmpLength });
                }
            }
        });

        return results;
    };

    /* // Funções para acionar o popup de seleção de arquivo dos movimentos, utilizadores e biometria
    const triggerFileAttendanceSelectPopup = () => {
        fileInputAttendanceRef.current?.click();
        setLoadingImportAttendance(true);
        setTimeout(() => {
            if (!fileInputAttendanceRef.current?.value) {
                setLoadingImportAttendance(false);
            }
        }, 5000);
    };
    const triggerFileAttendanceLogSelectPopup = () => {
        fileInputAttendanceRef.current?.click();
        setLoadingImportAttendanceLog(true);
        setTimeout(() => {
            if (!fileInputAttendanceRef.current?.value) {
                setLoadingImportAttendanceLog(false);
            }
        }, 5000);
    };
    const triggerFileUserSelectPopup = () => {
        fileInputUserRef.current?.click();
        setLoadingImportUsers(true);
        setTimeout(() => {
            if (!fileInputUserRef.current?.value) {
                setLoadingImportUsers(false);
            }
        }, 5000);
    };
    const triggerFileFPSelectPopup = () => {
        fileInputFPRef.current?.click();
        setLoadingImportBio(true);
        setTimeout(() => {
            if (!fileInputFPRef.current?.value) {
                setLoadingImportBio(false);
            }
        }, 5000);
    };
    const triggerFileFaceSelectPopup = () => {
        fileInputFaceRef.current?.click();
        setLoadingImportFace(true);
        setTimeout(() => {
            if (!fileInputFaceRef.current?.value) {
                setLoadingImportFace(false);
            }
        }, 5000);
    }; */

    // Função para enviar os utilizadores selecionados
    const handleSendSelectedUsers = async () => {
        if (!selectedTerminal || selectedUserRows.length === 0) {
            toast('Selecione um terminal e pelo menos um utilizador!');
        } else {
            setLoadingSendSelectedUsers(true);
            const userIds = selectedUserRows.map(user => user.employeeID);
            await sendAllEmployeesToDevice(selectedTerminal.zktecoDeviceID, userIds);
            setLoadingSendSelectedUsers(false);
            setSelectedTerminal(null);
            setClearSelectionToggle(!clearSelectionToggle);
        }
    }

    // Função para excluir os utilizadores selecionados
    const handleDeleteSelectedUsers = async () => {
        if (!selectedTerminal || selectedUserRows.length === 0) {
            toast('Selecione um terminal e pelo menos um utilizador!');
        } else {
            setLoadingDeleteSelectedUsers(true);
            const userIds = selectedUserRows.map(user => user.employeeID);
            await deleteAllUsersOnDevice(selectedTerminal.zktecoDeviceID, userIds);
            setLoadingDeleteSelectedUsers(false);
            setSelectedTerminal(null);
            setClearSelectionToggle(!clearSelectionToggle);
        }
    }

    // Função para recolher os utilizadores selecionados
    const handleFetchSelectedUsers = async () => {
        if (!selectedTerminal || selectedUserRows.length === 0) {
            toast('Selecione um terminal e pelo menos um utilizador!');
        } else {
            setLoadingFetchSelectedUsers(true);
            const userIds = selectedUserRows.map(user => user.employeeID);
            await saveAllEmployeesOnDeviceToDB(selectedTerminal.zktecoDeviceID, userIds);
            setLoadingFetchSelectedUsers(false);
            setSelectedTerminal(null);
            setClearSelectionToggle(!clearSelectionToggle);
        }
    }

    // Função para enviar todos os utilizadores
    const handleUsers = async () => {
        if (selectedTerminal) {
            setLoadingUser(true);
            await saveAllEmployeesOnDeviceToDB(selectedTerminal.zktecoDeviceID);
            setLoadingUser(false);
            setClearSelectionToggle(!clearSelectionToggle);
        } else {
            toast.warn('Selecione um terminal primeiro!');
        }
    }

    // Função para enviar todos os utilizadores
    const handleAllUsers = async () => {
        if (selectedTerminal) {
            setLoadingAllUser(true);
            await sendAllEmployeesToDevice(selectedTerminal.zktecoDeviceID, null);
            setLoadingAllUser(false);
            setClearSelectionToggle(!clearSelectionToggle);
        } else {
            toast.warn('Selecione um terminal primeiro!');
        }
    }

    /* // Função para sincronizar todos os utilizadores
    const handleSyncAllUsers = async () => {
        if (selectedTerminal) {
            setLoadingSyncAllUser(true);
            await sendAllEmployeesToDevice(selectedTerminal.zktecoDeviceID, null);
            setLoadingSyncAllUser(false);
            setClearSelectionToggle(!clearSelectionToggle);
        } else {
            toast.warn('Selecione um terminal primeiro!');
        }
    } */

    // Função para manipular os movimentos
    const handleMovements = async () => {
        if (selectedTerminal) {
            setLoadingMovements(true);
            await fetchAllKioskTransactionOnDevice(selectedTerminal.zktecoDeviceID);
            setLoadingMovements(false);
            setClearSelectionToggle(!clearSelectionToggle);
        } else {
            toast.warn('Selecione um terminal primeiro!');
        }
    }

    // Função para excluir todos os utilizadores
    const handleDeleteAllUsers = async () => {
        if (selectedTerminal) {
            setLoadingDeleteAllUsers(true);
            await deleteAllUsersOnDevice(selectedTerminal.zktecoDeviceID, null);
            setLoadingDeleteAllUsers(false);
            setClearSelectionToggle(!clearSelectionToggle);
        } else {
            toast.warn('Selecione um terminal primeiro!');
        }
    }

    // Função para reiniciar o dispositivo
    const handleRestartDevice = async () => {
        if (selectedTerminal) {
            setLoadingRestartDevice(true);
            await restartDevice(selectedTerminal.zktecoDeviceID);
            setLoadingRestartDevice(false);
            setClearSelectionToggle(!clearSelectionToggle);
        } else {
            toast.warn('Selecione um terminal primeiro!');
        }
    }

    // Função para enviar o horário ao dispositivo
    const handleSendClock = async () => {
        if (selectedTerminal) {
            setLoadingSendClock(true);
            const timePeriods = await apiService.fetchAllTimePeriods();
            for (const period of timePeriods) {
                await sendClockToDevice(selectedTerminal.serialNumber, period.id);
            }
            setLoadingSendClock(false);
            setClearSelectionToggle(!clearSelectionToggle);
        } else {
            toast.warn('Selecione um terminal primeiro!');
        }
    }

    // Função para abrir a porta ligada ao dispositivo
    const handleOpenDoor = async (sn: string, doorData: DoorDevice) => {
        await openDeviceDoor(sn, doorData);
        setLoadingOpenDoor(false);
        setClearSelectionToggle(!clearSelectionToggle);
    }

    // Função para sincronizar a hora
    const handleSyncTime = async () => {
        if (selectedTerminal) {
            setLoadingSyncTime(true);
            await syncTimeManuallyToDevice(selectedTerminal.zktecoDeviceID);
            setLoadingSyncTime(false);
            setClearSelectionToggle(!clearSelectionToggle);
        } else {
            toast.warn('Selecione um terminal primeiro!');
        }
    }

    // Define as colunas dos movimentos temporariamente
    const movementColumns: TableColumn<Movement>[] = [
        {
            name: "ID do Usuário",
            selector: row => row.UserID,
            sortable: true,
        },
        {
            name: "Estado",
            selector: (row: Movement) => row.State,
            sortable: true,
            format: (row: Movement) => row.IsInvalid ? "Inválido" : "Válido"
        },
        {
            name: "Hora",
            selector: row => row.Time,
            sortable: true,
        },
        {
            name: "Método de Verificação",
            selector: (row: Movement) => row.VerifyStyle,
            sortable: true,
            format: (row: Movement) => `${row.VerifyStyle}`
        }
    ];

    // Função para abrir o modal para escolher porta
    const openDoorModal = () => {
        if (selectedTerminal) {
            setShowDoorModal(true);
            setLoadingOpenDoor(true);
        } else {
            toast.warn('Selecione um terminal primeiro!');
        }
    }

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return deviceFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <TerminalsProvider>
            <div className="main-container" style={{ overflow: 'auto' }}>
                <NavBar style={{ backgroundColor: navbarColor }} />
                <div className='filter-refresh-add-edit-upper-class'>
                    <div className="datatable-title-text" style={{ color: '#000000' }}>
                        <span>Equipamentos</span>
                    </div>
                    <div className="datatable-header">
                        <div className="buttons-container-others" style={{ flexGrow: 1 }}>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
                            >
                                <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshAll} />
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
                            <ExportButton allData={filteredDeviceDataTable} selectedData={selectedDeviceRows.length > 0 ? selectedDeviceRows : filteredDeviceDataTable} fields={getSelectedFields()} />
                            <PrintButton data={selectedDeviceRows.length > 0 ? selectedDeviceRows : filteredDeviceDataTable} fields={getSelectedFields()} />
                        </div>
                    </div>
                </div>
                <div className="content-section deviceTabsMobile" style={{ display: 'flex', flex: 1 }}>
                    <div style={{ flex: 1.5, overflow: "auto" }} className="deviceMobile">
                        {loadingTerminals ?
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                                <Spinner style={{ width: 50, height: 50 }} animation="border" />
                            </div> :
                            <DataTable
                                columns={[...deviceColumns, devicesActionColumn]}
                                data={filteredDeviceDataTable}
                                onRowDoubleClicked={handleEditDevices}
                                pagination
                                paginationPerPage={20}
                                paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                                paginationComponentOptions={paginationOptions}
                                selectableRows
                                clearSelectedRows={clearSelectionToggle}
                                onSelectedRowsChange={handleDeviceRowSelected}
                                selectableRowsHighlight
                                noDataComponent="Não há dados disponíveis para exibir."
                                customStyles={customStyles}
                                striped
                                defaultSortAsc={true}
                                defaultSortFieldId="deviceNumber"
                            />
                        }
                    </div>
                    <div style={{ flex: 2, overflow: "auto" }}>
                        <Tabs
                            id="controlled-tab-terminals"
                            activeKey={mainTabKey}
                            onSelect={handleMainSelect}
                            className="nav-modal"
                            style={{ marginBottom: 10, marginTop: 0 }}
                        >
                            <Tab eventKey="tasks" title="Actividade">
                                <div>
                                    <p className="activityTabContent">Tarefas do Terminal</p>
                                    {
                                        selectedTerminal && selectedDeviceRows.length > 0 ? (
                                            loadingActivityData ?
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                                                    <Spinner style={{ width: 50, height: 50 }} animation="border" />
                                                </div> :
                                                <DataTable
                                                    columns={transactionColumns}
                                                    data={transactions}
                                                    pagination
                                                    paginationPerPage={5}
                                                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                                                    paginationComponentOptions={paginationOptions}
                                                    selectableRows
                                                    noDataComponent="Não há actividades disponíveis para exibir."
                                                    customStyles={customStyles}
                                                    striped
                                                />
                                        ) : (
                                            <p style={{ textAlign: "center" }}>Selecione um terminal para ver as actividades.</p>
                                        )
                                    }
                                </div>
                                <div>
                                    <p className="activityTabContent">Movimentos do Terminal</p>
                                    {
                                        selectedTerminal && selectedDeviceRows.length > 0 ? (
                                            <DataTable
                                                columns={movementColumns}
                                                data={movements}
                                                pagination
                                                paginationPerPage={5}
                                                paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                                                paginationComponentOptions={paginationOptions}
                                                noDataComponent="Não há movimentos disponíveis para exibir."
                                                customStyles={customStyles}
                                                striped
                                            />
                                        ) : (
                                            <p style={{ textAlign: "center" }}>Selecione um terminal para ver os movimentos.</p>
                                        )
                                    }
                                </div>
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
                                                    data={filteredUsersInSoftware}
                                                    pagination
                                                    paginationPerPage={20}
                                                    paginationComponentOptions={paginationOptions}
                                                    selectableRows
                                                    clearSelectedRows={clearSelectionToggle}
                                                    onSelectedRowsChange={handleUserRowSelected}
                                                    selectableRowsHighlight
                                                    noDataComponent="Não há dados disponíveis para exibir."
                                                    customStyles={customStyles}
                                                    striped
                                                    defaultSortAsc={true}
                                                    defaultSortFieldId='enrollNumber'
                                                />
                                            </div>
                                            <div style={{ flex: 1, flexDirection: "column" }}>
                                                <Button variant="outline-primary" size="sm" className="button-terminals-users-track" onClick={handleSendSelectedUsers}>
                                                    {loadingSendSelectedUsers ? (
                                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                                    ) : (
                                                        <i className="bi bi-person-fill-up" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                                    )}
                                                    Enviar utilizadores seleccionados
                                                </Button>
                                                <Button variant="outline-primary" size="sm" className="button-terminals-users-track" onClick={handleDeleteSelectedUsers}>
                                                    {loadingDeleteSelectedUsers ? (
                                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                                    ) : (
                                                        <i className="bi bi-person-x-fill" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                                    )}
                                                    Remover utilizadores seleccionados
                                                </Button>
                                                <Button variant="outline-primary" size="sm" className="button-terminals-users-track" onClick={handleFetchSelectedUsers}>
                                                    {loadingFetchSelectedUsers ? (
                                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                                    ) : (
                                                        <i className="bi bi-person-fill-down" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                                    )}
                                                    Recolher utilizadores seleccionados
                                                </Button>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="users-terminal" title="Utilizadores no terminal">
                                        {loadingUsersInTerminalData ?
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                                                <Spinner style={{ width: 50, height: 50 }} animation="border" />
                                            </div> :
                                            <DataTable
                                                columns={employeeOnDeviceColumns}
                                                data={filteredUsersInTerminal}
                                                pagination
                                                paginationPerPage={20}
                                                paginationComponentOptions={paginationOptions}
                                                selectableRows
                                                clearSelectedRows={clearSelectionToggle}
                                                onSelectedRowsChange={handleUserRowSelected}
                                                selectableRowsHighlight
                                                noDataComponent={selectedTerminal ? "Não há dados disponíveis para exibir." : "Selecione um terminal para exibir os utilizadores."}
                                                customStyles={customStyles}
                                                striped
                                                defaultSortAsc={true}
                                                defaultSortFieldId='pin'
                                            />
                                        }
                                    </Tab>
                                    <Tab eventKey="facial-taken" title="Biometria recolhida">
                                        <DataTable
                                            columns={bioColumns}
                                            data={filteredBioDataTable}
                                            pagination
                                            paginationPerPage={20}
                                            paginationComponentOptions={paginationOptions}
                                            selectableRows
                                            clearSelectedRows={clearSelectionToggle}
                                            onSelectedRowsChange={handleUserRowSelected}
                                            selectableRowsHighlight
                                            noDataComponent="Não há dados disponíveis para exibir."
                                            customStyles={customStyles}
                                            striped
                                            defaultSortAsc={true}
                                            defaultSortFieldId='enrollNumber'
                                        />
                                    </Tab>
                                    <Tab eventKey="cards-taken" title="Cartões recolhidos">
                                        <DataTable
                                            columns={cardColumns}
                                            data={filteredCardDataTable}
                                            pagination
                                            paginationPerPage={20}
                                            paginationComponentOptions={paginationOptions}
                                            selectableRows
                                            clearSelectedRows={clearSelectionToggle}
                                            onSelectedRowsChange={handleUserRowSelected}
                                            selectableRowsHighlight
                                            noDataComponent="Não há dados disponíveis para exibir."
                                            customStyles={customStyles}
                                            striped
                                            defaultSortAsc={true}
                                            defaultSortFieldId='enrollNumber'
                                        />
                                    </Tab>
                                </Tabs>
                            </Tab>
                            <Tab eventKey="state" title="Estado">
                                <DataTable
                                    columns={stateColumns}
                                    data={filteredStateDataTable}
                                    pagination
                                    paginationPerPage={20}
                                    paginationComponentOptions={paginationOptions}
                                    selectableRows
                                    onSelectedRowsChange={handleDeviceRowSelected}
                                    selectableRowsHighlight
                                    noDataComponent="Não há dados disponíveis para exibir."
                                    customStyles={customStyles}
                                    striped
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
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="button-terminals-users"
                                    onClick={handleUsers}>
                                    {loadingUser ? (
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <i className="bi bi-arrow-down-circle" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    )}
                                    Recolher utilizadores
                                </Button>
                                <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={handleAllUsers}>
                                    {loadingAllUser ? (
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <i className="bi bi-arrow-up-circle" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    )}
                                    Enviar todos os utilizadores
                                </Button>
                                {/* <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={handleSyncAllUsers}>
                                    {loadingSyncAllUser ? (
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <i className="bi bi-arrow-repeat" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    )}
                                    Sincronizar utilizadores
                                </Button> */}
                                <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={handleMovements}>
                                    {loadingMovements ? (
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <i className="bi bi-arrow-left-right" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    )}
                                    Recolher movimentos
                                </Button>
                                <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={handleDeleteAllUsers}>
                                    {loadingDeleteAllUsers ? (
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <i className="bi bi-trash" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    )}
                                    Apagar utilizadores
                                </Button>
                                <div className="col-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Utilizadores"
                                        checked={showAllUsers}
                                        onChange={handleAllUsersChange}
                                        className="mb-2"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Biometria digital"
                                        checked={showFingerprintUsers}
                                        onChange={handleFingerprintUsersChange}
                                        className="mb-2"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Biometria facial"
                                        checked={showFacialRecognitionUsers}
                                        onChange={handleFacialRecognitionUsersChange}
                                        className="mb-2"
                                    />
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="onOff" title="Ligação">
                            <div style={{ display: "flex", marginTop: 10, marginBottom: 10, padding: 10 }}>
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
                        <Tab eventKey="access" title="Acessos">
                            <div style={{ display: "flex", marginTop: 10, marginBottom: 10, padding: 10 }}>
                                <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={handleSendClock}>
                                    {loadingSendClock ? (
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <i className="bi bi-clock-history" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    )}
                                    Enviar horários
                                </Button>
                                <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={openDoorModal}>
                                    {loadingOpenDoor ? (
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <i className="bi bi-door-open" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    )}
                                    Abrir porta
                                </Button>
                                {/* <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                    <i className="bi bi-pc" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    Actualizar multiverificação
                                </Button> */}
                            </div>
                        </Tab>
                        <Tab eventKey="configuration" title="Configurações">
                            <div style={{ display: "flex", marginTop: 10, marginBottom: 10, padding: 10 }}>
                                <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={handleSyncTime}>
                                    {loadingSyncTime ? (
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <i className="bi bi-calendar-check" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    )}
                                    Acertar a hora
                                </Button>
                                {/* <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                    <i className="bi bi-gear-wide" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    Enviar configurações
                                </Button> */}
                                {/* <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                    <i className="bi bi-send-arrow-up" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    Enviar códigos de tarefas
                                </Button> */}
                                {/* <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                    <i className="bi bi-bell" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    Sincronizar toques da sirene
                                </Button> */}
                            </div>
                        </Tab>
                        {/* <Tab eventKey="files" title="Ficheiros">
                            <div style={{ display: "flex", marginTop: 10, marginBottom: 10, padding: 10 }}>
                                <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={triggerFileAttendanceSelectPopup}>
                                    {loadingImportAttendance ? (
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <i className="bi bi-arrow-bar-down" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    )}
                                    Importar movimentos
                                </Button>
                                <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={triggerFileUserSelectPopup}>
                                    {loadingImportUsers ? (
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <i className="bi bi-person-fill-down" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    )}
                                    Importar utilizadores
                                </Button>
                                <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={triggerFileFPSelectPopup}>
                                    {loadingImportBio ? (
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <i className="bi bi-fingerprint" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    )}
                                    Importar biometria digital
                                </Button>
                                <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={triggerFileFaceSelectPopup}>
                                    {loadingImportFace ? (
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <i className="bi bi-person-square" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    )}
                                    Importar biometria Facial
                                </Button>
                                <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={triggerFileAttendanceLogSelectPopup}>
                                    {loadingImportAttendanceLog ? (
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <i className="bi bi-file-arrow-down" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    )}
                                    Importar movimentos do log
                                </Button>
                            </div>
                        </Tab> */}
                    </Tabs>
                </div>
                <Footer style={{ backgroundColor: footerColor }} />
                {
                    showColumnSelector && (
                        <ColumnSelectorModal
                            columns={deviceFields}
                            selectedColumns={selectedColumns}
                            onClose={() => setShowColumnSelector(false)}
                            onColumnToggle={handleColumnToggle}
                            onResetColumns={handleResetColumns}
                            onSelectAllColumns={handleSelectAllColumns}
                        />
                    )
                }
                <CreateModalDevices
                    title="Adicionar Equipamentos"
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={addDevice}
                    fields={deviceFields}
                    initialValues={initialData || {}}
                />
                {
                    selectedTerminal && (
                        <UpdateModalDevices
                            open={showUpdateModal}
                            onClose={() => setShowUpdateModal(false)}
                            onDuplicate={handleDuplicate}
                            onUpdate={updateDevice}
                            entity={selectedTerminal}
                            fields={deviceFields}
                            title="Atualizar Equipamentos"
                            onPrev={handlePrevDevice}
                            onNext={handleNextDevice}
                            canMovePrev={currentDeviceIndex > 0}
                            canMoveNext={currentDeviceIndex < devices.length - 1}
                        />
                    )
                }
                {
                    showDeleteModal && (
                        <DeleteModal
                            open={showDeleteModal}
                            onClose={() => setShowDeleteModal(false)}
                            onDelete={deleteDevice}
                            entityId={selectedDeviceToDelete}
                            message={
                                <>
                                    Apagar todos os terminais selecionados?
                                </>
                            }
                        />
                    )
                }
                {selectedTerminal && (
                    <DoorModal
                        title="Escolha a Porta para Abrir"
                        open={showDoorModal}
                        onClose={() => {
                            setShowDoorModal(false);
                            setLoadingOpenDoor(false);
                            setSelectedTerminal(null);
                            setSelectedDeviceRows([]);
                        }}
                        onSave={(data) => handleOpenDoor(data.serialNumber, data)}
                        entity={selectedTerminal}
                        fields={doorFields}
                    />
                )}
                <input
                    type="file"
                    accept=".dat,.txt"
                    ref={fileInputAttendanceRef}
                    style={{ display: 'none' }}
                    onChange={handleAttendanceFileChange}
                />
                <input
                    type="file"
                    accept=".dat,.txt"
                    ref={fileInputUserRef}
                    style={{ display: 'none' }}
                    onChange={handleUserFileChange}
                />
                <input
                    type="file"
                    accept=".fp10"
                    ref={fileInputFPRef}
                    style={{ display: 'none' }}
                    onChange={handleFPFileChange}
                />
                <input
                    type="file"
                    accept=".dat"
                    ref={fileInputFaceRef}
                    style={{ display: 'none' }}
                    onChange={handleFaceFileChange}
                />
            </div >
        </TerminalsProvider >
    );
};