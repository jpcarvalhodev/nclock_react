import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../css/Login.css";
import { Col, Form, Row } from 'react-bootstrap';

// Interface para as propriedades do modal
interface ModalProps<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: string) => void;
}

// Define o componente
export const TestEmailModal = <T extends Record<string, any>>({ title, open, onClose, onSave }: ModalProps<T>) => {
    const [formData, setFormData] = useState<{ email: string }>({ email: '' });

    // Função para lidar com a mudança de valores nos campos
    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Função para salvar os dados
    const handleSave = () => {
        onSave(formData.email);
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static" style={{ marginTop: 100 }}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Col md={12}>
                            <Form.Group controlId='formEmail'>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="string"
                                    name="email"
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>
                    Fechar
                </Button>
                <Button variant="outline-success" onClick={handleSave}>
                    Enviar
                </Button>
            </Modal.Footer>
        </Modal >
    );
};