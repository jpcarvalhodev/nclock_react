import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Nav, OverlayTrigger, Row, Tab, Tooltip } from "react-bootstrap";
import React from "react";
import no_image from "../assets/img/terminais/no_image.png";
import { toast } from "react-toastify";
import { DeviceContextType, TerminalsContext } from "../context/TerminalsContext";

// Define a interface para as propriedades do componente FieldConfig
interface FieldConfig {
    label: string;
    key: string;
    type: string;
    required?: boolean;
    optionsUrl?: string;
    validate?: (value: any) => boolean;
    errorMessage?: string;
}

// Define as propriedades do componente
interface Props<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    fields: FieldConfig[];
    initialValues: Partial<T>;
}

export const CreateModalDevices = <T extends Record<string, any>>({ title, open, onClose, onSave, fields, initialValues }: Props<T>) => {
    const {
        fetchAllDevices,
    } = useContext(TerminalsContext) as DeviceContextType;
    const [formData, setFormData] = useState<Partial<T>>({ ...initialValues, status: true });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [ipAddress, setIpAddress] = useState('');
    const [error, setError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [deviceImage, setDeviceImage] = useState<string | ArrayBuffer | null>(null);
    const fileInputRef = React.createRef<HTMLInputElement>();

    // Atualiza o estado do componente ao abrir o modal
    useEffect(() => {
        setFormData({ ...initialValues, status: true });
        if (initialValues.photo) {
            setDeviceImage(initialValues.photo);
        } else {
            setDeviceImage(null);
        }
    }, [initialValues]);    

    // UseEffect para validar o formulário
    useEffect(() => {
        const newErrors: Record<string, string> = {};

        const isValid = fields.every(field => {
            const fieldValue = formData[field.key];
            let valid = true;

            if (field.type === 'number' && fieldValue != null && fieldValue < 0) {
                valid = false;
                newErrors[field.key] = `${field.label} não pode ser negativo.`;
            }

            return valid;
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
        validateForm();
    }, [formData, fields]);

    // Função para validar o formulário
    const validateForm = () => {
        const isValid = fields.every(field => {
            const fieldValue = formData?.[field.key];
            if (field.required) {
                if (typeof fieldValue === 'string') {
                    return fieldValue.trim() !== '';
                }
                return fieldValue !== null && fieldValue !== undefined;
            }
            return true;
        });

        setIsFormValid(isValid);
    };

    // UseEffect para atualizar lista de todos os dispositivos
    useEffect(() => {
        fetchAllDevices();
    }, []);

    // Função para lidar com a mudança da imagem
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (readerEvent) => {
                const image = new Image();
                image.onload = () => {
                    let width = image.width;
                    let height = image.height;
    
                    if (width > 512 || height > 512) {
                        if (width > height) {
                            height *= 512 / width;
                            width = 512;
                        } else {
                            width *= 512 / height;
                            height = 512;
                        }
                    }
    
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(image, 0, 0, width, height);
    
                    const dataUrl = canvas.toDataURL('image/png');
                    setDeviceImage(dataUrl);
                    setFormData({ ...formData, photo: dataUrl });
                };
                image.src = readerEvent.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    // Função para acionar o popup de seleção de arquivo
    const triggerFileSelectPopup = () => fileInputRef.current?.click();

    // Função para validar o endereço IP
    const validateIPAddress = (ip: string) => {
        const regex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[1-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[1-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[1-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[1-9])$/;
        return regex.test(ip);
    };

    // Função para lidar com a mudança de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? Number(value) : value;
        if (name === "ipAddress") {
            if (validateIPAddress(value)) {
                setIpAddress(value);
                setError('');
            } else {
                setError('Endereço IP inválido');
            }
        }
        setFormData(prev => ({
            ...prev,
            [name]: parsedValue
        }));
        validateForm();
    };

    // Função para lidar com o clique no botão de salvar
    const handleSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de salvar.');
            return;
        }
        handleSave();
    };

    // Função para lidar com o fechamento do modal
    const handleClose = () => {
        setFormData({});
        setDeviceImage(null);
        onClose();
    }

    // Função para lidar com o salvamento
    const handleSave = () => {
        onSave(formData as T);
    };

    return (
        <Modal show={open} onHide={onClose} dialogClassName="modal-scrollable" size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Row>
                    <Col md={3}>
                        <Form.Group controlId="formDeviceName">
                            <Form.Label>Nome</Form.Label>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-enrollNumber">Campo obrigatório</Tooltip>}
                            >
                                <Form.Control
                                    type="string"
                                    name="deviceName"
                                    value={formData['deviceName'] || ''}
                                    onChange={handleChange}
                                    className="custom-input-height custom-select-font-size"
                                />
                            </OverlayTrigger>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formDeviceNumber">
                            <Form.Label>Número</Form.Label>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-enrollNumber">Campo obrigatório</Tooltip>}
                            >
                                <Form.Control
                                    type="number"
                                    className="custom-input-height custom-select-font-size"
                                    value={formData.deviceNumber || ''}
                                    onChange={handleChange}
                                    name="deviceNumber"
                                />
                            </OverlayTrigger>
                            {errors['deviceNumber'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['deviceNumber']}</div>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Tab.Container defaultActiveKey="terminal">
                            <Nav variant="tabs" className="nav-modal">
                                <Nav.Item>
                                    <Nav.Link eventKey="terminal">Terminal</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="terminal">
                                    <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Row>
                                            <Col className='img-modal'>
                                                <img
                                                    src={deviceImage || no_image}
                                                    alt="Profile Avatar"
                                                    style={{ width: 128, height: 128, cursor: 'pointer', marginBottom: 30, objectFit: 'cover', borderRadius: '25%' }}
                                                    onClick={triggerFileSelectPopup}
                                                />
                                                <div>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        style={{ display: 'none' }}
                                                        onChange={handleImageChange}
                                                        ref={fileInputRef}
                                                    />
                                                </div>
                                                <Form.Group controlId="formStatus" className="d-flex align-items-center mb-3">
                                                    <Form.Label className="mb-0 me-2 flex-shrink-0" style={{ lineHeight: '32px' }}>Activo</Form.Label>
                                                    <Form.Check
                                                        type="switch"
                                                        id="custom-switch-status"
                                                        checked={formData.status === true}
                                                        onChange={(e) => setFormData({ ...formData, status: e.target.checked ? true : false })}
                                                        className="ms-auto"
                                                        label=""
                                                        name="status"
                                                    />
                                                </Form.Group>
                                                <div style={{ backgroundColor: '#d1d1d1', padding: '10px', borderRadius: '5px', marginTop: '20px', textAlign: "center" }}>
                                                    <p style={{ margin: '0' }}>As funcionalidades indicadas dependem da compatibilidade do equipamento.</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Col>
                    <Col md={8}>
                        <Tab.Container defaultActiveKey="comunicacao">
                            <Nav variant="tabs" className="nav-modal">
                                <Nav.Item>
                                    <Nav.Link eventKey="comunicacao">Modo de Comunicação</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="comunicacao">
                                    <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Row>
                                            <Col md={12}>
                                                <Row>
                                                    <Col md={3}>
                                                        <Form.Group controlId="formIpAddress">
                                                            <Form.Label>IP</Form.Label>
                                                            <OverlayTrigger
                                                                placement="right"
                                                                overlay={<Tooltip id="tooltip-enrollNumber">Campo obrigatório</Tooltip>}
                                                            >
                                                            <Form.Control
                                                                type="string"
                                                                name="ipAddress"
                                                                value={formData['ipAddress'] || ''}
                                                                onChange={handleChange}
                                                                isInvalid={!!error}
                                                                className="custom-input-height custom-select-font-size"
                                                            />
                                                            </OverlayTrigger>
                                                            <Form.Control.Feedback type="invalid">
                                                                {error}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group controlId="formPort">
                                                            <Form.Label>Porta</Form.Label>
                                                            <OverlayTrigger
                                                                placement="right"
                                                                overlay={<Tooltip id="tooltip-enrollNumber">Campo obrigatório</Tooltip>}
                                                            >
                                                            <Form.Control
                                                                type="number"
                                                                name="port"
                                                                value={formData['port'] || ''}
                                                                onChange={handleChange}
                                                                className="custom-input-height custom-select-font-size"
                                                            />
                                                            </OverlayTrigger>
                                                            {errors['port'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['port']}</div>}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group controlId="formCode">
                                                            <Form.Label>Código</Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                className="custom-input-height custom-select-font-size"
                                                                value={formData.code || ''}
                                                                onChange={handleChange}
                                                                name="code"
                                                            />
                                                            {errors['code'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['code']}</div>}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group controlId="formMachineNumber">
                                                            <Form.Label>Número da Máquina</Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                name="machineNumber"
                                                                value={formData['machineNumber'] || ''}
                                                                onChange={handleChange}
                                                                className="custom-input-height custom-select-font-size"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                        <Tab.Container defaultActiveKey="informacao">
                            <Nav variant="tabs" className="nav-modal">
                                <Nav.Item>
                                    <Nav.Link eventKey="informacao">Informação</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="informacao">
                                    <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Row>
                                            <Col md={12}>
                                                <Row>
                                                    <Col md={3}>
                                                        <Form.Group controlId="formPlatform">
                                                            <Form.Label>Plataforma</Form.Label>
                                                            <Form.Control
                                                                type="string"
                                                                name="platform"
                                                                value={formData['platform'] || ''}
                                                                onChange={handleChange}
                                                                className="custom-input-height custom-select-font-size"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group controlId="formFirmware">
                                                            <Form.Label>Firmware</Form.Label>
                                                            <Form.Control
                                                                type="string"
                                                                name="firmware"
                                                                value={formData['firmware'] || ''}
                                                                onChange={handleChange}
                                                                className="custom-input-height custom-select-font-size"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group controlId="formMacAddress">
                                                            <Form.Label>MAC</Form.Label>
                                                            <Form.Control
                                                                type="string"
                                                                name="macAddress"
                                                                value={formData['macAddress'] || ''}
                                                                onChange={handleChange}
                                                                className="custom-input-height custom-select-font-size"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group controlId="formSerialNumber">
                                                            <Form.Label>Número de Série</Form.Label>
                                                            <Form.Control
                                                                type="string"
                                                                name="serialNumber"
                                                                value={formData['serialNumber'] || ''}
                                                                onChange={handleChange}
                                                                className="custom-input-height custom-select-font-size"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={3}>
                                                        <Form.Group controlId="formProductTime">
                                                            <Form.Label>Data do Produto</Form.Label>
                                                            <Form.Control
                                                                type="date"
                                                                name="productTime"
                                                                value={formData['productTime'] || ''}
                                                                onChange={handleChange}
                                                                className="custom-input-height custom-select-font-size"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group controlId="formProducter">
                                                            <Form.Label>Fabricante</Form.Label>
                                                            <Form.Control
                                                                type="string"
                                                                name="producter"
                                                                value={formData['producter'] || ''}
                                                                onChange={handleChange}
                                                                className="custom-input-height custom-select-font-size"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group controlId="formType">
                                                            <Form.Label>Tipo</Form.Label>
                                                            <Form.Control
                                                                type="string"
                                                                name="type"
                                                                value={formData['type'] || ''}
                                                                onChange={handleChange}
                                                                className="custom-input-height custom-select-font-size"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>Fechar</Button>
                <Button variant="outline-primary" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
}