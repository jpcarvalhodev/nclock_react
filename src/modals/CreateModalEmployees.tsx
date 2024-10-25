import React, { useState, useEffect, ChangeEvent } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/PagesStyles.css';
import { Tab, Row, Col, Nav, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import modalAvatar from '../assets/img/navbar/navbar/modalAvatar.png';
import { toast } from 'react-toastify';
import { Employee, EmployeeCard } from '../helpers/Types';
import * as apiService from "../helpers/apiService";

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

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
    onSave: (data: Partial<T>, cardData: Partial<EmployeeCard>) => void;
    fields: FieldConfig[];
    initialValues: Partial<T>;
}

// Define o componente
export const CreateModalEmployees = <T extends Record<string, any>>({ title, open, onClose, onSave, fields, initialValues }: Props<T>) => {
    const [formData, setFormData] = useState<Partial<T>>({ ...initialValues, status: true });
    const [cardFormData, setCardFormData] = useState<Partial<EmployeeCard>>({});
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
    const fileInputRef = React.createRef<HTMLInputElement>();
    const [isFormValid, setIsFormValid] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Atualiza o estado do componente ao abrir o modal
    useEffect(() => {
        setFormData({ ...initialValues, status: true });
        if (initialValues.photo) {
            setProfileImage(initialValues.photo);
        } else {
            setProfileImage(null);
        }
    }, [initialValues]);

    // Atualiza o estado do componente com uma parte das validações
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

        const enrollNumberValid = formData.enrollNumber !== undefined && formData.enrollNumber !== null;

        setIsFormValid(isValid && enrollNumberValid);
    };

    // Função para buscar os funcionários e definir o próximo número de matrícula
    const fetchEmployeesAndSetNextEnrollNumber = async () => {
        try {
            const employees: Employee[] = await apiService.fetchAllEmployees();
            const maxEnrollNumber = employees.reduce((max: number, employee: Employee) => {
                const currentEnrollNumber = parseInt(employee.enrollNumber);
                return Math.max(max, currentEnrollNumber);
            }, 0);
            setFormData(prevState => ({
                ...prevState,
                enrollNumber: (maxEnrollNumber + 1).toString()
            }));

        } catch {
            toast.error('Erro ao buscar o número de matrícula dos funcionários.');
        }
    };

    // Função para buscar as opções do dropdown
    const fetchDropdownOptions = async () => {
        try {
            const departments = await apiService.fetchAllDepartments();
            const groups = await apiService.fetchAllGroups();
            const professions = await apiService.fetchAllProfessions();
            const zones = await apiService.fetchAllZones();
            const externalEntities = await apiService.fetchAllExternalEntities();
            setDropdownData({
                departmentId: departments,
                groupId: groups,
                professionId: professions,
                zoneId: zones,
                externalEntityId: externalEntities
            });
        } catch (error) {
            console.error('Erro ao buscar os dados de departamentos e grupos', error);
        }
    };

    // Atualiza o estado do componente ao abrir o modal
    useEffect(() => {
        if (open) {
            fetchEmployeesAndSetNextEnrollNumber();
            fetchDropdownOptions();
        }
    }, [open]);

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
                    setProfileImage(dataUrl);
                    setFormData({ ...formData, photo: dataUrl });
                };
                image.src = readerEvent.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    // Função para acionar o popup de seleção de arquivo
    const triggerFileSelectPopup = () => fileInputRef.current?.click();

    // Função para lidar com a mudança de campo
    const handleChange = (e: ChangeEvent<FormControlElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? Number(value) : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));

        if (name === 'name') {
            const names = value.split(' ');
            let shortName = '';
            if (names.length > 1) {
                shortName = `${names[0]} ${names[names.length - 1]}`;
            } else if (names.length === 1) {
                shortName = names[0];
            }
            setFormData(prevState => ({
                ...prevState,
                shortName: shortName
            }));
        }

        validateForm();
    };

    // Função para lidar com a mudança do dropdown
    const handleDropdownChange = (key: string, e: React.ChangeEvent<FormControlElement>) => {
        const { value } = e.target;
        const selectedOption = dropdownData[key]?.find((option: any) => {
            switch (key) {
                case 'departmentId':
                    return option.departmentID === value;
                case 'groupId':
                    return option.groupID === value;
                case 'professionId':
                    return option.professionID === value;
                case 'zoneId':
                    return option.zoneID === value;
                case 'externalEntityId':
                    return option.externalEntityID === value;
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

    // Função para lidar com a mudança de dados do cartão
    const handleCardChange = (e: ChangeEvent<FormControlElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? Number(value) : value;
        setCardFormData(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };

    // Função para lidar com o fechamento do modal
    const handleClose = () => {
        setFormData({});
        setCardFormData({});
        setProfileImage(null);
        onClose();
    }

    // Função para lidar com o clique no botão de salvar
    const handleSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        handleSave();
    };

    // Função para lidar com o salvamento
    const handleSave = () => {
        onSave(formData as T, cardFormData as EmployeeCard);
    };

    // Opções do tipo
    const typeOptions = [
        { value: 'Funcionário', label: 'Funcionário' },
        { value: 'Funcionário Externo', label: 'Funcionário Externo' },
        { value: 'Utente', label: 'Utente' },
        { value: 'Visitante', label: 'Visitante' },
        { value: 'Contacto', label: 'Contacto' },
        { value: 'Provisório', label: 'Provisório' }
    ];

    // Opções do módulo
    const moduleOptions = [
        { value: 'nclock', label: 'Nclock' },
        { value: 'naccess', label: 'Naccess' },
        { value: 'nvisitor', label: 'Nvisitor' },
        { value: 'npark', label: 'Npark' },
        { value: 'ndoor', label: 'Ndoor' },
        { value: 'npatrol', label: 'Npatrol' },
        { value: 'ncard', label: 'Ncard' },
        { value: 'nview', label: 'Nview' },
        { value: 'nsecur', label: 'Nsecur' },
        { value: 'nsmart', label: 'Nsmart' },
        { value: 'nreality', label: 'Nreality' },
        { value: 'nhologram', label: 'Nhologram' },
        { value: 'npower', label: 'Npower' },
        { value: 'ncharge', label: 'Ncharge' },
        { value: 'ncity', label: 'Ncity' },
        { value: 'nkiosk', label: 'Nkiosk' },
        { value: 'nled', label: 'Nled' },
        { value: 'nfire', label: 'Nfire' },
        { value: 'nfurniture', label: 'Nfurniture' },
        { value: 'npartition', label: 'Npartition' },
        { value: 'ndecor', label: 'Ndecor' },
        { value: 'nping', label: 'Nping' },
        { value: 'nconnect', label: 'Nconnect' },
        { value: 'nlight', label: 'Nlight' },
        { value: 'ncomfort', label: 'Ncomfort' },
        { value: 'nsound', label: 'Nsound' },
        { value: 'nhome', label: 'Nhome' },
        { value: 'nsoftware', label: 'Nsoftware' },
        { value: 'nsystem', label: 'Nsystem' },
        { value: 'napp', label: 'Napp' },
        { value: 'nciber', label: 'Nciber' },
        { value: 'ndigital', label: 'Ndigital' },
        { value: 'nserver', label: 'Nserver' },
        { value: 'naut', label: 'Naut' },
        { value: 'nequip', label: 'Nequip' },
        { value: 'nproject', label: 'Nproject' },
        { value: 'ncount', label: 'Ncount' },
        { value: 'nconstruction', label: 'Nconstruction' },
        { value: 'ncaravans', label: 'Ncaravans' },
        { value: 'nwork', label: 'Nwork' },
        { value: 'nevents', label: 'Nevents' },
        { value: 'nservice', label: 'Nservice' },
        { value: 'ntask', label: 'Ntask' },
        { value: 'nproductions', label: 'Nproductions' },
        { value: 'nticket', label: 'Nticket' },
        { value: 'nsales', label: 'Nsales' },
        { value: 'ninvoice', label: 'Ninvoice' },
        { value: 'ndoc', label: 'Ndoc' },
        { value: 'nsports', label: 'Nsports' },
        { value: 'nacademy', label: 'Nacademy' },
        { value: 'nshcool', label: 'Nshcool' },
        { value: 'nclinics', label: 'Nclinics' },
        { value: 'noptics', label: 'Noptics' },
        { value: 'ngold', label: 'Ngold' }
    ];    

    return (
        <Modal show={open} onHide={onClose} dialogClassName="custom-modal" size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Row style={{ marginBottom: 20 }}>
                    <Col md={3} className='img-modal'>
                        <img
                            src={profileImage || modalAvatar}
                            alt="Profile Avatar"
                            style={{ width: 128, height: 128, borderRadius: '50%', cursor: 'pointer', objectFit: 'cover' }}
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
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formEnrollNumber">
                            <Form.Label>
                                Número da Pessoa <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-enrollNumber">Campo obrigatório</Tooltip>}
                            >
                                <Form.Control
                                    type="number"
                                    className="custom-input-height custom-select-font-size"
                                    value={formData.enrollNumber || ''}
                                    onChange={handleChange}
                                    name="enrollNumber"
                                />
                            </OverlayTrigger>
                            {errors.enrollNumber && <Form.Text className="text-danger">{errors.enrollNumber}</Form.Text>}
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>
                                Nome <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-name">Obrigatório ter 5 caracteres ou mais</Tooltip>}
                            >
                                <Form.Control
                                    type="string"
                                    className="custom-input-height custom-select-font-size"
                                    value={formData.name || ''}
                                    onChange={handleChange}
                                    name="name"
                                    required
                                />
                            </OverlayTrigger>
                            {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
                        </Form.Group>
                        <Form.Group controlId="formShortName">
                            <Form.Label>
                                Nome Resumido <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-shortName">Obrigatório ter 5 caracteres ou mais</Tooltip>}
                            >
                                <Form.Control
                                    type="string"
                                    className="custom-input-height custom-select-font-size"
                                    value={formData.shortName || ''}
                                    onChange={handleChange}
                                    name="shortName"
                                    required
                                />
                            </OverlayTrigger>
                            {errors.shortName && <Form.Text className="text-danger">{errors.shortName}</Form.Text>}
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formNameAcronym">
                            <Form.Label>Acrônimo do Nome</Form.Label>
                            <Form.Control
                                type="string"
                                className="custom-input-height custom-select-font-size"
                                value={formData.nameAcronym || ''}
                                onChange={handleChange}
                                name="nameAcronym"
                            />
                        </Form.Group>
                        <Form.Group controlId="formComments">
                            <Form.Label>Comentários</Form.Label>
                            <Form.Control
                                type="string"
                                className="custom-input-height custom-select-font-size"
                                value={formData.comments || ''}
                                onChange={handleChange}
                                name="comments"
                            />
                        </Form.Group>
                        <Form.Group controlId="formType">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                                as="select"
                                className="custom-input-height custom-select-font-size"
                                value={formData.type || ''}
                                onChange={handleChange}
                                name="type"
                            >
                                <option value="">Selecione...</option>
                                {typeOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formStatus" className="d-flex align-items-center mb-2">
                            <Form.Label className="mb-0 me-2 flex-shrink-0" style={{ lineHeight: '32px' }}>Activo:</Form.Label>
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
                        <Form.Group controlId="formStatusEmail" className="d-flex align-items-center mb-2">
                            <Form.Label className="mb-0 me-2 flex-shrink-0" style={{ lineHeight: '32px' }}>Activo para E-Mail:</Form.Label>
                            <Form.Check
                                type="switch"
                                id="custom-switch-status-email"
                                checked={formData.statusEmail === true}
                                onChange={(e) => setFormData({ ...formData, statusEmail: e.target.checked ? true : false })}
                                className="ms-auto"
                                label=""
                                name="statusEmail"
                            />
                        </Form.Group>
                        <Form.Group controlId="formRgptAut" className="d-flex align-items-center">
                            <Form.Label className="mb-0 me-2 flex-shrink-0" style={{ lineHeight: '32px' }}>Autorização RGPD:</Form.Label>
                            <Form.Check
                                type="switch"
                                id="custom-switch-rgpt-aut"
                                checked={formData.rgpdAut === true}
                                onChange={(e) => setFormData({ ...formData, rgpdAut: e.target.checked ? true : false })}
                                className="ms-auto"
                                label=""
                                name="rgpdAut"
                            />
                        </Form.Group>
                        <Form.Group controlId="formModulos" style={{ marginTop: 12 }}>
                            <Form.Label>Módulo</Form.Label>
                            <Form.Control
                                as="select"
                                className="custom-input-height custom-select-font-size"
                                value={formData.modulos || ''}
                                onChange={handleChange}
                                name="modulos"
                            >
                                <option value="">Selecione...</option>
                                {moduleOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Tab.Container defaultActiveKey="dadosPessoais">
                    <Nav variant="tabs" className="nav-modal">
                        <Nav.Item>
                            <Nav.Link eventKey="dadosPessoais">Dados Pessoais</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="dadosProfissionais">Dados Profissionais</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="cartoes">Cartão</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="dadosPessoais">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                <Row>
                                    {[
                                        { key: 'nif', label: 'NIF', type: 'number' },
                                        { key: 'address', label: 'Morada', type: 'string' },
                                        { key: 'zipcode', label: 'Código Postal', type: 'string' },
                                        { key: 'locality', label: 'Localidade', type: 'string' },
                                        { key: 'village', label: 'Freguesia', type: 'string' },
                                        { key: 'district', label: 'Distrito', type: 'string' },
                                        { key: 'phone', label: 'Telefone', type: 'number' },
                                        { key: 'mobile', label: 'Telemóvel', type: 'number' },
                                        { key: 'email', label: 'E-Mail', type: 'email' },
                                        { key: 'birthday', label: 'Data de Nascimento', type: 'date' },
                                        { key: 'nacionality', label: 'Nacionalidade', type: 'string' },
                                        { key: 'gender', label: 'Gênero', type: 'string' }
                                    ].map((field) => (
                                        <Col md={3} key={field.key}>
                                            <Form.Group controlId={`form${field.key}`}>
                                                <Form.Label>{field.label}</Form.Label>
                                                <Form.Control
                                                    type={field.type}
                                                    className="custom-input-height custom-select-font-size"
                                                    value={formData[field.key] || ''}
                                                    onChange={handleChange}
                                                    name={field.key}
                                                />
                                                {errors[field.key] && <Form.Text className="text-danger">{errors[field.key]}</Form.Text>}
                                            </Form.Group>
                                        </Col>
                                    ))}
                                </Row>
                            </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="dadosProfissionais">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                <Row>
                                    {[
                                        { key: 'biNumber', label: 'Número de BI', type: 'string' },
                                        { key: 'biIssuance', label: 'Emissão de BI', type: 'date' },
                                        { key: 'biValidity', label: 'Validade de BI', type: 'date' },
                                        { key: 'admissionDate', label: 'Data de Admissão', type: 'date' },
                                        { key: 'exitDate', label: 'Data de Saída', type: 'date' },
                                        { key: 'departmentId', label: 'Departamento', type: 'dropdown' },
                                        { key: 'professionId', label: 'Profissão', type: 'dropdown' },
                                        { key: 'groupId', label: 'Grupo', type: 'dropdown' },
                                        { key: 'zoneId', label: 'Zona', type: 'dropdown' },
                                        { key: 'externalEntityId', label: 'Entidade Externa', type: 'dropdown' }
                                    ].map((field) => (
                                        <Col md={3} key={field.key}>
                                            <Form.Group controlId={`form${field.key}`}>
                                                <Form.Label>{field.label}</Form.Label>
                                                {field.type === 'dropdown' ? (
                                                    <Form.Control
                                                        as="select"
                                                        className="custom-input-height custom-select-font-size"
                                                        value={formData[field.key] || ''}
                                                        onChange={(e) => handleDropdownChange(field.key, e)}
                                                    >
                                                        <option value="">Selecione...</option>
                                                        {dropdownData[field.key]?.map((option: any) => {
                                                            let optionId, optionName;
                                                            switch (field.key) {
                                                                case 'departmentId':
                                                                    optionId = option.departmentID;
                                                                    optionName = option.name;
                                                                    break;
                                                                case 'groupId':
                                                                    optionId = option.groupID;
                                                                    optionName = option.name;
                                                                    break;
                                                                case 'professionId':
                                                                    optionId = option.professionID;
                                                                    optionName = option.description;
                                                                    break;
                                                                case 'zoneId':
                                                                    optionId = option.zoneID;
                                                                    optionName = option.name;
                                                                    break;
                                                                case 'externalEntityId':
                                                                    optionId = option.externalEntityID;
                                                                    optionName = option.name;
                                                                    break;
                                                                default:
                                                                    optionId = option.id;
                                                                    optionName = option.name || option.description;
                                                                    break;
                                                            }
                                                            return (
                                                                <option key={optionId} value={optionId}>
                                                                    {optionName}
                                                                </option>
                                                            );
                                                        })}
                                                    </Form.Control>
                                                ) : (
                                                    <Form.Control
                                                        type={field.type}
                                                        className="custom-input-height custom-select-font-size"
                                                        value={formData[field.key] || ''}
                                                        onChange={handleChange}
                                                        name={field.key}
                                                    />
                                                )}
                                            </Form.Group>
                                        </Col>
                                    ))}
                                </Row>
                            </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="cartoes">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group controlId="formDeviceEnabled" className="d-flex align-items-center mt-3">
                                            <Form.Label className="mb-0 me-2 flex-shrink-0" style={{ lineHeight: '32px' }}>Dispositivo Activado:</Form.Label>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch-device-enabled"
                                                checked={cardFormData.deviceEnabled || false}
                                                onChange={(e) => setCardFormData({ ...cardFormData, deviceEnabled: e.target.checked })}
                                                className="ms-auto"
                                                label=""
                                                name="deviceEnabled"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formCardNumber">
                                            <Form.Label>Número do Cartão</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="custom-input-height custom-select-font-size"
                                                value={cardFormData.cardNumber || ''}
                                                onChange={handleCardChange}
                                                name="cardNumber"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formDevicePrivelage">
                                            <Form.Label>Privilégio do Dispositivo</Form.Label>
                                            <Form.Control
                                                type="number"
                                                className="custom-input-height custom-select-font-size"
                                                value={cardFormData.devicePrivelage || ''}
                                                onChange={handleCardChange}
                                                name="devicePrivelage"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formDevicePassword">
                                            <Form.Label>Senha do Dispositivo</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="custom-input-height custom-select-font-size"
                                                value={cardFormData.devicePassword || ''}
                                                onChange={handleCardChange}
                                                name="devicePassword"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>Fechar</Button>
                <Button variant="outline-primary" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};