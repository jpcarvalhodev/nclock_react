import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Zone } from "../helpers/Types";
import Button from "react-bootstrap/esm/Button";
import { DeleteModal } from "../modals/DeleteModal";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { fetchWithAuth } from "../components/FetchWithAuth";
import { zoneFields } from "../helpers/Fields";
import { ExportButton } from "../components/ExportButton";
import { toast } from "react-toastify";
import { CreateModalZones } from "../modals/CreateModalZones";
import { UpdateModalZones } from "../modals/UpdateModalZones";
import { ExpandedComponentEmpZoneExtEnt } from "../components/ExpandedComponentEmpZoneExtEnt";
import { customStyles } from "../components/CustomStylesDataTable";

export const Zones = () => {
    const [zones, setZones] = useState<Zone[]>([]);
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name', 'acronym']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedZoneForDelete, setSelectedZoneForDelete] = useState<string | null>(null);

    const fetchZones = async () => {
        try {
            const response = await fetchWithAuth('Zones', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                toast.error('Erro ao buscar os dados das zonas');
            }

            const data = await response.json();
            setZones(data);
        } catch (error) {
            console.error('Erro ao buscar os dados das zonas:', error);
        }
    };

    const handleAddZone = async (zone: Zone) => {
        try {
            const response = await fetchWithAuth('Zones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(zone)
            });

            if (!response.ok) {
                toast.error('Erro ao adicionar nova zona');
            }

            const data = await response.json();
            setZones([...zones, data]);
            toast.success('Zona adicionada com sucesso');
        } catch (error) {
            console.error('Erro ao adicionar nova zona:', error);
        }

        setShowAddModal(false);
        refreshZones();
    };

    const handleUpdateZone = async (zone: Zone) => {
        try {
            const response = await fetchWithAuth(`Zones/${zone.zoneID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(zone)
            });

            if (!response.ok) {
                toast.error(`Erro ao atualizar zona`);
                return;
            }

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const updatedZone = await response.json();
                setZones(zones => zones.map(z => z.zoneID === updatedZone.zoneID ? updatedZone : z));
                toast.success('Zona atualizada com sucesso!');
            } else {
                await response.text();
                toast.success('Zona atualizada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao atualizar zona:', error);
            toast.error('Falha ao conectar ao servidor');
        } finally {
            handleCloseUpdateModal();
            refreshZones();
        }
    };

    const handleDeleteZone = async (zoneID: string) => {
        try {
            const response = await fetchWithAuth(`Zones/${zoneID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                toast.error('Erro ao apagar zona');
            }

            toast.success('Zona apagada com sucesso');
        } catch (error) {
            console.error('Erro ao apagar zona:', error);
        }
        refreshZones();
    };

    useEffect(() => {
        fetchZones();
    }, []);

    const refreshZones = () => {
        fetchZones();
    };

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleEditZone = (zone: Zone) => {
        setSelectedZone(zone);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedZone(null);
    };

    const handleOpenDeleteModal = (zoneID: string) => {
        setSelectedZoneForDelete(zoneID);
        setShowDeleteModal(true);
    };

    const filteredItems = zones.filter(item =>
        Object.keys(item).some(key =>
            String(item[key]).toLowerCase().includes(filterText.toLowerCase())
        )
    );

    const toggleColumn = (columnName: string) => {
        if (selectedColumns.includes(columnName)) {
            setSelectedColumns(selectedColumns.filter(col => col !== columnName));
        } else {
            setSelectedColumns([...selectedColumns, columnName]);
        }
    };

    const resetColumns = () => {
        setSelectedColumns(['name', 'acronym']);
    };

    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    const columnNamesMap = zoneFields.reduce<Record<string, string>>((acc, field) => {
        acc[field.key] = field.label;
        return acc;
    }, {});

    const tableColumns = selectedColumns
        .map(columnKey => ({
            name: columnNamesMap[columnKey] || columnKey,
            selector: (row: Record<string, any>) => row[columnKey],
            sortable: true,
        }));

    const expandableRowComponent = (row: Zone) => (
        <ExpandedComponentEmpZoneExtEnt data={row} fields={zoneFields} />
    );

    const actionColumn: TableColumn<Zone> = {
        name: 'Ações',
        cell: (row: Zone) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditZone(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.zoneId)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: Zone) => row.zoneID,
        ignoreRowClick: true,
    };

    return (
        <div className="main-container">
            <NavBar />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span>Zonas</span>
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
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshZones} />
                        <CustomOutlineButton icon="bi-plus" onClick={handleOpenAddModal} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        <ExportButton allData={zones} selectedData={filteredItems} fields={zoneFields} />
                    </div>
                </div>
                <CreateModalZones
                    title="Adicionar Zona"
                    open={showAddModal}
                    onClose={handleCloseAddModal}
                    onSave={handleAddZone}
                    fields={zoneFields}
                    initialValues={{}}
                />
                {selectedZone && (
                    <UpdateModalZones
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={() => handleUpdateZone(selectedZone)}
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
            <div>
                <div className='table-css'>
                    <DataTable
                        columns={[...tableColumns, actionColumn]}
                        data={filteredItems}
                        onRowDoubleClicked={handleEditZone}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        expandableRows
                        expandableRowsComponent={({ data }) => expandableRowComponent(data)}
                        noDataComponent="Não há dados disponíveis para exibir."
                        customStyles={customStyles}
                    />
                </div>
            </div>
            <Footer />
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