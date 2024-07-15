import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/PagesStyles.css';
import { Tab, Row, Col, Nav, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import modalAvatar from '../assets/img/navbar/navbar/modalAvatar.png';
import { toast } from 'react-toastify';
import * as apiService from "../helpers/apiService";

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Define the FieldConfig interface
interface FieldConfig {
    label: string;
    key: string;
    type: string;
    required?: boolean;
    optionsUrl?: string;
    validate?: (value: any) => boolean;
    errorMessage?: string;
}

// Define as propriedades do componente
interface Props<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    fields: FieldConfig[];
    initialValues: Partial<T>;
}

// Define o componente
export const CreateModalExtEnt = <T extends Record<string, any>>({ title, open, onClose, onSave, fields, initialValues }: Props<T>) => {
    const [formData, setFormData] = useState<Partial<T>>(initialValues);
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
    const fileInputRef = React.createRef<HTMLInputElement>();
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Atualiza com a validação do formulário
    useEffect(() => {
        const newErrors: Record<string, string> = {};

        const isValid = fields.every(field => {
            const fieldValue = formData[field.key];
            let valid = true;

            if (field.type === 'number' && fieldValue != null && fieldValue < 0) {
                valid = false;
                newErrors[field.key] = `${field.label} não pode ser negativo.`;
            }

            return valid;
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
    }, [formData, fields]);

    // Função para buscar os funcionários
    const fetchEmployees = async () => {
        const response = await apiService.fetchAllEmployees();
        if (response.ok) {
            const employees = await response.json();
            setDropdownData(prev => ({ ...prev, responsibleName: employees }));
        } else {
            toast.error('Erro ao buscar os funcionários.');
        }
        fetchEmployees();
    };

    // Função para buscar as opções do dropdown
    const fetchDropdownOptions = async () => {
        try {
            const externalEntityTypesResponse = await apiService.fetchAllExternalEntityTypes();
            if (externalEntityTypesResponse.ok) {
                const externalEntitiesType = await externalEntityTypesResponse.json();
                setDropdownData({
                    externalEntityTypeId: externalEntitiesType
                });
            } else {
                toast.error('Erro ao buscar os dados de tipos.');
            }
        } catch (error) {
            toast.error('Erro ao buscar os dados de tipos.');
            console.error(error);
        }
    };

    // Atualiza com a busca de funcionários
    useEffect(() => {
        fetchEmployees();
        fetchDropdownOptions();
    }, []);

    // Define a mudança de foto
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

    // Define a abertura do seletor de arquivos
    const triggerFileSelectPopup = () => fileInputRef.current?.click();

    // Define a mudança de valor do formulário
    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? Number(value) : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };

    // Função para lidar com a mudança do dropdown
    const handleDropdownChange = (key: string, e: React.ChangeEvent<FormControlElement>) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    // Define o clique no botão de salvar
    const handleSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de salvar.');
            return;
        }
        handleSave();
    };

    // Define a função de salvar
    const handleSave = () => {
        onSave(formData as T);
    };

    return (
        <Modal show={open} onHide={onClose} dialogClassName="custom-modal" size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Row>
                    <Col md={3}>
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
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formCommercialName">
                            <Form.Label>Nome Comercial</Form.Label>
                            <Form.Control
                                type="string"
                                className="custom-input-height custom-select-font-size"
                                value={formData.commercialName || ''}
                                onChange={handleChange}
                                name="commercialName"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formNif">
                            <Form.Label>
                                NIF <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-nif">Campo obrigatório</Tooltip>}
                            >
                                <Form.Control
                                    type="number"
                                    className="custom-input-height custom-select-font-size"
                                    value={formData.nif || ''}
                                    onChange={handleChange}
                                    name="nif"
                                    required
                                />
                            </OverlayTrigger>
                            {errors.nif && <Form.Text className="text-danger">{errors.nif}</Form.Text>}
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formExternalEntityType">
                            <Form.Label>Tipos de Entidade Externa</Form.Label>
                            <Form.Control
                                as="select"
                                className="custom-input-height custom-select-font-size"
                                value={formData.externalEntityTypeId || ''}
                                onChange={(e) => handleDropdownChange('externalEntityTypeId', e)}
                                name="externalEntityTypeId"
                            >
                                <option value="">Selecione...</option>
                                {dropdownData.externalEntityTypeId?.map((option) => (
                                    <option key={option.externalEntityTypeID} value={option.externalEntityTypeID}>
                                        {option.name}
                                    </option>
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
                            <Nav.Link eventKey="moradas">Moradas</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="dadosGerais">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group controlId="formResponsibleName">
                                            <Form.Label>Nome do Responsável</Form.Label>
                                            <Form.Control as="select" value={formData.responsibleName || ''} onChange={handleChange} name="responsibleName" className="custom-input-height custom-select-font-size">
                                                <option value="">Selecione...</option>
                                                {dropdownData.responsibleName && dropdownData.responsibleName.map((employee) => (
                                                    <option key={employee.id} value={employee.name}>
                                                        {employee.name}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="formPhone">
                                            <Form.Label>Telefone</Form.Label>
                                            <Form.Control
                                                type="string"
                                                className="custom-input-height custom-select-font-size"
                                                value={formData.phone || ''}
                                                onChange={handleChange}
                                                name="phone"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formEmail">
                                            <Form.Label>E-Mail</Form.Label>
                                            <Form.Control
                                                type="string"
                                                className="custom-input-height custom-select-font-size"
                                                value={formData.email || ''}
                                                onChange={handleChange}
                                                name="email"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formDateInserted">
                                            <Form.Label>Data Inserida</Form.Label>
                                            <Form.Control
                                                type="date"
                                                className="custom-input-height custom-select-font-size"
                                                value={formData.dateInserted || ''}
                                                onChange={handleChange}
                                                name="dateInserted"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formMobile">
                                            <Form.Label>Telemóvel</Form.Label>
                                            <Form.Control
                                                type="string"
                                                className="custom-input-height custom-select-font-size"
                                                value={formData.mobile || ''}
                                                onChange={handleChange}
                                                name="mobile"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formWww">
                                            <Form.Label>WWW</Form.Label>
                                            <Form.Control
                                                type="string"
                                                className="custom-input-height custom-select-font-size"
                                                value={formData.www || ''}
                                                onChange={handleChange}
                                                name="www"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formFont">
                                            <Form.Label>Fonte</Form.Label>
                                            <Form.Control
                                                type="string"
                                                className="custom-input-height custom-select-font-size"
                                                value={formData.font || ''}
                                                onChange={handleChange}
                                                name="font"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formFax">
                                            <Form.Label>Fax</Form.Label>
                                            <Form.Control
                                                type="string"
                                                className="custom-input-height custom-select-font-size"
                                                value={formData.fax || ''}
                                                onChange={handleChange}
                                                name="fax"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formComments">
                                            <Form.Label>Comentários</Form.Label>
                                            <Form.Control
                                                type="string"
                                                className="custom-input-height custom-select-font-size"
                                                value={formData.comments || ''}
                                                onChange={handleChange}
                                                name="comments"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3} className='img-modal'>
                                        <img
                                            src={profileImage || modalAvatar}
                                            alt="Profile Avatar"
                                            style={{ width: 128, height: 128, borderRadius: '50%', cursor: 'pointer', objectFit: 'cover' }}
                                            onClick={triggerFileSelectPopup}
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
                        <Tab.Pane eventKey="moradas">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group controlId="formAddress">
                                            <Form.Label>Morada</Form.Label>
                                            <Form.Control
                                                type="string"
                                                className="custom-input-height custom-select-font-size"
                                                value={formData['address'] || ''}
                                                onChange={handleChange}
                                                name="address"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    {[
                                        { label: 'Código Postal', key: 'ZIPCode', type: 'string' },
                                        { label: 'Localidade', key: 'locality', type: 'string' },
                                        { label: 'Freguesia', key: 'village', type: 'string' },
                                        { label: 'Distrito', key: 'district', type: 'string' },
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