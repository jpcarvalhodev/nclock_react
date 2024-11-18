import DataTable, { TableColumn } from "react-data-table-component";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { NavBar } from "../../components/NavBar";
import { useColor } from "../../context/ColorContext";
import { Footer } from "../../components/Footer";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { useEffect, useState } from "react";
import { customStyles } from "../../components/CustomStylesDataTable";
import * as apiService from "../../helpers/apiService";
import { toast } from "react-toastify";
import { SelectFilter } from "../../components/SelectFilter";
import { TimePeriod } from "../../helpers/Types";
import { timePeriodFields } from "../../helpers/Fields";
import { DeleteModal } from "../../modals/DeleteModal";
import { Button } from "react-bootstrap";
import { CreateModalPeriods } from "../../modals/CreateModalPeriods";
import { UpdateModalPeriods } from "../../modals/UpdateModalPeriods";
import { TreeViewDataPeriods } from "../../components/TreeViewPeriods";
import Split from "react-split";
import { set } from "date-fns";

export const TimePeriods = () => {
    const { navbarColor, footerColor } = useColor();
    const [period, setPeriod] = useState<TimePeriod[]>([]);
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

    // Função para buscar os dados dos períodos
    const fetchTimePeriods = async () => {
        try {
            const data = await apiService.fetchAllTimePeriods();
            setPeriod(data);
        } catch (error) {
            console.error('Erro ao buscar os dados dos períodos:', error);
        }
    };

    // Função para adicionar um período
    const handleAddPeriod = async (newPeriod: Partial<TimePeriod>) => {
        try {
            const data = await apiService.addTimePeriod(newPeriod);
            setPeriod([...period, data]);
            toast.success(data.value || 'Período adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar o período:', error);
        } finally {
            refreshPeriods();
        }
    }

    // Função para atualizar um período
    const handleUpdatePeriod = async (updatedPeriod: TimePeriod) => {
        try {
            const data = await apiService.updateTimePeriod(updatedPeriod);
            const updatedPeriods = period.map(p => p.id === data.id ? data : p);
            setPeriod(updatedPeriods);
            toast.success('Período atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar o período:', error);
        } finally {
            refreshPeriods();
        }
    }

    // Função para eliminar um período
    const handleDeletePeriod = async (id: string) => {
        try {
            await apiService.deleteTimePeriod(id);
            toast.success('Período eliminado com sucesso!');
        } catch (error) {
            console.error('Erro ao eliminar o período:', error);
        } finally {
            refreshPeriods();
        }
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
    const filteredDataTable = filteredPeriods.filter(periods =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(periods[key]) === String(filters[key])
        )
    );

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
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditPeriod(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.id)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: TimePeriod) => row.id,
        ignoreRowClick: true,
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
                            <span style={{ color: '#000000' }}>Períodos</span>
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
                                <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshPeriods} />
                                <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                                <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                            </div>
                        </div>
                        <div className='table-css'>
                            <DataTable
                                columns={[...columns, actionColumn]}
                                data={filteredDataTable}
                                onRowDoubleClicked={handleEditPeriod}
                                pagination
                                paginationComponentOptions={paginationOptions}
                                paginationPerPage={15}
                                selectableRows
                                noDataComponent="Não existem dados disponíveis para exibir."
                                customStyles={customStyles}
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
                onSave={handleAddPeriod}
                fields={timePeriodFields}
                initialValuesData={initialData || {}}
            />
            {selectedPeriod && (
                <UpdateModalPeriods
                    open={showUpdateModal}
                    onClose={handleCloseUpdateModal}
                    onUpdate={handleUpdatePeriod}
                    entity={selectedPeriod}
                    fields={timePeriodFields}
                    onDuplicate={handleDuplicate}
                    title="Atualizar Período"
                />
            )}
            <DeleteModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDeletePeriod}
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