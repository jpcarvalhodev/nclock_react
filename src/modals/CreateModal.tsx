import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/PagesStyles.css';
import { fetchWithAuth } from '../components/FetchWithAuth';
import { Tab, Row, Col, Nav, Form } from 'react-bootstrap';
import modalAvatar from '../assets/img/modalAvatar.png';

interface FieldConfig {
    label: string;
    key: string;
    type: string;
    required?: boolean;
    optionsUrl?: string;
    showCodeInsteadOfName?: boolean;
}

interface Props<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    fields: FieldConfig[];
    initialValues: Partial<T>;
}

export const CreateModal = <T extends Record<string, any>>({ title, open, onClose, onSave, fields, initialValues }: Props<T>) => {
    const [formData, setFormData] = useState<Partial<T>>(initialValues);
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);

    useEffect(() => {
        const fetchDropdownOptions = async (field: FieldConfig) => {
            if (field.optionsUrl) {
                const response = await fetchWithAuth(field.optionsUrl);
                if (response.ok) {
                    const data = await response.json();
                    setDropdownData(prev => ({ ...prev, [field.key]: data }));
                }
            }
        };

        fields.forEach(field => {
            if (field.type === 'dropdown') {
                fetchDropdownOptions(field);
            }
        });
    }, [fields]);

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        onSave(formData as T);
    };

    return (
        <Modal show={open} onHide={onClose} dialogClassName="custom-modal" size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Row>
                    <Col md={3} className='img-modal'>
                        <img
                            src={formData.photo || modalAvatar}
                            alt="Profile Avatar"
                        />
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formEnrollNumber">
                            <Form.Label>Número de Matrícula</Form.Label>
                            <Form.Control type="number" className="custom-input-height" />
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" className="custom-input-height" />
                        </Form.Group>
                        <Form.Group controlId="formShortName">
                            <Form.Label>Nome Resumido</Form.Label>
                            <Form.Control type="text" className="custom-input-height" />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formNameAcronym">
                            <Form.Label>Acrônimo do Nome</Form.Label>
                            <Form.Control type="text" className="custom-input-height" />
                        </Form.Group>
                        <Form.Group controlId="formComments">
                            <Form.Label>Comentários</Form.Label>
                            <Form.Control as="text" className="custom-input-height" />
                        </Form.Group>
                        <Form.Group controlId="formType">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control type="text" className="custom-input-height" />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formStatus" className="d-flex align-items-center mb-3">
                            <Form.Label className="mb-0 me-2 flex-shrink-0" style={{ lineHeight: '32px' }}>Status:</Form.Label>
                            <Form.Check
                                type="switch"
                                id="custom-switch-status"
                                checked={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'Ativo' : 'Inativo' })}
                                className="ms-auto"
                                label=""
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatusEmail" className="d-flex align-items-center mb-3">
                            <Form.Label className="mb-0 me-2 flex-shrink-0" style={{ lineHeight: '32px' }}>Status de E-Mail:</Form.Label>
                            <Form.Check
                                type="switch"
                                id="custom-switch-status-email"
                                checked={formData.statusEmail}
                                onChange={(e) => setFormData({ ...formData, statusEmail: e.target.checked ? 'Confirmado' : 'Não Confirmado' })}
                                className="ms-auto"
                                label=""
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Tab.Container defaultActiveKey="dadosPessoais">
                    <Nav variant="tabs" className="mt-3">
                        <Nav.Item>
                            <Nav.Link eventKey="dadosPessoais">Dados Pessoais</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="dadosProfissionais">Dados Profissionais</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="dadosPessoais">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group controlId="formNIF">
                                            <Form.Label>NIF</Form.Label>
                                            <Form.Control type="number" className="custom-input-height" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formAddress">
                                            <Form.Label>Morada</Form.Label>
                                            <Form.Control type="text" className="custom-input-height" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formZipcode">
                                            <Form.Label>Código Postal</Form.Label>
                                            <Form.Control type="text" className="custom-input-height" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formLocality">
                                            <Form.Label>Localidade</Form.Label>
                                            <Form.Control type="text" className="custom-input-height" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group controlId="formVillage">
                                            <Form.Label>Freguesia</Form.Label>
                                            <Form.Control type="text" className="custom-input-height" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formDistrict">
                                            <Form.Label>Distrito</Form.Label>
                                            <Form.Control type="text" className="custom-input-height" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formPhone">
                                            <Form.Label>Telefone</Form.Label>
                                            <Form.Control type="number" className="custom-input-height" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formMobile">
                                            <Form.Label>Telemóvel</Form.Label>
                                            <Form.Control type="number" className="custom-input-height" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group controlId="formEmail">
                                            <Form.Label>E-Mail</Form.Label>
                                            <Form.Control type="email" className="custom-input-height" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formBirthday">
                                            <Form.Label>Data de Nascimento</Form.Label>
                                            <Form.Control type="date" className="custom-input-height custom-select-font-size" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formNacionality">
                                            <Form.Label>Nacionalidade</Form.Label>
                                            <Form.Control type="text" className="custom-input-height" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formGender">
                                            <Form.Label>Gênero</Form.Label>
                                            <Form.Control type="text" className="custom-input-height" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="dadosProfissionais">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group controlId="formBiNumber">
                                            <Form.Label>Número de BI</Form.Label>
                                            <Form.Control type="text" className="custom-input-height" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formBiIssuance">
                                            <Form.Label>Emissão de BI</Form.Label>
                                            <Form.Control type="date" className="custom-input-height custom-select-font-size" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formBiValidity">
                                            <Form.Label>Validade de BI</Form.Label>
                                            <Form.Control type="date" className="custom-input-height custom-select-font-size" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formAdmissionDate">
                                            <Form.Label>Data de Admissão</Form.Label>
                                            <Form.Control type="date" className="custom-input-height custom-select-font-size" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group controlId="formExitDate">
                                            <Form.Label>Data de Saída</Form.Label>
                                            <Form.Control type="date" className="custom-input-height custom-select-font-size" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formDepartmentId">
                                            <Form.Label>Departamento</Form.Label>
                                            <Form.Control as="select" className="custom-input-height custom-select-font-size">
                                                <option>Selecione...</option>
                                                {dropdownData.departmentId?.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formProfessionId">
                                            <Form.Label>Profissão</Form.Label>
                                            <Form.Control as="select" className="custom-input-height custom-select-font-size">
                                                <option>Selecione...</option>
                                                {dropdownData.professionId?.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formGroupId">
                                            <Form.Label>Grupo</Form.Label>
                                            <Form.Control as="select" className="custom-input-height custom-select-font-size">
                                                <option>Selecione...</option>
                                                {dropdownData.groupId?.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group controlId="formZoneId">
                                            <Form.Label>Zona</Form.Label>
                                            <Form.Control as="select" className="custom-input-height custom-select-font-size">
                                                <option>Selecione...</option>
                                                {dropdownData.zoneId?.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="formExternalEntityId">
                                            <Form.Label>Entidade Externa</Form.Label>
                                            <Form.Control as="select" className="custom-input-height custom-select-font-size">
                                                <option>Selecione...</option>
                                                {dropdownData.externalEntityId?.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Fechar</Button>
                <Button variant="primary" onClick={handleSave}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};