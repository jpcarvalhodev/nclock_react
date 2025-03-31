//*** campos de todos os modelos para usar no software ***

export const employeeFields = [
  { label: "Número", key: "enrollNumber", type: "string", required: true },
  { label: "Nome", key: "name", type: "string", required: true },
  { label: "Nome Abreviado", key: "shortName", type: "string", required: true },
  { label: "Iniciais do Nome", key: "nameAcronym", type: "string" },
  { label: "Comentários", key: "comments", type: "string" },
  { label: "Foto", key: "photo", type: "string" },
  { label: "Morada", key: "address", type: "string" },
  { label: "Código Postal", key: "ziPcode", type: "string" },
  { label: "Localidade", key: "locality", type: "string" },
  { label: "Freguesia", key: "village", type: "string" },
  { label: "Distrito", key: "district", type: "string" },
  { label: "Telefone", key: "phone", type: "string" },
  { label: "Telemóvel", key: "mobile", type: "string" },
  { label: "E-Mail", key: "email", type: "string" },
  { label: "Data de Nascimento", key: "birthday", type: "datetime-local" },
  { label: "Nacionalidade", key: "nationality", type: "string" },
  { label: "Gênero", key: "gender", type: "boolean" },
  { label: "Cartão EU", key: "bInumber", type: "string" },
  { label: "Emissão do Cartão", key: "bIissuance", type: "datetime-local" },
  { label: "Validade do Cartão", key: "biValidity", type: "datetime-local" },
  { label: "NIF", key: "nif", type: "number" },
  { label: "Data de Admissão", key: "admissionDate", type: "datetime-local" },
  { label: "Data de Saída", key: "exitDate", type: "datetime-local" },
  { label: "Autorização RGPD", key: "rgpdAut", type: "boolean" },
  { label: "Estado", key: "status", type: "boolean" },
  { label: "Estado de E-Mail", key: "statusEmail", type: "boolean" },
  { label: "Estado de Digital", key: "statusFprint", type: "boolean" },
  { label: "Estado de Face", key: "statusFace", type: "boolean" },
  { label: "Estado de Palma", key: "statusPalm", type: "boolean" },
  { label: "Tipo", key: "type", type: "string" },
  { label: "Cartão", key: "cardNumber", type: "string" },
  { label: "Entidade", key: "entidadeId", type: "dropdown" },
  {
    label: "Departamento",
    key: "departmentId",
    type: "dropdown",
    required: true,
  },
  { label: "Profissão", key: "professionId", type: "dropdown" },
  { label: "Categoria", key: "categoryId", type: "dropdown" },
  { label: "Grupo", key: "groupId", type: "dropdown", required: true },
  { label: "Zona", key: "zoneId", type: "dropdown" },
  { label: "Entidade Externa", key: "externalEntityId", type: "dropdown" },
  { label: "Plano de Acesso", key: "accPlanoAcessoId", type: "dropdown" },
];

export const departmentFields = [
  { label: "Código", key: "code", type: "number", required: true },
  { label: "Nome", key: "name", type: "string", required: true },
  { label: "Descrição", key: "description", type: "string" },
  { label: "Departamento Pai", key: "paiId", type: "dropdown" },
];

export const categoryFields = [
  { label: "Código", key: "code", type: "number", required: true },
  { label: "Descrição", key: "description", type: "string", required: true },
  { label: "Iniciais", key: "acronym", type: "string" },
];

export const externalEntityFields = [
  { label: "Nome", key: "name", type: "string", required: true },
  { label: "Comentários", key: "comments", type: "string" },
  { label: "Nome Comercial", key: "commercialName", type: "string" },
  { label: "Nome Responsável", key: "responsibleName", type: "string" },
  { label: "Foto", key: "photo", type: "string" },
  { label: "Morada", key: "address", type: "string" },
  { label: "Código Postal", key: "zipCode", type: "string" },
  { label: "Localidade", key: "locality", type: "string" },
  { label: "Freguesia", key: "village", type: "string" },
  { label: "Distrito", key: "district", type: "string" },
  { label: "Telefone", key: "phone", type: "number" },
  { label: "Telemóvel", key: "mobile", type: "number" },
  { label: "E-Mail", key: "email", type: "string" },
  { label: "WWW", key: "www", type: "string" },
  { label: "Fax", key: "fax", type: "number" },
  { label: "NIF", key: "nif", type: "number", required: true },
  { label: "Data Inserida", key: "dateInserted", type: "datetime-local" },
  { label: "Data Atualizada", key: "dateUpdated", type: "datetime-local" },
  { label: "Tipo", key: "externalEntityTypeId", type: "dropdown" },
];

export const externalEntityTypeFields = [
  { label: "Ordem", key: "order", type: "number", required: true },
  { label: "Nome", key: "name", type: "string", required: true },
  {
    label: "Data",
    key: "dateInserted",
    type: "datetime-local",
    required: true,
  },
];

export const groupFields = [
  { key: "name", label: "Nome", type: "string", required: true },
  { key: "description", label: "Descrição", type: "string" },
];

export const professionFields = [
  { key: "code", label: "Código", type: "number", required: true },
  { key: "description", label: "Descrição", type: "string", required: true },
  { key: "acronym", label: "Iniciais", type: "string" },
];

