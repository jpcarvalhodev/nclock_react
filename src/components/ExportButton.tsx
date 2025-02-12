import { PDFDownloadLink } from "@react-pdf/renderer";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

import * as apiService from "../api/apiService";
import { useEntity } from "../context/EntityContext";
import { useTerminals } from "../context/TerminalsContext";
import { AccessControl, Devices, MBDevice } from "../types/Types";

import { CustomOutlineButton } from "./CustomOutlineButton";
import { PDFDocument } from "./PDFDocument";

// Define a interface para os itens de dados
interface DataItem {
  [key: string]: any;
}

// Define a interface para os campos
interface Field {
  label: string;
  key: string;
}

// Define as propriedades do botão de exportação
interface ExportButtonProps {
  allData: DataItem[];
  selectedData: DataItem[];
  fields: Field[];
}

// Define o tipo de campo para as exceções
type FieldKey =
  | "birthday"
  | "status"
  | "statusEmail"
  | "rgpdAut"
  | "departmentId"
  | "professionId"
  | "categoryId"
  | "groupId"
  | "zoneId"
  | "externalEntityId"
  | "attendanceTime"
  | "inOutMode"
  | "code"
  | "machineNumber"
  | "cardNumber"
  | "productTime"
  | "createDate"
  | "updateDate"
  | "createTime"
  | "updateTime"
  | "eventTime"
  | "timestamp"
  | "eventDoorId"
  | "transactionType"
  | "estadoTerminal"
  | "timeReboot"
  | "dataRecolha"
  | "dataFimRecolha"
  | "createdTime"
  | "dataCreate"
  | "admissionDate"
  | "bIissuance"
  | "biValidity"
  | "exitDate"
  | "dateInserted"
  | "dateUpdated"
  | "employeeId"
  | "statusFprint"
  | "statusPalm"
  | "statusFace"
  | "isPresent"
  | "urlArquivo"
  | "fechoImage"
  | "aberturaImage"
  | string;

