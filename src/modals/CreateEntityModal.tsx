import { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { toast } from "react-toastify";

import no_entity from "../assets/img/navbar/no_entity.png";

// Define a interface para os itens de erro
interface ErrorDetails {
  hasError: boolean;
  message: string;
}

// Define a interface para os itens de erro
interface ErrorRecord {
  [key: string]: ErrorDetails;
}

// Interface para as propriedades do modal
interface CreateModalProps<T> {
  title: string;
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  fields: Field[];
  initialValues: Partial<T>;
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

export const CreateEntityModal = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onSave,
  fields,
  initialValues,
}: CreateModalProps<T>) => {
  const [formData, setFormData] = useState<Partial<T>>(initialValues);
  const [errors, setErrors] = useState<ErrorRecord>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [deviceImage, setDeviceImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  // UseEffect para validar o formulário
  useEffect(() => {
    const newErrors: ErrorRecord = {};
    let isValid = true;

    fields.forEach((field) => {
      const fieldValue = formData[field.key];
      if (field.required && (fieldValue === null || fieldValue === "")) {
        isValid = false;
      }

      if (field.type === "number" && fieldValue != null && fieldValue < 0) {
        isValid = false;
      }
      if (
        field.key === "nif" &&
        fieldValue != null &&
        fieldValue.toString().length < 9
      ) {
        isValid = false;
      }
    });

    setErrors(newErrors);
    setIsFormValid(isValid);
    validateForm();
  }, [formData, fields]);

  // Função para validar o formulário
  const validateForm = () => {
    if (!showValidationErrors) return true;
    let newErrors: ErrorRecord = {};
    let isValid = true;

    fields.forEach((field) => {
      const fieldValue = formData[field.key];
      if (field.required && !fieldValue) {
        isValid = false;
      } else if (field.validate && !field.validate(fieldValue)) {
        isValid = false;
      }
    });

    if (formData.emails && !validateEmail(formData.emails as string)) {
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

  // Atualiza o estado do componente ao abrir o modal
  useEffect(() => {
    if (open) {
      setFormData(initialValues);
    } else {
      setFormData({});
      setDeviceImage(null);
    }
  }, [open]);

  // Função para lidar com a mudança da imagem
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setDeviceImage(objectUrl);
    }
  };

  // Função para acionar o popup de seleção de arquivo
  const triggerFileSelectPopup = () => fileInputRef.current?.click();

  // Função para lidar com a mudança dos campos do formulário
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (showValidationErrors) {
      setShowValidationErrors(false);
    }
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  // Função para lidar com o fechamento do modal
  const handleClose = () => {
    setFormData({});
    setProfileImageFile(null);
    setDeviceImage(null);
    setShowValidationErrors(false);
    onClose();
  };

  // Função para lidar com o clique no botão de salvar
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
    const dataToSend = new FormData();

    if (formData.nome) {
      dataToSend.append("Nome", formData.nome);
    }
    if (formData.morada) {
      dataToSend.append("Morada", formData.morada);
    }
    if (formData.cPostal) {
      dataToSend.append("CPostal", formData.cPostal);
    }
    if (formData.localidade) {
      dataToSend.append("Localidade", formData.localidade);
    }
    if (formData.telefone) {
      dataToSend.append("Telefone", formData.telefone);
    }
    if (formData.telemovel) {
      dataToSend.append("Telemovel", formData.telemovel);
    }
    if (formData.email) {
      dataToSend.append("Email", formData.email);
    }
    if (formData.nif) {
      dataToSend.append("NIF", formData.nif);
    }
    if (formData.www) {
      dataToSend.append("WWW", formData.www);
    }
    if (formData.observacoes) {
      dataToSend.append("Observacoes", formData.observacoes);
    }
    if (formData.enabled) {
      dataToSend.append("Enabled", formData.enabled);
    }
    if (profileImageFile) {
      dataToSend.append("Logotipo", profileImageFile);
    }

    onSave(dataToSend);
    handleClose();
  };

  return (
    <Modal
      show={open}
      onHide={handleClose}
      backdrop="static"
      dialogClassName="modal-scrollable"
      size="xl"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        className="modal-body-scrollable"
        style={{ marginBottom: 55 }}
      >
        <div className="container-fluid">
          <Row>
            <Row>
              <Col md={12} className="img-modal">
                <img
                  src={deviceImage || no_entity}
                  alt="Logo da entidade"
                  style={{
                    width: 128,
                    height: 128,
                    cursor: "pointer",
                    marginBottom: 10,
                    objectFit: "cover",
                    borderRadius: "10%",
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
            <Col md={6}>
              <Form.Group controlId="formEnabled" style={{ marginBottom: 38 }}>
                <Form.Check
                  type="switch"
                  name="enabled"
                  label="Activo"
                  checked={formData.enabled}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row-reverse",
                    padding: 0,
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formMorada">
                <Form.Label>Morada</Form.Label>
                <Form.Control
                  className="custom-input-height custom-select-font-size"
                  type="text"
                  name="morada"
                  value={formData.morada || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formCPostal">
                <Form.Label>Código Postal</Form.Label>
                <Form.Control
                  className="custom-input-height custom-select-font-size"
                  type="text"
                  name="cPostal"
                  value={formData.cPostal || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formTelemovel">
                <Form.Label>Telemóvel</Form.Label>
                <Form.Control
                  className="custom-input-height custom-select-font-size"
                  type="text"
                  name="telemovel"
                  value={formData.telemovel || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formNif">
                <Form.Label>
                  NIF<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-nif">Campo obrigatório</Tooltip>
                  }
                >
                  <Form.Control
                    className={`custom-input-height custom-select-font-size ${
                      showValidationErrors ? "error-border" : ""
                    }`}
                    type="number"
                    name="nif"
                    value={formData.nif || ""}
                    onChange={handleChange}
                  />
                </OverlayTrigger>
                {errors["nif"] && errors["nif"].hasError && (
                  <Form.Text className="text-danger">
                    {errors["nif"].message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formNome">
                <Form.Label>
                  Nome<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-nome">Campo obrigatório</Tooltip>
                  }
                >
                  <Form.Control
                    className={`custom-input-height custom-select-font-size ${
                      showValidationErrors ? "error-border" : ""
                    }`}
                    type="text"
                    name="nome"
                    value={formData.nome || ""}
                    onChange={handleChange}
                    maxLength={200}
                  />
                </OverlayTrigger>
                {errors["nome"] && errors["nome"].hasError && (
                  <Form.Text className="text-danger">
                    {errors["nome"].message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="formLocalidade">
                <Form.Label>Localidade</Form.Label>
                <Form.Control
                  className="custom-input-height custom-select-font-size"
                  type="text"
                  name="localidade"
                  value={formData.localidade || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formTelefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  className="custom-input-height custom-select-font-size"
                  type="text"
                  name="telefone"
                  value={formData.telefone || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="custom-input-height custom-select-font-size"
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formWww">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  className="custom-input-height custom-select-font-size"
                  type="url"
                  name="www"
                  value={formData.www || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Row>
              <Col md={12}>
                <Form.Group controlId="formObservacoes">
                  <Form.Label>Observações</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="observacoes"
                    value={formData.observacoes || ""}
                    onChange={handleChange}
                    className="custom-select-font-size textarea"
                    maxLength={250}
                  />
                </Form.Group>
              </Col>
            </Row>
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
          onClick={handleSaveClick}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
