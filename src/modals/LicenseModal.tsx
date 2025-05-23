import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Modal,
  OverlayTrigger,
  Row,
  Tab,
  Tabs,
  Tooltip,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import hidepass from "../assets/img/login/hidepass.png";
import showpass from "../assets/img/login/showpass.png";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { useLicense } from "../context/LicenseContext";
import { License } from "../types/Types";

// Define o tipo FormControlElement
type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

// Define a interface Entity
export interface Entity {
  [key: string]: any;
  id: string;
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

// Define a as propriedades do modal
interface UpdateModalProps<T> {
  open: boolean;
  onClose: () => void;
  onUpdate: (key: string, formData: License[]) => Promise<void>;
  fields: Field[];
}

export const LicenseModal = <T extends Entity>({
  open,
  onClose,
  onUpdate,
  fields,
}: UpdateModalProps<T>) => {
  const { fetchAllLicenses, fetchAllLicensesWithoutKey } = useLicense();
  const [formData, setFormData] = useState<Partial<License>>({});
  const [isCheckVisible, setIsCheckVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [entities, setEntities] = useState<Array<License>>([]);
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined);
  const [allEnabled, setAllEnabled] = useState(false);
  const [licenseString, setLicenseString] = useState<string>("");

  // Atualiza o estado de visibilidade do primeiro modal baseado na prop open
  useEffect(() => {
    setIsCheckVisible(open);
  }, [open]);

  // UseEffect para validar o formulário
  useEffect(() => {
    const newErrors: Record<string, string> = {};

    const isValid = fields.every((field) => {
      const fieldValue = formData[field.key];
      let valid = true;

      if (field.required && (fieldValue === undefined || fieldValue === "")) {
        valid = false;
      }
      if (field.type === "number" && fieldValue != null && fieldValue < 0) {
        valid = false;
      }

      return valid;
    });

    setErrors(newErrors);
    setIsFormValid(isValid);
  }, [formData, fields]);

  // Função para atualizar o estado da licença
  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKey(e.target.value);

  // Função para verificar a chave de licença
  const verifyKey = async () => {
    try {
      const isKeyValid = await fetchAllLicenses(key);
      if (!isKeyValid.error) {
        const { encryptedKey } = isKeyValid;
        setLicenseString(encryptedKey);
        const { licenses } = isKeyValid;
        if (licenses && Array.isArray(licenses) && licenses.length > 0) {
          setEntities(licenses);
          setActiveTab(licenses[0]?.entidadeNumber);
          setFormData(licenses[0]);
          setIsCheckVisible(false);
          showModal();
        } else {
          handleCreateNewLicense();
          setIsCheckVisible(false);
          showModal();
        }
      }
    } catch (error) {
      console.error("Erro ao verificar chave:", error);
    }
  };

  // Reagir às mudanças de aba ativa
  useEffect(() => {
    if (activeTab && entities.length > 0) {
      const activeLicense = entities.find(
        (license) => license.entidadeNumber?.toString() === activeTab
      );
      if (activeLicense) {
        setFormData(activeLicense);
      }
    }
  }, [activeTab, entities]);

  // useEffect para verificar se todos os produtos estão ativados
  useEffect(() => {
    const allProductsEnabled = checkAllProductsEnabled();
    if (allProductsEnabled !== allEnabled) {
      setAllEnabled(allProductsEnabled);
    }
  }, [formData]);

  // Função para verificar se todos os produtos no formData estão ativados
  const checkAllProductsEnabled = () => {
    return Object.keys(formData).every((key) => {
      const product = formData[key];
      return typeof product === "object" && product !== null
        ? product.enable
        : true;
    });
  };

  // Função para mostrar o modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Função para fechar o modal
  const handleClose = () => {
    setIsCheckVisible(false);
    setIsModalVisible(false);
    fetchAllLicensesWithoutKey();
    onClose();
  };

  // Função para atualizar o estado do formulário
  const handleChange = (event: React.ChangeEvent<FormControlElement>) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;

    if (name.includes(".")) {
      const [productName, productProperty] = name.split(".");
      let parsedValue: string | number | boolean | null = value;

      if (type === "checkbox") {
        parsedValue = checked;
      } else if (type === "number") {
        parsedValue = Number(value) || defaultValueFor(productProperty);
      } else if (productProperty === "sn") {
        parsedValue = value.replace(/\s+/g, "");
      } else {
        parsedValue = value || defaultValueFor(productProperty);
      }

      setFormData((prevState) => {
        const updatedFormData = {
          ...prevState,
          [productName]: {
            ...prevState[productName],
            [productProperty]: parsedValue,
          },
        };

        setEntities((prevEntities) =>
          prevEntities.map((entity) =>
            entity.entidadeNumber?.toString() === activeTab
              ? {
                  ...entity,
                  ...updatedFormData,
                }
              : entity
          )
        );

        return updatedFormData;
      });
    } else {
      let parsedValue: string | number | boolean | null = value;

      if (type === "checkbox") {
        parsedValue = checked;
      } else if (type === "number") {
        parsedValue = Number(value) || defaultValueFor(name);
      } else if (name === "sn") {
        parsedValue = value.replace(/\s+/g, "");
      } else {
        parsedValue = value || defaultValueFor(name);
      }

      setFormData((prevState) => {
        const updatedFormData = {
          ...prevState,
          [name]: parsedValue,
        };

        setEntities((prevEntities) =>
          prevEntities.map((entity) =>
            entity.entidadeNumber?.toString() === activeTab
              ? {
                  ...entity,
                  ...updatedFormData,
                }
              : entity
          )
        );

        return updatedFormData;
      });
    }
  };

