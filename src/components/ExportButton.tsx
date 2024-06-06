import Dropdown from 'react-bootstrap/Dropdown';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { CustomOutlineButton } from './CustomOutlineButton';

// Define os estilos para o PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 30,
        backgroundColor: '#FFF'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E4E4E4',
        borderBottomStyle: 'solid',
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    tableCell: {
        fontSize: 10,
        marginLeft: 12,
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
type FieldKey = 'birthday' | 'status' | 'statusEmail' | 'rgpdAut' | 'departmentId' |
    'professionId' | 'categoryId' | 'groupId' | 'zoneId' | 'externalEntityId' | string;

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
        case 'inOutMode':
            switch (item[fieldKey]) {
                case 0: return 'Entrada';
                case 1: return 'Saída';
                case 2: return 'Pausa - Entrada';
                case 3: return 'Pausa - Saída';
                case 4: return 'Hora Extra - Entrada';
                case 5: return 'Hora Extra - Saída';
                default: return '';
            }
        default:
            return item[fieldKey] || '';
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

// Define o componente PDFDocument
const PDFDocument = ({ data, fields }: PDFDocumentProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {data.map((item, index) => (
                <View key={index} style={styles.section}>
                    {fields.map((field) => {
                        const value = formatField(item, field.key);
                        if (value !== undefined && value !== null && value !== '') {
                            return (
                                <View key={field.key} style={styles.tableRow}>
                                    <Text style={styles.tableCell}>{field.label}: {value}</Text>
                                </View>
                            );
                        }
                        return null;
                    })}
                </View>
            ))}
        </Page>
    </Document>
);

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
    const fileName = 'data_export';
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