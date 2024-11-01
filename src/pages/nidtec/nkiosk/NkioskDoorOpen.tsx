import { useEffect, useState } from "react";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { Button, Tab, Tabs } from "react-bootstrap";
import { SelectFilter } from "../../../components/SelectFilter";
import { ManualOpenDoor } from "../../../helpers/Types";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { toast } from "react-toastify";
import { Spinner } from 'react-bootstrap';
import { useColor } from "../../../context/ColorContext";
import * as apiService from "../../../helpers/apiService";
import { manualOpenDoorFields } from "../../../helpers/Fields";
import { ManualDoorOpenModal } from "../../../modals/ManualDoorOpenModal";
import { set } from "date-fns";

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

// Define o componente de terminais
export const NkioskDoorOpen = () => {
    const { navbarColor, footerColor } = useColor();
    const [manualOpenDoor, setManualOpenDoor] = useState<ManualOpenDoor[]>([]);
    const [filters, setFilters] = useState<Filters>({});
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['createdDate', 'nomeResponsavel', 'nomeEvento', 'deviceName', 'doorName']);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [selectedManualOpen, setSelectedManualOpen] = useState<ManualOpenDoor | null>(null);
    const [loadingManualOpen, setLoadingManualOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [filterText, setFilterText] = useState<string>('');
    const [userTabKey, setUserTabKey] = useState<string>('manualOpen');

    // Função para buscar os dados de aberturas manuais
    const fetchAllManualOpen = async () => {
        try {
            const data = await apiService.fetchAllManualDoorOpen();
            setManualOpenDoor(data);
        } catch (error) {
            console.error('Erro ao buscar os dados de aberturas manuais', error);
        }
    }

    // Atualiza os dados de renderização
    useEffect(() => {
        fetchAllManualOpen();
    }, []);

    // Função para atualizar os dados de aberura manual
    const refreshAllManualOpen = () => {
        fetchAllManualOpen();
    }

    // Função para resetar as colunas
    const handleResetColumns = () => {
        setSelectedColumns(['createdDate', 'nomeResponsavel', 'nomeEvento', 'deviceName', 'doorName']);
    };

    // Função para alternar a visibilidade das abas
    const handleUserSelect = (k: string | null) => {
        if (k) {
            setUserTabKey(k);
        }
    };

    // Função para alternar a visibilidade das colunas
    const handleColumnToggle = (columnKey: string) => {
        if (selectedColumns.includes(columnKey)) {
            setSelectedColumns(selectedColumns.filter(key => key !== columnKey));
        } else {
            setSelectedColumns([...selectedColumns, columnKey]);
        }
    };

    // Função para selecionar todas as colunas
    const handleSelectAllColumns = () => {
        const allColumnKeys = manualOpenDoorFields.map(field => field.key);
        setSelectedColumns(allColumnKeys);
    };

    // Define a função de seleção de linhas de dispositivos
    const handleDeviceRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: ManualOpenDoor[];
    }) => {
        setSelectedManualOpen(state.selectedRows[0] || null);
    };

    // Define as colunas de dispositivos
    const columns: TableColumn<ManualOpenDoor>[] = manualOpenDoorFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: ManualOpenDoor) => {
                switch (field.key) {
                    case 'createdDate':
                        return new Date(row.createdDate).toLocaleString();
                    default:
                        return row[field.key];
                }
            };
            return {
                id: field.key,
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={manualOpenDoor} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
                sortFunction: (rowA, rowB) => new Date(rowB.createdDate).getTime() - new Date(rowA.createdDate).getTime()
            };
        });

    // Filtra os dados da tabela de dispositivos
    const filteredDataTable = manualOpenDoor.filter(device =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (device[key] != null && String(device[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.values(device).some(value => {
            if (value == null) {
                return false;
            } else if (value instanceof Date) {
                return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
            } else {
                return value.toString().toLowerCase().includes(filterText.toLowerCase());
            }
        })
    );

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Função para abrir uma porta manualmente
    const handleManualOpen = async () => {
        setLoadingManualOpen(true);
        setModalOpen(true);
    }

    // Função para enviar a abertura manualmente
    const handleManualOpenSave = async (door: Partial<ManualOpenDoor>) => {
        setModalOpen(false);
        try {
            const data = await apiService.addManualOpenDoor(door);
            setManualOpenDoor([...manualOpenDoor, data]);
            setLoadingManualOpen(false);
            toast.success(data.message || 'Porta aberta manualmente com sucesso!');
        } catch (error) {
            setLoadingManualOpen(false);
            console.error('Erro ao abrir a porta manualmente', error);
            toast.error('Erro ao abrir a porta manualmente.');
        } finally {
            fetchAllManualOpen();
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="datatable-container">
                <div className="datatable-title-text" style={{ color: '#009739' }}>
                    <span>Aberturas Manuais</span>
                </div>
                <div className="datatable-header">
                    <div className="buttons-container-others-mb">
                        <input
                            className='search-input'
                            type="text"
                            placeholder="Pesquisa"
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                        />
                        <div className="custom-buttons">
                            <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshAllManualOpen} />
                            <CustomOutlineButton icon="bi-eye" onClick={() => setShowColumnSelector(true)} iconSize='1.1em' />
                        </div>
                    </div>
                </div>
                <div className="deviceMobile">
                    <DataTable
                        columns={columns}
                        data={filteredDataTable}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        selectableRows
                        onSelectedRowsChange={handleDeviceRowSelected}
                        selectableRowsHighlight
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
                        defaultSortAsc={true}
                        defaultSortFieldId="createdDate"
                    />
                </div>
                <div className="content-section deviceTabsMobile" style={{ marginTop: 'auto' }}>
                    <div>
                        <Tabs
                            id="controlled-tab-terminals-buttons"
                            activeKey={userTabKey}
                            onSelect={handleUserSelect}
                            className="nav-modal"
                        >
                            <Tab eventKey="manualOpen" title="Ligação">
                                <div style={{ display: "flex", marginTop: 10 }}>
                                    <Button variant="outline-primary" size="sm" className="button-terminals-users" onClick={handleManualOpen}>
                                        {loadingManualOpen ? (
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                        ) : (
                                            <i className="bi bi-power" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                        )}
                                        Abrir Porta
                                    </Button>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {showColumnSelector && (
                <ColumnSelectorModal
                    columns={manualOpenDoorFields}
                    selectedColumns={selectedColumns}
                    onClose={() => setShowColumnSelector(false)}
                    onColumnToggle={handleColumnToggle}
                    onResetColumns={handleResetColumns}
                    onSelectAllColumns={handleSelectAllColumns}
                />
            )}
            <ManualDoorOpenModal 
                title="Abrir Porta Manualmente"
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleManualOpenSave}
                fields={manualOpenDoorFields}
            />
        </div>
    );
};