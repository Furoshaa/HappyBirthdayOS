import React, { CSSProperties } from 'react';

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
  style?: CSSProperties;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick, style }) => {
  return (
    <div className="desktop-icon" onClick={onClick} style={style}>
      <div className="desktop-icon-img">
        {icon === 'my-computer' && (
          <svg width="32" height="32" viewBox="0 0 32 32">
            <rect x="6" y="7" width="20" height="15" fill="#FFFFFF" />
            <rect x="9" y="10" width="14" height="8" fill="#000080" />
            <rect x="10" y="22" width="12" height="3" fill="#C0C0C0" />
          </svg>
        )}
        {icon === 'recycle-bin' && (
          <svg width="32" height="32" viewBox="0 0 32 32">
            <path d="M12,6 L20,6 L20,10 L12,10 Z" fill="#FFFFFF" />
            <path d="M8,10 L24,10 L22,26 L10,26 Z" fill="#FFFFFF" />
            <path d="M10,12 L11,24 M16,12 L16,24 M22,12 L21,24" stroke="#000000" strokeWidth="1" />
          </svg>
        )}
        {icon === 'heart' && (
          <svg width="32" height="32" viewBox="0 0 32 32">
            <path d="M16,28 L4,16 C1,13 1,8 4,5 C7,2 12,2 16,8 C20,2 25,2 28,5 C31,8 31,13 28,16 L16,28 Z" 
                  fill="#FF1493" />
          </svg>
        )}
      </div>
      <div className="desktop-icon-text">{label}</div>
    </div>
  );
};

export default DesktopIcon; 