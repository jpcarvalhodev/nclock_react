import { createContext, useState, useContext, ReactNode } from 'react';
import * as apiService from '../helpers/apiService';
import { toast } from 'react-toastify';
import { License } from '../helpers/Types';

// Define o tipo do contexto
interface LicenseContextType {
    license: License[];
    setLicense: (license: License[]) => void;
    isLicensed: boolean;
    setIsLicensed: (isLicensed: boolean) => void;
    fetchAllLicenses: (license: string) => Promise<License[]>;
    handleUpdateLicense: (license: string, licenses: License) => Promise<void>;
}

// Cria o contexto
const LicenseContext = createContext<LicenseContextType | undefined>(undefined);

// Provider do contexto
export const LicenseProvider = ({ children }: { children: ReactNode }) => {
    const [license, setLicense] = useState<any[]>([]);
    const [isLicensed, setIsLicensed] = useState<boolean>(false);

    // Função para buscar todas as licenças
    const fetchAllLicenses = async (license: string): Promise<License[]> => {
        try {
            const data = await apiService.fetchLicenses(license);
            console.log('fetchAllLicenses:', data);
            if (data) {
                setLicense(data);
                setIsLicensed(true);
            } else {
                setIsLicensed(false);
            }
            return data;
        } catch (error) {
            console.error('Erro ao buscar licenças:', error);
        }
        return [];
    }

    // Função para atualizar uma licença
    const handleUpdateLicense = async (key: string, licenses: License) => {
        try {
            const data = await apiService.updateLicenses(key, licenses);
            if (data) {
                setLicense(data);
                setIsLicensed(true);
                toast.success(data.message || 'Licença atualizada com sucesso!');
            } else {
                setIsLicensed(false);
                console.error('Nenhum dado retornado da API.');
            }
        } catch (error) {
            console.error('Erro ao atualizar licença:', error);
        }
    };

    return (
        <LicenseContext.Provider value={{ license, setLicense, isLicensed, setIsLicensed, fetchAllLicenses, handleUpdateLicense }}>
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