export const zoneFields = [
  { key: "type", label: "Tipo", type: "string" },
  { key: "name", label: "Nome", type: "string", required: true },
  { key: "description", label: "Descrição", type: "string" },
  { key: "acronym", label: "Iniciais", type: "string", required: true },
  { key: "photo", label: "Foto", type: "string" },
  { key: "address", label: "Morada", type: "string" },
  { key: "ziPcode", label: "Código Postal", type: "string" },
  { key: "locality", label: "Localidade", type: "string" },
  { key: "village", label: "Freguesia", type: "string" },
  { key: "district", label: "Distrito", type: "string" },
  { key: "phone", label: "Telefone", type: "string" },
  { key: "mobile", label: "Telemóvel", type: "string" },
  { key: "email", label: "E-Mail", type: "string" },
];

export const employeeAttendanceTimesFields = [
  {
    key: "attendanceTime",
    label: "Data",
    type: "datetime-local",
    required: true,
  },
  { key: "enrollNumber", label: "Número", type: "string" },
  {
    key: "employeeId",
    label: "Nome do Funcionário",
    type: "dropdown",
    required: true,
  },
  { key: "employeeName", label: "Nome do Funcionário", type: "string" },
  { key: "inOutMode", label: "Tipo", type: "number" },
  { key: "observation", label: "Observação", type: "string" },
  { key: "type", label: "Tipo", type: "number" },
  { key: "workCode", label: "Código", type: "number" },
  { key: "deviceId", label: "Equipamento", type: "dropdown" },
  { key: "deviceNumber", label: "Nº do Equipamento", type: "number" },
];

export const deviceFields = [
  { key: "deviceNumber", label: "Número", type: "number", required: true },
  { key: "deviceName", label: "Nome", type: "string", required: true },
  { key: "status", label: "Estado", type: "boolean" },
  { key: "model", label: "Modelo", type: "string" },
  { key: "ipAddress", label: "Endereço IP", type: "string" },
  { key: "port", label: "Porta", type: "number" },
  { key: "photo", label: "Foto", type: "string" },
  { key: "code", label: "Código", type: "number" },
  { key: "platform", label: "Platforma", type: "string" },
  { key: "firmware", label: "Firmware", type: "string" },
  { key: "macAddress", label: "Endereço MAC", type: "string" },
  { key: "serialNumber", label: "Nº Serial", type: "string" },
  { key: "readerCount", label: "Contagem no Leitor", type: "number" },
  { key: "auxInCount", label: "Contagem de Entrada", type: "number" },
  { key: "auxOutCount", label: "Contagem de Saída", type: "number" },
  {
    key: "maxUserCount",
    label: "Contagem Máxima de Utilizadores",
    type: "number",
  },
  {
    key: "maxAttLogCount",
    label: "Contagem Máxima de Atualizações de Log",
    type: "number",
  },
  {
    key: "maxFingerCount",
    label: "Contagem Máxima de Digitais",
    type: "number",
  },
  {
    key: "maxUserFingerCount",
    label: "Contagem Máxima de Digitais de Utilizadores",
    type: "number",
  },
  { key: "faceAlg", label: "Algoritmo Facial", type: "number" },
  { key: "fpAlg", label: "Algoritmo de Digitais", type: "number" },
  { key: "productTime", label: "Tempo de Produção", type: "Date" },
  { key: "producter", label: "Produtor", type: "string" },
  { key: "deviceProtocol", label: "Protocolo", type: "number" },
  { key: "deviceType", label: "Tipo", type: "number" },
  { key: "enabled", label: "Activo", type: "boolean" },
];

export const employeeDeviceFields = [
  { key: "deviceNumber", label: "Nº do Dispositivo", type: "number" },
  { key: "deviceSn", label: "Serial do Equipamento", type: "string" },
  { key: "deviceName", label: "Nome do Equipamento", type: "string" },
  { key: "enrollNumber", label: "Nº", type: "string" },
  { key: "employeeName", label: "Nome", type: "string" },
  { key: "startTime", label: "Hora de Início", type: "Date" },
  { key: "endTime", label: "Hora de Término", type: "Date" },
];

export const employeeCardFields = [
  { key: "cardNumber", label: "Nº do Cartão", type: "string" },
  { key: "devicePassword", label: "Password do Equipamento", type: "number" },
  {
    key: "devicePrivelage",
    label: "Privilégio do Equipamento",
    type: "number",
  },
];

export const employeeFPFields = [
  { key: "FPTmpIndex", label: "Índice da Biometria Digital", type: "number" },
  { key: "FPTmpData", label: "Dados da Biometria Digital", type: "string" },
  {
    key: "FPTmpLength",
    label: "Comprimento da Biometria Digital",
    type: "number",
  },
  { key: "FPTmpFlag", label: "Validade da Biometria Digital", type: "number" },
];

export const employeeFaceFields = [
  { key: "FaceTmpIndex", label: "Índice da Biometria Facial", type: "number" },
  { key: "FaceTmpData", label: "Dados da Biometria Facial", type: "string" },
  {
    key: "FaceTmpLength",
    label: "Comprimento da Biometria Facial",
    type: "number",
  },
];

