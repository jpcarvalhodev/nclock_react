//*** campos de todos os modelos para usar no programa todo ***

export const employeeFields = [
    { label: 'Número', key: 'enrollNumber', type: 'string', required: true },
    { label: 'Nome', key: 'name', type: 'string', required: true },
    { label: 'Nome Abreviado', key: 'shortName', type: 'string', required: true },
    { label: 'Acrônimo do Nome', key: 'nameAcronym', type: 'string' },
    { label: 'Comentários', key: 'comments', type: 'string' },
    { label: 'Foto', key: 'photo', type: 'string' },
    { label: 'Morada', key: 'address', type: 'string' },
    { label: 'Código Postal', key: 'zipcode', type: 'string' },
    { label: 'Localidade', key: 'locality', type: 'string' },
    { label: 'Freguesia', key: 'village', type: 'string' },
    { label: 'Distrito', key: 'district', type: 'string' },
    { label: 'Telefone', key: 'phone', type: 'string' },
    { label: 'Telemóvel', key: 'mobile', type: 'string' },
    { label: 'E-Mail', key: 'email', type: 'string' },
    { label: 'Data de Nascimento', key: 'birthday', type: 'datetime-local' },
    { label: 'Nacionalidade', key: 'nacionality', type: 'string' },
    { label: 'Gênero', key: 'gender', type: 'string' },
    { label: 'Número de BI', key: 'biNumber', type: 'string' },
    { label: 'Emissão de BI', key: 'biIssuance', type: 'datetime-local' },
    { label: 'Validade de BI', key: 'biValidity', type: 'datetime-local' },
    { label: 'NIF', key: 'nif', type: 'number' },
    { label: 'Data de Admissão', key: 'admissionDate', type: 'datetime-local' },
    { label: 'Data de Saída', key: 'exitDate', type: 'datetime-local' },
    { label: 'Autorização RGPD', key: 'rgpdAut', type: 'boolean' },
    { label: 'Status', key: 'status', type: 'boolean' },
    { label: 'Status de E-Mail', key: 'statusEmail', type: 'boolean' },
    { key: 'statusFprint', label: 'Status de Digital', type: 'boolean' },
    { key: 'statusFace', label: 'Status de Face', type: 'boolean' },
    { key: 'statusPalm', label: 'Status de Palma', type: 'boolean' },
    { label: 'Tipo', key: 'type', type: 'string' },
    { label: 'Departamento', key: 'departmentId', type: 'dropdown' },
    { label: 'Profissão', key: 'professionId', type: 'dropdown' },
    { label: 'Categoria', key: 'categoryId', type: 'dropdown' },
    { label: 'Grupo', key: 'groupId', type: 'dropdown', },
    { label: 'Zona', key: 'zoneId', type: 'dropdown', },
    { label: 'Entidade Externa', key: 'externalEntityId', type: 'dropdown', },
    { label: 'Módulo', key: 'modulos', type: 'string' },
];

export const departmentFields = [
    { label: 'Código', key: 'code', type: 'number', required: true },
    { label: 'Nome', key: 'name', type: 'string', required: true },
    { label: 'Descrição', key: 'description', type: 'string' },
    { label: 'ID de Parente', key: 'paiId', type: 'dropdown' },
];

export const categoryFields = [
    { label: 'Código', key: 'code', type: 'number', required: true },
    { label: 'Descrição', key: 'description', type: 'string', required: true },
    { label: 'Acrônimo', key: 'acronym', type: 'string' },
];

export const externalEntityFields = [
    { label: 'Nome', key: 'name', type: 'string', required: true },
    { label: 'Comentários', key: 'comments', type: 'string' },
    { label: 'Nome Comercial', key: 'commercialName', type: 'string' },
    { label: 'Nome Responsável', key: 'responsibleName', type: 'string' },
    { label: 'Foto', key: 'photo', type: 'string' },
    { label: 'Morada', key: 'address', type: 'string' },
    { label: 'Código Postal', key: 'ZIPCode', type: 'string' },
    { label: 'Localidade', key: 'locality', type: 'string' },
    { label: 'Freguesia', key: 'village', type: 'string' },
    { label: 'Distrito', key: 'district', type: 'string' },
    { label: 'Telefone', key: 'phone', type: 'number' },
    { label: 'Telemóvel', key: 'mobile', type: 'number' },
    { label: 'E-Mail', key: 'email', type: 'string' },
    { label: 'WWW', key: 'www', type: 'string' },
    { label: 'Fax', key: 'fax', type: 'number' },
    { label: 'NIF', key: 'nif', type: 'number', required: true },
    { label: 'Data Inserida', key: 'dateInserted', type: 'datetime-local' },
    { label: 'Data Atualizada', key: 'dateUpdated', type: 'datetime-local' },
    { label: 'Tipo', key: 'externalEntityTypeId', type: 'dropdown' },
];

