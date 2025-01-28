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
import { AddEmployeeToACModal } from "./AddEmployeeToACModal";

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
export const UpdateAccessControlModal = <T extends Record<string, any>>({ title, open, onClose, onUpdate, entity, canMoveNext, canMovePrev, onNext, onPrev }: Props<T>) => {
    const [formData, setFormData] = useState<T>({ ...entity });
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEmployeeAddModal, setShowEmployeeAddModal] = useState(false);
    const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
    const [employeeTableData, setEmployeeTableData] = useState<Employee[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);

    // UseEffect para atualizar o estado do formulário
    useEffect(() => {
        if (open) {
            setFormData({ ...entity });
        } else {
            setFormData({} as T);
            setEmployeeTableData([]);
        }
    }, [open]);

    // Função para adicionar períodos à tabela
    const addEmployeesToDatatable = (periods: Employee[]) => {
        setEmployeeTableData(periods);
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

    // Função para salvar os dados
    const handleSave = () => {
        onUpdate({} as T);
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
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Anterior</Tooltip>}
                >
                    <CustomOutlineButton icon="bi-arrow-left" onClick={onPrev} disabled={!canMovePrev} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Seguinte</Tooltip>}
                >
                    <CustomOutlineButton className='arrows-modal' icon="bi-arrow-right" onClick={onNext} disabled={!canMoveNext} />
                </OverlayTrigger>
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
                        /> */}
            <AddEmployeeToACModal
                open={showEmployeeAddModal}
                onClose={() => setShowEmployeeAddModal(false)}
                onSave={addEmployeesToDatatable}
                title="Adicionar Pessoa ao Plano"
            />
        </Modal>
    );
};
