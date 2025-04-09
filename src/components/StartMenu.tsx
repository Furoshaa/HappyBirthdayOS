import React, { useEffect, useState } from 'react';

interface StartMenuProps {
  isOpen: boolean;
  openMyComputer: () => void;
  openBirthdayWindow: () => void;
  openSpecialMessage: () => void;
  openOOIIAA: () => void;
  handleShutdown: () => void;
  closeStartMenu: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  openMyComputer,
  openBirthdayWindow,
  openSpecialMessage,
  openOOIIAA,
  handleShutdown,
  closeStartMenu
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on initial load
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  if (!isOpen) return null;
  
  const handleItemClick = (action: () => void) => {
    action();
    closeStartMenu();
  };
  
  return (
    <div className={`start-menu ${isMobile ? 'start-menu-mobile' : ''}`}>
      <div className="start-menu-sidebar">
        <span>HappyBirthday<span className="win95">OS</span></span>
      </div>
      <div className="start-menu-items">
        <div className="menu-item" onClick={() => handleItemClick(openSpecialMessage)}>
          <img 
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYsMjggTDQsMTYgQzEsMTMgMSw4IDQsNSBDNywyIDEyLDIgMTYsOCBDMjAsMiAyNSwyIDI4LDUgQzMxLDggMzEsMTMgMjgsMTYgTDE2LDI4IFoiIGZpbGw9IiNGRjE0OTMiIC8+PC9zdmc+" 
            alt="Cute_message.exe" 
          />
          <span>Cute_message.exe</span>
        </div>
        <div className="menu-item" onClick={() => handleItemClick(openBirthdayWindow)}>
          <img 
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYsMjggTDQsMTYgQzEsMTMgMSw4IDQsNSBDNywyIDEyLDIgMTYsOCBDMjAsMiAyNSwyIDI4LDUgQzMxLDggMzEsMTMgMjgsMTYgTDE2LDI4IFoiIGZpbGw9IiNmZjY5YjQiIC8+PC9zdmc+" 
            alt="Birthday" 
          />
          <span>Happy_Birthday.exe</span>
        </div>
        <div className="menu-item" onClick={() => handleItemClick(openOOIIAA)}>
          <img 
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIyIiB5PSIzLjUiIHdpZHRoPSIxMiIgaGVpZ2h0PSI5IiBmaWxsPSIjNDE2OUUxIi8+PHJlY3QgeD0iMyIgeT0iNC41IiB3aWR0aD0iMTAiIGhlaWdodD0iNyIgZmlsbD0iIzAwMDAwMCIvPjxwb2x5Z29uIHBvaW50cz0iNiw2IDEwLDggNiwxMCIgZmlsbD0iI0ZGRkZGRiIvPjwvc3ZnPg==" 
            alt="Video" 
          />
          <span>ooiiaa.mp4</span>
        </div>
        <div className="menu-item" onClick={() => handleItemClick(openMyComputer)}>
          <img 
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiAySDUuNVY2SDJWMlpNNi41IDJIMTBWN0g2LjVWMlpNMiA3SDUuNVYxMUgyVjdaTTYuNSA4SDEwVjE0SDYuNVY4Wk0xMSAyVjE0SDE0VjJIMTFaIiBmaWxsPSIjMDAwMEEwIi8+PC9zdmc+" 
            alt="My Computer" 
          />
          <span>My Computer</span>
        </div>
        <div className="separator"></div>
        <div className="menu-item" onClick={() => handleItemClick(handleShutdown)}>
          <img 
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiAyTDE0IDJMMTQgMTRMMiAxNFoiIHN0cm9rZT0iIzAwMCIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik00IDhIMTIiIHN0cm9rZT0iIzAwMCIvPjxwYXRoIGQ9Ik04IDEyVjQiIHN0cm9rZT0iIzAwMCIvPjwvc3ZnPg==" 
            alt="Exit" 
          />
          <span>Shut Down...</span>
        </div>
      </div>
    </div>
  );
};

export default StartMenu; 