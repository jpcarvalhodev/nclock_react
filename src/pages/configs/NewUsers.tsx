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

export const NewUsers = () => {
    const { navbarColor, footerColor } = useColor();
    const [users, setUsers] = useState<Register[]>([]);
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name', 'userName', 'emailAddress', 'roles']);
    const [filterText, setFilterText] = useState("");
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Register | null>(null);

    // Função para buscar os dados dos usuários registados
    const fetchUsers = async () => {
        try {
            const data = await apiService.fetchAllRegisteredUsers();
            setUsers(data);
        } catch (error) {
            console.error('Erro ao buscar os dados dos usuários registados:', error);
        }
    };

    // Função para adicionar usuários registados
    const handleAddUsers = async (user: Register) => {
        try {
            const data = await apiService.addNewRegisteredUser(user as Register);
            setUsers([...users, data]);
            toast.success(data.value || 'Usuário adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar o usuário registado:', error);
        } finally {
            refreshUsers();
        }
    }

    // Função para atualizar usuários registados
    const handleUpdateUser = async (user: Register) => {
        try {
            const data = await apiService.updateRegisteredUser(user as Register);
            const updatedUsers = users.map(u => u.id === data.id ? data : u);
            setUsers(updatedUsers);
            toast.success(data.value || 'Usuário atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar o usuário registado:', error);
        } finally {
            refreshUsers();
        }
    }

    // Busca os utilizadores ao carregar a página
    useEffect(() => {
        fetchUsers();
    }, []);

    // Função para atualizar os utilizadores
    const refreshUsers = () => {
        fetchUsers();
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

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Filtra os dados da tabela
    const filteredDataTable = users.filter(user =>
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
                    default:
                        return row[field.key] || '';
                }
            };
            return {
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
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
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