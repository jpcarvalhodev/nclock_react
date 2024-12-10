import { useState, useEffect, ChangeEvent } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import * as apiService from "../helpers/apiService";
import { Doors } from '../helpers/Types';

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Interface para as propriedades do modal
interface CreateModalProps<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: Partial<T>) => void;
    fields: Field[];
    initialValues: Partial<T>;
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

// Define o componente
export const CreateAccessControlModal = <T extends Record<string, any>>({ title, open, onClose, onSave, fields, initialValues }: CreateModalProps<T>) => {
    const [formData, setFormData] = useState<Partial<T> & { doorTimezoneList: any[] }>({ ...initialValues, doorTimezoneList: [] });
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
    const [showValidationErrors, setShowValidationErrors] = useState(false);

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

    // Função para buscar as opções do dropdown
    const fetchDropdownOptions = async () => {
        try {
            const employee = await apiService.fetchAllEmployees();
            const door = await apiService.fetchAllDoors();
            const timezone = await apiService.fetchAllTimePeriods();
            const filteredDoors = door.filter((door: Doors) => door.doorNo === 3 || door.doorNo === 4);
            setDropdownData({
                employeesId: employee,
                doorId: filteredDoors,
                timezoneId: timezone
            });
        } catch (error) {
            console.error('Erro ao buscar os dados de funcionários, portas e períodos', error);
        }
    };

    // Atualiza o estado do componente ao abrir o modal
    useEffect(() => {
        if (open) {
            setFormData({
                ...initialValues,
                doorTimezoneList: [],
                createrName: localStorage.getItem('username') || '',
            });
            fetchDropdownOptions();
        } else {
            setFormData({
                ...initialValues,
                doorTimezoneList: []
            });
        }
    }, [open]);

    // Função para lidar com a mudança de valores nos campos
    const handleChange = (e: ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Função para lidar com a mudança do dropdown
    const handleDropdownChange = (key: string, e: React.ChangeEvent<FormControlElement>) => {
        const { value } = e.target;
        const selectedOption = dropdownData[key]?.find((option: any) => {
            switch (key) {
                case 'employeesId':
                    return option.employeeID === value;
                case 'doorId':
                    return option.id === value;
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

    // Função para fechar o modal
    const handleClose = () => {
        window.location.reload();
        onClose();
    }

    // Função para verificar se o formulário é válido antes de salvar
    const handleCheckForSave = () => {
        if (!isFormValid) {
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        handleSave();
    }

    // Função para salvar os dados
    const handleSave = () => {
        const doorTimeEntry = {
            doorId: formData.doorId,
            timezoneId: formData.timezoneId,
        };

        const { doorId, timezoneId, ...restFormData } = formData;

        const updatedFormData = {
            ...restFormData,
            doorTimezoneList: [...(restFormData.doorTimezoneList || []), doorTimeEntry]
        };

        onSave(updatedFormData as Partial<T>);
    };


    return (
        <Modal show={open} onHide={onClose} backdrop="static" size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        {[
                            { key: 'employeesId', label: 'Funcionário', type: 'dropdown', required: true },
                            { key: 'doorId', label: 'Porta', type: 'dropdown', required: true },
                            { key: 'timezoneId', label: 'Período', type: 'dropdown', required: true },
                        ].map((field) => (
                            <Col md={3} key={field.key}>
                                <Form.Group controlId={`form${field.key}`}>
                                    {field.required ? (
                                        <OverlayTrigger
                                            placement="right"
                                            overlay={<Tooltip id={`tooltip-${field.key}`}>Campo obrigatório</Tooltip>}
                                        >
                                            <Form.Label>
                                                {field.label}
                                                <span style={{ color: 'red' }}>*</span>
                                            </Form.Label>
                                        </OverlayTrigger>
                                    ) : (
                                        <Form.Label>{field.label}</Form.Label>
                                    )}
                                    {field.type === 'dropdown' ? (
                                        <Form.Control
                                            as="select"
                                            className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                            value={formData[field.key] || ''}
                                            onChange={(e) => handleDropdownChange(field.key, e)}
                                            style={{ overflowY: 'auto', maxHeight: '200px' }}
                                        >
                                            <option value="">Selecione...</option>
                                            {dropdownData[field.key]
                                                ? dropdownData[field.key]
                                                    .sort((a, b) => {
                                                        if (field.key === 'employeesId') {
                                                            return a.enrollNumber - b.enrollNumber;
                                                        }
                                                        return 0;
                                                    })
                                                    .sort((a, b) => {
                                                        if (field.key === 'doorId') {
                                                            return a.doorNo - b.doorNo;
                                                        }
                                                        return 0;
                                                    })
                                                    .map((option) => {
                                                        let optionId, optionName;
                                                        switch (field.key) {
                                                            case 'employeesId':
                                                                optionId = option.employeeID;
                                                                optionName = `${option.enrollNumber} - ${option.shortName}`;
                                                                break;
                                                            case 'doorId':
                                                                optionId = option.id;
                                                                optionName = `${option.doorNo} - ${option.name}`;
                                                                break;
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
                                                    })
                                                : null}
                                        </Form.Control>
                                    ) : (
                                        <Form.Control
                                            type={field.type}
                                            className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                            value={formData[field.key] || ''}
                                            onChange={handleChange}
                                            name={field.key}
                                        />
                                    )}
                                    {errors[field.key] && <Form.Text className="text-danger">{errors[field.key]}</Form.Text>}
                                </Form.Group>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button variant="outline-primary" onClick={handleCheckForSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal >
    );
};