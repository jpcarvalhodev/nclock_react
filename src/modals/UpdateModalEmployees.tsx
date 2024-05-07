import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { fetchWithAuth } from '../components/FetchWithAuth';
import { Row, Col, Tab, Nav, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import modalAvatar from '../assets/img/modalAvatar.png';
import { toast } from 'react-toastify';

export interface Entity {
  id: string;
  [key: string]: any;
}

interface Field {
  key: string;
  label: string;
  type: string;
  required?: boolean;
  optionsUrl?: string;
}

interface Option {
  id: number;
  departmentId?: string;
  departmentName?: string;
  professionId?: string;
  professionDescription?: string;
  categoryId?: string;
  categoryDescription?: string;
  groupId?: string;
  groupName?: string;
  zoneId?: string;
  zoneName?: string;
  externalEntityId?: string;
  externalEntityName?: string;
  name?: string;
  description?: string;
}

interface UpdateModalProps<T extends Entity> {
  open: boolean;
  onClose: () => void;
  onUpdate: (entity: T) => Promise<void>;
  entity: T;
  fields: Field[];
  title: string;
}

export const UpdateModalEmployees = <T extends Entity>({ open, onClose, onUpdate, entity, fields, title }: UpdateModalProps<T>) => {
  const [formData, setFormData] = useState<T>({ ...entity });
  const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const fileInputRef = React.createRef<HTMLInputElement>();

  useEffect(() => {
    const isValid = fields.every(field => {
      const fieldValue = formData[field.key];
      const valueAsString = fieldValue != null ? String(fieldValue).trim() : '';
      return !field.required || (field.required && valueAsString !== '');
    });
    setIsFormValid(isValid);
  }, [formData, fields]);

  useEffect(() => {
    const fetchDropdownOptions = async (field: Field) => {
      if (field.optionsUrl) {
        const response = await fetchWithAuth(field.optionsUrl);
        if (response.ok) {
          const data = await response.json();
          setDropdownData(prevState => ({
            ...prevState,
            [field.key]: data
          }));
        }
      }
    };

    fields.forEach(field => {
      if (field.type === 'dropdown') {
        fetchDropdownOptions(field);
      }
    });
  }, [fields]);

  const getDisplayName = (field: Field, option: Option) => {
    const { key } = field;

    switch (key) {
      case 'departmentId':
        return option.name ?? option.departmentId;
      case 'professionId':
      case 'categoryId':
        return option.description ?? option.professionDescription ?? option.categoryDescription;
      case 'groupId':
        return option.name ?? option.groupName ?? option.groupId;
      case 'zoneId':
        return option.name ?? option.zoneName ?? option.zoneId;
      case 'externalEntityId':
        return option.name ?? option.externalEntityName ?? option.externalEntityId;
      default:
        return 'Desconhecido';
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const resetToDefaultAvatar = () => {
    setProfileImage(modalAvatar);
    setFormData({ ...formData, photo: '' });
  };

  const triggerFileSelectPopup = () => fileInputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveClick = () => {
    if (!isFormValid) {
      toast.warn('Preencha todos os campos obrigatórios antes de salvar.');
      return;
    }
    handleSubmit();
  };

  const handleSubmit = async () => {
    console.log('formData', formData);
    await onUpdate(formData);
    onClose();
  };

  const typeOptions = [
    { value: 'Funcionário', label: 'Funcionário' },
    { value: 'Funcionário Externo', label: 'Funcionário Externo' },
    { value: 'Utente', label: 'Utente' },
    { value: 'Visitante', label: 'Visitante' },
    { value: 'Contacto', label: 'Contacto' },
    { value: 'Provisório', label: 'Provisório' }
  ];

  return (
    <Modal show={open} onHide={onClose} dialogClassName="custom-modal" size="xl">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <Row>
          <Col md={3} className='img-modal'>
            <img
              src={profileImage || modalAvatar}
              alt="Profile Avatar"
              style={{ width: 128, height: 128, borderRadius: '50%', cursor: 'pointer' }}
              onDoubleClick={triggerFileSelectPopup}
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
              <Button variant="outline-danger" onClick={resetToDefaultAvatar} size='sm' style={{ marginTop: 10 }}>
                Remover Foto
              </Button>
            </div>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formEnrollNumber">
              <Form.Label>
                Número de Matrícula <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="tooltip-enrollNumber">Campo obrigatório</Tooltip>}
              >
                <Form.Control
                  type="number"
                  className="custom-input-height custom-select-font-size"
                  value={formData.enrollNumber || ''}
                  onChange={handleChange}
                  name="enrollNumber"
                  required
                />
              </OverlayTrigger>
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>
                Nome <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="tooltip-name">Campo obrigatório</Tooltip>}
              >
                <Form.Control
                  type="text"
                  className="custom-input-height custom-select-font-size"
                  value={formData.name || ''}
                  onChange={handleChange}
                  name="name"
                  required
                />
              </OverlayTrigger>
            </Form.Group>
            <Form.Group controlId="formShortName">
              <Form.Label>
                Nome Resumido <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
              >
                <Form.Control
                  type="text"
                  className="custom-input-height custom-select-font-size"
                  value={formData.shortName || ''}
                  onChange={handleChange}
                  name="shortName"
                  required
                />
              </OverlayTrigger>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formNameAcronym">
              <Form.Label>Acrônimo do Nome</Form.Label>
              <Form.Control
                type="text"
                className="custom-input-height custom-select-font-size"
                value={formData.nameAcronym || ''}
                onChange={handleChange}
                name="nameAcronym"
              />
            </Form.Group>
            <Form.Group controlId="formComments">
              <Form.Label>Comentários</Form.Label>
              <Form.Control
                type="text"
                className="custom-input-height custom-select-font-size"
                value={formData.comments || ''}
                onChange={handleChange}
                name="comments"
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                as="select"
                className="custom-input-height custom-select-font-size"
                value={formData.type || ''}
                onChange={handleChange}
                name="type"
              >
                <option value="">Selecione...</option>
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formStatus" className="d-flex align-items-center mb-3">
              <Form.Label className="mb-0 me-2 flex-shrink-0" style={{ lineHeight: '32px' }}>Status:</Form.Label>
              <Form.Check
                type="switch"
                id="custom-switch-status"
                checked={formData.status === true}
                onChange={(e) => setFormData({ ...formData, status: e.target.checked ? true : false })}
                className="ms-auto"
                label=""
                name="status"
              />
            </Form.Group>
            <Form.Group controlId="formStatusEmail" className="d-flex align-items-center mb-3">
              <Form.Label className="mb-0 me-2 flex-shrink-0" style={{ lineHeight: '32px' }}>Status de E-Mail:</Form.Label>
              <Form.Check
                type="switch"
                id="custom-switch-status-email"
                checked={formData.statusEmail === true}
                onChange={(e) => setFormData({ ...formData, statusEmail: e.target.checked ? true : false })}
                className="ms-auto"
                label=""
                name="statusEmail"
              />
            </Form.Group>
            <Form.Group controlId="formRgptAut" className="d-flex align-items-center mb-3">
              <Form.Label className="mb-0 me-2 flex-shrink-0" style={{ lineHeight: '32px' }}>Autorização RGPD:</Form.Label>
              <Form.Check
                type="switch"
                id="custom-switch-rgpt-aut"
                checked={formData.rgpdAut === true}
                onChange={(e) => setFormData({ ...formData, rgpdAut: e.target.checked ? true : false })}
                className="ms-auto"
                label=""
                name="rgpdAut"
              />
            </Form.Group>
          </Col>
        </Row>
        <Tab.Container defaultActiveKey="dadosPessoais">
          <Nav variant="tabs" className="nav-modal">
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
                  {[
                    { key: 'nif', label: 'NIF', type: 'number' },
                    { key: 'address', label: 'Morada', type: 'text' },
                    { key: 'zipcode', label: 'Código Postal', type: 'text' },
                    { key: 'locality', label: 'Localidade', type: 'text' },
                    { key: 'village', label: 'Freguesia', type: 'text' },
                    { key: 'district', label: 'Distrito', type: 'text' },
                    { key: 'phone', label: 'Telefone', type: 'number' },
                    { key: 'mobile', label: 'Telemóvel', type: 'number' },
                    { key: 'email', label: 'E-Mail', type: 'email' },
                    { key: 'birthday', label: 'Data de Nascimento', type: 'date' },
                    { key: 'nacionality', label: 'Nacionalidade', type: 'text' },
                    { key: 'gender', label: 'Gênero', type: 'text' }
                  ].map((field) => (
                    <Col md={3}>
                      <Form.Group controlId={`form${field.key}`}>
                        <Form.Label>{field.label}</Form.Label>
                        <Form.Control
                          type={field.type}
                          className="custom-input-height custom-select-font-size"
                          value={formData[field.key] || ''}
                          onChange={handleChange}
                          name={field.key}
                        />
                      </Form.Group>
                    </Col>
                  ))}
                </Row>
              </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="dadosProfissionais">
              <Form style={{ marginTop: 10, marginBottom: 10 }}>
                <Row>
                  {[
                    { key: 'biNumber', label: 'Número de BI', type: 'text' },
                    { key: 'biIssuance', label: 'Emissão de BI', type: 'date' },
                    { key: 'biValidity', label: 'Validade de BI', type: 'date' },
                    { key: 'admissionDate', label: 'Data de Admissão', type: 'date' },
                    { key: 'exitDate', label: 'Data de Saída', type: 'date' },
                    { key: 'departmentId', label: 'Departamento', type: 'dropdown' },
                    { key: 'professionId', label: 'Profissão', type: 'dropdown' },
                    { key: 'groupId', label: 'Grupo', type: 'dropdown' },
                    { key: 'zoneId', label: 'Zona', type: 'dropdown' },
                    { key: 'externalEntityId', label: 'Entidade Externa', type: 'dropdown' }
                  ].map((field) => (
                    <Col md={3} key={field.key}>
                      <Form.Group controlId={`form${field.key}`}>
                        <Form.Label>{field.label}</Form.Label>
                        {field.type === 'dropdown' ? (
                          <Form.Control
                            as="select"
                            className="custom-input-height custom-select-font-size"
                            value={formData[field.key] || ''}
                            onChange={handleChange}
                            name={field.key}
                          >
                            <option value="" disabled>Selecione...</option>
                            {dropdownData[field.key]?.map(option => (
                              <option key={option.id ?? option[field.key]} value={option.id ?? option[field.key]}>
                                {getDisplayName(field, option)}
                              </option>
                            ))}
                          </Form.Control>
                        ) : (
                          <Form.Control
                            type={field.type}
                            className="custom-input-height"
                            value={formData[field.key] || ''}
                            onChange={handleChange}
                            name={field.key}
                          />
                        )}
                      </Form.Group>
                    </Col>
                  ))}
                </Row>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Fechar</Button>
        <Button variant="primary" onClick={handleSaveClick}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};