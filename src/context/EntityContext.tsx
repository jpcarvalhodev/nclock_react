import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import * as apiService from '../api/apiService';
import { LoadingModal } from '../modals/LoadingModal';
import { BackupDB, Entity, Logs } from '../types/Types';
import { set } from 'date-fns';

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
    entities: Entity[];
    setEntities: React.Dispatch<React.SetStateAction<Entity[]>>;
    fetchAllEntity: () => Promise<Partial<Entity[]>>;
    addEntity: (entity: FormData) => void;
    updateEntity: (entity: FormData) => void;
    deleteEntity: (id: string) => void;
    loginLogs: Logs[];
    setLoginLogs: React.Dispatch<React.SetStateAction<Logs[]>>;
    historyLogs: Logs[];
    setHistoryLogs: React.Dispatch<React.SetStateAction<Logs[]>>;
    fetchAllLoginLogs: (startDate?: string, endDate?: string, userIds?: string[], pageNo?: "1", pageSize?: "20") => Promise<Logs[]>;
    fetchAllHistoryLogs: (startDate?: string, endDate?: string, userIds?: string[], pageNo?: "1", pageSize?: "20") => Promise<Logs[]>;
    exportBackupDB: (backup: BackupDB) => void;
    importBackupDB: (backup: FormData) => void;
    importEmployees: (employees: FormData) => void;
    totalLoginPages: number;
    totalHistoryPages: number;
    totalLoginRecords: number;
    totalHistoryRecords: number;
}

// Cria o contexto
export const EntityContext = createContext<EntityContextType | undefined>(undefined);

// Provider do contexto
export const EntityProvider = ({ children }: { children: ReactNode }) => {
    const [entities, setEntities] = useState<Entity[]>([]);
    const [loginLogs, setLoginLogs] = useState<Logs[]>([]);
    const [historyLogs, setHistoryLogs] = useState<Logs[]>([]);
    const [loadingExportBackup, setLoadingExportBackup] = useState(false);
    const [loadingImportBackup, setLoadingImportBackup] = useState(false);
    const [loadingImportEmployees, setLoadingImportEmployees] = useState(false);
    const [totalLoginPages, setTotalLoginPages] = useState(1);
    const [totalHistoryPages, setTotalHistoryPages] = useState(1);
    const [totalLoginRecords, setTotalLoginRecords] = useState(0);
    const [totalHistoryRecords, setTotalHistoryRecords] = useState(0);

    // Função para buscar todas as entidades
    const fetchAllEntity = async (): Promise<Entity[]> => {
        try {
            const data = await apiService.fetchAllCompanyConfig();
            setEntities(Array.isArray(data) ? data : []);
            return data;
        } catch (error) {
            console.error('Erro ao buscar entidades:', error);
            setEntities([]);
        }
        return [];
    }

    // Função para adicionar uma entidade
    const addEntity = async (entity: FormData) => {
        try {
            const data = await apiService.addCompanyConfig(entity);
            setEntities(Array.isArray(data) ? data : []);
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
            setEntities(Array.isArray(data) ? data : []);
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
    const fetchAllLoginLogs = async (startDate?: string, endDate?: string, userIds?: string[], pageNo?: "1", pageSize?: "20"): Promise<Logs[]> => {
        try {
            const data = await apiService.fetchAllLoginLogs(undefined, undefined, undefined, pageNo, pageSize);
            setLoginLogs(data.data);
            setTotalLoginPages(data.totalPages);
            setTotalLoginRecords(data.totalRecords);
            return data.data;
        } catch (error) {
            console.error('Erro ao buscar os dados de logs:', error);
        }
        return [];
    };

    // Função para buscar os logs de histórico
    const fetchAllHistoryLogs = async (startDate?: string, endDate?: string, userIds?: string[], pageNo?: "1", pageSize?: "20"): Promise<Logs[]> => {
        try {
            const data = await apiService.fetchAllHistoryLogs(undefined, undefined, undefined, pageNo, pageSize);
            setHistoryLogs(data.data);
            setTotalHistoryPages(data.totalPages);
            setTotalHistoryRecords(data.totalRecords);
            return data.data;
        } catch (error) {
            console.error('Erro ao buscar os dados de logs:', error);
        }
        return [];
    };

    // Função para exportar o backup do banco de dados
    const exportBackupDB = async (backup: BackupDB) => {
        try {
            setLoadingExportBackup(true);
            const data = await apiService.backupDatabase(backup);
            setLoadingExportBackup(false);
            if (data.downloadUrl) {
                downloadFile(data.downloadUrl);
                toast.success(data.message || 'Backup realizado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao realizar o backup:', error);
            setLoadingExportBackup(false);
        }
    }

    // Função para importar o backup do banco de dados
    const importBackupDB = async (backup: FormData) => {
        try {
            setLoadingImportBackup(true);
            const data = await apiService.importBackupDatabase(backup);
            setLoadingImportBackup(false);
            toast.success(data.message || 'Backup restaurado com sucesso!');
            window.location.reload();
        } catch (error) {
            console.error('Erro ao restaurar o backup:', error);
            setLoadingImportBackup(false);
        }
    }

    // Função para importar os funcionários
    const importEmployees = async (employees: FormData) => {
        try {
            setLoadingImportEmployees(true);
            const data = await apiService.importEmployees(employees);
            setLoadingImportEmployees(false);
            toast.success(data.message || 'Funcionários importados com sucesso!');
            window.location.reload();
        } catch (error) {
            console.error('Erro ao importar os funcionários:', error);
            setLoadingImportEmployees(false);
        }
    }

    // Busca todas as entidades ao carregar a página
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchAllEntity();
            fetchAllHistoryLogs(undefined, undefined, undefined, "1", "20");
            fetchAllLoginLogs(undefined, undefined, undefined, "1", "20");
        }
    }, []);

    return (
        <EntityContext.Provider value={{ entities, setEntities, fetchAllEntity, addEntity, updateEntity, deleteEntity, loginLogs, setLoginLogs, historyLogs, setHistoryLogs, fetchAllLoginLogs, fetchAllHistoryLogs, exportBackupDB, importBackupDB, importEmployees, totalHistoryPages, totalLoginPages, totalHistoryRecords, totalLoginRecords }}>
            {children}
            <LoadingModal
                show={loadingExportBackup || loadingImportBackup || loadingImportEmployees}
            />
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
