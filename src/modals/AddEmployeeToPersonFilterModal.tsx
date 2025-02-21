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
import { toast } from "react-toastify";
import { SearchBoxContainer } from "../components/SearchBoxContainer";
import { useMediaQuery } from "react-responsive";

// Interface para as propriedades do modal
interface CreateModalProps<T> {
  title: string;
  open: boolean;
  onClose: () => void;
  onUpdate: (data: T) => void;
  entity?: Partial<Employee>;
  type: string;
}

// Define o componente
export const AddEmployeeToPersonFilterModal = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onUpdate,
  entity,
  type,
}: CreateModalProps<T>) => {
  const { data } = usePersons();
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
  const [filterText, setFilterText] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 500 });

  // Atualiza os funcionários filtrados com base nos funcionários selecionados
  useEffect(() => {
    let employeesToShow = data.employees;

    if (entity) {
      employeesToShow = employeesToShow.filter(
        (employee) => employee.type !== type
      );
    }

    if (selectedEmployeeIds.length > 0) {
      employeesToShow = employeesToShow.filter((employee) =>
        selectedEmployeeIds.includes(employee.employeeID)
      );
    }

    if (filterText) {
      const text = filterText.toLowerCase();
      employeesToShow = employeesToShow.filter(
        (employee) =>
          employee.enrollNumber.toLowerCase().includes(text) ||
          employee.name.toLowerCase().includes(text) ||
          employee.shortName.toLowerCase().includes(text) ||
          employee.employeeCards?.some((card) =>
            card.cardNumber?.toLowerCase().includes(text)
          )
      );
    }

    setFilteredEmployees(employeesToShow);
  }, [data.employees, entity, type, selectedEmployeeIds, filterText]);

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
    if (selectedRows.length > 1) {
      toast.warn("Selecione apenas um funcionário para adicionar!");
      return;
    }

    const selectedEmployee = selectedRows[0];

    const employeeData = {
      employeeID: selectedEmployee.employeeID,

      enrollNumber: selectedEmployee.enrollNumber,
      name: selectedEmployee.name,
      shortName: selectedEmployee.shortName,
      nameAcronym: selectedEmployee.nameAcronym,
      comments: selectedEmployee.comments,
      photo: selectedEmployee.photo,

      address: selectedEmployee.address,
      ziPcode: selectedEmployee.ziPcode,
      locality: selectedEmployee.locality,
      village: selectedEmployee.village,
      district: selectedEmployee.district,

      phone: selectedEmployee.phone,
      mobile: selectedEmployee.mobile,

      email: selectedEmployee.email,

      birthday: selectedEmployee.birthday,

      nationality: selectedEmployee.nationality,
      gender: selectedEmployee.gender,

      bInumber: selectedEmployee.bInumber,
      bIissuance: selectedEmployee.bIissuance,
      biValidity: selectedEmployee.biValidity,

      nif: selectedEmployee.nif,

      admissionDate: selectedEmployee.admissionDate,
      exitDate: selectedEmployee.exitDate,

      rgpdAut: selectedEmployee.rgpdAut,
      status: selectedEmployee.status,
      statusEmail: selectedEmployee.statusEmail,
      statusFprint: selectedEmployee.statusFprint,
      statusFace: selectedEmployee.statusFace,
      statusPalm: selectedEmployee.statusPalm,

      type: type,
      employeeDisabled: selectedEmployee.employeeDisabled,

      entidadeId: selectedEmployee.entidadeId,
      entidadeName: selectedEmployee.entidadeName,

      departmentId: selectedEmployee.departmentId,
      departmentName: selectedEmployee.departmentName,

      professionId: selectedEmployee.professionId,
      professionName: selectedEmployee.professionName,

      categoryId: selectedEmployee.categoryId,
      categoryName: selectedEmployee.categoryName,

      groupId: selectedEmployee.groupId,
      groupName: selectedEmployee.groupName,

      zoneId: selectedEmployee.zoneId,
      zoneName: selectedEmployee.zoneName,

      externalEntityId: selectedEmployee.externalEntityId,
      externalEntityName: selectedEmployee.externalEntityName,

      accPlanoAcessoId: selectedEmployee.accPlanoAcessoId,
      accPlanoAcessoName: selectedEmployee.accPlanoAcessoName,
    };

    let employeeCardsData: any[] = [];
    if (
      selectedEmployee.employeeCards &&
      selectedEmployee.employeeCards.length > 0
    ) {
      employeeCardsData = selectedEmployee.employeeCards.map((card: any) => ({
        cardId: card.cardId,
        devicePassword: card.devicePassword,
        devicePrivelage: card.devicePrivelage,
        deviceEnabled: card.deviceEnabled ?? true,
        cardNumber: card.cardNumber,
      }));
    }

    let dataToSend: { employee: any; employeeCards?: any[] } = {
      employee: employeeData,
    };

    if (employeeCardsData.length > 0) {
      dataToSend.employeeCards = employeeCardsData;
    }

    onUpdate(dataToSend as unknown as T);
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
