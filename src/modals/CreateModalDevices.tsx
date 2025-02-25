import { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  Modal,
  Nav,
  OverlayTrigger,
  Row,
  Tab,
  Tooltip,
} from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { toast } from "react-toastify";

import c3_100 from "../assets/img/terminais/c3_100.webp";
import c3_200 from "../assets/img/terminais/c3_200.webp";
import c3_400 from "../assets/img/terminais/c3_400.webp";
import inbio160 from "../assets/img/terminais/inbio160.webp";
import inbio260 from "../assets/img/terminais/inbio260.webp";
import inbio460 from "../assets/img/terminais/inbio460.webp";
import nface from "../assets/img/terminais/nface.webp";
import no_image from "../assets/img/terminais/no_image.png";
import profacex from "../assets/img/terminais/profacex.webp";
import rfid_td from "../assets/img/terminais/rfid_td.webp";
import v5l_td from "../assets/img/terminais/v5l_td.webp";
import { customStyles } from "../components/CustomStylesDataTable";
import { SelectFilter } from "../components/SelectFilter";
import { useTerminals } from "../context/TerminalsContext";
import { doorsFields } from "../fields/Fields";
import { Devices, Doors, MBDevice } from "../types/Types";

// Define a interface para as propriedades do componente FieldConfig
interface FieldConfig {
  label: string;
  key: string;
  type: string;
  required?: boolean;
  optionsUrl?: string;
  validate?: (value: any) => boolean;
  errorMessage?: string;
}

// Define as propriedades do componente
interface Props<T> {
  title: string;
  open: boolean;
  onClose: () => void;
  onDeviceSave: (data: Devices) => void;
  onMBSave: (data: MBDevice) => void;
  fields: FieldConfig[];
  initialValues: Partial<T>;
}