export const adsFields = [
  { key: "createDate", label: "Data de Criação", type: "Date" },
  { key: "nomeArquivo", label: "Nome do Arquivo", type: "string" },
  { key: "tipoArquivo", label: "Tipo de Arquivo", type: "number" },
  { key: "creador", label: "Criador", type: "string" },
  { key: "desativar", label: "Desativar", type: "boolean" },
  { key: "urlArquivo", label: "URL do Arquivo", type: "string" },
  { key: "ordem", label: "Ordem", type: "number" },
  { key: "tempoExecucaoImagens", label: "Tempo de Execução", type: "number" },
  { key: "dataFim", label: "Data para Encerrar", type: "Date" },
  { key: "updateDate", label: "Data de Atualização", type: "Date" },
];

export const transactionFields = [
  { key: "eventTime", label: "Data", type: "Date" },
  { key: "cardNo", label: "Nº do Cartão", type: "number" },
  { key: "eventName", label: "Nome do Evento", type: "string" },
  { key: "eventId", label: "Evento", type: "number" },
  { key: "eventDoorId", label: "Tipo", type: "number" },
  { key: "deviceSN", label: "Nome do Local", type: "string" },
  { key: "createTime", label: "Data de Criação", type: "Date" },
  { key: "updateTime", label: "Data de Atualização", type: "Date" },
];

export const transactionMBFields = [
  { key: "transactionType", label: "Tipo de Transação", type: "number" },
  { key: "amount", label: "Valor", type: "string" },
  { key: "statusMessage", label: "Mensagem de Estado", type: "string" },
  { key: "clientTicket", label: "Ticket do Cliente", type: "string" },
  { key: "merchantTicket", label: "Ticket do Comerciante", type: "string" },
  { key: "email", label: "Email", type: "string" },
  { key: "timestamp", label: "Data", type: "Date" },
  { key: "tpId", label: "Terminal", type: "string" },
  { key: "deviceSN", label: "Nome do Local", type: "string" },
];

export const transactionCardFields = [
  { key: "eventDoorId", label: "Tipo de Transação", type: "number" },
  { key: "pin", label: "Nº do Utilizador", type: "number" },
  { key: "cardNo", label: "Nº do Cartão", type: "number" },
  { key: "nameUser", label: "Nome do Utilizador", type: "string" },
  { key: "eventName", label: "Nome do Evento", type: "string" },
  { key: "deviceSN", label: "Nome do Local", type: "string" },
  { key: "eventTime", label: "Data", type: "Date" },
];

export const registerFields = [
  { key: "name", label: "Nome", type: "string", required: true },
  {
    key: "userName",
    label: "Nome do Utilizador",
    type: "string",
    required: true,
  },
  { key: "emailAddress", label: "E-Mail", type: "string", required: true },
  { key: "password", label: "Password", type: "string" },
  { key: "confirmPassword", label: "Confirmar Password", type: "string" },
  { key: "roles", label: "Tipo de Conta", type: "string", required: true },
  { key: "profileImage", label: "Foto", type: "string" },
];

export const emailFields = [
  {
    key: "usernameEmail",
    label: "E-Mail do Utilizador",
    type: "string",
    required: true,
  },
  {
    key: "passwordEmail",
    label: "Password do E-Mail",
    type: "string",
    required: true,
  },
  { key: "hostSMTP", label: "Servidor SMTP", type: "string", required: true },
  { key: "portSMTP", label: "Porta SMTP", type: "string", required: true },
  { key: "enableSSL", label: "Activar SSL", type: "string" },
];

export const emailCompanyFields = [
  {
    key: "companyName",
    label: "Nome da Empresa",
    type: "string",
    required: true,
  },
  {
    key: "responsibleName",
    label: "Nome do Responsável",
    type: "string",
    required: true,
  },
  {
    key: "companyAddress",
    label: "Morada da Empresa",
    type: "string",
    required: true,
  },
  {
    key: "companyCity",
    label: "Cidade da Empresa",
    type: "string",
    required: true,
  },
  {
    key: "emailContact",
    label: "E-Mail de Contacto",
    type: "string",
    required: true,
  },
  { key: "language", label: "Idioma", type: "string", required: true },
];

export const emailAndCompanyFields = emailFields.concat(emailCompanyFields);

