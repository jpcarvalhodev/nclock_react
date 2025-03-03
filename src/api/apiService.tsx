import { toast } from "react-toastify";

import { fetchWithAuth } from "../components/FetchWithAuth";

import {
  AccessControl,
  Accesses,
  Ads,
  AllDevices,
  Auxiliaries,
  BackupDB,
  Cameras,
  Category,
  Department,
  Devices,
  DoorDevice,
  Doors,
  EmailUser,
  Employee,
  EmployeeAttendanceTimes,
  EmployeeCard,
  EmployeeFP,
  EmployeeFace,
  EmployeeVisitor,
  EmployeeVisitorMotive,
  ExternalEntity,
  ExternalEntityTypes,
  Group,
  KioskConfig,
  License,
  LicenseKey,
  LimpezasEOcorrencias,
  MBDevice,
  ManualOpenDoor,
  NewTransactionCard,
  Profession,
  Readers,
  RecolhaMoedeiroEContador,
  ResetCoin,
  TimePeriod,
  TimePlan,
  Zone,
} from "../types/Types";

// URL base para as APIs
export const BASE_URL = process.env.REACT_APP_API_BASE;

// URL base para os tickets
export const baseURL = process.env.REACT_APP_API_TICKETS;

// Dados da versão da aplicação
export const version = process.env.REACT_APP_VERSION;

