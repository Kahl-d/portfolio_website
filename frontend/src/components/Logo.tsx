"use client";

import { SITE_CONFIG } from "@/lib/constants";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, BookOpen, Sparkles, Mail } from "lucide-react";

interface LogoProps {
    onHomeClick?: () => void;
    onExperienceClick?: () => void;
    onSkillsClick?: () => void;
    onWritingClick?: () => void;
    onHighlightsClick?: () => void;
    onContactClick?: () => void;
}

export default function Logo({ onHomeClick, onExperienceClick, onSkillsClick, onWritingClick, onHighlightsClick, onContactClick }: LogoProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative flex flex-col items-start z-50 pointer-events-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Main Logo Trigger */}
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    onHomeClick?.();
                }}
                className="group cursor-pointer relative z-20 py-1"
            >
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-[hsl(var(--foreground))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--foreground))] transition-all duration-300 group-hover:scale-105 shadow-sm">
                    <span className="font-serif font-black text-sm tracking-tighter text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--background))] transition-colors">
                        KMK
                    </span>
                </div>
            </a>

            {/* Hover Menu */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 p-1.5 min-w-[160px] rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.8)] backdrop-blur-xl shadow-xl flex flex-col gap-1 z-10 overflow-hidden"
                    >
                        <button
                            onClick={() => {
                                onHomeClick?.();
                                setIsHovered(false);
                            }}
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] transition-colors text-[hsl(var(--muted-foreground))]"
                        >
                            <Home className="w-4 h-4" />
                            Home
                        </button>
                        <button
                            onClick={() => {
                                onExperienceClick?.();
                                setIsHovered(false);
                            }}
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] transition-colors text-[hsl(var(--muted-foreground))]"
                        >
                            <Briefcase className="w-4 h-4" />
                            Experience
                        </button>
                        <button
                            onClick={() => {
                                onSkillsClick?.();
                                setIsHovered(false);
                            }}
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] transition-colors text-[hsl(var(--muted-foreground))]"
                        >
                            <Sparkles className="w-4 h-4" />
                            Skills
                        </button>
                        <button
                            onClick={() => {
                                onWritingClick?.();
                                setIsHovered(false);
                            }}
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] transition-colors text-[hsl(var(--muted-foreground))]"
                        >
                            <BookOpen className="w-4 h-4" />
                            Writing
                        </button>
                        <button
                            onClick={() => {
                                onHighlightsClick?.();
                                setIsHovered(false);
                            }}
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] transition-colors text-[hsl(var(--muted-foreground))]"
                        >
                            <Sparkles className="w-4 h-4" />
                            Highlights
                        </button>
                        <button
                            onClick={() => {
                                onContactClick?.();
                                setIsHovered(false);
                            }}
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] transition-colors text-[hsl(var(--muted-foreground))]"
                        >
                            <Mail className="w-4 h-4" />
                            Contact
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
