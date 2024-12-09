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

  // Obtém o NIF armazenado no localStorage
  const storedNif = localStorage.getItem("nif");

  // Busca o nome da entidade correspondente ao NIF
  const loggedEntity = Array.isArray(entity)
  ? entity.find((item) => item.nif === Number(storedNif))
  : null;

  // Busca o nome da entidade
  const entityName = loggedEntity?.nome || "Sem Entidade";

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
          <p>Versão: 1.0.0.0</p>
        </div>
      </footer>
    </ColorProvider>
  );
};