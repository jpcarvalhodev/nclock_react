import { employeeFields, entityFields, externalEntityFields, registerFields, zoneFields } from "../fields/Fields";
import { Employee, Entity, ExternalEntity, Register, Zone } from "../types/Types";
import '../css/Expanded.css';
import modalAvatar from '../assets/img/navbar/navbar/modalAvatar.png';
import * as apiService from "../api/apiService";

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
export const ExpandedComponentEmpZoneExtEnt = <T extends Employee | Zone | ExternalEntity | Register | Entity>({ data, fields }: ExpandedComponentProps<T>) => {
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

    // Função para formatar a data ou retornar vazio se for 01/01/1970 01:00:00
    function formatDateOrEmpty(value: any) {
        if (!value) return "";

        const dateObj = new Date(value);

        if (
            dateObj.getFullYear() === 1970 &&
            dateObj.getMonth() === 0 &&
            dateObj.getDate() === 1 &&
            dateObj.getHours() === 1 &&
            dateObj.getMinutes() === 0 &&
            dateObj.getSeconds() === 0
        ) {
            return "";
        }

        return dateObj.toLocaleString();
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
                            displayValue = formatDateOrEmpty(value);
                            break;
                        case 'admissionDate':
                            displayValue = formatDateOrEmpty(value);
                            break;
                        case 'bIissuance':
                            displayValue = formatDateOrEmpty(value);
                            break;
                        case 'biValidity':
                            displayValue = formatDateOrEmpty(value);
                            break;
                        case 'exitDate':
                            displayValue = formatDateOrEmpty(value);
                            break;
                        case 'dateInserted':
                            displayValue = formatDateOrEmpty(value);
                            break;
                        case 'dateUpdated':
                            displayValue = formatDateOrEmpty(value);
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
                        case 'accPlanoAcessoId':
                            displayValue = (data as Employee)['accPlanoAcessoName'] || '';
                            break;
                        case 'roles':
                            displayValue = value ? value.join(', ') : 'Conta sem tipo especificado';
                            break;
                        case 'createdDate':
                            displayValue = formatDateOrEmpty(value);
                            break;
                        case 'updatedDate':
                            displayValue = formatDateOrEmpty(value);
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