export const externalEntityTypeFields = [
    { label: 'Ordem', key: 'order', type: 'number', required: true },
    { label: 'Nome', key: 'name', type: 'string', required: true },
    { label: 'Data de Inserção', key: 'dateInserted', type: 'datetime-local', required: true },
];

export const groupFields = [
    { key: 'name', label: 'Nome', type: 'string', required: true },
    { key: 'description', label: 'Descrição', type: 'string' },
];

export const professionFields = [
    { key: 'code', label: 'Código', type: 'number', required: true },
    { key: 'description', label: 'Descrição', type: 'string', required: true },
    { key: 'acronym', label: 'Acrônimo', type: 'string' },
];

export const zoneFields = [
    { key: 'type', label: 'Tipo', type: 'string' },
    { key: 'name', label: 'Nome', type: 'string', required: true },
    { key: 'description', label: 'Descrição', type: 'string' },
    { key: 'acronym', label: 'Acrônimo', type: 'string', required: true },
    { key: 'photo', label: 'Foto', type: 'string' },
    { key: 'address', label: 'Morada', type: 'string' },
    { key: 'ZIPCode', label: 'Código Postal', type: 'string' },
    { key: 'locality', label: 'Localidade', type: 'string' },
    { key: 'village', label: 'Freguesia', type: 'string' },
    { key: 'District', label: 'Distrito', type: 'string' },
    { key: 'Phone', label: 'Telefone', type: 'string' },
    { key: 'Mobile', label: 'Telemóvel', type: 'string' },
    { key: 'Email', label: 'E-Mail', type: 'string' },
];

export const employeeAttendanceTimesFields = [
    { key: 'attendanceTime', label: 'Data e Hora de presença', type: 'datetime-local', required: true },
    { key: 'deviceId', label: 'Dispositivo', type: 'dropdown' },
    { key: 'deviceNumber', label: 'Número do Dispositivo', type: 'number' },
    { key: 'employeeId', label: 'Funcionário', type: 'dropdown', required: true },
    { key: 'enrollNumber', label: 'Número', type: 'string' },
    { key: 'employeeName', label: 'Nome do Funcionário', type: 'string' },
    { key: 'inOutMode', label: 'Modo de Entrada/Saída', type: 'number' },
    { key: 'observation', label: 'Observação', type: 'string' },
    { key: 'type', label: 'Tipo', type: 'number' },
    { key: 'verifyMode', label: 'Modo de Verificação', type: 'number' },
    { key: 'workCode', label: 'Código', type: 'number' },
];

export const deviceFields = [
    { key: "deviceNumber", label: "Número", type: "number", required: true },
    { key: "deviceName", label: "Nome", type: "string", required: true },
    { key: "model", label: "Modelo", type: "string" },
    { key: "ipAddress", label: "Endereço IP", type: "string", required: true },
    { key: "port", label: "Porta", type: "number", required: true },
    { key: "photo", label: "Foto", type: "string" },
    { key: "code", label: "Código", type: "number" },
    { key: "platform", label: "Platforma", type: "string" },
    { key: "firmware", label: "Firmware", type: "string" },
    { key: "macAddress", label: "Endereço MAC", type: "string" },
    { key: "serialNumber", label: "Número Serial", type: "string" },
    { key: "readerCount", label: "Contagem no Leitor", type: "number" },
    { key: "auxInCount", label: "Contagem de Entrada", type: "number" },
    { key: "auxOutCount", label: "Contagem de Saída", type: "number" },
    { key: "maxUserCount", label: "Contagem Máxima de Utilizadores", type: "number" },
    { key: "maxAttLogCount", label: "Contagem Máxima de Atualizações de Log", type: "number" },
    { key: "maxFingerCount", label: "Contagem Máxima de Digitais", type: "number" },
    { key: "maxUserFingerCount", label: "Contagem Máxima de Digitais de Utilizadores", type: "number" },
    { key: "faceAlg", label: "Algoritmo Facial", type: "number" },
    { key: "fpAlg", label: "Algoritmo de Digitais", type: "number" },
    { key: "productTime", label: "Tempo de Produção", type: "Date" },
    { key: "producter", label: "Produtor", type: "string" },
    { key: "deviceProtocol", label: "Protocolo", type: "number" },
    { key: "deviceType", label: "Tipo", type: "number" },
    { key: "status", label: "Status", type: "boolean" },
    { key: "disabled", label: "Activo", type: "boolean" }
];

