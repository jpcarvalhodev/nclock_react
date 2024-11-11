import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Col, Form, Nav, OverlayTrigger, Row, Tab, Tooltip } from 'react-bootstrap';
import '../css/PagesStyles.css';
import { toast } from 'react-toastify';
import { EmailUser } from '../helpers/Types';

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
interface Props<T> {
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => Promise<void>;
    onUpdate: (data: T) => Promise<void>;
    entity: T;
    fields: FieldConfig[];
    title: string;
}

export const EmailOptionsModal = <T extends Record<string, any>>({ title, open, onClose, onSave, onUpdate, entity, fields }: Props<T>) => {
    const [emailFormData, setEmailFormData] = useState<Partial<EmailUser>>({ ...entity });
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Atualiza o formData com os dados da entity
    useEffect(() => {
        if (entity) {
            setEmailFormData({ ...entity });
        }
    }, [entity]);

    // Limpa os dados do formulário quando o modal é fechado
    useEffect(() => {
        if (!open)
            setEmailFormData({});
    }, [open]);

    // Usa useEffect para validar o formulário
    useEffect(() => {
        const newErrors: Record<string, string> = {};

        const isValid = fields.every(field => {
            const fieldValue = emailFormData[field.key];
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
    }, [emailFormData, fields]);

    // Função para validar o formulário
    const validateForm = () => {
        const isValid = fields.every(field => {
            const fieldValue = emailFormData?.[field.key];
            if (field.required) {
                if (typeof fieldValue === 'string') {
                    return fieldValue.trim() !== '';
                }
                return fieldValue !== null && fieldValue !== undefined;
            }
            return true;
        });

        setIsFormValid(isValid);
    };

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

        const formType = dataset.formType as 'email';
        if (formType === 'email') {
            setEmailFormData(prevState => ({
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
        onSave(emailFormData as T);
        onClose();
    };

    // Função para lidar com o clique em atualizar
    const handleUpdateClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        onUpdate(emailFormData as T);
        onClose();
    }

    return (
        <Modal show={open} onHide={onClose} backdrop="static" dialogClassName="modal-scrollable" size='lg'>
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
                                                <Form.Label>Password do E-Mail <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
                                                >
                                                    <Form.Control
                                                        className="custom-input-height custom-select-font-size"
                                                        type="password"
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
                                    </Row>
                                </Form>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>Fechar</Button>
                <Button variant="outline-info" onClick={handleUpdateClick}>Atualizar</Button>
                <Button variant="outline-primary" onClick={handleSaveClick}>Guardar</Button>
                
            </Modal.Footer>
        </Modal >
    );
};