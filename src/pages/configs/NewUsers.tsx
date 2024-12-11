import DataTable, { TableColumn } from "react-data-table-component";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { NavBar } from "../../components/NavBar";
import { useColor } from "../../context/ColorContext";
import { Footer } from "../../components/Footer";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { useEffect, useState } from "react";
import { registerFields } from "../../helpers/Fields";
import { customStyles } from "../../components/CustomStylesDataTable";
import { Register } from "../../helpers/Types";
import { SelectFilter } from "../../components/SelectFilter";
import { CreateModalRegisterUsers } from "../../modals/CreateModalRegisterUsers";
import { UpdateModalRegisterUsers } from "../../modals/UpdateModalRegisterUser";
import { ExpandedComponentEmpZoneExtEnt } from "../../components/ExpandedComponentEmpZoneExtEnt";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { DeleteModal } from "../../modals/DeleteModal";
import { usePersons } from "../../context/PersonsContext";
import { ExportButton } from "../../components/ExportButton";
import { PrintButton } from "../../components/PrintButton";
import { TextFieldProps, TextField } from "@mui/material";
import { TreeViewDataUsers } from "../../components/TreeViewRegisteredUsers";
import Split from "react-split";

// Define a interface para as propriedades do componente CustomSearchBox
function CustomSearchBox(props: TextFieldProps) {
    return (
        <TextField
            {...props}
            className="SearchBox"
            InputLabelProps={{
                className: "SearchBox-label"
            }}
            InputProps={{
                className: "SearchBox-input",
                ...props.InputProps,
            }}
        />
    );
}

