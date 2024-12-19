import DataTable, { TableColumn } from "react-data-table-component";
import { useNavbar } from "../../context/NavbarContext";
import { NavBar } from "../../components/NavBar";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { Footer } from "../../components/Footer";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { SelectFilter } from "../../components/SelectFilter";
import { Key, useContext, useEffect, useState } from "react";
import { customStyles } from "../../components/CustomStylesDataTable";
import { AccessControl } from "../../helpers/Types";
import { accessControlFields } from "../../helpers/Fields";
import { CreateAccessControlModal } from "../../modals/CreateAccessControlModal";
import { UpdateAccessControlModal } from "../../modals/UpdateAccessControlModal";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { TreeViewDataAC } from "../../components/TreeViewAccessControl";
import Split from "react-split";
import { ExpandedComponentAC } from "../../components/ExpandedComponentAC";
import { DeleteACModal } from "../../modals/DeleteACModal";
import { PrintButton } from "../../components/PrintButton";
import { ExportButton } from "../../components/ExportButton";
import { TextField, TextFieldProps } from "@mui/material";
import { TerminalsContext, DeviceContextType } from "../../context/TerminalsContext";

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
    const { 
        accessControl,
        fetchAccessControl,
        handleAddAccessControl,
        handleUpdateAccessControl,
        handleDeleteAccessControl
    } = useContext(TerminalsContext) as DeviceContextType;
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['shortName', 'enrollNumber', 'createrName', 'createDate', 'updateDate']);
    const [selectedRows, setSelectedRows] = useState<AccessControl[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState<boolean>(false);
    const [openColumnSelector, setOpenColumnSelector] = useState<boolean>(false);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [filterText, setFilterText] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAccessToDelete, setSelectedAccessToDelete] = useState<AccessControl | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedAccessControl, setSelectedAccessControl] = useState<AccessControl | null>(null);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredAccessControl, setFilteredAccessControl] = useState<AccessControl[]>([]);
    const [initialData, setInitialData] = useState<Partial<AccessControl> | null>(null);
    const [currentAccessControlIndex, setCurrentAccessControlIndex] = useState(0);

    // Função para adicionar o controle de acesso
    const addAccessControl = async (newAccessControl: Partial<AccessControl>) => {
        await handleAddAccessControl(newAccessControl);
        refreshAccessControl();
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Função para editar o controle de acesso
    const updateAccessControl = async (newAccessControl: Partial<AccessControl>) => {
        await handleUpdateAccessControl(newAccessControl);
        setClearSelectionToggle(!clearSelectionToggle);
        refreshAccessControl();
    };

    // Função para deletar o controle de acesso
    const deleteAccessControl = async (employeesId: string[], doorId: string) => {
        await handleDeleteAccessControl(employeesId, doorId);
        setClearSelectionToggle(!clearSelectionToggle);
        refreshAccessControl();
    }

    // Busca as listagens de movimentos ao carregar a página
    useEffect(() => {
        fetchAccessControl();
    }, []);

    // Atualiza os nomes filtrados da treeview
    useEffect(() => {
        if (selectedDevicesIds.length > 0) {
            const filtered = accessControl.filter(ac => ac.acc.some((accItem: AccessControl) => selectedDevicesIds.includes(accItem.acId)));
            setFilteredAccessControl(filtered);
        } else {
            setFilteredAccessControl(accessControl);
        }
    }, [selectedDevicesIds, accessControl]);

    // Função para atualizar as listagens de movimentos
    const refreshAccessControl = () => {
        fetchAccessControl();
        setClearSelectionToggle(!clearSelectionToggle);
    };

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
        setSelectedColumns(['shortName', 'enrollNumber', 'createrName', 'createDate', 'updateDate']);
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
        const sortedAccessControl = state.selectedRows.sort((a, b) => Number(a.enrollNumber) - Number(b.enrollNumber));
        setSelectedRows(sortedAccessControl);
    };

    // Define a função de edição de controle de acesso
    const handleEditAccessControl = (accessControl: AccessControl) => {
        setSelectedAccessControl(accessControl);
        setShowUpdateModal(true);
    };

    // Define a abertura do modal de apagar controle de acesso
    const handleOpenDeleteModal = (accessControl: AccessControl) => {
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

    // Seleciona o controle de acesso anterior
    const handleNextAccessControl = () => {
        if (currentAccessControlIndex < accessControl.length - 1) {
            setCurrentAccessControlIndex(currentAccessControlIndex + 1);
            setSelectedAccessControl(accessControl[currentAccessControlIndex + 1]);
        }
    };

    // Seleciona o controle de acesso seguinte
    const handlePrevAccessControl = () => {
        if (currentAccessControlIndex > 0) {
            setCurrentAccessControlIndex(currentAccessControlIndex - 1);
            setSelectedAccessControl(accessControl[currentAccessControlIndex - 1]);
        }
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define a seleção da árvore
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        setSelectedDevicesIds(selectedIds);
    };

    // Filtra os dados da tabela
    const filteredDataTable = filteredAccessControl.filter(accessControls =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (accessControls[key] != null && String(accessControls[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.values(accessControls).some(value => {
            if (value == null) {
                return false;
            } else if (typeof value === 'number') {
                return value.toString().includes(filterText);
            } else if (value instanceof Date) {
                return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
            } else if (typeof value === 'string') {
                return value.toLowerCase().includes(filterText.toLowerCase());
            }
            return false;
        })
    );

    // Define as colunas que não devem ser exibidas
    const excludedColumns = ['employeesId', 'timezoneId'];

    // Filtra as colunas para remover as colunas excluídas
    const filteredColumns = accessControlFields.filter(column => !excludedColumns.includes(column.key));

    // Define as colunas da tabela
    const columns: TableColumn<AccessControl>[] = accessControlFields
        .filter(field => selectedColumns.includes(field.key))
        .filter(field => !excludedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: AccessControl) => {
                switch (field.key) {
                    case 'doorName':
                        if (row.acc && row.acc.length > 0) {
                            const doorNames = row.acc.map((accItem: AccessControl) => {
                                if (accItem.doorName.endsWith('door3')) {
                                    return 'Torniquete';
                                } else if (accItem.doorName.endsWith('door4')) {
                                    return 'Video Porteiro';
                                } else {
                                    return accItem.doorName || 'Não disponível';
                                }
                            });
                            return doorNames.join(', ');
                        }
                        return 'Sem portas definidas';
                    case 'createDate':
                        return new Date(row.createDate).toLocaleString() || '';
                    case 'updateDate':
                        return new Date(row.updateDate).toLocaleString() || '';
                    case 'enrollNumber':
                        return Number(row.enrollNumber) || 'Número inválido';
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

    // Define as colunas de ação
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
                    <CustomOutlineButton className="action-button" icon='bi bi-trash-fill' onClick={() => handleOpenDeleteModal(row)} />
                </OverlayTrigger>
            </div>
        ),
        selector: (row: AccessControl) => row.acId,
        ignoreRowClick: true,
    };

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return accessControlFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='content-container'>
                <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewDataAC onSelectDevices={handleSelectFromTreeView} />
                    </div>
                    <div className="datatable-container">
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
                                expandableRows
                                expandableRowsComponent={(props) => {
                                    const accessControlEntries = props.data.acc || [];
                                    const sortedEntries = accessControlEntries.sort((a: { doorName: string; }, b: { doorName: string; }) => {
                                        const doorNameA = a.doorName?.toUpperCase() ?? "";
                                        const doorNameB = b.doorName?.toUpperCase() ?? "";
                                        return doorNameA.localeCompare(doorNameB);
                                    });
                                    return (
                                        <div>
                                            {sortedEntries.map((entry: Record<string, any>, index: Key | null | undefined) => (
                                                <ExpandedComponentAC
                                                    key={index}
                                                    data={[entry]}
                                                    fields={[
                                                        { key: 'doorName', label: 'Nome da Porta' },
                                                        { key: 'timezoneName', label: 'Nome do Fuso Horário' }
                                                    ]}
                                                />
                                            ))}
                                        </div>
                                    );
                                }}
                                noDataComponent="Não existem dados disponíveis para exibir."
                                customStyles={customStyles}
                                striped
                                defaultSortAsc={true}
                                defaultSortFieldId='enrollNumber'
                            />
                        </div>
                    </div>
                </Split>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={filteredColumns}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
                />
            )}
            {selectedAccessToDelete && (
                <DeleteACModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={deleteAccessControl}
                    entity={selectedAccessToDelete}
                />
            )}
            <CreateAccessControlModal
                title="Adicionar Acesso"
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={addAccessControl}
                fields={accessControlFields}
                initialValues={initialData || {}}
            />
            {selectedAccessControl && (
                <UpdateAccessControlModal
                    title="Atualizar Acesso"
                    open={showUpdateModal}
                    onClose={handleCloseUpdateModal}
                    onUpdate={updateAccessControl}
                    fields={accessControlFields}
                    entity={selectedAccessControl}
                    onDuplicate={handleDuplicate}
                    onPrev={handlePrevAccessControl}
                    onNext={handleNextAccessControl}
                    canMovePrev={currentAccessControlIndex > 0}
                    canMoveNext={currentAccessControlIndex < accessControl.length - 1}
                />
            )}
        </div>
    );
}