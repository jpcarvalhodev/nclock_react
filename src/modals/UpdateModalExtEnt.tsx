import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { fetchWithAuth } from '../components/FetchWithAuth';
import { Row, Col, Tab, Nav, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import modalAvatar from '../assets/img/modalAvatar.png';
import { toast } from 'react-toastify';

export interface Entity {
    id: string;
    [key: string]: any;
}

interface Field {
    key: string;
    label: string;
    type: string;
    required?: boolean;
    optionsUrl?: string;
}

interface UpdateModalProps<T extends Entity> {
    open: boolean;
    onClose: () => void;
    onUpdate: (entity: T) => Promise<void>;
    entity: T;
    fields: Field[];
    title: string;
}

export const UpdateModalExtEnt = <T extends Entity>({ open, onClose, onUpdate, entity, fields, title }: UpdateModalProps<T>) => {
    const [formData, setFormData] = useState<T>({ ...entity });
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const fileInputRef = React.createRef<HTMLInputElement>();

    useEffect(() => {
        const isValid = fields.every(field => {
            const fieldValue = formData[field.key];
            const valueAsString = fieldValue != null ? String(fieldValue).trim() : '';
            return !field.required || (field.required && valueAsString !== '');
        });
        setIsFormValid(isValid);
    }, [formData, fields]);

    useEffect(() => {
        const fetchDropdownOptions = async (field: Field) => {
            if (field.optionsUrl) {
                const response = await fetchWithAuth(field.optionsUrl);
                if (response.ok) {
                    const data = await response.json();
                    setDropdownData(prev => ({ ...prev, [field.key]: data }));
                }
            }
        };

        fields.forEach(field => {
            if (field.type === 'dropdown') {
                fetchDropdownOptions(field);
            }
        });
    }, [fields]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
                setFormData({ ...formData, photo: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const resetToDefaultAvatar = () => {
        setProfileImage(modalAvatar);
        setFormData({ ...formData, photo: '' });
      };

    const triggerFileSelectPopup = () => fileInputRef.current?.click();

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de salvar.');
            return;
        }
        handleSubmit();
    };

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
                                    type="text"
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
                                type="text"
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
                                overlay={<Tooltip id="tooltip-nameAcronym">Campo obrigatório</Tooltip>}
                            >
                                <Form.Control
                                    type="text"
                                    className="custom-input-height custom-select-font-size"
                                    value={formData.nif || ''}
                                    onChange={handleChange}
                                    name="nif"
                                    required
                                />
                            </OverlayTrigger>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formType">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                                type="text"
                                className="custom-input-height custom-select-font-size"
                                value={formData.type || ''}
                                onChange={handleChange}
                                name="type"
                            />
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
                                            <Form.Control
                                                type="text"
                                                className="custom-input-height custom-select-font-size"
                                                value={formData.responsibleName || ''}
                                                onChange={handleChange}
                                                name="responsibleName"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formPhone">
                                            <Form.Label>Telefone</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="custom-input-height custom-select-font-size"
                                                value={formData.phone || ''}
                                                onChange={handleChange}
                                                name="phone"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formEmail">
                                            <Form.Label>E-Mail</Form.Label>
                                            <Form.Control
                                                type="text"
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
                                                type="text"
                                                className="custom-input-height custom-select-font-size"
                                                value={formData.mobile || ''}
                                                onChange={handleChange}
                                                name="mobile"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formWww">
                                            <Form.Label>WWW</Form.Label>
                                            <Form.Control
                                                type="text"
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
                                                type="text"
                                                className="custom-input-height custom-select-font-size"
                                                value={formData.font || ''}
                                                onChange={handleChange}
                                                name="font"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formFax">
                                            <Form.Label>Fax</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="custom-input-height custom-select-font-size"
                                                value={formData.fax || ''}
                                                onChange={handleChange}
                                                name="fax"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formComments">
                                            <Form.Label>Comentários</Form.Label>
                                            <Form.Control
                                                type="text"
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
                                            style={{ width: 128, height: 128, borderRadius: '50%', cursor: 'pointer' }}
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
                <Button variant="secondary" onClick={onClose}>Fechar</Button>
                <Button variant="primary" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
        </Modal >
    );
};