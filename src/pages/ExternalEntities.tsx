import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { ExternalEntity } from "../helpers/Types";
import Button from "react-bootstrap/esm/Button";
import { CreateModal } from "../modals/CreateModal";
import { UpdateModal } from "../modals/UpdateModal";
import { DeleteModal } from "../modals/DeleteModal";

export const ExternalEntities = () => {
    const [externalEntities, setExternalEntities] = useState<ExternalEntity[]>([]);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['name', 'nif']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedExternalEntity, setSelectedExternalEntity] = useState<ExternalEntity | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedExternalEntityForDelete, setSelectedExternalEntityForDelete] = useState<string | null>(null);

    const fields = [
        { label: 'Nome', key: 'name', type: 'string', required: true },
        { label: 'Comentários', key: 'comments', type: 'string' },
        { label: 'Nome Comercial', key: 'commercialName', type: 'string' },
        { label: 'Nome Responsável', key: 'responsibleName', type: 'string' },
        { label: 'Foto', key: 'photo', type: 'string' },
        { label: 'Morada', key: 'address', type: 'string' },
        { label: 'Código Postal', key: 'ZIPCode', type: 'string' },
        { label: 'Localidade', key: 'locality', type: 'string' },
        { label: 'Freguesia', key: 'village', type: 'string' },
        { label: 'Distrito', key: 'district', type: 'string' },
        { label: 'Telefone', key: 'phone', type: 'number' },
        { label: 'Telemóvel', key: 'mobile', type: 'number' },
        { label: 'E-Mail', key: 'email', type: 'string' },
        { label: 'WWW', key: 'www', type: 'string' },
        { label: 'Fax', key: 'fax', type: 'number' },
        { label: 'NIF', key: 'nif', type: 'number', required: true },
        { label: 'Data Inserida', key: 'dateInserted', type: 'string' },
        { label: 'Data Atualizada', key: 'dateUpdated', type: 'string' },
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

    const handleAddExternalEntity = async (externalEntity: ExternalEntity) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://localhost:7129/api/ExternalEntities', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(externalEntity)
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

    const handleUpdateExternalEntity = async (externalEntity: ExternalEntity) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://localhost:7129/api/ExternalEntities/${externalEntity.externalEntityID}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(externalEntity)
            });

            if (!response.ok) {
                throw new Error('Error updating external entity');
            }

            const updatedExternalEntities = externalEntities.map(entity => {
                return entity.id === externalEntity.id ? externalEntity : entity;
            });
            setExternalEntities(updatedExternalEntities);
        } catch (error) {
            console.error('Error updating external entity:', error);
        }

        handleCloseUpdateModal();
        refreshExternalEntities();
    };

    const handleDeleteExternalEntity = async (externalEntityID: string) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://localhost:7129/api/ExternalEntities/${externalEntityID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error deleting external entity');
            }

            refreshExternalEntities();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchExternalEntities();
    }, []);

    const refreshExternalEntities = () => {
        fetchExternalEntities();
    };

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleEditExternalEntity = (externalEntity: ExternalEntity) => {
        setSelectedExternalEntity(externalEntity);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const handleOpenDeleteModal = (externalEntityID: string) => {
        setSelectedExternalEntityForDelete(externalEntityID);
        setShowDeleteModal(true);
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

    const ExpandedComponent: React.FC<{ data: ExternalEntity }> = ({ data }) => (
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

    const actionColumn: TableColumn<ExternalEntity> = {
        name: 'Ações',
        cell: (row: ExternalEntity) => (
            <div>
                <Button variant="outline-primary" onClick={() => handleEditExternalEntity(row)}>Editar</Button>{' '}
                <Button variant="outline-danger" onClick={() => handleOpenDeleteModal(row.externalEntityID)}>Apagar</Button>{' '}
            </div>
        ),
        selector: (row: ExternalEntity) => row.externalEntityID,
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
                        onUpdate={() => handleUpdateExternalEntity(selectedExternalEntity)}
                        entity={selectedExternalEntity}
                        fields={fields}
                        title="Atualizar Entidade Externa"
                    />
                )}
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteExternalEntity}
                    entityId={selectedExternalEntityForDelete}
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
        </div>
    );
}
