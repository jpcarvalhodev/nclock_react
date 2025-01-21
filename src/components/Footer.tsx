import { useEffect, useState } from "react";

import { useLicense } from "../context/LicenseContext";
import { useNavbar } from "../context/NavbarContext";
import * as apiService from "../api/apiService";

interface FooterProps {
  style?: React.CSSProperties;
}

export const Footer = ({ style }: FooterProps) => {
  const { footerColor } = useNavbar();
  const { license } = useLicense();
  const currentYear = new Date().getFullYear();
  const [entityName, setEntityName] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Função para truncar texto
  const truncateText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  // Verifica se a tela é mobile
  const checkIfMobile = () => {
    setIsMobile(window.innerWidth <= 500);
  };

  // Adicionar listener para redimensionar a janela
  useEffect(() => {
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Atualiza o nome da entidade no footer
  useEffect(() => {
    const storedNif = localStorage.getItem("nif");

    const loggedEntity = Array.isArray(license) ? license.find((item) => item.nif === storedNif) : null;

    const entityNameData = loggedEntity?.name || "Sem Entidade";
    setEntityName(entityNameData);
  }, [license]);

  return (
    <footer className="footer" style={{ backgroundColor: footerColor }}>
      <div>
        <p>{truncateText(entityName, 20)}</p>
      </div>
      <div className={`footer-center ${isMobile ? "footer-center-mobile" : ""}`}>
        <p>{currentYear} ®NSOFTWARES por SISNID<span className="mobile-hide"> -</span><br className="mobile-only" /> Todos os direitos reservados</p>
      </div>
      <div className="footer-right">
        <p>{apiService.version}</p>
      </div>
    </footer>
  );
};