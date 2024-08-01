import '../css/PagesStyles.css';

// Define o componente
export const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className='footer-line1'>{currentYear} ®Nclock by SISNID - All Rights Reserved</p>
    </footer>
  );
};