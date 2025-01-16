import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Nav, OverlayTrigger, Row, Spinner, Tab, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { toast } from "react-toastify";

import c3_100 from "../assets/img/terminais/c3_100.webp";
import c3_200 from "../assets/img/terminais/c3_200.webp";
import c3_400 from "../assets/img/terminais/c3_400.webp";
import inbio160 from "../assets/img/terminais/inbio160.webp";
import inbio260 from "../assets/img/terminais/inbio260.webp";
import inbio460 from "../assets/img/terminais/inbio460.webp";
import nface from "../assets/img/terminais/nface.webp";
import no_image from "../assets/img/terminais/no_image.png";
import profacex from "../assets/img/terminais/profacex.webp";
import rfid_td from "../assets/img/terminais/rfid_td.webp";
import v5l_td from "../assets/img/terminais/v5l_td.webp";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { customStyles } from "../components/CustomStylesDataTable";
import { SelectFilter } from "../components/SelectFilter";
import { useTerminals } from "../context/TerminalsContext";
import { auxiliariesFields, doorsFields } from "../fields/Fields";
import { Auxiliaries, Doors } from "../types/Types";

import { UpdateModalAux } from "./UpdateModalAux";
import { UpdateModalDoor } from "./UpdateModalDoor";

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
        door,
        aux,
        period,
        fetchAllDoorData,
        handleUpdateDoor,
        handleUpdateAux,
    } = useTerminals();
    const [formData, setFormData] = useState<T>({ ...entity } as T);
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [deviceImage, setDeviceImage] = useState<string | ArrayBuffer | null>(null);
    const fileInputRef = React.createRef<HTMLInputElement>();
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [selectedDoor, setSelectedDoor] = useState<Doors | null>(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState('');
    const [currentDoorIndex, setCurrentDoorIndex] = useState(0);
    const [auxiliaries, setAuxiliaries] = useState<Auxiliaries[]>([]);
    const [showAuxUpdateModal, setShowAuxUpdateModal] = useState(false);
    const [selectedAuxIn, setSelectedAuxIn] = useState<Auxiliaries | null>(null);
    const [selectedAuxOut, setSelectedAuxOut] = useState<Auxiliaries | null>(null);
    const [auxIn, setAuxIn] = useState<Auxiliaries[]>([]);
    const [auxOut, setAuxOut] = useState<Auxiliaries[]>([]);
    const [currentAuxInIndex, setCurrentAuxInIndex] = useState(0);
    const [currentAuxOutIndex, setCurrentAuxOutIndex] = useState(0);
    const [loadingDoorData, setLoadingDoorData] = useState(false);
    const [loadingAuxInData, setLoadingAuxInData] = useState(false);
    const [loadingAuxOutData, setLoadingAuxOutData] = useState(false);
    const [showValidationErrors, setShowValidationErrors] = useState(false);
    const [showIpValidationErrors, setShowIpValidationErrors] = useState(false);

    // UseEffect para atualizar o estado do formulário
    useEffect(() => {
        if (open && entity) {
            fetchAuxiliaries();
            setFormData({ ...entity } as T);
            const matchedDevice = deviceOptions.find(option => option.label === entity.model);
            if (matchedDevice) {
                setSelectedDevice(matchedDevice.value);
                setDeviceImage(matchedDevice.img);
            } else {
                setSelectedDevice('');
                setDeviceImage(no_image);
            }
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

    // Função para buscar as auxiliares
    const fetchAuxiliaries = async () => {
        const filteredAuxiliaries = aux.filter((aux: Auxiliaries) => aux.deviceId === entity.zktecoDeviceID);
        setAuxiliaries(filteredAuxiliaries);
    }

    // UseEffect para filtrar as auxiliares de entrada e saída
    useEffect(() => {
        const auxInData = aux.filter(aux => aux.auxInOut === 0).map(aux => ({ ...aux, type: 'in' }));
        const auxOutData = aux.filter(aux => aux.auxInOut === 1).map(aux => ({ ...aux, type: 'out' }));
        const auxInOrdered = auxInData.sort((a, b) => a.auxNo - b.auxNo);
        const auxOutOrdered = auxOutData.sort((a, b) => a.auxNo - b.auxNo);
        setAuxIn(auxInOrdered);
        setAuxOut(auxOutOrdered);
    }, [aux, auxiliaries]);

    // Função para lidar com a atualização das portas
    const updateDoor = async (door: Doors) => {
        await handleUpdateDoor(door);
        setLoadingDoorData(false);
        refreshDoorsAndAux();
    }

    // Função para lidar com a atualização das auxiliares
    const updateAux = async (aux: Auxiliaries) => {
        await handleUpdateAux(aux);
        setLoadingAuxInData(false);
        setLoadingAuxOutData(false);
        refreshDoorsAndAux();
    }

    // Função para atualizar as portas e auxiliares
    const refreshDoorsAndAux = () => {
        fetchAllDoorData();
        fetchAuxiliaries();
    }

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
                validateForm();
            } else {
                setShowIpValidationErrors(true);
            }
        }
        if (showValidationErrors) {
            setShowValidationErrors(false);
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
    const filteredDataTable = door.filter(door =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(door[key]) === String(filters[key])
        )
    );

    // Seleciona a entidade anterior
    const handleNextDoor = () => {
        if (currentDoorIndex < door.length - 1) {
            setCurrentDoorIndex(currentDoorIndex + 1);
            setSelectedDoor(door[currentDoorIndex + 1]);
        }
    };

    // Seleciona a entidade seguinte
    const handlePrevDoor = () => {
        if (currentDoorIndex > 0) {
            setCurrentDoorIndex(currentDoorIndex - 1);
            setSelectedDoor(door[currentDoorIndex - 1]);
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

    // Função para lidar com a edição das auxiliares
    const handleEditAux = (row: Auxiliaries, type: 'in' | 'out') => {
        if (type === 'in') {
            setSelectedAuxIn(row);
            setCurrentAuxInIndex(auxIn.findIndex(aux => aux.id === row.id));
            setLoadingAuxInData(true);
            setShowAuxUpdateModal(true);
        } else {
            setSelectedAuxOut(row);
            setCurrentAuxOutIndex(auxOut.findIndex(aux => aux.id === row.id));
            setLoadingAuxOutData(true);
            setShowAuxUpdateModal(true);
        }
    };

    // Função para selecionar a auxiliar seguinte
    const handleNextAux = (type: 'in' | 'out') => {
        if (type === 'in' && currentAuxInIndex < auxIn.length - 1) {
            setCurrentAuxInIndex(currentAuxInIndex + 1);
            setSelectedAuxIn(auxIn[currentAuxInIndex + 1]);
        } else if (type === 'out' && currentAuxOutIndex < auxOut.length - 1) {
            setCurrentAuxOutIndex(currentAuxOutIndex + 1);
            setSelectedAuxOut(auxOut[currentAuxOutIndex + 1]);
        }
    };

    // Função para selecionar a auxiliar anterior
    const handlePrevAux = (type: 'in' | 'out') => {
        if (type === 'in' && currentAuxInIndex > 0) {
            setCurrentAuxInIndex(currentAuxInIndex - 1);
            setSelectedAuxIn(auxIn[currentAuxInIndex - 1]);
        } else if (type === 'out' && currentAuxOutIndex > 0) {
            setCurrentAuxOutIndex(currentAuxOutIndex - 1);
            setSelectedAuxOut(auxOut[currentAuxOutIndex - 1]);
        }
    };

    // Função para fechar o modal de atualização das auxiliares
    const handleCloseAuxModal = (type: 'in' | 'out') => {
        if (type === 'in') {
            setSelectedAuxIn(null);
            setCurrentAuxInIndex(0);
            setLoadingAuxInData(false);
        } else {
            setSelectedAuxOut(null);
            setCurrentAuxOutIndex(0);
            setLoadingAuxOutData(false);
        }
        setShowAuxUpdateModal(false);
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
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar.');
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
        { value: '', label: '------------Acessos/Assiduidade------------' },
        { value: 'Nface-204_SISNID-1', label: 'Nface-204_SISNID-1', img: nface },
        { value: 'SISNID-C3-100', label: 'SISNID-C3-100', img: c3_100 },
        { value: 'SISNID-C3-200', label: 'SISNID-C3-200', img: c3_200 },
        { value: 'SISNID-C3-400', label: 'SISNID-C3-400', img: c3_400 },
        { value: 'SISNID-INBIO160', label: 'SISNID-INBIO160', img: inbio160 },
        { value: 'SISNID-INBIO260', label: 'SISNID-INBIO260', img: inbio260 },
        { value: 'SISNID-INBIO460', label: 'SISNID-INBIO460', img: inbio460 },
        { value: 'SISNID-PROFACEX-TD', label: 'SISNID-PROFACEX-TD', img: profacex },
        { value: 'SpeedFace-RFID-TD', label: 'SpeedFace-RFID-TD', img: rfid_td },
        { value: 'Speedface-V5L-TD-1', label: 'Speedface-V5L-TD-1', img: v5l_td },
    ];

    return (
        <Modal show={open} onHide={onClose} backdrop="static" dialogClassName="modal-scrollable" size="xl" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
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
                                    className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                >
                                </Form.Control>
                            </OverlayTrigger>
                            {errors['deviceName'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['deviceName']}</div>}
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formModel">
                            <Form.Label>Modelo</Form.Label>
                            <Form.Select
                                name="model"
                                value={selectedDevice}
                                onChange={handleDeviceChange}
                                className="custom-input-height custom-select-font-size"
                            >
                                <option value="">Selecione</option>
                                {deviceOptions.map(option => (
                                    <option key={option.value} value={option.value} disabled={option.value === ''}>{option.label}</option>
                                ))}
                            </Form.Select>
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
                                    className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
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
                                    <Nav.Link eventKey="terminal">Equipamentos</Nav.Link>
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
                                                            <Form.Label>IP</Form.Label>
                                                            <Form.Control
                                                                type="string"
                                                                name="ipAddress"
                                                                value={formData['ipAddress'] || ''}
                                                                onChange={handleChange}
                                                                isInvalid={showIpValidationErrors && !validateIPAddress(formData['ipAddress'] || '')}
                                                                className="custom-input-height custom-select-font-size"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group controlId="formPort">
                                                            <Form.Label>Porta</Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                name="port"
                                                                value={formData['port'] || ''}
                                                                onChange={handleChange}
                                                                className="custom-input-height custom-select-font-size"
                                                            />
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
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group controlId="formDeviceProtocol">
                                                            <Form.Label>Protocolo</Form.Label>
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
                                                            <Form.Label>Tipo</Form.Label>
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
                                                    striped
                                                    defaultSortAsc={true}
                                                    defaultSortFieldId="doorNo"
                                                />
                                            }
                                        </Row>
                                    </Form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="auxiliares">
                                    <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Row style={{ display: "flex", flexDirection: "column" }}>
                                            <Col>
                                                <h6>Entradas</h6>
                                                {loadingAuxInData ?
                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                                                        <Spinner style={{ width: 50, height: 50 }} animation="border" />
                                                    </div> :
                                                    <DataTable
                                                        columns={auxColumns}
                                                        data={auxIn}
                                                        pagination
                                                        paginationComponentOptions={paginationOptions}
                                                        paginationPerPage={5}
                                                        paginationRowsPerPageOptions={[5, 10]}
                                                        selectableRows
                                                        onRowDoubleClicked={(row) => handleEditAux(row, 'in')}
                                                        noDataComponent="Não existem dados disponíveis para exibir."
                                                        customStyles={customStyles}
                                                        striped
                                                        defaultSortAsc={true}
                                                        defaultSortFieldId="auxNo"
                                                    />
                                                }
                                            </Col>
                                            <Col>
                                                <h6>Saídas</h6>
                                                {loadingAuxOutData ?
                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                                                        <Spinner style={{ width: 50, height: 50 }} animation="border" />
                                                    </div> :
                                                    <DataTable
                                                        columns={auxColumns}
                                                        data={auxOut}
                                                        pagination
                                                        paginationComponentOptions={paginationOptions}
                                                        paginationPerPage={5}
                                                        paginationRowsPerPageOptions={[5, 10]}
                                                        selectableRows
                                                        onRowDoubleClicked={(row) => handleEditAux(row, 'out')}
                                                        noDataComponent="Não existem dados disponíveis para exibir."
                                                        customStyles={customStyles}
                                                        striped
                                                        defaultSortAsc={true}
                                                        defaultSortFieldId="auxNo"
                                                    />
                                                }
                                            </Col>
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
                    onClose={() => {
                        setShowUpdateModal(false)
                        setLoadingDoorData(false)
                    }}
                    onUpdate={updateDoor}
                    entity={selectedDoor}
                    fields={doorsFields}
                    title="Atualizar Porta"
                    canMoveNext={currentDoorIndex < door.length - 1}
                    canMovePrev={currentDoorIndex > 0}
                    onNext={handleNextDoor}
                    onPrev={handlePrevDoor}
                />
            )}
            {selectedAuxIn && (
                <UpdateModalAux
                    open={showAuxUpdateModal}
                    onClose={() => handleCloseAuxModal('in')}
                    onUpdate={updateAux}
                    entity={selectedAuxIn}
                    fields={auxiliariesFields}
                    title="Atualizar Auxiliar IN"
                    canMoveNext={currentAuxInIndex < auxIn.length - 1}
                    canMovePrev={currentAuxInIndex > 0}
                    onNext={() => handleNextAux('in')}
                    onPrev={() => handlePrevAux('in')}
                />
            )}
            {selectedAuxOut && (
                <UpdateModalAux
                    open={showAuxUpdateModal}
                    onClose={() => handleCloseAuxModal('out')}
                    onUpdate={updateAux}
                    entity={selectedAuxOut}
                    fields={auxiliariesFields}
                    title="Atualizar Auxiliar OUT"
                    canMoveNext={currentAuxOutIndex < auxOut.length - 1}
                    canMovePrev={currentAuxOutIndex > 0}
                    onNext={() => handleNextAux('out')}
                    onPrev={() => handlePrevAux('out')}
                />
            )}
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
                <Button variant="outline-info" onClick={handleDuplicateClick}>Duplicar</Button>
                <Button variant="outline-secondary" onClick={onClose}>Fechar</Button>
                <Button variant="outline-primary" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
}