"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Send, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const ACCESS_KEY = "4b00c5cb-2615-4cde-8edc-b21bea0d3c37";

const fieldClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30";

type Status = "idle" | "sending" | "success" | "error";

/* Pop-up contact form. Messages arrive in your email inbox. */
function ContactModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* No field is required, but a completely empty form is pointless */
    if (!name.trim() && !email.trim() && !subject.trim() && !message.trim()) {
      setError("Please fill in at least one field before sending.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: subject.trim() || "New message from your portfolio",
          from_name: name.trim() || "Portfolio visitor",
          name: name.trim() || "-",
          email: email.trim() || "-",
          message: message.trim() || "-",
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setError("Could not send the message. Check your connection and try again.");
      setStatus("error");
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Contact me"
      onClick={onClose}
      className="cm-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
    >
      <style>{`
        @keyframes cm-fade { from { opacity: 0; } to { opacity: 1; } }
        .cm-backdrop { animation: cm-fade 0.25s ease-out; }
        @keyframes cm-pop {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .cm-pop { animation: cm-pop 0.3s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .cm-backdrop, .cm-pop { animation: none !important; }
        }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        className="cm-pop relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border-2 border-border bg-card shadow-2xl"
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-primary to-accent" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center px-6 py-12 text-center md:px-8">
            <CheckCircle2 className="h-14 w-14 text-primary" />
            <h2 className="mt-4 font-headline text-2xl font-bold">Message sent</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you for reaching out. I will get back to you soon.
            </p>
            <Button className="mt-6" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <div className="p-6 md:p-8">
            <h2 className="font-headline text-2xl font-bold">Contact me</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Send me a message. All fields are optional.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="cm-name" className="mb-1.5 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="cm-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="cm-email" className="mb-1.5 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="cm-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cm-subject" className="mb-1.5 block text-sm font-medium">
                  Subject
                </label>
                <input
                  id="cm-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What is this about?"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="cm-message" className="mb-1.5 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="cm-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className={`${fieldClass} resize-none`}
                />
              </div>

              {status === "error" && (
                <p role="alert" className="text-sm font-medium text-red-500">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={status === "sending"}
                className="gradient-button w-full"
              >
                <Send className="mr-2 h-4 w-4" />
                {status === "sending" ? "Sending..." : "Send message"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => {
        const elem = document.querySelector(link.href);
        return elem ? elem.getBoundingClientRect() : null;
      });
      const scrollPosition = window.scrollY + 150;

      for (let i = navLinks.length - 1; i >= 0; i--) {
        const section = document.querySelector(navLinks[i].href);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveLink(navLinks[i].href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2">
          <span className="gradient-text font-headline text-3xl font-bold">LH</span>
        </a>
        <nav className="hidden items-center gap-5 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`font-medium transition-colors hover:text-primary ${activeLink === link.href ? 'text-primary' : 'text-foreground/80'}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button onClick={() => setContactOpen(true)}>Contact Me</Button>
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center gap-4 p-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`w-full rounded-md py-2 text-center font-medium hover:bg-accent hover:text-accent-foreground ${activeLink === link.href ? 'bg-accent text-accent-foreground' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              className="mt-2 w-full"
              onClick={() => {
                setIsOpen(false);
                setContactOpen(true);
              }}
            >
              Contact Me
            </Button>
          </nav>
        </div>
      )}

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </header>
  );
}