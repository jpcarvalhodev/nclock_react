import { useEffect, useState } from 'react';
import { Modal, Button, Form, Col, Tabs, Tab } from 'react-bootstrap';
import "../css/TerminalOptionsModal.css";

interface TerminalOptionsModalProps<T> {
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    initialValues: Partial<T>;
};

export const TerminalOptionsModal = <T extends Record<string, any>>({ open, onClose, onSave, initialValues }: TerminalOptionsModalProps<T>) => {
    const [formData, setFormData] = useState<Partial<T>>({ ...initialValues, status: true });
    const [error, setError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [ipAddress, setIpAddress] = useState('');
    const [show, setShow] = useState(open);

    /* // UseEffect para validar o formulário
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
    }; */

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
        //validateForm();
    };

    const handleClose = () => {
        setFormData({});
        onClose();
    };

    const handleSave = () => {
        onSave(formData as T);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Opções</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey="general" id="general-tab" className="terminal-options-tabs mb-3">
                        <Tab eventKey="general" title="Geral">
                            <Form>
                                <Form.Group as={Col} controlId="formBasicEmail" className='terminal-options-checkboxes'>
                                    <div className="input-container">
                                        <Form.Label>Tempo de espera nas ligações (ms)</Form.Label>
                                        <Form.Control type="number" />
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formBasicRetry" className='terminal-options-checkboxes'>
                                    <div className="input-container">
                                        <Form.Label>Tempo entre tentativas nas ligações</Form.Label>
                                        <Form.Control type="time" />
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formBasicCheckbox" className='terminal-options-checkboxes'>
                                    <Form.Label>Movimentos em tempo real</Form.Label>
                                    <Form.Check type="checkbox" />
                                </Form.Group>

                                <Form.Group as={Col} className='terminal-options-checkboxes'>
                                    <Form.Label>Apagar movimentos no terminal após recolha</Form.Label>
                                    <Form.Check type="checkbox" />
                                </Form.Group>

                                <Form.Group as={Col} className='terminal-options-checkboxes'>
                                    <div className="input-container">
                                        <Form.Label>Acertar data/hora em intervalos de</Form.Label>
                                        <Form.Control as="select">
                                            <option>1:00</option>
                                            <option>2:00</option>
                                            <option>12:00</option>
                                            <option>24:00</option>
                                        </Form.Control>
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} className='terminal-options-checkboxes'>
                                    <div className="input-container">
                                        <Form.Label>Tempo de abertura do relé</Form.Label>
                                        <Form.Control type="number" />
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} className='terminal-options-checkboxes'>
                                    <div className="input-container">
                                        <Form.Label>Nº de tarefas em simultâneo</Form.Label>
                                        <Form.Control type="number" />
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} className='terminal-options-checkboxes'>
                                    <div className="input-container">
                                        <Form.Label>Tempo de espera pela execução de tarefas (min.)</Form.Label>
                                        <Form.Control type="number" />
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} className='terminal-options-checkboxes'>
                                    <Form.Label>Sincronizar após alterações (Naccess)</Form.Label>
                                    <Form.Check type="checkbox" />
                                </Form.Group>
                            </Form>
                        </Tab>
                        <Tab eventKey="systemActivity" title="Actividade do sistema">
                            <Form>
                                <Form.Group as={Col} controlId="serviceLanguage">
                                    <div className="input-container" style={{ marginBottom: 15 }}>
                                        <Form.Label>Idioma do serviço:</Form.Label>
                                        <Form.Control as="select" defaultValue="Português">
                                            <option value="Português">Português</option>
                                            <option value="Inglês">Inglês</option>
                                        </Form.Control>
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} controlId="saveOptions">
                                    <Form.Label>Guardar:</Form.Label>
                                    <div className="mb-3">
                                        <Form.Group as={Col} controlId="formBasicCheckbox" className='terminal-options-checkboxes-2'>
                                            <Form.Label>Ficheiro de texto</Form.Label>
                                            <Form.Check type="checkbox" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formBasicCheckbox" className='terminal-options-checkboxes-2'>
                                            <Form.Label>Base de dados</Form.Label>
                                            <Form.Check type="checkbox" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formBasicCheckbox" className='terminal-options-checkboxes-2'>
                                            <Form.Label>Eventos do Windows</Form.Label>
                                            <Form.Check type="checkbox" />
                                        </Form.Group>
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} controlId="level">
                                    <div className="input-container">
                                        <Form.Label>Nível:</Form.Label>
                                        <Form.Control as="select" >
                                            <option value="Nivel 1">Nivel 1</option>
                                            <option value="Nivel 2">Nivel 2</option>
                                            <option value="Nivel 3">Nivel 3</option>
                                        </Form.Control>
                                    </div>
                                </Form.Group>
                            </Form>
                        </Tab>
                        <Tab eventKey="scheduledTasks" title="Tarefas Agendadas">
                            <Form>
                                <Form.Group as={Col} controlId="formBasicCheckbox" className='terminal-options-checkboxes-2'>
                                    <Form.Label>Não criar/alterar utilizadores na recolha</Form.Label>
                                    <Form.Check type="checkbox" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicCheckbox" className='terminal-options-checkboxes-2'>
                                    <Form.Label>Não apagar utilizadores no envio</Form.Label>
                                    <Form.Check type="checkbox" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicCheckbox" className='terminal-options-checkboxes-2'>
                                    <Form.Label>Recolher/Sincronizar utilizadores</Form.Label>
                                    <Form.Check type="checkbox" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicCheckbox" className='terminal-options-checkboxes-2'>
                                    <Form.Label>Recolher/Enviar utilizadores</Form.Label>
                                    <Form.Check type="checkbox" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicCheckbox" className='terminal-options-checkboxes-2'>
                                    <Form.Label>Recolher utilizadores</Form.Label>
                                    <Form.Check type="checkbox" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicCheckbox" className='terminal-options-checkboxes-2'>
                                    <Form.Label>Sincronizar utilizador</Form.Label>
                                    <Form.Check type="checkbox" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicCheckbox" className='terminal-options-checkboxes-2'>
                                    <Form.Label>Enviar utilizadores</Form.Label>
                                    <Form.Check type="checkbox" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicCheckbox" className='terminal-options-checkboxes-2'>
                                    <Form.Label>Reiniciar terminais</Form.Label>
                                    <Form.Check type="checkbox" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicCheckbox" className='terminal-options-checkboxes-2'>
                                    <Form.Label>Importar ficheiros de movimentos</Form.Label>
                                    <Form.Check type="checkbox" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicCheckbox" className='terminal-options-checkboxes-2'>
                                    <Form.Label>Recolher movimentos e limpar memória</Form.Label>
                                    <Form.Check type="checkbox" />
                                </Form.Group>
                            </Form>
                        </Tab>
                        <Tab eventKey="protocol" title="Protocolo">
                            <Form>
                                <Form.Group as={Col} controlId="appServer" className='terminal-options-checkboxes'>
                                    <div className="input-container">
                                        <Form.Label>Servidor de aplicações</Form.Label>
                                        <Form.Control type="number" />
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} controlId="appServerPort" className='terminal-options-checkboxes'>
                                    <div className="input-container">
                                        <Form.Label>Porta</Form.Label>
                                        <Form.Control type="number" />
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} controlId="usePing" className='terminal-options-checkboxes'>
                                    <Form.Label>Usar comando ping para testar conectividade de equipamentos</Form.Label>
                                    <Form.Check type="checkbox" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="pushServer" className='terminal-options-checkboxes'>
                                    <div className="input-container">
                                        <Form.Label>Servidor Push</Form.Label>
                                        <Form.Control type="text" />
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} controlId="pushServerPort" className='terminal-options-checkboxes'>
                                    <div className="input-container">
                                        <Form.Label>Porta</Form.Label>
                                        <Form.Control type="number" />
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} controlId="IDServerLPR" className='terminal-options-checkboxes'>
                                    <Form.Label>Ligação ao IDServerLPR</Form.Label>
                                    <Form.Check type="checkbox" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="logT" className='terminal-options-checkboxes'>
                                    <Form.Label>T.log</Form.Label>
                                    <Form.Check type="checkbox" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="offlineAlerts" className='terminal-options-checkboxes'>
                                    <div className="input-container">
                                        <Form.Label>Alertas de terminais offline</Form.Label>
                                        <Form.Control type="number" />
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} controlId="offlineEmail" className='terminal-options-checkboxes'>
                                    <div className="input-container">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" />
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} controlId="ftpIP" className='terminal-options-checkboxes'>
                                    <div className="input-container">
                                        <Form.Label>IP</Form.Label>
                                        <Form.Control type="text" />
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} controlId="ftpPort" className='terminal-options-checkboxes'>
                                    <div className="input-container">
                                        <Form.Label>Porta</Form.Label>
                                        <Form.Control type="number" />
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} controlId="ftpTimeout" className='terminal-options-checkboxes'>
                                    <div className="input-container">
                                        <Form.Label>Tempo de espera (segundos)</Form.Label>
                                        <Form.Control type="number" />
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} controlId="logRemovalDays" className='terminal-options-checkboxes'>
                                    <div className="input-container">
                                        <Form.Label>Remover log após (Dias)</Form.Label>
                                        <Form.Control type="number" />
                                    </div>
                                </Form.Group>
                            </Form>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="outline-primary" onClick={handleSave}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};