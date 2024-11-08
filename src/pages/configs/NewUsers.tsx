import DataTable, { TableColumn } from "react-data-table-component";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { NavBar } from "../../components/NavBar";
import { useColor } from "../../context/ColorContext";
import { Footer } from "../../components/Footer";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { useEffect, useState } from "react";
import { registerFields } from "../../helpers/Fields";
import { customStyles } from "../../components/CustomStylesDataTable";
import * as apiService from "../../helpers/apiService";
import { Register } from "../../helpers/Types";
import { toast } from "react-toastify";
import { SelectFilter } from "../../components/SelectFilter";
import { CreateModalRegisterUsers } from "../../modals/CreateModalRegisterUsers";
import { UpdateModalRegisterUsers } from "../../modals/UpdateModalRegisterUser";
import { ExpandedComponentEmpZoneExtEnt } from "../../components/ExpandedComponentEmpZoneExtEnt";
import { Button } from "react-bootstrap";
import { DeleteModal } from "../../modals/DeleteModal";
import { usePersons } from "../../context/PersonsContext";

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

    // Busca os utilizadores ao carregar a página
    useEffect(() => {
        fetchAllRegisteredUsers();
    }, []);

    // Função para atualizar os utilizadores
    const refreshUsers = () => {
        fetchAllRegisteredUsers();
    };

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

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define o componente de linha expandida
    const expandableRowComponent = (row: Register) => (
        <ExpandedComponentEmpZoneExtEnt data={row} fields={registerFields} />
    );

    // Filtra os dados da tabela
    const filteredDataTable = registeredUsers.filter(user =>
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
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditUsers(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.id)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: Register) => row.id,
        ignoreRowClick: true,
    };

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span style={{ color: '#000000' }}>Utilizadores</span>
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
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshUsers} />
                        <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                    </div>
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
                        expandableRows
                        expandableRowsComponent={({ data }) => expandableRowComponent(data)}
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
                        defaultSortAsc={true}
                        defaultSortFieldId='name'
                    />
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            <CreateModalRegisterUsers
                title="Adicionar Registo de Utilizador"
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleAddUsers}
                fields={registerFields}
                initialValues={{}}
            />
            {selectedUser && (
                <UpdateModalRegisterUsers
                    open={showUpdateModal}
                    onClose={handleCloseUpdateModal}
                    onUpdate={handleUpdateUser}
                    entity={selectedUser}
                    fields={registerFields}
                    title="Atualizar Registo de Utilizador"
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