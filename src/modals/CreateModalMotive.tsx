import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../css/PagesStyles.css";
import { Col, Row } from "react-bootstrap";

// Interface para as propriedades do modal
interface CreateModalProps<T> {
  title: string;
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<T>) => void;
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

// Define o componente
export const CreateModalMotive = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onSave,
  initialValues,
}: CreateModalProps<T>) => {
  const [formData, setFormData] = useState<Partial<T>>({});

  // Atualiza o estado do formulário quando tiver valores iniciais
  useEffect(() => {
    if (open) {
      setFormData({ ...initialValues });
    }
  }, [open]);

  // Função para lidar com a mudança de valores nos campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = value;
    setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
  };

  // Função para fechar o modal
  const handleClose = () => {
    setFormData({});
    onClose();
  };

  // Função para salvar os dados
  const handleSave = () => {
    onSave(formData as T);
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
            <Col>
              <Form.Group controlId="formDescricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  className="custom-input-height custom-select-font-size"
                  type="text"
                  name="descricao"
                  value={formData.descricao || ""}
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
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
