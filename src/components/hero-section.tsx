'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Linkedin, Mail, Eye, Download } from 'lucide-react';
import Image from 'next/image';

const focusAreas = [
  'AI Automation',
  'RAG Systems',
  'Computer Vision',
  'Machine Learning',
];

function Typewriter({
  words,
  typeSpeed = 80,
  deleteSpeed = 45,
  pause = 1600,
}: {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
}) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // Show plain text for people who turned animations off
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0]);
      return;
    }

    const current = words[index % words.length];
    let delay = deleting ? deleteSpeed : typeSpeed;
    if (!deleting && text === current) delay = pause;

    const timer = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(current.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return (
    <span>
      {text}
      <span className="cursor-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-primary" />
    </span>
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Soft moving background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="blob absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="blob absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl [animation-delay:-5s]" />
      </div>

      <div className="container relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2 md:px-6 lg:gap-20 lg:px-8">

        <div className="space-y-6 text-center md:text-left">

          {/* Open to work badge */}
          <div className="animate-fade-up delay-1 flex justify-center md:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              Open to work
            </span>
          </div>

          <p className="animate-fade-up delay-2 text-lg font-medium text-primary">
            Hello, I'm
          </p>

          <h1 className="animate-fade-up delay-2 font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="gradient-text">Lina Hamad</span>
          </h1>

          <p className="animate-fade-up delay-3 font-headline text-2xl font-medium text-foreground/80 md:text-3xl">
            Engineering Graduate @INSAT
          </p>

          {/* Typing line (fixed height so the page doesn't jump) */}
          <p className="animate-fade-up delay-3 min-h-[2rem] font-headline text-xl font-semibold text-foreground md:text-2xl">
            <span className="text-muted-foreground">Passionate about </span>
            <span className="text-primary">
              <Typewriter words={focusAreas} />
            </span>
          </p>
          
          <div className="animate-fade-up delay-4 flex justify-center gap-4 pt-2 md:justify-start">
            <a
              href="https://www.linkedin.com/in/lina-hamad-/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-8 w-8 text-muted-foreground transition-all hover:-translate-y-1 hover:text-primary" />
            </a>

            <a href="mailto:Linahamad552@gmail.com" aria-label="Email">
              <Mail className="h-8 w-8 text-muted-foreground transition-all hover:-translate-y-1 hover:text-primary" />
            </a>
          </div>

          <div className="animate-fade-up delay-5 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
            <Button
              asChild
              size="lg"
              className="gradient-button w-full transition-transform hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
            >
              <a href="/Resume(3).pdf" target="_blank" rel="noopener noreferrer">
                <Eye className="mr-2" />
                Preview Resume
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-border bg-card transition-transform hover:-translate-y-0.5 hover:bg-secondary sm:w-auto"
            >
              <a href="/Resume(3).pdf" download>
                <Download className="mr-2" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>

        {/* Photo: floating, spinning ring and glow */}
        <div className="animate-fade-up delay-3 flex justify-center">
          <div className="animate-float relative">
            <div className="spin-ring absolute -inset-1.5 rounded-full" />

            <div className="glowing-border relative rounded-full bg-background p-2">
              <Image
                src="/image/Lina.png"
                alt="Lina Hamad"
                width={400}
                height={400}
                className="h-[260px] w-[260px] rounded-full object-cover sm:h-[340px] sm:w-[340px] md:h-[400px] md:w-[400px]"
                priority
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}