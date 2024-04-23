import { employeeFields } from "../helpers/Fields";
import { Employee } from "../helpers/Types";

const columnNamesMap: Record<string, string> = employeeFields.reduce((map, field) => {
    map[field.key] = field.label;
    return map;
}, {} as Record<string, string>);

export const ExpandedComponentEmployee = ({ data }: { data: Employee }) => (
    <div className="expanded-details-container">
        {employeeFields.map((field) => {
            const key = field.key;
            const value = data[key];
            let displayValue = value;
            switch (key) {
                case 'departmentId':
                    displayValue = data['departmentName'] || '';
                    break;
                case 'professionId':
                    displayValue = data['professionCode'] || '';
                    break;
                case 'categoryId':
                    displayValue = data['categoryCode'] || '';
                    break;
                case 'groupId':
                    displayValue = data['groupName'] || '';
                    break;
                case 'zoneId':
                    displayValue = data['zoneName'] || '';
                    break;
                case 'externalEntityId':
                    displayValue = data['externalEntityName'] || '';
                    break;
                default:
                    if (typeof value === 'object' && value !== null) {
                        displayValue = JSON.stringify(value, null, 2);
                    }
            }
            const displayName = columnNamesMap[key] || key;
            return (
                <p key={key}>
                    <span className="detail-key">{`${displayName}: `}</span>
                    {displayValue}
                </p>
            );
        })}
    </div>
);