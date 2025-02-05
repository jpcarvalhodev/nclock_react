import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Col, Form, InputGroup, Nav, OverlayTrigger, Row, Tab, Tooltip } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import hidepass from '../assets/img/login/hidepass.png';
import showpass from '../assets/img/login/showpass.png';
import modalAvatar from '../assets/img/navbar/navbar/modalAvatar.png';
import { CustomOutlineButton } from '../components/CustomOutlineButton';
import { useEntity } from '../context/EntityContext';
import { usePersons } from '../context/PersonsContext';
import { useTerminals } from '../context/TerminalsContext';
import { departmentFields, groupFields } from '../fields/Fields';
import { EmployeeCard } from '../types/Types';

import { CreateModalDeptGrp } from './CreateModalDeptGrp';

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
  onUpdate: (entity: T) => Promise<void>;
  entity: T;
  fields: Field[];
  title: string;
  onNext?: () => void;
  onPrev?: () => void;
  canMoveNext?: boolean;
  canMovePrev?: boolean;
}

// Define o componente
export const UpdateModalEmployees = <T extends Entity>({ open, onClose, onDuplicate, onUpdate, entity, fields, title, canMoveNext, canMovePrev, onNext, onPrev }: UpdateModalProps<T>) => {
  const { departments, groups, categories, professions, dataEE, zones, handleAddDepartment, handleAddGroup } = usePersons();
  const { entities } = useEntity();
  const { accessControl } = useTerminals();
  const [formData, setFormData] = useState<T>({ ...entity });
  const [cardFormData, setCardFormData] = useState<Partial<EmployeeCard>>({});
  const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [showGrpModal, setShowGrpModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  // Usa useEffect para inicializar o formulário
  useEffect(() => {
    if (open) {
      fetchDropdownOptions();
      setFormData({ ...entity });
      if (entity.employeeCards && entity.employeeCards.length > 0) {
        setCardFormData(entity.employeeCards[0]);
      }
    } else {
      setFormData({} as T);
      setCardFormData({});
      setProfileImage(null);
    }
    if (entity.photo) {
      setProfileImage(entity.photo);
    } else {
      setProfileImage(modalAvatar);
    }
  }, [open, entity]);

  // Atualiza o estado do componente com parte das validações dos campos
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

  // Valida o formulário
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

  // Função para buscar as opções do dropdown
  const fetchDropdownOptions = async () => {
    try {
      setDropdownData({
        departmentId: departments,
        groupId: groups,
        categoryId: categories,
        professionId: professions,
        zoneId: zones,
        externalEntityId: dataEE.externalEntity,
        entidadeId: entities,
        accPlanoAcessoId: accessControl
      });
      if (entities.length === 1) {
        setFormData((prevState) => ({
          ...prevState,
          entidadeId: entities?.[0]?.id || '',
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar os dados", error);
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
        case 'categoryId':
          return option.categoryID === value;
        case 'professionId':
          return option.professionID === value;
        case 'zoneId':
          return option.zoneID === value;
        case 'externalEntityId':
          return option.externalEntityID === value;
        case 'entidadeId':
          return option.id === value;
        case 'accPlanoAcessoId':
          return option.id === value;
        default:
          return false;
      }
    });

    if (selectedOption) {
      const idKey = key;
      setFormData(prevState => ({
        ...prevState,
        [idKey]: value,
        ...(key === 'accPlanoAcessoId' && { accPlanoAcessoName: selectedOption.nome })
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
  const handleChange = (e: ChangeEvent<FormControlElement>) => {
    const { name, value } = e.target;
    let parsedValue: any = value;
    if (name === 'gender') {
      parsedValue = value === 'true';
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: parsedValue
    }));

    if (showValidationErrors) {
      setShowValidationErrors(false);
    }

    if (name === 'name') {
      const names = value.split(' ');
      let shortName = '';
      if (names.length > 1) {
        shortName = `${names[0]} ${names[names.length - 1]}`;
      } else if (names.length === 1) {
        shortName = names[0];
      }
      setFormData(prevState => ({
        ...prevState,
        shortName: shortName
      }));
    }

    validateForm();
  };

  // Função para lidar com a mudança de dados do cartão
  const handleCardChange = (e: ChangeEvent<FormControlElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? Number(value) : value;

    if (name === 'devicePassword' && value.length === 0) {
      setCardFormData(prevState => ({
        ...prevState,
        devicePassword: ''
      }));
    }

    if (name === 'cardNumber' && value.length > 0) {
      setCardFormData(prevState => ({
        ...prevState,
        deviceEnabled: true
      }));
    } else {
      setCardFormData(prevState => ({
        ...prevState,
        deviceEnabled: false
      }));
    }

    setCardFormData(prevState => ({
      ...prevState,
      [name]: parsedValue
    }));
  };

  // Define a função para salvar
  const handleSaveClick = () => {
    if (!isFormValid) {
      setShowValidationErrors(true);
      toast.warn('Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar.');
      return;
    }
    handleSubmit();
  };

  // Função para remover campos vazios
  function removeEmptyFields<T extends Record<string, unknown>>(obj: T): Partial<T> {
    const result: Partial<T> = {};

    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        const cleanedArray = value.map((item) => {
          if (item && typeof item === "object") {
            return removeEmptyFields(item as Record<string, unknown>);
          }
          return item;
        });
        (result as Record<string, unknown>)[key] = cleanedArray;
      } else if (
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "")
      ) {
        continue;
      } else if (typeof value === "object") {
        (result as Record<string, unknown>)[key] = removeEmptyFields(
          value as Record<string, unknown>
        );
      } else {
        result[key as keyof T] = value as T[keyof T];
      }
    }

    return result;
  }

  // Define a função para enviar
  const handleSubmit = async () => {
    const employeeData = {
      employeeID: formData.employeeID,

      enrollNumber: formData.enrollNumber,
      name: formData.name,
      shortName: formData.shortName,
      nameAcronym: formData.nameAcronym,
      comments: formData.comments,
      photo: formData.photo,

      address: formData.address,
      ziPcode: formData.ziPcode,
      locality: formData.locality,
      village: formData.village,
      district: formData.district,

      phone: formData.phone,
      mobile: formData.mobile,

      email: formData.email,

      birthday: formData.birthday,

      nationality: formData.nationality,
      gender: formData.gender,

      bInumber: formData.bInumber,
      bIissuance: formData.bIissuance,
      biValidity: formData.biValidity,

      nif: formData.nif,

      admissionDate: formData.admissionDate,
      exitDate: formData.exitDate,

      rgpdAut: formData.rgpdAut,
      status: formData.status,
      statusEmail: formData.statusEmail,
      statusFprint: formData.statusFprint,
      statusFace: formData.statusFace,
      statusPalm: formData.statusPalm,

      type: formData.type,
      employeeDisabled: formData.employeeDisabled,

      entidadeId: formData.entidadeId,
      entidadeName: formData.entidadeName,

      departmentId: formData.departmentId,
      departmentName: formData.departmentName,

      professionId: formData.professionId,
      professionName: formData.professionName,

      categoryId: formData.categoryId,
      categoryName: formData.categoryName,

      groupId: formData.groupId,
      groupName: formData.groupName,

      zoneId: formData.zoneId,
      zoneName: formData.zoneName,

      externalEntityId: formData.externalEntityId,
      externalEntityName: formData.externalEntityName,

      accPlanoAcessoId: formData.accPlanoAcessoId,
      accPlanoAcessoName: formData.accPlanoAcessoName

    } as any;

    let employeeCardsData: any[] = [];

    if (cardFormData.cardNumber && cardFormData.cardNumber.trim() !== "" || cardFormData.devicePassword && cardFormData.devicePassword.trim() !== "") {
      employeeCardsData = [
        {
          cardId: cardFormData.cardId,
          devicePassword: cardFormData.devicePassword,
          devicePrivelage: cardFormData.devicePrivelage,
          deviceEnabled: true,
          cardNumber: cardFormData.cardNumber
        }
      ];
    }

    let dataToSend: { employee: any; employeeCards?: any[] } = {
      employee: employeeData
    };

    if (employeeCardsData.length > 0) {
      dataToSend = {
        ...dataToSend,
        employeeCards: employeeCardsData
      };
    }

    dataToSend = removeEmptyFields(dataToSend) as typeof dataToSend;
    onUpdate(dataToSend as unknown as T);
  };

  // Define as opções de tipo
  const typeOptions = [
    { value: 'Funcionário', label: 'Funcionário' },
    { value: 'Subcontratado', label: 'Subcontratado' },
    { value: 'Utente', label: 'Utente' },
    { value: 'Visitante', label: 'Visitante' },
    { value: 'Contacto', label: 'Contacto' },
    { value: 'Provisório', label: 'Provisório' }
  ];

  // Opções de género
  const genderOptions = [
    { value: true, label: 'Masculino' },
    { value: false, label: 'Feminino' }
  ];

  // Alterna a visibilidade da password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal show={open} onHide={onClose} backdrop="static" dialogClassName="custom-modal" size="xl" centered>
      <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <Row style={{ marginBottom: 20 }}>
          <Col md={3} className='img-modal'>
            <img
              src={profileImage || modalAvatar}
              alt="Profile Avatar"
              style={{ width: 128, height: 128, borderRadius: '50%', cursor: 'pointer', objectFit: 'cover' }}
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
              <Button variant="outline-dark" onClick={resetToDefaultAvatar} size='sm' style={{ marginTop: 10 }}>
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
                overlay={<Tooltip id="tooltip-name">Campo obrigatório</Tooltip>}
              >
                <Form.Control
                  type="string"
                  className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                  value={formData.name || ''}
                  onChange={handleChange}
                  name="name"
                />
              </OverlayTrigger>
              {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="formShortName">
              <Form.Label>
                Nome Abreviado <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
              >
                <Form.Control
                  type="string"
                  className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                  value={formData.shortName || ''}
                  onChange={handleChange}
                  name="shortName"
                  maxLength={25}
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
            <Form.Group controlId="formEntidadeId" style={{ marginTop: 12 }}>
              <Form.Label>Entidade</Form.Label>
              <Form.Control
                as="select"
                className="custom-input-height custom-select-font-size"
                value={formData.entidadeId || ''}
                onChange={(e) => handleDropdownChange('entidadeId', e)}
              >
                {dropdownData.entidadeId?.map((option: any) => {
                  let optionId = option.id;
                  let optionName = option.nome
                  return (
                    <option key={optionId} value={optionId}>
                      {optionName}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Tab.Container defaultActiveKey="dadosPessoais">
          <Nav variant="tabs" className="nav-modal">
            <Nav.Item>
              <Nav.Link eventKey="dadosPessoais">Dados Pessoais</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="dadosProfissionais">
                Dados Profissionais
                {showValidationErrors && (
                  <span
                    style={{
                      color: "white",
                      backgroundColor: "red",
                      borderRadius: "50%",
                      padding: "0 5px",
                      fontSize: "8px",
                      marginLeft: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    !
                  </span>
                )}
              </Nav.Link>
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
                            name="gender"
                          >
                            <option value="">Selecione...</option>
                            {genderOptions.map(option => (
                              <option key={String(option.value)} value={String(option.value)}>
                                {option.label}
                              </option>
                            ))}
                          </Form.Control>
                        ) : field.key === 'nif' ? (
                          <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip id="tooltip-nif">NIF deve ter pelo menos 9 dígitos</Tooltip>}
                          >
                            <Form.Control
                              type={field.type}
                              className="custom-input-height custom-select-font-size"
                              value={formData[field.key] || ''}
                              onChange={handleChange}
                              name={field.key}
                            />
                          </OverlayTrigger>
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
                    { key: 'categoryId', label: 'Categoria', type: 'dropdown' },
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
                                      className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                      value={formData[field.key] || ''}
                                      onChange={(e) => handleDropdownChange(field.key, e)}
                                    >
                                      <option value="">Selecione...</option>
                                      {dropdownData[field.key]?.map((option: any) => {
                                        let optionId = option.departmentID || option.groupID;
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
                                      let optionId = option.professionID || option.zoneID || option.externalEntityID || option.categoryID;
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
              <Form style={{ marginTop: 10, marginBottom: 85 }}>
                <Row>
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
                        <option value="0">Não</option>
                        <option value="1">Sim</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="formDevicePassword">
                      <Form.Label>Password do Dispositivo</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? 'text' : 'password'}
                          className="custom-input-height custom-select-font-size"
                          value={cardFormData.devicePassword || ''}
                          onChange={handleCardChange}
                          name="devicePassword"
                          maxLength={6}
                          style={{ borderRight: 'none' }}
                        />
                        <InputGroup.Text
                          style={{
                            cursor: 'pointer',
                            background: 'transparent',
                            borderLeft: 'none',
                            height: '30px',
                          }}
                          onClick={togglePasswordVisibility}
                        >
                          <img src={showPassword ? hidepass : showpass} alt={showPassword ? "Esconder password" : "Mostrar password"} style={{ width: 20, height: 20 }} />
                        </InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="formAccPlanoAcessoId">
                      <Form.Label>Plano de Acesso</Form.Label>
                      <Form.Control
                        as="select"
                        className="custom-input-height custom-select-font-size"
                        value={formData.accPlanoAcessoId || ''}
                        onChange={(e) => handleDropdownChange('accPlanoAcessoId', e)}
                      >
                        <option value="">Selecione...</option>
                        {dropdownData.accPlanoAcessoId?.map((option: any) => {
                          let optionId = option.id;
                          let optionName = option.nome
                          return (
                            <option key={optionId} value={optionId}>
                              {optionName}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
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
        <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleDuplicateClick}>Duplicar</Button>
        <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={onClose}>Fechar</Button>
        <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleSaveClick}>Guardar</Button>
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