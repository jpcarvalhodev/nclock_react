import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { employeeFields } from '../helpers/Fields';
import { UpdateModalEmployees } from './UpdateModalEmployees';
import { CreateModalEmployees } from './CreateModalEmployees';
import { toast } from 'react-toastify';
import { CustomOutlineButton } from '../components/CustomOutlineButton';
import { Department, Employee, EmployeeCard, Group } from '../helpers/Types';
import { PersonsContext, PersonsContextType } from '../context/PersonsContext';
import DataTable from 'react-data-table-component';
import { customStyles } from '../components/CustomStylesDataTable';

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Define a interface para os campos
interface Field {
    key: string;
    label: string;
    type: string;
    required?: boolean;
    validate?: (value: any) => boolean;
    errorMessage?: string;
}

// Define as propriedades do componente
interface Props<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    fields: Field[];
    initialValues: Partial<T>;
    entityType: 'department' | 'group';
}

// Define o componente
export const CreateModalDeptGrp = <T extends Record<string, any>>({ open, onClose, onSave, fields, initialValues, entityType }: Props<T>) => {
    const {
        fetchAllEmployees,
        fetchAllDepartments,
        fetchAllGroups,
        handleAddEmployee,
        handleAddEmployeeCard,
        handleUpdateEmployee,
        handleUpdateEmployeeCard,
    } = useContext(PersonsContext) as PersonsContextType;
    const [formData, setFormData] = useState<Partial<T>>(initialValues);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [employeeData, setEmployeeData] = useState<Employee[]>([]);
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [showUpdateEmployeeModal, setShowUpdateEmployeeModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [selectedRow, setSelectedRow] = useState<Department | Group | Employee | null>(null);
    const [currentEmployeeIndex, setCurrentEmployeeIndex] = useState(0);
    const [showValidationErrors, setShowValidationErrors] = useState(false);
    const [dropdownData, setDropdownData] = useState<{ departments: Department[]; groups: Group[] }>({
        departments: [],
        groups: []
    });

    // UseEffect para validar o formulário
    useEffect(() => {
        const newErrors: Record<string, boolean> = {};

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
        validateForm();
    }, [formData, fields]);

    // Função para validar o formulário
    const validateForm = () => {
        if (!showValidationErrors) return true;
        let newErrors: Record<string, boolean> = {};
        let isValid = true;

        fields.forEach((field) => {
            const fieldValue = formData[field.key];
            if (field.required && !fieldValue) {
                isValid = false;
                newErrors[field.key] = true;
            } else {
                newErrors[field.key] = false;
            }
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
        return isValid;
    };

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

    // Função para lidar com a mudança de valor
    const handleEmployeeClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowUpdateEmployeeModal(true);
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
        const isDepartment = entityType === 'department';
        try {
            const departments = await fetchAllDepartments();
            const groups = await fetchAllGroups();
            const employee = await fetchAllEmployees();

            setEmployees(employee);
            setDropdownData({
                departments: departments,
                groups: groups
            });

            const items = departments.map((item: Department) => ({
                ...item,
                code: (item.code)
            }));

            const nextCode = items.reduce((max: number, item: Department) => Math.max(max, item.code), 0) + 1;
            setFormData(prev => ({ ...prev, code: nextCode }));
        } catch (error) {
            toast.error('Erro ao buscar os dados de funcionários e dispositivos.');
            console.error(`Erro ao buscar ${isDepartment ? 'departamentos' : 'grupos'}:`, error);
        }
    };

    // Atualiza o estado do componente ao abrir o modal
    useEffect(() => {
        if (open) {
            fetchDropdownOptions();
            setFormData(initialValues);
        } else {
            setFormData({});
        }
    }, [open]);

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

    // Função para lidar com o fecho
    const handleClose = () => {
        if (window.location.pathname.startsWith('/persons/Persons') || window.location.pathname.startsWith('/persons/Employees') || window.location.pathname.startsWith('/persons/ExternalEmployees') || window.location.pathname.startsWith('/persons/User') || window.location.pathname.startsWith('/persons/Visitors') || window.location.pathname.startsWith('/persons/Contacts') || window.location.pathname.startsWith('/persons/Temporaries')) {
            onClose();
        } else {
            window.location.reload();
            onClose();
        }
    }

    // Função para lidar com a mudança de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (showValidationErrors) {
            setShowValidationErrors(false);
        }
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

    // Função para lidar com o clique no botão de guardar
    const handleSaveClick = () => {
        if (!isFormValid) {
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        handleSave();
    };

    // Função para guardar os dados
    const handleSave = () => {
        const payload = fields.reduce<Record<string, any>>((acc, field) => {
            if (formData[field.key] !== undefined) {
                acc[field.key] = formData[field.key];
            }
            return acc;
        }, {});
        onSave(payload as T);
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
        <Modal show={open} onHide={onClose} backdrop="static" size="xl" style={{ marginTop: 115 }}>
            <Modal.Header closeButton>
                <Modal.Title>{entityType === 'department' ? 'Criar Departamento' : 'Criar Grupo'}</Modal.Title>
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
                                                className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
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
                                    striped
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
                                    striped
                                    noHeader
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    paginationPerPage={5}
                                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                                    onRowDoubleClicked={handleEmployeeClick}
                                    selectableRows
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
                                    <CustomOutlineButton icon="bi bi-arrow-left-right" />
                                </OverlayTrigger>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>Fechar</Button>
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