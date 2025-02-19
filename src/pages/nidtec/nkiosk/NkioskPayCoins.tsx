import { useEffect, useMemo, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import Split from "react-split";
import { toast } from "react-toastify";

import * as apiService from "../../../api/apiService";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";

import { PrintButton } from "../../../components/PrintButton";
import { SelectFilter } from "../../../components/SelectFilter";
import { TreeViewDataNkioskPay } from "../../../components/TreeViewNkioskPay";
import { useKiosk } from "../../../context/KioskContext";

import { useNavbar } from "../../../context/NavbarContext";
import {
  TerminalsProvider,
  useTerminals,
} from "../../../context/TerminalsContext";
import { transactionMBFields } from "../../../fields/Fields";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { KioskTransactionMB } from "../../../types/Types";
import { SearchBoxContainer } from "../../../components/SearchBoxContainer";
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

export const NkioskPayCoins = () => {
  const { kioskConfig } = useNavbar();
  const { devices, mbDevices } = useTerminals();
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);
  const { payCoins, setPayCoins, fetchAllPayCoins } = useKiosk();
  const [filterText, setFilterText] = useState<string>("");
  const [openColumnSelector, setOpenColumnSelector] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "timestamp",
    "transactionType",
    "amount",
    "statusMessage",
    "deviceSN",
  ]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
  const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
  const [selectedRows, setSelectedRows] = useState<KioskTransactionMB[]>([]);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<KioskTransactionMB[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const eventDoorId = "2";

  // Função para buscar os pagamentos do moedeiro entre datas
  const fetchPaymentsCoinBetweenDates = async () => {
    try {
      if (devices.length === 0) {
        setPayCoins([]);
        return;
      }

      const promises = devices.map((device, i) => {
        return apiService.fetchKioskTransactionsByPayCoins(
          eventDoorId,
          device.serialNumber,
          startDate,
          endDate
        );
      });

      const allData = await Promise.all(promises);

      const validData = allData.filter(
        (data) => Array.isArray(data) && data.length > 0
      );

      const combinedData = validData.flat();

      setPayCoins(combinedData);
    } catch (error) {
      console.error("Erro ao buscar os dados do moedeiro:", error);
      setPayCoins([]);
    }
  };

  // Função para buscar os pagamentos do moedeiro de hoje
  const fetchPaymentsCoinToday = async () => {
    try {
      if (devices.length === 0) {
        setPayCoins([]);
        return;
      }

      const promises = devices.map((device, i) => {
        return apiService.fetchKioskTransactionsByPayCoins(
          eventDoorId,
          device.serialNumber,
          formatDateToStartOfDay(currentDate),
          formatDateToEndOfDay(currentDate)
        );
      });

      const allData = await Promise.all(promises);

      const validData = allData.filter(
        (data) => Array.isArray(data) && data.length > 0
      );

      const combinedData = validData.flat();

      setPayCoins(combinedData);

      setStartDate(formatDateToStartOfDay(currentDate));
      setEndDate(formatDateToEndOfDay(currentDate));
    } catch (error) {
      console.error(
        "Erro ao buscar os dados de pagamento do moedeiro hoje:",
        error
      );
      setPayCoins([]);
    }
  };

  // Função para buscar os pagamentos do moedeiro de ontem
  const fetchPaymentsCoinForPreviousDay = async () => {
    const prevDate = new Date(startDate);
    prevDate.setDate(prevDate.getDate() - 1);

    const start = formatDateToStartOfDay(prevDate);
    const end = formatDateToEndOfDay(prevDate);

    try {
      if (devices.length === 0) {
        setPayCoins([]);
        return;
      }

      const promises = devices.map((device, i) => {
        return apiService.fetchKioskTransactionsByPayCoins(
          eventDoorId,
          device.serialNumber,
          start,
          end
        );
      });

      const allData = await Promise.all(promises);

      const validData = allData.filter(
        (data) => Array.isArray(data) && data.length > 0
      );

      const combinedData = validData.flat();

      setPayCoins(combinedData);

      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error(
        "Erro ao buscar os dados de pagamento do moedeiro ontem:",
        error
      );
      setPayCoins([]);
    }
  };

  // Função para buscar os pagamentos do moedeiro de amanhã
  const fetchPaymentsCoinForNextDay = async () => {
    const newDate = new Date(endDate);
    newDate.setDate(newDate.getDate() + 1);

    if (newDate > new Date()) {
      return;
    }

    const start = formatDateToStartOfDay(newDate);
    const end = formatDateToEndOfDay(newDate);

    try {
      if (devices.length === 0) {
        setPayCoins([]);
        return;
      }

      const promises = devices.map((device, i) => {
        return apiService.fetchKioskTransactionsByPayCoins(
          eventDoorId,
          device.serialNumber,
          start,
          end
        );
      });

      const allData = await Promise.all(promises);

      const validData = allData.filter(
        (data) => Array.isArray(data) && data.length > 0
      );

      const combinedData = validData.flat();

      setPayCoins(combinedData);

      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error(
        "Erro ao buscar os dados de pagamento do moedeiro amanhã:",
        error
      );
      setPayCoins([]);
    }
  };

  // Função para buscar os dados da última recolha
  const fetchAllDataFromLastRecolha = async () => {
    if (selectedDevicesIds.length === 0) {
      toast.warn("Selecione um dispositivo primeiro!");
    }
    const hasDispositivosOrNidGroup = selectedDevicesIds.some(
      (id) => id === "dispositivos" || id === "nidgroup"
    );

    if (hasDispositivosOrNidGroup) {
      toast.warn("Selecione apenas o dispositivo!");
      return;
    }
    try {
      const data = await apiService.fetchDataFimRecolha(selectedDevicesIds[0]);
      const lastRecolhaDate = new Date(data);
      const filteredData = payCoins.filter((payCoin) => {
        const payCoinDate = new Date(payCoin.timestamp).toISOString();
        return payCoinDate >= lastRecolhaDate.toISOString();
      });
      setStartDate(formatDateToStartOfDay(lastRecolhaDate));
      setPayCoins(filteredData);
    } catch (error) {
      console.error("Erro ao buscar os dados da última recolha:", error);
    }
  };

  // Função para atualizar os pagamentos no moedeiro
  const refreshPayCoins = () => {
    fetchAllPayCoins();
    setStartDate(formatDateToStartOfDay(pastDate));
    setEndDate(formatDateToEndOfDay(currentDate));
    setClearSelectionToggle((prev) => !prev);
  };

  // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
  useEffect(() => {
    if (selectedDevicesIds.length > 0) {
      const filtered = payCoins.filter((payCoin) =>
        selectedDevicesIds.includes(payCoin.deviceSN)
      );
      setFilteredDevices(filtered);
    } else {
      setFilteredDevices(payCoins);
    }
  }, [selectedDevicesIds, payCoins]);

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
    setSelectedColumns([
      "timestamp",
      "transactionType",
      "amount",
      "statusMessage",
      "deviceSN",
    ]);
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
    selectedRows: KioskTransactionMB[];
  }) => {
    const sortedSelectedRows = state.selectedRows.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
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
        (payCoin) =>
          Object.keys(filters).every(
            (key) =>
              filters[key] === "" ||
              (payCoin[key] != null &&
                String(payCoin[key])
                  .toLowerCase()
                  .includes(filters[key].toLowerCase()))
          ) &&
          Object.entries(payCoin).some(([key, value]) => {
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
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
  }, [filteredDevices, filters, filterText]);

  // Define as colunas da tabela
  const columns: TableColumn<KioskTransactionMB>[] = transactionMBFields
    .filter((field) => selectedColumns.includes(field.key))
    .filter(
      (field) =>
        field.key !== "clientTicket" &&
        field.key !== "merchantTicket" &&
        field.key !== "tpId" &&
        field.key !== "email"
    )
    .sort((a, b) => {
      if (a.key === "timestamp") return -1;
      else if (b.key === "timestamp") return 1;
      else return 0;
    })
    .map((field) => {
      const formatField = (row: KioskTransactionMB) => {
        switch (field.key) {
          case "tpId":
            const terminalMatch = mbDevices.find(
              (terminal) => terminal.tpId === row.tpId
            );
            const terminalName = terminalMatch?.nomeQuiosque || "";
            return terminalName || "";
          case "deviceSN":
            return (
              devices.find((device) => device.serialNumber === row.deviceSN)
                ?.deviceName || ""
            );
          case "timestamp":
            return new Date(row.timestamp).toLocaleString() || "";
          case "transactionType":
            return row[field.key] === 1 ? "Multibanco" : "Moedeiro";
          case "amount":
            return `${row[field.key]}€`;
          default:
            return row[field.key] || "";
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
                data={filteredDataTable}
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

  // Calcula o total do valor dos pagamentos
  const totalAmount = filteredDataTable.length * (kioskConfig.amount ?? 0);

  // Função para gerar os dados com nomes substituídos para o export/print
  const transformTransactionWithNames = (transaction: {
    tpId: string;
    deviceSN: string;
    amount: any;
  }) => {
    const terminalMatch = mbDevices.find(
      (terminal) => terminal.id === transaction.tpId
    );
    const terminalName = terminalMatch?.nomeQuiosque || "";

    const deviceMatch = devices.find(
      (device) => device.serialNumber === transaction.deviceSN
    );
    const deviceName = deviceMatch?.deviceName || "";

    return {
      ...transaction,
      tpId: terminalName,
      deviceSN: deviceName,
      amount: `${transaction.amount}€`,
    };
  };

  // Dados dos pagamentos com nomes substituídos
  const payCoinsWithNames = filteredDataTable.map(
    transformTransactionWithNames
  );

  // Transforma as linhas selecionadas com nomes substituídos
  const selectedRowsWithNames = selectedRows.map(transformTransactionWithNames);

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return transactionMBFields.filter((field) =>
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
    <TerminalsProvider>
      <div className="main-container">
        <div className="content-container">
          {isMobile && (
            <div className="datatable-container">
              <div className="datatable-title-text">
                <span>Pagamentos no Moedeiro</span>
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
                      onClick={refreshPayCoins}
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
                    allData={payCoinsWithNames}
                    selectedData={
                      selectedRows.length > 0
                        ? selectedRowsWithNames
                        : payCoinsWithNames
                    }
                    fields={getSelectedFields()}
                  />
                  <PrintButton
                    data={
                      selectedRows.length > 0
                        ? selectedRowsWithNames
                        : payCoinsWithNames
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
                        Moedas Online
                      </Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-cash-coin"
                      onClick={fetchAllDataFromLastRecolha}
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
                      <Tooltip className="custom-tooltip">Moedas Hoje</Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-calendar-event"
                      onClick={fetchPaymentsCoinToday}
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
                        Moedas Dia Anterior
                      </Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-arrow-left-circle"
                      onClick={fetchPaymentsCoinForPreviousDay}
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
                        Moedas Dia Seguinte
                      </Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-arrow-right-circle"
                      onClick={fetchPaymentsCoinForNextDay}
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
                      onClick={fetchPaymentsCoinBetweenDates}
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
                    noDataComponent="Não existem dados disponíveis para mostrar."
                    customStyles={customStyles}
                    striped
                    responsive
                    persistTableHead={true}
                    defaultSortAsc={true}
                    defaultSortFieldId="timestamp"
                  />
                )}
              </div>
              <div style={{ marginLeft: 10, marginTop: -5 }}>
                <strong>Recebimentos Moedeiro: </strong> Valor -{" "}
                {totalAmount.toFixed(2)}€ | Visitantes -{" "}
                {filteredDataTable.length}
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
              <TreeViewDataNkioskPay
                onSelectDevices={handleSelectFromTreeView}
              />
            </div>
            <div className="datatable-container">
              <div className="datatable-title-text">
                <span>Pagamentos no Moedeiro</span>
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
                      onClick={refreshPayCoins}
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
                    allData={payCoinsWithNames}
                    selectedData={
                      selectedRows.length > 0
                        ? selectedRowsWithNames
                        : payCoinsWithNames
                    }
                    fields={getSelectedFields()}
                  />
                  <PrintButton
                    data={
                      selectedRows.length > 0
                        ? selectedRowsWithNames
                        : payCoinsWithNames
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
                        Moedas Online
                      </Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-cash-coin"
                      onClick={fetchAllDataFromLastRecolha}
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
                      <Tooltip className="custom-tooltip">Moedas Hoje</Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-calendar-event"
                      onClick={fetchPaymentsCoinToday}
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
                        Moedas Dia Anterior
                      </Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-arrow-left-circle"
                      onClick={fetchPaymentsCoinForPreviousDay}
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
                        Moedas Dia Seguinte
                      </Tooltip>
                    }
                  >
                    <CustomOutlineButton
                      icon="bi bi-arrow-right-circle"
                      onClick={fetchPaymentsCoinForNextDay}
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
                      onClick={fetchPaymentsCoinBetweenDates}
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
                    noDataComponent="Não existem dados disponíveis para mostrar."
                    customStyles={customStyles}
                    striped
                    responsive
                    persistTableHead={true}
                    defaultSortAsc={true}
                    defaultSortFieldId="timestamp"
                  />
                )}
              </div>
              <div style={{ marginLeft: 10, marginTop: -5 }}>
                <strong>Recebimentos Moedeiro: </strong> Valor -{" "}
                {totalAmount.toFixed(2)}€ | Visitantes -{" "}
                {filteredDataTable.length}
              </div>
            </div>
          </Split>
        </div>
        {openColumnSelector && (
          <ColumnSelectorModal
            columns={transactionMBFields.filter(
              (field) =>
                field.key !== "clientTicket" &&
                field.key !== "merchantTicket" &&
                field.key !== "tpId" &&
                field.key !== "email"
            )}
            selectedColumns={selectedColumns}
            onClose={() => setOpenColumnSelector(false)}
            onColumnToggle={toggleColumn}
            onResetColumns={resetColumns}
            onSelectAllColumns={onSelectAllColumns}
          />
        )}
      </div>
    </TerminalsProvider>
  );
};
