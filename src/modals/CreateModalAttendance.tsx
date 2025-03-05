import { ChangeEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../css/PagesStyles.css";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";

import { usePersons } from "../context/PersonsContext";
import { useTerminals } from "../context/TerminalsContext";
import { Devices, Employee } from "../types/Types";

// Define a interface para os itens de campo
type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

// Define a interface para as propriedades do componente FieldConfig
interface FieldConfig {
  label: string;
  key: string;
  type: string;
  required?: boolean;
  optionsUrl?: string;
}

// Define as propriedades do componente
interface Props<T> {
  title: string;
  open: boolean;
  onClose: () => void;
  onSave: (data: T) => void;
  fields: FieldConfig[];
  initialValues: Partial<T>;
  entityType: "movimentos" | "pedidos";
}

// Função para formatar a data e hora atuais para o formato adequado
const getCurrentDateTimeLocal = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Define a interface para os dados do dropdown
interface DropdownData {
  [key: string]: Employee[] | Devices[] | undefined;
  employeeId?: Employee[];
  deviceId?: Devices[];
}

// Define o componente
export const CreateModalAttendance = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onSave,
  fields,
  initialValues,
  entityType,
}: Props<T>) => {
  const { employees } = usePersons();
  const { devices } = useTerminals();
  const [formData, setFormData] = useState<Partial<T>>({ ...initialValues });
  const [dropdownData, setDropdownData] = useState<DropdownData>({});
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
      if (field.required && !fieldValue) {
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
      const sortedEmployees = employees.sort(
        (a, b) => Number(a.enrollNumber) - Number(b.enrollNumber)
      );
      const sortedDevices = devices.sort(
        (a, b) => a.deviceNumber - b.deviceNumber
      );
      const selectedEmployee = sortedEmployees.find(
        (emp) => emp.employeeID === initialValues.selectedEmployeeIds
      );
      if (selectedEmployee) {
        setFormData((prevState) => ({
          ...prevState,
          employeeId: selectedEmployee.employeeID,
          employeeName: selectedEmployee.name,
          enrollNumber: selectedEmployee.enrollNumber,
        }));
      }
      setDropdownData((prevState) => ({
        ...prevState,
        employeeId: selectedEmployee ? [selectedEmployee] : employees,
        deviceId: sortedDevices,
      }));
    } catch (error) {
      console.error("Erro ao buscar os dados de funcionários e dispositivos.");
    }
  };

  // Atualiza o estado do componente ao abrir o modal
  useEffect(() => {
    if (open) {
      fetchDropdownOptions();
      setFormData((prevState) => ({
        ...prevState,
        initialValues,
        attendanceTime: getCurrentDateTimeLocal(),
        inOutMode: "0",
      }));
    } else {
      setFormData({});
    }
  }, [open]);

  // Define o type 3 para pedidos
  useEffect(() => {
    if (entityType === "pedidos") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        type: 3,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        inOutMode: prevFormData.inOutMode || "0",
      }));
    }
  }, [open, entityType]);

  // Função para lidar com a mudança do dropdown
  const handleDropdownChange = (
    key: string,
    e: React.ChangeEvent<FormControlElement>
  ) => {
    const { value } = e.target;
    if (key === "employeeId") {
      const selectedEmployee = dropdownData.employeeId?.find(
        (emp) => emp.employeeID === value
      );
      if (selectedEmployee) {
        setFormData((prevState) => ({
          ...prevState,
          [key]: selectedEmployee.employeeID,
          employeeName: selectedEmployee.name,
          enrollNumber: selectedEmployee.enrollNumber,
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [key]: value,
        }));
      }
    }
    if (key === "deviceId") {
      const selectedDevice = dropdownData.deviceId?.find(
        (dev) => dev.zktecoDeviceID === value
      );
      if (selectedDevice) {
        setFormData((prevState) => ({
          ...prevState,
          [key]: selectedDevice.zktecoDeviceID,
          deviceNumber: selectedDevice.deviceNumber,
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [key]: value,
        }));
      }
    }
  };

  // Função para lidar com a mudança de valor
  const handleChange = (e: ChangeEvent<FormControlElement>) => {
    const { name, value } = e.target;

    if (showValidationErrors) {
      setShowValidationErrors(false);
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para lidar com o fechamento do modal
  const handleClose = () => {
    setFormData({});
    setShowValidationErrors(false);
    onClose();
  };

  // Função para lidar com o clique no botão de guardar
  const handleSaveClick = () => {
    if (!isFormValid) {
      setShowValidationErrors(true);
      toast.warn(
        "Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar."
      );
      return;
    }
    handleSave();
  };

  // Função para lidar com o salvamento
  const handleSave = () => {
    const { initialValues, selectedEmployeeIds, ...cleanedData } = formData;
    onSave(cleanedData as T);
    handleClose();
  };

  // Opções do tipo
  const typeOptions = [
    { value: 0, label: "Entrada" },
    { value: 1, label: "Saída" },
    { value: 2, label: "Pausa - Entrada" },
    { value: 3, label: "Pausa - Saída" },
    { value: 4, label: "Hora Extra - Entrada" },
    { value: 5, label: "Hora Extra - Saída" },
  ];

  return (
    <Modal
      show={open}
      onHide={handleClose}
      backdrop="static"
      dialogClassName="custom-modal"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title className="modal-title h5">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        {entityType === "pedidos" && (
          <>
            <div className="row">
              <div className="col-md-6">
                <Form.Group controlId="formAttendanceTime">
                  <Form.Label>
                    Horário de Presença
                    <span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-attendanceTime">
                        {"Campo obrigatório"}
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="datetime-local"
                      className={`custom-input-height form-control custom-select-font-size ${
                        showValidationErrors ? "error-border" : ""
                      }`}
                      value={formData.attendanceTime || ""}
                      onChange={handleChange}
                      name="attendanceTime"
                    />
                  </OverlayTrigger>
                  {errors.attendanceTime && (
                    <div style={{ color: "red", fontSize: "small" }}>
                      {errors.attendanceTime}
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="formEmployeeId">
                  <Form.Label>
                    Funcionário
                    <span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-employeeId">
                        {"Campo obrigatório"}
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      as="select"
                      className={`custom-input-height form-control custom-select-font-size ${
                        showValidationErrors ? "error-border" : ""
                      }`}
                      value={formData.employeeId || ""}
                      onChange={(e) => handleDropdownChange("employeeId", e)}
                    >
                      <option value="">Selecione...</option>
                      {dropdownData.employeeId?.map((option) => (
                        <option
                          key={option.employeeID}
                          value={option.employeeID}
                        >
                          {option.enrollNumber} - {option.name}
                        </option>
                      ))}
                    </Form.Control>
                  </OverlayTrigger>
                  {errors.employeeId && (
                    <div style={{ color: "red", fontSize: "small" }}>
                      {errors.employeeId}
                    </div>
                  )}
                </Form.Group>
              </div>
            </div>
            <Form.Group controlId="formObservation">
              <Form.Label>Observações</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                className="custom-select-font-size textarea-large"
                value={formData.observation || ""}
                onChange={handleChange}
                name="observation"
              />
            </Form.Group>
          </>
        )}
        {entityType === "movimentos" && (
          <div className="row">
            {fields.map((field) => {
              if (
                ![
                  "deviceNumber",
                  "enrollNumber",
                  "employeeName",
                  "observation",
                  "type",
                  "verifyMode",
                  "workCode",
                ].includes(field.key)
              ) {
                return (
                  <div className="col-md-6" key={field.key}>
                    <Form.Group controlId={`form${field.key}`}>
                      <Form.Label>
                        {field.label}
                        {field.required && (
                          <span style={{ color: "red" }}> *</span>
                        )}
                      </Form.Label>
                      {field.type === "dropdown" ? (
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${field.key}`}>
                              {"Campo obrigatório"}
                            </Tooltip>
                          }
                        >
                          <Form.Control
                            as="select"
                            className="custom-input-height custom-select-font-size"
                            value={formData[field.key] || ""}
                            onChange={(e) => handleDropdownChange(field.key, e)}
                          >
                            <option value="">Selecione...</option>
                            {dropdownData[field.key]?.map((option) => (
                              <option
                                key={option.employeeID || option.zktecoDeviceID}
                                value={
                                  option.employeeID || option.zktecoDeviceID
                                }
                              >
                                {option.name || option.deviceName}
                              </option>
                            ))}
                          </Form.Control>
                        </OverlayTrigger>
                      ) : field.key === "attendanceTime" ? (
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${field.key}`}>
                              {`Campo obrigatório`}
                            </Tooltip>
                          }
                        >
                          <Form.Control
                            type={field.type}
                            className="custom-input-height custom-select-font-size"
                            value={formData[field.key] || ""}
                            onChange={handleChange}
                            name={field.key}
                          />
                        </OverlayTrigger>
                      ) : field.key === "inOutMode" ? (
                        <Form.Control
                          as="select"
                          type={field.type}
                          className="custom-input-height custom-select-font-size"
                          value={formData[field.key] || ""}
                          onChange={handleChange}
                          name={field.key}
                        >
                          {typeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Form.Control>
                      ) : (
                        <Form.Control
                          type={field.type}
                          className="custom-input-height custom-select-font-size"
                          value={formData[field.key] || ""}
                          onChange={handleChange}
                          name={field.key}
                        />
                      )}
                      {errors[field.key] && (
                        <div style={{ color: "red", fontSize: "small" }}>
                          {errors[field.key]}
                        </div>
                      )}
                    </Form.Group>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
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
          onClick={handleSaveClick}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
