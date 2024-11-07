import { useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Modal, Button } from 'react-bootstrap';
import { PDFDocument } from './PDFDocument';
import { CustomOutlineButton } from './CustomOutlineButton';

// Interfaces para os itens de dados e campos
interface DataItem {
    [key: string]: any;
}

// Interface para os campos
interface Field {
    label: string;
    key: string;
}

// Props para o componente
interface PrintButtonProps {
    icon?: string;
    iconSize?: string;
    data: DataItem[];
    fields: Field[];
}

// Componente para visualizar e imprimir ou salvar o PDF
export const PrintButton = ({ data, fields }: PrintButtonProps) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <CustomOutlineButton onClick={handleShowModal} icon='bi-printer' iconSize='1.1em'></CustomOutlineButton >

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
                    <Button variant="outline-info" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                    <PDFDownloadLink
                        document={<PDFDocument data={data} fields={fields} />}
                        fileName="dados_impressos.pdf"
                    >
                        <Button variant="outline-secondary">
                            Guardar
                        </Button>
                    </PDFDownloadLink>
                    <Button variant="outline-primary" onClick={window.print}>
                        Imprimir
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
