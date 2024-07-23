import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row, Col, Form, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CustomOutlineButton } from '../components/CustomOutlineButton';
import { CreateModalEmployees } from './CreateModalEmployees';
import { employeeFields } from '../helpers/Fields';
import { toast } from 'react-toastify';
import { Department, Employee, EmployeeCard, Group } from '../helpers/Types';
import { UpdateModalEmployees } from './UpdateModalEmployees';
import * as apiService from "../helpers/apiService";
import { PersonsContext, PersonsContextType } from '../context/PersonsContext';
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
    onUpdate: (entity: T) => Promise<void>;
    entity: T;
    fields: Field[];
    entityType: 'department' | 'group';
    title: string;
}

// Exporta o componente
export const UpdateModalDeptGrp = <T extends Entity>({ open, onClose, onUpdate, entity, entityType, fields }: UpdateModalProps<T>) => {
    const {
        handleAddEmployee,
        handleAddEmployeeCard,
        handleUpdateEmployee,
        handleUpdateEmployeeCard,
    } = useContext(PersonsContext) as PersonsContextType;
    const [formData, setFormData] = useState<T>({ ...entity });
    const [departments, setDepartments] = useState<Department[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [showUpdateEmployeeModal, setShowUpdateEmployeeModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [groups, setGroups] = useState<Group[]>([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [dropdownData, setDropdownData] = useState<{ departments: Department[]; groups: Group[] }>({
        departments: [],
        groups: []
    });

    // Atualiza o estado do formulário com as validações
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

    // Atualiza o estado do formulário com a entidade
    useEffect(() => {
        setFormData(entity);
    }, [entity, open]);

    // Função para buscar as entidades
    useEffect(() => {
        fetchEntities();
    }, []);

    // Função para buscar as entidades
    const fetchEntities = async () => {
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
        } catch (error) {
            console.error(`Erro ao buscar ${entityType === 'department' ? 'departamentos' : 'grupos'}:`, error);
        }
    }

    // Função para adicionar um funcionário e um cartão
    const addEmployeeAndCard = async (employee: Partial<Employee>, card: Partial<EmployeeCard>) => {
        await handleAddEmployee(employee as Employee);
        const employeeCard = {
            ...card,
            employeeId: employee.employeeID
        };
        await handleAddEmployeeCard(employeeCard as EmployeeCard);
        fetchEntities();
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
        fetchEntities();
        setShowUpdateEmployeeModal(false);
    }

    // Função para lidar com o clique em um funcionário
    const handleEmployeeClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowEmployeeModal(true);
    };

    // Função para lidar com o clique em um departamento
    const handleDepartmentClick = (departmentID: string) => {
        setSelectedDepartment(departmentID);
        const selectedDept = departments.find(dept => dept.departmentID === departmentID);
        if (selectedDept && selectedDept.employees) {
            setEmployees(selectedDept.employees);
        }
    };

    // Função para lidar com o clique em um grupo
    const handleGroupClick = (groupID: string) => {
        const selectedGroup = groups.find(group => group.groupID === groupID);
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

    // Função para lidar com o clique em guardar
    const handleSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de salvar.');
            return;
        }
        handleSubmit();
    };

    // Função para submeter o formulário
    const handleSubmit = async () => {
        await onUpdate(formData);
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