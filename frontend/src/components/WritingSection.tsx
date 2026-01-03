"use client";

import { motion, MotionValue } from "framer-motion";
import { PUBLICATIONS, type Publication } from "@/lib/publicationData";
import { ArrowUpRight, Quote, User, FileText, ExternalLink } from "lucide-react";

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
            className="group relative flex flex-col w-full h-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
        >
            {/* Hover Glow & Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[hsl(var(--foreground))]" />
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary)/0.03)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Top Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-[hsl(var(--primary))] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

            <div className="p-6 md:p-8 flex-1 flex flex-col relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] px-2 py-1 rounded-full">
                        <FileText size={10} />
                        {paper.venue}
                    </span>
                    <span className="text-secondary-foreground font-serif italic text-sm opacity-60">{paper.date.getFullYear()}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-serif font-black text-[hsl(var(--foreground))] leading-tight mb-4 group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                    {paper.title}
                </h3>

                {/* Abstract Preview */}
                <div className="flex-1 relative mb-6">
                    <Quote className="absolute -top-2 -left-4 text-[hsl(var(--border))] w-10 h-10 opacity-30 rotate-180" />
                    <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-sm font-light pl-2">
                        {paper.abstract}
                    </p>
                </div>

                {/* Footer / Actions */}
                <div className="pt-4 border-t border-[hsl(var(--border))] flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-xs text-[hsl(var(--foreground))] font-medium">
                        <User size={14} className="text-[hsl(var(--muted-foreground))]" />
                        <span>{paper.authors?.join(", ")}</span>
                    </div>

                    {/* Interactive Actions */}
                    <div className="flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                            onClick={handleCopyCitation}
                            className="px-3 py-1.5 rounded-md border border-[hsl(var(--border))] text-[10px] font-bold uppercase tracking-wider hover:bg-[hsl(var(--card-foreground))] hover:text-[hsl(var(--card))] transition-colors"
                        >
                            BibTeX
                        </button>
                        <div className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-bold text-[10px] uppercase tracking-wider hover:shadow-lg transition-all">
                            <span>Read</span>
                            <ArrowUpRight size={12} />
                        </div>
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
            className="group flex gap-4 items-baseline p-3 -mx-3 rounded-lg hover:bg-[hsl(var(--muted)/0.4)] transition-colors duration-200 border-b border-[hsl(var(--border)/0.5)] last:border-0"
        >
            {/* Date */}
            <div className="hidden md:block w-16 text-right flex-shrink-0 font-mono text-[10px] text-[hsl(var(--muted-foreground))] pt-0.5">
                {article.date.toLocaleString('default', { month: 'short' })} {article.date.getFullYear()}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                    <span className="text-[hsl(var(--primary))]">{article.tags?.[0]}</span>
                    <span>•</span>
                    <span>{article.stats?.reads} reads</span>
                    {/* Hover Arrow Mobile */}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto md:hidden" />
                </div>
                <h4 className="text-base md:text-lg font-serif font-bold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                    {article.title}
                </h4>
                <p className="text-xs md:text-sm text-[hsl(var(--muted-foreground))] font-light leading-relaxed line-clamp-2">
                    {article.subtitle}
                </p>
            </div>

            {/* Desktop Hover Icon */}
            <div className="hidden md:block opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-[hsl(var(--primary))]">
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
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.1] dark:opacity-[0.05] pointer-events-none" />

            {/* Layout Grid */}
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start h-full max-h-[85vh] pt-8">

                {/* LEFT: Highlighted Research (7 cols) */}
                <div className="lg:col-span-7 h-full flex flex-col min-h-0">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8 flex-shrink-0"
                    >
                        <span className="text-eyebrow text-[hsl(var(--primary))] mb-2 block">Research</span>
                        <h2 className="text-5xl md:text-7xl font-serif font-black text-[hsl(var(--foreground))] tracking-tight">
                            Publications and Writings
                        </h2>
                    </motion.div>

                    <motion.div className="flex-1 w-full relative min-h-0 perspective-1000">
                        {papers[0] && <PaperCard paper={papers[0]} />}
                        {/* Stack effect behind card - Subtler/Classier */}
                        <div className="absolute top-4 left-4 right-[-10px] bottom-[-10px] border border-[hsl(var(--border))] rounded-2xl -z-10 opacity-60" />
                    </motion.div>
                </div>

                {/* RIGHT: Writing / Thoughts (5 cols) */}
                <div className="lg:col-span-5 flex flex-col h-full pt-4 lg:pt-32 min-h-0">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mb-8 pb-4 border-b border-[hsl(var(--border))] flex justify-between items-end flex-shrink-0"
                    >
                        <h3 className="text-2xl font-serif font-bold text-[hsl(var(--foreground))]">
                            Essays & Thoughts
                        </h3>
                        <a href="https://medium.com/@mehtabkhalid2501" target="_blank" className="text-xs font-bold uppercase tracking-widest hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-2 group">
                            View Archive <ExternalLink size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                    </motion.div>

                    <div className="flex-1 overflow-y-auto pr-6 custom-scrollbar pb-12 space-y-2">
                        {articles.map((art, i) => (
                            <motion.div
                                key={art.id}
                                initial={{ opacity: 0, y: 15 }}
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

