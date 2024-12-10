import { useEffect, useState } from "react";
import { ColorProvider, useColor } from "../context/ColorContext";
import * as apiService from "../helpers/apiService";
import { useLicense } from "../context/LicenseContext";

interface FooterProps {
  style?: React.CSSProperties;
}

export const Footer = ({ style }: FooterProps) => {
  const { footerColor } = useColor();
  const { license } = useLicense();
  const currentYear = new Date().getFullYear();
  const [entityName, setEntityName] = useState<string>("");

  // Função para truncar texto
  const truncateText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  // Atualiza o nome da entidade no footer
  useEffect(() => {
    const storedNif = localStorage.getItem("nif");

    const loggedEntity = Array.isArray(license) ? license.find((item) => item.nif === storedNif) : null;

    const entityNameData = loggedEntity?.name || "Sem Entidade";
    setEntityName(entityNameData);
  }, [license]);

  return (
    <ColorProvider>
      <footer className="footer" style={{ backgroundColor: footerColor }}>
        <div>
          <p>{truncateText(entityName, 20)}</p>
        </div>
        <div className="footer-center">
          <p>{currentYear} ®NIDGROUP por SISNID - Todos os direitos reservados</p>
        </div>
        <div className="footer-right">
          <p>{apiService.version}</p>
        </div>
      </footer>
    </ColorProvider>
  );
};