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
import { TreeViewDataMBTerminals } from "../../../components/TreeViewMBTerminals";
import { useKiosk } from "../../../context/KioskContext";

import { useTerminals } from "../../../context/TerminalsContext";
import { mbDeviceStatusFields } from "../../../fields/Fields";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { MBDeviceStatus } from "../../../types/Types";
import { SearchBoxContainer } from "../../../components/SearchBoxContainer";
import { CustomSpinner } from "../../../components/CustomSpinner";

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T00:00`;
};

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T23:59`;
};

export const NkioskAlerts = () => {
  const { mbDevices } = useTerminals();
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);
  const { alerts, setAlerts, fetchAllTasks } = useKiosk();
  const [filterText, setFilterText] = useState<string>("");
  const [openColumnSelector, setOpenColumnSelector] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "tpId",
    "tipoStatus",
    "nomeStatus",
    "timespam",
  ]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedRows, setSelectedRows] = useState<MBDeviceStatus[]>([]);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
  const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
  const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<MBDeviceStatus[]>([]);
  const [loading, setLoading] = useState(false);

  // Função para buscar os alertas entre datas
  const fetchAlertsBetweenDates = async () => {
    try {
      const data = await apiService.fetchAllAlerts(startDate, endDate);
      if (Array.isArray(data)) {
        setAlerts(data);
      } else {
        setAlerts([]);
      }
    } catch (error) {
      console.error("Erro ao buscar os dados de alertas:", error);
    }
  };

  // Função para buscar os dados de limpezas de hoje
  const fetchAlertsToday = async () => {
    const today = new Date();
    const start = formatDateToStartOfDay(today);
    const end = formatDateToEndOfDay(today);
    try {
      const data = await apiService.fetchAllAlerts(start, end);
      if (Array.isArray(data)) {
        setAlerts(data);
      } else {
        setAlerts([]);
      }
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error("Erro ao buscar os dados de alertas hoje:", error);
    }
  };

  // Função para buscar os dados de limpezas de ontem
  const fetchAlertsForPreviousDay = async () => {
    const prevDate = new Date(startDate);
    prevDate.setDate(prevDate.getDate() - 1);

    const start = formatDateToStartOfDay(prevDate);
    const end = formatDateToEndOfDay(prevDate);

    try {
      const data = await apiService.fetchAllAlerts(start, end);
      if (Array.isArray(data)) {
        setAlerts(data);
      } else {
        setAlerts([]);
      }
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error("Erro ao buscar os dados de alertas ontem:", error);
    }
  };

  // Função para buscar os dados de limpezas de amanhã
  const fetchAlertsForNextDay = async () => {
    const newDate = new Date(endDate);
    newDate.setDate(newDate.getDate() + 1);

    if (newDate > new Date()) {
      console.error("Não é possível buscar limpezas para uma data no futuro.");
      return;
    }

    const start = formatDateToStartOfDay(newDate);
    const end = formatDateToEndOfDay(newDate);

    try {
      const data = await apiService.fetchAllAlerts(start, end);
      if (Array.isArray(data)) {
        setAlerts(data);
      } else {
        setAlerts([]);
      }
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error("Erro ao buscar os dados de alertas amanhã:", error);
    }
  };

  // Função para atualizar as recolhas do moedeiro
  const refreshTasks = () => {
    fetchAllTasks();
    setStartDate(formatDateToStartOfDay(pastDate));
    setEndDate(formatDateToEndOfDay(currentDate));
    setClearSelectionToggle((prev) => !prev);
  };

  // Atualiza os dispositivos filtrados da treeview
  useEffect(() => {
    if (selectedDevicesIds.length > 0) {
      const filtered = alerts.filter((mbDevices) =>
        selectedDevicesIds.includes(mbDevices.tpId)
      );
      setFilteredDevices(filtered);
    } else {
      setFilteredDevices(alerts);
    }
  }, [selectedDevicesIds, alerts]);

  // Função para selecionar as colunas
  const toggleColumn = (columnName: string) => {
    if (selectedColumns.includes(columnName)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== columnName));
    } else {
      setSelectedColumns([...selectedColumns, columnName]);
    }
  };

  // Função para resetar as colunas
  const resetColumns = () => {
    setSelectedColumns(["tpId", "tipoStatus", "nomeStatus", "timespam"]);
  };

  // Função para selecionar todas as colunas
  const onSelectAllColumns = (allColumnKeys: string[]) => {
    setSelectedColumns(allColumnKeys);
  };

  // Define a seleção da árvore
  const handleSelectFromTreeView = (selectedIds: string[]) => {
    setSelectedDevicesIds(selectedIds);
  };

  // Define a função de seleção de linhas
  const handleRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: MBDeviceStatus[];
  }) => {
    const sortedSelectedRows = state.selectedRows.sort(
      (a, b) => new Date(b.timespam).getTime() - new Date(a.timespam).getTime()
    );
    setSelectedRows(sortedSelectedRows);
  };

  // Opções de paginação da tabela com troca de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
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
          new Date(b.timespam).getTime() - new Date(a.timespam).getTime()
      );
  }, [filteredDevices, filters, filterText]);

  // Define as colunas da tabela
  const columns: TableColumn<MBDeviceStatus>[] = mbDeviceStatusFields
    .filter((field) => selectedColumns.includes(field.key))
    .filter((field) => field.key !== "tipoStatus")
    .sort((a, b) => {
      if (a.key === "timespam") return -1;
      else if (b.key === "timespam") return 1;
      else return 0;
    })
    .map((field) => {
      const formatField = (row: MBDeviceStatus) => {
        switch (field.key) {
          case "timespam":
            return new Date(row.timespam).toLocaleString() || "";
          case "tpId":
            return (
              mbDevices.find((device) => device.id === row.tpId)
                ?.nomeQuiosque || ""
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
            {field.key !== "timespam" && (
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
          new Date(rowB.timespam).getTime() - new Date(rowA.timespam).getTime(),
      };
    });

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return mbDeviceStatusFields.filter((field) =>
      selectedColumns.includes(field.key)
    );
  };

  // Controla o loading da tabela
  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    if (filteredDataTable.length > 0) {
      clearTimeout(timeout);
      setLoading(false);
    }

    return () => clearTimeout(timeout);
  }, [filteredDataTable]);

  return (
    <div className="main-container">
      <div className="content-container">
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
            <TreeViewDataMBTerminals
              onSelectDevices={handleSelectFromTreeView}
            />
          </div>
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span>Alertas</span>
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
            strategy: 'fixed',
            modifiers: [
              {
                name: 'preventOverflow',
                options: {
                  boundary: 'window',
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
                    onClick={refreshTasks}
                  />
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  delay={0}
          container={document.body}
          popperConfig={{
            strategy: 'fixed',
            modifiers: [
              {
                name: 'preventOverflow',
                options: {
                  boundary: 'window',
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
                  allData={filteredDataTable}
                  selectedData={
                    selectedRows.length > 0 ? selectedRows : filteredDataTable
                  }
                  fields={getSelectedFields()}
                />
                <PrintButton
                  data={
                    selectedRows.length > 0 ? selectedRows : filteredDataTable
                  }
                  fields={getSelectedFields()}
                />
              </div>
              <div className="date-range-search">
                <OverlayTrigger
                  placement="top"
                  delay={0}
          container={document.body}
          popperConfig={{
            strategy: 'fixed',
            modifiers: [
              {
                name: 'preventOverflow',
                options: {
                  boundary: 'window',
                },
              },
            ],
          }}
                  overlay={
                    <Tooltip className="custom-tooltip">Alertas Hoje</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-calendar-event"
                    onClick={fetchAlertsToday}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  delay={0}
          container={document.body}
          popperConfig={{
            strategy: 'fixed',
            modifiers: [
              {
                name: 'preventOverflow',
                options: {
                  boundary: 'window',
                },
              },
            ],
          }}
                  overlay={
                    <Tooltip className="custom-tooltip">
                      Alertas Dia Anterior
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-left-circle"
                    onClick={fetchAlertsForPreviousDay}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  delay={0}
          container={document.body}
          popperConfig={{
            strategy: 'fixed',
            modifiers: [
              {
                name: 'preventOverflow',
                options: {
                  boundary: 'window',
                },
              },
            ],
          }}
                  overlay={
                    <Tooltip className="custom-tooltip">
                      Alertas Dia Seguinte
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-right-circle"
                    onClick={fetchAlertsForNextDay}
                    iconSize="1.1em"
                    disabled={
                      new Date(endDate) >=
                      new Date(new Date().toISOString().substring(0, 10))
                    }
                  />
                </OverlayTrigger>
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
            strategy: 'fixed',
            modifiers: [
              {
                name: 'preventOverflow',
                options: {
                  boundary: 'window',
                },
              },
            ],
          }}
                  overlay={<Tooltip className="custom-tooltip">Buscar</Tooltip>}
                >
                  <CustomOutlineButton
                    icon="bi-search"
                    onClick={fetchAlertsBetweenDates}
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
                  paginationPerPage={20}
                  selectableRows
                  onSelectedRowsChange={handleRowSelected}
                  clearSelectedRows={clearSelectionToggle}
                  selectableRowsHighlight
                  noDataComponent="Não existem dados disponíveis para exibir."
                  customStyles={customStyles}
                  striped
                  responsive
                  persistTableHead={true}
                  defaultSortAsc={true}
                  defaultSortFieldId="timespam"
                />
              )}
            </div>
          </div>
        </Split>
      </div>
      {openColumnSelector && (
        <ColumnSelectorModal
          columns={mbDeviceStatusFields.filter(
            (field) => field.key !== "tipoStatus"
          )}
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
