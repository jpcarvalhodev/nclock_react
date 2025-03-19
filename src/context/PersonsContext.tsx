import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

import * as apiService from "../api/apiService";
import {
  Category,
  Department,
  Employee,
  EmployeeCard,
  EmployeeFP,
  EmployeeFace,
  EmployeeVisitor,
  EmployeeVisitorMotive,
  ExternalEntity,
  ExternalEntityTypes,
  Group,
  Profession,
  Register,
  Zone,
} from "../types/Types";

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
  employeesNoPagination: Employee[];
  disabledEmployees: Employee[];
  disabledEmployeesNoPagination: Employee[];
  departments: Department[];
  setDepartments: (departments: Department[]) => void;
  groups: Group[];
  categories: Category[];
  registeredUsers: Register[];
  data: DataState;
  setData: (data: DataState) => void;
  setEmployees: (employees: Employee[]) => void;
  setEmployeesNoPagination: (employees: Employee[]) => void;
  setDisabledEmployees: (employees: Employee[]) => void;
  setDisabledEmployeesNoPagination: (employees: Employee[]) => void;
  fetchAllData: (entity?: string) => Promise<void>;
  fetchAllEmployees: (
    pageNo?: string,
    pageSize?: string
  ) => Promise<Employee[]>;
  fetchAllEmployeesNoPagination: (
  ) => Promise<Employee[]>;
  fetchAllDisabledEmployees: (
    pageNo?: string,
    pageSize?: string,
    type?: string
  ) => Promise<Employee[]>;
  fetchAllDisabledEmployeesNoPagination: () => Promise<Employee[]>;
  fetchEmployeesById: (employeeID: string[]) => Promise<Employee[]>;
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
  handleImportEmployeeFP: (employeeFP: Partial<EmployeeFP>[]) => Promise<void>;
  handleImportEmployeeFace: (
    employeeFace: Partial<EmployeeFace>[]
  ) => Promise<void>;
  handleImportEmployeeCard: (
    employeeCard: Partial<EmployeeCard>[]
  ) => Promise<void>;
  fetchAllCategories: () => Promise<Category[]>;
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
  fetchAllExternalEntitiesData: () => Promise<{
    ExternalEntities: ExternalEntity[];
    ExternalEntityTypes: ExternalEntityTypes[];
  }>;
  handleAddExternalEntity: (externalEntity: ExternalEntity) => Promise<void>;
  handleUpdateExternalEntity: (externalEntity: ExternalEntity) => Promise<void>;
  handleDeleteExternalEntity: (externalEntityID: string[]) => Promise<void>;
  handleAddExternalEntityTypes: (
    externalEntityType: ExternalEntityTypes
  ) => Promise<void>;
  handleUpdateExternalEntityTypes: (
    externalEntityType: ExternalEntityTypes
  ) => Promise<void>;
  handleDeleteExternalEntityTypes: (
    externalEntityTypeID: string[]
  ) => Promise<void>;
  professions: Profession[];
  fetchAllProfessions: () => Promise<Profession[]>;
  handleAddProfession: (profession: Profession) => Promise<void>;
  handleUpdateProfession: (profession: Profession) => Promise<void>;
  handleDeleteProfessions: (professionID: string[]) => Promise<void>;
  zones: Zone[];
  fetchAllZones: () => Promise<Zone[]>;
  handleAddZone: (zone: Zone) => Promise<void>;
  handleUpdateZone: (zone: Zone) => Promise<void>;
  handleDeleteZone: (zoneID: string[]) => Promise<void>;
  totalEmployeePages: number;
  totalEmployeeRecords: number;
  totalVisitorPages: number;
  totalVisitorRecords: number;
  employeeVisitor: EmployeeVisitor[];
  setEmployeeVisitor: (employeeVisitor: EmployeeVisitor[]) => void;
  fetchEmployeeVisitor: (
    startDate?: string,
    endDate?: string,
    pageNo?: "1",
    perPage?: "20",
    employeeIds?: string[]
  ) => Promise<EmployeeVisitor[]>;
  handleAddEmployeeVisitor: (
    employeeVisitor: Partial<EmployeeVisitor>
  ) => Promise<void>;
  handleUpdateEmployeeVisitor: (
    employeeVisitor: Partial<EmployeeVisitor>
  ) => Promise<void>;
  handleDeleteEmployeeVisitor: (employeeVisitorID: string[]) => Promise<void>;
  employeeVisitorMotive: EmployeeVisitorMotive[];
  fetchVisitorsMotive: () => Promise<EmployeeVisitorMotive[]>;
  handleAddVisitorMotive: (
    employeeVisitorMotive: Partial<EmployeeVisitorMotive>
  ) => Promise<void>;
  handleUpdateVisitorMotive: (
    employeeVisitorMotive: Partial<EmployeeVisitorMotive>
  ) => Promise<void>;
  handleDeleteVisitorMotive: (
    employeeVisitorMotiveID: string[]
  ) => Promise<void>;
}

