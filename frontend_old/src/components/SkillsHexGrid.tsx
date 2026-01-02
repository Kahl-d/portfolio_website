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

// SVG illustrations for each category - enhanced visibility
const CategoryIllustrations: Record<SkillCategory, React.ReactNode> = {
  nlp: (
    <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" className="w-full h-full text-[var(--color-accent)]">
      {/* Text lines representing sentences - centered at y=60 */}
      <line x1="10" y1="40" x2="130" y2="40" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10" y1="60" x2="170" y2="60" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10" y1="80" x2="110" y2="80" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" strokeLinecap="round" />
      {/* Connecting arcs showing semantic relationships */}
      <path d="M 30 40 Q 55 18, 80 40" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
      <path d="M 90 60 Q 125 38, 160 60" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2" />
      <path d="M 50 80 Q 75 98, 100 80" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
      {/* Nodes at key points */}
      <circle cx="30" cy="40" r="4" fill="currentColor" fillOpacity="0.6" />
      <circle cx="80" cy="40" r="4" fill="currentColor" fillOpacity="0.6" />
      <circle cx="90" cy="60" r="4" fill="currentColor" fillOpacity="0.5" />
      <circle cx="160" cy="60" r="4" fill="currentColor" fillOpacity="0.5" />
      <circle cx="50" cy="80" r="4" fill="currentColor" fillOpacity="0.45" />
      <circle cx="100" cy="80" r="4" fill="currentColor" fillOpacity="0.45" />
    </svg>
  ),
  llm: (
    <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" className="w-full h-full text-[var(--color-accent)]">
      {/* Central brain/model node */}
      <circle cx="100" cy="60" r="24" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2" />
      <circle cx="100" cy="60" r="14" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
      {/* Radiating connections to agents */}
      <line x1="100" y1="36" x2="100" y2="12" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
      <line x1="124" y1="60" x2="165" y2="60" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
      <line x1="76" y1="60" x2="35" y2="60" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
      <line x1="117" y1="77" x2="150" y2="102" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
      <line x1="83" y1="77" x2="50" y2="102" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
      {/* Agent nodes */}
      <rect x="90" y="2" width="20" height="14" rx="3" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      <rect x="165" y="50" width="24" height="20" rx="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      <rect x="11" y="50" width="24" height="20" rx="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="150" cy="102" r="6" fill="currentColor" fillOpacity="0.25" />
      <circle cx="50" cy="102" r="6" fill="currentColor" fillOpacity="0.25" />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" className="w-full h-full text-[var(--color-accent)]">
      {/* Data flow streams */}
      <path d="M 10 85 Q 50 35, 100 60 T 190 30" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 10 55 Q 60 85, 100 45 T 190 75" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
      {/* Data points along the flow */}
      <circle cx="35" cy="60" r="6" fill="currentColor" fillOpacity="0.5" />
      <circle cx="70" cy="50" r="5" fill="currentColor" fillOpacity="0.45" />
      <circle cx="100" cy="55" r="8" fill="currentColor" fillOpacity="0.55" />
      <circle cx="130" cy="42" r="5" fill="currentColor" fillOpacity="0.45" />
      <circle cx="165" cy="45" r="6" fill="currentColor" fillOpacity="0.5" />
      {/* Small data particles */}
      <circle cx="50" cy="72" r="3" fill="currentColor" fillOpacity="0.35" />
      <circle cx="145" cy="58" r="3" fill="currentColor" fillOpacity="0.35" />
    </svg>
  ),
  cv: (
    <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" className="w-full h-full text-[var(--color-accent)]">
      {/* Eye outline */}
      <ellipse cx="100" cy="60" rx="50" ry="32" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
      <circle cx="100" cy="60" r="18" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
      <circle cx="100" cy="60" r="8" fill="currentColor" fillOpacity="0.4" />
      <circle cx="96" cy="56" r="3" fill="currentColor" fillOpacity="0.6" />
      {/* Vision rays */}
      <line x1="155" y1="50" x2="185" y2="32" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4,4" />
      <line x1="155" y1="60" x2="190" y2="60" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4,4" />
      <line x1="155" y1="70" x2="185" y2="88" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4,4" />
      {/* Detection points */}
      <circle cx="185" cy="32" r="4" fill="currentColor" fillOpacity="0.4" />
      <circle cx="190" cy="60" r="4" fill="currentColor" fillOpacity="0.4" />
      <circle cx="185" cy="88" r="4" fill="currentColor" fillOpacity="0.4" />
    </svg>
  ),
  infra: (
    <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" className="w-full h-full text-[var(--color-accent)]">
      {/* Server stack */}
      <rect x="25" y="20" width="55" height="20" rx="3" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2" />
      <rect x="25" y="45" width="55" height="20" rx="3" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
      <rect x="25" y="70" width="55" height="20" rx="3" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
      {/* Server lights */}
      <circle cx="38" cy="30" r="3" fill="currentColor" fillOpacity="0.6" />
      <circle cx="38" cy="55" r="3" fill="currentColor" fillOpacity="0.5" />
      <circle cx="38" cy="80" r="3" fill="currentColor" fillOpacity="0.4" />
      {/* Connection lines */}
      <path d="M 80 40 Q 115 40, 130 25" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
      <path d="M 80 55 Q 115 55, 145 55" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
      <path d="M 80 75 Q 115 75, 130 90" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
      {/* Network nodes */}
      <circle cx="145" cy="25" r="12" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      <circle cx="160" cy="55" r="14" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="145" cy="90" r="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
    </svg>
  ),
  engineering: (
    <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" className="w-full h-full text-[var(--color-accent)]">
      {/* Code brackets */}
      <path d="M 35 25 L 15 55 L 35 85" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 165 25 L 185 55 L 165 85" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Code lines */}
      <line x1="55" y1="38" x2="105" y2="38" stroke="currentColor" strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round" />
      <line x1="65" y1="55" x2="135" y2="55" stroke="currentColor" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
      <line x1="55" y1="72" x2="115" y2="72" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />
      {/* Cursor */}
      <rect x="138" y="50" width="3" height="14" fill="currentColor" fillOpacity="0.5" />
    </svg>
  ),
  tools: (
    <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" className="w-full h-full text-[var(--color-accent)]">
      {/* Main gear */}
      <circle cx="100" cy="60" r="28" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
      <circle cx="100" cy="60" r="14" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
      {/* Gear teeth */}
      <line x1="100" y1="28" x2="100" y2="16" stroke="currentColor" strokeOpacity="0.5" strokeWidth="5" strokeLinecap="round" />
      <line x1="100" y1="92" x2="100" y2="104" stroke="currentColor" strokeOpacity="0.5" strokeWidth="5" strokeLinecap="round" />
      <line x1="68" y1="60" x2="56" y2="60" stroke="currentColor" strokeOpacity="0.5" strokeWidth="5" strokeLinecap="round" />
      <line x1="132" y1="60" x2="144" y2="60" stroke="currentColor" strokeOpacity="0.5" strokeWidth="5" strokeLinecap="round" />
      {/* Diagonal teeth */}
      <line x1="80" y1="40" x2="72" y2="32" stroke="currentColor" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
      <line x1="120" y1="40" x2="128" y2="32" stroke="currentColor" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
      <line x1="80" y1="80" x2="72" y2="88" stroke="currentColor" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
      <line x1="120" y1="80" x2="128" y2="88" stroke="currentColor" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
  research: (
    <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" className="w-full h-full text-[var(--color-accent)]">
      {/* Open book */}
      <path d="M 100 95 L 100 30" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <path d="M 100 30 Q 65 24, 30 36 L 30 95 Q 65 88, 100 95" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
      <path d="M 100 30 Q 135 24, 170 36 L 170 95 Q 135 88, 100 95" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
      {/* Page lines */}
      <line x1="42" y1="48" x2="85" y2="44" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="42" y1="60" x2="88" y2="56" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      <line x1="42" y1="72" x2="82" y2="68" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
      <line x1="115" y1="44" x2="158" y2="48" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="112" y1="56" x2="158" y2="60" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      {/* Lightbulb */}
      <circle cx="100" cy="12" r="10" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
      <path d="M 96 18 L 96 24 L 104 24 L 104 18" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
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
        <div className="p-6 lg:p-8 bg-[var(--color-card)] rounded-3xl mb-10">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            {/* SVG Illustration */}
            <div className="w-[180px] h-[110px] flex-shrink-0 rounded-2xl bg-[var(--color-muted)]/30 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                {CategoryIllustrations[activeCategory]}
              </div>
            </div>
            
            {/* Category Text Content */}
            <div className="flex flex-col gap-4 flex-1 text-center lg:text-left">
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
