"use client";

import { motion, MotionValue } from "framer-motion";
import RobotFace from "./RobotFace";
import { Download, Mail, Phone, Linkedin, Github } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface ContactSectionProps {
    opacity: MotionValue<number>;
    y: MotionValue<string>;
    pointerEvents: MotionValue<string>;
}

export default function ContactSection({ opacity, y, pointerEvents }: ContactSectionProps) {
    return (
        <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity, y, pointerEvents }}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[hsl(var(--background))] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 p-4 text-center w-full max-w-4xl mx-auto">

                {/* 1. ROBOT FACE Centerpiece */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                    className="scale-90 md:scale-100"
                >
                    <RobotFace />
                </motion.div>

                {/* 2. HEADING */}
                <div className="space-y-3">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-3xl md:text-5xl font-serif font-bold text-[hsl(var(--foreground))]"
                    >
                        Let's Connect
                    </motion.h2>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-md mx-auto"
                    >
                        Always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                    </motion.p>
                </div>

                {/* 3. PRIMARY ACTION: Resume */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        className="group relative inline-flex items-center gap-3 px-8 py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-full font-bold text-base md:text-lg tracking-wide overflow-hidden shadow-lg hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300 transform hover:-translate-y-1 pointer-events-auto"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Download Resume <Download size={20} />
                        </span>
                        {/* Hover Shine Effect */}
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </a>
                </motion.div>

                {/* 4. SECONDARY LINKS (Email, Phone, Linear Socials) */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[hsl(var(--muted-foreground))] pointer-events-auto"
                >
                    <a href="mailto:khalidmehtabk@gmail.com" className="flex items-center gap-2 hover:text-[hsl(var(--primary))] transition-colors text-sm md:text-base">
                        <Mail size={16} />
                        <span>khalidmehtabk@gmail.com</span>
                    </a>
                    <div className="hidden md:block w-px h-4 bg-[hsl(var(--border))]" />
                    <a href="tel:+14042637813" className="flex items-center gap-2 hover:text-[hsl(var(--primary))] transition-colors text-sm md:text-base">
                        <Phone size={16} />
                        <span>+1 (404) 263-7813</span>
                    </a>
                </motion.div>

                {/* 5. SOCIAL ICONS */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex gap-6 pointer-events-auto"
                >
                    <a
                        href="https://linkedin.com/in/khalid-khan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full border border-[hsl(var(--border))] hover:bg-[hsl(var(--primary)/0.1)] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] transition-all duration-300"
                    >
                        <Linkedin size={20} />
                    </a>
                    <a
                        href="https://github.com/khalid-khan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full border border-[hsl(var(--border))] hover:bg-[hsl(var(--primary)/0.1)] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] transition-all duration-300"
                    >
                        <Github size={20} />
                    </a>
                </motion.div>

            </div>
        </motion.div>
    );
}
