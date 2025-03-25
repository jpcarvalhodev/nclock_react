import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import nidgrouplogo from "../assets/img/ajuda/nidgrouplogo.png";

// Define a propriedade da interface
interface TechInfoProps {
  open: boolean;
  onClose: () => void;
}

// Define o componente
export const TechInfoModal = ({ open, onClose }: TechInfoProps) => {
  return (
    <Modal show={open} onHide={onClose} backdrop="static" size="xl" centered>
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title>Informações Técnicas</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <div className="container-fluid">
          <Form
            style={{
              marginTop: 10,
              marginBottom: 10,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4 style={{ marginBottom: "2rem" }}>Portas</h4>
            <p style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <p><b>Porta HTTP:</b> 9999</p>
              <br />
              <p><b>Porta HTTPS:</b> 9090</p>
              <br />
              <p><b>Porta Websocket:</b> 5050</p>
              <br />
            </p>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};
