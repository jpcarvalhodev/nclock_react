import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Group } from "../types/Types";
import Button from "react-bootstrap/esm/Button";
import { CreateModal } from "../modals/CreateModal";
import { UpdateModal } from "../modals/UpdateModal";

export const Groups = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

    const fields = [
        { key: 'name', label: 'Name', type: 'string', required: true },
        { key: 'description', label: 'Description', type: 'string' },
        { key: 'paiID', label: 'Parent ID', type: 'number' },
    ];

    const fetchGroups = async () => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch('https://localhost:7129/api/Groups', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Error fetching groups data');
            }
    
            const data = await response.json();
            setGroups(data);
        } catch (error) {
            console.error('Error fetching the groups', error);
        }
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

    const handleAddGroup = async (newGroup: Group) => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch('https://localhost:7129/api/Groups', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGroup)
            });
    
            if (!response.ok) {
                throw new Error('Error adding new group');
            }
    
            const data = await response.json();
            setGroups([...groups, data]);
        } catch (error) {
            console.error('Error adding new group:', error);
        }
    
        handleCloseAddModal();
        refreshGroups();
    };    

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleEditGroup = (group: Group) => {
        setSelectedGroupId(group.id);
        handleOpenUpdateModal(group);
    };

    const handleOpenUpdateModal = (group: Group) => {
        setSelectedGroup(group);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedGroup(null);
    };

    const handleUpdateGroup = async (updatedGroup: Group) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://localhost:7129/api/Groups/${updatedGroup.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedGroup)
            });

            if (!response.ok) {
                throw new Error('Error updating group');
            }

            const updatedGroups = groups.map(item => (item.id === updatedGroup.id ? updatedGroup : item));
            setGroups(updatedGroups);
        } catch (error) {
            console.error('Error updating group:', error);
        }

        handleCloseUpdateModal();
        refreshGroups();
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
                <Button variant="outline-primary" onClick={() => handleEditGroup(row)}>Editar</Button>{' '}
                <Button variant="outline-primary" onClick={() => deleteGroups(row.id)}>Apagar</Button>{' '}
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
                <Button variant="outline-primary" onClick={refreshGroups}>Atualizar</Button>{' '}
                <Button variant="outline-primary" onClick={handleOpenAddModal}>Adicionar</Button>{' '}
                <Button variant="outline-primary" onClick={() => setOpenColumnSelector(true)}>Visualizar</Button>{' '}
                <CreateModal
                    title="Adicionar Grupo"
                    open={showAddModal}
                    onClose={handleCloseAddModal}
                    onSave={handleAddGroup}
                    fields={fields}
                    initialValues={{}}
                />
                {selectedGroup && (
                    <UpdateModal
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={handleUpdateGroup}
                        entity={selectedGroup}
                        fields={fields}
                        title="Atualizar Grupo"
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
}