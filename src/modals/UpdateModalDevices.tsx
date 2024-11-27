import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Nav, OverlayTrigger, Row, Spinner, Tab, Tooltip } from "react-bootstrap";
import { Auxiliaries, Doors, TimePeriod } from "../helpers/Types";
import React from "react";
import no_image from "../assets/img/terminais/no_image.png";
import { toast } from "react-toastify";
import { TerminalsContext, DeviceContextType } from "../context/TerminalsContext";
import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../components/CustomStylesDataTable";
import { auxiliariesFields, doorsFields } from "../helpers/Fields";
import { SelectFilter } from "../components/SelectFilter";
import * as apiService from "../helpers/apiService";
import { UpdateModalDoor } from "./UpdateModalDoor";
import nface from "../assets/img/terminais/nface.webp";
import c3_100 from "../assets/img/terminais/c3_100.webp";
import c3_200 from "../assets/img/terminais/c3_200.webp";
import c3_400 from "../assets/img/terminais/c3_400.webp";
import inbio160 from "../assets/img/terminais/inbio160.webp";
import inbio260 from "../assets/img/terminais/inbio260.webp";
import inbio460 from "../assets/img/terminais/inbio460.webp";
import profacex from "../assets/img/terminais/profacex.webp";
import rfid_td from "../assets/img/terminais/rfid_td.webp";
import v5l_td from "../assets/img/terminais/v5l_td.webp";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { UpdateModalAux } from "./UpdateModaAux";

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
    errorMessage?: string;
}

// Define as propriedades do componente
interface UpdateModalProps<T extends Entity> {
    open: boolean;
    onClose: () => void;
    onDuplicate: (entity: Partial<T>) => void;
    onUpdate: (entity: T) => Promise<void>;
    entity: T;
    fields: Field[];
    title: string;
    onNext: () => void;
    onPrev: () => void;
    canMoveNext: boolean;
    canMovePrev: boolean;
}

