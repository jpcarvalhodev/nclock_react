import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import {
  Button,
  FormCheck,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { toast } from "react-toastify";

import * as apiService from "../api/apiService";
import { useEntity } from "../context/EntityContext";
import { useTerminals } from "../context/TerminalsContext";

import { CustomOutlineButton } from "./CustomOutlineButton";
import { CustomSpinner } from "./CustomSpinner";
import { PDFDocument } from "./PDFDocument";

interface DataItem {
  [key: string]: any;
}

interface Field {
  label: string;
  key: string;
}

interface PrintButtonProps {
  icon?: string;
  iconSize?: string;
  data: DataItem[];
  fields: Field[];
  showModalOnInit?: boolean;
  renderTimeout?: number;
  onClose?: () => void;
}

export const PrintButton = ({
  data = [],
  fields = [],
  renderTimeout,
  showModalOnInit,
  onClose,
}: PrintButtonProps) => {
  const { devices, mbDevices, accessControl } = useTerminals();
  const { entities } = useEntity();

  // Estados do modal de impressão
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calculatedTimeout, setCalculatedTimeout] = useState(
    renderTimeout || 5000
  );
  const [entityLogo, setEntityLogo] = useState<Blob | null>(null);
  const [isEntityLogoLoading, setIsEntityLogoLoading] = useState(true);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [columnsConfirmed, setColumnsConfirmed] = useState(false);
  const [readyToLoad, setReadyToLoad] = useState(false);

  // Exibe o modal ao iniciar pela navbar
  useEffect(() => {
    if (showModalOnInit) {
      setShowModal(true);
    }
  }, [showModalOnInit]);

  // Função para obter o logotipo da entidade
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

  // Ao abrir o modal de impressão, reinicia os estados de seleção e readyToLoad
  const handleShowModal = () => {
    setShowModal(true);
    setColumnsConfirmed(false);
    setReadyToLoad(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    onClose && onClose();
  };

  // Quando o usuário confirmar a seleção de colunas, atualiza os estados
  const handleConfirmColumns = () => {
    if (selectedColumns.length === 0) {
      toast.warn("Selecione ao menos uma coluna para visualizar o PDF.");
      return;
    }
    setColumnsConfirmed(true);
    setReadyToLoad(true);
  };

  // Calcula o tempo de renderização (usado somente após readyToLoad)
  const calculateRenderTimeout = (dataLength: number): number => {
    const baseTimeout = 5000;
    const timePerItem = 200;
    return baseTimeout + dataLength * timePerItem;
  };

  // Inicia o carregamento dos dados do PDF somente quando readyToLoad for true
  useEffect(() => {
    if (showModal && readyToLoad) {
      fetchLogo();
      setCalculatedTimeout(calculateRenderTimeout(data?.length || 0));
      setLoading(true);
    }
  }, [showModal, readyToLoad, data?.length]);

  // Remove o loading após o tempo calculado
  useEffect(() => {
    if (showModal && loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, calculatedTimeout);
      return () => clearTimeout(timer);
    }
  }, [showModal, loading, calculatedTimeout]);

  // Função para alternar a seleção de todas as colunas
  const handleSelectAllToggle = (checked: boolean) => {
    if (checked) {
      const allKeys = fields.map((field) => field.key);
      setSelectedColumns(allKeys);
    } else {
      setSelectedColumns([]);
    }
  };

  return (
    <>
      <OverlayTrigger
        placement="top"
        delay={0}
        container={document.body}
        popperConfig={{
          modifiers: [
            { name: "preventOverflow", options: { boundary: "window" } },
          ],
        }}
        overlay={<Tooltip className="custom-tooltip">Imprimir</Tooltip>}
      >
        <CustomOutlineButton
          onClick={handleShowModal}
          icon="bi-printer"
          iconSize="1.1em"
        />
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
          {!columnsConfirmed ? (
            <div style={{ padding: "2rem" }}>
              <h4>Selecione as colunas desejadas para visualizar no PDF</h4>
              <div
                style={{
                  marginBottom: "2rem",
                  marginTop: "2rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormCheck
                  type="checkbox"
                  label="Selecionar Todas"
                  checked={selectedColumns.length === fields.length}
                  onChange={(e) => handleSelectAllToggle(e.target.checked)}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "10px",
                  marginTop: "1rem",
                }}
              >
                {fields.map(({ label, key }) => (
                  <FormCheck
                    key={key}
                    type="checkbox"
                    label={label}
                    checked={selectedColumns.includes(key)}
                    onChange={() =>
                      setSelectedColumns((prev) =>
                        prev.includes(key)
                          ? prev.filter((col) => col !== key)
                          : [...prev, key]
                      )
                    }
                  />
                ))}
              </div>
              <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                <Button variant="outline-dark" onClick={handleConfirmColumns}>
                  Confirmar Colunas
                </Button>
              </div>
            </div>
          ) : readyToLoad ? (
            loading || isEntityLogoLoading ? (
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
                <h3>Não existem dados disponíveis para mostrar.</h3>
              </div>
            ) : (
              <PDFViewer width="100%" height="600px">
                <PDFDocument
                  data={data}
                  fields={fields.filter((field) =>
                    selectedColumns.includes(field.key)
                  )}
                  entity={entities}
                  entityLogo={entityLogo}
                  device={devices}
                  mbDevice={mbDevices}
                  accessControl={accessControl}
                />
              </PDFViewer>
            )
          ) : (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <h4>Aguardando confirmação das colunas...</h4>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f2f2f2" }}>
          <Button variant="outline-dark" onClick={handleCloseModal}>
            Fechar
          </Button>
          {columnsConfirmed && !loading && (
            <PDFDownloadLink
              document={
                <PDFDocument
                  data={data}
                  fields={fields.filter((field) =>
                    selectedColumns.includes(field.key)
                  )}
                  entity={entities}
                  entityLogo={entityLogo}
                  device={devices}
                  mbDevice={mbDevices}
                  accessControl={accessControl}
                />
              }
              fileName="dados_impressos.pdf"
            >
              <Button variant="outline-dark">Guardar</Button>
            </PDFDownloadLink>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
