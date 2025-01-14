import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import * as apiService from '../api/apiService';
import { Counter, KioskTransactionCard, KioskTransactionMB, LimpezasEOcorrencias, MBDeviceStatus, ManualOpenDoor, NewTransactionCard, RecolhaMoedeiroEContador } from '../types/Types';

import { useTerminals } from './TerminalsContext';

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
    handleAddNewMoveCard: (card: NewTransactionCard) => void;
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
    fetchAllCoin: () => Promise<RecolhaMoedeiroEContador[]>;
    handleAddRecolhaMoedeiro: (recolhaMoedeiro: RecolhaMoedeiroEContador) => void;
    handleUpdateRecolhaMoedeiro: (recolhaMoedeiro: RecolhaMoedeiroEContador) => void;
    handleDeleteRecolhaMoedeiro: (id: string[]) => void;
    cleaning: LimpezasEOcorrencias[];
    setCleaning: (cleaning: LimpezasEOcorrencias[]) => void;
    fetchAllLimpezas: () => void;
    handleAddLimpezas: (limpezas: LimpezasEOcorrencias) => void;
    handleUpdateCleaning: (limpezas: LimpezasEOcorrencias) => void;
    handleDeleteCleaning: (id: string[]) => void;
    occurrences: LimpezasEOcorrencias[];
    setOccurrences: (occurrences: LimpezasEOcorrencias[]) => void;
    fetchAllOcorrencias: () => void;
    handleAddOcorrencia: (occurrence: LimpezasEOcorrencias) => void;
    handleUpdateOcorrencia: (occurrence: LimpezasEOcorrencias) => void;
    handleDeleteOcurrences: (id: string[]) => void;
    counter: Counter[];
    fetchAllCounter: (startDate?: string, endDate?: string) => void;
    totalPayments: KioskTransactionMB[];
    setTotalPayments: (totalPayments: KioskTransactionMB[]) => void;
    totalMovements: KioskTransactionCard[];
    setTotalMovements: (totalMovements: KioskTransactionCard[]) => void;
    alerts: MBDeviceStatus[];
    setAlerts: (alerts: MBDeviceStatus[]) => void;
    fetchAllTasks: () => void;
    unifyTotalPayments: () => void;
    unifyTotalMovements: () => void;
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
    const [alerts, setAlerts] = useState<MBDeviceStatus[]>([]);
    const [counter, setCounter] = useState<Counter[]>([]);
    const [totalPayments, setTotalPayments] = useState<KioskTransactionMB[]>([]);
    const [totalMovements, setTotalMovements] = useState<KioskTransactionCard[]>([]);
    const eventDoorId2 = '2'
    const eventDoorId3 = '3'
    const eventDoorId4 = '4'
    const tipo = 1;
    const tipo2 = 2;

    // Função para unificar os pagamentos
    const unifyTotalPayments = () => {
        const combinedData = payTerminal.concat(payCoins);
        setTotalPayments(combinedData);
    }

    // Função para unificar os movimentos
    const unifyTotalMovements = () => {
        const combinedData = moveCard.concat(moveKiosk).concat(moveVP);
        setTotalMovements(combinedData);
    }

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
            console.error('Erro ao buscar os dados de movimentos de torniquete:', error);
            setMoveCard([]);
        }
    };

    // Função para adicionar movimento
    const handleAddNewMoveCard = async (card: NewTransactionCard) => {
        try {
            const data = await apiService.addKioskTransaction(card);
            toast.success(data.message || 'Movimento de torniquete adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar novo movimento de torniquete:', error);
        } finally {
            fetchAllMoveCard();
        }
    }

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
    const fetchAllCoin = async (): Promise<RecolhaMoedeiroEContador[]> => {
        try {
            const data = await apiService.fetchRecolhasMoedeiro();
            if (Array.isArray(data)) {
                setGetCoins(data);
                return data;
            } else {
                setGetCoins([]);
                return [];
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de recolha do moedeiro:', error);
        }
        return [];
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

    // Função para apagar recolha do moedeiro
    const handleDeleteRecolhaMoedeiro = async (id: string[]) => {
        try {
            const data = await apiService.deleteRecolhaMoedeiro(id);
            toast.success(data.message || 'Recolha do moedeiro apagada com sucesso!');
        } catch (error) {
            console.error('Erro ao apagar a Recolha do moedeiro:', error);
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
    const handleDeleteCleaning = async (id: string[]) => {
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
    const handleDeleteOcurrences = async (id: string[]) => {
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

    // Função para buscar os alertas
    const fetchAllTasks = async () => {
        try {
            const data = await apiService.fetchAllAlerts();
            if (Array.isArray(data)) {
                setAlerts(data);
            } else {
                setAlerts([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de alertas:', error);
        }
    };

    // Atualiza os dados ao mudar a lista de terminais
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && devices.length > 0) {
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
            fetchAllTasks();
        }
    }, [devices]);

    // Unifica os pagamentos e movimentos
    useEffect(() => {
        if (payTerminal.length > 0 || payCoins.length > 0) {
            unifyTotalPayments();
        }
    }, [payTerminal, payCoins]);

    useEffect(() => {
        if (moveCard.length > 0 || moveKiosk.length > 0) {
            unifyTotalMovements();
        }
    }, [moveCard, moveKiosk]);

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
        handleAddNewMoveCard,
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
        handleDeleteRecolhaMoedeiro,
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
        totalPayments,
        setTotalPayments,
        totalMovements,
        setTotalMovements,
        alerts,
        setAlerts,
        fetchAllTasks,
        unifyTotalPayments,
        unifyTotalMovements
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
