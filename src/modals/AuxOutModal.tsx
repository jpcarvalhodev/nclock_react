import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

import { TerminalsContext, DeviceContextType } from '../context/TerminalsContext';
import * as apiService from "../helpers/apiService";
import { AuxOut } from '../helpers/Types';

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Define a interface Entity
export interface Entity {
    id: string;
    [key: string]: any;
}

// Define a interface SaveData
interface SaveData {
    deviceSN: string;
    auxData: FormData;
}

// Interface para as propriedades do modal
interface AuxOutModalProps<T extends Entity> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: SaveData) => void;
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

// Valores iniciais do formulário
const initialValues: Partial<AuxOut> = {
    time: 5
}

// Define o componente
export const AuxOutModal = <T extends Entity>({ title, open, onClose, onSave, fields }: AuxOutModalProps<T>) => {
    const {
        devices
    } = useContext(TerminalsContext) as DeviceContextType;
    const [formData, setFormData] = useState<Partial<AuxOut>>({ nrAuxOut: 0, time: initialValues.time, deviceSN: '' });
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
    const [showValidationErrors, setShowValidationErrors] = useState(false);

    // UseEffect para inicializar o formulário
    useEffect(() => {
        if (open) {
            fetchDropdownOptions();
            setFormData({ ...initialValues });
        }
    }, [open]);

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
            const data = await apiService.fetchOutAuxEnabled();
            const auxWithOptions = data.map((aux: AuxOut) => ({
                ...aux,
                deviceSN: devices.find(device => device.zktecoDeviceID === aux.deviceId)?.serialNumber || ''
            }));
            setDropdownData({
                nrAuxOut: auxWithOptions
            });
        } catch (error) {
            console.error('Erro ao buscar os dados das auxiliares', error);
        }
    };

    // Função para lidar com a mudança do dropdown
    const handleDropdownChange = (key: string, e: React.ChangeEvent<FormControlElement>) => {
        const { value } = e.target;
        const selectedOption = dropdownData[key]?.find((option: any) => {
            switch (key) {
                case 'nrAuxOut':
                    return option.auxNo === parseInt(value, 10);
                default:
                    return false;
            }
        });

        if (selectedOption) {
            setFormData(prevState => ({
                ...prevState,
                [key]: value,
                deviceSN: selectedOption.deviceSN
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [key]: value
            }));
        }
    };

    // Função para lidar com a mudança de valores nos campos
    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        
        if (showValidationErrors) {
            setShowValidationErrors(false);
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: value
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
        const formDataToSend = new FormData();
        formDataToSend.append('nrAuxOut', String(formData.nrAuxOut));
        formDataToSend.append('time', String(formData.time));

        onSave({
            auxData: formDataToSend,
            deviceSN: formData.deviceSN
        });
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static" style={{ marginTop: 100 }}>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formNrAuxOut">
                                <Form.Label>Auxiliar<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        as="select"
                                        className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                        value={formData.nrAuxOut || ''}
                                        onChange={(e) => handleDropdownChange('nrAuxOut', e)}
                                    >
                                        <option value="">Selecione...</option>
                                        {dropdownData.nrAuxOut?.sort((a, b) => a.auxNo - b.auxNo).map((option: any) => {
                                            let optionId, optionName;
                                            switch ('nrAuxOut') {
                                                case 'nrAuxOut':
                                                    optionId = option.auxNo;
                                                    optionName = option.nome;
                                                    break;
                                                default:
                                                    optionId = option.auxNo;
                                                    optionName = option.nome;
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
                                {errors['nrAuxOut'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['nrAuxOut']}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formTime">
                                <Form.Label>Tempo para Abrir<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                        type="number"
                                        name="time"
                                        value={formData.time || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['time'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['time']}</div>}
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button variant="outline-secondary" onClick={onClose}>
                    Fechar
                </Button>
                <Button variant="outline-success" onClick={handleCheckForSave}>
                    Abrir
                </Button>
            </Modal.Footer>
        </Modal >
    );
};