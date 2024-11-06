import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import * as apiService from "../helpers/apiService";

// Estilos para o documento PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFF',
        padding: 30,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#E4E4E4',
        borderBottomStyle: 'solid',
        alignItems: 'center',
        minHeight: 24,
    },
    tableColHeader: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f2f2f2',
        padding: 8,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    tableCol: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 8,
        textAlign: 'center',
    },
    tableCellHeader: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    tableCell: {
        fontSize: 10
    },
    footer: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 25,
        paddingTop: 10,
        borderTopWidth: 1,
        borderColor: '#E4E4E4'
    }
});

// Define a interface para os campos
interface Field {
    label: string;
    key: string;
}

// Define as propriedades do documento PDF
interface PDFDocumentProps {
    data: any[];
    fields: { label: string; key: string }[];
}

// Função para formatar a data e a hora
function formatDateAndTime(input: string | Date): string {
    const date = typeof input === 'string' ? new Date(input) : input;
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    };
    return new Intl.DateTimeFormat('pt-PT', options).format(date);
}

// Define a interface para os itens de dados
interface DataItem {
    [key: string]: any;
}

// Define o tipo de campo para as exceções
type FieldKey = 'birthday' | 'status' | 'statusEmail' | 'rgpdAut' | 'departmentId' | 'professionId' | 'categoryId' | 'groupId' | 'zoneId' | 'externalEntityId' | 'attendanceTime' | 'inOutMode' | 'code' | 'machineNumber' | 'cardNumber' | 'productTime' | 'createDate' | 'updateDate' | 'createTime' | 'updateTime' | 'eventTime' | 'timestamp' | 'eventDoorId' | string;

// Formata o campo com base no tipo de campo
const formatField = (item: DataItem, fieldKey: FieldKey) => {
    switch (fieldKey) {
        case 'birthday':
            return item.birthday ? formatDateAndTime(item.birthday) : '';
        case 'admissionDate':
            return item.admissionDate ? formatDateAndTime(item.admissionDate) : '';
        case 'biIssuance':
            return item.biIssueDate ? formatDateAndTime(item.biIssuance) : '';
        case 'biValidity':
            return item.biValidity ? formatDateAndTime(item.biValidity) : '';
        case 'exitDate':
            return item.exitDate ? formatDateAndTime(item.exitDate) : '';
        case 'status':
        case 'statusEmail':
            return item[fieldKey] ? 'Activo' : 'Inactivo';
        case 'rgpdAut':
            return item[fieldKey] ? 'Autorizado' : 'Não Autorizado';
        case 'employeeId':
            return item.employeeName;
        case 'departmentId':
            return item.departmentName || '';
        case 'professionId':
            return item.professionName || '';
        case 'categoryId':
            return item.categoryName || '';
        case 'groupId':
            return item.groupName || '';
        case 'zoneId':
            return item.zoneName || '';
        case 'externalEntityId':
            return item.externalEntityName || '';
        case 'attendanceTime':
            return formatDateAndTime(item[fieldKey]);
        case 'inOutMode':
            if (item.inOutModeDescription) {
                return item.inOutModeDescription || '';
            } else {
                switch (item[fieldKey]) {
                    case 0: return 'Entrada';
                    case 1: return 'Saída';
                    case 2: return 'Pausa - Entrada';
                    case 3: return 'Pausa - Saída';
                    case 4: return 'Hora Extra - Entrada';
                    case 5: return 'Hora Extra - Saída';
                    default: return '';
                }
            }
        case 'code':
            return item.code === 0 ? "" : item.code;
        case 'machineNumber':
            return item.code === 0 ? "" : item.machineNumber;
        case 'cardNumber':
            return item.cardNumber === 0 ? "" : item.cardNumber;
        case 'productTime':
            return item.productTime ? formatDateAndTime(item[fieldKey]) : '';
        case 'createDate':
            return new Date(item.createDate).toLocaleString() || '';
        case 'updateDate':
            return new Date(item.updateDate).toLocaleString() || '';
        case 'createTime':
            return new Date(item.createTime).toLocaleString() || '';
        case 'updateTime':
            return new Date(item.updateTime).toLocaleString() || '';
        case 'eventTime':
            return new Date(item.eventTime).toLocaleString() || '';
        case 'timestamp':
            return new Date(item.timestamp).toLocaleString() || '';
        case 'eventDoorId':
            switch (item.eventDoorId) {
                case 1: return 'Terminal';
                case 2: return 'Moedeiro';
                case 3: return 'Cartão';
                case 4: return 'Video Porteiro';
                default: return '';
            }
        case 'transactionType':
            return item[fieldKey] === 1 ? 'Multibanco' : 'Moedeiro';
        case 'estadoTerminal':
            return item[fieldKey] ? 'Ligado' : 'Desligado';
        case 'timeReboot':
            return item[fieldKey] === '00:00:00' ? 'Sem tempo de reinício' : item[fieldKey];
        case 'clientTicket':
        case 'merchantTicket':
            const imageUrl = item[fieldKey];
            if (imageUrl) {
                const uploadPath = imageUrl.substring(imageUrl.indexOf('/Uploads'));
                const fullImageUrl = `${apiService.baseURL}${uploadPath}`;
                return fullImageUrl;
            } else {
                return 'Sem Ticket';
            }
        case 'dataRecolha':
            return new Date(item.dataRecolha).toLocaleString();
        default:
            return item[fieldKey] !== undefined && item[fieldKey] !== null && item[fieldKey] !== '' ? item[fieldKey] : ' ';
    }
};

