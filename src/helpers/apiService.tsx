import { toast } from "react-toastify";
import { fetchWithAuth } from "../components/FetchWithAuth";
import { AccessControl, Ads, Category, Department, Devices, DoorDevice, Doors, EmailCompany, EmailUser, Employee, EmployeeAttendanceTimes, EmployeeCard, EmployeeFace, EmployeeFP, ExternalEntity, ExternalEntityTypes, Group, License, LimpezasEOcorrencias, ManualOpenDoor, MBDevice, Profession, RecolhaMoedeiroEContador, Register, TimePeriod, Zone } from "./Types";

// Define a interface para os dados do corpo da requisição deleteAllUsersOnDevice 
interface BodyData {
    zktecoDeviceID: Devices;
    employeeID?: string;
}

// URL base para as APIs
export const BASE_URL = 'https://localhost:9090/api/';

// URL base para os tickets
export const baseURL = "https://localhost:9090/";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DO CONTEXTO DOS MOVIMENTOS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllAttendances = async () => {
    const response = await fetchWithAuth(`Attendances/GetAllAttendances`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const fetchAllAttendancesBetweenDates = async (startDate: string, endDate: string) => {
    const response = await fetchWithAuth(`Attendances/GetAttendanceTimesBetweenDates?fromDate=${startDate}&toDate=${endDate}`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const addAttendance = async (attendance: EmployeeAttendanceTimes) => {
    const response = await fetchWithAuth(`Attendances/CreatedAttendanceTime`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendance)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const addImportedAttendance = async (attendance: Partial<EmployeeAttendanceTimes>) => {
    const response = await fetchWithAuth(`Attendances/CreateImportAttendanceTimes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendance)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const updateAttendance = async (attendance: EmployeeAttendanceTimes) => {
    const response = await fetchWithAuth(`Attendances/UpdatedAttendanceTime?attendanceTimeId=${attendance.attendanceTimeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendance)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const deleteAttendance = async (attendanceTimeId: string) => {
    const response = await fetchWithAuth(`Attendances/DeleteAttendanceTime?attendanceTimeId=${attendanceTimeId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DO CONTEXTO DAS PESSOAS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllData = async () => {
    const deptResponse = await fetchWithAuth(`Departaments/Employees`);
    const groupResponse = await fetchWithAuth(`Groups/Employees`);
    const employeesResponse = await fetchWithAuth(`Employees/GetAllEmployees`);

    if (!deptResponse.ok || !groupResponse.ok || !employeesResponse.ok) {
        const errorData = await deptResponse.json() || await groupResponse.json() || await employeesResponse.json();
        toast.error(errorData.message);
        throw new Error;
    }

    const [departments, groups, employees] = await Promise.all([
        deptResponse.json(),
        groupResponse.json(),
        employeesResponse.json(),
    ]);

    return { departments, groups, employees };
};

export const fetchAllEmployees = async () => {
    const response = await fetchWithAuth(`Employees/GetAllEmployees`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const addEmployee = async (employee: Employee) => {
    const response = await fetchWithAuth(`Employees/CreateEmployee`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const updateEmployee = async (employee: Employee) => {
    const response = await fetchWithAuth(`Employees/UpdateEmployee/${employee.employeeID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const deleteEmployee = async (employeeID: string) => {
    const response = await fetchWithAuth(`Employees/DeleteEmployee/${employeeID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const employeeImportFP = async (employeeFP: Partial<EmployeeFP>) => {
    const response = await fetchWithAuth(`Employees/ProcessImportEmployeeFP`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeFP)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const employeeImportFace = async (employeeFace: Partial<EmployeeFace>) => {
    const response = await fetchWithAuth(`Employees/ProcessImportEmployeeFaces`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeFace)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const employeeImportCard = async (employeeCard: Partial<EmployeeCard>) => {
    const response = await fetchWithAuth(`Employees/ProcessImportEmployeeCards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeCard)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DO CONTEXTO DOS TERMINAIS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllDevices = async () => {
    const response = await fetchWithAuth(`Zkteco/GetAllDevices`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const fetchAllEmployeesOnDevice = async (zktecoDeviceID: Devices) => {
    const response = await fetchWithAuth(`Zkteco/SaveAllEmployeesOnDeviceToDB/${zktecoDeviceID}`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const fetchAllEmployeeDevices = async () => {
    const response = await fetchWithAuth(`Employees/GetAllEmployeesDevice`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const fetchAllMBDevices = async () => {
    const response = await fetchWithAuth(`TerminalPagamento/GetAllTerminalPagamentoAsync`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const fetchAllTPCloseOpen = async (startDate?: string, endDate?: string) => {
    let url = `TerminalPagamento/GetAllTPFechoAberturaAsync`;
    if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
    }
    const response = await fetchWithAuth(url);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const fetchAllManualDoorOpen = async () => {
    const response = await fetchWithAuth(`KioskTransaction/GetAllAberturaDistanciaAsync`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const sendAllEmployeesToDevice = async (zktecoDeviceID: Devices, employeeID?: string | null) => {
    let url = `Zkteco/SendEmployeesToDevice/${zktecoDeviceID}`;
    if (employeeID !== null) {
        url += `?employeeIds=${employeeID}`;
    }

    let bodyData: BodyData = { zktecoDeviceID };
    if (employeeID) {
        bodyData.employeeID = employeeID;
    }

    const response = await fetchWithAuth(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const saveAllEmployeesOnDeviceToDB = async (zktecoDeviceID: Devices, employeeID?: string | null) => {
    let url = `Zkteco/SaveAllEmployeesOnDeviceToDB/${zktecoDeviceID}`;
    if (employeeID !== null) {
        url += `?employeeIds=${employeeID}`;
    }

    let bodyData: BodyData = { zktecoDeviceID };
    if (employeeID) {
        bodyData.employeeID = employeeID;
    }

    const response = await fetchWithAuth(url);

    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const saveAllAttendancesEmployeesOnDevice = async (zktecoDeviceID: Devices) => {
    const response = await fetchWithAuth(`Zkteco/SaveAllAttendancesEmployeesOnDeviceToDB/${zktecoDeviceID}`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const syncTimeManuallyToDevice = async (zktecoDeviceID: Devices) => {
    const response = await fetchWithAuth(`Zkteco/SyncTimeToDevice?deviceId=${zktecoDeviceID}`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const openDeviceDoor = async (deviceSN: DoorDevice, doorData: DoorDevice) => {
    const response = await fetchWithAuth(`Zkteco/OpenDevice1Door/${deviceSN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(doorData)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const restartDevice = async (zktecoDeviceID: Devices) => {
    const response = await fetchWithAuth(`Zkteco/RestartDevice/${zktecoDeviceID}`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const sendClockToDevice = async (serialNumber: string, timeZoneId: string) => {
    const response = await fetchWithAuth(`Zkteco/SendTimezoneResponse?SN=${serialNumber}&Id=${timeZoneId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serialNumber, timeZoneId })
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const deleteAllUsersOnDevice = async (zktecoDeviceID: Devices, employeeID?: string | null) => {
    let url = `Zkteco/DeleteEmployeesToDevice/${zktecoDeviceID}`;
    if (employeeID !== null) {
        url += `?employeeIds=${employeeID}`;
    }

    let bodyData: BodyData = { zktecoDeviceID };
    if (employeeID) {
        bodyData.employeeID = employeeID;
    }

    const response = await fetchWithAuth(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'Erro ao apagar utilizadores');
        throw new Error('Erro ao apagar utilizadores');
    }
    return response.json();
};

export const addDevice = async (device: Devices) => {
    const response = await fetchWithAuth(`Zkteco/CreateDevice`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(device)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'Erro ao adicionar dispositivo');
        throw new Error('Erro ao adicionar dispositivo');
    }
    return response.json();
};

export const updateDevice = async (device: Devices) => {
    const response = await fetchWithAuth(`Zkteco/UpdateDevice/${device.zktecoDeviceID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(device)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const deleteDevice = async (zktecoDeviceID: string) => {
    const response = await fetchWithAuth(`Zkteco/DeleteDevice/${zktecoDeviceID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const addMBDevice = async (mbDevice: MBDevice) => {
    const response = await fetchWithAuth(`TerminalPagamento/CreatTerminalPagamento`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mbDevice)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const updateMBDevice = async (mbDevice: MBDevice) => {
    const response = await fetchWithAuth(`TerminalPagamento/UpdateTerminalPagamento`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mbDevice)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const deleteMBDevice = async (mbDeviceID: string) => {
    const response = await fetchWithAuth(`TerminalPagamento/DeleteTerminalPagamento?id=${mbDeviceID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const restartMBDevice = async (mbDevice: Partial<MBDevice>) => {
    const response = await fetchWithAuth(`TerminalPagamento/CreateTPFunctions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mbDevice)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const addManualOpenDoor = async (door: Partial<ManualOpenDoor>) => {
    const response = await fetchWithAuth(`KioskTransaction/CreateAberturaDistanciaAsync`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(door)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DAS CATEGORIAS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllCategories = async () => {
    const response = await fetchWithAuth(`Categories`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const addCategory = async (category: Category) => {
    const response = await fetchWithAuth(`Categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(category)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const updateCategory = async (category: Category) => {
    const response = await fetchWithAuth(`Categories/${category.categoryID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(category)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const deleteCategory = async (categoryID: string) => {
    const response = await fetchWithAuth(`Categories/${categoryID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DOS DEPARTAMENTOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllDepartments = async () => {
    const response = await fetchWithAuth(`Departaments`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const fetchAllSubDepartments = async (parentId: number): Promise<Department[]> => {
    const response = await fetchWithAuth(`Departaments?parentId=${parentId}`);
    if (!response.ok) {
        return [];
    }
    return response.json();
};

export const fetchAllDepartmentsEmployees = async () => {
    const response = await fetchWithAuth(`Departaments/Employees`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const addDepartment = async (department: Department) => {
    const response = await fetchWithAuth(`Departaments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(department)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const updateDepartment = async (department: Department) => {
    const response = await fetchWithAuth(`Departaments/${department.departmentID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(department)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const deleteDepartment = async (departmentID: string) => {
    const response = await fetchWithAuth(`Departaments/${departmentID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DAS ENTIDADES EXTERNAS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllExternalEntities = async () => {
    const response = await fetchWithAuth(`ExternalEntities`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const fetchAllExternalEntitiesData = async () => {
    const typeResponsePromise = fetchWithAuth('ExternalEntityTypes');
    const entityResponsePromise = fetchWithAuth('ExternalEntities');

    const [typeResponse, entityResponse] = await Promise.all([typeResponsePromise, entityResponsePromise]);

    if (!typeResponse.ok || !entityResponse.ok) {
        return;
    }

    const [ExternalEntityTypes, ExternalEntities] = await Promise.all([
        typeResponse.json(),
        entityResponse.json()
    ]);

    return { ExternalEntities, ExternalEntityTypes };
};

export const addExternalEntity = async (entity: ExternalEntity) => {
    const response = await fetchWithAuth(`ExternalEntities`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entity)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const updateExternalEntity = async (entity: ExternalEntity) => {
    const response = await fetchWithAuth(`ExternalEntities/${entity.externalEntityID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entity)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const deleteExternalEntity = async (externalEntityID: string) => {
    const response = await fetchWithAuth(`ExternalEntities/${externalEntityID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DOS GRUPOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllGroups = async () => {
    const response = await fetchWithAuth(`Groups`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const fetchAllGroupsEmployees = async () => {
    const response = await fetchWithAuth(`Groups/Employees`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const addGroup = async (group: Group) => {
    const response = await fetchWithAuth(`Groups`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(group)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const updateGroup = async (group: Group) => {
    const response = await fetchWithAuth(`Groups/${group.groupID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(group)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const deleteGroup = async (groupID: string) => {
    const response = await fetchWithAuth(`Groups/${groupID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DAS PROFISSÕES///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllProfessions = async () => {
    const response = await fetchWithAuth(`Professions`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const addProfession = async (profession: Profession) => {
    const response = await fetchWithAuth(`Professions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profession)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const updateProfession = async (profession: Profession) => {
    const response = await fetchWithAuth(`Professions/${profession.professionID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profession)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const deleteProfession = async (profession: string) => {
    const response = await fetchWithAuth(`Professions/${profession}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DOS TIPOS DE ENTIDADES EXTERNAS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllExternalEntityTypes = async () => {
    const response = await fetchWithAuth(`ExternalEntityTypes`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const addExternalEntityTypes = async (externalEntityType: ExternalEntityTypes) => {
    const response = await fetchWithAuth(`ExternalEntityTypes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(externalEntityType)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const updateExternalEntityTypes = async (externalEntityType: ExternalEntityTypes) => {
    const response = await fetchWithAuth(`ExternalEntityTypes/${externalEntityType.externalEntityID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(externalEntityType)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const deleteExternalEntityTypes = async (externalEntityID: string) => {
    const response = await fetchWithAuth(`ExternalEntityTypes/${externalEntityID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DAS ZONAS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllZones = async () => {
    const response = await fetchWithAuth(`Zones`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const addZone = async (zone: Zone) => {
    const response = await fetchWithAuth(`Zones`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(zone)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const updateZone = async (zone: Zone) => {
    const response = await fetchWithAuth(`Zones/${zone.zoneID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(zone)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const deleteZone = async (zoneID: string) => {
    const response = await fetchWithAuth(`Zones/${zoneID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DOS CARTÕES DOS FUNCIONÁRIOS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllEmployeeCards = async () => {
    const response = await fetchWithAuth(`Employees/GetAllCardsEmployees`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const fetchEmployeeCardDataByEmployeeID = async (employeeID: string) => {
    const response = await fetchWithAuth(`Employees/GetEmployeeByIdCard/${employeeID}`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const addEmployeeCard = async (employeeCard: EmployeeCard) => {
    const response = await fetchWithAuth(`Employees/CreateEmployeeCard`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeCard)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const updateEmployeeCard = async (employeeCard: EmployeeCard) => {

    const response = await fetchWithAuth(`Employees/UpdateEmployeeCard/${employeeCard.cardId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeCard)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const deleteEmployeeCard = async (cardId: string) => {
    const response = await fetchWithAuth(`Employees/DeleteEmployeeCard/${cardId}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DAS PUBLICIDADES////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllAds = async () => {
    const response = await fetchWithAuth(`Publicidade`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const fetchAllAdsByType = async (tipoArquivo: number) => {
    const response = await fetchWithAuth(`Publicidade/tipo/${tipoArquivo}`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const fetchAdByid = async (id: string) => {
    const response = await fetchWithAuth(`Publicidade/${id}`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const addAd = async (ads: FormData) => {
    const response = await fetchWithAuth(`Publicidade/upload`, {
        method: 'POST',
        body: ads
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Falha ao enviar publicidade: ${response.status}`);
    }
    return response.json();
};

export const updateAd = async (ads: Ads, ad: FormData) => {
    const response = await fetchWithAuth(`Publicidade/${ads.id}`, {
        method: 'PUT',
        body: ad
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const deleteAd = async (id: string) => {
    const response = await fetchWithAuth(`Publicidade/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DAS TRANSAÇÕES DO QUIOSQUE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllKioskTransactions = async (zktecoDeviceID: Devices) => {
    const response = await fetchWithAuth(`KioskTransaction/GetAllTransactions?deviceID=${zktecoDeviceID}`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const fetchKioskTransactionDoorAsync = async () => {
    const response = await fetchWithAuth(`KioskTransaction/GetAllTransactionDoorAsync`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const fetchKioskTransactionsByEventDoorIdAndDeviceSNAsync = async (eventDoorId: string, deviceSN: string, startDate?: string, endDate?: string) => {
    let url = `KioskTransaction/GetByEventDoorIdAndDeviceSNAsync?eventDoorId=${eventDoorId}&deviceSN=${deviceSN}`;
    if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    const response = await fetchWithAuth(url);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const fetchKioskTransactionsByCardAndDeviceSN = async (eventDoorId: string, deviceSN: string, startDate?: string, endDate?: string) => {
    let url = `KioskTransaction/GetTransactionsByCardAndDeviceSN?eventDoorId=${eventDoorId}&deviceSN=${deviceSN}`;
    if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    const response = await fetchWithAuth(url);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const fetchKioskTransactionsByMBAndDeviceSN = async (startDate?: string, endDate?: string) => {
    let url = `KioskTransaction/GetTransactionsByMBAndDeviceSN`;
    if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
    }
    const response = await fetchWithAuth(url);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const fetchKioskTransactionsByPayCoins = async (eventDoorId: string, deviceSN: string, startDate?: string, endDate?: string) => {
    let url = `KioskTransaction/GetTransactionsByPayCoins?eventDoorId=${eventDoorId}&deviceSN=${deviceSN}`;
    if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    const response = await fetchWithAuth(url);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const fetchKioskTransactionsVideoPorteiro = async (eventDoorId: string, deviceSN: string, startDate?: string, endDate?: string) => {
    let url = `KioskTransaction/GetTransactionsVideoPorteiro?eventDoorId=${eventDoorId}&deviceSN=${deviceSN}`;
    if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    const response = await fetchWithAuth(url);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE CRIAÇÃO DE CONTAS E EMAILS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllRegisteredUsers = async () => {
    const response = await fetchWithAuth(`Authentication/GetAllUsersWithRoles`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
};

export const fetchAllCompanyConfig = async () => {
    const response = await fetchWithAuth(`Configuration/GetAllCompany`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const fetchAllEmailConfig = async () => {
    const response = await fetchWithAuth(`Configuration/GetEmailSMTPConfigurations`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const addNewRegisteredUser = async (registeredUser: Register) => {
    const response = await fetchWithAuth(`Authentication/Register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registeredUser)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const updateRegisteredUser = async (registeredUser: FormData) => {
    const response = await fetchWithAuth(`Authentication/UpdateUser`, {
        method: 'PUT',
        body: registeredUser
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const addUserEmailConfig = async (email: EmailUser) => {
    const response = await fetchWithAuth(`Configuration/AddEmailConfigurations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(email)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const updateUserEmailConfig = async (email: EmailUser) => {
    const response = await fetchWithAuth(`Configuration/UpdateEmailConfigurations`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(email)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const addCompanyConfig = async (companyEmail: FormData) => {
    const response = await fetchWithAuth(`Configuration/CreateEntidade`, {
        method: 'POST',
        body: companyEmail
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const updateCompanyConfig = async (companyEmail: FormData) => {
    const companyId = companyEmail.get('id');
    const response = await fetchWithAuth(`Configuration/UpadateCompany?id=${companyId}`, {
        method: 'PUT',
        body: companyEmail
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE CRIAÇÃO DE HORÁRIOS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllTimePeriods = async () => {
    const response = await fetchWithAuth(`AccTimeSeg/GetAllTimezone`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const addTimePeriod = async (timePeriod: TimePeriod) => {
    const response = await fetchWithAuth(`AccTimeSeg/CreateTimezone`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(timePeriod)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const updateTimePeriod = async (timePeriod: TimePeriod) => {
    const response = await fetchWithAuth(`AccTimeSeg/UpdateTimezone/${timePeriod.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(timePeriod)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const deleteTimePeriod = async (id: string) => {
    const response = await fetchWithAuth(`AccTimeSeg/DeleteTimezone/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE CONTROLE DE ACESSO////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllAccessControl = async () => {
    const response = await fetchWithAuth(`AccessControle/GetAllAccessControles`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const addAccessControl = async (accessControl: Partial<AccessControl>) => {
    const response = await fetchWithAuth(`AccessControle/CreateAccessControle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(accessControl)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const updateAccessControl = async (accessControl: Partial<AccessControl>, door?: Partial<Doors>) => {
    let url = `AccessControle/UpdateAccessControle?id=${accessControl.employeesId}`;
    if (door) {
        url += `&doorId=${door.id}`;
    }
    const response = await fetchWithAuth(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(accessControl)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const deleteAccessControl = async (id: string, doorId?: Doors) => {
    let url = `AccessControle/DeleteAccessControle?id=${id}`;
    if (doorId) {
        url += `&doorId=${doorId}`;
    }
    const response = await fetchWithAuth(url, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE PORTAS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllDoors = async () => {
    const response = await fetchWithAuth(`AccDoor`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const updateDoor = async (door: Doors) => {
    const response = await fetchWithAuth(`AccDoor/${door.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(door)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    if (response.status === 204) {
        return { ...door, message: 'Porta atualizada com sucesso!' };
    }
    return response.json();
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE LICENÇAS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



export const fetchLicenses = async (key: string) => {
    const response = await fetchWithAuth(`Configuration/GetLisence?key=${key}`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const fetchLicensesWithoutKey = async () => {
    const response = await fetchWithAuth(`Configuration/GetValidLisence`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const updateLicenses = async (key: string, licences: License[]) => {
    const response = await fetchWithAuth(`Configuration/AddUpdateLisence?key=${key}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(licences)
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE RECOLHA MOEDEIRO///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchRecolhasMoedeiro = async () => {
    const response = await fetchWithAuth(`KioskTransaction/GetAllRecolhasMoedeiro`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const addRecolhaMoedeiro = async (recolhaMoedeiro: RecolhaMoedeiroEContador) => {
    const response = await fetchWithAuth(`KioskTransaction/CreateRecolhasMoedeiro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recolhaMoedeiro)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const updateRecolhaMoedeiro = async (recolhaMoedeiro: RecolhaMoedeiroEContador) => {
    const response = await fetchWithAuth(`KioskTransaction/UpdateRecolhasMoedeiro?id=${recolhaMoedeiro.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recolhaMoedeiro)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE LIMPEZAS E OCORRÊNCIAS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllCleaningsAndOccurrences = async (tipo: number) => {
    const response = await fetchWithAuth(`KioskTransaction/GetAllLimpezasOcorrenciasByTipoAsync?tipoOcorrencia=${tipo}`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const addCleaning = async (cleaning: LimpezasEOcorrencias) => {
    const response = await fetchWithAuth(`KioskTransaction/CreateLimpezasWCAsync`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleaning)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const addOccurrence = async (occurrence: LimpezasEOcorrencias) => {
    const response = await fetchWithAuth(`KioskTransaction/CreateOcorrenciasAsync`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(occurrence)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE CONTADORES//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllContador = async () => {
    const response = await fetchWithAuth(`KioskTransaction/GetAllContadorMoedeiro`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const startContador = async (contador: RecolhaMoedeiroEContador) => {
    const response = await fetchWithAuth(`KioskTransaction/StartContadorMoedasAsync`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contador)
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }	
    return response.json();
}

export const endContador = async (contadorId: string) => {
    const response = await fetchWithAuth(`KioskTransaction/EndContadorMoedasAsync?recolhaId=${contadorId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }	
    return response.json();
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE ALERTAS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllAlerts = async () => {
    const response = await fetchWithAuth(`KioskTransaction/GetAlertMessageAsync`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE LOGS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchAllHistoryLogs = async () => {
    const response = await fetchWithAuth(`Configuration/GetHistoryUsers`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}

export const fetchAllLoginLogs = async () => {
    const response = await fetchWithAuth(`Configuration/GetAuthTasks`);
    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error;
    }
    return response.json();
}