import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import * as apiService from "../helpers/apiService";
import { DeviceContextType, TerminalsContext } from '../context/TerminalsContext';

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Define a interface Entity
export interface Entity {
    id: string;
    [key: string]: any;
}

// Interface para as propriedades do modal
interface UpdateModalProps<T extends Entity> {
    title: string;
    open: boolean;
    onClose: () => void;
    onUpdate: (entity: T) => Promise<void>;
    entity: T;
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
export const UpdateRecolhaMoedeiroModal = <T extends Entity>({ title, open, onClose, onUpdate, entity, fields }: UpdateModalProps<T>) => {
    const {
        devices,
    } = useContext(TerminalsContext) as DeviceContextType;
    const [formData, setFormData] = useState<Partial<T>>({ ...entity });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});

    // UseEffect para inicializar o formulário
    useEffect(() => {
        if (open) {
            fetchDropdownOptions();
            setFormData({ ...entity });
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
                case 'deviceID':
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

    // Função para lidar com a mudança de valores nos campos
    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value, type } = e.target;
        const formattedValue = type === 'number' ? parseFloat(value) || 0 : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: formattedValue,
            valorTotal: name === 'numeroMoedas' ? (formattedValue * 0.50).toFixed(2) : prevState.valorTotal
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
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static" size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Col md={2}>
                            <Form.Group controlId="formDataRecolha">
                                <Form.Label>Data da Recolha<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-dataRecolha">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="datetime-local"
                                        name="dataRecolha"
                                        value={formData.dataRecolha ? new Date(formData.dataRecolha).toISOString().slice(0, 16) : ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                            </Form.Group>
                            <Form.Group controlId="formPessoaResponsavel">
                                <Form.Label>Nome do Utilizador<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-pessoaResponsavel">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="string"
                                        name="pessoaResponsavel"
                                        value={formData.pessoaResponsavel || ''}
                                        onChange={handleChange}
                                        readOnly={true}
                                    />
                                </OverlayTrigger>
                                {errors['pessoaResponsavel'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['pessoaResponsavel']}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="formDeviceId">
                                <Form.Label>Nome do Local<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-deviceId">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        as="select"
                                        className="custom-input-height custom-select-font-size"
                                        value={formData.deviceID || ''}
                                        onChange={(e) => handleDropdownChange('deviceID', e)}
                                    >
                                        <option value="">Selecione...</option>
                                        {devices?.map((option: any) => {
                                            let optionId, optionName;
                                            switch ('deviceID') {
                                                case 'deviceID':
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
                            <Form.Group controlId="formDataFimRecolha">
                                <Form.Label>Data de Fim<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-dataFimRecolha">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="datetime-local"
                                        name="dataFimRecolha"
                                        value={formData.dataFimRecolha ? new Date(formData.dataFimRecolha).toISOString().slice(0, 16) : ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="formNumeroMoedas">
                                <Form.Label>Moedas Recolha<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-numeroMoedas">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="number"
                                        name="numeroMoedas"
                                        value={formData.numeroMoedas === undefined ? '' : formData.numeroMoedas}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['numeroMoedas'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['numeroMoedas']}</div>}
                            </Form.Group>
                            <Form.Group controlId="formNumeroMoedasSistema">
                                <Form.Label>Moedas Sistema<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-numeroMoedasSistema">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="number"
                                        name="numeroMoedasSistema"
                                        value={formData.numeroMoedasSistema === undefined ? '' : formData.numeroMoedasSistema}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </OverlayTrigger>
                                {errors['numeroMoedasSistema'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['numeroMoedasSistema']}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="formValorTotalRecolhido">
                                <Form.Label>Valor Recolha<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-valorTotalRecolhido">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="number"
                                        name="valorTotalRecolhido"
                                        value={formData.valorTotalRecolhido || ''}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </OverlayTrigger>
                                {errors['valorTotalRecolhido'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['valorTotalRecolhido']}</div>}
                            </Form.Group>
                            <Form.Group controlId="formValorTotalSistema">
                                <Form.Label>Valor Sistema<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-valorTotalSistema">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="number"
                                        name="valorTotalSistema"
                                        value={formData.valorTotalSistema || ''}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </OverlayTrigger>
                                {errors['valorTotalSistema'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['valorTotalSistema']}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="formDiferencaMoedas">
                                <Form.Label>Diferença Recolha<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-diferencaMoedas">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="number"
                                        name="diferencaMoedas"
                                        value={formData.diferencaMoedas || ''}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </OverlayTrigger>
                                {errors['diferencaMoedas'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['diferencaMoedas']}</div>}
                            </Form.Group>
                            <Form.Group controlId="formDiferencaEuros">
                                <Form.Label>Diferença Euros<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-diferencaEuros">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="number"
                                        name="diferencaEuros"
                                        value={formData.diferencaEuros || ''}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </OverlayTrigger>
                                {errors['diferencaEuros'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['diferencaEuros']}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={10}>
                            <Form.Group controlId="formObservacoes">
                                <Form.Label>Observações</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="observacoes"
                                    className="textarea custom-select-font-size"
                                    value={formData.observacoes || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
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