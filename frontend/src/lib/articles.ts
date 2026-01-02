export interface Article {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  url: string;
  image: string;
}

export const ARTICLES: Article[] = [
  {
    id: "emotion-fine-tuning",
    title: '"Happy or Sad?" - Fine-Tuning a Small Language Model to Recognize Emotion',
    subtitle: "A classification experiment inspired by a quiet scene in Peaky Blinders",
    date: "May 2, 2025",
    readTime: "8 min read",
    category: "NLP",
    url: "https://medium.com/@mehtabkhalid2501/happy-or-sad-fine-tuning-a-small-language-model-to-recognize-emotion-8c8b8b8b8b8b",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    id: "sarcasm-detection",
    title: "Detecting Sarcasm with Naive Bayes",
    subtitle: "Building a probabilistic classifier for detecting sarcasm in text",
    date: "Mar 6, 2025",
    readTime: "6 min read",
    category: "Machine Learning",
    url: "https://medium.com/@mehtabkhalid2501/detecting-sarcasm-with-naive-bayes-khalid-m-khan-8c8b8b8b8b8b",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
  },
  {
    id: "ngram-generation",
    title: "How to Use N-Grams for Language Generation",
    subtitle: "An introduction to statistical language modeling with n-grams",
    date: "Feb 13, 2025",
    readTime: "7 min read",
    category: "NLP",
    url: "https://medium.com/@mehtabkhalid2501/how-to-use-n-grams-for-language-generation-introduction-8c8b8b8b8b8b",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
  },
];

export const MEDIUM_PROFILE_URL = "https://medium.com/@mehtabkhalid2501";

