import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

import * as apiService from "../api/apiService";
import { useKiosk } from '../context/KioskContext';
import { useNavbar } from '../context/NavbarContext';
import { useTerminals } from '../context/TerminalsContext';
import { RecolhaMoedeiroEContador } from '../types/Types';

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Interface para as propriedades do modal
interface CreateModalProps<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    fields: Field[];
    initialValuesData: Partial<T>;
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

// Valores iniciais
const initialValues: Partial<RecolhaMoedeiroEContador> = {
    dataFimRecolha: new Date().toISOString().slice(0, 16) as unknown as Date,
};

// Define o componente
export const CreateRecolhaMoedeiroEContadorModal = <T extends Record<string, any>>({ title, open, onClose, onSave, fields, initialValuesData }: CreateModalProps<T>) => {
    const { devices } = useTerminals();
    const { fetchAllCoin } = useKiosk();
    const { kioskConfig } = useNavbar();
    const [formData, setFormData] = useState<Partial<RecolhaMoedeiroEContador>>({ ...initialValues, ...initialValuesData });
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [showValidationErrors, setShowValidationErrors] = useState(false);

    // UseEffect para inicializar o formulário
    useEffect(() => {
        if (open) {
            fetchRecolhas();
            const username = localStorage.getItem("username") || "";
            if (initialValuesData.deviceID) {
                setFormData({ ...initialValuesData });
            } else {
                setFormData({ ...initialValues, pessoaResponsavel: username });
            }
        } else {
            setFormData({});
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

    // Buscar as recolhas para o moedeiro
    const fetchRecolhas = async () => {
        try {
            const recolhas = await fetchAllCoin();
            const recolhaDevice = recolhas.find((recolha: RecolhaMoedeiroEContador) => devices.some(device => device.zktecoDeviceID === recolha.deviceID));
            if (recolhas && recolhas.length > 0 && recolhaDevice) {
                const lastRecolha = recolhas.sort((a: RecolhaMoedeiroEContador, b: RecolhaMoedeiroEContador) => new Date(b.dataFimRecolha).getTime() - new Date(a.dataFimRecolha).getTime())[0];
                setFormData(prevState => ({
                    ...prevState,
                    dataRecolha: new Date(new Date(lastRecolha.dataFimRecolha).getTime()).toISOString().slice(0, 16)
                }));
            } else {
                setFormData(prevState => ({
                    ...prevState,
                    dataRecolha: new Date().toISOString().slice(0, 16)
                }));
            }
        } catch (error) {
            console.error('Erro ao buscar as recolhas', error);
        }
    }

    // Função para lidar com a mudança do dropdown
    const handleDropdownChange = async (key: string, e: React.ChangeEvent<FormControlElement>) => {
        const { value } = e.target;
        const selectedOption = devices?.find((option: any) => {
            switch (key) {
                case 'deviceID':
                    return option.zktecoDeviceID === value;
                default:
                    return false;
            }
        });

        if (selectedOption) {
            setFormData(prevState => ({
                ...prevState,
                [key]: value
            }));

            try {
                const count = await apiService.fetchContagemSNTransacoes();
                const deviceCount = count.find((c: any) => c.serialNumber === selectedOption.serialNumber);
                if (selectedOption.serialNumber === deviceCount.serialNumber) {
                    setFormData(prevState => ({
                        ...prevState,
                        valorTotalSistema: kioskConfig.amount ? deviceCount.contagemTransacoes * kioskConfig.amount : 0,
                        numeroMoedasSistema: deviceCount.contagemTransacoes,
                        diferencaMoedas: (formData.numeroMoedas || 0) - (deviceCount.contagemTransacoes || 0),
                        diferencaEuros: (formData.valorTotalRecolhido || 0) - (deviceCount.contagemTransacoes * (kioskConfig.amount ?? 0))

                    }));
                }
            } catch (error) {
                console.error('Erro ao buscar as contagens para o número serial', error);
            }
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
        let formattedValue = value;

        if (showValidationErrors) {
            setShowValidationErrors(false);
        }

        setFormData(prevState => {
            const updatedState = {
                ...prevState,
                [name]: formattedValue
            };

            if (name === 'numeroMoedas') {
                updatedState.valorTotalRecolhido = parseFloat((formattedValue * (kioskConfig.amount || 0)).toFixed(2));
                updatedState.deviceID = "";
            }

            if (['numeroMoedas', 'valorTotalRecolhido'].includes(name)) {
                updatedState.diferencaEuros = (updatedState.valorTotalRecolhido || 0) - (updatedState.numeroMoedasSistema || 0);
            }

            return updatedState;
        });
    };

    // Função para lidar com o fecho
    const handleClose = () => {
        setFormData({});
        setShowValidationErrors(false);
        onClose();
    }

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
        onSave(formData as T);
        handleClose();
    };

    return (
        <Modal show={open} onHide={handleClose} backdrop="static" size='xl' centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Col md={2}>
                            <Form.Group controlId="formDataFimRecolha">
                                <Form.Label>Data de Registo</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="datetime-local"
                                    name="dataFimRecolha"
                                    value={formData.dataFimRecolha ? new Date(formData.dataFimRecolha).toISOString().slice(0, 16) : ''}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="formValorTotalSistema">
                                <Form.Label>Valor Sistema</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="text"
                                    name="valorTotalSistema"
                                    value={formData.valorTotalSistema === undefined ? "0,00€" : `${formData.valorTotalSistema.toFixed(2).replace(".", ",")}€`}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="formPessoaResponsavel">
                                <Form.Label>Nome do Utilizador</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="string"
                                    name="pessoaResponsavel"
                                    value={formData.pessoaResponsavel || ''}
                                    onChange={handleChange}
                                    readOnly={true}
                                />
                            </Form.Group>
                            <Form.Group controlId="formDiferencaMoedas">
                                <Form.Label>Diferença Recolha</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="number"
                                    name="diferencaMoedas"
                                    value={formData.diferencaMoedas || 0}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="formNumeroMoedas">
                                <Form.Label>Moedas Recolhidas<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-numeroMoedas">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                        type="number"
                                        name="numeroMoedas"
                                        value={formData.numeroMoedas || ''}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['numeroMoedas'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['numeroMoedas']}</div>}
                            </Form.Group>
                            <Form.Group controlId="formDiferencaEuros">
                                <Form.Label>Diferença Valor</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="text"
                                    name="diferencaEuros"
                                    value={formData.diferencaEuros === undefined ? "0,00€" : `${formData.diferencaEuros.toFixed(2).replace(".", ",")}€`}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="formNumeroMoedasSistema">
                                <Form.Label>Moedas Sistema</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="number"
                                    name="numeroMoedasSistema"
                                    value={formData.numeroMoedasSistema || 0}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="formDeviceId">
                                <Form.Label>Nome do Local<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-deviceId">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        as="select"
                                        className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                        value={formData.deviceID || ''}
                                        onChange={(e) => handleDropdownChange('deviceID', e)}
                                        disabled={!formData.numeroMoedas || formData.numeroMoedas === 0}
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
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="formValorTotalRecolhido">
                                <Form.Label>Valor Recolhido</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="text"
                                    name="valorTotalRecolhido"
                                    value={formData.valorTotalRecolhido === undefined ? "0,00€" : `${formData.valorTotalRecolhido.toFixed(2).replace(".", ",")}€`}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="formDataRecolha">
                                <Form.Label>Data de Recolha</Form.Label>
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
                        </Col>
                        <Col md={2}>
                            <div style={{ backgroundColor: '#d1d1d1', padding: '10px', borderRadius: '5px', textAlign: "center" }}>
                                <p style={{ margin: '0' }}>Observação: Insira primeiro a quantidade de moedas e depois selecione o local.</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
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
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleClose}>
                    Fechar
                </Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleCheckForSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal >
    );
};
