import React, { useState, useEffect, ChangeEvent } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/PagesStyles.css';
import { fetchWithAuth } from '../components/FetchWithAuth';
import { Tab, Row, Col, Nav, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import modalAvatar from '../assets/img/modalAvatar.png';
import { toast } from 'react-toastify';
import { Employee } from '../helpers/Types';

interface FieldConfig {
    label: string;
    key: string;
    type: string;
    required?: boolean;
    optionsUrl?: string;
}

interface Props<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    fields: FieldConfig[];
    initialValues: Partial<T>;
}

export const CreateModalEmployees = <T extends Record<string, any>>({ title, open, onClose, onSave, fields, initialValues }: Props<T>) => {
    const [formData, setFormData] = useState<Partial<T>>(initialValues);
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
    const fileInputRef = React.createRef<HTMLInputElement>();
    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = () => {
        const isValid = fields.every(field => {
            if (field.required) {
                const fieldValue = formData?.[field.key];
                return fieldValue !== null && fieldValue !== undefined && typeof fieldValue === 'string' && fieldValue.trim() !== '';
            }
            return true;
        });
        setIsFormValid(isValid);
    };

    const fetchEmployeesAndSetNextEnrollNumber = async () => {
        const response = await fetchWithAuth('https://localhost:7129/api/Employees/GetAllEmployees');
        if (response.ok) {
            const employees: Employee[] = await response.json();
            const maxEnrollNumber = employees.reduce((max: number, employee: Employee) => Math.max(max, (employee.enrollNumber)), 0);
            setFormData(prevState => ({
                ...prevState,
                enrollNumber: maxEnrollNumber + 1
            }));
        } else {
            toast.error('Erro ao buscar o número de matrícula dos funcionários.');
        }
    };

    useEffect(() => {
        validateForm();
    }, [formData, fields]);

    useEffect(() => {
        if (open) {
            fetchEmployeesAndSetNextEnrollNumber();
        }
    }, [open]);

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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'name') {
            const names = value.split(' ');
            let shortName = '';
            if (names.length > 1) {
                shortName = `${names[0]} ${names[names.length - 1]}`;
            } else if (names.length === 1) {
                shortName = names[0];
            }
            setFormData(prevState => ({
                ...prevState,
                shortName: shortName
            }));
        }
    };

    const handleSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de salvar.');
            return;
        }
        handleSave();
    };

    const handleSave = () => {
        onSave(formData as T);
    };

    const typeOptions = [
        { value: 'Funcionário', label: 'Funcionário' },
        { value: 'Funcionário Externo', label: 'Funcionário Externo' },
        { value: 'Utente', label: 'Utente' },
        { value: 'Visitante', label: 'Visitante' },
        { value: 'Contacto', label: 'Contacto' },
        { value: 'Provisório', label: 'Provisório' }
    ];

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
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formEnrollNumber">
                            <Form.Label>
                                Número de Matrícula <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-enrollNumber">Campo obrigatório</Tooltip>}
                            >
                                <Form.Control
                                    type="number"
                                    className="custom-input-height"
                                    value={formData.enrollNumber || ''}
                                    onChange={handleChange}
                                    name="enrollNumber"
                                    required
                                />
                            </OverlayTrigger>
                        </Form.Group>
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
                                    className="custom-input-height"
                                    value={formData.name || ''}
                                    onChange={handleChange}
                                    name="name"
                                    required
                                />
                            </OverlayTrigger>
                        </Form.Group>
                        <Form.Group controlId="formShortName">
                            <Form.Label>
                                Nome Resumido <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
                            >
                                <Form.Control
                                    type="text"
                                    className="custom-input-height"
                                    value={formData.shortName || ''}
                                    onChange={handleChange}
                                    name="shortName"
                                    required
                                />
                            </OverlayTrigger>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formNameAcronym">
                            <Form.Label>
                                Acrônimo do Nome <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-nameAcronym">Campo obrigatório</Tooltip>}
                            >
                                <Form.Control
                                    type="text"
                                    className="custom-input-height"
                                    value={formData.nameAcronym || ''}
                                    onChange={handleChange}
                                    name="nameAcronym"
                                    required
                                />
                            </OverlayTrigger>
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
                    <Nav variant="tabs" className="nav-modal">
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
                <Button variant="primary" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};