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
    switch (column) {
        case 'birthday':
            return new Date(item.birthday).toLocaleString() || '';
        case 'admissionDate':
            return new Date(item.admissionDate).toLocaleString() || '';
        case 'bIissuance':
            return new Date(item.bIissuance).toLocaleString() || '';
        case 'biValidity':
            return new Date(item.biValidity).toLocaleString() || '';
        case 'exitDate':
            return new Date(item.exitDate).toLocaleString() || '';
        case 'dateInserted':
            return new Date(item.dateInserted).toLocaleString() || '';
        case 'dateUpdated':
            return new Date(item.dateInserted).toLocaleString() || '';
        case 'status':
            return item.status ? 'Activo' : 'Inactivo';
        case 'statusEmail':
            return item.statusEmail ? 'Activo' : 'Inactivo';
        case 'rgpdAut':
            return item.rgpdAut ? 'Autorizado' : 'Não Autorizado';
        case 'departmentId':
            return item.departmentName || '';
        case 'professionId':
            return item.professionName || '';
        case 'categoryId':
            return item.categoryName || '';
        case 'groupId':
            return item.groupName || '';
        case 'zoneId':
            return item.zoneName || '';
        case 'externalEntityId':
            return item.externalEntityName || '';
        case 'attendanceTime':
            return new Date(item.attendanceTime).toLocaleString() || '';
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
            return item.code === 0 ? "" : item.code;
        case 'machineNumber':
            return item.code === 0 ? "" : item.machineNumber;
        case 'cardNumber':
            return item.cardNumber === 0 ? "" : item.cardNumber;
        case 'productTime':
            return new Date(item.productTime).toLocaleString() || '';
        case 'createDate':
            return new Date(item.createDate).toLocaleString() || '';
        case 'updateDate':
            return new Date(item.updateDate).toLocaleString() || '';
        case 'createTime':
            return new Date(item.createTime).toLocaleString() || '';
        case 'updateTime':
            return new Date(item.updateTime).toLocaleString() || '';
        case 'eventTime':
            return new Date(item.eventTime).toLocaleString() || '';
        case 'timestamp':
            return new Date(item.timestamp).toLocaleString() || '';
        case 'eventDoorId':
            switch (item.eventDoorId) {
                case 1: return 'Terminal';
                case 2: return 'Moedeiro';
                case 3: return 'Cartão';
                case 4: return 'Video Porteiro';
                default: return '';
            }
        case 'transactionType':
            return item[item.transactionType] === 1 ? 'Multibanco' : 'Moedeiro';
        case 'estadoTerminal':
            return item[item.estadoTerminal] ? 'Ligado' : 'Desligado';
        case 'timeReboot':
            return item[item.timeReboot] === '00:00:00' ? 'Sem tempo de reinício' : item[item.timeReboot];
        case 'clientTicket':
        case 'merchantTicket':
            const imageUrl = item[item.clientTicket || item.merchantTicket];
            if (imageUrl) {
                const uploadPath = imageUrl.substring(imageUrl.indexOf('/Uploads'));
                const fullImageUrl = `${apiService.baseURL}${uploadPath}`;
                return fullImageUrl;
            } else {
                return 'Sem Ticket';
            }
        case 'dataRecolha':
            return new Date(item.dataRecolha).toLocaleString() || '';
        case 'createdTime':
            return new Date(item.createdTime).toLocaleString() || '';
        case 'dataCreate':
            return new Date(item.dataCreate).toLocaleString() || '';
        default:
            return item[column]?.toString();
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