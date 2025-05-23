import {
  AccessControl,
  Accesses,
  Ads,
  Category,
  Department,
  Devices,
  Doors,
  Employee,
  EmployeeAndCard,
  EmployeeAttendanceTimes,
  EmployeeDevices,
  EmployeeFP,
  EmployeeFace,
  EmployeesOnDevice,
  ExternalEntity,
  ExternalEntityTypes,
  Group,
  KioskTransaction,
  KioskTransactionCard,
  KioskTransactionMB,
  LimpezasEOcorrencias,
  Logs,
  MBDevice,
  ManualOpenDoor,
  Profession,
  Readers,
  RecolhaMoedeiroEContador,
  Register,
  Zone,
} from "../types/Types";

import { Dropdown } from "react-bootstrap";
import "../css/PagesStyles.css";
import ReactDOM from "react-dom";

import { useTerminals } from "../context/TerminalsContext";

// Tipos de dados
type DataItem =
  | Employee
  | Department
  | Category
  | Group
  | Profession
  | Zone
  | ExternalEntity
  | ExternalEntityTypes
  | EmployeeAttendanceTimes
  | Devices
  | EmployeeDevices
  | EmployeesOnDevice
  | EmployeeAndCard
  | EmployeeFP
  | EmployeeFace
  | Ads
  | KioskTransaction
  | KioskTransactionCard
  | KioskTransactionMB
  | Register
  | Doors
  | MBDevice
  | RecolhaMoedeiroEContador
  | ManualOpenDoor
  | LimpezasEOcorrencias
  | Logs
  | Readers
  | AccessControl
  | Accesses;

// Propriedades do componente de filtro de seleção
interface SelectFilterProps {
  column: string;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  data: DataItem[];
}

// Função de formatação de item de dados
const formatDataItem = (
  item: DataItem,
  column: string,
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

  switch (column) {
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
      return validDate(item[column]);
    case "status":
    case "statusEmail":
      return item[column] ? "Activo" : "Inactivo";
    case "rgpdAut":
      return item[column] ? "Autorizado" : "Não Autorizado";
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
        switch (item[column]) {
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
      return item[column] === 1 ? "Multibanco" : "Moedeiro";
    case "estadoTerminal":
      return item[column] ? "Ligado" : "Desligado";
    case "timeReboot":
      return item[column] === "00:00:00"
        ? "Sem tempo de reinício"
        : item[column];
    case "statusFprint":
    case "statusPalm":
    case "statusFace":
      return item[column] ? "Activo" : "Inactivo";
    case "isPresent":
      return item[column] ? "Presente" : "Ausente";
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
      if (!found || !Array.isArray(found.acc)) {
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
      return item[column] !== undefined &&
        item[column] !== null &&
        item[column] !== ""
        ? item[column]
        : " ";
  }
};

// Componente de filtro de seleção
export const SelectFilter = ({
  column,
  setFilters,
  data,
}: SelectFilterProps) => {
  const { devices, mbDevices, accessControl } = useTerminals();

  // Garante que data seja um array
  const dataArray = Array.isArray(data) ? data : [];

  // Formata os dados
  let options: string[];
  if (column === 'isPresent') {
    options = ['true', 'false'];
  } else {
    options = Array.from(
      new Set(
        dataArray.map((item) =>
          formatDataItem(item, column, devices, mbDevices, accessControl)
        )
      )
    );
  }

  // Função para traduzir 'true' e 'false' para 'Presente' e 'Ausente'
  const getDisplayValue = (value: string) => {
    if (column === 'isPresent') {
      return value === 'true' ? 'Presente' : 'Ausente';
    }
    return value;
  };

  // Obter o elemento do portal
  const portalElement = document.getElementById("portal-root");

  // Função de mudança de filtro
  const handleChange = (value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: String(value),
    }));
  };

  return (
    <Dropdown
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <Dropdown.Toggle
        variant="transparent"
        id="dropdown-basic"
        style={{
          border: "none",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <i className="bi bi-filter"></i>
      </Dropdown.Toggle>
      {portalElement &&
        ReactDOM.createPortal(
          <Dropdown.Menu style={{ maxHeight: 200, overflowY: "auto" }}>
            <Dropdown.Item onClick={() => handleChange("")} key="all">
              Todos
            </Dropdown.Item>
            {options.map((option, index) => (
              <Dropdown.Item
                key={`${option}-${index}`}
                onClick={() => handleChange(option)}
              >
                {getDisplayValue(option)}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>,
          portalElement
        )}
    </Dropdown>
  );
};
