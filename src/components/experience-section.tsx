'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Briefcase, Calendar, ExternalLink, CheckCircle2 } from 'lucide-react';

const experiences = [
  {
    role: 'Computer Vision & AI Intern',
    company: 'Hummink',
    companyUrl: 'https://hummink.com/',
    domain: 'hummink.com',
    duration: 'Mar 2026 - Aug 2026',
    tags: ['Computer Vision', 'Image Processing', 'Measurement'],
    achievements: [
      'Developed a computer vision system for sub-pixel dimensional measurement in an industrial printing environment.',
      'Designed and implemented image preprocessing, segmentation, feature extraction, and measurement algorithms.',
      'Evaluated algorithm performance under varying imaging conditions and validated results against reference measurements.',
    ],
  },
  {
    role: 'Generative AI & Automation Intern',
    company: 'Talan',
    companyUrl: 'https://www.talan.com/',
    domain: 'talan.com',
    duration: 'Jun 2025 - Aug 2025',
    tags: ['RAG', 'GraphRAG', 'Neo4j', 'n8n', 'MCP'],
    achievements: [
      'Developed a Retrieval-Augmented Generation (RAG) agent for enterprise knowledge retrieval.',
      'Built and integrated a GraphRAG pipeline using Neo4j to improve contextual knowledge representation and information retrieval.',
      'Developed AI-powered automation workflows using n8n and MCP servers, integrating tools and external services.',
      'Implemented autonomous workflows for document management, information retrieval, and business process automation.',
    ],
  },
  {
    role: 'Artificial Intelligence & NLP Intern',
    company: 'Technozor',
    companyUrl: 'https://technozor.com/en',
    domain: 'technozor.com',
    duration: 'Jul 2024 - Aug 2024',
    tags: ['NLP', 'Machine Learning', 'Text Classification'],
    achievements: [
      'Developed NLP solutions for strategic roadmap analysis and optimization.',
      'Built and evaluated machine learning models for text classification and predictive analytics.',
    ],
  },
  {
    role: 'Programming & Robotics Instructor',
    company: 'Play Mind',
    companyUrl: 'https://www.linkedin.com/company/play-mind/posts/',
    domain: '', // no website known: shows a letter badge instead of a logo
    duration: 'Sep 2023 - May 2025',
    tags: ['Programming', 'Robotics', 'Mentoring'],
    achievements: [
      'Mentored programming and robotics teams, helping students develop practical programming and robotics skills.',
      'Supported teams participating in national and international competitions.',
    ],
  },
];

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

/* Company logo with automatic fallback to the first letter */
function CompanyLogo({ company, domain }: { company: string; domain: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-sm transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
      {domain && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
          alt={`${company} logo`}
          width={48}
          height={48}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="bg-gradient-to-br from-primary to-accent bg-clip-text font-headline text-2xl font-bold text-transparent">
          {company.charAt(0)}
        </span>
      )}
    </div>
  );
}

