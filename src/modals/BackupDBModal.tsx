import { useEffect, useState } from 'react';
import { Col, Form, Nav, Row, Tab } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import '../css/PagesStyles.css';
import { BackupDB } from '../types/Types';

// Define a interface para as propriedades do componente
interface FieldConfig {
    label: string;
    key: string;
    type: string;
    required?: boolean;
    validate?: (value: any) => boolean;
    errorMessage?: string;
}

// Define a interface para as propriedades do componente
interface Props<T> {
    open: boolean;
    onClose: () => void;
    onSave: (formData: BackupDB) => Promise<void>;
    onUpdate: (formData: FormData) => Promise<void>;
    fields: FieldConfig[];
    title: string;
}

export const BackupDBModal = <T extends Record<string, any>>({ title, open, onClose, onSave, onUpdate }: Props<T>) => {
    const [formData, setFormData] = useState<T>({} as T);
    const [file, setFile] = useState<File | null>(null);
    const [activeKey, setActiveKey] = useState<string>('exportBackup');

    // Efeito para limpar os campos do formulário
    useEffect(() => {
        if (!open) {
            setFormData({} as T);
            setFile(null);
        }
    }, [open]);

    // Função para lidar com a mudança de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Função para lidar com a mudança de arquivo
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    // Função para lidar com o clique em exportar
    const handleSaveClick = () => {
        onSave(formData as unknown as BackupDB);
        onClose();
    };

    // Função para lidar com o clique em atualizar
    const handleUpdateClick = () => {
        if (file) {
            const fileToSend = new FormData();
            fileToSend.append('fileName', file);
            onUpdate(fileToSend);
            onClose();
        }
    }

    return (
        <Modal show={open} onHide={onClose} backdrop="static" dialogClassName="modal-scrollable" size='lg' centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Tab.Container defaultActiveKey="exportBackup" activeKey={activeKey} onSelect={key => setActiveKey(key!)}>
                        <Nav variant="tabs" className="nav-modal">
                            <Nav.Item>
                                <Nav.Link eventKey="exportBackup">Exportar Backup</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="importBackup">Importar Backup</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="exportBackup">
                                <Form style={{ marginTop: 20, marginBottom: 20, display: 'flex' }}>
                                    <Row style={{ flex: 1.5 }}>
                                        <Col md={6}>
                                            <Form.Group controlId="formBackupName">
                                                <Form.Label>Nome do Backup</Form.Label>
                                                <Form.Control
                                                    className="custom-input-height form-control custom-select-font-size"
                                                    type="text"
                                                    name="backupName"
                                                    value={formData.backupName || ''}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Tab.Pane>
                            <Tab.Pane eventKey="importBackup">
                                <Form style={{ marginTop: 20, marginBottom: 20, display: 'flex' }}>
                                    <Row style={{ flex: 1.5 }}>
                                        <Col md={6}>
                                            <Form.Group controlId="formFile">
                                                <Form.Control
                                                    className="custom-input-height custom-select-font-size"
                                                    type="file"
                                                    multiple
                                                    onChange={handleFileChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button variant="outline-dark" onClick={onClose}>Fechar</Button>
                {activeKey === 'exportBackup' && <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleSaveClick}>Exportar</Button>}
                {activeKey === 'importBackup' && <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleUpdateClick}>Importar</Button>}
            </Modal.Footer>
        </Modal >
    );
};
