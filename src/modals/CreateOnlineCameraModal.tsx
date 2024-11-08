import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Cameras } from '../helpers/Types';
import * as apiService from "../helpers/apiService";

// Interface para as propriedades do modal
interface CreateModalProps<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    fields: Field[];
    initialValues: Partial<T>;
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
export const CreateOnlineCameraModal = <T extends Record<string, any>>({ title, open, onClose, onSave, fields, initialValues }: CreateModalProps<T>) => {
    const [formData, setFormData] = useState<Partial<Cameras>>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState('');

    // UseEffect para inicializar o formulário
    useEffect(() => {
        if (open) {
            setFormData(initialValues);
        } else {
            setFormData({});
        }
    }, [open]);

    // UseEffect para validar o formulário
    useEffect(() => {
        const newErrors: Record<string, string> = {};

        const isValid = fields.every(field => {
            const fieldValue = formData[field.key];
            let valid = true;

            if (field.required && (fieldValue === undefined || fieldValue === '')) {
                valid = false;
            }
            if (field.type === 'number' && fieldValue != null) {
                valid = false;
            }

            return valid;
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
        validateForm();
    }, [formData, fields]);

    // Função para validar o formulário
    const validateForm = () => {
        const isValid = fields.every(field => {
            const fieldValue = formData?.[field.key];
            if (field.required) {
                if (typeof fieldValue === 'string') {
                    return fieldValue.trim() !== '';
                }
                return fieldValue !== null && fieldValue !== undefined;
            }
            return true;
        });

        setIsFormValid(isValid);
    };

    // UseEffect para adicionar automaticamente o próximo número da câmera
    useEffect(() => {
        const fetchCamerasAndSetNextNumber = async () => {
            try {
                const data = await apiService.fetchAllCameras();
                if (data && data.length > 0) {
                    const maxNumber = data.reduce((max: number, data: Cameras) => Math.max(max, data.numeroCamera), 0);
                    const nextCameraNumber = maxNumber + 1;

                    if (!initialValues.numeroCamera) {
                        setFormData(prevState => ({
                            ...prevState,
                            numeroCamera: nextCameraNumber
                        }));
                    }
                } else {
                    setFormData(prevState => ({
                        ...prevState,
                        numeroCamera: 1
                    }));
                }
            } catch (error) {
                console.error("Erro ao buscar câmeras e calcular o próximo número:", error);
            }
        };
        if (open) {
            fetchCamerasAndSetNextNumber();
        }
    }, [open, initialValues]);

    // Função para validar o endereço IP
    const validateIPAddress = (ip: string) => {
        const regex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[1-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[1-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9])$/;
        return regex.test(ip);
    };

    // Função para lidar com a mudança de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? Number(value) : value;
        if (name === "ip") {
            if (validateIPAddress(value)) {
                setError('');
            } else {
                setError('Endereço IP inválido');
            }
        }
        setFormData(prev => ({
            ...prev,
            [name]: parsedValue
        }));
        validateForm();
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
        <Modal show={open} onHide={onClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formNumeroCamera">
                                <Form.Label>Número<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-numeroCamera">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="number"
                                        name="numeroCamera"
                                        value={formData.numeroCamera || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['numeroCamera'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['numeroCamera']}</div>}
                            </Form.Group>
                            <Form.Group controlId="formIp">
                                <Form.Label>IP<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-ip">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="string"
                                        name="ip"
                                        isInvalid={!!error}
                                        value={formData.ip || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['ip'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['ip']}</div>}
                            </Form.Group>
                            <Form.Group controlId="formUserCamera">
                                <Form.Label>Utilizador<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-userCamera">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="string"
                                        name="userCamera"
                                        value={formData.userCamera || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['userCamera'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['userCamera']}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formNomeCamera">
                                <Form.Label>Nome<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-nomeCamera">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="string"
                                        name="nomeCamera"
                                        value={formData.nomeCamera || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['nomeCamera'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['nomeCamera']}</div>}
                            </Form.Group>
                            <Form.Group controlId="formUrl">
                                <Form.Label>URL<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-url">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="string"
                                        name="url"
                                        placeholder='Coloque a URL completa'
                                        value={formData.url || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['url'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['url']}</div>}
                            </Form.Group>
                            <Form.Group controlId="formPasswordCamera">
                                <Form.Label>Password<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-passwordCamera">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="password"
                                        name="passwordCamera"
                                        value={formData.passwordCamera || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['passwordCamera'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['passwordCamera']}</div>}
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