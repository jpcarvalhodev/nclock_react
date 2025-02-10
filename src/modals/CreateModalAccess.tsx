import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/PagesStyles.css';
import { Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { usePersons } from '../context/PersonsContext';
import { useTerminals } from '../context/TerminalsContext';
import { Devices, Doors, Employee } from '../types/Types';

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

// Função para formatar a data e hora atuais para o formato adequado
const getCurrentDateTimeLocal = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Define a interface para os dados do dropdown
interface DropdownData {
    [key: string]: Employee[] | Devices[] | Doors[] | undefined;
    employeeId?: Employee[];
    deviceId?: Devices[];
    doorId?: Doors[];
}

// Define o tipo de opção
type OptionType = Employee | Devices | Doors;

// Define o componente
export const CreateModalAccess = <T extends Record<string, any>>({ title, open, onClose, onSave, fields, initialValues }: Props<T>) => {
    const { employees } = usePersons();
    const { devices, door } = useTerminals();
    const [formData, setFormData] = useState<Partial<T>>({ ...initialValues });
    const [dropdownData, setDropdownData] = useState<DropdownData>({});
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [showValidationErrors, setShowValidationErrors] = useState(false);
    const [selectedEmployeePin, setSelectedEmployeePin] = useState(0);
    const [selectedEmployeeCard, setSelectedEmployeeCard] = useState(0);
    const hasShownNoCardToastRef = useRef(false);

    // UseEffect para validar o formulário
    useEffect(() => {
        const newErrors: Record<string, boolean> = {};

        const isValid = fields.every(field => {
            const fieldValue = formData[field.key];
            let valid = true;

            if (field.required && (fieldValue === undefined || fieldValue === '')) {
                valid = false;
            }
            if (field.required && !fieldValue) {
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
            const sortedEmployees = employees.sort((a, b) => Number(a.enrollNumber) - Number(b.enrollNumber));
            const sortedDevices = devices.sort((a, b) => a.deviceNumber - b.deviceNumber);
            const sortedDoors = door.sort((a, b) => a.doorNo - b.doorNo);
            const selectedEmployee = sortedEmployees.find(emp => emp.enrollNumber === initialValues.selectedEmployeeIds);
            setDropdownData(prevState => ({
                ...prevState,
                pin: selectedEmployee ? [selectedEmployee] : sortedEmployees,
                deviceSN: sortedDevices,
                eventDoorId: sortedDoors
            }));
            if (selectedEmployee) {
                setFormData(prevState => ({
                    ...prevState,
                    pin: selectedEmployee.enrollNumber
                }));
                setSelectedEmployeePin(Number(selectedEmployee.enrollNumber));
            } else {
                setSelectedEmployeePin(0);
            }
            if (selectedEmployee && selectedEmployee.employeeCards.length > 0) {
                setSelectedEmployeeCard(Number(selectedEmployee.employeeCards[0].cardNumber));
            } else {
                setSelectedEmployeeCard(0);
                if (!hasShownNoCardToastRef.current) {
                    toast.warn('O funcionário selecionado não possui cartão associado. Não será possível guardar o acesso.');
                    hasShownNoCardToastRef.current = true;
                }
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de funcionários e dispositivos.');
        }
    };

    // Atualiza o estado do componente ao abrir o modal
    useEffect(() => {
        if (open) {
            fetchDropdownOptions();
            setFormData(prevState => ({
                ...prevState,
                initialValues,
                eventTime: getCurrentDateTimeLocal(),
                inOutStatus: '0'
            }));
        } else {
            setFormData({});
        }
    }, [open]);

    // Função para lidar com a mudança do dropdown
    const handleDropdownChange = (key: string, e: React.ChangeEvent<FormControlElement>) => {
        const { value } = e.target;
        const optionsArray = (dropdownData[key] as OptionType[] | undefined) ?? [];
        const selectedOption = optionsArray.find((option) => {
            switch (key) {
                case 'pin':
                    return (option as Employee).enrollNumber === value;
                case 'deviceSN':
                    return (option as Devices).serialNumber === value;
                case 'eventDoorId':
                    return (option as Doors).doorNo === Number(value);
                default:
                    return false;
            }
        });
        if (key === 'deviceSN') {
            setFormData(prevState => ({
                ...prevState,
                deviceSN: value,
                eventDoorId: ''
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [key]: value
            }));
        }
    };

    // Função para lidar com a mudança de valor
    const handleChange = (e: ChangeEvent<FormControlElement>) => {
        const { name, value } = e.target;

        if (showValidationErrors) {
            setShowValidationErrors(false);
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Função para lidar com o fechamento do modal
    const handleClose = () => {
        setFormData({});
        setShowValidationErrors(false);
        onClose();
    }

    // Função para lidar com o clique no botão de guardar
    const handleSaveClick = () => {
        if (!isFormValid) {
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar.');
            return;
        }
        handleSave();
    };

    // Função para lidar com o salvamento
    const handleSave = () => {
        const { dropdownData, initialValues, selectedEmployeeIds, ...rest } = formData;
        const cleanedData = { ...rest, pin: selectedEmployeePin, cardNo: selectedEmployeeCard };
        onSave(cleanedData as unknown as T);
        handleClose();
    };

    // Opções do tipo
    const typeOptions = [
        { value: 0, label: 'Entrada' },
        { value: 1, label: 'Saída' },
    ];

    // Dentro do componente, antes do return:
    const filteredDoors = (dropdownData['eventDoorId'] as Doors[] | undefined)
        ?.filter((door) => door.devSN === formData.deviceSN) ?? [];

    return (
        <Modal show={open} onHide={handleClose} backdrop="static" dialogClassName="custom-modal" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title className='modal-title h5'>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formEventTime">
                            <Form.Label>Data</Form.Label>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-eventTime">Campo obrigatório</Tooltip>}
                            >
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="datetime-local"
                                    name="eventTime"
                                    value={formData.eventTime ? new Date(formData.eventTime).toISOString().slice(0, 16) : ''}
                                    onChange={handleChange}
                                />
                            </OverlayTrigger>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formDeviceSN">
                            <Form.Label>Terminal<span style={{ color: 'red' }}> *</span></Form.Label>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-eventTime">Campo obrigatório</Tooltip>}
                            >
                                <Form.Control
                                    as="select"
                                    className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                    value={formData.deviceSN || ''}
                                    onChange={(e) => handleDropdownChange('deviceSN', e)}
                                >
                                    <option value="">Selecione...</option>
                                    {dropdownData['deviceSN']?.map((option: any) => {
                                        let optionId = option.serialNumber;
                                        let optionName = option.deviceName;
                                        return (
                                            <option key={optionId} value={optionId}>
                                                {optionName}
                                            </option>
                                        );
                                    })}
                                </Form.Control>
                            </OverlayTrigger>
                            {errors.deviceSN && <Form.Text className="text-danger">{errors.deviceSN}</Form.Text>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formEventDoorId">
                            <Form.Label>Porta<span style={{ color: 'red' }}> *</span></Form.Label>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-eventDoorId">Campo obrigatório</Tooltip>}
                            >
                                <Form.Control
                                    as="select"
                                    className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                    value={formData.eventDoorId || ''}
                                    onChange={(e) => handleDropdownChange('eventDoorId', e)}
                                >
                                    <option value="">Selecione...</option>
                                    {filteredDoors?.map((option: any) => {
                                        let optionId = option.doorNo;
                                        let optionName = option.name;
                                        return (
                                            <option key={optionId} value={optionId}>
                                                {optionName}
                                            </option>
                                        );
                                    })}
                                </Form.Control>
                            </OverlayTrigger>
                            {errors.eventDoorId && <Form.Text className="text-danger">{errors.eventDoorId}</Form.Text>}
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formInOutStatus">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                                as="select"
                                className="custom-input-height custom-select-font-size"
                                value={formData.inOutStatus || ''}
                                onChange={handleChange}
                                name="inOutStatus"
                            >
                                <option value="">Selecione...</option>
                                {typeOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formPin">
                            <Form.Label>Funcionário</Form.Label>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-pin">Campo obrigatório</Tooltip>}
                            >
                                <Form.Control
                                    as="select"
                                    className="custom-input-height custom-select-font-size"
                                    value={formData.pin || ''}
                                    onChange={(e) => handleDropdownChange('pin', e)}
                                >
                                    <option value="">Selecione...</option>
                                    {dropdownData['pin']?.map((option: any) => {
                                        let optionId = option.enrollNumber;
                                        let optionName = option.name;
                                        return (
                                            <option key={optionId} value={optionId}>
                                                {optionId} - {optionName}
                                            </option>
                                        );
                                    })}
                                </Form.Control>
                            </OverlayTrigger>
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleClose}>Fechar</Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};