export const timePeriodFields = [
  { key: "appId", label: "ID", type: "string" },
  { key: "createrName", label: "Nome do Criador", type: "string" },
  { key: "name", label: "Nome", type: "string", required: true },
  { key: "remark", label: "Observações", type: "string" },
  { key: "initFlag", label: "Ativar Período", type: "boolean" },
  { key: "mondayStart1", label: "Segunda Início", type: "string" },
  { key: "mondayEnd1", label: "Segunda Fim", type: "string" },
  { key: "mondayStart2", label: "Segunda Início 2", type: "string" },
  { key: "mondayEnd2", label: "Segunda Fim 2", type: "string" },
  { key: "mondayStart3", label: "Segunda Início 3", type: "string" },
  { key: "mondayEnd3", label: "Segunda Fim 3", type: "string" },
  { key: "tuesdayStart1", label: "Terça Início", type: "string" },
  { key: "tuesdayEnd1", label: "Terça Fim", type: "string" },
  { key: "tuesdayStart2", label: "Terça Início 2", type: "string" },
  { key: "tuesdayEnd2", label: "Terça Fim 2", type: "string" },
  { key: "tuesdayStart3", label: "Terça Início 3", type: "string" },
  { key: "tuesdayEnd3", label: "Terça Fim 3", type: "string" },
  { key: "wednesdayStart1", label: "Quarta Início", type: "string" },
  { key: "wednesdayEnd1", label: "Quarta Fim", type: "string" },
  { key: "wednesdayStart2", label: "Quarta Início 2", type: "string" },
  { key: "wednesdayEnd2", label: "Quarta Fim 2", type: "string" },
  { key: "wednesdayStart3", label: "Quarta Início 3", type: "string" },
  { key: "wednesdayEnd3", label: "Quarta Fim 3", type: "string" },
  { key: "thursdayStart1", label: "Quinta Início", type: "string" },
  { key: "thursdayEnd1", label: "Quinta Fim", type: "string" },
  { key: "thursdayStart2", label: "Quinta Início 2", type: "string" },
  { key: "thursdayEnd2", label: "Quinta Fim 2", type: "string" },
  { key: "thursdayStart3", label: "Quinta Início 3", type: "string" },
  { key: "thursdayEnd3", label: "Quinta Fim 3", type: "string" },
  { key: "fridayStart1", label: "Sexta Início", type: "string" },
  { key: "fridayEnd1", label: "Sexta Fim", type: "string" },
  { key: "fridayStart2", label: "Sexta Início 2", type: "string" },
  { key: "fridayEnd2", label: "Sexta Fim 2", type: "string" },
  { key: "fridayStart3", label: "Sexta Início 3", type: "string" },
  { key: "fridayEnd3", label: "Sexta Fim 3", type: "string" },
  { key: "saturdayStart1", label: "Sábado Início", type: "string" },
  { key: "saturdayEnd1", label: "Sábado Fim", type: "string" },
  { key: "saturdayStart2", label: "Sábado Início 2", type: "string" },
  { key: "saturdayEnd2", label: "Sábado Fim 2", type: "string" },
  { key: "saturdayStart3", label: "Sábado Início 3", type: "string" },
  { key: "saturdayEnd3", label: "Sábado Fim 3", type: "string" },
  { key: "sundayStart1", label: "Domingo Início", type: "string" },
  { key: "sundayEnd1", label: "Domingo Fim", type: "string" },
  { key: "sundayStart2", label: "Domingo Início 2", type: "string" },
  { key: "sundayEnd2", label: "Domingo Fim 2", type: "string" },
  { key: "sundayStart3", label: "Domingo Início 3", type: "string" },
  { key: "sundayEnd3", label: "Domingo Fim 3", type: "string" },
  { key: "holidayType1Start1", label: "Feriado Início", type: "string" },
  { key: "holidayType1End1", label: "Feriado Fim", type: "string" },
  {
    key: "holidayType1Start2",
    label: "Feriado Início 2",
    type: "string",
  },
  { key: "holidayType1End2", label: "Feriado Fim 2", type: "string" },
  {
    key: "holidayType1Start3",
    label: "Feriado Início 3",
    type: "string",
  },
  { key: "holidayType1End3", label: "Feriado Fim 3", type: "string" },
  {
    key: "holidayType2Start1",
    label: "Feriado 2 Início 1",
    type: "string",
  },
  { key: "holidayType2End1", label: "Feriado 2 Fim 1", type: "string" },
  {
    key: "holidayType2Start2",
    label: "Feriado 2 Início 2",
    type: "string",
  },
  { key: "holidayType2End2", label: "Feriado 2 Fim 2", type: "string" },
  {
    key: "holidayType2Start3",
    label: "Feriado 2 Início 3",
    type: "string",
  },
  { key: "holidayType2End3", label: "Feriado 2 Fim 3", type: "string" },
  {
    key: "holidayType3Start1",
    label: "Feriado 3 Início 1",
    type: "string",
  },
  { key: "holidayType3End1", label: "Feriado 3 Fim 1", type: "string" },
  {
    key: "holidayType3Start2",
    label: "Feriado 3 Início 2",
    type: "string",
  },
  { key: "holidayType3End2", label: "Feriado 3 Fim 2", type: "string" },
  {
    key: "holidayType3Start3",
    label: "Feriado 3 Início 3",
    type: "string",
  },
  { key: "holidayType3End3", label: "Feriado 3 Fim 3", type: "string" },
];

export const doorFields = [
  { key: "nrDoor", label: "Nº da Porta", type: "number", required: true },
  { key: "time", label: "Tempo Aberta", type: "number", required: true },
];

export const accessControlFields = [
  { key: "nome", label: "Nome", type: "string" },
  { key: "tipo", label: "Tipo", type: "number" },
  { key: "tipoVerificacao", label: "Tipo de Verificação", type: "number" },
  { key: "verificacaoFixa", label: "Verificação Fixa", type: "boolean" },
  { key: "dataInicio", label: "Data de Início", type: "Date" },
  { key: "dataFim", label: "Data de Fim", type: "Date" },
  { key: "opc", label: "OPC", type: "number" },
  { key: "activo", label: "Activo", type: "boolean" },
  {
    key: "saldoZonaCarregamento",
    label: "Saldo na Zona de Carregamento",
    type: "boolean",
  },
  {
    key: "saldoZonaLotacao",
    label: "Saldo na Zona de Lotação",
    type: "boolean",
  },
  { key: "asWithAc", label: "AS com AC", type: "boolean" },
  { key: "acOutWithAs", label: "AC Saída com AS", type: "boolean" },
  { key: "acOutWithAsOffset", label: "Offset AC Saída com AS", type: "number" },
  { key: "masterOnline", label: "Master Online", type: "boolean" },
  {
    key: "respAuthOnline",
    label: "Resposta Autorização Online",
    type: "boolean",
  },
  {
    key: "respAuthOnlineOffset",
    label: "Offset de Resposta Online",
    type: "number",
  },
  { key: "acGrpHR", label: "Grupo de AC HR", type: "boolean" },
  { key: "OConfig", label: "Configuração", type: "string" },
  { key: "createdDate", label: "Data de Criação", type: "Date" },
  { key: "rem", label: "REM", type: "boolean" },
];

