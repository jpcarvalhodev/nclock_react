import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row, Col, Form, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CustomOutlineButton } from '../components/CustomOutlineButton';
import { CreateModalEmployees } from './CreateModalEmployees';
import { departmentFields, employeeFields, groupFields } from '../helpers/Fields';
import { toast } from 'react-toastify';
import { fetchWithAuth } from '../components/FetchWithAuth';
import { Department, Employee, Group } from '../helpers/Types';
import { UpdateModalEmployees } from './UpdateModalEmployees';

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

    // Atualiza o estado do formulário com as validações
    useEffect(() => {
        const newErrors: Record<string, string> = {};

        const isValid = fields.every(field => {
            const fieldValue = formData[field.key];
            let valid = true;

            if (field.type === 'number' && fieldValue != null && fieldValue <= 0) {
                valid = false;
                newErrors[field.key] = `${field.label} não pode ser nulo ou negativo.`;
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
        const url = entityType === 'department' ? 'Departaments/Employees' : 'Groups/Employees';
        try {
            const response = await fetchWithAuth(url);
            if (!response.ok) {
                toast.error(`Erro ao buscar ${entityType === 'department' ? 'departamentos' : 'grupos'}`);
                return;
            }
            const data = await response.json();
            if (entityType === 'department') {
                setDepartments(data);
            } else {
                setGroups(data);
            }
        } catch (error) {
            console.error(`Erro ao buscar ${entityType === 'department' ? 'departamentos' : 'grupos'}:`, error);
        }
    }

    // Função para adicionar um funcionário
    const handleAddEmployee = async (employee: Employee) => {
        try {
            const response = await fetchWithAuth('Employees/CreateEmployee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee)
            });

            if (!response.ok) {
                toast.error('Erro ao adicionar novo funcionário');
            }
            const data = await response.json();
            setEmployees([...employees, data]);
            toast.success('Funcionário adicionado com sucesso');
        } catch (error) {
            console.error('Erro ao adicionar novo funcionário:', error);
        }

        handleCloseEmployeeModal();
    };

    // Função para atualizar um funcionário
    const handleUpdateEmployee = async (employee: Employee) => {
        try {
            const response = await fetchWithAuth(`Employees/UpdateEmployee/${employee.employeeID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee)
            });

            if (!response.ok) {
                const errorText = await response.text();
                toast.error(`Erro ao atualizar funcionário: ${errorText}`);
                return;
            }

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const updatedEmployee = await response.json();
                setEmployees(prevEmployees => prevEmployees.map(emp => emp.employeeID === updatedEmployee.employeeID ? updatedEmployee : emp));
            } else {
                await response.text();
                toast.success(response.statusText);
            }

        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
            toast.error('Falha ao conectar ao servidor');
        } finally {
            handleCloseUpdateModal();
        }
    };

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

    // Função para abrir o modal de funcionário
    const handleCloseEmployeeModal = () => {
        setShowEmployeeModal(false);
        setSelectedEmployee(null);
    };

    // Função para abrir o modal de atualizar funcionário
    const handleOpenAddModal = () => {
        setShowEmployeeModal(true);
    };

    // Função para abrir o modal de atualizar funcionário
    const handleCloseAddModal = () => {
        setShowEmployeeModal(false);
    };

    // Função para abrir o modal de atualizar funcionário
    const handleCloseUpdateModal = () => {
        setShowUpdateEmployeeModal(false);
        setSelectedEmployee(null);
    };

    // função para modificar o estado do formulário
    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? Number(value) : value;
        setFormData(prevState => ({
            ...prevState,
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
        console.log('formData', formData);
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
                                <Col md={6}>
                                    <Form.Group controlId="formPaiId">
                                        <Form.Label>ID de Parente</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="paiId"
                                            value={formData['paiId'] || ''}
                                            onChange={handleChange}
                                            className="custom-input-height custom-select-font-size"
                                        />
                                        {errors['paiId'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['paiId']}</div>}
                                    </Form.Group>
                                </Col>
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
                            <CustomOutlineButton icon="bi-plus" onClick={handleOpenAddModal} />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Fechar</Button>
                <Button variant="primary" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
            {showEmployeeModal && (
                <CreateModalEmployees
                    title='Adicionar Funcionário'
                    open={showEmployeeModal}
                    onClose={handleCloseAddModal}
                    onSave={handleAddEmployee}
                    fields={employeeFields}
                    initialValues={{}}
                />
            )}
            {showUpdateEmployeeModal && selectedEmployee && (
                <UpdateModalEmployees
                    title='Atualizar Funcionário'
                    open={showUpdateEmployeeModal}
                    onClose={handleCloseUpdateModal}
                    onUpdate={handleUpdateEmployee}
                    entity={selectedEmployee}
                    fields={employeeFields}
                />
            )}
        </Modal>
    );
};