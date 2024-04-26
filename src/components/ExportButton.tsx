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

const exportToXLSX = (data: DataItem[], fileName: string, fields: Field[]): void => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const output = data.map(item => {
        return fields.reduce((result: Record<string, any>, field: Field) => {
            if (item.hasOwnProperty(field.key)) {
                result[field.label] = item[field.key];
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
                    {fields.map((field: Field) => (
                        <View key={field.key} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{field.label}: {item[field.key]}</Text>
                        </View>
                    ))}
                </View>
            ))}
        </Page>
    </Document>
);

const exportToTXT = (data: DataItem[], fileName: string): void => {
    const fileExtension = '.txt';
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'text/plain' });
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
                <Dropdown.Item onClick={() => exportToXLSX(dataToExport, fileName, fields)}>Export as XLSX</Dropdown.Item>
                <Dropdown.Item as="button" className='dropdown-item'>
                    <PDFDownloadLink document={<PDFDocument data={dataToExport} fields={fields} />} fileName={`${fileName}.pdf`} style={{ textDecoration: 'none', color: 'inherit' }}>Export as PDF</PDFDownloadLink>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => exportToTXT(dataToExport, fileName)}>Export as TXT</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};