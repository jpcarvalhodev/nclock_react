import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/PagesStyles.css';
import { Col, Form, Row } from 'react-bootstrap';
import { LicenseKey } from '../helpers/Types';

// Interface para as propriedades do modal
interface LoginLicenseModalProps<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: Partial<LicenseKey>) => void;
}

// Define o componente
export const LoginLicenseModal = <T extends Record<string, any>>({ title, open, onClose, onSave }: LoginLicenseModalProps<T>) => {
    const [formData, setFormData] = useState<Partial<LicenseKey>>({ licenseKey: '' })

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
        onSave(formData);
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Col md={12}>
                            <Form.Group controlId='formLicenseKey'>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="string"
                                    name="licenseKey"
                                    value={formData.licenseKey || ''}
                                    onChange={handleChange}
                                    placeholder="Insira a chave de licença"
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
                <Button variant="outline-primary" onClick={handleSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal >
    );
};