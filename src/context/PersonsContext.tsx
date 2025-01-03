import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import * as apiService from "../helpers/apiService";
import { Category, Department, Employee, EmployeeCard, EmployeeFP, EmployeeFace, ExternalEntity, ExternalEntityTypes, Group, Profession, Register, Zone } from '../helpers/Types';

// Define a interface para o estado de dados
interface DataState {
    [x: string]: any;
    departments: Department[];
    groups: Group[];
    employees: Employee[];
}

// Define a interface para as entidades externas
interface DataStateExternalEntities {
    externalEntity: ExternalEntity[];
    externalEntityTypes: ExternalEntityTypes[];
}

// Define o tipo de contexto
export interface PersonsContextType {
    employees: Employee[];
    disabledEmployees: Employee[];
    departments: Department[];
    setDepartments: (departments: Department[]) => void;
    groups: Group[];
    categories: Category[];
    registeredUsers: Register[];
    data: DataState;
    setData: (data: DataState) => void;
    setEmployees: (employees: Employee[]) => void;
    setDisabledEmployees: (employees: Employee[]) => void;
    fetchAllData: (entity?: string) => Promise<void>;
    fetchAllEmployees: (options?: FetchOptions) => Promise<Employee[]>;
    fetchAllDisabledEmployees: (options?: FetchOptions) => Promise<Employee[]>;
    fetchAllCardData: () => Promise<EmployeeCard[]>;
    fetchAllRegisteredUsers: () => Promise<void>;
    handleAddUsers: (user: FormData) => Promise<void>;
    handleUpdateUser: (user: FormData) => Promise<void>;
    handleDeleteUser: (id: string) => Promise<void>;
    handleAddEmployee: (employee: Employee) => Promise<void>;
    handleUpdateEmployee: (employee: Employee) => Promise<void>;
    handleDeleteEmployee: (employeeID: string[]) => Promise<void>;
    fetchEmployeeCardData: (employeeID: string) => Promise<EmployeeCard[]>;
    handleAddEmployeeCard: (employeeCard: EmployeeCard) => Promise<void>;
    handleUpdateEmployeeCard: (employeeCard: EmployeeCard) => Promise<void>;
    handleDeleteEmployeeCard: (cardId: string) => Promise<void>;
    handleImportEmployeeFP: (employeeFP: Partial<EmployeeFP>) => Promise<void>;
    handleImportEmployeeFace: (employeeFace: Partial<EmployeeFace>) => Promise<void>;
    handleImportEmployeeCard: (employeeCard: Partial<EmployeeCard>) => Promise<void>;
    fetchAllCategories: () => Promise<void>;
    handleAddCategory: (category: Category) => Promise<void>;
    handleUpdateCategory: (category: Category) => Promise<void>;
    handleDeleteCategory: (categoryID: string[]) => Promise<void>;
    fetchAllDepartments: () => Promise<Department[]>;
    fetchAllSubDepartments: (parentId: number) => Promise<Department[]>;
    handleAddDepartment: (department: Department) => Promise<void>;
    handleUpdateDepartment: (department: Department) => Promise<void>;
    handleDeleteDepartment: (departmentID: string[]) => Promise<void>;
    fetchAllGroups: () => Promise<Group[]>;
    handleAddGroup: (group: Group) => Promise<void>;
    handleUpdateGroup: (group: Group) => Promise<void>;
    handleDeleteGroup: (groupID: string[]) => Promise<void>;
    dataEE: DataStateExternalEntities;
    fetchAllExternalEntitiesData: () => Promise<void>;
    handleAddExternalEntity: (externalEntity: ExternalEntity) => Promise<void>;
    handleUpdateExternalEntity: (externalEntity: ExternalEntity) => Promise<void>;
    handleDeleteExternalEntity: (externalEntityID: string[]) => Promise<void>;
    handleAddExternalEntityTypes: (externalEntityType: ExternalEntityTypes) => Promise<void>;
    handleUpdateExternalEntityTypes: (externalEntityType: ExternalEntityTypes) => Promise<void>;
    handleDeleteExternalEntityTypes: (externalEntityTypeID: string[]) => Promise<void>;
    professions: Profession[];
    fetchAllProfessions: () => Promise<void>;
    handleAddProfession: (profession: Profession) => Promise<void>;
    handleUpdateProfession: (profession: Profession) => Promise<void>;
    handleDeleteProfessions: (professionID: string[]) => Promise<void>;
    zones: Zone[];
    fetchAllZones: () => Promise<void>;
    handleAddZone: (zone: Zone) => Promise<void>;
    handleUpdateZone: (zone: Zone) => Promise<void>;
    handleDeleteZone: (zoneID: string[]) => Promise<void>;
}

