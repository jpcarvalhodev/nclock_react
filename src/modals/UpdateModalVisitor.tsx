import { ChangeEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/PagesStyles.css";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { SearchBoxContainer } from "../components/SearchBoxContainer";
import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../components/CustomStylesDataTable";
import { Employee } from "../types/Types";
import { employeeFields, externalEntityFields } from "../fields/Fields";
import { usePersons } from "../context/PersonsContext";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { CreateModalExtEnt } from "./CreateModalExtEnt";
import { CreateModalEmployees } from "./CreateModalEmployees";
import { AddCompanyToVisitorModal } from "./AddCompanyToVisitorModal";

// Define a interface para os itens de campo
type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

interface FieldConfig {
  label: string;
  key: string;
  type: string;
  required?: boolean;
}

interface Props<T> {
  title: string;
  open: boolean;
  onClose: () => void;
  onUpdate: (entity: T) => void;
  onDuplicate: (entity: T) => void;
  fields: FieldConfig[];
  entity: T;
  onNext?: () => void;
  onPrev?: () => void;
  canMoveNext?: boolean;
  canMovePrev?: boolean;
}

export const UpdateModalVisitor = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onUpdate,
  onDuplicate,
  fields,
  entity,
  canMoveNext,
  canMovePrev,
  onNext,
  onPrev,
}: Props<T>) => {
  const {
    employeesNoPagination,
    dataEE,
    employeeVisitorMotive,
    handleAddExternalEntity,
    handleAddEmployee,
  } = usePersons();
  const [formData, setFormData] = useState<Partial<T>>({ ...entity });
  const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [showAddEEModal, setShowAddEEModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);

  // Busca entity ao abrir o modal
  useEffect(() => {
    if (open) {
      let newData = { ...entity };

      if (entity.idVisitante) {
        const visitor = employeesNoPagination.find(
          (emp) => emp.employeeID === entity.idVisitante
        );
        if (visitor) {
          newData = {
            ...newData,
            idVisitante: visitor.employeeID,
            visitanteCartaoEU: visitor.biNumber || "",
            visitanteContacto: visitor.mobile || "",
            visitanteNif: visitor.nif || "",
            visitantePassaporte: visitor.passaporte || "",
            card:
              visitor.employeeCards && visitor.employeeCards.length > 0
                ? visitor.employeeCards[0].cardNumber
                : "",
          };
        }
      }

      if (entity.idPessoa) {
        const visitado = employeesNoPagination.find(
          (emp) => emp.employeeID === entity.idPessoa
        );
        if (visitado) {
          newData = {
            ...newData,
            idPessoa: visitado.employeeID,
            department: visitado.departmentName || "",
            phone: visitado.mobile || "",
          };
        }
      }

      if (entity.companions && Array.isArray(entity.companions)) {
        const companionList = entity.companions
          .map((companion) => {
            const emp = employeesNoPagination.find(
              (e) => e.employeeID === companion.employeeId
            );
            if (emp) {
              return {
                ...emp,
                cardNumber:
                  emp.employeeCards && emp.employeeCards.length > 0
                    ? emp.employeeCards[0].cardNumber
                    : "",
              };
            }
            return null;
          })
          .filter((item) => item !== null) as Employee[];
        setFilteredEmployees(companionList);
      } else {
        setFilteredEmployees([]);
      }

      setFormData(newData);
    } else {
      setFormData({});
      setFilteredEmployees([]);
    }
  }, [open, entity, employeesNoPagination]);

  // Função para adicionar um funcionário e um cartão
  const addEmployeeAndCard = async (employee: Partial<Employee>) => {
    await handleAddEmployee(employee as Employee);
  };

  // Função para adicionar acompanhantes na tabela
  const handleAddVisitorsToDataTable = (visitors: Partial<Employee[]>) => {
    setFilteredEmployees(
      visitors.filter((visitor) => visitor !== undefined) as Employee[]
    );
  };

  // Gerencia as mudanças nos campos do formulário
  const handleChange = (e: ChangeEvent<FormControlElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Busca as empresas para o dropdown
  const handleEmpresaChange = (e: ChangeEvent<FormControlElement>) => {
    const selectedEmpresa = e.target.value;
    const company = dataEE.externalEntity.find(
      (entity: any) => entity.name === selectedEmpresa
    );
    setFormData((prev) => ({
      ...prev,
      empresaNome: selectedEmpresa,
      empresaNif: company && company.nif ? String(company.nif) : "",
    }));
  };

  // Filtra os visitantes
  const visitantes = employeesNoPagination.filter(
    (emp) => emp.type === "Visitante"
  );

  // Função para tratar a mudança do visitante no dropdown:
  const handleVisitorChange = (e: ChangeEvent<FormControlElement>) => {
    const selectedVisitorId = e.target.value;
    const visitor = employeesNoPagination.find(
      (emp) => emp.employeeID === selectedVisitorId
    );
    if (visitor) {
      setFormData((prev) => ({
        ...prev,
        idVisitante: visitor.employeeID,
        visitanteCartaoEU: visitor.biNumber || "",
        visitanteContacto: visitor.mobile || "",
        visitanteNif: visitor.nif || "",
        visitantePassaporte: visitor.passaporte || "",
        card: visitor.employeeCards?.[0]?.cardNumber || "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        idVisitante: "",
        visitanteCartaoEU: "",
        visitanteContacto: "",
        visitanteNif: "",
        visitantePassaporte: "",
        card: "",
      }));
    }
  };

  // Dentro do componente, antes do retorno:
  const visitados = employeesNoPagination.filter(
    (emp) => emp.type === "Funcionário" || emp.type === "Subcontratado"
  );

  // Função para tratar a mudança do visitado no dropdown
  const handleVisitadoChange = (e: ChangeEvent<FormControlElement>) => {
    const selectedId = e.target.value;
    const visitado = visitados.find((emp) => emp.employeeID === selectedId);
    if (visitado) {
      setFormData((prev) => ({
        ...prev,
        idPessoa: visitado.employeeID,
        department: visitado.departmentName || "",
        phone: visitado.mobile || "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        idPessoa: "",
        department: "",
        phone: "",
      }));
    }
  };

  // Função para tratar a mudança do motivo da visita
  const handleVisitanteMotivoChange = (e: ChangeEvent<FormControlElement>) => {
    const selectedMotive = e.target.value;
    setFormData((prev) => ({
      ...prev,
      visitanteMotivo: selectedMotive,
    }));
  };

  // Função para manipular o clique no botão Duplicar
  const handleDuplicateClick = () => {
    if (!onDuplicate) return;
    onDuplicate(formData as T);
  };

  // Define a função selecionar uma linha
  const handleRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Employee[];
  }) => {
    setSelectedRows(state.selectedRows);
  };

  // Define a função para remover acompanhantes
  const handleRemoveCompanions = () => {
    if (selectedRows.length > 0) {
      const remainingCompanions = filteredEmployees.filter(
        (emp) =>
          !selectedRows.some(
            (selected) => selected.employeeID === emp.employeeID
          )
      );
      setFilteredEmployees(remainingCompanions);
      setSelectedRows([]);
    } else {
      setFilteredEmployees([]);
    }
  };

  // Define as opções de paginação de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Define as colunas de funcionários
  const selectedColumns = ["cardNumber", "name", "mobile", "nif", "bInumber"];

  // Define as colunas
  const columns: TableColumn<Employee>[] = employeeFields
    .filter((field) => selectedColumns.includes(field.key))
    .map((field) => {
      const formatField = (row: Employee) => {
        switch (field.key) {
          default:
            return row[field.key] || "";
        }
      };

      return {
        id: field.key,
        name: <>{field.label}</>,
        sortable: true,
        cell: (row: Employee) => formatField(row),
      };
    });

  // Define o fechamento do modal
  const handleClose = () => {
    setFormData({});
    setFilteredEmployees([]);
    onClose();
  };

  // Define o envio de dados
  const handleSave = () => {
    const { phone, card, department, companions, ...visitorData } = formData;

    const selectedCompany = dataEE.externalEntity.find(
      (entity: any) => entity.name === formData.empresaNome
    );
    const idEntidadeExterna = selectedCompany
      ? selectedCompany.externalEntityID
      : formData.empresaNome;

    const selectedVisitor = visitantes.find(
      (emp) => emp.name === formData.idVisitante
    );
    const idVisitante = selectedVisitor
      ? selectedVisitor.employeeID
      : formData.idVisitante;

    const selectedVisitado = visitados.find(
      (emp) => emp.name === formData.idPessoa
    );
    const idPessoa = selectedVisitado ? selectedVisitado.employeeID : formData.idPessoa;

    const selectedMotive = employeeVisitorMotive.find(
      (motive: any) => motive.descricao === formData.visitanteMotivo
    );
    const idVisitanteMotivo = selectedMotive ? selectedMotive.id : formData.visitanteMotivo;

    const finalVisitorData = {
      ...visitorData,
      idEntidadeExterna,
      idVisitanteMotivo,
      idPessoa,
      idVisitante,
    };

    const payload = {
      visitor: finalVisitorData,
      companionEmployeeIds: filteredEmployees.map((emp) => emp.employeeID || emp.id),
    };

    console.log(payload);
    onUpdate(payload as unknown as T);
    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Card style={{ width: "23rem", padding: 0 }}>
            <Card.Header className="w-100">Geral</Card.Header>
            <Card.Body className="p-2">
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formDataInicio">
                    <Form.Label>Data de Início</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      className="custom-input-height custom-select-font-size"
                      value={formData.dataInicio || ""}
                      onChange={handleChange}
                      name="dataInicio"
                    />
                  </Form.Group>
                  <Form.Group controlId="formRefDoc">
                    <Form.Label>Referência/Documento</Form.Label>
                    <Form.Control
                      type="text"
                      className="custom-input-height custom-select-font-size"
                      value={formData.refDoc || ""}
                      onChange={handleChange}
                      name="refDoc"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formDataFim">
                    <Form.Label>Data de Fim</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      className="custom-input-height custom-select-font-size"
                      value={formData.dataFim || ""}
                      onChange={handleChange}
                      name="dataFim"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card style={{ width: "23rem", padding: 0 }}>
            <Card.Header className="w-100">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ textAlign: "center" }}>Empresa</span>
                <div style={{ marginLeft: "auto", right: 0 }}>
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
                    overlay={
                      <Tooltip className="custom-tooltip">
                        Adicionar Empresa
                      </Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-building-add"
                      onClick={() => setShowAddEEModal(true)}
                    />
                  </OverlayTrigger>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="p-2 w-100">
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formEmpresaNome">
                    <Form.Label>Nome da Empresa</Form.Label>
                    <Form.Select
                      className="custom-input-height custom-select-font-size"
                      value={formData.empresaNome || ""}
                      onChange={handleEmpresaChange}
                      name="empresaNome"
                    >
                      <option value="">Selecione...</option>
                      {dataEE.externalEntity.map((entity: any) => (
                        <option
                          key={entity.externalEntityID}
                          value={entity.name}
                        >
                          {entity.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group controlId="formEmpresaNif">
                    <Form.Label>NIF</Form.Label>
                    <Form.Control
                      type="text"
                      className="custom-input-height custom-select-font-size"
                      value={formData.empresaNif || ""}
                      onChange={handleChange}
                      name="empresaNif"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card style={{ width: "22rem", padding: 0 }}>
            <Card.Header className="w-100">Viatura</Card.Header>
            <Card.Body className="p-2">
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formIdViatura">
                    <Form.Label>Matrícula</Form.Label>
                    <Form.Control
                      type="text"
                      className="custom-input-height custom-select-font-size"
                      value={formData.idViatura || ""}
                      onChange={handleChange}
                      name="idViatura"
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group controlId="formReboque">
                    <Form.Label>Reboque</Form.Label>
                    <Form.Control
                      type="text"
                      className="custom-input-height custom-select-font-size"
                      value={formData.reboque || ""}
                      onChange={handleChange}
                      name="reboque"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card style={{ width: "30rem", padding: 0 }}>
            <Card.Header className="w-100">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ textAlign: "center" }}>Visitantes</span>
                <div style={{ marginLeft: "auto", right: 0 }}>
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
                    overlay={
                      <Tooltip className="custom-tooltip">
                        Adicionar Visitante
                      </Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-person-plus"
                      onClick={() => setShowAddEmployeeModal(true)}
                    />
                  </OverlayTrigger>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="p-2 w-100">
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formIdVisitante">
                    <Form.Label>Visitante</Form.Label>
                    <Form.Select
                      className="custom-input-height custom-select-font-size"
                      value={formData.idVisitante || ""}
                      onChange={handleVisitorChange}
                      name="idVisitante"
                    >
                      <option value="">Selecione...</option>
                      {visitantes.map((visitor) => (
                        <option
                          key={visitor.employeeID}
                          value={visitor.employeeID}
                        >
                          {visitor.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Row>
                    <Col md={3}>
                      <Form.Group controlId="formVisitanteCartaoEU">
                        <Form.Label>Cartão EU</Form.Label>
                        <Form.Control
                          type="text"
                          className="custom-input-height custom-select-font-size"
                          value={formData.visitanteCartaoEU || ""}
                          onChange={handleChange}
                          name="visitanteCartaoEU"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="formVisitanteContacto">
                        <Form.Label>Contacto</Form.Label>
                        <Form.Control
                          type="text"
                          className="custom-input-height custom-select-font-size"
                          value={formData.visitanteContacto || ""}
                          onChange={handleChange}
                          name="visitanteContacto"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="formVisitanteNif">
                        <Form.Label>NIF</Form.Label>
                        <Form.Control
                          type="text"
                          className="custom-input-height custom-select-font-size"
                          value={formData.visitanteNif || ""}
                          onChange={handleChange}
                          name="visitanteNif"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="formVisitantePassaporte">
                        <Form.Label>Passaporte</Form.Label>
                        <Form.Control
                          type="text"
                          className="custom-input-height custom-select-font-size"
                          value={formData.visitantePassaporte || ""}
                          onChange={handleChange}
                          name="visitantePassaporte"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col md={12}>
                  <Form.Group controlId="formCard">
                    <Form.Label>Cartão</Form.Label>
                    <Form.Control
                      type="text"
                      className="custom-input-height custom-select-font-size"
                      value={formData.card || ""}
                      onChange={handleChange}
                      name="card"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card style={{ width: "38.6rem", padding: 0 }}>
            <Card.Header className="w-100">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ textAlign: "center" }}>Acompanhantes</span>
                <div style={{ display: "flex", marginLeft: "auto", gap: 5 }}>
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
                    overlay={
                      <Tooltip className="custom-tooltip">
                        Adicionar Acompanhantes
                      </Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-person-plus"
                      onClick={() => setShowAddCompanyModal(true)}
                    />
                  </OverlayTrigger>
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
                    overlay={
                      <Tooltip className="custom-tooltip">
                        Remover Acompanhantes
                      </Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-trash"
                      onClick={handleRemoveCompanions}
                    />
                  </OverlayTrigger>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="p-2 w-100">
              <Row>
                <DataTable
                  columns={columns}
                  data={filteredEmployees}
                  pagination
                  paginationComponentOptions={paginationOptions}
                  paginationPerPage={5}
                  paginationRowsPerPageOptions={[5, 10]}
                  selectableRows
                  selectableRowsSingle
                  onSelectedRowsChange={handleRowSelected}
                  selectableRowsHighlight
                  noDataComponent="Não existem dados disponíveis para mostrar."
                  customStyles={customStyles}
                  striped
                  responsive
                  persistTableHead={true}
                  defaultSortAsc={true}
                  defaultSortFieldId="name"
                />
              </Row>
            </Card.Body>
          </Card>
          <Card style={{ width: "23rem", padding: 0 }}>
            <Card.Header className="w-100">Visitado</Card.Header>
            <Card.Body className="p-2 w-100">
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formIdPessoa">
                    <Form.Label>Nome</Form.Label>
                    <Form.Select
                      className="custom-input-height custom-select-font-size"
                      value={formData.idPessoa || ""}
                      onChange={handleVisitadoChange}
                      name="idPessoa"
                    >
                      <option value="">Selecione...</option>
                      {visitados.map((emp) => (
                        <option key={emp.employeeID} value={emp.employeeID}>
                          {emp.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="formDepartment">
                    <Form.Label>Departamento</Form.Label>
                    <Form.Control
                      type="text"
                      className="custom-input-height custom-select-font-size"
                      value={formData.department || ""}
                      onChange={handleChange}
                      name="department"
                    />
                  </Form.Group>
                  <Form.Group controlId="formPhone">
                    <Form.Label>Telemóvel</Form.Label>
                    <Form.Control
                      type="text"
                      className="custom-input-height custom-select-font-size"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      name="phone"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card style={{ width: "45.6rem", padding: 0 }}>
            <Card.Header className="w-100">Outros dados</Card.Header>
            <Card.Body className="p-2 w-100">
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formVisitanteMotivo">
                    <Form.Label>Motivo da Visita</Form.Label>
                    <Form.Select
                      className="custom-input-height custom-select-font-size"
                      value={formData.visitanteMotivo || ""}
                      onChange={handleVisitanteMotivoChange}
                      name="visitanteMotivo"
                    >
                      <option value="">Selecione...</option>
                      {employeeVisitorMotive.map((motive: any) => (
                        <option key={motive.id} value={motive.descricao}>
                          {motive.descricao}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group controlId="formObs">
                    <Form.Label>Observações</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      className="custom-select-font-size textarea"
                      value={formData.obs || ""}
                      onChange={handleChange}
                      name="obs"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
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
        <Button variant="outline-dark" onClick={handleDuplicateClick}>
          Duplicar
        </Button>
        <Button variant="outline-dark" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="outline-dark" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
      <CreateModalExtEnt
        title="Adicionar Entidade Externa"
        open={showAddEEModal}
        onClose={() => setShowAddEEModal(false)}
        onSave={handleAddExternalEntity}
        fields={externalEntityFields}
        initialValues={{}}
      />
      <CreateModalEmployees
        title="Adicionar Visitante"
        open={showAddEmployeeModal}
        onClose={() => setShowAddEmployeeModal(false)}
        onSave={addEmployeeAndCard}
        fields={employeeFields}
        initialValues={{}}
      />
      <AddCompanyToVisitorModal
        title="Adicionar Acompanhantes"
        open={showAddCompanyModal}
        onClose={() => setShowAddCompanyModal(false)}
        onSave={handleAddVisitorsToDataTable}
        fields={employeeFields}
      />
    </Modal>
  );
};
