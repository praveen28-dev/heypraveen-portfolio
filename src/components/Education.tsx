import { useEffect, useState } from 'react';
import { ExternalLink, Award, BookOpen } from 'lucide-react';

const Education = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 },
    );

    const element = document.getElementById('education');
    if (element) observer.observe(element);
    return () => { if (element) observer.unobserve(element); };
  }, []);

  const education = [
    {
      degree: 'Bachelor of Engineering',
      field: 'Information Technology',
      institution: 'K S Rangasamy College of Technology',
      location: 'Namakkal, Tamil Nadu',
      period: '2023 — 2027',
      grade: 'CGPA: 7.2/10',
      highlights: [
        'Specialized in Cloud Computing and DevOps',
        'Member of Zealous IT Association',
      ],
    },
    {
      degree: 'Higher Secondary Certificate',
      field: 'Science',
      institution: 'Sri Vidya Mandir Matriculation HSS',
      location: 'Namakkal, Tamil Nadu',
      period: '2022 — 2023',
      grade: '81.5%',
      highlights: [
        'Active in Science Exhibitions',
        'Led school technology club',
      ],
    },
  ];

  // Only professional-tier certifications — no foundational/associate duplicates
  const professionalCerts = [
    {
      title: 'OCI Certified DevOps Professional',
      issuer: 'Oracle',
      tier: 'PROFESSIONAL',
      date: '2025',
      url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=D815F4701C1395B56EBA2991A6D1C6DB4D124E0E1D7C30F9CDF2B4328E3878EB',
      relevance: 'Validates CI/CD pipeline design, container orchestration, and infrastructure automation on OCI',
    },
    {
      title: 'OCI Database Architect Professional',
      issuer: 'Oracle',
      tier: 'PROFESSIONAL',
      date: 'Oct 2025',
      url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=48DCA9766AF32A166F58106B7E6F132C15FC9814954C897C9D186DF6E3B546A2',
      relevance: 'Covers multi-model database architecture, high availability design, and migration strategies',
    },
    {
      title: 'GCP Professional Cloud Architect',
      issuer: 'Google Cloud',
      tier: 'IN PROGRESS',
      date: 'Expected 2025',
      url: '#',
      relevance: 'Multi-cloud architecture validation — designing scalable, secure, and reliable solutions on GCP',
    },
  ];

  // Complementary training — shown smaller, de-emphasized
  const training = [
    { title: 'Terraform – IaC Automation', source: 'Udemy', year: '2025' },
    { title: 'AWS DevOps Bootcamp', source: 'Udemy', year: '2025' },
    { title: 'OCI AI Foundations', source: 'Oracle', year: '2025' },
  ];

  return (
    <section
      id="education"
      className="py-20 sm:py-28 relative overflow-hidden border-t-2 border-accent/30 bg-[var(--bg-primary)]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`mb-10 sm:mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-heading font-mono">EDUCATION.</h2>
          <div className="w-full h-[4px] bg-accent mt-4 max-w-xs" />
        </div>

        {/* Education Timeline */}
        <div className="space-y-6 sm:space-y-8 mb-12 sm:mb-16">
          {education.map((edu, index) => (
            <div
              key={edu.degree + edu.institution}
              className={`border-2 border-accent bg-[var(--bg-panel)] p-5 sm:p-7 shadow-[6px_6px_0px_0px_var(--accent)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_var(--accent)] transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                <div>
                  <h3 className="font-mono text-lg sm:text-xl font-bold text-primary-text">{edu.degree}</h3>
                  <p className="font-mono text-sm font-bold text-accent mt-1">{edu.field}</p>
                  <p className="text-sm font-semibold text-secondary-text mt-1">{edu.institution}</p>
                </div>
                <div className="text-left sm:text-right font-mono text-xs font-bold text-secondary-text border-2 border-accent/30 p-2 bg-[var(--bg-elevated)] w-fit">
                  <div>{edu.period}</div>
                  <div className="mt-1">{edu.location}</div>
                  <div className="text-accent font-bold mt-2 pt-2 border-t-2 border-accent/30">{edu.grade}</div>
                </div>
              </div>
              <div className="space-y-2 mt-4 bg-[var(--bg-elevated)] p-4 border-l-4 border-accent">
                {edu.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2">
                    <span className="text-accent font-mono font-bold text-sm mt-0.5">▸</span>
                    <span className="text-sm font-medium text-secondary-text">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Professional Certifications — Only highest tier */}
        <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-accent mb-6 inline-flex items-center gap-2 bg-[var(--bg-panel)] px-4 py-2 border-2 border-accent shadow-[4px_4px_0px_0px_var(--accent)]">
            <Award className="w-4 h-4" />
            // PROFESSIONAL CERTIFICATIONS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {professionalCerts.map((cert, index) => (
              <a
                key={cert.title + cert.issuer}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group border-2 border-accent bg-[var(--bg-panel)] shadow-[4px_4px_0px_0px_var(--accent)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_var(--accent)] transition-all duration-300 flex flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                style={{ transitionDelay: `${500 + index * 80}ms` }}
              >
                <div className="p-4 sm:p-5 flex-1">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h4 className="font-mono text-sm font-bold text-primary-text leading-tight group-hover:text-accent transition-colors duration-200">
                      {cert.title}
                    </h4>
                    <ExternalLink className="w-4 h-4 text-secondary-text group-hover:text-accent flex-shrink-0 mt-0.5 transition-colors duration-200" />
                  </div>
                  <p className="font-mono text-xs text-secondary-text leading-relaxed mb-3">
                    {cert.relevance}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-accent bg-[var(--bg-elevated)] px-2 py-1 border border-accent/30">{cert.issuer}</span>
                    <span className={`text-xs font-bold px-2 py-1 border ${
                      cert.tier === 'PROFESSIONAL' 
                        ? 'text-[var(--bg-panel)] bg-accent border-accent' 
                        : 'text-secondary-text bg-[var(--bg-elevated)] border-accent/30'
                    }`}>
                      {cert.tier}
                    </span>
                    <span className="text-xs font-bold text-secondary-text">{cert.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Complementary Training — De-emphasized */}
        <div className={`mt-8 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-secondary-text mb-4 inline-flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            Complementary Training
          </h3>
          <div className="flex flex-wrap gap-3">
            {training.map((t) => (
              <span
                key={t.title}
                className="font-mono text-xs font-medium text-secondary-text bg-[var(--bg-elevated)] px-3 py-1.5 border border-accent/20"
              >
                {t.title} <span className="text-accent ml-1">({t.source}, {t.year})</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
