export type Employee = {
    [key: string]: any;
    id: string;
    enrollNumber: number;
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
    rgpdAut: string;
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
    Comments: string,
    CommercialName: string,
    ResponsibleName: string,
    Photo: string,
    Address: string,
    ZIPCode: string,
    Locality: string,
    Village: string,
    District: string,
    Phone: number,
    Mobile: number,
    Email: string,
    WWW: string,
    Fax: number,
    NIF: number,
    DateInserted: Date,
    DateUpdated: Date,
};

export type Group = {
    [key: string]: any;
    id: string;
    name: string;
    description: string;
    paiID: number;
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