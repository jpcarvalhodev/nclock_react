import { useState, useEffect, ChangeEvent } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import * as apiService from "../helpers/apiService";
import { Doors } from '../helpers/Types';
import { CustomOutlineButton } from '../components/CustomOutlineButton';

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
    onDuplicate?: (entity: Partial<T>) => void;
    onUpdate: (entity: Partial<T>) => Promise<void>;
    entity: T;
    fields: Field[];
    title: string;
    onNext: () => void;
    onPrev: () => void;
    canMoveNext: boolean;
    canMovePrev: boolean;
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
export const UpdateAccessControlModal = <T extends Entity>({ title, open, onClose, onUpdate, onDuplicate, fields, entity, canMoveNext, canMovePrev, onNext, onPrev }: UpdateModalProps<T>) => {
    const [formData, setFormData] = useState<Partial<T>>({ ...entity });
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
    const [showDoorSelectionModal, setShowDoorSelectionModal] = useState(false);
    const [showDoorUpdateModal, setShowDoorUpdateModal] = useState(false);
    const [selectedDoor, setSelectedDoor] = useState<Doors | null>(null);
    const [showValidationErrors, setShowValidationErrors] = useState(false);

    // UseEffect para atualizar o estado do formulário
    useEffect(() => {
        if (entity.acc && entity.acc?.length > 1) {
            setSelectedDoor(null);
        } else if (entity.acc?.length === 1) {
            setSelectedDoor(entity.acc[0]);
            setFormData({
                ...formData,
                doorId: entity.acc[0].doorId,
                timezoneId: entity.acc[0].timezoneId
            });
        }
    }, [entity.acc]);

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
            handleOpen();
            fetchDropdownOptions();
            if (selectedDoor) {
                setFormData({
                    ...formData,
                    doorId: selectedDoor.doorId,
                    timezoneId: selectedDoor.timezoneId,
                    acId: selectedDoor.acId
                });
            }
        }
    }, [open, selectedDoor]);

    // Função para lidar com a seleção de porta caso haja mais de uma
    const handleOpen = () => {
        if (entity.acc && entity.acc.length > 1) {
            setShowDoorSelectionModal(true);
        } else if (entity.acc.length === 1) {
            setSelectedDoor(entity.acc[0]);
            setShowDoorUpdateModal(true);
            setShowDoorSelectionModal(false);
        }
    };

    // Função para lidar com a seleção de porta
    const handleDoorSelection = (e: React.ChangeEvent<FormControlElement>) => {
        const doorId = e.target.value;
        const door = entity.acc.find((d: any) => d.doorId === doorId);
        if (door) {
            setSelectedDoor(door);
            setShowDoorUpdateModal(true);
            setShowDoorSelectionModal(false);
            setFormData(prevState => ({
                ...prevState,
                doorId: door.doorId,
                timezoneId: door.timezoneId,
                acId: door.acId
            }));
        }
    };

    // Função para manipular o clique no botão Duplicar
    const handleDuplicateClick = () => {
        if (!onDuplicate) return;
        const { acId, ...dataWithoutId } = formData;
        onDuplicate(dataWithoutId as Partial<T>);
    };

    // Função para lidar com a confirmação da seleção de porta
    const handleConfirmDoorSelection = () => {
        if (selectedDoor) {
            setShowDoorSelectionModal(false);
            setShowDoorUpdateModal(true);
            setFormData({
                ...formData,
                doorId: selectedDoor.doorId,
                timezoneId: selectedDoor.timezoneId
            });
        } else {
            toast.warn("Por favor, selecione uma porta antes de continuar.");
        }
    };

    // Função para lidar com a mudança de valores nos campos
    const handleChange = (e: ChangeEvent<any>) => {
        const { name, value } = e.target;
        if (showValidationErrors) {
            setShowValidationErrors(false);
        }
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

    // Função para filtrar os dados antes de enviar
    const filterDataForSubmission = (data: Partial<T>): Partial<T> => {
        const acId = data.acc && data.acc.length > 0 ? data.acc[0].acId : undefined;
        return {
            acId: acId,
            employeesId: data.employeesId,
            doorId: data.doorId,
            timezoneId: data.timezoneId,
            createrName: data.createrName
        } as unknown as Partial<T>;
    };

    // Função para verificar se o formulário é válido antes de salvar
    const handleCheckForUpdate = () => {
        if (!isFormValid) {
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        handleUpdate();
    }

    // Função para salvar os dados
    const handleUpdate = () => {
        const dataToSubmit = filterDataForSubmission(formData);
        onUpdate(dataToSubmit as Partial<T>);
    };

    return (
        <div>
            <Modal show={showDoorSelectionModal} onHide={handleCloseAllModals} backdrop="static" style={{ marginTop: 100 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecione uma Porta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="doorSelection">
                        <Form.Label>Porta</Form.Label>
                        <Form.Control as="select" value={selectedDoor?.doorId || ''} onChange={(e) => handleDoorSelection(e)}>
                            <option>Selecione...</option>
                            {entity.acc?.map((door: Doors, index: number) => (
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
            <Modal show={showDoorUpdateModal} onHide={handleCloseAllModals} size="xl" backdrop="static" style={{ marginTop: 100 }}>
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
                    <Button variant="outline-info" onClick={handleDuplicateClick}>
                        Duplicar
                    </Button>
                    <Button variant="outline-secondary" onClick={handleCloseAllModals}>
                        Fechar
                    </Button>
                    <Button variant="outline-primary" onClick={handleCheckForUpdate}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal >
        </div>
    );
};