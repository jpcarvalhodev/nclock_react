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

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T00:00`;
};

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T23:59`;
};

export const NkioskPayTerminal = () => {
  const { kioskConfig } = useNavbar();
  const { devices, mbDevices } = useTerminals();
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);
  const { payTerminal, setPayTerminal, fetchAllPayTerminal } = useKiosk();
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

  // Função para buscar os pagamentos dos terminais entre datas
  const fetchPaymentsBetweenDates = async () => {
    try {
      const data = await apiService.fetchKioskTransactionsByMBAndDeviceSN(
        startDate,
        endDate
      );
      if (Array.isArray(data)) {
        setPayTerminal(data);
      } else {
        setPayTerminal([]);
      }
    } catch (error) {
      console.error(
        "Erro ao buscar os dados de pagamento dos terminais:",
        error
      );
    }
  };

  // Função para buscar os pagamentos dos terminais de hoje
  const fetchPaymentsToday = async () => {
    const today = new Date();
    const start = formatDateToStartOfDay(today);
    const end = formatDateToEndOfDay(today);
    try {
      const data = await apiService.fetchKioskTransactionsByMBAndDeviceSN(
        start,
        end
      );
      if (Array.isArray(data)) {
        setPayTerminal(data);
      } else {
        setPayTerminal([]);
      }
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error(
        "Erro ao buscar os dados de pagamento dos terminais hoje:",
        error
      );
    }
  };

  // Função para buscar os pagamentos dos terminais de ontem
  const fetchPaymentsForPreviousDay = async () => {
    const prevDate = new Date(startDate);
    prevDate.setDate(prevDate.getDate() - 1);

    const start = formatDateToStartOfDay(prevDate);
    const end = formatDateToEndOfDay(prevDate);

    try {
      const data = await apiService.fetchKioskTransactionsByMBAndDeviceSN(
        start,
        end
      );
      setPayTerminal(Array.isArray(data) ? data : []);
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error(
        "Erro ao buscar os dados de pagamento dos terminais de ontem:",
        error
      );
    }
  };

  // Função para buscar os pagamentos dos terminais de amanhã
  const fetchPaymentsForNextDay = async () => {
    const newDate = new Date(endDate);
    newDate.setDate(newDate.getDate() + 1);

    if (newDate > new Date()) {
      console.error(
        "Não é possível buscar pagamentos para uma data no futuro."
      );
      return;
    }

    const start = formatDateToStartOfDay(newDate);
    const end = formatDateToEndOfDay(newDate);

    try {
      const data = await apiService.fetchKioskTransactionsByMBAndDeviceSN(
        start,
        end
      );
      setPayTerminal(Array.isArray(data) ? data : []);
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error(
        "Erro ao buscar os dados de pagamento dos terminais de amanhã:",
        error
      );
    }
  };

  // Função para atualizar os pagamentos dos terminais
  const refreshPayTerminal = () => {
    fetchAllPayTerminal();
    setStartDate(formatDateToStartOfDay(pastDate));
    setEndDate(formatDateToEndOfDay(currentDate));
    setClearSelectionToggle((prev) => !prev);
  };

  // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
  useEffect(() => {
    if (selectedDevicesIds.length > 0) {
      const filtered = payTerminal.filter((payTerminals) =>
        selectedDevicesIds.includes(payTerminals.deviceSN)
      );
      setFilteredDevices(filtered);
    } else {
      setFilteredDevices(payTerminal);
    }
  }, [selectedDevicesIds, payTerminal]);

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
          case "timestamp":
            return new Date(row.timestamp).toLocaleString() || "";
          case "transactionType":
            return row[field.key] === 1 ? "Multibanco" : "Moedeiro";
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

  // Transforma os dados dos pagamentos com nomes substituídos
  const payTerminalsWithNames = payTerminal.map(transformTransactionWithNames);

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
            <TreeViewDataNkioskPay onSelectDevices={handleSelectFromTreeView} />
          </div>
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span>Pagamentos Multibanco</span>
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
                    onClick={refreshPayTerminal}
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
                  allData={payTerminalsWithNames}
                  selectedData={
                    selectedRows.length > 0
                      ? selectedRowsWithNames
                      : payTerminalsWithNames
                  }
                  fields={getSelectedFields()}
                />
                <PrintButton
                  data={
                    selectedRows.length > 0
                      ? selectedRowsWithNames
                      : payTerminalsWithNames
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
                    <Tooltip className="custom-tooltip">MB Hoje</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-calendar-event"
                    onClick={fetchPaymentsToday}
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
                      MB Dia Anterior
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-left-circle"
                    onClick={fetchPaymentsForPreviousDay}
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
                      MB Dia Seguinte
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-right-circle"
                    onClick={fetchPaymentsForNextDay}
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
                  defaultSortFieldId="timestamp"
                />
              )}
            </div>
            <div style={{ marginLeft: 10, marginTop: -5 }}>
              <strong>Recebimentos Multibanco: </strong> Valor -{" "}
              {totalAmount.toFixed(2)}€ | Visitantes -{" "}
              {filteredDataTable.length}
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
