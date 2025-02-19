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
  onDuplicate: (entity: T) => void;
  onUpdate: (data: T) => void;
  entity: T;
  onNext: () => void;
  onPrev: () => void;
  canMoveNext: boolean;
  canMovePrev: boolean;
}

// Define o componente
export const UpdateAccessControlModal = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onDuplicate,
  onUpdate,
  entity,
  canMoveNext,
  canMovePrev,
  onNext,
  onPrev,
}: Props<T>) => {
  const { devices, door } = useTerminals();
  const { employees, handleUpdateEmployee } = usePersons();
  const [formData, setFormData] = useState<T>({ ...entity });
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
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTerminal, setSelectedTerminal] = useState<
    Partial<PlanoAcessoDispositivos>
  >({});
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [showEditModal, setShowEditModal] = useState(false);

  // UseEffect para atualizar o estado do formulário
  useEffect(() => {
    if (open && entity) {
      setFormData({ ...entity });
      const loadedDevices =
        entity.planosAcessoDispositivos?.flatMap(
          (pad: PlanoAcessoDispositivos) =>
            pad.dispositivos?.flatMap((dispositivo) =>
              dispositivo.portas?.map((porta) => ({
                idTerminal: dispositivo.idTerminal,
                nomeTerminal: dispositivo.nomeTerminal,
                idPlanoHorario: dispositivo.idPlanoHorario,
                nomePlanoHorario: dispositivo.nomePlanoHorario,
                idPorta: porta.idPorta,
                nomePorta: porta.nomePorta,
              }))
            )
        ) ?? [];
      setDevicesTableData(loadedDevices);
      const loadedEmployees = entity.employees
        .map((emp: Employee) => employees.find((e) => e.employeeID === emp.id))
        .filter((emp: Employee) => emp !== undefined) as Employee[];
      setEmployeeTableData(loadedEmployees);
    } else {
      setFormData({} as T);
      setDevicesTableData([]);
      setEmployeeTableData([]);
    }
  }, [open, entity]);

  // Função para adicionar períodos à tabela
  const addEmployeesToDatatable = (periods: Employee[]) => {
    setEmployeeTableData([...employeeTableData, ...periods]);
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

  // Função para atualizar os dados do terminal
  const handleUpdateTerminal = (
    updatedData: Partial<PlanoAcessoDispositivos>
  ) => {
    const dispositivo =
      updatedData.planosAcessoDispositivos[0].dispositivos?.[0];
    if (!dispositivo) {
      console.error("Erro: dispositivo não encontrado");
      return;
    }

    const portaAtualizada = dispositivo.portas?.[0];
    if (!portaAtualizada) {
      console.error("Erro: porta não encontrada");
      return;
    }

    setDevicesTableData((prevData) =>
      prevData.map((item) => {
        if (
          item.idTerminal === dispositivo.idTerminal &&
          item.idPorta === portaAtualizada.idPorta
        ) {
          return {
            ...item,
            idPlanoHorario: dispositivo.idPlanoHorario,
            nomePlanoHorario: dispositivo.nomePlanoHorario,
          };
        }
        return item;
      })
    );
  };

  // Função para manipular o clique no botão Duplicar
  const handleDuplicateClick = () => {
    if (!onDuplicate) return;
    const { nome, ...dataWithoutId } = formData;
    onDuplicate(dataWithoutId as T);
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

  // Define as opções de paginação de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
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

  // Filtra as portas que não estão na tabela para o modal de adicionar equipamento
  const doorsInTable = devicesTableData.map((d) => d.idPorta);
  const availableDoors = door.filter((d) => !doorsInTable.includes(d.id));

  // Função para fechar o modal
  const handleClose = () => {
    setClearSelectionToggle((prev) => !prev);
    setEmployeeTableData([]);
    setDevicesTableData([]);
    onClose();
  };

  // Função para salvar os dados
  const handleSave = () => {
    const planosAcessoDispositivos = devicesTableData.map((device) => ({
      idTerminal: device.idTerminal,
      idPlanoHorario: device.idPlanoHorario,
      idPorta: device.idPorta,
    }));
    const employeeIds = employeeTableData.map((emp) => emp.employeeID);
    const payload = {
      id: formData.id,
      nome: formData.nome,
      activo: formData.activo,
      planosAcessoDispositivos,
      employeeIds,
    };
    onUpdate(payload as unknown as T);
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
                className="custom-input-height custom-select-font-size"
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
                            onRowDoubleClicked={handleEditTerminal}
                            selectableRows
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
        <Button
          className="narrow-mobile-modal-button"
          variant="outline-dark"
          type="button"
          onClick={handleDuplicateClick}
        >
          Duplicar
        </Button>
        <Button
          className="narrow-mobile-modal-button"
          variant="outline-dark"
          type="button"
          onClick={onClose}
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
        doors={availableDoors}
      />
      <AddEmployeeToACModal
        open={showEmployeeAddModal}
        onClose={() => setShowEmployeeAddModal(false)}
        onSave={addEmployeesToDatatable}
        entity={employeeTableData}
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