// Expandindo as opções de busca
interface FetchOptions {
    filterFunc?: (data: Employee[]) => Employee[];
    postFetch?: (data: Employee[]) => void;
}

// Cria o contexto	
export const PersonsContext = createContext<PersonsContextType | undefined>(undefined);

// Provedor do contexto
export const PersonsProvider = ({ children }: { children: ReactNode }) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [disabledEmployees, setDisabledEmployees] = useState<Employee[]>([]);
    const [employeesFP, setEmployeesFP] = useState<EmployeeFP[]>([]);
    const [employeesFace, setEmployeesFace] = useState<EmployeeFace[]>([]);
    const [employeeCards, setEmployeeCards] = useState<EmployeeCard[]>([]);
    const [registeredUsers, setRegisteredUsers] = useState<Register[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [externalEntities, setExternalEntities] = useState<ExternalEntity[]>([]);
    const [externalEntityTypes, setexternalEntityTypes] = useState<ExternalEntityTypes[]>([]);
    const [professions, setProfessions] = useState<Profession[]>([]);
    const [zones, setZones] = useState<Zone[]>([]);
    const [data, setData] = useState<DataState>({
        departments: [],
        groups: [],
        employees: []
    });
    const [dataEE, setDataEE] = useState<DataStateExternalEntities>({
        externalEntity: [],
        externalEntityTypes: [],
    });

    // Função para buscar todos os dados
    const fetchAllData = useCallback(async (entity: string = 'all') => {
        try {
            const allData = await apiService.fetchAllData();
            let newData: DataState = {
                departments: allData?.departments,
                groups: allData?.groups,
                employees: allData?.employees,
            };
            if (entity === 'employees') {
                newData.employees = allData?.employees.filter((emp: Employee) => emp.type === 'Funcionário');
            } else if (entity === 'subcontratados') {
                newData.employees = allData?.employees.filter((emp: Employee) => emp.type === 'Subcontratados');
            } else if (entity === 'users') {
                newData.employees = allData?.employees.filter((emp: Employee) => emp.type === 'Utente');
            } else if (entity === 'visitors') {
                newData.employees = allData?.employees.filter((emp: Employee) => emp.type === 'Visitante');
            } else if (entity === 'contacts') {
                newData.employees = allData?.employees.filter((emp: Employee) => emp.type === 'Contacto');
            } else if (entity === 'temporaries') {
                newData.employees = allData?.employees.filter((emp: Employee) => emp.type === 'Provisório');
            }
            setData(newData);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }, []);

    // Função para buscar todos os funcionários
    const fetchAllEmployees = useCallback(async (options?: FetchOptions): Promise<Employee[]> => {
        try {
            let data = await apiService.fetchAllEmployees();

            if (options?.filterFunc) {
                data = options.filterFunc(data);
            }
            if (options?.postFetch) {
                options.postFetch(data);
            }
            setEmployees(data);
            return data;
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            return [];
        }
    }, []);

    // Função para buscar todos os funcionários incluindo desativados
    const fetchAllDisabledEmployees = useCallback(async (options?: FetchOptions): Promise<Employee[]> => {
        try {
            let data = await apiService.fetchAllEmployeesWithDisabled();

            if (options?.filterFunc) {
                data = options.filterFunc(data);
            }
            if (options?.postFetch) {
                options.postFetch(data);
            }
            setDisabledEmployees(data);
            return data;
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            return [];
        }
    }, []);

    // Função para buscar todos os departamentos
    const fetchAllDepartments = async (): Promise<Department[]> => {
        try {
            const departments = await apiService.fetchAllDepartments();
            setDepartments(departments);
            return departments;
        } catch (error) {
            console.error('Erro ao buscar departamentos:', error);
        }
        return [];
    }

    // Busca os subdepartamentos
    const fetchAllSubDepartments = async (parentId: number): Promise<Department[]> => {
        try {
            const subdepartments: Department[] = await apiService.fetchAllSubDepartments(parentId);
            return subdepartments;
        } catch (error) {
            console.error('Erro ao buscar dados dos subdepartamentos:', error);
            return [];
        }
    };

    // Adiciona um departamento
    const handleAddDepartment = async (department: Department) => {
        try {
            const data = await apiService.addDepartment(department);
            setDepartments(deps => [...deps, data]);
            toast.success(data.value || 'Departamento adicionado com sucesso!')

        } catch (error) {
            console.error('Erro ao adicionar novo departamento:', error);
        } finally {
            fetchAllDepartments();
        }
    };

    // Atualiza um departamento
    const handleUpdateDepartment = async (department: Department) => {
        try {
            const updatedDepartment = await apiService.updateDepartment(department);
            setDepartments(deps => deps.map(dep => dep.departmentID === updatedDepartment.departmentID ? updatedDepartment : dep));
            toast.success(updatedDepartment.value || 'Departamento atualizado com sucesso!');

        } catch (error) {
            console.error('Erro ao atualizar departamento:', error);
        } finally {
            fetchAllDepartments();
        }
    };

    // Apaga um departamento
    const handleDeleteDepartment = async (departmentID: string[]) => {
        try {
            const deleteDept = await apiService.deleteDepartment(departmentID);
            toast.success(deleteDept.value || 'Departamento apagado com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar departamento:', error);
        } finally {
            fetchAllDepartments();
        }
    };

    // Função para buscar todos os grupos
    const fetchAllGroups = async (): Promise<Group[]> => {
        try {
            const groups = await apiService.fetchAllGroups();
            setGroups(groups);
            return groups;
        } catch (error) {
            console.error('Erro ao buscar grupos:', error);
        }
        return [];
    }

    // Função para adicionar um grupo
    const handleAddGroup = async (group: Group) => {
        try {
            const data = await apiService.addGroup(group);
            setGroups([...groups, data]);
            toast.success(data.value || 'Grupo adicionado com sucesso!');

        } catch (error) {
            console.error('Erro ao adicionar novo grupo:', error);
        } finally {
            fetchAllGroups();
        }
    };

    // Função para atualizar um grupo
    const handleUpdateGroup = async (group: Group) => {
        try {
            const updatedGroup = await apiService.updateGroup(group);
            setGroups(groups => groups.map(g => g.groupID === updatedGroup.groupID ? updatedGroup : g));
            toast.success(updatedGroup.value || 'Grupo atualizado com sucesso!');

        } catch (error) {
            console.error('Erro ao atualizar grupo:', error);
        } finally {
            fetchAllGroups();
        }
    };

    // Função para apagar um grupo
    const handleDeleteGroup = async (groupID: string[]) => {
        try {
            const deleteGroup = await apiService.deleteGroup(groupID);
            toast.success(deleteGroup.value || 'Grupo apagado com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar grupo:', error);
        } finally {
            fetchAllGroups();
        }
    };

    // Função para buscar todos os utilizadores registados
    const fetchAllRegisteredUsers = async () => {
        try {
            const data = await apiService.fetchAllRegisteredUsers();
            setRegisteredUsers(data);
        } catch (error) {
            console.error('Erro ao buscar utilizadores registados:', error);
        }
    }

    // Função para adicionar usuários registados
    const handleAddUsers = async (user: FormData) => {
        try {
            const data = await apiService.addNewRegisteredUser(user);
            setRegisteredUsers([...registeredUsers, data]);
            toast.success(data.value || 'Utilizador adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar o utilizador registado:', error);
        } finally {
            fetchAllRegisteredUsers();
        }
    }

    // Função para atualizar usuários registados
    const handleUpdateUser = async (user: FormData) => {
        try {
            const data = await apiService.updateRegisteredUser(user);
            const updatedUsers = registeredUsers.map(u => u.id === data.id ? data : u);
            setRegisteredUsers(updatedUsers);
            toast.success(data.value || 'Utilizador atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar o utilizador registado:', error);
        } finally {
            fetchAllRegisteredUsers();
        }
    }

    // Função para eliminar usuários registados
    const handleDeleteUser = async (id: string) => {
        try {
            const data = await apiService.deleteRegisteredUser(id);
            toast.success(data.message || 'Utilizador eliminado com sucesso!');
        } catch (error) {
            console.error('Erro ao eliminar o utilizador registado:', error);
        } finally {
            fetchAllRegisteredUsers();
        }
    }

    // Define a função de adição de funcionários
    const handleAddEmployee = async (employee: Employee) => {
        try {
            const employeesData = await apiService.addEmployee(employee);
            setEmployees([...employees, employeesData]);
            toast.success(employeesData.message || 'Funcionário adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar novo funcionário:', error);
        } finally {
            fetchAllData();
            fetchAllEmployees();
        }
    };

    // Define a função de atualização de funcionários
    const handleUpdateEmployee = async (employee: Employee) => {
        try {
            const updatedEmployee = await apiService.updateEmployee(employee);
            setEmployees(prevEmployees => prevEmployees.map(emp => emp.employeeID === updatedEmployee.employeeID ? updatedEmployee : emp));
            toast.success(updatedEmployee.message || 'Funcionário atualizado com sucesso');
        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
        } finally {
            fetchAllData();
            fetchAllEmployees();
        }
    };

    // Define a função de apagar funcionários
    const handleDeleteEmployee = async (employeeID: string[]) => {
        try {
            const deleteEmployee = await apiService.deleteEmployee(employeeID);
            toast.success(deleteEmployee.message || 'Funcionário apagado com sucesso!')
        } catch (error) {
            console.error('Erro ao apagar funcionário:', error);
        } finally {
            fetchAllData();
            fetchAllEmployees();
        }
    };

    // Função para buscar as categorias
    const fetchAllCategories = async () => {
        try {
            const data = await apiService.fetchAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Erro ao buscar os dados das categorias:', error);
        }
    };

    // Função para adicionar uma categoria
    const handleAddCategory = async (category: Category) => {
        try {
            const data = await apiService.addCategory(category);
            setCategories([...categories, data]);
            toast.success(data.value || 'Categoria adicionada com sucesso!');

        } catch (error) {
            console.error('Erro ao adicionar nova categoria:', error);
        } finally {
            fetchAllCategories();
        }
    };

    // Função para atualizar uma categoria
    const handleUpdateCategory = async (category: Category) => {
        try {
            const updatedCategory = await apiService.updateCategory(category);
            setCategories(categories => categories.map(c => c.categoryID === updatedCategory.categoryID ? updatedCategory : c));
            toast.success(updatedCategory.value || 'Categoria atualizada com sucesso!');

        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
        } finally {
            fetchAllCategories();
        }
    };

    // Função para apagar uma categoria
    const handleDeleteCategory = async (categoryID: string[]) => {
        try {
            const deleteCategory = await apiService.deleteCategory(categoryID);
            toast.success(deleteCategory.value || 'Categoria apagada com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar categoria:', error);
        } finally {
            fetchAllCategories();
        }
    };

    // Busca as entidades externas e os tipos de entidades externas
    const fetchAllExternalEntitiesData = async () => {
        try {
            const { ExternalEntities, ExternalEntityTypes } = await apiService.fetchAllExternalEntitiesData() as { ExternalEntities: ExternalEntity[]; ExternalEntityTypes: ExternalEntityTypes[]; };
            setDataEE({
                externalEntity: ExternalEntities,
                externalEntityTypes: ExternalEntityTypes,
            });
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    // Função para adicionar uma nova entidade externa
    const handleAddExternalEntity = async (externalEntity: ExternalEntity) => {
        try {
            const data = await apiService.addExternalEntity(externalEntity);
            setExternalEntities([...externalEntities, data]);
            toast.success(data.value || 'Entidade externa adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar nova entidade externa:', error);
        }
        fetchAllExternalEntitiesData();
    };

    // Função para atualizar uma entidade externa
    const handleUpdateExternalEntity = async (externalEntity: ExternalEntity) => {
        try {
            const updatedExternalEntity = await apiService.updateExternalEntity(externalEntity);
            setExternalEntities(externalEntities => externalEntities.map(entity => entity.externalEntityID === updatedExternalEntity.externalEntityID ? updatedExternalEntity : entity));
            toast.success(updatedExternalEntity.value || 'Entidade Externa atualizada com sucesso');
        } catch (error) {
            console.error('Erro ao atualizar entidade externa:', error);
        } finally {
            fetchAllExternalEntitiesData();
        }
    };

    // Função para apagar uma entidade externa
    const handleDeleteExternalEntity = async (externalEntityID: string[]) => {
        try {
            const deleteExtEnt = await apiService.deleteExternalEntity(externalEntityID);
            toast.success(deleteExtEnt.value || 'Entidade externa apagada com sucesso!');
        } catch (error) {
            console.error('Erro ao apagar entidade externa:', error);
        } finally {
            fetchAllExternalEntitiesData();
        }
    };

    // Função para adicionar um tipo de uma entidade externa
    const handleAddExternalEntityTypes = async (externalEntityType: ExternalEntityTypes) => {
        try {
            const data = await apiService.addExternalEntityTypes(externalEntityType);
            setexternalEntityTypes([...externalEntityTypes, data]);
            toast.success(data.value || 'Tipo de entidade externa adicionada com sucesso!');

        } catch (error) {
            console.error('Erro ao adicionar nova entidade externa:', error);
        } finally {
            fetchAllExternalEntitiesData();
        }
    };

    // Função para atualizar um tipo de uma entidade externa
    const handleUpdateExternalEntityTypes = async (externalEntityType: ExternalEntityTypes) => {
        try {
            const updatedExternalEntityType = await apiService.updateExternalEntityTypes(externalEntityType);
            setexternalEntityTypes(externalEntitiesType => externalEntitiesType.map(entity => entity.externalEntityTypeID === updatedExternalEntityType.externalEntityTypeID ? updatedExternalEntityType : entity));
            toast.success(updatedExternalEntityType.value || 'Tipo de entidade externa atualizado com sucesso!');

        } catch (error) {
            console.error('Erro ao atualizar entidade externa:', error);
        } finally {
            fetchAllExternalEntitiesData();
        }
    };

    // Função para apagar um tipo de uma entidade externa
    const handleDeleteExternalEntityTypes = async (externalEntityTypeID: string[]) => {
        try {
            const deleteExtEntType = await apiService.deleteExternalEntityTypes(externalEntityTypeID);
            toast.success(deleteExtEntType.value || 'Tipo de entidade externa apagada com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar entidade externa:', error);
        } finally {
            fetchAllExternalEntitiesData();
        }
    };

    // Função para buscar as profissões
    const fetchAllProfessions = async () => {
        try {
            const data = await apiService.fetchAllProfessions();
            setProfessions(data);
        } catch (error) {
            console.error('Erro ao buscar os dados das profissões:', error);
        }
    };

    // Função para adicionar uma nova profissão
    const handleAddProfession = async (profession: Profession) => {
        try {
            const data = await apiService.addProfession(profession);
            setProfessions([...professions, data]);
            toast.success(data.value || 'Profissão adicionada com sucesso!');

        } catch (error) {
            console.error('Erro ao adicionar nova profissão:', error);
        } finally {
            fetchAllProfessions();
        }
    };

    // Função para atualizar uma profissão
    const handleUpdateProfession = async (profession: Profession) => {
        try {
            const updatedProfession = await apiService.updateProfession(profession);
            setProfessions(professions => professions.map(p => p.professionID === updatedProfession.professionID ? updatedProfession : p));
            toast.success(updatedProfession.value || 'Profissão atualizada com sucesso!');

        } catch (error) {
            console.error('Erro ao atualizar a profissão:', error);
        } finally {
            fetchAllProfessions();
        }
    };

    // Função para apagar uma profissão
    const handleDeleteProfessions = async (professionID: string[]) => {
        try {
            const deleteProfession = await apiService.deleteProfession(professionID);
            toast.success(deleteProfession.value || 'Profissão apagada com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar a profissão:', error);
        } finally {
            fetchAllProfessions();
        }
    };

    // Função para buscar as zonas
    const fetchAllZones = async () => {
        try {
            const data = await apiService.fetchAllZones();
            setZones(data);
        } catch (error) {
            console.error('Erro ao buscar os dados das zonas:', error);
        }
    };

    // Função para adicionar uma zona
    const handleAddZone = async (zone: Zone) => {
        try {
            const data = await apiService.addZone(zone);
            setZones([...zones, data]);
            toast.success(data.value || 'Zona adicionada com sucesso!');

        } catch (error) {
            console.error('Erro ao adicionar nova zona:', error);
        } finally {
            fetchAllZones();
        }
    };

    // Função para atualizar uma zona
    const handleUpdateZone = async (zone: Zone) => {
        try {
            const updatedZone = await apiService.updateZone(zone);
            setZones(zones => zones.map(z => z.zoneID === updatedZone.zoneID ? updatedZone : z));
            toast.success(updatedZone.value || 'Zona atualizada com sucesso!');

        } catch (error) {
            console.error('Erro ao atualizar zona:', error);
        } finally {
            fetchAllZones();
        }
    };

    // Função para apagar uma zona
    const handleDeleteZone = async (zoneID: string[]) => {
        try {
            const deleteZone = await apiService.deleteZone(zoneID);
            toast.success(deleteZone.value || 'Zona apagada com sucesso!');

        } catch (error) {
            console.error('Erro ao apagar zona:', error);
        } finally {
            fetchAllZones();
        }
    };

    // Define a função para buscar todos os cartões de funcionários
    const fetchAllCardData = async () => {
        try {
            const allCardData = await apiService.fetchAllEmployeeCards();
            return allCardData;
        } catch (error) {
            console.error('Erro ao buscar cartões de funcionários:', error);
            return [];
        }
    };

    // Define a função para buscar cartões de funcionários
    const fetchEmployeeCardData = async (employeeID: string): Promise<EmployeeCard[]> => {
        try {
            const employeeCardsData = await apiService.fetchEmployeeCardDataByEmployeeID(employeeID);
            setEmployeeCards(employeeCardsData);
            return employeeCardsData;
        } catch (error) {
            console.error('Erro ao buscar cartões de funcionários:', error);
            return [];
        }
    };

    // Define a função de adição de cartões de funcionários
    const handleAddEmployeeCard = async (employeeCard: EmployeeCard) => {
        try {
            const employeesData = await apiService.addEmployeeCard(employeeCard);
            setEmployeeCards([...employeeCards, employeesData]);
            if (employeesData.length > 0) {
                toast.success(employeesData.message || 'Cartão adicionado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao adicionar novo cartão:', error);
        } finally {
            fetchAllCardData();
        }
    };

    // Define a função de atualização de cartões de funcionários
    const handleUpdateEmployeeCard = async (employeeCard: EmployeeCard) => {
        try {
            const updatedEmployeeCard = await apiService.updateEmployeeCard(employeeCard);
            setEmployeeCards(prevEmployeeCards => prevEmployeeCards.map(emp => emp.cardId === updatedEmployeeCard.cardId ? updatedEmployeeCard : emp));
            if (updatedEmployeeCard.length > 0) {
                toast.success(updatedEmployeeCard.message || 'Cartão adicionado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao atualizar cartão:', error);
        } finally {
            fetchAllCardData();
        }
    };

    // Define a função de apagar cartões de funcionários
    const handleDeleteEmployeeCard = async (cardId: string) => {
        try {
            const deleteEmployeeCard = await apiService.deleteEmployeeCard(cardId);
            toast.success(deleteEmployeeCard.message || 'Cartão apagado com sucesso!')
        } catch (error) {
            console.error('Erro ao apagar cartão:', error);
        } finally {
            fetchAllCardData();
        }
    }

    // Define a função de importação de biometria digital
    const handleImportEmployeeFP = async (employeeFP: Partial<EmployeeFP>) => {
        try {
            const employeesData = await apiService.employeeImportFP(employeeFP);
            setEmployeesFP([...employeesFP, employeesData]);
            toast.success(employeesData.value || 'Biometria digital adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar nova biometria digital:', error);
        }
    }

    // Define a função de importação de biometria facial
    const handleImportEmployeeFace = async (employeeFace: Partial<EmployeeFace>) => {
        try {
            const employeesData = await apiService.employeeImportFace(employeeFace);
            setEmployeesFace([...employeesFace, employeesData]);
            toast.success(employeesData.value || 'Biometria facial adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar nova biometria facial:', error);
        }
    }

    // Define a função de importação de cartão
    const handleImportEmployeeCard = async (employeeCard: Partial<EmployeeCard>) => {
        try {
            const employeesData = await apiService.employeeImportCard(employeeCard);
            setEmployeeCards([...employeeCards, employeesData]);
            toast.success(employeesData.value || 'Cartão adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar novo cartão:', error);
        }
    }

    // Executa a função de busca de dados inicial
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchAllData();
            fetchAllEmployees();
            fetchAllCardData();
            fetchAllRegisteredUsers();
            fetchAllDepartments();
            fetchAllGroups();
            fetchAllCategories();
            fetchAllExternalEntitiesData();
            fetchAllProfessions();
            fetchAllZones();
        }
    }, []);

    // Define o valor do contexto
    const contextValue: PersonsContextType = {
        employees,
        disabledEmployees,
        departments,
        setDepartments,
        groups,
        categories,
        registeredUsers,
        data,
        setData,
        setEmployees,
        setDisabledEmployees,
        fetchAllData,
        fetchAllEmployees,
        fetchAllDisabledEmployees,
        fetchAllCardData,
        fetchAllRegisteredUsers,
        handleAddUsers,
        handleUpdateUser,
        handleDeleteUser,
        handleAddEmployee,
        handleUpdateEmployee,
        handleDeleteEmployee,
        fetchEmployeeCardData,
        handleAddEmployeeCard,
        handleUpdateEmployeeCard,
        handleDeleteEmployeeCard,
        handleImportEmployeeFP,
        handleImportEmployeeFace,
        handleImportEmployeeCard,
        fetchAllCategories,
        handleAddCategory,
        handleUpdateCategory,
        handleDeleteCategory,
        fetchAllDepartments,
        fetchAllSubDepartments,
        handleAddDepartment,
        handleUpdateDepartment,
        handleDeleteDepartment,
        fetchAllGroups,
        handleAddGroup,
        handleUpdateGroup,
        handleDeleteGroup,
        dataEE,
        fetchAllExternalEntitiesData,
        handleAddExternalEntity,
        handleUpdateExternalEntity,
        handleDeleteExternalEntity,
        handleAddExternalEntityTypes,
        handleUpdateExternalEntityTypes,
        handleDeleteExternalEntityTypes,
        professions,
        fetchAllProfessions,
        handleAddProfession,
        handleUpdateProfession,
        handleDeleteProfessions,
        zones,
        fetchAllZones,
        handleAddZone,
        handleUpdateZone,
        handleDeleteZone,
    };

    return (
        <PersonsContext.Provider value={contextValue}>
            {children}
        </PersonsContext.Provider>
    );
};

// Hook personalizado para uso fácil do contexto
export const usePersons = () => {
    const context = useContext(PersonsContext);
    if (context === undefined) {
        throw new Error('usePersons must be used within a PersonsProvider');
    }
    return context;
}
