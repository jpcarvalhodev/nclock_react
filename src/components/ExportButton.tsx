import Dropdown from 'react-bootstrap/Dropdown';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { CustomOutlineButton } from './CustomOutlineButton';
import * as apiService from "../helpers/apiService";

// Define os estilos para o PDF
const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#FFF',
    },
    table: {
        display: 'table',
        width: 'auto',
        maxWidth: 'auto',
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
    },
    tableColHeader: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f2f2f2',
        padding: 5,
        textAlign: 'center',
    },
    tableCol: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
        textAlign: 'center',
    },
    tableCellHeader: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    tableCell: {
        fontSize: 10,
    }
});

// Define a interface para os itens de dados
interface DataItem {
    [key: string]: any;
}

// Define a interface para os campos
interface Field {
    label: string;
    key: string;
}

// Define as propriedades do botão de exportação
interface ExportButtonProps {
    allData: DataItem[];
    selectedData: DataItem[];
    fields: Field[];
}

// Define as propriedades do documento PDF
interface PDFDocumentProps {
    data: DataItem[];
    fields: Field[];
}

// Define o tipo de campo para as exceções
type FieldKey = 'birthday' | 'status' | 'statusEmail' | 'rgpdAut' | 'departmentId' | 'professionId' | 'categoryId' | 'groupId' | 'zoneId' | 'externalEntityId' | 'attendanceTime' | 'inOutMode' | 'code' | 'machineNumber' | 'cardNumber' | 'productTime' | 'createDate' | 'updateDate' | 'createTime' | 'updateTime' | 'eventTime' | 'timestamp' | 'eventDoorId' | string;

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

// Formata o campo com base no tipo de campo
const formatField = (item: DataItem, fieldKey: FieldKey) => {
    switch (fieldKey) {
        case 'birthday':
            return item.birthday ? formatDateAndTime(item.birthday) : '';
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
            return item.timestamp ? new Date(item.timestamp).toLocaleString() : '';
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
        default:
            return item[fieldKey] !== undefined && item[fieldKey] !== null && item[fieldKey] !== '' ? item[fieldKey] : ' ';
    }
};

// Função para exportar os dados para CSV
const exportToCSV = (data: DataItem[], fileName: string, fields: Field[]): void => {
    const fileExtension = '.csv';
    const fileType = 'text/csv;charset=utf-8;';
    const BOM = '\uFEFF';
    const delimiter = ';';

    const validFields = data.reduce((acc, item) => {
        fields.forEach(field => {
            const value = item[field.key];
            if (value !== undefined && value !== null && value !== '') {
                acc.add(field.key);
            }
        });
        return acc;
    }, new Set());

    const headers = fields.filter(field => validFields.has(field.key)).map(field => field.label).join(delimiter);

    const csvContent = data.map(item => {
        return fields.map(field => {
            if (!validFields.has(field.key)) return '';
            const value = formatField(item, field.key);
            if (typeof value === 'string') {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        }).filter(v => v !== '').join(delimiter);
    }).join('\r\n');

    const csvData = BOM + headers + '\r\n' + csvContent;

    const blob = new Blob([csvData], { type: fileType });
    saveAs(blob, fileName + fileExtension);
};

// Função para exportar os dados para XLSX
const exportToXLSX = (data: DataItem[], fileName: string, fields: Field[]): void => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const output = data.map(item => {
        return fields.reduce((result: Record<string, any>, field) => {
            const value = formatField(item, field.key);
            if (value !== undefined && value !== null && value !== '') {
                result[field.label] = value;
            }
            return result;
        }, {});
    });

    const ws = XLSX.utils.json_to_sheet(output);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: fileType });
    saveAs(blob, fileName + fileExtension);
};

// Função para renderizar o documento PDF com as colunas divididas corretamente
const PDFDocument = ({ data, fields }: PDFDocumentProps) => {
    const maxColsPerPage = 4;

    const columnsToIgnore = ['clientTicket', 'merchantTicket'];

    const splitFieldsIntoGroups = (fields: Field[], maxColsPerPage: number) => {
        const groups: Field[][] = [];
        for (let i = 0; i < fields.length; i += maxColsPerPage) {
            groups.push(fields.slice(i, i + maxColsPerPage));
        }
        return groups;
    };

    const filteredFields = fields.filter(field => !columnsToIgnore.includes(field.key));
    const fieldGroups = splitFieldsIntoGroups(filteredFields, maxColsPerPage);

    return (
        <Document>
            {fieldGroups.map((fieldGroup, groupIndex) => (
                <Page size="A4" orientation="landscape" style={styles.page} key={groupIndex}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            {fieldGroup.map((field) => (
                                <View key={field.key} style={styles.tableColHeader}>
                                    <Text style={styles.tableCellHeader}>{field.label}</Text>
                                </View>
                            ))}
                        </View>
                        {data.map((item, rowIndex) => (
                            <View key={rowIndex} style={styles.tableRow}>
                                {fieldGroup.map((field) => {
                                    const value = formatField(item, field.key);
                                    return (
                                        <View key={field.key} style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{value}</Text>
                                        </View>
                                    );
                                })}
                            </View>
                        ))}
                    </View>
                </Page>
            ))}
        </Document>
    );
};

// Função para exportar os dados para TXT
const exportToTXT = (data: DataItem[], fileName: string): void => {
    const fileExtension = '.txt';

    const filteredData = data.map(item => {
        const { employeeID, employeeId, departmentID, groupID, categoryID, professionID, zoneID, attendanceTimeId, ...rest } = item;
        return Object.keys(item).reduce((result: Record<string, any>, key) => {
            const value = formatField(rest, key);
            if (value !== undefined && value !== null && value !== '') {
                result[key] = value;
            }
            return result;
        }, {});
    });

    const blob = new Blob([JSON.stringify(filteredData, null, 2)], { type: 'text/plain' });
    saveAs(blob, fileName + fileExtension);
};

// Define o componente
export const ExportButton = ({ allData, selectedData, fields }: ExportButtonProps) => {
    const fileName = 'dados_exportados';
    const dataToExport = selectedData.length > 0 ? selectedData : allData;

    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomOutlineButton} icon='bi-file-earmark-arrow-down' id="dropdown-basic" iconSize='1.1em'>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => exportToCSV(dataToExport, fileName, fields)}>Exportar em CSV</Dropdown.Item>
                <Dropdown.Item onClick={() => exportToXLSX(dataToExport, fileName, fields)}>Exportar em XLSX</Dropdown.Item>
                <Dropdown.Item as="button" className='dropdown-item'>
                    <PDFDownloadLink document={<PDFDocument data={dataToExport} fields={fields} />} fileName={`${fileName}.pdf`} style={{ textDecoration: 'none', color: 'inherit' }}>Exportar em PDF</PDFDownloadLink>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => exportToTXT(dataToExport, fileName)}>Exportar em TXT</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};