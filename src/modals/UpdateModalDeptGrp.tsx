import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CustomOutlineButton } from '../components/CustomOutlineButton';
import { CreateModalEmployees } from './CreateModalEmployees';
import { employeeFields } from '../helpers/Fields';
import { toast } from 'react-toastify';
import { Department, Employee, EmployeeCard, Group } from '../helpers/Types';
import { UpdateModalEmployees } from './UpdateModalEmployees';
import { PersonsContext, PersonsContextType } from '../context/PersonsContext';
import DataTable from 'react-data-table-component';
import { customStyles } from '../components/CustomStylesDataTable';
import { set } from 'date-fns';

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Define a interface Entity
export interface Entity {
    id: string;
    [key: string]: any;
}

// Define a interface Field
interface Field {
    key: string;
    label: string;
    type: string;
    required?: boolean;
    validate?: (value: any) => boolean;
    errorMessage?: string;
}

// Define a propriedade do componente
interface UpdateModalProps<T extends Entity> {
    open: boolean;
    onClose: () => void;
    onDuplicate: (entity: Partial<T>) => void;
    onUpdate: (entity: T) => Promise<void>;
    entity: T;
    fields: Field[];
    entityType: 'department' | 'group';
    title: string;
    onNext: () => void;
    onPrev: () => void;
    canMoveNext: boolean;
    canMovePrev: boolean;
}

