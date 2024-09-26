import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Col, Form, Nav, OverlayTrigger, Row, Tab, Table, Tooltip } from 'react-bootstrap';
import '../css/PagesStyles.css';
import { toast } from 'react-toastify';
import { EmailUser } from '../helpers/Types';
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
interface Props<T extends EmailUser> {
    open: boolean;
    onClose: () => void;
    onUpdate: (entity: T) => Promise<void>;
    entity: T;
    fields: FieldConfig[];
    title: string;
}

export const EmailOptionsModal = <T extends EmailUser>({ title, open, onClose, onUpdate, entity, fields }: Props<T>) => {
    const [formData, setFormData] = useState<Partial<T>>({ ...entity });
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [emailConfig, setEmailConfig] = useState<EmailUser[]>([]);

    // Atualiza o formData com os dados da entity
    useEffect(() => {
        if (entity) {
            setFormData({ ...entity });
        }
    }, [entity]);

    // Busca os dados iniciais de emails dos utilizadores
    useEffect(() => {
        fetchUserData();
    }, []);

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

    // Função para buscar os dados de emails dos utilizadores
    const fetchUserData = async () => {
        try {
            const data = await apiService.fetchAllEmailConfig();
            if (Array.isArray(data)) {
                setEmailConfig(data);
            } else {
                setEmailConfig([]);
            }
        } catch (error) {
            console.error('Erro ao carregar os emails registados:', error);
        }
    }

    // Função para lidar com o clique em um email na tabela
    const handleEmailClick = (emailUser: EmailUser) => {
        setFormData(emailUser as Partial<T>);
    };

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
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose} dialogClassName="modal-scrollable" size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid d-flex">
                    <Row style={{ flex: 1, marginRight: 10 }}>
                        <Col md={12}>
                            <h5>Utilizadores</h5>
                            <div style={{ overflowX: 'auto', overflowY: 'auto' }}>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>E-Mail do Utilizador</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {emailConfig && emailConfig.map((email: EmailUser) => (
                                            <tr key={email.usernameEmail} onClick={() => handleEmailClick(email)}>
                                                <td>{email.hostSMTP}</td>
                                                <td>{email.portSMTP}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ flex: 1.5 }}>
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
                                        type="email"
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
                                        type='text'
                                        name="portSMTP"
                                        value={formData.portSMTP || ''}
                                        onChange={handleChange}
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
                                        value={formData.password || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>Fechar</Button>
                <Button variant="outline-primary" onClick={handleSaveClick} disabled={!isFormValid}>Guardar</Button>
            </Modal.Footer>
        </Modal >
    );
};