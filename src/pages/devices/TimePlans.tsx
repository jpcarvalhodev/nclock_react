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
import { timePlanFields } from "../../fields/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { CreateTimePlansModal } from "../../modals/CreateTimePlansModal";
import { DeleteModal } from "../../modals/DeleteModal";
import { UpdateTimePlansModal } from "../../modals/UpdateTimePlansModal";
import { TimePlan } from "../../types/Types";

// Define a interface para as propriedades do componente CustomSearchBox
function CustomSearchBox(props: TextFieldProps) {
    return (
        <TextField
            {...props}
            className="SearchBox"
        />
    );
}

export const TimePlans = () => {
    const { navbarColor, footerColor } = useNavbar();
    const { timePlans, fetchTimePlans, handleAddTimePlan, handleUpdateTimePlan, handleDeleteTimePlan } = useTerminals();
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['nome', 'descricao']);
    const [selectedRows, setSelectedRows] = useState<TimePlan[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState<boolean>(false);
    const [openColumnSelector, setOpenColumnSelector] = useState<boolean>(false);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [filterText, setFilterText] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTimePlanToDelete, setSelectedTimePlanToDelete] = useState<any | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedTimePlan, setSelectedTimePlan] = useState<TimePlan | null>(null);
    const [initialData, setInitialData] = useState<Partial<TimePlan> | null>(null);

    // Função para adicionar o plano de horários
    const addTimePlan = async (newTimePlan: TimePlan) => {
        await handleAddTimePlan(newTimePlan);
        refreshTimePlan();
        setClearSelectionToggle((prev) => !prev);
    };

    // Função para editar o plano de horários
    const updateTimePlan = async (newTimePlan: TimePlan) => {
        await handleUpdateTimePlan(newTimePlan);
        setClearSelectionToggle((prev) => !prev);
        refreshTimePlan();
    };

    // Função para deletar o plano de horários
    const deleteTimePlan = async (planoId: string[]) => {
        await handleDeleteTimePlan(planoId);
        setClearSelectionToggle((prev) => !prev);
        refreshTimePlan();
    }

    // Função para atualizar os planos de horários
    const refreshTimePlan = () => {
        fetchTimePlans();
        setClearSelectionToggle((prev) => !prev);
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
        setSelectedColumns(['nome', 'descricao']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Define a função de seleção de linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: TimePlan[];
    }) => {
        setSelectedRows(state.selectedRows);
    };

    // Define a função de edição de planos de horários
    const handleEditTimePlan = (timePlan: TimePlan) => {
        setSelectedTimePlan(timePlan);
        setShowUpdateModal(true);
    };

    // Define a abertura do modal de apagar planos de horários
    const handleOpenDeleteModal = (timePlan: string) => {
        setSelectedTimePlanToDelete(timePlan);
        setShowDeleteModal(true);
    };

    // Função para deletar vários departamentos
    const handleSelectedTimePlanToDelete = () => {
        const timePlanIds = Array.from(new Set(selectedRows.map(timeplan => timeplan.id)));
        setSelectedTimePlanToDelete(timePlanIds);
        setShowDeleteModal(true);
    };

    // Configurando a função onDelete para iniciar o processo de exclusão
    const startDeletionProcess = () => {
        let timePlanIds;

        if (Array.isArray(selectedTimePlanToDelete)) {
            timePlanIds = selectedTimePlanToDelete;
        } else if (selectedTimePlanToDelete) {
            timePlanIds = [selectedTimePlanToDelete];
        } else {
            timePlanIds = Array.from(new Set(selectedRows.map(timeplan => timeplan.id)));
        }

        setShowDeleteModal(false);
        deleteTimePlan(timePlanIds);
    };

    // Fecha o modal de atualização de planos de horários
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedTimePlan(null);
        refreshTimePlan();
    };

    // Define a função de duplicar funcionários
    const handleDuplicate = (data: TimePlan) => {
        setInitialData(data);
        setShowAddModal(true);
        setSelectedTimePlan(null);
        setShowUpdateModal(false);
    }

    // Ordena os planos de horários por nome
    const sortedTimePlans = [...timePlans].sort((a, b) => (a.nome || "").localeCompare(b.nome || ""));

    // Função para selecionar o próximo plano de horário
    const handleNextTimePlan = () => {
        const currentIndex = sortedTimePlans.findIndex((plan) => plan.nome === selectedTimePlan?.nome);

        if (currentIndex >= 0 && currentIndex < sortedTimePlans.length - 1) {
            setSelectedTimePlan(sortedTimePlans[currentIndex + 1]);
        }
    };

    // Função para selecionar o plano de horário anterior
    const handlePrevTimePlan = () => {
        const currentIndex = sortedTimePlans.findIndex((plan) => plan.nome === selectedTimePlan?.nome);

        if (currentIndex > 0) {
            setSelectedTimePlan(sortedTimePlans[currentIndex - 1]);
        }
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Filtra os dados da tabela
    const filteredDataTable = timePlans.filter(timePlan =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (timePlan[key] != null && String(timePlan[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(timePlan).some(([key, value]) => {
            if (selectedColumns.includes(key) && value != null) {
                if (value instanceof Date) {
                    return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
                } else {
                    return value.toString().toLowerCase().includes(filterText.toLowerCase());
                }
            }
            return false;
        })
    ).sort((a, b) => a.nome.localeCompare(b.nome));

    // Define as colunas da tabela
    const columns: TableColumn<TimePlan>[] = timePlanFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: TimePlan) => {
                switch (field.key) {
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
    const actionColumn: TableColumn<TimePlan> = {
        name: 'Ações',
        cell: (row: TimePlan) => (
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
                    <CustomOutlineButton className="action-button" icon='bi bi-pencil-fill' onClick={() => handleEditTimePlan(row)} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Apagar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-trash-fill' onClick={() => handleOpenDeleteModal(row.id)} />
                </OverlayTrigger>
            </div>
        ),
        selector: (row: TimePlan) => row.id,
        ignoreRowClick: true,
    };

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return timePlanFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="datatable-container" style={{ flex: 1 }}>
                <div className="datatable-title-text">
                    <span style={{ color: '#000000' }}>Planos de Horários</span>
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
                            <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshTimePlan} />
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
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip className="custom-tooltip">Apagar Selecionados</Tooltip>}
                        >
                            <CustomOutlineButton icon="bi bi-trash-fill" onClick={handleSelectedTimePlanToDelete} iconSize='1.1em' />
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
                        onRowDoubleClicked={handleEditTimePlan}
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
                    columns={timePlanFields.filter(field => field.key !== 'periodos')}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
                />
            )}
            {selectedTimePlanToDelete && (
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={startDeletionProcess}
                    entityId={selectedTimePlanToDelete}
                />
            )}
            <CreateTimePlansModal
                title="Adicionar Plano de Horários"
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={addTimePlan}
                initialValuesData={initialData || {}}
            />
            {selectedTimePlan && (
                <UpdateTimePlansModal
                    title="Atualizar Plano de Horários"
                    open={showUpdateModal}
                    onClose={handleCloseUpdateModal}
                    onDuplicate={handleDuplicate}
                    onUpdate={updateTimePlan}
                    entity={selectedTimePlan}
                    onPrev={handlePrevTimePlan}
                    onNext={handleNextTimePlan}
                    canMovePrev={selectedTimePlan && timePlans.findIndex(plan => plan.nome === selectedTimePlan.nome) > 0}
                    canMoveNext={selectedTimePlan && timePlans.findIndex(plan => plan.nome === selectedTimePlan.nome) < timePlans.length - 1}
                />
            )}
        </div>
    );
}