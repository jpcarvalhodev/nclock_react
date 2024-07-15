import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import '../../css/PagesStyles.css';
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Profession } from "../../helpers/Types";
import Button from "react-bootstrap/esm/Button";
import { DeleteModal } from "../../modals/DeleteModal";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { professionFields } from "../../helpers/Fields";
import { ExportButton } from "../../components/ExportButton";
import { toast } from "react-toastify";
import { ExpandedComponentGeneric } from "../../components/ExpandedComponentGeneric";
import { UpdateModalCatProfTypes } from "../../modals/UpdateModalCatProfTypes";
import { CreateModalCatProfTypes } from "../../modals/CreateModalCatProfTypes";
import { customStyles } from "../../components/CustomStylesDataTable";
import { SelectFilter } from "../../components/SelectFilter";
import * as apiService from "../../helpers/apiService";

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a página de profissões
export const Professions = () => {
    const [professions, setProfessions] = useState<Profession[]>([]);
    const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['code', 'description']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProfessionForDelete, setSelectedProfessionForDelete] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({});

    // Função para buscar as profissões
    const fetchAllProfessions = async () => {
        try {
            const data = await apiService.fetchAllProfessions();
            setProfessions(data);
        } catch (error) {
            console.error('Erro ao buscar os dados das profissões:', error);
        }
    };

    // Função para adicionar uma nova profissão
    const handleAddProfession = async (profession: Profession) => {
        try {
            const data = await apiService.addProfession(profession);
            setProfessions([...professions, data]);
            toast.success(data.value || 'Profissão adicionada com sucesso!');

        } catch (error) {
            console.error('Erro ao adicionar nova profissão:', error);
        } finally {
            setShowAddModal(false);
            refreshProfessions();
        }
    };

    // Função para atualizar uma profissão
    const handleUpdateProfession = async (profession: Profession) => {
        try {
            const updatedProfession = await apiService.updateProfession(profession);
            setProfessions(professions => professions.map(p => p.professionID === updatedProfession.professionID ? updatedProfession : p));
            toast.success(updatedProfession.value || 'Profissão atualizada com sucesso!');

        } catch (error) {
            console.error('Erro ao atualizar a profissão:', error);
        } finally {
            setShowUpdateModal(false);
            refreshProfessions();
        }
    };

    // Função para apagar uma profissão
    const handleDeleteProfessions = async (professionID: string) => {
        try {
            const deleteProfession = await apiService.deleteProfession(professionID);
            toast.success(deleteProfession.value || 'Profissão apagada com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar a profissão:', error);
        } finally {
            setShowDeleteModal(false);
            refreshProfessions();
        }
    };

    // Atualiza a lista de profissões ao carregar a página
    useEffect(() => {
        fetchAllProfessions();
    }, []);

    // Função para atualizar a lista de profissões
    const refreshProfessions = () => {
        fetchAllProfessions();
    };

    // Função para abrir o modal de editar profissão
    const handleEditProfession = (profession: Profession) => {
        setSelectedProfession(profession);
        setShowUpdateModal(true);
    };

    // Fecha o modal de edição de profissão
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedProfession(null);
    };

    // Função para abrir o modal de apagar profissão
    const handleOpenDeleteModal = (professionID: string) => {
        setSelectedProfessionForDelete(professionID);
        setShowDeleteModal(true);
    };

    // Filtra as profissões
    const filteredItems = professions.filter(item =>
        Object.keys(item).some(key =>
            String(item[key]).toLowerCase().includes(filterText.toLowerCase())
        )
    );

    // Função para alternar a visibilidade das colunas
    const toggleColumn = (columnName: string) => {
        if (selectedColumns.includes(columnName)) {
            setSelectedColumns(selectedColumns.filter(col => col !== columnName));
        } else {
            setSelectedColumns([...selectedColumns, columnName]);
        }
    };

    // Função para resetar as colunas
    const resetColumns = () => {
        setSelectedColumns(['code', 'description']);
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
    const columnNamesMap = professionFields.reduce<Record<string, string>>((acc, field) => {
        acc[field.key] = field.label;
        return acc;
    }, {});

    // Define as colunas da tabela
    const tableColumns = selectedColumns
        .map(columnKey => ({
            name: (
                <>
                    {columnNamesMap[columnKey]}
                    <SelectFilter column={columnKey} setFilters={setFilters} data={professions} />
                </>
            ),
            selector: (row: Record<string, any>) => row[columnKey],
            sortable: true,
        }));

    // Filtra os dados da tabela
    const filteredDataTable = professions.filter(profession =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(profession[key]) === String(filters[key])
        )
    );

    // Define a coluna de ações
    const actionColumn: TableColumn<Profession> = {
        name: 'Ações',
        cell: (row: Profession) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditProfession(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.professionID)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: Profession) => row.professionID,
        ignoreRowClick: true,
    };

    return (
        <div className="main-container">
            <NavBar />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span>Profissões</span>
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
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshProfessions} />
                        <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        <ExportButton allData={professions} selectedData={filteredItems} fields={professionFields} />
                    </div>
                </div>
                <CreateModalCatProfTypes
                    title="Adicionar Profissão"
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddProfession}
                    fields={professionFields}
                    initialValues={{}}
                    entityType="profissões"
                />
                {selectedProfession && (
                    <UpdateModalCatProfTypes
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={handleUpdateProfession}
                        entity={selectedProfession}
                        fields={professionFields}
                        title="Atualizar Profissão"
                        entityType="profissões"
                    />
                )}
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteProfessions}
                    entityId={selectedProfessionForDelete}
                />
            </div>
            <div className='content-wrapper'>
                <div className='table-css'>
                    <DataTable
                        columns={[...tableColumns, actionColumn]}
                        data={filteredDataTable}
                        onRowDoubleClicked={handleEditProfession}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        expandableRows
                        expandableRowsComponent={(props) => <ExpandedComponentGeneric data={props.data} fields={professionFields} />}
                        noDataComponent="Não há dados disponíveis para exibir."
                        customStyles={customStyles}
                    />
                </div>
            </div>
            <Footer />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={professionFields}
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
