import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Col, Form, Nav, OverlayTrigger, Row, Tab, Tooltip } from 'react-bootstrap';
import '../css/PagesStyles.css';
import { toast } from 'react-toastify';
import { KioskConfig } from '../helpers/Types';

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
    onSave: (kioskFormData: T) => Promise<void>;
    onUpdate: (kioskFormData: T) => Promise<void>;
    entity: T;
    fields: FieldConfig[];
    title: string;
}

export const KioskOptionsModal = <T extends Record<string, any>>({ title, open, onClose, onSave, onUpdate, entity, fields }: Props<T>) => {
    const [kioskFormData, setKioskFormData] = useState<T>({ ...entity });
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Atualiza o formData com os dados da entity
    useEffect(() => {
        if (entity) {
            const kioskData: Partial<KioskConfig> = {
                amount: entity.amount,
                totalMoedas: entity.totalMoedas,
                emails: Array.isArray(entity.emails) ? entity.emails : entity.emails ? entity.emails.split(', ') : []
            };

            setKioskFormData(kioskData as T);
        }
    }, [entity]);

    // Limpa os dados do formulário quando o modal é fechado
    useEffect(() => {
        if (!open) {
            setKioskFormData({} as T);
        }
    }, [open]);

    // Função para validar o formulário e gerenciar os erros
    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        fields.forEach(field => {
            const fieldValue = kioskFormData[field.key];
            if (field.required && (fieldValue === undefined || fieldValue === null || (field.type === 'number' && fieldValue !== 0 && !fieldValue))) {
                isValid = false;
            } else if (field.required && typeof fieldValue === 'string' && fieldValue.trim() === '') {
                isValid = false;
            } else if (field.type === 'number' && fieldValue !== null && isNaN(fieldValue)) {
                isValid = false;
            } else if (field.validate && !field.validate(fieldValue)) {
                isValid = false;
            }
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
    };

    // Chame validateForm apropriadamente em useEffect
    useEffect(() => {
        validateForm();
    }, [kioskFormData, fields]);

    // Função para lidar com a mudança de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        let parsedValue: string | number | boolean | string[];

        if (type === 'checkbox') {
            parsedValue = (e.target as HTMLInputElement).checked;
        } else if (type === 'number') {
            parsedValue = value === '' ? '' : Number(value);
        } else if (name === 'emails' && type === 'textarea') {
            parsedValue = value.split(',').map(email => email.trim());
        } else {
            parsedValue = value;
        }

        setKioskFormData(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    }

    // Função para lidar com o clique em adicionar ou atualizar
    const handleAddOrUpdate = () => {
        if (entity.amount !== 0 && entity.totalMoedas !== 0 && entity.emails.length !== 0) {
            handleUpdateClick();
        } else {
            handleSaveClick();
        }
    }

    // Função para lidar com o clique em guardar
    const handleSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        onSave(kioskFormData as T);
        onClose();
    };

    // Função para lidar com o clique em atualizar
    const handleUpdateClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        onUpdate(kioskFormData as T);
        onClose();
    }

    return (
        <Modal show={open} onHide={onClose} backdrop="static" dialogClassName="modal-scrollable" size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Tab.Container defaultActiveKey="configKiosk">
                        <Nav variant="tabs" className="nav-modal">
                            <Nav.Item>
                                <Nav.Link eventKey="configKiosk">Configuração Quiosque</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="configKiosk">
                                <Form style={{ marginTop: 10, marginBottom: 10, display: 'flex' }}>
                                    <Row style={{ flex: 1.5 }}>
                                        <Col md={6}>
                                            <Form.Group controlId="formAmount">
                                                <Form.Label>Valor <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-amount">Campo obrigatório</Tooltip>}
                                                >
                                                    <Form.Control
                                                        className="custom-input-height custom-select-font-size"
                                                        type="number"
                                                        name="amount"
                                                        value={kioskFormData.amount || 0}
                                                        onChange={handleChange}
                                                    />
                                                </OverlayTrigger>
                                                {errors.amount && <Form.Text className="text-danger">{errors.amount}</Form.Text>}
                                            </Form.Group>
                                            <Form.Group controlId="formTotalMoedas">
                                                <Form.Label>Total Moedas <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-totalMoedas">Campo obrigatório</Tooltip>}
                                                >
                                                    <Form.Control
                                                        className="custom-input-height custom-select-font-size"
                                                        type="number"
                                                        name="totalMoedas"
                                                        value={kioskFormData.totalMoedas || ''}
                                                        onChange={handleChange}
                                                    />
                                                </OverlayTrigger>
                                                {errors.totalMoedas && <Form.Text className="text-danger">{errors.totalMoedas}</Form.Text>}
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formEmails">
                                                <Form.Label>E-Mails <span style={{ color: 'red' }}>*</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-emails">Digite os e-mails separados por vírgula.</Tooltip>}
                                                >
                                                    <Form.Control
                                                        className="textarea custom-select-font-size"
                                                        type="email"
                                                        as="textarea"
                                                        name="emails"
                                                        value={Array.isArray(kioskFormData.emails) ? kioskFormData.emails.join(', ') : ''}
                                                        onChange={handleChange}
                                                        multiple
                                                        rows={4}
                                                    />
                                                </OverlayTrigger>
                                                {errors.emails && <Form.Text className="text-danger">{errors.emails}</Form.Text>}
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
                <Button variant="outline-primary" onClick={handleAddOrUpdate}>Guardar</Button>
            </Modal.Footer>
        </Modal >
    );
};