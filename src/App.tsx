import { useState, useCallback, useEffect } from 'react';
import BootSequence from "./components/BootSequence";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ProfessionalSummary from "./components/ProfessionalSummary";
import TechnicalSkills from "./components/TechnicalSkills";
import Education from "./components/Education";
import Projects from "./components/Projects_fixed";
import Volunteering from "./components/Volunteering";
import Connect from "./components/Connect";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [theme, setTheme] = useState('light');

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Set initial theme - always light by default
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <>
      {!booted && <BootSequence onComplete={handleBootComplete} />}
      <div className={`min-h-screen relative transition-opacity duration-500 ${booted ? 'opacity-100' : 'opacity-0'}`}>
        <Navigation theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <ProfessionalSummary />
          <Projects />
          <TechnicalSkills />
          <Education />
          <Volunteering />
          <Connect />
        </main>
      </div>
    </>
  );
}
