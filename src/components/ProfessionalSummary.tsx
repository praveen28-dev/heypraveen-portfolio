import { useEffect, useState } from 'react';

const ProfessionalSummary = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 },
    );

    const element = document.getElementById('summary');
    if (element) observer.observe(element);
    return () => { if (element) observer.unobserve(element); };
  }, []);

  const highlights = [
    { label: 'AWS Services', detail: 'EC2, EKS, Lambda, RDS, S3, IAM, VPC, CloudWatch' },
    { label: 'IaC & Automation', detail: 'Terraform, CloudFormation,Python' },
    { label: 'Containers', detail: 'Docker, Kubernetes' },
    { label: 'CI/CD', detail: 'GitLab CI, GitHub Actions' },
    { label: 'Monitoring', detail: 'Prometheus, Grafana, CloudWatch' },
    { label: 'Security', detail: 'IAM policies, Security Groups, VPC design, Secrets Manager' },
  ];

  return (
    <section
      id="summary"
      className="py-20 sm:py-28 relative overflow-hidden border-t-2 border-accent/30 bg-[var(--bg-secondary)]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`mb-10 sm:mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-heading font-mono">ABOUT.</h2>
          <div className="w-full h-[4px] bg-accent mt-4 max-w-xs" />
        </div>

        {/* About Content */}
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left: Summary Text */}
          <div className="lg:col-span-3">
            <div className="space-y-4 text-sm sm:text-base text-secondary-text font-medium leading-relaxed bg-[var(--bg-panel)] p-6 sm:p-8 border-2 border-accent shadow-[6px_6px_0px_0px_var(--accent)]">
              <p>
                I&apos;m a <span className="text-primary-text font-bold">B.Tech Information Technology student</span> at K S Rangasamy College of Technology,
                building a career in <span className="text-accent font-bold">Cloud Security, AWS Migration, and SRE</span>.
              </p>
              <p>
                My focus is on designing <span className="text-primary-text font-bold">production-grade infrastructure</span> —
                from zero-downtime AWS migrations with Terraform to secured GitOps pipelines
                with GitLab CI/CD. I build systems that are
                <span className="text-accent-orange font-bold"> observable, resilient, and automated</span>.
              </p>
              <p>
                I&apos;m <span className="text-accent font-bold">AWS & OCI certified</span>,
                experienced with Go-based tooling, and actively building
                production Kubernetes security projects. Available for
                <span className="text-primary-text font-bold"> immediate joining</span>.
              </p>

              {/* Status badges */}
              <div className="flex flex-wrap gap-3 mt-6">
                {['AWS Certified', 'OCI Certified', 'Ready to Join', 'Open Source'].map((badge) => (
                  <span key={badge} className="skill-tag text-xs font-bold">
                    {badge === 'Ready to Join' ? (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_5px_var(--accent)]" />
                        {badge}
                      </span>
                    ) : badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Technical Focus Areas */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-accent bg-[var(--bg-panel)] px-3 py-1 inline-block border-2 border-accent shadow-[3px_3px_0px_0px_var(--accent)] mb-6">
              // Core Stack
            </h3>
            <div className="space-y-4">
              {highlights.map((item, index) => (
                <div
                  key={item.label}
                  className={`border-l-4 border-accent bg-[var(--bg-panel)] p-3 shadow-[3px_3px_0px_0px_var(--accent)] hover:translate-x-1 transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                  style={{ transitionDelay: `${300 + index * 80}ms` }}
                >
                  <div className="font-mono text-xs font-bold text-accent uppercase tracking-wider">{item.label}</div>
                  <div className="text-sm font-medium text-secondary-text mt-1">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSummary;
