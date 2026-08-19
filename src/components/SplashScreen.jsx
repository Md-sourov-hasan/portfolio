import { useState, useEffect, useRef } from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(7);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const completedRef = useRef(false);

  const handleFinish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onComplete?.();
    }, 600); // match exit transition duration
  };

  useEffect(() => {
    // 7-second total timer
    const DURATION = 7000;
    const EXIT_DELAY = 6400; // start exit animation at 6.4s so it completes at 7s

    // Interval for countdown display
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, Math.ceil((DURATION - elapsed) / 1000));
      setSecondsLeft(remaining);
      if (elapsed >= DURATION) {
        clearInterval(interval);
      }
    }, 200);

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, EXIT_DELAY);

    const finishTimer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
    }, DURATION);

    // Allow skip with Escape or Space key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        e.preventDefault();
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  // Attempt autoplay when ready
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted if unmuted without user interaction
        if (!isMuted) {
          setIsMuted(true);
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        }
      });
    }
  }, [isMuted]);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <aside
      className={`splash-container ${isExiting ? 'splash-exit' : ''}`}
      aria-label="Intro splash screen"
      role="dialog"
      aria-modal="true"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className={`splash-video ${isVideoLoaded ? 'loaded' : ''}`}
        src="/splash-video.mp4"
        autoPlay
        playsInline
        muted={isMuted}
        preload="auto"
        onLoadedData={() => setIsVideoLoaded(true)}
        onEnded={handleFinish}
      />

      {/* Cinematic Vignette Overlay */}
      <div className="splash-overlay" />

      {/* Top Controls Bar */}
      <div className="splash-top-bar">
        {/* Sound Toggle Button */}
        <button
          type="button"
          className="splash-btn splash-sound-btn"
          onClick={toggleSound}
          title={isMuted ? 'Unmute audio' : 'Mute audio'}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
          <span>{isMuted ? 'Sound Off' : 'Sound On'}</span>
        </button>

        {/* Skip Intro Button */}
        <button
          type="button"
          className="splash-btn splash-skip-btn"
          onClick={handleFinish}
          title="Skip intro and enter website"
        >
          <span>Skip Intro</span>
          <span className="splash-badge">{secondsLeft}s</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>

      {/* Bottom Sleek Progress Bar */}
      <div className="splash-progress-track">
        <div className="splash-progress-fill" />
      </div>
    </aside>
  );
}
