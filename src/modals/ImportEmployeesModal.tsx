import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "../css/PagesStyles.css";

// Define a interface para as propriedades do componente
interface Props<T> {
  open: boolean;
  onClose: () => void;
  onUpdate: (formData: FormData) => Promise<void>;
  title: string;
}

export const ImportEmployeesModal = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onUpdate,
}: Props<T>) => {
  const [file, setFile] = useState<File | null>(null);

  // Efeito para limpar os campos do formulário
  useEffect(() => {
    if (!open) {
      setFile(null);
    }
  }, [open]);

  // Função para lidar com a mudança de arquivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  // Função para lidar com o clique em atualizar
  const handleImport = () => {
    if (file) {
      const fileToSend = new FormData();
      fileToSend.append("file", file);
      onUpdate(fileToSend);
      onClose();
    }
  };

  return (
    <Modal
      show={open}
      onHide={onClose}
      backdrop="static"
      dialogClassName="modal-scrollable"
      size="lg"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <Form style={{ marginTop: 20, marginBottom: 20, display: "flex" }}>
          <Row style={{ flex: 1.5 }}>
            <Col md={6}>
              <Form.Group controlId="formFile">
                <Form.Control
                  className="custom-input-height custom-select-font-size"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <div
                style={{
                  backgroundColor: "#d1d1d1",
                  padding: "10px",
                  borderRadius: "5px",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                <p style={{ margin: "0" }}>
                  Observação: Os dados devem estar com as seguintes colunas e
                  com esta ordem: Nº Funcionário, Nome, Nome Abreviado,
                  Departamento e Grupo
                </p>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#f2f2f2" }}>
        <Button variant="outline-dark" onClick={onClose}>
          Fechar
        </Button>
        <Button
          className="narrow-mobile-modal-button"
          variant="outline-dark"
          onClick={handleImport}
        >
          Importar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
