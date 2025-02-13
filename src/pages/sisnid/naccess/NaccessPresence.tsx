import DataTable, { TableColumn } from "react-data-table-component";

import { customStyles } from "../../../components/CustomStylesDataTable";
import { ExportButton } from "../../../components/ExportButton";

import "../../../css/PagesStyles.css";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";

import { useEffect, useState } from "react";

import { PrintButton } from "../../../components/PrintButton";
import { SelectFilter } from "../../../components/SelectFilter";
import { useAttendance } from "../../../context/MovementContext";

import { usePersons } from "../../../context/PersonsContext";
import { accessesFields, employeeFields } from "../../../fields/Fields";
import { ColumnSelectorModal } from "../../../modals/ColumnSelectorModal";
import { UpdateModalEmployees } from "../../../modals/UpdateModalEmployees";
import { Accesses, Employee } from "../../../types/Types";

import Split from "react-split";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { TextField, TextFieldProps } from "@mui/material";
import { TreeViewDataNaccess } from "../../../components/TreeViewNaccess";

// Define a interface para os filtros
interface Filters {
  [key: string]: string;
}

// Define a interface para os dados de presença de funcionários
interface EmployeeAccessWithPresence extends Accesses {
  isPresent: boolean;
}

// Define a interface para as propriedades do componente CustomSearchBox
function CustomSearchBox(props: TextFieldProps) {
  return <TextField {...props} className="SearchBox" />;
}

// Função para converter a data para o formato ISO
const convertToISO = (dateString: string) => {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("/");
  return `${year}-${month}-${day}T${timePart}`;
};

