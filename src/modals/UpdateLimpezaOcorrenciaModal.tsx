import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

import { CustomOutlineButton } from '../components/CustomOutlineButton';
import { useTerminals } from '../context/TerminalsContext';
import { LimpezasEOcorrencias } from '../types/Types';

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
    onDuplicate: (entity: Partial<T>) => void
    onUpdate: (entity: T) => Promise<void>;
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
export const UpdateLimpezaOcorrenciaModal = <T extends Entity>({ title, open, onClose, onUpdate, onDuplicate, fields, entity, canMoveNext, canMovePrev, onNext, onPrev }: UpdateModalProps<T>) => {
    const { fetchAllDevices } = useTerminals();
    const [formData, setFormData] = useState<Partial<LimpezasEOcorrencias>>({ ...entity });
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
    const [showValidationErrors, setShowValidationErrors] = useState(false);

    // UseEffect para inicializar o formulário
    useEffect(() => {
        if (open && entity) {
            fetchDropdownOptions();
            setFormData({ ...entity });
        } else {
            setFormData({});
        }
    }, [open, entity]);

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
            const devices = await fetchAllDevices();
            setDropdownData({
                deviceId: devices
            });
        } catch (error) {
            console.error('Erro ao buscar os dados de funcionários, portas e períodos', error);
        }
    };

    // Função para lidar com a mudança do dropdown
    const handleDropdownChange = (key: string, e: React.ChangeEvent<FormControlElement>) => {
        const { value } = e.target;
        const selectedOption = dropdownData[key]?.find((option: any) => {
            switch (key) {
                case 'deviceId':
                    return option.zktecoDeviceID === value;
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

    // Função para manipular o clique no botão Duplicar
    const handleDuplicateClick = () => {
        if (!onDuplicate) return;
        const { id, numeroCamera, ...dataWithoutId } = formData;
        onDuplicate(dataWithoutId as T);
    };

    // Função para lidar com a mudança de valor
    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value, type } = e.target;
        if (showValidationErrors) {
            setShowValidationErrors(false);
        }
        const formattedValue = type === 'number' ? parseFloat(value) || 0 : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: formattedValue
        }));
    };

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
        onUpdate(formData as T);
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static" size='xl' centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Col md={3}>
                            <Form.Group controlId="formDataCreate">
                                <Form.Label>Data de Criação<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-dataCreate">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                        type="datetime-local"
                                        name="dataCreate"
                                        value={formData.dataCreate ? new Date(formData.dataCreate).toISOString().slice(0, 16) : ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['dataCreate'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['dataCreate']}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formResponsavel">
                                <Form.Label>Pessoa Responsável<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-responsavel">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                        type="string"
                                        name="responsavel"
                                        value={formData.responsavel || ''}
                                        onChange={handleChange}
                                        readOnly={true}
                                    />
                                </OverlayTrigger>
                                {errors['responsavel'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['responsavel']}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formDeviceId">
                                <Form.Label>Nome do Local<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-deviceId">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        as="select"
                                        className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                        value={formData.deviceId || ''}
                                        onChange={(e) => handleDropdownChange('deviceId', e)}
                                    >
                                        <option value="">Selecione...</option>
                                        {dropdownData.deviceId?.map((option: any) => {
                                            let optionId, optionName;
                                            switch ('deviceId') {
                                                case 'deviceId':
                                                    optionId = option.zktecoDeviceID;
                                                    optionName = option.deviceName;
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
                                </OverlayTrigger>
                                {errors['deviceId'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['deviceId']}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={9}>
                            <Form.Group controlId="formObservacoes">
                                <Form.Label>Observações</Form.Label>
                                <Form.Control
                                    className="textarea custom-select-font-size"
                                    as="textarea"
                                    rows={3}
                                    name="observacoes"
                                    value={formData.observacoes || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
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
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleDuplicateClick}>
                    Duplicar
                </Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={onClose}>
                    Fechar
                </Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleCheckForSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal >
    );
};