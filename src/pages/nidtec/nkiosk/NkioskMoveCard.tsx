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
import { TreeViewDataNkioskMove } from "../../../components/TreeViewNkioskMove";
import { useKiosk } from "../../../context/KioskContext";

import { usePersons } from "../../../context/PersonsContext";
import { useTerminals } from "../../../context/TerminalsContext";
import {
  auxOutFields,
  employeeFields,
  newTransactionCardFields,
  transactionCardFields,
} from "../../../fields/Fields";
import { AuxOutModal } from "../../../modals/AuxOutModal";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { CreateModalNewCard } from "../../../modals/CreateModalNewCard";
import { UpdateModalEmployees } from "../../../modals/UpdateModalEmployees";
import {
  Employee,
  KioskTransactionCard,
  NewTransactionCard,
} from "../../../types/Types";
import { SearchBoxContainer } from "../../../components/SearchBoxContainer";
import { CustomSpinner } from "../../../components/CustomSpinner";
import { useMediaQuery } from "react-responsive";

// Define a interface SaveData
interface SaveData {
  deviceSN: string;
  auxData: FormData;
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

export const NkioskMoveCard = () => {
  const { employeesNoPagination, handleUpdateEmployee } = usePersons();
  const { devices } = useTerminals();
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);
  const {
    moveCard,
    setMoveCard,
    fetchAllMoveCard,
    handleAddNewMoveCard,
    moveCardPages,
    moveCardTotalRecords,
    moveCardNoPagination,
  } = useKiosk();
  const [filterText, setFilterText] = useState<string>("");
  const [openColumnSelector, setOpenColumnSelector] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "eventTime",
    "nameUser",
    "pin",
    "cardNo",
    "eventDoorId",
    "eventName",
    "deviceSN",
  ]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [startDate, setStartDate] = useState(formatDateToStartOfDay(pastDate));
  const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
  const [selectedRows, setSelectedRows] = useState<KioskTransactionCard[]>([]);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
  const [showAuxOutModal, setShowAuxOutModal] = useState(false);
  const [loadingAuxOut, setLoadingAuxOut] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalRows, setTotalRows] = useState(0);

  // Função para adicionar um novo movimento de cartão
  const addNewCard = async (newCard: NewTransactionCard) => {
    await handleAddNewMoveCard(newCard);
  };

  // Função para buscar os dados da paginação
  const fetchPaginationMoveCard = async (pageNo: string, perPage: string) => {
    setLoading(true);
    try {
      const data = await apiService.fetchKioskTransactionsByCardAndDeviceSN(
        undefined,
        "3",
        undefined,
        undefined,
        undefined,
        pageNo,
        perPage
      );
      setMoveCard(data.data);
      setTotalRows(data.totalRecords);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar acessos paginados:", error);
      setLoading(false);
    }
  };

  // Função para buscar os movimentos dos cartões entre datas
  const fetchMovementCardBetweenDates = async () => {
    try {
      const data = await apiService.fetchKioskTransactionsByCardAndDeviceSN(
        undefined,
        "3",
        undefined,
        startDate,
        endDate
      );
      setMoveCard(data.data);
      setTotalRows(data.totalRecords);
    } catch (error) {
      console.error("Erro ao buscar os dados de movimentos de cartões:", error);
    }
  };

  // Função para buscar os movimentos dos cartões hoje
  const fetchCardMovementsToday = async () => {
    if (selectedDevicesIds.length > 0) {
      const deviceIds: string[] = [];
      const personIds: string[] = [];
      selectedDevicesIds.forEach((id) => {
        if (/^[A-Z0-9]+$/.test(id)) {
          deviceIds.push(id);
        } else if (/^\d+$/.test(id)) {
          personIds.push(id);
        }
      });
      try {
        const data = await apiService.fetchAllKioskTransactionByEnrollNumber(
          personIds.length > 0 ? personIds : undefined,
          "3",
          deviceIds.length > 0 ? deviceIds : undefined,
          formatDateToStartOfDay(currentDate),
          formatDateToEndOfDay(currentDate)
        );
        setMoveCard(data.data);
        setTotalRows(data.totalRecords);
        setStartDate(formatDateToStartOfDay(currentDate));
        setEndDate(formatDateToEndOfDay(currentDate));
      } catch (error) {
        console.error(
          "Erro ao buscar os dados de movimentos de cartões hoje:",
          error
        );
      }
    } else {
      try {
        const data = await apiService.fetchKioskTransactionsByCardAndDeviceSN(
          undefined,
          "3",
          undefined,
          formatDateToStartOfDay(currentDate),
          formatDateToEndOfDay(currentDate)
        );
        setMoveCard(data.data);
        setTotalRows(data.totalRecords);
        setStartDate(formatDateToStartOfDay(currentDate));
        setEndDate(formatDateToEndOfDay(currentDate));
      } catch (error) {
        console.error(
          "Erro ao buscar os dados de movimentos de cartões hoje:",
          error
        );
      }
    }
  };

  // Função para buscar os pagamentos dos terminais de ontem
  const fetchCardMovementsForPreviousDay = async () => {
    const prevDate = new Date(startDate);
    prevDate.setDate(prevDate.getDate() - 1);

    const start = formatDateToStartOfDay(prevDate);
    const end = formatDateToEndOfDay(prevDate);

    if (selectedDevicesIds.length > 0) {
      const deviceIds: string[] = [];
      const personIds: string[] = [];
      selectedDevicesIds.forEach((id) => {
        if (/^[A-Z0-9]+$/.test(id)) {
          deviceIds.push(id);
        } else if (/^\d+$/.test(id)) {
          personIds.push(id);
        }
      });
      try {
        const data = await apiService.fetchAllKioskTransactionByEnrollNumber(
          personIds.length > 0 ? personIds : undefined,
          "3",
          deviceIds.length > 0 ? deviceIds : undefined,
          start,
          end
        );
        setMoveCard(data.data);
        setTotalRows(data.totalRecords);
        setStartDate(start);
        setEndDate(end);
      } catch (error) {
        console.error(
          "Erro ao buscar os dados de movimentos de cartões ontem:",
          error
        );
      }
    } else {
      try {
        const data = await apiService.fetchKioskTransactionsByCardAndDeviceSN(
          undefined,
          "3",
          undefined,
          start,
          end
        );
        setMoveCard(data.data);
        setTotalRows(data.totalRecords);
        setStartDate(start);
        setEndDate(end);
      } catch (error) {
        console.error(
          "Erro ao buscar os dados de movimentos de cartões ontem:",
          error
        );
      }
    }
  };

  // Função para buscar os pagamentos dos terminais de amanhã
  const fetchCardMovementsForNextDay = async () => {
    const newDate = new Date(endDate);
    newDate.setDate(newDate.getDate() + 1);

    if (newDate > new Date()) {
      return;
    }

    const start = formatDateToStartOfDay(newDate);
    const end = formatDateToEndOfDay(newDate);

    if (selectedDevicesIds.length > 0) {
      const deviceIds: string[] = [];
      const personIds: string[] = [];
      selectedDevicesIds.forEach((id) => {
        if (/^[A-Z0-9]+$/.test(id)) {
          deviceIds.push(id);
        } else if (/^\d+$/.test(id)) {
          personIds.push(id);
        }
      });
      try {
        const data = await apiService.fetchAllKioskTransactionByEnrollNumber(
          personIds.length > 0 ? personIds : undefined,
          "3",
          deviceIds.length > 0 ? deviceIds : undefined,
          start,
          end
        );
        setMoveCard(data.data);
        setTotalRows(data.totalRecords);
        setStartDate(start);
        setEndDate(end);
      } catch (error) {
        console.error(
          "Erro ao buscar os dados de movimentos de cartões amanhã:",
          error
        );
      }
    } else {
      try {
        const data = await apiService.fetchKioskTransactionsByCardAndDeviceSN(
          undefined,
          "3",
          undefined,
          start,
          end
        );
        setMoveCard(data.data);
        setTotalRows(data.totalRecords);
        setStartDate(start);
        setEndDate(end);
      } catch (error) {
        console.error(
          "Erro ao buscar os dados de movimentos de cartões amanhã:",
          error
        );
      }
    }
  };

  // Função para atualizar um funcionário e um cartão
  const updateEmployeeAndCard = async (employee: Employee) => {
    await handleUpdateEmployee(employee);
    refreshMoveCard();
  };

  // Busca os dados se a paginação mudar
  useEffect(() => {
    fetchPaginationMoveCard(String(currentPage), String(perPage));
  }, [currentPage, perPage]);

  // Busca os dados conforme o filtro de data mudar
  useEffect(() => {
    if (startDate && endDate) {
      fetchMovementCardBetweenDates();
    }
  }, [startDate, endDate]); 

  // Função para atualizar as publicidades
  const refreshMoveCard = () => {
    fetchAllMoveCard(
      undefined,
      "3",
      undefined,
      undefined,
      undefined,
      "1",
      "20"
    );
    setStartDate(formatDateToStartOfDay(pastDate));
    setEndDate(formatDateToEndOfDay(currentDate));
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para abrir a auxiliar
  const handleOpenAuxOut = async (SaveData: SaveData) => {
    const { deviceSN, auxData } = SaveData;
    try {
      const data = await apiService.openAuxDoor({ deviceSN, auxData });
      toast.success(data.message || "Torniquete aberto com sucesso!");
    } catch (error) {
      console.error("Erro ao abrir a auxiliar:", error);
    }
    setShowAuxOutModal(false);
    setLoadingAuxOut(false);
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
      "eventTime",
      "nameUser",
      "pin",
      "cardNo",
      "eventDoorId",
      "eventName",
      "deviceSN",
    ]);
  };

  // Função para selecionar todas as colunas
  const onSelectAllColumns = (allColumnKeys: string[]) => {
    setSelectedColumns(allColumnKeys);
  };

  // Define a seleção da árvore
  const handleSelectFromTreeView = async (selectedIds: string[]) => {
    setSelectedDevicesIds(selectedIds);

    if (selectedIds.length > 0) {
      const deviceIds: string[] = [];
      const personIds: string[] = [];

      selectedDevicesIds.forEach((id) => {
        if (/^[A-Z0-9]+$/.test(id)) {
          deviceIds.push(id);
        } else if (/^\d+$/.test(id)) {
          personIds.push(id);
        }
      });
      try {
        const foundEntity =
          await apiService.fetchAllKioskTransactionByEnrollNumber(
            personIds.length > 0 ? personIds : undefined,
            undefined,
            deviceIds.length > 0 ? deviceIds : undefined,
            undefined,
            undefined,
            undefined,
            undefined
          );
        if (foundEntity.data) {
          setMoveCard(foundEntity.data);
          setTotalRows(foundEntity.totalRecords);
        } else {
          setMoveCard([]);
        }
      } catch (error) {
        console.error("Erro ao buscar entidades:", error);
      }
    } else {
      setMoveCard(moveCard);
    }
  };

  // Define a função de seleção de linhas
  const handleRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: KioskTransactionCard[];
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

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
    if (!Array.isArray(moveCard)) {
      return [];
    }

    const applyFilter = (list: KioskTransactionCard[]) => {
      return list.filter(
        (item) =>
          Object.keys(filters).every((key) => {
            if (filters[key] === "") return true;
            if (item[key] == null) return false;
            return String(item[key])
              .toLowerCase()
              .includes(filters[key].toLowerCase());
          }) &&
          Object.entries(item).some(([key, value]) => {
            if (selectedColumns.includes(key) && value != null) {
              if (key === "eventTime") {
                const date = new Date(value);
                const formatted = formatDateDDMMYYYY(date);
                return formatted
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
      );
    };

    const filteredMain = applyFilter(moveCard);

    if (filterText.trim() !== "" && Array.isArray(moveCardNoPagination)) {
      const filteredFallback = applyFilter(moveCardNoPagination);
      const combined = [...filteredMain, ...filteredFallback];

      const seen = new Set<string>();
      const deduplicated: KioskTransactionCard[] = [];
      for (const item of combined) {
        const key = `${item.deviceSN}-${item.pin}-${item.eventTime}`;
        if (!seen.has(key)) {
          seen.add(key);
          deduplicated.push(item);
        }
      }
      return deduplicated.sort(
        (a, b) =>
          new Date(b.eventTime).getTime() - new Date(a.eventTime).getTime()
      );
    }

    return filteredMain.sort(
      (a, b) =>
        new Date(b.eventTime).getTime() - new Date(a.eventTime).getTime()
    );
  }, [moveCard, moveCardNoPagination, filters, filterText, selectedColumns]);

  // Função para abrir o modal de edição
  const handleOpenEditModal = (person: KioskTransactionCard) => {
    const employeeDetails = employeesNoPagination.find(
      (emp) => emp.shortName === person.nameUser
    );
    if (employeeDetails) {
      setSelectedEmployee(employeeDetails);
      setShowEditModal(true);
    } else {
      console.error("Funcionário não encontrado:", person.nameUser);
    }
  };

  // Define as colunas da tabela
  const columns: TableColumn<KioskTransactionCard>[] = transactionCardFields
    .filter((field) => selectedColumns.includes(field.key))
    .sort((a, b) =>
      a.key === "eventTime" ? -1 : b.key === "eventTime" ? 1 : 0
    )
    .map((field) => {
      if (field.key === "nameUser") {
        return {
          ...field,
          name: (
            <>
              {field.label}
              <SelectFilter
                column={field.key}
                setFilters={setFilters}
                data={filteredDataTable}
              />
            </>
          ),
          cell: (row: KioskTransactionCard) => (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleOpenEditModal(row)}
            >
              {row.nameUser}
            </div>
          ),
        };
      }
      const formatField = (row: KioskTransactionCard) => {
        const value = row[field.key as keyof KioskTransactionCard];
        switch (field.key) {
          case "deviceSN":
            return (
              devices.find((device) => device.serialNumber === value)
                ?.deviceName ?? ""
            );
          case "eventDoorId":
            return "Torniquete";
          case "eventTime":
            return new Date(row.eventTime).toLocaleString() || "";
          default:
            return value ?? "";
        }
      };

      return {
        id: field.key,
        name: (
          <>
            {field.label}
            {field.key !== "eventTime" && (
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
          new Date(rowB.eventTime).getTime() -
          new Date(rowA.eventTime).getTime(),
      };
    });

  // Função para gerar os dados com nomes substituídos para o export/print
  const transformTransactionWithNames = (transaction: { deviceSN: string }) => {
    const deviceMatch = devices.find(
      (device) => device.serialNumber === transaction.deviceSN
    );
    const deviceName = deviceMatch?.deviceName || "";

    return {
      ...transaction,
      deviceSN: deviceName,
    };
  };

  // Dados com nomes substituídos para o export/print
  const moveCardWithNames = Array.isArray(moveCard)
    ? moveCard.map(transformTransactionWithNames)
    : [];

  // Transforma as linhas selecionadas com nomes substituídos
  const selectedRowsWithNames = selectedRows.map(transformTransactionWithNames);

  // Calcula o valor total dos movimentos
  const totalAmount = moveCardTotalRecords;

  // Função para abrir o modal para escolher porta
  const openAuxOutModal = () => {
    setShowAuxOutModal(true);
    setLoadingAuxOut(true);
  };

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return transactionCardFields.filter((field) =>
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
              <span>Movimentos do Torniquete</span>
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
                    onClick={refreshMoveCard}
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
                    <Tooltip className="custom-tooltip">Adicionar</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-plus"
                    onClick={() => setShowAddModal(true)}
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
                    <Tooltip className="custom-tooltip">Colunas</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-eye"
                    onClick={() => setOpenColumnSelector(true)}
                  />
                </OverlayTrigger>
                <ExportButton
                  allData={moveCardWithNames}
                  selectedData={
                    selectedRows.length > 0
                      ? selectedRowsWithNames
                      : moveCardWithNames
                  }
                  fields={getSelectedFields()}
                />
                <PrintButton
                  data={
                    selectedRows.length > 0
                      ? selectedRowsWithNames
                      : moveCardWithNames
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
                  overlay={<Tooltip className="custom-tooltip">Braço</Tooltip>}
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-bar-down"
                    onClick={openAuxOutModal}
                  />
                </OverlayTrigger>
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
                      Torniquete Hoje
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-calendar-event"
                    onClick={fetchCardMovementsToday}
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
                      Torniquete Dia Anterior
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-left-circle"
                    onClick={fetchCardMovementsForPreviousDay}
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
                      Torniquete Dia Seguinte
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-right-circle"
                    onClick={fetchCardMovementsForNextDay}
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
                    onClick={fetchMovementCardBetweenDates}
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
                      onClick={() => handlePageChange(moveCardPages)}
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
            <div style={{ marginLeft: 10, marginTop: -5 }}>
              <strong>Movimentos do Torniquete: </strong>
              {totalAmount ?? 0}
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
            <TreeViewDataNkioskMove
              onSelectDevices={handleSelectFromTreeView}
            />
          </div>
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span>Movimentos do Torniquete</span>
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
                    onClick={refreshMoveCard}
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
                    <Tooltip className="custom-tooltip">Adicionar</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-plus"
                    onClick={() => setShowAddModal(true)}
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
                    <Tooltip className="custom-tooltip">Colunas</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-eye"
                    onClick={() => setOpenColumnSelector(true)}
                  />
                </OverlayTrigger>
                <ExportButton
                  allData={moveCardWithNames}
                  selectedData={
                    selectedRows.length > 0
                      ? selectedRowsWithNames
                      : moveCardWithNames
                  }
                  fields={getSelectedFields()}
                />
                <PrintButton
                  data={
                    selectedRows.length > 0
                      ? selectedRowsWithNames
                      : moveCardWithNames
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
                  overlay={<Tooltip className="custom-tooltip">Braço</Tooltip>}
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-bar-down"
                    onClick={openAuxOutModal}
                  />
                </OverlayTrigger>
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
                      Torniquete Hoje
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-calendar-event"
                    onClick={fetchCardMovementsToday}
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
                      Torniquete Dia Anterior
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-left-circle"
                    onClick={fetchCardMovementsForPreviousDay}
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
                      Torniquete Dia Seguinte
                    </Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi bi-arrow-right-circle"
                    onClick={fetchCardMovementsForNextDay}
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
                    onClick={fetchMovementCardBetweenDates}
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
                      onClick={() => handlePageChange(moveCardPages)}
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
            <div style={{ marginLeft: 10, marginTop: -5 }}>
              <strong>Movimentos do Torniquete: </strong>
              {totalAmount ?? 0}
            </div>
          </div>
        </Split>
      </div>
      {openColumnSelector && (
        <ColumnSelectorModal
          columns={transactionCardFields}
          selectedColumns={selectedColumns}
          onClose={() => setOpenColumnSelector(false)}
          onColumnToggle={toggleColumn}
          onResetColumns={resetColumns}
          onSelectAllColumns={onSelectAllColumns}
        />
      )}
      <CreateModalNewCard
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={addNewCard}
        fields={newTransactionCardFields}
        title="Adicionar Picagem Manual"
      />
      {loadingAuxOut && (
        <AuxOutModal
          title="Escolha a Auxiliar para Abrir"
          open={showAuxOutModal}
          onClose={() => {
            setShowAuxOutModal(false);
            setLoadingAuxOut(false);
          }}
          onSave={handleOpenAuxOut}
          fields={auxOutFields}
        />
      )}
      {selectedEmployee && (
        <UpdateModalEmployees
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          onUpdate={updateEmployeeAndCard}
          entity={selectedEmployee}
          fields={employeeFields}
          title="Atualizar Funcionário"
        />
      )}
    </div>
  );
};
