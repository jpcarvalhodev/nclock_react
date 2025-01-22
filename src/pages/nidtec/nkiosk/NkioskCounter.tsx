import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import Split from "react-split";

import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import { PrintButton } from "../../../components/PrintButton";
import { SelectFilter } from "../../../components/SelectFilter";
import { TreeViewDataDevice } from "../../../components/TreeViewDevice";
import { useKiosk } from "../../../context/KioskContext";
import { useNavbar } from "../../../context/NavbarContext";
import { DeviceContextType, TerminalsContext, useTerminals } from "../../../context/TerminalsContext";
import { counterFields } from "../../../fields/Fields";
import { Counter } from "../../../types/Types";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import * as apiService from '../../../api/apiService';

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T00:00`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T23:59`;
}

// Define a interface para as propriedades do componente CustomSearchBox
function CustomSearchBox(props: TextFieldProps) {
    return (
        <TextField
            {...props}
            className="SearchBox"
        />
    );
}

// Função para converter string em data
const convertStringToDate = (dateStr: string) => {
    if (!dateStr || typeof dateStr !== "string") {
        console.error("Data inválida recebida:", dateStr);
        return new Date("");
    }
    const parts = dateStr.split(' ');
    const dateParts = parts[0].split('/');
    const timeParts = parts[1].split(':');
    return new Date(
        parseInt(dateParts[2], 10),
        parseInt(dateParts[1], 10) - 1,
        parseInt(dateParts[0], 10),
        parseInt(timeParts[0], 10),
        parseInt(timeParts[1], 10),
        parseInt(timeParts[2], 10)
    );
};

