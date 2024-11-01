import { ColorProvider, useColor } from "../context/ColorContext";

interface FooterProps {
  style?: React.CSSProperties;
}

export const Footer = ({ style }: FooterProps) => {
  const { footerColor } = useColor();
  const currentYear = new Date().getFullYear();

  return (
    <ColorProvider>
      <footer className="footer" style={{ backgroundColor: footerColor }}>
        <div className="footer-left">
          <p>{currentYear} ®NIDGROUP por SISNID - Todos os direitos reservados</p>
        </div>
        <div className="footer-right">
          <p>Versão: 1</p>
        </div>
      </footer>
    </ColorProvider>
  );
};