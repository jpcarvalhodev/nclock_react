import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import '../css/PagesStyles.css';
import { toast } from 'react-toastify';
import { TimePeriod } from '../helpers/Types';
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
interface Props<T> {
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => Promise<void>;
    fields: FieldConfig[];
    title: string;
}

// Define os valores iniciais do formulário para envio de forma padrão
const initialValues: Partial<TimePeriod> = {
    createrName: localStorage.getItem('username') || '',
    mondayStart1: '00:00', mondayEnd1: '00:00',
    tuesdayStart1: '00:00', tuesdayEnd1: '00:00',
    wednesdayStart1: '00:00', wednesdayEnd1: '00:00',
    thursdayStart1: '00:00', thursdayEnd1: '00:00',
    fridayStart1: '00:00', fridayEnd1: '00:00',
    saturdayStart1: '00:00', saturdayEnd1: '00:00',
    sundayStart1: '00:00', sundayEnd1: '00:00',
    mondayStart2: '00:00', mondayEnd2: '00:00', mondayStart3: '00:00', mondayEnd3: '00:00',
    tuesdayStart2: '00:00', tuesdayEnd2: '00:00', tuesdayStart3: '00:00', tuesdayEnd3: '00:00',
    wednesdayStart2: '00:00', wednesdayEnd2: '00:00', wednesdayStart3: '00:00', wednesdayEnd3: '00:00',
    thursdayStart2: '00:00', thursdayEnd2: '00:00', thursdayStart3: '00:00', thursdayEnd3: '00:00',
    fridayStart2: '00:00', fridayEnd2: '00:00', fridayStart3: '00:00', fridayEnd3: '00:00',
    saturdayStart2: '00:00', saturdayEnd2: '00:00', saturdayStart3: '00:00', saturdayEnd3: '00:00',
    sundayStart2: '00:00', sundayEnd2: '00:00', sundayStart3: '00:00', sundayEnd3: '00:00',
    holidayType1Start1: '00:00', holidayType1End1: '00:00', holidayType1Start2: '00:00', holidayType1End2: '00:00', holidayType1Start3: '00:00', holidayType1End3: '00:00',
    holidayType2Start1: '00:00', holidayType2End1: '00:00', holidayType2Start2: '00:00', holidayType2End2: '00:00', holidayType2Start3: '00:00', holidayType2End3: '00:00',
    holidayType3Start1: '00:00', holidayType3End1: '00:00', holidayType3Start2: '00:00', holidayType3End2: '00:00', holidayType3Start3: '00:00', holidayType3End3: '00:00',
};

export const CreateModalPeriods = <T extends Partial<TimePeriod>>({ title, open, onClose, onSave, fields }: Props<T>) => {
    const [formData, setFormData] = useState<Partial<TimePeriod>>(initialValues);
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Usa useEffect para validar o formulário
    useEffect(() => {
        const newErrors: Record<string, string> = {};

        const isValid = fields.every(field => {
            const fieldValue = formData[field.key];
            let valid = true;

            if (field.required && (fieldValue === undefined || fieldValue === '')) {
                valid = false;
            }
            if (field.type === 'number' && fieldValue != null && fieldValue < 0) {
                valid = false;
                newErrors[field.key] = `${field.label} não pode ser negativo.`;
            }

            return valid;
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
    }, [formData, fields]);

    // Usa useEffect para buscar o próximo ID do App ao abrir o modal
    useEffect(() => {
        if (open) {
            fetchNextAppId();
        } else {
            setFormData(initialValues);
        }
    }, [open]);

    // Função para buscar o próximo ID do App
    const fetchNextAppId = async () => {
        const apiData = await apiService.fetchAllTimePeriods();
        if (apiData.length > 0 && apiData[apiData.length - 1].appId) {
            const lastAppId = apiData[apiData.length - 1].appId;
            const nextId = parseInt(lastAppId, 10) + 1;
            const nextAppId = nextId.toString();

            setFormData(prevState => ({
                ...prevState,
                appId: nextAppId
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                appId: '1'
            }));
        }
    }

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
        onSave(formData as T);
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
                <Button variant="outline-secondary" onClick={onClose}>Fechar</Button>
                <Button variant="outline-primary" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};