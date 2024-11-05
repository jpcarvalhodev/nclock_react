import { employeeFields, externalEntityFields, zoneFields } from "../helpers/Fields";
import { Employee, ExternalEntity, Register, Zone } from "../helpers/Types";
import '../css/Expanded.css';
import modalAvatar from '../assets/img/navbar/navbar/modalAvatar.png';

// Define a interface para os campos
interface Field {
    key: string;
    label: string;
    type: string;
}

// Função para mapear os nomes das colunas
const columnNamesMap = (fields: Field[]) => fields.reduce((map, field) => {
    if (field.key !== 'photo') {
        map[field.key] = field.label;
    }
    return map;
}, {} as Record<string, string>);

// Define um tipo para os campos possíveis
type FieldsType = typeof employeeFields | typeof zoneFields | typeof externalEntityFields;

// Define a interface para as propriedades do componente
interface ExpandedComponentProps<T> {
    data: T;
    fields: FieldsType;
}

// Define o componente
export const ExpandedComponentEmpZoneExtEnt = <T extends Employee | Zone | ExternalEntity | Register>({
    data,
    fields
}: ExpandedComponentProps<T>) => {
    if (!data) {
        return <div>Sem dados disponíveis</div>;
    }

    const columnNames = columnNamesMap(fields);

    const photo = (data as Employee).photo || (data as Zone).photo || (data as ExternalEntity).photo || (data as Register).profileImage || modalAvatar;

    return (
        <div className="expanded-details-container">
            <div className="entity-photo">
                <img
                    src={photo}
                    alt={'Foto não disponível'}
                    className="entity-photo-img"
                    style={{ borderRadius: '50%' }}
                />
            </div>
            <div className="entity-details-grid">
                {fields.map((field) => {
                    const key = field.key;
                    if (key === 'photo') return null;
                    if (key === 'profileImage') return null;
                    if (key === 'password') return null;
                    if (key === 'confirmPassword') return null;
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
                        case 'roles':
                            displayValue = value ? value.join(', ') : 'Conta sem tipo especificado';
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