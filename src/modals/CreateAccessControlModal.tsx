import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../css/PagesStyles.css";
import { Col, Form, Nav, OverlayTrigger, Row, Tab, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../components/CustomStylesDataTable";
import { Employee, PlanoAcessoDispositivos } from "../types/Types";
import { employeeFields, planosAcessoDispositivosFields } from "../fields/Fields";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { AddTerminalToACModal } from "./AddTerminalToACModal";
import { AddEmployeeToACModal } from "./AddEmployeeToACModal";
import { useTerminals } from "../context/TerminalsContext";

// Define as propriedades do componente
interface Props<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    initialValuesData: Partial<T>;
}

// Define o componente
export const CreateAccessControlModal = <T extends Record<string, any>>({ title, open, onClose, onSave, initialValuesData }: Props<T>) => {
    const { devices, door, accessControl } = useTerminals();
    const [formData, setFormData] = useState<T>(initialValuesData as T || ({} as T));
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEmployeeAddModal, setShowEmployeeAddModal] = useState(false);
    const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
    const [devicesTableData, setDevicesTableData] = useState<PlanoAcessoDispositivos[]>([]);
    const [employeeTableData, setEmployeeTableData] = useState<Employee[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);

    // UseEffect para atualizar o estado do formulário
    useEffect(() => {
        if (open) {
            setFormData(initialValuesData as T || ({} as T));
        } else {
            setFormData({} as T);
            setEmployeeTableData([]);
        }
    }, [open]);

    // Função para adicionar períodos à tabela
    const addEmployeesToDatatable = (periods: Employee[]) => {
        setEmployeeTableData(periods);
    };

    // Função para adicionar terminais à tabela
    const addTerminalToDatatable = (periods: PlanoAcessoDispositivos[]) => {
        
    };

    // Função para remover períodos selecionados
    const removeSelectedEmployees = () => {
        const remainingData = employeeTableData.filter(
            (emp) => !selectedRows.some((row) => row.employeeID === emp.employeeID)
        );
        setEmployeeTableData(remainingData);
        setClearSelectionToggle((prev) => !prev);
    };

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Função para atualizar os campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Define as colunas de dispositivos
    const deviceColumns: TableColumn<PlanoAcessoDispositivos>[] = planosAcessoDispositivosFields
        .map(field => {
            const formatField = (row: PlanoAcessoDispositivos) => {
                switch (field.key) {
                    default:
                        return row[field.key];
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Define as colunas que serão exibidas
    const includedEmployeeColumns = ['enrollNumber', 'name', 'cardNumber', 'type'];

    // Define as colunas
    const employeeColumns: TableColumn<Employee>[] = employeeFields
        .filter(field => includedEmployeeColumns.includes(field.key))
        .sort((a, b) => { if (a.key === 'name') return -1; else if (b.key === 'name') return 1; else return 0; })
        .sort((a, b) => { if (a.key === 'cardNumber') return -1; else if (b.key === 'cardNumber') return 1; else return 0; })
        .sort((a, b) => { if (a.key === 'type') return 1; else if (b.key === 'type') return -1; else return 0; })
        .map(field => {
            const formatField = (row: Employee) => {
                switch (field.key) {
                    case 'cardNumber':
                        return row.employeeCards?.[0]?.cardNumber || '';
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                    </>
                ),
                selector: (row: Employee) => {
                    if (field.key === 'enrollNumber') {
                        return parseInt(row.enrollNumber) || 0;
                    }
                    return row[field.key] || '';
                },
                sortable: true,
                cell: (row: Employee) => formatField(row)
            };
        });

    // Função para fechar o modal
    const handleClose = () => {
        setClearSelectionToggle((prev) => !prev);
        onClose();
    }

    // Função para salvar os dados
    const handleSave = () => {
        onSave({} as T);
        handleClose();
    }

    return (
        <Modal show={open} onHide={handleClose} backdrop="static" dialogClassName="custom-modal" size="xl" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Col md={3}>
                    <Form.Group controlId="formNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            className="custom-input-height custom-select-font-size"
                            type="text"
                            name="nome"
                            value={formData.morada}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
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
                                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                                <Row>
                                                    <DataTable
                                                        columns={deviceColumns}
                                                        data={[]}
                                                        pagination
                                                        paginationComponentOptions={paginationOptions}
                                                        paginationPerPage={20}
                                                        paginationRowsPerPageOptions={[20, 30, 50]}
                                                        selectableRows
                                                        noDataComponent="Não existem dados disponíveis para exibir."
                                                        customStyles={customStyles}
                                                        striped
                                                        defaultSortAsc={true}
                                                        defaultSortFieldId="doorNo"
                                                    />
                                                </Row>
                                                <div style={{ display: 'flex', marginTop: 10 }}>
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={<Tooltip className="custom-tooltip">Adicionar</Tooltip>}
                                                    >
                                                        <CustomOutlineButton className="accesscontrol-buttons" icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                                                    </OverlayTrigger>
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={<Tooltip className="custom-tooltip">Apagar Selecionados</Tooltip>}
                                                    >
                                                        <CustomOutlineButton icon="bi bi-trash-fill" onClick={() => console.log('delete')} iconSize='1.1em' />
                                                    </OverlayTrigger>
                                                </div>
                                            </Form>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="pessoas">
                                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                                <Row>
                                                    <DataTable
                                                        columns={employeeColumns}
                                                        data={employeeTableData}
                                                        pagination
                                                        paginationComponentOptions={paginationOptions}
                                                        paginationPerPage={20}
                                                        paginationRowsPerPageOptions={[20, 50, 100]}
                                                        selectableRows
                                                        onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}
                                                        noDataComponent="Não existem dados disponíveis para exibir."
                                                        clearSelectedRows={clearSelectionToggle}
                                                        customStyles={customStyles}
                                                        striped
                                                        defaultSortAsc={true}
                                                        defaultSortFieldId="enrollNumber"
                                                    />
                                                </Row>
                                                <div style={{ display: 'flex', marginTop: 10 }}>
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={<Tooltip className="custom-tooltip">Adicionar</Tooltip>}
                                                    >
                                                        <CustomOutlineButton className="accesscontrol-buttons" icon="bi-plus" onClick={() => setShowEmployeeAddModal(true)} iconSize='1.1em' />
                                                    </OverlayTrigger>
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={<Tooltip className="custom-tooltip">Apagar Selecionados</Tooltip>}
                                                    >
                                                        <CustomOutlineButton icon="bi bi-trash-fill" onClick={removeSelectedEmployees} iconSize='1.1em' />
                                                    </OverlayTrigger>
                                                </div>
                                            </Form>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </Form>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" type="button" onClick={handleClose} >
                    Fechar
                </Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" type="button" onClick={handleSave} >
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
        </Modal>
    );
};
