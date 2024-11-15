//*** campos de todos os modelos para usar no programa todo ***

export const employeeFields = [
    { label: 'Número', key: 'enrollNumber', type: 'string', required: true },
    { label: 'Nome', key: 'name', type: 'string', required: true },
    { label: 'Nome Abreviado', key: 'shortName', type: 'string', required: true },
    { label: 'Iniciais do Nome', key: 'nameAcronym', type: 'string' },
    { label: 'Comentários', key: 'comments', type: 'string' },
    { label: 'Foto', key: 'photo', type: 'string' },
    { label: 'Morada', key: 'address', type: 'string' },
    { label: 'Código Postal', key: 'ziPcode', type: 'string' },
    { label: 'Localidade', key: 'locality', type: 'string' },
    { label: 'Freguesia', key: 'village', type: 'string' },
    { label: 'Distrito', key: 'district', type: 'string' },
    { label: 'Telefone', key: 'phone', type: 'string' },
    { label: 'Telemóvel', key: 'mobile', type: 'string' },
    { label: 'E-Mail', key: 'email', type: 'string' },
    { label: 'Data de Nascimento', key: 'birthday', type: 'datetime-local' },
    { label: 'Nacionalidade', key: 'nationality', type: 'string' },
    { label: 'Gênero', key: 'gender', type: 'boolean' },
    { label: 'Número de BI', key: 'bInumber', type: 'string' },
    { label: 'Emissão de BI', key: 'bIissuance', type: 'datetime-local' },
    { label: 'Validade de BI', key: 'biValidity', type: 'datetime-local' },
    { label: 'NIF', key: 'nif', type: 'number' },
    { label: 'Data de Admissão', key: 'admissionDate', type: 'datetime-local' },
    { label: 'Data de Saída', key: 'exitDate', type: 'datetime-local' },
    { label: 'Autorização RGPD', key: 'rgpdAut', type: 'boolean' },
    { label: 'Estado', key: 'status', type: 'boolean' },
    { label: 'Estado de E-Mail', key: 'statusEmail', type: 'boolean' },
    { label: 'Estado de Digital', key: 'statusFprint', type: 'boolean' },
    { label: 'Estado de Face', key: 'statusFace', type: 'boolean' },
    { label: 'Estado de Palma', key: 'statusPalm', type: 'boolean' },
    { label: 'Tipo', key: 'type', type: 'string' },
    { label: 'Departamento', key: 'departmentId', type: 'dropdown' },
    { label: 'Profissão', key: 'professionId', type: 'dropdown' },
    { label: 'Categoria', key: 'categoryId', type: 'dropdown' },
    { label: 'Grupo', key: 'groupId', type: 'dropdown', },
    { label: 'Zona', key: 'zoneId', type: 'dropdown', },
    { label: 'Entidade Externa', key: 'externalEntityId', type: 'dropdown', },
    { label: 'Software', key: 'modulos', type: 'string', required: true },
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
    { label: 'Iniciais', key: 'acronym', type: 'string' },
];

export const externalEntityFields = [
    { label: 'Nome', key: 'name', type: 'string', required: true },
    { label: 'Comentários', key: 'comments', type: 'string' },
    { label: 'Nome Comercial', key: 'commercialName', type: 'string' },
    { label: 'Nome Responsável', key: 'responsibleName', type: 'string' },
    { label: 'Foto', key: 'photo', type: 'string' },
    { label: 'Morada', key: 'address', type: 'string' },
    { label: 'Código Postal', key: 'zipCode', type: 'string' },
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
    { key: 'acronym', label: 'Iniciais', type: 'string' },
];

