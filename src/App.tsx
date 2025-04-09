import React, { useState, useEffect } from 'react';
import './App.css';
import '98.css/dist/98.css';
import DesktopIcon from './components/DesktopIcon';

function App() {
  const [step, setStep] = useState<number>(0);
  const [showing, setShowing] = useState<boolean>(true);
  const [showingExtra, setShowingExtra] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');

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
    const dialogElement = document.querySelector('.window') as HTMLElement;
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
    setTimeout(() => setShowing(true), 500);
  };

  const handleIconClick = () => {
    if (step === 3) {
      setShowingExtra(true);
    }
  };

  const closeExtraWindow = () => {
    setShowingExtra(false);
  };

  const renderDialogContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="title-bar">
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
            <div className="title-bar">
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
            <div className="title-bar">
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
            <div className="title-bar celebration">
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
    <div className="App">
      <div className={`desktop ${step === 3 ? 'celebration-bg' : ''}`}>
        {/* Desktop Icons */}
        <DesktopIcon 
          icon="my-computer" 
          label="My Computer" 
          onClick={handleIconClick}
          style={{
            top: '20px',
            left: '20px'
          }}
        />
        
        <DesktopIcon 
          icon="heart" 
          label="Birthday Wishes" 
          onClick={handleIconClick}
          style={{
            top: '120px',
            left: '20px'
          }}
        />
        
        {/* Main dialog window */}
        {showing && (
          <div className={`window ${step === 3 ? 'celebration-window' : ''}`}>
            {renderDialogContent()}
          </div>
        )}
        
        {/* Extra window that appears when icon is clicked */}
        {showingExtra && step === 3 && (
          <div className="window extra-window" style={{ top: '30%', left: '60%' }}>
            <div className="title-bar">
              <div className="title-bar-text">Special Message</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={closeExtraWindow}></button>
              </div>
            </div>
            <div className="window-body">
              <p>You're as beautiful as a floppy disk and twice as precious! 💾</p>
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMTBWNTRINTRWMTBIMTBaTTQ0IDIwSDIwVjQwSDQ0VjIwWk0zNCAyNkMyOCAyNiAyOCAzNCAzNCAzNEM0MCAzNCA0MCAyNiAzNCAyNloiIGZpbGw9IiMwMDAwQTAiLz48L3N2Zz4="
                alt="Floppy disk" 
                style={{ width: '64px', height: '64px' }}
              />
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
          <div className="start-button">
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwSDhWOEgwVjBaTTggOEgxNlYxNkg4VjhaTTAgOEg4VjE2SDBWOFpNOCAwSDE2VjhIOFYwWiIgZmlsbD0iI2ZmZmZmZiIvPjwvc3ZnPg==" 
              alt="Windows logo" 
            />
            <span>Start</span>
          </div>
          <div className="taskbar-time">{currentTime}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
