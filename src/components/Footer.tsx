import { ColorProvider, useColor } from "../context/ColorContext";
import { useEntity } from "../context/EntityContext";

interface FooterProps {
  style?: React.CSSProperties;
}

export const Footer = ({ style }: FooterProps) => {
  const { footerColor } = useColor();
  const { entity } = useEntity();
  const currentYear = new Date().getFullYear();

  // Função para truncar texto
  const truncateText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  // Busca o nome da entidade
  const entityName = Array.isArray(entity) ? entity.filter((item) => item.nome) : [];

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