import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row, Col, Tab, Nav, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import modalAvatar from '../assets/img/navbar/navbar/modalAvatar.png';
import { toast } from 'react-toastify';
import * as apiService from "../helpers/apiService";
import { Department, EmployeeCard, Group } from '../helpers/Types';
import { PersonsContext, PersonsContextType } from '../context/PersonsContext';
import { useLicense } from '../context/LicenseContext';
import { CustomOutlineButton } from '../components/CustomOutlineButton';
import { CreateModalDeptGrp } from './CreateModalDeptGrp';
import { departmentFields, groupFields } from '../helpers/Fields';

// Define o tipo FormControlElement
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

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
  onDuplicate?: (entity: T) => void;
  onUpdate: (entity: T, cardData: Partial<EmployeeCard>) => Promise<void>;
  entity: T;
  fields: Field[];
  title: string;
  onNext: () => void;
  onPrev: () => void;
  canMoveNext: boolean;
  canMovePrev: boolean;
}

// Define o componente
export const UpdateModalEmployees = <T extends Entity>({ open, onClose, onDuplicate, onUpdate, entity, fields, title, canMoveNext, canMovePrev, onNext, onPrev }: UpdateModalProps<T>) => {
  const {
    fetchAllDepartments,
    fetchAllGroups,
    fetchEmployeeCardData,
  } = useContext(PersonsContext) as PersonsContextType;
  const { license, getSoftwareEnabledStatus } = useLicense();
  const [formData, setFormData] = useState<T>({ ...entity });
  const [cardFormData, setCardFormData] = useState<Partial<EmployeeCard>>({});
  const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const fileInputRef = React.createRef<HTMLInputElement>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [showGrpModal, setShowGrpModal] = useState(false);

  // Usa useEffect para inicializar o formulário
  useEffect(() => {
    if (open && entity) {
      fetchDropdownOptions();
      fetchEmployeesCards();
      setFormData({ ...entity });
    } else {
      setFormData({ ...entity });
      setCardFormData({});
      setProfileImage(null);
    }
    if (entity && entity.photo) {
      setProfileImage(entity.photo);
    } else {
      setProfileImage(modalAvatar);
    }
  }, [open, entity]);

  // Atualiza o estado do componente com parte das validações dos campos
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

  // Valida o formulário
  const validateForm = () => {
    const isValid = fields.every(field => {
      const fieldValue = formData[field.key];
      const valueAsString = fieldValue != null ? String(fieldValue).trim() : '';
      return !field.required || (field.required && valueAsString !== '');
    });
    setIsFormValid(isValid);
  }

  // Função para buscar os cartões dos funcionários
  const fetchEmployeesCards = async () => {
    try {
      const employeesCards = await fetchEmployeeCardData(entity.employeeID);
      setCardFormData(prevData => ({
        ...prevData,
        ...employeesCards
      }));
    } catch (error) {
      console.error('Erro ao buscar os cartões dos funcionários', error);
    }
  };

  // Função para buscar as opções do dropdown
  const fetchDropdownOptions = async () => {
    try {
      const departments = await fetchAllDepartments();
      const groups = await fetchAllGroups();
      const professions = await apiService.fetchAllProfessions();
      const zones = await apiService.fetchAllZones();
      const externalEntities = await apiService.fetchAllExternalEntities();
      setDropdownData({
        departmentId: departments,
        groupId: groups,
        professionId: professions,
        zoneId: zones,
        externalEntityId: externalEntities
      });
    } catch (error) {
      console.error('Erro ao buscar os dados de departamentos e grupos', error);
    }
  };

  // Adiciona um departamento
  const handleAddDepartment = async (department: Department) => {
    try {
      const data = await apiService.addDepartment(department);
      toast.success(data.value || 'Departamento adicionado com sucesso!')
    } catch (error) {
      console.error('Erro ao adicionar novo departamento:', error);
    } finally {
      setShowDeptModal(false);
      const data = await fetchAllDepartments();
      setDropdownData(prevState => ({ ...prevState, departmentId: data }));
    }
  };

  // Função para adicionar um grupo
  const handleAddGroup = async (group: Group) => {
    try {
      const data = await apiService.addGroup(group);
      toast.success(data.value || 'Grupo adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar novo grupo:', error);
    } finally {
      setShowGrpModal(false);
      const data = await fetchAllGroups();
      setDropdownData(prevState => ({ ...prevState, groupId: data }));
    }
  };

  // Define a mudança de foto
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const image = new Image();
        image.onload = () => {
          let width = image.width;
          let height = image.height;

          if (width > 512 || height > 512) {
            if (width > height) {
              height *= 512 / width;
              width = 512;
            } else {
              width *= 512 / height;
              height = 512;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(image, 0, 0, width, height);

          const dataUrl = canvas.toDataURL('image/png');
          setProfileImage(dataUrl);
          setFormData({ ...formData, photo: dataUrl });
        };
        image.src = readerEvent.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  // Define a função para resetar a foto de perfil
  const resetToDefaultAvatar = () => {
    setProfileImage(modalAvatar);
    setFormData({ ...formData, photo: '' });
  };

  // Define a função para acionar o popup de seleção de arquivo
  const triggerFileSelectPopup = () => fileInputRef.current?.click();

  // Função para lidar com a mudança do dropdown
  const handleDropdownChange = (key: string, e: React.ChangeEvent<FormControlElement>) => {
    const { value } = e.target;
    const selectedOption = dropdownData[key]?.find((option: any) => {
      switch (key) {
        case 'departmentId':
          return option.departmentID === value;
        case 'groupId':
          return option.groupID === value;
        case 'professionId':
          return option.professionID === value;
        case 'zoneId':
          return option.zoneID === value;
        case 'externalEntityId':
          return option.externalEntityID === value;
        default:
          return false;
      }
    });

    if (selectedOption) {
      const idKey = key;
      setFormData(prevState => ({
        ...prevState,
        [idKey]: value
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [key]: value
      }));
    }
  };

  // Função para manipular o clique no botão Duplicar
  const handleDuplicateClick = () => {
    if (!onDuplicate) return;
    const { employeeID, enrollNumber, ...dataWithoutId } = formData;
    onDuplicate(dataWithoutId as T);
  };

  // Define a função para mudar o campo
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    let parsedValue = value;
    if (name === 'gender') {
      parsedValue = value === 'true';
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: parsedValue
    }));
  };

  // Função para lidar com a mudança de dados do cartão
  const handleCardChange = (e: ChangeEvent<FormControlElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? Number(value) : value;
    setCardFormData(prevState => ({
      ...prevState,
      [name]: parsedValue
    }));
  };

  // Define a função para salvar
  const handleSaveClick = () => {
    if (!isFormValid) {
      toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
      return;
    }
    handleSubmit();
  };

  // Define a função para enviar
  const handleSubmit = async () => {
    const updatedCardFormData = { ...cardFormData, employeeID: formData.employeeID };
    await onUpdate(formData, updatedCardFormData);
    onClose();
  };

  // Define as opções de tipo
  const typeOptions = [
    { value: 'Funcionário', label: 'Funcionário' },
    { value: 'Funcionário Externo', label: 'Funcionário Externo' },
    { value: 'Utente', label: 'Utente' },
    { value: 'Visitante', label: 'Visitante' },
    { value: 'Contacto', label: 'Contacto' },
    { value: 'Provisório', label: 'Provisório' }
  ];

  // Opções do módulo
  const moduleOptions = [
    { value: 'nclock', label: 'Nclock' },
    { value: 'naccess', label: 'Naccess' },
    { value: 'nvisitor', label: 'Nvisitor' },
    { value: 'npark', label: 'Npark' },
    { value: 'ndoor', label: 'Ndoor' },
    { value: 'npatrol', label: 'Npatrol' },
    { value: 'ncard', label: 'Ncard' },
    { value: 'nview', label: 'Nview' },
    { value: 'nsecur', label: 'Nsecur' },
    { value: 'nsmart', label: 'Nsmart' },
    { value: 'nreality', label: 'Nreality' },
    { value: 'nhologram', label: 'Nhologram' },
    { value: 'npower', label: 'Npower' },
    { value: 'ncharge', label: 'Ncharge' },
    { value: 'ncity', label: 'Ncity' },
    { value: 'nkiosk', label: 'Nkiosk' },
    { value: 'nled', label: 'Nled' },
    { value: 'nfire', label: 'Nfire' },
    { value: 'nfurniture', label: 'Nfurniture' },
    { value: 'npartition', label: 'Npartition' },
    { value: 'ndecor', label: 'Ndecor' },
    { value: 'nping', label: 'Nping' },
    { value: 'nconnect', label: 'Nconnect' },
    { value: 'nlight', label: 'Nlight' },
    { value: 'ncomfort', label: 'Ncomfort' },
    { value: 'nsound', label: 'Nsound' },
    { value: 'nhome', label: 'Nhome' },
    { value: 'nsoftware', label: 'Nsoftware' },
    { value: 'nsystem', label: 'Nsystem' },
    { value: 'napp', label: 'Napp' },
    { value: 'nciber', label: 'Nciber' },
    { value: 'ndigital', label: 'Ndigital' },
    { value: 'nserver', label: 'Nserver' },
    { value: 'naut', label: 'Naut' },
    { value: 'nequip', label: 'Nequip' },
    { value: 'nproject', label: 'Nproject' },
    { value: 'ncount', label: 'Ncount' },
    { value: 'nconstruction', label: 'Nconstruction' },
    { value: 'ncaravans', label: 'Ncaravans' },
    { value: 'nwork', label: 'Nwork' },
    { value: 'nevents', label: 'Nevents' },
    { value: 'nservice', label: 'Nservice' },
    { value: 'ntask', label: 'Ntask' },
    { value: 'nproductions', label: 'Nproductions' },
    { value: 'nticket', label: 'Nticket' },
    { value: 'nsales', label: 'Nsales' },
    { value: 'ninvoice', label: 'Ninvoice' },
    { value: 'ndoc', label: 'Ndoc' },
    { value: 'nsports', label: 'Nsports' },
    { value: 'nacademy', label: 'Nacademy' },
    { value: 'nshcool', label: 'Nshcool' },
    { value: 'nclinics', label: 'Nclinics' },
    { value: 'noptics', label: 'Noptics' },
    { value: 'ngold', label: 'Ngold' }
  ];

  // Filtra as opções de módulo com base no status do software
  const softwareEnabledStatus = getSoftwareEnabledStatus(license);
  const filteredModuleOptions = moduleOptions.filter(option => softwareEnabledStatus[option.label]);

  // Opções de género
  const genderOptions = [
    { value: true, label: 'Masculino' },
    { value: false, label: 'Feminino' }
  ];

  return (
    <Modal show={open} onHide={onClose} backdrop="static" dialogClassName="custom-modal" size="xl">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <Row>
          <Col md={3} className='img-modal'>
            <img
              src={profileImage || modalAvatar}
              alt="Profile Avatar"
              style={{ width: 128, height: 128, borderRadius: '50%', cursor: 'pointer', objectFit: 'cover' }}
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
                Número da Pessoa <span style={{ color: 'red' }}>*</span>
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
              {errors.enrollNumber && <Form.Text className="text-danger">{errors.enrollNumber}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>
                Nome <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="tooltip-name">Obrigatório ter 5 caracteres ou mais</Tooltip>}
              >
                <Form.Control
                  type="string"
                  className="custom-input-height custom-select-font-size"
                  value={formData.name || ''}
                  onChange={handleChange}
                  name="name"
                  required
                />
              </OverlayTrigger>
              {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="formShortName">
              <Form.Label>
                Nome Resumido <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="tooltip-shortName">Obrigatório ter entre 5 a 20 caracteres</Tooltip>}
              >
                <Form.Control
                  type="string"
                  className="custom-input-height custom-select-font-size"
                  value={formData.shortName || ''}
                  onChange={handleChange}
                  name="shortName"
                  required
                  maxLength={20}
                />
              </OverlayTrigger>
              {errors.shortName && <Form.Text className="text-danger">{errors.shortName}</Form.Text>}
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formNameAcronym">
              <Form.Label>Iniciais do Nome</Form.Label>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="tooltip-name">Máximo de 4 caracteres</Tooltip>}
              >
                <Form.Control
                  type="string"
                  className="custom-input-height custom-select-font-size"
                  value={formData.nameAcronym || ''}
                  onChange={handleChange}
                  name="nameAcronym"
                  maxLength={4}
                />
              </OverlayTrigger>
            </Form.Group>
            <Form.Group controlId="formComments">
              <Form.Label>Comentários</Form.Label>
              <Form.Control
                type="string"
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
            <Form.Group controlId="formStatus" className="d-flex align-items-center mb-2">
              <Form.Label className="mb-0 me-2 flex-shrink-0" style={{ lineHeight: '32px' }}>Activo:</Form.Label>
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
            <Form.Group controlId="formStatusEmail" className="d-flex align-items-center mb-2">
              <Form.Label className="mb-0 me-2 flex-shrink-0" style={{ lineHeight: '32px' }}>Activo para E-Mail:</Form.Label>
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
            <Form.Group controlId="formRgptAut" className="d-flex align-items-center">
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
            <Form.Group controlId="formModulos" style={{ marginTop: 12 }}>
              <Form.Label>Software <span style={{ color: 'red' }}>*</span></Form.Label>
              <OverlayTrigger
                placement="left"
                overlay={<Tooltip id="tooltip-modulos">Obrigatório escolher um software</Tooltip>}
              >
                <Form.Control
                  as="select"
                  className="custom-input-height custom-select-font-size"
                  value={formData.modulos || ''}
                  onChange={handleChange}
                  name="modulos"
                >
                  <option value="">Selecione...</option>
                  {filteredModuleOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </Form.Control>
              </OverlayTrigger>
              {errors.modulos && <Form.Text className="text-danger">{errors.modulos}</Form.Text>}
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
            <Nav.Item>
              <Nav.Link eventKey="cartoes">Cartões</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="dadosPessoais">
              <Form style={{ marginTop: 10, marginBottom: 10 }}>
                <Row>
                  {[
                    { key: 'nif', label: 'NIF', type: 'number' },
                    { key: 'address', label: 'Morada', type: 'string' },
                    { key: 'ziPcode', label: 'Código Postal', type: 'string' },
                    { key: 'locality', label: 'Localidade', type: 'string' },
                    { key: 'village', label: 'Freguesia', type: 'string' },
                    { key: 'district', label: 'Distrito', type: 'string' },
                    { key: 'phone', label: 'Telefone', type: 'string' },
                    { key: 'mobile', label: 'Telemóvel', type: 'string' },
                    { key: 'email', label: 'E-Mail', type: 'email' },
                    { key: 'birthday', label: 'Data de Nascimento', type: 'datetime-local' },
                    { key: 'nationality', label: 'Nacionalidade', type: 'string' },
                    { key: 'gender', label: 'Gênero', type: 'boolean' }
                  ].map((field) => (
                    <Col md={3} key={field.key}>
                      <Form.Group controlId={`form${field.key}`}>
                        <Form.Label>{field.label}</Form.Label>
                        {field.key === 'gender' ? (
                          <Form.Control
                            as="select"
                            className="custom-input-height custom-select-font-size"
                            value={formData.gender}
                            onChange={handleChange}
                            name="gender">
                            <option value="">Selecione...</option>
                            {genderOptions.map(option => (
                              <option key={String(option.value)} value={String(option.value)}>
                                {option.label}
                              </option>
                            ))}
                          </Form.Control>
                        ) : (
                          <Form.Control
                            type={field.type}
                            className="custom-input-height custom-select-font-size"
                            value={formData[field.key] || ''}
                            onChange={handleChange}
                            name={field.key}
                          />
                        )}
                        {errors[field.key] && <Form.Text className="text-danger">{errors[field.key]}</Form.Text>}
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
                    { key: 'bInumber', label: 'Número de BI', type: 'string' },
                    { key: 'bIissuance', label: 'Emissão de BI', type: 'datetime-local' },
                    { key: 'biValidity', label: 'Validade de BI', type: 'datetime-local' },
                    { key: 'admissionDate', label: 'Data de Admissão', type: 'datetime-local' },
                    { key: 'exitDate', label: 'Data de Saída', type: 'datetime-local' },
                    { key: 'departmentId', label: 'Departamento', type: 'dropdown', required: true },
                    { key: 'professionId', label: 'Profissão', type: 'dropdown' },
                    { key: 'groupId', label: 'Grupo', type: 'dropdown', required: true },
                    { key: 'zoneId', label: 'Zona', type: 'dropdown' },
                    { key: 'externalEntityId', label: 'Entidade Externa', type: 'dropdown' }
                  ].map((field) => (
                    <Col md={3} key={field.key}>
                      <Form.Group controlId={`form${field.key}`}>
                        <Form.Label>{field.label}{field.required && <span style={{ color: 'red' }}> *</span>}</Form.Label>
                        <OverlayTrigger
                          placement="right"
                          overlay={<Tooltip id={`tooltip-${field.key}`}>Campo Obrigatório</Tooltip>}
                        >
                          {field.type === 'dropdown' ? (
                            <Row>
                              {(field.key === 'departmentId' || field.key === 'groupId') ? (
                                <>
                                  <Col>
                                    <Form.Control
                                      as="select"
                                      className="custom-input-height custom-select-font-size"
                                      value={formData[field.key] || ''}
                                      onChange={(e) => handleDropdownChange(field.key, e)}
                                    >
                                      <option value="">Selecione...</option>
                                      {dropdownData[field.key]?.map((option: any) => {
                                        let optionId = option.id;
                                        let optionName = option.name || option.description;
                                        return (
                                          <option key={optionId} value={optionId}>
                                            {optionName}
                                          </option>
                                        );
                                      })}
                                    </Form.Control>
                                  </Col>
                                  <Col xs="auto">
                                    <CustomOutlineButton icon="bi-plus" onClick={() => (field.key === 'departmentId' ? setShowDeptModal(true) : setShowGrpModal(true))} />
                                  </Col>
                                </>
                              ) : (
                                <Col>
                                  <Form.Control
                                    as="select"
                                    className="custom-input-height custom-select-font-size"
                                    value={formData[field.key] || ''}
                                    onChange={(e) => handleDropdownChange(field.key, e)}
                                  >
                                    <option value="">Selecione...</option>
                                    {dropdownData[field.key]?.map((option: any) => {
                                      let optionId = option.id;
                                      let optionName = option.name || option.description;
                                      return (
                                        <option key={optionId} value={optionId}>
                                          {optionName}
                                        </option>
                                      );
                                    })}
                                  </Form.Control>
                                </Col>
                              )}
                            </Row>
                          ) : (
                            <Form.Control
                              type={field.type}
                              className="custom-input-height custom-select-font-size"
                              value={formData[field.key] || ''}
                              onChange={handleChange}
                              name={field.key}
                            />
                          )}
                        </OverlayTrigger>
                        {errors[field.key] && <Form.Text className="text-danger">{errors[field.key]}</Form.Text>}
                      </Form.Group>
                    </Col>
                  ))}
                </Row>
              </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="cartoes">
              <Form style={{ marginTop: 10, marginBottom: 10 }}>
                <Row>
                  <Col md={3}>
                    <Form.Group controlId="formDeviceEnabled" className="d-flex align-items-center mt-3">
                      <Form.Label className="mb-0 me-2 flex-shrink-0" style={{ lineHeight: '32px' }}>Dispositivo Activado:</Form.Label>
                      <Form.Check
                        type="switch"
                        id="custom-switch-device-enabled"
                        checked={cardFormData.deviceEnabled || false}
                        onChange={(e) => setCardFormData({ ...cardFormData, deviceEnabled: e.target.checked })}
                        className="ms-auto"
                        label=""
                        name="deviceEnabled"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="formCardNumber">
                      <Form.Label>Número do Cartão</Form.Label>
                      <Form.Control
                        type="text"
                        className="custom-input-height custom-select-font-size"
                        value={cardFormData.cardNumber || ''}
                        onChange={handleCardChange}
                        name="cardNumber"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="formDevicePrivelage">
                      <Form.Label>Privilégio do Dispositivo</Form.Label>
                      <Form.Select
                        className="custom-input-height custom-select-font-size"
                        value={cardFormData.devicePrivelage || ''}
                        onChange={handleCardChange}
                        name="devicePrivelage"
                      >
                        <option value="">Selecione...</option>
                        <option value="0">Não</option>
                        <option value="1">Sim</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="formDevicePassword">
                      <Form.Label>Password do Dispositivo</Form.Label>
                      <Form.Control
                        type="password"
                        className="custom-input-height custom-select-font-size"
                        value={cardFormData.devicePassword || ''}
                        onChange={handleCardChange}
                        name="devicePassword"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
        <CustomOutlineButton icon="bi-arrow-left" onClick={onPrev} disabled={!canMovePrev} />
        <CustomOutlineButton className='arrows-modal' icon="bi-arrow-right" onClick={onNext} disabled={!canMoveNext} />
        <Button variant="outline-info" onClick={handleDuplicateClick}>Duplicar</Button>
        <Button variant="outline-secondary" onClick={onClose}>Fechar</Button>
        <Button variant="outline-primary" onClick={handleSaveClick}>Guardar</Button>
      </Modal.Footer>
      <CreateModalDeptGrp
        title="Adicionar Departamento"
        open={showDeptModal}
        onClose={() => setShowDeptModal(false)}
        onSave={handleAddDepartment}
        fields={departmentFields}
        initialValues={{}}
        entityType='department'
      />
      <CreateModalDeptGrp
        title="Adicionar Grupo"
        open={showGrpModal}
        onClose={() => setShowGrpModal(false)}
        onSave={handleAddGroup}
        fields={groupFields}
        initialValues={{}}
        entityType='group'
      />
    </Modal >
  );
};