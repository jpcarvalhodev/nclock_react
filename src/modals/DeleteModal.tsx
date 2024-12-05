import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import warning from "../assets/img/modals/warning.png";

// Define a propriedade da interface
interface DeleteModalProps {
    open: boolean;
    onClose: () => void;
    onDelete: (entityId: string) => void;
    entityId: string | null;
    message?: React.ReactNode;
}

// Define o componente
export const DeleteModal = ({ open, onClose, onDelete, entityId, message }: DeleteModalProps) => {

    // Função para apagar a entidade
    const handleDelete = () => {
        if (entityId) {
            onDelete(entityId);
        }
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminação</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display:"flex", flexDirection: "column", justifyContent: "center", alignItems: "center",  textAlign: "center" }}>
                    <img style={{ width: 80, marginBottom: 20 }} src={warning} alt="alerta" />
                    {message || "Tem certeza que deseja apagar os dados da linha selecionada?"}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="outline-danger" onClick={handleDelete}>
                    Apagar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};