import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { ExternalEntity } from "../types/Types";
import Button from "react-bootstrap/esm/Button";
import { CreateModal } from "../modals/CreateModal";
import { UpdateModal } from "../modals/UpdateModal";

export const ExternalEntities = () => {
    const [externalEntities, setExternalEntities] = useState<ExternalEntity[]>([]);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name', 'nif']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedExternalEntity, setSelectedExternalEntity] = useState<ExternalEntity | null>(null);
    const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

    const fields = [
        { label: 'Name', key: 'name', type: 'string', required: true },
        { label: 'Comments', key: 'comments', type: 'string' },
        { label: 'Commercial Name', key: 'commercialName', type: 'string' },
        { label: 'Responsible Name', key: 'responsibleName', type: 'string' },
        { label: 'Photo', key: 'photo', type: 'string' },
        { label: 'Address', key: 'address', type: 'string' },
        { label: 'ZIP Code', key: 'ZIPCode', type: 'string' },
        { label: 'Locality', key: 'locality', type: 'string' },
        { label: 'Village', key: 'village', type: 'string' },
        { label: 'District', key: 'district', type: 'string' },
        { label: 'Phone', key: 'phone', type: 'number' },
        { label: 'Mobile', key: 'mobile', type: 'number' },
        { label: 'Email', key: 'email', type: 'string' },
        { label: 'WWW', key: 'www', type: 'string' },
        { label: 'Fax', key: 'fax', type: 'number' },
        { label: 'NIF', key: 'nif', type: 'number', required: true },
        { label: 'Date Inserted', key: 'dateInserted', type: 'string' },
        { label: 'Date Updated', key: 'dateUpdated', type: 'string' },
    ];

    const fetchExternalEntities = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://localhost:7129/api/ExternalEntities', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error fetching external entities data');
            }

            const data = await response.json();
            setExternalEntities(data);
        } catch (error) {
            console.error('Error fetching the external entities', error);
        }
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

    const handleAddExternalEntity = async (entity: ExternalEntity) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://localhost:7129/api/ExternalEntities', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entity)
            });

            if (!response.ok) {
                throw new Error('Error adding new external entity');
            }

            const data = await response.json();
            setExternalEntities([...externalEntities, data]);
        } catch (error) {
            console.error('Error adding new external entity:', error);
        }

        handleCloseAddModal();
        refreshExternalEntities();
    };

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleEditExternalEntity = (externalEntity: ExternalEntity) => {
        setSelectedEntityId(externalEntity.id);
        handleOpenUpdateModal(externalEntity)
    };

    const handleOpenUpdateModal = (externalEntity: ExternalEntity) => {
        setSelectedExternalEntity(externalEntity);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const handleUpdateExternalEntity = async (entity: ExternalEntity) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://localhost:7129/api/ExternalEntities/${entity.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entity)
            });

            if (!response.ok) {
                throw new Error('Error updating external entity');
            }

            const updatedEntities = externalEntities.map(item => (item.id === entity.id ? entity : item));
            setExternalEntities(updatedEntities);
        } catch (error) {
            console.error('Error updating external entity:', error);
        }

        handleCloseUpdateModal();
        refreshExternalEntities();
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
                <Button variant="outline-primary" onClick={() => handleEditExternalEntity(row)}>Editar</Button>{' '}
                <Button variant="outline-primary" onClick={() => deleteExternalEntity(row.id)}>Apagar</Button>{' '}
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
                <Button variant="outline-primary" onClick={refreshExternalEntities}>Atualizar</Button>{' '}
                <Button variant="outline-primary" onClick={handleOpenAddModal}>Adicionar</Button>{' '}
                <Button variant="outline-primary" onClick={() => setOpenColumnSelector(true)}>Visualizar</Button>{' '}
                <CreateModal
                    title="Adicionar Entidade Externa"
                    open={showAddModal}
                    onClose={handleCloseAddModal}
                    onSave={handleAddExternalEntity}
                    fields={fields}
                    initialValues={{}}
                />
                {selectedExternalEntity && (
                    <UpdateModal
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={handleUpdateExternalEntity}
                        entity={selectedExternalEntity}
                        fields={fields}
                        title="Atualizar Entidade Externa"
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
        </div>
    );
}