export const planosAcessoDispositivosFields = [
  { key: "nomePlanoAcesso", label: "Plano de Acesso", type: "string" },
  { key: "nomeTerminal", label: "Terminal", type: "string" },
  { key: "nomePlanoHorario", label: "Plano de Horário", type: "string" },
  { key: "nivel", label: "Nível", type: "string" },
  { key: "nomePorta", label: "Portas", type: "string" },
];

export const doorsFields = [
  { key: "actionInterval", label: "Intervalo entre Operações", type: "number" },
  { key: "activeTimesegId", label: "Faixa Horária Activa", type: "string" },
  {
    key: "allowSuaccessLock",
    label: "Permitir Acesso de SU ao Bloqueio",
    type: "boolean",
  },
  { key: "backLock", label: "Estado da Fechadura", type: "boolean" },
  {
    key: "combopenInterval",
    label: "Intervalo entre Identificações",
    type: "number",
  },
  {
    key: "delayOpenTime",
    label: "Atraso de Tempo de Abertura",
    type: "number",
  },
  {
    key: "doorNo",
    label: "Nº Porta",
    type: "number",
    readonly: true,
    required: true,
  },
  { key: "doorSensorStatus", label: "Tipo de Sensor de Porta", type: "number" },
  { key: "enabled", label: "Activo", type: "boolean" },
  { key: "extDevId", label: "Dispositivo Externo", type: "string" },
  { key: "forcePwd", label: "Password de Coação", type: "string" },
  {
    key: "inApbDuration",
    label: "Duração do Antirretorno da Fechadura",
    type: "number",
  },
  {
    key: "lockDelay",
    label: "Duração da Abertura da Fechadura",
    type: "number",
  },
  { key: "name", label: "Nome Porta", type: "string", required: true },
  {
    key: "passmodeTimesegId",
    label: "Faixa Horária do Modo de Passagem",
    type: "string",
  },
  { key: "sensorDelay", label: "Atraso do Sensor de Porta", type: "number" },
  { key: "supperPwd", label: "Password de Emergência", type: "string" },
  {
    key: "verifyMode",
    label: "Modo de Verificação",
    type: "number",
    required: true,
  },
  { key: "devId", label: "Equipamento", type: "string" },
  { key: "timezoneId", label: "Período", type: "string" },
];

export const mbDeviceFields = [
  { key: "nomeQuiosque", label: "Nome", type: "string", required: true },
  { key: "modelo", label: "Modelo", type: "string" },
  { key: "estadoTerminal", label: "Estado do Terminal", type: "number" },
];

export const mbDeviceStatusFields = [
  { key: "tpId", label: "Terminal", type: "string" },
  { key: "tipoStatus", label: "Estado", type: "number" },
  { key: "nomeStatus", label: "Alerta", type: "string" },
  { key: "timespam", label: "Horário", type: "date" },
];

export const mbDeviceCloseOpenFields = [
  { key: "tpId", label: "Terminal", type: "string" },
  { key: "timestamp", label: "Horário", type: "date" },
  { key: "fechoImage", label: "Fecho", type: "string" },
  { key: "aberturaImage", label: "Abertura", type: "string" },
];

const products = [
  "nclock",
  "naccess",
  "nvisitor",
  "npark",
  "ndoor",
  "npatrol",
  "ncard",
  "nview",
  "nsecur",
  "nsoftware",
  "nsystem",
  "napp",
  "ncyber",
  "ndigital",
  "nserver",
  "naut",
  "nequip",
  "nproject",
  "ncount",
  "nbuild",
  "ncaravan",
  "nmechanic",
  "nevents",
  "nservice",
  "ntask",
  "nproduction",
  "nticket",
  "nsales",
  "ninvoice",
  "ndoc",
  "nsports",
  "ngym",
  "nschool",
  "nclinic",
  "noptics",
  "ngold",
  "nsmart",
  "nreality",
  "nhologram",
  "npower",
  "ncharge",
  "ncity",
  "nkiosk",
  "nled",
  "nfire",
  "nfurniture",
  "npartition",
  "ndecor",
  "nping",
  "nconnect",
  "nlight",
  "ncomfort",
  "nsound",
  "nhome",
];

const createLicenseFields = (products: string[]) => {
  const fields = [
    { key: "entidadeNumber", label: "Entidade Number", type: "number" },
    { key: "name", label: "Nome", type: "string" },
    { key: "nif", label: "NIF", type: "number" },
    { key: "users", label: "Utilizadores", type: "number" },
    { key: "devices", label: "Dispositivos", type: "number" },
    { key: "sn", label: "Nº de Série", type: "string" },
  ];
  products.forEach((product) => {
    fields.push(
      { key: `${product}.enable`, label: `${product} Ativo`, type: "switch" },
      {
        key: `${product}.validacao`,
        label: `${product} Validação`,
        type: "number",
      },
      {
        key: `${product}.createDate`,
        label: `${product} Data de Criação`,
        type: "date",
      },
      { key: `${product}.pacote`, label: `${product} Pacote`, type: "text" }
    );
  });

  return fields;
};

