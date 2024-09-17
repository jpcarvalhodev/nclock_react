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
    { label: 'Nome', key: 'companyName', type: 'string' },
    { label: 'NIF', key: 'companyNif', type: 'number' },
    { label: 'Morada', key: 'companyAddress', type: 'string' },
    { label: 'Localidade', key: 'companyLocality', type: 'string' },
    { label: 'Código Postal', key: 'companyZipCode', type: 'string' },
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
    { label: 'Data de Inserção', key: 'dateInserted', type: 'datetime-local', required: true},
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
    { key: 'attendanceTime', label: 'Data e Hora de presença', type: 'datetime-local', required: true},
    { key: 'deviceId', label: 'Dispositivo', type: 'dropdown' },
    { key: 'deviceNumber', label: 'Número do Dispositivo', type: 'number' },
    { key: 'employeeId', label: 'Funcionário', type: 'dropdown', required: true},
    { key: 'enrollNumber', label: 'Número', type: 'string' },
    { key: 'employeeName', label: 'Nome do Funcionário', type: 'string' },
    { key: 'inOutMode', label: 'Modo de Entrada/Saída', type: 'number' },
    { key: 'observation', label: 'Observação', type: 'string' },
    { key: 'type', label: 'Tipo', type: 'number' },
    { key: 'verifyMode', label: 'Modo de Verificação', type: 'number' },
    { key: 'workCode', label: 'Código', type: 'number' },
];

export const deviceFields = [
    { key: "deviceNumber", label: "Número", type: "number", required: true},
    { key: "deviceName", label: "Nome", type: "string", required: true},
    { key: "ipAddress", label: "Endereço IP", type: "string", required: true},
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
    { key: 'devicePassword', label: 'Senha do Dispositivo', type: 'string' },
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
    { key: 'id', label: 'ID', type: 'string' },
    { key: 'EventTime', label: 'Hora do Evento', type: 'Date' },
    { key: 'Pin', label: 'PIN', type: 'number' },
    { key: 'CardNo', label: 'Número do Cartão', type: 'number' },
    { key: 'EventName', label: 'Nome do Evento', type: 'string' },
    { key: 'EventId', label: 'ID do Evento', type: 'number' },
    { key: 'EventDoorId', label: 'ID da Porta do Evento', type: 'number' },
    { key: 'VerifyModeNo', label: 'Modo de Verificação', type: 'number' },
    { key: 'DeviceSN', label: 'Número de Série do Dispositivo', type: 'string' },
    { key: 'CreateTime', label: 'Data de Criação', type: 'Date' },
    { key: 'UpdateTime', label: 'Data de Atualização', type: 'Date' },
];