export const zoneFields = [
    { key: 'type', label: 'Tipo', type: 'string' },
    { key: 'name', label: 'Nome', type: 'string', required: true },
    { key: 'description', label: 'Descrição', type: 'string' },
    { key: 'acronym', label: 'Iniciais', type: 'string', required: true },
    { key: 'photo', label: 'Foto', type: 'string' },
    { key: 'address', label: 'Morada', type: 'string' },
    { key: 'ziPcode', label: 'Código Postal', type: 'string' },
    { key: 'locality', label: 'Localidade', type: 'string' },
    { key: 'village', label: 'Freguesia', type: 'string' },
    { key: 'district', label: 'Distrito', type: 'string' },
    { key: 'phone', label: 'Telefone', type: 'string' },
    { key: 'mobile', label: 'Telemóvel', type: 'string' },
    { key: 'email', label: 'E-Mail', type: 'string' },
];

export const employeeAttendanceTimesFields = [
    { key: 'attendanceTime', label: 'Data e Hora de presença', type: 'date', required: true },
    { key: 'deviceId', label: 'Equipamento', type: 'dropdown' },
    { key: 'deviceNumber', label: 'Número do Equipamento', type: 'number' },
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
    { key: "model", label: "Modelo", type: "string", required: true },
    { key: "ipAddress", label: "Endereço IP", type: "string", required: true },
    { key: "port", label: "Porta", type: "number", required: true },
    { key: "photo", label: "Foto", type: "string" },
    { key: "code", label: "Código", type: "number" },
    { key: "platform", label: "Platforma", type: "string" },
    { key: "firmware", label: "Firmware", type: "string" },
    { key: "macAddress", label: "Endereço MAC", type: "string" },
    { key: "serialNumber", label: "Número Serial", type: "string", required: true },
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
    { key: "deviceProtocol", label: "Protocolo", type: "number", required: true },
    { key: "deviceType", label: "Tipo", type: "number", required: true },
    { key: "status", label: "Estado", type: "boolean" },
    { key: "enabled", label: "Activo", type: "boolean" }
];

export const employeeDeviceFields = [
    { key: 'deviceNumber', label: 'Número do Dispositivo', type: 'number' },
    { key: 'deviceSn', label: 'Serial do Equipamento', type: 'string' },
    { key: 'deviceName', label: 'Nome do Equipamento', type: 'string' },
    { key: 'enrollNumber', label: 'Número', type: 'string' },
    { key: 'employeeName', label: 'Nome', type: 'string' },
    { key: 'startTime', label: 'Hora de Início', type: 'Date' },
    { key: 'endTime', label: 'Hora de Término', type: 'Date' },
];

export const employeeCardFields = [
    { key: 'cardNumber', label: 'Número do Cartão', type: 'string' },
    { key: 'devicePassword', label: 'Password do Equipamento', type: 'number' },
    { key: 'devicePrivelage', label: 'Privilégio do Equipamento', type: 'number' },
    { key: 'deviceEnabled', label: 'Equipamento Activado', type: 'boolean' },
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
    { key: 'tempoExecucaoImagens', label: 'Tempo de Execução', type: 'number' },
    { key: 'dataFim', label: 'Data para Encerrar', type: 'Date' },
];

export const transactionFields = [
    { key: 'eventTime', label: 'Hora do Evento', type: 'Date' },
    { key: 'cardNo', label: 'Número do Cartão', type: 'number' },
    { key: 'eventName', label: 'Nome do Evento', type: 'string' },
    { key: 'eventId', label: 'ID do Evento', type: 'number' },
    { key: 'eventDoorId', label: 'ID da Porta do Evento', type: 'number' },
    { key: 'deviceSN', label: 'Nome do Local', type: 'string' },
    { key: 'createTime', label: 'Data de Criação', type: 'Date' },
    { key: 'updateTime', label: 'Data de Atualização', type: 'Date' },
];

export const transactionMBFields = [
    { key: 'transactionType', label: 'Tipo de Transação', type: 'number' },
    { key: 'amount', label: 'Valor', type: 'string' },
    { key: 'statusMessage', label: 'Mensagem de Estado', type: 'string' },
    { key: 'clientTicket', label: 'Ticket do Cliente', type: 'string' },
    { key: 'merchantTicket', label: 'Ticket do Comerciante', type: 'string' },
    { key: 'email', label: 'Email', type: 'string' },
    { key: 'timestamp', label: 'Data e Hora', type: 'Date' },
    { key: 'tpId', label: 'Terminal', type: 'string' },
    { key: 'deviceSN', label: 'Nome do Local', type: 'string' },
];

