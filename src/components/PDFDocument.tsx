import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

// Estilos para o documento PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFF',
        padding: 10,
    },
    aboveHeader: {
        fontSize: 12,
        textAlign: 'right',
        marginBottom: 5,
        borderColor: '#E4E4E4'
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    table: {
        display: 'table',
        borderStyle: 'solid',
        borderBottomWidth: 0,
        margin: 0
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#E4E4E4',
        borderBottomStyle: 'solid',
        alignItems: 'center',
        minHeight: 20,
    },
    tableColHeader: {
        flex: 1,
        borderStyle: 'solid',
        borderTopWidth: 0,
        backgroundColor: '#f2f2f2',
        textAlign: 'center',
        fontWeight: 'bold',
        minHeight: 35,
        display: 'flex',
        justifyContent: 'center'
    },
    tableCol: {
        flex: 1,
        borderStyle: 'solid',
        borderTopWidth: 0,
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
        textAlign: 'left',
        marginTop: 20,
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

// Define a interface para os itens de dados
interface DataItem {
    [key: string]: any;
}

// Define o tipo de campo para as exceções
type FieldKey = 'birthday' | 'status' | 'statusEmail' | 'rgpdAut' | 'departmentId' | 'professionId' | 'categoryId' | 'groupId' | 'zoneId' | 'externalEntityId' | 'attendanceTime' | 'inOutMode' | 'code' | 'machineNumber' | 'cardNumber' | 'productTime' | 'createDate' | 'updateDate' | 'createTime' | 'updateTime' | 'eventTime' | 'timestamp' | 'eventDoorId' | 'transactionType' | 'estadoTerminal' | 'timeReboot' | 'dataRecolha' | 'dataFimRecolha' | 'createdTime' | 'dataCreate' | 'admissionDate' | 'bIissuance' | 'biValidity' | 'exitDate' | 'dateInserted' | 'dateUpdated' | 'employeeId' | 'statusFprint' | 'statusPalm' | 'statusFace' | string;

// Componente para renderizar o documento PDF
export const PDFDocument = ({ data, fields }: PDFDocumentProps) => {

    // Formata o campo com base no tipo de campo
    const formatField = (item: DataItem, fieldKey: FieldKey) => {

        const currentRoute = window.location.pathname;
        const cartao = currentRoute.endsWith('movecard') || currentRoute.endsWith('listmovements') ? 'Torniquete' : '';
        const videoporteiro = currentRoute.endsWith('movevp') ? 'Video Porteiro' : '';

        if (fieldKey === 'eventTime' && currentRoute.endsWith('movevp')) {
            return item[fieldKey];
        }
        switch (fieldKey) {
            case 'birthday':
                return new Date(item.birthday).toLocaleString() || '';
            case 'admissionDate':
                return new Date(item.admissionDate).toLocaleString() || '';
            case 'bIissuance':
                return new Date(item.bIissuance).toLocaleString() || '';
            case 'biValidity':
                return new Date(item.biValidity).toLocaleString() || '';
            case 'exitDate':
                return new Date(item.exitDate).toLocaleString() || '';
            case 'dateInserted':
                return new Date(item.dateInserted).toLocaleString() || '';
            case 'dateUpdated':
                return new Date(item.dateInserted).toLocaleString() || '';
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
                return new Date(item.attendanceTime).toLocaleString() || '';
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
                return new Date(item.productTime).toLocaleString() || '';
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
            case 'dataRecolha':
                return new Date(item.dataRecolha).toLocaleString() || '';
            case 'dataFimRecolha':
                return new Date(item.dataFimRecolha).toLocaleString() || '';
            case 'createdTime':
                return new Date(item.createdTime).toLocaleString() || '';
            case 'dataCreate':
                return new Date(item.dataCreate).toLocaleString() || '';
            case 'statusFprint':
                return item[fieldKey] ? 'Activo' : 'Inactivo';
            case 'statusFace':
                return item[fieldKey] ? 'Activo' : 'Inactivo';
            case 'statusPalm':
                return item[fieldKey] ? 'Activo' : 'Inactivo';
            default:
                return item[fieldKey] !== undefined && item[fieldKey] !== null && item[fieldKey] !== '' ? item[fieldKey] : ' ';
        }
    };

    const maxColsPerPage = 8;
    const maxRowsPerPage = 20;
    const allColumns = ['eventId', 'appId', 'timezoneId', 'doorId', 'id', 'deviceId', 'birthday', 'admissionDate', 'biIssuance', 'biValidity', 'exitDate', 'status', 'statusEmail', 'rgpdAut', 'departmentId', 'professionId', 'categoryId', 'groupId', 'zoneId', 'externalEntityId', 'attendanceTime', 'inOutMode', 'code', 'machineNumber', 'cardNumber', 'productTime', 'createDate', 'updateDate', 'createTime', 'updateTime', 'eventTime', 'timestamp', 'transactionType', 'estadoTerminal', 'timeReboot', 'dataRecolha'];
    const columnsToIgnore = ['clientTicket', 'merchantTicket', 'photo', 'logotipo'];

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

    const splitDataIntoGroups = (data: any[], maxRowsPerPage: number) => {
        const groups: any[][] = [];
        for (let i = 0; i < data.length; i += maxRowsPerPage) {
            const group = data.slice(i, i + maxRowsPerPage);
            groups.push(group);
        }
        return groups;
    };

    const filteredFields = fields.filter(field => !filteredColumnsToIgnore.includes(field.key));
    const fieldGroups = splitFieldsIntoGroups(filteredFields, maxColsPerPage);

    return (
        <Document>
            {fieldGroups.map((fieldGroup, groupIndex) => (
                <React.Fragment key={groupIndex}>
                    {
                        splitDataIntoGroups(data, maxRowsPerPage).map((dataGroup, pageIndex) => (
                            <Page size="A4" orientation="landscape" style={styles.page} key={pageIndex}>
                                <Text style={styles.aboveHeader}>Gerado em {new Date().toLocaleString()}</Text>
                                <View style={styles.table}>
                                    <View style={styles.tableRow}>
                                        {fieldGroup.map(field => (
                                            <View key={field.key} style={styles.tableColHeader}>
                                                <Text style={styles.tableCellHeader}>{field.label}</Text>
                                            </View>
                                        ))}
                                    </View>
                                    {dataGroup.map((item, rowIndex) => (
                                        <View key={rowIndex} style={styles.tableRow}>
                                            {fieldGroup.map(field => {
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
                                <Text style={styles.footer}>NIDGROUP - Business Solutions</Text>
                            </Page>
                        ))}
                </React.Fragment>
            ))}
        </Document>
    );
};
