import { useEffect, useState } from 'react';
import { Modal, Button, Form, InputGroup, FormControl, Col, OverlayTrigger, Tooltip, Row, Tabs, Tab } from 'react-bootstrap';
import { useLicense } from '../context/LicenseContext';
import { License } from '../helpers/Types';
import { toast } from 'react-toastify';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Define o tipo FormControlElement
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Define a interface Entity
export interface Entity {
    [key: string]: any;
    id: string;
}

// Define a interface Field	
interface Field {
    key: string;
    label: string;
    type: string;
    required?: boolean;
    optionsUrl?: string;
    validate?: (value: any) => boolean;
    errorMessage?: string;
}

// Define a as propriedades do modal
interface UpdateModalProps<T> {
    open: boolean;
    onClose: () => void;
    onUpdate: (key: string, formData: License[]) => Promise<void>;
    fields: Field[];
}

export const LicenseModal = <T extends Entity>({ open, onClose, onUpdate, fields }: UpdateModalProps<T>) => {
    const { fetchAllLicenses, fetchAllLicensesWithoutKey } = useLicense();
    const [formData, setFormData] = useState<Partial<License>>({});
    const [isCheckVisible, setIsCheckVisible] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [key, setKey] = useState<string>('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    // Atualiza o estado de visibilidade do primeiro modal baseado na prop open
    useEffect(() => {
        setIsCheckVisible(open);
    }, [open]);

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

    // Função para atualizar o estado da licença
    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => setKey(e.target.value);

    // Função para verificar a chave de licença
    const verifyKey = async () => {
        try {
            const isKeyValid = await fetchAllLicenses(key);
            if (isKeyValid && isKeyValid !== null && isKeyValid !== undefined && Object.keys(isKeyValid).length > 0) {
                setFormData(isKeyValid);
                setIsCheckVisible(false);
                showModal();
            } else {
                toast.warn('Chave inválida, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao verificar chave:', error);
            toast.warn('Não foi possível verificar a chave, tente novamente.');
        }
    };

    // Função para mostrar o modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Função para fechar o modal
    const handleClose = () => {
        setIsCheckVisible(false);
        setIsModalVisible(false);
        fetchAllLicensesWithoutKey();
        navigate('/dashboard');
    };

    // Função para atualizar o estado do formulário
    const handleChange = (event: React.ChangeEvent<FormControlElement>) => {
        const { name, value, type, checked } = event.target as HTMLInputElement;

        if (name.includes('.')) {
            const [productName, productProperty] = name.split('.');
            setFormData(prevState => ({
                ...prevState,
                [productName]: {
                    ...prevState[productName],
                    [productProperty]: type === 'checkbox' ? checked : (value === '' ? defaultValueFor(productProperty) : value)
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    // Função para definir valores padrões com base no tipo de campo
    const defaultValueFor = (property: string) => {
        switch (property) {
            case 'createDate':
                return null;
            case 'devices':
            case 'users':
            case 'validacao':
                return 0;
            case 'enable':
                return false;
            default:
                return null;
        }
    };

    // Função para atualizar os dados
    const handleUpdate = () => {
        const isEntidadeNumberValid = formData.entidadeNumber && formData.entidadeNumber > 0;
        const isNifValid = formData.nif && formData.nif > 0;
        if (!isFormValid || !isEntidadeNumberValid || !isNifValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        } else {
            console.log('formData:', formData);
            setIsModalVisible(false);
            onUpdate(key, formData as License[]);
            onClose();
        }
    };

    // Função para renderizar os softwares
    function renderFormControl(product: string, prop: string) {
        const value = formData[product][prop];

        return (
            <div>
                <Form.Label>{getLabel(prop)}</Form.Label>
                {(() => {
                    switch (prop) {
                        case 'enable':
                            return (
                                <Form.Check
                                    type="switch"
                                    id={`switch-${product}-${prop}`}
                                    checked={value}
                                    onChange={handleChange}
                                    name={`${product}.${prop}`}
                                />
                            );
                        case 'users':
                        case 'validacao':
                        case 'devices':
                            return (
                                <Form.Control
                                    type="text"
                                    name={`${product}.${prop}`}
                                    value={value || 0}
                                    onChange={handleChange}
                                    className="custom-input-height custom-select-font-size"
                                    min={prop === 'devices' ? '0' : undefined}
                                />
                            );
                        case 'sn':
                            return (
                                <Form.Control
                                    type="text"
                                    name={`${product}.${prop}`}
                                    value={value || ''}
                                    onChange={handleChange}
                                    className="custom-input-height custom-select-font-size"
                                />
                            );
                        default:
                            return (
                                <Form.Control
                                    type="text"
                                    name={`${product}.${prop}`}
                                    value={value || ''}
                                    onChange={handleChange}
                                    className="custom-input-height custom-select-font-size"
                                />
                            );
                    }
                })()}
            </div>
        );
    }

    // Função para obter o label
    function getLabel(prop: string) {
        switch (prop) {
            case 'enable':
                return 'Activo';
            case 'users':
                return 'Utilizadores';
            case 'validacao':
                return 'Meses de Validação';
            case 'devices':
                return 'Dispositivos';
            case 'sn':
                return 'Número de Série';
            default:
                return prop.charAt(0).toUpperCase() + prop.slice(1);
        }
    }

    return (
        <div>
            <Modal show={isCheckVisible} onHide={onClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Inserir Chave</Modal.Title>
                </Modal.Header>
                <InputGroup className='license-check-modal'>
                    <FormControl
                        placeholder="Insira a chave de licenciamento"
                        value={key}
                        onChange={handleKeyChange}
                        type='password'
                    />
                </InputGroup>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                    <Button style={{ width: '40%' }} variant="outline-primary" onClick={verifyKey}>Verificar Chave</Button>
                </div>
            </Modal>
            <Modal show={isModalVisible} onHide={handleClose} backdrop="static" size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Licenciamento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row style={{ marginBottom: 20 }}>
                        <Col md={3}>
                            <Form.Group controlId="formEntidadeNumber">
                                <Form.Label>
                                    Número da Entidade <span style={{ color: 'red' }}>*</span>
                                </Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-entidadeNumber">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        type="number"
                                        className="custom-input-height custom-select-font-size"
                                        value={formData.entidadeNumber || ''}
                                        onChange={handleChange}
                                        name="entidadeNumber"
                                        required
                                    />
                                </OverlayTrigger>
                                {errors.entidadeNumber && <Form.Text className="text-danger">{errors.entidadeNumber}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formNif">
                                <Form.Label>
                                    NIF <span style={{ color: 'red' }}>*</span>
                                </Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-nif">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        type="number"
                                        className="custom-input-height custom-select-font-size"
                                        value={formData.nif || ''}
                                        onChange={handleChange}
                                        name="nif"
                                        required
                                    />
                                </OverlayTrigger>
                                {errors.nif && <Form.Text className="text-danger">{errors.nif}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Tabs defaultActiveKey={Object.keys(formData).find(key => typeof formData[key] === 'object' && formData[key] !== null)} id="product-tabs" className='nav-modal'>
                        {Object.keys(formData)
                            .filter(key => typeof formData[key] === 'object' && formData[key] !== null)
                            .map(product => (
                                <Tab
                                    eventKey={product}
                                    title={product.toUpperCase()}
                                    key={product}
                                    tabClassName={formData[product].enable ? 'enabled-tab' : ''}
                                >
                                    <Row>
                                        {Object.entries(formData[product])
                                            .filter(([propKey]) => propKey !== 'createDate')
                                            .map(([prop, value], index) => (
                                                <Col md={3} key={`${product}-${prop}`} className='mt-3'>
                                                    <Form.Group controlId={`form${product}${prop}`}>
                                                        {renderFormControl(product, prop)}
                                                    </Form.Group>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </Tab>
                            ))
                        }
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="outline-primary" onClick={handleUpdate}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};