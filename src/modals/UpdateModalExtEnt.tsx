import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row, Col, Tab, Nav, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import modalAvatar from '../assets/img/navbar/navbar/modalAvatar.png';
import { toast } from 'react-toastify';
import * as apiService from "../helpers/apiService";

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

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
    validate?: (value: any) => boolean;
    errorMessage?: string;
}

// Define a propriedade do componente
interface UpdateModalProps<T extends Entity> {
    open: boolean;
    onClose: () => void;
    onUpdate: (entity: T) => Promise<void>;
    entity: T;
    fields: Field[];
    title: string;
}

// Exporta o componente
export const UpdateModalExtEnt = <T extends Entity>({ open, onClose, onUpdate, entity, fields, title }: UpdateModalProps<T>) => {
    const [formData, setFormData] = useState<T>({ ...entity });
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const fileInputRef = React.createRef<HTMLInputElement>();
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Atualiza o estado do formulário com as validações
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

    // Atualiza o estado da foto
    useEffect(() => {
        if (entity && entity.photo) {
            setProfileImage(entity.photo);
        } else {
            setProfileImage(modalAvatar);
        }
    }, [entity]);

    // Função para lidar com a mudança de foto
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

    // Função para resetar a foto de perfil para o avatar padrão
    const resetToDefaultAvatar = () => {
        setProfileImage(modalAvatar);
        setFormData({ ...formData, photo: '' });
    };

    // Função para abrir o popup de seleção de arquivo
    const triggerFileSelectPopup = () => fileInputRef.current?.click();

    // Função para lidar com a mudança dos campos
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

    // Função para lidar com os dados dos campos
    const handleSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de salvar.');
            return;
        }
        handleSubmit();
    };

    // Função para submeter o formulário
    const handleSubmit = async () => {
        await onUpdate(formData);
        onClose();
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
                            {errors['nif'] && <Form.Text className="text-danger">{errors['nif']}</Form.Text>}
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
                                        <Form.Group controlId="formDateUpdated">
                                            <Form.Label>Data Atualizada</Form.Label>
                                            <Form.Control
                                                type="date"
                                                className="custom-input-height custom-select-font-size"
                                                value={formData.dateUpdated || ''}
                                                onChange={handleChange}
                                                name="dateUpdated"
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