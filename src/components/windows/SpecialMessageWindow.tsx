import React from 'react';

interface SpecialMessageWindowProps {
  closeWindow: () => void;
  windowRef: React.RefObject<HTMLDivElement | null>;
  zIndex: number;
  handleMouseDown: (e: React.MouseEvent, windowName: string) => void;
  handleTouchStart: (e: React.TouchEvent, windowName: string) => void;
  isMobile: boolean;
  focusWindow: () => void;
}

const SpecialMessageWindow: React.FC<SpecialMessageWindowProps> = ({
  closeWindow,
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
      className="window special-window"
      style={{ 
        top: isMobile ? '60%' : '30%', 
        left: isMobile ? '50%' : '60%', 
        width: isMobile ? '90%' : '600px', 
        height: isMobile ? '300px' : '400px',
        minWidth: isMobile ? '300px' : '600px',
        maxWidth: isMobile ? '90%' : '600px',
        zIndex: zIndex 
      }}
      onClick={focusWindow}
    >
      <div className="title-bar" 
        onMouseDown={(e) => handleMouseDown(e, 'special')}
        onTouchStart={(e) => handleTouchStart(e, 'special')}>
        <div className="title-bar-text">❤️ Special Message</div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={closeWindow}></button>
        </div>
      </div>
      <div className="window-body special-message-body">
        <h2 className="love-text">I Love You!</h2>
        <p className="love-subtext">I hope you have a great birthday! <br/> I love you so much! 💖</p>
        
        {/* Animated hearts container */}
        <div className="hearts-container">
          {[...Array(isMobile ? 25 : 50)].map((_, i) => (
            <div 
              key={i} 
              className="floating-heart" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 6}s`,
                animationDelay: `${Math.random() * 4}s`,
                fontSize: `${12 + Math.random() * 24}px`
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialMessageWindow; 