// Story elements for the portfolio journey
// Quotes extracted from Statement of Purpose

export interface StoryQuote {
  id: string;
  text: string;
  context?: string;
}

export interface Highlight {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  award?: string;
  date: string;
  tags: string[];
}

// Meaningful quotes that tell your story
export const STORY_QUOTES: StoryQuote[] = [
  {
    id: "understanding",
    text: "Understanding a system means more than observing its outputs. It means reasoning about its internal structure, explaining its behavior, and communicating that understanding to others.",
    context: "Philosophy",
  },
  {
    id: "probabilistic",
    text: "I am drawn to probabilistic frameworks and how, when arranged correctly, they can model complex phenomena.",
    context: "Approach",
  },
  {
    id: "opacity",
    text: "Strong performance on traditional evaluation metrics can mask fragile reasoning.",
    context: "Insight",
  },
  {
    id: "semantics",
    text: "Can language models truly understand semantic meaning, or are they simply predicting the next token based on syntactic patterns?",
    context: "Research Question",
  },
  {
    id: "communication",
    text: "My commitment to understanding complex systems extends to how I communicate these concepts to others.",
    context: "Teaching",
  },
  {
    id: "core-questions",
    text: "How can we evaluate models to validate reasoning? How can we interpret complex architectures? How can we create representations that preserve semantic meaning?",
    context: "Research Agenda",
  },
];

// Hackathon highlight
export const HACKATHON_HIGHLIGHT: Highlight = {
  id: "sf-hacks-2025",
  title: "SF Hacks 2025",
  subtitle: "Emerging AI Innovation Winner",
  description: "Led development of Secure Sense, a privacy-first AI system for on-device inference. Demonstrated practical tradeoffs between privacy, latency, and model capability.",
  image: "/hackathon-team.gif",
  award: "Emerging AI Innovation Winner",
  date: "March 2025",
  tags: ["Privacy-First AI", "On-Device Inference", "Hackathon Winner"],
};

// Section transitions - small narrative bridges
export const SECTION_BRIDGES = {
  afterHero: "The journey from curiosity to contribution",
  beforeSkills: "Tools I've learned to think with",
  beforeProjects: "Ideas brought to life",
  beforeWriting: "Sharing what I learn",
  beforeExperience: "The path that led here",
  beforeContact: "What comes next",
};

