import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Estilos para o documento PDF
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

// Define as propriedades do documento PDF
interface PDFDocumentProps {
    data: any[];
    fields: { label: string; key: string }[];
}

// Componente para renderizar o documento PDF
export const PDFDocument = ({ data, fields }: PDFDocumentProps) => {
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        {fields.map(field => (
                            <View key={field.key} style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>{field.label}</Text>
                            </View>
                        ))}
                    </View>
                    {data.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            {fields.map(field => (
                                <View key={field.key} style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item[field.key]}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
};
