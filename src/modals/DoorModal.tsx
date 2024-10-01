import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { DoorDevice } from '../helpers/Types';

// Interface para as propriedades do modal
interface DoorModalProps<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    fields: Field[];
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

// Valores iniciais do formulário
const initialValues: Partial<DoorDevice> = {
    time: 5
}

// Define o componente
export const DoorModal = <T extends Record<string, any>>({ title, open, onClose, onSave, fields }: DoorModalProps<T>) => {
    const [formData, setFormData] = useState<Partial<DoorDevice>>(initialValues);
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
    const handleChange = (e: React.ChangeEvent<any>) => {
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
        onSave(formData as T);
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formNrDoor">
                                <Form.Label>Número da Porta<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="number"
                                        name="nrDoor"
                                        value={formData.nrDoor || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['nrDoor'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['nrDoor']}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formTime">
                                <Form.Label>Tempo Aberta<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="number"
                                        name="time"
                                        value={formData.time || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['time'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['time']}</div>}
                            </Form.Group>
                        </Col>
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