// Define a página de presença
export const NaccessPresence = () => {
  const { access } = useAttendance();
  const { employees, handleUpdateEmployee } = usePersons();
  const [accessPresence, setAccessPresence] = useState<
    EmployeeAccessWithPresence[]
  >([]);
  const [filterText, setFilterText] = useState("");
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "eventTime",
    "cardNo",
    "nameUser",
    "pin",
  ]);
  const [selectedRows, setSelectedRows] = useState<Accesses[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
  const [filteredAccess, setFilteredAccess] = useState<Accesses[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();

  // Função para buscar todos as presenças
  const fetchPresence = () => {
    const currentDate = new Date().toLocaleDateString("pt-PT");

    const validAccess = access.filter((acc) => Number(acc.pin) !== 0);

    const employeeStatusMap = validAccess.reduce((accMap, currentAccess) => {
      const key = currentAccess.pin;
      const isoDateString = convertToISO(currentAccess.eventTime);
      const accessDateTime = new Date(isoDateString);
      const accessDate = accessDateTime.toLocaleDateString("pt-PT");
      const isAccessToday =
        accessDate === currentDate && currentAccess.inOutStatus === 0;

      if (!accMap[key]) {
        accMap[key] = { ...currentAccess, isPresent: isAccessToday };
      } else {
        if (isAccessToday) {
          accMap[key].isPresent = true;
        }
        const storedIsoDate = convertToISO(accMap[key].eventTime);
        const storedAccessDateTime = new Date(storedIsoDate);
        if (accessDateTime > storedAccessDateTime) {
          accMap[key].eventTime = currentAccess.eventTime;
        }
      }
      return accMap;
    }, {} as { [key: string]: EmployeeAccessWithPresence });

    const attendances = Object.values(employeeStatusMap);

    setAccessPresence(attendances);
  };

  // Função para atualizar um funcionário e um cartão
  const updateEmployeeAndCard = async (employee: Employee) => {
    await handleUpdateEmployee(employee);
    refreshAttendance();
    setClearSelectionToggle((prev) => !prev);
  };

  // Busca as presenças ao montar o componente
  useEffect(() => {
    fetchPresence();
  }, []);

  // Função para atualizar os dados da tabela
  const refreshAttendance = () => {
    fetchPresence();
    setClearSelectionToggle((prev) => !prev);
  };

  // Atualiza a seleção ao mudar o filtro
  useEffect(() => {
    if (selectedEmployeeId && selectedEmployeeId.length > 0) {
      const newFilteredAccess = accessPresence.filter((att) =>
        selectedEmployeeId.includes(String(att.pin))
      );
      setFilteredAccess(newFilteredAccess);
    } else {
      setFilteredAccess(accessPresence);
    }
  }, [selectedEmployeeId, accessPresence]);

  // Define a seleção de funcionários
  const handleSelectFromTreeView = (selectedIds: string[]) => {
    setSelectedEmployeeId(selectedIds[0] || "");
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
    const allColumnKeys = accessesFields.map((field) => field.key);
    setSelectedColumns(allColumnKeys);
  };

  // Função para resetar as colunas
  const handleResetColumns = () => {
    setSelectedColumns(["eventTime", "cardNo", "nameUser", "pin"]);
  };

  // Definindo a coluna de Presença primeiro
  const presenceColumn: TableColumn<Accesses> = {
    name: "Presença",
    selector: (row) => (row.isPresent ? "Presente" : "Ausente"),
    format: (row) => (
      <span
        style={{
          color: row.isPresent ? "green" : "red",
          backgroundColor: row.isPresent ? "#d4edda" : "#f8d7da",
          borderRadius: "4px",
          padding: "2px 10px",
          display: "inline-block",
        }}
      >
        {row.isPresent ? "Presente" : "Ausente"}
      </span>
    ),
    sortable: true,
  };

  // Filtra os dados da tabela
  const filteredDataTable = filteredAccess.filter(
    (attendances) =>
      Object.keys(filters).every(
        (key) =>
          filters[key] === "" ||
          (attendances[key] != null &&
            String(attendances[key])
              .toLowerCase()
              .includes(filters[key].toLowerCase()))
      ) &&
      Object.entries(attendances).some(([key, value]) => {
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

  // Função para abrir o modal de edição
  const handleOpenEditModal = (person: Accesses) => {
    const employeeDetails = employees.find(
      (emp) => emp.employeeID === person.employeeId
    );
    if (employeeDetails) {
      setSelectedEmployee(employeeDetails);
      setShowEditModal(true);
    } else {
      console.error("Funcionário não encontrado:", person.employeeName);
    }
  };

  // Remove o campo deviceSN e eventDoorId
  const filteredColumns = accessesFields.filter(
    (field) => field.key !== "deviceSN" && field.key !== "eventDoorId"
  );

  // Adicionando as outras colunas
  const otherColumns: TableColumn<Accesses>[] = accessesFields
    .filter((field) => selectedColumns.includes(field.key))
    .map((field) => {
      if (field.key === "employeeName") {
        return {
          ...field,
          name: field.label,
          cell: (row: Accesses) => (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleOpenEditModal(row)}
            >
              {row.employeeName}
            </div>
          ),
        };
      }
      const formatField = (row: Accesses) => {
        switch (field.key) {
          case "inOutMode":
            switch (row[field.key]) {
              case 0:
                return "Entrada";
              case 1:
                return "Saída";
              default:
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
            <SelectFilter
              column={field.key}
              setFilters={setFilters}
              data={filteredDataTable}
            />
          </>
        ),
        selector: (row) => formatField(row),
        sortable: true,
        sortFunction: (rowA, rowB) =>
          new Date(rowB.eventTime).getTime() -
          new Date(rowA.eventTime).getTime(),
      };
    });

  // Combinando colunas, com a coluna de Presença primeiro
  const columns: TableColumn<Accesses>[] = [presenceColumn, ...otherColumns];

  // Define as opções de paginação de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Define a função selecionar uma linha
  const handleRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Accesses[];
  }) => {
    const sortedSelectedRows = state.selectedRows.sort(
      (a, b) => Number(a.pin) - Number(b.pin)
    );
    setSelectedRows(sortedSelectedRows);
  };

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return accessesFields.filter((field) =>
      selectedColumns.includes(field.key)
    );
  };

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
            <TreeViewDataNaccess onSelectEmployees={handleSelectFromTreeView} />
          </div>
          <div className="datatable-container">
            <div className="datatable-title-text">
              <span>Presenças</span>
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
              <div className="buttons-container">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip className="custom-tooltip">Atualizar</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-arrow-clockwise"
                    onClick={refreshAttendance}
                    iconSize="1.1em"
                  />
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip className="custom-tooltip">Colunas</Tooltip>
                  }
                >
                  <CustomOutlineButton
                    icon="bi-eye"
                    onClick={() => setShowColumnSelector(true)}
                    iconSize="1.1em"
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
            </div>
            <div className="content-wrapper">
              <div className="table-css">
                <DataTable
                  columns={columns}
                  data={filteredDataTable}
                  pagination
                  paginationComponentOptions={paginationOptions}
                  selectableRows
                  paginationPerPage={20}
                  onSelectedRowsChange={handleRowSelected}
                  clearSelectedRows={clearSelectionToggle}
                  selectableRowsHighlight
                  noDataComponent="Não existem dados disponíveis para exibir."
                  customStyles={customStyles}
                  striped
                  responsive
                  persistTableHead={true}
                  defaultSortAsc={true}
                  defaultSortFieldId="eventTime"
                />
              </div>
            </div>
          </div>
        </Split>
      </div>
      {showColumnSelector && (
        <ColumnSelectorModal
          columns={filteredColumns}
          selectedColumns={selectedColumns}
          onClose={() => setShowColumnSelector(false)}
          onColumnToggle={handleColumnToggle}
          onResetColumns={handleResetColumns}
          onSelectAllColumns={handleSelectAllColumns}
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
