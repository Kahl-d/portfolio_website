"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const [isNight, setIsNight] = useState(true); // Default to true (Dark Mode)
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("theme");

        // Default to dark mode if no preference is saved
        const shouldBeNight = savedTheme === "dark" || !savedTheme;

        setIsNight(shouldBeNight);
        if (shouldBeNight) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
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

    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.5)] backdrop-blur-md hover:bg-[hsl(var(--card))] hover:border-[hsl(var(--primary)/0.5)] transition-all duration-300 group shadow-sm"
            aria-label={isNight ? "Switch to Day Mode" : "Switch to Night Mode"}
        >
            <AnimatePresence mode="wait">
                {isNight ? (
                    <motion.div
                        key="moon"
                        initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Moon size={18} className="text-[hsl(var(--foreground))]" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ scale: 0.5, opacity: 0, rotate: 90 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.5, opacity: 0, rotate: -90 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Sun size={18} className="text-[hsl(var(--primary))]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
}
