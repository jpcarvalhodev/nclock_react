import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

import { CustomOutlineButton } from '../components/CustomOutlineButton';
import { Ads } from '../types/Types';

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
}

// Define as propriedades do componente
interface UpdateModalProps<T extends Entity> {
    open: boolean;
    onClose: () => void;
    onDuplicate: (entity: Partial<T>) => void;
    onUpdate: (entity: Ads | FormData) => Promise<void>;
    entity: T;
    fields: Field[];
    title: string;
    entities: 'all' | 'photo' | 'video';
    onNext: () => void;
    onPrev: () => void;
    canMoveNext: boolean;
    canMovePrev: boolean;
}

// Interface para os ficheiros com ordem
interface FileWithOrder {
    file: File;
    ordem: number;
}

// Define o componente
export const UpdateModalAds = <T extends Entity>({ title, open, onClose, onUpdate, onDuplicate, entity, entities, fields, canMoveNext, canMovePrev, onNext, onPrev }: UpdateModalProps<T>) => {
    const [formData, setFormData] = useState<Partial<T>>({ ...entity });
    const [files, setFiles] = useState<FileWithOrder[]>([]);
    const [fileInputKey, setFileInputKey] = useState(Date.now());

    // Função para resetar o input de arquivo
    const resetFileInput = () => {
        setFileInputKey(Date.now());
    };

    // Usa useEffect para inicializar o formulário
    useEffect(() => {
        const username = localStorage.getItem('username');
        if (open && username && entity) {
            setFormData({ ...entity });
            setFormData((prevData) => ({ ...prevData, Creador: username }));
        }
    }, [open, entity]);

    // Extensões permitidas para imagens e vídeos
    const allowedImageExtensions = ['jpg', 'jpeg', 'png'];
    const allowedVideoExtensions = ['mp4', 'avi', 'mov', 'mkv'];

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

    // Função para lidar com a mudança de ordem dos ficheiros
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

    // Função para manipular o clique no botão Duplicar
    const handleDuplicateClick = () => {
        if (!onDuplicate) return;
        const { id, ...dataWithoutId } = formData;
        onDuplicate(dataWithoutId as Partial<T>);
    };

    // Função para remover um ficheiro
    const handleRemoveFile = () => {
        setFiles([]);
        resetFileInput();
    };

    // Função para salvar os dados
    const handleSave = () => {
        const dataToSend = new FormData();
        const imageFiles: FileWithOrder[] = [];
        const videoFiles: FileWithOrder[] = [];

        dataToSend.append('id', entity.id);

        files.forEach(fileWithOrder => {
            if (allowedImageExtensions.some(ext => fileWithOrder.file.name.toLowerCase().endsWith(ext))) {
                imageFiles.push(fileWithOrder);
            } else if (allowedVideoExtensions.some(ext => fileWithOrder.file.name.toLowerCase().endsWith(ext))) {
                videoFiles.push(fileWithOrder);
            }
        });

        if (formData.Creador) {
            dataToSend.append('Creador', formData.Creador);
        }

        if (formData.desativar) {
            dataToSend.append('Desativar', formData.desativar);
        }

        if (imageFiles.length > 0) {
            if (formData.nomeArquivo) {
                dataToSend.append('Nome', formData.nomeArquivo);
            }
            dataToSend.append('Ordem', imageFiles.map(f => f.ordem.toString()).join(','));
            imageFiles.forEach(f => {
                dataToSend.append('NovosArquivos', f.file, f.file.name);
            });
        }

        if (videoFiles.length > 0) {
            if (formData.nomeArquivo) {
                dataToSend.append('Nome', formData.nomeArquivo);
            }
            dataToSend.append('Ordem', videoFiles.map(f => f.ordem.toString()).join(','));
            videoFiles.forEach(f => {
                dataToSend.append('NovosArquivos', f.file, f.file.name);
            });
        }

        if (formData.tempoExecucaoImagens && imageFiles.length > 0) {
            dataToSend.append('TemposExecucaoImagens', formData.tempoExecucaoImagens);
        }

        if (formData.dataFim && imageFiles.length > 0) {
            dataToSend.append('DataFim', formData.dataFim);
        }

        if (formData.dataFim && videoFiles.length > 0) {
            dataToSend.append('DataFim', formData.dataFim);
        }

        onUpdate(dataToSend);
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static" size="xl" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formFile">
                                <Form.Label>Upload de Ficheiros<span style={{ color: 'red' }}> *</span></Form.Label>
                                <Form.Control
                                    key={fileInputKey}
                                    className="custom-input-height custom-select-font-size"
                                    type="file"
                                    accept={getAcceptedFileTypes()}
                                    multiple
                                    onChange={handleFilesChange}
                                />
                            </Form.Group>
                            {files.map((fileObj, index) => (
                                <Row key={fileObj.file.name} className="align-items-center mt-2">
                                    <Col md={8}>
                                        <div>{fileObj.file.name}</div>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control
                                            type="number"
                                            value={fileObj.ordem}
                                            onChange={(e) => handleOrderChange(index, parseInt(e.target.value))}
                                            className="custom-input-height custom-select-font-size"
                                        />
                                    </Col>
                                    <Col md={1} className="d-flex justify-content-center align-content-center">
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleRemoveFile()}
                                        >
                                            X
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formDesativar" className='d-flex justify-content-between mt-3'>
                                        <Form.Label>Desactivar?</Form.Label>
                                        <Form.Check
                                            type="switch"
                                            name="Desativar"
                                            checked={formData.Desativar}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formNomeArquivo">
                                        <Form.Label>Nome</Form.Label>
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
                                    <Form.Group controlId="formTempoExecucaoImagens">
                                        <Form.Label>Tempo de Execução</Form.Label>
                                        <Form.Control
                                            className="custom-input-height custom-select-font-size"
                                            type="number"
                                            name="tempoExecucaoImagens"
                                            value={formData.tempoExecucaoImagens || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formDataFim">
                                        <Form.Label>Data para Encerrar</Form.Label>
                                        <Form.Control
                                            className="custom-input-height custom-select-font-size"
                                            type="date"
                                            name="dataFim"
                                            value={formData.dataFim || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
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
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleDuplicateClick}>
                    Duplicar
                </Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={onClose}>
                    Fechar
                </Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal >
    );
};