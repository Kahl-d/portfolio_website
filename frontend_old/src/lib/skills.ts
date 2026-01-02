// Skills data organized by category with descriptions

export const SKILL_CATEGORIES = [
  {
    id: "nlp",
    name: "NLP",
    title: "Understanding meaning beyond tokens",
    description:
      "Language models don't fail because they lack capacity. They fail when meaning is fragmented. My work focuses on preserving semantic continuity across sentences, narratives, and contexts rather than treating language as isolated units.",
    layer: "Foundational language modeling, representation learning, and semantic structure: the core of how models 'understand' text.",
  },
  {
    id: "llm",
    name: "LLMs & Agents",
    title: "From static models to interactive systems",
    description:
      "The real challenge with LLMs begins after generation, when models must act, respond, remember, and stay consistent over time. I'm interested in turning language models into reliable, evaluable, and state-aware agents.",
    layer: "Interaction, orchestration, and behavioral evaluation of modern LLM systems.",
  },
  {
    id: "data",
    name: "Data",
    title: "Shaping how models learn",
    description:
      "Most model failures are data failures in disguise. I focus on how learning conditions like imbalance, noise, and domain shift shape what models internalize and where they break.",
    layer: "Data-centric ML, robustness, and learning under real-world constraints.",
  },
  {
    id: "cv",
    name: "Vision",
    title: "Interrogating what models see and why",
    description:
      "Accuracy without understanding is fragile. My vision work emphasizes auditing model decisions, identifying what visual evidence drives predictions and where bias or shortcuts emerge.",
    layer: "Interpretability and failure analysis in visual learning systems.",
  },
  {
    id: "infra",
    name: "Infrastructure",
    title: "Scaling ideas into experiments",
    description:
      "Good ideas don't survive without good systems. I treat infrastructure as part of the research methodology, enabling reproducibility, scale, and controlled experimentation.",
    layer: "Execution, scalability, and experimental rigor.",
  },
  {
    id: "engineering",
    name: "Engineering",
    title: "Making models usable",
    description:
      "Models matter only when they integrate into real systems. Engineering is where research becomes accessible, reliable, and testable.",
    layer: "Production thinking, data flow, and system integration.",
  },
  {
    id: "tools",
    name: "Tools",
    title: "Execution, not identity",
    description:
      "Tools are interchangeable; understanding is not. I use these frameworks to prototype, train, and analyze models. Not to define my work, but to enable it.",
    layer: "Practical ML execution across research and applied settings.",
  },
  {
    id: "research",
    name: "Research",
    title: "How I work, not just what I build",
    description:
      "Research is a discipline of asking precise questions, designing controlled experiments, and communicating insight clearly, whether to students, collaborators, or reviewers.",
    layer: "Scientific thinking, communication, and mentorship.",
  },
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number]["id"];

export interface Skill {
  name: string;
  category: SkillCategory;
  icon?: string;
}

// Skills ordered by: foundation → structure → task (or similar logical progressions per category)
export const SKILLS: Skill[] = [
  // NLP: foundation → structure → task
  { name: "Transformers", category: "nlp", icon: "layers" },
  { name: "Attention", category: "nlp", icon: "zap" },
  { name: "Embeddings", category: "nlp", icon: "network" },
  { name: "BERT", category: "nlp", icon: "brain" },
  { name: "DeBERTa", category: "nlp", icon: "brain" },
  { name: "Semantic Analysis", category: "nlp", icon: "message" },
  { name: "Text Classification", category: "nlp", icon: "file" },
  { name: "Named Entity Recognition", category: "nlp", icon: "search" },

  // LLMs & Agents: model → system → evaluation
  { name: "Mistral", category: "llm", icon: "sparkles" },
  { name: "OpenAI", category: "llm", icon: "openai" },
  { name: "Fine-tuning", category: "llm", icon: "settings" },
  { name: "Prompt Engineering", category: "llm", icon: "message" },
  { name: "RAG", category: "llm", icon: "search" },
  { name: "AI Agents", category: "llm", icon: "cpu" },
  { name: "Conversational AI", category: "llm", icon: "message" },
  { name: "Agent Evaluation", category: "llm", icon: "chart" },
  { name: "Model-as-Judge", category: "llm", icon: "chart" },

  // Data: cause → correction → outcome
  { name: "Imbalanced Learning", category: "data", icon: "chart" },
  { name: "Domain Adaptation", category: "data", icon: "layers" },
  { name: "Data Augmentation", category: "data", icon: "sparkles" },
  { name: "Robustness", category: "data", icon: "flask_icon" },

  // Vision: task → explanation → critique
  { name: "Image Classification", category: "cv", icon: "eye" },
  { name: "Feature Attribution", category: "cv", icon: "search" },
  { name: "Interpretability", category: "cv", icon: "eye" },
  { name: "Bias Analysis", category: "cv", icon: "chart" },

  // Infrastructure: environment → orchestration → reliability
  { name: "Linux", category: "infra", icon: "linux" },
  { name: "HPC", category: "infra", icon: "server" },
  { name: "Distributed Systems", category: "infra", icon: "network" },
  { name: "ML Pipelines", category: "infra", icon: "layers" },
  { name: "Experiment Tracking", category: "infra", icon: "chart" },
  { name: "Docker", category: "infra", icon: "docker" },

  // Engineering: language → data → deployment
  { name: "Python", category: "engineering", icon: "python" },
  { name: "SQL", category: "engineering", icon: "database" },
  { name: "PostgreSQL", category: "engineering", icon: "postgresql" },
  { name: "ETL Pipelines", category: "engineering", icon: "layers" },
  { name: "FastAPI", category: "engineering", icon: "fastapi" },
  { name: "Git", category: "engineering", icon: "git" },

  // Tools: core → ecosystem → analysis
  { name: "PyTorch", category: "tools", icon: "pytorch" },
  { name: "Hugging Face", category: "tools", icon: "huggingface" },
  { name: "scikit-learn", category: "tools", icon: "sklearn" },
  { name: "TensorFlow", category: "tools", icon: "tensorflow" },
  { name: "NumPy", category: "tools", icon: "numpy" },
  { name: "Pandas", category: "tools", icon: "pandas" },
  { name: "Jupyter", category: "tools", icon: "jupyter" },

  // Research: thinking → execution → impact
  { name: "Statistics", category: "research", icon: "chart" },
  { name: "Experiment Design", category: "research", icon: "flask_icon" },
  { name: "Research Writing", category: "research", icon: "file" },
  { name: "Teaching", category: "research", icon: "graduation" },
  { name: "Publishing", category: "research", icon: "book" },
];
