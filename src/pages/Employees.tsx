import { useState, useEffect } from 'react';
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import '../css/PagesStyles.css';
import Button from 'react-bootstrap/Button';
import DataTable, { TableColumn } from 'react-data-table-component';
import { ColumnSelectorModal } from '../modals/ColumnSelectorModal';
import { Employee } from '../helpers/Types';
import { CreateModal } from '../modals/CreateModal';
import { UpdateModal } from '../modals/UpdateModal';
import { DeleteModal } from '../modals/DeleteModal';

export const Employees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['number', 'name', 'shortName']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState<string | null>(null);

    const fields = [
        { label: 'Número', key: 'number', type: 'number', required: true },
        { label: 'Nome', key: 'name', type: 'string', required: true },
        { label: 'Nome Abreviado', key: 'shortName', type: 'string', required: true },
        { label: 'Acrônimo do Nome', key: 'nameAcronym', type: 'string', required: true },
        { label: 'Comentários', key: 'comments', type: 'string' },
        { label: 'Foto', key: 'photo', type: 'string' },
        { label: 'Morada', key: 'address', type: 'string' },
        { label: 'Código Postal', key: 'zipcode', type: 'string' },
        { label: 'Localidade', key: 'locality', type: 'string' },
        { label: 'Freguesia', key: 'village', type: 'string' },
        { label: 'Distrito', key: 'district', type: 'string' },
        { label: 'Telefone', key: 'phone', type: 'number' },
        { label: 'Telemóvel', key: 'mobile', type: 'number' },
        { label: 'E-Mail', key: 'email', type: 'string' },
        { label: 'Data de Nascimento', key: 'birthday', type: 'string' },
        { label: 'Nacionalidade', key: 'nacionality', type: 'string' },
        { label: 'Gênero', key: 'gender', type: 'string' },
        { label: 'Número de BI', key: 'biNumber', type: 'string' },
        { label: 'Emissão de BI', key: 'biIssuance', type: 'string' },
        { label: 'Validade de BI', key: 'biValidity', type: 'string' },
        { label: 'NIF', key: 'nif', type: 'number' },
        { label: 'Data de Admissão', key: 'admissionDate', type: 'string' },
        { label: 'Data de Saída', key: 'exitDate', type: 'string' },
        { label: 'Autorização RGPD', key: 'rgpdAut', type: 'string' },
        { label: 'ID do Departmento', key: 'departmentId', type: 'string' },
        { label: 'Nome do Departmento', key: 'departmentName', type: 'string' },
        { label: 'ID da Profissão', key: 'professionId', type: 'string' },
        { label: 'Nome da Profissão', key: 'professionName', type: 'string' },
        { label: 'ID da Categoria', key: 'categoryId', type: 'string' },
        { label: 'Nome da Categoria', key: 'categoryName', type: 'string' },
        { label: 'ID do Grupo', key: 'groupId', type: 'string' },
        { label: 'Nome do Grupo', key: 'groupName', type: 'string' },
        { label: 'ID da Zona', key: 'zoneId', type: 'string' },
        { label: 'Nome da Zona', key: 'zoneName', type: 'string' },
        { label: 'ID da Entidade Externa', key: 'externalEntityId', type: 'string' },
        { label: 'Nome da Entidade Externa', key: 'externalEntityName', type: 'string' },
    ];

    const fetchEmployees = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://localhost:7129/api/Employees', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error fetching employees');
            }

            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching the employees', error);
        }
    };

    const handleAddEmployee = async (employee: Employee) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://localhost:7129/api/Employees', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee)
            });

            if (!response.ok) {
                throw new Error('Error adding new employee');
            }

            const data = await response.json();
            setEmployees([...employees, data]);
        } catch (error) {
            console.error('Error adding new employee:', error);
        }

        handleCloseAddModal();
        refreshEmployees();
    };

    const handleUpdateEmployee = async (employee: Employee) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://localhost:7129/api/Employees/${employee.employeeID}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee)
            });

            if (!response.ok) {
                throw new Error('Error updating employee');
            }

            const updatedEmployees = employees.map(emp => {
                return emp.id === employee.id ? employee : emp;
            });
            setEmployees(updatedEmployees);
        } catch (error) {
            console.error('Error updating employee:', error);
        }

        handleCloseUpdateModal();
        refreshEmployees();
    };

    const handleDeleteEmployee = async (employeeID: string) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://localhost:7129/api/Employees/${employeeID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error deleting employee');
            }
            refreshEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const refreshEmployees = () => {
        fetchEmployees();
    };

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleCloseUpdateModal = () => {
        setSelectedEmployee(null);
        setShowUpdateModal(false);
    };

    const handleOpenDeleteModal = (employeeID: string) => {
        setSelectedEmployeeToDelete(employeeID);
        setShowDeleteModal(true);
    };

    const filteredItems = employees.filter(item =>
        Object.keys(item).some(key =>
            String(item[key]).toLowerCase().includes(filterText.toLowerCase())
        )
    );

    const toggleColumn = (columnName: string) => {
        if (selectedColumns.includes(columnName)) {
            setSelectedColumns(selectedColumns.filter(col => col !== columnName));
        } else {
            setSelectedColumns([...selectedColumns, columnName]);
        }
    };

    const resetColumns = () => {
        setSelectedColumns(['number', 'name', 'shortName']);
    };

    const columnNamesMap = fields.reduce<Record<string, string>>((acc, field) => {
        acc[field.key] = field.label;
        return acc;
    }, {});

    const tableColumns = selectedColumns
        .map(columnKey => ({
            name: columnNamesMap[columnKey] || columnKey,
            selector: (row: Record<string, any>) => row[columnKey],
            sortable: true,
        }));

    const handleEditEmployee = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowUpdateModal(true);
    };

    const paginationOptions = {
        rowsPerPageText: 'Linhas por página'
    };

    const ExpandedComponent: React.FC<{ data: Employee }> = ({ data }) => (
        <div className="expanded-details-container">
            {Object.entries(data).map(([key, value], index) => {
                let displayValue = value;
                if (typeof value === 'object' && value !== null) {
                    displayValue = JSON.stringify(value, null, 2);
                }
                const displayName = columnNamesMap[key] || key;
                return !['id', 'algumOutroCampoParaExcluir'].includes(key) && (
                    <p key={index}>
                        <span className="detail-key">{`${displayName}: `}</span>
                        {displayValue}
                    </p>
                );
            })}
        </div>
    );

    const actionColumn: TableColumn<Employee> = {
        name: 'Ações',
        cell: (row: Employee) => (
            <div>
                <Button variant="outline-primary" onClick={() => handleEditEmployee(row)}>Editar</Button>{' '}
                <Button variant="outline-danger" onClick={() => handleOpenDeleteModal(row.departmentId)}>Apagar</Button>{' '}
            </div>
        ),
        selector: (row: Employee) => row.employeeID,
    };

    return (
        <div>
            <NavBar />
            <div className='filter-refresh-add-edit-upper-class'>
                <input
                    className='filter-input'
                    type="text"
                    placeholder="Filtro"
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                />
                <Button variant="outline-primary" onClick={refreshEmployees}>Atualizar</Button>{' '}
                <Button variant="outline-primary" onClick={handleOpenAddModal}>Adicionar</Button>{' '}
                <Button variant="outline-primary" onClick={() => setOpenColumnSelector(true)}>Visualizar</Button>{' '}
                <CreateModal
                    title="Adicionar Funcionário"
                    open={showAddModal}
                    onClose={handleCloseAddModal}
                    onSave={handleAddEmployee}
                    fields={fields}
                    initialValues={{}}
                />
                {selectedEmployee && (
                    <UpdateModal
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={() => handleUpdateEmployee(selectedEmployee)}
                        entity={selectedEmployee}
                        fields={fields}
                        title="Atualizar Funcionário"
                    />
                )}
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteEmployee}
                    entityId={selectedEmployee?.id || null}
                />
            </div>
            <div>
                <div className='table-css'>
                    <DataTable
                        columns={[...tableColumns, actionColumn]}
                        data={filteredItems}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        expandableRows
                        expandableRowsComponent={ExpandedComponent}
                    />
                </div>
            </div>
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={Object.keys(filteredItems[0])}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                />
            )}
            <Footer />
        </div>
    );
}