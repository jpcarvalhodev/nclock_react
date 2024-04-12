import Dropdown from 'react-bootstrap/Dropdown';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CustomOutlineButton } from './CustomOutlineButton';

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

const exportToPDF = (data: DataItem[], fileName: string, fields: Field[]): void => {
    const doc = new jsPDF({
        orientation: 'landscape',
        format: 'a4',
    });
    const maxColumnsPerPage = 10;  
    let startY = 10;  

    const pageFields = fields.reduce((acc, field, index) => {
        if (index % maxColumnsPerPage === 0 && index !== 0) {
            acc.push([]);
        }
        acc[acc.length - 1].push(field);
        return acc;
    }, [[]] as Field[][]);

    pageFields.forEach((fieldsGroup, index) => {
        if (index !== 0 && startY + 20 > (doc.internal.pageSize.height - 10)) {
            doc.addPage();
            startY = 10;
        }

        const headers = fieldsGroup.map(field => field.label);
        const body = data.map(row => 
            fieldsGroup.map(field => row[field.key] ? row[field.key].toString() : '')
        );

        doc.autoTable({
            head: [headers],
            body: body,
            theme: 'grid',
            startY: startY,
            pageBreak: 'avoid',
            margin: { horizontal: 10, top: 10, bottom: 10 },
            tableWidth: 'auto',
        });

        startY = doc.autoTable.previous.finalY + 10;
    });

    doc.save(`${fileName}.pdf`);
};

const exportToTXT = (data: DataItem[], fileName: string) => {
    const fileExtension = '.txt';
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'text/plain' });
    saveAs(blob, fileName + fileExtension);
};

export const ExportButton = ({ data, fields }: ExportButtonProps) => {
    const handleExport = (type: string) => {
        const fileName = 'data_export';
        switch (type) {
            case 'xlsx':
                exportToXLSX(data, fileName, fields);
                break;
            case 'pdf':
                exportToPDF(data, fileName, fields);
                break;
            case 'txt':
                exportToTXT(data, fileName);
                break;
            default:
                console.log('No format selected');
        }
    };

    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomOutlineButton} icon='bi-file-earmark-arrow-down' id="dropdown-basic" iconSize='1.1em'>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleExport('xlsx')}>Exportar em XLSX</Dropdown.Item>
                <Dropdown.Item onClick={() => handleExport('pdf')}>Exportar em PDF</Dropdown.Item>
                <Dropdown.Item onClick={() => handleExport('txt')}>Exportar em TXT</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};