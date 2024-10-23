import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, Row } from 'react-bootstrap';

// Interface para as propriedades do modal
interface CreateModalProps<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T | FormData) => void;
    fields: Field[];
    initialValues: Partial<T>;
    entities: 'all' | 'photo' | 'video';
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

// Interface para os ficheiros com ordem
interface FileWithOrder {
    file: File;
    ordem: number;
}

// Define o componente
export const CreateModalAds = <T extends Record<string, any>>({ title, open, onClose, onSave, fields, entities, initialValues }: CreateModalProps<T>) => {
    const [formData, setFormData] = useState<Partial<T>>(initialValues);
    const [files, setFiles] = useState<FileWithOrder[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);

    // Extensões permitidas para imagens e vídeos
    const allowedImageExtensions = ['jpg', 'jpeg', 'png'];
    const allowedVideoExtensions = ['mp4', 'avi', 'mov', 'mkv'];

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
    }, [formData, fields]);

    // UseEffect para definir o campo "Criador" automaticamente a partir do localStorage
    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setFormData((prevData) => ({ ...prevData, Creador: username }));
        }
    }, [open]);

    // Função para lidar com a mudança de valores nos campos
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const parsedValue = type === 'checkbox' ? checked : value;
        setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
    };

    // Função para detectar tipo de arquivo com base na extensão
    const detectFileType = (fileName: string): number => {
        const extension = fileName.split('.').pop()?.toLowerCase();

        if (allowedImageExtensions.includes(extension || '')) {
            return 1;
        } else if (allowedVideoExtensions.includes(extension || '')) {
            return 2;
        }
        return 1;
    };

    // Função para lidar com a mudança de ficheiros
    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = e.target.files ? Array.from(e.target.files) : [];
        const maxOrder = files.reduce((max, file) => Math.max(max, file.ordem), 0);

        const newFilesWithOrder = uploadedFiles.map((file, index) => ({
            file,
            ordem: maxOrder + index + 1
        }));

        const validFiles = uploadedFiles.filter((file) => {
            const extension = file.name.split('.').pop()?.toLowerCase();
            return allowedImageExtensions.includes(extension || '') || allowedVideoExtensions.includes(extension || '');
        });

        if (validFiles.length !== uploadedFiles.length) {
            toast.warn('Algum ficheiro não tem os padrões permitidos.');
        }

        if (validFiles.length > 0) {
            const tipoArquivo = detectFileType(validFiles[0].name);
            const createDate = new Date().toISOString().replace('Z', '').split('.')[0];

            setFiles((prevFiles) => [...prevFiles, ...newFilesWithOrder]);
            setFormData((prevData) => ({
                ...prevData,
                NomeArquivo: validFiles.map((file) => file.name).join(', '),
                TipoArquivo: tipoArquivo,
                createDate: createDate,
            }));
        }
    };

    const handleOrderChange = (index: number, newOrder: number) => {
        if (newOrder <= 0 || isNaN(newOrder)) return;
    
        const newFiles = files.map((file, idx) => {
            if (idx === index) {
                return { ...file, ordem: newOrder };
            }
            return file;
        });
    
        newFiles.sort((a, b) => a.ordem - b.ordem);
    
        setFiles(newFiles);
    };

    // Função para obter os tipos de arquivo aceitos com base na entidade
    const getAcceptedFileTypes = () => {
        switch (entities) {
            case 'photo':
                return allowedImageExtensions.map(ext => `.${ext}`).join(',');
            case 'video':
                return allowedVideoExtensions.map(ext => `.${ext}`).join(',');
            case 'all':
                return allowedImageExtensions.map(ext => `.${ext}`).join(',') + ',' + allowedVideoExtensions.map(ext => `.${ext}`).join(',');
            default:
                return '';
        }
    };

    // Função para verificar se o formulário é válido antes de salvar
    const handleCheckForSave = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        handleSave();
    }

    // Função para salvar os dados
    const handleSave = () => {
        onSave(formData as T);
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formFile">
                                <Form.Label>Upload de Arquivos<span style={{ color: 'red' }}> *</span></Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="file"
                                    accept={getAcceptedFileTypes()}
                                    multiple
                                    onChange={handleFilesChange}
                                />
                            </Form.Group>
                            {files.map((fileObj, index) => (
                                <Row key={fileObj.file.name} className="align-items-center">
                                    <Col md={8}>
                                        <div>{fileObj.file.name}</div>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Control
                                            type="number"
                                            value={fileObj.ordem}
                                            onChange={(e) => handleOrderChange(index, parseInt(e.target.value))}
                                            className="custom-input-height custom-select-font-size"
                                        />
                                    </Col>
                                </Row>
                            ))}
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formDesativar" className='d-flex align-items-center'>
                                        <Form.Label>Activação de Publicidade:</Form.Label>
                                        <Form.Check
                                            type="switch"
                                            label="Desativar"
                                            name="Desativar"
                                            checked={formData.Desativar}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formNomeArquivo">
                                        <Form.Label>Nome do Arquivo</Form.Label>
                                        <Form.Control
                                            className="custom-input-height custom-select-font-size"
                                            type="text"
                                            name="nomeArquivo"
                                            value={formData.nomeArquivo || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formtipoArquivo">
                                        <Form.Label>Tipo de Arquivo</Form.Label>
                                        <Form.Control
                                            className="custom-input-height custom-select-font-size"
                                            as="select"
                                            name="tipoArquivo"
                                            value={formData.tipoArquivo}
                                            onChange={handleChange}
                                        >
                                            {entities !== 'video' && <option value={1}>Imagem</option>}
                                            {entities !== 'photo' && <option value={2}>Vídeo</option>}
                                        </Form.Control>
                                        {errors['tipoArquivo'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['tipoArquivo']}</div>}
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formUpdateDate">
                                        <Form.Label>Data de Atualização</Form.Label>
                                        <Form.Control
                                            className="custom-input-height custom-select-font-size"
                                            type="date"
                                            name="updateDate"
                                            value={
                                                formData.updateDate
                                                    ? new Date(formData.updateDate).toISOString().split('T')[0]
                                                    : ''
                                            }
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>
                    Fechar
                </Button>
                <Button variant="outline-primary" onClick={handleCheckForSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal >
    );
};