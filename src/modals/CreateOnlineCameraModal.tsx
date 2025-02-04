import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, InputGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

import hidepass from "../assets/img/login/hidepass.png";
import showpass from "../assets/img/login/showpass.png";
import { useTerminals } from '../context/TerminalsContext';
import { Cameras } from '../types/Types';

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
    const { cameras } = useTerminals();
    const [formData, setFormData] = useState<Partial<Cameras>>(initialValues);
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [showValidationErrors, setShowValidationErrors] = useState(false);
    const [showIpValidationErrors, setShowIpValidationErrors] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
        const newErrors: Record<string, boolean> = {};

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
        if (!showValidationErrors) return true;
        let newErrors: Record<string, boolean> = {};
        let isValid = true;

        fields.forEach((field) => {
            const fieldValue = formData[field.key];
            if (field.required && !fieldValue) {
                isValid = false;
                newErrors[field.key] = true;
            } else {
                newErrors[field.key] = false;
            }
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
        return isValid;
    };

    // UseEffect para adicionar automaticamente o próximo número da câmera
    useEffect(() => {
        const fetchCamerasAndSetNextNumber = async () => {
            try {
                if (cameras && cameras.length > 0) {
                    const maxNumber = cameras.reduce((max: number, data: Cameras) => Math.max(max, data.numeroCamera), 0);
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
                validateForm();
            } else {
                setShowIpValidationErrors(true);
            }
        }
        if (showValidationErrors) {
            setShowValidationErrors(false);
        }
        setFormData(prev => ({
            ...prev,
            [name]: parsedValue
        }));
        validateForm();
    };

    // Função para lidar com o fecho
    const handleClose = () => {
        setFormData(initialValues);
        setShowIpValidationErrors(false);
        setShowValidationErrors(false);
        onClose();
    }

    // Função para verificar se o formulário é válido antes de salvar
    const handleCheckForSave = () => {
        if (!isFormValid) {
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar.');
            return;
        }
        handleSave();
    }

    // Função para salvar os dados
    const handleSave = () => {
        onSave(formData as T);
        handleClose();
    };

    // Alterna a visibilidade da password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Modal show={open} onHide={handleClose} backdrop="static" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
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
                                        className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                        type="number"
                                        name="numeroCamera"
                                        value={formData.numeroCamera || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['numeroCamera'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['numeroCamera']}</div>}
                            </Form.Group>
                            <Form.Group controlId="formIp">
                                <Form.Label>IP</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="string"
                                    name="ip"
                                    isInvalid={showIpValidationErrors && !validateIPAddress(formData.ip || '')}
                                    value={formData.ip || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formUserCamera">
                                <Form.Label>Utilizador</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="string"
                                    name="userCamera"
                                    value={formData.userCamera || ''}
                                    onChange={handleChange}
                                />
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
                                        className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
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
                                        className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
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
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        className="custom-input-height custom-select-font-size"
                                        value={formData.passwordCamera || ''}
                                        onChange={handleChange}
                                        name="passwordCamera"
                                        maxLength={6}
                                        style={{ borderRight: 'none' }}
                                    />
                                    <InputGroup.Text
                                        style={{
                                            cursor: 'pointer',
                                            background: 'transparent',
                                            borderLeft: 'none',
                                            height: '30px',
                                        }}
                                        onClick={togglePasswordVisibility}
                                    >
                                        <img src={showPassword ? hidepass : showpass} alt={showPassword ? "Esconder password" : "Mostrar password"} style={{ width: 20, height: 20 }} />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleClose}>
                    Fechar
                </Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleCheckForSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal >
    );
};