export const employeeDeviceFields = [
    { key: 'deviceNumber', label: 'Número do Dispositivo', type: 'number' },
    { key: 'deviceSn', label: 'Serial do Dispositivo', type: 'string' },
    { key: 'deviceName', label: 'Nome do Dispositivo', type: 'string' },
    { key: 'enrollNumber', label: 'Número', type: 'string' },
    { key: 'employeeName', label: 'Nome', type: 'string' },
    { key: 'startTime', label: 'Hora de Início', type: 'Date' },
    { key: 'endTime', label: 'Hora de Término', type: 'Date' },
];

export const employeeCardFields = [
    { key: 'cardNumber', label: 'Número do Cartão', type: 'string' },
    { key: 'devicePassword', label: 'Senha do Dispositivo', type: 'number' },
    { key: 'devicePrivelage', label: 'Privilégio do Dispositivo', type: 'number' },
    { key: 'deviceEnabled', label: 'Dispositivo Activado', type: 'boolean' },
];

export const employeeFPFields = [
    { key: 'FPTmpIndex', label: 'Índice da Biometria Digital', type: 'number' },
    { key: 'FPTmpData', label: 'Dados da Biometria Digital', type: 'string' },
    { key: 'FPTmpLength', label: 'Comprimento da Biometria Digital', type: 'number' },
    { key: 'FPTmpFlag', label: 'Validade da Biometria Digital', type: 'number' },
];

export const employeeFaceFields = [
    { key: 'FaceTmpIndex', label: 'Índice da Biometria Facial', type: 'number' },
    { key: 'FaceTmpData', label: 'Dados da Biometria Facial', type: 'string' },
    { key: 'FaceTmpLength', label: 'Comprimento da Biometria Facial', type: 'number' },
];

export const adsFields = [
    { key: 'nomeArquivo', label: 'Nome do Arquivo', type: 'string' },
    { key: 'tipoArquivo', label: 'Tipo de Arquivo', type: 'number' },
    { key: 'creador', label: 'Criador', type: 'string' },
    { key: 'desativar', label: 'Desativar', type: 'boolean' },
    { key: 'urlArquivo', label: 'URL do Arquivo', type: 'string' },
    { key: 'ordem', label: 'Ordem', type: 'number' },
    { key: 'createDate', label: 'Data de Criação', type: 'Date' },
    { key: 'updateDate', label: 'Data de Atualização', type: 'Date' },
];

export const transactionFields = [
    { key: 'eventTime', label: 'Hora do Evento', type: 'Date' },
    { key: 'cardNo', label: 'Número do Cartão', type: 'number' },
    { key: 'eventName', label: 'Nome do Evento', type: 'string' },
    { key: 'eventId', label: 'ID do Evento', type: 'number' },
    { key: 'eventDoorId', label: 'ID da Porta do Evento', type: 'number' },
    { key: 'deviceSN', label: 'Nome do Dispositivo', type: 'string' },
    { key: 'createTime', label: 'Data de Criação', type: 'Date' },
    { key: 'updateTime', label: 'Data de Atualização', type: 'Date' },
];

export const transactionMBFields = [
    { key: 'transactionType', label: 'Tipo de Transação', type: 'number' },
    { key: 'amount', label: 'Valor', type: 'string' },
    { key: 'statusMessage', label: 'Mensagem de Status', type: 'string' },
    { key: 'clientTicket', label: 'Ticket do Cliente', type: 'string' },
    { key: 'merchantTicket', label: 'Ticket do Comerciante', type: 'string' },
    { key: 'email', label: 'Email', type: 'string' },
    { key: 'timestamp', label: 'Data e Hora', type: 'Date' },
    { key: 'tpId', label: 'Terminal', type: 'string' },
    { key: 'deviceSN', label: 'Nome do Dispositivo', type: 'string' },
];

