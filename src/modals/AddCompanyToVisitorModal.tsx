import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../css/PagesStyles.css";
import { Col, Row } from "react-bootstrap";
import { usePersons } from "../context/PersonsContext";

// Interface para as propriedades do modal
interface CreateModalProps<T> {
  title: string;
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<T>) => void;
  fields: Field[];
}

// Interface para os campos do formulário
interface Field {
  key: string;
  label: string;
  type: string;
  required?: boolean;
  validate?: (value: any) => boolean;
  errorMessage?: string;
}

// Interface para os dados do visitante
interface VisitorRow {
  id: string;
  name: string;
  cardNumber: string;
  mobile: string;
  nif: string;
  bInumber: string;
  passport: string;
}

// Define o estado inicial do visitante
const defaultVisitorRow: VisitorRow = {
  id: "",	
  name: "",
  cardNumber: "",
  mobile: "",
  nif: "",
  bInumber: "",
  passport: "",
};

// Define o componente
export const AddCompanyToVisitorModal = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onSave,
}: CreateModalProps<T>) => {
  const { employeesNoPagination } = usePersons();
  const [visitorRows, setVisitorRows] = useState<VisitorRow[]>([
    defaultVisitorRow,
  ]);

  // Função para alterar o estado do visitante
  const handleVisitorRowChange = (
    index: number,
    field: keyof VisitorRow,
    value: string
  ) => {
    setVisitorRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index] = { ...newRows[index], [field]: value };
      return newRows;
    });
  };

  // Função para alterar o nome do visitante
  const handleVisitorNameChange = (
    index: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedName = e.target.value;
    const visitantes = employeesNoPagination.filter((emp) => emp.type === "Visitante");
    const visitor = visitantes.find((emp) => emp.name === selectedName);
    if (visitor) {
      setVisitorRows((prevRows) => {
        const newRows = [...prevRows];
        newRows[index] = {
          id: visitor.employeeID,
          name: visitor.name,
          cardNumber: visitor.employeeCards?.[0]?.cardNumber || "",
          mobile: visitor.mobile ? visitor.mobile.toString() : "",
          nif: visitor.nif ? visitor.nif.toString() : "",
          bInumber: visitor.biNumber || "",
          passport: visitor.passaporte || "",
        };
        return newRows;
      });
    } else {
      setVisitorRows((prevRows) => {
        const newRows = [...prevRows];
        newRows[index] = { ...defaultVisitorRow };
        return newRows;
      });
    }
  };

  // Função para fechar o modal
  const handleClose = () => {
    setVisitorRows([defaultVisitorRow]);
    onClose();
  };

  // Função para salvar os dados
  const handleSave = () => {
    onSave(visitorRows as unknown as Partial<T>);
    handleClose();
  };

  return (
    <Modal
      show={open}
      onHide={handleClose}
      backdrop="static"
      size="xl"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <div className="container-fluid">
          <Row className="mt-2">
            {[
              "Nome",
              "Cartão",
              "Contacto",
              "NIF",
              "Cartão EU",
              "Passaporte",
            ].map((label) => (
              <Col key={label}>
                {label}
              </Col>
            ))}
          </Row>
          {visitorRows.map((row, index) => (
            <Row className="mt-1" key={index}>
              <Col>
                <Form.Group controlId={`visitorName-${index}`}>
                  <Form.Select
                    className="custom-input-height custom-select-font-size"
                    value={row.name}
                    onChange={(e) => handleVisitorNameChange(index, e)}
                  >
                    <option value="">Selecione...</option>
                    {employeesNoPagination
                      .filter((emp) => emp.type === "Visitante")
                      .map((visitor) => (
                        <option key={visitor.employeeID} value={visitor.name}>
                          {visitor.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={`visitorCardNumber-${index}`}>
                  <Form.Control
                    type="text"
                    className="custom-input-height custom-select-font-size"
                    value={row.cardNumber}
                    onChange={(e) =>
                      handleVisitorRowChange(
                        index,
                        "cardNumber",
                        e.target.value
                      )
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={`visitorMobile-${index}`}>
                  <Form.Control
                    type="text"
                    className="custom-input-height custom-select-font-size"
                    value={row.mobile}
                    onChange={(e) =>
                      handleVisitorRowChange(index, "mobile", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={`visitorNif-${index}`}>
                  <Form.Control
                    type="text"
                    className="custom-input-height custom-select-font-size"
                    value={row.nif}
                    onChange={(e) =>
                      handleVisitorRowChange(index, "nif", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={`visitorBI-${index}`}>
                  <Form.Control
                    type="text"
                    className="custom-input-height custom-select-font-size"
                    value={row.bInumber}
                    onChange={(e) =>
                      handleVisitorRowChange(index, "bInumber", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={`visitorPassport-${index}`}>
                  <Form.Control
                    type="text"
                    className="custom-input-height custom-select-font-size"
                    value={row.passport}
                    onChange={(e) =>
                      handleVisitorRowChange(index, "passport", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          ))}
          <Row className="mt-3">
            <Col>
              <Button
                variant="outline-dark"
                size="sm"
                onClick={() =>
                  setVisitorRows((prev) => [...prev, defaultVisitorRow])
                }
              >
                Adicionar Acompanhante
              </Button>
            </Col>
          </Row>
        </div>
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
          onClick={handleSave}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
