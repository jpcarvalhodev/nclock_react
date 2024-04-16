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
    data: any[];
    fields: { label: string; key: string }[];
}

const exportToXLSX = (data: DataItem[], fileName: string, fields: Field[]) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const output = data.map(item => {
        return fields.reduce((result, field) => {
            if (field.key in item) {
                result[field.label] = item[field.key];
            }
            return result;
        }, {} as Record<string, any>);
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
                    {fields.map(field => (
                        <View key={field.key} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{field.label}: {item[field.key]}</Text>
                        </View>
                    ))}
                </View>
            ))}
        </Page>
    </Document>
);

const exportToTXT = (data: DataItem[], fileName: string) => {
    const fileExtension = '.txt';
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'text/plain' });
    saveAs(blob, fileName + fileExtension);
};

export const ExportButton = ({ data, fields }: ExportButtonProps) => {

    const fileName = 'data_export';

    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomOutlineButton} icon='bi-file-earmark-arrow-down' id="dropdown-basic" iconSize='1.1em'>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => exportToXLSX(data, fileName, fields)}>Exportar em XLSX</Dropdown.Item>
                <Dropdown.Item as="button" className='dropdown-item'>
                    <PDFDownloadLink document={<PDFDocument data={data} fields={fields} />} fileName={`${fileName}.pdf`} style={{ textDecoration: 'none', color: 'inherit' }}>Exportar em PDF</PDFDownloadLink>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => exportToTXT(data, fileName)}>Exportar em TXT</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};