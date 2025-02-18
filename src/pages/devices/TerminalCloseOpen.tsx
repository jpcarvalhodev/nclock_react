import { useEffect, useMemo, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import Split from "react-split";

import * as apiService from "../../api/apiService";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { customStyles } from "../../components/CustomStylesDataTable";
import { ExportButton } from "../../components/ExportButton";

import { PrintButton } from "../../components/PrintButton";
import { SelectFilter } from "../../components/SelectFilter";
import { TreeViewDataDevice } from "../../components/TreeViewDevice";

import { useTerminals } from "../../context/TerminalsContext";
import { mbDeviceCloseOpenFields } from "../../fields/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { MBDeviceCloseOpen } from "../../types/Types";
import { SearchBoxContainer } from "../../components/SearchBoxContainer";
import { CustomSpinner } from "../../components/CustomSpinner";
import { useMediaQuery } from "react-responsive";

// Define a interface para os filtros
interface Filters {
  [key: string]: string;
}

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T00:00`;
};

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T23:59`;
};

// Define o componente de terminais
export const TerminalCloseOpen = () => {
  const { mbDevices, mbCloseOpen, setMbCloseOpen, fetchAllMBCloseOpen } =
    useTerminals();
  const [filters, setFilters] = useState<Filters>({});
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "timestamp",
    "tpId",
    "fechoImage",
    "aberturaImage",
  ]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [resetSelection, setResetSelection] = useState(false);
  const [selectedDeviceRows, setSelectedDeviceRows] = useState<
    MBDeviceCloseOpen[]
  >([]);
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);
  const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
  const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
  const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<MBDeviceCloseOpen[]>(
    []
  );
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 500 });

  // Função para buscar todos os dispositivos multibanco entre datas
  const fetchAllDevicesBetweenDates = async () => {
    try {
      const data = await apiService.fetchAllTPCloseOpen(startDate, endDate);
      setMbCloseOpen(data);
    } catch (error) {
      console.error("Erro ao buscar terminais multibanco:", error);
    }
  };

  // Função para buscar os pagamentos dos terminais de hoje
  const fetchCloseOpenToday = async () => {
    const today = new Date();
    const start = formatDateToStartOfDay(today);
    const end = formatDateToEndOfDay(today);
    try {
      const data = await apiService.fetchAllTPCloseOpen(start, end);
      setMbCloseOpen(data);
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error("Erro ao buscar movimentos de hoje:", error);
    }
  };

  // Função para buscar os pagamentos dos terminais de ontem
  const fetchCloseOpenForPreviousDay = async () => {
    const prevDate = new Date(startDate);
    prevDate.setDate(prevDate.getDate() - 1);

    const start = formatDateToStartOfDay(prevDate);
    const end = formatDateToEndOfDay(prevDate);

    try {
      const data = await apiService.fetchAllTPCloseOpen(start, end);
      setMbCloseOpen(data);
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error("Erro ao buscar movimentos do dia anterior:", error);
    }
  };

  // Função para buscar os pagamentos dos terminais de amanhã
  const fetchCloseOpenForNextDay = async () => {
    const newDate = new Date(endDate);
    newDate.setDate(newDate.getDate() + 1);

    if (newDate > new Date()) {
      console.error(
        "Não é possível buscar movimentos para uma data no futuro."
      );
      return;
    }

    const start = formatDateToStartOfDay(newDate);
    const end = formatDateToEndOfDay(newDate);

    try {
      const data = await apiService.fetchAllTPCloseOpen(start, end);
      setMbCloseOpen(data);
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error("Erro ao buscar movimentos do dia seguinte:", error);
    }
  };

  // Função para atualizar todos os dispositivos
  const refreshOpenCloseDevices = () => {
    fetchAllMBCloseOpen();
    setStartDate(formatDateToStartOfDay(pastDate));
    setEndDate(formatDateToEndOfDay(currentDate));
  };

  // Atualiza os dados de renderização
  useEffect(() => {
    fetchAllMBCloseOpen();
  }, []);

  // Atualiza a seleção ao resetar
  useEffect(() => {
    if (resetSelection) {
      setResetSelection(false);
    }
  }, [resetSelection]);

  // Atualiza os dispositivos filtrados da treeview
  useEffect(() => {
    if (selectedDevicesIds.length > 0) {
      const filtered = mbCloseOpen.filter((devices) =>
        selectedDevicesIds.includes(devices.tpId)
      );
      setFilteredDevices(filtered);
    } else {
      setFilteredDevices(mbCloseOpen);
    }
  }, [selectedDevicesIds, mbCloseOpen]);

  // Define a seleção da árvore
  const handleSelectFromTreeView = (selectedIds: string[]) => {
    setSelectedDevicesIds(selectedIds);
  };

  // Função para resetar as colunas
  const handleResetColumns = () => {
    setSelectedColumns(["timestamp", "tpId", "fechoImage", "aberturaImage"]);
  };

  // Função para alternar a visibilidade das colunas
  const handleColumnToggle = (columnKey: string) => {
    if (selectedColumns.includes(columnKey)) {
      setSelectedColumns(selectedColumns.filter((key) => key !== columnKey));
    } else {
      setSelectedColumns([...selectedColumns, columnKey]);
    }
  };

  // Função para selecionar todas as colunas
  const handleSelectAllColumns = () => {
    const allColumnKeys = mbDeviceCloseOpenFields.map((field) => field.key);
    setSelectedColumns(allColumnKeys);
  };

  // Define a função de seleção de linhas de dispositivos
  const handleDeviceRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: MBDeviceCloseOpen[];
  }) => {
    const sortedSelectedRows = state.selectedRows.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    setSelectedDeviceRows(sortedSelectedRows);
  };

  // Filtra os dados da tabela de dispositivos
  const filteredDeviceDataTable = useMemo(() => {
    return filteredDevices.filter(
      (device) =>
        Object.keys(filters).every(
          (key) =>
            filters[key] === "" ||
            (device[key] != null &&
              String(device[key])
                .toLowerCase()
                .includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(device).some(([key, value]) => {
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
    );
  }, [filteredDevices, filters, filterText]);

  // Define as colunas de dispositivos
  const columns: TableColumn<MBDeviceCloseOpen>[] = mbDeviceCloseOpenFields
    .filter((field) => selectedColumns.includes(field.key))
    .sort((a, b) => {
      if (a.key === "timestamp") return -1;
      else if (b.key === "timestamp") return 1;
      else return 0;
    })
    .map((field) => {
      const formatField = (row: MBDeviceCloseOpen) => {
        switch (field.key) {
          case "tpId":
            const matchedDevice = mbDevices.find(
              (device) => device.id === row.tpId
            );
            return matchedDevice ? matchedDevice.nomeQuiosque || "" : "";
          case "timestamp":
            return new Date(row.timestamp).toLocaleString() || "";
          case "fechoImage":
            const imageUrlFecho = row[field.key];
            if (imageUrlFecho) {
              const uploadPath = imageUrlFecho.substring(
                imageUrlFecho.indexOf("/Uploads")
              );
              const fullImageUrl = `${apiService.baseURL}${uploadPath}`;
              return (
                <a
                  style={{ color: "black", textDecoration: "none" }}
                  href={fullImageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ticket Fecho
                </a>
              );
            } else {
              return "";
            }
          case "aberturaImage":
            const imageUrlAbertura = row[field.key];
            if (imageUrlAbertura) {
              const uploadPath = imageUrlAbertura.substring(
                imageUrlAbertura.indexOf("/Uploads")
              );
              const fullImageUrl = `${apiService.baseURL}${uploadPath}`;
              return (
                <a
                  style={{ color: "black", textDecoration: "none" }}
                  href={fullImageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ticket Abertura
                </a>
              );
            } else {
              return "";
            }
          default:
            return row[field.key];
        }
      };
      return {
        id: field.key,
        name: (
          <>
            {field.label}
            {field.key !== "timestamp" && (
              <SelectFilter
                column={field.key}
                setFilters={setFilters}
                data={filteredDeviceDataTable}
              />
            )}
          </>
        ),
        selector: (row) => formatField(row),
        sortable: true,
        sortFunction: (rowA, rowB) =>
          new Date(rowB.timestamp).getTime() -
          new Date(rowA.timestamp).getTime(),
      };
    });

  // Define as opções de paginação de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return mbDeviceCloseOpenFields.filter((field) =>
      selectedColumns.includes(field.key)
    );
  };

  // Controla o loading da tabela
  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    if (filteredDeviceDataTable.length > 0) {
      clearTimeout(timeout);
      setLoading(false);
    }

    return () => clearTimeout(timeout);
  }, [filteredDeviceDataTable]);

  return (
    <div className="main-container">
      <div className="content-container">
        {isMobile && (
          <div className="datatable-container">
            <div className="datatable-title-text" style={{ color: "#000000" }}>
              <span>Fechos e Aberturas dos Terminais Multibanco</span>
            </div>
            <div className="datatable-header">
              <div>
                <SearchBoxContainer
                  onSearch={(value) => setFilterText(value)}
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
                    onClick={refreshOpenCloseDevices}
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
                    onClick={() => setShowColumnSelector(true)}
                  />
                </OverlayTrigger>
                <ExportButton
                  allData={filteredDeviceDataTable}
                  selectedData={
                    selectedDeviceRows.length > 0
                      ? selectedDeviceRows
                      : filteredDeviceDataTable
                  }
                  fields={getSelectedFields()}
                />
                <PrintButton
                  data={
                    selectedDeviceRows.length > 0
                      ? selectedDeviceRows
                      : filteredDeviceDataTable
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
                    <Tooltip className="custom-tooltip">
                      Movimentos Hoje
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-calendar-event"
                    onClick={fetchCloseOpenToday}
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
                      Movimentos Dia Anterior
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-left-circle"
                    onClick={fetchCloseOpenForPreviousDay}
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
                      Movimentos Dia Seguinte
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-right-circle"
                    onClick={fetchCloseOpenForNextDay}
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
                    onClick={fetchAllDevicesBetweenDates}
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
                  data={filteredDeviceDataTable}
                  pagination
                  paginationComponentOptions={paginationOptions}
                  paginationPerPage={20}
                  selectableRows
                  onSelectedRowsChange={handleDeviceRowSelected}
                  selectableRowsHighlight
                  noDataComponent="Não existem dados disponíveis para exibir."
                  customStyles={customStyles}
                  striped
                  responsive
                  persistTableHead={true}
                  defaultSortAsc={true}
                  defaultSortFieldId="timestamp"
                />
              )}
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
            <div className="datatable-title-text" style={{ color: "#000000" }}>
              <span>Fechos e Aberturas dos Terminais Multibanco</span>
            </div>
            <div className="datatable-header">
              <div>
                <SearchBoxContainer
                  onSearch={(value) => setFilterText(value)}
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
                    onClick={refreshOpenCloseDevices}
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
                    onClick={() => setShowColumnSelector(true)}
                  />
                </OverlayTrigger>
                <ExportButton
                  allData={filteredDeviceDataTable}
                  selectedData={
                    selectedDeviceRows.length > 0
                      ? selectedDeviceRows
                      : filteredDeviceDataTable
                  }
                  fields={getSelectedFields()}
                />
                <PrintButton
                  data={
                    selectedDeviceRows.length > 0
                      ? selectedDeviceRows
                      : filteredDeviceDataTable
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
                    <Tooltip className="custom-tooltip">
                      Movimentos Hoje
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-calendar-event"
                    onClick={fetchCloseOpenToday}
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
                      Movimentos Dia Anterior
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-left-circle"
                    onClick={fetchCloseOpenForPreviousDay}
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
                      Movimentos Dia Seguinte
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-right-circle"
                    onClick={fetchCloseOpenForNextDay}
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
                    onClick={fetchAllDevicesBetweenDates}
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
                  data={filteredDeviceDataTable}
                  pagination
                  paginationComponentOptions={paginationOptions}
                  paginationPerPage={20}
                  selectableRows
                  onSelectedRowsChange={handleDeviceRowSelected}
                  selectableRowsHighlight
                  noDataComponent="Não existem dados disponíveis para exibir."
                  customStyles={customStyles}
                  striped
                  responsive
                  persistTableHead={true}
                  defaultSortAsc={true}
                  defaultSortFieldId="timestamp"
                />
              )}
            </div>
          </div>
        </Split>
      </div>
      {showColumnSelector && (
        <ColumnSelectorModal
          columns={mbDeviceCloseOpenFields}
          selectedColumns={selectedColumns}
          onClose={() => setShowColumnSelector(false)}
          onColumnToggle={handleColumnToggle}
          onResetColumns={handleResetColumns}
          onSelectAllColumns={handleSelectAllColumns}
        />
      )}
    </div>
  );
};