export const transactionCardFields = [
    { key: 'cardNo', label: 'Número do Cartão', type: 'number' },
    { key: 'nameUser', label: 'Nome do Usuário', type: 'string' },
    { key: 'deviceSN', label: 'Nome do Dispositivo', type: 'string' },
    { key: 'eventName', label: 'Nome do Evento', type: 'string' },
    { key: 'eventDoorId', label: 'Nome da Porta', type: 'number' },
    { key: 'eventTime', label: 'Hora do Evento', type: 'Date' },
];

export const registerFields = [
    { key: 'name', label: 'Nome', type: 'string', required: true },
    { key: 'userName', label: 'Nome de Usuário', type: 'string', required: true },
    { key: 'email', label: 'E-Mail', type: 'string', required: true },
    { key: 'password', label: 'Senha', type: 'string', required: true },
    { key: 'confirmPassword', label: 'Confirmar Senha', type: 'string', required: true },
    { key: 'role', label: 'Tipo de Conta', type: 'string', required: true },
];

export const emailFields = [
    { key: 'usernameEmail', label: 'E-Mail do Utilizador', type: 'string', required: true },
    { key: 'passwordEmail', label: 'Senha do E-Mail', type: 'string', required: true },
    { key: 'hostSMTP', label: 'Servidor SMTP', type: 'string', required: true },
    { key: 'portSMTP', label: 'Porta SMTP', type: 'string', required: true },
    { key: 'enableSSL', label: 'Activar SSL', type: 'string', required: true },
];

export const emailCompanyFields = [
    { key: 'companyName', label: 'Nome da Empresa', type: 'string', required: true },
    { key: 'responsibleName', label: 'Nome do Responsável', type: 'string', required: true },
    { key: 'companyAddress', label: 'Morada da Empresa', type: 'string', required: true },
    { key: 'companyCity', label: 'Cidade da Empresa', type: 'string', required: true },
    { key: 'emailContact', label: 'E-Mail de Contacto', type: 'string', required: true },
    { key: 'language', label: 'Idioma', type: 'string', required: true },
];

export const emailAndCompanyFields = emailFields.concat(emailCompanyFields);