let hasShown403 = false;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DO CONTEXTO DOS MOVIMENTOS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllAttendances = async () => {
  const response = await fetchWithAuth(`Attendances/GetAllAttendances`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAllAttendancesBetweenDates = async (
  startDate: string,
  endDate: string
) => {
  const response = await fetchWithAuth(
    `Attendances/GetAttendanceTimesBetweenDates?fromDate=${startDate}&toDate=${endDate}`
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addAttendance = async (attendance: EmployeeAttendanceTimes) => {
  const response = await fetchWithAuth(`Attendances/CreatedAttendanceTime`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(attendance),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addImportedAttendance = async (
  attendance: Partial<EmployeeAttendanceTimes>[]
) => {
  const response = await fetchWithAuth(
    `Attendances/CreateImportAttendanceTimes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendance),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateAttendance = async (attendance: EmployeeAttendanceTimes) => {
  const response = await fetchWithAuth(
    `Attendances/UpdatedAttendanceTime?attendanceTimeId=${attendance.attendanceTimeId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendance),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteAttendance = async (attendanceTimeId: string) => {
  const response = await fetchWithAuth(
    `Attendances/DeleteAttendanceTime?attendanceTimeId=${attendanceTimeId}`,
    {
      method: "DELETE",
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DO CONTEXTO DAS PESSOAS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllData = async () => {
  const deptResponse = await fetchWithAuth(`Departaments/Employees`);
  const groupResponse = await fetchWithAuth(`Groups/Employees`);
  const employeesResponse = await fetchWithAuth(
    `Employees/GetDisabledEmployees`
  );

  if (
    deptResponse.status === 403 ||
    groupResponse.status === 403 ||
    employeesResponse.status === 403
  ) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
    }
  }

  if (!deptResponse.ok || !groupResponse.ok || !employeesResponse.ok) {
    const errorData =
      (await deptResponse.json()) ||
      (await groupResponse.json()) ||
      (await employeesResponse.json());
    toast.error(errorData.message || errorData.error);
    throw new Error();
  }

  const [departments, groups, employees] = await Promise.all([
    deptResponse.json(),
    groupResponse.json(),
    employeesResponse.json(),
  ]);

  return { departments, groups, employees };
};

export const fetchAllEmployeesNoPagination = async () => {
  const response = await fetchWithAuth(`Employees/GetAllEmployees`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAllEmployees = async (pageNo?: string, pageSize?: string) => {
  const params: string[] = [];

  if (pageNo) {
    params.push(`pageNumber=${pageNo}`);
  }

  if (pageSize) {
    params.push(`pageSize=${pageSize}`);
  }

  let url = `Employees/GetAllEmployeesPagination`;
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message);
    throw new Error();
  }
  return response.json();
};

export const fetchAllEmployeesWithDisabledNoPagination = async () => {
  const response = await fetchWithAuth(`Employees/GetDisabledEmployees`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAllEmployeesWithDisabled = async (
  pageNo?: string,
  pageSize?: string,
  type?: string
) => {
  const params: string[] = [];

  if (pageNo) {
    params.push(`pageNumber=${pageNo}`);
  }

  if (pageSize) {
    params.push(`pageSize=${pageSize}`);
  }

  if (type) {
    params.push(`type=${type}`);
  }

  let url = `Employees/GetDisabledEmployeesPagination`;
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message);
    throw new Error();
  }
  return response.json();
};

export const fetchEmployeesById = async (id: string[]) => {
  const response = await fetchWithAuth(`Employees/GetEmployeesByIds`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addEmployee = async (employee: Employee) => {
  const response = await fetchWithAuth(`Employees/CreateEmployee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.error);
    throw new Error();
  }
  return response.json();
};

export const updateEmployee = async (employee: Employee) => {
  const response = await fetchWithAuth(`Employees/UpdateEmployee`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteEmployee = async (employeeID: string[]) => {
  const response = await fetchWithAuth(`Employees/DeleteEmployee`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeID),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const employeeImportFP = async (employeeFP: Partial<EmployeeFP>[]) => {
  const response = await fetchWithAuth(`Employees/ProcessImportEmployeeFP`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeFP),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const employeeImportFace = async (
  employeeFace: Partial<EmployeeFace>[]
) => {
  const response = await fetchWithAuth(`Employees/ProcessImportEmployeeFaces`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeFace),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const employeeImportCard = async (
  employeeCard: Partial<EmployeeCard>[]
) => {
  const response = await fetchWithAuth(`Employees/ProcessImportEmployeeCards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeCard),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAllEmployeeVisitors = async (
  startDate?: string,
  endDate?: string,
  pageNo?: string,
  pageSize?: string,
  employeeIds?: string[]
) => {
  const params: string[] = [];

  if (startDate && endDate) {
    params.push(`startTime=${startDate}`);
    params.push(`endTime=${endDate}`);
  }

  if (pageNo && pageSize) {
    params.push(`pageNumber=${pageNo}`);
    params.push(`pageSize=${pageSize}`);
  }

  if (employeeIds) {
    params.push(`employeeIds=${employeeIds}`);
  }

  let url = `Employees/GetAllEmployeeVisitors`;
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchEmployeeVisitorById = async (id: string[]) => {
  const response = await fetchWithAuth(`Employees/GetEmployeeVisitorById`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addEmployeeVisitor = async (
  employee: Partial<EmployeeVisitor>
) => {
  const response = await fetchWithAuth(`Employees/CreateEmployeeVisitor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.error);
    throw new Error();
  }
  return response.json();
};

export const updateEmployeeVisitor = async (
  employee: Partial<EmployeeVisitor>
) => {
  const response = await fetchWithAuth(`Employees/UpdateEmployeeVisitor`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteEmployeeVisitor = async (employeeID: string[]) => {
  const response = await fetchWithAuth(`Employees/DeleteEmployeeVisitor`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeID),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchEmployeeVisitorMotive = async () => {
  const response = await fetchWithAuth(`Employees/GetAllVisitanteMotivo`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addEmployeeVisitorMotive = async (
  employee: Partial<EmployeeVisitorMotive>
) => {
  const response = await fetchWithAuth(`Employees/CreateVisitantesMotivo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.error);
    throw new Error();
  }
  return response.json();
};

export const updateEmployeeVisitorMotive = async (
  employee: Partial<EmployeeVisitorMotive>
) => {
  const response = await fetchWithAuth(`Employees/UpdateVisitanteMotivo`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteEmployeeVisitorMotive = async (employeeID: string[]) => {
  const response = await fetchWithAuth(`Employees/DeleteVisitanteMotivo`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeID),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DO CONTEXTO DOS TERMINAIS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllDevices = async () => {
  const response = await fetchWithAuth(`Zkteco/GetAllDevices`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAllEmployeeDevices = async (zktecoDeviceID: Devices) => {
  const response = await fetchWithAuth(
    `Zkteco/GetAllUserInfoOnDevice?deviceId=${zktecoDeviceID}`
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAllMBDevices = async () => {
  const response = await fetchWithAuth(
    `TerminalPagamento/GetAllTerminalPagamentoAsync`
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAllTPCloseOpen = async (
  startDate?: string,
  endDate?: string
) => {
  let url = `TerminalPagamento/GetAllTPFechoAberturaAsync`;
  if (startDate && endDate) {
    url += `?startDate=${startDate}&endDate=${endDate}`;
  }
  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAllManualDoorOpen = async (
  startDate?: string,
  endDate?: string
) => {
  let url = `KioskTransaction/GetAllAberturaDistanciaAsync`;
  if (startDate && endDate) {
    url += `?startDate=${startDate}&endDate=${endDate}`;
  }
  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const sendAllEmployeesToDevice = async (
  zktecoDeviceID: Devices,
  employeeID?: string[] | null
) => {
  let url = `Zkteco/SendEmployeesToDevice/${zktecoDeviceID}`;

  if (employeeID) {
    const employeeIdParams = employeeID
      .map((id) => `employeeIds=${id}`)
      .join("&");
    url += `?${employeeIdParams}`;
  }

  const response = await fetchWithAuth(url, {
    method: "POST",
  });

  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const saveAllEmployeesOnDeviceToDB = async (
  zktecoDeviceID: Devices,
  employeeID?: string[] | null
) => {
  let url = `Zkteco/SaveAllEmployeesOnDeviceToDB/${zktecoDeviceID}`;

  if (employeeID) {
    const employeeIdParams = employeeID
      .map((id) => `employeeIds=${id}`)
      .join("&");
    url += `?${employeeIdParams}`;
  }

  const response = await fetchWithAuth(url, {
    method: "GET",
  });

  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const saveAllAttendancesEmployeesOnDevice = async (
  zktecoDeviceID: Devices
) => {
  const response = await fetchWithAuth(
    `Zkteco/SaveAllAttendancesEmployeesOnDeviceToDB/${zktecoDeviceID}`
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const syncTimeManuallyToDevice = async (zktecoDeviceID: Devices) => {
  const response = await fetchWithAuth(
    `Zkteco/SyncTimeToDevice?deviceId=${zktecoDeviceID}`
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const openDeviceDoor = async (
  deviceSN: string,
  doorData: DoorDevice
) => {
  const response = await fetchWithAuth(`Zkteco/OpenDoor1Device/${deviceSN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(doorData),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const restartDevice = async (zktecoDeviceID: Devices) => {
  const response = await fetchWithAuth(
    `Zkteco/RestartDevice/${zktecoDeviceID}`
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const sendClockToDevice = async (
  serialNumber: string,
  timeZoneId?: string
) => {
  const response = await fetchWithAuth(
    `Zkteco/SendTimezoneResponse?SN=${serialNumber}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([]),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteAllUsersOnDevice = async (
  zktecoDeviceID: Devices,
  employeeID?: string[] | null
) => {
  let url = `Zkteco/DeleteEmployeesToDevice/${zktecoDeviceID}`;

  if (employeeID) {
    const employeeIdParams = employeeID
      .map((id) => `employeeIds=${id}`)
      .join("&");
    url += `?${employeeIdParams}`;
  }

  const response = await fetchWithAuth(url, {
    method: "POST",
  });

  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(
      errorData.message || errorData.error || "Erro ao apagar utilizadores"
    );
    throw new Error();
  }
  return response.json();
};

export const addDevice = async (device: AllDevices) => {
  const response = await fetchWithAuth(`Zkteco/CreateDevice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(device),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(
      errorData.message || errorData.error || "Erro ao adicionar dispositivo"
    );
    throw new Error();
  }
  return response.json();
};

export const updateDevice = async (device: AllDevices) => {
  const response = await fetchWithAuth(
    `Zkteco/UpdateDevice/${device.zktecoDeviceID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(device),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteDevice = async (zktecoDeviceID: string) => {
  const response = await fetchWithAuth(
    `Zkteco/DeleteDevice/${zktecoDeviceID}`,
    {
      method: "DELETE",
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addMBDevice = async (mbDevice: MBDevice) => {
  const response = await fetchWithAuth(
    `TerminalPagamento/CreatTerminalPagamento`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mbDevice),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateMBDevice = async (mbDevice: MBDevice) => {
  const response = await fetchWithAuth(
    `TerminalPagamento/UpdateTerminalPagamento`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mbDevice),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteMBDevice = async (mbDeviceID: string) => {
  const response = await fetchWithAuth(
    `TerminalPagamento/DeleteTerminalPagamento?id=${mbDeviceID}`,
    {
      method: "DELETE",
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const restartMBDevice = async (mbDevice: Partial<MBDevice>) => {
  const response = await fetchWithAuth(`TerminalPagamento/CreateTPFunctions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mbDevice),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addManualOpenDoor = async (door: Partial<ManualOpenDoor>) => {
  const response = await fetchWithAuth(
    `KioskTransaction/CreateAberturaDistanciaAsync`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(door),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAllEventDevice = async (
  startDate?: string,
  endDate?: string,
  pageNo?: string,
  pageSize?: string
) => {
  const params: string[] = [];

  if (startDate && endDate) {
    params.push(`startTime=${startDate}`);
    params.push(`endTime=${endDate}`);
  }

  if (pageNo && pageSize) {
    params.push(`pageNumber=${pageNo}`);
    params.push(`pageSize=${pageSize}`);
  }

  let url = `Zkteco/GetAllEventDevice`;
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message);
    throw new Error();
  }
  return response.json();
};

export const fetchAllEventAndTransactionDevice = async (
  startDate?: string,
  endDate?: string,
  pageNo?: string,
  pageSize?: string
) => {
  const params: string[] = [];

  if (startDate && endDate) {
    params.push(`startTime=${startDate}`);
    params.push(`endTime=${endDate}`);
  }

  if (pageNo && pageSize) {
    params.push(`pageNumber=${pageNo}`);
    params.push(`pageSize=${pageSize}`);
  }

  let url = `Zkteco/GetAllEventAndTransactionsDevice`;
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message);
    throw new Error();
  }
  return response.json();
};

export const fetchAllDeviceActivities = async (
  sn?: string[],
  startDate?: string,
  endDate?: string,
  pageNo?: string,
  pageSize?: string
) => {
  const params: string[] = [];

  if (sn) {
    sn.forEach((sn) => {
    params.push(`ids=${sn}`);
    });
  }

  if (startDate && endDate) {
    params.push(`startTime=${startDate}`);
    params.push(`endTime=${endDate}`);
  }

  if (pageNo && pageSize) {
    params.push(`pageNumber=${pageNo}`);
    params.push(`pageSize=${pageSize}`);
  }

  let url = `Zkteco/GetAllDeviceActivities`;
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message);
    throw new Error();
  }
  return response.json();
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DAS CATEGORIAS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllCategories = async () => {
  const response = await fetchWithAuth(`Categories`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addCategory = async (category: Category) => {
  const response = await fetchWithAuth(`Categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateCategory = async (category: Category) => {
  const response = await fetchWithAuth(`Categories/${category.categoryID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteCategory = async (categoryID: string[]) => {
  const response = await fetchWithAuth(`Categories/DeleteCategories`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryID),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DOS DEPARTAMENTOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllDepartments = async () => {
  const response = await fetchWithAuth(`Departaments`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAllSubDepartments = async (
  parentId: number
): Promise<Department[]> => {
  const response = await fetchWithAuth(`Departaments?parentId=${parentId}`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    return [];
  }
  return response.json();
};

export const fetchAllDepartmentsEmployees = async () => {
  const response = await fetchWithAuth(`Departaments/Employees`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addDepartment = async (department: Department) => {
  const response = await fetchWithAuth(`Departaments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(department),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateDepartment = async (department: Department) => {
  const response = await fetchWithAuth(
    `Departaments/${department.departmentID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(department),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteDepartment = async (departmentID: string[]) => {
  const response = await fetchWithAuth(`Departaments/DeleteDepartments`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(departmentID),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DAS ENTIDADES EXTERNAS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllExternalEntities = async () => {
  const response = await fetchWithAuth(`ExternalEntities`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAllExternalEntitiesData = async () => {
  const typeResponsePromise = fetchWithAuth("ExternalEntityTypes");
  const entityResponsePromise = fetchWithAuth("ExternalEntities");

  const [typeResponse, entityResponse] = await Promise.all([
    typeResponsePromise,
    entityResponsePromise,
  ]);

  if (!typeResponse.ok || !entityResponse.ok) {
    return;
  }

  const [ExternalEntityTypes, ExternalEntities] = await Promise.all([
    typeResponse.json(),
    entityResponse.json(),
  ]);

  return { ExternalEntities, ExternalEntityTypes };
};

export const addExternalEntity = async (entity: ExternalEntity) => {
  const response = await fetchWithAuth(`ExternalEntities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entity),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateExternalEntity = async (entity: ExternalEntity) => {
  const response = await fetchWithAuth(
    `ExternalEntities/${entity.externalEntityID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entity),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteExternalEntity = async (externalEntityID: string[]) => {
  const response = await fetchWithAuth(
    `ExternalEntities/DeleteExternalEntity`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(externalEntityID),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DOS GRUPOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllGroups = async () => {
  const response = await fetchWithAuth(`Groups`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAllGroupsEmployees = async () => {
  const response = await fetchWithAuth(`Groups/Employees`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addGroup = async (group: Group) => {
  const response = await fetchWithAuth(`Groups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateGroup = async (group: Group) => {
  const response = await fetchWithAuth(`Groups/${group.groupID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteGroup = async (groupID: string[]) => {
  const response = await fetchWithAuth(`Groups/DeleteGroup`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(groupID),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DAS PROFISSÕES///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllProfessions = async () => {
  const response = await fetchWithAuth(`Professions`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addProfession = async (profession: Profession) => {
  const response = await fetchWithAuth(`Professions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profession),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateProfession = async (profession: Profession) => {
  const response = await fetchWithAuth(
    `Professions/${profession.professionID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profession),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteProfession = async (profession: string[]) => {
  const response = await fetchWithAuth(`Professions/DeleteProfession`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profession),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DOS TIPOS DE ENTIDADES EXTERNAS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllExternalEntityTypes = async () => {
  const response = await fetchWithAuth(`ExternalEntityTypes`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addExternalEntityTypes = async (
  externalEntityType: ExternalEntityTypes
) => {
  const response = await fetchWithAuth(`ExternalEntityTypes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(externalEntityType),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateExternalEntityTypes = async (
  externalEntityType: ExternalEntityTypes
) => {
  const response = await fetchWithAuth(
    `ExternalEntityTypes/${externalEntityType.externalEntityID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(externalEntityType),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteExternalEntityTypes = async (externalEntityID: string[]) => {
  const response = await fetchWithAuth(`ExternalEntityTypes/DeleteType`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(externalEntityID),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DAS ZONAS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllZones = async () => {
  const response = await fetchWithAuth(`Zones`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addZone = async (zone: Zone) => {
  const response = await fetchWithAuth(`Zones`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(zone),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateZone = async (zone: Zone) => {
  const response = await fetchWithAuth(`Zones/${zone.zoneID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(zone),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteZone = async (zoneID: string[]) => {
  const response = await fetchWithAuth(`Zones/DeleteZone`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(zoneID),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DOS CARTÕES DOS FUNCIONÁRIOS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllEmployeeCards = async () => {
  const response = await fetchWithAuth(`Employees/GetAllCardsEmployees`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchEmployeeCardDataByEmployeeID = async (employeeID: string) => {
  const response = await fetchWithAuth(
    `Employees/GetEmployeeByIdCard/${employeeID}`
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addEmployeeCard = async (employeeCard: EmployeeCard) => {
  const response = await fetchWithAuth(`Employees/CreateEmployeeCard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeCard),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateEmployeeCard = async (employeeCard: EmployeeCard) => {
  const response = await fetchWithAuth(
    `Employees/UpdateEmployeeCard/${employeeCard.cardId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeCard),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteEmployeeCard = async (cardId: string) => {
  const response = await fetchWithAuth(
    `Employees/DeleteEmployeeCard/${cardId}`,
    {
      method: "DELETE",
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DAS PUBLICIDADES////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllAds = async (startDate?: string, endDate?: string) => {
  let url = `Publicidade`;
  if (startDate && endDate) {
    url += `?startTime=${startDate}&endTime=${endDate}`;
  }
  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAllAdsByType = async (tipoArquivo: number) => {
  const response = await fetchWithAuth(`Publicidade/tipo/${tipoArquivo}`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAdByid = async (id: string) => {
  const response = await fetchWithAuth(`Publicidade/${id}`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addAd = async (ads: FormData) => {
  const response = await fetchWithAuth(`Publicidade/upload`, {
    method: "POST",
    body: ads,
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message || errorData.error);
    throw new Error();
  }
  return response.json();
};

export const updateAd = async (ads: Ads, ad: FormData) => {
  const response = await fetchWithAuth(`Publicidade/${ads.id}`, {
    method: "PUT",
    body: ad,
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteAd = async (id: string) => {
  const response = await fetchWithAuth(`Publicidade/${id}`, {
    method: "DELETE",
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DAS TRANSAÇÕES DO QUIOSQUE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllKioskTransactions = async (zktecoDeviceID: Devices) => {
  const response = await fetchWithAuth(
    `KioskTransaction/GetAllTransactions?deviceID=${zktecoDeviceID}`
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAllKioskTransactionsOnDevice = async (
  zktecoDeviceID: Devices
) => {
  const response = await fetchWithAuth(
    `KioskTransaction/GetAllTransactionsOnDevice?deviceID=${zktecoDeviceID}`
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchKioskTransactionDoorAsync = async () => {
  const response = await fetchWithAuth(
    `KioskTransaction/GetAllTransactionDoorAsync`
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchKioskTransactionsByEventDoorIdAndDeviceSNAsync = async (
  eventDoorId: string,
  deviceSN: string,
  startDate?: string,
  endDate?: string
) => {
  let url = `KioskTransaction/GetByEventDoorIdAndDeviceSNAsync?eventDoorId=${eventDoorId}&deviceSN=${deviceSN}`;
  if (startDate && endDate) {
    url += `&startDate=${startDate}&endDate=${endDate}`;
  }
  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchKioskTransactionsByCardAndDeviceSN = async (
  eventDoorIds?: string[],
  eventDoorId?: string,
  deviceSNs?: string[],
  startDate?: string,
  endDate?: string,
  pageNo?: string,
  pageSize?: string
) => {
  const params: string[] = [];

  if (eventDoorIds) {
    eventDoorIds.forEach((eventDoorIds) => {
      params.push(`eventDoorIds=${eventDoorIds}`);
    });
  }

  if (eventDoorId) {
    params.push(`eventDoorId=${eventDoorId}`);
  }

  if (deviceSNs) {
    deviceSNs.forEach((deviceSNs) => {
    params.push(`deviceSNs=${deviceSNs}`);
    });
  }

  if (startDate && endDate) {
    params.push(`startTime=${startDate}`);
    params.push(`endTime=${endDate}`);
  }

  if (pageNo && pageSize) {
    params.push(`pageNumber=${pageNo}`);
    params.push(`pageSize=${pageSize}`);
  }

  let url = `KioskTransaction/GetTransactionsByCardAndDeviceSN`;
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchKioskTransactionsByMBAndDeviceSN = async (
  startDate?: string,
  endDate?: string,
  pageNo?: string,
  pageSize?: string
) => {
  const params: string[] = [];

  if (startDate && endDate) {
    params.push(`startTime=${startDate}`);
    params.push(`endTime=${endDate}`);
  }

  if (pageNo && pageSize) {
    params.push(`pageNumber=${pageNo}`);
    params.push(`pageSize=${pageSize}`);
  }

  let url = `KioskTransaction/GetTransactionsByMBAndDeviceSN`;
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchKioskTransactionsByMBPayCoins = async (
  eventDoorId?: string,
  deviceSNs?: string[],
  startDate?: string,
  endDate?: string,
  pageNo?: string,
  pageSize?: string
) => {
  const params: string[] = [];

  if (eventDoorId) {
    params.push(`eventDoorId=${eventDoorId}`);
  }

  if (deviceSNs) {
    deviceSNs.forEach((deviceSNs) => {
    params.push(`deviceSNs=${deviceSNs}`);
    });
  }

  if (startDate && endDate) {
    params.push(`startTime=${startDate}`);
    params.push(`endTime=${endDate}`);
  }

  if (pageNo && pageSize) {
    params.push(`pageNumber=${pageNo}`);
    params.push(`pageSize=${pageSize}`);
  }

  let url = `KioskTransaction/GetKioskTransactionsMBPayCoins`;
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchKioskTransactionsByPayCoins = async (
  eventDoorId?: string,
  deviceSNs?: string[],
  startDate?: string,
  endDate?: string,
  pageNo?: string,
  pageSize?: string
) => {
  const params: string[] = [];

  if (eventDoorId) {
    params.push(`eventDoorId=${eventDoorId}`);
  }

  if (deviceSNs) {
    deviceSNs.forEach((deviceSNs) => {
    params.push(`deviceSNs=${deviceSNs}`);
    });
  }

  if (startDate && endDate) {
    params.push(`startTime=${startDate}`);
    params.push(`endTime=${endDate}`);
  }

  if (pageNo && pageSize) {
    params.push(`pageNumber=${pageNo}`);
    params.push(`pageSize=${pageSize}`);
  }

  let url = `KioskTransaction/GetTransactionsByPayCoins`;
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchKioskTransactionsVideoPorteiro = async (
  eventDoorId: string,
  deviceSN: string,
  startDate?: string,
  endDate?: string
) => {
  let url = `KioskTransaction/GetTransactionsVideoPorteiro?eventDoorId=${eventDoorId}&deviceSN=${deviceSN}`;
  if (startDate && endDate) {
    url += `&startDate=${startDate}&endDate=${endDate}`;
  }
  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchDataFimRecolha = async (deviceSN: string) => {
  const response = await fetchWithAuth(
    `KioskTransaction/GetLastDataFimRecolha?sn=${deviceSN}`
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addKioskTransaction = async (
  kioskTransaction: NewTransactionCard
) => {
  const response = await fetchWithAuth(`KioskTransaction/AddTransaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(kioskTransaction),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAllKioskTransactionByEnrollNumber = async (
  enrollmentNumbers: string[],
  eventDoorIds?: string,
  deviceSN?: string,
  startDate?: string,
  endDate?: string,
  pageNo?: string,
  pageSize?: string
) => {
  const params: string[] = [];

  if (eventDoorIds) {
    params.push(`eventDoorIds=${eventDoorIds}`);
  }

  if (enrollmentNumbers) {
    params.push(`enrollmentNumbers=${enrollmentNumbers}`);
  }

  if (deviceSN) {
    params.push(`deviceSNs=${deviceSN}`);
  }

  if (startDate && endDate) {
    params.push(`startTime=${startDate}`);
    params.push(`endTime=${endDate}`);
  }

  if (pageNo && pageSize) {
    params.push(`pageNumber=${pageNo}`);
    params.push(`pageSize=${pageSize}`);
  }

  let url = `KioskTransaction/GetKioskTransactionByEnrollmentNumbers`;
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message);
    throw new Error();
  }
  return response.json();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE CRIAÇÃO DE CONTAS, ENTIDADES E EMAILS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllRegisteredUsers = async () => {
  const response = await fetchWithAuth(`Authentication/GetAllUsersWithRoles`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAllCompanyConfig = async () => {
  const response = await fetchWithAuth(`Configuration/GetAllCompany`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAllEmailConfig = async () => {
  const response = await fetchWithAuth(
    `Configuration/GetEmailSMTPConfigurations`
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchCompanyLogo = async (selectedNif: number) => {
  const response = await fetchWithAuth(
    `Configuration/GetEntidadeImage?nif=${selectedNif}`
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error(errorData.message || errorData.error);
    throw new Error();
  }
  return response.blob();
};

export const addNewRegisteredUser = async (registeredUser: FormData) => {
  const response = await fetchWithAuth(`Authentication/Register`, {
    method: "POST",
    body: registeredUser,
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateRegisteredUser = async (registeredUser: FormData) => {
  const response = await fetchWithAuth(`Authentication/UpdateUser`, {
    method: "PUT",
    body: registeredUser,
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteRegisteredUser = async (id: string) => {
  const response = await fetchWithAuth(`Authentication/DeleteUser?id=${id}`, {
    method: "DELETE",
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addUserEmailConfig = async (email: Partial<EmailUser>) => {
  const response = await fetchWithAuth(`Configuration/AddEmailConfigurations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateUserEmailConfig = async (email: Partial<EmailUser>) => {
  const response = await fetchWithAuth(
    `Configuration/UpdateEmailConfigurations`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addCompanyConfig = async (companyEmail: FormData) => {
  const response = await fetchWithAuth(`Configuration/CreateEntidade`, {
    method: "POST",
    body: companyEmail,
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateCompanyConfig = async (companyData: FormData) => {
  const id = companyData.get("id");
  const response = await fetchWithAuth(
    `Configuration/UpadateCompany?id=${id}`,
    {
      method: "PUT",
      body: companyData,
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteCompanyConfig = async (id: string) => {
  const response = await fetchWithAuth(`Configuration/DeleteCompany?id=${id}`, {
    method: "DELETE",
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const testEmail = async (email: string) => {
  const response = await fetchWithAuth(`Configuration/SendTestEmail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE CRIAÇÃO DE HORÁRIOS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllTimePeriods = async () => {
  const response = await fetchWithAuth(`AccTimeSeg/GetAllTimezone`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addTimePeriod = async (timePeriod: Partial<TimePeriod>) => {
  const response = await fetchWithAuth(`AccTimeSeg/CreateTimezone`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(timePeriod),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateTimePeriod = async (timePeriod: TimePeriod) => {
  const response = await fetchWithAuth(
    `AccTimeSeg/UpdateTimezone?id=${timePeriod.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timePeriod),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteTimePeriod = async (id: string[]) => {
  const response = await fetchWithAuth(`AccTimeSeg/DeleteTimezone`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE CRIAÇÃO DE PLANOS DE HORÁRIOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllTimePlans = async () => {
  const response = await fetchWithAuth(`AccPlanoHorario/GetAllAccPlanoHorario`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const createTimePlan = async (timePlan: TimePlan) => {
  const response = await fetchWithAuth(
    `AccPlanoHorario/CreateAccPlanoHorario`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timePlan),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateTimePlan = async (timePlan: TimePlan) => {
  const response = await fetchWithAuth(
    `AccPlanoHorario/UpdateAccPlanoHorario?planoId=${timePlan.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timePlan),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteTimePlan = async (id: string[]) => {
  const response = await fetchWithAuth(
    `AccPlanoHorario/DeleteAccPlanoHorario`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deletePeriodoTimePlan = async (planoId: string, id: string[]) => {
  const response = await fetchWithAuth(
    `AccPlanoHorario/DeletePeriodosAccPlanoHorario?planoId=${planoId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE CONTROLE DE ACESSO////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllAccessControl = async () => {
  const response = await fetchWithAuth(`AccPlanoAcesso/GetAllAccPlanoAcesso`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addAccessControl = async (
  accessControl: Partial<AccessControl>
) => {
  const response = await fetchWithAuth(`AccPlanoAcesso/CreateAccPlanoAcesso`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(accessControl),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateAccessControl = async (
  accessControl: Partial<AccessControl>
) => {
  const response = await fetchWithAuth(
    `AccPlanoAcesso/UpdateAccPlanoAcesso?id=${accessControl.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accessControl),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteAccessControl = async (id: string[]) => {
  const response = await fetchWithAuth(`AccPlanoAcesso/DeleteAccPlanoAcesso`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE PORTAS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllDoors = async () => {
  const response = await fetchWithAuth(`AccDoor`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateDoor = async (door: Doors) => {
  const response = await fetchWithAuth(`AccDoor/${door.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(door),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  if (response.status === 204) {
    return { ...door, message: "Porta atualizada com sucesso!" };
  }
  return response.json();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE LICENÇAS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchLicenses = async (key: string) => {
  const response = await fetchWithAuth(`Configuration/GetLisence?key=${key}`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchLicensesWithoutKey = async () => {
  const response = await fetchWithAuth(`Configuration/GetValidLisence`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const importLicense = async (licenseKey: Partial<LicenseKey>) => {
  const response = await fetchWithAuth(`Configuration/ImportLicense`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(licenseKey),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateLicenses = async (key: string, licences: License[]) => {
  const response = await fetchWithAuth(
    `Configuration/AddUpdateLicence?key=${key}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(licences),
    }
  );

  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE LEITORES//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllReaders = async (deviceId: string) => {
  const response = await fetchWithAuth(
    `AccDoor/GetReadersByDeviceId?deviceId=${deviceId}`
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateReaders = async (reader: Readers) => {
  const response = await fetchWithAuth(`AccDoor/UpdateReader?id=${reader.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reader),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE RECOLHA MOEDEIRO///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchRecolhasMoedeiro = async (
  startDate?: string,
  endDate?: string
) => {
  let url = `KioskTransaction/GetAllRecolhasMoedeiro`;
  if (startDate && endDate) {
    url += `?startDate=${startDate}&endDate=${endDate}`;
  }
  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchContagemSNTransacoes = async () => {
  const response = await fetchWithAuth(
    `KioskTransaction/ObterContagemSNTransacoes`
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addRecolhaMoedeiro = async (
  recolhaMoedeiro: RecolhaMoedeiroEContador
) => {
  const response = await fetchWithAuth(
    `KioskTransaction/CreateRecolhasMoedeiro`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recolhaMoedeiro),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateRecolhaMoedeiro = async (
  recolhaMoedeiro: RecolhaMoedeiroEContador
) => {
  const response = await fetchWithAuth(
    `KioskTransaction/UpdateRecolhasMoedeiro?id=${recolhaMoedeiro.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recolhaMoedeiro),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteRecolhaMoedeiro = async (id: string[]) => {
  const response = await fetchWithAuth(
    `KioskTransaction/DeleteRecolhaMoedasAsync`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const resetRecolhaMoedeiro = async (resetCoin: ResetCoin) => {
  const response = await fetchWithAuth(
    `KioskTransaction/ResetRecolhaMoedeiro?deviceId=${resetCoin.deviceId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetCoin.observation),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE LIMPEZAS E OCORRÊNCIAS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllCleaningsAndOccurrences = async (
  tipo: number,
  startDate?: string,
  endDate?: string
) => {
  let url = `KioskTransaction/GetAllLimpezasOcorrenciasByTipoAsync?tipoOcorrencia=${tipo}`;
  if (startDate && endDate) {
    url += `&startDate=${startDate}&endDate=${endDate}`;
  }
  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addCleaning = async (cleaning: LimpezasEOcorrencias) => {
  const response = await fetchWithAuth(
    `KioskTransaction/CreateLimpezasWCAsync`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleaning),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addOccurrence = async (occurrence: LimpezasEOcorrencias) => {
  const response = await fetchWithAuth(
    `KioskTransaction/CreateOcorrenciasAsync`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(occurrence),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateCleaning = async (cleaning: LimpezasEOcorrencias) => {
  const response = await fetchWithAuth(
    `KioskTransaction/UpdateLimpezasWCAsync?id=${cleaning.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleaning),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateOccurrence = async (occurrence: LimpezasEOcorrencias) => {
  const response = await fetchWithAuth(
    `KioskTransaction/UpdateKioskOcorrencia?id=${occurrence.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(occurrence),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteCleaning = async (id: string[]) => {
  const response = await fetchWithAuth(
    `KioskTransaction/DeleteLimpezasWCAsync`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteOccurrence = async (id: string[]) => {
  const response = await fetchWithAuth(
    `KioskTransaction/DeleteKioskOcorrencia`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE CONTADORES//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllContador = async (
  startDate?: string,
  endDate?: string,
  pageNo?: string,
  pageSize?: string
) => {
  const params: string[] = [];

  if (pageNo && pageSize) {
    params.push(`pageNumber=${pageNo}`);
    params.push(`pageSize=${pageSize}`);
  }

  if (startDate && endDate) {
    params.push(`startTime=${startDate}`);
    params.push(`endTime=${endDate}`);
  }

  let url = `KioskTransaction/GetKioskAllContador`;
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE ALERTAS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllAlerts = async (startDate?: string, endDate?: string) => {
  let url = `KioskTransaction/GetAlertMessageAsync`;
  if (startDate && endDate) {
    url += `?startDate=${startDate}&endDate=${endDate}`;
  }
  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE LOGS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllHistoryLogs = async (
  startDate?: string,
  endDate?: string,
  userIds?: string[],
  pageNo?: string,
  pageSize?: string
) => {
  const params: string[] = [];

  if (startDate && endDate) {
    params.push(`startTime=${startDate}`);
    params.push(`endTime=${endDate}`);
  }

  if (userIds) {
    params.push(`userIds=${startDate}`);
  }

  if (pageNo && pageSize) {
    params.push(`pageNumber=${pageNo}`);
    params.push(`pageSize=${pageSize}`);
  }

  let url = `Configuration/GetHistoryUsers`;
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchAllLoginLogs = async (
  startDate?: string,
  endDate?: string,
  userIds?: string[],
  pageNo?: string,
  pageSize?: string
) => {
  const params: string[] = [];

  if (startDate && endDate) {
    params.push(`startTime=${startDate}`);
    params.push(`endTime=${endDate}`);
  }

  if (userIds) {
    params.push(`userIds=${startDate}`);
  }

  if (pageNo && pageSize) {
    params.push(`pageNumber=${pageNo}`);
    params.push(`pageSize=${pageSize}`);
  }

  let url = `Configuration/GetAuthTasks`;
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DAS CÂMERAS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllCameras = async () => {
  const response = await fetchWithAuth(`ViewCamera/GetAllViewCameras`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addCamera = async (camera: Cameras) => {
  const response = await fetchWithAuth(`ViewCamera/CreateViewCamera`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(camera),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateCamera = async (camera: Cameras) => {
  const response = await fetchWithAuth(
    `ViewCamera/UpdateViewCamera?id=${camera.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(camera),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const deleteCamera = async (id: string) => {
  const response = await fetchWithAuth(`ViewCamera/DeleteViewCamera?id=${id}`, {
    method: "DELETE",
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DAS CONFIGURAÇÔES DE QUIOSQUES///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchKioskConfig = async () => {
  const response = await fetchWithAuth(`Configuration/GetKioskConfigurations`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const addKioskConfig = async (kioskConfig: Partial<KioskConfig>) => {
  const response = await fetchWithAuth(`Configuration/AddKioskConfigurations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(kioskConfig),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateKioskConfig = async (kioskConfig: Partial<KioskConfig>) => {
  const response = await fetchWithAuth(
    `Configuration/UpdateKioskConfigurations`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(kioskConfig),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE AUXILIAR DE SAÍDA///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const openAuxDoor = async (data: {
  deviceSN: string;
  auxData: FormData;
}) => {
  const auxDataObj: { [key: string]: any } = {};
  data.auxData.forEach((value, key) => {
    auxDataObj[key] = value;
  });
  const response = await fetchWithAuth(
    `KioskTransaction/OpenAuxOutDevice/${data.deviceSN}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auxDataObj),
    }
  );
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE AUXILIARES///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllAux = async () => {
  const response = await fetchWithAuth(`AccAux/GetAllAux`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchInAux = async () => {
  const response = await fetchWithAuth(`AccAux/GetAllInAux`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchOutAux = async () => {
  const response = await fetchWithAuth(`AccAux/GetAllOutAux`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const fetchOutAuxEnabled = async () => {
  const response = await fetchWithAuth(`AccAux/GetAllOutAuxEnabeld`);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const updateAllAux = async (aux: Auxiliaries) => {
  const response = await fetchWithAuth(`AccAux/UpdateAux?id=${aux.auxId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aux),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE BACKUP DA DB E IMPORTAÇÃO DE FUNCIONÁRIOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const backupDatabase = async (backup: BackupDB) => {
  const response = await fetchWithAuth(`Configuration/BackupDatabase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(backup),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const importBackupDatabase = async (backup: FormData) => {
  const response = await fetchWithAuth(`Configuration/ImportBackup`, {
    method: "POST",
    body: backup,
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

export const importEmployees = async (employees: FormData) => {
  const response = await fetchWithAuth(`Employees/ImportEmployees`, {
    method: "POST",
    body: employees,
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////APIs DE ACESSOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAllAccessesByDevice = async (
  deviceSN?: string[],
  startDate?: string,
  endDate?: string,
  pageNo?: string,
  pageSize?: string
) => {
  const params: string[] = [];

  if (deviceSN) {
    params.push(`deviceSNList=${deviceSN}`);
  }

  if (startDate && endDate) {
    params.push(`startTime=${startDate}`);
    params.push(`endTime=${endDate}`);
  }

  if (pageNo && pageSize) {
    params.push(`pageNumber=${pageNo}`);
    params.push(`pageSize=${pageSize}`);
  }

  let url = `AccPlanoAcesso/GetTransactionsByDeviceSN`;
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message);
    throw new Error();
  }
  return response.json();
};

export const fetchAllAccessesByDoor = async (
  eventDoorId: number,
  deviceSN: string,
  startDate?: string,
  endDate?: string
) => {
  const params: string[] = [];

  if (eventDoorId) {
    params.push(`eventDoorId=${eventDoorId}`);
  }

  if (deviceSN) {
    params.push(`deviceSNList=${deviceSN}`);
  }

  if (startDate && endDate) {
    params.push(`startTime=${startDate}`);
    params.push(`endTime=${endDate}`);
  }

  let url = `AccPlanoAcesso/GetTransactionsByDeviceSN`;
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const response = await fetchWithAuth(url);
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.message);
    throw new Error();
  }
  return response.json();
};

export const addAccessTransaction = async (access: Partial<Accesses>) => {
  const response = await fetchWithAuth(`KioskTransaction/AddTransaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(access),
  });
  if (response.status === 403) {
    if (!hasShown403) {
      toast.error(
        "Você não tem permissão para visualizar o conteúdo desta página"
      );
      hasShown403 = true;
      throw new Error();
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.[""]?.errors?.[0]?.errorMessage;
    if (message) {
      toast.error(message);
    } else {
      toast.error(errorData.message || errorData.error);
    }
    throw new Error();
  }
  return response.json();
};
