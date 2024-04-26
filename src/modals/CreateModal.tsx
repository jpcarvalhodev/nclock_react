import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/PagesStyles.css';
import { fetchWithAuth } from '../components/FetchWithAuth';
import { Tab, Row, Col, Nav, Form } from 'react-bootstrap';
import modalAvatar from '../assets/img/modalAvatar.png';

interface FieldConfig {
    label: string;
    key: string;
    type: string;
    required?: boolean;
    optionsUrl?: string;
    showCodeInsteadOfName?: boolean;
}

interface Props<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    fields: FieldConfig[];
    initialValues: Partial<T>;
}

export const CreateModal = <T extends Record<string, any>>({ title, open, onClose, onSave, fields, initialValues }: Props<T>) => {
    const [formData, setFormData] = useState<Partial<T>>(initialValues);
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
    const fileInputRef = React.createRef<HTMLInputElement>();

    useEffect(() => {
        const fetchDropdownOptions = async (field: FieldConfig) => {
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

    const triggerFileSelectPopup = () => fileInputRef.current?.click();

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        console.log('formData', formData);
        onSave(formData as T);
    };

    return (
        <Modal show={open} onHide={onClose} dialogClassName="custom-modal" size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Row>
                    <Col md={3} className='img-modal'>
                        <img
                            src={profileImage || modalAvatar}
                            alt="Profile Avatar"
                            style={{ width: 200, height: 200, borderRadius: '50%', cursor: 'pointer' }}
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
                    <Col md={3}>
                        <Form.Group controlId="formEnrollNumber">
                            <Form.Label>Número de Matrícula</Form.Label>
                            <Form.Control
                                type="number"
                                className="custom-input-height"
                                value={formData.enrollNumber || ''}
                                onChange={handleChange}
                                name="enrollNumber"
                            />
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                className="custom-input-height"
                                value={formData.name || ''}
                                onChange={handleChange}
                                name="name"
                            />
                        </Form.Group>
                        <Form.Group controlId="formShortName">
                            <Form.Label>Nome Resumido</Form.Label>
                            <Form.Control
                                type="text"
                                className="custom-input-height"
                                value={formData.shortName || ''}
                                onChange={handleChange}
                                name="shortName"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formNameAcronym">
                            <Form.Label>Acrônimo do Nome</Form.Label>
                            <Form.Control
                                type="text"
                                className="custom-input-height"
                                value={formData.nameAcronym || ''}
                                onChange={handleChange}
                                name="nameAcronym"
                            />
                        </Form.Group>
                        <Form.Group controlId="formComments">
                            <Form.Label>Comentários</Form.Label>
                            <Form.Control
                                type="text"
                                className="custom-input-height"
                                value={formData.comments || ''}
                                onChange={handleChange}
                                name="comments"
                            />
                        </Form.Group>
                        <Form.Group controlId="formType">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                                type="text"
                                className="custom-input-height"
                                value={formData.type || ''}
                                onChange={handleChange}
                                name="type"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formStatus" className="d-flex align-items-center mb-3">
                            <Form.Label className="mb-0 me-2 flex-shrink-0" style={{ lineHeight: '32px' }}>Status:</Form.Label>
                            <Form.Check
                                type="switch"
                                id="custom-switch-status"
                                checked={formData.status === true}
                                onChange={(e) => setFormData({ ...formData, status: e.target.checked ? true : false })}
                                className="ms-auto"
                                label=""
                                name="status"
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatusEmail" className="d-flex align-items-center mb-3">
                            <Form.Label className="mb-0 me-2 flex-shrink-0" style={{ lineHeight: '32px' }}>Status de E-Mail:</Form.Label>
                            <Form.Check
                                type="switch"
                                id="custom-switch-status-email"
                                checked={formData.statusEmail === true}
                                onChange={(e) => setFormData({ ...formData, statusEmail: e.target.checked ? true : false })}
                                className="ms-auto"
                                label=""
                                name="statusEmail"
                            />
                        </Form.Group>
                        <Form.Group controlId="formRgptAut" className="d-flex align-items-center mb-3">
                            <Form.Label className="mb-0 me-2 flex-shrink-0" style={{ lineHeight: '32px' }}>Autorização RGPD:</Form.Label>
                            <Form.Check
                                type="switch"
                                id="custom-switch-rgpt-aut"
                                checked={formData.rgpdAut === true}
                                onChange={(e) => setFormData({ ...formData, rgpdAut: e.target.checked ? true : false })}
                                className="ms-auto"
                                label=""
                                name="rgpdAut"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Tab.Container defaultActiveKey="dadosPessoais">
                    <Nav variant="tabs" className="mt-3">
                        <Nav.Item>
                            <Nav.Link eventKey="dadosPessoais">Dados Pessoais</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="dadosProfissionais">Dados Profissionais</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="dadosPessoais">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                <Row>
                                    {[
                                        { key: 'nif', label: 'NIF', type: 'number' },
                                        { key: 'address', label: 'Morada', type: 'text' },
                                        { key: 'zipcode', label: 'Código Postal', type: 'text' },
                                        { key: 'locality', label: 'Localidade', type: 'text' },
                                        { key: 'village', label: 'Freguesia', type: 'text' },
                                        { key: 'district', label: 'Distrito', type: 'text' },
                                        { key: 'phone', label: 'Telefone', type: 'number' },
                                        { key: 'mobile', label: 'Telemóvel', type: 'number' },
                                        { key: 'email', label: 'E-Mail', type: 'email' },
                                        { key: 'birthday', label: 'Data de Nascimento', type: 'date' },
                                        { key: 'nacionality', label: 'Nacionalidade', type: 'text' },
                                        { key: 'gender', label: 'Gênero', type: 'text' }
                                    ].map((field) => (
                                        <Col md={3}>
                                            <Form.Group controlId={`form${field.key}`}>
                                                <Form.Label>{field.label}</Form.Label>
                                                <Form.Control
                                                    type={field.type}
                                                    className="custom-input-height"
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
                        <Tab.Pane eventKey="dadosProfissionais">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                <Row>
                                    {[
                                        { key: 'biNumber', label: 'Número de BI', type: 'text' },
                                        { key: 'biIssuance', label: 'Emissão de BI', type: 'date' },
                                        { key: 'biValidity', label: 'Validade de BI', type: 'date' },
                                        { key: 'admissionDate', label: 'Data de Admissão', type: 'date' },
                                        { key: 'exitDate', label: 'Data de Saída', type: 'date' },
                                        { key: 'departmentId', label: 'Departamento', type: 'dropdown' },
                                        { key: 'professionId', label: 'Profissão', type: 'dropdown' },
                                        { key: 'groupId', label: 'Grupo', type: 'dropdown' },
                                        { key: 'zoneId', label: 'Zona', type: 'dropdown' },
                                        { key: 'externalEntityId', label: 'Entidade Externa', type: 'dropdown' }
                                    ].map((field) => (
                                        <Col md={3}>
                                            <Form.Group controlId={`form${field.key}`}>
                                                <Form.Label>{field.label}</Form.Label>
                                                {field.type === 'dropdown' ? (
                                                    <Form.Control
                                                        as="select"
                                                        className="custom-input-height custom-select-font-size"
                                                        value={formData[field.key] || ''}
                                                        onChange={handleChange}
                                                        name={field.key}
                                                    >
                                                        <option value="">Selecione...</option>
                                                        {dropdownData[field.key]?.map(option => (
                                                            <option key={option.value} value={option.value}>{option.name}</option>
                                                        ))}
                                                    </Form.Control>
                                                ) : (
                                                    <Form.Control
                                                        type={field.type}
                                                        className="custom-input-height"
                                                        value={formData[field.key] || ''}
                                                        onChange={handleChange}
                                                        name={field.key}
                                                    />
                                                )}
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
                <Button variant="primary" onClick={handleSave}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};