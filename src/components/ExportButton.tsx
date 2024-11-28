import Dropdown from 'react-bootstrap/Dropdown';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CustomOutlineButton } from './CustomOutlineButton';
import { PDFDocument } from './PDFDocument';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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

// Define o tipo de campo para as exceções
type FieldKey = 'birthday' | 'status' | 'statusEmail' | 'rgpdAut' | 'departmentId' | 'professionId' | 'categoryId' | 'groupId' | 'zoneId' | 'externalEntityId' | 'attendanceTime' | 'inOutMode' | 'code' | 'machineNumber' | 'cardNumber' | 'productTime' | 'createDate' | 'updateDate' | 'createTime' | 'updateTime' | 'eventTime' | 'timestamp' | 'eventDoorId' | 'transactionType' | 'estadoTerminal' | 'timeReboot' | 'dataRecolha' | 'dataFimRecolha' | 'createdTime' | 'dataCreate' | 'admissionDate' | 'bIissuance' | 'biValidity' | 'exitDate' | 'dateInserted' | 'dateUpdated' | 'employeeId' | 'statusFprint' | 'statusPalm' | 'statusFace' | string;

// Formata o campo com base no tipo de campo
const formatField = (item: DataItem, fieldKey: FieldKey) => {
    const currentRoute = window.location.pathname;
    const cartao = currentRoute.endsWith('movecard') || currentRoute.endsWith('listmovements') ? 'Torniquete' : '';
    const videoporteiro = currentRoute.endsWith('movevp') ? 'Video Porteiro' : '';

    const validDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        return date.getTime() ? date.toLocaleString() : '';
    };

    if (fieldKey === 'eventTime' && currentRoute.endsWith('movevp')) {
        return item[fieldKey];
    }

    switch (fieldKey) {
        case 'birthday':
        case 'admissionDate':
        case 'bIissuance':
        case 'biValidity':
        case 'exitDate':
        case 'dateInserted':
        case 'dateUpdated':
        case 'attendanceTime':
        case 'productTime':
        case 'createDate':
        case 'updateDate':
        case 'createTime':
        case 'updateTime':
        case 'eventTime':
        case 'timestamp':
        case 'dataRecolha':
        case 'dataFimRecolha':
        case 'createdTime':
        case 'dataCreate':
            return validDate(item[fieldKey]);
        case 'status':
        case 'statusEmail':
            return item[fieldKey] ? 'Activo' : 'Inactivo';
        case 'rgpdAut':
            return item[fieldKey] ? 'Autorizado' : 'Não Autorizado';
        case 'employeeId':
            return item.employeeName;
        case 'departmentId':
        case 'professionId':
        case 'categoryId':
        case 'groupId':
        case 'zoneId':
        case 'externalEntityId':
            return item[fieldKey] || '';
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
        case 'machineNumber':
        case 'cardNumber':
            return item[fieldKey] === 0 ? "" : item[fieldKey];
        case 'eventDoorId':
            switch (item.eventDoorId) {
                case 1: return currentRoute.endsWith('payterminal') ? 'Terminal' : '';
                case 2: return currentRoute.endsWith('paycoins') ? 'Moedeiro' : '';
                case 3: return cartao;
                case 4: return currentRoute.endsWith('movekiosk') ? 'Quiosque' : '';
                case null: return videoporteiro;
                default: return '';
            }
        case 'transactionType':
            return item[fieldKey] === 1 ? 'Multibanco' : 'Moedeiro';
        case 'estadoTerminal':
            return item[fieldKey] ? 'Ligado' : 'Desligado';
        case 'timeReboot':
            return item[fieldKey] === '00:00:00' ? 'Sem tempo de reinício' : item[fieldKey];
        case 'statusFprint':
        case 'statusPalm':
        case 'statusFace':
            return item[fieldKey] ? 'Activo' : 'Inactivo';
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
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Exportar</Tooltip>}
            >
                <Dropdown.Toggle as={CustomOutlineButton} icon='bi-file-earmark-arrow-down' id="dropdown-basic" iconSize='1.1em' className="custom-dropdown-toggle">
                </Dropdown.Toggle>
            </OverlayTrigger>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => exportToCSV(dataToExport, fileName, fields)}>Exportar em CSV</Dropdown.Item>
                <Dropdown.Item onClick={() => exportToXLSX(dataToExport, fileName, fields)}>Exportar em XLSX</Dropdown.Item>
                <Dropdown.Item as="button">
                    <PDFDownloadLink document={<PDFDocument data={dataToExport} fields={fields} />} fileName={`${fileName}.pdf`} style={{ textDecoration: 'none', color: 'inherit' }}>Exportar em PDF</PDFDownloadLink>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => exportToTXT(dataToExport, fileName)}>Exportar em TXT</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};