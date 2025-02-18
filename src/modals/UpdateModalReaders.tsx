import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../css/PagesStyles.css";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

import { CustomOutlineButton } from "../components/CustomOutlineButton";

// Define a interface Entity
export interface Entity {
  id: string;
  [key: string]: any;
}

// Define a interface Field
interface Field {
  key: string;
  label: string;
  type: string;
  required?: boolean;
  optionsUrl?: string;
  validate?: (value: any) => boolean;
}

// Define as propriedades do componente
interface UpdateModalProps<T extends Entity> {
  open: boolean;
  onClose: () => void;
  onUpdate: (entity: T) => Promise<void>;
  entity: T;
  fields: Field[];
  title: string;
  onNext: () => void;
  onPrev: () => void;
  canMoveNext: boolean;
  canMovePrev: boolean;
}

// Define o componente
export const UpdateModalReaders = <T extends Entity>({
  title,
  open,
  onClose,
  onUpdate,
  entity,
  canMoveNext,
  canMovePrev,
  onNext,
  onPrev,
}: UpdateModalProps<T>) => {
  const [formData, setFormData] = useState<Partial<T>>({ ...entity });

  // Usa useEffect para inicializar o formulário
  useEffect(() => {
    if (open && entity) {
      setFormData({ ...entity });
    }
  }, [open, entity]);

  // Função para lidar com a mudança de valores nos campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const parsedValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  // Função para salvar os dados
  const handleUpdate = () => {
    onUpdate(formData as T);
  };

  return (
    <Modal show={open} onHide={onClose} backdrop="static" centered>
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <div className="container-fluid">
          <Row>
            <Col md={12}>
              <Form.Group controlId="formNameReader">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  className="custom-input-height custom-select-font-size"
                  type="string"
                  name="nameReader"
                  value={formData.nameReader}
                  onChange={handleChange}
                  maxLength={100}
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
            strategy: "fixed",
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
            strategy: "fixed",
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
        <Button variant="outline-dark" onClick={onClose}>
          Fechar
        </Button>
        <Button variant="outline-dark" onClick={handleUpdate}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