/* One timeline entry */
function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[number];
  index: number;
}) {
  const { ref, visible } = useInView<HTMLLIElement>(0.15);

  return (
    <li
      ref={ref}
      style={{ transitionDelay: '100ms' }}
      className={`relative transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
      } motion-reduce:translate-x-0 motion-reduce:opacity-100`}
    >
      {/* Timeline dot */}
      <span className="absolute -left-[41px] top-8 flex h-4 w-4 items-center justify-center md:-left-[49px]">
        {index === 0 && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
        )}
        <span className="relative h-4 w-4 rounded-full border-4 border-background bg-primary shadow" />
      </span>

      <div className="group relative overflow-hidden rounded-2xl border-2 border-border bg-background p-6 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 md:p-8">
        {/* Gradient bar that draws across the top on hover */}
        <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-500 group-hover:scale-x-100" />

        {/* Header: logo + company + role + dates */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <CompanyLogo company={exp.company} domain={exp.domain} />

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="font-headline text-2xl font-bold text-primary">
                {exp.company}
              </h3>
              {exp.companyUrl && (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <ExternalLink size={14} />
                  Visit Company
                </a>
              )}
            </div>
            <p className="mt-1 flex items-center gap-2 font-medium text-foreground">
              <Briefcase size={18} className="text-primary" />
              {exp.role}
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Calendar size={16} />
            {exp.duration}
          </span>
        </div>

        {/* Achievements: appear one by one */}
        <h4 className="mt-6 font-headline text-lg font-semibold">
          Key Achievements & Responsibilities
        </h4>
        <div
          className={`mt-2 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 motion-reduce:transition-none ${
            visible ? 'w-16' : 'w-0'
          } motion-reduce:w-16`}
        />
        <ul className="mt-5 space-y-3">
          {exp.achievements.map((achievement, i) => (
            <li
              key={i}
              style={{ transitionDelay: `${400 + i * 200}ms` }}
              className={`flex items-start gap-3 transition-all duration-700 motion-reduce:transition-none ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              } motion-reduce:translate-y-0 motion-reduce:opacity-100`}
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-muted-foreground">{achievement}</span>
            </li>
          ))}
        </ul>

        {/* Tech chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-transform duration-300 hover:-translate-y-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}

/* Subtitle that types itself once visible */
function TypedText({ text, speed = 35 }: { text: string; speed?: number }) {
  const { ref, visible } = useInView<HTMLParagraphElement>(0.5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(text.length);
    }
  }, [text]);

  useEffect(() => {
    if (!visible || count >= text.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [visible, count, text, speed]);

  const typing = visible && count < text.length;

  return (
    <p ref={ref} className="relative mx-auto mt-4 max-w-2xl text-muted-foreground md:text-xl/relaxed">
      <span className="invisible">{text}</span>
      <span aria-hidden="true" className="absolute inset-0">
        {text.slice(0, count)}
        {typing && (
          <span className="cursor-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-primary" />
        )}
      </span>
    </p>
  );
}

export default function ExperienceSection() {
  const { ref: titleRef, visible: titleVisible } = useInView<HTMLDivElement>();
  const { ref: listRef, visible: listVisible } = useInView<HTMLOListElement>(0.05);

  return (
    <section id="experience" className="relative w-full overflow-hidden bg-secondary py-20 md:py-24">
      {/* Animations live here, so no changes are needed in globals.css */}
      <style>{`
        @keyframes ex-blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        .ex-blob { animation: ex-blob 12s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .ex-blob { animation: none !important; } }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="ex-blob absolute -right-24 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="ex-blob absolute -left-24 bottom-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl [animation-delay:-6s]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        {/* Title */}
        <div ref={titleRef} className="text-center">
          <div className="flex flex-col items-center">
            <h2
              className={`flex items-center gap-3 font-headline text-3xl font-bold tracking-tighter transition-all duration-700 motion-reduce:transition-none sm:text-4xl ${
                titleVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
              } motion-reduce:translate-y-0 motion-reduce:opacity-100`}
            >
              <Briefcase size={32} className="text-primary" /> My Experience
            </h2>
            <div
              className={`mt-2 h-1 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out motion-reduce:transition-none ${
                titleVisible ? 'w-20' : 'w-0'
              } motion-reduce:w-20`}
            />
          </div>
          <TypedText text="A timeline of my professional journey and growth." />
        </div>

        {/* Timeline */}
        <ol ref={listRef} className="relative mt-14 space-y-10 pl-10 md:pl-12">
          <div
            className={`absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5 origin-top bg-gradient-to-b from-primary to-accent transition-transform duration-[2000ms] ease-out motion-reduce:transition-none md:left-[7px] ${
              listVisible ? 'scale-y-100' : 'scale-y-0'
            } motion-reduce:scale-y-100`}
          />
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.company} exp={exp} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}