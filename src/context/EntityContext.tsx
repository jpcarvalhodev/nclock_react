import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';

import * as apiService from '../helpers/apiService';
import { BackupDB, Entity, Logs } from '../helpers/Types';

// Função para baixar o arquivo usando um URL fornecido
const downloadFile = async (url: string) => {
    const fileName = url.split('/').pop();
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName || 'backup');
    document.body.appendChild(link);
    link.click();
    link.remove();
};

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
    exportBackupDB: (backup: BackupDB) => void;
    importBackupDB: (backup: FormData) => void;
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

    // Função para exportar o backup do banco de dados
    const exportBackupDB = async (backup: BackupDB) => {
        try {
            const data = await apiService.backupDatabase(backup);
            if (data.downloadUrl) {
                downloadFile(data.downloadUrl);
                toast.success(data.message || 'Backup realizado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao realizar o backup:', error);
        }
    }

    // Função para importar o backup do banco de dados
    const importBackupDB = async (backup: FormData) => {
        try {
            const data = await apiService.importBackupDatabase(backup);
            toast.success(data.message || 'Backup restaurado com sucesso!');
        } catch (error) {
            console.error('Erro ao restaurar o backup:', error);
        }
    }

    // Busca todas as entidades ao carregar a página
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchAllEntity();
            fetchAllLoginLogs();
            fetchAllHistoryLogs();
        }
    }, []);

    return (
        <EntityContext.Provider value={{ entity, setEntity, fetchAllEntity, addEntity, updateEntity, deleteEntity, loginLogs, setLoginLogs, historyLogs, setHistoryLogs, fetchAllLoginLogs, fetchAllHistoryLogs, exportBackupDB, importBackupDB }}>
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
