import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as apiService from '../helpers/apiService';
import { Counter, KioskTransactionCard, KioskTransactionMB, LimpezasEOcorrencias, ManualOpenDoor, RecolhaMoedeiroEContador } from '../helpers/Types';
import { useTerminals } from './TerminalsContext';
import { toast } from 'react-toastify';

// Define o tipo do contexto
export interface KioskContextType {
    payTerminal: KioskTransactionMB[];
    setPayTerminal: (payTerminal: KioskTransactionMB[]) => void;
    fetchAllPayTerminal: () => void;
    payCoins: KioskTransactionMB[];
    setPayCoins: (payCoins: KioskTransactionMB[]) => void;
    fetchAllPayCoins: () => void;
    moveCard: KioskTransactionCard[];
    setMoveCard: (moveCard: KioskTransactionCard[]) => void;
    fetchAllMoveCard: () => void;
    moveKiosk: KioskTransactionCard[];
    setMoveKiosk: (moveKiosk: KioskTransactionCard[]) => void;
    fetchAllMoveKiosk: () => void;
    moveVP: KioskTransactionCard[];
    setMoveVP: (moveVP: KioskTransactionCard[]) => void;
    fetchAllMoveVP: () => void;
    manualOpenDoor: ManualOpenDoor[];
    setManualOpenDoor: (manualOpenDoor: ManualOpenDoor[]) => void;
    fetchAllManualOpen: () => void;
    getCoins: RecolhaMoedeiroEContador[];
    setGetCoins: (getCoins: RecolhaMoedeiroEContador[]) => void;
    fetchAllCoin: () => void;
    handleAddRecolhaMoedeiro: (recolhaMoedeiro: RecolhaMoedeiroEContador) => void;
    handleUpdateRecolhaMoedeiro: (recolhaMoedeiro: RecolhaMoedeiroEContador) => void;
    cleaning: LimpezasEOcorrencias[];
    setCleaning: (cleaning: LimpezasEOcorrencias[]) => void;
    fetchAllLimpezas: () => void;
    handleAddLimpezas: (limpezas: LimpezasEOcorrencias) => void;
    handleUpdateCleaning: (limpezas: LimpezasEOcorrencias) => void;
    handleDeleteCleaning: (id: string) => void;
    occurrences: LimpezasEOcorrencias[];
    setOccurrences: (occurrences: LimpezasEOcorrencias[]) => void;
    fetchAllOcorrencias: () => void;
    handleAddOcorrencia: (occurrence: LimpezasEOcorrencias) => void;
    handleUpdateOcorrencia: (occurrence: LimpezasEOcorrencias) => void;
    handleDeleteOcurrences: (id: string) => void;
    counter: Counter[];
    fetchAllCounter: (startDate?: string, endDate?: string) => void;
    listPayments: (KioskTransactionMB | KioskTransactionCard)[];
    listMovements: (KioskTransactionCard | KioskTransactionMB)[];
}

// Cria o contexto
export const KioskContext = createContext<KioskContextType | undefined>(undefined);

// Função para converter string em data
const convertStringToDate = (dateStr: string) => {
    const parts = dateStr.split(' ');
    const dateParts = parts[0].split('/');
    const timeParts = parts[1].split(':');
    return new Date(
        parseInt(dateParts[2], 10),
        parseInt(dateParts[1], 10) - 1,
        parseInt(dateParts[0], 10),
        parseInt(timeParts[0], 10),
        parseInt(timeParts[1], 10),
        parseInt(timeParts[2], 10)
    );
};

