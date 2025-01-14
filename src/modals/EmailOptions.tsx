import { useEffect, useState } from 'react';
import { Col, Form, InputGroup, Nav, OverlayTrigger, Row, Tab, Tooltip } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/PagesStyles.css';
import { toast } from 'react-toastify';
import hidepass from '../assets/img/login/hidepass.png';
import showpass from '../assets/img/login/showpass.png';

import { EmailUser } from '../types/Types';
import { TestEmailModal } from './TestEmailModal';
import { useNavbar } from '../context/NavbarContext';

// Define a interface para os itens de erro
interface ErrorDetails {
    hasError: boolean;
    message: string;
}

// Define a interface para os itens de erro
interface ErrorRecord {
    [key: string]: ErrorDetails;
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
interface Props<T> {
    open: boolean;
    onClose: () => void;
    onSave: (emailFormData: T) => Promise<void>;
    onUpdate: (emailFormData: T) => Promise<void>;
    entity: T;
    fields: FieldConfig[];
    title: string;
}

export const EmailOptionsModal = <T extends Record<string, any>>({ title, open, onClose, onSave, onUpdate, entity, fields }: Props<T>) => {
    const { testEmail } = useNavbar();
    const [emailFormData, setEmailFormData] = useState<T>({ ...entity });
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<ErrorRecord>({});
    const [showValidationErrors, setShowValidationErrors] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showTestEmailModal, setShowTestEmailModal] = useState(false);

    // Função para enviar um email de teste
    const sendTestEmail = async (email: string) => {
        await testEmail(email);
    }

    // Atualiza o formData com os dados da entity
    useEffect(() => {
        if (entity) {
            const emailData: Partial<EmailUser> = {
                enableSSL: entity.enableSSL,
                hostSMTP: entity.hostSMTP,
                passwordEmail: entity.passwordEmail,
                portSMTP: entity.portSMTP,
                usernameEmail: entity.usernameEmail
            };

            setEmailFormData(emailData as T);
        }
    }, [entity]);

    // Limpa os dados do formulário quando o modal é fechado
    useEffect(() => {
        if (!open) {
            setEmailFormData({} as T);
        }
    }, [open]);

    // Usa useEffect para validar o formulário
    useEffect(() => {
        const newErrors: ErrorRecord = {};
        let isValid = true;

        fields.forEach(field => {
            const fieldValue = emailFormData[field.key];
            if (field.required && (fieldValue === null || fieldValue === '')) {
                isValid = false;
            }

            if (field.type === 'number' && fieldValue != null && fieldValue < 0) {
                isValid = false;
            }

        });

        setErrors(newErrors);
        setIsFormValid(isValid);
        validateForm();
    }, [emailFormData, fields]);

    // Função para validar o formulário
    const validateForm = () => {
        if (!showValidationErrors) return true;
        let newErrors: ErrorRecord = {};
        let isValid = true;

        fields.forEach((field) => {
            const fieldValue = emailFormData[field.key];
            if (field.required && !fieldValue) {
                isValid = false;
            } else if (field.validate && !field.validate(fieldValue)) {
                isValid = false;
            }
        });

        if (emailFormData.usernameEmail && !validateEmail(emailFormData.usernameEmail as string)) {
            isValid = false;
            newErrors['usernameEmail'] = { hasError: true, message: 'O email é inválido.' };
        }

        setErrors(newErrors);
        setIsFormValid(isValid);
        return isValid;
    };

    // Chame validateForm apropriadamente em useEffect
    useEffect(() => {
        validateForm();
    }, [emailFormData, fields]);

