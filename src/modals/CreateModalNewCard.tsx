import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "../css/PagesStyles.css";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

import { usePersons } from "../context/PersonsContext";
import { useTerminals } from "../context/TerminalsContext";
import { NewTransactionCard } from "../types/Types";

// Define a interface para os itens de campo
type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

// Interface para as propriedades do modal
interface CreateModalProps<T> {
  title: string;
  open: boolean;
  onClose: () => void;
  onSave: (data: T) => void;
  fields: Field[];
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

// Valores iniciais
const initialValues: Partial<NewTransactionCard> = {
  eventDoorId: 3,
};

// Define o componente
export const CreateModalNewCard = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onSave,
  fields,
}: CreateModalProps<T>) => {
  const { devices } = useTerminals();
  const { fetchAllCardData } = usePersons();
  const [formData, setFormData] = useState<Partial<T>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  // UseEffect para inicializar o formulário
  useEffect(() => {
    if (open) {
      fetchDropdownOptions();
      setFormData(initialValues as Partial<T>);
    } else {
      setFormData({});
    }
  }, [open, devices]);

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

  // Função para buscar os dados dos dropdowns
  const fetchDropdownOptions = async () => {
    try {
      const employeeCard = await fetchAllCardData();
      const sortedPin = employeeCard.sort(
        (a: any, b: any) => a.enrollNumber - b.enrollNumber
      );
      setDropdownData({
        deviceSN: devices,
        pin: sortedPin,
      });
    } catch (error) {
      console.error(
        "Erro ao buscar os dados de funcionários, cartões e dispositivos",
        error
      );
    }
  };

  // Função para lidar com a mudança do dropdown
  const handleDropdownChange = (
    key: string,
    e: React.ChangeEvent<FormControlElement>
  ) => {
    const { value } = e.target;
    const selectedOption = dropdownData[key]?.find((option: any) => {
      switch (key) {
        case "deviceSN":
          return option.zktecoDeviceID === value;
        case "pin":
          return option.enrollNumber === value;
        default:
          return false;
      }
    });

    if (selectedOption) {
      const idKey = key;
      setFormData((prevState) => ({
        ...prevState,
        [idKey]: value,
        cardNo: selectedOption.cardNumber,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  // Função para lidar com a mudança de valores nos campos
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type } = e.target;

    if (showValidationErrors) {
      setShowValidationErrors(false);
    }

    const formattedValue = type === "number" ? parseFloat(value) || 0 : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));
  };

  // Função para limpar e fechar o modal
  const handleClose = () => {
    setFormData({});
    setShowValidationErrors(false);
    onClose();
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
    onSave(formData as T);
    handleClose();
  };

  return (
    <Modal
      show={open}
      onHide={handleClose}
      backdrop="static"
      size="xl"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <div className="container-fluid">
          <Row>
            <Col md={3}>
              <Form.Group controlId="formEventTime">
                <Form.Label>
                  Data do Evento<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-eventTime">Campo obrigatório</Tooltip>
                  }
                >
                  <Form.Control
                    className={`custom-input-height custom-select-font-size ${
                      showValidationErrors ? "error-border" : ""
                    }`}
                    type="datetime-local"
                    name="eventTime"
                    value={
                      formData.eventTime
                        ? new Date(formData.eventTime)
                            .toISOString()
                            .slice(0, 16)
                        : ""
                    }
                    onChange={handleChange}
                  />
                </OverlayTrigger>
                {errors["eventTime"] && (
                  <div style={{ color: "red", fontSize: "small" }}>
                    {errors["eventTime"]}
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formPin">
                <Form.Label>
                  Funcionário<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-pin">Campo obrigatório</Tooltip>
                  }
                >
                  <Form.Control
                    as="select"
                    className={`custom-input-height custom-select-font-size ${
                      showValidationErrors ? "error-border" : ""
                    }`}
                    value={formData.pin || ""}
                    onChange={(e) => handleDropdownChange("pin", e)}
                  >
                    <option value="">Selecione...</option>
                    {dropdownData.pin?.map((option: any) => {
                      let optionId, optionName;
                      switch ("pin") {
                        case "pin":
                          optionId = option.enrollNumber;
                          optionName =
                            option.enrollNumber + " - " + option.employeeName;
                          break;
                        default:
                          optionId = option.id;
                          optionName = option.name;
                          break;
                      }
                      return (
                        <option key={optionId} value={optionId}>
                          {optionName}
                        </option>
                      );
                    })}
                  </Form.Control>
                </OverlayTrigger>
                {errors["pin"] && (
                  <div style={{ color: "red", fontSize: "small" }}>
                    {errors["pin"]}
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formDeviceSN">
                <Form.Label>
                  Nome do Local<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-deviceSN">Campo obrigatório</Tooltip>
                  }
                >
                  <Form.Control
                    as="select"
                    className={`custom-input-height custom-select-font-size ${
                      showValidationErrors ? "error-border" : ""
                    }`}
                    value={formData.deviceSN || ""}
                    onChange={(e) => handleDropdownChange("deviceSN", e)}
                  >
                    <option value="">Selecione...</option>
                    {dropdownData.deviceSN?.map((option: any) => {
                      let optionId, optionName;
                      switch ("deviceSN") {
                        case "deviceSN":
                          optionId = option.serialNumber;
                          optionName = option.deviceName;
                          break;
                        default:
                          optionId = option.id;
                          optionName = option.name;
                          break;
                      }
                      return (
                        <option key={optionId} value={optionId}>
                          {optionName}
                        </option>
                      );
                    })}
                  </Form.Control>
                </OverlayTrigger>
                {errors["deviceSN"] && (
                  <div style={{ color: "red", fontSize: "small" }}>
                    {errors["deviceSN"]}
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
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
          onClick={handleCheckForSave}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
