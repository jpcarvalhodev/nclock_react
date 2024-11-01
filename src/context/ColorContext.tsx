import { createContext, useContext, useState, ReactNode } from 'react';

// Defina a interface para o contexto
interface ColorContextProps {
  navbarColor: string;
  footerColor: string;
  setNavbarColor: (color: string) => void;
  setFooterColor: (color: string) => void;
}

// Crie o contexto com valores padrões
const ColorContext = createContext<ColorContextProps>({
  navbarColor: '#000000',
  footerColor: '#000000',
  setNavbarColor: () => {},
  setFooterColor: () => {}
});

// Provedor de contexto
export const ColorProvider = ({ children }: { children: ReactNode }) => {
  const [navbarColor, setNavbarColor] = useState('#000000');
  const [footerColor, setFooterColor] = useState('#000000');

  return (
    <ColorContext.Provider value={{ navbarColor, footerColor, setNavbarColor, setFooterColor }}>
      {children}
    </ColorContext.Provider>
  );
};

// Hook para facilitar o acesso ao contexto
export const useColor = () => useContext(ColorContext);