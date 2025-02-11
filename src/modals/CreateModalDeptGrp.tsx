import { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

import { customStyles } from '../components/CustomStylesDataTable';
import { usePersons } from '../context/PersonsContext';
import { employeeFields } from '../fields/Fields';
import { Department, Employee, Group } from '../types/Types';

import { UpdateModalEmployees } from './UpdateModalEmployees';

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
    const { employees, departments, groups, fetchAllDepartments, fetchAllGroups, handleUpdateEmployee } = usePersons();
    const [formData, setFormData] = useState<Partial<T>>(initialValues);
    const [employeeData, setEmployeeData] = useState<Employee[]>([]);
    const [showUpdateEmployeeModal, setShowUpdateEmployeeModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [selectedRow, setSelectedRow] = useState<Department | Group | Employee | null>(null);
    const [currentEmployeeIndex, setCurrentEmployeeIndex] = useState(0);
    const [showValidationErrors, setShowValidationErrors] = useState(false);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
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

    // Função para atualizar um funcionário e um cartão
    const updateEmployeeAndCard = async (employee: Employee) => {
        await handleUpdateEmployee(employee);
        if (entityType === 'department') {
            fetchAllDepartments();
        } else {
            fetchAllGroups();
        }
        setShowUpdateEmployeeModal(false);
        setClearSelectionToggle((prev) => !prev);
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
        try {
            setDropdownData({
                departments: departments,
                groups: groups
            });

            const items = departments.map((item: Department) => ({
                ...item,
                code: item.code
            }));

            const nextCode = items.reduce((max: number, item: Department) => Math.max(max, item.code), 0) + 1;
            return nextCode;
        } catch (error) {
            console.error('Erro ao buscar os dados de funcionários e dispositivos.', error);
            return undefined;
        }
    };

    // Atualiza o estado do componente ao abrir o modal
    useEffect(() => {
        if (open) {
            const updateForm = async () => {
                const nextCode = await fetchDropdownOptions();
                setFormData({
                    ...initialValues,
                    ...(nextCode !== undefined && { code: nextCode })
                });
            };
            updateForm();
        } else {
            setFormData({});
        }
    }, [open, initialValues, departments, groups]);

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
        setFormData({});
        setShowValidationErrors(false);
        onClose();
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
            toast.warn('Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar.');
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
        handleClose();
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
        <Modal show={open} onHide={handleClose} backdrop="static" size="xl" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{entityType === 'department' ? 'Criar Departamento' : 'Criar Grupo'}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ marginBottom: 90 }}>
                <Form>
                    <Row>
                        <Col md={5}>
                            {entityType === 'department' ? (
                                <>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="formCode">
                                                <Form.Label>Código<span style={{ color: 'red' }}> *</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-code">{deptFieldRequirements['code']}</Tooltip>}
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
                                        <Col md={6}>
                                            <Form.Group controlId="formName">
                                                <Form.Label>Nome<span style={{ color: 'red' }}> *</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-name">{deptFieldRequirements['name']}</Tooltip>}
                                                >
                                                    <Form.Control
                                                        type="string"
                                                        name="name"
                                                        value={formData['name'] || ''}
                                                        onChange={handleChange}
                                                        className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                                        required
                                                        maxLength={50}
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
                                                    maxLength={50}
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
                                                        <option key={option.code} value={option.code}>{option.name}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </>
                            ) : (
                                <>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="formName">
                                                <Form.Label>Nome<span style={{ color: 'red' }}> *</span></Form.Label>
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={<Tooltip id="tooltip-name">{groupFieldRequirements['name']}</Tooltip>}
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
                                        <Col md={6}>
                                            <Form.Group controlId="formDescription">
                                                <Form.Label>Descrição</Form.Label>
                                                <Form.Control
                                                    type="string"
                                                    name="description"
                                                    value={formData['description'] || ''}
                                                    onChange={handleChange}
                                                    className="custom-input-height custom-select-font-size"
                                                    maxLength={50}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </>
                            )}
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
                                    clearSelectedRows={clearSelectionToggle}
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
                                    data={employeeData.length > 0 ? employeeData : []}
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
                                    defaultSortFieldId='enrollNumber'
                                    noDataComponent="Não existem dados disponíveis para exibir."
                                />
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleClose}>Fechar</Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
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