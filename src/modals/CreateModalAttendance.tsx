import React, { useState, useEffect, ChangeEvent } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/PagesStyles.css';
import { fetchWithAuth } from '../components/FetchWithAuth';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
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

            if (field.required && !fieldValue) {
                newErrors[field.key] = 'Campo obrigatório.';
                valid = false;
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
            if (employeeResponse.ok) {
                const employees = await employeeResponse.json();
                setDropdownData({
                    employeeId: employees,
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
        }
    };

    // Função para lidar com a mudança de valor
    const handleChange = (e: ChangeEvent<FormControlElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
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

    // Opções do tipo
    const typeOptions = [
        { value: 0, label: 'Entrada' },
        { value: 1, label: 'Saída' },
        { value: 2, label: 'Pausa - Entrada' },
        { value: 3, label: 'Pausa - Saída' },
        { value: 4, label: 'Hora Extra - Entrada' },
        { value: 5, label: 'Hora Extra - Saída' }
    ];

    return (
        <Modal show={open} onHide={onClose} dialogClassName="custom-modal" size="sm">
            <Modal.Header closeButton>
                <Modal.Title className='modal-title h5'>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                {fields.map((field) => {
                    if (field.key === 'enrollNumber' || field.key === 'employeeName') {
                        return (
                            <Form.Control
                                key={field.key}
                                type="hidden"
                                value={formData[field.key] || ''}
                                name={field.key}
                            />
                        );
                    }
                    return (
                        <Form.Group controlId={`form${field.key}`} key={field.key}>
                            <Form.Label>
                                {field.label}
                                {field.required && <span style={{ color: 'red' }}> *</span>}
                            </Form.Label>
                            {field.type === 'dropdown' ? (
                                <OverlayTrigger
                                    placement="right"
                                    overlay={
                                        <Tooltip id={`tooltip-${field.key}`}>
                                            {`Campo obrigatório`}
                                        </Tooltip>
                                    }
                                >
                                    <Form.Control
                                        as="select"
                                        className="custom-input-height custom-select-font-size"
                                        value={formData[field.key] || ''}
                                        onChange={(e) => handleDropdownChange(field.key, e)}
                                    >
                                        <option value="">Selecione...</option>
                                        {dropdownData[field.key]?.map((option) => (
                                            <option key={option.employeeID} value={option.employeeID}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </OverlayTrigger>
                            ) : (
                                field.key === 'attendanceTime' ? (
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={
                                            <Tooltip id={`tooltip-${field.key}`}>
                                                {`Campo obrigatório`}
                                            </Tooltip>
                                        }
                                    >
                                        <Form.Control
                                            type={field.type}
                                            className="custom-input-height custom-select-font-size"
                                            value={formData[field.key] || ''}
                                            onChange={handleChange}
                                            name={field.key}
                                        />
                                    </OverlayTrigger>
                                ) : (
                                    field.key === 'inOutMode' ? (
                                        <Form.Control
                                            as="select"
                                            type={field.type}
                                            className="custom-input-height custom-select-font-size"
                                            value={formData[field.key] || ''}
                                            onChange={handleChange}
                                            name={field.key}
                                        >
                                            <option value="">Selecione...</option>
                                            {typeOptions.map(option => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
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
                                    )
                                ))}
                        </Form.Group>
                    )
                })}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Fechar</Button>
                <Button variant="primary" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};