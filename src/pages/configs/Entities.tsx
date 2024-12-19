import DataTable, { TableColumn } from "react-data-table-component";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { NavBar } from "../../components/NavBar";
import { useNavbar } from "../../context/NavbarContext";
import { Footer } from "../../components/Footer";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { useContext, useEffect, useState } from "react";
import { customStyles } from "../../components/CustomStylesDataTable";
import { Entity } from "../../helpers/Types";
import { SelectFilter } from "../../components/SelectFilter";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { entityFields } from "../../helpers/Fields";
import { ExpandedComponentEmpZoneExtEnt } from "../../components/ExpandedComponentEmpZoneExtEnt";
import { UpdateEntityModal } from "../../modals/UpdateEntityModal";
import { EntityContext, EntityContextType } from "../../context/EntityContext";
import { ExportButton } from "../../components/ExportButton";
import { PrintButton } from "../../components/PrintButton";
import { TextFieldProps, TextField } from "@mui/material";

// Define a interface para as propriedades do componente CustomSearchBox
function CustomSearchBox(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      className="SearchBox"
    />
  );
}

export const Entities = () => {
    const { navbarColor, footerColor } = useNavbar();
    const { entity, fetchAllEntity, updateEntity } = useContext(EntityContext) as EntityContextType;
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['createdDate', 'nome', 'nif', 'email', 'enabled']);
    const [filterText, setFilterText] = useState("");
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
    const [currentEntityIndex, setCurrentEntityIndex] = useState(0);
    const [selectedRows, setSelectedRows] = useState<Entity[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);

    // Função para atualizar os dados da entidade
    const handleUpdateCompanyData = async (entityData: FormData) => {
        await updateEntity(entityData);
        setClearSelectionToggle(!clearSelectionToggle);
        refreshEntity();
    }

    // Busca todas as entidades
    useEffect(() => {
        fetchAllEntity();
    }, []);

    // Função para atualizar as entidade
    const refreshEntity = () => {
        fetchAllEntity();
        setClearSelectionToggle(!clearSelectionToggle);
    };

    // Função para editar uma entidade
    const handleEditEntity = (User: Entity) => {
        setSelectedEntity(User);
        setShowUpdateModal(true);
    };

    // Função para desativar uma entidade
    const handleDisableEntity = async (entity: Entity) => {
        const updatedEntity = { ...entity, enabled: false };
        const formData = new FormData();
        if (updatedEntity.id) {
            formData.append('id', String(updatedEntity.id));
        }
        if (updatedEntity.nome) {
            formData.append('Nome', updatedEntity.nome);
        }
        if (updatedEntity.morada) {
            formData.append('Morada', updatedEntity.morada);
        }
        if (updatedEntity.cPostal) {
            formData.append('CPostal', updatedEntity.cPostal);
        }
        if (updatedEntity.localidade) {
            formData.append('Localidade', updatedEntity.localidade);
        }
        if (updatedEntity.telefone) {
            formData.append('Telefone', updatedEntity.telefone);
        }
        if (updatedEntity.telemovel) {
            formData.append('Telemovel', updatedEntity.telemovel);
        }
        if (updatedEntity.email) {
            formData.append('Email', updatedEntity.email);
        }
        if (updatedEntity.nif) {
            formData.append('NIF', String(updatedEntity.nif));
        }
        if (updatedEntity.www) {
            formData.append('WWW', updatedEntity.www);
        }
        if (updatedEntity.observacoes) {
            formData.append('Observacoes', updatedEntity.observacoes);
        }
        if (updatedEntity.enabled !== undefined) {
            formData.append('Enabled', updatedEntity.enabled ? 'true' : 'false');
        }
        if (updatedEntity.logotipo) {
            formData.append('Logotipo', updatedEntity.logotipo);
        }
        await handleUpdateCompanyData(formData);
        refreshEntity();
    };

    // Fecha o modal de edição de entidade
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedEntity(null);
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
        setSelectedColumns(['createdDate', 'nome', 'nif', 'email', 'enabled']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Define o componente de linha expandida
    const expandableRowComponent = (row: Entity) => (
        <ExpandedComponentEmpZoneExtEnt data={row} fields={entityFields} />
    );

    // Define a função de próxima entidade
    const handleNextEntity = () => {
        setCurrentEntityIndex(prevIndex => {
            if (prevIndex < entity.length - 1) {
                const newIndex = prevIndex + 1;
                setSelectedEntity(entity[newIndex]);
                return newIndex;
            }
            return prevIndex;
        });
    };

    // Define a função de entidade anterior
    const handlePrevEntity = () => {
        setCurrentEntityIndex(prevIndex => {
            if (prevIndex > 0) {
                const newIndex = prevIndex - 1;
                setSelectedEntity(entity[newIndex]);
                return newIndex;
            }
            return prevIndex;
        });
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Seleciona a linha da tabela
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: Entity[];
    }) => {
        const sortedEntity = state.selectedRows.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
        setSelectedRows(sortedEntity);
    };

    // Filtra os dados da tabela
    const filteredDataTable = Array.isArray(entity) ? entity.filter(user =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(user[key]) === String(filters[key])
        )
    ) : [];

    // Define as colunas excluídas
    const excludedColumns = ['logotipo'];

    // Define as colunas da tabela
    const columns: TableColumn<Entity>[] = entityFields
        .filter(field => selectedColumns.includes(field.key))
        .filter(field => !excludedColumns.includes(field.key))
        .sort((a, b) => { if (a.key === 'createdDate') return -1; else if (b.key === 'createdDate') return 1; else return 0; })
        .map(field => {
            const formatField = (row: Entity) => {
                switch (field.key) {
                    case 'createdDate':
                    case 'updatedDate':
                        return new Date(row[field.key]).toLocaleString() || '';
                    case 'enabled':
                        return row[field.key] ? 'Activo' : 'Inactivo';
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={filteredDataTable} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
                sortFunction: (rowA, rowB) => new Date(rowB.createdDate).getTime() - new Date(rowA.createdDate).getTime()
            };
        });

    // Define a coluna de ações
    const actionColumn: TableColumn<Entity> = {
        name: 'Ações',
        cell: (row: Entity) => (
            <div style={{ display: 'flex' }}>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Editar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-pencil-fill' onClick={() => handleEditEntity(row)} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Desactivar</Tooltip>}
                >
                    <CustomOutlineButton className="action-button" icon='bi bi-slash-circle' onClick={() => handleDisableEntity(row)} />
                </OverlayTrigger>
            </div>
        ),
        selector: (row: Entity) => row.id,
        ignoreRowClick: true,
    };

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return entityFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span style={{ color: '#000000' }}>Entidades</span>
                </div>
                <div className="datatable-header">
                    <div>
                        <CustomSearchBox
                            label="Pesquisa"
                            variant="outlined"
                            size='small'
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                            style={{ marginTop: -5 }}
                        />
                    </div>
                    <div className="buttons-container-others">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
                        >
                            <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshEntity} />
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip className="custom-tooltip">Colunas</Tooltip>}
                        >
                            <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        </OverlayTrigger>
                        <ExportButton allData={filteredDataTable} selectedData={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={getSelectedFields()} />
                        <PrintButton data={selectedRows.length > 0 ? selectedRows : filteredDataTable} fields={getSelectedFields()} />
                    </div>
                </div>
            </div>
            <div className='content-wrapper'>
                <div className='table-css'>
                    <DataTable
                        columns={[...columns, actionColumn]}
                        data={filteredDataTable}
                        onRowDoubleClicked={handleEditEntity}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        paginationPerPage={20}
                        selectableRows
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={clearSelectionToggle}
                        expandableRows
                        expandableRowsComponent={({ data }) => expandableRowComponent(data)}
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
                        striped
                        defaultSortAsc={true}
                        defaultSortFieldId='createdDate'
                    />
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {selectedEntity && (
                <UpdateEntityModal
                    open={showUpdateModal}
                    onClose={handleCloseUpdateModal}
                    onUpdate={handleUpdateCompanyData}
                    fields={entityFields}
                    entity={selectedEntity}
                    title="Atualizar Entidade"
                    onNext={handleNextEntity}
                    onPrev={handlePrevEntity}
                    canMoveNext={currentEntityIndex < entity.length - 1}
                    canMovePrev={currentEntityIndex > 0}
                />
            )}
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={entityFields.filter(field => !excludedColumns.includes(field.key))}
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