// Experience Timeline Data
// Categories: education, research, professional, teaching, project, leadership
// Award types: trophy, medal, scroll (for poster presentations)

export type ExperienceCategory =
    | "education"
    | "research"
    | "professional"
    | "teaching"
    | "project"
    | "leadership";

export type AwardType = "trophy" | "medal" | "scroll";

export interface Experience {
    id: string;
    category: ExperienceCategory;
    title: string;
    organization: string;
    location: string;
    startDate: Date;
    endDate: Date | null; // null = present
    description: string[];
    highlights?: string[];
}

export interface Award {
    id: string;
    type: AwardType;
    title: string;
    organization: string;
    date: Date;
    description: string;
}

// Category colors (HSL values)
export const CATEGORY_COLORS: Record<ExperienceCategory, { light: string; dark: string }> = {
    education: { light: "210 80% 60%", dark: "210 70% 55%" },
    research: { light: "270 70% 60%", dark: "270 60% 55%" },
    professional: { light: "150 60% 45%", dark: "150 50% 40%" },
    teaching: { light: "30 80% 55%", dark: "30 70% 50%" },
    project: { light: "180 60% 45%", dark: "180 50% 40%" },
    leadership: { light: "45 90% 50%", dark: "45 80% 45%" },
};

export const CATEGORY_LABELS: Record<ExperienceCategory, string> = {
    education: "Education",
    research: "Research",
    professional: "Professional",
    teaching: "Teaching",
    project: "Projects",
    leadership: "Leadership",
};

export const CATEGORY_ICONS: Record<ExperienceCategory, string> = {
    education: "🎓",
    research: "🔬",
    professional: "💼",
    teaching: "📚",
    project: "🚀",
    leadership: "👥",
};

export const AWARD_ICONS: Record<AwardType, string> = {
    trophy: "🏆",
    medal: "🎖️",
    scroll: "📜",
};

// Timeline range
export const TIMELINE_START = new Date(2017, 7, 1); // Aug 2017
export const TIMELINE_END = new Date(2025, 11, 31); // Dec 2025

// All experiences
export const EXPERIENCES: Experience[] = [
    // Education
    {
        id: "btech-lnmiit",
        category: "education",
        title: "Bachelor of Technology in Computer Science and Engineering",
        organization: "The LNM Institute of Information Technology",
        location: "Jaipur, India",
        startDate: new Date(2017, 7, 1),
        endDate: new Date(2021, 8, 30),
        description: [
            "Capstone Project: Textual Analysis of Aspects of Divinity Using Sentiment Analysis",
        ],
        highlights: ["Data Structures & Algorithms", "Operating Systems", "DBMS", "Discrete Mathematics"],
    },
    {
        id: "ms-sfsu",
        category: "education",
        title: "Master of Science in Data Science and Artificial Intelligence",
        organization: "San Francisco State University",
        location: "San Francisco, CA",
        startDate: new Date(2023, 7, 1),
        endDate: null,
        description: [
            "GPA: 4.0/4.0",
            "Thesis: AWARE: Beyond Sentence Boundaries: A Contextual Transformer Framework for Identifying Cultural Capital in STEM Narratives",
        ],
        highlights: ["Deep Learning", "Natural Language Technologies", "Statistical Modeling", "Analysis of Algorithms"],
    },

    // Research Experience
    {
        id: "ug-research",
        category: "research",
        title: "Undergraduate Researcher",
        organization: "The LNM Institute of Information Technology",
        location: "Jaipur, India",
        startDate: new Date(2020, 7, 1),
        endDate: new Date(2021, 4, 31),
        description: [
            "Examined semantic and emotional shifts across theological and scientific texts",
            "Analyzed large-scale textual corpora to quantify linguistic and affective patterns",
            "Quantified statistically significant differences in semantic framing using lexicon-based analysis",
        ],
    },
    {
        id: "hci-lab",
        category: "research",
        title: "Graduate Research Assistant",
        organization: "Data Visualization & HCI Lab, SFSU",
        location: "San Francisco, CA",
        startDate: new Date(2024, 0, 1),
        endDate: new Date(2024, 7, 31),
        description: [
            "Investigated hierarchical image classification models using ImageNet-derived dataset (~1,000 classes)",
            "Built hierarchical classification pipeline to trace inference paths and identify prediction divergence",
            "Revealed that model predictions were influenced by background correlations rather than animal morphology",
        ],
    },
    {
        id: "nlp-lab",
        category: "research",
        title: "Graduate Research Assistant",
        organization: "NLP Lab, SFSU",
        location: "San Francisco, CA",
        startDate: new Date(2024, 7, 1),
        endDate: null,
        description: [
            "Project: ALMA - Cultivating Cultural Capitals in STEM through Reflective Journaling",
            "Introduced domain, context, and cross-theme awareness through domain-adaptive MLM pretraining",
            "Achieved +2.1% Macro-F1 gain, reducing manual labeling time by ~75%",
        ],
    },

    // Professional Experience
    {
        id: "innovaccer",
        category: "professional",
        title: "Data Analyst",
        organization: "Innovaccer",
        location: "Noida, India",
        startDate: new Date(2021, 0, 1),
        endDate: new Date(2022, 8, 30),
        description: [
            "Developed scalable ETL pipelines processing 10M+ patient records",
            "Mapped raw clinical data (HL7/C-CDA) to FHIR-based Unified Data Models",
            "Optimized clinical data ingestion latency by 30% through automated Python validation scripts",
        ],
    },
    {
        id: "xuman-ai",
        category: "professional",
        title: "Founding AI Engineer",
        organization: "Xuman AI",
        location: "San Francisco, CA",
        startDate: new Date(2025, 7, 1),
        endDate: new Date(2025, 11, 31),
        description: [
            "Led 0-to-1 development as founding AI engineer, shaping product direction",
            "Built real-time voice agents using WebRTC for low-latency streaming",
            "Developed AI agents combining retrieval-based search, structured prompting, and tool use",
            "Designed evaluation pipelines for factual correctness and behavioral alignment",
        ],
    },

    // Teaching Experience
    {
        id: "ta-nlp",
        category: "teaching",
        title: "Teaching Assistant - Natural Language Technologies",
        organization: "San Francisco State University",
        location: "San Francisco, CA",
        startDate: new Date(2024, 7, 1),
        endDate: new Date(2025, 7, 31),
        description: [
            "Supported mixed cohort of graduate and undergraduate students",
            "Delivered full lectures on n-gram models and logistic regression",
        ],
    },
    {
        id: "instructor-genentech",
        category: "teaching",
        title: "Instructor - Data Science & Machine Learning",
        organization: "Genentech & CPaGE, SFSU",
        location: "San Francisco, CA",
        startDate: new Date(2025, 7, 1),
        endDate: null,
        description: [
            "Instructed 5-course Data Science & ML certificate program for Genentech professionals",
            "Delivered hands-on Python, machine learning, and neural network training for biomedical use cases",
        ],
    },

    // Projects
    {
        id: "context-aware-aug",
        category: "project",
        title: "Context Aware Data Augmentation",
        organization: "Graduate Seminar - AI Entrepreneurship",
        location: "San Francisco, CA",
        startDate: new Date(2024, 7, 1),
        endDate: new Date(2024, 11, 31),
        description: [
            "Built context-aware data augmentation framework for biomedical text classification",
            "Implemented schema-preserving, constraint-based perturbations conditioned on tabular metadata",
            "Achieved 3.5% accuracy improvement and improved robustness under class imbalance",
        ],
    },
    {
        id: "secure-sense",
        category: "project",
        title: "Secure Sense",
        organization: "SF Hacks",
        location: "San Francisco, CA",
        startDate: new Date(2025, 0, 1),
        endDate: new Date(2025, 2, 31),
        description: [
            "Built privacy-focused AI system exploring on-device and local-only inference architectures",
            "Recognized by OpenMind, SF Hacks organizers, and Lam Family College of Business",
            "Featured in university's annual report following Emerging AI Innovation win",
        ],
    },

    // Leadership
    {
        id: "resident-assistant",
        category: "leadership",
        title: "Student Leader / Resident Assistant",
        organization: "Residential Life, SFSU",
        location: "San Francisco, CA",
        startDate: new Date(2023, 7, 1),
        endDate: new Date(2024, 7, 31),
        description: [
            "Received $30,000 in housing compensation based on demonstrated leadership excellence",
            "Fostered inclusive living-learning community through diversity-focused events",
            "Facilitated conflict resolution mediation",
        ],
    },
];

