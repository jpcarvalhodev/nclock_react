import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { ReactNode } from 'react';
import { Department, Employee, EmployeeCard, EmployeeFace, EmployeeFP, Group, Register } from '../helpers/Types';
import { toast } from 'react-toastify';
import * as apiService from "../helpers/apiService";

// Define a interface para o estado de dados
interface DataState {
    departments: Department[];
    groups: Group[];
    employees: Employee[];
}

// Define o tipo de contexto
export interface PersonsContextType {
    employees: Employee[];
    departments: Department[];
    groups: Group[];
    registeredUsers: Register[];
    data: DataState;
    setData: (data: DataState) => void;
    setEmployees: (employees: Employee[]) => void;
    fetchAllData: (entity?: string) => Promise<void>;
    fetchAllEmployees: (options?: FetchOptions) => Promise<Employee[]>;
    fetchAllDepartments: () => Promise<Department[]>;
    fetchAllGroups: () => Promise<Group[]>;
    fetchAllCardData: () => Promise<EmployeeCard[]>;
    fetchAllRegisteredUsers: () => Promise<void>;
    handleAddUsers: (user: FormData) => Promise<void>;
    handleUpdateUser: (user: FormData) => Promise<void>;
    handleDeleteUser: (id: string) => Promise<void>;
    handleAddEmployee: (employee: Employee) => Promise<void>;
    handleUpdateEmployee: (employee: Employee) => Promise<void>;
    handleDeleteEmployee: (employeeID: string) => Promise<void>;
    fetchEmployeeCardData: (employeeID: string) => Promise<EmployeeCard[]>;
    handleAddEmployeeCard: (employeeCard: EmployeeCard) => Promise<void>;
    handleUpdateEmployeeCard: (employeeCard: EmployeeCard) => Promise<void>;
    handleDeleteEmployeeCard: (cardId: string) => Promise<void>;
    handleImportEmployeeFP: (employeeFP: Partial<EmployeeFP>) => Promise<void>;
    handleImportEmployeeFace: (employeeFace: Partial<EmployeeFace>) => Promise<void>;
    handleImportEmployeeCard: (employeeCard: Partial<EmployeeCard>) => Promise<void>;
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
    const [employeesFP, setEmployeesFP] = useState<EmployeeFP[]>([]);
    const [employeesFace, setEmployeesFace] = useState<EmployeeFace[]>([]);
    const [employeeCards, setEmployeeCards] = useState<EmployeeCard[]>([]);
    const [registeredUsers, setRegisteredUsers] = useState<Register[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [data, setData] = useState<DataState>({
        departments: [],
        groups: [],
        employees: []
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
            } else if (entity === 'external employees') {
                newData.employees = allData?.employees.filter((emp: Employee) => emp.type === 'Funcionário Externo');
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
            console.error('Erro ao buscar assiduidades:', error);
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
    const handleDeleteEmployee = async (employeeID: string) => {

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

    // Busca todos os dados ao carregar o componente
    useEffect(() => {
        const fetchOnTokenChange = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                await fetchAllData();
                await fetchAllEmployees();
                await fetchAllDepartments();
                await fetchAllGroups();
                await fetchAllRegisteredUsers();
                await fetchAllCardData();
            }
        };

        fetchOnTokenChange();

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'token' && event.newValue) {
                fetchOnTokenChange();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Define o valor do contexto
    const contextValue: PersonsContextType = {
        employees,
        departments,
        groups,
        registeredUsers,
        data,
        setData,
        setEmployees,
        fetchAllData,
        fetchAllEmployees,
        fetchAllDepartments,
        fetchAllGroups,
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
        handleImportEmployeeCard
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
