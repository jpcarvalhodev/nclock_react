import { useEffect, useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Modal, Button, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
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
    renderTimeout?: number;
}

// Componente para visualizar e imprimir ou salvar o PDF
export const PrintButton = ({ data, fields, renderTimeout = 5000 }: PrintButtonProps) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // Atualiza o estado de loading quando o modal é exibido
    useEffect(() => {
        if (showModal) {
            setLoading(true);
        }
    }, [showModal]);

    // Remove o loading após o tempo de renderTimeout
    useEffect(() => {
        if (showModal && loading) {
            const timer = setTimeout(() => {
                setLoading(false);
            }, renderTimeout);

            return () => clearTimeout(timer);
        }
    }, [showModal, loading, renderTimeout]);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Imprimir</Tooltip>}
            >
                <CustomOutlineButton onClick={handleShowModal} icon='bi-printer' iconSize='1.1em'></CustomOutlineButton >
            </OverlayTrigger>
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Visualizar PDF</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ?
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px' }}>
                            <Spinner style={{ width: '100px', height: '100px' }} animation="border" />
                        </div> :
                        <PDFViewer width="100%" height="600">
                            <PDFDocument data={data} fields={fields} />
                        </PDFViewer>
                    }
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