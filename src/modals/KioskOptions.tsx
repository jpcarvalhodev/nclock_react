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
    onSave: (kioskFormData: Partial<KioskConfig>) => Promise<void>;
    onUpdate: (kioskFormData: Partial<KioskConfig>) => Promise<void>;
    entity: T;
    fields: FieldConfig[];
    title: string;
}

export const KioskOptionsModal = <T extends Record<string, any>>({ title, open, onClose, onSave, onUpdate, entity, fields }: Props<T>) => {
    const [kioskFormData, setKioskFormData] = useState<Partial<KioskConfig>>({ ...entity });
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Atualiza o formData com os dados da entity
    useEffect(() => {
        if (entity) {
            const kioskData: Partial<KioskConfig> = {
                amount: entity.amount,
                totalMoedas: entity.totalMoedas,
                emails: entity.emails
            };

            setKioskFormData(kioskData);
        }
    }, [entity]);

    // Limpa os dados do formulário quando o modal é fechado
    useEffect(() => {
        if (!open) {
            setKioskFormData({});
        }
    }, [open]);

    // Usa useEffect para validar o formulário
    useEffect(() => {
        const newErrors: Record<string, string> = {};

        const isValid = fields.every(field => {
            const fieldValue = kioskFormData[field.key];
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
    }, [kioskFormData, fields]);

    // Função para validar o formulário
    const validateForm = () => {
        const isValid = fields.every(field => {
            const fieldValue = kioskFormData?.[field.key];
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
        let parsedValue: string | number | boolean | string[];

        if (type === 'checkbox') {
            parsedValue = target.checked;
        } else if (type === 'number') {
            parsedValue = Number(value);
        } else {
            parsedValue = value;
        }

        const formType = dataset.formType as 'kiosk';
        if (formType === 'kiosk') {
            setKioskFormData(prevState => ({
                ...prevState,
                [name]: parsedValue
            }));
        };
    }

    // Função para lidar com o clique em guardar
    const handleSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        onSave(kioskFormData as KioskConfig);
        onClose();
    };

    // Função para lidar com o clique em atualizar
    const handleUpdateClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        onUpdate(kioskFormData as KioskConfig);
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
                                                        value={kioskFormData.amount || ''}
                                                        onChange={handleChange}
                                                        data-form-type="kiosk"
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
                                                        data-form-type="kiosk"
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
                                                        value={kioskFormData.emails?.join(', ').replace(/,\s+/g, ',').replace(/\s+,/g, ',')}
                                                        onChange={handleChange}
                                                        data-form-type="kiosk"
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
                <Button variant="outline-info" onClick={handleUpdateClick}>Atualizar</Button>
                <Button variant="outline-primary" onClick={handleSaveClick}>Criar</Button>
            </Modal.Footer>
        </Modal >
    );
};