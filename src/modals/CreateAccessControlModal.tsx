import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../css/PagesStyles.css";
import { Col, Form, Nav, OverlayTrigger, Row, Spinner, Tab, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../components/CustomStylesDataTable";
import { Devices, Doors, Employee } from "../types/Types";
import { deviceFields, doorsFields, employeeFields } from "../fields/Fields";
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
    initialValuesData: Partial<T>;
}

// Define o componente
export const CreateAccessControlModal = <T extends Record<string, any>>({ title, open, onClose, onSave, initialValuesData }: Props<T>) => {
    const [formData, setFormData] = useState<T>(initialValuesData as T || ({} as T));
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEmployeeAddModal, setShowEmployeeAddModal] = useState(false);

    // UseEffect para atualizar o estado do formulário
    useEffect(() => {
        if (open) {
            setFormData(initialValuesData as T || ({} as T));
        } else {
            setFormData({} as T);
        }
    }, [open]);

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
    const deviceColumns: TableColumn<Devices>[] = deviceFields
        .map(field => {
            const formatField = (row: Devices) => {
                switch (field.key) {
                    case 'code':
                        return row.code === 0 ? "" : row.code;
                    case 'machineNumber':
                        return row.code === 0 ? "" : row.machineNumber;
                    case 'cardNumber':
                        return row.cardNumber === 0 ? "" : row.cardNumber;
                    case 'productTime':
                        return new Date(row.productTime).toLocaleString() || '';
                    case 'status':
                        return (
                            <div style={{
                                height: '10px',
                                width: '10px',
                                backgroundColor: row.status ? 'green' : 'red',
                                borderRadius: '50%',
                                display: 'inline-block'
                            }} title={row.status ? 'Online' : 'Offline'} />
                        );
                    case 'enabled':
                        return row.enabled ? 'Activo' : 'Inactivo';
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
                {/* <Col md={3}>
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
                </Tab.Container> */}
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" type="button" onClick={onClose} >
                    Fechar
                </Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" type="button" onClick={handleSave} >
                    Guardar
                </Button>
            </Modal.Footer>
            {/* <AddTerminalToACModal
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={() => console.log('save')}
                title="Adicionar Equipamento ao Plano"
                devices={devices}
                doors={doors}
            /> */}
            <AddEmployeeToACModal
                open={showEmployeeAddModal}
                onClose={() => setShowEmployeeAddModal(false)}
                onSave={() => console.log('save')}
                title="Adicionar Pessoa ao Plano"
            />
        </Modal>
    );
};
