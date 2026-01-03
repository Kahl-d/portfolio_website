"use client";

import { motion, MotionValue } from "framer-motion";
import { Download, Mail, ArrowUpRight, Copy } from "lucide-react";
import { useState } from "react";

interface ContactSectionProps {
    opacity: MotionValue<number>;
    y: MotionValue<string>;
    pointerEvents: MotionValue<string>;
}

export default function ContactSection({ opacity, y, pointerEvents }: ContactSectionProps) {
    const [copied, setCopied] = useState(false);
    const email = "khalidmehtabk@gmail.com";

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between pointer-events-none"
            style={{ opacity, y, pointerEvents }}
        >
            {/* Background */}
            <div className="absolute inset-0 bg-[hsl(var(--background))] z-0" />

            {/* Main Content Area */}
            <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">

                    {/* Left: Headline */}
                    <div className="lg:col-span-12">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            className="border-b border-[hsl(var(--foreground))] pb-4 mb-4"
                        >
                            <span className="text-eyebrow text-[hsl(var(--primary))] mb-2 block">What's Next?</span>
                            <h2 className="text-6xl md:text-8xl lg:text-9xl leading-[0.9] font-serif font-black text-[hsl(var(--foreground))] tracking-tighter mix-blend-difference">
                                SAY<br />HELLO
                            </h2>
                        </motion.div>
                    </div>

                    {/* Left Bottom: Interaction */}
                    <div className="lg:col-span-6 space-y-6">
                        <p className="text-lg md:text-xl font-light text-[hsl(var(--muted-foreground))] leading-relaxed">
                            Currently open to new opportunities in AI Engineering and Research. Let's build the future together.
                        </p>

                        <div className="flex flex-wrap gap-4 pointer-events-auto">
                            <a
                                href={`mailto:${email}`}
                                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[hsl(var(--foreground))] text-[hsl(var(--background))] rounded-full text-base font-bold hover:scale-105 transition-transform duration-300"
                            >
                                <span>Start a conversation</span>
                                <Mail size={16} />
                            </a>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                className="group inline-flex items-center gap-2 px-6 py-3 border border-[hsl(var(--border))] rounded-full text-base font-medium hover:bg-[hsl(var(--card))] transition-colors"
                            >
                                <span>Resume</span>
                                <Download size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Right Bottom: Details */}
                    <div className="lg:col-span-6 flex flex-col items-start lg:items-end justify-end space-y-6 pointer-events-auto">
                        <div className="flex flex-col items-start lg:items-end gap-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Email</span>
                            <button
                                onClick={handleCopyEmail}
                                className="text-2xl md:text-4xl font-serif font-bold text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors text-left lg:text-right flex items-center gap-3 group"
                            >
                                {email}
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-2 py-1 rounded shadow-sm font-sans font-medium">
                                    {copied ? "Copied!" : "Copy"}
                                </span>
                            </button>
                        </div>

                        <div className="flex gap-6">
                            <a href="https://linkedin.com/in/khalid-khan" target="_blank" className="text-base font-medium hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-1">
                                LinkedIn <ArrowUpRight size={14} />
                            </a>
                            <a href="https://github.com/khalid-khan" target="_blank" className="text-base font-medium hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-1">
                                GitHub <ArrowUpRight size={14} />
                            </a>
                            <a href="https://twitter.com" target="_blank" className="text-base font-medium hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-1">
                                X (Twitter) <ArrowUpRight size={14} />
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 w-full py-6 px-6 md:px-12 lg:px-24 border-t border-[hsl(var(--border))] flex justify-between items-center text-xs font-mono uppercase text-[hsl(var(--muted-foreground))]">
                <span>© {new Date().getFullYear()} Khalid Khan</span>
                <span>Designed & Built with Intelligence</span>
            </div>
        </motion.div>
    );
}
