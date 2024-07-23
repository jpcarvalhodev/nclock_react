import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form, Row, Col, Table, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { employeeFields } from '../helpers/Fields';
import { UpdateModalEmployees } from './UpdateModalEmployees';
import { CreateModalEmployees } from './CreateModalEmployees';
import { toast } from 'react-toastify';
import { CustomOutlineButton } from '../components/CustomOutlineButton';
import { Department, Employee, EmployeeCard, Group } from '../helpers/Types';
import * as apiService from "../helpers/apiService";
import { PersonsContext, PersonsContextType } from '../context/PersonsContext';
import { set } from 'date-fns';

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
        handleAddEmployee,
        handleAddEmployeeCard,
        handleUpdateEmployee,
        handleUpdateEmployeeCard,
    } = useContext(PersonsContext) as PersonsContextType;
    const [formData, setFormData] = useState<Partial<T>>(initialValues);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [showUpdateEmployeeModal, setShowUpdateEmployeeModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<string>('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [dropdownData, setDropdownData] = useState<{ departments: Department[]; groups: Group[] }>({
        departments: [],
        groups: []
    });

    // UseEffect para validar o formulário
    useEffect(() => {
        const newErrors: Record<string, string> = {};

        const isValid = fields.every(field => {
            const fieldValue = formData[field.key];
            let valid = true;

            if (field.type === 'number' && fieldValue != null && fieldValue < 0) {
                valid = false;
                newErrors[field.key] = `${field.label} não pode ser negativo.`;
            }

            return valid;
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
    }, [formData, fields]);

    // Usa useEffect para buscar os dados de departamento/grupo
    useEffect(() => {
        fetchData();
    }, []);

    // Função para buscar os dados de departamento/grupo
    const fetchData = async () => {
        const isDepartment = entityType === 'department';
        try {
            const data = isDepartment ? await apiService.fetchAllDepartmentsEmployees() : await apiService.fetchAllGroupsEmployees();
            const items = data.map((item: Department | Group) => ({
                ...item,
                code: (item.code)
            }));

            if (isDepartment) {
                setDepartments(items as Department[]);
            } else {
                setGroups(items as Group[]);
            }

            const nextCode = items.reduce((max: number, item: Department | Group) => Math.max(max, item.code), 0) + 1;
            setFormData(prev => ({ ...prev, code: nextCode }));
        } catch (error) {
            console.error(`Erro ao buscar ${isDepartment ? 'departamentos' : 'grupos'}:`, error);
        }
    };

    // Função para adicionar um funcionário e um cartão
    const addEmployeeAndCard = async (employee: Partial<Employee>, card: Partial<EmployeeCard>) => {
        await handleAddEmployee(employee as Employee);
        const employeeCard = {
            ...card,
            employeeId: employee.employeeID
        };
        await handleAddEmployeeCard(employeeCard as EmployeeCard);
        fetchData();
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
        fetchData();
        setShowUpdateEmployeeModal(false);
    }

    // Função para lidar com a mudança de valor
    const handleEmployeeClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowUpdateEmployeeModal(true);
    };

    // Função para lidar com a seleção de um departamento
    const handleDepartmentClick = (departmentID: string) => {
        setSelectedDepartment(departmentID);
        const selectedDept = departments.find(dept => dept.departmentID === departmentID);
        if (selectedDept && selectedDept.employees) {
            setEmployees(selectedDept.employees);
        }
    };

    // Função para lidar com a seleção de um grupo
    const handleGroupClick = (groupID: string) => {
        setSelectedGroup(groupID);
        const selectedGroup = groups.find(grp => grp.groupID === groupID);
        if (selectedGroup && selectedGroup.employees) {
            setEmployees(selectedGroup.employees);
        }
    };

    // Função para buscar as opções do dropdown
    const fetchDropdownOptions = async () => {
        try {
            const departments = await apiService.fetchAllDepartments();
            const groups = await apiService.fetchAllGroups();

            setDropdownData({
                departments: departments,
                groups: groups
            });
        } catch (error) {
            toast.error('Erro ao buscar os dados de funcionários e dispositivos.');
            console.error(error);
        }
    };

    // Atualiza o estado do componente ao abrir o modal
    useEffect(() => {
        if (open) {
            fetchDropdownOptions();
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

    // Função para lidar com a mudança de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? Number(value) : value;
        setFormData(prev => ({
            ...prev,
            [name]: parsedValue
        }));
    };

    // Função para lidar com o clique no botão de guardar
    const handleSaveClick = () => {
        if (!isFormValid) {
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
        onClose();
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
        <Modal show={open} onHide={onClose} size="xl">
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
                                            <Form.Label>ID de Parente</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="paiId"
                                                value={formData['paiId'] || ''}
                                                onChange={handleDropdownChange}
                                                className="custom-input-height custom-select-font-size"
                                            >
                                                <option value="">Selecione...</option>
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
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>{entityType === 'department' ? 'Código' : 'Nome'}</th>
                                            <th>{entityType === 'department' ? 'Nome' : 'Descrição'}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(entityType === 'department' ? departments : groups).map(item => (
                                            <tr key={item[`${entityType}ID`]} onClick={() => entityType === 'department' ? handleDepartmentClick(item.departmentID) : handleGroupClick(item.groupID)}>
                                                <td>{entityType === 'department' ? item.code : item.name}</td>
                                                <td>{entityType === 'department' ? item.name : item.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        <Col md={7}>
                            <h5>Funcionários</h5>
                            <div style={{ overflowX: 'auto', overflowY: 'auto' }}>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Número de Matrícula</th>
                                            <th>Nome</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees.map(emp => (
                                            <tr key={emp.employeeID} onDoubleClick={() => handleEmployeeClick(emp)}>
                                                <td>{emp.enrollNumber}</td>
                                                <td>{emp.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <CustomOutlineButton icon="bi-plus" onClick={() => setShowEmployeeModal(true)} />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
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
                />
            )}
        </Modal>
    );
};