"use client";

import { motion, MotionValue } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface AboutSectionProps {
    scrollProgress: MotionValue<number>;
    aboutTop: MotionValue<string>;
    aboutLeft: MotionValue<string>;
    aboutRight: MotionValue<string>;
    aboutBottom: MotionValue<string>;
    aboutBorderRadius: MotionValue<string>;
    aboutBgOpacity: MotionValue<number>;
    aboutInitialTextScale: MotionValue<number>;
    aboutTitleScale: MotionValue<number>; // New
    aboutTitleY: MotionValue<string>;
    aboutTitleOpacity: MotionValue<number>;
    aboutExtraContentOpacity: MotionValue<number>;
    aboutExtraContentY: MotionValue<string>;
    contentOpacity: MotionValue<number>;
}

export default function AboutSection({
    aboutTop,
    aboutLeft,
    aboutRight,
    aboutBottom,
    aboutBorderRadius,
    aboutBgOpacity,
    aboutInitialTextScale,
    aboutTitleScale,
    aboutTitleY,
    aboutTitleOpacity,
    aboutExtraContentOpacity,
    aboutExtraContentY,
    contentOpacity,
}: AboutSectionProps) {
    return (
        <motion.div
            className="fixed z-10 overflow-hidden"
            style={{
                top: aboutTop,
                left: aboutLeft,
                right: aboutRight,
                bottom: aboutBottom,
                borderRadius: aboutBorderRadius,
                backgroundColor: "hsl(var(--card) / 0.8)",
                border: "1px solid hsl(var(--border))",
                backdropFilter: "blur(12px)",
            }}
        >
            {/* Collapsed State Visuals (Pattern/Texture) - Fades out on expansion */}
            <motion.div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ opacity: contentOpacity }}
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black/5 to-transparent dark:from-white/5" />
            </motion.div>

            {/* Background that transitions to page color */}
            <motion.div
                className="absolute inset-0 -z-10"
                style={{
                    opacity: aboutBgOpacity,
                    backgroundColor: "hsl(var(--background))",
                    borderRadius: aboutBorderRadius,
                }}
            />

            {/* Content Container - NO SCROLLBAR */}
            <motion.div
                className="relative h-full w-full overflow-hidden px-6 md:px-12 lg:px-16 py-8 md:py-12 lg:py-16"
                style={{ opacity: contentOpacity }}
            >
                {/* Initial Text - Centered "Hi, I'm Khalid" - Moves out */}
                <motion.div
                    className="flex flex-col items-center justify-center min-h-[100%] absolute top-0 left-0 right-0 pointer-events-none"
                    style={{
                        scale: aboutTitleScale,
                        y: aboutTitleY,
                        opacity: aboutTitleOpacity
                    }}
                >
                    <motion.div className="text-center space-y-6">
                        <h2
                            className="text-6xl md:text-8xl lg:text-9xl font-serif font-black tracking-tighter text-[hsl(var(--foreground))]"
                        >
                            Khalid Khan
                        </h2>

                        <div className="flex items-center justify-center gap-4 text-sm md:text-base font-medium text-[hsl(var(--primary))] tracking-widest uppercase">
                            <span>AI Engineer</span>
                            <span className="text-[hsl(var(--muted-foreground))]">|</span>
                            <span>NLP Researcher</span>
                            <span className="text-[hsl(var(--muted-foreground))]">|</span>
                            <span>Instructor</span>
                        </div>
                    </motion.div>


                </motion.div>

                {/* Extra Content - Static Viewport Fit */}
                <motion.div
                    className="h-full w-full flex flex-col justify-center max-w-6xl mx-auto pt-24 pb-8" // Increased top padding to clear the Header Title
                    style={{
                        opacity: aboutExtraContentOpacity,
                        y: aboutExtraContentY,
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
                        {/* Left Column: Bio - Spans 7 cols */}
                        <div className="md:col-span-7 space-y-8 text-center md:text-left">
                            <p
                                className="text-body-lead font-serif text-2xl md:text-3xl leading-relaxed text-[hsl(var(--foreground))]"
                            >
                                I research the spaces where artificial intelligence meets human meaning.
                                My work moves between <span className="italic text-primary">contextual linguistics</span>,
                                <span className="italic text-primary"> narrative modeling</span>, and the engineering of
                                <span className="italic text-primary"> robust AI systems</span>.
                            </p>
                            <div className="space-y-4 text-body text-[hsl(var(--muted-foreground))] text-lg leading-relaxed">
                                <p>
                                    As the <strong>Founding AI Engineer at Xuman.AI</strong> and a researcher at the <strong>NLP Lab at SFSU</strong>,
                                    I don't just train models—I deconstruct them. From defining the "trajectory of narrative modeling" in my thesis
                                    to building real-time, human-like voice agents, I am driven by the challenge of making machines understand not just words, but intent and culture.
                                </p>
                                <p>
                                    My approach is rooted in rigor: <em>rigorous definitions, rigorous engineering, and rigorous ethics</em>.
                                    Whether optimizing 10M+ patient records or detecting cultural capital in STEM narratives, I build systems that are as reliable as they are innovative.
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Key Info & Connect - Spans 5 cols */}
                        <div className="md:col-span-5 space-y-10 md:pl-12 md:border-l md:border-[hsl(var(--border)/0.5)] flex flex-col items-center md:items-start text-center md:text-left h-full justify-center">

                            <div className="space-y-4">
                                <div className="text-eyebrow text-[hsl(var(--primary))]">Current Focus</div>
                                <h3 className="text-2xl font-serif text-[hsl(var(--foreground))] italic">
                                    "Accuracy without understanding is fragile."
                                </h3>
                            </div>

                            <div className="space-y-4 w-full">
                                <div className="text-eyebrow text-[hsl(var(--primary))]">Connect</div>
                                {/* Connect Buttons - Stacked for elegance */}
                                <div className="flex flex-col gap-3 w-full max-w-xs mx-auto md:mx-0">
                                    <a
                                        href="https://github.com/Kahl-d"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center justify-between px-6 py-4 rounded-xl border border-[hsl(var(--border))] hover:border-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FaGithub className="w-5 h-5 text-[hsl(var(--foreground))]" />
                                            <span className="font-medium">GitHub</span>
                                        </div>
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/khalidm-khan/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center justify-between px-6 py-4 rounded-xl border border-[hsl(var(--border))] hover:border-[#0077b5] hover:text-[#0077b5] transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FaLinkedin className="w-5 h-5" />
                                            <span className="font-medium">LinkedIn</span>
                                        </div>
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    </a>
                                    <a
                                        href="mailto:khalid.khan@example.com"
                                        className="group flex items-center justify-between px-6 py-4 rounded-xl border border-[hsl(var(--border))] hover:border-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive))] transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3">
                                            <MdEmail className="w-5 h-5" />
                                            <span className="font-medium">Email</span>
                                        </div>
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
