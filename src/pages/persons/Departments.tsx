import { useState, useEffect } from 'react';
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import Button from 'react-bootstrap/Button';
import DataTable, { TableColumn } from 'react-data-table-component';
import { ColumnSelectorModal } from '../../modals/ColumnSelectorModal';
import { Department } from '../../helpers/Types';
import { CreateModalDeptGrp } from '../../modals/CreateModalDeptGrp';
import { UpdateModalDeptGrp } from '../../modals/UpdateModalDeptGrp';
import { DeleteModal } from '../../modals/DeleteModal';
import { CustomOutlineButton } from '../../components/CustomOutlineButton';
import { departmentFields } from '../../helpers/Fields';
import { ExportButton } from '../../components/ExportButton';
import { toast } from 'react-toastify';
import '../../css/PagesStyles.css';
import { ExpandedComponentDept } from '../../components/ExpandedComponentDept';
import { customStyles } from '../../components/CustomStylesDataTable';
import { SelectFilter } from '../../components/SelectFilter';
import * as apiService from "../../helpers/apiService";
import { useColor } from '../../context/ColorContext';
import { PrintButton } from '../../components/PrintButton';
import { set } from 'date-fns';

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a página de departamentos
export const Departments = () => {
    const { navbarColor, footerColor } = useColor();
    const [departments, setDepartments] = useState<Department[]>([]);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['code', 'name', 'description']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDepartmentForDelete, setSelectedDepartmentForDelete] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({});
    const [initialData, setInitialData] = useState<Partial<Department> | null>(null);
    const [currentDepartmentIndex, setCurrentDepartmentIndex] = useState(0);

    // Busca os departamentos
    const fetchAllDepartments = async () => {
        try {
            const allDepartments: Department[] = await apiService.fetchAllDepartments();

            const departmentMap = new Map<number, Department>(allDepartments.map((dept: Department) => [dept.code, { ...dept, subdepartments: [] }]));

            allDepartments.forEach((dept: Department) => {
                if (dept.paiId && departmentMap.has(dept.paiId)) {
                    const parentDept = departmentMap.get(dept.paiId);
                    if (parentDept) {
                        parentDept.subdepartments.push(dept);
                    }
                }
            });

            const departmentsArray = Array.from(departmentMap.values());
            setDepartments(departmentsArray);
        } catch (error) {
            console.error('Erro ao buscar dados dos departamentos:', error);
        }
    };

    // Busca os subdepartamentos
    const fetchAllSubDepartments = async (parentId: number): Promise<Department[]> => {
        try {
            const subdepartments: Department[] = await apiService.fetchAllSubDepartments(parentId);
            return subdepartments;
        } catch (error) {
            console.error('Erro ao buscar dados dos subdepartamentos:', error);
            return [];
        }
    };

    // Adiciona um departamento
    const handleAddDepartment = async (department: Department) => {
        try {
            const data = await apiService.addDepartment(department);
            setDepartments(deps => [...deps, data]);
            toast.success(data.value || 'Departamento adicionado com sucesso!')

        } catch (error) {
            console.error('Erro ao adicionar novo departamento:', error);
        } finally {
            refreshDepartments();
        }
    };

    // Atualiza um departamento
    const handleUpdateDepartment = async (department: Department) => {
        try {
            const updatedDepartment = await apiService.updateDepartment(department);
            setDepartments(deps => deps.map(dep => dep.departmentID === updatedDepartment.departmentID ? updatedDepartment : dep));
            toast.success(updatedDepartment.value || 'Departamento atualizado com sucesso!');

        } catch (error) {
            console.error('Erro ao atualizar departamento:', error);
        } finally {
            refreshDepartments();
        }
    };

    // Apaga um departamento
    const handleDeleteDepartment = async (departmentID: string) => {
        try {
            const deleteDept = await apiService.deleteDepartment(departmentID);
            toast.success(deleteDept.value || 'Departamento apagado com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar departamento:', error);
        } finally {
            refreshDepartments();
        }
    };

    // Atualiza os departamentos
    useEffect(() => {
        fetchAllDepartments();
    }, []);

    // função de atualizar os departamentos
    const refreshDepartments = () => {
        fetchAllDepartments();
    };

    // Filtra os departamentos
    const filteredItems = departments.filter(item =>
        Object.keys(item).some(key =>
            String(item[key]).toLowerCase().includes(filterText.toLowerCase())
        )
    );

    // Seleciona o departamento anterior
    const handleNextDepartment = () => {
        const sortedDepartments = departments.sort((a, b) => a.code - b.code);
        if (currentDepartmentIndex < sortedDepartments.length - 1) {
            setCurrentDepartmentIndex(currentDepartmentIndex + 1);
            setSelectedDepartment(sortedDepartments[currentDepartmentIndex + 1]);
        }
    };

    // Seleciona o departamento seguinte
    const handlePrevDepartment = () => {
        const sortedDepartments = departments.sort((a, b) => a.code - b.code);
        if (currentDepartmentIndex > 0) {
            setCurrentDepartmentIndex(currentDepartmentIndex - 1);
            setSelectedDepartment(sortedDepartments[currentDepartmentIndex - 1]);
        }
    };

    // Seleciona as colunas
    const toggleColumn = (columnName: string) => {
        if (selectedColumns.includes(columnName)) {
            setSelectedColumns(selectedColumns.filter(col => col !== columnName));
        } else {
            setSelectedColumns([...selectedColumns, columnName]);
        }
    };

    // Reseta as colunas
    const resetColumns = () => {
        setSelectedColumns(['code', 'name', 'description']);
    };

    // Seleciona todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Mapeia os nomes das colunas
    const columnNamesMap = departmentFields.reduce<Record<string, string>>((acc, field) => {
        acc[field.key] = field.label;
        return acc;
    }, {});

    // Filtra os dados da tabela
    const filteredDataTable = departments.filter(department =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(department[key]) === String(filters[key])
        )
    );

    // Define as colunas da tabela
    const tableColumns = selectedColumns
        .map(columnKey => ({
            id: columnKey,
            name: (
                <>
                    {columnNamesMap[columnKey]}
                    <SelectFilter column={columnKey} setFilters={setFilters} data={filteredDataTable} />
                </>
            ),
            selector: (row: Record<string, any>) => {
                switch (columnKey) {
                    case 'paiId':
                        return departments.find(dept => dept.code === row.paiId)?.name || '';
                    default:
                        return row[columnKey];
                }
            },
            sortable: true,
        }));

    // Abre o modal de edição
    const handleEditDepartment = (department: Department) => {
        setSelectedDepartment(department);
        const sortedDepartments = departments.sort((a, b) => a.code - b.code);
        const departmentIndex = sortedDepartments.findIndex(dep => dep.departmentID === department.departmentID);
        setCurrentDepartmentIndex(departmentIndex);
        setShowUpdateModal(true);
    };

    // Fecha o modal de edição
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedDepartment(null);
    };

    // Define os dados iniciais ao duplicar
    const handleDuplicate = (entity: Partial<Department>) => {
        setInitialData(entity);
        setShowAddModal(true);
        setSelectedDepartment(null);
        setShowUpdateModal(false);
    }

    // Abre o modal de deletar
    const handleOpenDeleteModal = (departmentID: string) => {
        const department = departments.find(dep => dep.departmentID === departmentID);
        if (department && department.subdepartments && department.subdepartments.length > 0) {
            toast.error('Este departamento possui subdepartamentos vinculados. Primeiro apague os subdepartamentos para poder apagar este departamento.');
        } else {
            setSelectedDepartmentForDelete(departmentID);
            setShowDeleteModal(true);
        }
    };

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define a coluna de ações
    const actionColumn: TableColumn<Department> = {
        name: 'Ações',
        cell: (row: Department) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton className="action-button" icon='bi bi-copy' onClick={() => handleDuplicate(row)} />
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditDepartment(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.departmentID)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: Department) => row.departmentID,
        ignoreRowClick: true,
    };

    // Função para gerar os dados com nomes substituídos para o export/print
    const departmentWithNames = departments.map(transaction => {

        const departmentMatch = departments.find(dept => dept.paiId === transaction.code);
        const departmentName = departmentMatch?.name || '';

        return {
            ...transaction,
            paiId: departmentName,
        };
    });

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span style={{ color: '#000000' }}>Departamentos</span>
                </div>
                <div className="datatable-header">
                    <div>
                        <input
                            className='search-input'
                            type="text"
                            placeholder="Pesquisa"
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                        />
                    </div>
                    <div className="buttons-container-others">
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshDepartments} />
                        <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        <ExportButton allData={departmentWithNames} selectedData={filteredItems} fields={departmentFields} />
                        <PrintButton data={departmentWithNames} fields={departmentFields} />
                    </div>
                </div>
                <CreateModalDeptGrp
                    title="Adicionar Departamento"
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddDepartment}
                    fields={departmentFields}
                    initialValues={initialData || {}}
                    entityType='department'
                />
                {selectedDepartment && (
                    <UpdateModalDeptGrp
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={handleUpdateDepartment}
                        entity={selectedDepartment}
                        entityType='department'
                        title="Atualizar Departamento"
                        fields={departmentFields}
                        onDuplicate={handleDuplicate}
                        onNext={handleNextDepartment}
                        onPrev={handlePrevDepartment}
                        canMovePrev={currentDepartmentIndex > 0}
                        canMoveNext={currentDepartmentIndex < departments.length - 1}
                    />
                )}
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteDepartment}
                    entityId={selectedDepartmentForDelete}
                />
            </div>
            <div className='content-wrapper'>
                <div className='table-css'>
                    <DataTable
                        columns={[...tableColumns, actionColumn]}
                        data={filteredDataTable}
                        onRowDoubleClicked={handleEditDepartment}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        paginationPerPage={15}
                        selectableRows
                        expandableRows
                        expandableRowsComponent={(props) => (
                            <ExpandedComponentDept data={props.data} fetchSubdepartments={fetchAllSubDepartments} isRoot={true} />
                        )}
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
                        defaultSortAsc={true}
                        defaultSortFieldId="code"
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
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}