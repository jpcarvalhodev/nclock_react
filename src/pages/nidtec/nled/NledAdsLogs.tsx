import { useEffect, useMemo, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";

import * as apiService from "../../../api/apiService";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { customStyles } from "../../../components/CustomStylesDataTable";

import { SelectFilter } from "../../../components/SelectFilter";

import { adsFields } from "../../../fields/Fields";
import { Ads } from "../../../types/Types";
import { SearchBoxContainer } from "../../../components/SearchBoxContainer";
import { CustomSpinner } from "../../../components/CustomSpinner";

export const NledAdsLogs = () => {
  const [logs, setlogs] = useState<Ads[]>([]);
  const [filterText, setFilterText] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Função para buscar os logs
  const fetchAllAds = async () => {
    try {
      const data = await apiService.fetchAllAds();
      setlogs(data);
    } catch (error) {
      console.error("Erro ao buscar os dados das publicidades:", error);
    }
  };

  // Busca os logs ao carregar a página
  useEffect(() => {
    fetchAllAds();
  }, []);

  // Função para atualizar os logs
  const refreshAds = () => {
    fetchAllAds();
  };

  // Opções de paginação da tabela com troca de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Define as colunas da tabela
  const columns: TableColumn<Ads>[] = adsFields
    .filter((field) =>
      ["creador", "createDate", "updateDate"].includes(field.key)
    )
    .map((field) => {
      const formatField = (row: Ads) => {
        switch (field.key) {
          case "createDate":
            return new Date(row[field.key]).toLocaleString() || "";
          case "updateDate":
            return new Date(row[field.key]).toLocaleString() || "";
          default:
            return row[field.key] || "";
        }
      };
      return {
        name: (
          <>
            {field.label}
            {field.key !== "createDate" && field.key !== "updateDate" && (
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
      };
    });

  // Filtra os dados da tabela
  const filteredDataTable = useMemo(() => {
    return logs.filter(
      (log) =>
        Object.keys(filters).every(
          (key) =>
            filters[key] === "" ||
            (log[key] != null &&
              String(log[key])
                .toLowerCase()
                .includes(filters[key].toLowerCase()))
        ) &&
        Object.values(log).some((value) => {
          if (value == null) {
            return false;
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
        })
    );
  }, [logs, filters, filterText]);

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
    <div className="dashboard-container">
      <div className="filter-refresh-add-edit-upper-class">
        <div className="datatable-title-text">
          <span>Logs de Publicidades</span>
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
              overlay={<Tooltip>Atualizar</Tooltip>}
            >
              <CustomOutlineButton
                icon="bi-arrow-clockwise"
                onClick={refreshAds}
              />
            </OverlayTrigger>
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
              columns={columns}
              data={filteredDataTable}
              pagination
              paginationComponentOptions={paginationOptions}
              paginationPerPage={20}
              noDataComponent="Não existem dados disponíveis para mostrar."
              customStyles={customStyles}
              striped
              responsive
              persistTableHead={true}
              defaultSortAsc={true}
              defaultSortFieldId="createDate"
            />
          )}
        </div>
      </div>
    </div>
  );
};
