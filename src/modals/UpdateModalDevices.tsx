import { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  Modal,
  Nav,
  OverlayTrigger,
  Row,
  Spinner,
  Tab,
  Tooltip,
} from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { toast } from "react-toastify";

import no_image from "../assets/img/terminais/no_image.png";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { customStyles } from "../components/CustomStylesDataTable";
import { SelectFilter } from "../components/SelectFilter";
import { useTerminals } from "../context/TerminalsContext";
import {
  auxiliariesFields,
  doorsFields,
  readersFields,
} from "../fields/Fields";
import { Auxiliaries, Devices, Doors, MBDevice, Readers } from "../types/Types";

import { UpdateModalAux } from "./UpdateModalAux";
import { UpdateModalDoor } from "./UpdateModalDoor";
import { UpdateModalReaders } from "./UpdateModalReaders";
import { deviceOptions } from "../utils/deviceOptions";

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
  onDuplicate: (entity: Partial<T>) => void;
  onDeviceUpdate: (entity: Devices) => Promise<void>;
  onMBUpdate: (entity: MBDevice) => Promise<void>;
  entity: T;
  fields: Field[];
  title: string;
  onNext: () => void;
  onPrev: () => void;
  canMoveNext: boolean;
  canMovePrev: boolean;
}

export const UpdateModalDevices = <T extends Entity>({
  open,
  onClose,
  onDuplicate,
  onDeviceUpdate,
  onMBUpdate,
  entity,
  fields,
  title,
  canMoveNext,
  canMovePrev,
  onNext,
  onPrev,
}: UpdateModalProps<T>) => {
  const {
    door,
    aux,
    period,
    fetchReaders,
    handleUpdateReaders,
    handleUpdateDoor,
    handleUpdateAux,
  } = useTerminals();
  const [formData, setFormData] = useState<T>({ ...entity } as T);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [deviceImage, setDeviceImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedDoor, setSelectedDoor] = useState<Doors | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [currentDoorIndex, setCurrentDoorIndex] = useState(0);
  const [filteredDoors, setFilteredDoors] = useState<Doors[]>([]);
  const [auxiliaries, setAuxiliaries] = useState<Auxiliaries[]>([]);
  const [showAuxUpdateModal, setShowAuxUpdateModal] = useState(false);
  const [selectedAuxIn, setSelectedAuxIn] = useState<Auxiliaries | null>(null);
  const [selectedAuxOut, setSelectedAuxOut] = useState<Auxiliaries | null>(
    null
  );
  const [auxIn, setAuxIn] = useState<Auxiliaries[]>([]);
  const [auxOut, setAuxOut] = useState<Auxiliaries[]>([]);
  const [currentAuxInIndex, setCurrentAuxInIndex] = useState(0);
  const [currentAuxOutIndex, setCurrentAuxOutIndex] = useState(0);
  const [loadingDoorData, setLoadingDoorData] = useState(false);
  const [loadingAuxInData, setLoadingAuxInData] = useState(false);
  const [loadingAuxOutData, setLoadingAuxOutData] = useState(false);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [showIpValidationErrors, setShowIpValidationErrors] = useState(false);
  const [loadingReaderData, setLoadingReaderData] = useState(false);
  const [selectedReader, setSelectedReader] = useState<Readers | null>(null);
  const [filteredReaders, setFilteredReaders] = useState<Readers[]>([]);
  const [showReaderUpdateModal, setShowReaderUpdateModal] = useState(false);
  const [currentReaderIndex, setCurrentReaderIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // UseEffect para atualizar o estado do formulário
  useEffect(() => {
    if (open && entity) {
      if (
        entity.model === "Newland U1000" ||
        entity.modelo === "Newland U1000"
      ) {
        setActiveTab("multibanco");
      } else {
        setActiveTab("ac/as");
      }
      setFormData({ ...entity } as T);
      fetchDoors();
      fetchAllReaders();
      fetchAuxiliaries();
      const matchedDevice = deviceOptions.find(
        (option) => option.label === (entity.model || entity.modelo)
      );
      if (matchedDevice) {
        setSelectedDevice(matchedDevice.value);
        setDeviceImage(matchedDevice.img);
        setFormData((prevFormData) => ({
          ...prevFormData,
          photo: matchedDevice.img,
        }));
      } else {
        setSelectedDevice("");
        setDeviceImage(no_image);
        setFormData((prevFormData) => ({
          ...prevFormData,
          photo: no_image,
        }));
      }
    }
  }, [open, entity]);

  // Define os campos ativos
  const activeFields =
    activeTab === "multibanco"
      ? [
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
            required: false,
          },
        ]
      : [
          {
            key: "deviceNumber",
            label: "Número",
            type: "number",
            required: true,
          },
          { key: "deviceName", label: "Nome", type: "string", required: true },
          { key: "status", label: "Estado", type: "boolean" },
          { key: "model", label: "Modelo", type: "string" },
          { key: "ipAddress", label: "Endereço IP", type: "string" },
          { key: "port", label: "Porta", type: "number" },
          { key: "photo", label: "Foto", type: "string" },
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

  // Função para buscar as portas
  const fetchDoors = async () => {
    const filteredDoors = door.filter(
      (door: Doors) => door.devId === entity.zktecoDeviceID
    );
    setFilteredDoors(filteredDoors);
  };

  // Função para buscar as portas
  const fetchAllReaders = async () => {
    const data = await fetchReaders(entity.zktecoDeviceID);
    const filteredReaders = data.filter(
      (reader: Readers) => reader.deviceId === entity.zktecoDeviceID
    );
    setFilteredReaders(filteredReaders);
  };

  // Função para buscar as auxiliares
  const fetchAuxiliaries = async () => {
    const filteredAuxiliaries = aux.filter(
      (aux: Auxiliaries) => aux.deviceId === entity.zktecoDeviceID
    );
    setAuxiliaries(filteredAuxiliaries);
  };

  // UseEffect para filtrar as auxiliares de entrada e saída
  useEffect(() => {
    const auxInData = auxiliaries
      .filter((aux) => aux.auxInOut === 0)
      .map((aux) => ({ ...aux, type: "in" }));
    const auxOutData = auxiliaries
      .filter((aux) => aux.auxInOut === 1)
      .map((aux) => ({ ...aux, type: "out" }));
    const auxInOrdered = auxInData.sort((a, b) => a.auxNo - b.auxNo);
    const auxOutOrdered = auxOutData.sort((a, b) => a.auxNo - b.auxNo);
    setAuxIn(auxInOrdered);
    setAuxOut(auxOutOrdered);
  }, [auxiliaries]);

  // Função para lidar com a atualização das portas
  const updateDoor = async (door: Doors) => {
    await handleUpdateDoor(door);
    setLoadingDoorData(false);
  };

  // Função para lidar com a atualização dos leitores
  const updateReader = async (reader: Readers) => {
    await handleUpdateReaders(reader);
    setLoadingReaderData(false);
    fetchAllReaders();
  };

  // Função para lidar com a atualização das auxiliares
  const updateAux = async (aux: Auxiliaries) => {
    await handleUpdateAux(aux);
    setLoadingAuxInData(false);
    setLoadingAuxOutData(false);
  };

  // Função para atualizar as portas, leitores e auxiliares
  useEffect(() => {
    fetchDoors();
    fetchAllReaders();
    fetchAuxiliaries();
  }, [door, aux]);

  // Função para manipular o clique no botão Duplicar
  const handleDuplicateClick = () => {
    if (!onDuplicate) return;
    const { zktecoDeviceID, deviceNumber, ...dataWithoutId } = formData;
    onDuplicate(dataWithoutId as T);
  };

  // Função para lidar com a edição das portas
  const handleEditDoors = (row: Doors) => {
    setSelectedDoor(row);
    setShowUpdateModal(true);
    setLoadingDoorData(true);
  };

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
    const regex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/;
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
      photo: deviceOption?.img || "",
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
    const parsedValue = type === "number" ? Number(value) : value;
    if (name === "ipAddress") {
      if (validateIPAddress(value)) {
        validateForm();
      } else {
        setShowIpValidationErrors(true);
      }
    }
    if (showValidationErrors) {
      setShowValidationErrors(false);
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

  // Filtra os dados da tabela
  const filteredDataTable = filteredDoors
    .filter((door) =>
      Object.keys(filters).every(
        (key) =>
          filters[key] === "" || String(door[key]) === String(filters[key])
      )
    )
    .sort((a, b) => a.doorNo - b.doorNo);

  // Seleciona a entidade anterior
  const handleNextDoor = () => {
    if (currentDoorIndex < filteredDataTable.length - 1) {
      setCurrentDoorIndex(currentDoorIndex + 1);
      setSelectedDoor(filteredDataTable[currentDoorIndex + 1]);
    }
  };

  // Seleciona a entidade seguinte
  const handlePrevDoor = () => {
    if (currentDoorIndex > 0) {
      setCurrentDoorIndex(currentDoorIndex - 1);
      setSelectedDoor(filteredDataTable[currentDoorIndex - 1]);
    }
  };

  // Define as colunas que serão exibidas
  const includedColumns = ["enabled", "name", "doorNo", "lockDelay"];

  // Define as colunas
  const columns: TableColumn<Doors>[] = doorsFields
    .filter((field) => includedColumns.includes(field.key))
    .sort((a, b) => {
      if (a.key === "lockDelay") return 1;
      else if (b.key === "lockDelay") return -1;
      else return 0;
    })
    .map((field) => {
      const formatField = (row: Doors) => {
        switch (field.key) {
          case "enabled":
            return row[field.key] === true ? "Activo" : "Inactivo";
          case "createTime":
            return new Date(row[field.key]).toLocaleDateString();
          case "updateTime":
            return new Date(row[field.key]).toLocaleDateString();
          default:
            return row[field.key] || "";
        }
      };
      return {
        id: field.key,
        name: (
          <>
            {field.label}
            <SelectFilter
              column={field.key}
              setFilters={setFilters}
              data={filteredDataTable}
            />
          </>
        ),
        selector: (row: Doors) => {
          if (field.key === "doorNo") {
            return row[field.key];
          }
          return formatField(row);
        },
        sortable: true,
        cell: (row: Doors) => {
          if (field.key === "doorNo") {
            return row[field.key];
          }
          return formatField(row);
        },
      };
    });

  // Define as colunas que serão exibidas
  const includedReaderColumns = [
    "nameReader",
    "readerInOut",
    "doorNo",
    "doorName",
  ];

  // Filtra os dados da tabela
  const filteredReaderDataTable = filteredReaders
    .filter((aux) =>
      Object.keys(filters).every(
        (key) =>
          filters[key] === "" || String(aux[key]) === String(filters[key])
      )
    )
    .sort((a, b) => a.nameReader.localeCompare(b.nameReader));

  // Define as colunas
  const readerColumns: TableColumn<Readers>[] = readersFields
    .filter((field) => includedReaderColumns.includes(field.key))
    .map((field) => {
      const formatField = (row: Readers) => {
        switch (field.key) {
          case "readerInOut":
            return row[field.key] === 0 ? "Entrada" : "Saída";
          case "nameReader": {
            const maxLength = 20;
            const displayText =
              row[field.key].length > maxLength
                ? row[field.key].slice(0, maxLength) + "..."
                : row[field.key];

            return (
              <OverlayTrigger
                placement="top"
                delay={0}
                container={document.body}
                popperConfig={{
                  strategy: "fixed",
                  modifiers: [
                    {
                      name: "preventOverflow",
                      options: {
                        boundary: "window",
                      },
                    },
                  ],
                }}
                overlay={<Tooltip>{row[field.key]}</Tooltip>}
              >
                <span
                  style={{
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "150px",
                    display: "inline-block",
                  }}
                >
                  {displayText}
                </span>
              </OverlayTrigger>
            );
          }
          default:
            return row[field.key] || "";
        }
      };
      return {
        id: field.key,
        name: (
          <>
            {field.label}
            <SelectFilter
              column={field.key}
              setFilters={setFilters}
              data={filteredReaderDataTable}
            />
          </>
        ),
        selector: (row: Readers) => {
          if (field.key === "doorNo") {
            return row[field.key];
          }
          return formatField(row);
        },
        sortable: true,
        cell: (row: Readers) => {
          if (field.key === "doorNo") {
            return row[field.key];
          }
          return formatField(row);
        },
      };
    });

  // Função para lidar com a edição dos leitores
  const handleEditReaders = (row: Readers) => {
    setSelectedReader(row);
    setShowReaderUpdateModal(true);
    setLoadingReaderData(true);
  };

  // Seleciona a entidade anterior
  const handleNextReader = () => {
    if (currentReaderIndex < filteredReaderDataTable.length - 1) {
      setCurrentReaderIndex(currentReaderIndex + 1);
      setSelectedReader(filteredReaderDataTable[currentReaderIndex + 1]);
    }
  };

  // Seleciona a entidade seguinte
  const handlePrevReader = () => {
    if (currentReaderIndex > 0) {
      setCurrentReaderIndex(currentReaderIndex - 1);
      setSelectedReader(filteredReaderDataTable[currentReaderIndex - 1]);
    }
  };

  // Filtra os dados da tabela
  const filteredAuxDataTable = auxiliaries
    .filter((aux) =>
      Object.keys(filters).every(
        (key) =>
          filters[key] === "" || String(aux[key]) === String(filters[key])
      )
    )
    .sort((a, b) => a.auxNo - b.auxNo);

  // Função para lidar com a edição das auxiliares
  const handleEditAux = (row: Auxiliaries, type: "in" | "out") => {
    if (type === "in") {
      setSelectedAuxIn(row);
      setCurrentAuxInIndex(auxIn.findIndex((aux) => aux.id === row.id));
      setLoadingAuxInData(true);
      setShowAuxUpdateModal(true);
    } else {
      setSelectedAuxOut(row);
      setCurrentAuxOutIndex(auxOut.findIndex((aux) => aux.id === row.id));
      setLoadingAuxOutData(true);
      setShowAuxUpdateModal(true);
    }
  };

  // Função para selecionar a auxiliar seguinte
  const handleNextAux = (type: "in" | "out") => {
    if (type === "in" && currentAuxInIndex < auxIn.length - 1) {
      setCurrentAuxInIndex(currentAuxInIndex + 1);
      setSelectedAuxIn(auxIn[currentAuxInIndex + 1]);
    } else if (type === "out" && currentAuxOutIndex < auxOut.length - 1) {
      setCurrentAuxOutIndex(currentAuxOutIndex + 1);
      setSelectedAuxOut(auxOut[currentAuxOutIndex + 1]);
    }
  };

  // Função para selecionar a auxiliar anterior
  const handlePrevAux = (type: "in" | "out") => {
    if (type === "in" && currentAuxInIndex > 0) {
      setCurrentAuxInIndex(currentAuxInIndex - 1);
      setSelectedAuxIn(auxIn[currentAuxInIndex - 1]);
    } else if (type === "out" && currentAuxOutIndex > 0) {
      setCurrentAuxOutIndex(currentAuxOutIndex - 1);
      setSelectedAuxOut(auxOut[currentAuxOutIndex - 1]);
    }
  };

  // Função para fechar o modal de atualização das auxiliares
  const handleCloseAuxModal = (type: "in" | "out") => {
    if (type === "in") {
      setSelectedAuxIn(null);
      setCurrentAuxInIndex(0);
      setLoadingAuxInData(false);
    } else {
      setSelectedAuxOut(null);
      setCurrentAuxOutIndex(0);
      setLoadingAuxOutData(false);
    }
    setShowAuxUpdateModal(false);
  };

  // Define as colunas
  const auxColumns: TableColumn<Auxiliaries>[] = auxiliariesFields.map(
    (field) => {
      const formatField = (row: Auxiliaries) => {
        switch (field.key) {
          case "enabled":
            return row[field.key] === true ? "Activo" : "Inactivo";
          case "createdData":
            return new Date(row[field.key]).toLocaleDateString();
          case "updatedData":
            return new Date(row[field.key]).toLocaleDateString();
          case "deviceId":
            return row[field.key] === entity.zktecoDeviceID
              ? entity.deviceName
              : "Sem Dispositivo";
          case "timezoneId":
            return (
              period.find((p) => p.id === row[field.key])?.name || "Sem Período"
            );
          case "auxType":
            switch (row[field.key]) {
              case 0:
                return "Sem Contacto";
              case 1:
                return "NO";
              case 2:
                return "NC";
              default:
                return "";
            }
          default:
            return row[field.key] || "";
        }
      };
      return {
        id: field.key,
        name: (
          <>
            {field.label}
            <SelectFilter
              column={field.key}
              setFilters={setFilters}
              data={filteredAuxDataTable}
            />
          </>
        ),
        selector: (row: Auxiliaries) => {
          if (field.key === "auxNo") {
            return row[field.key];
          }
          return formatField(row);
        },
        sortable: true,
        cell: (row: Auxiliaries) => {
          if (field.key === "auxNo") {
            return row[field.key];
          }
          return formatField(row);
        },
      };
    }
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
    handleSubmit();
  };

  // Define a função para enviar
  const handleSubmit = async () => {
    if (activeTab === "multibanco") {
      onMBUpdate(formData as unknown as MBDevice);
    } else {
      onDeviceUpdate(formData as unknown as Devices);
    }
  };

  return (
    <Modal
      show={open}
      onHide={onClose}
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
              <Nav.Item style={{ pointerEvents: "none" }}>
                <Nav.Link eventKey="ac/as" disabled>
                  Acesso/Assiduidade
                </Nav.Link>
              </Nav.Item>
              <Nav.Item style={{ pointerEvents: "none" }}>
                <Nav.Link eventKey="multibanco" disabled>
                  Multibanco
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="ac/as">
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                  <Row>
                    <Col md={3}>
                      <Form.Group controlId="formDeviceName">
                        <Form.Label>
                          Nome<span style={{ color: "red" }}> *</span>
                        </Form.Label>
                        <OverlayTrigger
                          placement="top"
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
                          className="custom-input-height custom-select-font-size"
                          readOnly
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="formDeviceNumber">
                        <Form.Label>
                          Número<span style={{ color: "red" }}> *</span>
                        </Form.Label>
                        <OverlayTrigger
                          placement="top"
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
                                          <option value="">Selecione...</option>
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
                                          <option value="">Selecione...</option>
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
                                {loadingDoorData ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      height: "100px",
                                    }}
                                  >
                                    <Spinner
                                      style={{ width: 50, height: 50 }}
                                      animation="border"
                                    />
                                  </div>
                                ) : (
                                  <DataTable
                                    columns={columns}
                                    data={filteredDataTable}
                                    pagination
                                    paginationComponentOptions={
                                      paginationOptions
                                    }
                                    paginationPerPage={5}
                                    paginationRowsPerPageOptions={[5, 10]}
                                    selectableRows
                                    onRowDoubleClicked={handleEditDoors}
                                    noDataComponent="Não existem dados disponíveis para mostrar."
                                    customStyles={customStyles}
                                    striped
                                    responsive
                                    persistTableHead={true}
                                    defaultSortAsc={true}
                                    defaultSortFieldId="doorNo"
                                  />
                                )}
                              </Row>
                            </Form>
                          </Tab.Pane>
                          <Tab.Pane eventKey="leitores">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                              <Row>
                                {loadingReaderData ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      height: "100px",
                                    }}
                                  >
                                    <Spinner
                                      style={{ width: 50, height: 50 }}
                                      animation="border"
                                    />
                                  </div>
                                ) : (
                                  <DataTable
                                    columns={readerColumns}
                                    data={filteredReaderDataTable}
                                    pagination
                                    paginationComponentOptions={
                                      paginationOptions
                                    }
                                    paginationPerPage={10}
                                    paginationRowsPerPageOptions={[10, 20]}
                                    selectableRows
                                    onRowDoubleClicked={handleEditReaders}
                                    noDataComponent="Não existem dados disponíveis para mostrar."
                                    customStyles={customStyles}
                                    striped
                                    responsive
                                    persistTableHead={true}
                                    defaultSortAsc={true}
                                    defaultSortFieldId="doorNo"
                                  />
                                )}
                              </Row>
                            </Form>
                          </Tab.Pane>
                          <Tab.Pane eventKey="auxiliares">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                              <Row
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Col>
                                  <h6>Entradas</h6>
                                  {loadingAuxInData ? (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100px",
                                      }}
                                    >
                                      <Spinner
                                        style={{ width: 50, height: 50 }}
                                        animation="border"
                                      />
                                    </div>
                                  ) : (
                                    <DataTable
                                      columns={auxColumns}
                                      data={auxIn}
                                      pagination
                                      paginationComponentOptions={
                                        paginationOptions
                                      }
                                      paginationPerPage={5}
                                      paginationRowsPerPageOptions={[5, 10]}
                                      selectableRows
                                      onRowDoubleClicked={(row) =>
                                        handleEditAux(row, "in")
                                      }
                                      noDataComponent="Não existem dados disponíveis para mostrar."
                                      customStyles={customStyles}
                                      striped
                                      responsive
                                      persistTableHead={true}
                                      defaultSortAsc={true}
                                      defaultSortFieldId="auxNo"
                                    />
                                  )}
                                </Col>
                                <Col>
                                  <h6>Saídas</h6>
                                  {loadingAuxOutData ? (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100px",
                                      }}
                                    >
                                      <Spinner
                                        style={{ width: 50, height: 50 }}
                                        animation="border"
                                      />
                                    </div>
                                  ) : (
                                    <DataTable
                                      columns={auxColumns}
                                      data={auxOut}
                                      pagination
                                      paginationComponentOptions={
                                        paginationOptions
                                      }
                                      paginationPerPage={5}
                                      paginationRowsPerPageOptions={[5, 10]}
                                      selectableRows
                                      onRowDoubleClicked={(row) =>
                                        handleEditAux(row, "out")
                                      }
                                      noDataComponent="Não existem dados disponíveis para mostrar."
                                      customStyles={customStyles}
                                      striped
                                      responsive
                                      persistTableHead={true}
                                      defaultSortAsc={true}
                                      defaultSortFieldId="auxNo"
                                    />
                                  )}
                                </Col>
                              </Row>
                            </Form>
                          </Tab.Pane>
                        </Tab.Content>
                      </Tab.Container>
                    </Col>
                  </Row>
                </div>
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
                    ].map((field) => (
                      <Col md={3} key={field.key}>
                        <Form.Group controlId={`form${field.key}`}>
                          {field.required ? (
                            <OverlayTrigger
                              placement="top"
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
                            ></Form.Control>
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
      {selectedDoor && (
        <UpdateModalDoor
          open={showUpdateModal}
          onClose={() => {
            setShowUpdateModal(false);
            setLoadingDoorData(false);
          }}
          onUpdate={updateDoor}
          entity={selectedDoor}
          fields={doorsFields}
          title="Atualizar Porta"
          canMoveNext={currentDoorIndex < filteredDataTable.length - 1}
          canMovePrev={currentDoorIndex > 0}
          onNext={handleNextDoor}
          onPrev={handlePrevDoor}
        />
      )}
      {selectedAuxIn && (
        <UpdateModalAux
          open={showAuxUpdateModal}
          onClose={() => handleCloseAuxModal("in")}
          onUpdate={updateAux}
          entity={selectedAuxIn}
          fields={auxiliariesFields}
          title="Atualizar Auxiliar IN"
          canMoveNext={currentAuxInIndex < auxIn.length - 1}
          canMovePrev={currentAuxInIndex > 0}
          onNext={() => handleNextAux("in")}
          onPrev={() => handlePrevAux("in")}
        />
      )}
      {selectedAuxOut && (
        <UpdateModalAux
          open={showAuxUpdateModal}
          onClose={() => handleCloseAuxModal("out")}
          onUpdate={updateAux}
          entity={selectedAuxOut}
          fields={auxiliariesFields}
          title="Atualizar Auxiliar OUT"
          canMoveNext={currentAuxOutIndex < auxOut.length - 1}
          canMovePrev={currentAuxOutIndex > 0}
          onNext={() => handleNextAux("out")}
          onPrev={() => handlePrevAux("out")}
        />
      )}
      {selectedReader && (
        <UpdateModalReaders
          open={showReaderUpdateModal}
          onClose={() => {
            setShowReaderUpdateModal(false);
            setLoadingReaderData(false);
          }}
          onUpdate={updateReader}
          entity={selectedReader}
          fields={readersFields}
          title="Atualizar Leitor"
          canMoveNext={currentReaderIndex < filteredReaderDataTable.length - 1}
          canMovePrev={currentReaderIndex > 0}
          onNext={handleNextReader}
          onPrev={handlePrevReader}
        />
      )}
      <Modal.Footer style={{ backgroundColor: "#f2f2f2" }}>
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
          overlay={<Tooltip className="custom-tooltip">Anterior</Tooltip>}
        >
          <CustomOutlineButton
            icon="bi-arrow-left"
            onClick={onPrev}
            disabled={!canMovePrev}
          />
        </OverlayTrigger>
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
          overlay={<Tooltip className="custom-tooltip">Seguinte</Tooltip>}
        >
          <CustomOutlineButton
            className="arrows-modal"
            icon="bi-arrow-right"
            onClick={onNext}
            disabled={!canMoveNext}
          />
        </OverlayTrigger>
        <Button variant="outline-dark" onClick={handleDuplicateClick}>
          Duplicar
        </Button>
        <Button variant="outline-dark" onClick={onClose}>
          Fechar
        </Button>
        <Button variant="outline-dark" onClick={handleSaveClick}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
