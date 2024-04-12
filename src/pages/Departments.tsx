import { useState, useEffect } from 'react';
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import '../css/PagesStyles.css';
import Button from 'react-bootstrap/Button';
import DataTable, { TableColumn } from 'react-data-table-component';
import { ColumnSelectorModal } from '../modals/ColumnSelectorModal';
import { Department } from '../helpers/Types';
import { CreateModal } from '../modals/CreateModal';
import { UpdateModal } from '../modals/UpdateModal';
import { DeleteModal } from '../modals/DeleteModal';
import { CustomOutlineButton } from '../components/CustomOutlineButton';
import { fetchWithAuth } from '../components/FetchWithAuth';
import { departmentFields } from '../helpers/Fields';
import { ExportButton } from '../components/ExportButton';
import { toast } from 'react-toastify';

export const Departments = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['code', 'name']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDepartmentForDelete, setSelectedDepartmentForDelete] = useState<string | null>(null);

    const fetchDepartments = async () => {
        try {
            const response = await fetchWithAuth('https://localhost:7129/api/Departaments'); 
            if (!response.ok) {
                toast.error('Erro ao buscar dados dos departamentos');
            }
            const data = await response.json();
            setDepartments(data);
        } catch (error) {
            console.error('Erro ao buscar dados dos departamentos:', error);
        }
    };    

    const handleAddDepartment = async (department: Department) => {
        try {
            const response = await fetchWithAuth('https://localhost:7129/api/Departaments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(department)
            });
    
            if (!response.ok) {
                toast.error('Erro ao adicionar novo departamento');
            }
            const data = await response.json();
            setDepartments(deps => [...deps, data]);
            toast.success('Departamento adicionado com sucesso');
            handleCloseAddModal();
        } catch (error) {
            console.error('Erro ao adicionar novo departamento:', error);
        }
        refreshDepartments();
    };

    const handleUpdateDepartment = async (department: Department) => {
        try {
            const response = await fetchWithAuth(`https://localhost:7129/api/Departments/${department.departmentID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(department)
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                toast.error(`Erro ao atualizar departamento: ${errorText}`);
                return;
            }
    
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const updatedDepartment = await response.json();
                setDepartments(deps => deps.map(dep => dep.departmentID === updatedDepartment.departmentID ? updatedDepartment : dep));
                toast.success('Departamento atualizado com sucesso');
            } else {
                await response.text();
                toast.success('Departamento atualizado com sucesso');
            }
        } catch (error) {
            console.error('Erro ao atualizar departamento:', error);
            toast.error('Falha ao conectar ao servidor');
        } finally {
            handleCloseUpdateModal();
            refreshDepartments();
        }
    };        

    const handleDeleteDepartment = async (departmentID: string) => {
        try {
            const response = await fetchWithAuth(`https://localhost:7129/api/Departaments/${departmentID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                toast.error('Erro ao apagar departamento');
            }

            toast.success('Departamento apagado com sucesso');
        } catch (error) {
            console.error('Erro ao apagar departamento:', error);
        }
        refreshDepartments();
    };    

    useEffect(() => {
        fetchDepartments();
    }, []);

    const refreshDepartments = () => {
        fetchDepartments();
    };

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleCloseUpdateModal = () => {
        setSelectedDepartment(null);
        setShowUpdateModal(false);
    };

    const filteredItems = departments.filter(item =>
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
        setSelectedColumns(['code', 'name']);
    };

    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    const columnNamesMap = departmentFields.reduce<Record<string, string>>((acc, field) => {
        acc[field.key] = field.label;
        return acc;
    }, {});

    const tableColumns = selectedColumns
        .map(columnKey => ({
            name: columnNamesMap[columnKey] || columnKey,
            selector: (row: Record<string, any>) => row[columnKey],
            sortable: true,
        }));

    const handleEditDepartment = (department: Department) => {
        setSelectedDepartment(department);
        setShowUpdateModal(true);
    };

    const handleOpenDeleteModal = (departmentID: string) => {
        setSelectedDepartmentForDelete(departmentID);
        setShowDeleteModal(true);
    };

    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    const ExpandedComponent: React.FC<{ data: Department }> = ({ data }) => (
        <div className="expanded-details-container">
            {Object.entries(data).map(([key, value], index) => {
                if (key === 'departmentID') return null;
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

    const actionColumn: TableColumn<Department> = {
        name: 'Ações',
        cell: (row: Department) => (
            <div>
                <CustomOutlineButton icon="bi-pencil-square" onClick={() => handleEditDepartment(row)}></CustomOutlineButton>{' '}
                <Button variant="outline-danger" onClick={() => handleOpenDeleteModal(row.departmentID)}>
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: Department) => row.departmentID,
    };

    return (
        <div>
            <NavBar />
            <div className='filter-refresh-add-edit-upper-class'>
                <input
                    className='filter-input'
                    type="text"
                    placeholder="Pesquisa"
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                />
                <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshDepartments} />
                <CustomOutlineButton icon="bi-plus" onClick={handleOpenAddModal} iconSize='1.1em' />
                <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                <ExportButton data={departments} fields={departmentFields} />
                <CreateModal
                    title="Adicionar Departamento"
                    open={showAddModal}
                    onClose={handleCloseAddModal}
                    onSave={handleAddDepartment}
                    fields={departmentFields}
                    initialValues={{}}
                />
                {selectedDepartment && (
                    <UpdateModal
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={() => handleUpdateDepartment(selectedDepartment)}
                        entity={selectedDepartment}
                        fields={departmentFields}
                        title="Atualizar Departamento"
                    />
                )}
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteDepartment}
                    entityId={selectedDepartmentForDelete}
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
                    columns={departmentFields}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
                />
            )}
            <Footer />
        </div>
    );
}