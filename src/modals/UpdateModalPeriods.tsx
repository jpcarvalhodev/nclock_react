import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Col, Form, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import '../css/PagesStyles.css';
import { toast } from 'react-toastify';
import { CustomOutlineButton } from '../components/CustomOutlineButton';
import { TimePeriod } from '../helpers/Types';

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
    onDuplicate: (entity: Partial<T>) => void;
    onUpdate: (entity: T) => Promise<void>;
    entity: T;
    fields: Field[];
    title: string;
    onNext: () => void;
    onPrev: () => void;
    canMoveNext: boolean;
    canMovePrev: boolean;
}

export const UpdateModalPeriods = <T extends Entity>({ title, open, onClose, onUpdate, onDuplicate, entity, fields, canMoveNext, canMovePrev, onNext, onPrev }: UpdateModalProps<T>) => {
    const [formData, setFormData] = useState<T>({ ...entity });
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [showValidationErrors, setShowValidationErrors] = useState(false);

    // Usa useEffect para inicializar o formulário
    useEffect(() => {
        if (open && entity) {
            setFormData({ ...entity });
        }
    }, [open, entity]);

    // Usa useEffect para validar o formulário
    useEffect(() => {
        const newErrors: Record<string, boolean> = {};

        const isValid = fields.every(field => {
            const fieldValue = formData[field.key];
            let valid = true;

            if (field.required && (fieldValue === undefined || fieldValue === '')) {
                valid = false;
            }
            if (field.type === 'number' && fieldValue != null && fieldValue < 0) {
                valid = false;
            }
            if (field.type === 'time' && fieldValue === '00:00') {
                valid = true;
            }

            return valid;
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
        validateForm();
    }, [formData, fields]);

    // Função para validar o formulário
    const validateForm = () => {
        if (!showValidationErrors) return true;
        let newErrors: Record<string, boolean> = {};
        let isValid = true;

        fields.forEach((field) => {
            const fieldValue = formData[field.key];
            if (field.required && !fieldValue) {
                isValid = false;
                newErrors[field.key] = true;
            } else {
                newErrors[field.key] = false;
            }
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
        return isValid;
    };

    // Função para lidar com a mudança de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        let parsedValue: string | number | boolean;

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
        setFormData(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };

    // Função para tratar valores vazios ou undefined
    const prepareFormData = (data: Partial<TimePeriod>) => {
        const updatedData = { ...data };

        Object.keys(daysOfWeek).forEach(day => {
            const startKeys = [`${day}Start1`, `${day}Start2`, `${day}Start3`] as (keyof TimePeriod)[];
            const endKeys = [`${day}End1`, `${day}End2`, `${day}End3`] as (keyof TimePeriod)[];

            startKeys.forEach(startKey => {
                if (!updatedData[startKey]) {
                    updatedData[startKey] = '00:00';
                }
            });

            endKeys.forEach(endKey => {
                if (!updatedData[endKey]) {
                    updatedData[endKey] = '00:00';
                }
            });
        });

        const holidayTypes = ['holidayType1', 'holidayType2', 'holidayType3'];
        holidayTypes.forEach(type => {
            const startKeys = [`${type}Start1`, `${type}Start2`, `${type}Start3`] as (keyof TimePeriod)[];
            const endKeys = [`${type}End1`, `${type}End2`, `${type}End3`] as (keyof TimePeriod)[];

            startKeys.forEach(startKey => {
                if (!updatedData[startKey]) {
                    updatedData[startKey] = '00:00';
                }
            });

            endKeys.forEach(endKey => {
                if (!updatedData[endKey]) {
                    updatedData[endKey] = '00:00';
                }
            });
        });

        return updatedData;
    };

    // Função para manipular o clique no botão Duplicar
    const handleDuplicateClick = () => {
        if (!onDuplicate) return;
        const { id, ...dataWithoutId } = formData;
        onDuplicate(dataWithoutId as T);
    };

    // Função para lidar com o clique em guardar
    const handleSaveClick = () => {
        if (!isFormValid) {
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        const preparedData = prepareFormData(formData);
        onUpdate(preparedData as T);
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
        <Modal show={open} onHide={onClose} backdrop="static" dialogClassName="modal-scrollable" size='xl' style={{ marginTop: 100 }}>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
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
                                        className={`${showValidationErrors ? 'error-border' : ''}`}
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
                                            {label}:
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Control
                                                type="time"
                                                name={`${key}Start1`}
                                                value={formData[`${key}Start1`] || ''}
                                                onChange={handleChange}
                                                isInvalid={!!errors[`${key}Start1`]}
                                            />
                                        </Col>
                                        <Col sm="1" className="d-flex align-items-center justify-content-center">
                                            <span>-</span>
                                        </Col>
                                        <Col sm="3">
                                            <Form.Control
                                                type="time"
                                                name={`${key}End1`}
                                                value={formData[`${key}End1`] || ''}
                                                onChange={handleChange}
                                                isInvalid={!!errors[`${key}End1`]}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Anterior</Tooltip>}
                >
                    <CustomOutlineButton icon="bi-arrow-left" onClick={onPrev} disabled={!canMovePrev} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Seguinte</Tooltip>}
                >
                    <CustomOutlineButton className='arrows-modal' icon="bi-arrow-right" onClick={onNext} disabled={!canMoveNext} />
                </OverlayTrigger>
                <Button variant="outline-info" onClick={handleDuplicateClick}>Duplicar</Button>
                <Button variant="outline-secondary" onClick={onClose}>Fechar</Button>
                <Button variant="outline-primary" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};