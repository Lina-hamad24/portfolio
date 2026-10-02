'use client';

import { useEffect, useRef, useState } from 'react';
import { GraduationCap } from 'lucide-react';

const caption =
  "I’m an engineer who likes to figure things out by building. I start with a question, explore different possibilities, and turn what I learn into practical solutions.";

const words = caption.split(' ');

/* Save your file here:
   public/image/insat-logo.png  -> INSAT logo */
const LOGO_SOURCES = [
  '/image/insat logo.jpg',
  'https://www.google.com/s2/favicons?domain=insat.rnu.tn&sz=128',
];

const education = [
  {
    year: '2026',
    duration: '2023 - 2026',
    degree: 'Engineering degree',
    institution: 'INSAT - National Institute of Applied Sciences and Technology',
    insat: true,
    current: true,
    details: [
      'I am a fresh graduate with an Engineering Degree from the National Institute of Applied Science and Technology (INSAT).',
      'Through my studies, I have gained both theoretical knowledge and practical experience in designing intelligent and connected systems. It has deepened my skills in artificial intelligence and machine learning, while strengthening my ability to develop practical solutions using computer vision and emerging AI technologies.',
    ],
  },
  {
    year: '2023',
    duration: '2021 - 2023',
    degree: 'Pre-Engineering',
    institution: 'INSAT - National Institute of Applied Sciences and Technology',
    insat: true,
    current: false,
    details: [
      "I've finished preparatory studies in the MPI (Math, Physics, Informatics) track at the National Institute of Applied Technology.",
      'This highly selective program provided a strong multidisciplinary foundation in applied mathematics, theoretical and experimental physics, algorithmic, and computer science. I developed critical thinking, problem-solving, and abstraction skills.',
    ],
  },
  {
    year: '2021',
    duration: 'Concluded in 2021',
    degree: 'Baccalaureate, Experimental Sciences',
    institution: 'Pioneer High School',
    insat: false,
    current: false,
    details: ['Grade: High Honors'],
  },
];

function useInView<T extends HTMLElement>(threshold = 0.2) {
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

/* INSAT logo: local file, then website icon, then a graduation cap */
function InsatLogo({ size = 56 }: { size?: number }) {
  const [step, setStep] = useState(0);

  return (
    <div
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-md"
    >
      {step < LOGO_SOURCES.length ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={LOGO_SOURCES[step]}
          alt="INSAT logo"
          onError={() => setStep((s) => s + 1)}
          className="h-full w-full object-contain"
        />
      ) : (
        <GraduationCap className="h-2/3 w-2/3 text-primary" />
      )}
    </div>
  );
}

/* Just a caption: words fade in one by one */
function Caption() {
  const { ref, visible } = useInView<HTMLDivElement>(0.3);

  return (
    <div ref={ref} className="mx-auto mt-8 max-w-2xl text-center">
      <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
        {words.map((w, i) => (
          <span
            key={i}
            style={{ transitionDelay: `${200 + i * 40}ms` }}
            className={`mr-[0.28em] inline-block transition-all duration-700 motion-reduce:transition-none ${
              visible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-2 opacity-0 blur-sm'
            } motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0`}
          >
            {w}
          </span>
        ))}
      </p>
    </div>
  );
}

/* Education as tabs: pick a year on the left, details open on the right */
function EducationTabs() {
  const { ref, visible } = useInView<HTMLDivElement>(0.15);
  const [active, setActive] = useState(0);
  const item = education[active];

  return (
    <div
      ref={ref}
      className={`mt-10 grid gap-6 transition-all duration-1000 motion-reduce:transition-none lg:grid-cols-[340px_1fr] ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } motion-reduce:translate-y-0 motion-reduce:opacity-100`}
    >
      {/* Years */}
      <div className="flex flex-row gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
        {education.map((e, i) => {
          const on = i === active;
          return (
            <button
              key={e.year}
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`group relative flex min-w-[220px] flex-1 items-center gap-4 overflow-hidden rounded-2xl border-2 p-4 text-left transition-all duration-300 lg:min-w-0 lg:flex-none ${
                on
                  ? 'border-primary bg-card shadow-lg shadow-primary/15 lg:translate-x-2'
                  : 'border-border bg-card/50 hover:-translate-y-0.5 hover:border-primary/50'
              }`}
            >
              <span
                className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-primary to-accent transition-transform duration-500 ${
                  on ? 'scale-y-100' : 'scale-y-0'
                }`}
              />
              <span
                className={`font-headline text-3xl font-bold transition-colors ${
                  on ? 'text-primary' : 'text-muted-foreground/60 group-hover:text-primary'
                }`}
              >
                {e.year}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{e.degree}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {e.insat ? 'INSAT' : 'Pioneer High School'}
                </span>
              </span>
              {e.current && (
                <span className="relative ml-auto flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Details panel (re-animates every time you switch) */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-border bg-card p-6 shadow-xl shadow-primary/5 md:p-9">
        <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-primary to-accent" />
        <div key={active} className="ab-panel">
          <div className="flex flex-wrap items-center gap-4">
            {item.insat ? (
              <InsatLogo size={64} />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md">
                <GraduationCap className="h-8 w-8" />
              </span>
            )}
            <div className="flex-1">
              <h4 className="font-headline text-2xl font-bold">{item.degree}</h4>
              <p className="text-sm text-muted-foreground">{item.institution}</p>
            </div>
            <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              {item.duration}
            </span>
          </div>

          <div className="my-6 h-px w-full bg-border" />

          <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {item.details.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutMeSection() {
  const { ref: titleRef, visible: titleVisible } = useInView<HTMLDivElement>();

  return (
    <section id="about" className="relative w-full overflow-hidden bg-background py-20 md:py-24">
      <style>{`
        @keyframes ab-blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        .ab-blob { animation: ab-blob 12s ease-in-out infinite; }
        @keyframes ab-panel {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .ab-panel { animation: ab-panel 0.5s ease-out; }
        @keyframes ab-wave {
          0%, 60%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(16deg); }
          20%, 40% { transform: rotate(-10deg); }
          50% { transform: rotate(8deg); }
        }
        .ab-wave { transform-origin: 70% 70%; animation: ab-wave 2.8s ease-in-out infinite; }
        @keyframes ab-spin { to { transform: rotate(360deg); } }
        .ab-ring {
          background: conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary) / 0.2), hsl(var(--primary)));
        }
        @media (prefers-reduced-motion: reduce) {
          .ab-blob, .ab-panel, .ab-wave { animation: none !important; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="ab-blob absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="ab-blob absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl [animation-delay:-6s]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Title */}
        <div ref={titleRef} className="flex flex-col items-center text-center">
          <h2
            className={`font-headline text-3xl font-bold tracking-tighter transition-all duration-700 motion-reduce:transition-none sm:text-4xl ${
              titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            } motion-reduce:translate-y-0 motion-reduce:opacity-100`}
          >
            About <span className="gradient-text">Me</span>
          </h2>
          <div
            className={`mt-2 h-1 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 motion-reduce:transition-none ${
              titleVisible ? 'w-20' : 'w-0'
            } motion-reduce:w-20`}
          />
        </div>

        {/* Caption */}
        <Caption />

        {/* Education (unchanged) */}
        <div className="mt-20">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Education
          </p>
          <h3 className="font-headline text-2xl font-semibold sm:text-3xl">
            Educational Journey
          </h3>
          <EducationTabs />
        </div>
      </div>
    </section>
  );
}