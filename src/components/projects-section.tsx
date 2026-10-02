'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, FolderKanban, TrendingUp } from 'lucide-react';
import ProjectImageCarousel from './project-image-carousel';

const filters = ['All', 'Computer Vision', 'AI & LLM', 'Automation', 'IoT'] as const;

const projects = [
  {
    id: 6,
    category: 'Computer Vision',
    title: 'Microscale Printing Inspection',
    description:
      'Developed a computer vision inspection system used by product and process engineering teams to verify print centering and detect alignment errors during early integration phases.',
    images: ['/image/img2.png', '/image/img.png'],
    tags: ['Computer Vision', 'OpenCV', 'NumPy', 'Image Processing', 'Python'],
    links: [
      {
        label: 'View Report',
        url: 'https://drive.google.com/file/d/1c7fa9Pm8XL4by80Gf3BN3kK868HMBoju/view?usp=sharing',
      },
    ],
    aiHint: 'computer vision printing inspection',
  },
  {
    id: 5,
    category: 'AI & LLM',
    title: 'RAG & GraphRAG Knowledge Assistant',
    description:
      'Developed a Retrieval-Augmented Generation (RAG) system for enterprise knowledge retrieval and built a GraphRAG pipeline using Neo4j to represent connected information and improve contextual retrieval.',
    images: ['/image/talan1.png', '/image/talan2.png'],
    tags: ['RAG', 'GraphRAG', 'Neo4j', 'LLMs', 'Dify', 'n8n'],
    links: [
      {
        label: 'View Report',
        url: 'https://drive.google.com/file/d/1hg3IsDoMa-R3GdWZBD8Sumy-ELbGHacx/view?usp=sharing',
      },
    ],
    aiHint: 'RAG GraphRAG Neo4j enterprise knowledge assistant',
  },
  {
    id: 4,
    category: 'IoT',
    title: 'IoT-Based Environmental Monitoring System',
    description:
      'Developed an IoT pipeline for processing multi-sensor environmental data, reducing manual monitoring time by 80%. The project also included a predictive Air Quality Index model.',
    highlight: '80% less manual monitoring time',
    images: ['/image/iot1.jpg', '/image/iot2.png'],
    tags: ['IoT', 'Python', 'scikit-learn', 'TensorFlow', 'PyTorch', 'Pandas'],
    links: [
      {
        label: 'View Report',
        url: 'https://drive.google.com/file/d/15x6g0eCvJ5RkV4y0k12E0TgICp4O4tFr/view?usp=sharing',
      },
    ],
    aiHint: 'IoT environmental monitoring and AI prediction',
  },
  {
    id: 3,
    category: 'Computer Vision',
    title: 'Hand Gesture Control System',
    description:
      'Developed a real-time hand gesture recognition system using YOLO, achieving 95% accuracy, and integrated the model with an ESP32-controlled 3D-printed robotic gripper.',
    highlight: '95% accuracy',
    images: ['/image/bra1.jpg', '/image/bra4.png'],
    tags: ['Computer Vision', 'YOLO', 'OpenCV', 'MediaPipe', 'ESP32', 'Python'],
    links: [
      {
        label: 'View Report',
        url: 'https://drive.google.com/file/d/1Eo-x5zkEDpI_07zCTjweTbq0g07YwZT7/view?usp=sharing',
      },
    ],
    aiHint: 'real-time gesture recognition and robotic control',
  },
  {
    id: 2,
    category: 'Automation',
    title: 'Google Workspace AI Automation Agent',
    description:
      'Developed an AI assistant enabling natural-language interaction with Gmail and Google Drive. The system automates email processing, document management, and file retrieval through tool-integrated workflows.',
    images: ['/image/another one.png', '/image/gmail5.png'],
    tags: ['n8n', 'Docker', 'Google APIs', 'LLMs', 'JSON'],
    links: [
      {
        label: 'View Demo',
        url: 'https://drive.google.com/file/d/1W1vooZ6kVWOasNoLfg-McUKe4nFqyslM/view?usp=sharing',
      },
    ],
    aiHint: 'AI assistant for Google Workspace automation',
  },
  {
    id: 1,
    category: 'Automation',
    title: 'Intelligent AI Web Research Agent',
    description:
      'Built an automated web data extraction and processing workflow with a conversational AI assistant. Integrated external tools through MCP-based workflows to enable real-time information retrieval.',
    images: ['/image/yes.png'],
    tags: ['n8n', 'MCP', 'Google Gemini', 'Firecrawl API', 'Docker', 'LLMs'],
    links: [
      {
        label: 'View Demo',
        url: 'https://drive.google.com/file/d/1YhHJ2fqJ5VSCA4ack2AMvG9nE2YKrMAz/view?usp=sharing',
      },
    ],
    aiHint: 'AI-powered web research and information retrieval',
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
  const { ref, visible } = useInView<HTMLDivElement>(0.1);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } motion-reduce:translate-y-0 motion-reduce:opacity-100 ${className}`}
    >
      {children}
    </div>
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

export default function ProjectsSection() {
  const [active, setActive] = useState<(typeof filters)[number]>('All');
  const { ref: titleRef, visible: titleVisible } = useInView<HTMLDivElement>();

  const shown =
    active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative w-full overflow-hidden bg-secondary py-20 md:py-24">
      {/* Animations live here, so no changes are needed in globals.css */}
      <style>{`
        @keyframes pj-blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        .pj-blob { animation: pj-blob 12s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .pj-blob { animation: none !important; } }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="pj-blob absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pj-blob absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl [animation-delay:-6s]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Title */}
        <div ref={titleRef} className="text-center">
          <div className="flex flex-col items-center">
            <h2
              className={`flex items-center gap-3 font-headline text-3xl font-bold tracking-tighter transition-all duration-700 motion-reduce:transition-none sm:text-4xl ${
                titleVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
              } motion-reduce:translate-y-0 motion-reduce:opacity-100`}
            >
              <FolderKanban size={32} className="text-primary" /> My Recent Projects
            </h2>
            <div
              className={`mt-2 h-1 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out motion-reduce:transition-none ${
                titleVisible ? 'w-20' : 'w-0'
              } motion-reduce:w-20`}
            />
          </div>
          <TypedText text="A selection of projects that demonstrate my passion." />
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                active === f
                  ? 'border-transparent bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project cards */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {shown.map((project, index) => (
            <Reveal key={project.id} delay={(index % 2) * 150} className="h-full">
              <Card className="group relative flex h-full flex-col overflow-hidden border-2 border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-2xl hover:shadow-primary/20">
                {/* Gradient bar that draws across the top on hover */}
                <div className="absolute left-0 top-0 z-20 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-500 group-hover:scale-x-100" />

                {/* Category label */}
                <span className="absolute left-3 top-3 z-20 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
                  {project.category}
                </span>

                {/* Images */}
                <div className="relative h-72 w-full overflow-hidden">
                  <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                    <ProjectImageCarousel
                      images={project.images}
                      alt={project.title}
                      aiHint={project.aiHint}
                    />
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="pt-4 font-headline text-2xl transition-colors group-hover:text-primary">
                    {project.title}
                  </CardTitle>
                  {project.highlight && (
                    <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600 dark:text-green-400">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {project.highlight}
                    </span>
                  )}
                </CardHeader>

                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex gap-4">
                  {project.links.map((link) => (
                    <Button
                      key={link.label}
                      asChild
                      variant="outline"
                      className="w-full transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <ArrowUpRight className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        {link.label}
                      </a>
                    </Button>
                  ))}
                </CardFooter>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}