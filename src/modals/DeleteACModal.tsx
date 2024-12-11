import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Doors } from "../helpers/Types";
import { toast } from "react-toastify";
import warning from "../assets/img/modals/warning.png";

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Define a interface Entity
export interface Entity {
    id: string;
    [key: string]: any;
}

// Define a propriedade da interface
interface DeleteModalProps<T extends Entity> {
    open: boolean;
    onClose: () => void;
    onDelete: (employeesId: string[], doorId: string) => void;
    entity: T;
}

// Define o componente
export const DeleteACModal = <T extends Entity>({ open, onClose, onDelete, entity }: DeleteModalProps<T>) => {
    const [formData, setFormData] = useState<Partial<T>>({ ...entity });
    const [showDoorSelectionModal, setShowDoorSelectionModal] = useState(false);
    const [showDoorUpdateModal, setShowDoorUpdateModal] = useState(false);
    const [selectedDoor, setSelectedDoor] = useState<Doors | null>(null);

    // Usa useEffect para inicializar o formulário
    useEffect(() => {
        if (open) {
            handleOpen();
            if (entity.acc && entity.acc.length > 1) {
                setSelectedDoor(null);
            } else if (entity.acc.length === 1) {
                setSelectedDoor(entity.acc[0]);
                setFormData({
                    ...formData,
                    doorId: entity.acc[0].doorId,
                });
            }
        }
    }, [open, entity.acc]);

    // Função para lidar com a seleção de porta caso haja mais de uma
    const handleOpen = () => {
        if (entity.acc && entity.acc.length > 1) {
            setShowDoorSelectionModal(true);
        } else if (entity.acc.length === 1) {
            setSelectedDoor(entity.acc[0]);
            setShowDoorUpdateModal(true);
            setShowDoorSelectionModal(false);
        }
    };

    // Função para lidar com a confirmação da seleção de porta
    const handleConfirmDoorSelection = () => {
        if (selectedDoor) {
            setShowDoorSelectionModal(false);
            setShowDoorUpdateModal(true);
        } else {
            toast.warn("Por favor, selecione uma porta antes de continuar.");
        }
    };

    // Função para lidar com a seleção de porta
    const handleDoorSelection = (e: React.ChangeEvent<FormControlElement>) => {
        const doorId = e.target.value;
        const door = entity.acc.find((d: Doors) => d.doorId === doorId);
        if (door) {
            setSelectedDoor(door);
            setShowDoorUpdateModal(true);
            setShowDoorSelectionModal(false);
        }
    };

    // Função de fechamento para ambos os modais, para garantir que tudo esteja fechado
    const handleCloseAllModals = () => {
        setShowDoorSelectionModal(false);
        setShowDoorUpdateModal(false);
        setSelectedDoor(null);
        onClose();
    };

    // Função para apagar a entidade
    const handleDelete = () => {
        onDelete([entity.employeesId], selectedDoor?.doorId);
        handleCloseAllModals();
    };

    return (
        <div>
            <Modal show={showDoorSelectionModal} onHide={handleCloseAllModals} backdrop="static" style={{ marginTop: 100 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecione uma Porta para Eliminar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="doorSelection">
                        <Form.Label>Porta</Form.Label>
                        <Form.Control as="select" value={selectedDoor?.doorId || ''} onChange={(e) => handleDoorSelection(e)}>
                            <option>Selecione...</option>
                            {entity.acc.sort((a: Doors, b: Doors) => a.doorName.localeCompare(b.doorName)).map((door: Doors, index: number) => (
                                <option key={index} value={door.doorId}>{door.doorName}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleCloseAllModals}>Fechar</Button>
                    <Button variant="outline-primary" onClick={handleConfirmDoorSelection}>Continuar</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDoorUpdateModal} onHide={handleCloseAllModals} backdrop="static" style={{ marginTop: 100 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        <img style={{ width: 80, marginBottom: 20 }} src={warning} alt="alerta" />
                        {"Tem certeza que deseja apagar os dados da linha selecionada?"}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleCloseAllModals}>
                        Cancelar
                    </Button>
                    <Button variant="outline-danger" onClick={handleDelete}>
                        Apagar
                    </Button>
                </Modal.Footer>
            </Modal >
        </div>
    );
};