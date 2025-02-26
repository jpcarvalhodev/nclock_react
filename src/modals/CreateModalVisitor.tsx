import { ChangeEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/PagesStyles.css";
import { Card } from "react-bootstrap";
import { SearchBoxContainer } from "../components/SearchBoxContainer";
import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../components/CustomStylesDataTable";
import { Employee } from "../types/Types";
import { employeeFields } from "../fields/Fields";

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
  onSave: (data: Partial<T>) => void;
  fields: FieldConfig[];
  initialValues: Partial<T>;
}

export const CreateModalVisitor = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onSave,
  fields,
  initialValues,
}: Props<T>) => {
  const [formData, setFormData] = useState<Partial<T>>({ ...initialValues });
  const [filterText, setFilterText] = useState("");
  const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

  // Busca os initialValues ao abrir o modal
  useEffect(() => {
    if (open) {
      setFormData({ ...initialValues });
    } else {
      setFormData({});
    }
  }, [open]);

  // Gerencia as mudanças nos campos do formulário
  const handleChange = (e: ChangeEvent<FormControlElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Define a função selecionar uma linha
  const handleRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Employee[];
  }) => {
    setSelectedRows(state.selectedRows);
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
          case "cardNumber":
            return row.employeeCards?.[0]?.cardNumber || "";
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

  // Define o envio de dados
  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal show={open} onHide={onClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Card style={{ width: "23rem", padding: 0 }}>
            <Card.Header>Geral</Card.Header>
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
            <Card.Header>Empresa</Card.Header>
            <Card.Body className="p-2">
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formEmpresaNome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      className="custom-input-height custom-select-font-size"
                      value={formData.empresaNome || ""}
                      onChange={handleChange}
                      name="empresaNome"
                    />
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
            <Card.Header>Viatura</Card.Header>
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
            <Card.Header>Visitantes</Card.Header>
            <Card.Body className="p-2 w-100">
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formIdVisitante">
                    <Form.Label>Visitante</Form.Label>
                    <Form.Control
                      type="text"
                      className="custom-input-height custom-select-font-size"
                      value={formData.idVisitante || ""}
                      onChange={handleChange}
                      name="idVisitante"
                    />
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
            <Card.Header>Acompanhantes</Card.Header>
            <Card.Body className="p-2 w-100">
              <Row>
                <DataTable
                  columns={columns}
                  data={filteredEmployees}
                  pagination
                  paginationComponentOptions={paginationOptions}
                  paginationPerPage={20}
                  paginationRowsPerPageOptions={[20, 50]}
                  selectableRows
                  onSelectedRowsChange={handleRowSelected}
                  clearSelectedRows={clearSelectionToggle}
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
            <Card.Header>Visitado</Card.Header>
            <Card.Body className="p-2 w-100">
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formIdPessoa">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      className="custom-input-height custom-select-font-size"
                      value={formData.idPessoa || ""}
                      onChange={handleChange}
                      name="idPessoa"
                    />
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
            <Card.Header>Outros dados</Card.Header>
            <Card.Body className="p-2 w-100">
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formVisitanteMotivo">
                    <Form.Label>Motivo da Visita</Form.Label>
                    <Form.Control
                      type="text"
                      className="custom-input-height custom-select-font-size"
                      value={formData.visitanteMotivo || ""}
                      onChange={handleChange}
                      name="visitanteMotivo"
                    />
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
      <Modal.Footer>
        <Button variant="outline-dark" onClick={onClose}>
          Fechar
        </Button>
        <Button variant="outline-dark" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
