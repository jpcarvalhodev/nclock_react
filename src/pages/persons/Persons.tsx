import { useContext, useEffect, useState } from 'react';
import Split from 'react-split';

import { CustomOutlineButton } from '../../components/CustomOutlineButton';
import { ExportButton } from '../../components/ExportButton';
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { PersonsDataTable } from "../../components/PersonsDataTable";
import { PrintButton } from '../../components/PrintButton';
import { TreeViewData } from "../../components/TreeView";

import '../../css/PagesStyles.css';
import { useNavbar } from "../../context/NavbarContext";
import { PersonsContext, PersonsContextType, PersonsProvider } from '../../context/PersonsContext';
import { employeeFields } from '../../helpers/Fields';
import { Employee } from '../../helpers/Types';
import { ColumnSelectorModal } from '../../modals/ColumnSelectorModal';
import { CreateModalEmployees } from '../../modals/CreateModalEmployees';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { DeleteModal } from '../../modals/DeleteModal';

import { TextFieldProps, TextField } from '@mui/material';

// Define a interface para as propriedades do componente CustomSearchBox
function CustomSearchBox(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      className="SearchBox"
    />
  );
}

// Define a página de pessoas
export const Persons = () => {
    const {
        data,
        setData,
        fetchAllEmployees,
        handleAddEmployee,
        handleDeleteEmployee
    } = useContext(PersonsContext) as PersonsContextType;
    const { navbarColor, footerColor } = useNavbar();
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState(['enrollNumber', 'name', 'shortName']);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [resetSelection, setResetSelection] = useState(false);
    const [showAllEmployees, setShowAllEmployees] = useState(true);
    const [filteredData, setFilteredData] = useState<Employee[]>([]);
    const [filterText, setFilterText] = useState('');
    const defaultColumns = ['enrollNumber', 'name', 'shortName'];
    const [initialData, setInitialData] = useState<Employee | null>(null);
    const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState<string | null>(null);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);

    // Função para adicionar um funcionário e um cartão
    const addEmployeeAndCard = async (employee: Partial<Employee>) => {
        await handleAddEmployee(employee as Employee);
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Função para selecionar funcionários
    const handleSelectEmployees = (employeeIds: string[]) => {
        setSelectedEmployeeIds(employeeIds);
        setShowAllEmployees(employeeIds.length === 0);
    };

    // Função para deletar vários funcionários
    const handleSelectedEmployeesToDelete = () => {
        const employeeIds = Array.from(new Set(selectedRows.map(employee => employee.employeeID)));
        setSelectedEmployeeToDelete(employeeIds.length ? employeeIds[0] : null);
        setShowDeleteModal(true);
    };

    // Função para deletar funcionários sequencialmente
    const deleteSelectedEmployees = async (employeeIds: string[]) => {
        await handleDeleteEmployee(employeeIds);
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Configurando a função onDelete para iniciar o processo de exclusão
    const startDeletionProcess = () => {
        const employeeIds = Array.from(new Set(selectedRows.map(employee => employee.employeeID)));
        setShowDeleteModal(false);
        deleteSelectedEmployees(employeeIds);
    };

    // Função para atualizar a lista de funcionários
    const refreshEmployees = () => {
        fetchAllEmployees();
        setClearSelectionToggle(!clearSelectionToggle);
    }

    // Define a função de duplicar funcionários
    const handleDuplicate = (data: Employee) => {
        setInitialData(data);
        setShowAddModal(true);
    }

    // Atualiza a seleção ao resetar
    useEffect(() => {
        if (resetSelection) {
            setResetSelection(false);
        }
    }, [resetSelection]);

    // Função para alternar a visibilidade das colunas
    const handleColumnToggle = (columnKey: string) => {
        if (selectedColumns.includes(columnKey)) {
            setSelectedColumns(selectedColumns.filter(key => key !== columnKey));
        } else {
            setSelectedColumns([...selectedColumns, columnKey]);
        }
    };

    // Atualiza o estado de seleção de funcionários
    const handleSelectedRowsChange = (selectedRows: Employee[]) => {
        setSelectedRows(selectedRows);
    };

    // Função para resetar as colunas
    const handleResetColumns = () => {
        setSelectedColumns(defaultColumns);
    };

    // Função para selecionar todas as colunas
    const handleSelectAllColumns = () => {
        const allColumnKeys = employeeFields.map(field => field.key);
        setSelectedColumns(allColumnKeys);
    };

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return employeeFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <PersonsProvider>
            <div className="main-container">
                <NavBar style={{ backgroundColor: navbarColor }} />
                <div className="content-container">
                    <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                        <div className="treeview-container">
                            <TreeViewData onSelectEmployees={handleSelectEmployees} />
                        </div>
                        <div className="datatable-container">
                            <div className="datatable-title-text">
                                <span style={{ color: '#000000' }}>Pessoas</span>
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
                                <div className="buttons-container">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
                                    >
                                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshEmployees} iconSize='1.1em' />
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
                                        <CustomOutlineButton icon="bi-eye" onClick={() => setShowColumnSelector(true)} iconSize='1.1em' />
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip className="custom-tooltip">Apagar Selecionados</Tooltip>}
                                    >
                                        <CustomOutlineButton icon="bi bi-trash-fill" onClick={handleSelectedEmployeesToDelete} iconSize='1.1em' />
                                    </OverlayTrigger>
                                    <ExportButton allData={filteredData} selectedData={selectedRows.length > 0 ? selectedRows : filteredData} fields={getSelectedFields()} />
                                    <PrintButton data={selectedRows.length > 0 ? selectedRows : filteredData} fields={getSelectedFields()} />
                                </div>
                            </div>
                            <PersonsDataTable
                                selectedEmployeeIds={selectedEmployeeIds}
                                selectedColumns={selectedColumns}
                                showAllEmployees={showAllEmployees}
                                filterText={filterText}
                                filteredEmployees={setFilteredData}
                                resetSelection={resetSelection}
                                data={data}
                                onRefreshData={setData}
                                filteredData={filteredData}
                                onDuplicate={handleDuplicate}
                                onSelectedRowsChange={handleSelectedRowsChange}
                                clearSelectedRows={clearSelectionToggle}
                            />
                        </div>
                    </Split>
                </div>
                <Footer style={{ backgroundColor: footerColor }} />
                {showAddModal && (
                    <CreateModalEmployees
                        title="Adicionar Pessoa"
                        open={showAddModal}
                        onClose={() => setShowAddModal(false)}
                        onSave={addEmployeeAndCard}
                        fields={employeeFields}
                        initialValues={initialData || {}}
                    />
                )}
                {showColumnSelector && (
                    <ColumnSelectorModal
                        columns={employeeFields}
                        selectedColumns={selectedColumns}
                        onClose={() => setShowColumnSelector(false)}
                        onColumnToggle={handleColumnToggle}
                        onResetColumns={handleResetColumns}
                        onSelectAllColumns={handleSelectAllColumns}
                    />
                )}
                {showDeleteModal && (
                    <DeleteModal
                        open={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                        onDelete={startDeletionProcess}
                        entityId={selectedEmployeeToDelete}
                    />
                )}
            </div>
        </PersonsProvider>
    );
};