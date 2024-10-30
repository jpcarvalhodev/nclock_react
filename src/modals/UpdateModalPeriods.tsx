import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Col, Form, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import '../css/PagesStyles.css';
import { toast } from 'react-toastify';

// Define a interface Entity
export interface Entity {
    id: string;
    [key: string]: any;
}

// Define a interface Field
interface Field {
    key: string;
    label: string;
    type: string;
    required?: boolean;
    optionsUrl?: string;
}

// Define as propriedades do componente
interface UpdateModalProps<T extends Entity> {
    open: boolean;
    onClose: () => void;
    onDuplicate?: (entity: T) => void;
    onUpdate: (entity: T) => Promise<void>;
    entity: T;
    fields: Field[];
    title: string;
}

export const UpdateModalPeriods = <T extends Entity>({ title, open, onClose, onDuplicate, onUpdate, entity, fields }: UpdateModalProps<T>) => {
    const [formData, setFormData] = useState<T>({ ...entity });
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Usa useEffect para inicializar o formulário
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
            if (field.required && (fieldValue === undefined || fieldValue === '')) {
                valid = false;
            }

            return valid;
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
    }, [formData, fields]);

    // Função para manipular o clique no botão Duplicar
    const handleDuplicateClick = () => {
        if (!onDuplicate) return;
        const { employeeID, ...dataWithoutId } = formData;
        onDuplicate(dataWithoutId as T);
    };

    // Função para lidar com a mudança de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        let parsedValue: string | number | boolean;

        if (type === 'checkbox') {
            parsedValue = target.checked;
        } else if (type === 'number') {
            parsedValue = Number(value);
        } else {
            parsedValue = value;
        }
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

    // Traduz as keys dos dias da semana
    const daysOfWeek = {
        monday: 'Segunda',
        tuesday: 'Terça',
        wednesday: 'Quarta',
        thursday: 'Quinta',
        friday: 'Sexta',
        saturday: 'Sábado',
        sunday: 'Domingo'
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static" dialogClassName="modal-scrollable" size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Form className="container-fluid">
                    <Row>
                        <Col md={4}>
                            <Form.Group controlId="formInitFlag" className='d-flex justify-content-between mt-2'>
                                <Form.Label>Activar Período:</Form.Label>
                                <Form.Check
                                    type="switch"
                                    name="initFlag"
                                    checked={!!formData.initFlag}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formRemark" className='d-flex justify-content-between mt-4'>
                                <Form.Label column sm="4">Observações:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="remark"
                                    value={formData.remark}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="formName" className='d-flex justify-content-between'>
                                <Form.Label column sm="3">Nome: <span style={{ color: 'red' }}>*</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="formAppId" className='d-flex justify-content-between'>
                                <Form.Label column sm="4">ID:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="appId"
                                    readOnly
                                    value={formData.appId}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Col md={12}>
                        <Row className="d-flex justify-content-between mt-5">
                            {Object.entries(daysOfWeek).map(([key, label]) => (
                                <Col md={6} key={key}>
                                    <Form.Group as={Row} style={{ marginBottom: 10 }}>
                                        <Form.Label column sm="2">
                                            {label}:<span style={{ color: 'red' }}>*</span>
                                        </Form.Label>
                                        <Col sm="3">
                                            <OverlayTrigger
                                                placement="right"
                                                overlay={<Tooltip id={`tooltip-${key}Start1`}>Campo obrigatório</Tooltip>}
                                            >
                                                <Form.Control
                                                    type="time"
                                                    name={`${key}Start1`}
                                                    value={formData[`${key}Start1`] || ''}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors[`${key}Start1`]}
                                                />
                                            </OverlayTrigger>
                                            <Form.Control.Feedback type="invalid">
                                                {errors[`${key}Start1`]}
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col sm="1" className="d-flex align-items-center justify-content-center">
                                            <span>-</span>
                                        </Col>
                                        <Col sm="3">
                                            <OverlayTrigger
                                                placement="right"
                                                overlay={<Tooltip id={`tooltip-${key}End1`}>Campo obrigatório</Tooltip>}
                                            >
                                                <Form.Control
                                                    type="time"
                                                    name={`${key}End1`}
                                                    value={formData[`${key}End1`] || ''}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors[`${key}End1`]}
                                                />
                                            </OverlayTrigger>
                                            <Form.Control.Feedback type="invalid">
                                                {errors[`${key}End1`]}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-info" onClick={handleDuplicateClick}>Duplicar</Button>
                <Button variant="outline-secondary" onClick={onClose}>Fechar</Button>
                <Button variant="outline-primary" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};