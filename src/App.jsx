import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import CoverSheet from './components/CoverSheet';
import AboutSheet from './components/AboutSheet';
import CraftSheet from './components/CraftSheet';
import WorkSheet from './components/WorkSheet';
import ExperienceSheet from './components/ExperienceSheet';
import ContactSheet from './components/ContactSheet';
import CustomCursor from './components/CustomCursor';
import SplashScreen from './components/SplashScreen';
import { useLenis } from './hooks/useLenis';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  useLenis(); // initialise smooth scroll

  // Track overall page scroll progress for the progress bar
  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? scrolled / total : 0);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showSplash]);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <div className="scroll-container">
        <CustomCursor />
        <Nav scrollProgress={scrollProgress} />

        <main>
          <CoverSheet />
          <AboutSheet />
          <CraftSheet />
          <WorkSheet />
          <ExperienceSheet />
          <ContactSheet />
        </main>
      </div>
    </>
  );
}
