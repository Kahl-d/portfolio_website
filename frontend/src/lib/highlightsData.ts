
export interface HighlightItem {
    id: string;
    type: "award" | "fellowship" | "grant";
    title: string;
    subtitle: string;
    organization: string;
    description: string;
    date: string;
    image?: string;
    stats?: { label: string; value: string }[];
}

export const HIGHLIGHTS: HighlightItem[] = [
    {
        id: "secure-sense-2025",
        type: "award",
        title: "Winner: Emerging AI Innovation Track",
        subtitle: "SF Hacks 2025",
        organization: "SF Hacks · San Francisco, CA",
        description: "Awarded for \"Secure Sense\", a privacy-first AI tool leveraging on-device LLMs. Selected for incubation at Lam Family College of Business Innovation Center.",
        date: "2025",
        image: "/hackathon_image.gif",
        stats: [
            { label: "Track", value: "Emerging AI" },
            { label: "Focus", value: "Privacy-First" }
        ]
    },
    {
        id: "sf-build-2024",
        type: "fellowship",
        title: "SF BUILD Scholar",
        subtitle: "Agents of Change Fellowship",
        organization: "San Francisco State University / NIH",
        description: "A highly selective initiative funded by the National Institutes of Health (NIH) in partnership with Purdue University to enhance diversity in AI and biomedical research.",
        date: "2024",
        stats: [
            { label: "Funding", value: "$22,000+" },
            { label: "Partner", value: "NIH" }
        ]
    },
    {
        id: "ai-stars-2024",
        type: "fellowship",
        title: "AI STARS Fellow",
        subtitle: "High-Potential Research Fellow",
        organization: "San Francisco State University",
        description: "Selected as a high-potential research fellow in this competitive initiative designed to advance training in Artificial Intelligence and social impact. Received funding to pursue innovative interdisciplinary research.",
        date: "2024",
        stats: [
            { label: "Focus", value: "Social Impact" },
            { label: "Role", value: "Research Fellow" }
        ]
    }
];
