// Skills data organized by category
export const SKILL_CATEGORIES = [
  { id: "nlp", name: "NLP" },
  { id: "llm", name: "LLMs & Agents" },
  { id: "data", name: "Data" },
  { id: "cv", name: "Vision" },
  { id: "infra", name: "Infrastructure" },
  { id: "engineering", name: "Engineering" },
  { id: "tools", name: "Tools" },
  { id: "research", name: "Research" },
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number]["id"];

export interface Skill {
  name: string;
  category: SkillCategory;
  icon?: string;
}

export const SKILLS: Skill[] = [
  // NLP & Representation Learning
  { name: "Transformers", category: "nlp", icon: "layers" },
  { name: "BERT", category: "nlp", icon: "brain" },
  { name: "DeBERTa", category: "nlp", icon: "brain" },
  { name: "NER", category: "nlp", icon: "search" },
  { name: "Text Classification", category: "nlp", icon: "file" },
  { name: "Semantic Analysis", category: "nlp", icon: "message" },
  { name: "Embeddings", category: "nlp", icon: "network" },
  { name: "Attention", category: "nlp", icon: "zap" },

  // LLMs & Agents
  { name: "Mistral", category: "llm", icon: "sparkles" },
  { name: "RAG", category: "llm", icon: "search" },
  { name: "AI Agents", category: "llm", icon: "cpu" },
  { name: "Agent Evaluation", category: "llm", icon: "chart" },
  { name: "Prompt Engineering", category: "llm", icon: "message" },
  { name: "Fine-tuning", category: "llm", icon: "settings" },
  { name: "Model-as-Judge", category: "llm", icon: "chart" },
  { name: "Conversational AI", category: "llm", icon: "message" },
  { name: "OpenAI", category: "llm", icon: "openai" },

  // Data & Augmentation
  { name: "Data Augmentation", category: "data", icon: "sparkles" },
  { name: "Imbalanced Learning", category: "data", icon: "chart" },
  { name: "Domain Adaptation", category: "data", icon: "layers" },
  { name: "Robustness", category: "data", icon: "flask_icon" },

  // Computer Vision
  { name: "Image Classification", category: "cv", icon: "eye" },
  { name: "Feature Attribution", category: "cv", icon: "search" },
  { name: "Interpretability", category: "cv", icon: "eye" },
  { name: "Bias Analysis", category: "cv", icon: "chart" },

  // Infrastructure & ML Ops
  { name: "HPC", category: "infra", icon: "server" },
  { name: "Distributed Systems", category: "infra", icon: "network" },
  { name: "ML Pipelines", category: "infra", icon: "layers" },
  { name: "Experiment Tracking", category: "infra", icon: "chart" },
  { name: "Docker", category: "infra", icon: "docker" },
  { name: "Linux", category: "infra", icon: "linux" },

  // Engineering
  { name: "Python", category: "engineering", icon: "python" },
  { name: "SQL", category: "engineering", icon: "database" },
  { name: "PostgreSQL", category: "engineering", icon: "postgresql" },
  { name: "ETL Pipelines", category: "engineering", icon: "layers" },
  { name: "FastAPI", category: "engineering", icon: "fastapi" },
  { name: "Git", category: "engineering", icon: "git" },

  // Frameworks & Tools
  { name: "PyTorch", category: "tools", icon: "pytorch" },
  { name: "Hugging Face", category: "tools", icon: "huggingface" },
  { name: "scikit-learn", category: "tools", icon: "sklearn" },
  { name: "TensorFlow", category: "tools", icon: "tensorflow" },
  { name: "NumPy", category: "tools", icon: "numpy" },
  { name: "Pandas", category: "tools", icon: "pandas" },
  { name: "Jupyter", category: "tools", icon: "jupyter" },

  // Research
  { name: "Research Writing", category: "research", icon: "file" },
  { name: "Statistics", category: "research", icon: "chart" },
  { name: "Experiment Design", category: "research", icon: "flask_icon" },
  { name: "Teaching", category: "research", icon: "graduation" },
  { name: "Publishing", category: "research", icon: "book" },
];