export const timePeriodFields = [
    { key: 'appId', label: 'ID', type: 'string' },
    { key: 'createrName', label: 'Nome do Criador', type: 'string', },
    { key: 'name', label: 'Nome', type: 'string', required: true },
    { key: 'remark', label: 'Observações', type: 'string' },
    { key: 'initFlag', label: 'Ativar Período', type: 'boolean', required: true },
    { key: 'mondayStart1', label: 'Segunda Início', type: 'string', required: true },
    { key: 'mondayEnd1', label: 'Segunda Fim', type: 'string', required: true },
    { key: 'mondayStart2', label: 'Monday Start 2', type: 'string', required: true },
    { key: 'mondayEnd2', label: 'Monday End 2', type: 'string', required: true },
    { key: 'mondayStart3', label: 'Monday Start 3', type: 'string', required: true },
    { key: 'mondayEnd3', label: 'Monday End 3', type: 'string', required: true },
    { key: 'tuesdayStart1', label: 'Terça Início', type: 'string', required: true },
    { key: 'tuesdayEnd1', label: 'Terça Fim', type: 'string', required: true },
    { key: 'tuesdayStart2', label: 'Tuesday Start 2', type: 'string', required: true },
    { key: 'tuesdayEnd2', label: 'Tuesday End 2', type: 'string', required: true },
    { key: 'tuesdayStart3', label: 'Tuesday Start 3', type: 'string', required: true },
    { key: 'tuesdayEnd3', label: 'Tuesday End 3', type: 'string', required: true },
    { key: 'wednesdayStart1', label: 'Quarta Início', type: 'string', required: true },
    { key: 'wednesdayEnd1', label: 'Quarta Fim', type: 'string', required: true },
    { key: 'wednesdayStart2', label: 'Wednesday Start 2', type: 'string', required: true },
    { key: 'wednesdayEnd2', label: 'Wednesday End 2', type: 'string', required: true },
    { key: 'wednesdayStart3', label: 'Wednesday Start 3', type: 'string', required: true },
    { key: 'wednesdayEnd3', label: 'Wednesday End 3', type: 'string', required: true },
    { key: 'thursdayStart1', label: 'Quinta Início', type: 'string', required: true },
    { key: 'thursdayEnd1', label: 'Quinta Fim', type: 'string', required: true },
    { key: 'thursdayStart2', label: 'Thursday Start 2', type: 'string', required: true },
    { key: 'thursdayEnd2', label: 'Thursday End 2', type: 'string', required: true },
    { key: 'thursdayStart3', label: 'Thursday Start 3', type: 'string', required: true },
    { key: 'thursdayEnd3', label: 'Thursday End 3', type: 'string', required: true },
    { key: 'fridayStart1', label: 'Sexta Início', type: 'string', required: true },
    { key: 'fridayEnd1', label: 'Sexta Fim', type: 'string', required: true },
    { key: 'fridayStart2', label: 'Friday Start 2', type: 'string', required: true },
    { key: 'fridayEnd2', label: 'Friday End 2', type: 'string', required: true },
    { key: 'fridayStart3', label: 'Friday Start 3', type: 'string', required: true },
    { key: 'fridayEnd3', label: 'Friday End 3', type: 'string', required: true },
    { key: 'saturdayStart1', label: 'Sábado Início', type: 'string', required: true },
    { key: 'saturdayEnd1', label: 'Sábado Fim', type: 'string', required: true },
    { key: 'saturdayStart2', label: 'Saturday Start 2', type: 'string', required: true },
    { key: 'saturdayEnd2', label: 'Saturday End 2', type: 'string', required: true },
    { key: 'saturdayStart3', label: 'Saturday Start 3', type: 'string', required: true },
    { key: 'saturdayEnd3', label: 'Saturday End 3', type: 'string', required: true },
    { key: 'sundayStart1', label: 'Domingo Início', type: 'string', required: true },
    { key: 'sundayEnd1', label: 'Domingo Fim', type: 'string', required: true },
    { key: 'sundayStart2', label: 'Sunday Start 2', type: 'string', required: true },
    { key: 'sundayEnd2', label: 'Sunday End 2', type: 'string', required: true },
    { key: 'sundayStart3', label: 'Sunday Start 3', type: 'string', required: true },
    { key: 'sundayEnd3', label: 'Sunday End 3', type: 'string', required: true },
    { key: 'holidayType1Start1', label: 'Feriado Início', type: 'string', required: true },
    { key: 'holidayType1End1', label: 'Feriado Fim', type: 'string', required: true },
    { key: 'holidayType1Start2', label: 'Holiday Type 1 Start 2', type: 'string', required: true },
    { key: 'holidayType1End2', label: 'Holiday Type 1 End 2', type: 'string', required: true },
    { key: 'holidayType1Start3', label: 'Holiday Type 1 Start 3', type: 'string', required: true },
    { key: 'holidayType1End3', label: 'Holiday Type 1 End 3', type: 'string', required: true },
    { key: 'holidayType2Start1', label: 'Holiday Type 2 Start 1', type: 'string', required: true },
    { key: 'holidayType2End1', label: 'Holiday Type 2 End 1', type: 'string', required: true },
    { key: 'holidayType2Start2', label: 'Holiday Type 2 Start 2', type: 'string', required: true },
    { key: 'holidayType2End2', label: 'Holiday Type 2 End 2', type: 'string', required: true },
    { key: 'holidayType2Start3', label: 'Holiday Type 2 Start 3', type: 'string', required: true },
    { key: 'holidayType2End3', label: 'Holiday Type 2 End 3', type: 'string', required: true },
    { key: 'holidayType3Start1', label: 'Holiday Type 3 Start 1', type: 'string', required: true },
    { key: 'holidayType3End1', label: 'Holiday Type 3 End 1', type: 'string', required: true },
    { key: 'holidayType3Start2', label: 'Holiday Type 3 Start 2', type: 'string', required: true },
    { key: 'holidayType3End2', label: 'Holiday Type 3 End 2', type: 'string', required: true },
    { key: 'holidayType3Start3', label: 'Holiday Type 3 Start 3', type: 'string', required: true },
    { key: 'holidayType3End3', label: 'Holiday Type 3 End 3', type: 'string', required: true }
];

export const doorFields = [
    { key: 'nrDoor', label: 'Número da Porta', type: 'number', required: true },
    { key: 'time', label: 'Tempo Aberta', type: 'number', required: true }
];

