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
            <path d="M16,28 C16,28 4,21 4,12 C4,6 8,4 12,4 C14,4 16,6 16,6 C16,6 18,4 20,4 C24,4 28,6 28,12 C28,21 16,28 16,28 Z" 
                  fill="#FF1493" />
          </svg>
        )}
      </div>
      <div className="desktop-icon-text">{label}</div>
    </div>
  );
};

export default DesktopIcon; 