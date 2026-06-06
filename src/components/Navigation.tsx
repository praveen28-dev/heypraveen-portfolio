import { useState, useEffect, useMemo } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  theme: string;
  toggleTheme: () => void;
}

const Navigation = ({ theme, toggleTheme }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  const navItems = useMemo(
    () => [
      { id: 'hero', label: 'PORTFOLIO' },
      { id: 'summary', label: 'ABOUT' },
      { id: 'projects', label: 'PROJECTS' },
      { id: 'skills', label: 'SKILLS' },
      { id: 'connect', label: 'CONNECT' },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[var(--bg-primary)]/95 backdrop-blur-sm border-b-2 border-accent shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
            className="flex items-center gap-2 font-mono text-lg group"
          >
            <span className="w-8 h-8 border-2 border-accent flex items-center justify-center text-accent font-bold text-sm bg-[var(--bg-panel)] shadow-[2px_2px_0px_0px_var(--accent)] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[3px_3px_0px_0px_var(--accent)] transition-all duration-200">
              P
            </span>
            <span className="text-primary-text font-bold tracking-tight">
              raveen
            </span>
          </a>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
            
            <button 
              onClick={toggleTheme}
              className="ml-2 w-9 h-9 flex items-center justify-center border-2 border-accent bg-[var(--bg-panel)] text-accent shadow-[2px_2px_0px_0px_var(--accent)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--accent)] transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center border-2 border-accent bg-[var(--bg-panel)] text-accent shadow-[2px_2px_0px_0px_var(--accent)]"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-primary-text hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[var(--bg-panel)] border-t-2 border-accent animate-slide-down">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-3 font-mono text-sm font-bold tracking-wider transition-all duration-200 border-2 ${
                  activeSection === item.id
                    ? 'border-accent bg-[var(--bg-primary)] shadow-[2px_2px_0px_0px_var(--accent)] text-accent'
                    : 'border-transparent text-primary-text hover:border-accent hover:shadow-[2px_2px_0px_0px_var(--accent)]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
