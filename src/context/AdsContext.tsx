import { createContext, useState, useContext, ReactNode } from 'react';
import * as apiService from '../helpers/apiService';
import { toast } from 'react-toastify';
import { Ads } from '../helpers/Types';

// Define o tipo do contexto
interface AdsContextType {
    ads: Ads[];
    handleAddModalNavbar: (ads: FormData) => Promise<void>;
}

// Cria o contexto
const AdsContext = createContext<AdsContextType | undefined>(undefined);

// Provider do contexto
export const AdsProvider = ({ children }: { children: ReactNode }) => {
  const [ads, setAds] = useState<any[]>([]);

  // Função para adicionar uma publicidade
  const handleAddModalNavbar = async (ad: FormData) => {
    try {
      const data = await apiService.addAd(ad);
      setAds(ads => [...ads, data]);
      toast.success(data.message || 'Publicidade enviada com sucesso!');
    } catch (error) {
      toast.error('Erro ao enviar publicidade.');
      console.error(error);
    }
  };

  return (
    <AdsContext.Provider value={{ ads, handleAddModalNavbar }}>
      {children}
    </AdsContext.Provider>
  );
};

// Hook para usar o contexto de Ads
export const useAds = () => {
  const context = useContext(AdsContext);
  if (!context) {
    throw new Error('useAds deve ser usado dentro de AdsProvider');
  }
  return context;
};
