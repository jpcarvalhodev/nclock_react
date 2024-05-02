import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import DataTable, { TableColumn } from 'react-data-table-component';
import { ExternalEntity } from "../helpers/Types";
import Button from "react-bootstrap/esm/Button";
import { DeleteModal } from "../modals/DeleteModal";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { fetchWithAuth } from "../components/FetchWithAuth";
import { externalEntityFields } from "../helpers/Fields";
import { ExportButton } from "../components/ExportButton";
import { toast } from "react-toastify";
import { ExpandedComponent } from "../components/ExpandedComponent";

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

    const fetchExternalEntities = async () => {
        try {
            const response = await fetchWithAuth('https://localhost:7129/api/ExternalEntities', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                toast.error('Erro ao buscar os dados das entidades externas');
            }

            const data = await response.json();
            setExternalEntities(data);
        } catch (error) {
            console.error('Erro ao buscar os dados das entidades externas:', error);
        }
    };

    const handleAddExternalEntity = async (externalEntity: ExternalEntity) => {
        try {
            const response = await fetchWithAuth('https://localhost:7129/api/ExternalEntities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(externalEntity)
            });

            if (!response.ok) {
                toast.error('Erro ao adicionar nova entidade externa');
            }

            const data = await response.json();
            setExternalEntities([...externalEntities, data]);
            toast.success('Entidade externa adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar nova entidade externa:', error);
        }

        handleCloseAddModal();
        refreshExternalEntities();
    };

    const handleUpdateExternalEntity = async (externalEntity: ExternalEntity) => {
        try {
            const response = await fetchWithAuth(`https://localhost:7129/api/ExternalEntities/${externalEntity.externalEntityID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(externalEntity)
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                toast.error(`Erro ao atualizar entidade externa: ${errorText}`);
                return;
            }
    
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const updatedExternalEntity = await response.json();
                setExternalEntities(externalEntities => externalEntities.map(entity => entity.externalEntityID === updatedExternalEntity.externalEntityID ? updatedExternalEntity : entity));
                toast.success('Entidade externa atualizada com sucesso!');
            } else {
                await response.text();
                toast.success('Entidade externa atualizada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao atualizar entidade externa:', error);
            toast.error('Falha ao conectar ao servidor');
        } finally {
            handleCloseUpdateModal();
            refreshExternalEntities();
        }
    };    

    const handleDeleteExternalEntity = async (externalEntityID: string) => {
        try {
            const response = await fetchWithAuth(`https://localhost:7129/api/ExternalEntities/${externalEntityID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                toast.error('Erro ao apagar entidade externa');
            }

            toast.success('Entidade externa apagada com sucesso!');
        } catch (error) {
            console.error('Erro ao apagar entidade externa:', error);
        }
        refreshExternalEntities();
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

    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    const paginationOptions = {
        rowsPerPageText: 'Linhas por página'
    };

    const columnNamesMap = externalEntityFields.reduce<Record<string, string>>((acc, field) => {
        acc[field.key] = field.label;
        return acc;
    }, {});

    const tableColumns = selectedColumns
        .map(columnKey => ({
            name: columnNamesMap[columnKey] || columnKey,
            selector: (row: Record<string, any>) => row[columnKey],
            sortable: true,
        }));

    const actionColumn: TableColumn<ExternalEntity> = {
        name: 'Ações',
        cell: (row: ExternalEntity) => (
            <div>
                <Button variant="outline-danger" onClick={() => handleOpenDeleteModal(row.externalEntityID)}>
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: ExternalEntity) => row.externalEntityID,
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
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshExternalEntities} />
                        <CustomOutlineButton icon="bi-plus" onClick={handleOpenAddModal} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        <ExportButton allData={externalEntities} selectedData={filteredItems} fields={externalEntityFields} />
                    </div>
                </div>
                {/* <CreateModalGeneric
                    title="Adicionar Entidade Externa"
                    open={showAddModal}
                    onClose={handleCloseAddModal}
                    onSave={handleAddExternalEntity}
                    fields={externalEntityFields}
                    initialValues={{}}
                /> */}
                {/* {selectedExternalEntity && (
                    <UpdateModalGeneric
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={() => handleUpdateExternalEntity(selectedExternalEntity)}
                        entity={selectedExternalEntity}
                        fields={externalEntityFields}
                        title="Atualizar Entidade Externa"
                    />
                )} */}
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
                        onRowDoubleClicked={handleEditExternalEntity}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        expandableRows
                        expandableRowsComponent={(props) => <ExpandedComponent data={props.data} fields={externalEntityFields} />}
                        noDataComponent="Não há dados disponíveis para exibir."
                    />
                </div>
            </div>
            <Footer />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={externalEntityFields}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
                />
            )}
        </div>
    );
}
