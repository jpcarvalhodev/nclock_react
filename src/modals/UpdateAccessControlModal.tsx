import { useState, useEffect, ChangeEvent } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import * as apiService from "../helpers/apiService";
import { Doors } from '../helpers/Types';
import { set } from 'date-fns';

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Define a interface Entity
export interface Entity {
    id: string;
    [key: string]: any;
}

// Interface para as propriedades do modal
interface UpdateModalProps<T extends Entity> {
    open: boolean;
    onClose: () => void;
    onDuplicate?: (entity: T) => void;
    onUpdate: (entity: Partial<T>) => Promise<void>;
    entity: T;
    fields: Field[];
    title: string;
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
export const UpdateAccessControlModal = <T extends Entity>({ title, open, onClose, onUpdate, fields, entity }: UpdateModalProps<T>) => {
    const [formData, setFormData] = useState<Partial<T> & { doorTimezoneList: any[] }>({ ...entity, doorTimezoneList: [] });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
    const [showDoorSelectionModal, setShowDoorSelectionModal] = useState(false);
    const [showDoorUpdateModal, setShowDoorUpdateModal] = useState(false);
    const [selectedDoor, setSelectedDoor] = useState<Doors | null>(null);

    // UseEffect para atualizar o estado do formulário
    useEffect(() => {
        if (entity.doors && entity.doors.length > 1) {
            setSelectedDoor(null);
        } else if (entity.doors.length === 1) {
            setSelectedDoor(entity.doors[0]);
            setFormData({
                ...formData,
                doorId: entity.doors[0].doorId,
                timezoneId: entity.doors[0].timezoneId
            });
        }
    }, [entity.doors]);

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
            handleOpen();
            fetchDropdownOptions();
        }
    }, [open]);

    // UseEffect para atualizar a seleção de porta
    useEffect(() => {
        if (selectedDoor) {
            setFormData({
                ...formData,
                doorId: selectedDoor.doorId,
                timezoneId: selectedDoor.timezoneId
            });
        }
    }, [selectedDoor]);

    // Função para lidar com a seleção de porta caso haja mais de uma
    const handleOpen = () => {
        if (entity.doors && entity.doors.length > 1) {
            setShowDoorSelectionModal(true);
        } else if (entity.doors.length === 1) {
            setSelectedDoor(entity.doors[0]);
            setShowDoorUpdateModal(true);
            setShowDoorSelectionModal(false);
        }
    };

    // Função para lidar com a seleção de porta
    const handleDoorSelection = (e: React.ChangeEvent<FormControlElement>) => {
        const doorId = e.target.value;
        const door = entity.doors.find((d: Doors) => d.doorId === doorId);
        if (door) {
            setSelectedDoor(door);
            setShowDoorUpdateModal(true);
            setShowDoorSelectionModal(false);
        }
    };

    // Função para lidar com a confirmação da seleção de porta
    const handleConfirmDoorSelection = () => {
        if (selectedDoor) {
            setShowDoorSelectionModal(false);
            setShowDoorUpdateModal(true);
        } else {
            toast.warn("Por favor, selecione uma porta antes de continuar.");
        }
    };

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

    // Função de fechamento para ambos os modais, para garantir que tudo esteja fechado
    const handleCloseAllModals = () => {
        setShowDoorSelectionModal(false);
        setShowDoorUpdateModal(false);
        setSelectedDoor(null);
        onClose();
    };

    // Função para verificar se o formulário é válido antes de salvar
    const handleCheckForSave = () => {
        if (!isFormValid) {
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

        onUpdate(updatedFormData as Partial<T>);
        handleCloseAllModals();
    };

    return (
        <div>
            <Modal show={showDoorSelectionModal} onHide={handleCloseAllModals} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Selecione uma Porta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="doorSelection">
                        <Form.Label>Porta</Form.Label>
                        <Form.Control as="select" value={selectedDoor?.doorId || ''} onChange={(e) => handleDoorSelection(e)}>
                            <option>Selecione...</option>
                            {entity.doors.map((door: Doors, index: number) => (
                                <option key={index} value={door.doorId}>{door.doorName}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleCloseAllModals}>Fechar</Button>
                    <Button variant="outline-primary" onClick={handleConfirmDoorSelection}>Continuar</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDoorUpdateModal} onHide={handleCloseAllModals} size="xl">
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
                                                className="custom-input-height custom-select-font-size"
                                                value={formData[field.key] || ''}
                                                onChange={(e) => handleDropdownChange(field.key, e)}
                                            >
                                                <option value="">Selecione...</option>
                                                {dropdownData[field.key]?.map((option) => {
                                                    let optionId, optionName;
                                                    switch (field.key) {
                                                        case 'employeesId':
                                                            optionId = option.employeeID;
                                                            optionName = option.shortName;
                                                            break;
                                                        case 'doorId':
                                                            optionId = option.id;
                                                            optionName = option.name;
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
                    <Button variant="outline-secondary" onClick={handleCloseAllModals}>
                        Fechar
                    </Button>
                    <Button variant="outline-primary" onClick={handleCheckForSave}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal >
        </div>
    );
};