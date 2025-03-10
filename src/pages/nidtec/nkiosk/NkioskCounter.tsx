import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import Split from "react-split";

import * as apiService from "../../../api/apiService";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";

import { PrintButton } from "../../../components/PrintButton";
import { SelectFilter } from "../../../components/SelectFilter";
import { TreeViewDataDevice } from "../../../components/TreeViewDevice";
import { useKiosk } from "../../../context/KioskContext";

import { useTerminals } from "../../../context/TerminalsContext";
import { counterFields } from "../../../fields/Fields";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { Counter } from "../../../types/Types";
import { CustomSpinner } from "../../../components/CustomSpinner";
import { useMediaQuery } from "react-responsive";

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T00:00`;
};

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T23:59`;
};

// Define a interface para as propriedades do componente CustomSearchBox
function CustomSearchBox(props: TextFieldProps) {
  return <TextField {...props} className="SearchBox" />;
}

export const NkioskCounter = () => {
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);
  const { devices } = useTerminals();
  const {
    counter,
    setCounter,
    fetchAllCounter,
    counterPages,
    counterTotalRecords,
  } = useKiosk();
  const [filterText, setFilterText] = useState<string>("");
  const [openColumnSelector, setOpenColumnSelector] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "eventTime",
    "eventType",
    "eventName",
    "deviceSN",
  ]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedRows, setSelectedRows] = useState<Counter[]>([]);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
  const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
  const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Counter[]>([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalRows, setTotalRows] = useState(0);

  // Função para buscar os dados da paginação
  const fetchPaginationCounter = async (pageNo: string, perPage: string) => {
    setLoading(true);
    try {
      const data = await apiService.fetchAllContador(
        undefined,
        undefined,
        pageNo,
        perPage
      );
      setFilteredDevices(data.data);
      setTotalRows(data.totalRecords);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar acessos paginados:", error);
      setLoading(false);
    }
  };

  // Busca os dados do contador entre as datas especificadas
  const fetchAllCounterBetweenDates = async () => {
    try {
      const data = await apiService.fetchAllContador(startDate, endDate);
      setCounter(data.data);
      setTotalRows(data.totalRecords);
    } catch (error) {
      console.error("Erro ao buscar os dados do contador:", error);
    }
  };

  // Função para buscar os dados do contador de hoje
  const fetchCounterToday = async () => {
    const today = new Date();
    const start = formatDateToStartOfDay(today);
    const end = formatDateToEndOfDay(today);
    try {
      const data = await apiService.fetchAllContador(start, end);
      setCounter(data.data);
      setTotalRows(data.totalRecords);
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error("Erro ao buscar os dados do contador hoje:", error);
    }
  };

  // Função para buscar os dados do contador de ontem
  const fetchCounterForPreviousDay = async () => {
    const prevDate = new Date(startDate);
    prevDate.setDate(prevDate.getDate() - 1);

    const start = formatDateToStartOfDay(prevDate);
    const end = formatDateToEndOfDay(prevDate);

    try {
      const data = await apiService.fetchAllContador(start, end);
      setCounter(data.data);
      setTotalRows(data.totalRecords);
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error("Erro ao buscar os dados do contador ontem:", error);
    }
  };

  // Função para buscar os dados do contador de amanhã
  const fetchCounterForNextDay = async () => {
    const newDate = new Date(endDate);
    newDate.setDate(newDate.getDate() + 1);

    if (newDate > new Date()) {
      return;
    }

    const start = formatDateToStartOfDay(newDate);
    const end = formatDateToEndOfDay(newDate);

    try {
      const data = await apiService.fetchAllContador(start, end);
      setCounter(data.data);
      setTotalRows(data.totalRecords);
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error("Erro ao buscar os dados do contador amanhã:", error);
    }
  };

  // Busca os dados se a paginação mudar
  useEffect(() => {
    fetchPaginationCounter(String(currentPage), String(perPage));
  }, [currentPage, perPage]);

  // Função para atualizar as recolhas do moedeiro
  const refreshCounter = () => {
    fetchAllCounter(undefined, undefined, "1", "20");
    setTotalRows(counterTotalRecords);
    setCurrentPage(1);
    setPerPage(20);
    setStartDate(formatDateToStartOfDay(pastDate));
    setEndDate(formatDateToEndOfDay(currentDate));
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para selecionar as colunas
  const toggleColumn = (columnName: string) => {
    if (selectedColumns.includes(columnName)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== columnName));
    } else {
      setSelectedColumns([...selectedColumns, columnName]);
    }
  };

  // Callback disparado ao mudar a página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Callback disparado ao mudar o tamanho da página
  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  // Função para resetar as colunas
  const resetColumns = () => {
    setSelectedColumns(["eventTime", "eventType", "eventName", "deviceSN"]);
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
    const sortedSelectedRows = state.selectedRows.sort(
      (a, b) =>
        new Date(b.eventTime).getTime() - new Date(a.eventTime).getTime()
    );
    setSelectedRows(sortedSelectedRows);
  };

  // Opções de paginação da tabela com troca de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Define a seleção da árvore
  const handleSelectFromTreeView = async (selectedIds: string[]) => {
    setSelectedDevicesIds(selectedIds);

    if (selectedIds.length > 0) {
      try {
        const foundDevices = await apiService.fetchAllContador(
          undefined,
          undefined,
          undefined,
          undefined,
          selectedIds
        );
        if (foundDevices.data) {
          setFilteredDevices(foundDevices.data);
          setTotalRows(foundDevices.totalRecords);
        } else {
          setFilteredDevices([]);
        }
      } catch (error) {
        console.error("Erro ao buscar dispositivos por sn:", error);
      }
    } else {
      refreshCounter();
      setFilteredDevices(counter);
    }
  };

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
    if (!Array.isArray(filteredDevices)) {
      return [];
    }
    return filteredDevices
      .filter(
        (getCoin) =>
          Object.keys(filters).every(
            (key) =>
              filters[key] === "" ||
              (getCoin[key] != null &&
                String(getCoin[key])
                  .toLowerCase()
                  .includes(filters[key].toLowerCase()))
          ) &&
          Object.entries(getCoin).some(([key, value]) => {
            if (selectedColumns.includes(key) && value != null) {
              if (value instanceof Date) {
                return value
                  .toLocaleString()
                  .toLowerCase()
                  .includes(filterText.toLowerCase());
              } else {
                return value
                  .toString()
                  .toLowerCase()
                  .includes(filterText.toLowerCase());
              }
            }
            return false;
          })
      )
      .sort(
        (a, b) =>
          new Date(b.eventTime).getTime() - new Date(a.eventTime).getTime()
      );
  }, [filteredDevices, filters, filterText]);

  // Define as colunas da tabela
  const columns: TableColumn<Counter>[] = counterFields
    .filter((field) => selectedColumns.includes(field.key))
    .sort((a, b) => {
      if (a.key === "deviceSN") return 1;
      else if (b.key === "deviceSN") return -1;
      else return 0;
    })
    .map((field) => {
      const formatField = (row: Counter) => {
        switch (field.key) {
          case "deviceSN":
            return (
              devices.find((device) => device.serialNumber === row.deviceSN)
                ?.deviceName || ""
            );
          default:
            return row[field.key] || "";
        }
      };
      return {
        id: field.key,
        name: (
          <>
            {field.label}
            {field.key !== "dataRecolha" && (
              <SelectFilter
                column={field.key}
                setFilters={setFilters}
                data={filteredDataTable}
              />
            )}
          </>
        ),
        selector: (row) => formatField(row),
        sortable: true,
        sortFunction: (rowA, rowB) =>
          new Date(rowB.dataRecolha).getTime() -
          new Date(rowA.dataRecolha).getTime(),
      };
    });

  // Função para gerar os dados com nomes substituídos para o export/print
  const transformTransactionWithNames = (transaction: { deviceSN: string }) => {
    const deviceMatch = devices.find(
      (device) => device.serialNumber === transaction.deviceSN
    );
    const deviceName = deviceMatch?.deviceName;

    return {
      ...transaction,
      deviceSN: deviceName,
    };
  };

  // Dados dos pagamentos com nomes substituídos
  const getCounterWithNames = filteredDataTable.map(
    transformTransactionWithNames
  );

  // Transforma as linhas selecionadas com nomes substituídos
  const selectedRowsWithNames = selectedRows.map(transformTransactionWithNames);

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return counterFields.filter((field) => selectedColumns.includes(field.key));
  };

  // Controla o loading da tabela
  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    if (filteredDataTable.length > 0) {
      clearTimeout(timeout);
      setLoading(false);
    }

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="main-container">
      <div className="content-container">
        {isMobile && (
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span>Contador de Dados</span>
            </div>
            <div className="datatable-header">
              <div>
                <CustomSearchBox
                  label="Pesquisa"
                  variant="outlined"
                  size="small"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  style={{ marginTop: -5 }}
                />
              </div>
              <div className="buttons-container-others">
                <OverlayTrigger
                  placement="top"
                  delay={0}
                  container={document.body}
                  popperConfig={{
                    strategy: "fixed",
                    modifiers: [
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "window",
                        },
                      },
                    ],
                  }}
                  overlay={
                    <Tooltip className="custom-tooltip">Atualizar</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-arrow-clockwise"
                    onClick={refreshCounter}
                  />
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  delay={0}
                  container={document.body}
                  popperConfig={{
                    strategy: "fixed",
                    modifiers: [
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "window",
                        },
                      },
                    ],
                  }}
                  overlay={
                    <Tooltip className="custom-tooltip">Colunas</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-eye"
                    onClick={() => setOpenColumnSelector(true)}
                  />
                </OverlayTrigger>
                <ExportButton
                  allData={getCounterWithNames}
                  selectedData={
                    selectedRows.length > 0
                      ? selectedRowsWithNames
                      : getCounterWithNames
                  }
                  fields={getSelectedFields()}
                />
                <PrintButton
                  data={
                    selectedRows.length > 0
                      ? selectedRowsWithNames
                      : getCounterWithNames
                  }
                  fields={getSelectedFields()}
                />
              </div>
              <div className="buttons-container-data-range">
                <OverlayTrigger
                  placement="top"
                  delay={0}
                  container={document.body}
                  popperConfig={{
                    strategy: "fixed",
                    modifiers: [
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "window",
                        },
                      },
                    ],
                  }}
                  overlay={
                    <Tooltip className="custom-tooltip">Contador Hoje</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-calendar-event"
                    onClick={fetchCounterToday}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  delay={0}
                  container={document.body}
                  popperConfig={{
                    strategy: "fixed",
                    modifiers: [
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "window",
                        },
                      },
                    ],
                  }}
                  overlay={
                    <Tooltip className="custom-tooltip">
                      Contador Dia Anterior
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-left-circle"
                    onClick={fetchCounterForPreviousDay}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  delay={0}
                  container={document.body}
                  popperConfig={{
                    strategy: "fixed",
                    modifiers: [
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "window",
                        },
                      },
                    ],
                  }}
                  overlay={
                    <Tooltip className="custom-tooltip">
                      Contador Dia Seguinte
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-right-circle"
                    onClick={fetchCounterForNextDay}
                    iconSize="1.1em"
                    disabled={
                      new Date(endDate) >=
                      new Date(new Date().toISOString().substring(0, 10))
                    }
                  />
                </OverlayTrigger>
              </div>
              <div className="date-range-search">
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="search-input"
                />
                <span> até </span>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="search-input"
                />
                <OverlayTrigger
                  placement="top"
                  delay={0}
                  container={document.body}
                  popperConfig={{
                    strategy: "fixed",
                    modifiers: [
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "window",
                        },
                      },
                    ],
                  }}
                  overlay={<Tooltip className="custom-tooltip">Buscar</Tooltip>}
                >
                  <CustomOutlineButton
                    icon="bi-search"
                    onClick={fetchAllCounterBetweenDates}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
              </div>
            </div>
            <div className="table-css">
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                  }}
                >
                  <CustomSpinner />
                </div>
              ) : (
                <DataTable
                  columns={columns}
                  data={filteredDataTable}
                  pagination
                  paginationComponentOptions={paginationOptions}
                  paginationRowsPerPageOptions={[20, 50]}
                  selectableRows
                  onSelectedRowsChange={handleRowSelected}
                  clearSelectedRows={clearSelectionToggle}
                  selectableRowsHighlight
                  noDataComponent="Não existem dados disponíveis para mostrar."
                  customStyles={customStyles}
                  striped
                  responsive
                  persistTableHead={true}
                  defaultSortAsc={true}
                  defaultSortFieldId="eventTime"
                  paginationIconFirstPage={
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handlePageChange(1)}
                    >
                      <i className="bi bi-chevron-double-left" />
                    </span>
                  }
                  paginationIconLastPage={
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handlePageChange(counterPages)}
                    >
                      <i className="bi bi-chevron-double-right" />
                    </span>
                  }
                  progressPending={loading}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handleRowsPerPageChange}
                  paginationServer
                  paginationTotalRows={totalRows}
                  paginationDefaultPage={currentPage}
                  paginationPerPage={perPage}
                />
              )}
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ marginLeft: 10, marginRight: 10 }}>
                <strong>Total de Movimentos:</strong> {counterTotalRecords ?? 0}
              </div>
            </div>
          </div>
        )}
        <Split
          className="split"
          sizes={[15, 85]}
          minSize={100}
          expandToMin={true}
          gutterSize={15}
          gutterAlign="center"
          snapOffset={0}
          dragInterval={1}
        >
          <div className="treeview-container">
            <TreeViewDataDevice onSelectDevices={handleSelectFromTreeView} />
          </div>
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span>Contador de Dados</span>
            </div>
            <div className="datatable-header">
              <div>
                <CustomSearchBox
                  label="Pesquisa"
                  variant="outlined"
                  size="small"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  style={{ marginTop: -5 }}
                />
              </div>
              <div className="buttons-container-others">
                <OverlayTrigger
                  placement="top"
                  delay={0}
                  container={document.body}
                  popperConfig={{
                    strategy: "fixed",
                    modifiers: [
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "window",
                        },
                      },
                    ],
                  }}
                  overlay={
                    <Tooltip className="custom-tooltip">Atualizar</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-arrow-clockwise"
                    onClick={refreshCounter}
                  />
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  delay={0}
                  container={document.body}
                  popperConfig={{
                    strategy: "fixed",
                    modifiers: [
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "window",
                        },
                      },
                    ],
                  }}
                  overlay={
                    <Tooltip className="custom-tooltip">Colunas</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-eye"
                    onClick={() => setOpenColumnSelector(true)}
                  />
                </OverlayTrigger>
                <ExportButton
                  allData={getCounterWithNames}
                  selectedData={
                    selectedRows.length > 0
                      ? selectedRowsWithNames
                      : getCounterWithNames
                  }
                  fields={getSelectedFields()}
                />
                <PrintButton
                  data={
                    selectedRows.length > 0
                      ? selectedRowsWithNames
                      : getCounterWithNames
                  }
                  fields={getSelectedFields()}
                />
              </div>
              <div className="buttons-container-data-range">
                <OverlayTrigger
                  placement="top"
                  delay={0}
                  container={document.body}
                  popperConfig={{
                    strategy: "fixed",
                    modifiers: [
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "window",
                        },
                      },
                    ],
                  }}
                  overlay={
                    <Tooltip className="custom-tooltip">Contador Hoje</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-calendar-event"
                    onClick={fetchCounterToday}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  delay={0}
                  container={document.body}
                  popperConfig={{
                    strategy: "fixed",
                    modifiers: [
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "window",
                        },
                      },
                    ],
                  }}
                  overlay={
                    <Tooltip className="custom-tooltip">
                      Contador Dia Anterior
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-left-circle"
                    onClick={fetchCounterForPreviousDay}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  delay={0}
                  container={document.body}
                  popperConfig={{
                    strategy: "fixed",
                    modifiers: [
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "window",
                        },
                      },
                    ],
                  }}
                  overlay={
                    <Tooltip className="custom-tooltip">
                      Contador Dia Seguinte
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-right-circle"
                    onClick={fetchCounterForNextDay}
                    iconSize="1.1em"
                    disabled={
                      new Date(endDate) >=
                      new Date(new Date().toISOString().substring(0, 10))
                    }
                  />
                </OverlayTrigger>
              </div>
              <div className="date-range-search">
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="search-input"
                />
                <span> até </span>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="search-input"
                />
                <OverlayTrigger
                  placement="top"
                  delay={0}
                  container={document.body}
                  popperConfig={{
                    strategy: "fixed",
                    modifiers: [
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "window",
                        },
                      },
                    ],
                  }}
                  overlay={<Tooltip className="custom-tooltip">Buscar</Tooltip>}
                >
                  <CustomOutlineButton
                    icon="bi-search"
                    onClick={fetchAllCounterBetweenDates}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
              </div>
            </div>
            <div className="table-css">
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                  }}
                >
                  <CustomSpinner />
                </div>
              ) : (
                <DataTable
                  columns={columns}
                  data={filteredDataTable}
                  pagination
                  paginationComponentOptions={paginationOptions}
                  paginationRowsPerPageOptions={[20, 50]}
                  selectableRows
                  onSelectedRowsChange={handleRowSelected}
                  clearSelectedRows={clearSelectionToggle}
                  selectableRowsHighlight
                  noDataComponent="Não existem dados disponíveis para mostrar."
                  customStyles={customStyles}
                  striped
                  responsive
                  persistTableHead={true}
                  defaultSortAsc={true}
                  defaultSortFieldId="eventTime"
                  paginationIconFirstPage={
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handlePageChange(1)}
                    >
                      <i className="bi bi-chevron-double-left" />
                    </span>
                  }
                  paginationIconLastPage={
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handlePageChange(counterPages)}
                    >
                      <i className="bi bi-chevron-double-right" />
                    </span>
                  }
                  progressPending={loading}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handleRowsPerPageChange}
                  paginationServer
                  paginationTotalRows={totalRows}
                  paginationDefaultPage={currentPage}
                  paginationPerPage={perPage}
                />
              )}
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ marginLeft: 10, marginRight: 10 }}>
                <strong>Total de Movimentos:</strong> {counterTotalRecords ?? 0}
              </div>
            </div>
          </div>
        </Split>
      </div>
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
};
