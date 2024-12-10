import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as apiService from '../helpers/apiService';
import { toast } from 'react-toastify';
import { Ads } from '../helpers/Types';

// Define o tipo do contexto
export interface AdsContextType {
  ads: Ads[];
  fetchAds: (startDate?: string, endDate?: string) => Promise<void>;
  handleAddAds: (ads: FormData) => Promise<void>;
  handleUpdateAds: (ads: Ads, ad: FormData) => Promise<void>;
  handleDeleteAds: (id: string) => Promise<void>;
}

// Cria o contexto
export const AdsContext = createContext<AdsContextType | undefined>(undefined);

// Provider do contexto
export const AdsProvider = ({ children }: { children: ReactNode }) => {
  const [ads, setAds] = useState<Ads[]>([]);

  // Função para buscar todas as publicidades
  const fetchAds = async (startDate?: string, endDate?: string) => {
    try {
      const data = await apiService.fetchAllAds(startDate, endDate);
      if (data) {
        setAds(data);
      } else {
        setAds([]);
      }
    } catch (error) {
      console.error('Erro ao buscar os dados das publicidades:', error);
    }
  };

  // Função para adicionar uma publicidade
  const handleAddAds = async (ad: FormData) => {
    try {
      const data = await apiService.addAd(ad);
      setAds(ads => [...ads, data]);
      toast.success(data.message || 'Publicidade enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar publicidade', error);
    } finally {
      fetchAds();
    }
  };

  // Função para atualizar uma publicidade
  const handleUpdateAds = async (ads: Ads, ad: FormData) => {
    try {
      const updatedAds = await apiService.updateAd(ads, ad);
      setAds(ads => ads.map(a => a.id === updatedAds.id ? updatedAds : a));
      toast.success(updatedAds.message || 'Publicidade atualizada com sucesso!');

    } catch (error) {
      console.error('Erro ao atualizar publicidade:', error);
    } finally {
      fetchAds();
    }
  };

  // Função para apagar uma publicidade
  const handleDeleteAds = async (id: string) => {
    try {
      const deleteAds = await apiService.deleteAd(id);
      toast.success(deleteAds.message || 'publicidade apagada com sucesso!');

    } catch (error) {
      console.error('Erro ao apagar publicidade:', error);
    } finally {
      fetchAds();
    }
  };

  return (
    <AdsContext.Provider value={{ ads, fetchAds, handleAddAds, handleUpdateAds, handleDeleteAds }}>
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
