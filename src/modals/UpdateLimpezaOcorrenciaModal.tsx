import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { LimpezasEOcorrencias } from '../helpers/Types';
import { CustomOutlineButton } from '../components/CustomOutlineButton';
import * as apiService from "../helpers/apiService";

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
    const [formData, setFormData] = useState<Partial<LimpezasEOcorrencias>>({ ...entity });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});

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

    // Função para buscar os dados dos dropdowns
    const fetchDropdownOptions = async () => {
        try {
            const devices = await apiService.fetchAllDevices();
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
        const formattedValue = type === 'number' ? parseFloat(value) || 0 : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: formattedValue
        }));
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
        onUpdate(formData as T);
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static" size='xl'>
            <Modal.Header closeButton>
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
                                        className="custom-input-height custom-select-font-size"
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
                                        className="custom-input-height custom-select-font-size"
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
                                        className="custom-input-height custom-select-font-size"
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
            <Modal.Footer>
                <CustomOutlineButton icon="bi-arrow-left" onClick={onPrev} disabled={!canMovePrev} />
                <CustomOutlineButton className='arrows-modal' icon="bi-arrow-right" onClick={onNext} disabled={!canMoveNext} />
                <Button variant="outline-info" onClick={handleDuplicateClick}>
                    Duplicar
                </Button>
                <Button variant="outline-secondary" onClick={onClose}>
                    Fechar
                </Button>
                <Button variant="outline-primary" onClick={handleCheckForSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal >
    );
};