export const transactionCardFields = [
    { key: 'cardNo', label: 'Número do Cartão', type: 'number' },
    { key: 'nameUser', label: 'Nome do Utilizador', type: 'string' },
    { key: 'deviceSN', label: 'Nome do Local', type: 'string' },
    { key: 'eventName', label: 'Nome do Evento', type: 'string' },
    { key: 'eventDoorId', label: 'Nome', type: 'number' },
    { key: 'eventTime', label: 'Hora do Evento', type: 'Date' },
];

export const registerFields = [
    { key: 'name', label: 'Nome', type: 'string', required: true },
    { key: 'userName', label: 'Nome do Utilizador', type: 'string', required: true },
    { key: 'emailAddress', label: 'E-Mail', type: 'string', required: true },
    { key: 'password', label: 'Password', type: 'string' },
    { key: 'confirmPassword', label: 'Confirmar Password', type: 'string' },
    { key: 'roles', label: 'Tipo de Conta', type: 'string' },
    { key: 'profileImage', label: 'Foto', type: 'string' },
];

export const emailFields = [
    { key: 'usernameEmail', label: 'E-Mail do Utilizador', type: 'string', required: true },
    { key: 'passwordEmail', label: 'Password do E-Mail', type: 'string', required: true },
    { key: 'hostSMTP', label: 'Servidor SMTP', type: 'string', required: true },
    { key: 'portSMTP', label: 'Porta SMTP', type: 'string', required: true },
    { key: 'enableSSL', label: 'Activar SSL', type: 'string' },
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
    { key: 'actionInterval', label: 'Intervalo entre Operações', type: 'number' },
    { key: 'activeTimesegId', label: 'Faixa Horária Activa', type: 'string' },
    { key: 'allowSuaccessLock', label: 'Permitir Acesso de SU ao Bloqueio', type: 'boolean' },
    { key: 'backLock', label: 'Estado da Fechadura', type: 'boolean' },
    { key: 'combopenInterval', label: 'Intervalo entre Identificações', type: 'number' },
    { key: 'delayOpenTime', label: 'Atraso de Tempo de Abertura', type: 'number' },
    { key: 'doorNo', label: 'Número de Porta', type: 'number', readonly: true, required: true },
    { key: 'doorSensorStatus', label: 'Tipo de Sensor de Porta', type: 'number' },
    { key: 'enabled', label: 'Activo', type: 'boolean' },
    { key: 'extDevId', label: 'Dispositivo Externo', type: 'string' },
    { key: 'forcePwd', label: 'Password de Coação', type: 'string' },
    { key: 'inApbDuration', label: 'Duração do Antirretorno da Fechadura', type: 'number' },
    { key: 'lockDelay', label: 'Duração da Abertura da Fechadura', type: 'number' },
    { key: 'name', label: 'Nome', type: 'string', required: true },
    { key: 'passmodeTimesegId', label: 'Faixa Horária do Modo de Passagem', type: 'string' },
    { key: 'sensorDelay', label: 'Atraso do Sensor de Porta', type: 'number' },
    { key: 'supperPwd', label: 'Password de Emergência', type: 'string' },
    { key: 'verifyMode', label: 'Modo de Verificação', type: 'number', required: true },
    { key: 'devId', label: 'Equipamento', type: 'string' },
    { key: 'timezoneId', label: 'Período', type: 'string' },
];

export const mbDeviceFields = [
    { key: 'nomeQuiosque', label: 'Nome', type: 'string', required: true },
    { key: 'modelo', label: 'Modelo', type: 'string' },
    { key: 'estadoTerminal', label: 'Estado do Terminal', type: 'number' },
    { key: 'timeReboot', label: 'Tempo de Reinício', type: 'string' },
];

