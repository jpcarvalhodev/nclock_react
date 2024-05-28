import React, { useState, useEffect, ChangeEvent } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/PagesStyles.css';
import { fetchWithAuth } from '../components/FetchWithAuth';
import { Row, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Employee } from '../helpers/Types';

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Define a interface para as propriedades do componente FieldConfig
interface FieldConfig {
    label: string;
    key: string;
    type: string;
    required?: boolean;
    optionsUrl?: string;
}

// Define as propriedades do componente
interface Props<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    fields: FieldConfig[];
    initialValues: Partial<T>;
}

// Define o componente
export const CreateModalAttendance = <T extends Record<string, any>>({ title, open, onClose, onSave, fields, initialValues }: Props<T>) => {
    const [formData, setFormData] = useState<Partial<T>>({ ...initialValues });
    const [dropdownData, setDropdownData] = useState<Record<string, Employee[]>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);

    // UseEffect para validar o formulário
    useEffect(() => {
        const newErrors: Record<string, string> = {};

        const isValid = fields.every(field => {
            const fieldValue = formData[field.key];
            let valid = true;

            if (field.type === 'number' && fieldValue != null && fieldValue <= 0) {
                valid = false;
                newErrors[field.key] = `${field.label} não pode ser nulo ou negativo.`;
            }

            return valid;
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
    }, [formData, fields]);

    // Função para buscar as opções do dropdown
    const fetchDropdownOptions = async () => {
        try {
            const employeeResponse = await fetchWithAuth('Employees/GetAllEmployees');
            /* const deviceResponse = await fetchWithAuth('Devices'); */
            if (employeeResponse.ok /* && deviceResponse.ok */) {
                const employees = await employeeResponse.json();
                /* const devices = await deviceResponse.json(); */
                setDropdownData({
                    employeeId: employees,
                    /* deviceId: devices */
                });
            } else {
                toast.error('Erro ao buscar os dados de funcionários e dispositivos.');
            }
        } catch (error) {
            toast.error('Erro ao buscar os dados de funcionários e dispositivos.');
            console.error(error);
        }
    };    

    // Atualiza o estado do componente ao abrir o modal
    useEffect(() => {
        if (open) {
            fetchDropdownOptions();
        }
    }, [open]);

    // Função para lidar com a mudança do dropdown
    const handleDropdownChange = (key: string, e: React.ChangeEvent<FormControlElement>) => {
        const { value } = e.target;
        if (key === 'employeeId') {
            const selectedEmployee = dropdownData.employeeId?.find(emp => emp.employeeID === value);
            if (selectedEmployee) {
                setFormData(prevState => ({
                    ...prevState,
                    [key]: selectedEmployee.employeeID,
                    employeeName: selectedEmployee.name,
                    enrollNumber: selectedEmployee.enrollNumber
                }));
            } else {
                setFormData(prevState => ({
                    ...prevState,
                    [key]: value
                }));
            }
        } else if (key === 'deviceId') {
            const selectedDevice = dropdownData.deviceId?.find(dev => dev.deviceID === value);
            if (selectedDevice) {
                setFormData(prevState => ({
                    ...prevState,
                    [key]: selectedDevice.deviceID,
                    deviceName: selectedDevice.name
                }));
            } else {
                setFormData(prevState => ({
                    ...prevState,
                    [key]: value
                }));
            }
        }
    };

    // Função para lidar com a mudança de valor
    const handleChange = (e: ChangeEvent<FormControlElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? Number(value) : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };

    // Função para lidar com o clique no botão de guardar
    const handleSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        handleSave();
    };

    // Função para lidar com o salvamento
    const handleSave = () => {
        onSave(formData as T);
    };

    return (
        <Modal show={open} onHide={onClose} dialogClassName="custom-modal" size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Row>
                    {fields.map((field) => (
                        <Col md={4} key={field.key}>
                            <Form.Group controlId={`form${field.key}`}>
                                <Form.Label>{field.label}</Form.Label>
                                {field.type === 'dropdown' ? (
                                    <Form.Control
                                        as="select"
                                        className="custom-input-height custom-select-font-size"
                                        value={formData[field.key] || ''}
                                        onChange={(e) => handleDropdownChange(field.key, e)}
                                    >
                                        <option value="">Selecione...</option>
                                        {dropdownData[field.key]?.map((option: any) => (
                                            <option key={option.employeeID || option.deviceID} value={option.employeeID || option.deviceID}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                ) : (
                                    <Form.Control
                                        type={field.type}
                                        className="custom-input-height custom-select-font-size"
                                        value={formData[field.key] || ''}
                                        onChange={handleChange}
                                        name={field.key}
                                    />
                                )}
                                {errors[field.key] && <div style={{ color: 'red', fontSize: 'small' }}>{errors[field.key]}</div>}
                            </Form.Group>
                        </Col>
                    ))}
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Fechar</Button>
                <Button variant="primary" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );    
};