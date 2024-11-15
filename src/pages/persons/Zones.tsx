import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import '../../css/PagesStyles.css';
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Zone } from "../../helpers/Types";
import Button from "react-bootstrap/esm/Button";
import { DeleteModal } from "../../modals/DeleteModal";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { zoneFields } from "../../helpers/Fields";
import { ExportButton } from "../../components/ExportButton";
import { toast } from "react-toastify";
import { CreateModalZones } from "../../modals/CreateModalZones";
import { UpdateModalZones } from "../../modals/UpdateModalZones";
import { ExpandedComponentEmpZoneExtEnt } from "../../components/ExpandedComponentEmpZoneExtEnt";
import { customStyles } from "../../components/CustomStylesDataTable";
import { SelectFilter } from "../../components/SelectFilter";
import * as apiService from "../../helpers/apiService";
import { useColor } from "../../context/ColorContext";
import { id } from "date-fns/locale";
import { PrintButton } from "../../components/PrintButton";

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define a página de Zonas
export const Zones = () => {
    const { navbarColor, footerColor } = useColor();
    const [zones, setZones] = useState<Zone[]>([]);
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name', 'acronym']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedZoneForDelete, setSelectedZoneForDelete] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({});

    // Função para buscar as zonas
    const fetchAllZones = async () => {
        try {
            const data = await apiService.fetchAllZones();
            setZones(data);
        } catch (error) {
            console.error('Erro ao buscar os dados das zonas:', error);
        }
    };

    // Função para adicionar uma zona
    const handleAddZone = async (zone: Zone) => {
        try {
            const data = await apiService.addZone(zone);
            setZones([...zones, data]);
            toast.success(data.value || 'Zona adicionada com sucesso!');

        } catch (error) {
            console.error('Erro ao adicionar nova zona:', error);
        } finally {
            setShowAddModal(false);
            refreshZones();
        }
    };

    // Função para atualizar uma zona
    const handleUpdateZone = async (zone: Zone) => {
        try {
            const updatedZone = await apiService.updateZone(zone);
            setZones(zones => zones.map(z => z.zoneID === updatedZone.zoneID ? updatedZone : z));
            toast.success(updatedZone.value || 'Zona atualizada com sucesso!');

        } catch (error) {
            console.error('Erro ao atualizar zona:', error);
        } finally {
            setShowUpdateModal(false);
            refreshZones();
        }
    };

    // Função para apagar uma zona
    const handleDeleteZone = async (zoneID: string) => {
        try {
            const deleteZone = await apiService.deleteZone(zoneID);
            toast.success(deleteZone.value || 'Zona apagada com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar zona:', error);
        } finally {
            setShowDeleteModal(false);
            refreshZones();
        }
    };

    // Atualiza a lista de zonas ao carregar a página
    useEffect(() => {
        fetchAllZones();
    }, []);

    // Função para atualizar as zonas
    const refreshZones = () => {
        fetchAllZones();
    };

    // Função para abrir o modal de editar zona
    const handleEditZone = (zone: Zone) => {
        setSelectedZone(zone);
        setShowUpdateModal(true);
    };

    // Fecha o modal de edição de zona
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedZone(null);
    };

    // Função para abrir o modal de apagar zona
    const handleOpenDeleteModal = (zoneID: string) => {
        setSelectedZoneForDelete(zoneID);
        setShowDeleteModal(true);
    };

    // Filtra as zonas
    const filteredItems = zones.filter(item =>
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
        setSelectedColumns(['name', 'acronym']);
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

    // Filtra os dados da tabela
    const filteredDataTable = zones.filter(zone =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(zone[key]) === String(filters[key])
        )
    );

    // Define as colunas da tabela
    const columns: TableColumn<Zone>[] = zoneFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: Zone) => {
                switch (field.key) {
                    case 'photo':
                        return row.photo ? 'Imagem disponível' : 'Sem imagem';
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
                selector: (row: Zone) => {
                    if (field.key === 'name') {
                        return row[field.key] ?? '';
                    }
                    return formatField(row);
                },
                sortable: true,
                cell: (row: Zone) => {
                    if (field.key === 'name') {
                        return row[field.key] ?? '';
                    }
                    return formatField(row);
                }
            };
        });

    // Componente de linha expandida
    const expandableRowComponent = (row: Zone) => (
        <ExpandedComponentEmpZoneExtEnt data={row} fields={zoneFields} />
    );

    // Coluna de ações
    const actionColumn: TableColumn<Zone> = {
        name: 'Ações',
        cell: (row: Zone) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditZone(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.zoneID)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: Zone) => row.zoneID,
        ignoreRowClick: true,
    };

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span style={{ color: '#000000' }}>Zonas</span>
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
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshZones} />
                        <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        <ExportButton allData={filteredDataTable} selectedData={filteredItems} fields={zoneFields} />
                        <PrintButton data={filteredDataTable} fields={zoneFields} />
                    </div>
                </div>
                <CreateModalZones
                    title="Adicionar Zona"
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddZone}
                    fields={zoneFields}
                    initialValues={{}}
                />
                {selectedZone && (
                    <UpdateModalZones
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={handleUpdateZone}
                        entity={selectedZone}
                        fields={zoneFields}
                        title="Atualizar Zona"
                    />
                )}
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteZone}
                    entityId={selectedZoneForDelete}
                />
            </div>
            <div className='content-wrapper'>
                <div className='table-css'>
                    <DataTable
                        columns={[...columns, actionColumn]}
                        data={filteredDataTable}
                        onRowDoubleClicked={handleEditZone}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        paginationPerPage={15}
                        selectableRows
                        expandableRows
                        expandableRowsComponent={({ data }) => expandableRowComponent(data)}
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
                        defaultSortAsc={true}
                        defaultSortFieldId="name"
                    />
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={zoneFields}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
                />
            )}
        </div >
    );
};