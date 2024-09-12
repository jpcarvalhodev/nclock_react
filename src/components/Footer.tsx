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
        <p>{currentYear} ®NIDGROUP by SISNID - All Rights Reserved</p>
      </footer>
    </ColorProvider>
  );
};