import { useEffect, useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Phone, ExternalLink } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/praveen28-devops',
    username: '@praveen28-devops',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/praveen-a-devops',
    username: 'praveen-a-devops',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:praveen.dev.cloud@gmail.com',
    username: 'praveen.dev.cloud@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    href: 'tel:+916382832865',
    username: '+91 6382832865',
  },
];

export default function Connect() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );

    const el = document.getElementById('connect');
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section
      id="connect"
      className="py-20 sm:py-28 relative overflow-hidden border-t-2 border-accent/30 bg-[var(--bg-secondary)]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-heading font-mono">CONNECT.</h2>
          <div className="w-full h-[4px] bg-accent mt-4 max-w-xs" />
          <p className="text-secondary-text font-bold text-sm sm:text-base mt-4 max-w-xl font-mono">
            Open to Cloud Engineering, SRE, and DevSecOps roles. Available for immediate joining.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
          {SOCIAL_LINKS.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group flex items-center gap-4 p-4 sm:p-5 border-2 border-accent bg-[var(--bg-panel)] shadow-[4px_4px_0px_0px_var(--accent)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_var(--accent)] transition-all duration-300 font-mono ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-accent bg-[var(--bg-primary)] flex items-center justify-center group-hover:bg-accent transition-all duration-300">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:text-[var(--bg-panel)]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-accent uppercase tracking-wider">{link.label}</div>
                  <div className="text-sm sm:text-base font-bold text-primary-text group-hover:text-accent transition-colors duration-300">
                    {link.username}
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-secondary-text ml-auto group-hover:text-accent transition-colors duration-300" />
              </a>
            );
          })}
        </div>

        {/* Location */}
        <div className={`flex items-center gap-3 bg-[var(--bg-panel)] border-2 border-accent shadow-[3px_3px_0px_0px_var(--accent)] w-fit px-4 py-2 font-mono text-sm font-bold transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <MapPin className="w-4 h-4 text-accent" />
          <span className="text-primary-text">Namakkal, Tamil Nadu, India</span>
          <span className="text-accent">•</span>
          <span className="text-accent">Open to Remote / Hybrid</span>
        </div>

        {/* Terminal-style footer */}
        <div className={`mt-16 pt-8 border-t-2 border-accent/30 font-mono text-xs text-secondary-text font-bold transition-all duration-700 delay-900 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span>
              <span className="text-accent">praveen</span>
              <span className="text-primary-text">@</span>
              <span className="text-accent">portfolio</span>
              <span className="text-primary-text">:~$ </span>
              <span className="text-secondary-text">echo &quot;Built with React + Vite + Tailwind CSS&quot;</span>
            </span>
            <span>© 2025 Praveen A. All rights reserved.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
