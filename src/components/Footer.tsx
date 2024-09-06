import '../css/PagesStyles.css';

// Define as propriedades do componente
interface FooterProps {
  color?: string;
}

// Define o componente
export const Footer = ({ color }: FooterProps) => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" style={{ backgroundColor: color }}>
      <p className='footer-line1'>{currentYear} ®Nclock by SISNID - All Rights Reserved</p>
    </footer>
  );
};