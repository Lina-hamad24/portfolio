import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import AboutMeSection from '@/components/about-me-section';
import SkillsSection from '@/components/skills-section';
import CertificationsSection from '@/components/certifications-section';
import ProjectsSection from '@/components/projects-section';
import ExperienceSection from '@/components/experience-section';
import ContactSection from '@/components/contact-section';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex flex-col">
        <HeroSection />
        <AboutMeSection />
        <SkillsSection />
        <CertificationsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </div>
  );
}