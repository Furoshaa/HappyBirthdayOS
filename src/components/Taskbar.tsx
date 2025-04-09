import React from 'react';

interface TaskbarProps {
  toggleStartMenu: () => void;
  startMenuOpen: boolean;
  currentTime: string;
  openWindows: {
    birthday: boolean;
    myComputer: boolean;
    special: boolean;
  };
  activeWindow: string | null;
  setActiveWindow: (window: string) => void;
  bringWindowToFront: (window: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
  toggleStartMenu,
  startMenuOpen,
  currentTime,
  openWindows,
  activeWindow,
  setActiveWindow,
  bringWindowToFront
}) => {
  
  // Handle clicking on a taskbar button
  const handleTaskbarButtonClick = (windowName: string) => {
    bringWindowToFront(windowName);
    setActiveWindow(windowName);
  };
  
  return (
    <div className="taskbar">
      <div className="start-button" onClick={toggleStartMenu}>
        <img 
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOCwxNCBMMiw4IEMwLjUsNi41IDAuNSw0IDIsMi41IEMzLjUsMSA2LDEgOCw0IEMxMCwxIDEyLjUsMSAxNCwyLjUgQzE1LjUsNCAxNS41LDYuNSAxNCw4IEw4LDE0IFoiIGZpbGw9IiNGRkZGRkYiIC8+PC9zdmc+" 
          alt="Heart logo" 
        />
        <span>Start</span>
      </div>
      
      {/* Taskbar buttons for open windows */}
      <div className="taskbar-buttons">
        {openWindows.birthday && (
          <div 
            className={`taskbar-button ${activeWindow === 'birthday' ? 'active' : ''}`}
            onClick={() => handleTaskbarButtonClick('birthday')}
          >
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOCwxNCBMMiw4IEMwLjUsNi41IDAuNSw0IDIsMi41IEMzLjUsMSA2LDEgOCw0IEMxMCwxIDEyLjUsMSAxNCwyLjUgQzE1LjUsNCAxNS41LDYuNSAxNCw4IEw4LDE0IFoiIGZpbGw9IiNmZjY5YjQiIC8+PC9zdmc+" 
              alt="Birthday" 
            />
            <span>Birthday</span>
          </div>
        )}
        
        {openWindows.myComputer && (
          <div 
            className={`taskbar-button ${activeWindow === 'myComputer' ? 'active' : ''}`}
            onClick={() => handleTaskbarButtonClick('myComputer')}
          >
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiAySDUuNVY2SDJWMlpNNi41IDJIMTBWN0g2LjVWMlpNMiA3SDUuNVYxMUgyVjdaTTYuNSA4SDEwVjE0SDYuNVY4Wk0xMSAyVjE0SDE0VjJIMTFaIiBmaWxsPSIjMDAwMEEwIi8+PC9zdmc+" 
              alt="My Computer" 
            />
            <span>My Computer</span>
          </div>
        )}
        
        {openWindows.special && (
          <div 
            className={`taskbar-button ${activeWindow === 'special' ? 'active' : ''}`}
            onClick={() => handleTaskbarButtonClick('special')}
          >
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOCwxNCBMMiw4IEMwLjUsNi41IDAuNSw0IDIsMi41IEMzLjUsMSA2LDEgOCw0IEMxMCwxIDEyLjUsMSAxNCwyLjUgQzE1LjUsNCAxNS41LDYuNSAxNCw4IEw4LDE0IFoiIGZpbGw9IiNGRjE0OTMiIC8+PC9zdmc+" 
              alt="Special Message" 
            />
            <span>Special Message</span>
          </div>
        )}
      </div>
      
      <div className="taskbar-time">{currentTime}</div>
    </div>
  );
};

export default Taskbar; 