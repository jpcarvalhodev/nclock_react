import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

import { useTerminals } from '../context/TerminalsContext';
import { DoorDevice, Doors } from '../types/Types';

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Define a interface Entity
export interface Entity {
    id: string;
    [key: string]: any;
}

// Interface para as propriedades do modal
interface DoorModalProps<T extends Entity> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    entity: T;
    fields: Field[];
}

// Interface para os campos do formulário
interface Field {
    key: string;
    label: string;
    type: string;
    required?: boolean;
    validate?: (value: any) => boolean;
    errorMessage?: string;
}

// Valores iniciais do formulário
const initialValues: Partial<DoorDevice> = {
    time: 5
}

// Define o componente
export const DoorModal = <T extends Entity>({ title, open, onClose, onSave, entity, fields }: DoorModalProps<T>) => {
    const { door } = useTerminals();
    const [formData, setFormData] = useState<Partial<DoorDevice>>({ ...entity, ...initialValues });
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
    const [showValidationErrors, setShowValidationErrors] = useState(false);

    // UseEffect para inicializar o formulário
    useEffect(() => {
        if (entity) {
            fetchDropdownOptions();
            setFormData({ ...entity, ...initialValues });
        }
    }, [entity]);

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
            const filteredDoors = door.filter((door: Doors) => door.devId === entity.zktecoDeviceID);
            setDropdownData({
                nrDoor: filteredDoors
            });
        } catch (error) {
            console.error('Erro ao buscar os dados de portas', error);
        }
    };

    // Função para lidar com a mudança do dropdown
    const handleDropdownChange = (key: string, e: React.ChangeEvent<FormControlElement>) => {
        const { value } = e.target;
        const selectedOption = dropdownData[key]?.find((option: any) => {
            switch (key) {
                case 'nrDoor':
                    return option.doorNo === value;
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
    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        if (showValidationErrors) {
            setShowValidationErrors(false);
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Função para limpar e fechar o modal
    const handleClose = () => {
        setFormData({ ...entity, ...initialValues });
        setShowValidationErrors(false);
        onClose();
    }

    // Função para verificar se o formulário é válido antes de salvar
    const handleCheckForSave = () => {
        if (!isFormValid) {
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar.');
            return;
        }
        handleSave();
    }

    // Função para salvar os dados
    const handleSave = () => {
        onSave(formData as T);
        handleClose();
    };

    return (
        <Modal show={open} onHide={handleClose} backdrop="static" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formNrDoor">
                                <Form.Label>Porta<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        as="select"
                                        className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                        value={formData.nrDoor || ''}
                                        onChange={(e) => handleDropdownChange('nrDoor', e)}
                                    >
                                        <option value="">Selecione...</option>
                                        {dropdownData.nrDoor?.sort((a, b) => a.doorNo - b.doorNo).map((option: any) => {
                                            let optionId, optionName;
                                            switch ('nrDoor') {
                                                case 'nrDoor':
                                                    optionId = option.doorNo;
                                                    optionName = option.name;
                                                    break;
                                                default:
                                                    optionId = option.doorNo;
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
                                {errors['nrDoor'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['nrDoor']}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formTime">
                                <Form.Label>Tempo Aberta<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                        type="number"
                                        name="time"
                                        value={formData.time || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['time'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['time']}</div>}
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleClose}>
                    Fechar
                </Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleCheckForSave}>
                    Abrir
                </Button>
            </Modal.Footer>
        </Modal >
    );
};