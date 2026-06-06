import { useEffect, useState } from 'react';

export default function Volunteering() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 },
    );

    const element = document.getElementById('volunteering');
    if (element) observer.observe(element);
    return () => { if (element) observer.unobserve(element); };
  }, []);

  const experiences = [
    {
      title: 'Community Volunteer — Elder Care Support',
      org: 'Atchayam Trust',
      period: '2024 — Present',
      location: 'Tamil Nadu, India',
      description:
        'Supporting community events and elder care initiatives through hands-on volunteering and community engagement.',
      contributions: [
        'Volunteered at old age homes during functions and special events',
        'Distributed food, clothing, and essential supplies to elderly residents',
        'Fostered intergenerational connections through activities',
      ],
      impact: '50+ elderly residents impacted',
      duration: '12+ months',
    },
    {
      title: 'Educational Volunteer — Tribal Student Mentorship',
      org: 'Ullash Trust',
      period: '2023 — Present',
      location: 'Sittling, Dharmapuri, Tamil Nadu',
      description:
        'Educating and mentoring tribal students in underserved communities, focusing on academic excellence and career guidance.',
      contributions: [
        'Taught 10th–12th grade tribal students in Sittling, Dharmapuri district',
        'Organized interactive workshops for problem-solving skills',
        'Provided career guidance and higher education counseling',
      ],
      impact: '30+ tribal students empowered',
      duration: '18+ months',
    },
  ];

  return (
    <section
      id="volunteering"
      className="py-20 sm:py-28 relative overflow-hidden border-t-2 border-accent/30 bg-[var(--bg-secondary)]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`mb-10 sm:mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-heading font-mono">COMMUNITY.</h2>
          <div className="w-full h-[4px] bg-accent mt-4 max-w-xs" />
          <p className="font-mono font-bold text-sm text-secondary-text mt-4 bg-[var(--bg-panel)] inline-block px-3 py-1 border-2 border-accent shadow-[3px_3px_0px_0px_var(--accent)]">
            // Making impact beyond code — 80+ lives touched through education and elder care
          </p>
        </div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {experiences.map((exp, index) => (
            <div
              key={exp.org}
              className={`border-2 border-accent bg-[var(--bg-panel)] p-5 sm:p-7 shadow-[6px_6px_0px_0px_var(--accent)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_var(--accent)] transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Header */}
              <div className="mb-4 sm:mb-5 border-b-2 border-accent/30 pb-4">
                <h3 className="font-mono text-base sm:text-lg font-bold text-primary-text leading-tight">
                  {exp.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-3">
                  <span className="font-mono text-xs font-bold text-[var(--bg-panel)] bg-accent px-2 py-1">{exp.org}</span>
                  <span className="font-mono text-xs font-bold text-secondary-text">{exp.period}</span>
                </div>
                <div className="font-mono text-xs font-bold text-secondary-text mt-2">📍 {exp.location}</div>
              </div>

              {/* Description */}
              <p className="text-sm font-medium text-secondary-text mb-4 leading-relaxed">{exp.description}</p>

              {/* Contributions */}
              <div className="space-y-2 mb-6 bg-[var(--bg-elevated)] p-4 border-l-4 border-accent">
                {exp.contributions.map((c) => (
                  <div key={c} className="flex items-start gap-2">
                    <span className="text-accent font-mono font-bold text-sm mt-0.5">▸</span>
                    <span className="text-sm font-medium text-secondary-text">{c}</span>
                  </div>
                ))}
              </div>

              {/* Impact Bar */}
              <div className="border-t-2 border-accent/30 pt-4 flex items-center justify-between font-mono text-xs font-bold">
                <span className="text-accent flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  {exp.impact}
                </span>
                <span className="text-secondary-text bg-[var(--bg-elevated)] px-2 py-1 border border-accent/20">{exp.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