export const mbDeviceStatusFields = [
    { key: 'tpId', label: 'Terminal', type: 'string' },
    { key: 'tipoStatus', label: 'Estado', type: 'number' },
    { key: 'nomeStatus', label: 'Alerta', type: 'string' },
    { key: 'timespam', label: 'Horário', type: 'date' },
];

export const mbDeviceCloseOpenFields = [
    { key: 'tpId', label: 'Terminal', type: 'string' },
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

export const recolhaMoedeiroEContadorFields = [
    { key: 'dataRecolha', label: 'Data de Início', type: 'date' },
    { key: 'pessoaResponsavel', label: 'Nome do Utilizador', type: 'string' },
    { key: 'numeroMoedas', label: 'Moedas Recolhidas', type: 'number', required: true },
    { key: 'numeroMoedasSistema', label: 'Moedas Sistema', type: 'number' },
    { key: 'valorTotalRecolhido', label: 'Valor Recolhido', type: 'number' },
    { key: 'valorTotalSistema', label: 'Valor Sistema', type: 'number' },
    { key: 'diferencaMoedas', label: 'Diferença Moedas', type: 'number' },
    { key: 'diferencaEuros', label: 'Diferença Valor', type: 'number' },
    { key: 'observacoes', label: 'Observações', type: 'string' },
    { key: 'deviceID', label: 'Nome do Local', type: 'string', required: true },
    { key: 'dataFimRecolha', label: 'Data da Recolha', type: 'date' },
];

export const manualOpenDoorFields = [
    { key: 'createdDate', label: 'Data de Criação', type: 'date' },
    { key: 'nomeResponsavel', label: 'Nome do Utilizador', type: 'string' },
    { key: 'nomeEvento', label: 'Nome do Evento', type: 'string' },
    { key: 'observacoes', label: 'Observações', type: 'string' },
    { key: 'deviceName', label: 'Nome do Local', type: 'string' },
    { key: 'doorName', label: 'Nome', type: 'string' },
];

export const limpezasEOcorrenciasFields = [
    { key: 'dataCreate', label: 'Data de Criação', type: 'date' },
    { key: 'responsavel', label: 'Nome do Utilizador', type: 'string', required: true },
    { key: 'observacoes', label: 'Observações', type: 'string' },
    { key: 'deviceId', label: 'Equipamento', type: 'string', required: true },
    { key: 'deviceName', label: 'Nome do Local', type: 'string' },
];

export const logsFields = [
    { key: 'userName', label: 'Nome do Utilizador', type: 'string' },
    { key: 'description', label: 'Descrição', type: 'string' },
    { key: 'createdDate', label: 'Data de Criação', type: 'date' },
];

export const cameraFields = [
    { key: 'numeroCamera', label: 'Número', type: 'number', required: true },
    { key: 'nomeCamera', label: 'Nome', type: 'string', required: true },
    { key: 'ip', label: 'IP', type: 'string', required: true },
    { key: 'url', label: 'URL', type: 'string', required: true },
    { key: 'userCamera', label: 'Utilizador', type: 'string', required: true },
    { key: 'passwordCamera', label: 'Password', type: 'string', required: true },
    { key: 'createdDate', label: 'Data de Criação', type: 'date' },
    { key: 'updatedDate', label: 'Data de Atualização', type: 'date' },
];

export const employeesOnDeviceFields = [
    { key: 'pin', label: 'Número', type: 'string' },
    { key: 'name', label: 'Nome', type: 'string' },
    { key: 'cardno', label: 'Número do Cartão', type: 'string' },
];

export const kioskConfigFields = [
    { key: 'amount', label: 'Valor', type: 'number', required: true },
    { key: 'totalMoedas', label: 'Total de Moedas', type: 'number', required: true },
    { key: 'emails', label: 'E-Mails', type: 'string', required: true },
];