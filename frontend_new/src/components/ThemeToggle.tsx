"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
    const [isNight, setIsNight] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Trigger re-render to match client side
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const shouldBeNight = savedTheme === "dark" || (!savedTheme && prefersDark);

        setIsNight(shouldBeNight);
        if (shouldBeNight) {
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = useCallback(() => {
        const newTheme = !isNight;
        setIsNight(newTheme);

        if (newTheme) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isNight]);

    // Prevent flash during hydration
    if (!mounted) {
        return <div className="w-14 h-7 rounded-full" style={{ backgroundColor: "hsl(var(--muted))" }} />;
    }

    return (
        <button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full p-1 transition-all duration-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
                backgroundColor: isNight ? "hsl(220 20% 18%)" : "hsl(45 50% 88%)",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
            }}
            aria-label={isNight ? "Switch to Day Mode" : "Switch to Night Mode"}
        >
            {/* Track decorations */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                {/* Night mode - stars */}
                <AnimatePresence>
                    {isNight && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0"
                        >
                            <div className="absolute top-1.5 left-2 w-0.5 h-0.5 bg-yellow-100/70 rounded-full" />
                            <div className="absolute top-3 left-3.5 w-1 h-1 bg-yellow-100/50 rounded-full" />
                            <div className="absolute bottom-2 left-2.5 w-0.5 h-0.5 bg-yellow-100/60 rounded-full" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Day mode - clouds */}
                <AnimatePresence>
                    {!isNight && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0"
                        >
                            <div className="absolute top-1 right-2.5 w-3 h-1.5 bg-white/60 rounded-full" />
                            <div className="absolute bottom-1.5 right-2 w-2 h-1 bg-white/40 rounded-full" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Sliding thumb */}
            <motion.div
                className="relative w-5 h-5 rounded-full flex items-center justify-center"
                initial={false}
                animate={{
                    x: isNight ? 28 : 0,
                    backgroundColor: isNight ? "#f5f0e8" : "#ffc107",
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                }}
                style={{
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
            >
                {/* Sun (day) */}
                <AnimatePresence mode="wait">
                    {!isNight && (
                        <motion.div
                            key="sun"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 90 }}
                            transition={{ duration: 0.15 }}
                            className="w-2.5 h-2.5 rounded-full bg-amber-500"
                        />
                    )}
                    {isNight && (
                        <motion.div
                            key="moon"
                            initial={{ scale: 0, rotate: 90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: -90 }}
                            transition={{ duration: 0.15 }}
                            className="relative w-3 h-3 rounded-full bg-stone-300"
                        >
                            <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-stone-400/40" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </button>
    );
}
