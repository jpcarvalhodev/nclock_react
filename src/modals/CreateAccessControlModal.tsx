import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../css/PagesStyles.css";
import { Col, Form, Nav, OverlayTrigger, Row, Spinner, Tab, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../components/CustomStylesDataTable";
import { Doors, Employee } from "../helpers/Types";
import { doorsFields, employeeFields } from "../helpers/Fields";
import { useTerminals } from "../context/TerminalsContext";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { usePersons } from "../context/PersonsContext";
import { AddTerminalToACModal } from "./AddTerminalToACModal";
import { AddEmployeeToACModal } from "./AddEmployeeToACModal";

// Define as propriedades do componente
interface Props<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
}

// Define o componente
export const CreateAccessControlModal = <T extends Record<string, any>>({ title, open, onClose, onSave }: Props<T>) => {
    const { employees } = usePersons();
    const { devices, fetchAllDoorData, period } = useTerminals();
    const [formData, setFormData] = useState<T>({} as T);
    const [doors, setDoors] = useState<Doors[]>([]);
    const [loadingDoorData, setLoadingDoorData] = useState(false);
    const [loadingEmployeeData, setLoadingEmployeeData] = useState(false);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEmployeeAddModal, setShowEmployeeAddModal] = useState(false);

    // UseEffect para atualizar o estado do formulário
    useEffect(() => {
        if (open) {
            fetchDoors();
        }
    }, [open]);

    // Função para buscar as portas
    const fetchDoors = async () => {
        const dataDoors = await fetchAllDoorData();
        const filteredDoorsOrdered = dataDoors.sort((a, b) => a.doorNo - b.doorNo);
        setDoors(filteredDoorsOrdered);
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

    // Filtra os dados da tabela de portas
    const filteredDoorDataTable = doors.filter(door =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(door[key]) === String(filters[key])
        )
    );

    // Define as colunas que serão exibidas
    const includedColumns = ['enabled', 'name', 'doorNo', 'timezoneId'];

    // Define as colunas
    const doorColumns: TableColumn<Doors>[] = doorsFields
        .filter(field => includedColumns.includes(field.key))
        .sort((a, b) => { if (a.key === 'timezoneId') return -1; else if (b.key === 'timezoneId') return 1; else return 0; })
        .sort((a, b) => { if (a.key === 'name') return -1; else if (b.key === 'name') return 1; else return 0; })
        .sort((a, b) => { if (a.key === 'enabled') return 1; else if (b.key === 'enabled') return -1; else return 0; })
        .map(field => {
            const formatField = (row: Doors) => {
                switch (field.key) {
                    case 'enabled':
                        return row[field.key] === true ? 'Activo' : 'Inactivo';
                    case 'timezoneId':
                        return period.find(p => p.id === row[field.key])?.name || '';
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
                selector: (row: Doors) => {
                    if (field.key === 'doorNo') {
                        return row[field.key];
                    }
                    return formatField(row);
                },
                sortable: true,
                cell: (row: Doors) => {
                    if (field.key === 'doorNo') {
                        return row[field.key];
                    }
                    return formatField(row);
                }
            };
        });

    // Filtra os dados da tabela de funcionários
    const filteredEmployeeDataTable = employees
        .sort((a, b) => Number(a.enrollNumber) - Number(b.enrollNumber))
        .filter(employee =>
            Object.keys(filters).every(key =>
                filters[key] === "" || String(employee[key]) === String(filters[key])
            )
        );

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

    // Função para salvar os dados
    const handleSave = () => {
        onSave({} as T);
        onClose();
    }

    return (
        <Modal show={open} onHide={onClose} backdrop="static" dialogClassName="custom-modal" size="xl" centered>
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
                                                    {loadingDoorData ?
                                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                                                            <Spinner style={{ width: 50, height: 50 }} animation="border" />
                                                        </div> :
                                                        <DataTable
                                                            columns={doorColumns}
                                                            data={[]}
                                                            pagination
                                                            paginationComponentOptions={paginationOptions}
                                                            paginationPerPage={10}
                                                            paginationRowsPerPageOptions={[5, 10]}
                                                            selectableRows
                                                            noDataComponent="Não existem dados disponíveis para exibir."
                                                            customStyles={customStyles}
                                                            striped
                                                            defaultSortAsc={true}
                                                            defaultSortFieldId="doorNo"
                                                        />
                                                    }
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
                                                    {loadingEmployeeData ?
                                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                                                            <Spinner style={{ width: 50, height: 50 }} animation="border" />
                                                        </div> :
                                                        <DataTable
                                                            columns={employeeColumns}
                                                            data={[]}
                                                            pagination
                                                            paginationComponentOptions={paginationOptions}
                                                            paginationPerPage={10}
                                                            paginationRowsPerPageOptions={[5, 10]}
                                                            selectableRows
                                                            noDataComponent="Não existem dados disponíveis para exibir."
                                                            customStyles={customStyles}
                                                            striped
                                                            defaultSortAsc={true}
                                                            defaultSortFieldId="enrollNumber"
                                                        />
                                                    }
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
                                                        <CustomOutlineButton icon="bi bi-trash-fill" onClick={() => console.log('delete')} iconSize='1.1em' />
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
                <Button variant="outline-secondary" type="button" onClick={onClose} >
                    Fechar
                </Button>
                <Button variant="outline-primary" type="button" onClick={handleSave} >
                    Guardar
                </Button>
            </Modal.Footer>
            <AddTerminalToACModal
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={() => console.log('save')}
                title="Adicionar Equipamento ao Plano"
                devices={devices}
                doors={doors}
            />
            <AddEmployeeToACModal
                open={showEmployeeAddModal}
                onClose={() => setShowEmployeeAddModal(false)}
                onSave={() => console.log('save')}
                title="Adicionar Pessoa ao Plano"
            />
        </Modal>
    );
};
