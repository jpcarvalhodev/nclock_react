import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import * as apiService from "../helpers/apiService";
import { CustomOutlineButton } from '../components/CustomOutlineButton';

// Define a interface para os itens de campo
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
    validate?: (value: any) => boolean;
}

// Define as propriedades do componente
interface UpdateModalProps<T extends Entity> {
    open: boolean;
    onClose: () => void;
    onUpdate: (entity: T) => Promise<void>;
    entity: T;
    fields: Field[];
    title: string;
    onNext: () => void;
    onPrev: () => void;
    canMoveNext: boolean;
    canMovePrev: boolean;
}

// Define o componente
export const UpdateModalDoor = <T extends Entity>({ title, open, onClose, onUpdate, entity, fields, canMoveNext, canMovePrev, onNext, onPrev }: UpdateModalProps<T>) => {
    const [formData, setFormData] = useState<Partial<T>>({ ...entity });
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
    const [showValidationErrors, setShowValidationErrors] = useState(false);

    // Usa useEffect para inicializar o formulário
    useEffect(() => {
        if (open && entity) {
            fetchDropdownOptions();
            setFormData({ ...entity });
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
            const devices = await apiService.fetchAllDevices();
            const timezones = await apiService.fetchAllTimePeriods();
            setDropdownData({
                devId: devices,
                timezoneId: timezones
            });
        } catch (error) {
            console.error('Erro ao buscar os dados de dispositivos e períodos', error);
        }
    };

    // Função para lidar com a mudança do dropdown
    const handleDropdownChange = (key: string, e: React.ChangeEvent<FormControlElement>) => {
        const { value } = e.target;
        const selectedOption = dropdownData[key]?.find((option: any) => {
            switch (key) {
                case 'devID':
                    return option.zktecoDeviceID === value;
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

    // Função para lidar com a mudança de valores nos campos
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const parsedValue = type === 'checkbox' ? checked : value;
        if (showValidationErrors) {
            setShowValidationErrors(false);
        }
        setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
    };

    // Função para salvar os dados
    const handleUpdate = () => {
        if (!isFormValid) {
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        onUpdate(formData as T);
    };

    // Define as seleções de modo de verificação
    const verifyModeOptions = [
        { value: 3, label: 'Somente Senha' },
        { value: 4, label: 'Somente Cartão' },
        { value: 7, label: 'Cartão/Senha' },
        { value: 11, label: 'Cartão + Senha' },
    ];

    // Define as seleções de tipo de sensor
    const doorSensorTypes = [
        { value: 0, label: 'Nenhum' },
        { value: 1, label: 'Normalmente Aberto' },
        { value: 2, label: 'Normalmente Fechado' }
    ];

    return (
        <Modal show={open} onHide={onClose} backdrop="static" size="xl" style={{ marginTop: 100 }}>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Col md={3}>
                            <Form.Group controlId="formEnabled" className='d-flex justify-content-between mt-3' style={{ marginBottom: 13.5 }}>
                                <Form.Label>Activo</Form.Label>
                                <Form.Check
                                    type="switch"
                                    name="enabled"
                                    checked={!!formData.enabled}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formAllowSuaccessLock" className='d-flex justify-content-between mt-3' style={{ marginBottom: 4 }}>
                                <Form.Label>Permitir Acesso de SU ao Bloqueio</Form.Label>
                                <Form.Check
                                    type="switch"
                                    name="allowSuaccessLock"
                                    value={formData.allowSuaccessLock}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formDoorSensorStatus">
                                <Form.Label>Tipo de Sensor de Porta</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    as="select"
                                    name="doorSensorStatus"
                                    value={formData.doorSensorStatus}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione...</option>
                                    {doorSensorTypes.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formInApbDuration">
                                <Form.Label>Duração Antirretorno Fechadura</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="number"
                                    name="inApbDuration"
                                    value={formData.inApbDuration}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formDevId">
                                <Form.Label>Dispositivo</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="custom-input-height custom-select-font-size"
                                    value={formData.devId || ''}
                                    onChange={(e) => handleDropdownChange('devId', e)}
                                >
                                    <option value="">Selecione...</option>
                                    {dropdownData.devId?.map((option: any) => {
                                        let optionId, optionName;
                                        switch ('devId') {
                                            case 'devId':
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
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formBackLock" className='d-flex justify-content-between mt-3' style={{ marginBottom: 13.5 }}>
                                <Form.Label>Estado da Fechadura</Form.Label>
                                <Form.Check
                                    type="switch"
                                    name="backLock"
                                    checked={!!formData.backLock}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCombopenInterval">
                                <Form.Label>Intervalo entre Identificações</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="number"
                                    name="combopenInterval"
                                    value={formData.combopenInterval}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formLockDelay">
                                <Form.Label>Duração da Abertura da Fechadura</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="number"
                                    name="lockDelay"
                                    value={formData.lockDelay}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formSensorDelay">
                                <Form.Label>Atraso do Sensor de Porta</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="number"
                                    name="sensorDelay"
                                    value={formData.sensorDelay}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formTimezoneId">
                                <Form.Label>Período</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="custom-input-height custom-select-font-size"
                                    value={formData.timezoneId || ''}
                                    onChange={(e) => handleDropdownChange('timezoneId', e)}
                                >
                                    <option value="">Selecione...</option>
                                    {dropdownData.timezoneId?.map((option: any) => {
                                        let optionId, optionName;
                                        switch ('timezoneId') {
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
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formName">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="string"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formDelayOpenTime">
                                <Form.Label>Atraso de Tempo de Abertura</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="number"
                                    name="delayOpenTime"
                                    value={formData.delayOpenTime}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formExtDevId">
                                <Form.Label>Dispositivo Externo</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="string"
                                    name="extDevId"
                                    value={formData.extDevId}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formActionInterval">
                                <Form.Label>Intervalo entre Operações</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="number"
                                    name="actionInterval"
                                    value={formData.actionInterval}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formSupperPwd">
                                <Form.Label>Password de Emergência</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="password"
                                    name="supperPwd"
                                    value={formData.supperPwd}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formDoorNo">
                                <Form.Label>Número de Porta</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="number"
                                    name="doorNo"
                                    value={formData.doorNo}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="formActiveTimesegId">
                                <Form.Label>Faixa Horária Activa</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="number"
                                    name="activeTimesegId"
                                    value={formData.activeTimesegId}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formForcePwd">
                                <Form.Label>Password de Coação</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="password"
                                    name="forcePwd"
                                    value={formData.forcePwd}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassmodeTimesegId">
                                <Form.Label>Faixa Horária Modo de Passagem</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="string"
                                    name="passmodeTimesegId"
                                    value={formData.passmodeTimesegId}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formVerifyMode">
                                <Form.Label>Modo de Verificação</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    as="select"
                                    name="verifyMode"
                                    value={formData.verifyMode}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione...</option>
                                    {verifyModeOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </Form.Control>
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
                <Button variant="outline-secondary" onClick={onClose}>
                    Fechar
                </Button>
                <Button variant="outline-primary" onClick={handleUpdate}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal >
    );
};