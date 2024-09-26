import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Col, Form, Nav, OverlayTrigger, Row, Tab, Tooltip } from 'react-bootstrap';
import '../css/PagesStyles.css';
import { toast } from 'react-toastify';

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
    onUpdate: (entity: T) => Promise<void>;
    entity: T;
    fields: FieldConfig[];
}

export const UpdateModalRegisterUsers = <T extends Entity>({ title, open, onClose, onUpdate, entity, fields }: Props<T>) => {
    const [formData, setFormData] = useState<T>({ ...entity });
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Atualiza o formData com os dados da entity
    useEffect(() => {
        if (entity) {
            setFormData({ ...entity });
        }
    }, [entity]);

    // Usa useEffect para validar o formulário
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

    // Função para lidar com a mudança de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? Number(value) : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };

    // Função para lidar com o clique em guardar
    const handleSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        onUpdate(formData as T);
    };

    // Define as seleções de tipo de conta
    const RoleTypes = [
        { value: 'Admin', label: 'Administrador' },
        { value: 'User', label: 'Utilizador' }
    ];

    return (
        <Modal show={open} onHide={onClose} dialogClassName="modal-scrollable">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Tab.Container defaultActiveKey="utilizador">
                        <Nav variant="tabs" className="nav-modal">
                            <Nav.Item>
                                <Nav.Link eventKey="utilizador">Dados do Utilizador</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="email">Dados de E-Mail</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="utilizador">
                                <Form style={{ marginTop: 20, marginBottom: 20 }}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="formName">
                                                <Form.Label>Nome <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
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
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formUserName">
                                                <Form.Label>Nome de Usuário <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
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
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formEmailAddress">
                                                <Form.Label>E-Mail <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
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
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formRoles">
                                                <Form.Label>Tipo de Conta <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
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
                                                        value={formData.password || ''}
                                                        onChange={handleChange}
                                                    />
                                                </OverlayTrigger>
                                                {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formConfirmPassword">
                                                <Form.Label>Confirmar Senha <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
                                                >
                                                    <Form.Control
                                                        className="custom-input-height custom-select-font-size"
                                                        type="text"
                                                        name="confirmPassword"
                                                        value={formData.confirmPassword || ''}
                                                        onChange={handleChange}
                                                    />
                                                </OverlayTrigger>
                                                {errors.confirmPassword && <Form.Text className="text-danger">{errors.confirmPassword}</Form.Text>}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Tab.Pane>
                            <Tab.Pane eventKey="email">
                                <Form style={{ marginTop: 20, marginBottom: 20 }}></Form>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="formEnableSSL" className='d-flex justify-content-between'>
                                            <Form.Label>Activar SSL:</Form.Label>
                                            <Form.Check
                                                type="switch"
                                                name="enableSSL"
                                                checked={formData.enableSSL}
                                                onChange={handleChange}
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
                                                    value={formData.usernameEmail || ''}
                                                    onChange={handleChange}
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
                                                    value={formData.passwordEmail || ''}
                                                    onChange={handleChange}
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
                                                    type="text"
                                                    name="hostSMTP"
                                                    value={formData.hostSMTP || ''}
                                                    onChange={handleChange}
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
                                                type="text"
                                                name="portSMTP"
                                                value={formData.portSMTP || ''}
                                                onChange={handleChange}
                                            />
                                            </OverlayTrigger>
                                            {errors.portSMTP && <Form.Text className="text-danger">{errors.portSMTP}</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>Fechar</Button>
                <Button variant="outline-primary" onClick={handleSaveClick} disabled={!isFormValid}>Guardar</Button>
            </Modal.Footer>
        </Modal >
    );
};