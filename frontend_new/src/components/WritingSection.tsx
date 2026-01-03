"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { PUBLICATIONS, type Publication } from "@/lib/publicationData";
import { ArrowUpRight, BookOpen, Quote, Calendar, User, FileText, ExternalLink } from "lucide-react";

// ===================================
// CITATION UTILS
// ===================================
function getCitation(pub: Publication) {
    return `@article{${pub.id},
  title={${pub.title}},
  author={${pub.authors?.join(" and ")}},
  journal={${pub.venue}},
  year={${pub.date.getFullYear()}},
  url={${pub.url}}
}`;
}

// ===================================
// SUB-COMPONENTS
// ===================================

function PaperCard({ paper }: { paper: Publication }) {
    const handleCopyCitation = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(getCitation(paper));
        // In a real app, trigger a toast here
    };

    return (
        <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full h-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl overflow-hidden hover:border-[hsl(var(--primary)/0.5)] transition-colors duration-500"
        >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary)/0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="p-8 md:p-12 h-full flex flex-col relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 opacity-60 text-xs font-mono uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                        <FileText size={14} />
                        {paper.venue}
                    </span>
                    <span>{paper.date.getFullYear()}</span>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-[hsl(var(--foreground))] leading-tight mb-6 group-hover:text-[hsl(var(--primary))] transition-colors">
                    {paper.title}
                </h3>

                {/* Abstract Preview */}
                <div className="flex-1 relative">
                    <Quote className="absolute -top-2 -left-4 text-[hsl(var(--muted)/0.3)] w-12 h-12" />
                    <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-sm md:text-base pl-6 border-l-2 border-[hsl(var(--border))] line-clamp-6 md:line-clamp-none">
                        {paper.abstract}
                    </p>
                </div>

                {/* Footer / Actions */}
                <div className="mt-8 pt-8 border-t border-[hsl(var(--border))] flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-[hsl(var(--muted-foreground))]">
                        <User size={14} />
                        <span>{paper.authors?.join(", ")}</span>
                    </div>
                </div>

                {/* Interactive Actions - Appear on Hover usually, but visible for utility */}
                <div className="absolute bottom-10 right-10 flex gap-2">
                    <button
                        onClick={handleCopyCitation}
                        className="px-4 py-2 rounded-full border border-[hsl(var(--border))] text-xs font-medium hover:bg-[hsl(var(--primary))] hover:text-white hover:border-transparent transition-all"
                    >
                        BibTeX
                    </button>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--foreground))] text-[hsl(var(--background))] font-medium text-xs hover:scale-105 transition-all">
                        <span>Read Paper</span>
                        <ArrowUpRight size={16} />
                    </div>
                </div>
            </div>
        </a>
    );
}

function ArticleSimple({ article }: { article: Publication }) {
    return (
        <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-6 items-start p-4 -mx-4 rounded-xl hover:bg-[hsl(var(--muted)/0.3)] transition-colors duration-300"
        >
            {/* Date */}
            <div className="hidden md:flex flex-col items-center pt-1 min-w-[3rem] opacity-50 font-mono text-xs text-center border-r border-[hsl(var(--border))] pr-4">
                <span className="text-lg font-bold">{article.date.toLocaleString('default', { month: 'short' })}</span>
                <span>{article.date.getFullYear()}</span>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 text-xs opacity-60 uppercase tracking-wider font-medium">
                    <span className="text-[hsl(var(--primary))]">{article.tags?.[0]}</span>
                    <span>•</span>
                    <span>{article.stats?.reads}</span>
                </div>
                <h4 className="text-xl font-serif font-medium text-[hsl(var(--foreground))] group-hover:underline decoration-[hsl(var(--primary)/0.5)] underline-offset-4 decoration-1">
                    {article.title}
                </h4>
                <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-2">
                    {article.subtitle}
                </p>
            </div>

            {/* Icon */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 transform duration-300 text-[hsl(var(--muted-foreground))]">
                <ArrowUpRight size={16} />
            </div>
        </a>
    );
}

// ===================================
// MAIN COMPONENT
// ===================================

interface WritingSectionProps {
    opacity: MotionValue<number>;
    y: MotionValue<string>;
    pointerEvents: MotionValue<string>;
}

export default function WritingSection({ opacity, y, pointerEvents }: WritingSectionProps) {
    // Separate Papers (only first one for now as highlight) and Articles
    const papers = PUBLICATIONS.filter(p => p.type === "paper");
    const articles = PUBLICATIONS.filter(p => p.type !== "paper");

    return (
        <motion.div
            className="fixed inset-0 z-20 flex items-center justify-center px-4 md:px-12 lg:px-24 py-20"
            style={{ opacity, y, pointerEvents }}
        >
            {/* Background Texture - subtle paper noise or grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.2)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.2)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

            {/* Layout Grid */}
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start h-full max-h-[85vh] pt-12">

                {/* LEFT: Highlighted Research (7 cols) */}
                <div className="lg:col-span-7 h-full flex flex-col min-h-0"> {/* min-h-0 vital for flex scrolling/containment */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-6 flex-shrink-0"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[hsl(var(--foreground))]">
                            Publications & Writing
                        </h2>
                        <p className="text-[hsl(var(--muted-foreground))] mt-2 text-lg">
                            Exploring the boundaries of context-aware models.
                        </p>
                    </motion.div>

                    <motion.div className="flex-1 w-full relative min-h-0">
                        {papers[0] && <PaperCard paper={papers[0]} />}
                        {/* Stack effect behind card */}
                        <div className="absolute -inset-1 top-2 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl -z-10 scale-[0.98] opacity-50" />
                        <div className="absolute -inset-2 top-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl -z-20 scale-[0.96] opacity-30" />
                    </motion.div>
                </div>

                {/* RIGHT: Writing / Thoughts (5 cols) */}
                <div className="lg:col-span-5 flex flex-col h-full pt-4 lg:pt-24 scale-90 lg:scale-100 origin-top-right min-h-0">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mb-6 border-b border-[hsl(var(--border))] pb-2 flex justify-between items-end flex-shrink-0"
                    >
                        <h3 className="text-xl font-serif font-bold text-[hsl(var(--foreground))]">
                            Recent Essays
                        </h3>
                        <a href="https://medium.com/@mehtabkhalid2501" target="_blank" className="text-xs font-mono uppercase tracking-widest hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-1 group">
                            View Medium <ExternalLink size={10} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                    </motion.div>

                    <div className="flex-1 overflow-y-auto pr-4 space-y-2 custom-scrollbar pb-12">
                        {articles.map((art, i) => (
                            <motion.div
                                key={art.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <ArticleSimple article={art} />
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </motion.div>
    );
}

// Add simple style for custom scrollbar
const css = `
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: hsl(var(--border));
    border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--muted-foreground));
}
`;
