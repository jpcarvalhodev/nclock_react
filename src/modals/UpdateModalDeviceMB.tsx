import { ChangeEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "../css/PagesStyles.css";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

import { CustomOutlineButton } from "../components/CustomOutlineButton";

// Define a interface Entity
export interface Entity {
  id: string;
  [key: string]: any;
}

// Define as propriedades do componente
interface UpdateModalProps<T extends Entity> {
  open: boolean;
  onClose: () => void;
  onDuplicate: (entity: Partial<T>) => void;
  onUpdate: (entity: T) => Promise<void>;
  entity: T;
  fields: Field[];
  title: string;
  onNext: () => void;
  onPrev: () => void;
  canMoveNext: boolean;
  canMovePrev: boolean;
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
export const UpdateModalDeviceMB = <T extends Entity>({
  open,
  onClose,
  onUpdate,
  onDuplicate,
  entity,
  fields,
  title,
  canMoveNext,
  canMovePrev,
  onNext,
  onPrev,
}: UpdateModalProps<T>) => {
  const [formData, setFormData] = useState<T>({ ...entity } as T);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  // UseEffect para validar o formulário
  useEffect(() => {
    const newErrors: Record<string, boolean> = {};

    const isValid = fields.every((field) => {
      const fieldValue = formData[field.key];
      let valid = true;

      if (field.required && (fieldValue === undefined || fieldValue === "")) {
        valid = false;
      }
      if (field.type === "number" && fieldValue != null && fieldValue < 0) {
        valid = false;
      }

      return valid;
    });

    setErrors(newErrors);
    setIsFormValid(isValid);
    validateForm();
  }, [formData, fields]);

  // Função para validar o formulário
  const validateForm = () => {
    if (!showValidationErrors) return true;
    let newErrors: Record<string, boolean> = {};
    let isValid = true;

    fields.forEach((field) => {
      const fieldValue = formData[field.key];
      if (field.required && !fieldValue) {
        isValid = false;
        newErrors[field.key] = true;
      } else {
        newErrors[field.key] = false;
      }
    });

    setErrors(newErrors);
    setIsFormValid(isValid);
    return isValid;
  };

  // Atualiza o estado do componente ao abrir o modal
  useEffect(() => {
    if (open && entity) {
      setFormData((prevState) => ({
        ...prevState,
        estadoTerminal: 0,
        timeReboot: "00:00:00",
      }));
    } else {
      setFormData({ ...entity } as T);
    }
  }, [open, entity]);

  // Função para lidar com a mudança de valores nos campos
  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;
    if (showValidationErrors) {
      setShowValidationErrors(false);
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para manipular o clique no botão Duplicar
  const handleDuplicateClick = () => {
    if (!onDuplicate) return;
    const { id, ...dataWithoutId } = formData;
    onDuplicate(dataWithoutId as Partial<T>);
  };

  // Função para verificar se o formulário é válido antes de salvar
  const handleCheckForSave = () => {
    if (!isFormValid) {
      setShowValidationErrors(true);
      toast.warn(
        "Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar."
      );
      return;
    }
    handleSave();
  };

  // Função para salvar os dados
  const handleSave = () => {
    onUpdate(formData as T);
  };

  // Define as opções para o campo modelo
  const modelOptions = [{ value: "Newland U1000", label: "Newland U1000" }];

  return (
    <Modal show={open} onHide={onClose} backdrop="static" centered>
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <div className="container-fluid">
          <Row>
            {[
              {
                key: "nomeQuiosque",
                label: "Nome do Terminal",
                type: "string",
                required: true,
              },
              { key: "modelo", label: "Modelo", type: "string" },
            ].map((field) => (
              <Col md={12} key={field.key}>
                <Form.Group controlId={`form${field.key}`}>
                  {field.required ? (
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id={`tooltip-${field.key}`}>
                          Campo obrigatório
                        </Tooltip>
                      }
                    >
                      <Form.Label>
                        {field.label}{" "}
                        <span style={{ color: "red", marginLeft: "5px" }}>
                          *
                        </span>
                      </Form.Label>
                    </OverlayTrigger>
                  ) : (
                    <Form.Label>{field.label}</Form.Label>
                  )}
                  {field.key === "modelo" ? (
                    <Form.Control
                      as="select"
                      name={field.key}
                      value={formData[field.key] || ""}
                      onChange={handleChange}
                      className="custom-input-height custom-select-font-size"
                    >
                      <option value="">Selecione...</option>
                      {modelOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  ) : (
                    <Form.Control
                      type={field.type === "number" ? "number" : "text"}
                      value={formData[field.key] || ""}
                      onChange={handleChange}
                      name={field.key}
                      className={`custom-input-height custom-select-font-size ${
                        showValidationErrors ? "error-border" : ""
                      }`}
                    />
                  )}
                  {errors[field.key] && (
                    <Form.Text className="text-danger">
                      {errors[field.key]}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
            ))}
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
          onClick={onClose}
        >
          Fechar
        </Button>
        <Button
          className="narrow-mobile-modal-button"
          variant="outline-dark"
          onClick={handleCheckForSave}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
