import { useState, useEffect } from 'react';
import { ChevronDown, Download } from 'lucide-react';

const ROLES = [
  'Cloud & Security Engineer.',
  'AWS Migration Specialist.',
  'Infrastructure as Code.',
  'SRE & DevSecOps.',
];

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const role = ROLES[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const scrollToNext = () => {
    const el = document.getElementById('summary');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Praveen A-Resume.pdf';
    link.download = 'Praveen A-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12">
          {/* Left: Text Content */}
          <div
            className={`flex-1 max-w-xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-text leading-[1.05] mb-4 sm:mb-6 tracking-tight">
              HI! I&apos;M{' '}
              <span className="text-primary-text">PRAVEEN A</span>
              <br />

            </h1>

            {/* Typewriter subtitle */}
            <div className="mb-4 sm:mb-6 font-mono text-lg sm:text-xl md:text-2xl text-secondary-text">
              <span className="text-accent mr-2">|</span>
              <span className="font-bold">{displayText}</span>
              <span className="inline-block w-2 h-6 bg-accent ml-1 align-middle animate-blink" />
            </div>

            {/* Specialized in */}
            <div className="mb-6 sm:mb-8">
              <h2 className="font-mono text-sm sm:text-base font-bold text-accent tracking-widest uppercase mb-2">
                SPECIALIZED IN
              </h2>
              <p className="font-mono text-sm sm:text-base text-secondary-text font-semibold leading-relaxed">
                Automating infrastructure,{' '}
                streamlining CI/CD, deploying{' '}
                fast, monitoring smarter.
              </p>
            </div>

            {/* Download Resume Button */}
            <button
              onClick={handleDownload}
              className="btn-accent group"
            >
              <Download className="w-4 h-4 group-hover:animate-bounce" />
              DOWNLOAD RESUME
            </button>
          </div>

          {/* Right: Profile Image */}
          <div
            className={`flex-shrink-0 transition-all duration-700 delay-200 mt-8 lg:mt-0 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
          >
            <div className="relative p-2 bg-[var(--bg-panel)] shadow-[8px_8px_0px_0px_var(--accent)] border-2 border-accent transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_0px_var(--accent)] duration-300">
              <div className="relative w-[260px] h-[300px] sm:w-[300px] sm:h-[340px] md:w-[340px] md:h-[380px] lg:w-[380px] lg:h-[420px] overflow-hidden border-2 border-accent">
                <img
                  src="/profile.jpeg"
                  alt="Praveen A"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <button
          onClick={scrollToNext}
          className="scroll-indicator"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
