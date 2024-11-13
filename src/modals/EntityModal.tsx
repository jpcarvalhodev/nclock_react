import React from 'react';
import { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
import no_image from '../assets/img/terminais/no_image.png';
import * as apiService from "../helpers/apiService";
import { DeleteModal } from './DeleteModal';
import { CustomOutlineButton } from '../components/CustomOutlineButton';
import { set } from 'date-fns';

// Interface para as propriedades do modal
interface UpdateModalProps<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onUpdate: (data: FormData) => void;
    onSave: (data: FormData) => void;
    fields: Field[];
    entity: T;
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

export const EntityModal = <T extends Record<string, any>>({ title, open, onClose, onUpdate, onSave, fields, entity }: UpdateModalProps<T>) => {
    const [formData, setFormData] = useState<Partial<T>>({ ...entity });
    const [entities, setEntities] = useState<T[]>([]);
    const [selectedEntity, setSelectedEntity] = useState<T | null>(entity);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [deviceImage, setDeviceImage] = useState<string | ArrayBuffer | null>(null);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const fileInputRef = React.createRef<HTMLInputElement>();
    const [selectedEntityToDelete, setSelectedEntityToDelete] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    // Atualiza o estado do componente ao abrir o modal
    useEffect(() => {
        if (entity) {
            setFormData({ ...entity });
            setEntities(prevEntities => {
                const existingEntityIndex = prevEntities.findIndex(ent => ent.id === entity.id);
                if (existingEntityIndex !== -1) {
                    const newEntities = [...prevEntities];
                    newEntities[existingEntityIndex] = entity;
                    return newEntities;
                } else {
                    return [...prevEntities, entity];
                }
            });
        } else {
            setFormData({});
            setDeviceImage(null);
            setEntities([]);
            setSelectedEntity(null);
        }
    }, [entity, open]);

    // UseEffect para carregar as entidades
    useEffect(() => {
        if (entities.length > 0 && Array.isArray(entities[0])) {
            const flattenedEntities = entities.reduce<T[]>((acc, val) => acc.concat(val), []);
            setEntities(flattenedEntities);
        }
    }, [entities]);

    // Uso de useEffect para lidar com mudanças no selectedEntity
    useEffect(() => {
        if (selectedEntity) {
            setFormData({ ...selectedEntity });
            updateImageForSelectedEntity(selectedEntity);
        } else {
            clearFormData();
            setDeviceImage(null);
        }
    }, [selectedEntity]);

    // Função para atualizar as entidades
    const refreshEntities = async () => {
        const data = await apiService.fetchAllCompanyConfig();
        setEntities(data);
        if (!data.some((ent: T) => ent.id === selectedEntity?.id)) {
            setSelectedEntity(null);
            clearFormData();
            setDeviceImage(null);
        }
    }

    // Função para eliminar uma entidade
    const handleDeleteEntity = async (id: string) => {
        try {
            const data = await apiService.deleteCompanyConfig(id);
            toast.success(data.message || 'Entidade eliminada com sucesso.');
            if (selectedEntity?.id === id) {
                clearFormData();
                setDeviceImage(null);
                setSelectedEntity(null);
            }
        } catch (error) {
            console.error('Erro ao eliminar a entidade', error);
        } finally {
            refreshEntities();
        }
    }

    // Função para limpar todos os campos do formulário
    const clearFormData = () => {
        const newFormData: Record<string, any> = {};
        fields.forEach(field => {
            newFormData[field.key] = '';
        });
        setFormData(newFormData as Partial<T>);
        setDeviceImage(null);
    };

    // Função para selecionar a entidade
    const selectEntity = (entity: T) => {
        setSelectedEntity(entity);
        updateImageForSelectedEntity(entity);
    };

    // Define a abertura do modal de apagar controle de acesso
    const handleOpenDeleteModal = (id: string) => {
        if (selectedEntity?.id) {
            setSelectedEntityToDelete(id);
            setShowDeleteModal(true);
        } else {
            toast.warn('Selecione uma entidade para eliminar.');
        }
    };

    // Função para atualizar a imagem da entidade selecionada
    const updateImageForSelectedEntity = (entity: T) => {
        const imageURL = entity.logotipo ? `${apiService.baseURL}${entity.logotipo}` : no_image;
        setDeviceImage(imageURL);
    };

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

    // Função para lidar com a mudança da imagem
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImageFile(file);
            const objectUrl = URL.createObjectURL(file);
            setDeviceImage(objectUrl);
        }
    };

    // Função para acionar o popup de seleção de arquivo
    const triggerFileSelectPopup = () => fileInputRef.current?.click();

    // Função para lidar com a mudança dos campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData(prev => ({ ...prev, [name]: newValue }));
    };

    // Função para lidar com o clique no botão de salvar
    const handleSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        handleSave();
    };

    // Função para lidar com o clique no botão de atualizar
    const handleUpdateSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        handleUpdate();
    };

    // Função para lidar com o salvamento
    const handleSave = () => {

        const dataToSend = new FormData();

        if (formData.nome) {
            dataToSend.append('Nome', formData.nome);
        }
        if (formData.morada) {
            dataToSend.append('morada', formData.morada);
        }
        if (formData.cPostal) {
            dataToSend.append('CPostal', formData.cPostal);
        }
        if (formData.localidade) {
            dataToSend.append('Localidade', formData.localidade);
        }
        if (formData.telefone) {
            dataToSend.append('Telefone', formData.telefone);
        }
        if (formData.telemovel) {
            dataToSend.append('Telemovel', formData.telemovel);
        }
        if (formData.email) {
            dataToSend.append('Email', formData.email);
        }
        if (formData.nif) {
            dataToSend.append('NIF', formData.nif);
        }
        if (formData.www) {
            dataToSend.append('WWW', formData.www);
        }
        if (formData.observacoes) {
            dataToSend.append('Observacoes', formData.observacoes);
        }
        if (formData.enabled) {
            dataToSend.append('Enabled', formData.enabled);
        }
        if (profileImageFile) {
            dataToSend.append('Logotipo', profileImageFile);
        }

        onSave(dataToSend);
        onClose();
    };

    // Função para lidar com a atualização
    const handleUpdate = () => {

        const dataToSend = new FormData();

        dataToSend.append('id', selectedEntity?.id);

        if (formData.nome) {
            dataToSend.append('Nome', formData.nome);
        }
        if (formData.morada) {
            dataToSend.append('morada', formData.morada);
        }
        if (formData.cPostal) {
            dataToSend.append('CPostal', formData.cPostal);
        }
        if (formData.localidade) {
            dataToSend.append('Localidade', formData.localidade);
        }
        if (formData.telefone) {
            dataToSend.append('Telefone', formData.telefone);
        }
        if (formData.telemovel) {
            dataToSend.append('Telemovel', formData.telemovel);
        }
        if (formData.email) {
            dataToSend.append('Email', formData.email);
        }
        if (formData.nif) {
            dataToSend.append('NIF', formData.nif);
        }
        if (formData.www) {
            dataToSend.append('WWW', formData.www);
        }
        if (formData.observacoes) {
            dataToSend.append('Observacoes', formData.observacoes);
        }
        if (formData.enabled) {
            dataToSend.append('Enabled', formData.enabled);
        }
        if (profileImageFile) {
            dataToSend.append('Logotipo', profileImageFile);
        } else if (deviceImage && typeof deviceImage === 'string') {
            const relativePath = deviceImage.replace(apiService.baseURL, '');
            dataToSend.append('Logotipo', relativePath);
        }

        onUpdate(dataToSend);
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static" dialogClassName="modal-scrollable" size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Form style={{ display: 'flex' }}>
                    <Row style={{ flex: 1.5 }}>
                        <Col md={12}>
                            <Table striped bordered hover size="md">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>NIF</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entities.map((ent, index) => (
                                        <tr key={index} onClick={() => selectEntity(ent)} style={{ cursor: 'pointer' }}>
                                            <td>{ent.nome}</td>
                                            <td>{ent.nif}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div style={{ display: 'flex' }}>
                                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(selectedEntity?.id)}>
                                    <i className="bi bi-trash-fill"></i>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ flex: 2 }}>
                        <Row>
                            <Col md={12} className='img-modal'>
                                <img
                                    src={deviceImage || no_image}
                                    alt="Logo da entidade"
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
                            </Col>
                        </Row>
                        <Col md={6}>
                            <Form.Group controlId="formEnabled" className='mt-4' style={{ marginBottom: 14 }}>
                                <Form.Check
                                    type="switch"
                                    name="enabled"
                                    label="Activo"
                                    checked={formData.enabled}
                                    onChange={handleChange}
                                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row-reverse', padding: 0 }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formMorada">
                                <Form.Label>Morada</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="text"
                                    name="morada"
                                    value={formData.morada}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCPostal">
                                <Form.Label>Código Postal</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="text"
                                    name="cPostal"
                                    value={formData.cPostal}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formTelemovel">
                                <Form.Label>Telemóvel</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="text"
                                    name="telemovel"
                                    value={formData.telemovel}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formNif">
                                <Form.Label>NIF<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-nif">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="number"
                                        name="nif"
                                        value={formData.nif}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['nif'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['nif']}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formNome">
                                <Form.Label>Nome<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-nome">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        className="custom-input-height custom-select-font-size"
                                        type="text"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['nome'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['nome']}</div>}
                            </Form.Group>
                            <Form.Group controlId="formLocalidade">
                                <Form.Label>Localidade</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="text"
                                    name="localidade"
                                    value={formData.localidade}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formTelefone">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="text"
                                    name="telefone"
                                    value={formData.telefone}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formWww">
                                <Form.Label>Website</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="url"
                                    name="www"
                                    value={formData.www}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Row style={{ flex: 1 }}>
                            <Form.Group controlId="formObservacoes">
                                <Form.Label>Observações</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="observacoes"
                                    value={formData.observacoes}
                                    onChange={handleChange}
                                    className="custom-select-font-size textarea"
                                />
                            </Form.Group>
                        </Row>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>
                    Fechar
                </Button>
                <Button variant="outline-info" onClick={handleUpdateSaveClick}>
                    Atualizar
                </Button>
                <Button variant="outline-primary" onClick={handleSaveClick}>
                    Criar
                </Button>
            </Modal.Footer>
            {showDeleteModal && (
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteEntity}
                    entityId={selectedEntityToDelete}
                />
            )}
        </Modal>
    );
}