// Formata o campo com base no tipo de campo
const formatField = (
  item: DataItem,
  fieldKey: FieldKey,
  device: Devices[],
  mbDevice: MBDevice[],
  accessControl: AccessControl[]
) => {
  const currentRoute = window.location.pathname;
  const cartao =
    currentRoute.endsWith("movecard") || currentRoute.endsWith("listmovements")
      ? "Torniquete"
      : "";
  const videoporteiro = currentRoute.endsWith("movevp") ? "Video Porteiro" : "";

  const validDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.getTime() ? date.toLocaleString() : "";
  };

  switch (fieldKey) {
    case "birthday":
    case "admissionDate":
    case "bIissuance":
    case "biValidity":
    case "exitDate":
    case "dateInserted":
    case "dateUpdated":
    case "attendanceTime":
    case "productTime":
    case "createDate":
    case "updateDate":
    case "createTime":
    case "updateTime":
    case "eventTime":
    case "timestamp":
    case "dataRecolha":
    case "dataFimRecolha":
    case "createdTime":
    case "dataCreate":
    case "createdDate":
      return validDate(item[fieldKey]);
    case "status":
    case "statusEmail":
      return item[fieldKey] ? "Activo" : "Inactivo";
    case "rgpdAut":
      return item[fieldKey] ? "Autorizado" : "Não Autorizado";
    case "employeeId":
      return item.employeeName || "";
    case "departmentId":
      return item.departmentName || "";
    case "professionId":
      return item.professionName || "";
    case "categoryId":
      return item.categoryName || "";
    case "groupId":
      return item.groupName || "";
    case "zoneId":
      return item.zoneName || "";
    case "externalEntityId":
      return item.externalEntityName || "";
    case "entidadeId":
      return item.entidadeName || "";
    case "accPlanoAcessoId":
      return item.accPlanoAcessoName || "";
    case "inOutMode":
      if (item.inOutModeDescription) {
        return item.inOutModeDescription || "";
      } else {
        switch (item[fieldKey]) {
          case 0:
            return "Entrada";
          case 1:
            return "Saída";
          case 2:
            return "Pausa - Entrada";
          case 3:
            return "Pausa - Saída";
          case 4:
            return "Hora Extra - Entrada";
          case 5:
            return "Hora Extra - Saída";
          default:
            return "";
        }
      }
    case "code":
    case "machineNumber":
    case "cardNumber":
      return item[fieldKey] === 0 ? "" : item[fieldKey];
    case "eventDoorId":
      switch (item.eventDoorId) {
        case 1:
          return currentRoute.endsWith("payterminal") ? "Terminal" : "";
        case 2:
          return currentRoute.endsWith("paycoins") ? "Moedeiro" : "";
        case 3:
          return cartao;
        case 4:
          return currentRoute.endsWith("movekiosk") ? "Quiosque" : "";
        case null:
          return videoporteiro;
        default:
          return "";
      }
    case "transactionType":
      return item[fieldKey] === 1 ? "Multibanco" : "Moedeiro";
    case "estadoTerminal":
      return item[fieldKey] ? "Ligado" : "Desligado";
    case "timeReboot":
      return item[fieldKey] === "00:00:00"
        ? "Sem tempo de reinício"
        : item[fieldKey];
    case "statusFprint":
    case "statusPalm":
    case "statusFace":
      return item[fieldKey] ? "Activo" : "Inactivo";
    case "isPresent":
      return item[fieldKey] ? "Presente" : "Ausente";
    case "deviceSN":
      return (
        device.find((device) => device.serialNumber === item.deviceSN)
          ?.deviceName || ""
      );
    case "tpId":
      return (
        mbDevice.find((mbDevice) => mbDevice.id === item.tpId)?.nomeQuiosque ||
        ""
      );
    case "doorName": {
      const found = accessControl.find(
        (acObj) => acObj.employeesId === item.employeesId
      );
      if (!found) {
        return "";
      }
      const doorNames = found.acc.map(
        (accItem: AccessControl) => accItem.doorName
      );
      return doorNames.join(", ");
    }
    case "timezoneName": {
      const found = accessControl.find(
        (acObj) => acObj.employeesId === item.employeesId
      );
      if (!found) {
        return "";
      }
      const timezones = found.acc.map(
        (accItem: AccessControl) => accItem.timezoneName
      );
      return timezones.join(", ");
    }
    case "cardNumber":
      return item.employeeCards?.[0]?.cardNumber || "";
    default:
      return item[fieldKey] !== undefined &&
        item[fieldKey] !== null &&
        item[fieldKey] !== ""
        ? item[fieldKey]
        : " ";
  }
};

// Colunas a ignorar na exportação
const columnsToIgnore = [
  "clientTicket",
  "merchantTicket",
  "photo",
  "logotipo",
  "url",
  "passwordCamera",
  "urlArquivo",
  "fechoImage",
  "aberturaImage",
  "paiId",
  "employeesId",
];

