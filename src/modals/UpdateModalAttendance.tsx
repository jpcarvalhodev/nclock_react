import { ChangeEvent, useEffect, useState } from "react";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { usePersons } from "../context/PersonsContext";

// Define o tipo FormControlElement
type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

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
  entityType: "movimentos" | "pedidos";
  onNext: () => void;
  onPrev: () => void;
  canMoveNext: boolean;
  canMovePrev: boolean;
}

// Define o componente
export const UpdateModalAttendance = <T extends Entity>({
  open,
  onClose,
  onUpdate,
  onDuplicate,
  entity,
  fields,
  title,
  entityType,
  canMoveNext,
  canMovePrev,
  onNext,
  onPrev,
}: UpdateModalProps<T>) => {
  const { employees } = usePersons();
  const [formData, setFormData] = useState<T>({ ...entity });
  const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  // Usa useEffect para inicializar o formulário
  useEffect(() => {
    if (open && entity) {
      fetchDropdownOptions();
      setFormData({ ...entity });
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
      if (employees) {
        setDropdownData((prevState) => ({
          ...prevState,
          employeeId: employees,
        }));
      } else {
        console.error("Erro ao buscar os dados de funcionários.");
        return;
      }
    } catch (error) {
      console.error("Erro ao buscar os dados de funcionários e dispositivos.");
    }
  };

  // Define a função para mudar o dropdown
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
  };

  // Função para lidar com a mudança de valor
  const handleChange = (e: ChangeEvent<FormControlElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para manipular o clique no botão Duplicar
  const handleDuplicateClick = () => {
    if (!onDuplicate) return;
    const { attendanceTimeId, ...dataWithoutId } = formData;
    onDuplicate(dataWithoutId as Partial<T>);
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
    handleSubmit();
  };

  // Define a função para enviar
  const handleSubmit = () => {
    onUpdate(formData);
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
      onHide={onClose}
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
                    placement="right"
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
                    placement="right"
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
                          placement="right"
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
                          placement="right"
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
          onClick={handleSaveClick}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
