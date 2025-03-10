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
import { TreeViewDataNkioskPay } from "../../../components/TreeViewNkioskPay";
import { useKiosk } from "../../../context/KioskContext";

import { useNavbar } from "../../../context/NavbarContext";
import { useTerminals } from "../../../context/TerminalsContext";
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

export const NkioskListPayments = () => {
  const { devices, mbDevices } = useTerminals();
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);
  const {
    fetchAllMBAndCoin,
    totalPayments,
    totalPaymentsPages,
    totalPaymentsTotalRecords,
  } = useKiosk();
  const { kioskConfig } = useNavbar();
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
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalRows, setTotalRows] = useState(0);

  // Função para buscar os dados da paginação
  const fetchPaginationTotalPay = async (pageNo: string, perPage: string) => {
    setLoading(true);
    try {
      const data = await apiService.fetchKioskTransactionsByMBPayCoins(
        undefined,
        undefined,
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

  // Função para buscar as listagens de pagamentos entre datas
  const fetchPaymentsBetweenDates = async () => {
    try {
      const data = await apiService.fetchKioskTransactionsByMBPayCoins(
        undefined,
        undefined,
        startDate,
        endDate
      );
      setFilteredDevices(data.data);
      setTotalRows(data.totalRecords);
    } catch (error) {
      console.error(
        "Erro ao buscar os dados de listagem de pagamentos:",
        error
      );
    }
  };

  // Função para buscar as listagens de pagamentos hoje
  const fetchTotalPaymentsToday = async () => {
    try {
      const data = await apiService.fetchKioskTransactionsByMBPayCoins(
        undefined,
        undefined,
        startDate,
        endDate
      );
      setFilteredDevices(data.data);
      setTotalRows(data.totalRecords);
      setStartDate(formatDateToStartOfDay(currentDate));
      setEndDate(formatDateToEndOfDay(currentDate));
    } catch (error) {
      console.error(
        "Erro ao buscar os dados de listagem de pagamentos hoje:",
        error
      );
    }
  };

  // Função para buscar os pagamentos do moedeiro de ontem
  const fetchPaymentsCoinForPreviousDay = async () => {
    const prevDate = new Date(startDate);
    prevDate.setDate(prevDate.getDate() - 1);

    const start = formatDateToStartOfDay(prevDate);
    const end = formatDateToEndOfDay(prevDate);

    try {
      const data = await apiService.fetchKioskTransactionsByMBPayCoins(
        undefined,
        undefined,
        start,
        end
      );
      setFilteredDevices(data.data);
      setTotalRows(data.totalRecords);
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error(
        "Erro ao buscar os dados de listagem de pagamento de ontem:",
        error
      );
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
      const data = await apiService.fetchKioskTransactionsByMBPayCoins(
        undefined,
        undefined,
        start,
        end
      );
      setFilteredDevices(data.data);
      setTotalRows(data.totalRecords);
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error(
        "Erro ao buscar os dados de listagem de pagamentos de amanhã:",
        error
      );
    }
  };

  // Busca os dados se a paginação mudar
  useEffect(() => {
    fetchPaginationTotalPay(String(currentPage), String(perPage));
  }, [currentPage, perPage]);

  // Função para atualizar as listagens de pagamentos
  const refreshListPayments = () => {
    fetchAllMBAndCoin(undefined, undefined, undefined, undefined, "1", "20");
    setTotalRows(totalPaymentsTotalRecords);
    setStartDate(formatDateToStartOfDay(pastDate));
    setEndDate(formatDateToEndOfDay(currentDate));
    setClearSelectionToggle((prev) => !prev);
  };

  // Define a seleção da árvore
  const handleSelectFromTreeView = async (selectedIds: string[]) => {
    setSelectedDevicesIds(selectedIds);

    if (selectedIds.length > 0) {
      try {
        const foundDevices =
          await apiService.fetchKioskTransactionsByMBPayCoins(
            undefined,
            selectedIds,
            undefined,
            undefined,
            undefined,
            undefined
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
      refreshListPayments();
      setFilteredDevices(totalPayments);
    }
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
    if (!Array.isArray(filteredDevices)) {
      return [];
    }
    return filteredDevices
      .filter(
        (payTerminals) =>
          Object.keys(filters).every(
            (key) =>
              filters[key] === "" ||
              (payTerminals[key] != null &&
                String(payTerminals[key])
                  .toLowerCase()
                  .includes(filters[key].toLowerCase()))
          ) &&
          Object.entries(payTerminals).some(([key, value]) => {
            if (selectedColumns.includes(key) && value != null) {
              if (key === "transactionType") {
                const typeText = value === 1 ? "Multibanco" : "Moedeiro";
                return typeText
                  .toLowerCase()
                  .includes(filterText.toLowerCase());
              } else if (value instanceof Date) {
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
              (terminal) => terminal.id === row.tpId
            );
            const terminalName = terminalMatch?.nomeQuiosque || "";
            return terminalName || "";
          case "deviceSN":
            return (
              devices.find((device) => device.serialNumber === row.deviceSN)
                ?.deviceName || ""
            );
          case "transactionType":
            return row.transactionType === 1 ? "Multibanco" : "Moedeiro";
          case "timestamp":
            return new Date(row.timestamp).toLocaleString() || "";
          case "amount":
            return `${row[field.key]}€`;
          case "clientTicket":
          case "merchantTicket":
            const imageUrl = row[field.key];
            if (imageUrl) {
              const uploadPath = imageUrl.substring(
                imageUrl.indexOf("/Uploads")
              );
              const fullImageUrl = `${apiService.baseURL}${uploadPath}`;
              return (
                <a
                  style={{ color: "black", textDecoration: "none" }}
                  href={fullImageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visualizar ticket
                </a>
              );
            } else {
              return "";
            }
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

  // Calcula o valor total dos pagamentos no moedeiro
  const totalAmount = totalPaymentsTotalRecords * (kioskConfig.amount ?? 0);

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

  // Transforma os dados dos pagamentos com nomes substituídos
  const listTerminalsWithNames = totalPayments.map(
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
              <span>Recebimentos Totais</span>
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
                    onClick={refreshListPayments}
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
                  allData={listTerminalsWithNames}
                  selectedData={
                    selectedRows.length > 0
                      ? selectedRowsWithNames
                      : listTerminalsWithNames
                  }
                  fields={getSelectedFields()}
                />
                <PrintButton
                  data={
                    selectedRows.length > 0
                      ? selectedRowsWithNames
                      : listTerminalsWithNames
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
                    <Tooltip className="custom-tooltip">Total Hoje</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-calendar-event"
                    onClick={fetchTotalPaymentsToday}
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
                      Total Dia Anterior
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
                      Total Dia Seguinte
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
                  overlay={<Tooltip className="custom-tooltip">Buscar</Tooltip>}
                >
                  <CustomOutlineButton
                    icon="bi-search"
                    onClick={fetchPaymentsBetweenDates}
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
                  defaultSortFieldId="timestamp"
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
                      onClick={() => handlePageChange(totalPaymentsPages)}
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
              <div style={{ marginLeft: 10, marginTop: -5 }}>
                <strong>Recebimentos Totais: </strong> Valor -{" "}
                {totalAmount.toFixed(2)}€ | Visitantes -{" "}
                {totalPaymentsTotalRecords}
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
            <TreeViewDataNkioskPay onSelectDevices={handleSelectFromTreeView} />
          </div>
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span>Recebimentos Totais</span>
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
                    onClick={refreshListPayments}
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
                  allData={listTerminalsWithNames}
                  selectedData={
                    selectedRows.length > 0
                      ? selectedRowsWithNames
                      : listTerminalsWithNames
                  }
                  fields={getSelectedFields()}
                />
                <PrintButton
                  data={
                    selectedRows.length > 0
                      ? selectedRowsWithNames
                      : listTerminalsWithNames
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
                    <Tooltip className="custom-tooltip">Total Hoje</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-calendar-event"
                    onClick={fetchTotalPaymentsToday}
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
                      Total Dia Anterior
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
                      Total Dia Seguinte
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
                  overlay={<Tooltip className="custom-tooltip">Buscar</Tooltip>}
                >
                  <CustomOutlineButton
                    icon="bi-search"
                    onClick={fetchPaymentsBetweenDates}
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
                  defaultSortFieldId="timestamp"
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
                      onClick={() => handlePageChange(totalPaymentsPages)}
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
              <div style={{ marginLeft: 10, marginTop: -5 }}>
                <strong>Recebimentos Totais: </strong> Valor -{" "}
                {totalAmount.toFixed(2)}€ | Visitantes -{" "}
                {totalPaymentsTotalRecords}
              </div>
            </div>
          </div>
        </Split>
      </div>
      {openColumnSelector && (
        <ColumnSelectorModal
          columns={transactionMBFields}
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
