import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkillsHexGrid from "@/components/SkillsHexGrid";
import ExperienceCard from "@/components/ExperienceCard";
import ProjectsSection from "@/components/ProjectsSection";
import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";
import { EXPERIENCES } from "@/lib/experiences";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] animate-fade-in">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero / About Section */}
        <section
          id="about"
          className="relative rounded-[2.5rem] overflow-hidden bg-[var(--color-muted)] my-8 animate-fade-in"
        >
          <div className="p-8 md:p-12 lg:p-16">
            <div className="max-w-4xl space-y-6 md:space-y-8">
              <div className="space-y-4 md:space-y-6">
                <p className="text-[var(--color-accent)] font-medium animate-slide-down">
                  Hello, I&apos;m
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight animate-slide-down">
                  {SITE_CONFIG.name}
                </h1>
                <p className="text-[var(--color-muted-foreground)] text-lg md:text-xl leading-relaxed max-w-xl animate-slide-up stagger-1">
                  A passionate developer crafting digital experiences. I build
                  things for the web with a focus on clean design and seamless
                  functionality.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 pt-4 animate-slide-up stagger-2">
                <a
                  href="#projects"
                  className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-[var(--color-primary-foreground)] rounded-full px-8 py-4 md:px-10 text-base font-medium transition-all hover:scale-105 w-full sm:w-auto text-center"
                >
                  View Projects
                </a>

                <div className="flex items-center gap-4">
                  <a
                    href={SOCIAL_LINKS.github}
                    className="w-12 h-12 rounded-full border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-card)] transition-all flex items-center justify-center hover:scale-110"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    className="w-12 h-12 rounded-full border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-card)] transition-all flex items-center justify-center hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.email}
                    className="w-12 h-12 rounded-full border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-card)] transition-all flex items-center justify-center hover:scale-110"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12 md:py-16">
          <div className="animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Skills
            </h2>
            <p className="text-[var(--color-muted-foreground)] mb-8 max-w-2xl">
              Technologies and tools I work with.
            </p>

            <SkillsHexGrid />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 md:py-16">
          <div className="animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Projects
            </h2>
            <p className="text-[var(--color-muted-foreground)] mb-8 max-w-2xl">
              A collection of work I&apos;m proud of.
            </p>

            <ProjectsSection />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-12 md:py-16">
          <div className="animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Experience
            </h2>
            <p className="text-[var(--color-muted-foreground)] mb-8 max-w-2xl">
              My professional journey across research, industry, and teaching.
            </p>

            <div className="experience-grid">
              {EXPERIENCES.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-16">
          <div className="rounded-[2.5rem] bg-[var(--color-card)] p-12 md:p-16 text-center animate-scale-in">
            <div className="max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Let&apos;s connect.
              </h2>
              <p className="text-xl text-[var(--color-muted-foreground)] leading-relaxed">
                Have a project in mind or just want to say hello? I&apos;d love
                to hear from you.
              </p>
              <a
                href={SOCIAL_LINKS.email}
                className="inline-block bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-[var(--color-primary-foreground)] rounded-full px-10 py-4 text-base font-medium transition-all hover:scale-105"
              >
                Say Hello
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
