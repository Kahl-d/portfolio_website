// Skills data organized by category with descriptions
// Ported from old frontend with blueprint position coordinates

export const SKILL_CATEGORIES = [
    {
        id: "data",
        name: "Data",
        title: "Layer 1: The Foundation",
        description:
            "Most model failures are data failures in disguise. I focus on how learning conditions like imbalance, noise, and domain shift shape what models internalize and where they break.",
        layer: "Data-centric ML, robustness, and learning under real-world constraints.",
        position: { rotateY: 0, rotateX: 0, zoom: 1 },
        color: "150 60% 45%", // Green
        layerIndex: 0,
    },
    {
        id: "engineering",
        name: "Engineering",
        title: "Layer 2: The Pipeline",
        description:
            "Models matter only when they integrate into real systems. Engineering is where research becomes accessible, reliable, and testable.",
        layer: "Production thinking, data flow, and system integration.",
        position: { rotateY: 0, rotateX: 0, zoom: 1 },
        color: "45 90% 50%", // Orange
        layerIndex: 1,
    },
    {
        id: "infra",
        name: "Infrastructure",
        title: "Layer 3: The Substrate",
        description:
            "Good ideas don't survive without good systems. I treat infrastructure as part of the research methodology, enabling reproducibility, scale, and controlled experimentation.",
        layer: "Execution, scalability, and experimental rigor.",
        position: { rotateY: 0, rotateX: 0, zoom: 1 },
        color: "180 60% 45%", // Cyan/Teal
        layerIndex: 2,
    },
    {
        id: "tools",
        name: "Tools",
        title: "Layer 4: The Frameworks",
        description:
            "Tools are interchangeable; understanding is not. I use these frameworks to prototype, train, and analyze models. Not to define my work, but to enable it.",
        layer: "Practical ML execution across research and applied settings.",
        position: { rotateY: 0, rotateX: 0, zoom: 1 },
        color: "0 70% 55%", // Red
        layerIndex: 3,
    },
    {
        id: "cv",
        name: "Vision",
        title: "Layer 5: Perception",
        description:
            "Accuracy without understanding is fragile. My vision work emphasizes auditing model decisions, identifying what visual evidence drives predictions and where bias or shortcuts emerge.",
        layer: "Interpretability and failure analysis in visual learning systems.",
        position: { rotateY: 0, rotateX: 0, zoom: 1 },
        color: "30 80% 55%", // Orange/Yellow
        layerIndex: 4,
    },
    {
        id: "nlp",
        name: "NLP",
        title: "Layer 6: Understanding",
        description:
            "Language models don't fail because they lack capacity. They fail when meaning is fragmented. My work focuses on preserving semantic continuity across sentences, narratives, and contexts.",
        layer: "Foundational language modeling, representation learning, and semantic structure.",
        position: { rotateY: 0, rotateX: 0, zoom: 1 },
        color: "210 80% 60%", // Blue
        layerIndex: 5,
    },
    {
        id: "llm",
        name: "LLMs & Agents",
        title: "Layer 7: Reasoning",
        description:
            "The real challenge with LLMs begins after generation. I'm interested in turning language models into reliable, evaluable, and state-aware agents.",
        layer: "Interaction, orchestration, and behavioral evaluation of modern LLM systems.",
        position: { rotateY: 0, rotateX: 0, zoom: 1 },
        color: "270 70% 60%", // Purple
        layerIndex: 6,
    },
    {
        id: "research",
        name: "Research",
        title: "Layer 8: Optimization",
        description:
            "Research is a discipline of asking precise questions, designing controlled experiments, and communicating insight clearly.",
        layer: "Scientific thinking, communication, and mentorship.",
        position: { rotateY: 0, rotateX: 0, zoom: 1 },
        color: "320 60% 55%", // Pink
        layerIndex: 7,
    },
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number]["id"];

export interface Skill {
    name: string;
    category: SkillCategory;
    icon: string;
}

export interface CategoryConfig {
    id: SkillCategory;
    name: string;
    title: string;
    description: string;
    layer: string;
    position: { rotateY: number; rotateX: number; zoom: number };
    color: string;
    layerIndex: number;
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
    { name: "Robustness", category: "data", icon: "flask" },

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
    { name: "Experiment Design", category: "research", icon: "flask" },
    { name: "Research Writing", category: "research", icon: "file" },
    { name: "Teaching", category: "research", icon: "graduation" },
    { name: "Publishing", category: "research", icon: "book" },
];

// Get skills for a specific category
export function getSkillsByCategory(categoryId: SkillCategory): Skill[] {
    return SKILLS.filter((skill) => skill.category === categoryId);
}

// Get category config by ID
export function getCategoryById(categoryId: SkillCategory): CategoryConfig | undefined {
    return SKILL_CATEGORIES.find((c) => c.id === categoryId) as CategoryConfig | undefined;
}

// Calculate which category should be active based on scroll progress (0-1)
export function getActiveCategoryFromProgress(progress: number): SkillCategory {
    const categoryCount = SKILL_CATEGORIES.length;
    const index = Math.min(
        Math.floor(progress * categoryCount),
        categoryCount - 1
    );
    return SKILL_CATEGORIES[index].id;
}
