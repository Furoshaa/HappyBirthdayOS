import React from 'react';
import DesktopIcon from './DesktopIcon';

interface DesktopProps {
  children: React.ReactNode;
  step: number;
  isMobile: boolean;
  handleMyComputerClick: () => void;
  handleBirthdayIconClick: () => void;
  handleSpecialMessageClick: () => void;
  handleOOIIAAClick: () => void;
}

const Desktop: React.FC<DesktopProps> = ({ 
  children, 
  step, 
  isMobile, 
  handleMyComputerClick, 
  handleBirthdayIconClick,
  handleSpecialMessageClick,
  handleOOIIAAClick
}) => {
  const getBackgroundClass = () => {
    if (step === 3) {
      return 'celebration-bg';
    } else if (step >= 1) {
      return 'cute-bg';
    }
    return '';
  };
  
  return (
    <div className={`desktop ${getBackgroundClass()}`}>
      {/* Desktop Icons */}
      <DesktopIcon 
        icon="my-computer" 
        label="My Computer" 
        onClick={handleMyComputerClick} 
        style={{ top: isMobile ? '10px' : '20px', left: isMobile ? '10px' : '20px' }}
      />
      <DesktopIcon 
        icon="heart" 
        label="Happy_Birthday.exe" 
        onClick={handleBirthdayIconClick} 
        style={{ top: isMobile ? '100px' : '120px', left: isMobile ? '10px' : '20px' }}
      />
      <DesktopIcon 
        icon="heart" 
        label="Cute_message.exe" 
        onClick={handleSpecialMessageClick} 
        style={{ top: isMobile ? '190px' : '220px', left: isMobile ? '10px' : '20px' }}
      />
      <DesktopIcon 
        icon="video" 
        label="ooiiaa.mp4" 
        onClick={handleOOIIAAClick} 
        style={{ top: isMobile ? '280px' : '320px', left: isMobile ? '10px' : '20px' }}
      />
      
      {children}
    </div>
  );
};

export default Desktop; 