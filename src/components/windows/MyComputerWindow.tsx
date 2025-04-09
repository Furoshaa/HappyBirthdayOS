import React from 'react';

interface MyComputerWindowProps {
  closeWindow: () => void;
  handleBirthdayIconClick: () => void;
  handleSpecialMessageClick: () => void;
  handleOOIIAAClick: () => void;
  windowRef: React.RefObject<HTMLDivElement | null>;
  zIndex: number;
  handleMouseDown: (e: React.MouseEvent, windowName: string) => void;
  handleTouchStart: (e: React.TouchEvent, windowName: string) => void;
  isMobile: boolean;
  focusWindow: () => void;
}

const MyComputerWindow: React.FC<MyComputerWindowProps> = ({
  closeWindow,
  handleBirthdayIconClick,
  handleSpecialMessageClick,
  handleOOIIAAClick,
  windowRef,
  zIndex,
  handleMouseDown,
  handleTouchStart,
  isMobile,
  focusWindow
}) => {
  return (
    <div 
      ref={windowRef}
      className="window my-computer-window"
      style={{ 
        top: isMobile ? '40%' : '20%', 
        left: isMobile ? '50%' : '30%', 
        width: isMobile ? '70%' : '400px', 
        height: isMobile ? '40%' : '300px',
        minWidth: isMobile ? '70%' : '400px',
        maxWidth: isMobile ? '70%' : '400px',
        zIndex: zIndex 
      }}
      onClick={focusWindow}
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
            <div>HappyBirthday.exe</div>
          </div>
          
          <div className="explorer-item" onClick={handleSpecialMessageClick}>
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYsMjggTDQsMTYgQzEsMTMgMSw4IDQsNSBDNywyIDEyLDIgMTYsOCBDMjAsMiAyNSwyIDI4LDUgQzMxLDggMzEsMTMgMjgsMTYgTDE2LDI4IFoiIGZpbGw9IiNGRjE0OTMiIC8+PC9zdmc+" 
              alt="Special Message" 
            />
            <div>Cute_message.exe</div>
          </div>
          <div className="explorer-item" onClick={handleOOIIAAClick}>
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSI0IiB5PSI3IiB3aWR0aD0iMjQiIGhlaWdodD0iMTgiIGZpbGw9IiM0MTY5RTEiLz48cmVjdCB4PSI2IiB5PSI5IiB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIGZpbGw9IiMwMDAwMDAiLz48cG9seWdvbiBwb2ludHM9IjEyLDEyIDIwLDE2IDEyLDIwIiBmaWxsPSIjRkZGRkZGIi8+PC9zdmc+" 
              alt="OOIIAA Video" 
            />
            <div>ooiiaa.mp4</div>
          </div>
        </div>
        <div className="status-bar">
          <div>3 object(s)</div>
        </div>
      </div>
    </div>
  );
};

export default MyComputerWindow; 