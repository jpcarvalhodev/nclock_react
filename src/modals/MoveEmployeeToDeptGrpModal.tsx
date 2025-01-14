import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import { Department, Employee, Group } from '../types/Types';
import { customStyles } from '../components/CustomStylesDataTable';
import DataTable from 'react-data-table-component';

// Define a interface Entity
export interface Entity {
    id: string;
    [key: string]: any;
}

// Define a propriedade do componente
interface UpdateModalProps<T extends Entity> {
    open: boolean;
    onClose: () => void;
    onUpdate: (data: T) => Promise<void>;
    entityType: 'department' | 'group';
    title: string;
    employees: Employee[];
    departments: Department[];
    groups: Group[];
}

// Exporta o componente
export const MoveEmployeeToDeptGrpModal = <T extends Entity>({ open, onClose, onUpdate, entityType, title, employees, departments, groups }: UpdateModalProps<T>) => {
    const [selectedDepartment, setSelectedDepartment] = useState<Partial<Department> | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<Partial<Group> | null>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee[]>([]);

    // Função para atualizar o formulário com os dados de departamento ou grupo selecionado
    const handleRowSelectedDeptGrp = ({ selectedRows }: { selectedRows: Department[] | Group[] }) => {
        if (entityType === 'department') {
            setSelectedDepartment(selectedRows[0] || null);
        } else {
            setSelectedGroup(selectedRows[0] || null);
        }
    };

    // Função para atualizar o formulário com os dados do funcionário selecionado
    const handleRowSelectedEmployees = ({ selectedRows }: { selectedRows: Employee[] }) => {
        setSelectedEmployee(selectedRows || null);
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

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Função para remover campos vazios
    function removeEmptyFields<T>(value: T): T | Partial<T> {
        if (Array.isArray(value)) {
            const cleanedArray = value
                .map((item) => removeEmptyFields(item))
                .filter((item) => {
                    if (typeof item === 'object' && item !== null && Object.keys(item).length === 0) {
                        return false;
                    }
                    return true;
                });
            return cleanedArray as T;
        }
        if (typeof value === 'object' && value !== null) {
            const obj = { ...value } as Record<string, unknown>;
            for (const [key, val] of Object.entries(obj)) {
                const cleanedVal = removeEmptyFields(val);
                if (
                    cleanedVal === null ||
                    cleanedVal === undefined ||
                    (typeof cleanedVal === 'string' && cleanedVal.trim() === '') ||
                    (typeof cleanedVal === 'object' && Object.keys(cleanedVal).length === 0)
                ) {
                    delete obj[key];
                } else {
                    obj[key] = cleanedVal;
                }
            }
            return obj as T;
        }
        return value;
    }

    // Função para salvar os dados
    const handleSave = () => {
        if (selectedEmployee && (selectedDepartment || selectedGroup)) {
            selectedEmployee.forEach((emp: Employee) => {
                const updatedEmployee: Employee = { ...emp };

                if (selectedDepartment && entityType === 'department') {
                    updatedEmployee.departmentId = selectedDepartment.departmentID;
                    updatedEmployee.departmentName = selectedDepartment.name || '';
                } else if (selectedGroup && entityType === 'group') {
                    updatedEmployee.groupId = selectedGroup.groupID;
                    updatedEmployee.groupName = selectedGroup.name || '';
                }

                const dataToSend = {
                    employee: {
                        employeeID: updatedEmployee.employeeID,
                        enrollNumber: updatedEmployee.enrollNumber,
                        name: updatedEmployee.name,
                        shortName: updatedEmployee.shortName,
                        nameAcronym: updatedEmployee.nameAcronym,
                        comments: updatedEmployee.comments,
                        photo: updatedEmployee.photo,
                        address: updatedEmployee.address,
                        ziPcode: updatedEmployee.ziPcode,
                        locality: updatedEmployee.locality,
                        village: updatedEmployee.village,
                        district: updatedEmployee.district,
                        phone: updatedEmployee.phone,
                        mobile: updatedEmployee.mobile,
                        email: updatedEmployee.email,
                        birthday: updatedEmployee.birthday,
                        nationality: updatedEmployee.nationality,
                        gender: updatedEmployee.gender,
                        bInumber: updatedEmployee.bInumber,
                        bIissuance: updatedEmployee.bIissuance,
                        biValidity: updatedEmployee.biValidity,
                        nif: updatedEmployee.nif,
                        admissionDate: updatedEmployee.admissionDate,
                        exitDate: updatedEmployee.exitDate,
                        rgpdAut: updatedEmployee.rgpdAut,
                        status: updatedEmployee.status,
                        statusEmail: updatedEmployee.statusEmail,
                        statusFprint: updatedEmployee.statusFprint,
                        statusFace: updatedEmployee.statusFace,
                        statusPalm: updatedEmployee.statusPalm,
                        type: updatedEmployee.type,
                        employeeDisabled: updatedEmployee.employeeDisabled,
                        entidadeId: updatedEmployee.entidadeId,
                        entidadeName: updatedEmployee.entidadeName,
                        departmentId: updatedEmployee.departmentId,
                        departmentName: updatedEmployee.departmentName,
                        professionId: updatedEmployee.professionId,
                        professionName: updatedEmployee.professionName,
                        categoryId: updatedEmployee.categoryId,
                        categoryName: updatedEmployee.categoryName,
                        groupId: updatedEmployee.groupId,
                        groupName: updatedEmployee.groupName,
                        zoneId: updatedEmployee.zoneId,
                        zoneName: updatedEmployee.zoneName,
                        externalEntityId: updatedEmployee.externalEntityId,
                        externalEntityName: updatedEmployee.externalEntityName,
                    },
                    employeeCards: updatedEmployee.employeeCards?.map((card) => ({
                        cardId: card.cardId,
                        employeeId: updatedEmployee.employeeID,
                        enrollNumber: updatedEmployee.enrollNumber,
                        employeeName: updatedEmployee.name,
                        devicePassword: card.devicePassword,
                        devicePrivelage: card.devicePrivelage,
                        deviceEnabled: card.deviceEnabled,
                        cardNumber: card.cardNumber
                    })) || []
                };

                const cleanedData = removeEmptyFields(dataToSend);
                onUpdate(cleanedData as unknown as T);
                onClose();
            });
        } else {
            toast.error(`Selecione um ${entityType === 'department' ? 'departamento' : 'grupo'} e um funcionário para continuar.`);
        }
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static" size='xl' style={{ marginTop: 100 }}>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable" style={{ marginBottom: 80 }}>
                <div className="container-fluid">
                    <Row>
                        <Col md={6}>
                            <h5>{entityType === 'department' ? 'Departamentos' : 'Grupos'}</h5>
                            <div style={{ overflowX: 'auto', overflowY: 'auto' }}>
                                <DataTable
                                    columns={entityType === 'department' ? departmentColumns : groupColumns}
                                    data={
                                        entityType === 'department'
                                            ? departments
                                            : groups
                                    }
                                    customStyles={customStyles}
                                    striped
                                    noHeader
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    paginationPerPage={10}
                                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                                    selectableRows
                                    onSelectedRowsChange={handleRowSelectedDeptGrp}
                                    selectableRowsNoSelectAll={true}
                                    defaultSortAsc={true}
                                    defaultSortFieldId="code"
                                    noDataComponent="Não existem dados disponíveis para exibir."
                                />
                            </div>
                        </Col>
                        <Col md={6}>
                            <h5>Funcionários</h5>
                            <div style={{ overflowX: 'auto', overflowY: 'auto' }}>
                                <DataTable
                                    columns={employeeColumns}
                                    data={employees}
                                    customStyles={customStyles}
                                    striped
                                    noHeader
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    paginationPerPage={10}
                                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                                    selectableRows
                                    onSelectedRowsChange={handleRowSelectedEmployees}
                                    selectableRowsNoSelectAll={true}
                                    defaultSortAsc={true}
                                    defaultSortFieldId="enrollNumber"
                                    noDataComponent="Não existem dados disponíveis para exibir."
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button variant="outline-secondary" onClick={onClose}>
                    Fechar
                </Button>
                <Button variant="outline-primary" onClick={handleSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal >
    );
};