export const accessControlFields = [
    { key: 'employeesId', label: 'Funcionário', type: 'dropdown', required: true },
    { key: 'shortName', label: 'Nome Curto', type: 'string' },
    { key: 'enrollNumber', label: 'Número', type: 'string' },
    { key: 'doorId', label: 'Porta', type: 'dropdown', required: true },
    { key: 'doorName', label: 'Nome da Porta', type: 'string' },
    { key: 'timezoneId', label: 'Período', type: 'dropdown', required: true },
    { key: 'timezoneName', label: 'Nome do Fuso Horário', type: 'string' },
    { key: 'createrName', label: 'Nome do Criador', type: 'string', required: true },
    { key: 'createDate', label: 'Data de Criação', type: 'Date' },
    { key: 'updateDate', label: 'Data de Atualização', type: 'Date' },
];

export const doorsFields = [
    { key: 'companyId', label: 'ID da Empresa', type: 'string' },
    { key: 'createTime', label: 'Horário de Criação', type: 'date' },
    { key: 'createrCode', label: 'Código do Criador', type: 'string' },
    { key: 'createrId', label: 'ID do Criador', type: 'string' },
    { key: 'createrName', label: 'Name do Criador', type: 'string' },
    { key: 'opVersion', label: 'Versão Operacional', type: 'number' },
    { key: 'updateTime', label: 'Horário de Atualização', type: 'date' },
    { key: 'updaterCode', label: 'Código de Atualização', type: 'string' },
    { key: 'updaterId', label: 'ID de Atualização', type: 'string' },
    { key: 'updaterName', label: 'Nome de Atualização', type: 'string' },
    { key: 'actionInterval', label: 'Intervalo de Ação', type: 'number' },
    { key: 'activeTimesegId', label: 'ID de Tempo Activo', type: 'string' },
    { key: 'allowSuaccessLock', label: 'Permitir Trava de Acesso', type: 'string' },
    { key: 'backLock', label: 'Trava Traseira', type: 'string' },
    { key: 'combopenInterval', label: 'Intervalo de Abertura', type: 'number' },
    { key: 'delayOpenTime', label: 'Atraso de Tempo de Abertura', type: 'number' },
    { key: 'doorNo', label: 'Número da Porta', type: 'number' },
    { key: 'doorSensorStatus', label: 'Status de Sensor da Porta', type: 'number' },
    { key: 'enabled', label: 'Activo', type: 'boolean' },
    { key: 'extDelayDrivertime', label: 'Tempo de Atraso do Driver Externo', type: 'number' },
    { key: 'extDevId', label: 'ID de Dispositivo Externo', type: 'string' },
    { key: 'forcePwd', label: 'Forçar Senha', type: 'string' },
    { key: 'hostStatus', label: 'Status de Hospedagem', type: 'number' },
    { key: 'inApbDuration', label: 'Duração em APB', type: 'number' },
    { key: 'isDisableAudio', label: 'Desativar Audio', type: 'string' },
    { key: 'latchDoorType', label: 'Tipo de Trava da Porta', type: 'number' },
    { key: 'latchTimeOut', label: 'Tempo Limite da Trava', type: 'number' },
    { key: 'latchTimesegId', label: 'ID de Período da Trava', type: 'string' },
    { key: 'lockDelay', label: 'Atraso de Trava', type: 'number' },
    { key: 'name', label: 'Nome', type: 'string' },
    { key: 'passmodeTimesegId', label: 'ID de Período de Passagem', type: 'string' },
    { key: 'readerType', label: 'Tipo de Leitor', type: 'number' },
    { key: 'sexInputMode', label: 'Modo de Entrada de Sex', type: 'string' },
    { key: 'sexSupervisedResistor', label: 'Resistor Supervisionado de Sex', type: 'string' },
    { key: 'senInputMode', label: 'Modo de Entrada de Sen', type: 'string' },
    { key: 'senSupervisedResistor', label: 'Resistor Supervisionado de Sen', type: 'string' },
    { key: 'sensorDelay', label: 'Delay do Sensor', type: 'number' },
    { key: 'supperPwd', label: 'Senha Supper', type: 'string' },
    { key: 'verifyMode', label: 'Modo de Verificação', type: 'number' },
    { key: 'wgInputId', label: 'ID de Entrada WG', type: 'string' },
    { key: 'wgInputType', label: 'Tipo de Entrada WG', type: 'number' },
    { key: 'wgOutputId', label: 'ID de Saída WG', type: 'string' },
    { key: 'wgOutputType', label: 'Tipo de Saída WG', type: 'number' },
    { key: 'wgReversed', label: 'WG Inverso', type: 'number' },
    { key: 'devId', label: 'ID do Dispositivo', type: 'string' },
    { key: 'devSN', label: 'Serial do Dispositivo', type: 'string' },
];