  // Função para criar uma nova licença
  const handleCreateNewLicense = () => {
    setEntities((prevEntities) => {
      const highestEntidadeNumber = prevEntities.reduce((max, entity) => {
        return Math.max(max, entity.entidadeNumber || 0);
      }, 0);

      const newLicense: License = {
        nif: 0,
        users: 0,
        devices: 0,
        sn: "",
        name: "",
        entidadeNumber: highestEntidadeNumber + 1,
        nclock: { enable: false, validacao: 0, pacote: "", createDate: "" },
        naccess: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nvisitor: { enable: false, validacao: 0, pacote: "", createDate: "" },
        npark: { enable: false, validacao: 0, pacote: "", createDate: "" },
        ndoor: { enable: false, validacao: 0, pacote: "", createDate: "" },
        npatrol: { enable: false, validacao: 0, pacote: "", createDate: "" },
        ncard: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nview: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nsecur: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nsmart: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nreality: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nhologram: { enable: false, validacao: 0, pacote: "", createDate: "" },
        npower: { enable: false, validacao: 0, pacote: "", createDate: "" },
        ncharge: { enable: false, validacao: 0, pacote: "", createDate: "" },
        ncity: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nkiosk: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nled: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nfire: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nfurniture: { enable: false, validacao: 0, pacote: "", createDate: "" },
        npartition: { enable: false, validacao: 0, pacote: "", createDate: "" },
        ndecor: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nping: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nconnect: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nlight: { enable: false, validacao: 0, pacote: "", createDate: "" },
        ncomfort: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nsound: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nhome: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nsoftware: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nsystem: { enable: false, validacao: 0, pacote: "", createDate: "" },
        napp: { enable: false, validacao: 0, pacote: "", createDate: "" },
        ncyber: { enable: false, validacao: 0, pacote: "", createDate: "" },
        ndigital: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nserver: { enable: false, validacao: 0, pacote: "", createDate: "" },
        naut: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nequip: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nproject: { enable: false, validacao: 0, pacote: "", createDate: "" },
        ncount: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nbuild: { enable: false, validacao: 0, pacote: "", createDate: "" },
        ncaravan: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nmechanic: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nevents: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nservice: { enable: false, validacao: 0, pacote: "", createDate: "" },
        ntask: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nproduction: {
          enable: false,
          validacao: 0,
          pacote: "",
          createDate: "",
        },
        nticket: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nsales: { enable: false, validacao: 0, pacote: "", createDate: "" },
        ninvoice: { enable: false, validacao: 0, pacote: "", createDate: "" },
        ndoc: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nsports: { enable: false, validacao: 0, pacote: "", createDate: "" },
        ngym: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nschool: { enable: false, validacao: 0, pacote: "", createDate: "" },
        nclinic: { enable: false, validacao: 0, pacote: "", createDate: "" },
        noptics: { enable: false, validacao: 0, pacote: "", createDate: "" },
        ngold: { enable: false, validacao: 0, pacote: "", createDate: "" },
      };

      Object.keys(newLicense.products || {}).forEach((product) => {
        newLicense.products[product] = {
          enable: false,
          validacao: 0,
          createDate: "",
          pacote: "",
        };
      });

      setFormData(newLicense);
      setActiveTab(`${highestEntidadeNumber + 1}`);
      return [...prevEntities, newLicense];
    });
  };

