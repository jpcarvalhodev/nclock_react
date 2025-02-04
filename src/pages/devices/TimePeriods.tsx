import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import Split from "react-split";

import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { customStyles } from "../../components/CustomStylesDataTable";
import { ExportButton } from "../../components/ExportButton";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { PrintButton } from "../../components/PrintButton";
import { SelectFilter } from "../../components/SelectFilter";
import { TreeViewDataPeriods } from "../../components/TreeViewPeriods";
import { useNavbar } from "../../context/NavbarContext";
import { useTerminals } from "../../context/TerminalsContext";
import { timePeriodFields } from "../../fields/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { CreateModalPeriods } from "../../modals/CreateModalPeriods";
import { DeleteModal } from "../../modals/DeleteModal";
import { UpdateModalPeriods } from "../../modals/UpdateModalPeriods";
import { TimePeriod } from "../../types/Types";

// Define a interface para as propriedades do componente CustomSearchBox
function CustomSearchBox(props: TextFieldProps) {
    return (
        <TextField
            {...props}
            className="SearchBox"
        />
    );
}

export const TimePeriods = () => {
    const { navbarColor, footerColor } = useNavbar();
    const { period, fetchTimePeriods, handleAddPeriod, handleUpdatePeriod, handleDeletePeriod } = useTerminals();
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo', 'Feriado']);
    const [filterText, setFilterText] = useState("");
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPeriodToDelete, setSelectedPeriodToDelete] = useState<string | null>(null);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredPeriods, setFilteredPeriods] = useState<TimePeriod[]>([]);
    const [initialData, setInitialData] = useState<Partial<TimePeriod> | null>(null);
    const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0);
    const [selectedRows, setSelectedRows] = useState<TimePeriod[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);

    // Função para adicionar um período
    const addPeriod = async (newPeriod: Partial<TimePeriod>) => {
        await handleAddPeriod(newPeriod);
        setClearSelectionToggle((prev) => !prev);
    }

    // Função para atualizar um período
    const updatePeriod = async (updatedPeriod: TimePeriod) => {
        await handleUpdatePeriod(updatedPeriod);
        setClearSelectionToggle((prev) => !prev);
    }

    // Função para eliminar um período
    const deletePeriod = async (id: string) => {
        await handleDeletePeriod(id);
        setClearSelectionToggle((prev) => !prev);
    }

    // Busca os utilizadores ao carregar a página
    useEffect(() => {
        fetchTimePeriods();
    }, []);

    // Atualiza os nomes filtrados da treeview
    useEffect(() => {
        if (selectedDevicesIds.length > 0) {
            const filtered = period.filter(periods => selectedDevicesIds.includes(periods.id));
            setFilteredPeriods(filtered);
        } else {
            setFilteredPeriods(period);
        }
    }, [selectedDevicesIds, period]);

    // Função para atualizar os utilizadores
    const refreshPeriods = () => {
        fetchTimePeriods();
        setClearSelectionToggle((prev) => !prev);
    };

    // Define a seleção da árvore
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        setSelectedDevicesIds(selectedIds);
    };

    // Função para editar um utilizador
    const handleEditPeriod = (period: TimePeriod) => {
        setSelectedPeriod(period);
        setShowUpdateModal(true);
    };

    // Fecha o modal de edição de utilizadores
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedPeriod(null);
    };

    // Define a abertura do modal de apagar
    const handleOpenDeleteModal = (id: string) => {
        setSelectedPeriodToDelete(id);
        setShowDeleteModal(true);
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
        setSelectedColumns(['name', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo', 'Feriado']);
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
    const filteredDataTable = filteredPeriods.filter(getCoin =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (getCoin[key] != null && String(getCoin[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(getCoin).some(([key, value]) => {
            if (selectedColumns.includes(key) && value != null) {
                if (value instanceof Date) {
                    return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
                } else {
                    return value.toString().toLowerCase().includes(filterText.toLowerCase());
                }
            }
            return false;
        })
    )

    // Define a função de seleção de linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: TimePeriod[];
    }) => {
        setSelectedRows(state.selectedRows);
    };

    // Seleciona a entidade anterior
    const handleNextPeriod = () => {
        if (currentPeriodIndex < period.length - 1) {
            setCurrentPeriodIndex(currentPeriodIndex + 1);
            setSelectedPeriod(period[currentPeriodIndex + 1]);
        }
    };

    // Seleciona a entidade seguinte
    const handlePrevPeriod = () => {
        if (currentPeriodIndex > 0) {
            setCurrentPeriodIndex(currentPeriodIndex - 1);
            setSelectedPeriod(period[currentPeriodIndex - 1]);
        }
    };

    // Função para duplicar um período
    const handleDuplicate = (entity: Partial<TimePeriod>) => {
        setShowAddModal(true);
        setInitialData(entity);
        setSelectedPeriod(null);
        setShowUpdateModal(false);
    }

    // Define as colunas excluídas
    const excludedColumns = timePeriodFields
        .filter(field =>
            (field.key.includes('Start') || field.key.includes('End'))
        )
        .map(field => field.key);

    // Define as colunas dos dias da semana para o nesting
    const dayColumns = [
        { day: 'monday', label: 'Segunda' },
        { day: 'tuesday', label: 'Terça' },
        { day: 'wednesday', label: 'Quarta' },
        { day: 'thursday', label: 'Quinta' },
        { day: 'friday', label: 'Sexta' },
        { day: 'saturday', label: 'Sábado' },
        { day: 'sunday', label: 'Domingo' },
    ];

    // Define as colunas da tabela
    const columns: TableColumn<TimePeriod>[] = [
        ...timePeriodFields
            .filter(field => !dayColumns.find(dc => field.key.includes(dc.day)) && selectedColumns.includes(field.key) && !excludedColumns.includes(field.key))
            .map(field => ({
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredDataTable} />
                    </>
                ),
                selector: (row: TimePeriod) => formatField(row, field.key),
                sortable: true,
            })),
        ...dayColumns.map(({ day, label }) => ({
            name: label,
            selector: (row: TimePeriod) => `${row[`${day}Start1`] || ''} - ${row[`${day}End1`] || ''}`,
            sortable: true,
            cell: (row: TimePeriod) => `${row[`${day}Start1`] || ''} - ${row[`${day}End1`] || ''}`,
            columns: [
                {
                    name: 'Início',
                    selector: (row: TimePeriod) => row[`${day}Start1`] || '',
                    sortable: true,
                    cell: (row: TimePeriod) => row[`${day}Start1`] || '',
                },
                {
                    name: 'Fim',
                    selector: (row: TimePeriod) => row[`${day}End1`] || '',
                    sortable: true,
                    cell: (row: TimePeriod) => row[`${day}End1`] || '',
                },
            ]
        }))
    ];
    function formatField(row: TimePeriod, key: string): any {
        switch (key) {
            case 'initFlag':
                return row[key] ? 'Activo' : 'Inactivo';
            default:
                return row[key];
        }
    }

    // Define a coluna de ações
    const actionColumn: TableColumn<TimePeriod> = {
        name: 'Ações',
        cell: (row: TimePeriod) => (
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
                    <CustomOutlineButton className="action-button" icon='bi bi-pencil-fill' onClick={() => handleEditPeriod(row)} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Apagar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-trash-fill' onClick={() => handleOpenDeleteModal(row.id)} />
                </OverlayTrigger>
            </div>
        ),
        selector: (row: TimePeriod) => row.id,
        ignoreRowClick: true,
    };

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return timePeriodFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='content-container'>
                <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewDataPeriods onSelectDevices={handleSelectFromTreeView} />
                    </div>
                    <div className="datatable-container">
                        <div className="datatable-title-text">
                            <span style={{ color: '#000000' }}>Períodos de Horários</span>
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
                                    <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshPeriods} />
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
                                onRowDoubleClicked={handleEditPeriod}
                                pagination
                                paginationComponentOptions={paginationOptions}
                                paginationPerPage={20}
                                clearSelectedRows={clearSelectionToggle}
                                selectableRows
                                onSelectedRowsChange={handleRowSelected}
                                noDataComponent="Não existem dados disponíveis para exibir."
                                customStyles={customStyles}
                                striped
                            />
                        </div>
                    </div>
                </Split>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            <CreateModalPeriods
                title="Adicionar Período"
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={addPeriod}
                fields={timePeriodFields}
                initialValuesData={initialData || {}}
            />
            {selectedPeriod && (
                <UpdateModalPeriods
                    open={showUpdateModal}
                    onClose={handleCloseUpdateModal}
                    onUpdate={updatePeriod}
                    entity={selectedPeriod}
                    fields={timePeriodFields}
                    onDuplicate={handleDuplicate}
                    title="Atualizar Período"
                    canMoveNext={currentPeriodIndex < period.length - 1}
                    canMovePrev={currentPeriodIndex > 0}
                    onNext={handleNextPeriod}
                    onPrev={handlePrevPeriod}
                />
            )}
            <DeleteModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={deletePeriod}
                entityId={selectedPeriodToDelete}
            />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={timePeriodFields.filter(field => !excludedColumns.includes(field.key))}
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