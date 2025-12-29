export interface Project {
  id: string;
  title: string;
  subtitle: string;
  organization: string;
  period: string;
  description: string;
  signals: string[];
  image: string;
  award?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "aware",
    title: "AWARE — Beyond Sentence Boundaries",
    subtitle: "Master's Thesis · Research Project",
    organization: "San Francisco State University",
    period: "2024 – Present",
    description:
      "AWARE is a contextual transformer framework designed to study whether language models can meaningfully understand cultural capital in STEM student narratives. The project addresses a core limitation of sentence-level NLP models: the loss of narrative context when sentences are processed independently. Through extensive failure-mode analysis, I showed that sentence-level DeBERTa classifiers often obscure long-range semantic cues required to identify overlapping cultural capital themes. To overcome this, AWARE integrates domain-adaptive masked language modeling, essay-level context aggregation, and multi-label learning.",
    signals: [
      "Context-aware & narrative-level NLP",
      "BERT · DeBERTa · BiLSTM attention",
      "Multi-label & imbalanced learning",
      "+2.1% Macro-F1",
      "ICMLA 2025 submission",
    ],
    image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=1200&q=80",
  },
  {
    id: "secure-sense",
    title: "Secure Sense",
    subtitle: "AI Lead · Hackathon Project",
    organization: "SF Hacks 2025",
    period: "Jan 2025 – Mar 2025",
    award: "Emerging AI Innovation Winner",
    description:
      "Secure Sense is a privacy-first AI system that explores on-device and local-only inference architectures for handling sensitive user data. The project was motivated by real-world concerns around centralized data collection and the risks of cloud-based AI pipelines for personal information. I led the design and implementation of the system, focusing on architectural tradeoffs between privacy, latency, and model capability.",
    signals: [
      "On-device / local inference",
      "Privacy-first AI design",
      "System-level tradeoff analysis",
      "Emerging AI Innovation Winner",
    ],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
  },
  {
    id: "biomedical-augmentation",
    title: "Context-Aware Data Augmentation",
    subtitle: "Research Project · AI Entrepreneurship Seminar",
    organization: "San Francisco State University",
    period: "Aug 2024 – Dec 2024",
    description:
      "This project addressed data scarcity and performance degradation in biomedical text classification caused by irrelevant or noisy training samples. Instead of applying generic augmentation techniques, I developed a context-aware augmentation framework that preserves schema and semantic constraints. The system generates synthetic samples conditioned on tabular metadata, ensuring that feature relationships and semantic integrity are maintained.",
    signals: [
      "Context-aware data augmentation",
      "Schema- & constraint-preserving",
      "Biomedical text classification",
      "+3.5% accuracy improvement",
    ],
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
  },
  {
    id: "hierarchical-classification",
    title: "Hierarchical Image Classification Audit",
    subtitle: "Research Project · Data Visualization & HCI Lab",
    organization: "San Francisco State University",
    period: "Jan 2024 – May 2024",
    description:
      "This project examined how hierarchical organization affects model reasoning in large-scale image classification. Using an ImageNet-derived dataset of approximately 1,000 animal species, I investigated whether biologically inspired taxonomies improve fine-grained visual recognition. I built a hierarchy-aware evaluation pipeline that traced inference paths through taxonomy levels and applied feature attribution methods to analyze visual evidence.",
    signals: [
      "Hierarchical image classification",
      "~1,000-class dataset",
      "Feature attribution & interpretability",
      "Error-path tracing",
    ],
    image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=1200&q=80",
  },
  {
    id: "narrative-analysis",
    title: "Semantic & Sentiment Analysis of Narrative Domains",
    subtitle: "Undergraduate Research Project",
    organization: "The LNM Institute of Information Technology",
    period: "2020 – 2021",
    description:
      "This project explored how semantic meaning and emotional tone evolve across different narrative domains, including theological, scientific, and societal texts. I analyzed large-scale corpora to compare discourse structure, sentiment patterns, and semantic framing across domains. Using lexicon-based and statistical analysis, the project quantified systematic differences in how concepts such as religion, gender, and social norms are expressed.",
    signals: [
      "Large-scale corpus analysis",
      "Lexicon-based sentiment analysis",
      "Semantic framing comparison",
      "Discourse-level statistics",
    ],
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200&q=80",
  },
];

