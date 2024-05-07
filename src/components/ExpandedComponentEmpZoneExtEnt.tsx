import { employeeFields, externalEntityFields, zoneFields } from "../helpers/Fields";
import { Employee, ExternalEntity, Zone } from "../helpers/Types";
import '../css/Expanded.css';
import modalAvatar from '../assets/img/modalAvatar.png';

interface Field {
    key: string;
    label: string;
    type: string;
}

const columnNamesMap = (fields: Field[]) => fields.reduce((map, field) => {
    map[field.key] = field.label;
    return map;
}, {} as Record<string, string>);

type FieldsType = typeof employeeFields | typeof zoneFields | typeof externalEntityFields;

interface ExpandedComponentProps<T> {
    data: T;
    fields: FieldsType;
}

export const ExpandedComponentEmpZoneExtEnt = <T extends Employee | Zone | ExternalEntity>({
    data,
    fields
}: ExpandedComponentProps<T>) => {
    if (!data) {
        return <div>Sem dados disponíveis</div>;
    }

    const columnNames = columnNamesMap(fields);

    const photo = (data as Employee).photo || (data as Zone).photo || (data as ExternalEntity).photo || modalAvatar;

    return (
        <div className="expanded-details-container">
            <div className="entity-photo">
                <img
                    src={photo}
                    alt={'Foto não disponível'}
                    className="entity-photo-img"
                />
            </div>
            <div className="entity-details-grid">
                {fields.map((field) => {
                    const key = field.key;
                    const value = data[key];
                    let displayValue = value;
                    switch (key) {
                        case 'status':
                            displayValue = value ? 'Activo' : 'Inactivo';
                            break;
                        case 'statusEmail':
                            displayValue = value ? 'Activo' : 'Inactivo';
                            break;
                        case 'rgpdAut':
                            displayValue = value ? 'Autorizado' : 'Não Autorizado';
                            break;
                        case 'departmentId':
                            displayValue = (data as Employee)['departmentName'] || '';
                            break;
                        case 'professionId':
                            displayValue = (data as Employee)['professionCode'] || '';
                            break;
                        case 'categoryId':
                            displayValue = (data as Employee)['categoryCode'] || '';
                            break;
                        case 'groupId':
                            displayValue = (data as Employee)['groupName'] || '';
                            break;
                        case 'zoneId':
                            displayValue = (data as Employee)['zoneName'] || '';
                            break;
                        case 'externalEntityId':
                            displayValue = (data as Employee)['externalEntityName'] || '';
                            break;
                        default:
                            if (typeof value === 'object' && value !== null) {
                                displayValue = JSON.stringify(value, null, 2);
                            }
                    }
                    const displayName = columnNames[key] || key;
                    return (
                        <div key={key} className="entity-detail">
                            <span className="detail-key">{`${displayName}: `}</span>
                            {displayValue}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};