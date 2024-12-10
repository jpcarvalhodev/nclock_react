import { useEffect, useState } from "react";
import { ColorProvider, useColor } from "../context/ColorContext";
import { useEntity } from "../context/EntityContext";
import * as apiService from "../helpers/apiService";

interface FooterProps {
  style?: React.CSSProperties;
}

export const Footer = ({ style }: FooterProps) => {
  const { footerColor } = useColor();
  const { entity } = useEntity();
  const currentYear = new Date().getFullYear();
  const [entityName, setEntityName] = useState<string>("");

  // Função para truncar texto
  const truncateText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  // Atualiza o nome da entidade no footer
  useEffect(() => {
    const storedNif = localStorage.getItem("nif");

    const loggedEntity = Array.isArray(entity)
      ? entity.find((item) => item.nif === Number(storedNif))
      : null;

    const entityNameData = loggedEntity?.nome || "Sem Entidade";
    setEntityName(entityNameData);
  }, [entity]);

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