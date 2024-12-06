import { useEffect, useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PDFDocument } from './PDFDocument';
import { CustomOutlineButton } from './CustomOutlineButton';
import { CustomSpinner } from './CustomSpinner';
import { Entity } from '../helpers/Types';
import * as apiService from "../helpers/apiService";

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
export const PrintButton = ({ data, fields, renderTimeout }: PrintButtonProps) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [calculatedTimeout, setCalculatedTimeout] = useState(renderTimeout || 5000);
    const [entity, setEntity] = useState<Entity[]>([]);
    const [entityLogo, setEntityLogo] = useState<Blob | null>(null);
    const [isEntityLoading, setIsEntityLoading] = useState(true);
    const [isEntityLogoLoading, setIsEntityLogoLoading] = useState(true);

    // Busca as entidades para exibir no PDF
    const fetchEntityData = async () => {
        setIsEntityLoading(true);
        try {
            const data = await apiService.fetchAllCompanyConfig();
            setEntity(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Erro ao buscar entidades:', error);
            setEntity([]);
        } finally {
            setIsEntityLoading(false);
        }
    };

    // Obtém o logotipo da entidade
    const fetchLogo = async () => {
        setIsEntityLogoLoading(true);
        try {
            const nif = localStorage.getItem('nif');
            const logo = await apiService.fetchCompanyLogo(Number(nif));
            setEntityLogo(logo);
        } catch (error) {
            console.error('Erro ao buscar logotipo:', error);
        } finally {
            setIsEntityLogoLoading(false);
        }
    };

    // Função para calcular o renderTimeout com base na quantidade de dados
    const calculateRenderTimeout = (dataLength: number): number => {
        const baseTimeout = 10000;
        const timePerItem = 20;
        return baseTimeout + (dataLength * timePerItem);
    };

    // Atualiza o estado de loading quando o modal é exibido
    useEffect(() => {
        if (showModal) {
            fetchEntityData();
            fetchLogo();
            setCalculatedTimeout(calculateRenderTimeout(data.length));
            setLoading(true);
        }
    }, [showModal, data.length]);

    // Remove o loading após o tempo de renderTimeout
    useEffect(() => {
        if (showModal && loading) {
            const timer = setTimeout(() => {
                setLoading(false);
            }, calculatedTimeout);

            return () => clearTimeout(timer);
        }
    }, [showModal, loading, calculatedTimeout]);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip className="custom-tooltip">Imprimir</Tooltip>}
            >
                <CustomOutlineButton onClick={handleShowModal} icon='bi-printer' iconSize='1.1em'></CustomOutlineButton >
            </OverlayTrigger>
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Visualizar PDF</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading || isEntityLoading || isEntityLogoLoading || !entityLogo ?
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px' }}>
                            <CustomSpinner />
                        </div> :
                        <PDFViewer width="100%" height="600">
                            <PDFDocument data={data} fields={fields} entity={entity} entityLogo={entityLogo} />
                        </PDFViewer>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-info" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                    <PDFDownloadLink
                        document={<PDFDocument data={data} fields={fields} entity={entity} entityLogo={entityLogo} />}
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