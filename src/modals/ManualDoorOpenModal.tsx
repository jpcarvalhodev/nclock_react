import { ChangeEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "../css/PagesStyles.css";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

import { useTerminals } from "../context/TerminalsContext";
import { Doors } from "../types/Types";

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
  onSave: (data: Partial<T>) => void;
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

// Define o componente
export const ManualDoorOpenModal = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onSave,
  fields,
}: CreateModalProps<T>) => {
  const { devices, door } = useTerminals();
  const [formData, setFormData] = useState<Partial<T>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
  const [allDoors, setAllDoors] = useState<Doors[]>([]);
  const [filteredDoors, setFilteredDoors] = useState<Doors[]>([]);
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

  // Função para buscar as opções do dropdown
  const fetchDropdownOptions = async () => {
    try {
      const sortedDoor = door.sort((a, b) => a.doorNo - b.doorNo);
      const sortedDevice = devices.sort(
        (a, b) => a.deviceNumber - b.deviceNumber
      );
      setDropdownData({
        doorId: sortedDoor,
        deviceId: sortedDevice,
      });
      setAllDoors(door);
    } catch (error) {
      console.error(
        "Erro ao buscar os dados de funcionários, portas e períodos",
        error
      );
    }
  };

  // Atualiza o estado do componente ao abrir o modal
  useEffect(() => {
    if (open) {
      setFormData((prevState) => ({
        ...prevState,
        nomeResponsavel: localStorage.getItem("username") || "",
      }));
      fetchDropdownOptions();
    } else {
      setFormData({});
    }
  }, [open]);

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

  // Função para lidar com a mudança do dropdown
  const handleDropdownChange = (
    key: string,
    e: React.ChangeEvent<FormControlElement>
  ) => {
    const { value } = e.target;
    if (key === "deviceId") {
      const filtered = allDoors.filter((door) => door.devId === value);
      setFilteredDoors(filtered);

      setFormData((prevState) => ({
        ...prevState,
        [key]: value,
        doorId: "",
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  // Função para limpar e fechar o modal
  const handleClose = () => {
    setFormData({});
    setDropdownData({});
    setShowValidationErrors(false);
    onClose();
  };

  // Função para verificar se o formulário é válido antes de salvar
  const handleCheckForSave = () => {
    const keysToCheck = ["deviceId", "doorId", "observacoes"];
    const areAllRequiredFieldsFilled = keysToCheck.every(
      (key) => formData[key]
    );
    if (!isFormValid || !areAllRequiredFieldsFilled) {
      setShowValidationErrors(true);
      toast.warn("Preencha todos os campos obrigatórios antes de abrir.");
      return;
    }
    handleSave();
  };

  // Função para salvar os dados
  const handleSave = () => {
    onSave(formData as Partial<T>);
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
            {[
              {
                key: "deviceId",
                label: "Dispositivo",
                type: "dropdown",
                required: true,
              },
              {
                key: "doorId",
                label: "Abertura",
                type: "dropdown",
                required: true,
              },
              {
                key: "observacoes",
                label: "Observações",
                type: "string",
                required: true,
              },
            ].map((field) => (
              <Col md={3} key={field.key}>
                <Form.Group controlId={`form${field.key}`}>
                  {field.required ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-${field.key}`}>
                          Campo obrigatório
                        </Tooltip>
                      }
                    >
                      <Form.Label>
                        {field.label}
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                    </OverlayTrigger>
                  ) : (
                    <Form.Label>{field.label}</Form.Label>
                  )}
                  {field.type === "dropdown" ? (
                    <Form.Control
                      as="select"
                      className={`custom-input-height form-control custom-select-font-size ${
                        showValidationErrors ? "error-border" : ""
                      }`}
                      value={formData[field.key] || ""}
                      onChange={(e) => handleDropdownChange(field.key, e)}
                    >
                      <option value="">Selecione...</option>
                      {(field.key === "doorId"
                        ? filteredDoors
                        : dropdownData[field.key]
                      )?.map((option) => {
                        let optionId, optionName;
                        if (field.key === "deviceId") {
                          optionId = option.zktecoDeviceID;
                          optionName = option.deviceName;
                        } else if (field.key === "doorId") {
                          optionId = option.id;
                          optionName = option.name;
                        } else {
                          optionId = option.id;
                          optionName = option.name;
                        }
                        return (
                          <option key={optionId} value={optionId}>
                            {optionName}
                          </option>
                        );
                      })}
                    </Form.Control>
                  ) : (
                    <Form.Control
                      type={field.type}
                      className={`custom-input-height form-control custom-select-font-size ${
                        showValidationErrors ? "error-border" : ""
                      }`}
                      value={formData[field.key] || ""}
                      onChange={handleChange}
                      name={field.key}
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
          Abrir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
