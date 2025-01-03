import React, { useEffect, useState } from 'react';
import { Col, Form, InputGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/PagesStyles.css';
import { toast } from 'react-toastify';

import hidepass from '../assets/img/login/hidepass.png';
import showpass from '../assets/img/login/showpass.png';
import modalAvatar from '../assets/img/navbar/navbar/modalAvatar.png';
import * as apiService from "../helpers/apiService";

// Define a interface para as propriedades do componente
interface FieldConfig {
    label: string;
    key: string;
    type: string;
    required?: boolean;
    validate?: (value: any) => boolean;
    errorMessage?: string;
}

// Define a interface para os itens de erro
interface ErrorDetails {
    hasError: boolean;
    message: string;
}

// Define a interface para os itens de erro
interface ErrorRecord {
    [key: string]: ErrorDetails;
}

// Define a interface para as propriedades do componente
interface Props<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: FormData) => void;
    fields: FieldConfig[];
    initialValues: Partial<T>;
}

export const CreateModalRegisterUsers = <T extends Record<string, any>>({ title, open, onClose, onSave, fields, initialValues }: Props<T>) => {
    const [formData, setFormData] = useState<Partial<T>>(initialValues);
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<ErrorRecord>({});
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const fileInputRef = React.createRef<HTMLInputElement>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showValidationErrors, setShowValidationErrors] = useState(false);

    // useEffect para limpar o formulário quando o modal é fechado
    useEffect(() => {
        if (open) {
            setFormData(initialValues);
            setProfileImage(modalAvatar);
        } else {
            setFormData({});
            setProfileImage(null);
            setProfileImageFile(null);
        }
    }, [open]);

    // useEffect para validar o formulário
    useEffect(() => {
        const newErrors: ErrorRecord = {};
        let isValid = true;

        fields.forEach(field => {
            const fieldValue = formData[field.key];
            if (field.required && (fieldValue === null || fieldValue === '')) {
                isValid = false;
            }

            if (field.type === 'number' && fieldValue != null && fieldValue < 0) {
                isValid = false;
            }

        });

        setErrors(newErrors);
        setIsFormValid(isValid);
        validateForm();
    }, [formData, fields]);

    // Função para validar o formulário
    const validateForm = () => {
        let newErrors: ErrorRecord = {};
        let isValid = true;

        fields.forEach((field) => {
            const fieldValue = formData[field.key];
            if (field.required && !fieldValue) {
                isValid = false;
            } else if (field.validate && !field.validate(fieldValue)) {
                isValid = false;
            }
        });

        if (formData.password && !validatePassword(formData.password as string)) {
            isValid = false;
            newErrors['password'] = { hasError: true, message: 'A password deve ter pelo menos 6 caracteres, uma letra maiúscula, uma minúscula e um caractere especial.' };
        }

        if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
            isValid = false;
            newErrors['confirmPassword'] = { hasError: true, message: 'A senha e a confirmação não coincidem.' };
        }

        setErrors(newErrors);
        setIsFormValid(isValid);
    };

    // Função para lidar com a mudança de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        let parsedValue: string | number | boolean;

        if (showValidationErrors) {
            setShowValidationErrors(false);
        }

        if (type === 'number') {
            parsedValue = Number(value);
        } else {
            parsedValue = name === 'userName' ? value.replace(/\s+/g, '') : value;
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };

    // Define a mudança de foto
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImageFile(file);
            const objectUrl = URL.createObjectURL(file);
            setProfileImage(objectUrl);
        }
    };

    // Função para validar a senha
    const validatePassword = (password: string): boolean => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
        return regex.test(password);
    };

    // Define a função para resetar a foto de perfil
    const resetToDefaultAvatar = () => {
        setProfileImage(modalAvatar);
        setProfileImageFile(null);
        setFormData({ ...formData, profileImage: '' });
    };

    // Função para lidar com o fecho
    const handleClose = () => {
        window.location.reload();
        onClose();
    }

    // Define a função para acionar o popup de seleção de arquivo
    const triggerFileSelectPopup = () => fileInputRef.current?.click();

    // Função para lidar com o clique em guardar
    const handleSaveClick = () => {
        if (!isFormValid) {
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar.');
            return;
        }

        const dataToSend = new FormData();

        if (formData.name) {
            dataToSend.append('Name', formData.name);
        }
        if (formData.userName) {
            dataToSend.append('UserName', formData.userName);
        }
        if (formData.emailAddress) {
            dataToSend.append('EmailAddress', formData.emailAddress);
        }
        if (formData.password) {
            dataToSend.append('Password', formData.password);
        }
        if (formData.confirmPassword) {
            dataToSend.append('ConfirmPassword', formData.confirmPassword);
        }
        if (formData.roles) {
            dataToSend.append('Role', formData.roles);
        }
        if (profileImageFile) {
            dataToSend.append('ProfileImage', profileImageFile);
        } else if (profileImage === modalAvatar) {
            dataToSend.append('ProfileImage', '');
        } else if (profileImage && typeof profileImage === 'string') {
            const relativePath = profileImage.replace(apiService.baseURL || '', '');
            dataToSend.append('ProfileImage', relativePath);
        }

        onSave(dataToSend);
    };

    // Define as seleções de tipo de conta
    const RoleTypes = [
        { value: 'Admin', label: 'Administrador' },
        { value: 'User', label: 'Utilizador' }
    ];

    // Alterna a visibilidade da password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Alterna a visibilidade da confirmação da password
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static" dialogClassName="modal-scrollable" size='xl' style={{ marginTop: 100 }}>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Col md={4} className='img-modal'>
                            <img
                                src={profileImage as string}
                                style={{ width: 128, height: 128, borderRadius: '50%', cursor: 'pointer', objectFit: 'cover' }}
                                onDoubleClick={triggerFileSelectPopup}
                            />
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
                                />
                            </div>
                            <div>
                                <Button variant="outline-danger" onClick={resetToDefaultAvatar} size='sm' style={{ marginTop: 10 }}>
                                    Remover Foto
                                </Button>
                            </div>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formName">
                                <Form.Label>Nome <span style={{ color: 'red' }}>*</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-name">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                        type="text"
                                        name="name"
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['name'] && errors['name'].hasError && <Form.Text className="text-danger">{errors['name'].message}</Form.Text>}
                            </Form.Group>
                            <Form.Group controlId="formEmailAddress">
                                <Form.Label>E-Mail <span style={{ color: 'red' }}>*</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-emailAddress">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                        type="email"
                                        name="emailAddress"
                                        value={formData.emailAddress || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['emailAddress'] && errors['emailAddress'].hasError && <Form.Text className="text-danger">{errors['emailAddress'].message}</Form.Text>}
                            </Form.Group>
                            <Form.Group controlId="formPassword" style={{ marginBottom: '30px' }}>
                                <Form.Label>Password <span style={{ color: 'red' }}>*</span></Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password || ''}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        minLength={8}
                                        className={`custom-input-height custom-select-font-size ${showValidationErrors && errors['password'] && errors['password'].hasError ? 'error-border' : ''}`}
                                        style={{ paddingRight: '40px', borderRight: 'none' }}
                                    />
                                    <InputGroup.Text
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            cursor: 'pointer',
                                            background: 'transparent',
                                            borderLeft: 'none',
                                            height: '30px',
                                        }}
                                    >
                                        <img
                                            src={showPassword ? hidepass : showpass}
                                            alt={showPassword ? "Esconder password" : "Mostrar password"}
                                            style={{ width: 20, height: 20 }}
                                        />
                                    </InputGroup.Text>
                                </InputGroup>
                                <Form.Text className="text-danger" style={{ minHeight: '20px', marginTop: '5px' }}>
                                    {showValidationErrors && errors['password'] && errors['password'].hasError && errors['password'].message}
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formUserName">
                                <Form.Label>Nome de Utilizador <span style={{ color: 'red' }}>*</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-userName">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                        type="text"
                                        name="userName"
                                        value={formData.userName || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['userName'] && errors['userName'].hasError && <Form.Text className="text-danger">{errors['userName'].message}</Form.Text>}
                            </Form.Group>
                            <Form.Group controlId="formRoles">
                                <Form.Label>Tipo de Conta <span style={{ color: 'red' }}>*</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-roles">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                        as="select"
                                        name="roles"
                                        value={formData.roles || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione...</option>
                                        {RoleTypes.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </Form.Control>
                                </OverlayTrigger>
                                {errors['roles'] && errors['roles'].hasError && <Form.Text className="text-danger">{errors['roles'].message}</Form.Text>}
                            </Form.Group>
                            <Form.Group controlId="formConfirmPassword" style={{ marginBottom: '30px' }}>
                                <Form.Label>Confirmar Password <span style={{ color: 'red' }}>*</span></Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword || ''}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        minLength={8}
                                        className={`custom-input-height form-control custom-select-font-size ${showValidationErrors && errors['confirmPassword'] && errors['confirmPassword'].hasError ? 'error-border' : ''}`}
                                        style={{ paddingRight: '40px', borderRight: 'none' }}
                                    />
                                    <InputGroup.Text
                                        onClick={toggleConfirmPasswordVisibility}
                                        style={{
                                            cursor: 'pointer',
                                            background: 'transparent',
                                            borderLeft: 'none',
                                            height: '30px',
                                        }}
                                    >
                                        <img
                                            src={showConfirmPassword ? hidepass : showpass}
                                            alt={showConfirmPassword ? "Esconder password" : "Mostrar password"}
                                            style={{ width: 20, height: 20 }}
                                        />
                                    </InputGroup.Text>
                                </InputGroup>
                                <Form.Text className="text-danger" style={{ minHeight: '20px', marginTop: '5px' }}>
                                    {showValidationErrors && errors['confirmPassword'] && errors['confirmPassword'].hasError && errors['confirmPassword'].message}
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button variant="outline-secondary" onClick={handleClose}>Fechar</Button>
                <Button variant="outline-primary" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
        </Modal >
    );
};