export const licenseFields = createLicenseFields(products);

export const entityFields = [
  { key: "nome", label: "Nome", type: "string", required: true },
  { key: "morada", label: "Morada", type: "string" },
  { key: "cPostal", label: "Código Postal", type: "string" },
  { key: "localidade", label: "Localidade", type: "string" },
  { key: "telefone", label: "Telefone", type: "string" },
  { key: "telemovel", label: "Telemóvel", type: "string" },
  { key: "email", label: "Email", type: "string" },
  { key: "nif", label: "NIF", type: "number", required: true },
  { key: "www", label: "Website", type: "string" },
  { key: "observacoes", label: "Observações", type: "string" },
  { key: "logotipo", label: "Logotipo", type: "string" },
  { key: "createdDate", label: "Data de Criação", type: "date" },
  { key: "updatedDate", label: "Data de Atualização", type: "date" },
  { key: "enabled", label: "Ativo", type: "boolean" },
];

export const recolhaMoedeiroEContadorFields = [
  { key: "dataFimRecolha", label: "Data de Registo", type: "date" },
  { key: "pessoaResponsavel", label: "Nome do Utilizador", type: "string" },
  {
    key: "numeroMoedas",
    label: "Moedas Recolhidas",
    type: "number",
    required: true,
  },
  { key: "numeroMoedasSistema", label: "Moedas Sistema", type: "number" },
  { key: "valorTotalRecolhido", label: "Valor Recolhido", type: "number" },
  { key: "valorTotalSistema", label: "Valor Sistema", type: "number" },
  { key: "diferencaMoedas", label: "Diferença Moedas", type: "number" },
  { key: "diferencaEuros", label: "Diferença Valor", type: "number" },
  { key: "observacoes", label: "Observações", type: "string" },
  { key: "deviceID", label: "Nome do Local", type: "string", required: true },
  { key: "dataRecolha", label: "Data da Última Recolha", type: "date" },
];

export const manualOpenDoorFields = [
  { key: "createdDate", label: "Data", type: "date" },
  { key: "nomeResponsavel", label: "Nome do Utilizador", type: "string" },
  { key: "nomeEvento", label: "Nome do Evento", type: "string" },
  { key: "observacoes", label: "Observações", type: "string" },
  { key: "doorName", label: "Porta", type: "string" },
  { key: "deviceName", label: "Nome do Local", type: "string" },
];

export const limpezasEOcorrenciasFields = [
  { key: "dataCreate", label: "Data", type: "date" },
  {
    key: "responsavel",
    label: "Nome do Utilizador",
    type: "string",
    required: true,
  },
  { key: "observacoes", label: "Observações", type: "string" },
  { key: "deviceId", label: "Nome do Local", type: "string", required: true },
];

export const logsFields = [
  { key: "createdDate", label: "Data", type: "date" },
  { key: "userName", label: "Nome do Utilizador", type: "string" },
  { key: "description", label: "Descrição", type: "string" },
];

export const cameraFields = [
  { key: "createdDate", label: "Data de Criação", type: "date" },
  { key: "numeroCamera", label: "Nº", type: "number", required: true },
  { key: "nomeCamera", label: "Nome", type: "string", required: true },
  { key: "ip", label: "IP", type: "string" },
  { key: "url", label: "URL", type: "string", required: true },
  { key: "userCamera", label: "Utilizador", type: "string" },
  { key: "passwordCamera", label: "Password", type: "string" },
  { key: "updatedDate", label: "Data de Atualização", type: "date" },
];

export const employeesOnDeviceFields = [
  { key: "pin", label: "Número", type: "string" },
  { key: "name", label: "Nome", type: "string" },
  { key: "cardno", label: "Nº do Cartão", type: "string" },
];

export const kioskConfigFields = [
  { key: "amount", label: "Valor", type: "number", required: true },
  {
    key: "totalMoedas",
    label: "Total de Moedas",
    type: "number",
    required: true,
  },
  { key: "emails", label: "E-Mails", type: "string", required: true },
];

export const auxOutFields = [
  { key: "nrAuxOut", label: "Nº da Auxiliar", type: "number", required: true },
  { key: "time", label: "Tempo para Abrir", type: "number", required: true },
];

export const auxiliariesFields = [
  { key: "nome", label: "Nome Auxiliar", type: "string", required: true },
  { key: "auxNo", label: "Nº Auxiliar", type: "number" },
  { key: "auxType", label: "Contacto", type: "number" },
  { key: "deviceId", label: "Dispositivo", type: "string" },
  { key: "timezoneId", label: "Período", type: "string", required: true },
  { key: "enabled", label: "Activo", type: "boolean" },
];

export const resetFields = [
  { key: "deviceId", label: "Nome do Local", type: "string", required: true },
  { key: "observation", label: "Observação", type: "string" },
];

export const counterFields = [
  { key: "eventTime", label: "Data", type: "Date" },
  { key: "pin", label: "Nº do Utilizador", type: "number" },
  { key: "nameUser", label: "Nome do Utilizador", type: "string" },
  { key: "deviceSN", label: "Nome do Local", type: "string" },
  { key: "eventType", label: "Tipo do Evento", type: "string" },
  { key: "cardNo", label: "Nº do Cartão", type: "number" },
  { key: "eventName", label: "Nome do Evento", type: "string" },
];

