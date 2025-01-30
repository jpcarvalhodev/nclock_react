import { TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";

import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { customStyles } from "../../components/CustomStylesDataTable";
import { ExportButton } from "../../components/ExportButton";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { PrintButton } from "../../components/PrintButton";
import { SelectFilter } from "../../components/SelectFilter";
import { useNavbar } from "../../context/NavbarContext";
import { useTerminals } from "../../context/TerminalsContext";
import { accessControlFields } from "../../fields/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { CreateAccessControlModal } from "../../modals/CreateAccessControlModal";
import { DeleteModal } from "../../modals/DeleteModal";
import { UpdateAccessControlModal } from "../../modals/UpdateAccessControlModal";
import { AccessControl } from "../../types/Types";

// Define a interface para as propriedades do componente CustomSearchBox
function CustomSearchBox(props: TextFieldProps) {
    return (
        <TextField
            {...props}
            className="SearchBox"
        />
    );
}

export const AccessControls = () => {
    const { navbarColor, footerColor } = useNavbar();
    const { accessControl, fetchAccessControl, handleAddAccessControl, handleUpdateAccessControl, handleDeleteAccessControl } = useTerminals();
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['nome', 'activo']);
    const [selectedRows, setSelectedRows] = useState<AccessControl[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState<boolean>(false);
    const [openColumnSelector, setOpenColumnSelector] = useState<boolean>(false);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [filterText, setFilterText] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAccessToDelete, setSelectedAccessToDelete] = useState<any | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedAccessControl, setSelectedAccessControl] = useState<AccessControl | null>(null);
    const [initialData, setInitialData] = useState<Partial<AccessControl> | null>(null);

    // Função para adicionar o controle de acesso
    const addAccessControl = async (newAccessControl: Partial<AccessControl>) => {
        await handleAddAccessControl(newAccessControl);
        refreshAccessControl();
        setClearSelectionToggle((prev) => !prev);
    };

    // Função para editar o controle de acesso
    const updateAccessControl = async (newAccessControl: Partial<AccessControl>) => {
        await handleUpdateAccessControl(newAccessControl);
        setClearSelectionToggle((prev) => !prev);
        refreshAccessControl();
    };

    // Função para deletar o controle de acesso
    const deleteAccessControl = async (id: string) => {
        await handleDeleteAccessControl(id);
        setClearSelectionToggle((prev) => !prev);
        refreshAccessControl();
    }

    // Função para atualizar as listagens de movimentos
    const refreshAccessControl = () => {
        fetchAccessControl();
        setClearSelectionToggle((prev) => !prev);
    };

    // Ordena a lista de accessControl por nome
    const sortedAccessControl = [...accessControl].sort((a, b) => {
        const aNome = a.nome || '';
        const bNome = b.nome || '';
        return aNome.localeCompare(bNome);
    });

    // Função para selecionar as colunas
    const toggleColumn = (columnName: string) => {
        if (selectedColumns.includes(columnName)) {
            setSelectedColumns(selectedColumns.filter(col => col !== columnName));
        } else {
            setSelectedColumns([...selectedColumns, columnName]);
        }
    };

    // Função para resetar as colunas
    const resetColumns = () => {
        setSelectedColumns(['nome', 'activo']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Define a função de seleção de linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: AccessControl[];
    }) => {
        setSelectedRows(state.selectedRows);
    };

    // Define a função de edição de controle de acesso
    const handleEditAccessControl = (accessControl: AccessControl) => {
        setSelectedAccessControl(accessControl);
        setShowUpdateModal(true);
    };

    // Define a abertura do modal de apagar controle de acesso
    const handleOpenDeleteModal = (accessControl: string) => {
        setSelectedAccessToDelete(accessControl);
        setShowDeleteModal(true);
    };

    // Fecha o modal de atualização de controle de acesso
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedAccessControl(null);
        refreshAccessControl();
    };

    // Define a função de duplicar funcionários
    const handleDuplicate = (data: Partial<AccessControl>) => {
        setInitialData(data);
        setShowAddModal(true);
        setSelectedAccessControl(null);
        setShowUpdateModal(false);
    }

    // Função para selecionar o próximo controle de acesso
    const handleNextAccessControl = () => {
        const currentIndex = sortedAccessControl.findIndex(
            (control) => control.id === selectedAccessControl?.id
        );
        if (currentIndex >= 0 && currentIndex < sortedAccessControl.length - 1) {
            setSelectedAccessControl(sortedAccessControl[currentIndex + 1]);
        }
    };

    // Função para selecionar o controle de acesso anterior
    const handlePrevAccessControl = () => {
        const currentIndex = sortedAccessControl.findIndex(
            (control) => control.id === selectedAccessControl?.id
        );
        if (currentIndex > 0) {
            setSelectedAccessControl(sortedAccessControl[currentIndex - 1]);
        }
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Filtra os dados da tabela
    const filteredDataTable = sortedAccessControl.filter(accessControls =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (accessControls[key] != null && String(accessControls[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(accessControls).some(([key, value]) => {
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

    // Define a coluna de ações
    const actionColumn: TableColumn<AccessControl> = {
        name: 'Ações',
        cell: (row: AccessControl) => (
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
                    <CustomOutlineButton className="action-button" icon='bi bi-pencil-fill' onClick={() => handleEditAccessControl(row)} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Apagar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-trash-fill' onClick={() => handleOpenDeleteModal(row.id)} />
                </OverlayTrigger>
            </div>
        ),
        selector: (row: AccessControl) => row.id,
        ignoreRowClick: true,
    };

    // Define as colunas da tabela
    const columns: TableColumn<AccessControl>[] = accessControlFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: AccessControl) => {
                switch (field.key) {
                    case 'activo':
                        return row[field.key] ? 'Activo' : 'Inactivo';
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredDataTable} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return accessControlFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="datatable-container" style={{ flex: 1 }}>
                <div className="datatable-title-text">
                    <span style={{ color: '#000000' }}>Planos de Acessos</span>
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
                            <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshAccessControl} />
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
                            <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        </OverlayTrigger>
                        <ExportButton allData={filteredDataTable} selectedData={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={getSelectedFields()} />
                        <PrintButton data={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={getSelectedFields()} />
                    </div>
                </div>
                <div className='table-css'>
                    <DataTable
                        columns={[...columns, actionColumn]}
                        data={filteredDataTable}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        paginationPerPage={20}
                        onRowDoubleClicked={handleEditAccessControl}
                        selectableRows
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={clearSelectionToggle}
                        selectableRowsHighlight
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
                        striped
                    />
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={accessControlFields.filter(field => field.key === 'nome' || field.key === 'activo')}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
                />
            )}
            {selectedAccessToDelete && (
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={deleteAccessControl}
                    entityId={selectedAccessToDelete}
                />
            )}
            <CreateAccessControlModal
                title="Adicionar Plano de Acesso"
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={addAccessControl}
                initialValuesData={initialData || {}}
            />
            {selectedAccessControl && (
                <UpdateAccessControlModal
                    title="Atualizar Plano de Acesso"
                    open={showUpdateModal}
                    onClose={handleCloseUpdateModal}
                    onDuplicate={handleDuplicate}
                    onUpdate={updateAccessControl}
                    entity={selectedAccessControl}
                    onPrev={handlePrevAccessControl}
                    onNext={handleNextAccessControl}
                    canMovePrev={selectedAccessControl && accessControl.findIndex((control) => control.id === selectedAccessControl.id) > 0}
                    canMoveNext={selectedAccessControl && accessControl.findIndex((control) => control.id === selectedAccessControl.id) < accessControl.length - 1}
                />
            )}
        </div>
    );
}