export const NkioskCounter = () => {
    const { navbarColor, footerColor } = useNavbar();
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    const { devices } = useTerminals();
    const { counter, setCounter, fetchAllCounter } = useKiosk();
    const [filterText, setFilterText] = useState<string>('');
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['eventTime', 'eventType', 'eventName', 'deviceSN']);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [selectedRows, setSelectedRows] = useState<Counter[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<Counter[]>([]);

    // Busca os dados do contador entre as datas especificadas
    const fetchAllCounterBetweenDates = async () => {
        try {
            const data = await apiService.fetchAllContador(startDate, endDate);
            if (Array.isArray(data)) {
                const convertedData = data.map(item => ({
                    ...item,
                    eventTime: convertStringToDate(item.eventTime)
                }));
                setCounter(convertedData);
            } else {
                setCounter([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados do contador:', error);
        }
    };

    // Função para buscar os dados do contador de hoje
    const fetchCounterToday = async () => {
        const today = new Date();
        const start = formatDateToStartOfDay(today);
        const end = formatDateToEndOfDay(today);
        try {
            const data = await apiService.fetchAllContador(start, end);
            if (Array.isArray(data)) {
                const convertedData = data.map(item => ({
                    ...item,
                    eventTime: convertStringToDate(item.eventTime)
                }));
                setCounter(convertedData);
            } else {
                setCounter([]);
            }
            setStartDate(start);
            setEndDate(end);
        } catch (error) {
            console.error('Erro ao buscar os dados do contador hoje:', error);
        }
    }

    // Função para buscar os dados do contador de ontem
    const fetchCounterForPreviousDay = async () => {
        const prevDate = new Date(startDate);
        prevDate.setDate(prevDate.getDate() - 1);

        const start = formatDateToStartOfDay(prevDate);
        const end = formatDateToEndOfDay(prevDate);

        try {
            const data = await apiService.fetchAllContador(start, end);
            if (Array.isArray(data)) {
                const convertedData = data.map(item => ({
                    ...item,
                    eventTime: convertStringToDate(item.eventTime)
                }));
                setCounter(convertedData);
            } else {
                setCounter([]);
            }
            setStartDate(start);
            setEndDate(end);
        } catch (error) {
            console.error('Erro ao buscar os dados do contador ontem:', error);
        }
    };

    // Função para buscar os dados do contador de amanhã
    const fetchCounterForNextDay = async () => {
        const newDate = new Date(endDate);
        newDate.setDate(newDate.getDate() + 1);

        if (newDate > new Date()) {
            console.error("Não é possível buscar dados do contador para uma data no futuro.");
            return;
        }

        const start = formatDateToStartOfDay(newDate);
        const end = formatDateToEndOfDay(newDate);

        try {
            const data = await apiService.fetchAllContador(start, end);
            if (Array.isArray(data)) {
                const convertedData = data.map(item => ({
                    ...item,
                    eventTime: convertStringToDate(item.eventTime)
                }));
                setCounter(convertedData);
            } else {
                setCounter([]);
            }
            setStartDate(start);
            setEndDate(end);
        } catch (error) {
            console.error('Erro ao buscar os dados do contador amanhã:', error);
        }
    };

    // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
    useEffect(() => {
        if (selectedDevicesIds.length > 0) {
            const filtered = counter.filter(count => selectedDevicesIds.includes(count.deviceSN));
            setFilteredDevices(filtered);
        } else {
            setFilteredDevices(counter);
        }
    }, [selectedDevicesIds, counter]);

    // Função para atualizar as recolhas do moedeiro
    const refreshCounter = () => {
        fetchAllCounter();
        setStartDate(formatDateToStartOfDay(pastDate));
        setEndDate(formatDateToEndOfDay(currentDate));
        setClearSelectionToggle((prev) => !prev);
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
        setSelectedColumns(['eventTime', 'eventType', 'eventName', 'deviceSN']);
    };

    // Função para selecionar todas as colunas
    const onSelectAllColumns = (allColumnKeys: string[]) => {
        setSelectedColumns(allColumnKeys);
    };

    // Define a função de seleção de linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: Counter[];
    }) => {
        const sortedSelectedRows = state.selectedRows.sort((a, b) => new Date(b.eventTime).getTime() - new Date(a.eventTime).getTime());
        setSelectedRows(sortedSelectedRows);
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define a seleção da árvore
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        setSelectedDevicesIds(selectedIds);
    };

    // Filtra os dados da tabela
    const filteredDataTable = filteredDevices.filter(getCoin =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (getCoin[key] != null && String(getCoin[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(getCoin).some(([key, value]) => {
            if (selectedColumns.includes(key) && value != null) {
                if (value instanceof Date) {
                    return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
                } else {
                    return value.toString().toLowerCase().includes(filterText.toLowerCase());
                }
            }
            return false;
        })
    )
        .sort((a, b) => new Date(b.eventTime).getTime() - new Date(a.eventTime).getTime());

    // Define as colunas da tabela
    const columns: TableColumn<Counter>[] = counterFields
        .filter(field => selectedColumns.includes(field.key))
        .sort((a, b) => { if (a.key === 'deviceSN') return 1; else if (b.key === 'deviceSN') return -1; else return 0; })
        .map(field => {
            const formatField = (row: Counter) => {
                switch (field.key) {
                    case 'eventTime':
                        return new Date(row.eventTime).toLocaleString();
                    case 'deviceSN':
                        return devices.find(device => device.serialNumber === row.deviceSN)?.deviceName || '';
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
                sortFunction: (rowA, rowB) => new Date(rowB.dataRecolha).getTime() - new Date(rowA.dataRecolha).getTime()
            };
        });

    // Função para gerar os dados com nomes substituídos para o export/print
    const transformTransactionWithNames = (transaction: { deviceSN: string; }) => {

        const deviceMatch = devices.find(device => device.serialNumber === transaction.deviceSN);
        const deviceName = deviceMatch?.deviceName || 'Sem Dados';

        return {
            ...transaction,
            deviceSN: deviceName,
        };
    };

    // Dados dos pagamentos com nomes substituídos
    const getCounterWithNames = filteredDataTable.map(transformTransactionWithNames);

    // Transforma as linhas selecionadas com nomes substituídos
    const selectedRowsWithNames = selectedRows.map(transformTransactionWithNames);

    // Calcula o total de movimentos Torniquete
    const totalCardAmount = filteredDataTable.filter(transaction => transaction.eventType !== 'Quiosque').length;

    // Calcula o total de movimentos Quiosque
    const totalKioskAmount = filteredDataTable.filter(transaction => transaction.eventType === 'Quiosque').length;

    // Função para obter os campos selecionados baseado em selectedColumns
    const getSelectedFields = () => {
        return counterFields.filter(field => selectedColumns.includes(field.key));
    };

    return (
        <div className="main-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='content-container'>
                <Split className='split' sizes={[15, 85]} minSize={100} expandToMin={true} gutterSize={15} gutterAlign="center" snapOffset={0} dragInterval={1}>
                    <div className="treeview-container">
                        <TreeViewDataDevice onSelectDevices={handleSelectFromTreeView} />
                    </div>
                    <div className="datatable-container">
                        <div className="datatable-title-text">
                            <span style={{ color: '#009739' }}>Contador de Dados</span>
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
                                    <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshCounter} />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Colunas</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-eye" onClick={() => setOpenColumnSelector(true)} />
                                </OverlayTrigger>
                                <ExportButton allData={getCounterWithNames} selectedData={selectedRows.length > 0 ? selectedRowsWithNames : getCounterWithNames} fields={getSelectedFields()} />
                                <PrintButton data={selectedRows.length > 0 ? selectedRowsWithNames : getCounterWithNames} fields={getSelectedFields()} />
                            </div>
                            <div className="date-range-search">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Contador Hoje</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-calendar-event" onClick={fetchCounterToday} iconSize='1.1em' />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Contador Dia Anterior</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-arrow-left-circle" onClick={fetchCounterForPreviousDay} iconSize='1.1em' />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Contador Dia Seguinte</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi bi-arrow-right-circle" onClick={fetchCounterForNextDay} iconSize='1.1em' disabled={new Date(endDate) >= new Date(new Date().toISOString().substring(0, 10))} />
                                </OverlayTrigger>
                                <input
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                    className='search-input'
                                />
                                <span> até </span>
                                <input
                                    type="datetime-local"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    className='search-input'
                                />
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip className="custom-tooltip">Buscar</Tooltip>}
                                >
                                    <CustomOutlineButton icon="bi-search" onClick={fetchAllCounterBetweenDates} iconSize='1.1em' />
                                </OverlayTrigger>
                            </div>
                        </div>
                        <div className='table-css'>
                            <DataTable
                                columns={columns}
                                data={filteredDataTable}
                                pagination
                                paginationComponentOptions={paginationOptions}
                                paginationPerPage={20}
                                selectableRows
                                onSelectedRowsChange={handleRowSelected}
                                clearSelectedRows={clearSelectionToggle}
                                selectableRowsHighlight
                                noDataComponent="Não existem dados disponíveis para exibir."
                                customStyles={customStyles}
                                striped
                                defaultSortAsc={true}
                                defaultSortFieldId="eventTime"
                            />
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{ marginLeft: 10, marginRight: 10 }}>
                                <strong>Total de Movimentos:</strong> Torniquete - {totalCardAmount} | Quiosque - {totalKioskAmount} | Total - {totalCardAmount + totalKioskAmount}
                            </div>
                        </div>
                    </div>
                </Split>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
            {openColumnSelector && (
                <ColumnSelectorModal
                    columns={counterFields}
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