    // Função para validar o email
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Função para lidar com a mudança de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, dataset } = target;
        let parsedValue: string | number | boolean | string[];

        if (showValidationErrors) {
            setShowValidationErrors(false);
        }

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

    // Alterna a visibilidade da password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Função para lidar com o clique em adicionar ou atualizar
    const handleAddOrUpdate = () => {
        if (entity.usernameEmail !== '' && entity.passwordEmail !== '' && entity.hostSMTP !== '' && entity.portSMTP !== '') {
            handleUpdateClick();
        } else {
            handleSaveClick();
        }
    }

    // Função para lidar com o clique em guardar
    const handleSaveClick = () => {
        if (!isFormValid) {
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar.');
            return;
        }
        onSave(emailFormData as T);
    };

    // Função para lidar com o clique em atualizar
    const handleUpdateClick = () => {
        if (!isFormValid) {
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar.');
            return;
        }
        onUpdate(emailFormData as T);
    }

    return (
        <Modal show={open} onHide={onClose} backdrop="static" dialogClassName="modal-scrollable" size='lg' style={{ marginTop: 100 }}>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
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
                                                    overlay={<Tooltip id="tooltip-usernameEmail">Campo obrigatório</Tooltip>}
                                                >
                                                    <Form.Control
                                                        className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                                        type="text"
                                                        name="usernameEmail"
                                                        value={emailFormData.usernameEmail || ''}
                                                        onChange={handleChange}
                                                        data-form-type="email"
                                                    />
                                                </OverlayTrigger>
                                                {errors['usernameEmail'] && errors['usernameEmail'].hasError && <Form.Text className="text-danger">{errors['usernameEmail'].message}</Form.Text>}
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formPasswordEmail">
                                                <Form.Label>Password do E-Mail <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-passwordEmail">Campo obrigatório</Tooltip>}
                                                >
                                                    <InputGroup>
                                                        <Form.Control
                                                            type={showPassword ? "text" : "password"}
                                                            name="passwordEmail"
                                                            value={emailFormData.passwordEmail || ''}
                                                            onChange={handleChange}
                                                            data-form-type="email"
                                                            className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                                            style={{ paddingRight: '40px', borderRight: 'none' }}
                                                        />
                                                        <InputGroup.Text
                                                            onClick={togglePasswordVisibility}
                                                            style={{
                                                                cursor: 'pointer',
                                                                background: 'transparent',
                                                                borderLeft: 'none',
                                                                height: '30px',
                                                            }}
                                                        >
                                                            <img
                                                                src={showPassword ? showpass : hidepass}
                                                                alt={showPassword ? "Mostrar password" : "Esconder password"}
                                                                style={{ width: 20, height: 20 }}
                                                            />
                                                        </InputGroup.Text>
                                                    </InputGroup>
                                                </OverlayTrigger>
                                                {errors['passwordEmail'] && errors['passwordEmail'].hasError && <Form.Text className="text-danger">{errors['passwordEmail'].message}</Form.Text>}
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formHostSMTP">
                                                <Form.Label>Servidor SMTP <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-hostSMTP">Campo obrigatório</Tooltip>}
                                                >
                                                    <Form.Control
                                                        className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                                        type="email"
                                                        name="hostSMTP"
                                                        value={emailFormData.hostSMTP || ''}
                                                        onChange={handleChange}
                                                        data-form-type="email"
                                                    />
                                                </OverlayTrigger>
                                                {errors['hostSMTP'] && errors['hostSMTP'].hasError && <Form.Text className="text-danger">{errors['hostSMTP'].message}</Form.Text>}
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formPortSMTP">
                                                <Form.Label>Porta SMTP <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-portSMTP">Campo obrigatório</Tooltip>}
                                                >
                                                    <Form.Control
                                                        className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                                        type='text'
                                                        name="portSMTP"
                                                        value={emailFormData.portSMTP || ''}
                                                        onChange={handleChange}
                                                        data-form-type="email"
                                                    >
                                                    </Form.Control>
                                                </OverlayTrigger>
                                                {errors['portSMTP'] && errors['portSMTP'].hasError && <Form.Text className="text-danger">{errors['portSMTP'].message}</Form.Text>}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button variant="outline-info" onClick={() => setShowTestEmailModal(true)}>Teste E-Mail</Button>
                <Button variant="outline-secondary" onClick={onClose}>Fechar</Button>
                <Button variant="outline-primary" onClick={handleAddOrUpdate}>Guardar</Button>
            </Modal.Footer>
            <TestEmailModal
                open={showTestEmailModal}
                onClose={() => setShowTestEmailModal(false)}
                onSave={sendTestEmail}
                title="Teste de E-Mail"
            />
        </Modal >
    );
};