import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface DeleteModalProps {
    open: boolean;
    onClose: () => void;
    onDelete: (id: string) => void;
    entityId: string | null;
}

export const DeleteModal = ({ open, onClose, onDelete, entityId }: DeleteModalProps) => {
    const handleDelete = () => {
        if (entityId) {
            onDelete(entityId);
            onClose();
        }
    };

    return (
        <Modal show={open} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Exclusão</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Tem certeza que deseja excluir os dados da linha selecionada?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Excluir
                </Button>
            </Modal.Footer>
        </Modal>
    );
};