// Componente para renderizar o documento PDF
export const PDFDocument = ({ data, fields }: PDFDocumentProps) => {
    const maxColsPerPage = 5;
    const allColumns = ['eventId', 'appId', 'timezoneId', 'doorId', 'tpId', 'id', 'deviceId', 'birthday', 'admissionDate', 'biIssuance', 'biValidity', 'exitDate', 'status', 'statusEmail', 'rgpdAut', 'departmentId', 'professionId', 'categoryId', 'groupId', 'zoneId', 'externalEntityId', 'attendanceTime', 'inOutMode', 'code', 'machineNumber', 'cardNumber', 'productTime', 'createDate', 'updateDate', 'createTime', 'updateTime', 'eventTime', 'timestamp', 'eventDoorId', 'transactionType', 'estadoTerminal', 'timeReboot', 'dataRecolha'];
    const columnsToIgnore = ['clientTicket', 'merchantTicket'];

    const updateColumnsToIgnore = () => {
        const idColumns = allColumns.filter(column => column.toLowerCase().includes('id'));
        return [...new Set([...columnsToIgnore, ...idColumns])];
    };

    const filteredColumnsToIgnore = updateColumnsToIgnore();

    const splitFieldsIntoGroups = (fields: Field[], maxColsPerPage: number) => {
        const groups: Field[][] = [];
        for (let i = 0; i < fields.length; i += maxColsPerPage) {
            groups.push(fields.slice(i, i + maxColsPerPage));
        }
        return groups;
    };

    const filteredFields = fields.filter(field => !filteredColumnsToIgnore.includes(field.key));
    const fieldGroups = splitFieldsIntoGroups(filteredFields, maxColsPerPage);

    return (
        <Document>
            {fieldGroups.map((fieldGroup, groupIndex) => (
                <Page size="A4" orientation="landscape" style={styles.page} key={groupIndex}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            {fieldGroup.map((field) => (
                                <View key={field.key} style={{...styles.tableColHeader, width: `${80 / fields.length}%`}}>
                                    <Text style={styles.tableCellHeader}>{field.label}</Text>
                                </View>
                            ))}
                        </View>
                        {data.map((item, rowIndex) => (
                            <View key={rowIndex} style={styles.tableRow}>
                                {fieldGroup.map((field) => {
                                    const value = formatField(item, field.key);
                                    return (
                                        <View key={field.key} style={{...styles.tableCol, width: `${80 / fields.length}%`}}>
                                            <Text style={styles.tableCell}>{value}</Text>
                                        </View>
                                    );
                                })}
                            </View>
                        ))}
                    </View>
                    <Text style={styles.footer}>Gerado em {new Date().toLocaleString()}</Text>
                </Page>
            ))}
        </Document>
    );
};
