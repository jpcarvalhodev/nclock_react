import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

import { CustomOutlineButton } from '../components/CustomOutlineButton';
import { useTerminals } from '../context/TerminalsContext';

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

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
    validate?: (value: any) => boolean;
}

// Define as propriedades do componente
interface UpdateModalProps<T extends Entity> {
    open: boolean;
    onClose: () => void;
    onUpdate: (entity: T) => Promise<void>;
    entity: T;
    fields: Field[];
    title: string;
    onNext: () => void;
    onPrev: () => void;
    canMoveNext: boolean;
    canMovePrev: boolean;
}

// Define o componente
export const UpdateModalAux = <T extends Entity>({ title, open, onClose, onUpdate, entity, fields, canMoveNext, canMovePrev, onNext, onPrev }: UpdateModalProps<T>) => {
    const { fetchTimePeriods } = useTerminals();
    const [formData, setFormData] = useState<Partial<T>>({ ...entity });
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
    const [showValidationErrors, setShowValidationErrors] = useState(false);

    // Usa useEffect para inicializar o formulário
    useEffect(() => {
        if (open && entity) {
            fetchDropdownOptions();
            setFormData({ ...entity });
        }
    }, [open, entity]);

    // UseEffect para validar o formulário
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

    // Função para buscar os dados dos dropdowns
    const fetchDropdownOptions = async () => {
        try {
            const timezones = await fetchTimePeriods();
            setDropdownData({
                timezoneId: timezones
            });
        } catch (error) {
            console.error('Erro ao buscar os dados de dispositivos e períodos', error);
        }
    };

    // Função para lidar com a mudança do dropdown
    const handleDropdownChange = (key: string, e: React.ChangeEvent<FormControlElement>) => {
        const { value } = e.target;
        const selectedOption = dropdownData[key]?.find((option: any) => {
            switch (key) {
                case 'timezoneId':
                    return option.id === value;
                default:
                    return false;
            }
        });

        if (selectedOption) {
            const idKey = key;
            setFormData(prevState => ({
                ...prevState,
                [idKey]: value
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [key]: value
            }));
        }
    };

    // Função para lidar com a mudança de valores nos campos
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        if (showValidationErrors) {
            setShowValidationErrors(false);
        }
        const parsedValue = type === 'checkbox' ? checked : value;
        setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
    };

    // Função para salvar os dados
    const handleSave = () => {
        if (!isFormValid) {
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar.');
            return;
        }
        onUpdate(formData as T);
    };

    // Define as seleções de contacto
    const auxTypeOptions = [
        { value: 1, label: 'Aberto' },
        { value: 2, label: 'Fechado' }
    ];

    return (
        <Modal show={open} onHide={onClose} backdrop="static" size='xl' centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable" style={{ marginBottom: 365 }}>
                <div className="container-fluid">
                    <Row>
                        <Col md={3}>
                            <Form.Group controlId="formEnabled" className='d-flex justify-content-between mt-3' style={{ marginBottom: 13.5 }}>
                                <Form.Label>Activo</Form.Label>
                                <Form.Check
                                    type="switch"
                                    name="enabled"
                                    checked={!!formData.enabled}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formAuxType">
                                <Form.Label>Contacto</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    as="select"
                                    name="auxType"
                                    value={formData.auxType}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione...</option>
                                    {auxTypeOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formNome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="string"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formAuxNo">
                                <Form.Label>Número</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="number"
                                    name="auxNo"
                                    value={formData.auxNo}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formTimezoneId">
                                <Form.Label>Período<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        as="select"
                                        className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                        value={formData.timezoneId || ''}
                                        onChange={(e) => handleDropdownChange('timezoneId', e)}
                                    >
                                        <option value="">Selecione...</option>
                                        {dropdownData.timezoneId?.map((option: any) => {
                                            let optionId, optionName;
                                            switch ('timezoneId') {
                                                case 'timezoneId':
                                                    optionId = option.id;
                                                    optionName = option.name;
                                                    break;
                                                default:
                                                    optionId = option.id;
                                                    optionName = option.name;
                                                    break;
                                            }
                                            return (
                                                <option key={optionId} value={optionId}>
                                                    {optionName}
                                                </option>
                                            );
                                        })}
                                    </Form.Control>
                                </OverlayTrigger>
                                {errors['timezoneId'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['timezoneId']}</div>}
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
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
                <Button variant="outline-dark" onClick={onClose}>
                    Fechar
                </Button>
                <Button variant="outline-dark" onClick={handleSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal >
    );
};