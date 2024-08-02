import { useContext, useEffect, useMemo, useState } from "react";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../../components/CustomStylesDataTable";
import "../../css/Terminals.css";
import { Button, Form, Tab, Tabs } from "react-bootstrap";
import { SelectFilter } from "../../components/SelectFilter";
import { Devices, Employee, EmployeeAndCard, EmployeeCard } from "../../helpers/Types";
import { deviceFields, employeeCardFields, employeeFields } from "../../helpers/Fields";
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
import { DeviceContextType, TerminalsContext, TerminalsProvider } from "../../context/TerminalsContext";
import React from "react";
import { AttendanceContext, AttendanceContextType } from "../../context/MovementContext";
import { PersonsContext, PersonsContextType } from "../../context/PersonsContext";

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a interface para as transações
interface Transaction {
    UserID: string;
    IsInvalid: string;
    State: string;
    VerifyStyle: string;
    Time: string;
}

// Define a interface para as tarefas
interface Tasks {
    Status: string;
    Date: Date;
    Type: string;
    Device: string;
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

// Define a interface para os dados de utilizadores e cartões
interface MergedEmployeeAndCard extends Employee, Partial<Omit<EmployeeCard, 'id'>> {}

// Junta os campos de utilizadores e cartões
const combinedEmployeeFields = [...employeeFields, ...employeeCardFields];

// Define o componente de terminais
export const Terminals = () => {
    const {
        devices,
        deviceStatus,
        deviceStatusCount,
        fetchAllDevices,
        fetchAllEmployeesOnDevice,
        fetchAllEmployeeDevices,
        sendAllEmployeesToDevice,
        saveAllEmployeesOnDeviceToDB,
        saveAllAttendancesEmployeesOnDevice,
        syncTimeManuallyToDevice,
        deleteAllUsersOnDevice,
        openDeviceDoor,
        restartDevice,
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
    const [employees, setEmployees] = useState<EmployeeAndCard[]>([]);
    const [employeesBio, setEmployeesBio] = useState<EmployeeAndCard[]>([]);
    const [employeeCards, setEmployeeCards] = useState<EmployeeAndCard[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [initialData, setInitialData] = useState<Devices | null>(null);
    const [mainTabKey, setMainTabKey] = useState('tasks');
    const [userTrackTabKey, setUserTrackTabKey] = useState('users-software');
    const [userTabKey, setUserTabKey] = useState('users');
    const [filters, setFilters] = useState<Filters>({});
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['deviceNumber', 'deviceName', 'ipAddress']);
    const [selectedUserColums, setSelectedUserColumns] = useState<string[]>(['enrollNumber', 'name', 'cardNumber', 'statusFprint', 'statusFace']);
    const [selectedBioColums, setSelectedBioColumns] = useState<string[]>(['enrollNumber', 'name', 'statusFprint', 'statusFace']);
    const [selectedCardColums, setSelectedCardColumns] = useState<string[]>(['enrollNumber', 'name', 'cardNumber']);
    const [selectedDeviceToDelete, setSelectedDeviceToDelete] = useState<string>('');
    const [selectedUserToDelete, setSelectedUserToDelete] = useState<string>('');
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
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [task, setTask] = useState<Tasks[]>([]);
    const fileInputAttendanceRef = React.createRef<HTMLInputElement>();
    const fileInputUserRef = React.createRef<HTMLInputElement>();
    const fileInputFPRef = React.createRef<HTMLInputElement>();
    const fileInputFaceRef = React.createRef<HTMLInputElement>();

    // Função para mesclar os dados de utilizadores e cartões
    const mergeEmployeeAndCardData = (
        employees: Employee[],
        employeeCards: EmployeeCard[]
    ): MergedEmployeeAndCard[] => {
        const mergedEmployeesData = employees.map(employee => {
            const card = employeeCards.filter(card => card.employeeId === employee.employeeID)[0];
            if (card) {
                return {
                    ...employee,
                    ...card,
                } as MergedEmployeeAndCard;
            }
            return employee as MergedEmployeeAndCard;
        })
        return mergedEmployeesData;
    };

    // Função para buscar todos os utilizadores e cartões
    const fetchEmployeesAndCards = async () => {
        const employeesData: Employee[] = await fetchAllEmployees();
    
        const cardData: EmployeeCard[] = await fetchAllCardData();
    
        const mergedData = mergeEmployeeAndCardData(employeesData, cardData);
    
        const filteredEmployeesBio = mergedData.filter(employee =>
            employee.statusFprint === true || employee.statusFace === true
        );

        const filteredEmployeesCard = mergedData.filter(employee =>
            employee.cardNumber !== "0"
        );
    
        setEmployees(mergedData);
        setEmployeesBio(filteredEmployeesBio);
        setEmployeeCards(filteredEmployeesCard);
    };

    // Função para adicionar um dispositivo
    const addDevice = async (device: Devices) => {
        await handleAddDevice(device);
        setShowAddModal(false);
        refreshAll();
    }

    // Função para atualizar um dispositivo
    const updateDevice = async (device: Devices) => {
        await handleUpdateDevice(device);
        setShowUpdateModal(false);
        refreshAll();
    }

    // Função para excluir um dispositivo
    const deleteDevice = async () => {
        if (selectedDeviceToDelete) {
            await handleDeleteDevice(selectedDeviceToDelete);
            setShowDeleteModal(false);
            refreshAll();
        }
    }

    // Atualiza os dados de renderização
    useEffect(() => {
        fetchAllDevices();
        fetchEmployeesAndCards();
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
    }

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
        selectedRows: EmployeeAndCard[];
    }) => {
        setSelectedUserRows(state.selectedRows);
    };

    // Filtra os utilizadores no terminal
    const filteredUsersInTerminal = useMemo(() => {
        if (!selectedTerminal) {
            return [];
        }
        return employees.filter(employee => employee.deviceNumber === selectedTerminal.deviceNumber);
    }, [employees, selectedTerminal]);

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

    // Define as colunas de estado de dispositivos
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

    // Formata as colunas especiais na tabela de utilizadores, biometria e cartões
    const formatUserStatus = (row: EmployeeAndCard) => {
        return (
            <>
                {row.cardNumber && row.cardNumber !== "0" && <img src={card} alt="Card" style={{ width: 20, marginRight: 5 }} />}
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
        return (
            <>
                {row.cardNumber && <img src={card} alt="Card" style={{ width: 20, marginRight: 5 }} />}
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
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={employees} />
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
                selector: row => formatUserStatus(row),
                sortable: true,
            }
        ]);

    // Filtra os dados da tabela de utilizadores
    const filteredUserDataTable = useMemo(() => {
        let filteredData: EmployeeAndCard[] = [];

        if (showAllUsers) {
            return employees;
        }

        if (showFingerprintUsers) {
            filteredData = [...filteredData, ...employees.filter(user => user.statusFprint)];
        }
        if (showFacialRecognitionUsers) {
            filteredData = [...filteredData, ...employees.filter(user => user.statusFace)];
        }
        return filteredData;
    }, [employees, showAllUsers, showFingerprintUsers, showFacialRecognitionUsers]);

    // Define as colunas excluídas de utilizadores    
    const excludedBioColumns = ['statusFprint', 'statusFace', 'statusPalm'];

    // Define as colunas de utilizadores
    const bioColumns: TableColumn<EmployeeAndCard>[] = combinedEmployeeFields
        .filter(field => selectedBioColums.includes(field.key))
        .filter(field => !excludedBioColumns.includes(field.key))
        .map(field => {
            return {
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={employees} />
                    </>
                ),
                selector: (row: EmployeeAndCard) => row[field.key] || '',
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

    // Define os dados da tabela de biometria
    const filteredBioDataTable = employeesBio.filter(employee =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(employee[key]) === String(filters[key])
        )
    );

    // Define as colunas excluídas de utilizadores    
    const excludedCardColumns = ['statusFprint', 'statusFace', 'statusPalm'];

    // Define as colunas de utilizadores
    const cardColumns: TableColumn<EmployeeAndCard>[] = combinedEmployeeFields
        .filter(field => selectedCardColums.includes(field.key))
        .filter(field => !excludedCardColumns.includes(field.key))
        .map(field => {
            const formatField = (row: EmployeeAndCard) => {
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
                        <SelectFilter column={field.key} setFilters={setFilters} data={employees} />
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
                selector: row => formatCardStatus(row),
                sortable: true,
            }
        ]);

    // Filtra os dados da tabela de cartões
    const filteredCardDataTable = employeeCards.filter(employee =>
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
    const handleOpenDeleteModal = async (id: string, type: 'device' | 'user') => {
        if (type === 'device') {
            setSelectedDeviceToDelete(id);
            setShowDeleteModal(true);
        } else {
            if (selectedTerminal) {
                setLoadingDeleteSelectedUsers(true);
                setSelectedUserToDelete(id);
                await deleteAllUsersOnDevice(selectedTerminal?.zktecoDeviceID, id);
                setLoadingDeleteSelectedUsers(false);
                fetchAllEmployeeDevices();
            } else {
                toast.error('Selecione um terminal primeiro!');
            }
        }
    };

    // Função que manipula a duplicação
    const handleDuplicate = (devices: Devices) => {
        setInitialData(devices);
        handleCloseUpdateModal();
        setShowAddModal(true);
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

    // Define a função de adição de tarefas
    const addTask = (type: string, status: string, device: string) => {
        const newTask = {
            Status: status,
            Date: new Date(),
            Type: type,
            Device: selectedTerminal?.deviceName || 'Nenhum dispositivo selecionado'
        };
        setTask(prevTasks => [...prevTasks, newTask]);
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
                await handleImportEmployeeCard(data);
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
                console.log(data);
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
                console.log(parsedData);
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

    // Funções para acionar o popup de seleção de arquivo dos movimentos, utilizadores e biometria
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
    };

    // Define as colunas das transações
    const transactionColumns: TableColumn<Transaction>[] = [
        {
            name: "ID do Usuário",
            selector: row => row.UserID,
            sortable: true,
        },
        {
            name: "Estado",
            selector: (row: Transaction) => row.State,
            sortable: true,
            format: (row: Transaction) => row.IsInvalid ? "Inválido" : "Válido"
        },
        {
            name: "Hora",
            selector: row => row.Time,
            sortable: true,
        },
        {
            name: "Método de Verificação",
            selector: (row: Transaction) => row.VerifyStyle,
            sortable: true,
            format: (row: Transaction) => `${row.VerifyStyle}`
        }
    ];

    // Define as colunas das tarefas
    const taskColumns: TableColumn<Tasks>[] = [
        {
            name: "Status",
            selector: (row: Tasks) => row.Status,
            sortable: true,
        },
        {
            name: "Dispositivo",
            selector: (row: Tasks) => row.Device,
            sortable: true,
        },
        {
            name: "Data",
            selector: (row: Tasks) => formatDateAndTime(row.Date),
            sortable: true,
        },
        {
            name: "Tipo",
            selector: (row: Tasks) => row.Type,
            sortable: true,
        }
    ];

    // Função para enviar os utilizadores selecionados
    const handleSendSelectedUsers = async () => {
        if (!selectedTerminal || selectedUserRows.length === 0) {
            toast('Selecione um terminal e pelo menos um utilizador!');
        } else {
            setLoadingSendSelectedUsers(true);
            const userId = selectedUserRows[0].employeeID;
            await sendAllEmployeesToDevice(selectedTerminal.zktecoDeviceID, userId);
            setLoadingSendSelectedUsers(false);
            fetchAllEmployeeDevices();
        }
    }

    // Função para excluir os utilizadores selecionados
    const handleDeleteSelectedUsers = async () => {
        if (selectedUserRows.length > 0) {
            const userId = selectedUserRows[0].employeeID;
            handleOpenDeleteModal(userId, 'user');
        } else {
            toast.error('Selecione um utilizador primeiro!');
        }
    }

    // Função para recolher os utilizadores selecionados
    const handleFetchSelectedUsers = async () => {
        if (!selectedTerminal || selectedUserRows.length === 0) {
            toast('Selecione um terminal e pelo menos um utilizador!');
        } else {
            setLoadingFetchSelectedUsers(true);
            const userId = selectedUserRows[0].employeeID;
            await saveAllEmployeesOnDeviceToDB(selectedTerminal.zktecoDeviceID, userId);
            setLoadingFetchSelectedUsers(false);
            fetchAllEmployeeDevices();
        }
    }

    // Função para enviar todos os utilizadores
    const handleUsers = async () => {
        if (selectedTerminal) {
            setLoadingUser(true);
            await fetchAllEmployeesOnDevice(selectedTerminal.zktecoDeviceID);
            setLoadingUser(false);
        } else {
            toast.error('Selecione um terminal primeiro!');
        }
    }

    // Função para enviar todos os utilizadores
    const handleAllUsers = async () => {
        if (selectedTerminal) {
            setLoadingAllUser(true);
            await sendAllEmployeesToDevice(selectedTerminal.zktecoDeviceID, null);
            setLoadingAllUser(false);
        } else {
            toast.error('Selecione um terminal primeiro!');
        }
    }

    // Função para sincronizar todos os utilizadores
    const handleSyncAllUsers = async () => {
        if (selectedTerminal) {
            setLoadingSyncAllUser(true);
            await sendAllEmployeesToDevice(selectedTerminal.zktecoDeviceID, null);
            setLoadingSyncAllUser(false);
        } else {
            toast.error('Selecione um terminal primeiro!');
        }
    }

    // Função para manipular os movimentos
    const handleMovements = async () => {
        if (selectedTerminal) {
            setLoadingMovements(true);
            await saveAllAttendancesEmployeesOnDevice(selectedTerminal.zktecoDeviceID);
            setLoadingMovements(false);
        } else {
            toast.error('Selecione um terminal primeiro!');
        }
    }

    // Função para excluir todos os utilizadores
    const handleDeleteAllUsers = async () => {
        if (selectedTerminal) {
            setLoadingDeleteAllUsers(true);
            await deleteAllUsersOnDevice(selectedTerminal.zktecoDeviceID, null);
            setLoadingDeleteAllUsers(false);
        } else {
            toast.error('Selecione um terminal primeiro!');
        }
    }

    // Função para reiniciar o dispositivo
    const handleRestartDevice = async () => {
        if (selectedTerminal) {
            setLoadingRestartDevice(true);
            await restartDevice(selectedTerminal.zktecoDeviceID);
            setLoadingRestartDevice(false);
        } else {
            toast.error('Selecione um terminal primeiro!');
        }
    }

    // Função para abrir a porta ligada ao dispositivo
    const handleOpenDoor = async () => {
        if (selectedTerminal) {
            setLoadingOpenDoor(true);
            await openDeviceDoor(selectedTerminal);
            setLoadingOpenDoor(false);
        } else {
            toast.error('Selecione um terminal primeiro!');
        }
    }

    // Função para sincronizar a hora
    const handleSyncTime = async () => {
        if (selectedTerminal) {
            setLoadingSyncTime(true);
            await syncTimeManuallyToDevice(selectedTerminal);
            setLoadingSyncTime(false);
        } else {
            toast.error('Selecione um terminal primeiro!');
        }
    }

    return (
        <TerminalsProvider>
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
                                Status: {deviceStatusCount && `${deviceStatusCount['Activo'] || 0} Online, ${deviceStatusCount['Inactivo'] || 0} Offline`}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="content-section deviceTabsMobile" style={{ display: 'flex', flex: 1 }}>
                    <div style={{ flex: 1.5, overflow: "auto" }} className="deviceMobile">
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
                    <div style={{ flex: 2, overflow: "auto" }}>
                        <Tabs
                            id="controlled-tab-terminals"
                            activeKey={mainTabKey}
                            onSelect={handleMainSelect}
                            className="nav-modal"
                            style={{ marginBottom: 10 }}
                        >
                            <Tab eventKey="tasks" title="Actividade">
                                <div>
                                    <p className="activityTabContent">Actividades</p>
                                    <DataTable
                                        columns={taskColumns}
                                        data={task}
                                        pagination
                                        paginationPerPage={5}
                                        paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                                        paginationComponentOptions={paginationOptions}
                                        noDataComponent="Não há tarefas disponíveis para exibir."
                                        customStyles={customStyles}
                                    />
                                </div>
                                <div>
                                    <p className="activityTabContent">Movimentos</p>
                                    <DataTable
                                        columns={transactionColumns}
                                        data={transactions}
                                        pagination
                                        paginationPerPage={5}
                                        paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                                        paginationComponentOptions={paginationOptions}
                                        noDataComponent="Não há actividades disponíveis para exibir."
                                        customStyles={customStyles}
                                    />
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
                                                    data={filteredUserDataTable}
                                                    pagination
                                                    paginationPerPage={5}
                                                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                                                    paginationComponentOptions={paginationOptions}
                                                    selectableRows
                                                    onSelectedRowsChange={handleUserRowSelected}
                                                    selectableRowsHighlight
                                                    noDataComponent="Não há dados disponíveis para exibir."
                                                    customStyles={customStyles}
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
                                        <DataTable
                                            columns={userColumns}
                                            data={filteredUsersInTerminal}
                                            pagination
                                            paginationPerPage={5}
                                            paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
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
                                            columns={bioColumns}
                                            data={filteredBioDataTable}
                                            pagination
                                            paginationPerPage={5}
                                            paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
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
                                            columns={cardColumns}
                                            data={filteredCardDataTable}
                                            pagination
                                            paginationPerPage={5}
                                            paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
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
                                    paginationPerPage={5}
                                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
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
                                <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={handleSyncAllUsers}>
                                    {loadingSyncAllUser ? (
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <i className="bi bi-arrow-repeat" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    )}
                                    Sincronizar utilizadores
                                </Button>
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
                                {/* <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                    <i className="bi bi-power" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    Ligar
                                </Button> */}
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
                                <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                    <i className="bi bi-clock-history" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    Enviar horários
                                </Button>
                                <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={handleOpenDoor}>
                                    {loadingOpenDoor ? (
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <i className="bi bi-door-open" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    )}
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
                                <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={handleSyncTime}>
                                    {loadingSyncTime ? (
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
                                {/* <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                    <i className="bi bi-bell" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                    Sincronizar toques da sirene
                                </Button> */}
                            </div>
                        </Tab>
                        <Tab eventKey="files" title="Ficheiros">
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
                    onSave={addDevice}
                    fields={deviceFields}
                    initialValues={initialData || {}}
                />
                {selectedTerminal && (
                    <UpdateModalDevices
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onDuplicate={handleDuplicate}
                        onUpdate={updateDevice}
                        entity={selectedTerminal}
                        fields={deviceFields}
                        title="Atualizar Terminal"
                    />
                )}
                {showDeleteModal && (
                    <DeleteModal
                        open={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                        onDelete={deleteDevice}
                        entityId={selectedDeviceToDelete}
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
            </div>
        </TerminalsProvider>
    );
};