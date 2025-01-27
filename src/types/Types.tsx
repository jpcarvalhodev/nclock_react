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
    employeeCards: EmployeeCard[];
    entidadeId: string;
    entidadeName: string;
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
    model: string;
    ipAddress: string;
    photo: string;
    port: number;
    code: number;
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
    deviceProtocol: number;
    deviceType: number;
    status: boolean;
    disabled: boolean;
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
    cardId: string;
    employeeId: string;
    enrollNumber: string;
    employeeName: string;
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

export type Ads = {
    [key: string]: any;
    id: string;
    NomeArquivo: string;
    TipoArquivo: number;
    Creador: string;
    Desativar: boolean;
    URLArquivo: string;
    Ordem: number;
    tempoExecucaoImagens: number;
    createDate: Date;
    dataFim: Date;
};

export type KioskTransaction = {
    [key: string]: any;
    id: string;
    eventTime: Date;
    pin: number;
    cardNo: number;
    eventName: string;
    eventId: number;
    eventDoorId: number;
    verifyModeNo: number;
    deviceSN: string;
    createTime: Date;
    updateTime: Date;
};

export type KioskTransactionMB = {
    [key: string]: any;
    id: string;
    transactionType: number;
    amount: string;
    statusCode: number;
    statusMessage: string;
    clientTicket: string;
    merchantTicket: string;
    email: string;
    timestamp: Date;
    tpId: string;
    deviceSN: string;
};

export type KioskTransactionCard = {
    [key: string]: any;
    id: string;
    cardNo: number;
    nameUser: string;
    deviceSN: string;
    eventNo: number;
    eventName: string;
    eventDoorId: number;
    eventDoorName: string;
    eventTime: Date;
    pin: number;
    verifyModeNo: number;
};

export type Register = {
    [key: string]: any;
    id: string;
    name: string;
    userName: string;
    emailAddress: string;
    password: string;
    confirmPassword: string;
    role: string;
    profileImage: string;
};

export type EmailUser = {
    [key: string]: any;
    id: string;
    usernameEmail: string;
    passwordEmail: string;
    hostSMTP: string;
    portSMTP: string;
    enableSSL: boolean;
};

export type EmailCompany = {
    [key: string]: any;
    id: string;
    companyName: string;
    responsibleName: string;
    companyAddress: string;
    companyCity: string;
    emailContact: string;
    language: string;
};

export type EmailUserCompany = Partial<EmailUser> & Partial<EmailCompany>;

export type TimePeriod = {
    [key: string]: any;
    id: string;
    appId: string;
    createrName: string;
    initFlag: boolean;
    name: string;
    remark: string;
    mondayEnd1: string;
    mondayEnd2: string;
    mondayEnd3: string;
    mondayStart1: string;
    mondayStart2: string;
    mondayStart3: string;
    saturdayEnd1: string;
    saturdayEnd2: string;
    saturdayEnd3: string;
    saturdayStart1: string;
    saturdayStart2: string;
    saturdayStart3: string;
    sundayEnd1: string;
    sundayEnd2: string;
    sundayEnd3: string;
    sundayStart1: string;
    sundayStart2: string;
    sundayStart3: string;
    thursdayEnd1: string;
    thursdayEnd2: string;
    thursdayEnd3: string;
    thursdayStart1: string;
    thursdayStart2: string;
    thursdayStart3: string;
    tuesdayEnd1: string;
    tuesdayEnd2: string;
    tuesdayEnd3: string;
    tuesdayStart1: string;
    tuesdayStart2: string;
    tuesdayStart3: string;
    wednesdayEnd1: string;
    wednesdayEnd2: string;
    wednesdayEnd3: string;
    wednesdayStart1: string;
    wednesdayStart2: string;
    wednesdayStart3: string;
    fridayEnd1: string;
    fridayEnd2: string;
    fridayEnd3: string;
    fridayStart1: string;
    fridayStart2: string;
    fridayStart3: string;
    holidayType1End1: string;
    holidayType1End2: string;
    holidayType1End3: string;
    holidayType1Start1: string;
    holidayType1Start2: string;
    holidayType1Start3: string;
    holidayType2End1: string;
    holidayType2End2: string;
    holidayType2End3: string;
    holidayType2Start1: string;
    holidayType2Start2: string;
    holidayType2Start3: string;
    holidayType3End1: string;
    holidayType3End2: string;
    holidayType3End3: string;
    holidayType3Start1: string;
    holidayType3Start2: string;
    holidayType3Start3: string;
};

