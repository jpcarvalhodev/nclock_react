import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";

import { AccessControl, Devices, Employee, Entity, MBDevice, Register } from "../types/Types";

// Estilos para o documento PDF
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  entityName: {
    fontSize: 12,
  },
  entityLogo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  page: {
    flexDirection: "column",
    backgroundColor: "#FFF",
    padding: 10,
  },
  belowHeader: {
    fontSize: 12,
    textAlign: "right",
    marginBottom: 5,
    borderColor: "#E4E4E4",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  table: {
    display: "table",
    borderStyle: "solid",
    borderBottomWidth: 0,
    margin: 0,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#E4E4E4",
    borderBottomStyle: "solid",
    alignItems: "center",
    minHeight: 20,
  },
  tableColHeader: {
    flex: 1,
    borderStyle: "solid",
    borderTopWidth: 0,
    backgroundColor: "#f2f2f2",
    textAlign: "center",
    fontWeight: "bold",
    minHeight: 35,
    display: "flex",
    justifyContent: "center",
  },
  tableCol: {
    flex: 1,
    borderStyle: "solid",
    borderTopWidth: 0,
    textAlign: "center",
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: "bold",
  },
  tableCell: {
    fontSize: 10,
  },
  footer: {
    fontSize: 12,
    textAlign: "left",
    marginTop: 20,
    borderColor: "#E4E4E4",
  },
});

// Define a interface para os campos
interface Field {
  label: string;
  key: string;
}

// Define as propriedades do documento PDF
interface PDFDocumentProps {
  data: any[];
  fields: { label: string; key: string }[];
  entity: Entity[];
  entityLogo: Blob | null;
  device: Devices[];
  mbDevice: MBDevice[];
  accessControl: AccessControl[];
  employee: Employee[];
  registeredUser: Register[];
}

// Define a interface para os itens de dados
interface DataItem {
  [key: string]: any;
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

// Componente para renderizar o documento PDF
export const PDFDocument = ({
  data = [],
  fields = [],
  entity = [],
  entityLogo = null,
  device = [],
  mbDevice = [],
  accessControl = [],
  employee = [],
  registeredUser = [],
}: PDFDocumentProps) => {
  // Obtém o nome e o logotipo da entidade
  const entityName =
    entity && entity.length > 0 && entity[0].nome
      ? entity[0].nome
      : "Nome da entidade não disponível";

  // Formata o campo com base no tipo de campo
  const formatField = (item: DataItem, fieldKey: FieldKey) => {
    const currentRoute = window.location.pathname;
    const cartao =
      currentRoute.endsWith("movecard") ||
      currentRoute.endsWith("listmovements")
        ? "Torniquete"
        : "";
    const videoporteiro = currentRoute.endsWith("movevp")
      ? "Video Porteiro"
      : "";

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
      case "timestamp":
      case "dataRecolha":
      case "dataFimRecolha":
      case "createdTime":
      case "dataCreate":
      case "createdDate":
      case "eventTime":
      case "dataInicio":
      case "dataFim":
      case "dataSaida":
        if (
          typeof item[fieldKey] === "string" &&
          /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/.test(item[fieldKey])
        ) {
          return item[fieldKey];
        }
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
      case "idVisitante":
        return (
          employee.find((visitor) => visitor.employeeID === item.idVisitante)
            ?.name || ""
        );
      case "idPessoa":
        return (
          employee.find((visitor) => visitor.employeeID === item.idPessoa)
            ?.name || ""
        );
      case "idInserido":
        return (
          registeredUser.find((user) => user.id === item.idInserido)?.name || ""
        );
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
      case "deviceID":
        return (
          device.find((device) => device.zktecoDeviceID === item.deviceID)
            ?.deviceName || ""
        );
      case "tpId":
        return (
          mbDevice.find((mbDevice) => mbDevice.id === item.tpId)
            ?.nomeQuiosque || ""
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

  const maxColsPerPage = 8;
  const maxRowsPerPage = 20;
  const allColumns = [
    "eventId",
    "appId",
    "timezoneId",
    "doorId",
    "id",
    "deviceId",
    "birthday",
    "admissionDate",
    "biIssuance",
    "biValidity",
    "exitDate",
    "status",
    "statusEmail",
    "rgpdAut",
    "departmentId",
    "professionId",
    "categoryId",
    "groupId",
    "zoneId",
    "externalEntityId",
    "attendanceTime",
    "inOutMode",
    "code",
    "machineNumber",
    "cardNumber",
    "productTime",
    "createDate",
    "updateDate",
    "createTime",
    "updateTime",
    "eventTime",
    "timestamp",
    "transactionType",
    "estadoTerminal",
    "timeReboot",
    "dataRecolha",
  ];
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

  const updateColumnsToIgnore = () => {
    const idColumns = allColumns.filter((column) =>
      column.toLowerCase().includes("id")
    );
    return [...new Set([...columnsToIgnore, ...idColumns])];
  };

  const filteredColumnsToIgnore = updateColumnsToIgnore();

  const splitFieldsIntoGroups = (fields: Field[], maxColsPerPage: number) => {
    const groups: Field[][] = [];
    for (let i = 0; i < fields.length; i += maxColsPerPage) {
      groups.push(fields.slice(i, i + maxColsPerPage));
    }
    return groups;
  };

  const splitDataIntoGroups = (data: any[], maxRowsPerPage: number) => {
    const groups: any[][] = [];
    for (let i = 0; i < data.length; i += maxRowsPerPage) {
      const group = data.slice(i, i + maxRowsPerPage);
      groups.push(group);
    }
    return groups;
  };

  const filteredFields = fields.filter(
    (field) => !filteredColumnsToIgnore.includes(field.key)
  );
  const fieldGroups = splitFieldsIntoGroups(filteredFields, maxColsPerPage);

  return (
    <Document>
      {fieldGroups.map((fieldGroup, groupIndex) => (
        <React.Fragment key={groupIndex}>
          {splitDataIntoGroups(data, maxRowsPerPage).map(
            (dataGroup, pageIndex) => (
              <Page
                size="A4"
                orientation="landscape"
                style={styles.page}
                key={pageIndex}
              >
                <View style={styles.headerContainer}>
                  <Text style={styles.entityName}>{entityName}</Text>
                  <Image
                    src={
                      entityLogo
                        ? URL.createObjectURL(entityLogo)
                        : "Logo da entidade não disponível"
                    }
                    style={styles.entityLogo}
                  />
                </View>
                <Text style={styles.belowHeader}>
                  Gerado em {new Date().toLocaleString()}
                </Text>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    {fieldGroup.map((field) => (
                      <View key={field.key} style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>
                          {field.label}
                        </Text>
                      </View>
                    ))}
                  </View>
                  {dataGroup.map((item, rowIndex) => (
                    <View key={rowIndex} style={styles.tableRow}>
                      {fieldGroup.map((field) => {
                        const value = formatField(item, field.key);
                        return (
                          <View key={field.key} style={styles.tableCol}>
                            <Text style={styles.tableCell}>{value}</Text>
                          </View>
                        );
                      })}
                    </View>
                  ))}
                </View>
                <Text style={styles.footer}>NIDGROUP - Business Solutions</Text>
              </Page>
            )
          )}
        </React.Fragment>
      ))}
    </Document>
  );
};
