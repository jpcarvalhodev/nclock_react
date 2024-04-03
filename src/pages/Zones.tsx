import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Zone } from "../types/Types";
import Button from "react-bootstrap/esm/Button";
import { CreateModal } from "../modals/CreateModal";
import { UpdateModal } from "../modals/UpdateModal";

export const Zones = () => {
    const [zones, setZones] = useState<Zone[]>([]);
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name', 'acronym']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);

    const fields = [
        { key: 'type', label: 'Type', type: 'string' },
        { key: 'name', label: 'Name', type: 'string', required: true },
        { key: 'description', label: 'Description', type: 'string' },
        { key: 'acronym', label: 'Acronym', type: 'string', required: true },
        { key: 'address', label: 'Address', type: 'string' },
        { key: 'zipCode', label: 'ZIP Code', type: 'string' },
        { key: 'locality', label: 'Locality', type: 'string' },
        { key: 'village', label: 'Village', type: 'string' },
        { key: 'district', label: 'District', type: 'string' },
        { key: 'phone', label: 'Phone', type: 'number' },
        { key: 'mobile', label: 'Mobile', type: 'number' },
        { key: 'email', label: 'Email', type: 'string' },
    ];

    const fetchZones = async () => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch('https://localhost:7129/api/Zones', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Error fetching zones data');
            }
    
            const data = await response.json();
            setZones(data);
        } catch (error) {
            console.error('Error fetching the zones', error);
        }
    };    

    const deleteZone = (id: string) => {
        fetch(`https://localhost:7129/api/Zones/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deleting zone');
                }
                refreshZones();
            })
            .catch(error => console.error(error));
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

    const handleAddZone = async (zone: Zone) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://localhost:7129/api/Zones', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(zone)
            });

            if (!response.ok) {
                throw new Error('Error adding new zone');
            }

            const data = await response.json();
            setZones([...zones, data]);
        } catch (error) {
            console.error('Error adding new zone:', error);
        }

        setShowAddModal(false);
        refreshZones();
    };

    const handleEditZone = (zone: Zone) => {
        setSelectedZoneId(zone.id);
        handleOpenUpdateModal(zone);
    };

    const handleOpenUpdateModal = (zone: Zone) => {
        setSelectedZone(zone);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedZone(null);
    };

    const handleUpdateZone = async (updatedZone: Zone) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://localhost:7129/api/Zones/${updatedZone.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedZone)
            });

            if (!response.ok) {
                throw new Error('Error updating zone');
            }

            const updatedZones = zones.map(item => (item.id === updatedZone.id ? updatedZone : item));
            setZones(updatedZones);
        } catch (error) {
            console.error('Error updating zone:', error);
        }

        handleCloseUpdateModal();
        refreshZones();
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

    let tableColumns = selectedColumns.map(columnName => ({
        name: columnName,
        selector: (row: Zone) => row[columnName],
        sortable: true,
    }));

    const actionColumn: TableColumn<Zone> = {
        name: 'Actions',
        cell: (row: Zone) => (
            <div>
                <Button variant="outline-primary" onClick={() => handleEditZone(row)}>Editar</Button>{' '}
                <Button variant="outline-primary" onClick={() => deleteZone(row.id)}>Apagar</Button>{' '}
            </div>
        ),
        selector: undefined,
    };

    return (
        <div>
            <NavBar />
            <div className='filter-refresh-add-edit-upper-class'>
                <input
                    className='filter-input'
                    type="text"
                    placeholder="Filter"
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                />
                <Button variant="outline-primary" onClick={refreshZones}>Atualizar</Button>{' '}
                <Button variant="outline-primary" onClick={handleOpenAddModal}>Adicionar</Button>{' '}
                <Button variant="outline-primary" onClick={() => setOpenColumnSelector(true)}>Visualizar</Button>{' '}
                <CreateModal
                    title="Adicionar Zona"
                    open={showAddModal}
                    onClose={handleCloseAddModal}
                    onSave={handleAddZone}
                    fields={fields}
                    initialValues={{}}
                />
                {selectedZone && (
                    <UpdateModal
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={handleUpdateZone}
                        entity={selectedZone}
                        fields={fields}
                        title="Atualizar Zona"
                    />
                )}
            </div>
            <div>
                <div className='table-css'>
                    <DataTable
                        columns={[...tableColumns, actionColumn]}
                        data={filteredItems}
                        pagination
                    />
                </div>
            </div>
            <Footer />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={Object.keys(filteredItems[0])}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                />
            )}
        </div >
    );
};