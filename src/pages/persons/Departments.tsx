import { useContext, useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { toast } from 'react-toastify';

import { CustomOutlineButton } from '../../components/CustomOutlineButton';
import { customStyles } from '../../components/CustomStylesDataTable';
import { ExpandedComponentDept } from '../../components/ExpandedComponentDept';
import { ExportButton } from '../../components/ExportButton';
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { PrintButton } from '../../components/PrintButton';
import { SelectFilter } from '../../components/SelectFilter';
import { departmentFields } from '../../helpers/Fields';
import { Department } from '../../helpers/Types';
import { ColumnSelectorModal } from '../../modals/ColumnSelectorModal';
import { CreateModalDeptGrp } from '../../modals/CreateModalDeptGrp';
import { DeleteModal } from '../../modals/DeleteModal';
import { UpdateModalDeptGrp } from '../../modals/UpdateModalDeptGrp';


import '../../css/PagesStyles.css';
import { useNavbar } from "../../context/NavbarContext";

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TextField, TextFieldProps } from '@mui/material';

import { PersonsContext, PersonsContextType } from '../../context/PersonsContext';

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a interface para as propriedades do componente CustomSearchBox
function CustomSearchBox(props: TextFieldProps) {
    return (
        <TextField
            {...props}
            className="SearchBox"
        />
    );
}

// Define a página de departamentos
export const Departments = () => {
    const { navbarColor, footerColor } = useNavbar();
    const {
        departments,
        setDepartments,
        fetchAllDepartments,
        fetchAllSubDepartments,
        handleAddDepartment,
        handleUpdateDepartment,
        handleDeleteDepartment
    } = useContext(PersonsContext) as PersonsContextType;
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['code', 'name', 'description']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDepartmentForDelete, setSelectedDepartmentForDelete] = useState<any | null>(null);
    const [filters, setFilters] = useState<Filters>({});
    const [initialData, setInitialData] = useState<Partial<Department> | null>(null);
    const [currentDepartmentIndex, setCurrentDepartmentIndex] = useState(0);
    const [selectedRows, setSelectedRows] = useState<Department[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);

    // Busca os departamentos
    const fetchDepartments = async () => {
        try {
            const allDepartments: Department[] = await fetchAllDepartments();

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

    // Adiciona um departamento
    const addDepartment = async (department: Department) => {
        await handleAddDepartment(department);
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Atualiza um departamento
    const updateDepartment = async (department: Department) => {
        await handleUpdateDepartment(department);
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Apaga um departamento
    const deleteDepartment = async (departmentID: string[]) => {
        await handleDeleteDepartment(departmentID);
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Busca os departamentos ao carregar a página
    useEffect(() => {
        fetchDepartments();
    }, []);

    // função de atualizar os departamentos
    const refreshDepartments = () => {
        fetchDepartments();
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Função para selecionar as linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: Department[];
    }) => {
        const sortedSelectedRows = state.selectedRows.sort((a, b) => a.code - b.code);
        setSelectedRows(sortedSelectedRows);
    };

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
            filters[key] === "" || (department[key] != null && String(department[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(department).some(([key, value]) => {
            if (selectedColumns.includes(key) && value != null) {
                if (value instanceof Date) {
                    return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
                } else {
                    return value.toString().toLowerCase().includes(filterText.toLowerCase());
                }
            }
            return false;
        })
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

    // Função para deletar vários departamentos
    const handleSelectedDeptsToDelete = () => {
        const deptIds = Array.from(new Set(selectedRows.map(dept => dept.departmentID)));
        setSelectedDepartmentForDelete(deptIds);
        setShowDeleteModal(true);
    };

    // Configurando a função onDelete para iniciar o processo de exclusão
    const startDeletionProcess = () => {
        let deptIds;

        if (Array.isArray(selectedDepartmentForDelete)) {
            deptIds = selectedDepartmentForDelete;
        } else if (selectedDepartmentForDelete) {
            deptIds = [selectedDepartmentForDelete];
        } else {
            deptIds = Array.from(new Set(selectedRows.map(dept => dept.departmentID)));
        }

        setShowDeleteModal(false);
        deleteDepartment(deptIds);
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
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Duplicar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-copy' onClick={() => handleDuplicate(row)} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Editar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-pencil-fill' onClick={() => handleEditDepartment(row)} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Apagar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-trash-fill' onClick={() => handleOpenDeleteModal(row.departmentID)} />
                </OverlayTrigger>
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
    }).sort((a, b) => a.code - b.code);

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return departmentFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span style={{ color: '#000000' }}>Departamentos</span>
                </div>
                <div className="datatable-header">
                    <div>
                        <CustomSearchBox
                            label="Pesquisa"
                            variant="outlined"
                            size='small'
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                            style={{ marginTop: -5 }}
                        />
                    </div>
                    <div className="buttons-container-others">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
                        >
                            <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshDepartments} iconSize='1.1em' />
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip className="custom-tooltip">Adicionar</Tooltip>}
                        >
                            <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip className="custom-tooltip">Colunas</Tooltip>}
                        >
                            <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} iconSize='1.1em' />
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip className="custom-tooltip">Apagar Selecionados</Tooltip>}
                        >
                            <CustomOutlineButton icon="bi bi-trash-fill" onClick={handleSelectedDeptsToDelete} iconSize='1.1em' />
                        </OverlayTrigger>
                        <ExportButton allData={departmentWithNames} selectedData={selectedRows.length > 0 ? selectedRows : departmentWithNames} fields={getSelectedFields()} />
                        <PrintButton data={selectedRows.length > 0 ? selectedRows : departmentWithNames} fields={getSelectedFields()} />
                    </div>
                </div>
                <CreateModalDeptGrp
                    title="Adicionar Departamento"
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={addDepartment}
                    fields={departmentFields}
                    initialValues={initialData || {}}
                    entityType='department'
                />
                {selectedDepartment && (
                    <UpdateModalDeptGrp
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={updateDepartment}
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
                    onDelete={startDeletionProcess}
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
                        paginationPerPage={20}
                        selectableRows
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={clearSelectionToggle}
                        expandableRows
                        expandableRowsComponent={(props) => (
                            <ExpandedComponentDept data={props.data} fetchSubdepartments={fetchAllSubDepartments} isRoot={true} />
                        )}
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
                        striped
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