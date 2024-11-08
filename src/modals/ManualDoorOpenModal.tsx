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
export const ManualDoorOpenModal = <T extends Record<string, any>>({ title, open, onClose, onSave, fields }: CreateModalProps<T>) => {
    const [formData, setFormData] = useState<Partial<T>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
    const [allDoors, setAllDoors] = useState<Doors[]>([]);
    const [filteredDoors, setFilteredDoors] = useState<Doors[]>([]);

    // UseEffect para validar o formulário
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
            }

            return valid;
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
    }, [formData, fields]);

    // Função para buscar as opções do dropdown
    const fetchDropdownOptions = async () => {
        try {
            const door = await apiService.fetchAllDoors();
            const device = await apiService.fetchAllDevices();
            setDropdownData({
                doorId: door,
                deviceId: device
            });
            setAllDoors(door);
        } catch (error) {
            console.error('Erro ao buscar os dados de funcionários, portas e períodos', error);
        }
    };

    // Atualiza o estado do componente ao abrir o modal
    useEffect(() => {
        if (open) {
            setFormData((prevState) => ({
                ...prevState,
                nomeResponsavel: localStorage.getItem('username') || '',
            }));
            fetchDropdownOptions();
        } else {
            setFormData({});
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
        if (key === 'deviceId') {
            const filtered = allDoors.filter(door => door.devId === value);
            setFilteredDoors(filtered);

            setFormData(prevState => ({
                ...prevState,
                [key]: value,
                doorId: ''
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [key]: value
            }));
        }
    };

    // Função para verificar se o formulário é válido antes de salvar
    const handleCheckForSave = () => {
        const keysToCheck = ['deviceId', 'doorId', 'observacoes'];
        const areAllRequiredFieldsFilled  = keysToCheck.every(key => formData[key]);
        if (!isFormValid || !areAllRequiredFieldsFilled ) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        handleSave();
    }

    // Função para salvar os dados
    const handleSave = () => {
        onSave(formData as Partial<T>);
        onClose();
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
                            { key: 'deviceId', label: 'Dispositivo', type: 'dropdown', required: true },
                            { key: 'doorId', label: 'Abertura', type: 'dropdown', required: true },
                            { key: 'observacoes', label: 'Observações', type: 'string', required: true }
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
                                            className="custom-input-height custom-select-font-size"
                                            value={formData[field.key] || ''}
                                            onChange={(e) => handleDropdownChange(field.key, e)}
                                        >
                                            <option value="">Selecione...</option>
                                            {(field.key === 'doorId' ? filteredDoors : dropdownData[field.key])?.map((option) => {
                                                let optionId, optionName;
                                                if (field.key === 'deviceId') {
                                                    optionId = option.zktecoDeviceID;
                                                    optionName = option.deviceName;
                                                } else if (field.key === 'doorId') {
                                                    optionId = option.id;
                                                    optionName = option.name;
                                                } else {
                                                    optionId = option.id;
                                                    optionName = option.name;
                                                }
                                                return (
                                                    <option key={optionId} value={optionId}>
                                                        {optionName}
                                                    </option>
                                                );
                                            })}
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
                                    {errors[field.key] && <Form.Text className="text-danger">{errors[field.key]}</Form.Text>}
                                </Form.Group>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>
                    Fechar
                </Button>
                <Button variant="outline-primary" onClick={handleCheckForSave}>
                    Abrir
                </Button>
            </Modal.Footer>
        </Modal >
    );
};