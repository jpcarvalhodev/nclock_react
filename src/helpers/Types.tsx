//*** todos os tipos dos modelos para usar no programa todo *** 

export type Employee = {
    [key: string]: any;
    id: string;
    enrollNumber: string;
    name: string;
    shortName: string;
    nameAcronym: string;
    comments: string;
    photo: string;
    address: string;
    zipcode: string;
    locality: string;
    village: string;
    district: string;
    phone: number;
    mobile: number;
    email: string;
    birthday: Date;
    nacionality: string;
    gender: string;
    biNumber: string;
    biIssuance: Date;
    biValidity: Date;
    nif: number;
    admissionDate: Date;
    exitDate: Date;
    rgpdAut: boolean;
    status: boolean;
    statusEmail: boolean;
    statusFprint: boolean;
    statusFace: boolean;
    statusPalm: boolean;
    type: string;
    departmentId: string;
    departmentName: string;
    professionId: string;
    professionName: string;
    categoryId: string;
    categoryName: string;
    groupId: string;
    groupName: string;
    zoneId: string;
    zoneName: string;
    externalEntityId: string;
    externalEntityName: string;
};

export type Department = {
    [key: string]: any;
    id: string,
    code: number,
    name: string,
    description: string,
    paiId: number,
};

export type Category = {
    [key: string]: any;
    id: string,
    code: number,
    description: string,
    acronym: string,
};

export type ExternalEntity = {
    [key: string]: any;
    id: string,
    name: string,
    comments: string,
    commercialName: string,
    responsibleName: string,
    photo: string,
    address: string,
    zipCode: string,
    locality: string,
    dillage: string,
    district: string,
    phone: number,
    mobile: number,
    email: string,
    www: string,
    fax: number,
    nif: number,
    dateInserted: Date,
    dateUpdated: Date,
    externalEntityTypeId: string,
    externalEntityTypeName: string,
};

export type ExternalEntityTypes = {
    [key: string]: any;
    id: string;
    order: number;
    name: string;
    dateInserted: Date;
};

export type Group = {
    [key: string]: any;
    id: string;
    name: string;
    description: string;
};

export type Profession = {
    [key: string]: any;
    id: string,
    code: number,
    description: string,
    acronym: string,
};

export type Zone = {
    [key: string]: any;
    id: string,
    type: string,
    name: string,
    description: string,
    acronym: string,
    address: string,
    zipCode: string,
    locality: string,
    village: string,
    district: string,
    phone: number,
    mobile: number,
    email: string,
};

export type EmployeeAttendanceTimes = {
    [key: string]: any;
    id: string;
    deviceId: string;
    deviceNumber: number;
    employeeId: string;
    enrollNumber: string;
    employeeName: string;
    verifyMode: number;
    inOutMode: number;
    workCode: number;
    observation: string;
    type: number;
    attendanceTime: Date;
};

export type Devices = {
    [key: string]: any;
    id: string;
    deviceNumber: number;
    deviceName: string;
    ipAddress: string;
    photo: string;
    port: number;
    code: number;
    machineNumber: number;
    platform: string;
    firmware: string;
    macAddress: string;
    serialNumber: string;
    readerCount: number;
    auxInCount: number;
    auxOutCount: number;
    maxUserCount: number;
    maxAttLogCount: number;
    maxFingerCount: number;
    maxUserFingerCount: number;
    faceAlg: number;
    fpAlg: number;
    productTime: Date;
    producter: string;
    type: string;
    status: boolean;
};

export type EmployeeDevices = {
    [key: string]: any;
    id: string;
    employeeId: string;
    deviceNumber: number;
    deviceSn: string;
    deviceName: string;
    enrollNumber: string;
    employeeName: string;
    startTime: Date;
    endTime: Date;
};

export type EmployeeCard = {
    [key: string]: any;
    id: string;
    devicePassword: string;
    devicePrivelage: number;
    deviceEnabled: boolean;
    cardNumber: string;
};

export type EmployeeAndCard = Partial<Employee> & Partial<EmployeeCard>;

export type EmployeeFP = {
    [key: string]: any;
    id: string;
    FPTmpIndex: number;
    FPTmpData: string;
    FPTmpLength: number;
    FPTmpFlag: number;
};

export type EmployeeFace = {
    [key: string]: any;
    id: string;
    FaceTmpIndex: number;
    FaceTmpData: string;
    FaceTmpLength: number;
};