  // Função para inserir o valor padrão ao enviar
  const defaultValueFor = (property: string) => {
    switch (property) {
      case "createDate":
      case "pacote":
        return null;
      case "validacao":
        return 0;
      default:
        return null;
    }
  };

  // Função para atualizar a chave
  const handleUpdate = () => {
    if (!isFormValid) {
      toast.warn("Preencha todos os campos obrigatórios antes de guardar.");
      return;
    }
    const updatedEntities = entities.map((entity) => {
      if (entity.entidadeNumber === formData.entidadeNumber) {
        return { ...entity, ...formData };
      }
      return entity;
    });
    onUpdate(key, updatedEntities as License[]);
    handleClose();
  };

  // Alterna a visibilidade da password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Função para renderizar os softwares
  function renderFormControl(product: string, prop: string) {
    const value = formData[product]?.[prop];

    return (
      <div>
        <Form.Label>{getLabel(prop)}</Form.Label>
        {(() => {
          switch (prop) {
            case "enable":
              return (
                <Col>
                  <Form.Check
                    type="switch"
                    id={`switch-${product}-${prop}`}
                    checked={!!value}
                    onChange={handleChange}
                    name={`${product}.${prop}`}
                  />
                </Col>
              );
            case "validacao":
              return (
                <Col style={{ width: 140 }}>
                  <Form.Control
                    type="number"
                    name={`${product}.${prop}`}
                    value={value || ""}
                    onChange={handleChange}
                    className="custom-input-height custom-select-font-size"
                  />
                </Col>
              );
            case "pacote":
              return (
                <Col style={{ width: 710 }}>
                  <Form.Control
                    type="number"
                    name={`${product}.${prop}`}
                    value={value || ""}
                    onChange={handleChange}
                    className="custom-input-height custom-select-font-size"
                  />
                </Col>
              );
            default:
              return (
                <Form.Control
                  type="text"
                  name={`${product}.${prop}`}
                  value={value || ""}
                  onChange={handleChange}
                  className="custom-input-height custom-select-font-size"
                />
              );
          }
        })()}
      </div>
    );
  }

  // Função para obter o label
  function getLabel(prop: string) {
    switch (prop) {
      case "enable":
        return "Activo";
      case "users":
        return "Utilizadores";
      case "validacao":
        return "Meses de Validação";
      case "devices":
        return "Dispositivos";
      case "sn":
        return "Número de Série";
      case "pacote":
        return "Menus";
      default:
        return prop.charAt(0).toUpperCase() + prop.slice(1);
    }
  }

