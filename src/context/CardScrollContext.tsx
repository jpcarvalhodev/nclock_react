import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

// Defina a interface para o contexto
interface CardScrollContextProps {
    scrollPosition: number;
    setScrollPosition: (position: number) => void;
}

// Crie o contexto com valores padrões
const CardScrollContext = createContext<CardScrollContextProps>({
    scrollPosition: 0,
    setScrollPosition: () => { }
});

// Provedor de contexto
export const CardScrollProvider = ({ children }: { children: ReactNode }) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    // Carregar posição inicial do scroll do armazenamento local
    useEffect(() => {
        const savedScrollPosition = localStorage.getItem('scrollPosition');
        if (savedScrollPosition) {
            setScrollPosition(parseInt(savedScrollPosition, 10));
        }
    }, []);

    // Salvar posição do scroll no armazenamento local sempre que ela mudar
    useEffect(() => {
        localStorage.setItem('scrollPosition', scrollPosition.toString());
    }, [scrollPosition]);

    return (
        <CardScrollContext.Provider value={{ scrollPosition, setScrollPosition }}>
            {children}
        </CardScrollContext.Provider>
    );
};

// Hook para facilitar o acesso ao contexto
export const useCardScroll = () => useContext(CardScrollContext);