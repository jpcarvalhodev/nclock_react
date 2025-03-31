import { useEffect, useMemo, useState } from "react";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import Split from "react-split";
import { toast } from "react-toastify";

import * as apiService from "../../../api/apiService";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";

import { PrintButton } from "../../../components/PrintButton";
import { SelectFilter } from "../../../components/SelectFilter";
import { TreeViewDataDevice } from "../../../components/TreeViewDevice";
import { useKiosk } from "../../../context/KioskContext";

import { useTerminals } from "../../../context/TerminalsContext";
import { manualOpenDoorFields } from "../../../fields/Fields";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { ManualDoorOpenModal } from "../../../modals/ManualDoorOpenModal";
import { ManualOpenDoor } from "../../../types/Types";
import { SearchBoxContainer } from "../../../components/SearchBoxContainer";
import { CustomSpinner } from "../../../components/CustomSpinner";
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

// Formata a data para DD/MM/YYYY
const formatDateDDMMYYYY = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Define o componente de terminais
export const NkioskDoorOpen = () => {
  const { devices } = useTerminals();
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);
  const { manualOpenDoor, setManualOpenDoor, fetchAllManualOpen } = useKiosk();
  const [filters, setFilters] = useState<Filters>({});
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "createdDate",
    "nomeResponsavel",
    "deviceName",
    "doorName",
    "observacoes",
  ]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [selectedManualOpen, setSelectedManualOpen] =
    useState<ManualOpenDoor | null>(null);
  const [loadingManualOpen, setLoadingManualOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterText, setFilterText] = useState<string>("");
  const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
  const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
  const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<ManualOpenDoor[]>([]);
  const [selectedRows, setSelectedRows] = useState<ManualOpenDoor[]>([]);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 500 });

  // Função para buscar os dados de aberturas manuais entre datas
  const fetchManualOpenBetweenDates = async () => {
    try {
      const data = await apiService.fetchAllManualDoorOpen(startDate, endDate);
      if (Array.isArray(data)) {
        setManualOpenDoor(data);
      } else {
        setManualOpenDoor([]);
      }
    } catch (error) {
      console.error("Erro ao buscar os dados de aberturas manuais:", error);
    }
  };

  // Função para buscar os dados de aberturas manuais de hoje
  const fetchDoorOpenToday = async () => {
    const today = new Date();
    const start = formatDateToStartOfDay(today);
    const end = formatDateToEndOfDay(today);
    try {
      const data = await apiService.fetchAllManualDoorOpen(start, end);
      if (Array.isArray(data)) {
        setManualOpenDoor(data);
      } else {
        setManualOpenDoor([]);
      }
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error(
        "Erro ao buscar os dados de aberturas manuais hoje:",
        error
      );
    }
  };

  // Função para buscar os dados de aberturas manuais de ontem
  const fetchDoorOpenForPreviousDay = async () => {
    const prevDate = new Date(startDate);
    prevDate.setDate(prevDate.getDate() - 1);

    const start = formatDateToStartOfDay(prevDate);
    const end = formatDateToEndOfDay(prevDate);

    try {
      const data = await apiService.fetchAllManualDoorOpen(start, end);
      if (Array.isArray(data)) {
        setManualOpenDoor(data);
      } else {
        setManualOpenDoor([]);
      }
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error(
        "Erro ao buscar os dados de aberturas manuais ontem:",
        error
      );
    }
  };

  // Função para buscar os dados de aberturas manuais de amanhã
  const fetchDoorOpenForNextDay = async () => {
    const newDate = new Date(endDate);
    newDate.setDate(newDate.getDate() + 1);

    if (newDate > new Date()) {
      return;
    }

    const start = formatDateToStartOfDay(newDate);
    const end = formatDateToEndOfDay(newDate);

    try {
      const data = await apiService.fetchAllManualDoorOpen(start, end);
      if (Array.isArray(data)) {
        setManualOpenDoor(data);
      } else {
        setManualOpenDoor([]);
      }
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error(
        "Erro ao buscar os dados de aberturas manuais amanhã:",
        error
      );
    }
  };

  // Função para atualizar os dados de aberura manual
  const refreshAllManualOpen = () => {
    fetchAllManualOpen();
    setStartDate(formatDateToStartOfDay(pastDate));
    setEndDate(formatDateToEndOfDay(currentDate));
    setClearSelectionToggle((prev) => !prev);
  };

  // Busca os dados conforme o filtro de data mudar
  useEffect(() => {
    if (startDate && endDate) {
      fetchManualOpenBetweenDates();
    }
  }, [startDate, endDate]); 

  // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
  useEffect(() => {
    if (selectedDevicesIds.length > 0) {
      const filterDevices = devices.filter((device) =>
        selectedDevicesIds.includes(device.serialNumber)
      );
      const devicesFiltered = manualOpenDoor.filter((door) =>
        filterDevices.some((device) => device.deviceName === door.deviceName)
      );
      setFilteredDevices(devicesFiltered);
    } else {
      setFilteredDevices(manualOpenDoor);
    }
  }, [selectedDevicesIds, manualOpenDoor, devices]);

  // Função para resetar as colunas
  const handleResetColumns = () => {
    setSelectedColumns([
      "createdDate",
      "nomeResponsavel",
      "deviceName",
      "doorName",
      "observacoes",
    ]);
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
    const allColumnKeys = manualOpenDoorFields.map((field) => field.key);
    setSelectedColumns(allColumnKeys);
  };

  // Define a seleção da árvore
  const handleSelectFromTreeView = (selectedIds: string[]) => {
    setSelectedDevicesIds(selectedIds);
  };

  // Define a função de seleção de linhas de dispositivos
  const handleDeviceRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: ManualOpenDoor[];
  }) => {
    setSelectedRows(state.selectedRows);
    setSelectedManualOpen(state.selectedRows[0] || null);
  };

  // Filtra os dados da tabela de dispositivos
  const filteredDataTable = useMemo(() => {
    if (!Array.isArray(filteredDevices)) {
      return [];
    }
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
            if (key === "createdDate") {
              const date = new Date(value);
              const formatted = formatDateDDMMYYYY(date);
              return formatted
                .toLowerCase()
                .includes(filterText.toLowerCase());
            }
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
  }, [filteredDevices, filters, filterText, selectedColumns]);

  // Define as colunas de dispositivos
  const columns: TableColumn<ManualOpenDoor>[] = manualOpenDoorFields
    .filter((field) => selectedColumns.includes(field.key))
    .map((field) => {
      const formatField = (row: ManualOpenDoor) => {
        switch (field.key) {
          case "createdDate":
            return new Date(row.createdDate).toLocaleString() || "";
          default:
            return row[field.key];
        }
      };
      return {
        id: field.key,
        name: (
          <>
            {field.label}
            {field.key !== "createdDate" && (
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
          new Date(rowB.createdDate).getTime() -
          new Date(rowA.createdDate).getTime(),
      };
    });

  // Define as opções de paginação de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Função para abrir manualmente
  const handleOpenManualDoor = () => {
    setLoadingManualOpen(true);
    setModalOpen(true);
  };

  // Função para fechar a abertura manual
  const handleCloseManualDoor = () => {
    setLoadingManualOpen(false);
    setModalOpen(false);
  };

  // Função para enviar a abertura manualmente
  const handleManualOpenSave = async (door: Partial<ManualOpenDoor>) => {
    setModalOpen(false);
    try {
      const data = await apiService.addManualOpenDoor(door);
      setManualOpenDoor([...manualOpenDoor, data]);
      setLoadingManualOpen(false);
      toast.success(data.message || "Abertura manual com sucesso!");
    } catch (error) {
      setLoadingManualOpen(false);
      console.error("Erro ao abrir manualmente", error);
    } finally {
      fetchAllManualOpen();
    }
  };

  // Calcula o valor total dos movimentos
  const totalAmount = filteredDataTable.length;

  // Função para gerar os dados com nomes substituídos para o export/print
  const transformTransactionWithNames = (transaction: {
    deviceName: string;
  }) => {
    const deviceMatch = devices.find(
      (device) => device.deviceName === transaction.deviceName
    );

    return {
      ...transaction,
      deviceSN: deviceMatch,
    };
  };

  // Dados com nomes substituídos
  const manualOpenWithNames = filteredDataTable.map(
    transformTransactionWithNames
  );

  // Transforma as linhas selecionadas com nomes substituídos
  const selectedRowsWithNames = selectedRows.map(transformTransactionWithNames);

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return manualOpenDoorFields.filter((field) =>
      selectedColumns.includes(field.key)
    );
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
              <span>Aberturas Manuais</span>
            </div>
            <div className="datatable-header">
              <div className="buttons-container-others-mb">
                <SearchBoxContainer
                  onSearch={(value) => setFilterText(value)}
                />
                <div className="custom-buttons">
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
                      onClick={refreshAllManualOpen}
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
                    allData={manualOpenWithNames}
                    selectedData={
                      selectedRows.length > 0
                        ? selectedRowsWithNames
                        : manualOpenWithNames
                    }
                    fields={getSelectedFields()}
                  />
                  <PrintButton
                    data={
                      selectedRows.length > 0
                        ? selectedRowsWithNames
                        : manualOpenWithNames
                    }
                    fields={getSelectedFields()}
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
                    overlay={
                      <Tooltip className="custom-tooltip">Abrir</Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-power"
                      onClick={handleOpenManualDoor}
                      iconSize="1.1em"
                    />
                  </OverlayTrigger>
                  {loadingManualOpen && (
                    <Spinner
                      animation="border"
                      size="sm"
                      style={{ marginTop: 5, marginLeft: 5 }}
                    />
                  )}
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
                        Aberturas Hoje
                      </Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-calendar-event"
                      onClick={fetchDoorOpenToday}
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
                        Aberturas Dia Anterior
                      </Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-arrow-left-circle"
                      onClick={fetchDoorOpenForPreviousDay}
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
                        Aberturas Dia Seguinte
                      </Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-arrow-right-circle"
                      onClick={fetchDoorOpenForNextDay}
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
                    overlay={
                      <Tooltip className="custom-tooltip">Buscar</Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi-search"
                      onClick={fetchManualOpenBetweenDates}
                      iconSize="1.1em"
                    />
                  </OverlayTrigger>
                </div>
              </div>
            </div>
            <div className="deviceMobile">
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
                  paginationRowsPerPageOptions={[20, 50]}
                  selectableRows
                  onSelectedRowsChange={handleDeviceRowSelected}
                  selectableRowsHighlight
                  clearSelectedRows={clearSelectionToggle}
                  noDataComponent="Não existem dados disponíveis para mostrar."
                  customStyles={customStyles}
                  striped
                  responsive
                  persistTableHead={true}
                  defaultSortAsc={true}
                  defaultSortFieldId="createdDate"
                />
              )}
            </div>
            <div style={{ marginLeft: 10 }}>
              <strong>Movimentos de Abertura Manual: </strong>
              {totalAmount}
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
              <span>Aberturas Manuais</span>
            </div>
            <div className="datatable-header">
              <div className="buttons-container-others-mb">
                <SearchBoxContainer
                  onSearch={(value) => setFilterText(value)}
                />
                <div className="custom-buttons">
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
                      onClick={refreshAllManualOpen}
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
                    allData={manualOpenWithNames}
                    selectedData={
                      selectedRows.length > 0
                        ? selectedRowsWithNames
                        : manualOpenWithNames
                    }
                    fields={getSelectedFields()}
                  />
                  <PrintButton
                    data={
                      selectedRows.length > 0
                        ? selectedRowsWithNames
                        : manualOpenWithNames
                    }
                    fields={getSelectedFields()}
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
                    overlay={
                      <Tooltip className="custom-tooltip">Abrir</Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-power"
                      onClick={handleOpenManualDoor}
                      iconSize="1.1em"
                    />
                  </OverlayTrigger>
                  {loadingManualOpen && (
                    <Spinner
                      animation="border"
                      size="sm"
                      style={{ marginTop: 5, marginLeft: 5 }}
                    />
                  )}
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
                        Aberturas Hoje
                      </Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-calendar-event"
                      onClick={fetchDoorOpenToday}
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
                        Aberturas Dia Anterior
                      </Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-arrow-left-circle"
                      onClick={fetchDoorOpenForPreviousDay}
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
                        Aberturas Dia Seguinte
                      </Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-arrow-right-circle"
                      onClick={fetchDoorOpenForNextDay}
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
                    overlay={
                      <Tooltip className="custom-tooltip">Buscar</Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi-search"
                      onClick={fetchManualOpenBetweenDates}
                      iconSize="1.1em"
                    />
                  </OverlayTrigger>
                </div>
              </div>
            </div>
            <div className="deviceMobile">
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
                  paginationRowsPerPageOptions={[20, 50]}
                  selectableRows
                  onSelectedRowsChange={handleDeviceRowSelected}
                  selectableRowsHighlight
                  clearSelectedRows={clearSelectionToggle}
                  noDataComponent="Não existem dados disponíveis para mostrar."
                  customStyles={customStyles}
                  striped
                  responsive
                  persistTableHead={true}
                  defaultSortAsc={true}
                  defaultSortFieldId="createdDate"
                />
              )}
            </div>
            <div style={{ marginLeft: 10 }}>
              <strong>Movimentos de Abertura Manual: </strong>
              {totalAmount}
            </div>
          </div>
        </Split>
      </div>
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
        title="Abertura Manual"
        open={modalOpen}
        onClose={handleCloseManualDoor}
        onSave={handleManualOpenSave}
        fields={manualOpenDoorFields}
      />
    </div>
  );
};
