import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import ExternalEntityModal from "../modals/ExternalEntitiesModal";
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { ExternalEntity } from "../types/Types";
import Button from "react-bootstrap/esm/Button";

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
                <Button variant="outline-primary" onClick={() => handleOpenUpdateModal(row)}>Editar</Button>{' '}
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
                <Button variant="outline-primary" onClick={handleOpen}>Adicionar</Button>{' '}
                <Button variant="outline-primary" onClick={() => setOpenColumnSelector(true)}>Visualizar</Button>{' '}
                <ExternalEntityModal open={open} onClose={handleClose} externalEntity={selectedExternalEntity} />
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