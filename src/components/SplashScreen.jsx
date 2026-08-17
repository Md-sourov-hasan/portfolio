import { useState, useEffect } from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation after 2.5 seconds (so total time is ~3s)
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    // Completely remove splash screen after 3.2 seconds
    const removeTimer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`splash-container ${isExiting ? 'splash-exit' : ''}`}>
      <div className="splash-content">
        <div className="splash-text-wrapper">
          <span className="splash-line line-1">Welcome to</span>
          <span className="splash-line line-2">Sourov</span>
          <span className="splash-line line-3">Slide Show</span>
        </div>
        <div className="splash-progress">
          <div className="splash-progress-bar"></div>
        </div>
      </div>
    </div>
  );
}
