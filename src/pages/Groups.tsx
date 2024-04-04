import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Group } from "../helpers/Types";
import Button from "react-bootstrap/esm/Button";
import { CreateModal } from "../modals/CreateModal";
import { UpdateModal } from "../modals/UpdateModal";
import { DeleteModal } from "../modals/DeleteModal";

export const Groups = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedGroupForDelete, setSelectedGroupForDelete] = useState<string | null>(null);

    const fields = [
        { key: 'Nome', label: 'Name', type: 'string', required: true },
        { key: 'Descrição', label: 'Description', type: 'string' },
        { key: 'ID de Parente', label: 'Parent ID', type: 'number' },
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

    const handleAddGroup = async (group: Group) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://localhost:7129/api/Groups', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(group)
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

    const handleUpdateGroup = async (group: Group) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://localhost:7129/api/Groups/${group.groupID}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(group)
            });

            if (!response.ok) {
                throw new Error('Error updating group');
            }

            const updatedGroups = groups.map(group => {
                return group.id === group.id ? group : group;
            });
            setGroups(updatedGroups);
        } catch (error) {
            console.error('Error updating group:', error);
        }

        handleCloseUpdateModal();
        refreshGroups();
    };

    const handleDeleteGroup = async (groupID: string) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://localhost:7129/api/Groups/${groupID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error deleting group');
            }

            refreshGroups();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const refreshGroups = () => {
        fetchGroups();
    };

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleEditGroup = (group: Group) => {
        setSelectedGroup(group);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedGroup(null);
    };

    const handleOpenDeleteModal = (groupID: string) => {
        setSelectedGroupForDelete(groupID);
        setShowDeleteModal(true);
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

    const paginationOptions = {
        rowsPerPageText: 'Linhas por página'
    };

    const columnNamesMap = fields.reduce<Record<string, string>>((acc, field) => {
        acc[field.key] = field.label;
        return acc;
    }, {});

    const tableColumns = selectedColumns
        .map(columnKey => ({
            name: columnNamesMap[columnKey] || columnKey,
            selector: (row: Record<string, any>) => row[columnKey],
            sortable: true,
        }));

    const ExpandedComponent: React.FC<{ data: Group }> = ({ data }) => (
        <div className="expanded-details-container">
            {Object.entries(data).map(([key, value], index) => {
                let displayValue = value;
                if (typeof value === 'object' && value !== null) {
                    displayValue = JSON.stringify(value, null, 2);
                }
                const displayName = columnNamesMap[key] || key;
                return !['id', 'algumOutroCampoParaExcluir'].includes(key) && (
                    <p key={index}>
                        <span className="detail-key">{`${displayName}: `}</span>
                        {displayValue}
                    </p>
                );
            })}
        </div>
    );

    const actionColumn: TableColumn<Group> = {
        name: 'Ações',
        cell: (row: Group) => (
            <div>
                <Button variant="outline-primary" onClick={() => handleEditGroup(row)}>Editar</Button>{' '}
                <Button variant="outline-danger" onClick={() => handleOpenDeleteModal(row.groupID)}>Apagar</Button>{' '}
            </div>
        ),
        selector: (row: Group) => row.groupID,
    };

    return (
        <div>
            <NavBar />
            <div className='filter-refresh-add-edit-upper-class'>
                <input
                    className='filter-input'
                    type="text"
                    placeholder="Filtro"
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
                        onUpdate={() => handleUpdateGroup(selectedGroup)}
                        entity={selectedGroup}
                        fields={fields}
                        title="Atualizar Grupo"
                    />
                )}
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteGroup}
                    entityId={selectedGroupForDelete}
                />
            </div>
            <div>
                <div className='table-css'>
                    <DataTable
                        columns={[...tableColumns, actionColumn]}
                        data={filteredItems}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        expandableRows
                        expandableRowsComponent={ExpandedComponent}
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