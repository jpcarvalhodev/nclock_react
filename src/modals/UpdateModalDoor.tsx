import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, Row } from 'react-bootstrap';

// Define a interface Entity
export interface Entity {
    id: string;
    [key: string]: any;
}

// Define a interface Field
interface Field {
    key: string;
    label: string;
    type: string;
    required?: boolean;
    optionsUrl?: string;
    validate?: (value: any) => boolean;
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

// Define o componente
export const UpdateModalDoor = <T extends Entity>({ title, open, onClose, onUpdate, entity, fields }: UpdateModalProps<T>) => {
    const [formData, setFormData] = useState<Partial<T>>({...entity});
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
                newErrors[field.key] = `${field.label} não pode ser negativo.`;
            }

            return valid;
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
    }, [formData, fields]);

    // Função para lidar com a mudança de valores nos campos
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const parsedValue = type === 'checkbox' ? checked : value;
        setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
    };

    // Função para salvar os dados
    const handleSave = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        onUpdate(formData as T);
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Col md={6} key="enabled" className="mb-3">
                            <Form.Group controlId="enabled" className='d-flex justify-content-between mt-4'>
                                <Form.Label>Activo</Form.Label>
                                <Form.Check
                                    type="switch"
                                    name="enabled"
                                    checked={!!formData.enabled}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        {fields.filter(field => field.key !== 'devId' && field.key !== 'enabled').map((field) => (
                            <Col md={6} key={field.key} className="mb-3">
                                <Form.Group controlId={field.key}>
                                    <Form.Label>{field.label}</Form.Label>
                                    <Form.Control
                                        type={field.type}
                                        name={field.key}
                                        value={formData[field.key] || ''}
                                        onChange={handleChange}
                                        isInvalid={!!errors[field.key]}
                                        required={field.required}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors[field.key]}
                                    </Form.Control.Feedback>
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
                <Button variant="outline-primary" onClick={handleSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal >
    );
};