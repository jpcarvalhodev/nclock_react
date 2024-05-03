import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Profession } from "../helpers/Types";
import Button from "react-bootstrap/esm/Button";
import { DeleteModal } from "../modals/DeleteModal";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { fetchWithAuth } from "../components/FetchWithAuth";
import { professionFields } from "../helpers/Fields";
import { ExportButton } from "../components/ExportButton";
import { toast } from "react-toastify";
import { ExpandedComponent } from "../components/ExpandedComponent";
import { UpdateModalCatProf } from "../modals/UpdateModalCatProf";
import { CreateModalCatProf } from "../modals/CreateModalCatProf";

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

    const fetchProfessions = async () => {
        try {
            const response = await fetchWithAuth('https://localhost:7129/api/Professions', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                toast.error('Erro ao buscar os dados das profissões');
            }

            const data = await response.json();
            setProfessions(data);
        } catch (error) {
            console.error('Erro ao buscar os dados das profissões:', error);
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
                toast.error('Erro ao adicionar nova profissão');
            }

            const data = await response.json();
            setProfessions([...professions, data]);
            toast.success('Profissão adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar nova profissão:', error);
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
                const errorText = await response.text();
                toast.error(`Erro ao atualizar a profissão: ${errorText}`);
                return;
            }
    
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const updatedProfession = await response.json();
                setProfessions(professions => professions.map(p => p.professionID === updatedProfession.professionID ? updatedProfession : p));
                toast.success('Profissão atualizada com sucesso!');
            } else {
                await response.text();
                toast.success('Profissão atualizada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao atualizar a profissão:', error);
            toast.error('Falha ao conectar ao servidor');
        } finally {
            handleCloseUpdateModal();
            refreshProfessions();
        }
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
                toast.error('Erro ao apagar a profissão');
            }

            toast.success('Profissão apagada com sucesso!');
        } catch (error) {
            console.error('Erro ao apagar a profissão:', error);
        }
        refreshProfessions();
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
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    const columnNamesMap = professionFields.reduce<Record<string, string>>((acc, field) => {
        acc[field.key] = field.label;
        return acc;
    }, {});

    const tableColumns = selectedColumns
        .map(columnKey => ({
            name: columnNamesMap[columnKey] || columnKey,
            selector: (row: Record<string, any>) => row[columnKey],
            sortable: true,
        }));

    const actionColumn: TableColumn<Profession> = {
        name: 'Ações',
        cell: (row: Profession) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditProfession(row)}/>
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.professionID)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: Profession) => row.professionID,
        ignoreRowClick: true,
    };

    return (
        <div>
            <NavBar />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-header">
                    <div className="search-box">
                        <input
                            className='search-input'
                            type="text"
                            placeholder="Pesquisa"
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                        />
                    </div>
                    <div className="buttons-container-others">
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshProfessions} />
                        <CustomOutlineButton icon="bi-plus" onClick={handleOpenAddModal} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        <ExportButton allData={professions} selectedData={filteredItems} fields={professionFields} />
                    </div>
                </div>
                <CreateModalCatProf
                    title="Adicionar Profissão"
                    open={showAddModal}
                    onClose={handleCloseAddModal}
                    onSave={handleAddProfession}
                    fields={professionFields}
                    initialValues={{}}
                    entityType="profissões"
                />
                {selectedProfession && (
                    <UpdateModalCatProf
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={() => handleUpdateProfession(selectedProfession)}
                        entity={selectedProfession}
                        fields={professionFields}
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
                        onRowDoubleClicked={handleEditProfession}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        expandableRows
                        expandableRowsComponent={(props) => <ExpandedComponent data={props.data} fields={professionFields} />}
                        noDataComponent="Não há dados disponíveis para exibir."
                    />
                </div>
            </div>
            <Footer />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={professionFields}
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
