import { employeeFields, entityFields, externalEntityFields, registerFields, zoneFields } from "../helpers/Fields";
import { Employee, Entity, ExternalEntity, Register, Zone } from "../helpers/Types";
import '../css/Expanded.css';
import modalAvatar from '../assets/img/navbar/navbar/modalAvatar.png';
import * as apiService from "../helpers/apiService";

// Define a interface para os campos
interface Field {
    key: string;
    label: string;
    type: string;
}

// Função para mapear os nomes das colunas
const columnNamesMap = (fields: Field[]) => fields.reduce((map, field) => {
    if (field.key !== 'photo' && field.key !== 'logotipo' && field.key !== 'profileImage') {
        map[field.key] = field.label;
    }
    return map;
}, {} as Record<string, string>);

// Define um tipo para os campos possíveis
type FieldsType = typeof employeeFields | typeof zoneFields | typeof externalEntityFields | typeof entityFields | typeof registerFields;

// Define a interface para as propriedades do componente
interface ExpandedComponentProps<T> {
    data: T;
    fields: FieldsType;
}

// Define o componente
export const ExpandedComponentEmpZoneExtEnt = <T extends Employee | Zone | ExternalEntity | Register | Entity>({
    data,
    fields
}: ExpandedComponentProps<T>) => {
    if (!data) {
        return <div>Sem dados disponíveis</div>;
    }

    const columnNames = columnNamesMap(fields);

    // Função para obter a URL da foto
    const getPhotoUrl = (data: Employee | Zone | ExternalEntity | Register | Entity) => {
        const photo = (data as Employee).photo ||
            (data as Zone).photo ||
            (data as ExternalEntity).photo ||
            (data as Register).profileImage ||
            (data as Entity).logotipo;

        if (data as Register && data.profileImage) {
            return `${apiService.baseURL?.slice(0, -1)}${data.profileImage}`;
        }
        if (data as Entity && data.logotipo) {
            return `${apiService.baseURL}${data.logotipo}`;
        }
        return photo ? `${photo}` : modalAvatar;
    }

    return (
        <div className="expanded-details-container">
            <div className="entity-photo">
                <img
                    src={getPhotoUrl(data)}
                    className="entity-photo-img"
                    style={{ borderRadius: '50%' }}
                />
            </div>
            <div className="entity-details-grid">
                {fields.map((field) => {
                    const key = field.key;
                    if (key === 'photo') return null;
                    if (key === 'logotipo') return null;
                    if (key === 'profileImage') return null;
                    if (key === 'password') return null;
                    if (key === 'confirmPassword') return null;
                    const value = data[key];
                    let displayValue = value;
                    switch (key) {
                        case 'birthday':
                            displayValue = new Date(value).toLocaleString() || '';
                            break;
                        case 'admissionDate':
                            displayValue = new Date(value).toLocaleString() || '';
                            break;
                        case 'bIissuance':
                            displayValue = new Date(value).toLocaleString() || '';
                            break;
                        case 'biValidity':
                            displayValue = new Date(value).toLocaleString() || '';
                            break;
                        case 'exitDate':
                            displayValue = new Date(value).toLocaleString() || '';
                            break;
                        case 'dateInserted':
                            displayValue = new Date(value).toLocaleString() || '';
                            break;
                        case 'dateUpdated':
                            displayValue = new Date(value).toLocaleString() || '';
                            break;
                        case 'statusEmail':
                            displayValue = value ? 'Activo' : 'Inactivo';
                            break;
                        case 'rgpdAut':
                            displayValue = value ? 'Autorizado' : 'Não Autorizado';
                            break;
                        case 'entidadeId':
                            displayValue = (data as Employee)['entidadeName'] || '';
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
                        case 'createdDate':
                            displayValue = new Date(value).toLocaleString() || '';
                            break;
                        case 'updatedDate':
                            displayValue = new Date(value).toLocaleString() || '';
                            break;
                        case 'enabled':
                            displayValue = value ? 'Activo' : 'Inactivo';
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