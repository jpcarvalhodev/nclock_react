import { ChangeEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
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
    const [formData, setFormData] = useState<Partial<T> & { doorTimezoneList: any[] }>({ ...initialValues, doorTimezoneList: [], currentDoorId: '', currentTimezoneId: '', createrName: localStorage.getItem('username') });
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
    const [showValidationErrors, setShowValidationErrors] = useState(false);

    // UseEffect para validar o formulário
    useEffect(() => {
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

        if (formData.doorTimezoneList.length === 0) {
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Função para buscar as opções do dropdown
    const fetchDropdownOptions = async () => {
        try {
            const employee = await apiService.fetchAllEmployees();
            const sortedEmployee = employee.sort((a: { enrollNumber: number; }, b: { enrollNumber: number; }) => a.enrollNumber - b.enrollNumber);
            const door = await apiService.fetchAllDoors();
            const timezone = await apiService.fetchAllTimePeriods();
            const filteredDoors = door.filter((door: Doors) => door.doorNo === 3 || door.doorNo === 4);
            setDropdownData({
                employeesId: sortedEmployee,
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
                createrName: localStorage.getItem('username'),
            });
            fetchDropdownOptions();
        } else {
            setFormData({
                ...initialValues,
                doorTimezoneList: []
            });
        }
    }, [open]);

    // Função para adicionar um período e porta
    const addDoorTimezone = () => {
        if (formData.doorTimezoneList.some(entry => entry.doorId === formData.currentDoorId && entry.timezoneId === formData.currentTimezoneId)) {
            toast.warn('Esta porta e período já foram adicionados!');
            return;
        }
        if (formData.currentDoorId && formData.currentTimezoneId) {
            const newEntry = {
                doorId: formData.currentDoorId,
                doorName: dropdownData.doorId.find(door => door.id === formData.currentDoorId)?.name,
                timezoneId: formData.currentTimezoneId,
                timezoneName: dropdownData.timezoneId.find(timezone => timezone.id === formData.currentTimezoneId)?.name
            };
            setFormData(prevState => ({
                ...prevState,
                doorTimezoneList: [...prevState.doorTimezoneList, newEntry],
                currentDoorId: '',
                currentTimezoneId: ''
            }));
        } else {
            toast.warn('Selecione uma porta e um período antes de adicionar!');
        }
    };

    // Função para remover um período e porta
    const removeDoorTimezone = (index: number) => {
        setFormData(prevState => ({
            ...prevState,
            doorTimezoneList: prevState.doorTimezoneList.filter((_, idx) => idx !== index)
        }));
    };

    // Função para fechar o modal
    const handleClose = () => {
        window.location.reload();
        onClose();
    }

    // Função para verificar se o formulário é válido antes de salvar
    const handleCheckForSave = () => {
        const formIsValid = validateForm();
        if (!formIsValid) {
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar.');
            return;
        }
        handleSave();
    }

    // Função para salvar os dados
    const handleSave = () => {
        const { currentDoorId, currentTimezoneId, ...restFormData } = formData;
        onSave(restFormData as Partial<T>);
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static" size="lg" style={{ marginTop: 100 }}>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Col md={4}>
                            <Form.Group controlId="formEmployeesId">
                                <Form.Label>Funcionário<span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    as="select"
                                    value={formData.employeesId || ''}
                                    onChange={e => setFormData({ ...formData, employeesId: e.target.value })}
                                    className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                >
                                    <option value="">Selecione...</option>
                                    {dropdownData.employeesId && dropdownData.employeesId.map(option => (
                                        <option key={option.employeeID} value={option.employeeID}>
                                            {`${option.enrollNumber} - ${option.shortName}`}
                                        </option>
                                    ))}
                                </Form.Control>
                                {errors.employeesId && <Form.Text className="text-danger">{errors.employeesId}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Porta <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    as="select"
                                    value={formData.currentDoorId}
                                    onChange={e => setFormData({ ...formData, currentDoorId: e.target.value })}
                                    className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                >
                                    <option value="">Selecione a Porta...</option>
                                    {dropdownData.doorId && dropdownData.doorId.map(option => (
                                        <option key={option.id} value={option.id}>{`${option.doorNo} - ${option.name}`}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Período <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    as="select"
                                    value={formData.currentTimezoneId}
                                    onChange={e => setFormData({ ...formData, currentTimezoneId: e.target.value })}
                                    className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                >
                                    <option value="">Selecione o Período...</option>
                                    {dropdownData.timezoneId && dropdownData.timezoneId.map(option => (
                                        <option key={option.id} value={option.id}>{option.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col className="d-flex align-items-end">
                            <Button style={{ height: 30, display: 'flex', alignItems: 'center' }} variant="outline-primary" onClick={addDoorTimezone}>Adicionar</Button>
                        </Col>
                    </Row>
                    <Row>
                        {formData.doorTimezoneList.map((entry, index) => (
                            <Col md={8} key={index}>
                                <div className="d-flex justify-content-between align-items-center p-2 border rounded my-2">
                                    Porta: {entry.doorName}, Período: {entry.timezoneName}
                                    <Button variant="danger" size="sm" onClick={() => removeDoorTimezone(index)}>Remover</Button>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button variant="outline-secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button variant="outline-primary" onClick={handleCheckForSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};