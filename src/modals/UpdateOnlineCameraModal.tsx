import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "../css/PagesStyles.css";
import { Col, InputGroup, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

import hidepass from "../assets/img/login/hidepass.png";
import showpass from "../assets/img/login/showpass.png";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { Cameras } from "../types/Types";

// Define a interface Entity
export interface Entity {
  id: string;
  [key: string]: any;
}

// Interface para as propriedades do modal
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
export const UpdateOnlineCameraModal = <T extends Entity>({
  title,
  open,
  onClose,
  onUpdate,
  onDuplicate,
  fields,
  entity,
  canMoveNext,
  canMovePrev,
  onNext,
  onPrev,
}: UpdateModalProps<T>) => {
  const [formData, setFormData] = useState<Partial<Cameras>>({ ...entity });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [showIpValidationErrors, setShowIpValidationErrors] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // UseEffect para inicializar o formulário
  useEffect(() => {
    if (open && entity) {
      setFormData({ ...entity });
    } else {
      setFormData({});
    }
  }, [open, entity]);

  // UseEffect para validar o formulário
  useEffect(() => {
    const newErrors: Record<string, boolean> = {};

    const isValid = fields.every((field) => {
      const fieldValue = formData[field.key];
      let valid = true;

      if (field.required && (fieldValue === undefined || fieldValue === "")) {
        valid = false;
      }
      if (field.type === "number" && fieldValue != null) {
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

  // Função para validar o endereço IP
  const validateIPAddress = (ip: string) => {
    const regex =
      /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[1-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[1-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9])$/;
    return regex.test(ip);
  };

  // Função para manipular o clique no botão Duplicar
  const handleDuplicateClick = () => {
    if (!onDuplicate) return;
    const { id, numeroCamera, ...dataWithoutId } = formData;
    onDuplicate(dataWithoutId as T);
  };

  // Função para lidar com a mudança de valor
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? Number(value) : value;
    if (name === "ip") {
      if (validateIPAddress(value)) {
        validateForm();
      } else {
        setShowIpValidationErrors(true);
      }
    }
    if (showValidationErrors) {
      setShowValidationErrors(false);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
    validateForm();
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

  // Alterna a visibilidade da password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal show={open} onHide={onClose} backdrop="static" centered>
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <div className="container-fluid">
          <Row>
            <Col md={6}>
              <Form.Group controlId="formNumeroCamera">
                <Form.Label>
                  Número<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-numeroCamera">
                      Campo obrigatório
                    </Tooltip>
                  }
                >
                  <Form.Control
                    className={`custom-input-height form-control custom-select-font-size ${
                      showValidationErrors ? "error-border" : ""
                    }`}
                    type="number"
                    name="numeroCamera"
                    value={formData.numeroCamera || ""}
                    onChange={handleChange}
                  />
                </OverlayTrigger>
                {errors["numeroCamera"] && (
                  <div style={{ color: "red", fontSize: "small" }}>
                    {errors["numeroCamera"]}
                  </div>
                )}
              </Form.Group>
              <Form.Group controlId="formIp">
                <Form.Label>IP</Form.Label>
                <Form.Control
                  className="custom-input-height custom-select-font-size"
                  type="string"
                  name="ip"
                  isInvalid={
                    showIpValidationErrors &&
                    !validateIPAddress(formData.ip || "")
                  }
                  value={formData.ip || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formUserCamera">
                <Form.Label>Utilizador</Form.Label>
                <Form.Control
                  className="custom-input-height custom-select-font-size"
                  type="string"
                  name="userCamera"
                  value={formData.userCamera || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formNomeCamera">
                <Form.Label>
                  Nome<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-nomeCamera">Campo obrigatório</Tooltip>
                  }
                >
                  <Form.Control
                    className={`custom-input-height form-control custom-select-font-size ${
                      showValidationErrors ? "error-border" : ""
                    }`}
                    type="string"
                    name="nomeCamera"
                    value={formData.nomeCamera || ""}
                    onChange={handleChange}
                    maxLength={100}
                  />
                </OverlayTrigger>
                {errors["nomeCamera"] && (
                  <div style={{ color: "red", fontSize: "small" }}>
                    {errors["nomeCamera"]}
                  </div>
                )}
              </Form.Group>
              <Form.Group controlId="formUrl">
                <Form.Label>
                  URL<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-url">Campo obrigatório</Tooltip>
                  }
                >
                  <Form.Control
                    className={`custom-input-height form-control custom-select-font-size ${
                      showValidationErrors ? "error-border" : ""
                    }`}
                    type="string"
                    name="url"
                    placeholder="Coloque a URL completa"
                    value={formData.url || ""}
                    onChange={handleChange}
                    maxLength={200}
                  />
                </OverlayTrigger>
                {errors["url"] && (
                  <div style={{ color: "red", fontSize: "small" }}>
                    {errors["url"]}
                  </div>
                )}
              </Form.Group>
              <Form.Group controlId="formPasswordCamera">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    className="custom-input-height custom-select-font-size"
                    value={formData.passwordCamera || ""}
                    onChange={handleChange}
                    name="passwordCamera"
                    maxLength={6}
                    style={{ borderRight: "none" }}
                  />
                  <InputGroup.Text
                    style={{
                      cursor: "pointer",
                      background: "transparent",
                      borderLeft: "none",
                      height: "30px",
                    }}
                    onClick={togglePasswordVisibility}
                  >
                    <img
                      src={showPassword ? hidepass : showpass}
                      alt={
                        showPassword ? "Esconder password" : "Mostrar password"
                      }
                      style={{ width: 20, height: 20 }}
                    />
                  </InputGroup.Text>
                </InputGroup>
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
