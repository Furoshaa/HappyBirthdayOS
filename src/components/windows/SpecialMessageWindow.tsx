import React from 'react';

interface SpecialMessageWindowProps {
  closeWindow: () => void;
  windowRef: React.RefObject<HTMLDivElement | null>;
  zIndex: number;
  handleMouseDown: (e: React.MouseEvent, windowName: string) => void;
  handleTouchStart: (e: React.TouchEvent, windowName: string) => void;
  isMobile: boolean;
}

const SpecialMessageWindow: React.FC<SpecialMessageWindowProps> = ({
  closeWindow,
  windowRef,
  zIndex,
  handleMouseDown,
  handleTouchStart,
  isMobile
}) => {
  return (
    <div 
      ref={windowRef}
      className="window special-window"
      style={{ 
        top: isMobile ? '60px' : '30%', 
        left: isMobile ? '5%' : '60%', 
        width: isMobile ? '90%' : '400px', 
        height: isMobile ? 'auto' : '300px',
        zIndex: zIndex 
      }}
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
        <p className="love-subtext">I hope you have a great birthday! I love you so much! 💖</p>
        
        {/* Animated hearts container */}
        <div className="hearts-container">
          {[...Array(isMobile ? 8 : 15)].map((_, i) => (
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
  );
};

export default SpecialMessageWindow; 