import React from 'react';

interface MyComputerWindowProps {
  closeWindow: () => void;
  handleBirthdayIconClick: () => void;
  handleSpecialMessageClick: () => void;
  windowRef: React.RefObject<HTMLDivElement | null>;
  zIndex: number;
  handleMouseDown: (e: React.MouseEvent, windowName: string) => void;
  handleTouchStart: (e: React.TouchEvent, windowName: string) => void;
  isMobile: boolean;
}

const MyComputerWindow: React.FC<MyComputerWindowProps> = ({
  closeWindow,
  handleBirthdayIconClick,
  handleSpecialMessageClick,
  windowRef,
  zIndex,
  handleMouseDown,
  handleTouchStart,
  isMobile
}) => {
  return (
    <div 
      ref={windowRef}
      className="window my-computer-window"
      style={{ 
        top: isMobile ? '60px' : '20%', 
        left: isMobile ? '5%' : '30%', 
        width: isMobile ? '90%' : '400px', 
        height: isMobile ? '60vh' : '300px',
        zIndex: zIndex 
      }}
    >
      <div className="title-bar" 
        onMouseDown={(e) => handleMouseDown(e, 'myComputer')}
        onTouchStart={(e) => handleTouchStart(e, 'myComputer')}>
        <div className="title-bar-text">My Computer</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close" onClick={closeWindow}></button>
        </div>
      </div>
      <div className="window-body my-computer-body">
        <div className="file-explorer">
          <div className="explorer-item">
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCA0SDI4VjI4SDRWNFpNOCA4VjI0SDI0VjhIOFoiIGZpbGw9IiMwMDAwQTAiLz48L3N2Zz4=" 
              alt="Hard Disk" 
            />
            <div>Local Disk (C:)</div>
          </div>
          <div className="explorer-item" onClick={handleBirthdayIconClick}>
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYsMjggTDQsMTYgQzEsMTMgMSw4IDQsNSBDNywyIDEyLDIgMTYsOCBDMjAsMiAyNSwyIDI4LDUgQzMxLDggMzEsMTMgMjgsMTYgTDE2LDI4IFoiIGZpbGw9IiNmZjY5YjQiIC8+PC9zdmc+" 
              alt="Birthday" 
            />
            <div>HAPPY BIRTHDAY .EXE</div>
          </div>
          
          <div className="explorer-item" onClick={handleSpecialMessageClick}>
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYsMjggTDQsMTYgQzEsMTMgMSw4IDQsNSBDNywyIDEyLDIgMTYsOCBDMjAsMiAyNSwyIDI4LDUgQzMxLDggMzEsMTMgMjgsMTYgTDE2LDI4IFoiIGZpbGw9IiNGRjE0OTMiIC8+PC9zdmc+" 
              alt="Special Message" 
            />
            <div>SPECIAL MESSAGE .EXE</div>
          </div>
        </div>
        <div className="status-bar">
          <div>4 object(s)</div>
        </div>
      </div>
    </div>
  );
};

export default MyComputerWindow; 