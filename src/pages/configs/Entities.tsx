import { useEffect, useMemo, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";

import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { customStyles } from "../../components/CustomStylesDataTable";
import { ExpandedComponentEmpZoneExtEnt } from "../../components/ExpandedComponentEmpZoneExtEnt";
import { ExportButton } from "../../components/ExportButton";

import { PrintButton } from "../../components/PrintButton";
import { SelectFilter } from "../../components/SelectFilter";
import { useEntity } from "../../context/EntityContext";

import { entityFields } from "../../fields/Fields";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";
import { UpdateEntityModal } from "../../modals/UpdateEntityModal";
import { Entity } from "../../types/Types";
import { SearchBoxContainer } from "../../components/SearchBoxContainer";
import { CustomSpinner } from "../../components/CustomSpinner";

// Formata a data para DD/MM/YYYY
const formatDateDDMMYYYY = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const Entities = () => {
  const { entities, fetchAllEntity, updateEntity } = useEntity();
  const [openColumnSelector, setOpenColumnSelector] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "createdDate",
    "nome",
    "nif",
    "email",
    "enabled",
  ]);
  const [filterText, setFilterText] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [currentEntityIndex, setCurrentEntityIndex] = useState(0);
  const [selectedRows, setSelectedRows] = useState<Entity[]>([]);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  // Função para atualizar os dados da entidade
  const handleUpdateCompanyData = async (entityData: FormData) => {
    await updateEntity(entityData);
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para atualizar as entidade
  const refreshEntity = () => {
    fetchAllEntity();
    setClearSelectionToggle((prev) => !prev);
  };

  // Função para editar uma entidade
  const handleEditEntity = (User: Entity) => {
    setSelectedEntity(User);
    setShowUpdateModal(true);
  };

  // Função para desativar uma entidade
  const handleDisableEntity = async (entity: Entity) => {
    const updatedEntity = { ...entity, enabled: false };
    const formData = new FormData();
    if (updatedEntity.id) {
      formData.append("id", String(updatedEntity.id));
    }
    if (updatedEntity.nome) {
      formData.append("Nome", updatedEntity.nome);
    }
    if (updatedEntity.morada) {
      formData.append("Morada", updatedEntity.morada);
    }
    if (updatedEntity.cPostal) {
      formData.append("CPostal", updatedEntity.cPostal);
    }
    if (updatedEntity.localidade) {
      formData.append("Localidade", updatedEntity.localidade);
    }
    if (updatedEntity.telefone) {
      formData.append("Telefone", updatedEntity.telefone);
    }
    if (updatedEntity.telemovel) {
      formData.append("Telemovel", updatedEntity.telemovel);
    }
    if (updatedEntity.email) {
      formData.append("Email", updatedEntity.email);
    }
    if (updatedEntity.nif) {
      formData.append("NIF", String(updatedEntity.nif));
    }
    if (updatedEntity.www) {
      formData.append("WWW", updatedEntity.www);
    }
    if (updatedEntity.observacoes) {
      formData.append("Observacoes", updatedEntity.observacoes);
    }
    if (updatedEntity.enabled !== undefined) {
      formData.append("Enabled", updatedEntity.enabled ? "true" : "false");
    }
    if (updatedEntity.logotipo) {
      formData.append("Logotipo", updatedEntity.logotipo);
    }
    await handleUpdateCompanyData(formData);
    refreshEntity();
  };

  // Fecha o modal de edição de entidade
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedEntity(null);
  };

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
    setSelectedColumns(["createdDate", "nome", "nif", "email", "enabled"]);
  };

  // Função para selecionar todas as colunas
  const onSelectAllColumns = (allColumnKeys: string[]) => {
    setSelectedColumns(allColumnKeys);
  };

  // Define o componente de linha expandida
  const expandableRowComponent = (row: Entity) => (
    <ExpandedComponentEmpZoneExtEnt data={row} fields={entityFields} />
  );

  // Define a função de próxima entidade
  const handleNextEntity = () => {
    setCurrentEntityIndex((prevIndex) => {
      if (prevIndex < entities.length - 1) {
        const newIndex = prevIndex + 1;
        setSelectedEntity(entities[newIndex]);
        return newIndex;
      }
      return prevIndex;
    });
  };

  // Define a função de entidade anterior
  const handlePrevEntity = () => {
    setCurrentEntityIndex((prevIndex) => {
      if (prevIndex > 0) {
        const newIndex = prevIndex - 1;
        setSelectedEntity(entities[newIndex]);
        return newIndex;
      }
      return prevIndex;
    });
  };

  // Opções de paginação da tabela com troca de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Seleciona a linha da tabela
  const handleRowSelected = (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Entity[];
  }) => {
    const sortedEntity = state.selectedRows.sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
    setSelectedRows(sortedEntity);
  };

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
    if (!Array.isArray(entities)) {
      return [];
    }
    return entities.filter(
      (user) =>
        Object.keys(filters).every(
          (key) =>
            filters[key] === "" ||
            (user[key] != null &&
              String(user[key])
                .toLowerCase()
                .includes(filters[key].toLowerCase()))
        ) &&
        Object.entries(user).some(([key, value]) => {
          if (selectedColumns.includes(key) && value != null) {
            if (key === "createdDate" || key === "updatedDate") {
              const date = new Date(value);
              const formatted = formatDateDDMMYYYY(date);
              return formatted.toLowerCase().includes(filterText.toLowerCase());
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
  }, [entities, filters, filterText, selectedColumns]);

  // Define as colunas excluídas
  const excludedColumns = ["logotipo"];

  // Define as colunas da tabela
  const columns: TableColumn<Entity>[] = entityFields
    .filter((field) => selectedColumns.includes(field.key))
    .filter((field) => !excludedColumns.includes(field.key))
    .sort((a, b) => {
      if (a.key === "createdDate") return -1;
      else if (b.key === "createdDate") return 1;
      else return 0;
    })
    .map((field) => {
      const formatField = (row: Entity) => {
        switch (field.key) {
          case "createdDate":
          case "updatedDate":
            return new Date(row[field.key]).toLocaleString() || "";
          case "enabled":
            return row[field.key] ? "Activo" : "Inactivo";
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

  // Define a coluna de ações
  const actionColumn: TableColumn<Entity> = {
    name: "Ações",
    cell: (row: Entity) => (
      <div style={{ display: "flex" }}>
        <OverlayTrigger
          placement="top"
          delay={0}
          container={document.body}
          popperConfig={{
            modifiers: [
              {
                name: "preventOverflow",
                options: {
                  boundary: "window",
                },
              },
            ],
          }}
          overlay={<Tooltip className="custom-tooltip">Editar</Tooltip>}
        >
          <CustomOutlineButton
            className="action-button"
            icon="bi bi-pencil"
            onClick={() => handleEditEntity(row)}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          delay={0}
          container={document.body}
          popperConfig={{
            modifiers: [
              {
                name: "preventOverflow",
                options: {
                  boundary: "window",
                },
              },
            ],
          }}
          overlay={<Tooltip className="custom-tooltip">Desactivar</Tooltip>}
        >
          <CustomOutlineButton
            className="action-button"
            icon="bi bi-slash-circle"
            onClick={() => handleDisableEntity(row)}
          />
        </OverlayTrigger>
      </div>
    ),
    selector: (row: Entity) => row.id,
    ignoreRowClick: true,
  };

  // Função para obter os campos selecionados baseado em selectedColumns
  const getSelectedFields = () => {
    return entityFields.filter((field) => selectedColumns.includes(field.key));
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
    <div className="dashboard-container">
      <div className="filter-refresh-add-edit-upper-class">
        <div className="datatable-title-text">
          <span style={{ color: "#000000" }}>Entidades</span>
        </div>
        <div className="datatable-header">
          <div>
            <SearchBoxContainer onSearch={(value) => setFilterText(value)} />
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
              overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
            >
              <CustomOutlineButton
                icon="bi-arrow-clockwise"
                onClick={refreshEntity}
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
              overlay={<Tooltip className="custom-tooltip">Colunas</Tooltip>}
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
              data={selectedRows.length > 0 ? selectedRows : filteredDataTable}
              fields={getSelectedFields()}
            />
          </div>
        </div>
      </div>
      <div className="content-wrapper">
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
              columns={[...columns, actionColumn]}
              data={filteredDataTable}
              onRowDoubleClicked={handleEditEntity}
              pagination
              paginationComponentOptions={paginationOptions}
              paginationPerPage={20}
              paginationRowsPerPageOptions={[20, 50]}
              selectableRows
              onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={clearSelectionToggle}
              expandableRows
              expandableRowsComponent={({ data }) =>
                expandableRowComponent(data)
              }
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
      </div>
      {selectedEntity && (
        <UpdateEntityModal
          open={showUpdateModal}
          onClose={handleCloseUpdateModal}
          onUpdate={handleUpdateCompanyData}
          fields={entityFields}
          entity={selectedEntity}
          title="Atualizar Entidade"
          onNext={handleNextEntity}
          onPrev={handlePrevEntity}
          canMoveNext={currentEntityIndex < entities.length - 1}
          canMovePrev={currentEntityIndex > 0}
        />
      )}
      {openColumnSelector && (
        <ColumnSelectorModal
          columns={entityFields.filter(
            (field) => !excludedColumns.includes(field.key)
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
