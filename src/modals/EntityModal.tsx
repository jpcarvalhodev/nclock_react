import React from 'react';
import { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
import no_image from '../assets/img/terminais/no_image.png';
import { Entity } from '../helpers/Types';

// Interface para as propriedades do modal
interface UpdateModalProps<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onUpdate: (data: T) => void;
    fields: Field[];
    entities: T[];
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

export const EntityModal = <T extends Record<string, any>>({ title, open, onClose, onUpdate, fields, entity, entities }: UpdateModalProps<T>) => {
    const [formData, setFormData] = useState<Partial<T>>({ ...entity });
    const [selectedEntity, setSelectedEntity] = useState<T>(entity);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [deviceImage, setDeviceImage] = useState<string | ArrayBuffer | null>(null);
    const fileInputRef = React.createRef<HTMLInputElement>();

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
                newErrors[field.key] = `${field.label} não pode ser negativo.`;
            }

            return valid;
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
        validateForm();
    }, [formData, fields]);

    // Atualiza o estado do componente ao abrir o modal
    useEffect(() => {
        if (open) {
            setFormData(entity);
        }
    }, [entity, open]);

    // Função para lidar com o clique na tabela
    useEffect(() => {
        setFormData({ ...selectedEntity });
    }, [selectedEntity]);

    // Função para selecionar a entidade
    const selectEntity = (entity: T) => {
        setSelectedEntity(entity);
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
                        photo: dataUrl
                    }));
                };
                image.src = readerEvent.target?.result as string;
            };
            reader.readAsDataURL(file);
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
            toast.warn('Preencha todos os campos obrigatórios antes de salvar.');
            return;
        }
        handleSave();
    };

    // Função para lidar com o salvamento
    const handleSave = () => {
        onUpdate(formData as T);
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose} dialogClassName="modal-scrollable" size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Form style={{ display: 'flex' }}>
                    <Row style={{ flex: 1 }}>
                        <Col md={10}>
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
                                            <td>{ent.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row style={{ flex: 2 }}>
                        <Col className='img-modal'>
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
                        <Form.Group as={Row} className="mb-3" controlId="formEnabled">
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Form.Check
                                    type="checkbox"
                                    label="Ativar?"
                                    name="enabled"
                                    checked={formData.enabled}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formNome">
                            <Form.Label column sm="2">Nome<span style={{ color: 'red' }}> *</span></Form.Label>
                            <Col sm="10">
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-nome">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        type="text"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['nome'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['nome']}</div>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formMorada">
                            <Form.Label column sm="2">Morada</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    name="morada"
                                    value={formData.morada}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group as={Row} className="mb-3" controlId="formCPostal">
                                    <Form.Label column sm="4">C.Postal</Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            type="text"
                                            name="cPostal"
                                            value={formData.cPostal}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group as={Row} className="mb-3" controlId="formLocalidade">
                                    <Form.Label column sm="4">Localidade</Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            type="text"
                                            name="localidade"
                                            value={formData.localidade}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group as={Row} className="mb-3" controlId="formTelefone">
                                    <Form.Label column sm="4">Telefone</Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            type="text"
                                            name="telefone"
                                            value={formData.telefone}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group as={Row} className="mb-3" controlId="formTelemovel">
                                    <Form.Label column sm="4">Telemóvel</Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            type="text"
                                            name="telemovel"
                                            value={formData.telemovel}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group as={Row} className="mb-3" controlId="formEmail">
                            <Form.Label column sm="2">Email</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formNif">
                            <Form.Label column sm="2">NIF<span style={{ color: 'red' }}> *</span></Form.Label>
                            <Col sm="10">
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-nif">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        type="number"
                                        name="nif"
                                        value={formData.nif}
                                        onChange={handleChange}
                                    />
                                </OverlayTrigger>
                                {errors['nif'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['nif']}</div>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formWww">
                            <Form.Label column sm="2">Website</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="url"
                                    name="www"
                                    value={formData.www}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formObservacoes">
                            <Form.Label column sm="2">Observações</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="observacoes"
                                    value={formData.observacoes}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={handleSaveClick}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}