export const UpdateModalDevices = <T extends Entity>({ open, onClose, onDuplicate, onUpdate, entity, fields, title, canMoveNext, canMovePrev, onNext, onPrev }: UpdateModalProps<T>) => {
    const {
        fetchAllDevices,
        fetchAllDoorData,
    } = useContext(TerminalsContext) as DeviceContextType;
    const [formData, setFormData] = useState<T>({ ...entity } as T);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [error, setError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [deviceImage, setDeviceImage] = useState<string | ArrayBuffer | null>(null);
    const fileInputRef = React.createRef<HTMLInputElement>();
    const [doors, setDoors] = useState<Doors[]>([]);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [selectedDoor, setSelectedDoor] = useState<Doors | null>(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState('');
    const [currentDoorIndex, setCurrentDoorIndex] = useState(0);
    const [auxiliaries, setAuxiliaries] = useState<Auxiliaries[]>([]);
    const [showAuxUpdateModal, setShowAuxUpdateModal] = useState(false);
    const [selectedAux, setSelectedAux] = useState<Auxiliaries | null>(null);
    const [period, setPeriod] = useState<TimePeriod[]>([]);
    const [currentAuxIndex, setCurrentAuxIndex] = useState(0);
    const [loadingDoorData, setLoadingDoorData] = useState(false);
    const [loadingAuxData, setLoadingAuxData] = useState(false);

    // UseEffect para atualizar o estado do formulário
    useEffect(() => {
        if (open && entity) {
            setFormData({ ...entity } as T);
            const matchedDevice = deviceOptions.find(option => option.label === entity.model);
            if (matchedDevice) {
                setSelectedDevice(matchedDevice.value);
                setDeviceImage(matchedDevice.img);
            } else {
                setSelectedDevice('');
                setDeviceImage(no_image);
            }
            if (entity && entity.photo) {
                setDeviceImage(entity.photo);
            } else {
                setDeviceImage(no_image);
            }
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

    // Função para buscar os períodos
    const fetchPeriods = async () => {
        const dataPeriods = await apiService.fetchAllTimePeriods();
        setPeriod(dataPeriods);
    }

    // Função para buscar as portas e filtrar pelo SN
    const fetchDoors = async () => {
        const dataDoors = await fetchAllDoorData();
        const filteredDoors = dataDoors.filter((door) => door.devId === entity.zktecoDeviceID);
        setDoors(filteredDoors);
    }

    // Função para buscar as auxiliares
    const fetchAuxiliaries = async () => {
        const dataAuxiliaries = await apiService.fetchAllAux();
        const filteredAuxiliaries = dataAuxiliaries.filter((aux: Auxiliaries) => aux.deviceId === entity.zktecoDeviceID);
        setAuxiliaries(filteredAuxiliaries);
    }

    // Função para lidar com a atualização das portas
    const handleUpdateDoor = async (door: Doors) => {
        try {
            const data = await apiService.updateDoor(door);
            const updatedData = { ...door, ...data };
            const updatedDoors = doors.map(d => d.id === door.id ? { ...d, ...updatedData } : d);
            setDoors(updatedDoors);
            toast.success(data.message || 'Porta atualizada com sucesso!');
            setLoadingDoorData(false);
        } catch (error) {
            console.error('Erro ao atualizar a porta:', error);
        } finally {
            setShowUpdateModal(false);
            setLoadingDoorData(false);
        }
    }

    // Função para lidar com a atualização das auxiliares
    const handleUpdateAux = async (aux: Auxiliaries) => {
        try {
            const data = await apiService.updateAllAux(aux);
            const updatedData = { ...aux, ...data };
            const updatedAux = auxiliaries.map(a => a.id === aux.id ? { ...a, ...updatedData } : a);
            setAuxiliaries(updatedAux);
            toast.success(data.message || 'Auxiliar atualizada com sucesso!');
            setLoadingAuxData(false);
        } catch (error) {
            console.error('Erro ao atualizar a porta:', error);
        } finally {
            setShowAuxUpdateModal(false);
            setLoadingAuxData(false);
        }
    }

    // UseEffect para atualizar lista de todos os dispositivos
    useEffect(() => {
        fetchAllDevices();
        fetchDoors();
        fetchAuxiliaries();
        fetchPeriods();
    }, []);

    // Função para manipular o clique no botão Duplicar
    const handleDuplicateClick = () => {
        if (!onDuplicate) return;
        const { zktecoDeviceID, deviceNumber, ...dataWithoutId } = formData;
        onDuplicate(dataWithoutId as T);
    };

    // Função para lidar com a edição das portas
    const handleEditDoors = (row: Doors) => {
        setSelectedDoor(row);
        setShowUpdateModal(true);
        setLoadingDoorData(true);
    }

    // Função para lidar com a edição das auxiliares
    const handleEditAux = (row: Auxiliaries) => {
        setSelectedAux(row);
        setShowAuxUpdateModal(true);
        setLoadingAuxData(true);
    }

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

                    if (width > 768 || height > 768) {
                        if (width > height) {
                            height *= 768 / width;
                            width = 768;
                        } else {
                            width *= 768 / height;
                            height = 768;
                        }
                    }

                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(image, 0, 0, image.width, image.height);
                    const dataUrl = canvas.toDataURL('image/png');
                    setDeviceImage(dataUrl);
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        sPhoto: dataUrl
                    }));
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
        const regex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[1-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[1-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9])$/;
        return regex.test(ip);
    };

    // Função para lidar com a mudança de imagem
    const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        setSelectedDevice(selected);

        const deviceOption = deviceOptions.find(option => option.value === selected);
        setDeviceImage(deviceOption?.img || no_image);

        setFormData(prevFormData => ({
            ...prevFormData,
            model: deviceOption ? deviceOption.label : '',
            sPhoto: deviceOption?.img || no_image
        }));
    };

    // Função para lidar com a mudança de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? Number(value) : value;
        if (name === "ipAddress") {
            if (validateIPAddress(value)) {
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

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Filtra os dados da tabela
    const filteredDataTable = doors.filter(door =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(door[key]) === String(filters[key])
        )
    );

    // Seleciona a entidade anterior
    const handleNextDoor = () => {
        if (currentDoorIndex < doors.length - 1) {
            setCurrentDoorIndex(currentDoorIndex + 1);
            setSelectedDoor(doors[currentDoorIndex + 1]);
        }
    };

    // Seleciona a entidade seguinte
    const handlePrevDoor = () => {
        if (currentDoorIndex > 0) {
            setCurrentDoorIndex(currentDoorIndex - 1);
            setSelectedDoor(doors[currentDoorIndex - 1]);
        }
    };

    // Define as colunas que serão exibidas
    const includedColumns = ['enabled', 'name', 'doorNo', 'lockDelay'];

    // Define as colunas
    const columns: TableColumn<Doors>[] = doorsFields
        .filter(field => includedColumns.includes(field.key))
        .sort((a, b) => { if (a.key === 'lockDelay') return 1; else if (b.key === 'lockDelay') return -1; else return 0; })
        .map(field => {
            const formatField = (row: Doors) => {
                switch (field.key) {
                    case 'enabled':
                        return row[field.key] === true ? 'Activo' : 'Inactivo';
                    case 'createTime':
                        return new Date(row[field.key]).toLocaleDateString();
                    case 'updateTime':
                        return new Date(row[field.key]).toLocaleDateString();
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredDataTable} />
                    </>
                ),
                selector: (row: Doors) => {
                    if (field.key === 'doorNo') {
                        return row[field.key];
                    }
                    return formatField(row);
                },
                sortable: true,
                cell: (row: Doors) => {
                    if (field.key === 'doorNo') {
                        return row[field.key];
                    }
                    return formatField(row);
                }
            };
        });

    // Filtra os dados da tabela
    const filteredAuxDataTable = auxiliaries.filter(aux =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(aux[key]) === String(filters[key])
        )
    );

    // Seleciona a entidade anterior
    const handleNextAux = () => {
        if (currentAuxIndex < auxiliaries.length - 1) {
            setCurrentAuxIndex(currentAuxIndex + 1);
            setSelectedAux(auxiliaries[currentAuxIndex + 1]);
        }
    };

    // Seleciona a entidade seguinte
    const handlePrevAux = () => {
        if (currentAuxIndex > 0) {
            setCurrentAuxIndex(currentAuxIndex - 1);
            setSelectedAux(auxiliaries[currentAuxIndex - 1]);
        }
    };

    // Define as colunas
    const auxColumns: TableColumn<Auxiliaries>[] = auxiliariesFields
        .map(field => {
            const formatField = (row: Auxiliaries) => {
                switch (field.key) {
                    case 'enabled':
                        return row[field.key] === true ? 'Activo' : 'Inactivo';
                    case 'createdData':
                        return new Date(row[field.key]).toLocaleDateString();
                    case 'updatedData':
                        return new Date(row[field.key]).toLocaleDateString();
                    case 'deviceId':
                        return row[field.key] === entity.zktecoDeviceID ? entity.deviceName : 'Sem Dispositivo';
                    case 'timezoneId':
                        return period.find((p) => p.id === row[field.key])?.name || 'Sem Período';
                    case 'auxType':
                        switch (row[field.key]) {
                            case 0:
                                return 'Sem Contacto';
                            case 1:
                                return 'NO';
                            case 2:
                                return 'NC';
                            default:
                                return '';
                        }
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredAuxDataTable} />
                    </>
                ),
                selector: (row: Auxiliaries) => {
                    if (field.key === 'auxNo') {
                        return row[field.key];
                    }
                    return formatField(row);
                },
                sortable: true,
                cell: (row: Auxiliaries) => {
                    if (field.key === 'auxNo') {
                        return row[field.key];
                    }
                    return formatField(row);
                }
            };
        });

    // Função para lidar com o clique no botão de salvar
    const handleSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        handleSubmit();
    };

    // Define a função para enviar
    const handleSubmit = async () => {
        await onUpdate(formData);
    };

    // Opções de dispositivos
    const deviceOptions = [
        { value: 'Nface-204_SISNID-1', label: 'Nface-204_SISNID-1', img: nface },
        { value: 'SISNID-C3-100', label: 'SISNID-C3-100', img: c3_100 },
        { value: 'SISNID-C3-200', label: 'SISNID-C3-200', img: c3_200 },
        { value: 'SISNID-C3-400', label: 'SISNID-C3-400', img: c3_400 },
        { value: 'SISNID-INBIO160', label: 'SISNID-INBIO160', img: inbio160 },
        { value: 'SISNID-INBIO260', label: 'SISNID-INBIO160', img: inbio260 },
        { value: 'SISNID-INBIO460', label: 'SISNID-INBIO460', img: inbio460 },
        { value: 'SISNID-PROFACEX-TD', label: 'SISNID-PROFACEX-TD', img: profacex },
        { value: 'SpeedFace-RFID-TD', label: 'SpeedFace-RFID-TD', img: rfid_td },
        { value: 'Speedface-V5L-TD-1', label: 'Speedface-V5L-TD-1', img: v5l_td },
    ];

    return (
        <Modal show={open} onHide={onClose} backdrop="static" dialogClassName="modal-scrollable" size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Row>
                    <Col md={3}>
                        <Form.Group controlId="formDeviceName">
                            <Form.Label>Nome<span style={{ color: 'red' }}> *</span></Form.Label>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-deviceName">Campo obrigatório</Tooltip>}
                            >
                                <Form.Control
                                    type="text"
                                    name="deviceName"
                                    value={formData['deviceName'] || ''}
                                    onChange={handleChange}
                                    className="custom-input-height custom-select-font-size"
                                >
                                </Form.Control>
                            </OverlayTrigger>
                            {errors['deviceName'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['deviceName']}</div>}
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formModel">
                            <Form.Label>Modelo<span style={{ color: 'red' }}> *</span></Form.Label>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-deviceName">Campo obrigatório</Tooltip>}
                            >
                                <Form.Select
                                    name="model"
                                    value={selectedDevice}
                                    onChange={handleDeviceChange}
                                    className="custom-input-height custom-select-font-size"
                                >
                                    <option value="">Selecione</option>
                                    {deviceOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </Form.Select>
                            </OverlayTrigger>
                            {errors['model'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['model']}</div>}
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formDeviceNumber">
                            <Form.Label>Número<span style={{ color: 'red' }}> *</span></Form.Label>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-deviceNumber">Campo obrigatório</Tooltip>}
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
                                                    alt="Imagem do dispositivo"
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
                                                <Form.Group controlId="formEnabled" className="d-flex align-items-center mb-3">
                                                    <Form.Label className="mb-0 me-2 flex-shrink-0" style={{ lineHeight: '32px' }}>Activo</Form.Label>
                                                    <Form.Check
                                                        type="switch"
                                                        id="custom-switch-enabled"
                                                        checked={formData.enabled === true}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, enabled: e.target.checked }))}
                                                        className="ms-auto"
                                                        label=""
                                                        name="enabled"
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
                                <Nav.Item>
                                    <Nav.Link eventKey="informacao">Informação</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="portas">Portas</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="auxiliares">Auxiliares</Nav.Link>
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
                                                            <Form.Label>IP<span style={{ color: 'red' }}> *</span></Form.Label>
                                                            <OverlayTrigger
                                                                placement="right"
                                                                overlay={<Tooltip id="tooltip-ipAddress">Campo obrigatório</Tooltip>}
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
                                                            <Form.Label>Porta<span style={{ color: 'red' }}> *</span></Form.Label>
                                                            <OverlayTrigger
                                                                placement="right"
                                                                overlay={<Tooltip id="tooltip-port">Campo obrigatório</Tooltip>}
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
                                                        <Form.Group controlId="formDeviceProtocol">
                                                            <Form.Label>Protocolo <span style={{ color: 'red' }}> *</span></Form.Label>
                                                            <OverlayTrigger
                                                                placement="right"
                                                                overlay={<Tooltip id="tooltip-deviceProtocol">Campo obrigatório</Tooltip>}
                                                            >
                                                                <Form.Select
                                                                    name="deviceProtocol"
                                                                    value={formData['deviceProtocol'] || ''}
                                                                    onChange={handleChange}
                                                                    className="custom-input-height custom-select-font-size"
                                                                >
                                                                    <option value="">Selecione</option>
                                                                    <option value="1">Standalone</option>
                                                                    <option value="2">Pull</option>
                                                                    <option value="3">Push</option>
                                                                </Form.Select>
                                                            </OverlayTrigger>
                                                            {errors['deviceProtocol'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['deviceProtocol']}</div>}
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Tab.Pane>
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
                                                        <Form.Group controlId="formDeviceType">
                                                            <Form.Label>Tipo <span style={{ color: 'red' }}>*</span></Form.Label>
                                                            <OverlayTrigger
                                                                placement="right"
                                                                overlay={<Tooltip id="tooltip-deviceType">Campo obrigatório</Tooltip>}
                                                            >
                                                                <Form.Select
                                                                    name="deviceType"
                                                                    value={formData['deviceType'] || ''}
                                                                    onChange={handleChange}
                                                                    className="custom-input-height custom-select-font-size"
                                                                >
                                                                    <option value="">Selecione</option>
                                                                    <option value="1">Assiduidade</option>
                                                                    <option value="2">Controle de Acesso</option>
                                                                </Form.Select>
                                                            </OverlayTrigger>
                                                            {errors['deviceType'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['deviceType']}</div>}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group controlId="formSerialNumber">
                                                            <Form.Label>Número de Série<span style={{ color: 'red' }}> *</span></Form.Label>
                                                            <OverlayTrigger
                                                                placement="right"
                                                                overlay={<Tooltip id="tooltip-serialNumber">Campo obrigatório</Tooltip>}
                                                            >
                                                                <Form.Control
                                                                    type="string"
                                                                    name="serialNumber"
                                                                    value={formData['serialNumber'] || ''}
                                                                    onChange={handleChange}
                                                                    className="custom-input-height custom-select-font-size"
                                                                />
                                                            </OverlayTrigger>
                                                            {errors['serialNumber'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['serialNumber']}</div>}
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="portas">
                                    <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Row>
                                            {loadingDoorData ?
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                                                    <Spinner style={{ width: 50, height: 50 }} animation="border" />
                                                </div> :
                                                <DataTable
                                                    columns={columns}
                                                    data={filteredDataTable}
                                                    pagination
                                                    paginationComponentOptions={paginationOptions}
                                                    paginationPerPage={5}
                                                    paginationRowsPerPageOptions={[5, 10]}
                                                    selectableRows
                                                    onRowDoubleClicked={handleEditDoors}
                                                    noDataComponent="Não existem dados disponíveis para exibir."
                                                    customStyles={customStyles}
                                                    defaultSortAsc={true}
                                                    defaultSortFieldId="doorNo"
                                                />
                                            }
                                        </Row>
                                    </Form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="auxiliares">
                                    <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Row>
                                            {loadingAuxData ?
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                                                    <Spinner style={{ width: 50, height: 50 }} animation="border" />
                                                </div> :
                                                <DataTable
                                                    columns={auxColumns}
                                                    data={filteredAuxDataTable}
                                                    pagination
                                                    paginationComponentOptions={paginationOptions}
                                                    paginationPerPage={5}
                                                    paginationRowsPerPageOptions={[5, 10]}
                                                    selectableRows
                                                    onRowDoubleClicked={handleEditAux}
                                                    noDataComponent="Não existem dados disponíveis para exibir."
                                                    customStyles={customStyles}
                                                    defaultSortAsc={true}
                                                    defaultSortFieldId="auxNo"
                                                />
                                            }
                                        </Row>
                                    </Form>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Col>
                </Row>
            </Modal.Body>
            {selectedDoor && (
                <UpdateModalDoor
                    open={showUpdateModal}
                    onClose={() => setShowUpdateModal(false)}
                    onUpdate={handleUpdateDoor}
                    entity={selectedDoor}
                    fields={doorsFields}
                    title="Atualizar Porta"
                    canMoveNext={currentDoorIndex < doors.length - 1}
                    canMovePrev={currentDoorIndex > 0}
                    onNext={handleNextDoor}
                    onPrev={handlePrevDoor}
                />
            )}
            {selectedAux && (
                <UpdateModalAux
                    open={showAuxUpdateModal}
                    onClose={() => setShowAuxUpdateModal(false)}
                    onUpdate={handleUpdateAux}
                    entity={selectedAux}
                    fields={auxiliariesFields}
                    title="Atualizar Auxiliar"
                    canMoveNext={currentAuxIndex < auxiliaries.length - 1}
                    canMovePrev={currentAuxIndex > 0}
                    onNext={handleNextAux}
                    onPrev={handlePrevAux}
                />
            )}
            <Modal.Footer>
                <CustomOutlineButton icon="bi-arrow-left" onClick={onPrev} disabled={!canMovePrev} />
                <CustomOutlineButton className='arrows-modal' icon="bi-arrow-right" onClick={onNext} disabled={!canMoveNext} />
                <Button variant="outline-info" onClick={handleDuplicateClick}>Duplicar</Button>
                <Button variant="outline-secondary" onClick={onClose}>Fechar</Button>
                <Button variant="outline-primary" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
}