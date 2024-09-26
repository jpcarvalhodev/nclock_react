import { Employee, Department, Category, Group, Profession, Zone, ExternalEntity, EmployeeAttendanceTimes, ExternalEntityTypes, Devices, EmployeeDevices, EmployeeAndCard, Ads, EmployeeFace, EmployeeFP, KioskTransaction, KioskTransactionCard, KioskTransactionMB, KioskTransactionMBCoin, Register } from "../helpers/Types";
import { Dropdown } from "react-bootstrap";
import "../css/PagesStyles.css"
import ReactDOM from "react-dom";

// Tipos de dados
type DataItem = Employee | Department | Category | Group | Profession | Zone | ExternalEntity | ExternalEntityTypes | EmployeeAttendanceTimes | Devices | EmployeeDevices | EmployeeAndCard | EmployeeFP | EmployeeFace | Ads | KioskTransaction | KioskTransactionCard | KioskTransactionMB | KioskTransactionMBCoin | Register;

// Propriedades do componente de filtro de seleção
interface SelectFilterProps {
    column: string;
    setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    data: DataItem[];
}

// Função para formatar a data e a hora
function formatDateAndTime(input: string | Date): string {
    const date = typeof input === 'string' ? new Date(input) : input;
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    };
    return new Intl.DateTimeFormat('pt-PT', options).format(date);
}

// Função de formatação de item de dados
const formatDataItem = (item: DataItem, column: string) => {
    switch (column) {
        case 'birthday':
            return item.birthday ? formatDateAndTime(item[column]) : '';
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
            return formatDateAndTime(item[column]);
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
            return item.productTime ? formatDateAndTime(item[column]) : '';
        case 'status':
            return item.status ? 'Activo' : 'Inactivo';
        case 'createDate':
            return new Date(item.createDate).toLocaleString() || '';
        case 'updateDate':
            return new Date(item.updateDate).toLocaleString() || '';
        case 'createTime':
            return new Date(item.createTime).toLocaleString() || '';
        case 'updateTime':
            return new Date(item.updateTime).toLocaleString() || '';
        case 'timestamp':
            return item.timestamp ? new Date(item.timestamp).toLocaleString() : '';
        case 'eventDoorId':
            switch (item.eventDoorId) {
                case 1: return 'Terminal';
                case 2: return 'Moedeiro';
                case 3: return 'Cartão';
                case 4: return 'Video Porteiro';
                default: return '';
            }
        case 'eventDoorName':
            return item.eventDoorId === 2 ? 'Moedeiro' : 'Terminal';
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