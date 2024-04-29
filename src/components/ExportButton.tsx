import Dropdown from 'react-bootstrap/Dropdown';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { CustomOutlineButton } from './CustomOutlineButton';

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

interface DataItem {
    [key: string]: any;
}

interface Field {
    label: string;
    key: string;
}

interface ExportButtonProps {
    allData: DataItem[];
    selectedData: DataItem[];
    fields: Field[];
}

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
            let value = item[field.key];
            if (field.key === 'status' || field.key === 'statusEmail') {
                value = value ? 'Activo' : 'Inactivo';
            } else if (field.key === 'rgpdAut') {
                value = value ? 'Autorizado' : 'Não Autorizado';
            }
            if (typeof value === 'string') {
                value = `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        }).filter(v => v !== '').join(delimiter);
    }).join('\r\n');

    const csvData = BOM + headers + '\r\n' + csvContent;

    const blob = new Blob([csvData], { type: fileType });
    saveAs(blob, fileName + fileExtension);
};

const exportToXLSX = (data: DataItem[], fileName: string, fields: Field[]): void => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const output = data.map(item => {
        return fields.reduce((result: Record<string, any>, field: Field) => {
            let value = item[field.key];
            if (field.key === 'status' || field.key === 'statusEmail') {
                value = value ? 'Activo' : 'Inactivo';
            } else if (field.key === 'rgpdAut') {
                value = value ? 'Autorizado' : 'Não Autorizado';
            }
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

const PDFDocument = ({ data, fields }: { data: DataItem[], fields: Field[] }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {data.map((item, index) => (
                <View key={index} style={styles.section}>
                    {fields.map((field: Field) => {
                        let value = item[field.key];
                        if (field.key === 'status' || field.key === 'statusEmail') {
                            value = value ? 'Activo' : 'Inactivo';
                        } else if (field.key === 'rgpdAut') {
                value = value ? 'Autorizado' : 'Não Autorizado';
                        }
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

const exportToTXT = (data: DataItem[], fileName: string): void => {
    const fileExtension = '.txt';
    
    const filteredData = data.map(item => {
        return Object.keys(item).reduce((result, key) => {
            let value = item[key];
            if (key === 'status' || key === 'statusEmail') {
                value = value ? 'Activo' : 'Inactivo';
            } else if (key === 'rgpdAut') {
                value = value ? 'Autorizado' : 'Não Autorizado';
            }
            if (value !== undefined && value !== null && value !== '') { 
                result[key] = value;
            }
            return result;
        }, {} as Record<string, any>);
    });

    const blob = new Blob([JSON.stringify(filteredData, null, 2)], { type: 'text/plain' });
    saveAs(blob, fileName + fileExtension);
};

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