// Provider do contexto
export const KioskProvider = ({ children }: { children: ReactNode }) => {
    const { devices } = useTerminals();
    const [payTerminal, setPayTerminal] = useState<KioskTransactionMB[]>([]);
    const [payCoins, setPayCoins] = useState<KioskTransactionMB[]>([]);
    const [moveCard, setMoveCard] = useState<KioskTransactionCard[]>([]);
    const [moveKiosk, setMoveKiosk] = useState<KioskTransactionCard[]>([]);
    const [moveVP, setMoveVP] = useState<KioskTransactionCard[]>([]);
    const [manualOpenDoor, setManualOpenDoor] = useState<ManualOpenDoor[]>([]);
    const [getCoins, setGetCoins] = useState<RecolhaMoedeiroEContador[]>([]);
    const [cleaning, setCleaning] = useState<LimpezasEOcorrencias[]>([]);
    const [occurrences, setOccurrences] = useState<LimpezasEOcorrencias[]>([]);
    const [counter, setCounter] = useState<Counter[]>([]);
    const eventDoorId2 = '2'
    const eventDoorId3 = '3'
    const eventDoorId4 = '4'
    const tipo = 1;
    const tipo2 = 2;

    // Listas de pagamentos e movimentos totais
    const listPayments = payTerminal.concat(payCoins);
    const listMovements = moveCard.concat(moveKiosk);

    // Função para buscar os pagamentos dos terminais
    const fetchAllPayTerminal = async () => {
        try {
            const data = await apiService.fetchKioskTransactionsByMBAndDeviceSN();
            if (Array.isArray(data)) {
                setPayTerminal(data);
            } else {
                setPayTerminal([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de pagamento dos terminais:', error);
        }
    };

    // Função para buscar os pagamentos no moedeiro
    const fetchAllPayCoins = async () => {
        try {
            if (devices.length === 0) {
                setPayCoins([]);
                return;
            }

            const promises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsByPayCoins(eventDoorId2, device.serialNumber);
            });

            const allData = await Promise.all(promises);

            const validData = allData.filter(data => Array.isArray(data) && data.length > 0);

            const combinedData = validData.flat();

            setPayCoins(combinedData);
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos de cartões:', error);
            setPayCoins([]);
        }
    };

    // Função para buscar os movimentos dos cartões
    const fetchAllMoveCard = async () => {
        try {
            if (devices.length === 0) {
                setMoveCard([]);
                return;
            }

            const promises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId3, device.serialNumber);
            });

            const allData = await Promise.all(promises);

            const validData = allData.filter(data => Array.isArray(data) && data.length > 0);

            const combinedData = validData.flat();

            setMoveCard(combinedData);
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos de cartões:', error);
            setMoveCard([]);
        }
    };

    // Função para buscar os movimentos do quiosque
    const fetchAllMoveKiosk = async () => {
        try {
            if (devices.length === 0) {
                setMoveKiosk([]);
                return;
            }
            const promises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId4, device.serialNumber);
            });

            const allData = await Promise.all(promises);

            const validData = allData.filter(data => Array.isArray(data) && data.length > 0);

            const combinedData = validData.flat();

            setMoveKiosk(combinedData);
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos no quiosque:', error);
            setMoveKiosk([]);
        }
    };

    // Função para buscar os movimentos de videoporteiro
    const fetchAllMoveVP = async () => {
        try {
            if (devices.length === 0) {
                setMoveVP([]);
                return;
            }
            const promises = devices.map((device, i) => {
                return apiService.fetchKioskTransactionsVideoPorteiro(eventDoorId3, device.serialNumber);
            });

            const allData = await Promise.all(promises);

            const validData = allData.filter(data => Array.isArray(data) && data.length > 0);

            const combinedData = validData.flat().map(data => ({ ...data, eventTime: convertStringToDate(data.eventTime) }));

            setMoveVP(combinedData);
        } catch (error) {
            console.error('Erro ao buscar os dados de movimentos do video porteiro:', error);
            setMoveVP([]);
        }
    };

    // Função para buscar os dados de aberturas manuais
    const fetchAllManualOpen = async () => {
        try {
            const data = await apiService.fetchAllManualDoorOpen();
            if (Array.isArray(data)) {
                setManualOpenDoor(data);
            } else {
                setManualOpenDoor([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de aberturas manuais:', error);
        }
    }

    // Função para buscar as recolhas do moedeiro
    const fetchAllCoin = async () => {
        try {
            const data = await apiService.fetchRecolhasMoedeiro();
            if (Array.isArray(data)) {
                setGetCoins(data);
            } else {
                setGetCoins([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de recolha do moedeiro:', error);
        }
    };

    // Função para adicionar recolha do moedeiro
    const handleAddRecolhaMoedeiro = async (recolhaMoedeiro: RecolhaMoedeiroEContador) => {
        try {
            const data = await apiService.addRecolhaMoedeiro(recolhaMoedeiro);
            setGetCoins([...getCoins, data]);
            toast.success(data.message || 'Recolha do moedeiro adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar recolha do moedeiro:', error);
        } finally {
            fetchAllCoin();
        }
    };

    // Função para atualizar recolha do moedeiro
    const handleUpdateRecolhaMoedeiro = async (recolhaMoedeiro: RecolhaMoedeiroEContador) => {
        try {
            const data = await apiService.updateRecolhaMoedeiro(recolhaMoedeiro);
            setGetCoins(getCoins.map(item => (item.id === data.id ? data : item)));
            toast.success(data.message || 'Recolha do moedeiro atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar recolha do moedeiro:', error);
        } finally {
            fetchAllCoin();
        }
    };

    // Função para buscar as limpezas
    const fetchAllLimpezas = async () => {
        try {
            const data = await apiService.fetchAllCleaningsAndOccurrences(tipo);
            if (Array.isArray(data)) {
                setCleaning(data);
            } else {
                setCleaning([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de limpezas:', error);
        }
    };

    // Função para adicionar limpezas
    const handleAddLimpezas = async (limpezas: LimpezasEOcorrencias) => {
        try {
            const data = await apiService.addCleaning(limpezas);
            setCleaning([...cleaning, data]);
            toast.success(data.message || 'Limpeza adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar nova limpeza:', error);
        } finally {
            fetchAllLimpezas();
        }
    };

    // Função para atualizar limpezas
    const handleUpdateCleaning = async (limpezas: LimpezasEOcorrencias) => {
        try {
            const data = await apiService.updateCleaning(limpezas);
            const updatedCleaning = cleaning.map(cleaning => cleaning.id === data.id ? data : cleaning);
            setCleaning(updatedCleaning);
            toast.success(data.message || 'Limpeza atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar a limpeza:', error);
        } finally {
            fetchAllLimpezas();
        }
    }

    // Função para apagar limpezas
    const handleDeleteCleaning = async (id: string) => {
        try {
            const data = await apiService.deleteCleaning(id);
            toast.success(data.message || 'Limpeza apagada com sucesso!');
        } catch (error) {
            console.error('Erro ao apagar a limpeza:', error);
        } finally {
            fetchAllLimpezas();
        }
    };

    // Função para buscar as Ocorrências
    const fetchAllOcorrencias = async () => {
        try {
            const data = await apiService.fetchAllCleaningsAndOccurrences(tipo2);
            if (Array.isArray(data)) {
                setOccurrences(data);
            } else {
                setOccurrences([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de ocorrências:', error);
        }
    };

    // Função para adicionar Ocorrências
    const handleAddOcorrencia = async (occurrence: LimpezasEOcorrencias) => {
        try {
            const data = await apiService.addOccurrence(occurrence);
            setOccurrences([...occurrences, data]);
            toast.success(data.message || 'Ocorrência adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar nova ocorrência:', error);
        } finally {
            fetchAllOcorrencias();
        }
    };

    // Função para atualizar ocorrências
    const handleUpdateOcorrencia = async (occurrence: LimpezasEOcorrencias) => {
        try {
            const data = await apiService.updateOccurrence(occurrence);
            setOccurrences(occurrences.map(oc => (oc.id === data.id ? data : oc)));
            toast.success(data.message || 'Ocorrência atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar ocorrência:', error);
        } finally {
            fetchAllOcorrencias();
        }
    };

    // Função para apagar Ocorrências
    const handleDeleteOcurrences = async (id: string) => {
        try {
            const data = await apiService.deleteOccurrence(id);
            toast.success(data.message || 'Ocorrência apagada com sucesso!');
        } catch (error) {
            console.error('Erro ao apagar ocorrência:', error);
        } finally {
            fetchAllOcorrencias();
        }
    }

    // Função para buscar os contadores
    const fetchAllCounter = async (startDate?: string, endDate?: string) => {
        try {
            const data = await apiService.fetchAllContador(startDate, endDate);
            if (Array.isArray(data)) {
                const convertedData = data.map(item => ({
                    ...item,
                    eventTime: convertStringToDate(item.eventTime)
                }));
                setCounter(convertedData);
            } else {
                setCounter([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados do contador:', error);
        }
    };

    // Busca todas as entidades ao recarregar o componente
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchAllPayTerminal();
            fetchAllPayCoins();
            fetchAllMoveCard();
            fetchAllMoveKiosk();
            fetchAllMoveVP();
            fetchAllManualOpen();
            fetchAllCoin();
            fetchAllLimpezas();
            fetchAllOcorrencias();
            fetchAllCounter();
        }
    }, [localStorage.getItem('token')]);

    // Definindo o valor do contexto
    const contextValue = {
        payTerminal,
        setPayTerminal,
        fetchAllPayTerminal,
        payCoins,
        setPayCoins,
        fetchAllPayCoins,
        moveCard,
        setMoveCard,
        fetchAllMoveCard,
        moveKiosk,
        setMoveKiosk,
        fetchAllMoveKiosk,
        moveVP,
        setMoveVP,
        fetchAllMoveVP,
        manualOpenDoor,
        setManualOpenDoor,
        fetchAllManualOpen,
        getCoins,
        setGetCoins,
        fetchAllCoin,
        handleAddRecolhaMoedeiro,
        handleUpdateRecolhaMoedeiro,
        cleaning,
        setCleaning,
        fetchAllLimpezas,
        handleAddLimpezas,
        handleUpdateCleaning,
        handleDeleteCleaning,
        occurrences,
        setOccurrences,
        fetchAllOcorrencias,
        handleAddOcorrencia,
        handleUpdateOcorrencia,
        handleDeleteOcurrences,
        counter,
        fetchAllCounter,
        listPayments,
        listMovements
    };

    return (
        <KioskContext.Provider value={contextValue}>
            {children}
        </KioskContext.Provider>
    );
};

// Hook para usar o contexto de entidade
export const useKiosk = () => {
    const context = useContext(KioskContext);
    if (!context) {
        throw new Error('useKiosk deve ser usado dentro do KioskProvider');
    }
    return context;
};
