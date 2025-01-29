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
import { AddTerminalToACModal } from "./AddTerminalToACModal";
import { useTerminals } from "../context/TerminalsContext";

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
    const { devices, door } = useTerminals();
    const [formData, setFormData] = useState<T>({ ...entity });
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEmployeeAddModal, setShowEmployeeAddModal] = useState(false);
    const [deviceSelectedRows, setDeviceSelectedRows] = useState<Partial<PlanoAcessoDispositivos>[]>([]);
    const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
    const [devicesTableData, setDevicesTableData] = useState<Partial<PlanoAcessoDispositivos>[]>([]);
    const [employeeTableData, setEmployeeTableData] = useState<Employee[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);

    console.log(entity);

    // UseEffect para atualizar o estado do formulário
    useEffect(() => {
        if (open) {
            setFormData({ ...entity });
            const loadedDevices = entity.planosAcessoDispositivos?.flatMap(
                (pad: PlanoAcessoDispositivos) => pad.dispositivos || []
            ) ?? [];
            setDevicesTableData(loadedDevices);
            setEmployeeTableData(entity.employees ?? []);
        } else {
            setFormData({} as T);
            setDevicesTableData([]);
            setEmployeeTableData([]);
        }
    }, [open, entity]);

    // Função para adicionar períodos à tabela
    const addEmployeesToDatatable = (periods: Employee[]) => {
        setEmployeeTableData(periods);
    };

    // Função para adicionar terminais, portas e plano de horários à tabela
    const addTerminalToDatatable = (periods: Partial<PlanoAcessoDispositivos>[]) => {
        setDevicesTableData(prevData => {
            const updatedData = [...prevData];

            periods.forEach(period => {
                const device = devices.find(d => d.zktecoDeviceID === period.idTerminal);
                const doorObj = door.find(d => d.id === period.idPorta);

                if (!device) return;
                if (!doorObj) return;

                const existingIndex = updatedData.findIndex(
                    item => item?.idTerminal === device.zktecoDeviceID
                );

                const newDoor = {
                    idPorta: doorObj.id,
                    nomePorta: doorObj.name,
                };

                if (existingIndex !== -1) {
                    const existingItem = updatedData[existingIndex];

                    if (!existingItem?.portas) {
                        if (existingItem) {
                            existingItem.portas = [];
                        }
                    }

                    const doorAlreadyExists = existingItem?.portas.some(
                        (p: PlanoAcessoDispositivos) => p.idPorta === newDoor.idPorta
                    );

                    if (!doorAlreadyExists) {
                        existingItem?.portas.push(newDoor);
                    }

                } else {
                    updatedData.push({
                        idTerminal: device.zktecoDeviceID || '',
                        nomeTerminal: device.deviceName || '',
                        idPlanoHorario: period.idPlanoHorario || '',
                        nomePlanoHorario: period.nomePlanoHorario || '',
                        portas: [newDoor],
                    } as unknown as Partial<PlanoAcessoDispositivos[]>);
                }
            });

            return updatedData;
        });
    };

    // Função para remover terminais selecionados
    const removeSelectedDevices = () => {
        const remainingData = devicesTableData.filter(
            (dev) => !deviceSelectedRows.some((row) => row.idTerminal === dev.idTerminal)
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

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Função para atualizar os campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? Number(value) : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };

    // Define as colunas que serão exibidas
    const includedDeviceColumns = ['nomeTerminal', 'nomePlanoHorario', 'nomePorta'];

    // Define as colunas de dispositivos
    const deviceColumns: TableColumn<Partial<PlanoAcessoDispositivos>>[] = planosAcessoDispositivosFields
        .filter(field => includedDeviceColumns.includes(field.key))
        .map(field => {

            const selectorField = (row: Partial<PlanoAcessoDispositivos>) => {
                if (field.key === 'nomePorta' && row.portas && row.portas.length > 0) {
                    return row.portas.map((p: PlanoAcessoDispositivos) => p.nomePorta).join(', ');
                }
                return row[field.key] || '';
            };

            const cellField = (row: Partial<PlanoAcessoDispositivos>) => {
                if (!row) return '';

                switch (field.key) {
                    case 'nomePorta': {
                        if (row.portas && row.portas.length > 0) {
                            const fullText = row.portas.map((p: PlanoAcessoDispositivos) => p.nomePorta).join(', ');

                            if (fullText.length <= 45) {
                                return fullText;
                            }

                            const truncatedText = fullText.slice(0, 45) + '...';

                            return (
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">{fullText}</Tooltip>}
                                >
                                    <span>{truncatedText}</span>
                                </OverlayTrigger>
                            );
                        }
                        return '';
                    }
                    default:
                        return row[field.key] || '';
                }
            };

            return {
                id: field.key,
                name: field.label,
                selector: selectorField,
                cell: cellField,
                sortable: true,
                sortFunction: (rowA, rowB) => {
                    const aVal = (rowA.nomeTerminal || '').toLowerCase();
                    const bVal = (rowB.nomeTerminal || '').toLowerCase();
                    return aVal.localeCompare(bVal);
                },
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
        setEmployeeTableData([]);
        setDevicesTableData([]);
        onClose();
    }

    // Função para salvar os dados
    const handleSave = () => {
        const planosAcessoDispositivos = devicesTableData.flatMap(device => {
            return device.portas?.map((porta: PlanoAcessoDispositivos) => ({
                idTerminal: device.idTerminal,
                idPorta: porta.idPorta,
                idPlanoHorario: device.idPlanoHorario,
            })) || [];
        });

        const employeeIds = employeeTableData.map(emp => emp.employeeID);

        const payload = {
            nome: formData.nome,
            planosAcessoDispositivos,
            employeeIds,
        };

        onUpdate(payload as unknown as T);
        handleClose();
    };

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
                            value={formData.nome || ''}
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
                                                        onSelectedRowsChange={({ selectedRows }) => setDeviceSelectedRows(selectedRows)}
                                                        noDataComponent="Não existem dados disponíveis para exibir."
                                                        customStyles={customStyles}
                                                        striped
                                                        defaultSortAsc={true}
                                                        defaultSortFieldId="nomeTerminal"
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
                                                        <CustomOutlineButton icon="bi bi-trash-fill" onClick={removeSelectedDevices} iconSize='1.1em' />
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
                                            </div>
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
