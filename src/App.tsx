import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import '98.css/dist/98.css';
import DesktopIcon from './components/DesktopIcon';

// Import Components
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import BirthdayWindow from './components/windows/BirthdayWindow';
import MyComputerWindow from './components/windows/MyComputerWindow';
import SpecialMessageWindow from './components/windows/SpecialMessageWindow';
import Confetti from './components/Confetti';
import ShutdownScreen from './components/ShutdownScreen';

function App() {
  const [step, setStep] = useState<number>(0);
  const [showing, setShowing] = useState<boolean>(true);
  const [showingExtra, setShowingExtra] = useState<boolean>(false);
  const [showingMyComputer, setShowingMyComputer] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [startMenuOpen, setStartMenuOpen] = useState<boolean>(false);
  const [shutdownActive, setShutdownActive] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Window management state
  const [activeWindow, setActiveWindow] = useState<string | null>('birthday');
  const [windowZIndex, setWindowZIndex] = useState({ birthday: 10, myComputer: 5, special: 5 });
  
  // Track open windows for taskbar
  const openWindows = {
    birthday: showing,
    myComputer: showingMyComputer,
    special: showingExtra
  };
  
  // References for draggable windows
  const birthdayWindowRef = useRef<HTMLDivElement>(null);
  const myComputerWindowRef = useRef<HTMLDivElement>(null);
  const specialWindowRef = useRef<HTMLDivElement>(null);
  
  // State to track dragging
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
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
  
  // Bring a window to the front
  const bringWindowToFront = (windowName: string) => {
    setWindowZIndex(prev => ({
      ...prev,
      [windowName]: Math.max(prev.birthday, prev.myComputer, prev.special) + 1
    }));
  };
  
  // Birthday window logic
  const handleYesClick = () => {
    if (step < 3) {
      setStep(prevStep => prevStep + 1);
    }
  };
  
  const handleNoClick = () => {
    // Move the dialog randomly when "No" is clicked
    const dialogElement = birthdayWindowRef.current;
    if (dialogElement) {
      const randomX = Math.floor(Math.random() * (window.innerWidth - 300));
      const randomY = Math.floor(Math.random() * (window.innerHeight - 200));
      dialogElement.style.position = 'absolute';
      dialogElement.style.left = `${randomX}px`;
      dialogElement.style.top = `${randomY}px`;
    }
  };
  
  // Window control functions
  const closeBirthdayWindow = () => {
    setShowing(false);
    // Reset step to remove celebration effects
    if (step === 3) {
      setStep(0);
    }
    if (activeWindow === 'birthday') {
      setActiveWindow(showingMyComputer ? 'myComputer' : (showingExtra ? 'special' : null));
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
  
  const closeMyComputerWindow = () => {
    setShowingMyComputer(false);
    if (activeWindow === 'myComputer') {
      setActiveWindow(showing ? 'birthday' : (showingExtra ? 'special' : null));
    }
  };
  
  const closeExtraWindow = () => {
    setShowingExtra(false);
    if (activeWindow === 'special') {
      setActiveWindow(showing ? 'birthday' : (showingMyComputer ? 'myComputer' : null));
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
      }
      
      if (windowElement) {
        windowElement.style.left = `${e.clientX - dragOffset.x}px`;
        windowElement.style.top = `${e.clientY - dragOffset.y}px`;
        windowElement.style.transform = 'none'; // Remove default centering
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
      }
      
      if (windowElement) {
        windowElement.style.left = `${e.touches[0].clientX - dragOffset.x}px`;
        windowElement.style.top = `${e.touches[0].clientY - dragOffset.y}px`;
        windowElement.style.transform = 'none'; // Remove default centering
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
        }
        
        if (windowElement) {
          windowElement.style.left = `${e.clientX - dragOffset.x}px`;
          windowElement.style.top = `${e.clientY - dragOffset.y}px`;
          windowElement.style.transform = 'none'; // Remove default centering
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
        }
        
        if (windowElement) {
          windowElement.style.left = `${e.touches[0].clientX - dragOffset.x}px`;
          windowElement.style.top = `${e.touches[0].clientY - dragOffset.y}px`;
          windowElement.style.transform = 'none'; // Remove default centering
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
        >
          {/* Main birthday dialog window */}
          {showing && (
            <BirthdayWindow
              step={step}
              closeWindow={closeBirthdayWindow}
              handleYesClick={handleYesClick}
              handleNoClick={handleNoClick}
              windowRef={birthdayWindowRef}
              zIndex={windowZIndex.birthday}
              handleMouseDown={handleMouseDown}
              handleTouchStart={handleTouchStart}
              isMobile={isMobile}
            />
          )}
          
          {/* My Computer Window */}
          {showingMyComputer && (
            <MyComputerWindow
              closeWindow={closeMyComputerWindow}
              handleBirthdayIconClick={handleBirthdayIconClick}
              handleSpecialMessageClick={handleSpecialMessageClick}
              windowRef={myComputerWindowRef}
              zIndex={windowZIndex.myComputer}
              handleMouseDown={handleMouseDown}
              handleTouchStart={handleTouchStart}
              isMobile={isMobile}
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
