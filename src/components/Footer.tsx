import { useEffect, useState } from "react";
import { ColorProvider, useColor } from "../context/ColorContext";
import { Entity } from "../helpers/Types";
import * as apiService from "../helpers/apiService";

interface FooterProps {
  style?: React.CSSProperties;
}

export const Footer = ({ style }: FooterProps) => {
  const { footerColor } = useColor();
  const currentYear = new Date().getFullYear();
  const [entityName, setEntityName] = useState<Entity[]>([]);

  // useEffect para carregar o nome da entidade
  useEffect(() => {
    fetchEntityName();
  }, []);

  // Busca o nome da entidade
  const fetchEntityName = async () => {
    try {
      const data = await apiService.fetchAllCompanyConfig();
      setEntityName(data);
    } catch (error) {
      console.error('Erro ao buscar o nome da entidade:', error);
    }
  }

  // Função para truncar texto
  const truncateText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  return (
    <ColorProvider>
      <footer className="footer" style={{ backgroundColor: footerColor }}>
        <div>
          <p>{entityName.length > 0 ? truncateText(entityName[0].nome, 20) : 'Sem Entidade'}</p>
        </div>
        <div className="footer-center">
          <p>{currentYear} ®NIDGROUP por SISNID - Todos os direitos reservados</p>
        </div>
        <div className="footer-right">
          <p>Versão: 1.0.0.0</p>
        </div>
      </footer>
    </ColorProvider>
  );
};