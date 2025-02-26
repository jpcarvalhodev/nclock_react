import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../css/PagesStyles.css";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { CustomOutlineButton } from "../components/CustomOutlineButton";

// Interface para as propriedades do modal
interface CreateModalProps<T> {
  title: string;
  open: boolean;
  onClose: () => void;
  onUpdate: (data: Partial<T>) => void;
  onDuplicate?: (data: T) => void;
  fields: Field[];
  entity: T;
  onNext?: () => void;
  onPrev?: () => void;
  canMoveNext?: boolean;
  canMovePrev?: boolean;
}

// Interface para os campos do formulário
interface Field {
  key: string;
  label: string;
  type: string;
  required?: boolean;
  validate?: (value: any) => boolean;
  errorMessage?: string;
}

// Define o componente
export const UpdateModalMotive = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onUpdate,
  onDuplicate,
  entity,
  onNext,
  onPrev,
  canMoveNext,
  canMovePrev,
}: CreateModalProps<T>) => {
  const [formData, setFormData] = useState<Partial<T>>({ ...entity });

  // Atualiza o estado do formulário quando a entidade muda
  useEffect(() => {
    if (open) {
      setFormData({ ...entity });
    }
  }, [open, entity]);

  // Função para manipular o clique no botão Duplicar
  const handleDuplicateClick = () => {
    if (!onDuplicate) return;
    onDuplicate(formData as T);
  };

  // Função para lidar com a mudança de valores nos campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const parsedValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
  };

  // Função para fechar o modal
  const handleClose = () => {
    setFormData({});
    onClose();
  };

  // Função para salvar os dados
  const handleSave = () => {
    onUpdate(formData as T);
    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <div className="container-fluid">
          <Row>
            <Col>
              <Form.Group controlId="formDescricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  className="custom-input-height custom-select-font-size"
                  type="text"
                  name="descricao"
                  value={formData.descricao || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#f2f2f2" }}>
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
          overlay={<Tooltip className="custom-tooltip">Anterior</Tooltip>}
        >
          <CustomOutlineButton
            icon="bi-arrow-left"
            onClick={onPrev}
            disabled={!canMovePrev}
          />
        </OverlayTrigger>
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
          overlay={<Tooltip className="custom-tooltip">Seguinte</Tooltip>}
        >
          <CustomOutlineButton
            className="arrows-modal"
            icon="bi-arrow-right"
            onClick={onNext}
            disabled={!canMoveNext}
          />
        </OverlayTrigger>
        <Button
          className="narrow-mobile-modal-button"
          variant="outline-dark"
          onClick={handleDuplicateClick}
        >
          Duplicar
        </Button>
        <Button
          className="narrow-mobile-modal-button"
          variant="outline-dark"
          onClick={handleClose}
        >
          Fechar
        </Button>
        <Button
          className="narrow-mobile-modal-button"
          variant="outline-dark"
          onClick={handleSave}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
