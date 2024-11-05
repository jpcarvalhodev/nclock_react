import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import '../css/PagesStyles.css';
import { toast } from 'react-toastify';
import modalAvatar from '../assets/img/navbar/navbar/modalAvatar.png';
import React from 'react';
import { Register } from '../helpers/Types';

// Define a interface Entity
export interface Entity {
    id: string;
    [key: string]: any;
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
    onUpdate: (entity: FormData) => Promise<void>;
    entity: T;
    fields: FieldConfig[];
}

export const UpdateModalRegisterUsers = <T extends Entity>({ title, open, onClose, onUpdate, entity, fields }: Props<T>) => {
    const [formData, setFormData] = useState<Partial<T>>({ ...entity });
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const fileInputRef = React.createRef<HTMLInputElement>();

    // Atualiza o formData com os dados da entity
    useEffect(() => {
        if (entity) {
            setFormData({ ...entity });
        }
    }, [entity]);

    // Atualiza o estado da foto
    useEffect(() => {
        if (entity && entity.profileImage) {
            setProfileImage(entity.profileImage);
        } else {
            setProfileImage(modalAvatar);
        }
    }, [entity]);

    // Usa useEffect para validar o formulário
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

    // Define a mudança de foto
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImageFile(file);
            const reader = new FileReader();
            reader.onload = (readerEvent) => {
                const image = new Image();
                image.onload = () => {
                    let width = image.width;
                    let height = image.height;

                    if (width > 512 || height > 512) {
                        if (width > height) {
                            height *= 512 / width;
                            width = 512;
                        } else {
                            width *= 512 / height;
                            height = 512;
                        }
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(image, 0, 0, width, height);

                    const dataUrl = canvas.toDataURL('image/png');
                    setProfileImage(dataUrl);
                    setFormData({ ...formData, photo: dataUrl });
                };
                image.src = readerEvent.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    // Define a função para resetar a foto de perfil
    const resetToDefaultAvatar = () => {
        setProfileImage(modalAvatar);
        setFormData({ ...formData, photo: '' });
    };

    // Função para lidar com a mudança de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        let parsedValue: string | number | boolean;

        if (type === 'checkbox') {
            parsedValue = target.checked;
        } else if (type === 'number') {
            parsedValue = Number(value);
        } else {
            parsedValue = value;
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };

    // Define a função para acionar o popup de seleção de arquivo
    const triggerFileSelectPopup = () => fileInputRef.current?.click();

    // Função para lidar com o clique em guardar
    const handleSaveClick = () => {
        if (!isFormValid) {
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
            dataToSend.append('Roles', formData.roles);
        }
        if (profileImageFile) {
            dataToSend.append('ProfileImage', profileImageFile);
        }
        
        onUpdate(dataToSend);
        onClose();
    };

    // Define as seleções de tipo de conta
    const RoleTypes = [
        { value: 'Admin', label: 'Administrador' },
        { value: 'User', label: 'Utilizador' }
    ];

    return (
        <Modal show={open} onHide={onClose} backdrop="static" dialogClassName="modal-scrollable" size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Col md={4} className='img-modal'>
                            <img
                                src={profileImage || modalAvatar}
                                alt="Profile Avatar"
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
                                        className="custom-input-height custom-select-font-size"
                                        type="text"
                                        name="name"
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
                            </Form.Group>
                            <Form.Group controlId="formEmailAddress">
                                <Form.Label>E-Mail <span style={{ color: 'red' }}>*</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-emailAddress">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="email"
                                        name="emailAddress"
                                        value={formData.emailAddress || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors.emailAddress && <Form.Text className="text-danger">{errors.emailAddress}</Form.Text>}
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Senha <span style={{ color: 'red' }}>*</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-password">Obrigatório a senha ter uma letra maiúscula e um caractere especial</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="password"
                                        name="password"
                                        value={formData.password || ''}
                                        onChange={handleChange}
                                        autoComplete='off'
                                    />
                                </OverlayTrigger>
                                {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formUserName">
                                <Form.Label>Nome de Usuário <span style={{ color: 'red' }}>*</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-userName">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="text"
                                        name="userName"
                                        value={formData.userName || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors.userName && <Form.Text className="text-danger">{errors.userName}</Form.Text>}
                            </Form.Group>
                            <Form.Group controlId="formRoles">
                                <Form.Label>Tipo de Conta <span style={{ color: 'red' }}>*</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-roles">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
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
                                {errors.emailAddress && <Form.Text className="text-danger">{errors.emailAddress}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>Fechar</Button>
                <Button variant="outline-primary" onClick={handleSaveClick} disabled={!isFormValid}>Guardar</Button>
            </Modal.Footer>
        </Modal >
    );
};