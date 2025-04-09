import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import '98.css/dist/98.css';

// Import images
import grill from './components/images/grill.png';
import heeee from './components/images/heeee.png';
import meeeeemeeee from './components/images/meeeeemeeee.png';
import taptap from './components/images/taptap.png';
import chok from './components/images/chok.png';
import mouai from './components/images/mouai.png';
import stop from './components/images/stop.png';
import weewee from './components/images/weewee.png';
import bailando from './components/images/bailando.png';
import hate from './components/images/hate.png';
import vms from './components/images/vms.png';
import caca from './components/images/caca.png';

// Import audio
import boomvine from './components/audio/boomvine.mp3';

// Import Components
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import BirthdayWindow from './components/windows/BirthdayWindow';
import MyComputerWindow from './components/windows/MyComputerWindow';
import SpecialMessageWindow from './components/windows/SpecialMessageWindow';
import OOIIAAWindow from './components/windows/OOIIAAWindow';
import Confetti from './components/Confetti';
import ShutdownScreen from './components/ShutdownScreen';

function App() {
  const [step, setStep] = useState<number>(0);
  const [showing, setShowing] = useState<boolean>(false);
  const [showingExtra, setShowingExtra] = useState<boolean>(false);
  const [showingMyComputer, setShowingMyComputer] = useState<boolean>(false);
  const [showingOOIIAA, setShowingOOIIAA] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [startMenuOpen, setStartMenuOpen] = useState<boolean>(false);
  const [shutdownActive, setShutdownActive] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Window management state
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [windowZIndex, setWindowZIndex] = useState({ 
    birthday: 10, 
    myComputer: 5, 
    special: 5,
    ooiiaa: 5
  });
  
  // Track open windows for taskbar
  const openWindows = {
    birthday: showing,
    myComputer: showingMyComputer,
    special: showingExtra,
    ooiiaa: showingOOIIAA
  };
  
  // References for draggable windows
  const birthdayWindowRef = useRef<HTMLDivElement>(null);
  const myComputerWindowRef = useRef<HTMLDivElement>(null);
  const specialWindowRef = useRef<HTMLDivElement>(null);
  const ooiiaaWindowRef = useRef<HTMLDivElement>(null);
  
  // State to track dragging
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Random image state
  const [randomImage, setRandomImage] = useState<string | null>(null);
  const [isImageVisible, setIsImageVisible] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Update time in taskbar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setCurrentTime(`${displayHours}:${displayMinutes} ${ampm}`);
    };
    
    updateTime(); // Initial update
    
    const intervalId = setInterval(updateTime, 60000); // Update every minute
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on initial load
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Bring a window to focus without triggering drag
  const focusWindow = (windowName: string) => {
    setActiveWindow(windowName);
    setWindowZIndex(prev => ({
      ...prev,
      [windowName]: Math.max(prev.birthday, prev.myComputer, prev.special, prev.ooiiaa) + 1
    }));
  };
  
  // Bring a window to the front
  const bringWindowToFront = (windowName: string) => {
    setActiveWindow(windowName);
    setWindowZIndex(prev => ({
      ...prev,
      [windowName]: Math.max(prev.birthday, prev.myComputer, prev.special, prev.ooiiaa) + 1
    }));
  };
  
  // Birthday window logic
  const handleYesClick = () => {
    if (step < 3) {
      setStep(prevStep => prevStep + 1);
    }
  };
  
  // Add this function to handle image display
  const showRandomImage = () => {
    const images = [
      grill,
      heeee,
      meeeeemeeee,
      taptap,
      chok,
      mouai,
      stop,
      weewee,
      bailando,
      hate,
      vms,
      caca
    ];

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const randomImagePath = images[Math.floor(Math.random() * images.length)];
    setRandomImage(randomImagePath);
    setIsImageVisible(true);

    // Play sound
    if (audioRef.current) {
      audioRef.current.src = boomvine;
      audioRef.current.play();
    }

    // Hide image after 1 second with animation
    timerRef.current = setTimeout(() => {
      setIsImageVisible(false);
    }, 1000);
  };
  
  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  
  const handleNoClick = () => {
    showRandomImage();
  };
  
  // Window control functions
  const closeBirthdayWindow = () => {
    setShowing(false);
    // Always reset step to 0 when closing the window, regardless of current step
    setStep(0);
    if (activeWindow === 'birthday') {
      setActiveWindow(showingMyComputer ? 'myComputer' : (showingExtra ? 'special' : (showingOOIIAA ? 'ooiiaa' : null)));
    }
  };
  
  const handleBirthdayIconClick = () => {
    setShowing(true);
    bringWindowToFront('birthday');
    setActiveWindow('birthday');
  };
  
  const handleMyComputerClick = () => {
    setShowingMyComputer(true);
    bringWindowToFront('myComputer');
    setActiveWindow('myComputer');
  };
  
  const handleSpecialMessageClick = () => {
    setShowingExtra(true);
    bringWindowToFront('special');
    setActiveWindow('special');
  };
  
  const handleOOIIAAClick = () => {
    setShowingOOIIAA(true);
    bringWindowToFront('ooiiaa');
    setActiveWindow('ooiiaa');
  };
  
  const closeMyComputerWindow = () => {
    setShowingMyComputer(false);
    if (activeWindow === 'myComputer') {
      setActiveWindow(showing ? 'birthday' : (showingExtra ? 'special' : (showingOOIIAA ? 'ooiiaa' : null)));
    }
  };
  
  const closeExtraWindow = () => {
    setShowingExtra(false);
    if (activeWindow === 'special') {
      setActiveWindow(showing ? 'birthday' : (showingMyComputer ? 'myComputer' : (showingOOIIAA ? 'ooiiaa' : null)));
    }
  };
  
  const closeOOIIAAWindow = () => {
    setShowingOOIIAA(false);
    if (activeWindow === 'ooiiaa') {
      setActiveWindow(showing ? 'birthday' : (showingMyComputer ? 'myComputer' : (showingExtra ? 'special' : null)));
    }
  };
  
  // Start menu control
  const toggleStartMenu = () => {
    setStartMenuOpen(prevState => !prevState);
  };
  
  const closeStartMenu = () => {
    setStartMenuOpen(false);
  };
  
  // Handle clicks outside start menu
  const handleDocumentClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.start-button') && !target.closest('.start-menu')) {
      closeStartMenu();
    }
  };
  
  const handleShutdown = () => {
    closeStartMenu();
    setShutdownActive(true);
    // Reset after showing shutdown screen
    setTimeout(() => {
      setShutdownActive(false);
      setStep(0); // Reset to beginning
      // Reset all window states
      setShowing(true);
      setShowingExtra(false);
      setShowingMyComputer(false);
      setShowingOOIIAA(false);
      setActiveWindow('birthday');
    }, 3000);
  };
  
  // Window dragging logic
  const handleMouseDown = (e: React.MouseEvent, windowName: string) => {
    // Only allow dragging from the title bar (not from buttons)
    if (!(e.target as HTMLElement).closest('.title-bar-controls')) {
      setIsDragging(true);
      setActiveWindow(windowName);
      bringWindowToFront(windowName);
      
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
        case 'ooiiaa':
          windowElement = ooiiaaWindowRef.current;
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
    }
  };
  
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
        case 'ooiiaa':
          windowElement = ooiiaaWindowRef.current;
          break;
      }
      
      if (windowElement) {
        // Store original width and other properties before modifying position
        const originalWidth = windowElement.style.width;
        const originalMinWidth = windowElement.style.minWidth;
        const originalMaxWidth = windowElement.style.maxWidth;
        
        windowElement.style.left = `${e.clientX - dragOffset.x}px`;
        windowElement.style.top = `${e.clientY - dragOffset.y}px`;
        windowElement.style.transform = 'none'; // Remove default centering
        
        // Ensure width and related properties are preserved
        if (originalWidth) {
          windowElement.style.width = originalWidth;
        }
        if (originalMinWidth) {
          windowElement.style.minWidth = originalMinWidth;
        }
        if (originalMaxWidth) {
          windowElement.style.maxWidth = originalMaxWidth;
        }
      }
    }
  };
  
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
        case 'ooiiaa':
          windowElement = ooiiaaWindowRef.current;
          break;
      }
      
      if (windowElement) {
        // Remove dragging class
        windowElement.classList.remove('dragging');
      }
    }
    
    setIsDragging(false);
  };
  
  // Add touch handlers for mobile dragging
  const handleTouchStart = (e: React.TouchEvent, windowName: string) => {
    // Only allow dragging from the title bar (not from buttons)
    if (!(e.target as HTMLElement).closest('.title-bar-controls')) {
      setIsDragging(true);
      setActiveWindow(windowName);
      bringWindowToFront(windowName);
      
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
        case 'ooiiaa':
          windowElement = ooiiaaWindowRef.current;
          break;
      }
      
      if (windowElement && e.touches[0]) {
        const rect = windowElement.getBoundingClientRect();
        setDragOffset({
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        });
        
        // Add dragging class
        windowElement.classList.add('dragging');
      }
      
      e.preventDefault();
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && activeWindow && e.touches[0]) {
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
        case 'ooiiaa':
          windowElement = ooiiaaWindowRef.current;
          break;
      }
      
      if (windowElement) {
        // Store original width before modifying position
        const originalWidth = windowElement.style.width;
        
        windowElement.style.left = `${e.touches[0].clientX - dragOffset.x}px`;
        windowElement.style.top = `${e.touches[0].clientY - dragOffset.y}px`;
        windowElement.style.transform = 'none'; // Remove default centering
        
        // Ensure width is preserved
        if (originalWidth) {
          windowElement.style.width = originalWidth;
        }
      }
    }
  };
  
  const handleTouchEnd = () => {
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
        case 'ooiiaa':
          windowElement = ooiiaaWindowRef.current;
          break;
      }
      
      if (windowElement) {
        // Remove dragging class
        windowElement.classList.remove('dragging');
      }
    }
    
    setIsDragging(false);
  };
  
  // Add global event handlers for dragging
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
          case 'ooiiaa':
            windowElement = ooiiaaWindowRef.current;
            break;
        }
        
        if (windowElement) {
          // Store original width before modifying position
          const originalWidth = windowElement.style.width;
          
          windowElement.style.left = `${e.clientX - dragOffset.x}px`;
          windowElement.style.top = `${e.clientY - dragOffset.y}px`;
          windowElement.style.transform = 'none'; // Remove default centering
          
          // Ensure width is preserved
          if (originalWidth) {
            windowElement.style.width = originalWidth;
          }
        }
      }
    };
    
    const handleGlobalMouseUp = () => {
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
          case 'ooiiaa':
            windowElement = ooiiaaWindowRef.current;
            break;
        }
        
        if (windowElement) {
          windowElement.classList.remove('dragging');
        }
      }
      
      setIsDragging(false);
    };
    
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, activeWindow, dragOffset]);
  
  // Add touch event listeners for mobile
  useEffect(() => {
    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging && activeWindow && e.touches[0]) {
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
          case 'ooiiaa':
            windowElement = ooiiaaWindowRef.current;
            break;
        }
        
        if (windowElement) {
          // Store original width before modifying position
          const originalWidth = windowElement.style.width;
          
          windowElement.style.left = `${e.touches[0].clientX - dragOffset.x}px`;
          windowElement.style.top = `${e.touches[0].clientY - dragOffset.y}px`;
          windowElement.style.transform = 'none'; // Remove default centering
          
          // Ensure width is preserved
          if (originalWidth) {
            windowElement.style.width = originalWidth;
          }
        }
      }
    };
    
    const handleGlobalTouchEnd = () => {
      setIsDragging(false);
    };
    
    document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    document.addEventListener('touchend', handleGlobalTouchEnd);
    
    return () => {
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, activeWindow, dragOffset]);
  
  return (
    <div className="App" 
      onClick={handleDocumentClick} 
      onMouseMove={handleMouseMove} 
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {shutdownActive ? (
        <ShutdownScreen />
      ) : (
        <Desktop
          step={step}
          isMobile={isMobile}
          handleMyComputerClick={handleMyComputerClick}
          handleBirthdayIconClick={handleBirthdayIconClick}
          handleSpecialMessageClick={handleSpecialMessageClick}
          handleOOIIAAClick={handleOOIIAAClick}
        >
          {/* Random Image Display */}
          {randomImage && (
            <div 
              className={`random-image-container ${isImageVisible ? 'visible' : ''}`}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
                transition: isImageVisible ? 'none' : 'opacity 1s ease-out',
                opacity: isImageVisible ? 1 : 0,
                pointerEvents: 'none',
                mixBlendMode: 'normal',
                backgroundColor: 'transparent'
              }}
            >
              <img 
                src={randomImage} 
                alt="Random" 
                style={{
                  maxWidth: '80vw',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none'
                }}
              />
            </div>
          )}
          
          <audio ref={audioRef} />
          
          {/* Main birthday dialog window */}
          {showing && (
            <BirthdayWindow
              closeWindow={closeBirthdayWindow}
              handleYesClick={handleYesClick}
              handleNoClick={handleNoClick}
              step={step}
              windowRef={birthdayWindowRef}
              zIndex={windowZIndex.birthday}
              handleMouseDown={handleMouseDown}
              handleTouchStart={handleTouchStart}
              isMobile={isMobile}
              focusWindow={() => focusWindow('birthday')}
            />
          )}
          
          {/* My Computer Window */}
          {showingMyComputer && (
            <MyComputerWindow
              closeWindow={closeMyComputerWindow}
              handleBirthdayIconClick={handleBirthdayIconClick}
              handleSpecialMessageClick={handleSpecialMessageClick}
              handleOOIIAAClick={handleOOIIAAClick}
              windowRef={myComputerWindowRef}
              zIndex={windowZIndex.myComputer}
              handleMouseDown={handleMouseDown}
              handleTouchStart={handleTouchStart}
              isMobile={isMobile}
              focusWindow={() => focusWindow('myComputer')}
            />
          )}
          
          {/* Special message window with animated hearts */}
          {showingExtra && (
            <SpecialMessageWindow
              closeWindow={closeExtraWindow}
              windowRef={specialWindowRef}
              zIndex={windowZIndex.special}
              handleMouseDown={handleMouseDown}
              handleTouchStart={handleTouchStart}
              isMobile={isMobile}
              focusWindow={() => focusWindow('special')}
            />
          )}
          
          {/* OOIIAA video player window */}
          {showingOOIIAA && (
            <OOIIAAWindow
              closeWindow={closeOOIIAAWindow}
              windowRef={ooiiaaWindowRef}
              zIndex={windowZIndex.ooiiaa}
              handleMouseDown={handleMouseDown}
              handleTouchStart={handleTouchStart}
              isMobile={isMobile}
              focusWindow={() => focusWindow('ooiiaa')}
            />
          )}
          
          {/* Confetti */}
          {step === 3 && <Confetti isMobile={isMobile} />}
          
          {/* Start Menu */}
          <StartMenu
            isOpen={startMenuOpen}
            openMyComputer={handleMyComputerClick}
            openBirthdayWindow={handleBirthdayIconClick}
            openSpecialMessage={handleSpecialMessageClick}
            openOOIIAA={handleOOIIAAClick}
            handleShutdown={handleShutdown}
            closeStartMenu={closeStartMenu}
          />
          
          {/* Taskbar */}
          <Taskbar
            toggleStartMenu={toggleStartMenu}
            startMenuOpen={startMenuOpen}
            currentTime={currentTime}
            openWindows={openWindows}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
            bringWindowToFront={bringWindowToFront}
          />
        </Desktop>
      )}
    </div>
  );
}

export default App;
