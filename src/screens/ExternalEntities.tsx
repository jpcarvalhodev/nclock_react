import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { IconButton } from "@mui/material";
import { PersonAdd, Refresh, Edit, Delete, ViewList } from "@mui/icons-material";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import ExternalEntityModal from "../Modals/ExternalEntitiesModal";
import { ColumnSelectorModal } from "../Modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';

export type ExternalEntity = {
    [key: string]: any;
    id: string,
    name: string,
    Comments: string,
    CommercialName: string,
    ResponsibleName: string,
    Photo: string,
    Address: string,
    ZIPCode: string,
    Locality: string,
    Village: string,
    District: string,
    Phone: number,
    Mobile: number,
    Email: string,
    WWW: string,
    Fax: number,
    NIF: number,
    DateInserted: string,
    DateUpdated: string,
};

export const ExternalEntities = () => {
    const [externalEntities, setExternalEntities] = useState<ExternalEntity[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedExternalEntity, setSelectedExternalEntity] = useState<ExternalEntity | null>(null);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name', 'nif']);

    const fetchExternalEntities = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/ExternalEntities', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching external entities data');
                }
                return response.json();
            })
            .then(data => {
                setExternalEntities(data);
            })
            .catch(error => console.error('Error fetching the external entities', error));
    };

    const deleteExternalEntity = (id: string) => {
        fetch(`https://localhost:7129/api/ExternalEntities/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deleting external entity');
                }
                refreshExternalEntities();
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchExternalEntities();
    }, []);

    const refreshExternalEntities = () => {
        fetchExternalEntities();
    };

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenUpdateModal = (externalEntity: ExternalEntity) => {
        setExternalEntities(externalEntities.filter(e => e.id !== externalEntity.id));
        setOpen(true);
    };

    const filteredItems = externalEntities.filter(item =>
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
        setSelectedColumns(['name', 'nif']);
    };

    let tableColumns = selectedColumns.map(columnName => ({
        name: columnName,
        selector: (row: ExternalEntity) => row[columnName],
        sortable: true,
      }));

    const actionColumn: TableColumn<ExternalEntity> = {
        name: 'Actions',
        cell: (row: ExternalEntity) => (
            <div>
                <IconButton color="primary" aria-label="edit" onClick={() => handleOpenUpdateModal(row)}>
                    <Edit />
                </IconButton>
                <IconButton color="error" aria-label="delete" onClick={() => deleteExternalEntity(row.id)}>
                    <Delete />
                </IconButton>
            </div>
        ),
        selector: undefined,
    };

    return (
        <div>
            <NavBar />
            <div className='refresh-add-edit-upper-class'>
                <IconButton className='refresh-button' color="primary" aria-label="refresh" onClick={refreshExternalEntities}>
                    <Refresh />
                </IconButton>
                <IconButton className='add-button' color="primary" aria-label="add-external-entity" onClick={handleOpen}>
                    <PersonAdd />
                </IconButton>
                <IconButton className='edit-columns' color="primary" aria-label="view-list" onClick={() => setOpenColumnSelector(true)}>
                    <ViewList />
                </IconButton>
                <ExternalEntityModal open={open} onClose={handleClose} externalEntity={selectedExternalEntity} />
            </div>
            <div>
                <input
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
        </div>
    );
}