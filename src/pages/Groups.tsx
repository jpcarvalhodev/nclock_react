import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Group } from "../helpers/Types";
import Button from "react-bootstrap/esm/Button";
import { DeleteModal } from "../modals/DeleteModal";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { fetchWithAuth } from "../components/FetchWithAuth";
import { groupFields } from "../helpers/Fields";
import { ExportButton } from "../components/ExportButton";
import { toast } from "react-toastify";
import { ExpandedComponentGeneric } from "../components/ExpandedComponentGeneric";
import { CreateModalDeptGrp } from "../modals/CreateModalDeptGrp";
import { UpdateModalDeptGrp } from "../modals/UpdateModalDeptGrp";
import { customStyles } from "../components/CustomStylesDataTable";

// Define a página de grupos
export const Groups = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedGroupForDelete, setSelectedGroupForDelete] = useState<string | null>(null);

    // Função para buscar os grupos
    const fetchGroups = async () => {
        try {
            const response = await fetchWithAuth('Groups', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                toast.error('Erro ao buscar os dados dos grupos');
            }

            const data = await response.json();
            setGroups(data);
        } catch (error) {
            console.error('Erro ao buscar os dados dos grupos:', error);
        }
    };

    // Função para adicionar um grupo
    const handleAddGroup = async (group: Group) => {
        try {
            const response = await fetchWithAuth('Groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(group)
            });

            if (!response.ok) {
                toast.error('Erro ao adicionar novo grupo');
            }

            const data = await response.json();
            setGroups([...groups, data]);
            toast.success('Grupo adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar novo grupo:', error);
        }
        setShowAddModal(false);
        refreshGroups();
    };

    // Função para atualizar um grupo
    const handleUpdateGroup = async (group: Group) => {
        try {
            const response = await fetchWithAuth(`Groups/${group.groupID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(group)
            });

            if (!response.ok) {
                toast.error(`Erro ao atualizar grupo`);
                return;
            }

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const updatedGroup = await response.json();
                setGroups(groups => groups.map(g => g.groupID === updatedGroup.groupID ? updatedGroup : g));
                toast.success('Grupo atualizado com sucesso!');
            } else {
                await response.text();
                toast.success(response.statusText || 'Atualização realizada com sucesso');
            }
        } catch (error) {
            console.error('Erro ao atualizar grupo:', error);
            toast.error('Falha ao conectar ao servidor');
        } finally {
            setShowUpdateModal(false);
            refreshGroups();
        }
    };

    // Função para apagar um grupo
    const handleDeleteGroup = async (groupID: string) => {
        try {
            const response = await fetchWithAuth(`Groups/${groupID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                toast.error('Erro ao apagar grupo');
            }

            toast.success('Grupo apagado com sucesso!');
        } catch (error) {
            console.error('Erro ao apagar grupo:', error);
        }
        refreshGroups();
    };

    // Busca os grupos ao carregar a página
    useEffect(() => {
        fetchGroups();
    }, []);

    // Função para atualizar os grupos
    const refreshGroups = () => {
        fetchGroups();
    };

    // Função para abrir o modal de adicionar grupo
    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    // Função para fechar o modal de adicionar grupo
    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    // Função para abrir o modal de atualizar grupo
    const handleEditGroup = (group: Group) => {
        setSelectedGroup(group);
        setShowUpdateModal(true);
    };

    // Função para fechar o modal de atualizar grupo
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedGroup(null);
    };

    // Função para abrir o modal de apagar grupo
    const handleOpenDeleteModal = (groupID: string) => {
        setSelectedGroupForDelete(groupID);
        setShowDeleteModal(true);
    };

    // Função para filtrar os grupos
    const filteredItems = groups.filter(item =>
        Object.keys(item).some(key =>
            String(item[key]).toLowerCase().includes(filterText.toLowerCase())
        )
    );

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
        setSelectedColumns(['name']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Opções de paginação de EN em PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Mapeia os nomes das colunas
    const columnNamesMap = groupFields.reduce<Record<string, string>>((acc, field) => {
        acc[field.key] = field.label;
        return acc;
    }, {});

    // Define as colunas da tabela
    const tableColumns = selectedColumns
        .map(columnKey => ({
            name: columnNamesMap[columnKey] || columnKey,
            selector: (row: Record<string, any>) => row[columnKey],
            sortable: true,
        }));

    // Coluna de ações
    const actionColumn: TableColumn<Group> = {
        name: 'Ações',
        cell: (row: Group) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditGroup(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.groupID)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: Group) => row.groupID,
        ignoreRowClick: true,
    };

    return (
        <div className="main-container">
            <NavBar />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span>Grupos</span>
                </div>
                <div className="datatable-header">
                    <div className="search-box">
                        <input
                            className='search-input'
                            type="text"
                            placeholder="Pesquisa"
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                        />
                    </div>
                    <div className="buttons-container-others">
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshGroups} />
                        <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        <ExportButton allData={groups} selectedData={filteredItems} fields={groupFields} />
                    </div>
                </div>
                <CreateModalDeptGrp
                    title="Adicionar Grupo"
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddGroup}
                    fields={groupFields}
                    initialValues={{}}
                    entityType='group'
                />
                {selectedGroup && (
                    <UpdateModalDeptGrp
                        open={showUpdateModal}
                        onClose={() => setShowUpdateModal(false)}
                        onUpdate={handleUpdateGroup}
                        entity={selectedGroup}
                        entityType='group'
                        title="Atualizar Grupo"
                        fields={groupFields}
                    />
                )}
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteGroup}
                    entityId={selectedGroupForDelete}
                />
            </div>
            <div>
                <div className='table-css'>
                    <DataTable
                        columns={[...tableColumns, actionColumn]}
                        data={filteredItems}
                        onRowDoubleClicked={handleEditGroup}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        expandableRows
                        expandableRowsComponent={(props) => <ExpandedComponentGeneric data={props.data} fields={groupFields} />}
                        noDataComponent="Não há dados disponíveis para exibir."
                        customStyles={customStyles}
                    />
                </div>
            </div>
            <Footer />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={groupFields}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
                />
            )}
        </div >
    );
}