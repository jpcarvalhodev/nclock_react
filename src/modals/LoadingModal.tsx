import { Col, Modal } from "react-bootstrap";
import { CustomSpinner } from "../components/CustomSpinner";
import "../css/LoadingModal.css";

// Define as propriedades do modal
interface LoadingModalProps {
  show: boolean;
}

// Componente do modal de carregamento
export const LoadingModal = ({ show }: LoadingModalProps) => {
  return (
    <Modal show={show} backdrop="static" keyboard={false} centered>
      <Modal.Body>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Col>
            <CustomSpinner />
          </Col>
          <Col>
            <p style={{ marginTop: 30 }}>
              Processando, aguarde
              <span className="dots-animation"></span>
            </p>
          </Col>
        </div>
      </Modal.Body>
    </Modal>
  );
};
