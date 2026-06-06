import { useEffect, useState } from 'react';

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

  const skillCategories = [
    {
      title: 'CLOUD PLATFORMS',
      skills: [
        { name: 'AWS', level: 90 },
        { name: 'Oracle Cloud', level: 75 },
        { name: 'Google Cloud', level: 50 },
      ],
    },
    {
      title: 'INFRASTRUCTURE AS CODE',
      skills: [
        { name: 'Terraform', level: 85 },
        { name: 'CloudFormation', level: 70 },
        { name: 'Ansible', level: 60 },
      ],
    },
    {
      title: 'CONTAINERS & ORCHESTRATION',
      skills: [
        { name: 'Docker', level: 85 },
        { name: 'Kubernetes', level: 75 },
        { name: 'Helm', level: 65 },
      ],
    },
    {
      title: 'CI/CD PIPELINES',
      skills: [
        { name: 'GitLab CI', level: 85 },
        { name: 'GitHub Actions', level: 80 },
        { name: 'Jenkins', level: 75 },
      ],
    },
    {
      title: 'MONITORING & OBSERVABILITY',
      skills: [
        { name: 'Prometheus', level: 75 },
        { name: 'Grafana', level: 75 },
        { name: 'CloudWatch', level: 80 },
      ],
    },
    {
      title: 'PROGRAMMING & SCRIPTING',
      skills: [
        { name: 'Python', level: 75 },
        { name: 'Go', level: 60 },
        { name: 'Bash', level: 85 },
        { name: 'Boto3', level: 70 },
      ],
    },
    {
      title: 'DATABASES',
      skills: [
        { name: 'PostgreSQL', level: 70 },
        { name: 'MongoDB', level: 60 },
        { name: 'Redis', level: 55 },
      ],
    },
    {
      title: 'OS & NETWORKING',
      skills: [
        { name: 'Linux', level: 90 },
        { name: 'VPC Design', level: 80 },
        { name: 'DNS/SSL', level: 70 },
      ],
    },
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

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className={`border-2 border-accent bg-[var(--bg-panel)] p-5 shadow-[4px_4px_0px_0px_var(--accent)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_var(--accent)] transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + catIndex * 80}ms` }}
            >
              <h3 className="font-mono text-xs font-bold text-accent tracking-wider mb-4 pb-2 border-b-2 border-accent">
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-sm font-bold text-primary-text">{skill.name}</span>
                      <span className="font-mono text-xs font-bold text-secondary-text">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-[var(--bg-elevated)] border border-accent/20">
                      <div
                        className="h-full bg-accent transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${400 + catIndex * 80 + skillIndex * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default TechnicalSkills;
