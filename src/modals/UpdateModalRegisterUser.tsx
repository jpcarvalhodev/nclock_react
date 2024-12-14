import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import '../css/PagesStyles.css';
import { toast } from 'react-toastify';
import modalAvatar from '../assets/img/navbar/navbar/modalAvatar.png';
import React from 'react';
import * as apiService from "../helpers/apiService";
import { CustomOutlineButton } from '../components/CustomOutlineButton';
import hidepass from '../assets/img/login/hidepass.png';
import showpass from '../assets/img/login/showpass.png';

// Define a interface Entity
export interface Entity {
    id: string;
    [key: string]: any;
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
interface FieldConfig {
    label: string;
    key: string;
    type: string;
    required?: boolean;
    validate?: (value: any) => boolean;
    errorMessage?: string;
}

// Define a interface para as propriedades do componente
interface Props<T extends Entity> {
    title: string;
    open: boolean;
    onClose: () => void;
    onDuplicate: (entity: Partial<T>) => void;
    onUpdate: (entity: FormData) => Promise<void>;
    entity: T;
    fields: FieldConfig[];
    onNext: () => void;
    onPrev: () => void;
    canMoveNext: boolean;
    canMovePrev: boolean;
}

export const UpdateModalRegisterUsers = <T extends Entity>({ title, open, onClose, onUpdate, onDuplicate, entity, fields, canMoveNext, canMovePrev, onNext, onPrev }: Props<T>) => {
    const [formData, setFormData] = useState<Partial<T>>({ ...entity });
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<ErrorRecord>({});
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const fileInputRef = React.createRef<HTMLInputElement>();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordPlaceholder, setPasswordPlaceholder] = useState('●●●●●●●●');
    const [password, setPassword] = useState('');
    const [showValidationErrors, setShowValidationErrors] = useState(false);

    // Atualiza o formData com os dados da entity
    useEffect(() => {
        if (open && entity) {
            setFormData({ ...entity });
            const imageURL = entity.profileImage ? `${apiService.baseURL?.slice(0, -1)}${entity.profileImage}` : modalAvatar;
            setProfileImage(imageURL);
        } else {
            setProfileImage(modalAvatar);
            setProfileImageFile(null);
        }
    }, [open, entity]);

    // Usa useEffect para validar o formulário
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
            newErrors['password'] = { hasError: true, message: 'A password deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um caractere especial.' };
        }

        setErrors(newErrors);
        setIsFormValid(isValid);
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

    // Define a função para resetar a foto de perfil
    const resetToDefaultAvatar = () => {
        setProfileImage(modalAvatar);
        setProfileImageFile(null);
        setFormData({ ...formData, profileImage: '' });
    };

    // Função para validar a senha
    const validatePassword = (password: string): boolean => {
        const regex = /^(?=.*[A-Z])(?=.*[!@#$&*-_])/;
        return regex.test(password);
    };

    // Função para manipular o clique no botão Duplicar
    const handleDuplicateClick = () => {
        if (!onDuplicate) return;
        const { id, ...dataWithoutId } = formData;
        onDuplicate(dataWithoutId as T);
    };

    // Função para lidar com a mudança de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        let parsedValue: string | number | boolean;

        if (name === 'password') {
            setPassword(value);
            if (!value) {
                setPasswordPlaceholder('●●●●●●●●');
            }
        }

        if (showValidationErrors) {
            setShowValidationErrors(false);
        }

        if (type === 'checkbox') {
            parsedValue = target.checked;
        } else if (type === 'number') {
            parsedValue = Number(value);
        } else {
            parsedValue = name === 'userName' ? value.replace(/\s+/g, '') : value;
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };

    // Função para lidar com o foco no campo de senha
    const handleFocus = () => {
        if (!password) {
            setPasswordPlaceholder('');
        }
    };

    // Função para lidar com o desfoque no campo de senha
    const handleBlur = () => {
        if (!password) {
            setPasswordPlaceholder('●●●●●●●●');
        }
    };

    // Define a função para acionar o popup de seleção de arquivo
    const triggerFileSelectPopup = () => fileInputRef.current?.click();

    // Função para lidar com o clique em guardar
    const handleSaveClick = () => {
        if (!isFormValid) {
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }

        const dataToSend = new FormData();

        dataToSend.append('id', entity.id);

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

        onUpdate(dataToSend);
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
                            <Form.Group controlId="formPassword" style={{ position: 'relative', marginBottom: '30px' }}>
                                <Form.Label>Password</Form.Label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password || passwordPlaceholder}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        autoComplete='off'
                                        minLength={8}
                                        style={{ paddingRight: '40px', flex: 1 }}
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            position: 'absolute',
                                            top: '5%',
                                            right: '10px',
                                            border: 'none',
                                            backgroundColor: 'transparent',
                                            padding: 0,
                                            zIndex: 5
                                        }}
                                    >
                                        <img
                                            src={showPassword ? hidepass : showpass}
                                            alt={showPassword ? "Esconder password" : "Mostrar password"}
                                            style={{ width: 20, height: 20 }}
                                        />
                                    </Button>
                                </div>
                                {errors['password'] && errors['password'].hasError && <Form.Text className="text-danger">{errors['password'].message}</Form.Text>}
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
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Anterior</Tooltip>}
                >
                    <CustomOutlineButton icon="bi-arrow-left" onClick={onPrev} disabled={!canMovePrev} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Seguinte</Tooltip>}
                >
                    <CustomOutlineButton className='arrows-modal' icon="bi-arrow-right" onClick={onNext} disabled={!canMoveNext} />
                </OverlayTrigger>
                <Button variant="outline-info" onClick={handleDuplicateClick}>Duplicar</Button>
                <Button variant="outline-secondary" onClick={onClose}>Fechar</Button>
                <Button variant="outline-primary" onClick={handleSaveClick} disabled={!isFormValid}>Guardar</Button>
            </Modal.Footer>
        </Modal >
    );
};