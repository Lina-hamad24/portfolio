import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Lina Hamad | Portfolio',
    template: '%s | Lina Hamad',
  },
  description:
    'Portfolio of Lina Hamad: projects, skills, experience, and contact details.',
  openGraph: {
    title: 'Lina Hamad | Portfolio',
    description: 'Explore my projects, skills, and experience, and get in touch.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#f8fafc',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}