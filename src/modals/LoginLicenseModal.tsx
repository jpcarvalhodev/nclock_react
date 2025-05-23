import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../css/Login.css";
import { Col, Form, Row } from "react-bootstrap";

import { LicenseKey } from "../types/Types";

// Interface para as propriedades do modal
interface LoginLicenseModalProps<T> {
  title: string;
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<LicenseKey>) => void;
}

// Define o componente
export const LoginLicenseModal = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onSave,
}: LoginLicenseModalProps<T>) => {
  const [formData, setFormData] = useState<Partial<LicenseKey>>({
    licenseKey: "",
  });

  // Função para lidar com a mudança de valores nos campos
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para limpar e fechar o modal
  const handleClose = () => {
    setFormData({ licenseKey: "" });
    onClose();
  };

  // Função para salvar os dados
  const handleSave = () => {
    onSave(formData);
    handleClose();
  };

  return (
    <Modal
      show={open}
      onHide={handleClose}
      backdrop="static"
      id="modal-login"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "white" }}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <div className="container-fluid">
          <Row>
            <Col md={12}>
              <Form.Group controlId="formLicenseKey">
                <Form.Control
                  className="custom-input-height custom-select-font-size modal-input"
                  type="string"
                  name="licenseKey"
                  value={formData.licenseKey || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="narrow-mobile-modal-button"
          variant="outline-light"
          onClick={handleClose}
        >
          Fechar
        </Button>
        <Button
          className="narrow-mobile-modal-button"
          variant="outline-light"
          onClick={handleSave}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
