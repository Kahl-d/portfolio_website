"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function RobotFace() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position state (raw)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth mouse for eye movement
    const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

    // Map mouse position to eye pupil movement range (-10 to 10 pixels)
    const eyeX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
    const eyeY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

    // Head subtle movement (parallax)
    const headRotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
    const headRotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            // Normalize coordinates to -0.5 to 0.5 center origin
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) / window.innerWidth; // Global tracking
            const y = (e.clientY - top - height / 2) / window.innerHeight;

            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div ref={containerRef} className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            {/* Robot Head Container */}
            <motion.div
                className="relative w-full h-full"
                style={{ rotateX: headRotateX, rotateY: headRotateY, perspective: 1000 }}
            >
                {/* HEAD SHAPE (Glassmorphic) */}
                <motion.div
                    className="absolute inset-4 bg-[hsl(var(--card)/0.8)] border border-[hsl(var(--primary)/0.3)] rounded-[3rem] backdrop-blur-md shadow-[0_0_50px_-10px_hsl(var(--primary)/0.2)]"
                    animate={{
                        boxShadow: ["0 0 20px -5px hsl(var(--primary)/0.2)", "0 0 40px -5px hsl(var(--primary)/0.4)", "0 0 20px -5px hsl(var(--primary)/0.2)"]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    {/* Circuit Lines Detail (SVG) */}
                    <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 200 200">
                        <path d="M40 160 L40 140 L60 120" stroke="currentColor" fill="none" strokeWidth="1" className="text-[hsl(var(--primary))]" />
                        <path d="M160 160 L160 140 L140 120" stroke="currentColor" fill="none" strokeWidth="1" className="text-[hsl(var(--primary))]" />
                        <circle cx="100" cy="180" r="5" fill="currentColor" className="text-[hsl(var(--primary))]" />
                        <line x1="100" y1="20" x2="100" y2="40" stroke="currentColor" strokeWidth="2" className="text-[hsl(var(--primary))]" />
                    </svg>
                </motion.div>

                {/* VISOR / EYE AREA */}
                <div className="absolute top-1/3 left-8 right-8 h-24 bg-black/80 rounded-2xl flex items-center justify-around px-8 border-t border-white/10 shadow-inner overflow-hidden">
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />

                    {/* LEFT EYE */}
                    <div className="relative w-16 h-16 bg-[hsl(var(--primary)/0.1)] rounded-full border border-[hsl(var(--primary)/0.3)] flex items-center justify-center shadow-[0_0_15px_hsl(var(--primary)/0.3)]">
                        <motion.div
                            className="w-4 h-4 bg-[hsl(var(--primary))] rounded-full shadow-[0_0_10px_hsl(var(--primary))]"
                            style={{ x: eyeX, y: eyeY }}
                        >
                            <div className="absolute inset-0 bg-white/50 blur-[2px] rounded-full scale-50" />
                        </motion.div>
                    </div>

                    {/* RIGHT EYE */}
                    <div className="relative w-16 h-16 bg-[hsl(var(--primary)/0.1)] rounded-full border border-[hsl(var(--primary)/0.3)] flex items-center justify-center shadow-[0_0_15px_hsl(var(--primary)/0.3)]">
                        <motion.div
                            className="w-4 h-4 bg-[hsl(var(--primary))] rounded-full shadow-[0_0_10px_hsl(var(--primary))]"
                            style={{ x: eyeX, y: eyeY }}
                        >
                            <div className="absolute inset-0 bg-white/50 blur-[2px] rounded-full scale-50" />
                        </motion.div>
                    </div>
                </div>

                {/* MOUTH (Audio visualizer style) */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-end gap-1 h-4">
                    {[3, 7, 5, 8, 4, 6, 3].map((h, i) => (
                        <motion.div
                            key={i}
                            className="w-1 bg-[hsl(var(--primary))]"
                            animate={{ height: [4, h * 2, 4] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                        />
                    ))}
                </div>

                {/* ANTENNA / EARS */}
                <div className="absolute -left-2 top-1/2 w-4 h-12 bg-[hsl(var(--border))] rounded-l-md border-r border-black/20" />
                <div className="absolute -right-2 top-1/2 w-4 h-12 bg-[hsl(var(--border))] rounded-r-md border-l border-black/20" />
            </motion.div>

            {/* Glow Underneath */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-40 h-12 bg-[hsl(var(--primary)/0.2)] blur-[40px] rounded-full pointer-events-none" />
        </div>
    );
}
