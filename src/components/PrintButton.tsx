import { useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Modal, Button } from 'react-bootstrap';
import { PDFDocument } from './PDFDocument';

// Interfaces para os itens de dados e campos
interface DataItem {
    [key: string]: any;
}

interface Field {
    label: string;
    key: string;
}

// Props para o componente
interface PrintButtonProps {
    data: DataItem[];
    fields: Field[];
}

// Interface para o retorno do PDFDownloadLink
interface PDFDownloadLinkState {
    blob?: Blob;
    url?: string;
    loading: boolean;
    error?: Error;
}

// Componente para visualizar e imprimir ou salvar o PDF
export const PrintButton = ({ data, fields }: PrintButtonProps) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Button variant="primary" onClick={handleShowModal}>Imprimir/Guardar PDF</Button>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Visualizar PDF</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PDFViewer width="100%" height="600">
                        <PDFDocument data={data} fields={fields} />
                    </PDFViewer>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={window.print}>
                        Imprimir
                    </Button>
                    <PDFDownloadLink
                        document={<PDFDocument data={data} fields={fields} />}
                        fileName="dados_impressos.pdf"
                        style={{ textDecoration: 'none' }}
                    >
                        {({ loading }: PDFDownloadLinkState) =>
                            loading ? 'Carregando documento...' : 'Guardar como PDF'
                        }
                    </PDFDownloadLink>
                </Modal.Footer>
            </Modal>
        </>
    );
};
