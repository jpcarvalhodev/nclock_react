import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Col, Form, Nav, OverlayTrigger, Row, Tab, Table, Tooltip } from 'react-bootstrap';
import '../css/PagesStyles.css';
import { toast } from 'react-toastify';
import { EmailUserCompany } from '../helpers/Types';
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

// Define a interface para as propriedades do componente
interface Props<T extends EmailUserCompany> {
    open: boolean;
    onClose: () => void;
    onSave: (emailConfig: T, companyConfig: T) => Promise<void>;
    onUpdate: (emailConfig: T, companyConfig: T) => Promise<void>;
    entity: EmailUserCompany;
    fields: FieldConfig[];
    title: string;
}

export const EmailOptionsModal = <T extends EmailUserCompany>({ title, open, onClose, onSave, onUpdate, entity, fields }: Props<T>) => {
    const [emailFormData, setEmailFormData] = useState<Partial<EmailUserCompany>>({ ...entity });
    const [companyFormData, setCompanyFormData] = useState<Partial<EmailUserCompany>>({ ...entity });
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [emailConfig, setEmailConfig] = useState<EmailUserCompany[]>([]);
    const [companyConfig, setCompanyConfig] = useState<EmailUserCompany[]>([]);

    // Atualiza o formData com os dados da entity
    useEffect(() => {
        if (entity) {
            setEmailFormData({ ...entity });
            setCompanyFormData({ ...entity });
        }
    }, [entity]);

    // Limpa os dados do formulário quando o modal é fechado
    useEffect(() => {
        if (!open)
            setEmailFormData({});
            setCompanyFormData({});
    }, [open]);

    // Busca os dados iniciais de emails dos utilizadores
    useEffect(() => {
        fetchUserData();
        fetchCompanyConfig();
    }, []);

    // Usa useEffect para validar o formulário
    useEffect(() => {
        const newErrors: Record<string, string> = {};
        let isValidEmail = true;
        let isValidCompany = true;

        fields.forEach(field => {
            const fieldValue = emailFormData[field.key];
            if (field.type === 'number' && fieldValue != null && fieldValue < 0) {
                isValidEmail = false;
                newErrors[field.key] = `${field.label} não pode ser negativo.`;
            }
            if (field.required && (fieldValue === undefined || fieldValue === '')) {
                isValidEmail = false;
            }
        });

        fields.forEach(field => {
            const fieldValue = companyFormData[field.key];
            if (field.type === 'number' && fieldValue != null && fieldValue < 0) {
                isValidCompany = false;
                newErrors[field.key] = `${field.label} não pode ser negativo.`;
            }
            if (field.required && (fieldValue === undefined || fieldValue === '')) {
                isValidCompany = false;
            }
        });

        setIsFormValid(isValidEmail && isValidCompany);
        setErrors(newErrors);
    }, [emailFormData, companyFormData, fields]);

    // Função para buscar os dados de emails dos utilizadores
    const fetchUserData = async () => {
        try {
            const data = await apiService.fetchAllEmailConfig();
            const normalizedData = Array.isArray(data) ? data : [data];
            setEmailConfig(normalizedData);
        } catch (error) {
            console.error('Erro ao carregar os emails registados:', error);
        }
    }

    // Função para buscar as configurações da empresa
    const fetchCompanyConfig = async () => {
        try {
            const data = await apiService.fetchAllCompanyConfig();
            const normalizedData = Array.isArray(data) ? data : [data];
            setCompanyConfig(normalizedData);
        } catch (error) {
            console.error('Erro ao carregar as configurações da empresa:', error);
        }
    }

    // Função para lidar com o clique em um email na tabela
    const handleEmailClick = (emailUser: EmailUserCompany) => {
        setEmailFormData(emailUser as Partial<T>);
    };

    const handleCompanyClick = (emailCompany: EmailUserCompany) => {
        setCompanyFormData(emailCompany as Partial<T>);
    }

    // Função para lidar com a mudança de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, dataset } = target;
        let parsedValue: string | number | boolean;

        if (type === 'checkbox') {
            parsedValue = target.checked;
        } else if (type === 'number') {
            parsedValue = Number(value);
        } else {
            parsedValue = value;
        }

        const formType = dataset.formType as 'email' | 'company';
        if (formType === 'email') {
            setEmailFormData(prevState => ({
                ...prevState,
                [name]: parsedValue
            }));
        } else if (formType === 'company') {
            setCompanyFormData(prevState => ({
                ...prevState,
                [name]: parsedValue
            }));
        }
    };

    // Função para lidar com o clique em guardar
    const handleSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        onSave(emailFormData as T, companyFormData as T);
        onClose();
    };

    // Função para lidar com o clique em atualizar
    const handleUpdateClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        onUpdate(emailFormData as T, companyFormData as T);
        onClose();
    }

    const typeOptions = [
        { value: 'pt', label: 'Português' },
        { value: 'en', label: 'Inglês' },
    ];

    return (
        <Modal show={open} onHide={onClose} dialogClassName="modal-scrollable" size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Tab.Container defaultActiveKey="configEmail">
                        <Nav variant="tabs" className="nav-modal">
                            <Nav.Item>
                                <Nav.Link eventKey="configEmail">Configuração E-Mails</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="configEmail">
                                <Form style={{ marginTop: 10, marginBottom: 10, display: 'flex' }}>
                                    <Row style={{ flex: 1, marginRight: 10 }}>
                                        <Col md={12}>
                                            <div style={{ overflowX: 'auto', overflowY: 'auto' }}>
                                                <Table striped bordered hover size="sm">
                                                    <thead>
                                                        <tr>
                                                            <th>SMTP E-Mails</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {emailConfig && emailConfig.map((email: EmailUserCompany) => (
                                                            <tr key={email.usernameEmail} onClick={() => handleEmailClick(email)}>
                                                                <td>{email.usernameEmail}</td>
                                                                <td>{email.hostSMTP}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row style={{ flex: 1.5 }}>
                                        <Col md={6}>
                                            <Form.Group controlId="formEnableSSL" className='d-flex justify-content-between mt-3'>
                                                <Form.Label>Activar SSL:</Form.Label>
                                                <Form.Check
                                                    type="switch"
                                                    name="enableSSL"
                                                    checked={!!emailFormData.enableSSL}
                                                    onChange={handleChange}
                                                    data-form-type="email"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formUsernameEmail">
                                                <Form.Label>E-Mail do Utilizador <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
                                                >
                                                    <Form.Control
                                                        className="custom-input-height custom-select-font-size"
                                                        type="text"
                                                        name="usernameEmail"
                                                        value={emailFormData.usernameEmail || ''}
                                                        onChange={handleChange}
                                                        data-form-type="email"
                                                    />
                                                </OverlayTrigger>
                                                {errors.usernameEmail && <Form.Text className="text-danger">{errors.usernameEmail}</Form.Text>}
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formPasswordEmail">
                                                <Form.Label>Senha do E-Mail <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
                                                >
                                                    <Form.Control
                                                        className="custom-input-height custom-select-font-size"
                                                        type="text"
                                                        name="passwordEmail"
                                                        value={emailFormData.passwordEmail || ''}
                                                        onChange={handleChange}
                                                        data-form-type="email"
                                                    />
                                                </OverlayTrigger>
                                                {errors.passwordEmail && <Form.Text className="text-danger">{errors.passwordEmail}</Form.Text>}
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formHostSMTP">
                                                <Form.Label>Servidor SMTP <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
                                                >
                                                    <Form.Control
                                                        className="custom-input-height custom-select-font-size"
                                                        type="email"
                                                        name="hostSMTP"
                                                        value={emailFormData.hostSMTP || ''}
                                                        onChange={handleChange}
                                                        data-form-type="email"
                                                    />
                                                </OverlayTrigger>
                                                {errors.hostSMTP && <Form.Text className="text-danger">{errors.hostSMTP}</Form.Text>}
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formPortSMTP">
                                                <Form.Label>Porta SMTP <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
                                                >
                                                    <Form.Control
                                                        className="custom-input-height custom-select-font-size"
                                                        type='text'
                                                        name="portSMTP"
                                                        value={emailFormData.portSMTP || ''}
                                                        onChange={handleChange}
                                                        data-form-type="email"
                                                    >
                                                    </Form.Control>
                                                </OverlayTrigger>
                                                {errors.portSMTP && <Form.Text className="text-danger">{errors.portSMTP}</Form.Text>}
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formPassword">
                                                <Form.Label>Senha <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
                                                >
                                                    <Form.Control
                                                        className="custom-input-height custom-select-font-size"
                                                        type="text"
                                                        name="password"
                                                        value={emailFormData.password || ''}
                                                        onChange={handleChange}
                                                        data-form-type="email"
                                                    />
                                                </OverlayTrigger>
                                                {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>Fechar</Button>
                <Button variant="outline-info" onClick={handleSaveClick} disabled={!isFormValid}>Guardar</Button>
                <Button variant="outline-primary" onClick={handleUpdateClick} disabled={!isFormValid}>Atualizar</Button>
            </Modal.Footer>
        </Modal >
    );
};