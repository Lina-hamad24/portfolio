
"use client";

import { Github, Linkedin, Mail, Phone, MapPin, ChevronUp, Heart } from "lucide-react";

export default function ContactSection() {
  const quickLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer id="contact" className="w-full bg-secondary py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 text-left md:grid-cols-3 md:gap-8">
          {/* Column 1: Personal Info */}
          <div className="flex flex-col gap-4">
             <a href="#home" className="flex items-center gap-3">
               <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <span className="font-headline text-2xl font-bold text-primary-foreground">LH</span>
               </div>
              <span className="font-headline text-2xl font-bold">Lina Hamad</span>
            </a>
            <p className="max-w-xs text-muted-foreground">
               Junior AI Engineer passionate about Generative AI, RAG, Computer Vision & AI Automation. Looking to build practical AI solutions and contribute to innovative projects.
            </p>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/in/lina-hamad-/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/80">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Get In Touch */}
          <div className="flex flex-col gap-6">
            <h3 className="font-headline text-xl font-bold">Get In Touch</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="mailto:Linahamad552@gmail.com" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    Linahamad552@gmail.com
                  </a>
                </div>
              </div>
               <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-sm text-muted-foreground">+216 50 555 984</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-sm text-muted-foreground">Tunisia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="font-headline text-xl font-bold">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative mt-12 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lina Hamad. Made with <Heart className="inline-block h-4 w-4 text-red-500" /> All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:-translate-y-1"
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
