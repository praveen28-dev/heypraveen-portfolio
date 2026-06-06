import { useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedArch, setExpandedArch] = useState<string | null>(null);

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
      problem: 'Container workloads in staging environments frequently crashed due to OOM kills and network partitions, requiring manual SSH intervention and 15+ minute recovery windows.',
      solution: 'Built a Go-based controller that watches Prometheus alert webhooks for container health degradation. On trigger, it executes automated recovery runbooks — restarting failed pods, re-routing traffic via service mesh updates, and logging recovery actions to a structured audit trail.',
      tools: ['Go', 'Prometheus', 'Docker', 'Grafana', 'Bash', 'AlertManager'],
      metrics: [
        {
          label: 'Recovery Time',
          value: '<60s',
          context: 'Measured via Prometheus alert-to-resolution timestamps across 200+ simulated container eviction events'
        },
        {
          label: 'Uptime Validated',
          value: '99.9%',
          context: 'Calculated from Prometheus up{} metric over 72-hour chaos test windows with scheduled pod kills every 5 minutes'
        },
      ],
      architecture: [
        '┌─────────────┐     ┌──────────────┐     ┌─────────────────┐',
        '│  Prometheus  │────▶│ AlertManager │────▶│  Go Controller  │',
        '│  (metrics)   │     │  (webhooks)  │     │  (recovery loop)│',
        '└──────┬───────┘     └──────────────┘     └────────┬────────┘',
        '       │                                           │        ',
        '       ▼                                           ▼        ',
        '┌─────────────┐                           ┌─────────────────┐',
        '│   Grafana    │                           │  Docker Engine  │',
        '│ (dashboards) │                           │ (restart/scale) │',
        '└─────────────┘                           └─────────────────┘',
      ],
      github: 'https://github.com/praveen28-devops',
    },
    {
      title: 'Secured GitOps Pipeline with Shift-Left Security',
      problem: 'CI/CD pipelines deployed container images without security scanning, and Kubernetes manifests lacked policy validation — vulnerabilities were caught only in production.',
      solution: 'Implemented a GitLab CI pipeline with embedded security gates: Trivy scans container images for CVEs (blocking Critical/High), and Conftest validates Kubernetes manifests against OPA Rego policies (no root containers, resource limits enforced). Validated manifests are synced to the cluster with automated drift detection.',
      tools: ['GitLab CI', 'Trivy', 'OPA/Conftest', 'Kubernetes', 'Docker'],
      metrics: [
        {
          label: 'Scan Coverage',
          value: '100%',
          context: 'Every container image built in CI passes through Trivy scanning before push to registry — enforced via pipeline stage dependencies'
        },
        {
          label: 'Policy Gates',
          value: '8 Rego rules',
          context: 'Conftest policies enforce: no privileged containers, CPU/memory limits set, no latest tags, readOnlyRootFilesystem, runAsNonRoot, and more'
        },
      ],
      architecture: [
        '┌──────────┐   ┌───────────┐   ┌──────────┐   ┌──────────┐',
        '│  Git     │──▶│ GitLab CI │──▶│  Trivy   │──▶│ Conftest │',
        '│  Push    │   │ (build)   │   │ (CVE     │   │ (Rego    │',
        '│          │   │           │   │  scan)   │   │  policy) │',
        '└──────────┘   └───────────┘   └──────────┘   └────┬─────┘',
        '                                                    │      ',
        '                                                    ▼      ',
        '                ┌───────────┐              ┌──────────────┐',
        '                │    K8s    │◀─────────────│   ArgoCD     │',
        '                │ (cluster) │   GitOps     │ (sync+drift) │',
        '                └───────────┘   sync       └──────────────┘',
      ],
      github: 'https://github.com/praveen28-dev/Secured-GitOps-Pipeline.git',
    },
    {
      title: 'Serverless CSPM ChatOps Engine',
      problem: 'Cloud security misconfigurations (open S3 buckets, overly permissive IAM policies, unencrypted EBS volumes) were discovered manually during quarterly audits — too slow for production environments.',
      solution: 'Built a serverless CSPM engine using AWS Lambda functions triggered by CloudTrail events and Config rule evaluations. Non-compliant resources trigger SNS → Slack/Teams notifications with remediation context. Critical findings (public S3, wildcard IAM) trigger automated remediation via Lambda + Boto3.',
      tools: ['AWS Lambda', 'CloudTrail', 'AWS Config', 'SNS', 'Python', 'Boto3', 'EventBridge'],
      metrics: [
        {
          label: 'Detection Speed',
          value: '<3 min',
          context: 'Measured from CloudTrail event ingestion to Slack notification delivery via CloudWatch Logs timestamp correlation'
        },
        {
          label: 'Coverage',
          value: '14 rules',
          context: 'Custom AWS Config rules covering CIS Benchmark controls: S3 encryption, IAM policy width, EBS encryption, SG port exposure, RDS public access'
        },
      ],
      architecture: [
        '┌──────────────┐     ┌──────────────┐     ┌─────────────────┐',
        '│  CloudTrail  │────▶│  EventBridge │────▶│  Lambda (scan)  │',
        '│  (API logs)  │     │  (rules)     │     │  (Boto3 checks) │',
        '└──────────────┘     └──────────────┘     └────────┬────────┘',
        '                                                   │        ',
        '                     ┌──────────────┐              │        ',
        '                     │  AWS Config  │──────────────┤        ',
        '                     │ (compliance) │              │        ',
        '                     └──────────────┘              ▼        ',
        '                                          ┌─────────────────┐',
        '                                          │   SNS → Slack   │',
        '                                          │ (alert + fix)   │',
        '                                          └─────────────────┘',
      ],
      github: 'https://github.com/praveen28-dev/Serverless-CSPM-ChatOps.git',
    },

    {
      title: '3-Tier Scalable Web Application on AWS',
      problem: 'Needed a horizontally scalable, fault-tolerant web application architecture with strict network isolation between presentation, logic, and data tiers.',
      solution: 'Designed a VPC with public/private subnet segmentation across 2 AZs. ALB handles SSL termination and distributes traffic to an Auto Scaling Group of EC2 instances running the application tier. RDS Multi-AZ PostgreSQL handles persistence with automated backups and failover.',
      tools: ['EC2', 'RDS', 'S3', 'IAM', 'VPC', 'ALB', 'ASG', 'CloudWatch', 'Terraform'],
      metrics: [
        {
          label: 'Latency Reduction',
          value: '35%',
          context: 'Baseline: single-AZ EC2 with no caching (avg 420ms). Post-optimization with ALB + CloudFront + connection pooling: avg 273ms. Measured via CloudWatch p95 latency metrics over 48 hours'
        },
        {
          label: 'Availability',
          value: '99.9%',
          context: 'Validated using CloudWatch composite alarms tracking ALB healthy host count + RDS connection metrics across simulated AZ failover tests'
        },
      ],
      architecture: [
        '                    ┌──────────────┐                        ',
        '     Internet ─────▶│     ALB      │                        ',
        '                    │ (SSL term.)  │                        ',
        '                    └──────┬───────┘                        ',
        '              ┌────────────┼────────────┐                   ',
        '              ▼            ▼            ▼                   ',
        '        ┌──────────┐ ┌──────────┐ ┌──────────┐             ',
        '        │  EC2-1   │ │  EC2-2   │ │  EC2-n   │  ◀─ ASG    ',
        '        │ (pvt-1a) │ │ (pvt-1b) │ │ (pvt-1a) │             ',
        '        └────┬─────┘ └────┬─────┘ └────┬─────┘             ',
        '              └────────────┼────────────┘                   ',
        '                           ▼                                ',
        '                    ┌──────────────┐                        ',
        '                    │  RDS Multi-AZ│                        ',
        '                    │ (PostgreSQL) │                        ',
        '                    └──────────────┘                        ',
      ],
      github: 'https://github.com/praveen28-devops',
    }
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
          <p className="font-mono font-bold text-sm text-secondary-text mt-4 bg-[var(--bg-panel)] inline-block px-3 py-1 border-2 border-accent shadow-[3px_3px_0px_0px_var(--accent)]">
            // Each project includes problem context, architecture, and measured outcomes
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-8 sm:space-y-12">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
                {/* Problem */}
                <div className="mb-5">
                  <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider underline decoration-solid underline-offset-4">
                    PROBLEM:
                  </span>
                  <p className="text-sm sm:text-base text-secondary-text font-medium mt-3 leading-relaxed font-mono">
                    {project.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-5">
                  <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider underline decoration-solid underline-offset-4">
                    SOLUTION:
                  </span>
                  <p className="text-sm sm:text-base text-secondary-text font-medium mt-3 leading-relaxed font-mono">
                    {project.solution}
                  </p>
                </div>

                {/* Architecture Diagram */}
                <div className="mb-5">
                  <button
                    onClick={() => setExpandedArch(expandedArch === project.title ? null : project.title)}
                    className="font-mono text-xs font-bold text-accent uppercase tracking-wider underline decoration-solid underline-offset-4 cursor-pointer hover:text-primary-text transition-colors flex items-center gap-2"
                  >
                    <span>{expandedArch === project.title ? '▾' : '▸'}</span>
                    ARCHITECTURE FLOW:
                  </button>
                  {expandedArch === project.title && (
                    <div className="mt-3 p-4 bg-[var(--bg-elevated)] border-2 border-accent/30 overflow-x-auto animate-fadeIn">
                      <pre className="font-mono text-xs sm:text-sm text-primary-text leading-relaxed whitespace-pre">
                        {project.architecture.join('\n')}
                      </pre>
                    </div>
                  )}
                </div>

                {/* Metrics with Context */}
                <div className="mb-5">
                  <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider underline decoration-solid underline-offset-4">
                    MEASURED OUTCOMES:
                  </span>
                  <div className="mt-3 space-y-3">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="p-3 border-2 border-accent/30 bg-[var(--bg-elevated)]">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono text-sm font-bold text-primary-text">{metric.label}:</span>
                          <span className="font-mono text-sm font-bold text-accent">
                            {metric.value}
                          </span>
                        </div>
                        <p className="font-mono text-xs text-secondary-text leading-relaxed">
                          ↳ {metric.context}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>



                {/* Tools */}
                <div className="mb-6">
                  <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider underline decoration-solid underline-offset-4">
                    STACK:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-3">
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
