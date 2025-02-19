import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

import * as apiService from "../api/apiService";
import { useEntity } from "../context/EntityContext";
import { useTerminals } from "../context/TerminalsContext";

import { CustomOutlineButton } from "./CustomOutlineButton";
import { CustomSpinner } from "./CustomSpinner";
import { PDFDocument } from "./PDFDocument";

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
  showModalOnInit?: boolean;
  renderTimeout?: number;
  onClose?: () => void;
}

// Componente para visualizar e imprimir ou salvar o PDF
export const PrintButton = ({
  data,
  fields,
  renderTimeout,
  showModalOnInit,
  onClose,
}: PrintButtonProps) => {
  const { devices, mbDevices, accessControl } = useTerminals();
  const { entities } = useEntity();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calculatedTimeout, setCalculatedTimeout] = useState(
    renderTimeout || 5000
  );
  const [entityLogo, setEntityLogo] = useState<Blob | null>(null);
  const [isEntityLogoLoading, setIsEntityLogoLoading] = useState(true);

  // Obtém o logotipo da entidade
  const fetchLogo = async () => {
    setIsEntityLogoLoading(true);
    try {
      const nif = localStorage.getItem("nif");
      const logo = await apiService.fetchCompanyLogo(Number(nif));
      setEntityLogo(logo);
    } catch (error) {
      console.error("Erro ao buscar logotipo:", error);
    } finally {
      setIsEntityLogoLoading(false);
    }
  };

  // Exibe o modal ao iniciar pela navbar
  useEffect(() => {
    if (showModalOnInit) {
      setShowModal(true);
    }
  }, [showModalOnInit]);

  // Função para calcular o renderTimeout com base na quantidade de dados
  const calculateRenderTimeout = (dataLength: number): number => {
    const baseTimeout = 5000;
    const timePerItem = 50;
    return baseTimeout + dataLength * timePerItem;
  };

  // Atualiza o estado de loading quando o modal é exibido
  useEffect(() => {
    if (showModal) {
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
  const handleCloseModal = () => {
    setShowModal(false);
    onClose && onClose();
  };

  return (
    <>
      <OverlayTrigger
        placement="top"
        delay={0}
        container={document.body}
        popperConfig={{
          modifiers: [
            {
              name: "preventOverflow",
              options: {
                boundary: "window",
              },
            },
          ],
        }}
        overlay={<Tooltip className="custom-tooltip">Imprimir</Tooltip>}
      >
        <CustomOutlineButton
          onClick={handleShowModal}
          icon="bi-printer"
          iconSize="1.1em"
        ></CustomOutlineButton>
      </OverlayTrigger>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="xl"
        backdrop="static"
      >
        <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
          <Modal.Title>Visualizar PDF</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading || isEntityLogoLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "600px",
              }}
            >
              <CustomSpinner />
            </div>
          ) : data.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "600px",
              }}
            >
              <h3>Não há dados para exibir.</h3>
            </div>
          ) : (
            <PDFViewer width="100%" height="600px">
              <PDFDocument
                data={data}
                fields={fields}
                entity={entities}
                entityLogo={entityLogo}
                device={devices}
                mbDevice={mbDevices}
                accessControl={accessControl}
              />
            </PDFViewer>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f2f2f2" }}>
          <Button variant="outline-secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <PDFDownloadLink
            document={
              <PDFDocument
                data={data}
                fields={fields}
                entity={entities}
                entityLogo={entityLogo}
                device={devices}
                mbDevice={mbDevices}
                accessControl={accessControl}
              />
            }
            fileName="dados_impressos.pdf"
          >
            <Button variant="outline-primary">Guardar</Button>
          </PDFDownloadLink>
        </Modal.Footer>
      </Modal>
    </>
  );
};