export type Door = {
    [key: string]: any;
    id: string;
    nrDoor: number;
    time: number;
}

export type DoorDevice = Partial<Devices> & Partial<Door>;

export type DoorDeviceAccess = {
    idPlanosAcessoDispositivo: string;
    idPorta: string;
    nomePorta: string;
};

export type DeviceAccess = {
    idTerminal: string;
    nomeTerminal: string;
    portas: DoorDeviceAccess[];
};

export type PlanoAcessoDispositivos = {
    idPlanosAcessoDispositivo: string;
    idPlanoAcesso: string;
    nomePlanoAcesso: string | null;
    idPlanoHorario: string | null;
    nomePlanoHorario: string | null;
    nivel: number | null;
    createdDate: string;
    rem: boolean;
    dispositivos: DeviceAccess[];
};

export type AccessControl = {
    [key: string]: any;
    id: string;
    nome: string;
    tipo: number;
    tipoVerificacao: number;
    verificacaoFixa: boolean;
    dataInicio: Date;
    dataFim: Date;
    opc: number;
    activo: boolean;
    saldoZonaCarregamento: boolean;
    saldoZonaLotacao: boolean;
    asWithAc: boolean;
    acOutWithAs: boolean;
    acOutWithAsOffset: number;
    masterOnline: boolean;
    respAuthOnline: boolean;
    respAuthOnlineOffset: number;
    acGrpHR: boolean;
    OConfig: string;
    createdDate: Date;
    rem: boolean;
    planosAcessoDispositivos: PlanoAcessoDispositivos[];
    employees: Employee[];
};

export type Doors = {
    [key: string]: any;
    id: string;
    companyId: string;
    createTime: Date;
    createrCode: string;
    createrId: string;
    createrName: string;
    opVersion: number;
    updateTime: Date;
    updaterCode: string;
    updaterId: string;
    updaterName: string;
    actionInterval: number;
    activeTimesegId: string;
    allowSuaccessLock: string;
    backLock: boolean;
    combopenInterval: number;
    delayOpenTime: number;
    doorNo: number;
    doorSensorStatus: number;
    enabled: boolean;
    extDelayDrivertime: number;
    extDevId: string;
    forcePwd: string;
    hostStatus: number;
    inApbDuration: number;
    isDisableAudio: boolean;
    latchDoorType: number;
    latchTimeOut: number;
    latchTimesegId: string;
    lockDelay: number;
    name: string;
    passmodeTimesegId: string;
    readerType: number;
    sexInputMode: string;
    sexSupervisedResistor: string;
    senInputMode: string;
    senSupervisedResistor: string;
    sensorDelay: number;
    supperPwd: string;
    verifyMode: number;
    wgInputId: string;
    wgInputType: number;
    wgOutputId: string;
    wgOutputType: number;
    wgReversed: number;
    devId: string;
    devSN: string;
};

export type MBDevice = {
    [key: string]: any;
    id: string;
    nomeQuiosque: string;
    modelo: string
    estadoTerminal: number;
    timeReboot: string;
};

export type MBDeviceStatus = {
    [key: string]: any;
    id: string;
    tpId: string;
    tipoStatus: number;
    nomeStatus: string;
    timespam: Date;
};

export type MBDeviceCloseOpen = {
    [key: string]: any;
    id: string;
    tpId: string;
    timestamp: Date;
    fechoImage: string;
    aberturaImage: string;
};

export type SoftwareProduct = {
    enable: boolean;
    validacao: number;
    createDate: string;
    pacote: string | null;
};

