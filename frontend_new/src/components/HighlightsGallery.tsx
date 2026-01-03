"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { HIGHLIGHTS, type HighlightItem } from "@/lib/highlightsData";
import { Trophy, Award, Sparkles, ArrowRight } from "lucide-react";

// ===================================
// SUB-COMPONENTS
// ===================================

function HeroCard({ item }: { item: HighlightItem }) {
    return (
        <div className="relative h-[70vh] w-[85vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl overflow-hidden group">
            {/* Background Image / GIF */}
            {item.image && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
            )}

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                <div className="mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--primary))] text-white text-xs font-bold uppercase tracking-wider mb-4">
                        <Trophy size={14} />
                        {item.stats?.[0].value}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-2">
                        {item.title}
                    </h3>
                    <p className="text-white/80 font-medium text-lg mb-4">
                        {item.organization}
                    </p>
                    <p className="text-white/60 text-sm md:text-base max-w-md line-clamp-3">
                        {item.description}
                    </p>
                </div>

                {/* Stats Row */}
                <div className="flex gap-4 pt-4 border-t border-white/10">
                    {item.stats?.map((stat, i) => (
                        <div key={i}>
                            <p className="text-[10px] uppercase tracking-widest text-white/40">{stat.label}</p>
                            <p className="text-sm font-bold text-white">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function GalleryCard({ item }: { item: HighlightItem }) {
    return (
        <div className="relative h-[60vh] w-[80vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-8 flex flex-col justify-between group hover:border-[hsl(var(--primary)/0.5)] transition-colors duration-300">
            {/* Top Decor */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div>
                <div className="flex items-center gap-2 text-[hsl(var(--primary))] mb-6">
                    <Award size={24} />
                    <span className="text-xs font-mono uppercase tracking-widest">{item.date}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[hsl(var(--foreground))] mb-2">
                    {item.title}
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-6">
                    {item.organization}
                </p>
                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-sm">
                    {item.description}
                </p>
            </div>

            {/* Bottom Stats */}
            <div className="mt-8 pt-6 border-t border-[hsl(var(--border))] grid grid-cols-2 gap-4">
                {item.stats?.map((stat, i) => (
                    <div key={i}>
                        <p className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground)/0.6)]">{stat.label}</p>
                        <p className="text-sm font-bold text-[hsl(var(--foreground))]">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ===================================
// MAIN COMPONENT
// ===================================

interface HighlightsGalleryProps {
    opacity: MotionValue<number>;
    x: MotionValue<string>;
    pointerEvents: MotionValue<string>;
}

export default function HighlightsGallery({ opacity, x, pointerEvents }: HighlightsGalleryProps) {
    return (
        <motion.div
            className="fixed inset-0 z-30 flex items-center h-screen overflow-hidden pointer-events-none"
            style={{ opacity, pointerEvents }}
        >
            {/* Ambient Gallery Lighting */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-[50vw] h-[50vh] bg-[hsl(var(--primary)/0.1)] blur-[100px] rounded-full pointer-events-none" />

            {/* Scrolling Track Container */}
            <div className="w-full h-full flex items-center pl-[5vw] md:pl-[10vw]">
                <motion.div
                    className="flex gap-8 md:gap-16 items-center"
                    style={{ x }}
                >
                    {/* Intro Text */}
                    <div className="w-[80vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0 pr-8">
                        <div className="flex items-center gap-2 text-[hsl(var(--primary))] mb-4">
                            <Sparkles size={20} />
                            <span className="text-sm font-mono uppercase tracking-widest">Exhibition</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">
                            Highlights &<br />Honors
                        </h2>
                        <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-sm">
                            A curated collection of defining moments, recognitions, and breakthroughs.
                        </p>
                        <div className="flex items-center gap-2 mt-8 text-sm font-medium animate-pulse">
                            <span>Scroll to explore</span>
                            <ArrowRight size={16} />
                        </div>
                    </div>

                    {/* Cards */}
                    {HIGHLIGHTS.map((item) => (
                        item.id.includes("secure-sense")
                            ? <HeroCard key={item.id} item={item} />
                            : <GalleryCard key={item.id} item={item} />
                    ))}

                    {/* End Spacer */}
                    <div className="w-[10vw] flex-shrink-0" />
                </motion.div>
            </div>
        </motion.div>
    );
}
