'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Braces,
  Bot,
  Code,
  Rocket,
  Wrench,
  BrainCircuit,
  ScanEye,
  Sparkles,
  Brain,
  Network,
  MessageSquare,
  Layers,
  Waypoints,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Skill = {
  name: string;
  color: string; // brand color used for the hover glow
  slug?: string; // Simple Icons name (real logo). If missing, the icon below is used
  Icon: LucideIcon; // fallback icon
  invert?: boolean; // dark logos get inverted in dark mode
};

const skillCategories: { title: string; Icon: LucideIcon; skills: Skill[] }[] = [
  {
    title: 'Programming Languages',
    Icon: Braces,
    skills: [
      { name: 'Python', slug: 'python', color: '#3776AB', Icon: Code },
      { name: 'TypeScript', slug: 'typescript', color: '#3178C6', Icon: Code },
      { name: 'SQL', slug: 'postgresql', color: '#4169E1', Icon: Code },
      { name: 'C++', slug: 'cplusplus', color: '#00599C', Icon: Code },
    ],
  },
  {
    title: 'AI & Machine Learning',
    Icon: Bot,
    skills: [
      { name: 'Computer Vision', color: '#8B5CF6', Icon: ScanEye },
      { name: 'Generative AI', color: '#D946EF', Icon: Sparkles },
      { name: 'Machine Learning', color: '#06B6D4', Icon: Brain },
      { name: 'RAG & GraphRAG', color: '#22C55E', Icon: Network },
      { name: 'NLP & LLMs', color: '#F97316', Icon: MessageSquare },
      { name: 'Deep Learning', color: '#14B8A6', Icon: Layers },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    Icon: Code,
    skills: [
      { name: 'PyTorch', slug: 'pytorch', color: '#EE4C2C', Icon: Code },
      { name: 'spaCy', slug: 'spacy', color: '#09A3D5', Icon: Code },
      { name: 'scikit-learn', slug: 'scikitlearn', color: '#F7931E', Icon: Code },
      { name: 'Hugging Face', slug: 'huggingface', color: '#FFD21E', Icon: Bot },
      { name: 'OpenCV', slug: 'opencv', color: '#5C3EE8', Icon: ScanEye },
      { name: 'TensorFlow', slug: 'tensorflow', color: '#FF6F00', Icon: Code },
    ],
  },
  {
    title: 'AI & Automation Tools',
    Icon: Rocket,
    skills: [
      { name: 'n8n', slug: 'n8n', color: '#EA4B71', Icon: Waypoints },
      { name: 'Dify', slug: 'dify', color: '#1677FF', Icon: Bot },
      { name: 'Neo4j', slug: 'neo4j', color: '#4581C3', Icon: Network },
      { name: 'MCP', slug: 'modelcontextprotocol', color: '#6366F1', Icon: Waypoints, invert: true },
      { name: 'Docker', slug: 'docker', color: '#2496ED', Icon: Layers },
      { name: 'REST APIs', color: '#0EA5E9', Icon: Waypoints },
    ],
  },
  {
    title: 'Tools ',
    Icon: Wrench,
    skills: [
      { name: 'Git', slug: 'git', color: '#F05032', Icon: Code },
      { name: 'GitHub', slug: 'github', color: '#6B7280', Icon: Code, invert: true },
      { name: 'GitLab', slug: 'gitlab', color: '#FC6D26', Icon: Code },
      { name: 'Jupyter', slug: 'jupyter', color: '#F37626', Icon: Code },
      { name: 'Jira', slug: 'jira', color: '#0052CC', Icon: Code },
      { name: 'JSON', slug: 'json', color: '#6B7280', Icon: Braces, invert: true },
    ],
  },
];

/* Logos for the scrolling strip (only skills with a real logo) */
const marqueeSkills = skillCategories
  .flatMap((c) => c.skills)
  .filter((s) => s.slug);

/* Real logo with automatic fallback to an icon if it can't load */
function SkillIcon({ skill, size }: { skill: Skill; size: number }) {
  const [failed, setFailed] = useState(false);

  if (!skill.slug || failed) {
    const Fallback = skill.Icon;
    return <Fallback style={{ width: size, height: size, color: skill.color }} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${skill.slug}`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      className={skill.invert ? 'dark:invert' : ''}
      style={{ width: size, height: size }}
    />
  );
}

/* Detects when an element scrolls into view (runs once) */
function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* Fade + slide up when scrolled into view */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } motion-reduce:translate-y-0 motion-reduce:opacity-100 ${className}`}
    >
      {children}
    </div>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: (typeof skillCategories)[number];
  index: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.1);
  const HeaderIcon = category.Icon;

  return (
    <Reveal delay={index * 120} className="h-full">
      <Card className="group/card flex h-full flex-col border-border/50 bg-secondary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20">
        <CardHeader className="flex flex-row items-center gap-3 pb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm transition-transform duration-500 group-hover/card:rotate-12">
            <HeaderIcon size={20} />
          </span>
          <CardTitle className="font-headline text-xl">{category.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex-grow">
          <div ref={ref} className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {category.skills.map((skill, i) => (
              <div
                key={skill.name}
                style={
                  {
                    '--c': skill.color,
                    transitionDelay: `${i * 90}ms`,
                  } as React.CSSProperties
                }
                className={`transition-all duration-500 ease-out motion-reduce:transition-none ${
                  visible
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'translate-y-4 scale-90 opacity-0'
                } motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100`}
              >
                <div className="group flex h-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-transparent bg-background p-4 transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 hover:border-[var(--c)] hover:shadow-[0_10px_28px_-10px_var(--c)]">
                  <span
                    className="sk-float"
                    style={{ animationDelay: `${(index * 6 + i) * -0.7}s` }}
                  >
                    <SkillIcon skill={skill} size={34} />
                  </span>
                  <span className="text-center text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    {skill.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}

export default function SkillsSection() {
  const { ref: titleRef, visible: titleVisible } = useInView<HTMLDivElement>();

  return (
    <section id="skills" className="relative w-full overflow-hidden bg-background py-20 md:py-24">
      {/* Animations live here, so no changes are needed in globals.css */}
      <style>{`
        @keyframes sk-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .sk-float { display: inline-flex; animation: sk-float 4s ease-in-out infinite; }

        @keyframes sk-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .sk-marquee-track { display: flex; width: max-content; animation: sk-marquee 40s linear infinite; }
        .sk-marquee:hover .sk-marquee-track { animation-play-state: paused; }

        @keyframes sk-blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        .sk-blob { animation: sk-blob 12s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .sk-float, .sk-marquee-track, .sk-blob { animation: none !important; }
        }
      `}</style>

      {/* Soft background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="sk-blob absolute -right-24 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="sk-blob absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl [animation-delay:-6s]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Title */}
        <div ref={titleRef} className="flex flex-col items-center text-center">
          <h2
            className={`flex items-center gap-3 font-headline text-3xl font-bold tracking-tighter transition-all duration-700 motion-reduce:transition-none sm:text-4xl ${
              titleVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            } motion-reduce:translate-y-0 motion-reduce:opacity-100`}
          >
            <BrainCircuit size={32} className="text-primary" /> Technical Skills
          </h2>
          <div
            className={`mt-2 h-1 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out motion-reduce:transition-none ${
              titleVisible ? 'w-20' : 'w-0'
            } motion-reduce:w-20`}
          />
          <p
            className={`mx-auto mt-4 max-w-2xl text-muted-foreground transition-all delay-300 duration-700 motion-reduce:transition-none md:text-xl/relaxed ${
              titleVisible ? 'opacity-100' : 'opacity-0'
            } motion-reduce:opacity-100`}
          >
            A versatile toolkit covering AI, Computer Vision, IoT and cutting-edge development frameworks.
          </p>
        </div>

        {/* Scrolling logo strip */}
        <div
          className="sk-marquee relative mt-10 overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="sk-marquee-track gap-4">
            {[...marqueeSkills, ...marqueeSkills].map((skill, i) => (
              <span
                key={`${skill.name}-${i}`}
                className="mr-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm"
              >
                <SkillIcon skill={skill} size={20} />
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Category cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <CategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>

        <p className="mt-12 text-center text-muted-foreground">
          Continuously learning and expanding my technical expertise.
        </p>
      </div>
    </section>
  );
}