export const mbDeviceFields = [
    { key: 'nomeQuiosque', label: 'Nome do Terminal', type: 'string', required: true },
    { key: 'estadoTerminal', label: 'Estado do Terminal', type: 'number' },
    { key: 'timeReboot', label: 'Tempo de Reinício', type: 'string' },
];

export const mbDeviceStatusFields = [
    { key: 'tipoStatus', label: 'Status', type: 'number' },
    { key: 'nomeStatus', label: 'Nome', type: 'string' },
    { key: 'timespam', label: 'Horário', type: 'date' },
];

export const mbDeviceCloseOpenFields = [
    { key: 'tpId', label: 'Dispositivo', type: 'string' },
    { key: 'timestamp', label: 'Horário', type: 'date' },
    { key: 'fechoImage', label: 'Fecho', type: 'string' },
    { key: 'aberturaImage', label: 'Abertura', type: 'string' },
];

const products = [
    'nclock', 'naccess', 'nvisitor', 'npark', 'ndoor', 'npatrol', 'ncard', 'nview', 'nsecur',
    'nsoftware', 'nsystem', 'napp', 'ncyber', 'ndigital', 'nserver', 'naut', 'nequip', 'nproject',
    'ncount', 'nbuild', 'ncaravan', 'nmechanic', 'nevents', 'nservice', 'ntask', 'nproduction',
    'nticket', 'nsales', 'ninvoice', 'ndoc', 'nsports', 'ngym', 'nschool', 'nclinic', 'noptics',
    'ngold', 'nsmart', 'nreality', 'nhologram', 'npower', 'ncharge', 'ncity', 'nkiosk', 'nled',
    'nfire', 'nfurniture', 'npartition', 'ndecor', 'nping', 'nconnect', 'nlight', 'ncomfort',
    'nsound', 'nhome'
];

const createLicenseFields = (products: string[]) => {
    const fields = [
        { key: 'entidadeNumber', label: 'Entidade Number', type: 'number' },
        { key: 'nif', label: 'NIF', type: 'number' }
    ];
    products.forEach(product => {
        fields.push(
            { key: `${product}.enable`, label: `${product} Enable`, type: 'switch' },
            { key: `${product}.users`, label: `${product} Users`, type: 'number' },
            { key: `${product}.validacao`, label: `${product} Validação`, type: 'number' },
            { key: `${product}.devices`, label: `${product} Devices`, type: 'number' },
            { key: `${product}.sn`, label: `${product} SN`, type: 'string' }
        );
    });

    return fields;
};

export const licenseFields = createLicenseFields(products);

export const entityFields = [
    { key: 'nome', label: 'Nome', type: 'string', required: true },
    { key: 'morada', label: 'Morada', type: 'string' },
    { key: 'cPostal', label: 'Código Postal', type: 'string' },
    { key: 'localidade', label: 'Localidade', type: 'string' },
    { key: 'telefone', label: 'Telefone', type: 'string' },
    { key: 'telemovel', label: 'Telemóvel', type: 'string' },
    { key: 'email', label: 'Email', type: 'string' },
    { key: 'nif', label: 'NIF', type: 'number', required: true },
    { key: 'www', label: 'Website', type: 'string' },
    { key: 'observacoes', label: 'Observações', type: 'string' },
    { key: 'logotipo', label: 'Logotipo', type: 'string' },
    { key: 'createdDate', label: 'Data de Criação', type: 'date' },
    { key: 'updatedDate', label: 'Data de Atualização', type: 'date' },
    { key: 'enabled', label: 'Ativo', type: 'boolean' }
];

export const recolhaMoedeiroFields = [
    { key: 'dataRecolha', label: 'Data da Recolha', type: 'datetime-local', required: true },
    { key: 'pessoaResponsavel', label: 'Pessoa Responsável', type: 'string', required: true },
    { key: 'numeroMoedas', label: 'Número de Moedas', type: 'number', required: true },
    { key: 'valorTotal', label: 'Valor Total', type: 'number', required: true },
];