import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../css/PagesStyles.css";

import DataTable, { TableColumn } from "react-data-table-component";
import Split from "react-split";
import { customStyles } from "../components/CustomStylesDataTable";
import { TreeViewData } from "../components/TreeView";
import { usePersons } from "../context/PersonsContext";
import { employeeFields } from "../fields/Fields";
import { Employee } from "../types/Types";
import { SearchBoxContainer } from "../components/SearchBoxContainer";
import { useMediaQuery } from "react-responsive";

// Interface para as propriedades do modal
interface CreateModalProps<T> {
  title: string;
  open: boolean;
  onClose: () => void;
  onSave: (data: T) => void;
  entity?: T;
}

// Define o componente
export const AddEmployeeToACModal = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onSave,
  entity,
}: CreateModalProps<T>) => {
  const { data } = usePersons();
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [allAvailableEmployees, setAllAvailableEmployees] = useState<
    Employee[]
  >([]);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
  const [filterText, setFilterText] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 500 });

  // Atualiza os funcionários filtrados ao abrir o modal
  useEffect(() => {
    if (open) {
      const filtered = data.employees.filter(
        (employee) =>
          !entity?.some((e: Employee) => e.employeeID === employee.employeeID)
      );
      setAllAvailableEmployees(filtered);
      setFilteredEmployees(filtered);
    }
  }, [open, data.employees, entity?.employees]);

  // Atualiza os funcionários filtrados com base nos funcionários selecionados
  useEffect(() => {
    if (selectedEmployeeIds.length > 0) {
      const filtered = data.employees.filter((employee) =>
        selectedEmployeeIds.includes(employee.employeeID)
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(data.employees);
    }
  }, [selectedEmployeeIds, data.employees]);

  // Efeito para aplicar o texto de pesquisa no array de empregados
  useEffect(() => {
    const text = filterText.toLowerCase();
    const filtered = allAvailableEmployees.filter((emp) => {
      return (
        emp.enrollNumber.toLowerCase().includes(text) ||
        emp.name.toLowerCase().includes(text) ||
        emp.shortName.toLowerCase().includes(text) ||
        emp.employeeCards?.some((card) =>
          card.cardNumber.toLowerCase().includes(text)
        )
      );
    });
    setFilteredEmployees(filtered);
  }, [filterText, allAvailableEmployees]);

  // Define as opções de paginação de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Define a seleção da árvore
  const handleSelectFromTreeView = (selectedIds: string[]) => {
    setSelectedEmployeeIds(selectedIds);
  };

  // Define a função selecionar uma linha
  const handleRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Employee[];
  }) => {
    const sortedSelectedRows = state.selectedRows.sort(
      (a, b) => parseInt(a.enrollNumber) - parseInt(b.enrollNumber)
    );
    setSelectedRows(sortedSelectedRows);
  };

  // Define as colunas de funcionários
  const selectedColumns = ["enrollNumber", "name", "shortName", "cardNumber"];

  // Define as colunas
  const columns: TableColumn<Employee>[] = employeeFields
    .filter((field) => selectedColumns.includes(field.key))
    .map((field) => {
      const formatField = (row: Employee) => {
        switch (field.key) {
          case "cardNumber":
            return row.employeeCards?.[0]?.cardNumber || "";
          default:
            return row[field.key] || "";
        }
      };

      return {
        id: field.key,
        name: <>{field.label}</>,
        selector: (row: Employee) => {
          if (field.key === "enrollNumber") {
            return parseInt(row.enrollNumber) || 0;
          }
          return row[field.key] || "";
        },
        sortable: true,
        cell: (row: Employee) => formatField(row),
      };
    });

  // Função para fechar o modal
  const handleClose = () => {
    setClearSelectionToggle((prev) => !prev);
    onClose();
  };

  // Função para salvar os dados
  const handleSave = () => {
    onSave(selectedRows as unknown as T);
    handleClose();
  };

  return (
    <Modal
      show={open}
      onHide={handleClose}
      backdrop="static"
      size="xl"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <div className="content-container">
          {isMobile && (
            <div className="datatable-container">
              <div style={{ marginTop: 10 }}>
                <SearchBoxContainer
                  onSearch={(value) => setFilterText(value)}
                />
              </div>
              <DataTable
                columns={columns}
                data={filteredEmployees}
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
                defaultSortFieldId="enrollNumber"
              />
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
              <TreeViewData
                onSelectEmployees={handleSelectFromTreeView}
                employees={filteredEmployees}
              />
            </div>
            <div className="datatable-container">
              <div style={{ marginTop: 10 }}>
                <SearchBoxContainer
                  onSearch={(value) => setFilterText(value)}
                />
              </div>
              <DataTable
                columns={columns}
                data={filteredEmployees}
                pagination
                paginationComponentOptions={paginationOptions}
                paginationPerPage={20}
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
                defaultSortFieldId="enrollNumber"
              />
            </div>
          </Split>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#f2f2f2" }}>
        <Button
          className="narrow-mobile-modal-button"
          variant="outline-dark"
          onClick={handleClose}
        >
          Fechar
        </Button>
        <Button
          className="narrow-mobile-modal-button"
          variant="outline-dark"
          onClick={handleSave}
        >
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
