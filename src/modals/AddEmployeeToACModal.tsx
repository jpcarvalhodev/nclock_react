import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/PagesStyles.css';

import DataTable, { TableColumn } from 'react-data-table-component';
import { customStyles } from '../components/CustomStylesDataTable';
import { TreeViewData } from '../components/TreeView';
import Split from 'react-split';
import { Employee } from '../helpers/Types';
import { employeeFields } from '../helpers/Fields';
import { usePersons } from '../context/PersonsContext';

// Interface para as propriedades do modal
interface CreateModalProps<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
}

// Define o componente
export const AddEmployeeToACModal = <T extends Record<string, any>>({ title, open, onClose, onSave }: CreateModalProps<T>) => {
    const {
        data,
    } = usePersons();
    const [formData, setFormData] = useState<T>({} as T);
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
    const [filterText, setFilterText] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [currentEmployeeIndex, setCurrentEmployeeIndex] = useState(0);
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
    const [selectedRows, setSelectedRows] = useState<Employee[]>([]);

    // Atualiza os funcionários filtrados ao abrir o modal
    useEffect(() => {
        if (open)
            setFilteredEmployees(data.employees);
    }, [open, data.employees]);

    // Atualiza os funcionários filtrados com base nos funcionários selecionados
    useEffect(() => {
        if (selectedEmployeeIds.length > 0) {
            const filtered = data.employees.filter(employee => selectedEmployeeIds.includes(employee.employeeID));
            setFilteredEmployees(filtered);
        } else {
            setFilteredEmployees(data.employees);
        }
    }, [selectedEmployeeIds, data.employees]);

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define a seleção da árvore
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        setSelectedEmployeeIds(selectedIds);
    };

    // Define a função selecionar uma linha
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: Employee[];
    }) => {
        const sortedSelectedRows = state.selectedRows.sort((a, b) => parseInt(a.enrollNumber) - parseInt(b.enrollNumber));
        setSelectedRows(sortedSelectedRows);
    };

    // Define as colunas de funcionários
    const selectedColumns = ['enrollNumber', 'name', 'shortName', 'cardNumber']

    // Define as colunas
    const columns: TableColumn<Employee>[] = employeeFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: Employee) => {
                switch (field.key) {
                    case 'cardNumber':
                        return row.employeeCards?.[0]?.cardNumber || '';
                    default:
                        return row[field.key] || '';
                }
            };

            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                    </>
                ),
                selector: (row: Employee) => {
                    if (field.key === 'enrollNumber') {
                        return parseInt(row.enrollNumber) || 0;
                    }
                    return row[field.key] || '';
                },
                sortable: true,
                cell: (row: Employee) => formatField(row)
            };
        });

    // Função para fechar o modal
    const handleClose = () => {
        onClose();
    }

    // Função para salvar os dados
    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static" size="xl" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="content-container">
                    <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                        <div className="treeview-container">
                            <TreeViewData onSelectEmployees={handleSelectFromTreeView} />
                        </div>
                        <div className="datatable-container">
                            <DataTable
                                columns={columns}
                                data={filteredEmployees}
                                pagination
                                paginationComponentOptions={paginationOptions}
                                paginationPerPage={20}
                                selectableRows
                                onSelectedRowsChange={handleRowSelected}
                                clearSelectedRows={clearSelectionToggle}
                                selectableRowsHighlight
                                noDataComponent="Não existem dados disponíveis para exibir."
                                customStyles={customStyles}
                                striped
                                defaultSortAsc={true}
                                defaultSortFieldId='enrollNumber'
                            />
                        </div>
                    </Split>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button variant="outline-secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button variant="outline-primary" onClick={handleSave}>
                    Adicionar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};