import React from 'react';

interface ConfettiProps {
  isMobile: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ isMobile }) => {
  return (
    <div className="confetti">
      {[...Array(isMobile ? 30 : 50)].map((_, i) => (
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
  );
};

export default Confetti; 