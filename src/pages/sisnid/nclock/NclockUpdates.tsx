import { useState } from "react";
import Split from "react-split";

import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { TreeViewDataNclock } from "../../../components/TreeViewNclock";

import {
  Button,
  Card,
  Col,
  Form,
  Nav,
  OverlayTrigger,
  Row,
  Tab,
  Tooltip,
} from "react-bootstrap";

import {
  DateRangePicker,
  defaultStaticRanges,
  defaultInputRanges,
} from "react-date-range";
import * as apiService from "../../../api/apiService";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import { pt } from "date-fns/locale";

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T00:00`;
};

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T23:59`;
};

// Define a página atualizações
export const NclockUpdates = () => {
  const currentDate = new Date();
  const currentYear = new Date().getFullYear();
  const [startDate, setStartDate] = useState(
    formatDateToStartOfDay(currentDate)
  );
  const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<any[]>([
    {
      startDate: formatDateToStartOfDay(currentDate),
      endDate: formatDateToStartOfDay(currentDate),
      key: "selection",
    },
  ]);
  const isMobile = useMediaQuery({ maxWidth: 500 });

  // Envia as datas para a API
  const sendDatesToApi = async (start: string, end: string) => {
    try {
      const data = await apiService.AddAttendanceResults(start, end);
      if (data.mensagem) {
        toast.success(data.mensagem);
      } else {
        toast.error("Resultados gerados com sucesso!");
      }
    } catch (error) {
      console.error("Falha ao tentar enviar as datas:", error);
    }
  };

  // Define a seleção de funcionários
  const handleSelectFromTreeView = (selectedIds: string[]) => {
    setSelectedEmployeeIds(selectedIds);
  };

  // Atualiza as atualizações
  const refreshUpdates = async () => {
    const newStart = formatDateToStartOfDay(currentDate);
    const newEnd = formatDateToEndOfDay(currentDate);

    setStartDate(newStart);
    setEndDate(newEnd);

    setDateRange([
      {
        startDate: new Date(newStart),
        endDate: new Date(newEnd),
        key: "selection",
      },
    ]);
  };

  // Função que dispara ao alterar o intervalo de datas no calendário
  const handleDateRangeChange = (ranges: any) => {
    const { startDate: newStartDate, endDate: newEndDate } = ranges.selection;

    if (newStartDate && newEndDate) {
      const formattedStart = formatDateToStartOfDay(newStartDate);
      const formattedEnd = formatDateToEndOfDay(newEndDate);

      setStartDate(formattedStart);
      setEndDate(formattedEnd);

      setDateRange([
        {
          startDate: newStartDate,
          endDate: newEndDate,
          key: "selection",
        },
      ]);
    }
  };

  return (
    <div className="main-container">
      <div className="content-container">
        {isMobile && (
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span>Atualizações</span>
            </div>
            <div className="datatable-header">
              <div className="buttons-container">
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
                    <Tooltip className="custom-tooltip">Atualizar</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-arrow-clockwise"
                    onClick={refreshUpdates}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
              </div>
              <Tab.Container defaultActiveKey="datas">
                <Nav
                  variant="tabs"
                  className="nav-modal"
                  style={{ marginTop: 0 }}
                >
                  <Nav.Item>
                    <Nav.Link eventKey="datas">Datas</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="datas">
                    <div className="content-wrapper"></div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        )}
        <Split
          className="split"
          sizes={[15, 85]}
          minSize={100}
          expandToMin={true}
          gutterSize={15}
          gutterAlign="center"
          snapOffset={0}
          dragInterval={1}
        >
          <div className="treeview-container">
            <TreeViewDataNclock onSelectEmployees={handleSelectFromTreeView} />
          </div>
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span>Atualizações</span>
            </div>
            <div className="datatable-header">
              <div className="buttons-container">
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
                    <Tooltip className="custom-tooltip">Atualizar</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-arrow-clockwise"
                    onClick={refreshUpdates}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
              </div>
            </div>
            <Card style={{ width: "99%", padding: 0 }}>
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <Col>
                      <Form.Group className="d-flex align-items-center justify-content-between">
                        <Form.Label>Processamento fechado até:</Form.Label>
                        <Form.Control
                          type="datetime-local"
                          className="custom-input-height custom-select-font-size w-25"
                        />
                      </Form.Group>
                      <Form.Group className="d-flex align-items-center justify-content-between">
                        <Form.Label>Último dia processado:</Form.Label>
                        <Form.Control
                          type="datetime-local"
                          className="custom-input-height custom-select-font-size w-25"
                        />
                      </Form.Group>
                      <Form.Group className="d-flex align-items-center justify-content-between">
                        <Form.Label>
                          Último processamento automático:
                        </Form.Label>
                        <Form.Control
                          type="datetime-local"
                          className="custom-input-height custom-select-font-size w-25"
                        />
                      </Form.Group>
                      <Form.Group className="d-flex align-items-center">
                        <Form.Label>
                          Não reprocessar resultados validados:
                        </Form.Label>
                        <Form.Check type="switch" className="ms-auto" />
                      </Form.Group>
                    </Col>
                  </Col>
                  <Col md={3}>
                    <Col>
                      <Button
                        style={{ height: "6rem", width: "98%" }}
                        variant="outline-dark"
                        onClick={() => sendDatesToApi(startDate, endDate)}
                      >
                        <i
                          className="bi bi-gear"
                          style={{ marginRight: 5 }}
                        ></i>
                        Processar dias selecionados
                      </Button>
                      <Form.Group className="d-flex align-items-center">
                        <Form.Label>
                          Não reprocessar resultados alterados:
                        </Form.Label>
                        <Form.Check type="switch" className="ms-auto" />
                      </Form.Group>
                    </Col>
                  </Col>
                  <Col md={3} style={{ width: "16%" }}>
                    <Col>
                      <Button
                        style={{ height: "3rem", marginBottom: 20 }}
                        variant="outline-dark"
                      >
                        <i
                          className="bi bi-folder-check"
                          style={{ marginRight: 5 }}
                        ></i>
                        Fechar processamento
                      </Button>
                      <Button style={{ height: "3rem" }} variant="outline-dark">
                        <i
                          className="bi bi-folder2-open"
                          style={{ marginRight: 5 }}
                        ></i>
                        Reabrir processamento
                      </Button>
                    </Col>
                  </Col>
                  <Col md={3} style={{ width: "16%" }}>
                    <Col>
                      <Button
                        style={{ height: "3rem", marginBottom: 20 }}
                        variant="outline-dark"
                      >
                        <i
                          className="bi bi-trash2"
                          style={{ marginRight: 5 }}
                        ></i>
                        Remover processamento
                      </Button>
                      <Button style={{ height: "3rem" }} variant="outline-dark">
                        <i
                          className="bi bi-x-circle"
                          style={{ marginRight: 5 }}
                        ></i>
                        Cancelar processamento
                      </Button>
                    </Col>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Tab.Container defaultActiveKey="datas">
              <Nav
                variant="tabs"
                className="nav-modal"
                style={{ marginTop: 0 }}
              >
                <Nav.Item>
                  <Nav.Link eventKey="datas">Datas</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="datas">
                  <div className="content-wrapper" style={{ padding: "1rem" }}>
                    <div style={{ maxWidth: "100%", overflowX: "auto" }}>
                      <DateRangePicker
                        onChange={handleDateRangeChange}
                        ranges={dateRange}
                        months={12}
                        direction="horizontal"
                        shownDate={new Date(currentYear, 0, 1)}
                        minDate={new Date(currentYear, 0, 1)}
                        maxDate={new Date(currentYear, 11, 31)}
                        staticRanges={[]}
                        inputRanges={[]}
                        showDateDisplay={false}
                        locale={pt}
                        initialFocusedRange={["selection", "startDate"]}
                      />
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Split>
      </div>
    </div>
  );
};
