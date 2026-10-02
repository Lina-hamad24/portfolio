'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Award,
  Brain,
  ChevronLeft,
  ChevronRight,
  Languages,
  MessageSquare,
  ZoomIn,
  X,
  type LucideIcon,
} from 'lucide-react';

type Certificate = {
  title: string;
  subtitle: string;
  image: string;
  slug?: string; // Simple Icons name (real logo). If missing, the icon below is used
  Icon: LucideIcon; // fallback / main icon
};

/* Images come from public/image/. To add one, add a block here. */
const certificates: Certificate[] = [
  {
    title: 'Applications of AI for Anomaly Detection',
    subtitle: 'NVIDIA Certificate of Competency',
    image: '/image/anomaly.png',
    slug: 'nvidia',
    Icon: Award,
  },
  {
    title: 'Fundamentals of Deep Learning',
    subtitle: 'NVIDIA Certificate of Competency',
    image: '/image/deep learning.png',
    slug: 'nvidia',
    Icon: Brain,
  },
  {
    title: 'Neo4j Certification',
    subtitle: 'Graph databases and graph data modeling',
    image: '/image/Neo4j certification.png',
    slug: 'neo4j',
    Icon: Award,
  },
  {
    title: 'Building Transformer-Based NLP Applications',
    subtitle: 'NVIDIA Certificate of Competency',
    image: '/image/NLP.png',
    slug: 'nvidia',
    Icon: MessageSquare,
  },
  {
    title: 'German Language',
    subtitle: 'Language proficiency certificate',
    image: '/image/German.png',
    Icon: Languages,
  },
];

const AUTOPLAY_MS = 4000;

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

/* Real logo (NVIDIA, Neo4j) with automatic fallback to a normal icon */
function CertIcon({ cert }: { cert: Certificate }) {
  const [failed, setFailed] = useState(false);
  const Fallback = cert.Icon;

  if (cert.slug && !failed) {
    return (
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-white p-2 shadow-sm transition-transform duration-500 group-hover:rotate-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://cdn.simpleicons.org/${cert.slug}`}
          alt=""
          width={28}
          height={28}
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      </span>
    );
  }

  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm transition-transform duration-500 group-hover:rotate-12">
      <Fallback size={22} />
    </span>
  );
}

function CertificateCard({
  cert,
  onOpen,
}: {
  cert: Certificate;
  onOpen: () => void;
}) {
  return (
    <div className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open certificate: ${cert.title}`}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border-2 border-border bg-card text-left shadow-lg shadow-primary/5 transition-all duration-300 hover:-translate-y-2 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span className="absolute left-0 top-0 z-10 h-1.5 w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-500 group-hover:scale-x-100" />

        <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={encodeURI(cert.image)}
            alt={`${cert.title} certificate`}
            loading="lazy"
            draggable={false}
            className="h-full w-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-primary/0 opacity-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:opacity-100">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-card text-primary shadow-lg">
              <ZoomIn size={22} />
            </span>
          </span>
        </div>

        <div className="flex flex-1 items-start gap-3 p-5">
          <CertIcon cert={cert} />
          <div className="min-w-0">
            <h3 className="font-headline text-lg font-semibold leading-snug">{cert.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{cert.subtitle}</p>
          </div>
        </div>
      </button>
    </div>
  );
}

function CertificateViewer({
  cert,
  onClose,
}: {
  cert: Certificate;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
      onClick={onClose}
      className="ce-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="ce-pop relative w-full max-w-4xl overflow-hidden rounded-3xl border-2 border-border bg-card shadow-2xl"
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-primary to-accent" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X size={20} />
        </button>
        <div className="bg-white p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={encodeURI(cert.image)}
            alt={`${cert.title} certificate`}
            className="mx-auto max-h-[75vh] w-auto max-w-full object-contain"
          />
        </div>
        <div className="p-5">
          <h3 className="font-headline text-xl font-semibold">{cert.title}</h3>
          <p className="text-sm text-muted-foreground">{cert.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

/* Slider: swipe, arrows, dots and autoplay (pauses on hover) */
function CertificateSlider({ onOpen }: { onOpen: (cert: Certificate) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const atEnd = (el: HTMLDivElement) =>
    el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;

  const closestIndex = (track: HTMLDivElement) => {
    let current = 0;
    let best = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const d = Math.abs((child as HTMLElement).offsetLeft - track.scrollLeft);
      if (d < best) {
        best = d;
        current = i;
      }
    });
    return current;
  };

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
  }, []);

  const goNext = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    if (atEnd(track)) {
      scrollToIndex(0);
      return;
    }
    scrollToIndex(Math.min(closestIndex(track) + 1, certificates.length - 1));
  }, [scrollToIndex]);

  const goPrev = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    if (track.scrollLeft <= 4) {
      scrollToIndex(certificates.length - 1);
      return;
    }
    scrollToIndex(Math.max(closestIndex(track) - 1, 0));
  }, [scrollToIndex]);

  /* Keep the dots in sync with the scroll position */
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    if (atEnd(track)) {
      setActive(certificates.length - 1);
      return;
    }
    setActive(closestIndex(track));
  };

  /* Autoplay */
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, goNext]);

  return (
    <div
      className="mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="ce-track relative flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pb-8 pt-4"
      >
        {certificates.map((cert) => (
          <CertificateCard key={cert.title} cert={cert} onOpen={() => onOpen(cert)} />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous certificate"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-border bg-card text-foreground shadow-md transition-all hover:-translate-x-0.5 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="flex items-center gap-2">
          {certificates.map((cert, i) => (
            <button
              key={cert.title}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to certificate ${i + 1}`}
              aria-current={i === active}
              className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                i === active
                  ? 'w-8 bg-gradient-to-r from-primary to-accent'
                  : 'w-2.5 bg-muted-foreground/30 hover:bg-primary/60'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next certificate"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-border bg-card text-foreground shadow-md transition-all hover:translate-x-0.5 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}

export default function CertificationsSection() {
  const { ref: titleRef, visible: titleVisible } = useInView<HTMLDivElement>();
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <section
      id="certifications"
      className="relative w-full overflow-hidden bg-background py-20 md:py-24"
    >
      <style>{`
        @keyframes ce-blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 20px) scale(1.1); }
        }
        .ce-blob { animation: ce-blob 12s ease-in-out infinite; }

        @keyframes ce-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .ce-backdrop { animation: ce-fade 0.25s ease-out; }

        @keyframes ce-pop {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .ce-pop { animation: ce-pop 0.3s ease-out; }

        .ce-track { scrollbar-width: none; -ms-overflow-style: none; }
        .ce-track::-webkit-scrollbar { display: none; }

        @media (prefers-reduced-motion: reduce) {
          .ce-blob, .ce-backdrop, .ce-pop { animation: none !important; }
          .ce-track { scroll-behavior: auto; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="ce-blob absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="ce-blob absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl [animation-delay:-6s]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div ref={titleRef} className="flex flex-col items-center text-center">
          <h2
            className={`flex items-center gap-3 font-headline text-3xl font-bold tracking-tighter transition-all duration-700 motion-reduce:transition-none sm:text-4xl ${
              titleVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            } motion-reduce:translate-y-0 motion-reduce:opacity-100`}
          >
            <Award size={32} className="text-primary" /> Certifications
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
            Courses and certificates I completed. Click one to see it in full size.
          </p>
        </div>

        <Reveal>
          <CertificateSlider onOpen={setSelected} />
        </Reveal>
      </div>

      {selected && <CertificateViewer cert={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}