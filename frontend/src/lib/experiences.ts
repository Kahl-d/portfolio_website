export interface Experience {
  id: string;
  title: string;
  organization: string;
  location?: string;
  type: "work" | "research" | "teaching";
  period: string;
  description: string;
  highlights: string[];
  advisor?: string;
  award?: string;
}

export const EXPERIENCES: Experience[] = [
  {
    id: "xuman-ai",
    title: "Founding AI Engineer",
    organization: "Xuman.AI",
    location: "San Francisco, CA",
    type: "work",
    period: "Aug 2025 – Present",
    description:
      "Building conversational agents that move beyond rigid turn-based interactions toward more human-like dialogue. Focus on enabling continuity, emotional awareness, and behavioral consistency in real-time conversational systems.",
    highlights: [
      "AI agents & Conversational systems",
      "Model-as-judge evaluation",
      "Behavioral consistency & safety",
      "Low-latency voice interaction",
    ],
  },
  {
    id: "nlp-lab",
    title: "Graduate Research Assistant",
    organization: "NLP Lab, San Francisco State University",
    type: "research",
    period: "Aug 2024 – Present",
    advisor: "Dr. Anagha Kulkarni",
    description:
      "Working on narrative-level natural language understanding for educational data, examining whether language models can meaningfully identify cultural capital in STEM student reflections. Designed a contextual modeling framework integrating domain-adaptive pretraining, essay-level context aggregation, and multi-label learning.",
    highlights: [
      "Context-aware NLP & Narrative modeling",
      "BERT, DeBERTa, BiLSTM attention",
      "+2.1% Macro-F1 under class imbalance",
      "ICMLA 2025 submission",
    ],
  },
  {
    id: "genentech-ta",
    title: "Instructional Teaching Assistant",
    organization: "Genentech / CPaGE, SFSU",
    type: "teaching",
    period: "Aug 2025 – Present",
    description:
      "Industry-focused ML instruction for Data Science & ML for Biotech course, covering Python to ML to Deep Learning with applied biotech use cases.",
    highlights: [
      "Industry-focused ML instruction",
      "Python → ML → Deep Learning",
      "Applied biotech use cases",
    ],
  },
  {
    id: "secure-sense",
    title: "AI Lead — Secure Sense",
    organization: "SF Hacks 2025",
    location: "Incubated at Lam Family College of Business",
    type: "work",
    period: "Jan 2025 – Mar 2025",
    award: "Emerging AI Innovation Winner",
    description:
      "Led development of a privacy-first AI system for on-device and local-only inference. Demonstrated practical tradeoffs between privacy, latency, and model capability.",
    highlights: [
      "On-device inference & Privacy-first AI",
      "Local-only model execution",
      "Emerging AI Innovation Winner",
    ],
  },
  {
    id: "nlt-ta",
    title: "Teaching Assistant — Natural Language Technologies",
    organization: "San Francisco State University",
    type: "teaching",
    period: "Aug 2024 – Aug 2025",
    description:
      "NLP foundations & probabilistic models instruction, covering n-grams, Naive Bayes, Logistic Regression with theory-to-practice focus.",
    highlights: [
      "NLP foundations & probabilistic models",
      "n-grams, Naive Bayes, Logistic Regression",
      "Theory-to-practice instruction",
    ],
  },
  {
    id: "ai-entrepreneurship",
    title: "Research Assistant — AI Entrepreneurship Seminar",
    organization: "San Francisco State University",
    type: "research",
    period: "Aug 2024 – Dec 2024",
    advisor: "Dr. Isabel Song",
    description:
      "Developed context-aware data augmentation framework for biomedical text classification using schema- and constraint-preserving transformations.",
    highlights: [
      "Context-aware data augmentation",
      "Biomedical NLP",
      "+3.5% accuracy improvement",
      "Robustness under imbalance",
    ],
  },
  {
    id: "hci-lab",
    title: "Graduate Research Assistant",
    organization: "Data Visualization & HCI Lab, SFSU",
    type: "research",
    period: "Jan 2024 – May 2024",
    advisor: "Dr. Shahrukh Humayoun",
    description:
      "Investigated how hierarchical structure influences model reasoning in large-scale image classification using ~1,000 animal species from ImageNet.",
    highlights: [
      "Hierarchical image classification",
      "Feature attribution & Interpretability",
      "Error-path tracing through taxonomy",
      "Bias and correlation analysis",
    ],
  },
  {
    id: "innovaccer",
    title: "Data Associate",
    organization: "Innovaccer",
    location: "Noida, India",
    type: "work",
    period: "Jan 2021 – Sep 2022",
    description:
      "Worked on large-scale healthcare data pipelines supporting clinical analytics and quality reporting. Transformed raw clinical data into standardized formats.",
    highlights: [
      "Python, SQL, ETL pipelines",
      "10M+ patient records",
      "HL7/C-CDA → FHIR mapping",
      "~30% latency reduction",
    ],
  },
  {
    id: "undergrad-research",
    title: "Undergraduate Researcher",
    organization: "The LNM Institute of Information Technology",
    type: "research",
    period: "Aug 2020 – May 2021",
    advisor: "Dr. Payel Pal, Dr. Vikas Bajpai",
    description:
      "Analyzed large-scale textual corpora spanning theological, scientific, and societal discourse to compare linguistic framing and affective expression.",
    highlights: [
      "Large-scale corpus analysis",
      "Lexicon-based sentiment analysis",
      "Discourse-level statistical modeling",
    ],
  },
];

