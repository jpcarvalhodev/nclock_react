import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Profession } from "../helpers/Types";
import Button from "react-bootstrap/esm/Button";
import { CreateModal } from "../modals/CreateModal";
import { UpdateModal } from "../modals/UpdateModal";
import { DeleteModal } from "../modals/DeleteModal";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { fetchWithAuth } from "../components/FetchWithAuth";

export const Professions = () => {
    const [professions, setProfessions] = useState<Profession[]>([]);
    const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['code', 'description']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProfessionForDelete, setSelectedProfessionForDelete] = useState<string | null>(null);

    const fields = [
        { key: 'Código', label: 'Code', type: 'string', required: true },
        { key: 'Descrição', label: 'Description', type: 'string', required: true },
        { key: 'Acrônimo', label: 'Acronym', type: 'string' },
    ];

    const fetchProfessions = async () => {
        try {
            const response = await fetchWithAuth('https://localhost:7129/api/Professions', {
                method: 'GET',
                headers: {
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

    const handleAddProfession = async (profession: Profession) => {
        try {
            const response = await fetchWithAuth('https://localhost:7129/api/Professions', {
                method: 'POST',
                headers: {
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

    const handleUpdateProfession = async (profession: Profession) => {
        try {
            const response = await fetchWithAuth(`https://localhost:7129/api/Professions/${profession.professionID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profession)
            });

            if (!response.ok) {
                throw new Error('Error updating profession');
            }

            const updatedProfessions = professions.map(profession => {
                return profession.id === profession.id ? profession : profession;
            });
            setProfessions(updatedProfessions);
        } catch (error) {
            console.error('Error updating profession:', error);
        }

        handleCloseUpdateModal();
        refreshProfessions();
    };

    const handleDeleteProfessions = async (professionID: string) => {
        try {
            const response = await fetchWithAuth(`https://localhost:7129/api/Professions/${professionID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error deleting profession');
            }

            refreshProfessions();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProfessions();
    }, []);

    const refreshProfessions = () => {
        fetchProfessions();
    };

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleEditProfession = (profession: Profession) => {
        setSelectedProfession(profession);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedProfession(null);
    };

    const handleOpenDeleteModal = (professionID: string) => {
        setSelectedProfessionForDelete(professionID);
        setShowDeleteModal(true);
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

    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
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

    const ExpandedComponent: React.FC<{ data: Profession }> = ({ data }) => (
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

    const actionColumn: TableColumn<Profession> = {
        name: 'Ações',
        cell: (row: Profession) => (
            <div>
                <CustomOutlineButton icon="bi-pencil-square" onClick={() => handleEditProfession(row)}></CustomOutlineButton>{' '}
                <Button variant="outline-danger" onClick={() => handleOpenDeleteModal(row.departmentId)}>
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: Profession) => row.professionID,
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
                <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshProfessions} />
                <CustomOutlineButton icon="bi-plus" onClick={handleOpenAddModal} iconSize='1.1em' />
                <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
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
                        onUpdate={() => handleUpdateProfession(selectedProfession)}
                        entity={selectedProfession}
                        fields={fields}
                        title="Atualizar Profissão"
                    />
                )}
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteProfessions}
                    entityId={selectedProfessionForDelete}
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
                    columns={fields}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
                />
            )}
        </div >
    );
}
