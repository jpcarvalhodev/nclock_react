import { useEffect, useState } from "react";
import {
  Col,
  Form,
  Nav,
  OverlayTrigger,
  Row,
  Tab,
  Tooltip,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../css/PagesStyles.css";
import { toast } from "react-toastify";

import { KioskConfig } from "../types/Types";

// Define a interface para os itens de erro
interface ErrorDetails {
  hasError: boolean;
  message: string;
}

// Define a interface para os itens de erro
interface ErrorRecord {
  [key: string]: ErrorDetails;
}

// Define a interface para as propriedades do componente
interface FieldConfig {
  label: string;
  key: string;
  type: string;
  required?: boolean;
  validate?: (value: any) => boolean;
  errorMessage?: string;
}

// Define a interface para as propriedades do componente
interface Props<T> {
  open: boolean;
  onClose: () => void;
  onSave: (kioskFormData: T) => Promise<void>;
  onUpdate: (kioskFormData: T) => Promise<void>;
  entity: T;
  fields: FieldConfig[];
  title: string;
}

export const KioskOptionsModal = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onSave,
  onUpdate,
  entity,
  fields,
}: Props<T>) => {
  const [kioskFormData, setKioskFormData] = useState<T>({ ...entity });
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState<ErrorRecord>({});
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  // Atualiza o formData com os dados da entity
  useEffect(() => {
    if (entity) {
      const kioskData: Partial<KioskConfig> = {
        amount:
          typeof entity.amount === "number"
            ? entity.amount.toFixed(2)
            : entity.amount,
        totalMoedas: entity.totalMoedas,
        emails: Array.isArray(entity.emails)
          ? entity.emails
          : entity.emails
          ? entity.emails.split(", ")
          : [],
      };

      setKioskFormData(kioskData as T);
    }
  }, [entity]);

  // Limpa os dados do formulário quando o modal é fechado
  useEffect(() => {
    if (!open) {
      setKioskFormData({} as T);
    }
  }, [open]);

  // Usa useEffect para validar o formulário
  useEffect(() => {
    const newErrors: ErrorRecord = {};
    let isValid = true;

    fields.forEach((field) => {
      const fieldValue = kioskFormData[field.key];
      if (field.required && (fieldValue === null || fieldValue === "")) {
        isValid = false;
      }

      if (field.type === "number" && fieldValue != null && fieldValue < 0) {
        isValid = false;
      }
    });

    setErrors(newErrors);
    setIsFormValid(isValid);
    validateForm();
  }, [kioskFormData, fields]);

  // Função para validar o formulário
  const validateForm = () => {
    if (!showValidationErrors) return true;
    let newErrors: ErrorRecord = {};
    let isValid = true;

    fields.forEach((field) => {
      const fieldValue = kioskFormData[field.key];
      if (field.required && !fieldValue) {
        isValid = false;
      } else if (field.validate && !field.validate(fieldValue)) {
        isValid = false;
      }
    });

    if (
      kioskFormData.emails &&
      !validateEmail(kioskFormData.emails as string)
    ) {
      isValid = false;
      newErrors["emails"] = { hasError: true, message: "O email é inválido." };
    }

    setErrors(newErrors);
    setIsFormValid(isValid);
    return isValid;
  };

  // Função para validar o email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Chame validateForm apropriadamente em useEffect
  useEffect(() => {
    validateForm();
  }, [kioskFormData, fields]);

  // Função para lidar com a mudança de valor
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    let parsedValue: string | number | boolean | string[];

    if (showValidationErrors) {
      setShowValidationErrors(false);
    }

    if (type === "checkbox") {
      parsedValue = (e.target as HTMLInputElement).checked;
    } else if (name === "amount") {
      const formattedValue = value.replace(/,/g, ".");
      parsedValue = formattedValue;
    } else if (type === "number") {
      parsedValue = value === "" ? "" : Number(value);
    } else if (name === "emails" && type === "textarea") {
      parsedValue = value.split(",").map((email) => email.trim());
    } else {
      parsedValue = value;
    }

    setKioskFormData((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  // Função para limpar e fechar o modal
  const handleClose = () => {
    setKioskFormData({ ...entity });
    setShowValidationErrors(false);
    onClose();
  };

  // Função para lidar com o clique em adicionar ou atualizar
  const handleAddOrUpdate = () => {
    if (
      entity.amount !== 0 &&
      entity.totalMoedas !== 0 &&
      entity.emails.length !== 0
    ) {
      handleUpdateClick();
    } else {
      handleSaveClick();
    }
  };

  // Função para lidar com o clique em guardar
  const handleSaveClick = () => {
    if (!isFormValid) {
      setShowValidationErrors(true);
      toast.warn(
        "Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar."
      );
      return;
    }
    const formattedData = {
      ...kioskFormData,
      amount: parseFloat(kioskFormData.amount).toFixed(2),
    };
    onSave(formattedData as T);
    handleClose();
  };

  // Função para lidar com o clique em atualizar
  const handleUpdateClick = () => {
    if (!isFormValid) {
      setShowValidationErrors(true);
      toast.warn(
        "Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar."
      );
      return;
    }
    const formattedData = {
      ...kioskFormData,
      amount: parseFloat(kioskFormData.amount).toFixed(2),
    };
    onUpdate(formattedData as T);
  };

  return (
    <Modal
      show={open}
      onHide={handleClose}
      backdrop="static"
      dialogClassName="modal-scrollable"
      size="lg"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <div className="container-fluid">
          <Tab.Container defaultActiveKey="configKiosk">
            <Nav variant="tabs" className="nav-modal">
              <Nav.Item>
                <Nav.Link eventKey="configKiosk">
                  Configuração Quiosque
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="configKiosk">
                <Form
                  style={{ marginTop: 10, marginBottom: 10, display: "flex" }}
                >
                  <Row style={{ flex: 1.5 }}>
                    <Col md={6}>
                      <Form.Group controlId="formAmount">
                        <Form.Label>
                          Valor <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-amount">
                              Campo obrigatório
                            </Tooltip>
                          }
                        >
                          <Form.Control
                            className={`custom-input-height form-control custom-select-font-size ${
                              showValidationErrors ? "error-border" : ""
                            }`}
                            type="text"
                            name="amount"
                            value={kioskFormData.amount || ""}
                            onChange={handleChange}
                          />
                        </OverlayTrigger>
                        {errors["amount"] && errors["amount"].hasError && (
                          <Form.Text className="text-danger">
                            {errors["amount"].message}
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group controlId="formTotalMoedas">
                        <Form.Label>
                          Total Moedas <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-totalMoedas">
                              Campo obrigatório
                            </Tooltip>
                          }
                        >
                          <Form.Control
                            className={`custom-input-height form-control custom-select-font-size ${
                              showValidationErrors ? "error-border" : ""
                            }`}
                            type="number"
                            name="totalMoedas"
                            value={kioskFormData.totalMoedas || ""}
                            onChange={handleChange}
                          />
                        </OverlayTrigger>
                        {errors["totalMoedas"] &&
                          errors["totalMoedas"].hasError && (
                            <Form.Text className="text-danger">
                              {errors["totalMoedas"].message}
                            </Form.Text>
                          )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formEmails">
                        <Form.Label>
                          E-Mails <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-emails">
                              Digite os e-mails separados por vírgula.
                            </Tooltip>
                          }
                        >
                          <Form.Control
                            className={`custom-input-height form-control custom-select-font-size ${
                              showValidationErrors ? "error-border" : ""
                            }`}
                            type="email"
                            as="textarea"
                            name="emails"
                            value={
                              Array.isArray(kioskFormData.emails)
                                ? kioskFormData.emails.join(",")
                                : ""
                            }
                            onChange={handleChange}
                            multiple
                            rows={4}
                          />
                        </OverlayTrigger>
                        {errors["emails"] && errors["emails"].hasError && (
                          <Form.Text className="text-danger">
                            {errors["emails"].message}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#f2f2f2" }}>
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
          onClick={handleAddOrUpdate}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