export const licenseKey = [
  { key: "licenseKey", label: "Chave", type: "string" },
];

export const newTransactionCardFields = [
  { key: "eventTime", label: "Data", type: "Date" },
  { key: "pin", label: "Nº do Utilizador", type: "number" },
  { key: "cardNo", label: "Nº do Cartão", type: "number" },
  { key: "deviceSN", label: "Nome do Local", type: "string" },
  { key: "eventDoorId", label: "Torniquete", type: "number" },
];

export const backupDBFields = [
  { key: "backupName", label: "Nome do Backup", type: "string" },
];

export const timePlanFields = [
  { key: "nome", label: "Nome", type: "string" },
  { key: "descricao", label: "Descrição", type: "string" },
  { key: "periodos", label: "Períodos", type: "string" },
];

export const accessesFields = [
  { key: "eventTime", label: "Data", type: "string" },
  { key: "pin", label: "Número", type: "string" },
  { key: "cardNo", label: "Cartão", type: "string" },
  { key: "nameUser", label: "Nome", type: "string" },
  { key: "deviceName", label: "Nome do Local", type: "string" },
  { key: "eventDoorId", label: "Porta", type: "number", required: true },
  { key: "eventDoorName", label: "Porta", type: "string" },
  { key: "readerName", label: "Leitor", type: "string" },
  { key: "eventName", label: "Evento", type: "string" },
  { key: "verifyModeNo", label: "Modo de Verificação", type: "number" },
];

export const readersFields = [
  { key: "nameReader", label: "Nome Leitor", type: "string" },
  { key: "readerInOut", label: "Sentido", type: "number" },
  { key: "doorNo", label: "Nº Porta", type: "number" },
  { key: "doorName", label: "Nome Porta", type: "string" },
];

export const eventsFields = [
  { key: "eventTime", label: "Data", type: "Date" },
  { key: "cardNo", label: "Nº do Cartão", type: "number" },
  { key: "eventName", label: "Nome do Evento", type: "string" },
  { key: "eventId", label: "Evento", type: "number" },
  { key: "eventDoorId", label: "Porta", type: "number" },
  { key: "deviceSN", label: "Nome do Local", type: "string" },
  { key: "inOutStatus", label: "Sentido", type: "string" },
];

export const movementFields = [
  { key: "CreatedDate", label: "Data", type: "Date" },
  { key: "Tipo", label: "Tipo", type: "string" },
  { key: "Message", label: "Mensagem", type: "string" },
  { key: "DeviceSN", label: "Nome do Local", type: "string" },
];

export const alertsFields = [
  { key: "eventTime", label: "Data", type: "Date" },
  { key: "eventName", label: "Nome do Evento", type: "string" },
  { key: "deviceSN", label: "Serial do Local", type: "string" },
  { key: "name", label: "Porta/Auxiliar", type: "string" },
  { key: "deviceName", label: "Nome do Local", type: "string" },
  { key: "estado", label: "Estado", type: "string" },
  { key: "inOutStatus", label: "Sentido", type: "string" },
];

export const activityFields = [
  { key: "createdDate", label: "Início da Tarefa", type: "Date" },
  { key: "endDate", label: "Fim da Tarefa", type: "Date" },
  { key: "respName", label: "Nome do Utilizador", type: "string" },
  { key: "eventName", label: "Nome da Tarefa", type: "string" },
  { key: "estado", label: "Estado", type: "string" },
  { key: "deviceSN", label: "Nome do Local", type: "string" },
];

export const employeeVisitorFields = [
  { key: "dataInicio", label: "Data de Início", type: "date" },
  { key: "dataFim", label: "Data de Fim", type: "date" },
  { key: "dataSaida", label: "Data de Saída", type: "date" },
  { key: "idVisitante", label: "Visitante", type: "string" },
  { key: "idPessoa", label: "Visitado", type: "string" },
  { key: "idInserido", label: "Inserido Por", type: "string" },
  { key: "obs", label: "Observações", type: "string" },
  { key: "idViatura", label: "Viatura", type: "string" },
  { key: "reboque", label: "Reboque", type: "string" },
  { key: "refDoc", label: "Referência/Documento", type: "string" },
  { key: "visitanteNif", label: "NIF Visitante", type: "string" },
  { key: "visitanteCartaoEU", label: "Cartão EU Visitante", type: "string" },
  { key: "visitantePassaporte", label: "Passaporte Visitante", type: "string" },
  { key: "visitanteContacto", label: "Contacto Visitante", type: "string" },
  { key: "empresaNome", label: "Nome Empresa", type: "string" },
  { key: "empresaNif", label: "NIF Empresa", type: "string" },
  { key: "visitanteMotivo", label: "Motivo da Visita", type: "string" },
  { key: "estado", label: "Estado", type: "number" },
];

export const employeeVisitorMotiveFields = [
  { key: "descricao", label: "Descrição", type: "string" },
];

