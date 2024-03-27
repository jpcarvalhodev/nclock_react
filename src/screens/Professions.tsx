import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { IconButton } from "@mui/material";
import { PersonAdd, Refresh, Edit, Delete, ViewList } from "@mui/icons-material";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import ProfessionsModal from "../Modals/ProfessionsModal";
import { ColumnSelectorModal } from "../Modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';

export type Profession = {
    [key: string]: any;
    id: string,
    code: number,
    description: string,
    acronym: string,
};

export const Professions = () => {
    const [professions, setProfessions] = useState<Profession[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['code', 'description']);

    const fetchProfessions = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Professions', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching professions data');
                }
                return response.json();
            })
            .then(data => {
                setProfessions(data);
            })
            .catch(error => console.error('Error fetching the professions', error));
    };

    const deleteProfessions = (id: string) => {
        fetch(`https://localhost:7129/api/Professions/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deleting profession');
                }
                refreshProfessions();
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchProfessions();
    }, []);

    const refreshProfessions = () => {
        fetchProfessions();
    };

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenUpdateModal = (profession: Profession) => {
        setSelectedProfession(profession);
        setOpen(true);
    };

    const filteredItems = professions.filter(item =>
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
        setSelectedColumns(['code', 'description']);
    };

    let tableColumns = selectedColumns.map(columnName => ({
        name: columnName,
        selector: (row: Profession) => row[columnName],
        sortable: true,
      }));

    const actionColumn: TableColumn<Profession> = {
        name: 'Actions',
        cell: (row: Profession) => (
            <div>
                <IconButton color="primary" aria-label="edit" onClick={() => handleOpenUpdateModal(row)}>
                    <Edit />
                </IconButton>
                <IconButton color="error" aria-label="delete" onClick={() => deleteProfessions(row.id)}>
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
                <IconButton className='refresh-button' color="primary" aria-label="refresh" onClick={refreshProfessions}>
                    <Refresh />
                </IconButton>
                <IconButton className='add-button' color="primary" aria-label="add-profession" onClick={handleOpen}>
                    <PersonAdd />
                </IconButton>
                <IconButton className='edit-columns' color="primary" aria-label="view-list" onClick={() => setOpenColumnSelector(true)}>
                    <ViewList />
                </IconButton>
                <ProfessionsModal open={open} onClose={handleClose} profession={selectedProfession} />
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
        </div >
    );
}