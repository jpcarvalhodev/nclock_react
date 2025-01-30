import { useEffect, useRef, useState } from 'react';
import { Col, Form, Nav, OverlayTrigger, Row, Tab, Tooltip } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import modalAvatar from '../assets/img/navbar/navbar/modalAvatar.png';
import { CustomOutlineButton } from '../components/CustomOutlineButton';

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
}

// Define as propriedades do componente
interface UpdateModalProps<T extends Entity> {
    open: boolean;
    onClose: () => void;
    onDuplicate: (entity: Partial<T>) => void;
    onUpdate: (entity: T) => Promise<void>;
    entity: T;
    fields: Field[];
    title: string;
    onNext: () => void;
    onPrev: () => void;
    canMoveNext: boolean;
    canMovePrev: boolean;
}

// Define o componente
export const UpdateModalZones = <T extends Entity>({ open, onClose, onUpdate, onDuplicate, entity, fields, title, canMoveNext, canMovePrev, onNext, onPrev }: UpdateModalProps<T>) => {
    const [formData, setFormData] = useState<T>({ ...entity });
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [showValidationErrors, setShowValidationErrors] = useState(false);

    // Usa useEffect para inicializar o formulário
    useEffect(() => {
        if (open && entity) {
            setFormData({ ...entity });
        }
        if (entity && entity.photo) {
            setProfileImage(entity.photo);
        } else {
            setProfileImage(modalAvatar);
        }
    }, [open, entity]);

    // useEffect para validar o formulário
    useEffect(() => {
        const newErrors: Record<string, boolean> = {};

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

    // Atualiza o estado da foto
    useEffect(() => {
        if (entity && entity.photo) {
            setProfileImage(entity.photo);
        } else {
            setProfileImage(modalAvatar);
        }
    }, [entity]);

    // Atualiza o estado do componente com a foto
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
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

    // Atualiza o estado do componente com o reset de foto
    const resetToDefaultAvatar = () => {
        setProfileImage(modalAvatar);
        setFormData({ ...formData, photo: '' });
    };

    // Função para manipular o clique no botão Duplicar
    const handleDuplicateClick = () => {
        if (!onDuplicate) return;
        const { zoneID, ...dataWithoutId } = formData;
        onDuplicate(dataWithoutId as T);
    };

    // Atualiza o estado do componente com o evento de seleção de arquivo
    const triggerFileSelectPopup = () => fileInputRef.current?.click();

    // Atualiza o estado do componente com a mudança de campo
    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        if (showValidationErrors) {
            setShowValidationErrors(false);
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Atualiza o estado do componente com o clique no botão de salvar
    const handleSaveClick = () => {
        if (!isFormValid) {
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar.');
            return;
        }
        handleSubmit();
    };

    // Atualiza o estado do componente com o envio do formulário
    const handleSubmit = async () => {
        await onUpdate(formData);
    };

    // Define as opções de tipo
    const typeOptions = [
        { value: 0, label: 'Zona' },
        { value: 1, label: 'Local de Trabalho' },
        { value: 2, label: 'Cantina' },
    ];

    return (
        <Modal show={open} onHide={onClose} backdrop="static" dialogClassName="custom-modal" size="xl" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Row>
                    <Col md={5}>
                        <Form.Group controlId="formName">
                            <Form.Label>
                                Nome <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-name">Campo obrigatório</Tooltip>}
                            >
                                <Form.Control
                                    type="string"
                                    className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                    value={formData.name || ''}
                                    onChange={handleChange}
                                    name="name"
                                    required
                                />
                            </OverlayTrigger>
                            {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formAcronym">
                            <Form.Label>
                                Acrônimo <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-acronym">Campo deve ter no máximo 4 caracteres</Tooltip>}
                            >
                                <Form.Control
                                    type="string"
                                    className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                    value={formData.acronym || ''}
                                    onChange={handleChange}
                                    name="acronym"
                                    required
                                />
                            </OverlayTrigger>
                            {errors.acronym && <Form.Text className="text-danger">{errors.acronym}</Form.Text>}
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formType">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                                as="select"
                                className="custom-input-height custom-select-font-size"
                                value={formData.type || ''}
                                onChange={handleChange}
                                name="type"
                            >
                                <option value="">Selecione...</option>
                                {typeOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Tab.Container defaultActiveKey="dadosGerais">
                    <Nav variant="tabs" className="nav-modal">
                        <Nav.Item>
                            <Nav.Link eventKey="dadosGerais">Dados Gerais</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="dadosComplementares">Dados Complementares</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="dadosGerais">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                <Row>
                                    <Col md={8}>
                                        <Form.Group controlId="formDescription">
                                            <Form.Label>Descrição</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={5}
                                                value={formData.description || ''}
                                                onChange={handleChange}
                                                name="description"
                                                className="custom-select-font-size textarea"
                                            />
                                        </Form.Group>
                                    </Col>
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
                                            <Button variant="outline-dark" onClick={resetToDefaultAvatar} size='sm' style={{ marginTop: 10 }}>
                                                Remover Foto
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="dadosComplementares">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                <Row>
                                    {[
                                        { key: 'address', label: 'Morada', type: 'string' },
                                        { key: 'ziPcode', label: 'Código Postal', type: 'string' },
                                        { key: 'locality', label: 'Localidade', type: 'string' },
                                        { key: 'village', label: 'Freguesia', type: 'string' },
                                        { key: 'district', label: 'Distrito', type: 'string' },
                                        { key: 'phone', label: 'Telefone', type: 'string' },
                                        { key: 'mobile', label: 'Telemóvel', type: 'string' },
                                        { key: 'email', label: 'E-Mail', type: 'string' },
                                    ].map((field) => (
                                        <Col md={3}>
                                            <Form.Group controlId={`form${field.key}`}>
                                                <Form.Label>{field.label}</Form.Label>
                                                <Form.Control
                                                    type={field.type}
                                                    className="custom-input-height custom-select-font-size"
                                                    value={formData[field.key] || ''}
                                                    onChange={handleChange}
                                                    name={field.key}
                                                />
                                            </Form.Group>
                                        </Col>
                                    ))}
                                </Row>
                            </Form>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
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
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleDuplicateClick}>Duplicar</Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={onClose}>Fechar</Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
        </Modal >
    );
};