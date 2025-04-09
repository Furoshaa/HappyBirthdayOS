import React from 'react';

interface BirthdayWindowProps {
  step: number;
  closeWindow: () => void;
  handleYesClick: () => void;
  handleNoClick: () => void;
  windowRef: React.RefObject<HTMLDivElement | null>;
  zIndex: number;
  handleMouseDown: (e: React.MouseEvent, windowName: string) => void;
  handleTouchStart: (e: React.TouchEvent, windowName: string) => void;
  isMobile: boolean;
  focusWindow: () => void;
}

const BirthdayWindow: React.FC<BirthdayWindowProps> = ({ 
  step, 
  closeWindow, 
  handleYesClick, 
  handleNoClick, 
  windowRef, 
  zIndex,
  handleMouseDown,
  handleTouchStart,
  isMobile,
  focusWindow
}) => {
  const renderDialogContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="title-bar" 
              onMouseDown={(e) => handleMouseDown(e, 'birthday')}
              onTouchStart={(e) => handleTouchStart(e, 'birthday')}>
              <div className="title-bar-text">Important Question</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={closeWindow}></button>
              </div>
            </div>
            <div className="window-body">
              <p>Are you ready for some birthday magic?</p>
              <div className="button-container">
                <button onClick={handleYesClick}>Yes !</button>
                <button onClick={handleNoClick}>Nope</button>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="title-bar" 
              onMouseDown={(e) => handleMouseDown(e, 'birthday')}
              onTouchStart={(e) => handleTouchStart(e, 'birthday')}>
              <div className="title-bar-text">Another Question</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={closeWindow}></button>
              </div>
            </div>
            <div className="window-body">
              <p>Do you love me as much as I love you?</p>
              <div className="button-container">
                <button onClick={handleYesClick}>Of course!</button>
                <button onClick={handleNoClick}>No..</button>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="title-bar" 
              onMouseDown={(e) => handleMouseDown(e, 'birthday')}
              onTouchStart={(e) => handleTouchStart(e, 'birthday')}>
              <div className="title-bar-text">Final Question</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={closeWindow}></button>
              </div>
            </div>
            <div className="window-body">
              <p>One more click for your surprise?</p>
              <div className="button-container">
                <button onClick={handleYesClick}>Show me!</button>
                <button onClick={handleNoClick}>Wait no</button>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="title-bar celebration" 
              onMouseDown={(e) => handleMouseDown(e, 'birthday')}
              onTouchStart={(e) => handleTouchStart(e, 'birthday')}>
              <div className="title-bar-text">🎂 Happy Birthday! 🎂</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={closeWindow}></button>
              </div>
            </div>
            <div className="window-body celebration-body">
              <h1 className="celebration-text">Happy Birthday Baby!!!</h1>
              <div className="celebration-message">
                <p>I wish you a happy birthday! May your life</p>
                <p>be filled with joy, success, and lots of love! ❤️</p>
              </div>
              <div className="button-container">
                <button onClick={closeWindow}>Close</button>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={windowRef}
      className={`window birthday-window ${step === 3 ? 'celebration-window' : ''}`}
      style={{ 
        zIndex: zIndex,
        top: isMobile ? '45%' : '45%', 
        left: isMobile ? '50%' : '50%',
        width: isMobile ? '90%' : '400px'
      }}
      onClick={focusWindow}
    >
      {renderDialogContent()}
    </div>
  );
};

export default BirthdayWindow; 