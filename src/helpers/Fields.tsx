//*** campos de todos os modelos para usar no programa todo ***

export const employeeFields = [
    { label: 'Número', key: 'enrollNumber', type: 'number', required: true },
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
    { label: 'Tipo', key: 'type', type: 'string' },
    { label: 'Departamento', key: 'departmentId', type: 'dropdown' },
    { label: 'Profissão', key: 'professionId', type: 'dropdown' },
    { label: 'Categoria', key: 'categoryId', type: 'dropdown' },
    { label: 'Grupo', key: 'groupId', type: 'dropdown', },
    { label: 'Zona', key: 'zoneId', type: 'dropdown', },
    { label: 'Entidade Externa', key: 'externalEntityId', type: 'dropdown', },
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
    { key: 'paiId', label: 'ID de Parente', type: 'dropdown' },
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
    { key: 'attendanceTime', label: 'Horário de presença', type: 'datetime-local', required: true},
    { key: 'employeeId', label: 'Funcionário', type: 'dropdown', required: true},
    { key: 'enrollNumber', label: 'Número', type: 'number' },
    { key: 'employeeName', label: 'Nome do Funcionário', type: 'string' },
    { key: 'inOutMode', label: 'Modo de entrada/saída', type: 'number' },
    { key: 'observation', label: 'Observação', type: 'string' },
    { key: 'type', label: 'Tipo', type: 'number' },
];