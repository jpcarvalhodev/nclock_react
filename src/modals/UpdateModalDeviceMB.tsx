import { useState, useEffect, ChangeEvent } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

// Define a interface Entity
export interface Entity {
    id: string;
    [key: string]: any;
}

// Define as propriedades do componente
interface UpdateModalProps<T extends Entity> {
    open: boolean;
    onClose: () => void;
    onUpdate: (entity: T) => Promise<void>;
    entity: T;
    fields: Field[];
    title: string;
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
export const UpdateModalDeviceMB = <T extends Entity>({ open, onClose, onUpdate, entity, fields, title }: UpdateModalProps<T>) => {
    const [formData, setFormData] = useState<T>({ ...entity } as T);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);

    // UseEffect para validar o formulário
    useEffect(() => {
        const newErrors: Record<string, string> = {};

        const isValid = fields.every(field => {
            const fieldValue = formData[field.key];
            let valid = true;

            if (field.required && (fieldValue === undefined || fieldValue === '')) {
                valid = false;
            }
            if (field.type === 'number' && fieldValue != null && fieldValue < 0) {
                valid = false;
            }

            return valid;
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
    }, [formData, fields]);

    // Atualiza o estado do componente ao abrir o modal
    useEffect(() => {
        if (open) {
            setFormData((prevState) => ({
                ...prevState,
                estadoTerminal: 0,
                timeReboot: '00:00:00',
            }));
        } else {
            setFormData({ ...entity } as T);
        }
    }, [open]);

    // Função para lidar com a mudança de valores nos campos
    const handleChange = (e: ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Função para verificar se o formulário é válido antes de salvar
    const handleCheckForSave = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        handleSave();
    }

    // Função para salvar os dados
    const handleSave = () => {
        onUpdate(formData as T);
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        {[
                            { key: 'nomeQuiosque', label: 'Nome do Terminal', type: 'string', required: true },
                        ].map((field) => (
                            <Col md={12} key={field.key}>
                                <Form.Group controlId={`form${field.key}`}>
                                    {field.required ? (
                                        <OverlayTrigger
                                            placement="right"
                                            overlay={<Tooltip id={`tooltip-${field.key}`}>Campo obrigatório</Tooltip>}
                                        >
                                            <Form.Label>
                                                {field.label} <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                                            </Form.Label>
                                        </OverlayTrigger>
                                    ) : (
                                        <Form.Label>{field.label}</Form.Label>
                                    )}
                                    <Form.Control
                                        type={field.type}
                                        className="custom-input-height custom-select-font-size"
                                        value={formData[field.key] !== undefined && formData[field.key] !== null ? formData[field.key] : ''}
                                        onChange={handleChange}
                                        name={field.key}
                                    />
                                    {errors[field.key] && <Form.Text className="text-danger">{errors[field.key]}</Form.Text>}
                                </Form.Group>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>
                    Fechar
                </Button>
                <Button variant="outline-primary" onClick={handleCheckForSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal >
    );
};