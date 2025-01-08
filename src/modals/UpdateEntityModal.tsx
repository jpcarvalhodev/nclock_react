import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';

import no_entity from '../assets/img/navbar/no_entity.png';
import { CustomOutlineButton } from '../components/CustomOutlineButton';
import * as apiService from "../helpers/apiService";

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
    onDuplicate?: (data: Partial<T>) => void;
    onUpdate: (data: FormData) => void;
    fields: Field[];
    entity: T;
    onNext: () => void;
    onPrev: () => void;
    canMoveNext: boolean;
    canMovePrev: boolean;
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

export const UpdateEntityModal = <T extends Entity>({ title, open, onClose, onUpdate, onDuplicate, fields, entity, canMoveNext, canMovePrev, onNext, onPrev }: UpdateModalProps<T>) => {
    const [formData, setFormData] = useState<Partial<T>>({ ...entity });
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [deviceImage, setDeviceImage] = useState<string | ArrayBuffer | null>(null);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const fileInputRef = React.createRef<HTMLInputElement>();
    const [showValidationErrors, setShowValidationErrors] = useState(false);

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

    // Atualiza o estado do componente ao abrir o modal
    useEffect(() => {
        if (open && entity) {
            setFormData({ ...entity });
            const imageURL = entity.logotipo ? `${apiService.baseURL}${entity.logotipo}` : no_entity;
            setDeviceImage(imageURL);
        } else {
            setFormData({});
            setDeviceImage(null);
        }
    }, [open, entity]);

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

    // Função para lidar com a mudança da imagem
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImageFile(file);
            const objectUrl = URL.createObjectURL(file);
            setDeviceImage(objectUrl);
        }
    };

    // Função para manipular o clique no botão Duplicar
    const handleDuplicateClick = () => {
        if (!onDuplicate) return;
        const { id, ...dataWithoutId } = formData;
        onDuplicate(dataWithoutId as Partial<T>);
    };

    // Função para acionar o popup de seleção de arquivo
    const triggerFileSelectPopup = () => fileInputRef.current?.click();

    // Define a função para resetar a foto de perfil
    const resetToDefaultAvatar = () => {
        setDeviceImage(no_entity);
        setFormData({ ...formData, logotipo: null });
    };

    // Função para lidar com a mudança dos campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        if (showValidationErrors) {
            setShowValidationErrors(false);
        }
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData(prev => ({ ...prev, [name]: newValue }));
    };

    // Função para lidar com o clique no botão de salvar
    const handleSaveClick = () => {
        if (!isFormValid) {
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar.');
            return;
        }
        handleUpdate();
    };

    // Função para lidar com a atualização
    const handleUpdate = () => {
        console.log('formData', formData);

        const dataToSend = new FormData();

        dataToSend.append('id', entity.id);

        if (formData.nome) {
            dataToSend.append('Nome', formData.nome);
        }
        if (formData.morada) {
            dataToSend.append('Morada', formData.morada);
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
            const relativePath = deviceImage.replace(apiService.baseURL || '', '');
            dataToSend.append('Logotipo', relativePath);
        }

        onUpdate(dataToSend);
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static" dialogClassName="modal-scrollable" size="xl" style={{ marginTop: 50 }}>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Row>
                            <Col md={12} className='img-modal'>
                                <img
                                    src={deviceImage || no_entity}
                                    alt="Logo da entidade"
                                    style={{ width: 128, height: 128, cursor: 'pointer', marginBottom: 15, objectFit: 'cover', borderRadius: '10%' }}
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
                                <div>
                                    <Button variant="outline-danger" onClick={resetToDefaultAvatar} size='sm'>
                                        Remover Foto
                                    </Button>
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
                                        className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
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
                                        className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
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
                        <Row>
                            <Col md={12}>
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
                            </Col>
                        </Row>
                    </Row>
                </div>
            </Modal.Body>
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
                <Button variant="outline-info" onClick={handleDuplicateClick}>
                    Duplicar
                </Button>
                <Button variant="outline-secondary" onClick={onClose}>
                    Fechar
                </Button>
                <Button variant="outline-primary" onClick={handleSaveClick}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}