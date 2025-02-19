import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../css/PagesStyles.css";
import {
  Col,
  Form,
  Nav,
  OverlayTrigger,
  Row,
  Tab,
  Tooltip,
} from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { toast } from "react-toastify";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { customStyles } from "../components/CustomStylesDataTable";
import { usePersons } from "../context/PersonsContext";
import { useTerminals } from "../context/TerminalsContext";
import {
  employeeFields,
  planosAcessoDispositivosFields,
} from "../fields/Fields";
import { Employee, PlanoAcessoDispositivos } from "../types/Types";
import { AddEmployeeToACModal } from "./AddEmployeeToACModal";
import { AddTerminalToACModal } from "./AddTerminalToACModal";
import { UpdateModalEmployees } from "./UpdateModalEmployees";
import { UpdateTerminalOnAccessControlModal } from "./UpdateTerminalOnAccessControlModal";

// Define as propriedades do componente
interface Props<T> {
  title: string;
  open: boolean;
  onClose: () => void;
  onSave: (data: T) => void;
  initialValuesData: Partial<T>;
}

// Define o componente
export const CreateAccessControlModal = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onSave,
  initialValuesData,
}: Props<T>) => {
  const { devices, door } = useTerminals();
  const { employees, handleUpdateEmployee } = usePersons();
  const [formData, setFormData] = useState<T>(
    (initialValuesData as T) || ({} as T, { activo: true })
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEmployeeAddModal, setShowEmployeeAddModal] = useState(false);
  const [deviceSelectedRows, setDeviceSelectedRows] = useState<
    Partial<PlanoAcessoDispositivos>[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
  const [devicesTableData, setDevicesTableData] = useState<
    Partial<PlanoAcessoDispositivos>[]
  >([]);
  const [employeeTableData, setEmployeeTableData] = useState<Employee[]>([]);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTerminal, setSelectedTerminal] = useState<
    Partial<PlanoAcessoDispositivos>
  >({});
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [showEditModal, setShowEditModal] = useState(false);

  // UseEffect para atualizar o estado do formulário
  useEffect(() => {
    if (open && initialValuesData) {
      if (Array.isArray(initialValuesData.employees)) {
        const mappedEmployees = initialValuesData.employees.map(
          (emp: Employee) => ({
            employeeID: emp.id,
            name: emp.nome,
            enrollNumber: "",
          })
        );
        setEmployeeTableData(mappedEmployees);
      }

      if (Array.isArray(initialValuesData.planosAcessoDispositivos)) {
        const devicesParsed =
          initialValuesData.planosAcessoDispositivos.flatMap(
            (item: PlanoAcessoDispositivos) => {
              if (!Array.isArray(item.dispositivos)) return [];
              return item.dispositivos.map((dev) => {
                if (!Array.isArray(dev.portas) || dev.portas.length === 0) {
                  return {
                    idTerminal: dev.idTerminal || "",
                    nomeTerminal: dev.nomeTerminal || "",
                    idPlanoHorario: dev.idPlanoHorario || "",
                    nomePlanoHorario: dev.nomePlanoHorario || "",
                    idPorta: "",
                    nomePorta: "",
                  };
                }
                return dev.portas.map((p) => ({
                  idTerminal: dev.idTerminal || "",
                  nomeTerminal: dev.nomeTerminal || "",
                  idPlanoHorario: dev.idPlanoHorario || "",
                  nomePlanoHorario: dev.nomePlanoHorario || "",
                  idPorta: p.idPorta || "",
                  nomePorta: p.nomePorta || "",
                }));
              });
            }
          );

        const normalizedDevices = devicesParsed.flat();

        setDevicesTableData(normalizedDevices);
      }

      setFormData({
        ...initialValuesData,
        activo: initialValuesData.activo ?? true,
      } as unknown as T);
    }
  }, [open, initialValuesData]);

  // Função para adicionar períodos à tabela
  const addEmployeesToDatatable = (periods: Employee[]) => {
    setEmployeeTableData(periods);
  };

  // Função para adicionar terminais, portas e plano de horários à tabela
  const addTerminalToDatatable = (
    periods: Partial<PlanoAcessoDispositivos>[]
  ) => {
    setDevicesTableData((prevData) => {
      const updatedData = [...prevData];

      periods.forEach((period) => {
        const device = devices.find(
          (d) => d.zktecoDeviceID === period.idTerminal
        );
        const doorObj = door.find((d) => d.id === period.idPorta);

        if (!device || !doorObj) return;

        updatedData.push({
          idTerminal: device.zktecoDeviceID || "",
          nomeTerminal: device.deviceName || "",
          idPlanoHorario: period.idPlanoHorario || "",
          nomePlanoHorario: period.nomePlanoHorario || "",
          idPorta: doorObj.id,
          nomePorta: doorObj.name,
        } as unknown as Partial<PlanoAcessoDispositivos[]>);
      });

      return updatedData;
    });
  };

  // Função para atualizar o plano de horário de um terminal
  const handleUpdateTerminal = (
    updatedPayload: Partial<PlanoAcessoDispositivos>
  ) => {
    const updatedDevice =
      updatedPayload?.planosAcessoDispositivos?.[0]?.dispositivos?.[0];
    if (!updatedDevice) return;

    setDevicesTableData((prevData) => {
      return prevData.map((device) => {
        if (device.idPorta === updatedDevice.portas[0].idPorta) {
          return {
            ...device,
            idPlanoHorario: updatedDevice.idPlanoHorario,
            nomePlanoHorario: updatedDevice.nomePlanoHorario,
          };
        }
        return device;
      });
    });
  };

  // Função para remover terminais selecionados
  const removeSelectedDevices = () => {
    const remainingData = devicesTableData.filter(
      (dev) => !deviceSelectedRows.some((row) => row.idPorta === dev.idPorta)
    );
    setDevicesTableData(remainingData);
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para remover funcionários selecionados
  const removeSelectedEmployees = () => {
    const remainingData = employeeTableData.filter(
      (emp) => !selectedRows.some((row) => row.employeeID === emp.employeeID)
    );
    setEmployeeTableData(remainingData);
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para atualizar um funcionário
  const updateEmployeeAndCard = async (employee: Employee) => {
    await handleUpdateEmployee(employee);
  };

  // Define as opções de paginação de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Função para editar um terminal
  const handleEditTerminal = (terminal: Partial<PlanoAcessoDispositivos>) => {
    if (!terminal) return;

    const updatedTerminal = {
      ...terminal,
      nome: formData.nome,
    };
    setSelectedTerminal(updatedTerminal);
    setShowUpdateModal(true);
  };

  // Função para atualizar os campos do formulário
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? Number(value) : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  // Define as colunas que serão exibidas
  const includedDeviceColumns = [
    "nomeTerminal",
    "nomePlanoHorario",
    "nomePorta",
  ];

  // Define as colunas de dispositivos
  const deviceColumns: TableColumn<Partial<PlanoAcessoDispositivos>>[] =
    planosAcessoDispositivosFields
      .filter((field) => includedDeviceColumns.includes(field.key))
      .map((field) => {
        const formatField = (row: Partial<PlanoAcessoDispositivos>) => {
          switch (field.key) {
            default:
              return row[field.key];
          }
        };
        return {
          id: field.key,
          name: <>{field.label}</>,
          selector: (row) => formatField(row),
          sortable: true,
        };
      });

  // Função para abrir o modal de edição
  const handleOpenEditModal = (person: Employee) => {
    const employeeDetails = employees.find((emp) => emp.name === person.name);
    if (employeeDetails) {
      setSelectedEmployee(employeeDetails);
      setShowEditModal(true);
    } else {
      console.error("Funcionário não encontrado:", person.name);
    }
  };

  // Define as colunas que serão exibidas
  const includedEmployeeColumns = [
    "enrollNumber",
    "name",
    "cardNumber",
    "type",
  ];

  // Define as colunas
  const employeeColumns: TableColumn<Employee>[] = employeeFields
    .filter((field) => includedEmployeeColumns.includes(field.key))
    .sort((a, b) => {
      if (a.key === "name") return -1;
      else if (b.key === "name") return 1;
      else return 0;
    })
    .sort((a, b) => {
      if (a.key === "cardNumber") return -1;
      else if (b.key === "cardNumber") return 1;
      else return 0;
    })
    .sort((a, b) => {
      if (a.key === "type") return 1;
      else if (b.key === "type") return -1;
      else return 0;
    })
    .map((field) => {
      const formatField = (row: Employee) => {
        switch (field.key) {
          case "cardNumber":
            return row.employeeCards?.[0]?.cardNumber || "";
          default:
            return row[field.key] || "";
        }
      };
      if (field.key === "name") {
        return {
          ...field,
          name: field.label,
          cell: (row: Employee) => (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleOpenEditModal(row)}
            >
              {row.name}
            </div>
          ),
        };
      }
      return {
        id: field.key,
        name: <>{field.label}</>,
        selector: (row: Employee) => {
          if (field.key === "enrollNumber") {
            return parseInt(row.enrollNumber) || 0;
          }
          return row[field.key] || "";
        },
        sortable: true,
        cell: (row: Employee) => formatField(row),
      };
    });

  // Função para fechar o modal
  const handleClose = () => {
    setClearSelectionToggle((prev) => !prev);
    setEmployeeTableData([]);
    setDevicesTableData([]);
    setFormData({} as T);
    onClose();
  };

  // Função para salvar os dados
  const handleSave = () => {
    if (!formData.nome) {
      setShowValidationErrors(true);
      toast.warn("Digite um nome primeiro.");
      return;
    }
    const planosAcessoDispositivos = devicesTableData.map((device) => ({
      idTerminal: device.idTerminal,
      idPlanoHorario: device.idPlanoHorario,
      idPorta: device.idPorta,
    }));
    const employeeIds = employeeTableData.map((emp) => emp.employeeID);
    const payload = {
      activo: formData.activo,
      nome: formData.nome,
      planosAcessoDispositivos,
      employeeIds,
    };
    onSave(payload as unknown as T);
    handleClose();
  };

  return (
    <Modal
      show={open}
      onHide={handleClose}
      backdrop="static"
      dialogClassName="custom-modal"
      size="xl"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <Row>
          <Col md={3}>
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                className={`custom-input-height custom-select-font-size ${
                  showValidationErrors ? "error-border" : ""
                }`}
                type="text"
                name="nome"
                value={formData.nome || ""}
                onChange={handleChange}
                maxLength={50}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group
              controlId="formActivo"
              className="d-flex align-items-center"
            >
              <Form.Label
                className="mb-0 me-2 flex-shrink-0"
                style={{ lineHeight: "32px" }}
              >
                Activo:
              </Form.Label>
              <Form.Check
                type="switch"
                id="custom-switch-activo"
                checked={formData.activo === true}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    activo: e.target.checked ? true : false,
                  })
                }
                className="ms-auto"
                label=""
                name="activo"
              />
            </Form.Group>
          </Col>
        </Row>
        <Tab.Container defaultActiveKey="geral">
          <Nav variant="tabs" className="nav-modal">
            <Nav.Item>
              <Nav.Link eventKey="geral">Geral</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="geral">
              <Form style={{ marginTop: 10, marginBottom: 10 }}>
                <Tab.Container defaultActiveKey="equipamentos">
                  <Nav variant="tabs" className="nav-modal">
                    <Nav.Item>
                      <Nav.Link eventKey="equipamentos">Equipamentos</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="pessoas">Pessoas</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="equipamentos">
                      <div style={{ marginTop: 10, marginBottom: 10 }}>
                        <Row>
                          <DataTable
                            columns={deviceColumns}
                            data={devicesTableData}
                            pagination
                            paginationComponentOptions={paginationOptions}
                            paginationPerPage={20}
                            paginationRowsPerPageOptions={[20, 30, 50]}
                            selectableRows
                            onRowDoubleClicked={handleEditTerminal}
                            onSelectedRowsChange={({ selectedRows }) =>
                              setDeviceSelectedRows(selectedRows)
                            }
                            noDataComponent="Não existem dados disponíveis para mostrar."
                            customStyles={customStyles}
                            striped
                            responsive
                            persistTableHead={true}
                            defaultSortAsc={true}
                            defaultSortFieldId="nomeTerminal"
                          />
                        </Row>
                        <div style={{ display: "flex", marginTop: 10 }}>
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
                                Adicionar
                              </Tooltip>
                            }
                          >
                            <CustomOutlineButton
                              className="accesscontrol-buttons"
                              icon="bi-plus"
                              onClick={() => setShowAddModal(true)}
                              iconSize="1.1em"
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
                            overlay={
                              <Tooltip className="custom-tooltip">
                                Apagar Selecionados
                              </Tooltip>
                            }
                          >
                            <CustomOutlineButton
                              icon="bi bi-trash-fill"
                              onClick={removeSelectedDevices}
                              iconSize="1.1em"
                            />
                          </OverlayTrigger>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="pessoas">
                      <div style={{ marginTop: 10, marginBottom: 10 }}>
                        <Row>
                          <DataTable
                            columns={employeeColumns}
                            data={employeeTableData}
                            pagination
                            paginationComponentOptions={paginationOptions}
                            paginationPerPage={20}
                            paginationRowsPerPageOptions={[20, 50, 100]}
                            selectableRows
                            onSelectedRowsChange={({ selectedRows }) =>
                              setSelectedRows(selectedRows)
                            }
                            noDataComponent="Não existem dados disponíveis para mostrar."
                            clearSelectedRows={clearSelectionToggle}
                            customStyles={customStyles}
                            striped
                            responsive
                            persistTableHead={true}
                            defaultSortAsc={true}
                            defaultSortFieldId="enrollNumber"
                          />
                        </Row>
                        <div style={{ display: "flex", marginTop: 10 }}>
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
                                Adicionar
                              </Tooltip>
                            }
                          >
                            <CustomOutlineButton
                              className="accesscontrol-buttons"
                              icon="bi-plus"
                              onClick={() => setShowEmployeeAddModal(true)}
                              iconSize="1.1em"
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
                            overlay={
                              <Tooltip className="custom-tooltip">
                                Apagar Selecionados
                              </Tooltip>
                            }
                          >
                            <CustomOutlineButton
                              icon="bi bi-trash-fill"
                              onClick={removeSelectedEmployees}
                              iconSize="1.1em"
                            />
                          </OverlayTrigger>
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#f2f2f2" }}>
        <Button
          className="narrow-mobile-modal-button"
          variant="outline-dark"
          type="button"
          onClick={handleClose}
        >
          Fechar
        </Button>
        <Button
          className="narrow-mobile-modal-button"
          variant="outline-dark"
          type="button"
          onClick={handleSave}
        >
          Guardar
        </Button>
      </Modal.Footer>
      <AddTerminalToACModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={addTerminalToDatatable}
        title="Adicionar Equipamento ao Plano"
        devices={devices}
        doors={door}
      />
      <AddEmployeeToACModal
        open={showEmployeeAddModal}
        onClose={() => setShowEmployeeAddModal(false)}
        onSave={addEmployeesToDatatable}
        title="Adicionar Pessoa ao Plano"
      />
      {selectedTerminal && (
        <UpdateTerminalOnAccessControlModal
          open={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={handleUpdateTerminal}
          title="Atualizar Equipamento no Plano"
          entity={selectedTerminal}
        />
      )}
      {selectedEmployee && (
        <UpdateModalEmployees
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          onUpdate={updateEmployeeAndCard}
          entity={selectedEmployee}
          fields={employeeFields}
          title="Atualizar Funcionário"
        />
      )}
    </Modal>
  );
};
