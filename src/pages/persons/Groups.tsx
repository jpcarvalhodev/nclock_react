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
import { groupFields } from "../../helpers/Fields";
import { ExportButton } from "../../components/ExportButton";
import { toast } from "react-toastify";
import { ExpandedComponentGeneric } from "../../components/ExpandedComponentGeneric";
import { CreateModalDeptGrp } from "../../modals/CreateModalDeptGrp";
import { UpdateModalDeptGrp } from "../../modals/UpdateModalDeptGrp";
import { customStyles } from "../../components/CustomStylesDataTable";
import { SelectFilter } from "../../components/SelectFilter";
import * as apiService from "../../helpers/apiService";
import { useColor } from "../../context/ColorContext";
import { PrintButton } from "../../components/PrintButton";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { TextFieldProps, TextField } from "@mui/material";

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

// Define a página de grupos
export const Groups = () => {
    const { navbarColor, footerColor } = useColor();
    const [groups, setGroups] = useState<Group[]>([]);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name', 'description']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedGroupForDelete, setSelectedGroupForDelete] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({});
    const [initialData, setInitialData] = useState<Partial<Group> | null>(null);
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
    const [selectedRows, setSelectedRows] = useState<Group[]>([]);

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
            refreshGroups();
        }
    };

    // Busca os grupos ao carregar a página
    useEffect(() => {
        fetchAllGroups();
    }, []);

    // Atualiza o índice do funcionário selecionado
    useEffect(() => {
        if (selectedGroup) {
            const sortedGroups = groups.sort((a, b) => a.name.localeCompare(b.name));
            const groupIndex = sortedGroups.findIndex(grp => grp.groupID === selectedGroup.groupID);
            setCurrentGroupIndex(groupIndex);
        }
    }, [selectedGroup, groups]);

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

    // Função para selecionar as linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: Group[];
    }) => {
        setSelectedRows(state.selectedRows);
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
        setSelectedColumns(['name', 'description']);
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

    // Seleciona o grupo anterior
    const handleNextGroup = () => {
        if (currentGroupIndex < groups.length - 1) {
            setCurrentGroupIndex(currentGroupIndex + 1);
            setSelectedGroup(groups[currentGroupIndex + 1]);
        }
    };

    // Seleciona o grupo seguinte
    const handlePrevGroup = () => {
        if (currentGroupIndex > 0) {
            setCurrentGroupIndex(currentGroupIndex - 1);
            setSelectedGroup(groups[currentGroupIndex - 1]);
        }
    };

    // Mapeia os nomes das colunas
    const columnNamesMap = groupFields.reduce<Record<string, string>>((acc, field) => {
        acc[field.key] = field.label;
        return acc;
    }, {});

    // Filtra os dados da tabela
    const filteredDataTable = groups.filter(group =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(group[key]) === String(filters[key])
        )
    );

    // Define os dados iniciais ao duplicar
    const handleDuplicate = (entity: Partial<Group>) => {
        setInitialData(entity);
        setShowAddModal(true);
        setSelectedGroup(null);
        setShowUpdateModal(false);
    }

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
            selector: (row: Record<string, any>) => row[columnKey],
            sortable: true,
        }));

    // Coluna de ações
    const actionColumn: TableColumn<Group> = {
        name: 'Ações',
        cell: (row: Group) => (
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
                    <CustomOutlineButton className="action-button" icon='bi bi-pencil-fill' onClick={() => handleEditGroup(row)} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Apagar</Tooltip>}
                >
                    <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.groupID)} >
                        <i className="bi bi-trash-fill"></i>
                    </Button>
                </OverlayTrigger>
            </div>
        ),
        selector: (row: Group) => row.groupID,
        ignoreRowClick: true,
    };

    // Função para gerar os dados com nomes substituídos para o export/print
    const groupWithNames = groups.map(transaction => {

        const groupMatch = groups.find(group => group.paiId === transaction.code);
        const groupName = groupMatch?.name || '';

        return {
            ...transaction,
            paiId: groupName,
        };
    });

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span style={{ color: '#000000' }}>Grupos</span>
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
                            <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshGroups} iconSize='1.1em' />
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
                        <ExportButton allData={groupWithNames} selectedData={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={groupFields} />
                        <PrintButton data={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={groupFields} />
                    </div>
                </div>
                <CreateModalDeptGrp
                    title="Adicionar Grupo"
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddGroup}
                    fields={groupFields}
                    initialValues={initialData || {}}
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
                        onDuplicate={handleDuplicate}
                        onNext={handleNextGroup}
                        onPrev={handlePrevGroup}
                        canMovePrev={currentGroupIndex > 0}
                        canMoveNext={currentGroupIndex < groups.length - 1}
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
                        paginationPerPage={20}
                        selectableRows
                        onSelectedRowsChange={handleRowSelected}
                        expandableRows
                        expandableRowsComponent={(props) => <ExpandedComponentGeneric data={props.data} fields={groupFields} />}
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
                        striped
                        defaultSortAsc={true}
                        defaultSortFieldId="name"
                    />
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
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