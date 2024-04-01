import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import GroupsModal from "../modals/GroupsModal";
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Group } from "../types/Types";
import Button from "react-bootstrap/esm/Button";

export const Groups = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name']);

    const fetchGroups = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Groups', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching groups data');
                }
                return response.json();
            })
            .then(data => {
                setGroups(data);
            })
            .catch(error => console.error('Error fetching the groups', error));
    };

    const deleteGroups = (id: string) => {
        fetch(`https://localhost:7129/api/Groups/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deleting group');
                }
                refreshGroups();
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const refreshGroups = () => {
        fetchGroups();
    };

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenUpdateModal = (group: Group) => {
        setSelectedGroup(group);
        setOpen(true);
    };

    const filteredItems = groups.filter(item =>
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
        setSelectedColumns(['name']);
    };

    let tableColumns = selectedColumns.map(columnName => ({
        name: columnName,
        selector: (row: Group) => row[columnName],
        sortable: true,
      }));

    const actionColumn: TableColumn<Group> = {
        name: 'Actions',
        cell: (row: Group) => (
            <div>
                <Button variant="outline-primary" onClick={() => handleOpenUpdateModal(row)}>Editar</Button>{' '}
                <Button variant="outline-primary" onClick={() => deleteGroups(row.id)}>Apagar</Button>{' '}
            </div>
        ),
        selector: undefined,
    };

    return (
        <div>
            <NavBar />
            <div className='refresh-add-edit-upper-class'>
                <Button variant="outline-primary" onClick={refreshGroups}>Atualizar</Button>{' '}
                <Button variant="outline-primary" onClick={handleOpen}>Adicionar</Button>{' '}
                <Button variant="outline-primary" onClick={() => setOpenColumnSelector(true)}>Visualizar</Button>{' '}
                <GroupsModal open={open} onClose={handleClose} group={selectedGroup} />
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