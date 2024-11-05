import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as apiService from '../helpers/apiService';
import { toast } from 'react-toastify';
import { License } from '../helpers/Types';

// Define o tipo do contexto
interface LicenseContextType {
    license: Partial<License>;
    setLicense: (license: Partial<License>) => void;
    getSoftwareEnabledStatus: (license: Partial<License>) => { [key: string]: boolean };
    fetchAllLicenses: (license: string) => Promise<Partial<License>>;
    fetchAllLicensesWithoutKey: () => Promise<void>;
    handleUpdateLicense: (license: string, licenses: License[]) => Promise<void>;
}

// Cria o contexto
const LicenseContext = createContext<LicenseContextType | undefined>(undefined);

// Provider do contexto
export const LicenseProvider = ({ children }: { children: ReactNode }) => {
    const [license, setLicense] = useState<Partial<License>>({});

    // Função para verificar se o software está habilitado
    const getSoftwareEnabledStatus = (license: Partial<License>) => {
        const softwareEnabled: { [key: string]: boolean } = {};

        Object.keys(license).forEach(key => {
            const item = license[key];
            if (typeof item === 'object' && item !== null && 'enable' in item) {
                softwareEnabled[key] = item.enable;
            }
        });

        return softwareEnabled;
    };

    // Função para buscar todas as licenças
    const fetchAllLicenses = async (license: string): Promise<Partial<License>> => {
        try {
            const data = await apiService.fetchLicenses(license);
            setLicense(data);
            return data;
        } catch (error) {
            console.error('Erro ao buscar licenças:', error);
        }
        return [];
    }

    // Função para buscar todas as licenças sem chave
    const fetchAllLicensesWithoutKey = async () => {
        try {
            const data = await apiService.fetchLicensesWithoutKey();
            setLicense(data);
        } catch (error) {
            console.error('Erro ao buscar licenças:', error);
        }
    }

    // Função para atualizar uma licença
    const handleUpdateLicense = async (key: string, licenses: License[]) => {
        try {
            const data = await apiService.updateLicenses(key, licenses);
            if (data) {
                setLicense(data);
                toast.success(data.message || 'Licença atualizada com sucesso! Atualize a página para ver as alterações.');
            } else {
                console.error('Nenhum dado retornado da API.');
            }
        } catch (error) {
            console.error('Erro ao atualizar licença:', error);
        } finally {
            fetchAllLicensesWithoutKey();
        }
    };

    // Busca todas as licenças ao carregar o componente
    useEffect(() => {
        fetchAllLicensesWithoutKey();
    }, []);

    return (
        <LicenseContext.Provider value={{ license, setLicense, getSoftwareEnabledStatus, fetchAllLicenses, fetchAllLicensesWithoutKey, handleUpdateLicense }}>
            {children}
        </LicenseContext.Provider>
    );
};

// Hook para usar o contexto de licença
export const useLicense = () => {
    const context = useContext(LicenseContext);
    if (!context) {
        throw new Error('useLicense deve ser usado dentro do LicenseProvider');
    }
    return context;
};