export const attendanceResultsFields = [
  { key: "estado", label: "Estado", type: "number" },
  { key: "tipo", label: "Tipo", type: "string" },
  { key: "date", label: "Data", type: "Date" },
  { key: "enrollNumber", label: "Número", type: "string" },
  { key: "employeeName", label: "Nome", type: "string" },
  { key: "E1", label: "Entrada 1", type: "Date" },
  { key: "S1", label: "Saída 1", type: "Date" },
  { key: "E2", label: "Entrada 2", type: "Date" },
  { key: "S2", label: "Saída 2", type: "Date" },
  { key: "E3", label: "Entrada 3", type: "Date" },
  { key: "S3", label: "Saída 3", type: "Date" },
  { key: "E4", label: "Entrada 4", type: "Date" },
  { key: "S4", label: "Saída 4", type: "Date" },
  { key: "objectivo", label: "Objectivo", type: "string" },
  { key: "ausencia", label: "Ausência", type: "string" },
  { key: "falta", label: "Falta", type: "string" },
  { key: "efectivo", label: "Efectivo", type: "string" },
  { key: "extra", label: "Extra", type: "string" },
  { key: "naoDefinido", label: "Não Definido", type: "string" },
  { key: "tolerancia", label: "Tolerância", type: "string" },
  { key: "compCredTmp", label: "Comp Crédito Temp", type: "string" },
  { key: "compDebTmp", label: "Comp Débito Temp", type: "string" },
  { key: "compCred", label: "Comp Crédito", type: "string" },
  { key: "compDeb", label: "Comp Débito", type: "string" },
  { key: "compCredTrans", label: "Comp Crédito Trans", type: "string" },
  { key: "saldo", label: "Saldo", type: "string" },
  { key: "justificacao", label: "Justificação", type: "string" },
  { key: "observacao", label: "Observação", type: "string" },
  { key: "notas", label: "Notas", type: "string" },
  { key: "ausPagar", label: "Ausências a Pagar", type: "string" },
  { key: "alterado", label: "Alterado", type: "string" },
  { key: "creditos", label: "Créditos", type: "string" },
  { key: "debito", label: "Débito", type: "string" },
  { key: "custoHora", label: "Custo/Hora", type: "string" },
];

export const attendanceUpdatesFields = [
  { key: "startDate", label: "Data de Início", type: "date" },
  { key: "endDate", label: "Data de Fim", type: "date" },
];

export const attendanceTimeFields = [
  { key: "tipo", label: "Tipo", type: "string" },
  { key: "codigo", label: "Código", type: "string" },
  { key: "nome", label: "Nome", type: "string" },
  { key: "objectivo", label: "Objetivo", type: "date" },
  { key: "sigla", label: "Sigla", type: "string" },
  { key: "cor", label: "Cor", type: "string" },
  { key: "horaInicio", label: "Hora de Início", type: "date" },
  { key: "diaInicio", label: "Dia de Início", type: "number" },
  { key: "horaFim", label: "Hora de Fim", type: "date" },
  { key: "diaFim", label: "Dia de Fim", type: "number" },
  { key: "idCodTrab", label: "Código Trabalho", type: "number" },
  { key: "idCodExtra", label: "Código Extra", type: "number" },
  { key: "idCodExtra2", label: "Código Extra 2", type: "number" },
  { key: "idCodFalta", label: "Código Falta", type: "number" },
  { key: "idCodNaoDefinido", label: "Código Não Definido", type: "number" },
  { key: "idCodTol", label: "Código Tolerância", type: "number" },
  { key: "idCodServ", label: "Código Serviço", type: "number" },
  { key: "arredondaTrab", label: "Arredondamento Trabalho", type: "string" },
  { key: "arredondaExtra", label: "Arredondamento Extra", type: "string" },
  { key: "arredondaFalta", label: "Arredondamento Falta", type: "string" },
  { key: "arredondaNaoDefinido", label: "Arredondamento Não Definido", type: "string" },
  { key: "arredondaTol", label: "Arredondamento Tol", type: "string" },
  { key: "arredondaServ", label: "Arredondamento Serv", type: "string" },
  { key: "createdDate", label: "Data de Criação", type: "date" },
  { key: "minMov", label: "Movimento Mínimo", type: "number" },
  { key: "tipoAutoMovs", label: "Tipo Automático Movimentos", type: "number" },
  { key: "movIgnorarReal", label: "Ignorar Movimento Real", type: "string" },
  { key: "intervaloDescTudo", label: "Intervalo Decrescente Tudo", type: "string" },
  { key: "faltaDiaTol", label: "Tolerância Falta por Dia", type: "string" },
  { key: "faltaDiaMesTol", label: "Tolerância Falta por Mês", type: "string" },
  { key: "faltaDiaMesTolMax", label: "Tolerância Falta Máxima", type: "string" },
  { key: "oConfig", label: "Configuração", type: "string" },
  { key: "horariosTrabalho", label: "Horários Trabalho", type: "string" },
];

export const attendanceTimePeriodFields = [
  { key: "idHorario", label: "Horário", type: "string" },
  { key: "activo", label: "Activo", type: "string" },
  { key: "nome", label: "Nome", type: "string" },
  { key: "tipo", label: "Tipo", type: "number" },
  { key: "inicio", label: "Início", type: "date" },
  { key: "fim", label: "Fim", type: "date" },
  { key: "diaProcessa", label: "Dia de Processamento", type: "number" },
  { key: "objectivo", label: "Objectivo", type: "date" },
  { key: "tolEntrada", label: "Tolerância Entrada", type: "date" },
  { key: "tolSaida", label: "Tolerância Saída", type: "date" },
  { key: "arredonda", label: "Arredondamento", type: "date" },
  { key: "autoTipo", label: "Tipo Automático", type: "number" },
  { key: "createdDate", label: "Data de Criação", type: "date" },
];
