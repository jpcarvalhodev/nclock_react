import { Employee, Department, Category, Group, Profession, Zone, ExternalEntity, EmployeeAttendanceTimes, ExternalEntityTypes, Devices, EmployeeDevices, EmployeeAndCard, Ads, EmployeeFace, EmployeeFP, KioskTransaction, KioskTransactionCard, KioskTransactionMB, Register, Doors, MBDevice, RecolhaMoedeiroEContador, ManualOpenDoor, LimpezasEOcorrencias, Logs } from "../helpers/Types";
import { Dropdown } from "react-bootstrap";
import "../css/PagesStyles.css"
import ReactDOM from "react-dom";
import * as apiService from "../helpers/apiService";

// Tipos de dados
type DataItem = Employee | Department | Category | Group | Profession | Zone | ExternalEntity | ExternalEntityTypes | EmployeeAttendanceTimes | Devices | EmployeeDevices | EmployeeAndCard | EmployeeFP | EmployeeFace | Ads | KioskTransaction | KioskTransactionCard | KioskTransactionMB | Register | Doors | MBDevice | RecolhaMoedeiroEContador | ManualOpenDoor | LimpezasEOcorrencias | Logs;

// Propriedades do componente de filtro de seleção
interface SelectFilterProps {
    column: string;
    setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    data: DataItem[];
}

// Função de formatação de item de dados
const formatDataItem = (item: DataItem, column: string) => {
    const validDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        return date.getTime() ? date.toLocaleString() : '';
    };

    switch (column) {
        case 'birthday':
        case 'admissionDate':
        case 'bIissuance':
        case 'biValidity':
        case 'exitDate':
        case 'dateInserted':
        case 'dateUpdated':
        case 'attendanceTime':
        case 'productTime':
        case 'createDate':
        case 'updateDate':
        case 'createTime':
        case 'updateTime':
        case 'eventTime':
        case 'timestamp':
        case 'dataRecolha':
        case 'createdTime':
        case 'dataCreate':
            return validDate(item[column]);
        case 'status':
        case 'statusEmail':
            return item[column] ? 'Activo' : 'Inactivo';
        case 'rgpdAut':
            return item[column] ? 'Autorizado' : 'Não Autorizado';
        case 'departmentId':
        case 'professionId':
        case 'categoryId':
        case 'groupId':
        case 'zoneId':
        case 'externalEntityId':
            return item[column + 'Name'] || '';
        case 'employeeId':
            return item.employeeName;
        case 'inOutMode':
            if (item.inOutModeDescription) {
                return item.inOutModeDescription || '';
            } else {
                switch (item[column]) {
                    case 0: return 'Entrada';
                    case 1: return 'Saída';
                    case 2: return 'Pausa - Entrada';
                    case 3: return 'Pausa - Saída';
                    case 4: return 'Hora Extra - Entrada';
                    case 5: return 'Hora Extra - Saída';
                    default: return '';
                }
            }
        case 'code':
        case 'machineNumber':
        case 'cardNumber':
            return item[column] === 0 ? "" : item[column];
        case 'eventDoorId':
            switch (item.eventDoorId) {
                case 1: return 'Terminal';
                case 2: return 'Moedeiro';
                case 3: return 'Cartão';
                case 4: return 'Video Porteiro';
                default: return '';
            }
        case 'transactionType':
            return item[column] === 1 ? 'Multibanco' : 'Moedeiro';
        case 'estadoTerminal':
            return item[column] ? 'Ligado' : 'Desligado';
        case 'timeReboot':
            return item[column] === '00:00:00' ? 'Sem tempo de reinício' : item[column];
        case 'clientTicket':
        case 'merchantTicket':
            const imageUrl = item[column];
            if (imageUrl) {
                const uploadPath = imageUrl.substring(imageUrl.indexOf('/Uploads'));
                const fullImageUrl = `${apiService.baseURL}${uploadPath}`;
                return fullImageUrl;
            } else {
                return 'Sem Ticket';
            }
        default:
            return item[column] ? item[column].toString() : ' ';
    }
};

// Componente de filtro de seleção
export const SelectFilter = ({ column, setFilters, data }: SelectFilterProps) => {
    // Formata os dados
    const options = Array.from(new Set(data.map(item => formatDataItem(item, column))));

    // Obter o elemento do portal
    const portalElement = document.getElementById('portal-root');

    // Função de mudança de filtro
    const handleChange = (value: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [column]: value
        }));
    };

    return (
        <Dropdown onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
        }}>
            <Dropdown.Toggle variant="transparent" id="dropdown-basic" style={{ border: 'none', backgroundColor: 'transparent', boxShadow: 'none' }}>
                <i className="bi bi-filter"></i>
            </Dropdown.Toggle>
            {portalElement && ReactDOM.createPortal(
                <Dropdown.Menu style={{ maxHeight: 200, overflowY: 'auto' }}>
                    <Dropdown.Item onClick={() => handleChange("")} key="all">Todos</Dropdown.Item>
                    {options.map((option, index) => (
                        <Dropdown.Item key={`${option}-${index}`} onClick={() => handleChange(option)}>
                            {option}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>,
                portalElement
            )}
        </Dropdown>
    );
};