import { useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById('projects');
    if (element) observer.observe(element);
    return () => { if (element) observer.unobserve(element); };
  }, []);

  const projects = [
    {
      title: 'Self-Healing Infrastructure with Chaos Engineering',
      overview:
        'Designed a resilient Go-based system that automatically recovers from failures, validated using Prometheus alerts and chaos engineering principles. Sub-60s automated recovery with zero-touch fault tolerance.',
      tools: ['Go', 'Prometheus', 'Docker', 'Grafana', 'Bash'],
      metrics: [
        { label: 'Recovery Time', value: '<60s' },
        { label: 'Uptime Validated', value: '99.9%' },
      ],
      github: 'https://github.com/praveen28-devops',
    },
    {
      title: '3-Tier Scalable Web Application on AWS',
      overview:
        'Architected and deployed a highly available 3-tier web application on AWS using EC2, RDS, and S3 with load balancing, auto scaling, and secure VPC networking. 35% lower latency vs baseline.',
      tools: ['EC2', 'RDS', 'S3', 'IAM', 'VPC', 'ALB', 'ASG'],
      metrics: [
        { label: 'Latency Reduction', value: '35%' },
        { label: 'Availability', value: '99.9%' },
      ],
      github: 'https://github.com/praveen28-devops',
    },

    {
      title: 'Serverless CSPM ChatOps',
      overview:
        'A serverless Cloud Security Posture Management (CSPM) solution integrated with ChatOps for real-time security alerts and automated remediation.',
      tools: ['Serverless', 'AWS', 'Python', 'ChatOps'],
      metrics: [
        { label: 'Alerting', value: 'Real-time' },
        { label: 'Remediation', value: 'Automated' },
      ],
      github: 'https://github.com/praveen28-dev/Serverless-CSPM-ChatOps.git',
    },
    {
      title: 'Secured GitOps Pipeline',
      overview:
        'An end-to-end secured GitOps pipeline for deploying applications with embedded security scanning and automated compliance checks.',
      tools: ['GitOps', 'CI/CD', 'Security', 'Kubernetes'],
      metrics: [
        { label: 'Security', value: 'Embedded' },
        { label: 'Pipeline', value: 'GitOps' },
      ],
      github: 'https://github.com/praveen28-dev/Secured-GitOps-Pipeline.git',
    },
  ];

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 relative overflow-hidden border-t-2 border-accent/30 bg-[var(--bg-primary)]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`mb-10 sm:mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-heading font-mono">PROJECTS.</h2>
          <div className="w-full h-[4px] bg-accent mt-4 max-w-xs" />
        </div>

        {/* Projects List */}
        <div className="space-y-8 sm:space-y-12">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${200 + index * 150}ms`,
              }}
            >
              {/* Project Header */}
              <div className="p-4 sm:p-6 border-b-2 border-accent bg-[var(--bg-elevated)]">
                <h3 className="font-mono text-lg sm:text-xl font-bold text-primary-text leading-tight">
                  {project.title}
                </h3>
              </div>

              {/* Project Body */}
              <div className="p-4 sm:p-6 bg-[var(--bg-panel)]">
                {/* Overview */}
                <div className="mb-6">
                  <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider underline decoration-solid underline-offset-4">
                    OVERVIEW:
                  </span>
                  <p className="text-sm sm:text-base text-secondary-text font-medium mt-4 leading-relaxed font-mono">
                    {project.overview}
                  </p>
                </div>

                {/* Metrics */}
                <div className="flex flex-wrap gap-4 mb-6 p-3 border-2 border-accent/30 bg-[var(--bg-elevated)]">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-secondary-text">{metric.label}:</span>
                      <span className="font-mono text-sm font-bold text-accent">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tools */}
                <div className="mb-6">
                  <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider underline decoration-solid underline-offset-4">
                    TOOLS:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="skill-tag font-bold"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* GitHub Link */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent w-full justify-center sm:w-auto"
                >
                  View on GitHub
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <a
            href="https://github.com/praveen28-devops"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent inline-flex"
          >
            VIEW ALL PROJECTS
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
