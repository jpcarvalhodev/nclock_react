import { Employee, Department, Category, Group, Profession, Zone, ExternalEntity, EmployeeAttendanceTimes, ExternalEntityTypes } from "../helpers/Types";
import { Dropdown } from "react-bootstrap";
import "../css/PagesStyles.css"
import ReactDOM from "react-dom";

type DataItem = Employee | Department | Category | Group | Profession | Zone | ExternalEntity | ExternalEntityTypes | EmployeeAttendanceTimes;

interface SelectFilterProps {
    column: string;
    setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    data: DataItem[];
    formatFunction?: (item: EmployeeAttendanceTimes) => string; 
}

export const SelectFilter = ({ column, setFilters, data }: SelectFilterProps) => {
    const options = Array.from(new Set(data.map(item => item[column]?.toString())));

    const portalElement = document.getElementById('portal-root');

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
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleChange("")}>Todos</Dropdown.Item>
                    {options.map(option => (
                        <Dropdown.Item key={option} onClick={() => handleChange(option)}>
                            {option}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>,
                portalElement
            )}
        </Dropdown>
    );
};