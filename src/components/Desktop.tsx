import React from 'react';
import DesktopIcon from './DesktopIcon';

interface DesktopProps {
  step: number;
  isMobile: boolean;
  handleMyComputerClick: () => void;
  handleBirthdayIconClick: () => void;
  handleSpecialMessageClick: () => void;
  children: React.ReactNode;
}

const Desktop: React.FC<DesktopProps> = ({
  step,
  isMobile,
  handleMyComputerClick,
  handleBirthdayIconClick,
  handleSpecialMessageClick,
  children
}) => {
  return (
    <div className={`desktop ${step === 3 ? 'celebration-bg' : 'cute-bg'}`}>
      {/* Desktop Icons */}
      <DesktopIcon 
        icon="my-computer" 
        label="My Computer" 
        onClick={handleMyComputerClick}
        style={{
          top: '20px',
          left: isMobile ? '10px' : '20px'
        }}
      />
      
      <DesktopIcon 
        icon="heart" 
        label="HAPPY BIRTHDAY .EXE" 
        onClick={handleBirthdayIconClick}
        style={{
          top: isMobile ? '90px' : '120px',
          left: isMobile ? '10px' : '20px'
        }}
      />
      
      <DesktopIcon 
        icon="heart" 
        label="SPECIAL MESSAGE .EXE" 
        onClick={handleSpecialMessageClick}
        style={{
          top: isMobile ? '160px' : '220px',
          left: isMobile ? '10px' : '20px'
        }}
      />
      
      {/* Render all children (windows, confetti, etc.) */}
      {children}
    </div>
  );
};

export default Desktop; 