export const NewUsers = () => {
    const { navbarColor, footerColor } = useColor();
    const { registeredUsers, fetchAllRegisteredUsers, handleAddUsers, handleUpdateUser, handleDeleteUser } = usePersons();
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name', 'userName', 'emailAddress', 'roles']);
    const [filterText, setFilterText] = useState("");
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Register | null>(null);
    const [selectedUserToDelete, setSelectedUserToDelete] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [initialData, setInitialData] = useState<Partial<Register> | null>(null);
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [selectedRows, setSelectedRows] = useState<Register[]>([]);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredData, setFilteredData] = useState<Register[]>([]);

    // Busca os utilizadores ao carregar a página
    useEffect(() => {
        fetchAllRegisteredUsers();
    }, []);

    // Função para atualizar os utilizadores
    const refreshUsers = () => {
        fetchAllRegisteredUsers();
    };

    // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
    useEffect(() => {
        if (selectedDevicesIds.length > 0) {
            const filteredData = registeredUsers.filter(user => selectedDevicesIds.includes(user.name));
            setFilteredData(filteredData);
        } else {
            setFilteredData(registeredUsers);
        }
    }, [selectedDevicesIds, registeredUsers]);

    // Função para editar um utilizador
    const handleEditUsers = (User: Register) => {
        setSelectedUser(User);
        setShowUpdateModal(true);
    };

    // Fecha o modal de edição de utilizadores
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedUser(null);
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
        setSelectedColumns(['name', 'userName', 'emailAddress', 'roles']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Define a abertura do modal de apagar controle de acesso
    const handleOpenDeleteModal = (id: string) => {
        setSelectedUserToDelete(id);
        setShowDeleteModal(true);
    };

    // Função para duplicar um utilizador
    const handleDuplicate = (user: Partial<Register>) => {
        setShowAddModal(true);
        setInitialData(user);
        setSelectedUser(null);
        setShowUpdateModal(false);
    }

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Seleciona a linha da tabela
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: Register[];
    }) => {
        setSelectedRows(state.selectedRows);
    };

    // Define a seleção da árvore
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        setSelectedDevicesIds(selectedIds);
    };

    // Seleciona a entidade anterior
    const handleNextUser = () => {
        if (currentUserIndex < registeredUsers.length - 1) {
            setCurrentUserIndex(currentUserIndex + 1);
            setSelectedUser(registeredUsers[currentUserIndex + 1]);
        }
    };

    // Seleciona a entidade seguinte
    const handlePrevUser = () => {
        if (currentUserIndex > 0) {
            setCurrentUserIndex(currentUserIndex - 1);
            setSelectedUser(registeredUsers[currentUserIndex - 1]);
        }
    };

    // Define o componente de linha expandida
    const expandableRowComponent = (row: Register) => (
        <ExpandedComponentEmpZoneExtEnt data={row} fields={registerFields} />
    );

    // Filtra os dados da tabela
    const filteredDataTable = filteredData.filter(user =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(user[key]) === String(filters[key])
        )
    );

    const excludedColumns = ['id', 'password', 'confirmPassword'];

    // Define as colunas da tabela
    const columns: TableColumn<Register>[] = registerFields
        .filter(field => selectedColumns.includes(field.key))
        .filter(field => !excludedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: Register) => {
                switch (field.key) {
                    case 'roles':
                        return row.roles ? row.roles.join(', ') : 'Conta sem tipo especificado';
                    case 'profileImage':
                        return row.profileImage ? 'Imagem disponível' : 'Sem imagem';
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

    // Define a coluna de ações
    const actionColumn: TableColumn<Register> = {
        name: 'Ações',
        cell: (row: Register) => (
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
                    <CustomOutlineButton className="action-button" icon='bi bi-pencil-fill' onClick={() => handleEditUsers(row)} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Apagar</Tooltip>}
                >
                    <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.id)} >
                        <i className="bi bi-trash-fill"></i>
                    </Button>
                </OverlayTrigger>
            </div>
        ),
        selector: (row: Register) => row.id,
        ignoreRowClick: true,
    };

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='content-container'>
                <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewDataUsers onSelectDevices={handleSelectFromTreeView} />
                    </div>
                    <div className="datatable-container">
                        <div className="datatable-title-text">
                            <span style={{ color: '#000000' }}>Utilizadores</span>
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
                                    <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshUsers} />
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
                                <ExportButton allData={filteredDataTable} selectedData={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={registerFields} />
                                <PrintButton data={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={registerFields} />
                            </div>
                        </div>
                        <div className='content-wrapper'>
                            <div className='table-css'>
                                <DataTable
                                    columns={[...columns, actionColumn]}
                                    data={filteredDataTable}
                                    onRowDoubleClicked={handleEditUsers}
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    paginationPerPage={20}
                                    selectableRows
                                    onSelectedRowsChange={handleRowSelected}
                                    expandableRows
                                    expandableRowsComponent={({ data }) => expandableRowComponent(data)}
                                    noDataComponent="Não existem dados disponíveis para exibir."
                                    customStyles={customStyles}
                                    striped
                                    defaultSortAsc={true}
                                    defaultSortFieldId='name'
                                />
                            </div>
                        </div>
                    </div>
                </Split>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            <CreateModalRegisterUsers
                title="Adicionar Registo de Utilizador"
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleAddUsers}
                fields={registerFields}
                initialValues={initialData || {}}
            />
            {selectedUser && (
                <UpdateModalRegisterUsers
                    open={showUpdateModal}
                    onClose={handleCloseUpdateModal}
                    onUpdate={handleUpdateUser}
                    entity={selectedUser}
                    fields={registerFields}
                    onDuplicate={handleDuplicate}
                    title="Atualizar Registo de Utilizador"
                    canMoveNext={currentUserIndex < registeredUsers.length - 1}
                    canMovePrev={currentUserIndex > 0}
                    onNext={handleNextUser}
                    onPrev={handlePrevUser}
                />
            )}
            <DeleteModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDeleteUser}
                entityId={selectedUserToDelete}
            />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={registerFields.filter(field => !excludedColumns.includes(field.key))}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
                />
            )}
        </div>
    );
}