export type License = {
    [key: string]: any;
    id?: string;
    entidadeNumber: number;
    name: string;
    nif: number;
    users: number;
    devices: number;
    sn: string;
    nclock: SoftwareProduct;
    naccess: SoftwareProduct;
    nvisitor: SoftwareProduct;
    npark: SoftwareProduct;
    ndoor: SoftwareProduct;
    npatrol: SoftwareProduct;
    ncard: SoftwareProduct;
    nview: SoftwareProduct;
    nsecur: SoftwareProduct;
    nsmart: SoftwareProduct;
    nreality: SoftwareProduct;
    nhologram: SoftwareProduct;
    npower: SoftwareProduct;
    ncharge: SoftwareProduct;
    ncity: SoftwareProduct;
    nkiosk: SoftwareProduct;
    nled: SoftwareProduct;
    nfire: SoftwareProduct;
    nfurniture: SoftwareProduct;
    npartition: SoftwareProduct;
    ndecor: SoftwareProduct;
    nping: SoftwareProduct;
    nconnect: SoftwareProduct;
    nlight: SoftwareProduct;
    ncomfort: SoftwareProduct;
    nsound: SoftwareProduct;
    nhome: SoftwareProduct;
    nsoftware: SoftwareProduct;
    nsystem: SoftwareProduct;
    napp: SoftwareProduct;
    ncyber: SoftwareProduct;
    ndigital: SoftwareProduct;
    nserver: SoftwareProduct;
    naut: SoftwareProduct;
    nequip: SoftwareProduct;
    nproject: SoftwareProduct;
    ncount: SoftwareProduct;
    nbuild: SoftwareProduct;
    ncaravan: SoftwareProduct;
    nmechanic: SoftwareProduct;
    nevents: SoftwareProduct;
    nservice: SoftwareProduct;
    ntask: SoftwareProduct;
    nproduction: SoftwareProduct;
    nticket: SoftwareProduct;
    nsales: SoftwareProduct;
    ninvoice: SoftwareProduct;
    ndoc: SoftwareProduct;
    nsports: SoftwareProduct;
    ngym: SoftwareProduct;
    nschool: SoftwareProduct;
    nclinic: SoftwareProduct;
    noptics: SoftwareProduct;
    ngold: SoftwareProduct;
};

export type Entity = {
    [key: string]: any;
    id: string;
    nome: string;
    morada: string;
    cPostal: string;
    localidade: string;
    telefone: string;
    telemovel: string;
    email: string;
    nif: number;
    www: string;
    observacoes: string;
    logotipo: string;
    createdDate: Date;
    updatedDate: Date;
    enabled: boolean;
}

export type RecolhaMoedeiroEContador = {
    [key: string]: any;
    id: string;
    dataRecolha: Date;
    pessoaResponsavel: string;
    numeroMoedas: number;
    numeroMoedasSistema: number;
    diferencaMoedas: number;
    diferencaEuros: number;
    valorTotalRecolhido: number;
    valorTotalSistema: number;
    observacoes: string;
    deviceID: string;
    serialNumber: string;
    contagemTransacoes: number;
    dataFimRecolha: Date;
}

export type ManualOpenDoor = {
    [key: string]: any;
    id: string;
    createdDate: Date;
    nomeResponsavel: string;
    nomeEvento: string;
    observacoes: string;
    deviceName: string;
    doorName: string;
}

export type LimpezasEOcorrencias = {
    [key: string]: any;
    id: string;
    dataCreate: Date;
    responsavel: string;
    observacoes: string;
    deviceId: string;
}

export type Logs = {
    [key: string]: any;
    userId: string;
    userName: string;
    taskName: string;
    description: string;
    createdDate: Date;
}

export type Cameras = {
    [key: string]: any;
    id: string;
    numeroCamera: number;
    nomeCamera: string;
    ip: string;
    url: string;
    userCamera: string;
    passwordCamera: string;
    createdDate: Date;
    updatedDate: Date;
}

export type EmployeesOnDevice = {
    [key: string]: any;
    id: string;
    cardNo: string;
    pin: string;
    name: string;
}

export type KioskConfig = {
    [key: string]: any;
    id: string;
    amount: number;
    totalMoedas: number;
    emails: string[];
}

export type AuxOut = {
    [key: string]: any;
    id: string;
    nrAuxOut: number;
    time: number;
}

export type Auxiliaries = {
    [key: string]: any;
    id: string;
    nome: string;
    auxInOut: number;
    auxNo: number;
    auxType: number;
    deviceId: string;
    timezoneId: string;
    enable: boolean;
}

export type ResetCoin = {
    [key: string]: any;
    id: string;
    deviceId: string;
    observation: string;
}

export type Counter = {
    [key: string]: any;
    id: string;
    cardNo: number;
    nameUser: string;
    deviceSN: string;
    deviceName: string;
    eventNo: number;
    eventName: string;
    eventDoorId: number;
    eventDoorName: string;
    eventType: string;
    eventTime: Date;
    pin: number;
    verifyModeNo: number;
}

export type LicenseKey = {
    [key: string]: any;
    id: string;
    licenseKey: string;
}

export type NewTransactionCard = {
    [key: string]: any;
    id: string;
    eventTime: Date;
    pin: number;
    cardNo: number;
    deviceSN: string;
    eventDoorId: number;
}

export type BackupDB = {
    [key: string]: any;
    id: string;
    backupName: string;
}

export type DevicesDoors = Partial<Devices> & Partial<Doors>;

export type TimePlan = {
    [key: string]: any;
    id: string;
    nome: string;
    descricao: string;
    periodos: string[];
}