  // Função para truncar texto
  const truncateText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  // Função para reagir ao pressionar a tecla Enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      verifyKey();
    }
  };

  // Função para ativar todos os produtos
  const toggleAllEnabled = () => {
    const currentState = !allEnabled;
    setAllEnabled(currentState);
    setFormData((prevState) => {
      const updatedFormData = { ...prevState };
      Object.keys(updatedFormData).forEach((key) => {
        if (
          typeof updatedFormData[key] === "object" &&
          updatedFormData[key] !== null
        ) {
          updatedFormData[key] = {
            ...updatedFormData[key],
            enable: currentState,
          };
        }
      });
      return updatedFormData;
    });
  };

  // Função para remover entidade localmente
  const handleDeleteEntity = (entidadeNumber: number) => {
    const updatedEntities = entities.filter(
      (ent) => ent.entidadeNumber !== entidadeNumber
    );

    setEntities(updatedEntities);

    if (activeTab === String(entidadeNumber)) {
      if (updatedEntities.length > 0) {
        setActiveTab(updatedEntities[0].entidadeNumber?.toString());
      } else {
        setActiveTab(undefined);
      }
    }
  };

  // Função para copiar a chave
  const handleCopyKey = (key: string) => {
    navigator.clipboard
      .writeText(key)
      .then(() => {
        toast.success("Chave copiada para a área de transferência!");
      })
      .catch((error) => {
        toast.error("Erro ao copiar a chave. Tente novamente!");
      });
  };

  return (
    <div>
      <Modal show={isCheckVisible} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
          <Modal.Title>Inserir Password</Modal.Title>
        </Modal.Header>
        <InputGroup className="license-check-modal">
          <FormControl
            placeholder="Insira a password de licenciamento"
            value={key}
            onChange={handleKeyChange}
            onKeyDown={handleKeyDown}
            type={showPassword ? "text" : "password"}
            style={{ borderRight: "none" }}
          />
          <InputGroup.Text
            onClick={togglePasswordVisibility}
            style={{
              cursor: "pointer",
              background: "transparent",
              borderLeft: "none",
              height: "38px",
            }}
          >
            <img
              src={showPassword ? hidepass : showpass}
              alt={showPassword ? "Esconder password" : "Mostrar password"}
              style={{ width: 20, height: 20 }}
            />
          </InputGroup.Text>
        </InputGroup>
        <div
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <Button
            style={{ width: "40%" }}
            variant="outline-dark"
            onClick={verifyKey}
          >
            Verificar Password
          </Button>
        </div>
      </Modal>
      <Modal
        show={isModalVisible}
        onHide={handleClose}
        backdrop="static"
        size="xl"
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
          <Modal.Title>Licenciamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ display: "flex", alignItems: "center" }}>
            <Col md={6}>
              <OverlayTrigger
                placement="top"
                delay={0}
                container={document.body}
                popperConfig={{
                  modifiers: [
                    {
                      name: "preventOverflow",
                      options: {
                        boundary: "window",
                      },
                    },
                  ],
                }}
                overlay={
                  <Tooltip className="custom-tooltip">
                    Adicionar Licença
                  </Tooltip>
                }
              >
                <CustomOutlineButton
                  className="license-modal-button"
                  icon="bi-plus"
                  iconSize="1.1em"
                  onClick={handleCreateNewLicense}
                />
              </OverlayTrigger>
            </Col>
            <Col md={6} style={{ display: "flex", alignItems: "center" }}>
              <Form.Group
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flex: 1,
                  marginRight: 10,
                }}
              >
                <Form.Label style={{ marginBottom: 0 }}>Chave</Form.Label>
                <Form.Control
                  type="string"
                  className="custom-input-height custom-select-font-size"
                  value={licenseString}
                  name="chave"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  readOnly
                />
              </Form.Group>
              <OverlayTrigger
                placement="top"
                delay={0}
                container={document.body}
                popperConfig={{
                  modifiers: [
                    {
                      name: "preventOverflow",
                      options: {
                        boundary: "window",
                      },
                    },
                  ],
                }}
                overlay={
                  <Tooltip className="custom-tooltip">Copiar Chave</Tooltip>
                }
              >
                <CustomOutlineButton
                  className="license-modal-button"
                  icon="bi bi-copy"
                  iconSize="1em"
                  onClick={() => handleCopyKey(licenseString)}
                />
              </OverlayTrigger>
            </Col>
          </Row>
          <Tabs
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key || undefined)}
            id="entity-tabs"
            className="nav-modal"
          >
            {entities.map((entity) => (
              <Tab
                eventKey={entity.entidadeNumber?.toString()}
                key={entity.entidadeNumber}
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span>
                      {truncateText(entity.name || "", 20) ||
                        `Entidade ${entity.entidadeNumber}`}
                    </span>
                    <i
                      className="bi bi-trash ms-2"
                      style={{ cursor: "pointer", color: "black" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEntity(entity.entidadeNumber!);
                      }}
                    />
                  </div>
                }
              >
                <div className="p-3">
                  <Row style={{ marginBottom: 20 }}>
                    <Col md={1}>
                      <Form.Group controlId="formEntidadeNumber">
                        <Form.Label>Número</Form.Label>
                        <Form.Control
                          type="number"
                          className="custom-input-height custom-select-font-size"
                          value={formData.entidadeNumber || ""}
                          onChange={handleChange}
                          name="entidadeNumber"
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col style={{ width: 50 }}>
                      <Form.Group controlId="formUsers">
                        <Form.Label>Utilizadores</Form.Label>
                        <Form.Control
                          type="number"
                          className="custom-input-height custom-select-font-size"
                          value={formData.users || ""}
                          onChange={handleChange}
                          name="users"
                        />
                      </Form.Group>
                    </Col>
                    <Col style={{ width: 50 }}>
                      <Form.Group controlId="formDevices">
                        <Form.Label>Dispositivos</Form.Label>
                        <Form.Control
                          type="number"
                          className="custom-input-height custom-select-font-size"
                          value={formData.devices || ""}
                          onChange={handleChange}
                          name="devices"
                        />
                      </Form.Group>
                    </Col>
                    <Col style={{ width: 50 }}>
                      <Form.Group controlId="formNif">
                        <Form.Label>NIF</Form.Label>
                        <Form.Control
                          type="text"
                          maxLength={9}
                          pattern="[0-9]*"
                          inputMode="numeric"
                          className="custom-input-height custom-select-font-size"
                          value={formData.nif || ""}
                          onChange={handleChange}
                          name="nif"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={7}>
                      <Form.Group controlId="formName">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                          type="string"
                          className="custom-input-height custom-select-font-size"
                          value={formData.name || ""}
                          onChange={handleChange}
                          name="name"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group controlId="formSn">
                        <Form.Label>Número de Série</Form.Label>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-sn">
                              Separe os números por vírgula
                            </Tooltip>
                          }
                        >
                          <Form.Control
                            type="string"
                            className="custom-input-height custom-select-font-size"
                            value={formData.sn || ""}
                            onChange={handleChange}
                            name="sn"
                          />
                        </OverlayTrigger>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Form.Group controlId="formAllEnabledSwitch">
                      <Form.Check
                        type="switch"
                        id="all-enabled-switch"
                        label="Ativar Todos"
                        checked={allEnabled}
                        onChange={toggleAllEnabled}
                      />
                    </Form.Group>
                  </Form>
                  <Tabs
                    defaultActiveKey={Object.keys(formData).find(
                      (key) =>
                        typeof formData[key] === "object" &&
                        formData[key] !== null
                    )}
                    id="product-tabs"
                    className="nav-modal"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {Object.keys(formData)
                      .filter(
                        (key) =>
                          typeof formData[key] === "object" &&
                          formData[key] !== null
                      )
                      .map((product) => (
                        <Tab
                          eventKey={product}
                          title={product.toUpperCase()}
                          key={product}
                          tabClassName={`nav-item ${
                            formData[product].enable ? "enabled-tab" : ""
                          } tab-${product.toUpperCase()}`}
                        >
                          <Row>
                            {Object.entries(formData[product])
                              .filter(([propKey]) => propKey !== "createDate")
                              .map(([prop, value], index) => (
                                <Col
                                  md={2}
                                  key={`${product}-${prop}`}
                                  className="mt-5"
                                >
                                  <Form.Group
                                    controlId={`form${product}${prop}`}
                                  >
                                    {renderFormControl(product, prop)}
                                  </Form.Group>
                                </Col>
                              ))}
                          </Row>
                        </Tab>
                      ))}
                  </Tabs>
                </div>
              </Tab>
            ))}
          </Tabs>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f2f2f2" }}>
          <Button
            className="narrow-mobile-modal-button"
            variant="outline-dark"
            onClick={handleClose}
          >
            Fechar
          </Button>
          <Button
            className="narrow-mobile-modal-button"
            variant="outline-dark"
            onClick={handleUpdate}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
