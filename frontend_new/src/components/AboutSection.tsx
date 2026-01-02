"use client";

import { motion, MotionValue } from "framer-motion";

interface AboutSectionProps {
    scrollProgress: MotionValue<number>;
    aboutTop: MotionValue<string>;
    aboutLeft: MotionValue<string>;
    aboutRight: MotionValue<string>;
    aboutBottom: MotionValue<string>;
    aboutBorderRadius: MotionValue<string>;
    aboutBgOpacity: MotionValue<number>;
    aboutInitialTextScale: MotionValue<number>;
    aboutExtraContentOpacity: MotionValue<number>;
    aboutExtraContentY: MotionValue<number>;
    contentOpacity?: MotionValue<number>;
}

export default function AboutSection({
    aboutTop,
    aboutLeft,
    aboutRight,
    aboutBottom,
    aboutBorderRadius,
    aboutBgOpacity,
    aboutInitialTextScale,
    aboutExtraContentOpacity,
    aboutExtraContentY,
    contentOpacity,
}: AboutSectionProps) {
    return (
        <motion.div
            className="fixed flex flex-col items-center justify-center z-10 overflow-hidden"
            style={{
                top: aboutTop,
                left: aboutLeft,
                right: aboutRight,
                bottom: aboutBottom,
                borderRadius: aboutBorderRadius,
            }}
        >
            {/* Base background - card color */}
            <div
                className="absolute inset-0 transition-colors duration-400"
                style={{ backgroundColor: "hsl(var(--card))" }}
            />

            {/* Overlay background - fades to page background as user scrolls */}
            <motion.div
                className="absolute inset-0 transition-colors duration-400"
                style={{
                    backgroundColor: "hsl(var(--background))",
                    opacity: aboutBgOpacity
                }}
            />

            {/* Content */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center px-6"
                style={{ opacity: contentOpacity }}
            >
                {/* Name and greeting */}
                <motion.div
                    className="flex flex-col items-center justify-center text-center"
                    style={{ scale: aboutInitialTextScale }}
                >
                    <span
                        className="text-xl md:text-2xl lg:text-3xl font-serif transition-colors duration-300"
                        style={{ color: "hsl(var(--muted-foreground))" }}
                    >
                        Hi, I&apos;m
                    </span>
                    <span
                        className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight transition-colors duration-300"
                        style={{ color: "hsl(var(--foreground))" }}
                    >
                        Khalid M Khan
                    </span>
                </motion.div>

                {/* Tagline - appears on scroll */}
                <motion.div
                    className="mt-6 text-center max-w-xl"
                    style={{
                        opacity: aboutExtraContentOpacity,
                        y: aboutExtraContentY,
                    }}
                >
                    <p
                        className="text-base md:text-lg lg:text-xl leading-relaxed transition-colors duration-300"
                        style={{ color: "hsl(var(--muted-foreground))" }}
                    >
                        Building digital experiences with passion and precision.
                    </p>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