export const CreateModalDevices = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onDeviceSave,
  onMBSave,
  fields,
  initialValues,
}: Props<T>) => {
  const { devices } = useTerminals();
  const [formData, setFormData] = useState<Partial<T>>({
    ...initialValues,
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [deviceImage, setDeviceImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [noData, setNoData] = useState<Doors[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [showIpValidationErrors, setShowIpValidationErrors] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Atualiza o estado do componente ao abrir o modal
  useEffect(() => {
    setFormData({ ...initialValues, enabled: true });
    setSelectedDevice(initialValues.model || "");
    if (initialValues.photo) {
      setDeviceImage(initialValues.photo);
    } else {
      setDeviceImage(null);
    }
  }, [initialValues]);

  // Define os campos ativos
  const activeFields = activeTab === "multibanco"
  ? [
      { key: "nomeQuiosque", label: "Nome do Terminal", type: "string", required: true },
      { key: "modelo", label: "Modelo", type: "string" },
      { key: "timeReboot", label: "Tempo de Reinício", type: "string", required: false }
    ]
  : [
    { key: "deviceNumber", label: "Número", type: "number", required: true },
    { key: "deviceName", label: "Nome", type: "string", required: true },
    { key: "status", label: "Estado", type: "boolean" },
    { key: "model", label: "Modelo", type: "string" },
    { key: "ipAddress", label: "Endereço IP", type: "string" },
    { key: "port", label: "Porta", type: "number" },
    { key: "sPhoto", label: "Foto", type: "string" },
    { key: "code", label: "Código", type: "number" },
    { key: "platform", label: "Platforma", type: "string" },
    { key: "firmware", label: "Firmware", type: "string" },
    { key: "macAddress", label: "Endereço MAC", type: "string" },
    { key: "serialNumber", label: "Nº Serial", type: "string" },
    { key: "readerCount", label: "Contagem no Leitor", type: "number" },
    { key: "auxInCount", label: "Contagem de Entrada", type: "number" },
    { key: "auxOutCount", label: "Contagem de Saída", type: "number" },
    {
      key: "maxUserCount",
      label: "Contagem Máxima de Utilizadores",
      type: "number",
    },
    {
      key: "maxAttLogCount",
      label: "Contagem Máxima de Atualizações de Log",
      type: "number",
    },
    {
      key: "maxFingerCount",
      label: "Contagem Máxima de Digitais",
      type: "number",
    },
    {
      key: "maxUserFingerCount",
      label: "Contagem Máxima de Digitais de Utilizadores",
      type: "number",
    },
    { key: "faceAlg", label: "Algoritmo Facial", type: "number" },
    { key: "fpAlg", label: "Algoritmo de Digitais", type: "number" },
    { key: "productTime", label: "Tempo de Produção", type: "Date" },
    { key: "producter", label: "Produtor", type: "string" },
    { key: "deviceProtocol", label: "Protocolo", type: "number" },
    { key: "deviceType", label: "Tipo", type: "number" },
    { key: "enabled", label: "Activo", type: "boolean" },
  ];

  // UseEffect para validar o formulário
  useEffect(() => {
    const newErrors: Record<string, boolean> = {};

    const isValid = activeFields.every((field) => {
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
    validateForm();
  }, [formData, fields]);

  // Função para validar o formulário
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

  // UseEffect para atualizar lista de todos os dispositivos
  useEffect(() => {
    const fetchDevicesAndSetNextNumber = async () => {
      try {
        if (devices && devices.length > 0) {
          const deviceNumbers = devices.map((device) => device.deviceNumber || 0);
          const maxNumber = Math.max(...deviceNumbers);
          const nextDeviceNumber = maxNumber + 1;
          setFormData((prevState) => ({
            ...prevState,
            deviceNumber: nextDeviceNumber,
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            deviceNumber: 1,
          }));
        }
      } catch (error) {
        console.error(
          "Erro ao buscar dispositivos e calcular o próximo número:",
          error
        );
      }
    };
    if (open) {
      fetchDevicesAndSetNextNumber();
    }
  }, [open, devices]);  

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

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(image, 0, 0, image.width, image.height);
          const dataUrl = canvas.toDataURL("image/png");
          setDeviceImage(dataUrl);
          setFormData((prevFormData) => ({
            ...prevFormData,
            photo: dataUrl,
          }));
        };
        image.src = readerEvent.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para acionar o popup de seleção de arquivo
  const triggerFileSelectPopup = () => fileInputRef.current?.click();

  // Função para validar o endereço IP
  const validateIPAddress = (ip: string) => {
    const regex =
      /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[1-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[1-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9])$/;
    return regex.test(ip);
  };

  // Função para lidar com a mudança de imagem
  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedDevice(selected);

    const deviceOption = deviceOptions.find(
      (option) => option.value === selected
    );
    setDeviceImage(deviceOption?.img || no_image);

    setFormData((prevFormData) => ({
      ...prevFormData,
      model: deviceOption ? deviceOption.label : "",
      modelo: deviceOption ? deviceOption.label : "",
      sPhoto: deviceOption?.img || no_image,
    }));

    if (selected) {
      if (selected === "Newland U1000") {
        setActiveTab("multibanco");
      } else {
        setActiveTab("ac/as");
      }
    } else {
      setActiveTab(null);
    }
  };

  // Função para lidar com a mudança de valor
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const parsedValue =
      name === "deviceType" || name === "deviceProtocol"
        ? Number(value)
        : type === "number"
        ? Number(value)
        : value;
    if (showValidationErrors) {
      setShowValidationErrors(false);
    }
    if (name === "ipAddress") {
      if (validateIPAddress(value)) {
        validateForm();
      } else {
        setShowIpValidationErrors(true);
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
    validateForm();
  };

  // Define as opções de paginação de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Define as colunas
  const columns: TableColumn<Doors>[] = doorsFields.map((field) => {
    const formatField = (row: Doors) => {
      switch (field.key) {
        default:
          return row[field.key] || "";
      }
    };
    return {
      name: (
        <>
          {field.label}
          <SelectFilter
            column={field.key}
            setFilters={setFilters}
            data={noData}
          />
        </>
      ),
      selector: (row) => formatField(row),
      sortable: true,
    };
  });

  // Filtra os dados da tabela
  const filteredDataTable = noData.filter((door) =>
    Object.keys(filters).every(
      (key) => filters[key] === "" || String(door[key]) === String(filters[key])
    )
  );

  // Função para lidar com o clique no botão de salvar
  const handleSaveClick = () => {
    if (!isFormValid) {
      setShowValidationErrors(true);
      toast.warn(
        "Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar."
      );
      return;
    }
    handleSave();
  };

  // Função para lidar com o fechamento do modal
  const handleClose = () => {
    setFormData({});
    setSelectedDevice("");
    setDeviceImage(null);
    setShowIpValidationErrors(false);
    setShowValidationErrors(false);
    setActiveTab(null);
    onClose();
  };

  // Função para lidar com o salvamento
  const handleSave = () => {
    if (activeTab === "multibanco") {
      const { sPhoto, deviceNumber, enabled, model, ...dataToSend } = formData;
      onMBSave({ ...dataToSend, estadoTerminal: 0 } as unknown as MBDevice);
    } else {
      const { modelo, ...dataToSend } = formData;
      onDeviceSave(dataToSend as unknown as Devices);
    }
    handleClose();
  };

  // Opções de dispositivos
  const deviceOptions = [
    { value: "ac", label: "------------Acessos/Assiduidade------------" },
    { value: "Nface-204_SISNID-1", label: "Nface-204_SISNID-1", img: nface },
    { value: "SISNID-C3-100", label: "SISNID-C3-100", img: c3_100 },
    { value: "SISNID-C3-200", label: "SISNID-C3-200", img: c3_200 },
    { value: "SISNID-C3-400", label: "SISNID-C3-400", img: c3_400 },
    { value: "SISNID-INBIO160", label: "SISNID-INBIO160", img: inbio160 },
    { value: "SISNID-INBIO260", label: "SISNID-INBIO260", img: inbio260 },
    { value: "SISNID-INBIO460", label: "SISNID-INBIO460", img: inbio460 },
    { value: "SISNID-PROFACEX-TD", label: "SISNID-PROFACEX-TD", img: profacex },
    { value: "SpeedFace-RFID-TD", label: "SpeedFace-RFID-TD", img: rfid_td },
    { value: "Speedface-V5L-TD-1", label: "Speedface-V5L-TD-1", img: v5l_td },
    { value: "mb", label: "------------------Multibanco------------------" },
    { value: "Newland U1000", label: "Newland U1000" },
  ];

  return (
    <Modal
      show={open}
      onHide={handleClose}
      backdrop="static"
      dialogClassName="modal-scrollable"
      size="xl"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <Col md={3}>
          <Form.Group controlId="formModel">
            <Form.Label>Modelo</Form.Label>
            <Form.Select
              name="model"
              value={selectedDevice}
              onChange={handleDeviceChange}
              className="custom-input-height custom-select-font-size select-dropdown"
            >
              <option value="">Selecione</option>
              {deviceOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.value === ""}
                >
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        {activeTab && (
          <Tab.Container
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
          >
            <Nav variant="tabs" className="nav-modal">
              <Nav.Item>
                <Nav.Link eventKey="ac/as" disabled>
                  Acesso/Assiduidade
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="multibanco" disabled>
                  Multibanco
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="ac/as">
                <Form style={{ marginTop: 10, marginBottom: 10 }}>
                  <Row>
                    <Col md={3}>
                      <Form.Group controlId="formDeviceName">
                        <Form.Label>
                          Nome<span style={{ color: "red" }}> *</span>
                        </Form.Label>
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-deviceName">
                              Campo obrigatório
                            </Tooltip>
                          }
                        >
                          <Form.Control
                            type="text"
                            name="deviceName"
                            value={formData["deviceName"] || ""}
                            onChange={handleChange}
                            className={`custom-input-height form-control custom-select-font-size ${
                              showValidationErrors ? "error-border" : ""
                            }`}
                            maxLength={50}
                          ></Form.Control>
                        </OverlayTrigger>
                        {errors["deviceName"] && (
                          <div style={{ color: "red", fontSize: "small" }}>
                            {errors["deviceName"]}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="formModel">
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control
                          name="model"
                          value={selectedDevice}
                          className="custom-input-height custom-select-font-size select-dropdown"
                          readOnly
                        >
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="formDeviceNumber">
                        <Form.Label>
                          Número<span style={{ color: "red" }}> *</span>
                        </Form.Label>
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-deviceNumber">
                              Campo obrigatório
                            </Tooltip>
                          }
                        >
                          <Form.Control
                            type="number"
                            className={`custom-input-height form-control custom-select-font-size ${
                              showValidationErrors ? "error-border" : ""
                            }`}
                            value={formData.deviceNumber || ""}
                            onChange={handleChange}
                            name="deviceNumber"
                          />
                        </OverlayTrigger>
                        {errors["deviceNumber"] && (
                          <div style={{ color: "red", fontSize: "small" }}>
                            {errors["deviceNumber"]}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Tab.Container defaultActiveKey="terminal">
                        <Nav variant="tabs" className="nav-modal">
                          <Nav.Item>
                            <Nav.Link eventKey="terminal">
                              Equipamentos
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                        <Tab.Content>
                          <Tab.Pane eventKey="terminal">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                              <Row>
                                <Col className="img-modal">
                                  <img
                                    src={deviceImage || no_image}
                                    alt="Imagem do dispositivo"
                                    style={{
                                      width: 128,
                                      height: 128,
                                      cursor: "pointer",
                                      marginBottom: 30,
                                      objectFit: "cover",
                                      borderRadius: "25%",
                                    }}
                                    onClick={triggerFileSelectPopup}
                                  />
                                  <div>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      style={{ display: "none" }}
                                      onChange={handleImageChange}
                                      ref={fileInputRef}
                                    />
                                  </div>
                                  <Form.Group
                                    controlId="formEnabled"
                                    className="d-flex align-items-center mb-3"
                                  >
                                    <Form.Label
                                      className="mb-0 me-2 flex-shrink-0"
                                      style={{ lineHeight: "32px" }}
                                    >
                                      Activo
                                    </Form.Label>
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch-enabled"
                                      checked={formData.enabled === true}
                                      onChange={(e) =>
                                        setFormData((prev) => ({
                                          ...prev,
                                          enabled: e.target.checked,
                                        }))
                                      }
                                      className="ms-auto"
                                      label=""
                                      name="enabled"
                                    />
                                  </Form.Group>
                                  <div
                                    style={{
                                      backgroundColor: "#d1d1d1",
                                      padding: "10px",
                                      borderRadius: "5px",
                                      marginTop: "20px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <p style={{ margin: "0" }}>
                                      As funcionalidades indicadas dependem da
                                      compatibilidade do equipamento.
                                    </p>
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </Tab.Pane>
                        </Tab.Content>
                      </Tab.Container>
                    </Col>
                    <Col md={8}>
                      <Tab.Container defaultActiveKey="comunicacao">
                        <Nav variant="tabs" className="nav-modal">
                          <Nav.Item>
                            <Nav.Link eventKey="comunicacao">
                              Modo de Comunicação
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="informacao">
                              Informação
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="portas">Portas</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="leitores">Leitores</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="auxiliares">
                              Auxiliares
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                        <Tab.Content>
                          <Tab.Pane eventKey="comunicacao">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                              <Row>
                                <Col md={12}>
                                  <Row>
                                    <Col md={3}>
                                      <Form.Group controlId="formIpAddress">
                                        <Form.Label>IP</Form.Label>
                                        <Form.Control
                                          type="string"
                                          name="ipAddress"
                                          value={formData["ipAddress"] || ""}
                                          onChange={handleChange}
                                          isInvalid={
                                            showIpValidationErrors &&
                                            !validateIPAddress(
                                              formData["ipAddress"] || ""
                                            )
                                          }
                                          className="custom-input-height custom-select-font-size"
                                        />
                                      </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Group controlId="formPort">
                                        <Form.Label>Porta</Form.Label>
                                        <Form.Control
                                          type="number"
                                          name="port"
                                          value={formData["port"] || ""}
                                          onChange={handleChange}
                                          className="custom-input-height custom-select-font-size"
                                        />
                                      </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Group controlId="formCode">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control
                                          type="number"
                                          className="custom-input-height custom-select-font-size"
                                          value={formData.code || ""}
                                          onChange={handleChange}
                                          name="code"
                                        />
                                      </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Group controlId="formDeviceProtocol">
                                        <Form.Label>Protocolo</Form.Label>
                                        <Form.Select
                                          name="deviceProtocol"
                                          value={
                                            formData["deviceProtocol"] || ""
                                          }
                                          onChange={handleChange}
                                          className="custom-input-height custom-select-font-size"
                                        >
                                          <option value="">Selecione</option>
                                          <option value="1">Standalone</option>
                                          <option value="2">Pull</option>
                                          <option value="3">Push</option>
                                        </Form.Select>
                                      </Form.Group>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Form>
                          </Tab.Pane>
                          <Tab.Pane eventKey="informacao">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                              <Row>
                                <Col md={12}>
                                  <Row>
                                    <Col md={3}>
                                      <Form.Group controlId="formPlatform">
                                        <Form.Label>Plataforma</Form.Label>
                                        <Form.Control
                                          type="string"
                                          name="platform"
                                          value={formData["platform"] || ""}
                                          onChange={handleChange}
                                          className="custom-input-height custom-select-font-size"
                                        />
                                      </Form.Group>
                                      <Form.Group controlId="formProductTime">
                                        <Form.Label>Data do Produto</Form.Label>
                                        <Form.Control
                                          type="date"
                                          name="productTime"
                                          value={formData["productTime"] || ""}
                                          onChange={handleChange}
                                          className="custom-input-height custom-select-font-size"
                                        />
                                      </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Group controlId="formFirmware">
                                        <Form.Label>Firmware</Form.Label>
                                        <Form.Control
                                          type="string"
                                          name="firmware"
                                          value={formData["firmware"] || ""}
                                          onChange={handleChange}
                                          className="custom-input-height custom-select-font-size"
                                        />
                                      </Form.Group>
                                      <Form.Group controlId="formProducter">
                                        <Form.Label>Fabricante</Form.Label>
                                        <Form.Control
                                          type="string"
                                          name="producter"
                                          value={formData["producter"] || ""}
                                          onChange={handleChange}
                                          className="custom-input-height custom-select-font-size"
                                        />
                                      </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Group controlId="formMacAddress">
                                        <Form.Label>MAC</Form.Label>
                                        <Form.Control
                                          type="string"
                                          name="macAddress"
                                          value={formData["macAddress"] || ""}
                                          onChange={handleChange}
                                          className="custom-input-height custom-select-font-size"
                                        />
                                      </Form.Group>
                                      <Form.Group controlId="formDeviceType">
                                        <Form.Label>Tipo</Form.Label>
                                        <Form.Select
                                          name="deviceType"
                                          value={formData["deviceType"] || ""}
                                          onChange={handleChange}
                                          className="custom-input-height custom-select-font-size"
                                        >
                                          <option value="">Selecione</option>
                                          <option value="1">Assiduidade</option>
                                          <option value="2">
                                            Controle de Acesso
                                          </option>
                                        </Form.Select>
                                      </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Group controlId="formSerialNumber">
                                        <Form.Label>Número de Série</Form.Label>
                                        <Form.Control
                                          type="string"
                                          name="serialNumber"
                                          value={formData["serialNumber"] || ""}
                                          onChange={handleChange}
                                          className="custom-input-height custom-select-font-size"
                                        />
                                      </Form.Group>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Form>
                          </Tab.Pane>
                          <Tab.Pane eventKey="portas">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                              <Row>
                                <DataTable
                                  columns={columns}
                                  data={filteredDataTable}
                                  pagination
                                  paginationComponentOptions={paginationOptions}
                                  noDataComponent="Os dados de portas só serão exibidos após adicionar e ativar o dispositivo."
                                  customStyles={customStyles}
                                  selectableRows
                                  striped
                                  responsive
                                  persistTableHead={true}
                                />
                              </Row>
                            </Form>
                          </Tab.Pane>
                          <Tab.Pane eventKey="leitores">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                              <Row>
                                <DataTable
                                  columns={columns}
                                  data={filteredDataTable}
                                  pagination
                                  paginationComponentOptions={paginationOptions}
                                  noDataComponent="Os dados de leitores só serão exibidos após adicionar e ativar o dispositivo."
                                  customStyles={customStyles}
                                  selectableRows
                                  striped
                                  responsive
                                  persistTableHead={true}
                                />
                              </Row>
                            </Form>
                          </Tab.Pane>
                          <Tab.Pane eventKey="auxiliares">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                              <Row>
                                <DataTable
                                  columns={columns}
                                  data={filteredDataTable}
                                  pagination
                                  paginationComponentOptions={paginationOptions}
                                  noDataComponent="Os dados de auxiliares só serão exibidos após adicionar e ativar o dispositivo."
                                  customStyles={customStyles}
                                  selectableRows
                                  striped
                                  responsive
                                  persistTableHead={true}
                                />
                              </Row>
                            </Form>
                          </Tab.Pane>
                        </Tab.Content>
                      </Tab.Container>
                    </Col>
                  </Row>
                </Form>
              </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
              <Tab.Pane eventKey="multibanco">
                <Form style={{ marginTop: 10, marginBottom: 10 }}>
                  <Row>
                    {[
                      {
                        key: "nomeQuiosque",
                        label: "Nome do Terminal",
                        type: "string",
                        required: true,
                      },
                      { key: "modelo", label: "Modelo", type: "string" },
                      {
                        key: "timeReboot",
                        label: "Tempo de Reinício",
                        type: "string",
                        required: false
                      },
                    ].map((field) => (
                      <Col md={3} key={field.key}>
                        <Form.Group controlId={`form${field.key}`}>
                          {field.required ? (
                            <OverlayTrigger
                              placement="right"
                              overlay={
                                <Tooltip id={`tooltip-${field.key}`}>
                                  Campo obrigatório
                                </Tooltip>
                              }
                            >
                              <Form.Label>
                                {field.label}{" "}
                                <span
                                  style={{ color: "red", marginLeft: "5px" }}
                                >
                                  *
                                </span>
                              </Form.Label>
                            </OverlayTrigger>
                          ) : (
                            <Form.Label>{field.label}</Form.Label>
                          )}
                          {field.key === "modelo" ? (
                            <Form.Control
                              name={field.key}
                              value={formData[field.key] || ""}
                              onChange={handleChange}
                              className="custom-input-height custom-select-font-size"
                              readOnly
                            >
                            </Form.Control>
                          ) : (
                            <Form.Control
                              type={field.type === "number" ? "number" : "text"}
                              value={formData[field.key] || ""}
                              onChange={handleChange}
                              name={field.key}
                              className={`custom-input-height custom-select-font-size ${
                                showValidationErrors ? "error-border" : ""
                              }`}
                            />
                          )}
                          {errors[field.key] && (
                            <Form.Text className="text-danger">
                              {errors[field.key]}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>
                    ))}
                  </Row>
                </Form>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        )}
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
          onClick={handleSaveClick}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
