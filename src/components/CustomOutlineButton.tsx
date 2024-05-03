import { forwardRef, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from 'react-bootstrap';

interface CustomOutlineButtonProps {
  onClick?: () => void;
  icon?: string;
  iconSize?: string;
}

export const CustomOutlineButton = forwardRef<HTMLButtonElement, CustomOutlineButtonProps>(
  ({ onClick, icon, iconSize }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const baseStyle = {
      borderColor: '#0050a0',
      color: '#0050a0',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      height: '30px',
      width: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    const hoverStyle = {
      ...baseStyle,
      backgroundColor: '#0050a0',
      color: '#ffffff',
    };

    const iconStyle = {
      fontSize: iconSize,
    };

    return (
      <Button
        ref={ref}
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