// Exporta o componente
export const UpdateModalDeptGrp = <T extends Entity>({ open, onClose, onUpdate, onDuplicate, entity, entityType, fields, canMoveNext, canMovePrev, onNext, onPrev }: UpdateModalProps<T>) => {
    const {
        fetchAllEmployees,
        fetchAllDepartments,
        fetchAllGroups,
        handleAddEmployee,
        handleAddEmployeeCard,
        handleUpdateEmployee,
        handleUpdateEmployeeCard,
    } = useContext(PersonsContext) as PersonsContextType;
    const [formData, setFormData] = useState<T>({ ...entity });
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [employeeData, setEmployeeData] = useState<Employee[]>([]);
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [showUpdateEmployeeModal, setShowUpdateEmployeeModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [selectedRow, setSelectedRow] = useState<Department | Group | Employee | null>(null);
    const [currentEmployeeIndex, setCurrentEmployeeIndex] = useState(0);
    const [showSelectDeptGrpModal, setShowSelectDeptGrpModal] = useState(false);
    const [selectedDeptGrp, setSelectedDeptGrp] = useState(null);
    const [dropdownData, setDropdownData] = useState<{ departments: Department[]; groups: Group[] }>({
        departments: [],
        groups: []
    });

    // Usa useEffect para inicializar o formulário
    useEffect(() => {
        if (open && entity) {
            fetchDropdownOptions();
            setFormData({ ...entity });
        } else {
            setFormData({} as T);
        }
    }, [open, entity]);

    // Atualiza o estado do formulário com as validações
    useEffect(() => {
        const newErrors: Record<string, string> = {};

        const isValid = fields.every(field => {
            const fieldValue = formData[field.key];
            let valid = true;

            if (field.required && (fieldValue === undefined || fieldValue === '')) {
                valid = false;
            }
            if (field.type === 'number' && fieldValue != null && fieldValue < 0) {
                valid = false;
            }

            return valid;
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
    }, [formData, fields]);

    // Função para adicionar um funcionário e um cartão
    const addEmployeeAndCard = async (employee: Partial<Employee>, card: Partial<EmployeeCard>) => {
        await handleAddEmployee(employee as Employee);
        const employeeCard = {
            ...card,
            employeeId: employee.employeeID
        };
        await handleAddEmployeeCard(employeeCard as EmployeeCard);
        if (entityType === 'department') {
            fetchAllDepartments();
        } else {
            fetchAllGroups();
        }
        setShowEmployeeModal(false);
    }

    // Função para atualizar um funcionário e um cartão
    const updateEmployeeAndCard = async (employee: Employee, card: Partial<EmployeeCard>) => {
        await handleUpdateEmployee(employee);
        const employeeCard = {
            ...card,
            employeeId: employee.employeeID
        };
        if (employeeCard && Object.keys(employeeCard).length > 0) {
            if (card.cardID) {
                await handleUpdateEmployeeCard(employeeCard as EmployeeCard);
            } else {
                await handleAddEmployeeCard(employeeCard as EmployeeCard);
            }
        }
        if (entityType === 'department') {
            fetchAllDepartments();
        } else {
            fetchAllGroups();
        }
        setShowUpdateEmployeeModal(false);
    }

    // Função para lidar com o clique em um funcionário
    const handleEmployeeClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowEmployeeModal(true);
    };

    // Função para lidar com a seleção de um departamento
    const handleDepartmentClick = (departmentID: string) => {
        const selectedDept = dropdownData.departments.find(dept => dept.departmentID === departmentID);
        if (selectedDept) {
            const deptEmployees = employees.filter(emp => emp.departmentId === departmentID);
            setEmployeeData(deptEmployees);
        } else {
            setEmployeeData([]);
        }
    };

    // Função para lidar com a seleção de um grupo
    const handleGroupClick = (groupID: string) => {
        const selectedGroup = dropdownData.groups.find(grp => grp.groupID === groupID);
        if (selectedGroup) {
            const grpEmployees = employees.filter(emp => emp.groupId === groupID);
            setEmployeeData(grpEmployees);
        } else {
            setEmployeeData([]);
        }
    };

    // Função para buscar as opções do dropdown
    const fetchDropdownOptions = async () => {
        try {
            const departments = await fetchAllDepartments();
            const groups = await fetchAllGroups();
            const employee = await fetchAllEmployees();

            setEmployees(employee);
            setDropdownData({
                departments: departments,
                groups: groups
            });
        } catch (error) {
            console.error('Erro ao buscar os dados de funcionários e dispositivos', error);
        }
    };

    // Função para lidar com a mudança do dropdown
    const handleDropdownChange = (e: React.ChangeEvent<FormControlElement>) => {
        const { value } = e.target;
        const selectedPai = dropdownData.departments.find(dept => dept.departmentID === value);

        if (selectedPai) {
            setFormData(prevState => ({
                ...prevState,
                paiId: selectedPai.code,
                paiName: selectedPai.name
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                paiId: value
            }));
        }
    };

    // Função para lidar com a mudança de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? Number(value) : value;
        setFormData(prev => ({
            ...prev,
            [name]: parsedValue
        }));
    };

    // Define as colunas para os departamentos
    const departmentColumns = [
        {
            id: 'code',
            name: 'Código',
            selector: (row: Partial<Department>) => row.code || '',
            sortable: true,
        },
        {
            name: 'Nome',
            selector: (row: Partial<Department>) => row.name || '',
            sortable: true,
        }
    ];

    // Define as colunas para os grupos
    const groupColumns = [
        {
            id: 'name',
            name: 'Nome',
            selector: (row: Partial<Group>) => row.name || '',
            sortable: true,
        },
        {
            name: 'Descrição',
            selector: (row: Partial<Group>) => row.description || '',
            sortable: true,
        }
    ];

    // Define as colunas para os funcionários
    const employeeColumns = [
        {
            id: 'enrollNumber',
            name: 'Número',
            selector: (row: Partial<Employee>) => row.enrollNumber || '',
            sortable: true,
        },
        {
            name: 'Nome',
            selector: (row: Partial<Employee>) => row.name || '',
            sortable: true,
        }
    ];

    // Funipara lidar com a linha selecionada
    const handleRowSelected = (state: { selectedRows: string | any[] }) => {
        if (state.selectedRows.length > 0) {
            const lastSelectedRow = state.selectedRows[state.selectedRows.length - 1];
            setSelectedRow(lastSelectedRow);
            if (entityType === 'department') {
                handleDepartmentClick(lastSelectedRow?.departmentID);
            } else {
                setSelectedRow(null);
            }
            if (entityType === 'group') {
                handleGroupClick(lastSelectedRow?.groupID);
            } else {
                setSelectedRow(null);
            }
        } else {
            setSelectedRow(null);
            setEmployeeData([]);
        }
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Função para aplicar a mudança de departamento/grupo
    const handleDeptGroupChange = () => {
        if (selectedRow && selectedEmployee) {
            let updatedEmployee = { ...selectedEmployee };
            if (entityType === 'department') {
                updatedEmployee.departmentId = selectedRow.id;
            } else if (entityType === 'group') {
                updatedEmployee.groupId = selectedRow.id;
            }
            updateEmployeeAndCard(updatedEmployee, {});
        } else {
            toast.warn('Selecione um departamento/grupo e um funcionário para trocar.');
        }
    }

    const applyDeptGroupChange = () => {
        setShowSelectDeptGrpModal(true);
    }

    // Função para manipular o clique no botão Duplicar
    const handleDuplicateClick = () => {
        if (!onDuplicate) return;
        const { departmentID, groupID, code, ...dataWithoutId } = formData;
        onDuplicate(dataWithoutId as Partial<T>);
    };

    // Seleciona o funcionário anterior
    const handleNextEmployee = () => {
        if (currentEmployeeIndex < employeeData.length - 1) {
            setCurrentEmployeeIndex(currentEmployeeIndex + 1);
            setSelectedEmployee(employeeData[currentEmployeeIndex + 1]);
        }
    };

    // Seleciona o funcionário seguinte
    const handlePrevEmployee = () => {
        if (currentEmployeeIndex > 0) {
            setCurrentEmployeeIndex(currentEmployeeIndex - 1);
            setSelectedEmployee(employeeData[currentEmployeeIndex - 1]);
        }
    };

    // Função para lidar com o clique em guardar
    const handleSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        handleSubmit();
    };

    // Função para submeter o formulário
    const handleSubmit = async () => {
        await onUpdate(formData);
    };

    // Define os campos required
    const deptFieldRequirements = {
        code: "Campo obrigatório",
        name: "Campo obrigatório",
    }

    // Define os campos required
    const groupFieldRequirements = {
        name: "Campo obrigatório",
    }

    return (
        <Modal show={open} onHide={onClose} backdrop="static" size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{entityType === 'department' ? 'Atualizar Departamento' : 'Atualizar Grupo'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={5}>
                            <Row>
                                {entityType === 'department' && (
                                    <>
                                        <Col md={6}>
                                            <Form.Group controlId="formCode">
                                                <Form.Label>Código<span style={{ color: 'red' }}> *</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={
                                                        <Tooltip id="tooltip-code">
                                                            {deptFieldRequirements['code']}
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Form.Control
                                                        type="number"
                                                        name="code"
                                                        value={formData['code'] || ''}
                                                        onChange={handleChange}
                                                        className="custom-input-height custom-select-font-size"
                                                        required
                                                    />
                                                </OverlayTrigger>
                                                {errors['code'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['code']}</div>}
                                            </Form.Group>
                                        </Col>
                                    </>
                                )}
                                <Col md={6}>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Nome<span style={{ color: 'red' }}> *</span></Form.Label>
                                        <OverlayTrigger
                                            placement="right"
                                            overlay={
                                                <Tooltip id="tooltip-name">
                                                    {entityType === 'department' ? deptFieldRequirements['name'] : groupFieldRequirements['name']}
                                                </Tooltip>
                                            }
                                        >
                                            <Form.Control
                                                type="string"
                                                name="name"
                                                value={formData['name'] || ''}
                                                onChange={handleChange}
                                                className="custom-input-height custom-select-font-size"
                                                required
                                            />
                                        </OverlayTrigger>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formDescription">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control
                                            type="string"
                                            name="description"
                                            value={formData['description'] || ''}
                                            onChange={handleChange}
                                            className="custom-input-height custom-select-font-size"
                                        />
                                    </Form.Group>
                                </Col>
                                {entityType === 'department' && (
                                    <Col md={6}>
                                        <Form.Group controlId="formPaiId">
                                            <Form.Label>Departamento Pai</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="paiId"
                                                value={formData['paiId'] || ''}
                                                onChange={handleDropdownChange}
                                                className="custom-input-height custom-select-font-size"
                                            >
                                                <option value="0">Selecione...</option>
                                                {dropdownData.departments.map(option => (
                                                    <option key={option.code} value={option.code}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                )}
                            </Row>
                            <h5 style={{ marginTop: 20 }}>{entityType === 'department' ? 'Departamentos' : 'Grupos'}</h5>
                            <div style={{ overflowX: 'auto', overflowY: 'auto' }}>
                                <DataTable
                                    columns={entityType === 'department' ? departmentColumns : groupColumns}
                                    data={entityType === 'department' ? dropdownData.departments : dropdownData.groups}
                                    customStyles={customStyles}
                                    noHeader
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    paginationPerPage={5}
                                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                                    selectableRows
                                    onSelectedRowsChange={handleRowSelected}
                                    selectableRowsHighlight
                                    selectableRowsNoSelectAll={true}
                                    defaultSortAsc={true}
                                    defaultSortFieldId={entityType === 'department' ? 'code' : 'name'}
                                    noDataComponent="Não existem dados disponíveis para exibir."
                                />
                            </div>
                        </Col>
                        <Col md={7}>
                            <h5>Funcionários</h5>
                            <div style={{ overflowX: 'auto', overflowY: 'auto' }}>
                                <DataTable
                                    columns={employeeColumns}
                                    data={employeeData.length > 0 ? employeeData : employees}
                                    customStyles={customStyles}
                                    noHeader
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    paginationPerPage={5}
                                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                                    onRowDoubleClicked={handleEmployeeClick}
                                    selectableRows
                                    onSelectedRowsChange={handleRowSelected}
                                    selectableRowsNoSelectAll={true}
                                    defaultSortAsc={true}
                                    defaultSortFieldId='enrollNumber'
                                    noDataComponent="Não existem dados disponíveis para exibir."
                                />
                            </div>
                            <div style={{ display: 'flex' }}>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Adicionar</Tooltip>}
                                >
                                    <CustomOutlineButton className="action-button" icon="bi-plus" onClick={() => setShowEmployeeModal(true)} />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Trocar Dept/Grp</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-arrow-left-right" onClick={applyDeptGroupChange} />
                                </OverlayTrigger>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
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
                <Button variant="outline-info" onClick={handleDuplicateClick}>Duplicar</Button>
                <Button variant="outline-secondary" onClick={onClose}>Fechar</Button>
                <Button variant="outline-primary" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
            {showEmployeeModal && (
                <CreateModalEmployees
                    title='Adicionar Funcionário'
                    open={showEmployeeModal}
                    onClose={() => setShowEmployeeModal(false)}
                    onSave={addEmployeeAndCard}
                    fields={employeeFields}
                    initialValues={{}}
                />
            )}
            {showUpdateEmployeeModal && selectedEmployee && (
                <UpdateModalEmployees
                    title='Atualizar Funcionário'
                    open={showUpdateEmployeeModal}
                    onClose={() => setShowUpdateEmployeeModal(false)}
                    onUpdate={updateEmployeeAndCard}
                    entity={selectedEmployee}
                    fields={employeeFields}
                    canMoveNext={currentEmployeeIndex < employeeData.length - 1}
                    canMovePrev={currentEmployeeIndex > 0}
                    onNext={handleNextEmployee}
                    onPrev={handlePrevEmployee}
                />
            )}
        </Modal>
    );
};