import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Define a propriedade da interface
interface DeleteModalProps {
    open: boolean;
    onClose: () => void;
    onDelete: (entityId: string) => void;
    entityId: string | null;
}

// Define o componente
export const DeleteModal = ({ open, onClose, onDelete, entityId }: DeleteModalProps) => {

    // Função para apagar a entidade
    const handleDelete = () => {
        if (entityId) {
            onDelete(entityId);
        }
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminação</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Tem certeza que deseja apagar os dados da linha selecionada?
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