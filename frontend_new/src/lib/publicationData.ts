export interface Publication {
    id: string;
    type: "paper" | "article" | "essay";
    title: string;
    subtitle?: string;
    authors?: string[];
    venue?: string; // e.g., "Arxiv", "Medium", "NeurIPS"
    date: Date;
    url: string;
    abstract?: string;
    tags?: string[];
    stats?: {
        citations?: number;
        reads?: string; // e.g., "8 min read"
    };
    image?: string;
}

export const PUBLICATIONS: Publication[] = [
    // --- RESEARCH PAPERS ---
    {
        id: "aware-2025",
        type: "paper",
        title: "AWARE, Beyond Sentence Boundaries: A Contextual Transformer Framework for Identifying Cultural Capital in STEM Narratives",
        authors: ["Khalid Mehtab Khan", "Anagha Kulkarni"],
        venue: "arXiv:2510.04983 [cs.CL]",
        date: new Date(2025, 9, 10), // Oct 2025
        url: "https://arxiv.org/abs/2510.04983",
        abstract: "Identifying cultural capital (CC) themes in student reflections can offer valuable insights that help foster equitable learning environments. However, themes such as aspirational goals or family support are often woven into narratives rather than appearing as keywords. We introduce AWARE, a framework that improves a transformer model's awareness for this nuanced task through Domain, Context, and Class Overlap awareness, outperforming strong baselines by 2.1% Macro-F1.",
        tags: ["NLP", "Contextual Transformers", "Education AI", "Representation Learning"],
        image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop", // Abstract representation of network/structure
    },

    // --- MEDIUM / ESSAYS ---
    {
        id: "emotion-fine-tuning",
        type: "article",
        title: "\"Happy or Sad?\" - Fine-Tuning a Small Language Model to Recognize Emotion",
        subtitle: "A classification experiment inspired by a quiet scene in Peaky Blinders",
        venue: "Medium",
        date: new Date(2025, 4, 2),
        url: "https://medium.com/@mehtabkhalid2501/happy-or-sad-fine-tuning-a-small-language-model-to-recognize-emotion-8c8b8b8b8b8b",
        stats: { reads: "8 min read" },
        tags: ["Fine-tuning", "LLMs", "Hugging Face"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    },
    {
        id: "sarcasm-detection",
        type: "article",
        title: "Detecting Sarcasm with Naive Bayes",
        subtitle: "Building a probabilistic classifier for detecting sarcasm in text",
        venue: "Medium",
        date: new Date(2025, 2, 6),
        url: "https://medium.com/@mehtabkhalid2501/detecting-sarcasm-with-naive-bayes-khalid-m-khan-8c8b8b8b8b8b",
        stats: { reads: "6 min read" },
        tags: ["Machine Learning", "Naive Bayes", "NLP"],
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    },
    {
        id: "ngram-generation",
        type: "article",
        title: "How to Use N-Grams for Language Generation",
        subtitle: "An introduction to statistical language modeling with n-grams",
        venue: "Medium",
        date: new Date(2025, 1, 13),
        url: "https://medium.com/@mehtabkhalid2501/how-to-use-n-grams-for-language-generation-introduction-8c8b8b8b8b8b",
        stats: { reads: "7 min read" },
        tags: ["NLP", "Statistical Modeling", "N-Grams"],
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    },
];
