"use client";

import { useState } from "react";
import { SKILLS, SKILL_CATEGORIES, type SkillCategory } from "@/lib/skills";
import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiHuggingface,
  SiScikitlearn,
  SiOpenai,
  SiNumpy,
  SiPandas,
  SiDocker,
  SiGit,
  SiPostgresql,
  SiLinux,
  SiJupyter,
  SiFastapi,
} from "@icons-pack/react-simple-icons";
import {
  Brain,
  Database,
  Server,
  Code,
  BookOpen,
  Cpu,
  Eye,
  Sparkles,
  BarChart3,
  MessageSquare,
  Layers,
  Zap,
  Search,
  FileText,
  FlaskConical,
  GraduationCap,
  Settings,
  Network,
} from "lucide-react";

// Icon mapping
const skillIcons: Record<string, React.ReactNode> = {
  python: <SiPython />,
  pytorch: <SiPytorch />,
  tensorflow: <SiTensorflow />,
  huggingface: <SiHuggingface />,
  sklearn: <SiScikitlearn />,
  openai: <SiOpenai />,
  numpy: <SiNumpy />,
  pandas: <SiPandas />,
  docker: <SiDocker />,
  git: <SiGit />,
  postgresql: <SiPostgresql />,
  linux: <SiLinux />,
  jupyter: <SiJupyter />,
  fastapi: <SiFastapi />,
  brain: <Brain />,
  database: <Database />,
  server: <Server />,
  code: <Code />,
  book: <BookOpen />,
  cpu: <Cpu />,
  eye: <Eye />,
  sparkles: <Sparkles />,
  chart: <BarChart3 />,
  message: <MessageSquare />,
  layers: <Layers />,
  zap: <Zap />,
  search: <Search />,
  file: <FileText />,
  flask_icon: <FlaskConical />,
  graduation: <GraduationCap />,
  settings: <Settings />,
  network: <Network />,
};

export default function SkillsGrid() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("nlp");

  const filteredSkills = SKILLS.filter(
    (skill) => skill.category === activeCategory
  );

  return (
    <div className="skills-section">
      {/* Skills grid */}
      <div className="skills-grid-area">
        <div className="skills-grid">
          {filteredSkills.map((skill, index) => {
            const icon = skill.icon ? skillIcons[skill.icon] : <Code />;

            return (
              <div
                key={skill.name}
                className="skill-card group"
                style={{ animationDelay: `${index * 0.025}s` }}
              >
                <div className="skill-icon-wrapper">
                  <span className="skill-icon">{icon}</span>
                </div>
                <span className="skill-name">{skill.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter list */}
      <div className="skills-filter-area">
        <nav className="filter-list">
          {SKILL_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`filter-item ${isActive ? "active" : ""}`}
              >
                {category.name}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