// Função para exportar os dados para CSV
const exportToCSV = (
  data: DataItem[],
  fileName: string,
  fields: Field[],
  device: Devices[],
  mbDevice: MBDevice[],
  accessControl: AccessControl[]
): void => {
  const fileExtension = ".csv";
  const fileType = "text/csv;charset=utf-8;";
  const BOM = "\uFEFF";
  const delimiter = ";";

  const filteredFields = fields.filter(
    (field) => !columnsToIgnore.includes(field.key)
  );

  const validFields = data.reduce((acc, item) => {
    filteredFields.forEach((field) => {
      const value = item[field.key];
      if (value !== undefined && value !== null && value !== "") {
        acc.add(field.key);
      }
    });
    return acc;
  }, new Set());

  const headers = filteredFields
    .filter((field) => validFields.has(field.key))
    .map((field) => field.label)
    .join(delimiter);

  const csvContent = data
    .map((item) => {
      return filteredFields
        .map((field) => {
          if (!validFields.has(field.key)) return "";
          const value = formatField(
            item,
            field.key,
            device,
            mbDevice,
            accessControl
          );
          if (typeof value === "string") {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .filter((v) => v !== "")
        .join(delimiter);
    })
    .join("\r\n");

  const csvData = BOM + headers + "\r\n" + csvContent;

  const blob = new Blob([csvData], { type: fileType });
  saveAs(blob, fileName + fileExtension);
};

// Função para exportar os dados para XLSX
const exportToXLSX = (
  data: DataItem[],
  fileName: string,
  fields: Field[],
  device: Devices[],
  mbDevice: MBDevice[],
  accessControl: AccessControl[]
): void => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data");

  const headers = fields
    .filter((field) => !columnsToIgnore.includes(field.key))
    .map((field) => ({
      header: field.label,
      key: field.key,
      width: 20,
    }));
  worksheet.columns = headers;

  data.forEach((item) => {
    const row: Record<string, any> = {};
    headers.forEach((header) => {
      const value = formatField(
        item,
        header.key,
        device,
        mbDevice,
        accessControl
      );
      row[header.key] = value;
    });
    worksheet.addRow(row);
  });

  worksheet.eachRow(
    { includeEmpty: true },
    function (row: { eachCell: (arg0: (cell: any) => void) => void }) {
      row.eachCell((cell) => {
        cell.numFmt = "@";
      });
    }
  );

  workbook.xlsx.writeBuffer().then(function (buffer: BlobPart) {
    saveAs(
      new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      `${fileName}.xlsx`
    );
  });
};

// Função para exportar os dados para TXT
const exportToTXT = (
  data: DataItem[],
  fileName: string,
  device: Devices[],
  mbDevice: MBDevice[],
  accessControl: AccessControl[]
): void => {
  const fileExtension = ".txt";

  const filteredData = data.map((item) => {
    const {
      employeeID,
      employeeId,
      departmentID,
      groupID,
      categoryID,
      professionID,
      zoneID,
      attendanceTimeId,
      ...rest
    } = item;

    const filteredItem = Object.keys(rest)
      .filter((key) => !columnsToIgnore.includes(key))
      .reduce((result: Record<string, any>, key) => {
        const value = formatField(rest, key, device, mbDevice, accessControl);
        if (value !== undefined && value !== null && value !== "") {
          result[key] = value;
        }
        return result;
      }, {});

    return filteredItem;
  });

  const blob = new Blob([JSON.stringify(filteredData, null, 2)], {
    type: "text/plain",
  });
  saveAs(blob, fileName + fileExtension);
};

// Define o componente
export const ExportButton = ({
  allData,
  selectedData,
  fields,
}: ExportButtonProps) => {
  const { devices, mbDevices, accessControl } = useTerminals();
  const { entities } = useEntity();
  const fileName = "dados_exportados";
  const dataToExport = selectedData.length > 0 ? selectedData : allData;
  const [entityLogo, setEntityLogo] = useState<Blob | null>(null);

  // Obtém o logotipo da entidade
  const fetchLogo = async () => {
    try {
      const nif = localStorage.getItem("nif");
      const logo = await apiService.fetchCompanyLogo(Number(nif));
      setEntityLogo(logo);
    } catch (error) {
      console.error("Erro ao buscar logotipo:", error);
    }
  };

  // Busca as entidades ao montar o componente
  useEffect(() => {
    fetchLogo();
  }, []);

  return (
    <Dropdown>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip className="custom-tooltip">Exportar</Tooltip>}
      >
        <Dropdown.Toggle
          as={CustomOutlineButton}
          icon="bi-file-earmark-arrow-down"
          id="dropdown-basic-4"
          iconSize="1.1em"
          className="custom-dropdown-toggle"
        ></Dropdown.Toggle>
      </OverlayTrigger>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() =>
            exportToCSV(
              dataToExport,
              fileName,
              fields,
              devices,
              mbDevices,
              accessControl
            )
          }
        >
          Exportar em CSV
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() =>
            exportToXLSX(
              dataToExport,
              fileName,
              fields,
              devices,
              mbDevices,
              accessControl
            )
          }
        >
          Exportar em XLSX
        </Dropdown.Item>
        <Dropdown.Item as="button">
          <PDFDownloadLink
            document={
              <PDFDocument
                data={dataToExport}
                fields={fields}
                entity={entities}
                entityLogo={entityLogo}
                device={devices}
                mbDevice={mbDevices}
                accessControl={accessControl}
              />
            }
            fileName={`${fileName}.pdf`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Exportar em PDF
          </PDFDownloadLink>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() =>
            exportToTXT(
              dataToExport,
              fileName,
              devices,
              mbDevices,
              accessControl
            )
          }
        >
          Exportar em TXT
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
