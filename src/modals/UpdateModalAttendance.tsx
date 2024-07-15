import React, { ChangeEvent, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as apiService from "../helpers/apiService";

// Define o tipo FormControlElement
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
}

// Define as propriedades do componente
interface UpdateModalProps<T extends Entity> {
    open: boolean;
    onClose: () => void;
    onUpdate: (entity: T) => Promise<void>;
    entity: T;
    fields: Field[];
    title: string;
    entityType: 'movimentos' | 'pedidos';
}

// Define o componente
export const UpdateModalAttendance = <T extends Entity>({ open, onClose, onUpdate, entity, fields, title, entityType }: UpdateModalProps<T>) => {
    const [formData, setFormData] = useState<T>({ ...entity });
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
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
            const employeeResponse = await apiService.fetchAllEmployees();
            if (employeeResponse.ok) {
                const employees = await employeeResponse.json();
                setDropdownData({
                    employeeId: employees,
                });
            } else {
                toast.error('Erro ao buscar os dados de funcionários e dispositivos.');
                return;
            }
        } catch (error) {
            toast.error('Erro ao buscar os dados de funcionários e dispositivos.');
            console.error(error);
        }
    };

    // Atualiza o estado do componente
    useEffect(() => {
        if (open) {
            fetchDropdownOptions();
        }
    }, [open]);

    // Define a função para mudar o dropdown
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
        handleSubmit();
    };

    // Define a função para enviar
    const handleSubmit = () => {
        onUpdate(formData);
        onClose();
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
        <Modal show={open} onHide={onClose} dialogClassName="custom-modal" size={entityType === 'movimentos' ? 'sm' : 'lg'}>
            <Modal.Header closeButton>
                <Modal.Title className='modal-title h5'>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                {entityType === 'pedidos' && (
                    <>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group controlId="formAttendanceTime">
                                    <Form.Label>
                                        Horário de Presença
                                        <span style={{ color: 'red' }}> *</span>
                                    </Form.Label>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip id="tooltip-attendanceTime">{'Campo obrigatório'}</Tooltip>}
                                    >
                                        <Form.Control
                                            type="datetime-local"
                                            className="custom-input-height custom-select-font-size"
                                            value={formData.attendanceTime || ''}
                                            onChange={handleChange}
                                            name="attendanceTime"
                                        />
                                    </OverlayTrigger>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="formEmployeeId">
                                    <Form.Label>
                                        Funcionário
                                        <span style={{ color: 'red' }}> *</span>
                                    </Form.Label>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip id="tooltip-employeeId">{'Campo obrigatório'}</Tooltip>}
                                    >
                                        <Form.Control
                                            as="select"
                                            className="custom-input-height custom-select-font-size"
                                            value={formData.employeeId || ''}
                                            onChange={(e) => handleDropdownChange('employeeId', e)}
                                        >
                                            <option value="">Selecione...</option>
                                            {dropdownData.employeeId?.map((option) => (
                                                <option key={option.employeeID} value={option.employeeID}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </OverlayTrigger>
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group controlId="formObservation">
                            <Form.Label>
                                Observações
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                className="custom-select-font-size textarea-large"
                                value={formData.observation || ''}
                                onChange={handleChange}
                                name="observation"
                            />
                        </Form.Group>
                    </>
                )}
                {entityType === 'movimentos' && fields.map((field) => {
                    if (!['deviceId', 'deviceNumber','enrollNumber', 'employeeName', 'observation', 'type', 'verifyMode', 'workCode'].includes(field.key)) {
                        return (
                            <Form.Group controlId={`form${field.key}`} key={field.key}>
                                <Form.Label>
                                    {field.label}
                                    {field.required && <span style={{ color: 'red' }}> *</span>}
                                </Form.Label>
                                {field.type === 'dropdown' ? (
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip id={`tooltip-${field.key}`}>{'Campo obrigatório'}</Tooltip>}
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
                                        )))}
                            </Form.Group>
                        );
                    }
                    return (
                        <Form.Control
                            key={field.key}
                            type="hidden"
                            value={formData[field.key] || ''}
                            name={field.key}
                        />
                    );
                })}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>Fechar</Button>
                <Button variant="outline-primary" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};