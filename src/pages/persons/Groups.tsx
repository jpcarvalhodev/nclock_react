import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import '../../css/PagesStyles.css';
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Group } from "../../helpers/Types";
import Button from "react-bootstrap/esm/Button";
import { DeleteModal } from "../../modals/DeleteModal";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { fetchWithAuth } from "../../components/FetchWithAuth";
import { groupFields } from "../../helpers/Fields";
import { ExportButton } from "../../components/ExportButton";
import { toast } from "react-toastify";
import { ExpandedComponentGeneric } from "../../components/ExpandedComponentGeneric";
import { CreateModalDeptGrp } from "../../modals/CreateModalDeptGrp";
import { UpdateModalDeptGrp } from "../../modals/UpdateModalDeptGrp";
import { customStyles } from "../../components/CustomStylesDataTable";
import { SelectFilter } from "../../components/SelectFilter";
import * as apiService from "../../helpers/apiService";

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

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
    const [filters, setFilters] = useState<Filters>({});

    // Função para buscar os grupos
    const fetchAllGroups = async () => {
        try {
            const data = await apiService.fetchAllGroups();
            setGroups(data);
        } catch (error) {
            console.error('Erro ao buscar os dados dos grupos:', error);
        }
    };

    // Função para adicionar um grupo
    const handleAddGroup = async (group: Group) => {
        try {
            const data = await apiService.addGroup(group);
            setGroups([...groups, data]);
            toast.success(data.value || 'Grupo adicionado com sucesso!');

        } catch (error) {
            console.error('Erro ao adicionar novo grupo:', error);
        } finally {
            setShowAddModal(false);
            refreshGroups();
        }
    };

    // Função para atualizar um grupo
    const handleUpdateGroup = async (group: Group) => {
        try {
            const updatedGroup = await apiService.updateGroup(group);
            setGroups(groups => groups.map(g => g.groupID === updatedGroup.groupID ? updatedGroup : g));
            toast.success(updatedGroup.value || 'Grupo atualizado com sucesso!');

        } catch (error) {
            console.error('Erro ao atualizar grupo:', error);
        } finally {
            setShowUpdateModal(false);
            refreshGroups();
        }
    };

    // Função para apagar um grupo
    const handleDeleteGroup = async (groupID: string) => {
        try {
            const deleteGroup = await apiService.deleteGroup(groupID);
            toast.success(deleteGroup.value || 'Grupo apagado com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar grupo:', error);
        } finally {
            setShowDeleteModal(false);
            refreshGroups();
        }
    };

    // Busca os grupos ao carregar a página
    useEffect(() => {
        fetchAllGroups();
    }, []);

    // Função para atualizar os grupos
    const refreshGroups = () => {
        fetchAllGroups();
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
            name: (
                <>
                    {columnNamesMap[columnKey]}
                    <SelectFilter column={columnKey} setFilters={setFilters} data={groups} />
                </>
            ),
            selector: (row: Record<string, any>) => row[columnKey],
            sortable: true,
        }));

    // Filtra os dados da tabela
    const filteredDataTable = groups.filter(group =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(group[key]) === String(filters[key])
        )
    );

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
                        onClose={handleCloseUpdateModal}
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
            <div className='content-wrapper'>
                <div className='table-css'>
                    <DataTable
                        columns={[...tableColumns, actionColumn]}
                        data={filteredDataTable}
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