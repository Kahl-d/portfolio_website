"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { HIGHLIGHTS, type HighlightItem } from "@/lib/highlightsData";
import { Trophy, Award, Sparkles, ArrowRight } from "lucide-react";

// ===================================
// SUB-COMPONENTS
// ===================================

function HeroCard({ item }: { item: HighlightItem }) {
    return (
        <div className="relative h-[65vh] w-[90vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 rounded-3xl overflow-hidden group shadow-xl">
            {/* Background Image / GIF */}
            {item.image && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    {/* Lighter Gradient to show image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-transparent to-transparent opacity-80" />
                </div>
            )}

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                        <Trophy size={12} className="text-amber-400" />
                        {item.stats?.[0].value}
                    </div>

                    <h3 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-3 drop-shadow-lg">
                        {item.title}
                    </h3>

                    <div className="h-0.5 w-16 bg-amber-500 mb-4 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                    <p className="text-white/90 font-medium text-lg mb-2 font-serif italic">
                        {item.organization}
                    </p>
                    <p className="text-white/80 text-sm max-w-lg leading-relaxed line-clamp-3">
                        {item.description}
                    </p>
                </div>

                {/* Stats Row */}
                <div className="flex gap-6 pt-6 mt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.stats?.map((stat, i) => (
                        <div key={i}>
                            <p className="text-[10px] uppercase tracking-widest text-white/60 mb-0.5">{stat.label}</p>
                            <p className="text-lg font-bold text-white">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function GalleryCard({ item }: { item: HighlightItem }) {
    return (
        <div className="relative h-[55vh] w-[85vw] md:w-[45vw] lg:w-[35vw] flex-shrink-0 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-8 flex flex-col justify-between group transition-all duration-500 hover:border-[hsl(var(--primary))] hover:shadow-xl">
            {/* Top Decor */}
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-full bg-[hsl(var(--muted))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-300">
                    <Award size={24} />
                </div>
                <span className="font-mono text-xs opacity-50">{item.date}</span>
            </div>

            <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[hsl(var(--foreground))] mb-3 leading-tight group-hover:text-[hsl(var(--primary))] transition-colors">
                    {item.title}
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-4">
                    {item.organization}
                </p>
                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-sm font-light border-l border-[hsl(var(--border))] pl-4 group-hover:border-[hsl(var(--primary))] transition-colors line-clamp-4">
                    {item.description}
                </p>
            </div>

            {/* Bottom Stats */}
            <div className="mt-6 pt-4 border-t border-[hsl(var(--border))] grid grid-cols-2 gap-4 group-hover:border-[hsl(var(--primary)/0.2)] transition-colors">
                {item.stats?.map((stat, i) => (
                    <div key={i}>
                        <p className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground)/0.6)] mb-0.5">{stat.label}</p>
                        <p className="text-lg font-bold text-[hsl(var(--foreground))] tabular-nums">{stat.value}</p>
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
            {/* Darker Backdrop for Immersion */}
            <div className="absolute inset-0 bg-[hsl(var(--background)/0.95)] pointer-events-none transition-colors duration-1000" />

            {/* Ambient Lighting */}
            <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[hsl(var(--primary)/0.15)] blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

            {/* Scrolling Track Container */}
            <div className="w-full h-full flex items-center pl-[5vw] md:pl-[12vw]">
                <motion.div
                    className="flex gap-12 md:gap-24 items-center"
                    style={{ x }}
                >
                    {/* Intro Text */}
                    <div className="w-[80vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0 pr-8 relative">
                        <div className="absolute -left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[hsl(var(--border))] to-transparent" />

                        <div className="flex items-center gap-3 text-[hsl(var(--primary))] mb-6">
                            <Sparkles size={24} />
                            <span className="text-xs font-bold uppercase tracking-[0.3em]">Exhibition</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-serif font-black leading-[0.9] mb-8 text-[hsl(var(--foreground))]">
                            Honors<br /><span className="text-[hsl(var(--muted-foreground))] italic font-light">& Gallery</span>
                        </h2>
                        <p className="text-xl font-light text-[hsl(var(--muted-foreground))] max-w-sm leading-relaxed">
                            Defining moments and recognitions from my journey in engineering and research.
                        </p>
                        <div className="flex items-center gap-4 mt-12 text-sm font-bold uppercase tracking-widest opacity-60">
                            <span>Scroll</span>
                            <div className="h-px w-12 bg-current" />
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
                    <div className="w-[20vw] flex-shrink-0" />
                </motion.div>
            </div>
        </motion.div>
    );
}
