import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../css/PagesStyles.css";
import { Col, Form, Nav, OverlayTrigger, Tab, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../components/CustomStylesDataTable";
import { TimePeriod } from "../types/Types";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { timePeriodFields } from "../fields/Fields";
import { AddPeriodToTimePlansModal } from "./AddPeriodToTimePlansModal";

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
export const UpdateTimePlansModal = <T extends Record<string, any>>({ title, open, onClose, onDuplicate, onUpdate, entity, canMoveNext, canMovePrev, onNext, onPrev }: Props<T>) => {
    const [formData, setFormData] = useState<T>({ ...entity });
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedRows, setSelectedRows] = useState<TimePeriod[]>([]);
    const [tableData, setTableData] = useState<TimePeriod[]>([]);

    // Função para lidar com o clique no botão de duplicar
    useEffect(() => {
        if (open) {
            setFormData({ ...entity });
            setTableData(entity.periodos);
        } else {
            setFormData({} as T);
            setTableData([]);
        }
    }, [open, entity]);

    // Função para adicionar períodos à tabela
    const updatePeriodsToDatatable = (periods: TimePeriod[]) => {
        setTableData([...tableData, ...periods]);
    };

    // Função para remover períodos selecionados
    const removeSelectedPeriods = () => {
        const remainingData = tableData.filter(
            (period) => !selectedRows.some((row) => row.id === period.id)
        );
        setTableData(remainingData);
        setSelectedRows([]);
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

    // Função para manipular o clique no botão Duplicar
    const handleDuplicateClick = () => {
        if (!onDuplicate) return;
        const { id, ...dataWithoutId } = formData;
        onDuplicate(dataWithoutId as T);
    };

    // Define as colunas excluídas
    const excludedColumns = timePeriodFields
        .filter(field =>
            (field.key.includes('Start') || field.key.includes('End'))
        )
        .map(field => field.key);

    // Define as colunas dos dias da semana para o nesting
    const dayColumns = [
        { day: 'monday', label: 'Segunda' },
        { day: 'tuesday', label: 'Terça' },
        { day: 'wednesday', label: 'Quarta' },
        { day: 'thursday', label: 'Quinta' },
        { day: 'friday', label: 'Sexta' },
        { day: 'saturday', label: 'Sábado' },
        { day: 'sunday', label: 'Domingo' },
    ];

    // Define as colunas da tabela
    const columns: TableColumn<TimePeriod>[] = [
        ...timePeriodFields
            .filter(field => !dayColumns.find(dc => field.key.includes(dc.day)) && !excludedColumns.includes(field.key) && field.key !== 'initFlag' && field.key !== 'appId' && field.key !== 'createrName' && field.key !== 'remark')
            .map(field => ({
                name: (
                    <>
                        {field.label}
                    </>
                ),
                selector: (row: TimePeriod) => formatField(row, field.key),
                sortable: true,
            })),
        ...dayColumns.map(({ day, label }) => ({
            name: label,
            selector: (row: TimePeriod) => `${row[`${day}Start1`] || ''} - ${row[`${day}End1`] || ''}`,
            sortable: true,
            cell: (row: TimePeriod) => `${row[`${day}Start1`] || ''} - ${row[`${day}End1`] || ''}`,
            columns: [
                {
                    name: 'Início',
                    selector: (row: TimePeriod) => row[`${day}Start1`] || '',
                    sortable: true,
                    cell: (row: TimePeriod) => row[`${day}Start1`] || '',
                },
                {
                    name: 'Fim',
                    selector: (row: TimePeriod) => row[`${day}End1`] || '',
                    sortable: true,
                    cell: (row: TimePeriod) => row[`${day}End1`] || '',
                },
            ]
        }))
    ];
    function formatField(row: TimePeriod, key: string): any {
        switch (key) {
            case 'initFlag':
                return row[key] ? 'Activo' : 'Inactivo';
            default:
                return row[key];
        }
    }

    // Função para lidar com o fechamento do modal
    const handleClose = () => {
        setFormData({} as T);
        setTableData([]);
        onClose();
    };

    // Função para salvar os dados
    const handleSave = () => {
        const dataToSave = {
            ...formData,
            periodos: tableData.map(period => period.id),
        };
        onUpdate(dataToSave as T);
        handleClose();
    }

    return (
        <Modal show={open} onHide={handleClose} backdrop="static" dialogClassName="custom-modal" size="xl" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Tab.Container defaultActiveKey="geral">
                    <Nav variant="tabs" className="nav-modal">
                        <Nav.Item>
                            <Nav.Link eventKey="geral">Geral</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="geral">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                <Col md={12}>
                                    <Form.Group controlId="formNome">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            className="custom-input-height custom-select-font-size"
                                            type="text"
                                            name="nome"
                                            value={formData.nome}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId="formDescricao">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control
                                            className="custom-input-height custom-select-font-size"
                                            type="text"
                                            name="descricao"
                                            value={formData.descricao}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Form>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
                <Tab.Container defaultActiveKey="periodos">
                    <Nav variant="tabs" className="nav-modal">
                        <Nav.Item>
                            <Nav.Link eventKey="periodos">Períodos</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="periodos">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                <Col md={12} style={{ marginTop: 20 }}>
                                    <DataTable
                                        columns={columns}
                                        data={tableData}
                                        pagination
                                        paginationComponentOptions={paginationOptions}
                                        paginationPerPage={10}
                                        paginationRowsPerPageOptions={[5, 10]}
                                        selectableRows
                                        onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}
                                        noDataComponent="Não existem dados disponíveis para exibir."
                                        customStyles={customStyles}
                                        striped
                                    />
                                </Col>
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
                                        <CustomOutlineButton icon="bi bi-trash-fill" onClick={removeSelectedPeriods} iconSize='1.1em' />
                                    </OverlayTrigger>
                                </div>
                            </Form>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Modal.Body >
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
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleDuplicateClick}>Duplicar</Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" type="button" onClick={handleClose} >
                    Fechar
                </Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" type="button" onClick={handleSave} >
                    Guardar
                </Button>
            </Modal.Footer>
            <AddPeriodToTimePlansModal
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={updatePeriodsToDatatable}
                title="Adicionar Horário"
            />
        </Modal >
    );
};