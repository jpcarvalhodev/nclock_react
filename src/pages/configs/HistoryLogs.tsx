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
import { TreeViewDataHistory } from "../../components/TreeViewHistory";
import { useEntity } from "../../context/EntityContext";

import { logsFields } from "../../fields/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { Logs } from "../../types/Types";
import { SearchBoxContainer } from "../../components/SearchBoxContainer";
import { CustomSpinner } from "../../components/CustomSpinner";
import { useMediaQuery } from "react-responsive";
import { usePersons } from "../../context/PersonsContext";

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T00:00`;
};

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T23:59`;
};

export const HistoryLogs = () => {
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);
  const {
    historyLogs,
    setHistoryLogs,
    fetchAllHistoryLogs,
    totalHistoryPages,
  } = useEntity();
  const { registeredUsers } = usePersons();
  const [filterText, setFilterText] = useState<string>("");
  const [openColumnSelector, setOpenColumnSelector] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "userName",
    "taskName",
    "description",
    "createdDate",
  ]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedRows, setSelectedRows] = useState<Logs[]>([]);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
  const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
  const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Logs[]>([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalRows, setTotalRows] = useState(0);

  // Função para buscar os dados da paginação
  const fetchPaginationHistory = async (pageNo: string, perPage: string) => {
    try {
      const data = await apiService.fetchAllHistoryLogs(
        undefined,
        undefined,
        undefined,
        pageNo,
        perPage
      );
      setHistoryLogs(data.data);
      setTotalRows(data.totalRecords);
    } catch (error) {
      console.error("Erro ao buscar logs paginados:", error);
      setHistoryLogs([]);
    }
  };

  // Função para buscar os logs entre datas
  const fetchLogsBetweenDates = async () => {
    try {
      const data = await apiService.fetchAllHistoryLogs(startDate, endDate);
      if (data.length > 0) {
        setHistoryLogs(data.data);
      } else {
        setHistoryLogs([]);
      }
    } catch (error) {
      console.error("Erro ao buscar os dados de logs:", error);
    }
  };

  // Função para buscar os logs de hoje
  const fetchHistoryToday = async () => {
    const today = new Date();
    const start = formatDateToStartOfDay(today);
    const end = formatDateToEndOfDay(today);
    try {
      const data = await apiService.fetchAllHistoryLogs(start, end);
      if (data.length > 0) {
        setHistoryLogs(data.data);
      } else {
        setHistoryLogs([]);
      }
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error("Erro ao buscar os dados de logs hoje:", error);
    }
  };

  // Função para buscar os logs de ontem
  const fetchHistoryForPreviousDay = async () => {
    const prevDate = new Date(startDate);
    prevDate.setDate(prevDate.getDate() - 1);

    const start = formatDateToStartOfDay(prevDate);
    const end = formatDateToEndOfDay(prevDate);

    try {
      const data = await apiService.fetchAllHistoryLogs(start, end);
      if (data.length > 0) {
        setHistoryLogs(data.data);
      } else {
        setHistoryLogs([]);
      }
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error("Erro ao buscar os dados de logs ontem:", error);
    }
  };

  // Função para buscar os logs de amanhã
  const fetchHistoryForNextDay = async () => {
    const newDate = new Date(endDate);
    newDate.setDate(newDate.getDate() + 1);

    if (newDate > new Date()) {
      return;
    }

    const start = formatDateToStartOfDay(newDate);
    const end = formatDateToEndOfDay(newDate);

    try {
      const data = await apiService.fetchAllHistoryLogs(start, end);
      if (data.length > 0) {
        setHistoryLogs(data.data);
      } else {
        setHistoryLogs([]);
      }
      setStartDate(start);
      setEndDate(end);
    } catch (error) {
      console.error("Erro ao buscar os dados de logs amanhã:", error);
    }
  };

  // Busca os funcionários paginados ao mudar a página
  useEffect(() => {
    fetchPaginationHistory(currentPage.toString(), perPage.toString());
  }, [currentPage, perPage]);

  // Função para atualizar os logs
  const refreshLogs = () => {
    fetchAllHistoryLogs(undefined, undefined, undefined, "1", "20");
    setCurrentPage(1);
    setPerPage(20);
    setStartDate(formatDateToStartOfDay(pastDate));
    setEndDate(formatDateToEndOfDay(currentDate));
    setClearSelectionToggle((prev) => !prev);
  };

  // Atualiza os dispositivos filtrados com base nos dispositivos selecionados
  useEffect(() => {
    if (selectedDevicesIds.length > 0) {
      const filterLogs = historyLogs.filter((log) =>
        selectedDevicesIds.includes(log.taskId)
      );
      setFilteredDevices(filterLogs);
    } else {
      setFilteredDevices(historyLogs);
    }
  }, [selectedDevicesIds, historyLogs]);

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
    setSelectedColumns(["userName", "taskName", "description", "createdDate"]);
  };

  // Função para selecionar todas as colunas
  const onSelectAllColumns = (allColumnKeys: string[]) => {
    setSelectedColumns(allColumnKeys);
  };

  // Define a função de seleção de linhas
  const handleRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Logs[];
  }) => {
    const sortedSelectedRows = state.selectedRows.sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
    setSelectedRows(sortedSelectedRows);
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
        const rawUsername = selectedIds[0];
        const username = rawUsername.replace("user-", "");

        const foundUser = registeredUsers.find(
          (user) => user.userName === username
        );

        if (foundUser) {
          const logs = await apiService.fetchAllLoginLogs(
            undefined,
            undefined,
            [foundUser.id],
            undefined,
            undefined
          );
          setFilteredDevices(logs.data);
        } else {
          setFilteredDevices([]);
        }
      } catch (error) {
        console.error("Erro ao buscar logs para o usuário selecionado:", error);
      }
    } else {
      setFilteredDevices(historyLogs);
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
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
  }, [filteredDevices, filters, filterText]);

  // Define as colunas da tabela
  const columns: TableColumn<Logs>[] = logsFields
    .filter((field) => selectedColumns.includes(field.key))
    .sort((a, b) => {
      if (a.key === "createdDate") return -1;
      else if (b.key === "createdDate") return 1;
      else return 0;
    })
    .map((field) => {
      const formatField = (row: Logs) => {
        switch (field.key) {
          case "createdDate":
            return new Date(row.createdDate).toLocaleString() || "";
          default:
            return row[field.key] || "";
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

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return logsFields.filter((field) => selectedColumns.includes(field.key));
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
        {isMobile && (
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span style={{ color: "#000000" }}>Logs de Histórico</span>
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
                    onClick={refreshLogs}
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
                    <Tooltip className="custom-tooltip">Histórico Hoje</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-calendar-event"
                    onClick={fetchHistoryToday}
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
                      Histórico Dia Anterior
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-left-circle"
                    onClick={fetchHistoryForPreviousDay}
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
                      Histórico Dia Seguinte
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-right-circle"
                    onClick={fetchHistoryForNextDay}
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
                    onClick={fetchLogsBetweenDates}
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
                  defaultSortFieldId="createdDate"
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
                      onClick={() => handlePageChange(totalHistoryPages)}
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
          <div
            className={`treeview-container ${
              perPage >= 50 ? "treeview-container-full-height" : ""
            }`}
          >
            <TreeViewDataHistory onSelectDevices={handleSelectFromTreeView} />
          </div>
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span style={{ color: "#000000" }}>Logs de Histórico</span>
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
                    onClick={refreshLogs}
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
                    <Tooltip className="custom-tooltip">Histórico Hoje</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-calendar-event"
                    onClick={fetchHistoryToday}
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
                      Histórico Dia Anterior
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-left-circle"
                    onClick={fetchHistoryForPreviousDay}
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
                      Histórico Dia Seguinte
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-right-circle"
                    onClick={fetchHistoryForNextDay}
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
                    onClick={fetchLogsBetweenDates}
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
                  defaultSortFieldId="createdDate"
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
                      onClick={() => handlePageChange(totalHistoryPages)}
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
          </div>
        </Split>
      </div>
      {openColumnSelector && (
        <ColumnSelectorModal
          columns={logsFields}
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
