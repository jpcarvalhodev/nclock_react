import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { ReactNode } from 'react';
import { fetchWithAuth } from '../components/FetchWithAuth';
import { Department, Employee, Group } from '../helpers/Types';
import { toast } from 'react-toastify';

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
    fetchAllData: () => Promise<void>;
    fetchAllEmployees: (options?: FetchOptions) => Promise<Employee[]>;
    handleAddEmployee: (employee: Employee) => Promise<void>;
    handleUpdateEmployee: (employee: Employee) => Promise<void>;
    handleDeleteEmployee: (employeeID: string) => Promise<void>;
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
    const [data, setData] = useState<DataState>({
        departments: [],
        groups: [],
        employees: []
    });

    // Função para buscar todos os dados
    const fetchAllData = useCallback(async () => {
        try {
            const deptResponse = await fetchWithAuth('Departaments/Employees');
            const groupResponse = await fetchWithAuth('Groups/Employees');
            const employeesResponse = await fetchWithAuth('Employees/GetAllEmployees');

            if (!deptResponse.ok || !groupResponse.ok || !employeesResponse.ok) {
                return;
            }

            const [departments, groups, employees] = await Promise.all([
                deptResponse.json(),
                groupResponse.json(),
                employeesResponse.json(),
            ]);

            setData({
                departments,
                groups,
                employees,
            });
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }, []);

    // Função para buscar todos os funcionários
    const fetchAllEmployees = useCallback(async (options?: FetchOptions): Promise<Employee[]> => {
        try {
            const response = await fetchWithAuth('Employees/GetAllEmployees');
            if (!response.ok) {
                return [];
            }
            let data = await response.json();
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
            const response = await fetchWithAuth('Employees/CreateEmployee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee)
            });

            if (!response.ok) {
                return;
            }
            const employeesData = await response.json();
            setEmployees([...employees, employeesData]);
            toast.success(employeesData.value || 'Funcionário adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar novo funcionário:', error);
        }
    };

    // Define a função de atualização de funcionários
    const handleUpdateEmployee = async (employee: Employee) => {
        try {
            const response = await fetchWithAuth(`Employees/UpdateEmployee/${employee.employeeID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee)
            });

            if (!response.ok) {
                return;
            }

            const contentType = response.headers.get('Content-Type');
            (contentType && contentType.includes('application/json'))
            const updatedEmployee = await response.json();
            setEmployees(prevEmployees => prevEmployees.map(emp => emp.employeeID === updatedEmployee.employeeID ? updatedEmployee : emp));
            toast.success(updatedEmployee.value || 'Funcionário atualizado com sucesso');
        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
        }
    };

    // Define a função de apagar funcionários
    const handleDeleteEmployee = async (employeeID: string) => {

        try {
            const response = await fetchWithAuth(`Employees/DeleteEmployee/${employeeID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return;
            }

            const deleteEmployee = await response.json();
            toast.success(deleteEmployee.value || 'Funcionário apagado com sucesso!')
        } catch (error) {
            console.error('Erro ao apagar funcionário:', error);
        }
    };

    // Define o valor do contexto
    const contextValue: PersonsContextType = {
        employees,
        data,
        setData,
        setEmployees,
        fetchAllData,
        fetchAllEmployees,
        handleAddEmployee,
        handleUpdateEmployee,
        handleDeleteEmployee,
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
