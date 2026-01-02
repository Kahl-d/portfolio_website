import { Briefcase, GraduationCap, BookOpen, Award } from "lucide-react";
import type { Experience } from "@/lib/experiences";

const typeIcons = {
  work: Briefcase,
  research: GraduationCap,
  teaching: BookOpen,
};

const typeColors = {
  work: "var(--color-accent)",
  research: "#6366f1",
  teaching: "#f59e0b",
};

export default function ExperienceCard({ experience }: { experience: Experience }) {
  const Icon = typeIcons[experience.type];
  const color = typeColors[experience.type];

  return (
    <div className="experience-card">
      <div className="experience-header">
        <div className="experience-icon" style={{ background: color }}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="experience-meta">
          <h3 className="experience-title">{experience.title}</h3>
          <p className="experience-org">{experience.organization}</p>
          {experience.location && (
            <p className="experience-location">{experience.location}</p>
          )}
        </div>
        <span className="experience-period">{experience.period}</span>
      </div>

      {experience.advisor && (
        <p className="experience-advisor">Advisor: {experience.advisor}</p>
      )}

      {experience.award && (
        <div className="experience-award">
          <Award className="w-4 h-4" />
          <span>{experience.award}</span>
        </div>
      )}

      <p className="experience-description">{experience.description}</p>

      <div className="experience-highlights">
        {experience.highlights.map((highlight, i) => (
          <span key={i} className="experience-tag">
            {highlight}
          </span>
        ))}
      </div>
    </div>
  );
}