// Expandindo as opções de busca
interface FetchOptions {
  filterFunc?: (data: Employee[]) => Employee[];
  postFetch?: (data: Employee[]) => void;
}

// Cria o contexto
export const PersonsContext = createContext<PersonsContextType | undefined>(
  undefined
);

// Provedor do contexto
export const PersonsProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeesNoPagination, setEmployeesNoPagination] = useState<
    Employee[]
  >([]);
  const [disabledEmployees, setDisabledEmployees] = useState<Employee[]>([]);
  const [disabledEmployeesNoPagination, setDisabledEmployeesNoPagination] =
    useState<Employee[]>([]);
  const [employeeVisitor, setEmployeeVisitor] = useState<EmployeeVisitor[]>([]);
  const [employeeVisitorMotive, setEmployeeVisitorMotive] = useState<
    EmployeeVisitorMotive[]
  >([]);
  const [employeesFP, setEmployeesFP] = useState<EmployeeFP[]>([]);
  const [employeesFace, setEmployeesFace] = useState<EmployeeFace[]>([]);
  const [employeeCards, setEmployeeCards] = useState<EmployeeCard[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<Register[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [externalEntities, setExternalEntities] = useState<ExternalEntity[]>(
    []
  );
  const [externalEntityTypes, setexternalEntityTypes] = useState<
    ExternalEntityTypes[]
  >([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [totalEmployeePages, setTotalEmployeePages] = useState(1);
  const [totalEmployeeRecords, setTotalEmployeeRecords] = useState(0);
  const [totalVisitorPages, setTotalVisitorPages] = useState(1);
  const [totalVisitorRecords, setTotalVisitorRecords] = useState(0);
  const [data, setData] = useState<DataState>({
    departments: [],
    groups: [],
    employees: [],
  });
  const [dataEE, setDataEE] = useState<DataStateExternalEntities>({
    externalEntity: [],
    externalEntityTypes: [],
  });

  // Função para buscar todos os dados
  const fetchAllData = useCallback(async (entity = "all") => {
    try {
      const allData = await apiService.fetchAllData();
      let newData: DataState = {
        departments: allData?.departments,
        groups: allData?.groups,
        employees: allData?.employees.sort(
          (a: { enrollNumber: number }, b: { enrollNumber: number }) =>
            a.enrollNumber - b.enrollNumber
        ),
      };
      if (entity === "employees") {
        newData.employees = allData?.employees.filter(
          (emp: Employee) => emp.type === "Funcionário"
        );
      } else if (entity === "subcontratados") {
        newData.employees = allData?.employees.filter(
          (emp: Employee) => emp.type === "Subcontratados"
        );
      } else if (entity === "users") {
        newData.employees = allData?.employees.filter(
          (emp: Employee) => emp.type === "Utente"
        );
      } else if (entity === "visitors") {
        newData.employees = allData?.employees.filter(
          (emp: Employee) => emp.type === "Visitante"
        );
      } else if (entity === "contacts") {
        newData.employees = allData?.employees.filter(
          (emp: Employee) => emp.type === "Contacto"
        );
      } else if (entity === "temporaries") {
        newData.employees = allData?.employees.filter(
          (emp: Employee) => emp.type === "Provisório"
        );
      }
      setData(newData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }, []);

  // Função para buscar todos os funcionários sem paginação
  const fetchAllEmployeesNoPagination = async (): Promise<Employee[]> => {
    try {
      let data = await apiService.fetchAllEmployeesNoPagination();

      const sortedData = data.sort(
        (a: { enrollNumber: number }, b: { enrollNumber: number }) =>
          a.enrollNumber - b.enrollNumber
      );
      setEmployeesNoPagination(sortedData);
      return sortedData;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
    return [];
  };

  // Função para buscar todos os funcionários com paginação
  const fetchAllEmployees = async (
    pageNo?: string,
    pageSize?: string
  ): Promise<Employee[]> => {
    try {
      let data = await apiService.fetchAllEmployees(pageNo, pageSize);
      const sortedData = data.data.sort(
        (a: { enrollNumber: number }, b: { enrollNumber: number }) =>
          a.enrollNumber - b.enrollNumber
      );
      setEmployees(sortedData);
      return sortedData;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
    return [];
  };

  // Função para buscar todos os funcionários incluindo desativados sem paginação
  const fetchAllDisabledEmployeesNoPagination = async (): Promise<
    Employee[]
  > => {
    try {
      let data = await apiService.fetchAllEmployeesWithDisabledNoPagination();
      const sortedData = data.sort(
        (a: { enrollNumber: number }, b: { enrollNumber: number }) =>
          a.enrollNumber - b.enrollNumber
      );
      setDisabledEmployeesNoPagination(sortedData);
      return sortedData;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
    return [];
  };

  // Função para buscar todos os funcionários incluindo desativados com paginação
  const fetchAllDisabledEmployees = async (
    pageNo?: string,
    pageSize?: string,
    type?: string
  ): Promise<Employee[]> => {
    try {
      let data = await apiService.fetchAllEmployeesWithDisabled(
        pageNo,
        pageSize,
        type
      );
      const sortedData = data.data.sort(
        (a: { enrollNumber: number }, b: { enrollNumber: number }) =>
          a.enrollNumber - b.enrollNumber
      );
      setDisabledEmployees(sortedData);
      setTotalEmployeePages(data.totalPages);
      setTotalEmployeeRecords(data.totalRecords);
      return sortedData;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
    return [];
  };

  // Função para buscar funcionários por ID
  const fetchEmployeesById = async (
    employeeID: string[]
  ): Promise<Employee[]> => {
    try {
      const data = await apiService.fetchEmployeesById(employeeID);
      return data;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
    return [];
  };

  // Função para buscar todos os departamentos
  const fetchAllDepartments = async (): Promise<Department[]> => {
    try {
      const departments = await apiService.fetchAllDepartments();
      const sortedDepartments = departments.sort(
        (a: { code: number }, b: { code: number }) => a.code - b.code
      );
      setDepartments(sortedDepartments);
      return sortedDepartments;
    } catch (error) {
      console.error("Erro ao buscar departamentos:", error);
    }
    return [];
  };

  // Busca os subdepartamentos
  const fetchAllSubDepartments = async (
    parentId: number
  ): Promise<Department[]> => {
    try {
      const subdepartments: Department[] =
        await apiService.fetchAllSubDepartments(parentId);
      return subdepartments;
    } catch (error) {
      console.error("Erro ao buscar dados dos subdepartamentos:", error);
      return [];
    }
  };

  // Adiciona um departamento
  const handleAddDepartment = async (department: Department) => {
    try {
      const data = await apiService.addDepartment(department);
      setDepartments((deps) => [...deps, data]);
      toast.success(data.value || "Departamento adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar novo departamento:", error);
    } finally {
      fetchAllDepartments();
    }
  };

  // Atualiza um departamento
  const handleUpdateDepartment = async (department: Department) => {
    try {
      const updatedDepartment = await apiService.updateDepartment(department);
      setDepartments((deps) =>
        deps.map((dep) =>
          dep.departmentID === updatedDepartment.departmentID
            ? updatedDepartment
            : dep
        )
      );
      toast.success(
        updatedDepartment.value || "Departamento atualizado com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao atualizar departamento:", error);
    } finally {
      fetchAllDepartments();
    }
  };

  // Apaga um departamento
  const handleDeleteDepartment = async (departmentID: string[]) => {
    try {
      const deleteDept = await apiService.deleteDepartment(departmentID);
      toast.success(deleteDept.value || "Departamento apagado com sucesso!");
    } catch (error) {
      console.error("Erro ao apagar departamento:", error);
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
      console.error("Erro ao buscar grupos:", error);
    }
    return [];
  };

  // Função para adicionar um grupo
  const handleAddGroup = async (group: Group) => {
    try {
      const data = await apiService.addGroup(group);
      setGroups([...groups, data]);
      toast.success(data.value || "Grupo adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar novo grupo:", error);
    } finally {
      fetchAllGroups();
    }
  };

  // Função para atualizar um grupo
  const handleUpdateGroup = async (group: Group) => {
    try {
      const updatedGroup = await apiService.updateGroup(group);
      setGroups((groups) =>
        groups.map((g) =>
          g.groupID === updatedGroup.groupID ? updatedGroup : g
        )
      );
      toast.success(updatedGroup.value || "Grupo atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar grupo:", error);
    } finally {
      fetchAllGroups();
    }
  };

  // Função para apagar um grupo
  const handleDeleteGroup = async (groupID: string[]) => {
    try {
      const deleteGroup = await apiService.deleteGroup(groupID);
      toast.success(deleteGroup.value || "Grupo apagado com sucesso!");
    } catch (error) {
      console.error("Erro ao apagar grupo:", error);
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
      console.error("Erro ao buscar utilizadores registados:", error);
    }
  };

  // Função para adicionar usuários registados
  const handleAddUsers = async (user: FormData) => {
    try {
      const data = await apiService.addNewRegisteredUser(user);
      setRegisteredUsers([...registeredUsers, data]);
      toast.success(data.value || "Utilizador adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar o utilizador registado:", error);
    } finally {
      fetchAllRegisteredUsers();
    }
  };

  // Função para atualizar usuários registados
  const handleUpdateUser = async (user: FormData) => {
    try {
      const data = await apiService.updateRegisteredUser(user);
      const updatedUsers = registeredUsers.map((u) =>
        u.id === data.id ? data : u
      );
      setRegisteredUsers(updatedUsers);
      toast.success(data.value || "Utilizador atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o utilizador registado:", error);
    } finally {
      fetchAllRegisteredUsers();
    }
  };

  // Função para eliminar usuários registados
  const handleDeleteUser = async (id: string) => {
    try {
      const data = await apiService.deleteRegisteredUser(id);
      toast.success(data.message || "Utilizador eliminado com sucesso!");
    } catch (error) {
      console.error("Erro ao eliminar o utilizador registado:", error);
    } finally {
      fetchAllRegisteredUsers();
    }
  };

  // Define a função de adição de funcionários
  const handleAddEmployee = async (employee: Employee) => {
    try {
      const employeesData = await apiService.addEmployee(employee);
      setEmployees([...employees, employeesData]);
      toast.success(
        employeesData.message || "Funcionário adicionado com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao adicionar novo funcionário:", error);
    } finally {
      fetchAllData();
      fetchAllEmployeesNoPagination();
    }
  };

  // Define a função de atualização de funcionários
  const handleUpdateEmployee = async (employee: Employee) => {
    try {
      const updatedEmployee = await apiService.updateEmployee(employee);
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.employeeID === updatedEmployee.employeeID ? updatedEmployee : emp
        )
      );
      toast.success(
        updatedEmployee.message || "Funcionário atualizado com sucesso"
      );
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
    } finally {
      fetchAllData();
      fetchAllEmployeesNoPagination();
    }
  };

  // Define a função de apagar funcionários
  const handleDeleteEmployee = async (employeeID: string[]) => {
    try {
      const deleteEmployee = await apiService.deleteEmployee(employeeID);
      toast.success(
        deleteEmployee.message || "Funcionário apagado com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao apagar funcionário:", error);
    } finally {
      fetchAllData();
      fetchAllEmployeesNoPagination();
    }
  };

  // Função para buscar as categorias
  const fetchAllCategories = async (): Promise<Category[]> => {
    try {
      const data = await apiService.fetchAllCategories();
      const sortedData = data.sort(
        (a: { code: number }, b: { code: number }) => a.code - b.code
      );
      setCategories(sortedData);
      return sortedData;
    } catch (error) {
      console.error("Erro ao buscar os dados das categorias:", error);
    }
    return [];
  };

  // Função para adicionar uma categoria
  const handleAddCategory = async (category: Category) => {
    try {
      const data = await apiService.addCategory(category);
      setCategories([...categories, data]);
      toast.success(data.value || "Categoria adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar nova categoria:", error);
    } finally {
      fetchAllCategories();
    }
  };

  // Função para atualizar uma categoria
  const handleUpdateCategory = async (category: Category) => {
    try {
      const updatedCategory = await apiService.updateCategory(category);
      setCategories((categories) =>
        categories.map((c) =>
          c.categoryID === updatedCategory.categoryID ? updatedCategory : c
        )
      );
      toast.success(
        updatedCategory.value || "Categoria atualizada com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
    } finally {
      fetchAllCategories();
    }
  };

  // Função para apagar uma categoria
  const handleDeleteCategory = async (categoryID: string[]) => {
    try {
      const deleteCategory = await apiService.deleteCategory(categoryID);
      toast.success(deleteCategory.value || "Categoria apagada com sucesso!");
    } catch (error) {
      console.error("Erro ao apagar categoria:", error);
    } finally {
      fetchAllCategories();
    }
  };

  // Busca as entidades externas e os tipos de entidades externas
  const fetchAllExternalEntitiesData = async (): Promise<{
    ExternalEntities: ExternalEntity[];
    ExternalEntityTypes: ExternalEntityTypes[];
  }> => {
    try {
      const { ExternalEntities, ExternalEntityTypes } =
        (await apiService.fetchAllExternalEntitiesData()) as {
          ExternalEntities: ExternalEntity[];
          ExternalEntityTypes: ExternalEntityTypes[];
        };
      const sortedData = ExternalEntityTypes.sort(
        (a: { order: number }, b: { order: number }) => a.order - b.order
      );
      setDataEE({
        externalEntity: ExternalEntities,
        externalEntityTypes: sortedData,
      });
      return { ExternalEntities, ExternalEntityTypes };
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
    return { ExternalEntities: [], ExternalEntityTypes: [] };
  };

  // Função para adicionar uma nova entidade externa
  const handleAddExternalEntity = async (externalEntity: ExternalEntity) => {
    try {
      const data = await apiService.addExternalEntity(externalEntity);
      setExternalEntities([...externalEntities, data]);
      toast.success(data.value || "Entidade externa adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar nova entidade externa:", error);
    }
    fetchAllExternalEntitiesData();
  };

  // Função para atualizar uma entidade externa
  const handleUpdateExternalEntity = async (externalEntity: ExternalEntity) => {
    try {
      const updatedExternalEntity = await apiService.updateExternalEntity(
        externalEntity
      );
      setExternalEntities((externalEntities) =>
        externalEntities.map((entity) =>
          entity.externalEntityID === updatedExternalEntity.externalEntityID
            ? updatedExternalEntity
            : entity
        )
      );
      toast.success(
        updatedExternalEntity.value || "Entidade Externa atualizada com sucesso"
      );
    } catch (error) {
      console.error("Erro ao atualizar entidade externa:", error);
    } finally {
      fetchAllExternalEntitiesData();
    }
  };

  // Função para apagar uma entidade externa
  const handleDeleteExternalEntity = async (externalEntityID: string[]) => {
    try {
      const deleteExtEnt = await apiService.deleteExternalEntity(
        externalEntityID
      );
      toast.success(
        deleteExtEnt.value || "Entidade externa apagada com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao apagar entidade externa:", error);
    } finally {
      fetchAllExternalEntitiesData();
    }
  };

  // Função para adicionar um tipo de uma entidade externa
  const handleAddExternalEntityTypes = async (
    externalEntityType: ExternalEntityTypes
  ) => {
    try {
      const data = await apiService.addExternalEntityTypes(externalEntityType);
      setexternalEntityTypes([...externalEntityTypes, data]);
      toast.success(
        data.value || "Tipo de entidade externa adicionada com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao adicionar nova entidade externa:", error);
    } finally {
      fetchAllExternalEntitiesData();
    }
  };

  // Função para atualizar um tipo de uma entidade externa
  const handleUpdateExternalEntityTypes = async (
    externalEntityType: ExternalEntityTypes
  ) => {
    try {
      const updatedExternalEntityType =
        await apiService.updateExternalEntityTypes(externalEntityType);
      setexternalEntityTypes((externalEntitiesType) =>
        externalEntitiesType.map((entity) =>
          entity.externalEntityTypeID ===
          updatedExternalEntityType.externalEntityTypeID
            ? updatedExternalEntityType
            : entity
        )
      );
      toast.success(
        updatedExternalEntityType.value ||
          "Tipo de entidade externa atualizado com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao atualizar entidade externa:", error);
    } finally {
      fetchAllExternalEntitiesData();
    }
  };

  // Função para apagar um tipo de uma entidade externa
  const handleDeleteExternalEntityTypes = async (
    externalEntityTypeID: string[]
  ) => {
    try {
      const deleteExtEntType = await apiService.deleteExternalEntityTypes(
        externalEntityTypeID
      );
      toast.success(
        deleteExtEntType.value ||
          "Tipo de entidade externa apagada com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao apagar entidade externa:", error);
    } finally {
      fetchAllExternalEntitiesData();
    }
  };

  // Função para buscar as profissões
  const fetchAllProfessions = async (): Promise<Profession[]> => {
    try {
      const data = await apiService.fetchAllProfessions();
      const sortedData = data.sort(
        (a: { code: number }, b: { code: number }) => a.code - b.code
      );
      setProfessions(sortedData);
      return sortedData;
    } catch (error) {
      console.error("Erro ao buscar os dados das profissões:", error);
    }
    return [];
  };

  // Função para adicionar uma nova profissão
  const handleAddProfession = async (profession: Profession) => {
    try {
      const data = await apiService.addProfession(profession);
      setProfessions([...professions, data]);
      toast.success(data.value || "Profissão adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar nova profissão:", error);
    } finally {
      fetchAllProfessions();
    }
  };

  // Função para atualizar uma profissão
  const handleUpdateProfession = async (profession: Profession) => {
    try {
      const updatedProfession = await apiService.updateProfession(profession);
      setProfessions((professions) =>
        professions.map((p) =>
          p.professionID === updatedProfession.professionID
            ? updatedProfession
            : p
        )
      );
      toast.success(
        updatedProfession.value || "Profissão atualizada com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao atualizar a profissão:", error);
    } finally {
      fetchAllProfessions();
    }
  };

  // Função para apagar uma profissão
  const handleDeleteProfessions = async (professionID: string[]) => {
    try {
      const deleteProfession = await apiService.deleteProfession(professionID);
      toast.success(deleteProfession.value || "Profissão apagada com sucesso!");
    } catch (error) {
      console.error("Erro ao apagar a profissão:", error);
    } finally {
      fetchAllProfessions();
    }
  };

  // Função para buscar as zonas
  const fetchAllZones = async (): Promise<Zone[]> => {
    try {
      const data = await apiService.fetchAllZones();
      setZones(data);
      return data;
    } catch (error) {
      console.error("Erro ao buscar os dados das zonas:", error);
    }
    return [];
  };

  // Função para adicionar uma zona
  const handleAddZone = async (zone: Zone) => {
    try {
      const data = await apiService.addZone(zone);
      setZones([...zones, data]);
      toast.success(data.value || "Zona adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar nova zona:", error);
    } finally {
      fetchAllZones();
    }
  };

  // Função para atualizar uma zona
  const handleUpdateZone = async (zone: Zone) => {
    try {
      const updatedZone = await apiService.updateZone(zone);
      setZones((zones) =>
        zones.map((z) => (z.zoneID === updatedZone.zoneID ? updatedZone : z))
      );
      toast.success(updatedZone.value || "Zona atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar zona:", error);
    } finally {
      fetchAllZones();
    }
  };

  // Função para apagar uma zona
  const handleDeleteZone = async (zoneID: string[]) => {
    try {
      const deleteZone = await apiService.deleteZone(zoneID);
      toast.success(deleteZone.value || "Zona apagada com sucesso!");
    } catch (error) {
      console.error("Erro ao apagar zona:", error);
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
      console.error("Erro ao buscar cartões de funcionários:", error);
      return [];
    }
  };

  // Define a função para buscar cartões de funcionários
  const fetchEmployeeCardData = async (
    employeeID: string
  ): Promise<EmployeeCard[]> => {
    try {
      const employeeCardsData =
        await apiService.fetchEmployeeCardDataByEmployeeID(employeeID);
      setEmployeeCards(employeeCardsData);
      return employeeCardsData;
    } catch (error) {
      console.error("Erro ao buscar cartões de funcionários:", error);
      return [];
    }
  };

  // Define a função de adição de cartões de funcionários
  const handleAddEmployeeCard = async (employeeCard: EmployeeCard) => {
    try {
      const employeesData = await apiService.addEmployeeCard(employeeCard);
      setEmployeeCards([...employeeCards, employeesData]);
      if (employeesData.length > 0) {
        toast.success(
          employeesData.message || "Cartão adicionado com sucesso!"
        );
      }
    } catch (error) {
      console.error("Erro ao adicionar novo cartão:", error);
    } finally {
      fetchAllCardData();
    }
  };

  // Define a função de atualização de cartões de funcionários
  const handleUpdateEmployeeCard = async (employeeCard: EmployeeCard) => {
    try {
      const updatedEmployeeCard = await apiService.updateEmployeeCard(
        employeeCard
      );
      setEmployeeCards((prevEmployeeCards) =>
        prevEmployeeCards.map((emp) =>
          emp.cardId === updatedEmployeeCard.cardId ? updatedEmployeeCard : emp
        )
      );
      if (updatedEmployeeCard.length > 0) {
        toast.success(
          updatedEmployeeCard.message || "Cartão adicionado com sucesso!"
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar cartão:", error);
    } finally {
      fetchAllCardData();
    }
  };

  // Define a função de apagar cartões de funcionários
  const handleDeleteEmployeeCard = async (cardId: string) => {
    try {
      const deleteEmployeeCard = await apiService.deleteEmployeeCard(cardId);
      toast.success(
        deleteEmployeeCard.message || "Cartão apagado com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao apagar cartão:", error);
    } finally {
      fetchAllCardData();
    }
  };

  // Define a função de importação de biometria digital
  const handleImportEmployeeFP = async (employeeFP: Partial<EmployeeFP>[]) => {
    try {
      const employeesData = await apiService.employeeImportFP(employeeFP);
      setEmployeesFP([...employeesFP, employeesData]);
      toast.success(
        employeesData.value || "Biometria digital adicionada com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao adicionar nova biometria digital:", error);
    }
  };

  // Define a função de importação de biometria facial
  const handleImportEmployeeFace = async (
    employeeFace: Partial<EmployeeFace>[]
  ) => {
    try {
      const employeesData = await apiService.employeeImportFace(employeeFace);
      setEmployeesFace([...employeesFace, employeesData]);
      toast.success(
        employeesData.value || "Biometria facial adicionada com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao adicionar nova biometria facial:", error);
    }
  };

  // Define a função de importação de cartão
  const handleImportEmployeeCard = async (
    employeeCard: Partial<EmployeeCard>[]
  ) => {
    try {
      const employeesData = await apiService.employeeImportCard(employeeCard);
      setEmployeeCards([...employeeCards, employeesData]);
      toast.success(employeesData.value || "Cartão adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar novo cartão:", error);
    }
  };

  // Define a função para buscar os visitantes
  const fetchEmployeeVisitor = async (
    startDate?: string,
    endDate?: string,
    pageNo?: "1",
    perPage?: "20",
    employeeIds?: string[]
  ): Promise<EmployeeVisitor[]> => {
    try {
      const data = await apiService.fetchAllEmployeeVisitors(
        undefined,
        undefined,
        pageNo,
        perPage,
        employeeIds
      );
      setEmployeeVisitor(data.data);
      setTotalVisitorPages(data.totalPages);
      setTotalVisitorRecords(data.totalRecords);
      return data.data;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
    return [];
  };

  // Define a função de adição de visitantes
  const handleAddEmployeeVisitor = async (
    visitor: Partial<EmployeeVisitor>
  ) => {
    try {
      const visitorData = await apiService.addEmployeeVisitor(visitor);
      setEmployeeVisitor([
        ...(Array.isArray(employeeVisitor) ? employeeVisitor : []),
        visitorData,
      ]);
      toast.success(visitorData.message || "Visitante adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar novo visitante:", error);
    } finally {
      fetchEmployeeVisitor();
    }
  };

  // Define a função de atualização de visitantes
  const handleUpdateEmployeeVisitor = async (
    visitor: Partial<EmployeeVisitor>
  ) => {
    try {
      const updatedEmployeeVisitor = await apiService.updateEmployeeVisitor(
        visitor
      );
      setEmployeeVisitor((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === updatedEmployeeVisitor.id ? updatedEmployeeVisitor : emp
        )
      );
      toast.success(
        updatedEmployeeVisitor.message || "Visitante atualizado com sucesso"
      );
    } catch (error) {
      console.error("Erro ao atualizar visitante:", error);
    } finally {
      fetchEmployeeVisitor();
    }
  };

  // Define a função de apagar visitantes
  const handleDeleteEmployeeVisitor = async (id: string[]) => {
    try {
      const deleteEmployeeVisitor = await apiService.deleteEmployeeVisitor(id);
      toast.success(
        deleteEmployeeVisitor.message || "Visitante apagado com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao apagar visitante:", error);
    } finally {
      fetchEmployeeVisitor();
    }
  };

  // Função para buscar motivos por ID
  const fetchVisitorsMotive = async (): Promise<EmployeeVisitorMotive[]> => {
    try {
      const data = await apiService.fetchEmployeeVisitorMotive();
      setEmployeeVisitorMotive(data);
      return data;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
    return [];
  };

  // Define a função de adição de visitantes
  const handleAddVisitorMotive = async (
    visitor: Partial<EmployeeVisitorMotive>
  ) => {
    try {
      const motiveData = await apiService.addEmployeeVisitorMotive(visitor);
      setEmployeeVisitorMotive([...employeeVisitorMotive, motiveData]);
      toast.success(motiveData.message || "Motivo adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar novo motivo:", error);
    } finally {
      fetchVisitorsMotive();
    }
  };

  // Define a função de atualização de motivos
  const handleUpdateVisitorMotive = async (
    visitor: Partial<EmployeeVisitorMotive>
  ) => {
    try {
      const updatedEmployeeVisitorMotive =
        await apiService.updateEmployeeVisitorMotive(visitor);
      setEmployeeVisitorMotive((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === updatedEmployeeVisitorMotive.id
            ? updatedEmployeeVisitorMotive
            : emp
        )
      );
      toast.success(
        updatedEmployeeVisitorMotive.message || "Motivo atualizado com sucesso"
      );
    } catch (error) {
      console.error("Erro ao atualizar motivo:", error);
    } finally {
      fetchEmployeeVisitor();
    }
  };

  // Define a função de apagar motivos
  const handleDeleteVisitorMotive = async (id: string[]) => {
    try {
      const deleteEmployeeVisitorMotive =
        await apiService.deleteEmployeeVisitorMotive(id);
      toast.success(
        deleteEmployeeVisitorMotive.message || "Motivo apagado com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao apagar motivo:", error);
    } finally {
      fetchEmployeeVisitor();
    }
  };

  // Executa a função de busca de dados inicial
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchAllData();
      fetchAllEmployees();
      fetchAllEmployeesNoPagination();
      fetchAllDisabledEmployees();
      fetchAllDisabledEmployeesNoPagination();
      fetchAllCardData();
      fetchAllRegisteredUsers();
      fetchAllDepartments();
      fetchAllGroups();
      fetchAllCategories();
      fetchAllExternalEntitiesData();
      fetchAllProfessions();
      fetchAllZones();
      fetchVisitorsMotive();
      fetchEmployeeVisitor();
    }
  }, []);

  // Define o valor do contexto
  const contextValue: PersonsContextType = {
    employees,
    employeesNoPagination,
    disabledEmployees,
    disabledEmployeesNoPagination,
    departments,
    setDepartments,
    groups,
    categories,
    registeredUsers,
    data,
    setData,
    setEmployees,
    setEmployeesNoPagination,
    setDisabledEmployees,
    setDisabledEmployeesNoPagination,
    fetchAllData,
    fetchAllEmployees,
    fetchAllEmployeesNoPagination,
    fetchAllDisabledEmployees,
    fetchAllDisabledEmployeesNoPagination,
    fetchEmployeesById,
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
    totalEmployeePages,
    totalEmployeeRecords,
    totalVisitorPages,
    totalVisitorRecords,
    employeeVisitor,
    setEmployeeVisitor,
    fetchEmployeeVisitor,
    handleAddEmployeeVisitor,
    handleUpdateEmployeeVisitor,
    handleDeleteEmployeeVisitor,
    employeeVisitorMotive,
    fetchVisitorsMotive,
    handleAddVisitorMotive,
    handleUpdateVisitorMotive,
    handleDeleteVisitorMotive,
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
    throw new Error("usePersons must be used within a PersonsProvider");
  }
  return context;
};