// Awards and achievements (displayed as milestones)
export const AWARDS: Award[] = [
    {
        id: "sf-hacks-winner",
        type: "trophy",
        title: "Winner: Emerging AI Innovation Track",
        organization: "SF Hacks",
        date: new Date(2025, 1, 15),
        description: "Awarded for 'Secure Sense', a privacy-first AI tool. Selected for incubation at Lam Family College of Business.",
    },
    {
        id: "sf-build",
        type: "trophy",
        title: "SF BUILD Scholar (Agents of Change Fellowship)",
        organization: "SFSU / NIH",
        date: new Date(2024, 7, 1),
        description: "Awarded $22,000+ in cumulative research funding. Highly selective NIH initiative.",
    },
    {
        id: "ai-stars",
        type: "medal",
        title: "AI STARS Fellow",
        organization: "San Francisco State University",
        date: new Date(2024, 5, 1),
        description: "Selected as high-potential research fellow for AI and social impact research.",
    },
    {
        id: "poster-2025-trajectory",
        type: "scroll",
        title: "Defining the Trajectory of Narrative Modeling in NLP",
        organization: "CoSE Student Project Showcase, SFSU",
        date: new Date(2025, 3, 15),
        description: "Poster presentation at College of Science & Engineering showcase.",
    },
    {
        id: "poster-2025-aware",
        type: "scroll",
        title: "AWARE: Essay-Aware Representation Learning",
        organization: "Graduate Research Showcase, SFSU",
        date: new Date(2025, 4, 1),
        description: "Poster presentation at Graduate Research and Creative Works Showcase.",
    },
    {
        id: "poster-2024-visual",
        type: "scroll",
        title: "Visualizing Model Reasoning: An Audit of Hierarchical Classification",
        organization: "CoSE Student Project Showcase, SFSU",
        date: new Date(2024, 4, 15),
        description: "Poster presentation at College of Science & Engineering showcase.",
    },
];

// Helper function to calculate position on timeline (0-1)
export function getTimelinePosition(date: Date): number {
    const totalDuration = TIMELINE_END.getTime() - TIMELINE_START.getTime();
    const position = (date.getTime() - TIMELINE_START.getTime()) / totalDuration;
    return Math.max(0, Math.min(1, position));
}

// Helper to get experience width on timeline
export function getExperienceWidth(start: Date, end: Date | null): number {
    const endDate = end || new Date();
    return getTimelinePosition(endDate) - getTimelinePosition(start);
}
