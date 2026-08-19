import { useState, useEffect } from 'react';
import './WelcomeSplash.css';

export default function WelcomeSplash({ onComplete }) {
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
    <div className={`welcome-splash-container ${isExiting ? 'splash-exit' : ''}`}>
      <div className="welcome-splash-content">
        <div className="welcome-splash-text-wrapper">
          <span className="welcome-splash-line welcome-line-1">Welcome to</span>
          <span className="welcome-splash-line welcome-line-2">Sourov</span>
          <span className="welcome-splash-line welcome-line-3">Slide Show</span>
        </div>
        <div className="welcome-splash-progress">
          <div className="welcome-splash-progress-bar"></div>
        </div>
      </div>
    </div>
  );
}
