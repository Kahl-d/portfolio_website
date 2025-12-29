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

// Subtle SVG illustrations for each category
const CategoryIllustrations: Record<SkillCategory, React.ReactNode> = {
  nlp: (
    <svg viewBox="0 0 200 120" className="w-full h-full text-[var(--color-foreground)]">
      {/* Text lines representing sentences */}
      <line x1="20" y1="30" x2="140" y2="30" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="45" x2="180" y2="45" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="60" x2="120" y2="60" stroke="currentColor" strokeOpacity="0.1" strokeWidth="2" strokeLinecap="round" />
      {/* Connecting arcs showing semantic relationships */}
      <path d="M 40 30 Q 60 10, 80 30" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
      <path d="M 100 45 Q 130 25, 160 45" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" />
      <path d="M 60 60 Q 80 75, 100 60" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
      {/* Nodes at key points */}
      <circle cx="40" cy="30" r="3" fill="currentColor" fillOpacity="0.25" />
      <circle cx="80" cy="30" r="3" fill="currentColor" fillOpacity="0.25" />
      <circle cx="100" cy="45" r="3" fill="currentColor" fillOpacity="0.2" />
      <circle cx="160" cy="45" r="3" fill="currentColor" fillOpacity="0.2" />
    </svg>
  ),
  llm: (
    <svg viewBox="0 0 200 120" className="w-full h-full text-[var(--color-foreground)]">
      {/* Central brain/model node */}
      <circle cx="100" cy="60" r="20" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" />
      <circle cx="100" cy="60" r="12" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
      {/* Radiating connections to agents */}
      <line x1="100" y1="40" x2="100" y2="15" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
      <line x1="120" y1="60" x2="160" y2="60" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
      <line x1="80" y1="60" x2="40" y2="60" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
      <line x1="115" y1="75" x2="145" y2="100" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.5" />
      <line x1="85" y1="75" x2="55" y2="100" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.5" />
      {/* Agent nodes */}
      <rect x="92" y="5" width="16" height="12" rx="2" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
      <rect x="160" y="52" width="20" height="16" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
      <rect x="20" y="52" width="20" height="16" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 200 120" className="w-full h-full text-[var(--color-foreground)]">
      {/* Data flow streams */}
      <path d="M 20 80 Q 50 40, 100 60 T 180 40" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" strokeLinecap="round" />
      <path d="M 20 60 Q 60 80, 100 50 T 180 70" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.5" strokeLinecap="round" />
      {/* Data points along the flow */}
      <circle cx="40" cy="65" r="4" fill="currentColor" fillOpacity="0.2" />
      <circle cx="70" cy="55" r="3" fill="currentColor" fillOpacity="0.15" />
      <circle cx="100" cy="58" r="5" fill="currentColor" fillOpacity="0.25" />
      <circle cx="130" cy="48" r="3" fill="currentColor" fillOpacity="0.15" />
      <circle cx="160" cy="52" r="4" fill="currentColor" fillOpacity="0.2" />
    </svg>
  ),
  cv: (
    <svg viewBox="0 0 200 120" className="w-full h-full text-[var(--color-foreground)]">
      {/* Eye outline */}
      <ellipse cx="100" cy="60" rx="45" ry="30" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
      <circle cx="100" cy="60" r="15" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" />
      <circle cx="100" cy="60" r="6" fill="currentColor" fillOpacity="0.1" />
      {/* Vision rays */}
      <line x1="150" y1="60" x2="180" y2="45" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="150" y1="60" x2="185" y2="60" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="150" y1="60" x2="180" y2="75" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="3,3" />
    </svg>
  ),
  infra: (
    <svg viewBox="0 0 200 120" className="w-full h-full text-[var(--color-foreground)]">
      {/* Server stack */}
      <rect x="30" y="25" width="50" height="15" rx="2" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" />
      <rect x="30" y="45" width="50" height="15" rx="2" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
      <rect x="30" y="65" width="50" height="15" rx="2" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.5" />
      {/* Server lights */}
      <circle cx="40" cy="32" r="2" fill="currentColor" fillOpacity="0.25" />
      <circle cx="40" cy="52" r="2" fill="currentColor" fillOpacity="0.2" />
      <circle cx="40" cy="72" r="2" fill="currentColor" fillOpacity="0.15" />
      {/* Connection lines */}
      <path d="M 80 50 Q 110 50, 120 35" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
      <path d="M 80 55 Q 110 55, 130 55" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.5" />
      {/* Network nodes */}
      <circle cx="140" cy="35" r="8" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
      <circle cx="150" cy="55" r="10" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
    </svg>
  ),
  engineering: (
    <svg viewBox="0 0 200 120" className="w-full h-full text-[var(--color-foreground)]">
      {/* Code brackets */}
      <path d="M 40 30 L 25 55 L 40 80" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 160 30 L 175 55 L 160 80" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Code lines */}
      <line x1="60" y1="40" x2="100" y2="40" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" strokeLinecap="round" />
      <line x1="70" y1="55" x2="130" y2="55" stroke="currentColor" strokeOpacity="0.1" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="70" x2="110" y2="70" stroke="currentColor" strokeOpacity="0.08" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  tools: (
    <svg viewBox="0 0 200 120" className="w-full h-full text-[var(--color-foreground)]">
      {/* Gear */}
      <circle cx="100" cy="60" r="22" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
      <circle cx="100" cy="60" r="10" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
      {/* Gear teeth */}
      <line x1="100" y1="35" x2="100" y2="26" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="85" x2="100" y2="94" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" strokeLinecap="round" />
      <line x1="75" y1="60" x2="66" y2="60" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" strokeLinecap="round" />
      <line x1="125" y1="60" x2="134" y2="60" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  research: (
    <svg viewBox="0 0 200 120" className="w-full h-full text-[var(--color-foreground)]">
      {/* Open book */}
      <path d="M 100 85 L 100 30" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
      <path d="M 100 30 Q 70 25, 40 35 L 40 85 Q 70 80, 100 85" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
      <path d="M 100 30 Q 130 25, 160 35 L 160 85 Q 130 80, 100 85" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
      {/* Page lines */}
      <line x1="50" y1="45" x2="85" y2="42" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="50" y1="55" x2="88" y2="52" stroke="currentColor" strokeOpacity="0.06" strokeWidth="1" />
      <line x1="115" y1="42" x2="150" y2="45" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
      {/* Lightbulb */}
      <circle cx="100" cy="15" r="8" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
    </svg>
  ),
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("nlp");

  const activeConfig = SKILL_CATEGORIES.find((c) => c.id === activeCategory);
  const filteredSkills = SKILLS.filter(
    (skill) => skill.category === activeCategory
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Category Filter Navigation */}
      <nav className="flex flex-wrap gap-2 justify-center p-2 bg-[var(--color-card)] rounded-full border border-[var(--color-border)]">
        {SKILL_CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                  : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </nav>

      {/* Active Category Content */}
      <div key={activeCategory} className="animate-fade-in">
        {/* Category Header with Illustration */}
        <div className="p-8 lg:p-10 bg-[var(--color-card)] rounded-3xl mb-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* SVG Illustration */}
            <div className="w-[180px] h-[100px] flex-shrink-0 mx-auto lg:mx-0 opacity-80">
              {CategoryIllustrations[activeCategory]}
            </div>
            
            {/* Category Text Content */}
            <div className="flex flex-col gap-5 flex-1">
              <h3 className="text-xl lg:text-2xl font-semibold font-serif">
                <span className="text-[var(--color-accent)]">{activeConfig?.name}</span>
                <span className="text-[var(--color-muted-foreground)] font-normal mx-2">|</span>
                <span className="text-[var(--color-foreground)]">{activeConfig?.title}</span>
              </h3>
              <p className="text-base leading-loose text-[var(--color-muted-foreground)] max-w-2xl">
                {activeConfig?.description}
              </p>
              <p className="text-sm leading-relaxed text-[var(--color-accent)] italic pl-5 border-l-2 border-[var(--color-accent)] mt-2">
                {activeConfig?.layer}
              </p>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="flex flex-wrap gap-5 justify-center">
          {filteredSkills.map((skill, index) => {
            const icon = skill.icon ? skillIcons[skill.icon] : <Code />;

            return (
              <div
                key={skill.name}
                className="skill-card"
                style={{ animationDelay: `${index * 0.04}s` }}
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
    </div>
  );
}
