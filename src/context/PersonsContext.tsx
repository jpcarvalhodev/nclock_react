import { createContext, useState, useContext, useCallback } from 'react';
import { ReactNode } from 'react';
import { Department, Employee, EmployeeCard, EmployeeFace, EmployeeFP, Group } from '../helpers/Types';
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
    data: DataState;
    setData: (data: DataState) => void;
    setEmployees: (employees: Employee[]) => void;
    fetchAllData: (entity?: string) => Promise<void>;
    fetchAllEmployees: (options?: FetchOptions) => Promise<Employee[]>;
    fetchAllCardData: () => Promise<EmployeeCard[]>;
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
            return data;
        } catch (error) {
            console.error('Erro ao buscar assiduidades:', error);
            return [];
        }
    }, []);

    // Define a função de adição de funcionários
    const handleAddEmployee = async (employee: Employee) => {
        try {
            const employeesData = await apiService.addEmployee(employee);
            setEmployees([...employees, employeesData]);
            toast.success(employeesData.value || 'Funcionário adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar novo funcionário:', error);
        }
    };

    // Define a função de atualização de funcionários
    const handleUpdateEmployee = async (employee: Employee) => {
        try {
            const updatedEmployee = await apiService.updateEmployee(employee);
            setEmployees(prevEmployees => prevEmployees.map(emp => emp.employeeID === updatedEmployee.employeeID ? updatedEmployee : emp));
            toast.success(updatedEmployee.value || 'Funcionário atualizado com sucesso');
        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
        }
    };

    // Define a função de apagar funcionários
    const handleDeleteEmployee = async (employeeID: string) => {

        try {
            const deleteEmployee = await apiService.deleteEmployee(employeeID);
            toast.success(deleteEmployee.value || 'Funcionário apagado com sucesso!')
        } catch (error) {
            console.error('Erro ao apagar funcionário:', error);
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
                toast.success(employeesData.value || 'Cartão adicionado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao adicionar novo cartão:', error);
        }
    };

    // Define a função de atualização de cartões de funcionários
    const handleUpdateEmployeeCard = async (employeeCard: EmployeeCard) => {
        try {
            const updatedEmployeeCard = await apiService.updateEmployeeCard(employeeCard);
            setEmployeeCards(prevEmployeeCards => prevEmployeeCards.map(emp => emp.cardID === updatedEmployeeCard.cardID ? updatedEmployeeCard : emp));
            if (updatedEmployeeCard.length > 0) {
                toast.success(updatedEmployeeCard.value || 'Cartão adicionado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao atualizar cartão:', error);
        }
    };

    // Define a função de apagar cartões de funcionários
    const handleDeleteEmployeeCard = async (cardId: string) => {
        try {
            const deleteEmployeeCard = await apiService.deleteEmployeeCard(cardId);
            toast.success(deleteEmployeeCard.value || 'Cartão apagado com sucesso!')
        } catch (error) {
            console.error('Erro ao apagar cartão:', error);
        }
    }

    const handleImportEmployeeFP = async (employeeFP: Partial<EmployeeFP>) => {
        try {
            const employeesData = await apiService.employeeImportFP(employeeFP);
            setEmployeesFP([...employeesFP, employeesData]);
            toast.success(employeesData.value || 'Biometria digital adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar nova biometria digital:', error);
        }
    }

    const handleImportEmployeeFace = async (employeeFace: Partial<EmployeeFace>) => {
        try {
            const employeesData = await apiService.employeeImportFace(employeeFace);
            setEmployeesFace([...employeesFace, employeesData]);
            toast.success(employeesData.value || 'Biometria facial adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar nova biometria facial:', error);
        }
    }

    const handleImportEmployeeCard = async (employeeCard: Partial<EmployeeCard>) => {
        try {
            const employeesData = await apiService.employeeImportCard(employeeCard);
            setEmployeeCards([...employeeCards, employeesData]);
            toast.success(employeesData.value || 'Cartão adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar novo cartão:', error);
        }
    }

    // Define o valor do contexto
    const contextValue: PersonsContextType = {
        employees,
        data,
        setData,
        setEmployees,
        fetchAllData,
        fetchAllEmployees,
        fetchAllCardData,
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
