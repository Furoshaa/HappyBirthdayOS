import React, { useRef } from 'react';
import catVideo from '../videos/oia_cat_happybirthday.mp4';

interface OOIIAAWindowProps {
  closeWindow: () => void;
  windowRef: React.RefObject<HTMLDivElement | null>;
  zIndex: number;
  handleMouseDown: (e: React.MouseEvent, windowName: string) => void;
  handleTouchStart: (e: React.TouchEvent, windowName: string) => void;
  isMobile: boolean;
  focusWindow: () => void;
}

const OOIIAAWindow: React.FC<OOIIAAWindowProps> = ({
  closeWindow,
  windowRef,
  zIndex,
  handleMouseDown,
  handleTouchStart,
  isMobile,
  focusWindow
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showControls, setShowControls] = React.useState(false);

  // Play video when component mounts
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video playback failed:", error);
      });
    }
    
    setShowControls(false)
  }, []);

  return (
    <div 
      ref={windowRef}
      className="window ooiiaa-window"
      style={{ 
        top: isMobile ? '65%' : '60%', 
        left: isMobile ? '50%' : '70%', 
        width: isMobile ? '90%' : '1000px', 
        height: isMobile ? '213px' : 'auto',
        minWidth: isMobile ? '300px' : '1000px',
        maxWidth: isMobile ? '90%' : '1000px',
        maxHeight: isMobile ? '213px' : 'none',
        zIndex: zIndex 
      }}
      onClick={focusWindow}
    >
      <div className="title-bar" 
        onMouseDown={(e) => handleMouseDown(e, 'ooiiaa')}
        onTouchStart={(e) => handleTouchStart(e, 'ooiiaa')}>
        <div className="title-bar-text">OOIIAA</div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={closeWindow}></button>
        </div>
      </div>
      <div className="window-body ooiiaa-body">
        <video 
          ref={videoRef}
          controls={showControls}
          autoPlay
          loop
          playsInline
          width="100%"
          className="ooiiaa-video"
          disablePictureInPicture
          controlsList="nodownload"
          onClick={() => setShowControls(true)} // Show controls on click
        >
          <source src={catVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default OOIIAAWindow;