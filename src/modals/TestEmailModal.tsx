import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../css/Login.css";
import { Col, Form, Row } from "react-bootstrap";

// Interface para as propriedades do modal
interface ModalProps<T> {
  title: string;
  open: boolean;
  onClose: () => void;
  onSave: (data: string) => void;
}

// Define o componente
export const TestEmailModal = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onSave,
}: ModalProps<T>) => {
  const [formData, setFormData] = useState<{ email: string }>({ email: "" });

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
    setFormData({ email: "" });
    onClose();
  };

  // Função para salvar os dados
  const handleSave = () => {
    onSave(formData.email);
    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <div className="container-fluid">
          <Row>
            <Col md={12}>
              <Form.Group controlId="formEmail">
                <Form.Control
                  className="custom-input-height custom-select-font-size"
                  type="string"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
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
          onClick={handleSave}
        >
          Enviar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
