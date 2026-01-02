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
                        scale: aboutTitleScale, // Use the new scale that handles 0.2->0.3 shrink
                        y: aboutTitleY,
                        opacity: aboutTitleOpacity
                    }}
                >
                    <motion.div className="text-center">
                        <p className="text-sm md:text-base font-serif italic text-[hsl(var(--muted-foreground))] mb-2">
                            Hello, I&apos;m
                        </p>
                        <h2
                            className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold tracking-tight"
                            style={{ color: "hsl(var(--foreground))" }}
                        >
                            Khalid Khan
                        </h2>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                        {/* Left Column: Bio */}
                        <div className="space-y-6 text-center md:text-left">
                            <p
                                className="text-lg md:text-2xl leading-relaxed font-serif font-light"
                                style={{ color: "hsl(var(--foreground))" }}
                            >
                                A passionate developer crafting digital experiences. I build
                                things for the web with a focus on clean design and seamless
                                functionality.
                            </p>
                            <p
                                className="text-base md:text-lg leading-relaxed text-[hsl(var(--muted-foreground))]"
                            >
                                My work spans from developing scalable web applications to conducting
                                cutting-edge research in computational linguistics. I thrive on solving
                                complex problems and creating elegant, user-centered experiences.
                            </p>
                        </div>

                        {/* Right Column: Key Info & Connect */}
                        <div className="space-y-8 md:border-l md:border-[hsl(var(--border))] md:pl-16 flex flex-col items-center md:items-start text-center md:text-left">

                            <div className="space-y-6">
                                <h3 className="text-xl md:text-2xl font-serif font-medium text-[hsl(var(--foreground))] max-w-md">
                                    Founding AI Engineer | NLP Researcher | Instructor
                                </h3>

                                {/* Connect Buttons */}
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <a
                                        href="https://github.com/Kahl-d"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2.5 rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-medium text-sm hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                                        aria-label="GitHub"
                                    >
                                        <FaGithub className="w-4 h-4" />
                                        <span>GitHub</span>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/khalid-khan-7b4b3b1b0/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2.5 rounded-full border border-[hsl(var(--border))] hover:bg-[#0077b5] hover:text-white hover:border-transparent transition-all flex items-center gap-2"
                                        aria-label="LinkedIn"
                                    >
                                        <FaLinkedin className="w-4 h-4" />
                                        <span>LinkedIn</span>
                                    </a>
                                    <a
                                        href="mailto:khalid.khan@example.com"
                                        className="px-6 py-2.5 rounded-full border border-[hsl(var(--border))] hover:bg-[hsl(var(--destructive))] hover:text-white hover:border-transparent transition-all flex items-center gap-2"
                                        aria-label="Email"
                                    >
                                        <MdEmail className="w-4 h-4" />
                                        <span>Email</span>
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
