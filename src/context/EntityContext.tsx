import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as apiService from '../helpers/apiService';
import { toast } from 'react-toastify';
import { Entity, Logs } from '../helpers/Types';

// Define o tipo do contexto
export interface EntityContextType {
    entity: Entity[];
    setEntity: React.Dispatch<React.SetStateAction<Entity[]>>;
    fetchAllEntity: () => Promise<Partial<Entity[]>>;
    addEntity: (entity: FormData) => void;
    updateEntity: (entity: FormData) => void;
    deleteEntity: (id: string) => void;
    loginLogs: Logs[];
    historyLogs: Logs[];
    setLoginLogs: React.Dispatch<React.SetStateAction<Logs[]>>;
    setHistoryLogs: React.Dispatch<React.SetStateAction<Logs[]>>;
    fetchAllLoginLogs: () => void;
    fetchAllHistoryLogs: () => void;
}

// Cria o contexto
export const EntityContext = createContext<EntityContextType | undefined>(undefined);

// Provider do contexto
export const EntityProvider = ({ children }: { children: ReactNode }) => {
    const [entity, setEntity] = useState<Entity[]>([]);
    const [loginLogs, setLoginLogs] = useState<Logs[]>([]);
    const [historyLogs, setHistoryLogs] = useState<Logs[]>([]);

    // Função para buscar todas as entidades
    const fetchAllEntity = async (): Promise<Entity[]> => {
        try {
            const data = await apiService.fetchAllCompanyConfig();
            setEntity(Array.isArray(data) ? data : []);
            return data;
        } catch (error) {
            console.error('Erro ao buscar entidades:', error);
            setEntity([]);
        }
        return [];
    }

    // Função para adicionar uma entidade
    const addEntity = async (entity: FormData) => {
        try {
            const data = await apiService.addCompanyConfig(entity);
            setEntity(Array.isArray(data) ? data : []);
            toast.success('Entidade adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar entidade:', error);
        } finally {
            fetchAllEntity();
        }
    }

    // Função para atualizar uma entidade
    const updateEntity = async (entity: FormData) => {
        try {
            const data = await apiService.updateCompanyConfig(entity);
            setEntity(Array.isArray(data) ? data : []);
            toast.success('Entidade atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar entidade:', error);
        } finally {
            fetchAllEntity();
        }
    }

    // Função para deletar uma entidade
    const deleteEntity = async (id: string) => {
        try {
            await apiService.deleteCompanyConfig(id);
            toast.success('Entidade deletada com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar entidade:', error);
        } finally {
            fetchAllEntity();
        }
    }

    // Função para buscar os logs de login
    const fetchAllLoginLogs = async () => {
        try {
            const data = await apiService.fetchAllLoginLogs();
            if (Array.isArray(data)) {
                setLoginLogs(data);
            } else {
                setLoginLogs([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de logs:', error);
        }
    };

    // Função para buscar os logs de histórico
    const fetchAllHistoryLogs = async () => {
        try {
            const data = await apiService.fetchAllHistoryLogs();
            if (Array.isArray(data)) {
                setHistoryLogs(data);
            } else {
                setHistoryLogs([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de logs:', error);
        }
    };

    // Busca todas as entidades ao recarregar o componente
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchAllEntity();
            fetchAllLoginLogs();
            fetchAllHistoryLogs();
        }
    }, [localStorage.getItem('token')]);

    return (
        <EntityContext.Provider value={{ entity, setEntity, fetchAllEntity, addEntity, updateEntity, deleteEntity, loginLogs, setLoginLogs, historyLogs, setHistoryLogs, fetchAllLoginLogs, fetchAllHistoryLogs }}>
            {children}
        </EntityContext.Provider>
    );
};

// Hook para usar o contexto de entidade
export const useEntity = () => {
    const context = useContext(EntityContext);
    if (!context) {
        throw new Error('useEntity deve ser usado dentro do EntityProvider');
    }
    return context;
};
