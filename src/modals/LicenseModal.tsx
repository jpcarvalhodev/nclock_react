import { useEffect, useState } from 'react';
import { Modal, Button, Form, InputGroup, FormControl, Col, OverlayTrigger, Tooltip, Row, Tabs, Tab } from 'react-bootstrap';
import { useLicense } from '../context/LicenseContext';
import { License } from '../helpers/Types';
import { toast } from 'react-toastify';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import hidepass from '../assets/img/login/hidepass.png';
import showpass from '../assets/img/login/showpass.png';
import { set } from 'date-fns';

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
    const [showPassword, setShowPassword] = useState(false);

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
                const storedNif = localStorage.getItem('nif');
                let licenseObj: Partial<License> = {};
                if (Array.isArray(isKeyValid)) {
                    licenseObj = isKeyValid.find(key => key.nif === storedNif) || isKeyValid[0];
                    setFormData(licenseObj);
                }
                setIsCheckVisible(false);
                showModal();
            } else {
                toast.warn('Password inválida, tente novamente.');
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
            let parsedValue: string | number | boolean | null = value;

            if (type === 'checkbox') {
                parsedValue = checked;
            } else if (type === 'number') {
                parsedValue = Number(value) || defaultValueFor(productProperty);
            } else if (productProperty === 'sn') {
                parsedValue = value.replace(/\s+/g, '');
            } else {
                parsedValue = value || defaultValueFor(productProperty);
            }

            setFormData(prevState => ({
                ...prevState,
                [productName]: {
                    ...prevState[productName],
                    [productProperty]: parsedValue
                }
            }));
        } else {
            let parsedValue: string | number | boolean | null = value;

            if (type === 'checkbox') {
                parsedValue = checked;
            } else if (type === 'number') {
                parsedValue = Number(value) || defaultValueFor(name);
            } else if (name === 'sn') {
                parsedValue = value.replace(/\s+/g, '');
            } else {
                parsedValue = value || defaultValueFor(name);
            }

            setFormData(prevState => ({
                ...prevState,
                [name]: parsedValue
            }));
        }
    }

    // Função para definir valores padrões com base no tipo de campo
    const defaultValueFor = (property: string) => {
        switch (property) {
            case 'createDate':
            case 'pacote':
                return null;
            default:
                return null;
        }
    };

    // Função para atualizar os dados
    const handleUpdate = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        } else {
            onUpdate(key, [{ ...formData }] as License[]);
            setIsModalVisible(false);
        }
    };

    // Alterna a visibilidade da password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                        case 'validacao':
                            return (
                                <Form.Control
                                    type="number"
                                    name={`${product}.${prop}`}
                                    value={value || ''}
                                    onChange={handleChange}
                                    className="custom-input-height custom-select-font-size"
                                />
                            );
                        case 'pacote':
                        case 'createDate':
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
                    <Modal.Title>Inserir Password</Modal.Title>
                </Modal.Header>
                <InputGroup className='license-check-modal'>
                    <FormControl
                        placeholder="Insira a password de licenciamento"
                        value={key}
                        onChange={handleKeyChange}
                        type={showPassword ? "text" : "password"}
                        style={{ paddingRight: '40px' }}
                    />
                    <Button variant="outline-secondary" onClick={togglePasswordVisibility} style={{
                        position: 'absolute',
                        top: '50%',
                        right: '35px',
                        transform: 'translateY(-50%)',
                        border: 'none',
                        backgroundColor: 'transparent',
                        padding: 0,
                        zIndex: 5
                    }}>
                        <img src={showPassword ? hidepass : showpass} alt={showPassword ? "Esconder password" : "Mostrar password"} style={{ width: 20, height: 20 }} />
                    </Button>
                </InputGroup>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                    <Button style={{ width: '40%' }} variant="outline-primary" onClick={verifyKey}>Verificar Password</Button>
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
                                    Número da Entidade
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    className="custom-input-height custom-select-font-size"
                                    value={formData.entidadeNumber || ''}
                                    onChange={handleChange}
                                    name="entidadeNumber"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formName">
                                <Form.Label>
                                    Nome
                                </Form.Label>
                                <Form.Control
                                    type="string"
                                    className="custom-input-height custom-select-font-size"
                                    value={formData.name || ''}
                                    onChange={handleChange}
                                    name="name"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formNif">
                                <Form.Label>
                                    NIF
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    className="custom-input-height custom-select-font-size"
                                    value={formData.nif || ''}
                                    onChange={handleChange}
                                    name="nif"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formUsers">
                                <Form.Label>
                                    utilizadores
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    className="custom-input-height custom-select-font-size"
                                    value={formData.users || ''}
                                    onChange={handleChange}
                                    name="users"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formDevices">
                                <Form.Label>
                                    Dispositivos
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    className="custom-input-height custom-select-font-size"
                                    value={formData.devices || ''}
                                    onChange={handleChange}
                                    name="devices"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formSn">
                                <Form.Label>
                                    Número de Série
                                </Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-name">Separe os números por vírgula</Tooltip>}
                                >
                                    <Form.Control
                                        type="string"
                                        className="custom-input-height custom-select-font-size"
                                        value={formData.sn || ''}
                                        onChange={handleChange}
                                        name="sn"
                                    />
                                </OverlayTrigger>
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
                                    tabClassName={`nav-item ${formData[product].enable ? 'enabled-tab' : ''} tab-${product.toUpperCase()}`}
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