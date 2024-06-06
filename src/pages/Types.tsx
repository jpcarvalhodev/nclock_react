import DataTable, { TableColumn } from "react-data-table-component";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { customStyles } from "../components/CustomStylesDataTable";
import { ExpandedComponentGeneric } from "../components/ExpandedComponentGeneric";
import { ExportButton } from "../components/ExportButton";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { categoryFields } from "../helpers/Fields";
import { ColumnSelectorModal } from "../modals/ColumnSelectorModal";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Category, entityTypes } from "../helpers/Types";

export const Types = () => {
    const [types, setTypes] = useState<entityTypes[]>([]);
    const [filterText, setFilterText] = useState('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

    // Filtra as categorias
    const filteredItems = types.filter(item =>
        Object.keys(item).some(key =>
            String(item[key]).toLowerCase().includes(filterText.toLowerCase())
        )
    );

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
        setSelectedColumns([]);
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

    // Mapeia os nomes das colunas
    const columnNamesMap = categoryFields.reduce<Record<string, string>>((acc, field) => {
        acc[field.key] = field.label;
        return acc;
    }, {});

    // Define as colunas da tabela
    const tableColumns = selectedColumns
        .map(columnKey => ({
            name: columnNamesMap[columnKey] || columnKey,
            selector: (row: Record<string, any>) => row[columnKey],
            sortable: true,
        }));

    // Define a coluna de ações
    const actionColumn: TableColumn<Category> = {
        name: 'Ações',
        cell: (row: Category) => (
            <div style={{ display: 'flex' }}>
                {/* <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditCategory(row)} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.categoryID)} >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '} */}
            </div>
        ),
        selector: (row: Category) => row.categoryID,
        ignoreRowClick: true,
    };
    
    return (
        <div className="main-container">
            <NavBar />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span>Tipos</span>
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
                        {/* <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshCategories} />
                        <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                        <ExportButton allData={categories} selectedData={filteredItems} fields={categoryFields} /> */}
                    </div>
                </div>
            </div>
            <div className='content-wrapper'>
                <div className='table-css'>
                    {/* <DataTable
                        columns={[...tableColumns, actionColumn]}
                        data={filteredItems}
                        onRowDoubleClicked={handleEditCategory}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        expandableRows
                        expandableRowsComponent={(props) => <ExpandedComponentGeneric data={props.data} fields={categoryFields} />}
                        noDataComponent="Não há dados disponíveis para exibir."
                        customStyles={customStyles}
                    /> */}
                </div>
            </div>
            <Footer />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={categoryFields}
                    selectedColumns={selectedColumns}
                    onClose={() => setOpenColumnSelector(false)}
                    onColumnToggle={toggleColumn}
                    onResetColumns={resetColumns}
                    onSelectAllColumns={onSelectAllColumns}
                />
            )}
        </div >
    );
};