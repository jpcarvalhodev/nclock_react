import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';

import * as apiService from "../helpers/apiService";
import { EmailUser, KioskConfig } from '../helpers/Types';

// Defina a interface para o contexto
export interface NavbarContextType {
  navbarColor: string;
  footerColor: string;
  setNavbarColor: (color: string) => void;
  setFooterColor: (color: string) => void;
  lockRibbon: boolean;
  setLockRibbon: (lock: boolean) => void;
  currentOpenRibbon: RibbonToggler | null;
  setCurrentOpenRibbon: (ribbon: RibbonToggler | null) => void;
  lastClosedRibbon: RibbonToggler | null;
  setLastClosedRibbon: (ribbon: RibbonToggler | null) => void;
  emailCompanyConfig: EmailUser[];
  kioskConfig: Partial<KioskConfig>;
  fetchEmailConfig: () => void;
  fetchKioskConfig: () => void;
  handleAddEmailConfig: (email: Partial<EmailUser>) => void;
  handleAddKioskConfig: (kioskConfig: Partial<KioskConfig>) => void;
  handleUpdateEmailConfig: (email: Partial<EmailUser>) => void;
  handleUpdateKioskConfig: (kioskConfig: Partial<KioskConfig>) => void;
}

// Crie o contexto com valores padrões
export const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

// Define a interface para o toggler da ribbon
type RibbonToggler = 'Pessoas' | 'Dispositivos' | 'Configuracao' | 'Ajuda' | 'Nclock' | 'Naccess' | 'Nvisitor' | 'Npark' | 'Ndoor' | 'Npatrol' | 'Ncard' | 'Nview' | 'Nsecur' | 'Nsoftware' | 'Nsystem' | 'Napp' | 'Ncyber' | 'Ndigital' | 'Nserver' | 'Naut' | 'Nequip' | 'Nproject' | 'Ncount' | 'Nbuild' | 'Ncaravan' | 'Nmechanic' | 'Nevents' | 'Nservice' | 'Ntask' | 'Nproduction' | 'Nticket' | 'Nsales' | 'Ninvoice' | 'Ndoc' | 'Nsports' | 'Ngym' | 'Nschool' | 'Nclinic' | 'Noptics' | 'Ngold' | 'Nsmart' | 'Nreality' | 'Nhologram' | 'Npower' | 'Ncharge' | 'Ncity' | 'Nkiosk' | 'Nled' | 'Nfire' | 'Nfurniture' | 'Npartition' | 'Ndecor' | 'Nping' | 'Nconnect' | 'Nlight' | 'Ncomfort' | 'Nsound' | 'Nhome';

// Provedor de contexto
export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [navbarColor, setNavbarColor] = useState('#000000');
  const [footerColor, setFooterColor] = useState('#000000');
  const [lockRibbon, setLockRibbon] = useState(false);
  const [currentOpenRibbon, setCurrentOpenRibbon] = useState<RibbonToggler | null>(null);
  const [lastClosedRibbon, setLastClosedRibbon] = useState<RibbonToggler | null>(null);
  const [emailCompanyConfig, setEmailCompanyConfig] = useState<EmailUser[]>([]);
  const [kioskConfig, setKioskConfig] = useState<Partial<KioskConfig>>({});

  // Função para carregar os dados das configurações de email
  const fetchEmailConfig = async () => {
    try {
      const data = await apiService.fetchAllEmailConfig();
      setEmailCompanyConfig(data);
    } catch (error) {
      console.error('Erro ao carregar os emails registados:', error);
    }
  }

  // Função para carregar as configurações dos quiosques
  const fetchKioskConfig = async () => {
    try {
      const data = await apiService.fetchKioskConfig();
      setKioskConfig(data);
    } catch (error) {
      console.error('Erro ao carregar as configurações dos quiosques:', error);
    }
  }

  // Função para adicionar emails de utilizadores
  const handleAddEmailConfig = async (email: Partial<EmailUser>) => {
    try {
      if (email && Object.keys(email).length > 0) {
        const data = await apiService.addUserEmailConfig(email);
        setEmailCompanyConfig(data);
        toast.success(data.message || 'Email adicionado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao adicionar o email registado ou o quiosque:', error);
    } finally {
      fetchEmailConfig();
    }
  }
  // Função para adicionar configurações de quiosque
  const handleAddKioskConfig = async (kioskConfig: Partial<KioskConfig>) => {
    try {
      if (kioskConfig && Object.keys(kioskConfig).length > 0) {
        const data = await apiService.addKioskConfig(kioskConfig);
        setKioskConfig(data);
        toast.success(data.message || 'Configurações do quiosque adicionadas com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao adicionar as configurações do quiosque:', error);
    } finally {
      fetchKioskConfig();
    }
  }

  // Função de atualização de emails de utilizadores
  const handleUpdateEmailConfig = async (email: Partial<EmailUser>) => {
    try {
      if (email && Object.keys(email).length > 0) {
        const data = await apiService.updateUserEmailConfig(email);
        setEmailCompanyConfig(data);
        toast.success(data.message || 'Email atualizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao atualizar o email registado ou o quiosque:', error);
    } finally {
      fetchEmailConfig();
    }
  }

  // Função de atualização de configurações do quiosque
  const handleUpdateKioskConfig = async (kioskConfig: Partial<KioskConfig>) => {
    try {
      if (kioskConfig && Object.keys(kioskConfig).length > 0) {
        const data = await apiService.updateKioskConfig(kioskConfig);
        setKioskConfig(data);
        toast.success(data.message || 'Configurações do quiosque atualizadas com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao atualizar as configurações do quiosque:', error);
    } finally {
      fetchKioskConfig();
    }
  }

  // Busca os dados ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchEmailConfig();
      fetchKioskConfig();
    }
  }, []);

  return (
    <NavbarContext.Provider value={{ navbarColor, footerColor, setNavbarColor, setFooterColor, lockRibbon, setLockRibbon, currentOpenRibbon, setCurrentOpenRibbon, lastClosedRibbon, setLastClosedRibbon, emailCompanyConfig, kioskConfig, fetchEmailConfig, fetchKioskConfig, handleAddEmailConfig, handleAddKioskConfig, handleUpdateEmailConfig, handleUpdateKioskConfig }}>
      {children}
    </NavbarContext.Provider>
  );
};

// Hook para facilitar o acesso ao contexto
export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
}