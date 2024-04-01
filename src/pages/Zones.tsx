import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import ZonesModal from "../modals/ZonesModal";
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Zone } from "../types/Types";
import Button from "react-bootstrap/esm/Button";

export const Zones = () => {
    const [zones, setZones] = useState<Zone[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name', 'acronym']);

    const fetchZones = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Zones', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching zones data');
                }
                return response.json();
            })
            .then(data => {
                setZones(data);
            })
            .catch(error => console.error('Error fetching the zones', error));
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

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenUpdateModal = (zone: Zone) => {
        setSelectedZone(zone);
        setOpen(true);
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
                <Button variant="outline-primary" onClick={() => handleOpenUpdateModal(row)}>Editar</Button>{' '}
                <Button variant="outline-primary" onClick={() => deleteZone(row.id)}>Apagar</Button>{' '}
            </div>
        ),
        selector: undefined,
    };

    return (
        <div>
            <NavBar />
            <div className='refresh-add-edit-upper-class'>
                <Button variant="outline-primary" onClick={refreshZones}>Atualizar</Button>{' '}
                <Button variant="outline-primary" onClick={handleOpen}>Adicionar</Button>{' '}
                <Button variant="outline-primary" onClick={() => setOpenColumnSelector(true)}>Visualizar</Button>{' '}
                <ZonesModal open={open} onClose={handleClose} zone={selectedZone} />
            </div>
            <div>
                <input
                    className="filter-input"
                    type="text"
                    placeholder="Filter"
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                />
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
}