import { useEffect, useState } from 'react';
import { Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

import { CustomOutlineButton } from '../components/CustomOutlineButton';
import { customStyles } from '../components/CustomStylesDataTable';
import { usePersons } from '../context/PersonsContext';
import { employeeFields } from '../fields/Fields';
import { Department, Employee, Group } from '../types/Types';

import { AddEmployeeToDeptGrpModal } from './AddEmployeeToDeptGrpModal';
import { UpdateModalEmployees } from './UpdateModalEmployees';

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
    const { employees, setEmployees, fetchAllDepartments, departments, groups, fetchAllGroups, handleUpdateEmployee } = usePersons();
    const [formData, setFormData] = useState<T>({ ...entity });
    const [employeeData, setEmployeeData] = useState<Employee[]>([]);
    const [subdepartments, setSubDepartments] = useState<Department[]>([]);
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [showUpdateEmployeeModal, setShowUpdateEmployeeModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [currentEmployeeIndex, setCurrentEmployeeIndex] = useState(0);
    const [showValidationErrors, setShowValidationErrors] = useState(false);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
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

    // Função para buscar os subdepartamentos
    useEffect(() => {
        const fetchSubdepartments = () => {
            const subDept = dropdownData.departments.filter(dept => dept.paiId === formData.code);
            setSubDepartments(subDept);
        };
        fetchSubdepartments();
    }, [open, entity, dropdownData.departments]);

    // Função para atualizar um funcionário e um cartão
    const updateEmployeeAndCard = async (employee: Employee) => {
        await handleUpdateEmployee(employee);
        if (entityType === 'department') {
            fetchAllDepartments();
        } else {
            fetchAllGroups();
        }
        setEmployees(employees);

        if (entityType === 'department') {
            setEmployeeData(employees.filter(emp => emp.departmentId === formData.departmentID));
        } else {
            setEmployeeData(employees.filter(emp => emp.groupId === formData.groupID));
        }
        setShowUpdateEmployeeModal(false);
        setClearSelectionToggle((prev) => !prev);
    }

    // Função para lidar com o clique em um funcionário
    const handleEmployeeClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowUpdateEmployeeModal(true);
    };

    // Função para buscar as opções do dropdown
    const fetchDropdownOptions = async () => {
        try {
            const sortedEmployee = employees.sort((a, b) => Number(a.enrollNumber) - Number(b.enrollNumber));
            setEmployees(sortedEmployee);
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

    // Define as colunas para os funcionários
    const employeeColumns = [
        {
            id: 'enrollNumber',
            name: 'Número',
            selector: (row: Partial<Employee>) => row.enrollNumber || '',
            sortable: true,
            sortFunction: (rowA: Employee, rowB: Employee) => {
                const a = Number(rowA.enrollNumber);
                const b = Number(rowB.enrollNumber);
                return a - b;
            }
        },
        {
            name: 'Nome',
            selector: (row: Partial<Employee>) => row.name || '',
            sortable: true,
        }
    ];

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

    // Função para lidar com a seleção no DataTable de Departamentos/Grupos
    const handleRowSelectedDeptGrp = (state: { selectedRows: (Department | Group)[] }) => {
        if (state.selectedRows.length > 0) {
            const lastSelected = state.selectedRows[state.selectedRows.length - 1];
            if (entityType === 'department') {
                handleDepartmentClick(lastSelected.departmentID);
            } else {
                handleGroupClick(lastSelected.groupID);
            }
        } else {
            setEmployeeData([]);
        }
    };

    // Função que atualiza o funcionário selecionado com o novo departamento/grupo selecionado
    const handleSwitchDeptOrGrp = async (data: Employee) => {
        await updateEmployeeAndCard(data)
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Função para manipular o clique no botão Duplicar
    const handleDuplicateClick = () => {
        if (!onDuplicate) return;
        const { departmentID, groupID, code, ...dataWithoutId } = formData;
        onDuplicate(dataWithoutId as Partial<T>);
    };

    // Seleciona o funcionário anterior
    const handleNextEmployee = () => {
        if (currentEmployeeIndex < employees.length - 1) {
            setCurrentEmployeeIndex(currentEmployeeIndex + 1);
            setSelectedEmployee(employees[currentEmployeeIndex + 1]);
        }
    };

    // Seleciona o funcionário seguinte
    const handlePrevEmployee = () => {
        if (currentEmployeeIndex > 0) {
            setCurrentEmployeeIndex(currentEmployeeIndex - 1);
            setSelectedEmployee(employees[currentEmployeeIndex - 1]);
        }
    };

    // Função para lidar com o clique em guardar
    const handleSaveClick = () => {
        if (!isFormValid) {
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar.');
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

    // Define o texto do tooltip
    const tooltipText = entityType === 'department' ? 'Trocar Departamento' : 'Trocar Grupo';

    return (
        <Modal show={open} onHide={onClose} backdrop="static" size="xl" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>
                    {entityType === 'department' ? 'Atualizar Departamento' : 'Atualizar Grupo'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={5}>
                            {entityType === 'department' ? (
                                <>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="formCode">
                                                <Form.Label>
                                                    Código<span style={{ color: 'red' }}> *</span>
                                                </Form.Label>
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
                                                {errors['code'] && (
                                                    <div style={{ color: 'red', fontSize: 'small' }}>
                                                        {errors['code']}
                                                    </div>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="formName">
                                                <Form.Label>
                                                    Nome<span style={{ color: 'red' }}> *</span>
                                                </Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={
                                                        <Tooltip id="tooltip-name">
                                                            {deptFieldRequirements['name']}
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
                                    </Row>
                                    <h5 style={{ marginTop: 20 }}>Subdepartamentos</h5>
                                    <div style={{ overflowX: 'auto', overflowY: 'auto' }}>
                                        <DataTable
                                            columns={departmentColumns}
                                            data={subdepartments}
                                            customStyles={customStyles}
                                            striped
                                            noHeader
                                            pagination
                                            paginationComponentOptions={paginationOptions}
                                            paginationPerPage={5}
                                            paginationRowsPerPageOptions={[5, 10, 15, 20]}
                                            selectableRows
                                            onSelectedRowsChange={handleRowSelectedDeptGrp}
                                            clearSelectedRows={clearSelectionToggle}
                                            selectableRowsHighlight
                                            selectableRowsNoSelectAll
                                            defaultSortAsc
                                            defaultSortFieldId="code"
                                            noDataComponent="Não existem dados disponíveis para exibir."
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="formName">
                                                <Form.Label>
                                                    Nome<span style={{ color: 'red' }}> *</span>
                                                </Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={
                                                        <Tooltip id="tooltip-name">
                                                            {groupFieldRequirements['name']}
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Form.Control
                                                        type="string"
                                                        name="name"
                                                        value={formData['name'] || ''}
                                                        onChange={handleChange}
                                                        className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''
                                                            }`}
                                                        required
                                                    />
                                                </OverlayTrigger>
                                            </Form.Group>
                                        </Col>
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
                                    </Row>
                                </>
                            )}
                        </Col>
                        <Col md={7}>
                            <h5>Funcionários</h5>
                            <div style={{ overflowX: 'auto', overflowY: 'auto' }}>
                                <DataTable
                                    columns={employeeColumns}
                                    data={
                                        entityType === 'department' && employeeData.length === 0
                                            ? employees.filter(
                                                emp => emp.departmentId === formData.departmentID
                                            )
                                            : entityType === 'group' && employeeData.length === 0
                                                ? employees.filter(
                                                    emp => emp.groupId === formData.groupID
                                                )
                                                : employeeData
                                    }
                                    customStyles={customStyles}
                                    striped
                                    noHeader
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    paginationPerPage={10}
                                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                                    onRowDoubleClicked={handleEmployeeClick}
                                    clearSelectedRows={clearSelectionToggle}
                                    selectableRows
                                    selectableRowsNoSelectAll={true}
                                    defaultSortAsc={true}
                                    defaultSortFieldId="enrollNumber"
                                    noDataComponent="Não existem dados disponíveis para exibir."
                                />
                            </div>
                            <div style={{ display: 'flex' }}>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Adicionar Funcionário</Tooltip>}
                                >
                                    <CustomOutlineButton className="action-button" icon="bi bi-person-plus" onClick={() => setShowEmployeeModal(true)}/>
                                </OverlayTrigger>
                            </div>
                        </Col>
                    </Row>
                </Form>
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
                    <CustomOutlineButton
                        className="arrows-modal"
                        icon="bi-arrow-right"
                        onClick={onNext}
                        disabled={!canMoveNext}
                    />
                </OverlayTrigger>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleDuplicateClick}>
                    Duplicar
                </Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={onClose}>
                    Fechar
                </Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleSaveClick}>
                    Guardar
                </Button>
            </Modal.Footer>
            {showEmployeeModal && (
                <AddEmployeeToDeptGrpModal
                    title='Adicionar Funcionário'
                    open={showEmployeeModal}
                    onClose={() => setShowEmployeeModal(false)}
                    onSave={updateEmployeeAndCard}
                    entity={entity}
                />
            )}
            {selectedEmployee && (
                <UpdateModalEmployees
                    title="Atualizar Funcionário"
                    open={showUpdateEmployeeModal}
                    onClose={() => setShowUpdateEmployeeModal(false)}
                    onUpdate={updateEmployeeAndCard}
                    entity={selectedEmployee}
                    fields={employeeFields}
                    canMoveNext={currentEmployeeIndex < employees.length - 1}
                    canMovePrev={currentEmployeeIndex > 0}
                    onNext={handleNextEmployee}
                    onPrev={handlePrevEmployee}
                />
            )}
        </Modal>
    );
};