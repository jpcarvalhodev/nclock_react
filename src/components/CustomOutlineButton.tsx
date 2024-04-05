import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface CustomOutlineButtonProps {
  onClick: () => void;
  icon?: string;
  iconSize?: string;
}

export const CustomOutlineButton: React.FC<CustomOutlineButtonProps> = ({ onClick, icon, iconSize }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    borderColor: '#0050a0',
    color: '#0050a0',
    backgroundColor: 'transparent',
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
      style={isHovered ? hoverStyle : baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {icon && <i className={`bi ${icon}`} style={iconStyle}></i>}
    </Button>
  );
};