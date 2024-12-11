import { createContext, useState, useContext, ReactNode, useEffect, useMemo } from 'react';
import * as apiService from '../helpers/apiService';
import { toast } from 'react-toastify';
import { Entity } from '../helpers/Types';

// Define o tipo do contexto
export interface EntityContextType {
    entity: Entity[];
    setEntity: React.Dispatch<React.SetStateAction<Entity[]>>;
    fetchAllEntity: () => Promise<Partial<Entity[]>>;
    addEntity: (entity: FormData) => void;
    updateEntity: (entity: FormData) => void;
    deleteEntity: (id: string) => void;
}

// Cria o contexto
export const EntityContext = createContext<EntityContextType | undefined>(undefined);

// Provider do contexto
export const EntityProvider = ({ children }: { children: ReactNode }) => {
    const [entity, setEntity] = useState<Entity[]>([]);

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

    // Busca todas as entidades ao recarregar o componente
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchAllEntity();
        }
    }, [localStorage.getItem('token')]);

    return (
        <EntityContext.Provider value={{ entity, setEntity, fetchAllEntity, addEntity, updateEntity, deleteEntity }}>
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
