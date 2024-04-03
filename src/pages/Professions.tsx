import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Profession } from "../types/Types";
import Button from "react-bootstrap/esm/Button";
import { CreateModal } from "../modals/CreateModal";
import { UpdateModal } from "../modals/UpdateModal";

export const Professions = () => {
    const [professions, setProfessions] = useState<Profession[]>([]);
    const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['code', 'description']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedProfessionId, setSelectedProfessionId] = useState<string | null>(null);

    const fields = [
        { key: 'code', label: 'Code', type: 'string', required: true },
        { key: 'description', label: 'Description', type: 'string', required: true },
        { key: 'acronym', label: 'Acronym', type: 'string' },
    ];

    const fetchProfessions = async () => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch('https://localhost:7129/api/Professions', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Error fetching professions data');
            }
    
            const data = await response.json();
            setProfessions(data);
        } catch (error) {
            console.error('Error fetching the professions', error);
        }
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

    const handleAddProfession = async (profession: Profession) => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch('https://localhost:7129/api/Professions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profession)
            });
    
            if (!response.ok) {
                throw new Error('Error adding new profession');
            }
    
            const data = await response.json();
            setProfessions([...professions, data]);
        } catch (error) {
            console.error('Error adding new profession:', error);
        }

        setShowAddModal(false);
        refreshProfessions();
    };
    
    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleEditProfession = (profession: Profession) => {
        setSelectedProfessionId(profession.id);
        handleOpenUpdateModal(profession);
    };

    const handleOpenUpdateModal = (profession: Profession) => {
        setSelectedProfession(profession);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedProfession(null);
    };

    const handleUpdateProfession = async (updatedProfession: Profession) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://localhost:7129/api/Professions/${updatedProfession.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProfession)
            });

            if (!response.ok) {
                throw new Error('Error updating profession');
            }

            const updatedProfessions = professions.map(item => (item.id === updatedProfession.id ? updatedProfession : item));
            setProfessions(updatedProfessions);
        } catch (error) {
            console.error('Error updating profession:', error);
        }

        handleCloseUpdateModal();
        refreshProfessions();
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
                <Button variant="outline-primary" onClick={() => handleEditProfession(row)}>Editar</Button>{' '}
                <Button variant="outline-primary" onClick={() => deleteProfessions(row.id)}>Apagar</Button>{' '}
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
                <Button variant="outline-primary" onClick={refreshProfessions}>Atualizar</Button>{' '}
                <Button variant="outline-primary" onClick={handleOpenAddModal}>Adicionar</Button>{' '}
                <Button variant="outline-primary" onClick={() => setOpenColumnSelector(true)}>Visualizar</Button>{' '}
                <CreateModal
                    title="Adicionar Profissão"
                    open={showAddModal}
                    onClose={handleCloseAddModal}
                    onSave={handleAddProfession}
                    fields={fields}
                    initialValues={{}}
                />
                {selectedProfession && (
                    <UpdateModal
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={handleUpdateProfession}
                        entity={selectedProfession}
                        fields={fields}
                        title="Atualizar Profissão"
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
