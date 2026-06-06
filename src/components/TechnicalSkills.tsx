import { useEffect, useState } from 'react';
import {
  SiLinux, SiPython, SiGo, SiAmazonwebservices, SiOracle, SiGooglecloud,
  SiTerraform, SiDocker, SiKubernetes,
  SiGitlab, SiGithubactions,
  SiPrometheus, SiGrafana,
  SiPostgresql, SiRedis,
} from 'react-icons/si';
import { VscShield, VscLock } from 'react-icons/vsc';
import { TbNetwork, TbCertificate, TbBinaryTree } from 'react-icons/tb';
import { AiOutlineCloudServer } from 'react-icons/ai';

const TechnicalSkills = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 },
    );

    const element = document.getElementById('skills');
    if (element) observer.observe(element);
    return () => { if (element) observer.unobserve(element); };
  }, []);

  const allSkills = [
    { name: 'Go', icon: SiGo, color: '#00ADD8' },
    { name: 'AWS', icon: SiAmazonwebservices, color: '#FF9900' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
    { name: 'Terraform', icon: SiTerraform, color: '#844FBA' },
    { name: 'Linux / Bash', icon: SiLinux, color: 'var(--text-primary)' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'GitLab CI', icon: SiGitlab, color: '#FC6D26' },
    { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
    { name: 'Prometheus', icon: SiPrometheus, color: '#E6522C' },
    { name: 'Grafana', icon: SiGrafana, color: '#F46800' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { name: 'Redis', icon: SiRedis, color: '#DC382D' },
    { name: 'Oracle Cloud', icon: SiOracle, color: '#F80000' },
    { name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4' },
    { name: 'CloudFormation', icon: AiOutlineCloudServer, color: '#FF9900' },
    { name: 'CloudWatch', icon: SiAmazonwebservices, color: '#FF9900' },
  ];

  return (
    <section
      id="skills"
      className="py-20 sm:py-28 relative overflow-hidden border-t-2 border-accent/30 bg-[var(--bg-secondary)]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`mb-10 sm:mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-heading font-mono">SKILLS.</h2>
          <div className="w-full h-[4px] bg-accent mt-4 max-w-xs" />
        </div>

        {/* Skills Icon Grid - Single Flat Grid */}
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center max-w-4xl mx-auto mt-8 relative z-20">
          {allSkills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={skill.name}
                className={`relative group transition-all duration-300 hover:z-50 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
                style={{ transitionDelay: `${200 + index * 30}ms` }}
              >
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-[var(--bg-panel)] rounded-md border-[3px] border-accent shadow-[4px_4px_0px_0px_var(--accent)] transition-all duration-200 cursor-default group-hover:-translate-y-1.5 group-hover:shadow-[5px_5px_0px_0px_var(--accent)]"
                >
                  <IconComponent
                    className="text-3xl sm:text-4xl transition-transform duration-200"
                    style={{ color: skill.color }}
                  />
                </div>
                {/* Tooltip */}
                <div
                  className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[var(--accent)] text-white font-mono text-xs font-bold whitespace-nowrap pointer-events-none transition-all duration-200 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:-translate-y-1 z-50"
                >
                  {skill.name}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-accent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
