import { forwardRef, useState } from 'react';
import { Button } from 'react-bootstrap';

// Define a interface para as propriedades do CustomOutlineButton
interface CustomOutlineButtonProps {
  onClick?: () => void;
  icon?: string;
  iconSize?: string;
  className?: string;
  disabled?: boolean;
}

export const CustomOutlineButton = forwardRef<HTMLButtonElement, CustomOutlineButtonProps>(
  ({ onClick, icon, iconSize, className, disabled, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    // Define o estilo base para o botão
    const baseStyle = {
      borderColor: '#000000',
      color: '#000000',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      height: '30px',
      width: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };

    // Define o estilo do botão ao passar o mouse
    const hoverStyle = {
      ...baseStyle,
      backgroundColor: '#000000',
      color: '#ffffff',
    };

    // Define o estilo do ícone
    const iconStyle = {
      fontSize: iconSize,
    };

    return (
      <Button
        ref={ref}
        className={className}
        disabled={disabled}
        {...props}
        style={isHovered ? hoverStyle : baseStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {icon && <i className={`bi ${icon}`} style={iconStyle}></i>}
      </Button>
    );
  }
);
