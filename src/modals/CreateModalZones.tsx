import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/PagesStyles.css';
import { Tab, Row, Col, Nav, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import modalAvatar from '../assets/img/navbar/navbar/modalAvatar.png';
import { toast } from 'react-toastify';

// Define a interface para as propriedades do componente FieldConfig
interface FieldConfig {
    label: string;
    key: string;
    type: string;
    required?: boolean;
    optionsUrl?: string;
}

// Define a interface para as propriedades do componente
interface Props<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    fields: FieldConfig[];
    initialValues: Partial<T>;
}

// Define o componente
export const CreateModalZones = <T extends Record<string, any>>({ title, open, onClose, onSave, fields, initialValues }: Props<T>) => {
    const [formData, setFormData] = useState<Partial<T>>(initialValues);
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
    const fileInputRef = React.createRef<HTMLInputElement>();
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // useEffect para validar o formulário
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

    // Atualiza o valor do campo da foto
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

    // Abre a busca de arquivo para selecionar a foto
    const triggerFileSelectPopup = () => fileInputRef.current?.click();

    // Atualiza o valor dos campos
    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Verifica o formulário e chama a função de salvar
    const handleSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de salvar.');
            return;
        }
        handleSave();
    };

    // Salva os dados
    const handleSave = () => {
        onSave(formData as T);
    };

    // Opções de tipo
    const typeOptions = [
        { value: 'zona', label: 'Zona' },
        { value: 'local_de_trabalho', label: 'Local de Trabalho' },
        { value: 'cantina', label: 'Cantina' },
    ];

    return (
        <Modal show={open} onHide={onClose} dialogClassName="custom-modal" size="xl">
            <Modal.Header closeButton>
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
                                    className="custom-input-height custom-select-font-size"
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
                                overlay={<Tooltip id="tooltip-acronym">Campo obrigatório</Tooltip>}
                            >
                                <Form.Control
                                    type="string"
                                    className="custom-input-height custom-select-font-size"
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
                                                value={formData.description || ''}
                                                onChange={handleChange}
                                                name="description"
                                                className="custom-select-font-size textarea-large"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} className='img-modal'>
                                        <img
                                            src={profileImage || modalAvatar}
                                            alt="Profile Avatar"
                                            style={{ width: 128, height: 128, borderRadius: '50%', cursor: 'pointer', objectFit: 'cover'}}
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
                                    </Col>
                                </Row>
                            </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="dadosComplementares">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                <Row>
                                    {[
                                        { key: 'address', label: 'Morada', type: 'string' },
                                        { key: 'ZIPCode', label: 'Código Postal', type: 'string' },
                                        { key: 'locality', label: 'Localidade', type: 'string' },
                                        { key: 'village', label: 'Freguesia', type: 'string' },
                                        { key: 'District', label: 'Distrito', type: 'string' },
                                        { key: 'Phone', label: 'Telefone', type: 'string' },
                                        { key: 'Mobile', label: 'Telemóvel', type: 'string' },
                                        { key: 'Email', label: 'E-Mail', type: 'string' },
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
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>Fechar</Button>
                <Button variant="outline-primary" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
        </Modal >
    );
};