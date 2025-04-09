import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import '98.css/dist/98.css';
import DesktopIcon from './components/DesktopIcon';

function App() {
  const [step, setStep] = useState<number>(0);
  const [showing, setShowing] = useState<boolean>(true);
  const [showingExtra, setShowingExtra] = useState<boolean>(false);
  const [showingMyComputer, setShowingMyComputer] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [startMenuOpen, setStartMenuOpen] = useState<boolean>(false);
  const [shutdownActive, setShutdownActive] = useState<boolean>(false);
  
  // References for draggable windows
  const birthdayWindowRef = useRef<HTMLDivElement>(null);
  const myComputerWindowRef = useRef<HTMLDivElement>(null);
  const specialWindowRef = useRef<HTMLDivElement>(null);
  
  // State to track dragging
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [windowZIndex, setWindowZIndex] = useState({ birthday: 10, myComputer: 10, special: 10 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  const handleYesClick = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handleNoClick = () => {
    // Move the dialog randomly when "No" is clicked
    const dialogElement = document.querySelector('.window.birthday-window') as HTMLElement;
    if (dialogElement) {
      const randomX = Math.floor(Math.random() * (window.innerWidth - 300));
      const randomY = Math.floor(Math.random() * (window.innerHeight - 200));
      dialogElement.style.position = 'absolute';
      dialogElement.style.left = `${randomX}px`;
      dialogElement.style.top = `${randomY}px`;
    }
  };

  const closeWindow = () => {
    setShowing(false);
    // Removed the auto-reopen functionality
  };

  const handleBirthdayIconClick = () => {
    setShowing(true);
  };

  const handleMyComputerClick = () => {
    setShowingMyComputer(true);
  };

  const handleSpecialMessageClick = () => {
    setShowingExtra(true);
  };

  const closeMyComputerWindow = () => {
    setShowingMyComputer(false);
  };

  const closeExtraWindow = () => {
    setShowingExtra(false);
  };

  const toggleStartMenu = () => {
    setStartMenuOpen(prevState => !prevState);
  };

  // Close start menu when clicking elsewhere
  const handleDocumentClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.start-button') && !target.closest('.start-menu')) {
      setStartMenuOpen(false);
    }
  };

  const handleShutdown = () => {
    setStartMenuOpen(false);
    setShutdownActive(true);
    // Reset after showing shutdown screen
    setTimeout(() => {
      setShutdownActive(false);
      setStep(0); // Reset to beginning
    }, 3000);
  };

  // Handle mouse down on title bar to start dragging
  const handleMouseDown = (e: React.MouseEvent, windowName: string) => {
    // Only allow dragging from the title bar (not from buttons)
    if (!(e.target as HTMLElement).closest('.title-bar-controls')) {
      setIsDragging(true);
      setActiveWindow(windowName);
      
      // Update z-index to bring window to front
      setWindowZIndex(prev => ({
        ...prev,
        [windowName]: Math.max(prev.birthday, prev.myComputer, prev.special) + 1
      }));
      
      let windowElement: HTMLDivElement | null = null;
      
      switch (windowName) {
        case 'birthday':
          windowElement = birthdayWindowRef.current;
          break;
        case 'myComputer':
          windowElement = myComputerWindowRef.current;
          break;
        case 'special':
          windowElement = specialWindowRef.current;
          break;
      }
      
      if (windowElement) {
        const rect = windowElement.getBoundingClientRect();
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
        
        // Add dragging class
        windowElement.classList.add('dragging');
      }
      
      e.preventDefault();
    }
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && activeWindow) {
      let windowElement: HTMLDivElement | null = null;
      
      switch (activeWindow) {
        case 'birthday':
          windowElement = birthdayWindowRef.current;
          break;
        case 'myComputer':
          windowElement = myComputerWindowRef.current;
          break;
        case 'special':
          windowElement = specialWindowRef.current;
          break;
      }
      
      if (windowElement) {
        windowElement.style.left = `${e.clientX - dragOffset.x}px`;
        windowElement.style.top = `${e.clientY - dragOffset.y}px`;
        windowElement.style.transform = 'none'; // Remove default centering
      }
    }
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    if (isDragging && activeWindow) {
      let windowElement: HTMLDivElement | null = null;
      
      switch (activeWindow) {
        case 'birthday':
          windowElement = birthdayWindowRef.current;
          break;
        case 'myComputer':
          windowElement = myComputerWindowRef.current;
          break;
        case 'special':
          windowElement = specialWindowRef.current;
          break;
      }
      
      if (windowElement) {
        // Remove dragging class
        windowElement.classList.remove('dragging');
      }
    }
    
    setIsDragging(false);
    setActiveWindow(null);
  };

  // Add mousemove and mouseup event listeners for dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && activeWindow) {
        let windowElement: HTMLDivElement | null = null;
        
        switch (activeWindow) {
          case 'birthday':
            windowElement = birthdayWindowRef.current;
            break;
          case 'myComputer':
            windowElement = myComputerWindowRef.current;
            break;
          case 'special':
            windowElement = specialWindowRef.current;
            break;
        }
        
        if (windowElement) {
          windowElement.style.left = `${e.clientX - dragOffset.x}px`;
          windowElement.style.top = `${e.clientY - dragOffset.y}px`;
          windowElement.style.transform = 'none'; // Remove default centering
        }
      }
    };
    
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setActiveWindow(null);
    };
    
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, activeWindow, dragOffset]);

  const renderDialogContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="title-bar" onMouseDown={(e) => handleMouseDown(e, 'birthday')}>
              <div className="title-bar-text">Important Question</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={closeWindow}></button>
              </div>
            </div>
            <div className="window-body">
              <p>Would you like to have the best birthday ever?</p>
              <div className="button-container">
                <button onClick={handleYesClick}>Yes</button>
                <button onClick={handleNoClick}>No</button>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="title-bar" onMouseDown={(e) => handleMouseDown(e, 'birthday')}>
              <div className="title-bar-text">Another Question</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={closeWindow}></button>
              </div>
            </div>
            <div className="window-body">
              <p>Are you ready for some birthday magic?</p>
              <div className="button-container">
                <button onClick={handleYesClick}>Of course!</button>
                <button onClick={handleNoClick}>Not yet</button>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="title-bar" onMouseDown={(e) => handleMouseDown(e, 'birthday')}>
              <div className="title-bar-text">Final Question</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={closeWindow}></button>
              </div>
            </div>
            <div className="window-body">
              <p>One more click for your surprise?</p>
              <div className="button-container">
                <button onClick={handleYesClick}>Show me!</button>
                <button onClick={handleNoClick}>Wait</button>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="title-bar celebration" onMouseDown={(e) => handleMouseDown(e, 'birthday')}>
              <div className="title-bar-text">🎂 Happy Birthday! 🎂</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={closeWindow}></button>
              </div>
            </div>
            <div className="window-body celebration-body">
              <h1 className="celebration-text">Happy Birthday Baby!!!</h1>
              <div className="celebration-message">
                <p>Wishing you the most amazing day filled with</p>
                <p>joy, laughter and lots of love! ❤️</p>
              </div>
              <div className="button-container">
                <button onClick={() => setStep(0)}>Start Over</button>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App" onClick={handleDocumentClick} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {shutdownActive ? (
        <div className="shutdown-screen">
          <div className="shutdown-text">
            <p>It's now safe to turn off your computer</p>
          </div>
        </div>
      ) : (
        <div className={`desktop ${step === 3 ? 'celebration-bg' : ''}`}>
          {/* Desktop Icons */}
          <DesktopIcon 
            icon="my-computer" 
            label="My Computer" 
            onClick={handleMyComputerClick}
            style={{
              top: '20px',
              left: '20px'
            }}
          />
          
          <DesktopIcon 
            icon="heart" 
            label="Birthday Wishes" 
            onClick={handleBirthdayIconClick}
            style={{
              top: '120px',
              left: '20px'
            }}
          />
          
          {/* Main dialog window */}
          {showing && (
            <div 
              ref={birthdayWindowRef}
              className={`window birthday-window ${step === 3 ? 'celebration-window' : ''}`}
              style={{ zIndex: windowZIndex.birthday }}
            >
              {renderDialogContent()}
            </div>
          )}
          
          {/* My Computer Window */}
          {showingMyComputer && (
            <div 
              ref={myComputerWindowRef}
              className="window my-computer-window"
              style={{ 
                top: '20%', 
                left: '30%', 
                width: '400px', 
                height: '300px',
                zIndex: windowZIndex.myComputer 
              }}
            >
              <div className="title-bar" onMouseDown={(e) => handleMouseDown(e, 'myComputer')}>
                <div className="title-bar-text">My Computer</div>
                <div className="title-bar-controls">
                  <button aria-label="Minimize"></button>
                  <button aria-label="Maximize"></button>
                  <button aria-label="Close" onClick={closeMyComputerWindow}></button>
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
                  <div className="explorer-item">
                    <img 
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiA2SDI2VjI2SDZWNlpNMTAgMTBWMjJIMjJWMTBIMTBaIiBmaWxsPSIjQ0Q0MDBFII8+PC9zdmc+" 
                      alt="CD Drive" 
                    />
                    <div>CD Drive (D:)</div>
                  </div>
                  <div className="explorer-item" onClick={handleBirthdayIconClick}>
                    <img 
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOCA4TDI0IDhMMjQgMjRMOCAyNFoiIGZpbGw9IiNmZjY5YjQiLz48L3N2Zz4=" 
                      alt="Birthday" 
                    />
                    <div>BIRTHDAY.EXE</div>
                  </div>
                </div>
                <div className="status-bar">
                  <div>3 object(s)</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Extra window that appears when icon is clicked */}
          {showingExtra && (
            <div 
              ref={specialWindowRef}
              className="window special-window"
              style={{ 
                top: '30%', 
                left: '60%', 
                width: '400px', 
                height: '300px',
                zIndex: windowZIndex.special 
              }}
            >
              <div className="title-bar" onMouseDown={(e) => handleMouseDown(e, 'special')}>
                <div className="title-bar-text">❤️ Special Message</div>
                <div className="title-bar-controls">
                  <button aria-label="Close" onClick={closeExtraWindow}></button>
                </div>
              </div>
              <div className="window-body special-message-body">
                <h2 className="love-text">I Love You!</h2>
                <p className="love-subtext">You're as beautiful as a floppy disk and twice as precious! 💾</p>
                
                {/* Animated hearts container */}
                <div className="hearts-container">
                  {[...Array(15)].map((_, i) => (
                    <div 
                      key={i} 
                      className="floating-heart" 
                      style={{
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${3 + Math.random() * 7}s`,
                        animationDelay: `${Math.random() * 5}s`,
                        fontSize: `${12 + Math.random() * 20}px`
                      }}
                    >
                      ❤️
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Confetti */}
          {step === 3 && (
            <div className="confetti">
              {[...Array(50)].map((_, i) => (
                <div 
                  key={i} 
                  className="confetti-piece" 
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    backgroundColor: ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493', '#DB7093'][Math.floor(Math.random() * 5)]
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Windows 95 Taskbar */}
          <div className="taskbar">
            <div className="start-button" onClick={toggleStartMenu}>
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwSDhWOEgwVjBaTTggOEgxNlYxNkg4VjhaTTAgOEg4VjE2SDBWOFpNOCAwSDE2VjhIOFYwWiIgZmlsbD0iI2ZmZmZmZiIvPjwvc3ZnPg==" 
                alt="Windows logo" 
              />
              <span>Start</span>
            </div>
            
            {/* Start Menu */}
            {startMenuOpen && (
              <div className="start-menu">
                <div className="start-menu-sidebar">
                  <span>Windows<span className="win95">95</span></span>
                </div>
                <div className="start-menu-items">
                  <div className="menu-item" onClick={() => {setShowing(true); setStartMenuOpen(false);}}>
                    <img 
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMyAzSDEzVjEzSDNWM1pNNiA2SDEwVjEwSDZWNloiIGZpbGw9IiNmZjY5YjQiLz48L3N2Zz4=" 
                      alt="Birthday" 
                    />
                    <span>Birthday Greeting</span>
                  </div>
                  <div className="menu-item" onClick={() => {setShowingMyComputer(true); setStartMenuOpen(false);}}>
                    <img 
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiAySDUuNVY2SDJWMlpNNi41IDJIMTBWN0g2LjVWMlpNMiA3SDUuNVYxMUgyVjdaTTYuNSA4SDEwVjE0SDYuNVY4Wk0xMSAyVjE0SDE0VjJIMTFaIiBmaWxsPSIjMDAwMEEwIi8+PC9zdmc+" 
                      alt="My Computer" 
                    />
                    <span>My Computer</span>
                  </div>
                  <div className="menu-item" onClick={() => {setShowingExtra(true); setStartMenuOpen(false);}}>
                    <img 
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOCAxNEMxMS4zMTM3IDE0IDE0IDExLjMxMzcgMTQgOEMxNCA0LjY4NjI5IDExLjMxMzcgMiA4IDJDNC42ODYyOSAyIDIgNC42ODYyOSAyIDhDMiAxMS4zMTM3IDQuNjg2MjkgMTQgOCAxNFoiIGZpbGw9IiNmZjE0OTMiLz48L3N2Zz4=" 
                      alt="Special" 
                    />
                    <span>Special Message</span>
                  </div>
                  <div className="separator"></div>
                  <div className="menu-item" onClick={handleShutdown}>
                    <img 
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiAyTDE0IDJMMTQgMTRMMiAxNFoiIHN0cm9rZT0iIzAwMCIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik00IDhIMTIiIHN0cm9rZT0iIzAwMCIvPjxwYXRoIGQ9Ik04IDEyVjQiIHN0cm9rZT0iIzAwMCIvPjwvc3ZnPg==" 
                      alt="Exit" 
                    />
                    <span>Shut Down...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="taskbar-time">{currentTime}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
