import { useContext, useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import { useColor } from "../../../context/ColorContext";
import { DeleteModal } from "../../../modals/DeleteModal";
import { adsFields } from "../../../helpers/Fields";
import { Ads } from "../../../helpers/Types";
import { Button } from "react-bootstrap";
import { SelectFilter } from "../../../components/SelectFilter";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { CreateModalAds } from "../../../modals/CreateModalAds";
import { UpdateModalAds } from "../../../modals/UpdateModalAds";
import { AdsContext, AdsContextType } from "../../../context/AdsContext";

export const NledAds = () => {
    const { navbarColor, footerColor } = useColor();
    const { ads, fetchAds, handleAddAds, handleUpdateAds, handleDeleteAds } = useContext(AdsContext) as AdsContextType;
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['nomeArquivo', 'tipoArquivo', 'creador', 'dataFim']);
    const [selectedAds, setSelectedAds] = useState<any>(null);
    const [selectedAdsForDelete, setSelectedAdsForDelete] = useState<string | null>(null);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [filterText, setFilterText] = useState('');

    // Busca as publicidades ao carregar a página
    useEffect(() => {
        fetchAds();
    }, []);

    // Função para atualizar as publicidades
    const refreshAds = () => {
        fetchAds();
    };

    // Função para editar uma publicidade
    const handleEditAds = (ads: Ads) => {
        setSelectedAds(ads);
        setShowUpdateModal(true);
    };

    // Fecha o modal de edição de publicidade
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedAds(null);
    };

    // Função para abrir o modal de apagar publicidade
    const handleOpenDeleteModal = (id: string) => {
        setSelectedAdsForDelete(id);
        setShowDeleteModal(true);
    };

    // Função para selecionar as colunas
    const toggleColumn = (columnName: string) => {
        if (selectedColumns.includes(columnName)) {
            setSelectedColumns(selectedColumns.filter(col => col !== columnName));
        } else {
            setSelectedColumns([...selectedColumns, columnName]);
        }
    };

    // Função para resetar as colunas
    const resetColumns = () => {
        setSelectedColumns(['nomeArquivo', 'tipoArquivo', 'creador', 'dataFim']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define as colunas da tabela
    const columns: TableColumn<Ads>[] = adsFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: Ads) => {
                switch (field.key) {
                    case 'tipoArquivo':
                        return (row[field.key] === 1) ? 'Imagem' : 'Vídeo';
                    case 'createDate':
                        return new Date(row[field.key]).toLocaleString() || '';
                    case 'updateDate':
                        return new Date(row[field.key]).toLocaleString() || '';
                    case 'dataFim':
                        return new Date(row[field.key]).toLocaleString() || '';
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={ads} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Filtra os dados da tabela
    const filteredDataTable = ads.filter((ad: Ads) =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (ad[key] != null && String(ad[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.values(ad).some(value => {
            if (value == null) {
                return false;
            } else if (value instanceof Date) {
                return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
            } else {
                return value.toString().toLowerCase().includes(filterText.toLowerCase());
            }
        })
    );

    // Define a coluna de ações
    const actionColumn: TableColumn<Ads> = {
        name: 'Ações',
        cell: (row: Ads) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditAds(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.id)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: Ads) => row.id,
        ignoreRowClick: true,
    };

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span style={{ color: '#009739' }}>Publicidade</span>
                </div>
                <div className="datatable-header">
                    <div>
                        <input
                            className='search-input'
                            type="text"
                            placeholder="Pesquisa"
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                        />
                    </div>
                    <div className="buttons-container-others">
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshAds} />
                        <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                    </div>
                </div>
                <CreateModalAds
                    title="Publicidades"
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddAds}
                    fields={adsFields}
                    initialValues={{}}
                    entities="all"
                />
                {selectedAds && (
                    <UpdateModalAds
                        open={showUpdateModal}
                        onClose={handleCloseUpdateModal}
                        onUpdate={(entity) => handleUpdateAds(selectedAds, entity as FormData)}
                        entity={selectedAds}
                        fields={adsFields}
                        title="Publicidades"
                        entities="all"
                    />
                )}
                <DeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteAds}
                    entityId={selectedAdsForDelete}
                />
            </div>
            <div className='content-wrapper'>
                <div className='table-css'>
                    <DataTable
                        columns={[...columns, actionColumn]}
                        data={filteredDataTable}
                        onRowDoubleClicked={handleEditAds}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
                        defaultSortAsc={false}
                        defaultSortFieldId="nomeArquivo"
                    />
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={adsFields}
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