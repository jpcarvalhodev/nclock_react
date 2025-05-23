import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../css/PagesStyles.css";
import {
  Col,
  Form,
  InputGroup,
  Nav,
  OverlayTrigger,
  Row,
  Tab,
  Tooltip,
} from "react-bootstrap";
import { toast } from "react-toastify";

import modalAvatar from "../assets/img/navbar/navbar/modalAvatar.png";
import { usePersons } from "../context/PersonsContext";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { CircularProgress } from "@mui/material";

// Define a interface para os itens de campo
type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

// Define the FieldConfig interface
interface FieldConfig {
  label: string;
  key: string;
  type: string;
  required?: boolean;
  optionsUrl?: string;
  validate?: (value: any) => boolean;
  errorMessage?: string;
}

// Define as propriedades do componente
interface Props<T> {
  title: string;
  open: boolean;
  onClose: () => void;
  onSave: (data: T) => void;
  fields: FieldConfig[];
  initialValues: Partial<T>;
}

// Define o componente
export const CreateModalExtEnt = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onSave,
  fields,
  initialValues,
}: Props<T>) => {
  const { employees, dataEE } = usePersons();
  const [formData, setFormData] = useState<Partial<T>>(initialValues);
  const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Atualiza com a validação do formulário
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
      if (
        field.label === "NIF" &&
        fieldValue != null &&
        fieldValue.toString().length < 9
      ) {
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

  // Função para buscar os funcionários
  const fetchEmployees = async () => {
    try {
      setDropdownData((prev) => ({ ...prev, responsibleName: employees }));
    } catch (error) {
      console.error("Erro ao buscar os dados dos funcionários.");
    }
  };

  // Função para buscar as opções do dropdown
  const fetchDropdownOptions = async () => {
    try {
      setDropdownData((prev) => ({
        ...prev,
        externalEntityTypeId: dataEE?.externalEntityTypes || [],
      }));
    } catch (error) {
      console.error("Erro ao buscar os dados de tipos.");
    }
  };

  // Atualiza com a busca de funcionários
  useEffect(() => {
    if (open) {
      fetchEmployees();
      fetchDropdownOptions();
      setFormData(initialValues);
      if (initialValues.photo) {
        setProfileImage(initialValues.photo);
      } else {
        setProfileImage(null);
      }
    } else {
      setFormData({});
    }
  }, [open, employees, dataEE, initialValues]);

  // Define a mudança de foto
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const image = new Image();
        image.onload = () => {
          let width = image.width;
          let height = image.height;

          if (width > 512 || height > 512) {
            if (width > height) {
              height *= 512 / width;
              width = 512;
            } else {
              width *= 512 / height;
              height = 512;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(image, 0, 0, width, height);

          const dataUrl = canvas.toDataURL("image/png");
          setProfileImage(dataUrl);
          setFormData({ ...formData, photo: dataUrl });
        };
        image.src = readerEvent.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  // Define a abertura do seletor de arquivos
  const triggerFileSelectPopup = () => fileInputRef.current?.click();

  // Define a mudança de valor do formulário
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? Number(value) : value;
    if (showValidationErrors) {
      setShowValidationErrors(false);
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  // Função para lidar com o fecho
  const handleClose = () => {
    setFormData({});
    setShowValidationErrors(false);
    onClose();
  };

  // Função para lidar com a mudança do dropdown
  const handleDropdownChange = (
    key: string,
    e: React.ChangeEvent<FormControlElement>
  ) => {
    const { value } = e.target;
    const selectedOption = dropdownData[key]?.find((option: any) => {
      switch (key) {
        case "externalEntityTypeId":
          return option.externalEntityTypeId === value;
        case "responsibleName":
          return option.employeeID === value;
        default:
          return false;
      }
    });

    if (selectedOption) {
      const idKey = key;
      setFormData((prevState) => ({
        ...prevState,
        [idKey]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  // Função para buscar os dados do código postal
  const handleZipCode = async () => {
    const cPostal = formData.ziPcode;
    if (!cPostal) return;

    setIsLoading(true);
    const [cPostal1, cPostal2] = cPostal.split("-");

    try {
      const response = await fetch(
        `https://www.cttcodigopostal.pt/api/v1/4ca3e090c6ba47a29d720ed8cc597648/${cPostal1}-${cPostal2}`
      );
      if (!response.ok) {
        console.error("Falha ao buscar dados de código postal");
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const item = data[0];

        setFormData((prev) => ({
          ...prev,
          address: item.morada || "",
          locality: item.localidade || "",
          village: item.freguesia || "",
          district: item.distrito || "",
        }));
      } else {
        toast.warn(
          "A busca pelo código postal informado falhou. Tente novamente ou insira manualmente os dados."
        );
      }
    } catch (error) {
      console.error(
        "Não foi possível buscar pelo código postal informado",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Define o clique no botão de salvar
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

  // Define a função de salvar
  const handleSave = () => {
    onSave(formData as T);
    handleClose();
  };

  return (
    <Modal
      show={open}
      onHide={handleClose}
      backdrop="static"
      dialogClassName="custom-modal"
      size="xl"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <Row>
          <Col md={3}>
            <Form.Group controlId="formName">
              <Form.Label>
                Nome <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip-name">Campo obrigatório</Tooltip>}
              >
                <Form.Control
                  type="string"
                  className={`custom-input-height form-control custom-select-font-size ${
                    showValidationErrors ? "error-border" : ""
                  }`}
                  value={formData.name || ""}
                  onChange={handleChange}
                  name="name"
                  required
                  maxLength={50}
                />
              </OverlayTrigger>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formCommercialName">
              <Form.Label>Nome Comercial</Form.Label>
              <Form.Control
                type="string"
                className="custom-input-height custom-select-font-size"
                value={formData.commercialName || ""}
                onChange={handleChange}
                name="commercialName"
                maxLength={50}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formNif">
              <Form.Label>
                NIF <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-nif">
                    Campo deve ter no mínimo 9 números
                  </Tooltip>
                }
              >
                <Form.Control
                  type="number"
                  className={`custom-input-height form-control custom-select-font-size ${
                    showValidationErrors ? "error-border" : ""
                  }`}
                  value={formData.nif || ""}
                  onChange={handleChange}
                  name="nif"
                  required
                />
              </OverlayTrigger>
              {errors.nif && (
                <Form.Text className="text-danger">{errors.nif}</Form.Text>
              )}
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formExternalEntityType">
              <Form.Label>Tipos de Entidade</Form.Label>
              <Form.Control
                as="select"
                className="custom-input-height custom-select-font-size"
                value={formData.externalEntityTypeId || ""}
                onChange={(e) =>
                  handleDropdownChange("externalEntityTypeId", e)
                }
                name="externalEntityTypeId"
              >
                <option value="">Selecione...</option>
                {dropdownData?.externalEntityTypeId?.map((option, index) => (
                  <option
                    key={option.externalEntityTypeID || `option-${index}`}
                    value={option.externalEntityTypeID}
                  >
                    {option.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Tab.Container defaultActiveKey="dadosGerais">
          <Nav variant="tabs" className="nav-modal">
            <Nav.Item>
              <Nav.Link eventKey="dadosGerais">Dados Gerais</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="moradas">Moradas</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="dadosGerais">
              <Form style={{ marginTop: 10, marginBottom: 10 }}>
                <Row>
                  <Col md={3}>
                    <Form.Group controlId="formResponsibleName">
                      <Form.Label>Nome do Responsável</Form.Label>
                      <Form.Control
                        as="select"
                        value={formData.responsibleName || ""}
                        onChange={handleChange}
                        name="responsibleName"
                        className="custom-input-height custom-select-font-size"
                      >
                        <option value="">Selecione...</option>
                        {dropdownData?.responsibleName?.map(
                          (employee, index) => (
                            <option
                              key={employee.id || `employee-${index}`}
                              value={employee.id}
                            >
                              {employee.enrollNumber} - {employee.name}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                      <Form.Label>Telefone</Form.Label>
                      <Form.Control
                        type="string"
                        className="custom-input-height custom-select-font-size"
                        value={formData.phone || ""}
                        onChange={handleChange}
                        name="phone"
                      />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                      <Form.Label>E-Mail</Form.Label>
                      <Form.Control
                        type="string"
                        className="custom-input-height custom-select-font-size"
                        value={formData.email || ""}
                        onChange={handleChange}
                        name="email"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="formDateInserted">
                      <Form.Label>Data Inserida</Form.Label>
                      <Form.Control
                        type="date"
                        className="custom-input-height custom-select-font-size"
                        value={formData.dateInserted || ""}
                        onChange={handleChange}
                        name="dateInserted"
                      />
                    </Form.Group>
                    <Form.Group controlId="formMobile">
                      <Form.Label>Telemóvel</Form.Label>
                      <Form.Control
                        type="string"
                        className="custom-input-height custom-select-font-size"
                        value={formData.mobile || ""}
                        onChange={handleChange}
                        name="mobile"
                      />
                    </Form.Group>
                    <Form.Group controlId="formWww">
                      <Form.Label>WWW</Form.Label>
                      <Form.Control
                        type="string"
                        className="custom-input-height custom-select-font-size"
                        value={formData.www || ""}
                        onChange={handleChange}
                        name="www"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="formFont">
                      <Form.Label>Origem de Entidade</Form.Label>
                      <Form.Control
                        type="string"
                        className="custom-input-height custom-select-font-size"
                        value={formData.font || ""}
                        onChange={handleChange}
                        name="font"
                      />
                    </Form.Group>
                    <Form.Group controlId="formFax">
                      <Form.Label>Fax</Form.Label>
                      <Form.Control
                        type="string"
                        className="custom-input-height custom-select-font-size"
                        value={formData.fax || ""}
                        onChange={handleChange}
                        name="fax"
                      />
                    </Form.Group>
                    <Form.Group controlId="formComments">
                      <Form.Label>Comentários</Form.Label>
                      <Form.Control
                        type="string"
                        className="custom-input-height custom-select-font-size"
                        value={formData.comments || ""}
                        onChange={handleChange}
                        name="comments"
                        maxLength={50}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} className="img-modal">
                    <img
                      src={profileImage || modalAvatar}
                      alt="Profile Avatar"
                      style={{
                        width: 128,
                        height: 128,
                        borderRadius: "50%",
                        cursor: "pointer",
                        objectFit: "cover",
                      }}
                      onClick={triggerFileSelectPopup}
                    />
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                        ref={fileInputRef}
                      />
                    </div>
                  </Col>
                </Row>
              </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="moradas">
              <Form style={{ marginTop: 10, marginBottom: 10 }}>
                <Row>
                  {[
                    { label: "Código Postal", key: "ziPcode", type: "string" },
                    { label: "Localidade", key: "locality", type: "string" },
                    { label: "Freguesia", key: "village", type: "string" },
                    { label: "Distrito", key: "district", type: "string" },
                  ].map((field, index) => (
                    <Col md={3} key={index}>
                      <Form.Group controlId={`form${field.key}`}>
                        <Form.Label>{field.label}</Form.Label>
                        {field.key === "ziPcode" ? (
                          <InputGroup>
                            <Form.Control
                              type="text"
                              className="custom-input-height custom-select-font-size"
                              value={formData.ziPcode || ""}
                              name="ziPcode"
                              onChange={handleChange}
                            />
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip className="custom-tooltip">
                                  Pesquisar Código Postal
                                </Tooltip>
                              }
                            >
                              <CustomOutlineButton
                                icon="bi bi-search"
                                onClick={handleZipCode}
                                iconSize="1em"
                                className="custom-input-height"
                              >
                                {isLoading ? (
                                  <CircularProgress
                                    size={20}
                                    color="inherit"
                                    style={{ marginLeft: 5, marginRight: 5 }}
                                  />
                                ) : (
                                  ""
                                )}
                              </CustomOutlineButton>
                            </OverlayTrigger>
                          </InputGroup>
                        ) : (
                          <Form.Control
                            type={field.type}
                            className="custom-input-height custom-select-font-size"
                            value={formData[field.key] || ""}
                            onChange={handleChange}
                            name={field.key}
                          />
                        )}
                      </Form.Group>
                    </Col>
                  ))}
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group controlId="formAddress">
                      <Form.Label>Morada</Form.Label>
                      <Form.Control
                        type="string"
                        className="custom-input-height custom-select-font-size"
                        value={formData.address || ""}
                        onChange={handleChange}
                        name="address"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
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
