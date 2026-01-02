"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, MotionValue, useTransform, AnimatePresence } from "framer-motion";
import {
    EXPERIENCES,
    AWARDS,
    TIMELINE_START,
    TIMELINE_END,
    getTimelinePosition,
    getExperienceWidth,
    CATEGORY_COLORS,
    Experience,
    Award,
    ExperienceCategory,
} from "@/lib/experienceData";

// ============================================
// PROFESSIONAL SVG ICONS
// ============================================

const EducationIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
);

const ResearchIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
);

const ProfessionalIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
);

const TeachingIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

const ProjectIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
);

const LeadershipIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
);

// Award milestone icons
const TrophyIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a.75.75 0 000 1.5h12.17a.75.75 0 000-1.5h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.707 6.707 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
    </svg>
);

const MedalIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

const FlagIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
);

// Category icon component
const CategoryIcon = ({ category, className = "w-5 h-5" }: { category: ExperienceCategory; className?: string }) => {
    const icons: Record<ExperienceCategory, React.ReactNode> = {
        education: <EducationIcon className={className} />,
        research: <ResearchIcon className={className} />,
        professional: <ProfessionalIcon className={className} />,
        teaching: <TeachingIcon className={className} />,
        project: <ProjectIcon className={className} />,
        leadership: <LeadershipIcon className={className} />,
    };
    return <>{icons[category]}</>;
};

// ============================================
// PROPS & HELPERS
// ============================================

interface ExperienceTimelineProps {
    timelineProgress: MotionValue<number>;
    opacity: MotionValue<number>;
    sectionTitleOpacity: MotionValue<number>;
    slideX?: MotionValue<string>;
}

function generateTimelineMonths() {
    const months: { date: Date; label: string; year: number; month: number; isYearStart: boolean }[] = [];
    const current = new Date(TIMELINE_START);

    while (current <= TIMELINE_END) {
        months.push({
            date: new Date(current),
            label: current.toLocaleDateString("en-US", { month: "short" }),
            year: current.getFullYear(),
            month: current.getMonth(),
            isYearStart: current.getMonth() === 0,
        });
        current.setMonth(current.getMonth() + 1);
    }

    return months;
}

function generateYears() {
    const years: number[] = [];
    for (let y = TIMELINE_START.getFullYear(); y <= TIMELINE_END.getFullYear(); y++) {
        years.push(y);
    }
    return years;
}

const TIMELINE_MONTHS = generateTimelineMonths();
const TIMELINE_YEARS = generateYears();

function calculateExperienceRows(experiences: Experience[]): Map<string, number> {
    const sorted = [...experiences].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    const rows = new Map<string, number>();
    const rowEndDates: (Date | null)[] = [];

    for (const exp of sorted) {
        let assignedRow = -1;

        for (let i = 0; i < rowEndDates.length; i++) {
            const endDate = rowEndDates[i];
            if (!endDate || endDate < exp.startDate) {
                assignedRow = i;
                break;
            }
        }

        if (assignedRow === -1) {
            assignedRow = rowEndDates.length;
        }

        rows.set(exp.id, assignedRow);
        rowEndDates[assignedRow] = exp.endDate || new Date();
    }

    return rows;
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function ExperienceTimeline({
    timelineProgress,
    opacity,
    sectionTitleOpacity,
    slideX,
}: ExperienceTimelineProps) {
    const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
    const [selectedAward, setSelectedAward] = useState<Award | null>(null);
    const [windowWidth, setWindowWidth] = useState(1200);
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    const experienceRows = useMemo(() => calculateExperienceRows(EXPERIENCES), []);
    const maxRows = useMemo(() => Math.max(...Array.from(experienceRows.values())) + 1, [experienceRows]);

    // COMPACT TIMELINE - smaller month width for shorter horizontal span
    const MONTH_WIDTH = 70; // Reduced from 120 for more compact timeline
    const TOTAL_WIDTH = TIMELINE_MONTHS.length * MONTH_WIDTH;

    const timelineX = useTransform(
        timelineProgress,
        [0, 1],
        [300, -(TOTAL_WIDTH - windowWidth + 300)]
    );

    // Get current center position for tick scaling
    const [currentProgress, setCurrentProgress] = useState(0);

    useEffect(() => {
        const unsubscribe = timelineProgress.on("change", (v) => {
            setCurrentProgress(v);
        });
        return unsubscribe;
    }, [timelineProgress]);

    // Calculate center position in timeline space
    const getCenterX = () => {
        const startX = 300;
        const endX = -(TOTAL_WIDTH - windowWidth + 300);
        const currentX = startX + (endX - startX) * currentProgress;
        return windowWidth / 2 - currentX;
    };

    // Calculate scale factor for tick based on distance from center
    // Enhanced scaling with smoother falloff
    const getTickScale = (tickX: number) => {
        const centerX = getCenterX();
        const distance = Math.abs(tickX - centerX);
        const maxDistance = windowWidth / 2;
        // Smoother exponential falloff for more dramatic center effect
        const normalized = Math.min(distance / maxDistance, 1);
        const scale = 1.6 - Math.pow(normalized, 0.7) * 1.0;
        return Math.max(0.5, scale);
    };

    // Calculate opacity based on distance from center (for subtle fade effect)
    const getTickOpacity = (tickX: number) => {
        const centerX = getCenterX();
        const distance = Math.abs(tickX - centerX);
        const maxDistance = windowWidth / 2;
        const normalized = Math.min(distance / maxDistance, 1);
        return Math.max(0.4, 1 - normalized * 0.6);
    };

    return (
        <motion.div
            className="fixed inset-0 z-[15] flex flex-col overflow-hidden"
            style={{ opacity, x: slideX }}
        >
            {/* Section Title - FIXED POSITION at top, won't overlap */}
            <motion.div
                className="pt-20 pb-6 text-center z-20 flex-shrink-0"
                style={{ opacity: sectionTitleOpacity }}
            >
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight"
                    style={{ color: "hsl(var(--foreground))" }}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    Experience
                </motion.h2>
                <motion.p
                    className="mt-2 text-base md:text-lg font-light tracking-widest uppercase"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                >
                    A journey through time
                </motion.p>
            </motion.div>

            {/* Timeline Container - Vertically centered in remaining space */}
            <div className="flex-1 flex items-center overflow-hidden relative">
                <motion.div
                    ref={timelineRef}
                    className="relative"
                    style={{
                        x: timelineX,
                        width: TOTAL_WIDTH,
                        height: 280 + maxRows * 70,
                    }}
                >
                    {/* Year Labels */}
                    <div className="absolute top-0 left-0 right-0 h-14">
                        {TIMELINE_YEARS.map((year, i) => {
                            const yearStart = new Date(year, 0, 1);
                            const position = getTimelinePosition(yearStart) * TOTAL_WIDTH;
                            return (
                                <motion.div
                                    key={year}
                                    className="absolute"
                                    style={{ left: position }}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.4 }}
                                >
                                    <span
                                        className="text-2xl md:text-3xl font-serif font-bold tracking-tight"
                                        style={{ color: "hsl(var(--foreground))" }}
                                    >
                                        {year}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Month Ticks with CENTER SCALING effect */}
                    <div className="absolute top-16 left-0 right-0 h-20">
                        {TIMELINE_MONTHS.map((month, index) => {
                            const position = index * MONTH_WIDTH;
                            const isYearStart = month.isYearStart;
                            const tickScale = getTickScale(position);
                            const tickOpacity = getTickOpacity(position);

                            return (
                                <motion.div
                                    key={`${month.year}-${month.month}`}
                                    className="absolute flex flex-col items-center origin-bottom"
                                    style={{
                                        left: position,
                                        transform: `scale(${tickScale})`,
                                        opacity: tickOpacity,
                                    }}
                                >
                                    {/* Tick mark with gradient */}
                                    <div
                                        className="rounded-full transition-all duration-300"
                                        style={{
                                            width: isYearStart ? 4 : 2,
                                            height: isYearStart ? 36 : 18,
                                            background: isYearStart
                                                ? "linear-gradient(to bottom, hsl(var(--foreground)), hsl(var(--muted-foreground) / 0.5))"
                                                : "hsl(var(--muted-foreground) / 0.5)",
                                        }}
                                    />
                                    {/* Month label */}
                                    <span
                                        className="mt-2 text-xs font-medium tracking-wider uppercase transition-colors duration-300"
                                        style={{
                                            color: isYearStart
                                                ? "hsl(var(--foreground))"
                                                : "hsl(var(--muted-foreground) / 0.8)",
                                        }}
                                    >
                                        {month.label}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Timeline Track with gradient */}
                    <div
                        className="absolute left-0 right-0 h-0.5 rounded-full"
                        style={{
                            top: 150,
                            background: "linear-gradient(90deg, transparent 0%, hsl(var(--border)) 5%, hsl(var(--border)) 95%, transparent 100%)",
                        }}
                    />

                    {/* Award Milestones - FLAGS/CHECKPOINTS above timeline */}
                    <div className="absolute left-0 right-0" style={{ top: 115 }}>
                        {AWARDS.map((award, i) => {
                            const position = getTimelinePosition(award.date) * TOTAL_WIDTH;
                            const Icon = award.type === "trophy" ? TrophyIcon : award.type === "medal" ? MedalIcon : FlagIcon;
                            const color = award.type === "trophy" ? "hsl(45 90% 50%)" : award.type === "medal" ? "hsl(210 80% 60%)" : "hsl(150 60% 45%)";

                            return (
                                <motion.button
                                    key={award.id}
                                    className="absolute transform -translate-x-1/2 cursor-pointer"
                                    style={{ left: position }}
                                    whileHover={{ scale: 1.2, y: -4 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.4 }}
                                    onClick={() => {
                                        setSelectedAward(award);
                                        setSelectedExperience(null);
                                    }}
                                    title={award.title}
                                >
                                    {/* Flag pole */}
                                    <div
                                        className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 -bottom-8 rounded-full"
                                        style={{ backgroundColor: color }}
                                    />
                                    {/* Icon */}
                                    <div style={{ color }} className="relative z-10">
                                        <Icon className="w-6 h-6 md:w-7 md:h-7 drop-shadow-lg" />
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Experience Cards (below timeline) */}
                    <div className="absolute left-0 right-0" style={{ top: 170 }}>
                        {EXPERIENCES.map((exp, i) => {
                            const startPos = getTimelinePosition(exp.startDate) * TOTAL_WIDTH;
                            const width = Math.max(getExperienceWidth(exp.startDate, exp.endDate) * TOTAL_WIDTH, 140);
                            const row = experienceRows.get(exp.id) || 0;
                            const colors = CATEGORY_COLORS[exp.category];
                            const isSelected = selectedExperience?.id === exp.id;

                            return (
                                <motion.button
                                    key={exp.id}
                                    className="absolute rounded-xl cursor-pointer text-left group overflow-hidden"
                                    style={{
                                        left: startPos,
                                        width,
                                        top: row * 70,
                                        height: 56,
                                    }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.03, duration: 0.4 }}
                                    whileHover={{ scale: 1.02, y: -2, zIndex: 50 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        setSelectedExperience(exp);
                                        setSelectedAward(null);
                                    }}
                                >
                                    {/* Card background with gradient border */}
                                    <div
                                        className="absolute inset-0 rounded-xl transition-all duration-300"
                                        style={{
                                            background: isSelected
                                                ? `linear-gradient(135deg, hsl(${colors.light} / 0.2), hsl(${colors.light} / 0.1))`
                                                : "hsl(var(--card))",
                                            boxShadow: isSelected
                                                ? `0 8px 32px -8px hsl(${colors.light} / 0.4), inset 0 0 0 1.5px hsl(${colors.light})`
                                                : "0 2px 12px -4px hsl(var(--foreground) / 0.08), inset 0 0 0 1px hsl(var(--border))",
                                        }}
                                    />

                                    {/* Accent bar */}
                                    <div
                                        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all duration-300"
                                        style={{ backgroundColor: `hsl(${colors.light})` }}
                                    />

                                    {/* Content */}
                                    <div className="relative z-10 h-full flex items-center gap-3 px-4">
                                        <div
                                            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300"
                                            style={{
                                                backgroundColor: `hsl(${colors.light} / 0.15)`,
                                                color: `hsl(${colors.light})`,
                                            }}
                                        >
                                            <CategoryIcon category={exp.category} className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className="text-sm font-semibold truncate transition-colors duration-300"
                                                style={{ color: "hsl(var(--foreground))" }}
                                            >
                                                {exp.organization.split(",")[0]}
                                            </p>
                                            <p
                                                className="text-xs truncate transition-colors duration-300"
                                                style={{ color: "hsl(var(--muted-foreground))" }}
                                            >
                                                {exp.title.length > 30 ? exp.title.substring(0, 30) + "..." : exp.title}
                                            </p>
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Detail Panel - slides up from bottom */}
            <AnimatePresence>
                {(selectedExperience || selectedAward) && (
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 z-30"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    >
                        <div
                            className="p-6 md:p-8 backdrop-blur-xl"
                            style={{
                                backgroundColor: "hsl(var(--card) / 0.95)",
                                borderTop: "1px solid hsl(var(--border))",
                                boxShadow: "0 -8px 32px -8px hsl(var(--foreground) / 0.1)",
                            }}
                        >
                            {selectedExperience && (
                                <div className="max-w-4xl mx-auto">
                                    <div className="flex items-start justify-between gap-6">
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div
                                                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                                                style={{
                                                    backgroundColor: `hsl(${CATEGORY_COLORS[selectedExperience.category].light} / 0.15)`,
                                                    color: `hsl(${CATEGORY_COLORS[selectedExperience.category].light})`,
                                                }}
                                            >
                                                <CategoryIcon category={selectedExperience.category} className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3
                                                    className="text-xl md:text-2xl font-serif font-bold tracking-tight"
                                                    style={{ color: "hsl(var(--foreground))" }}
                                                >
                                                    {selectedExperience.title}
                                                </h3>
                                                <p
                                                    className="text-base mt-1"
                                                    style={{ color: "hsl(var(--muted-foreground))" }}
                                                >
                                                    {selectedExperience.organization} · {selectedExperience.location}
                                                </p>
                                                <p
                                                    className="text-sm mt-1"
                                                    style={{ color: `hsl(${CATEGORY_COLORS[selectedExperience.category].light})` }}
                                                >
                                                    {selectedExperience.startDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                                    {" — "}
                                                    {selectedExperience.endDate
                                                        ? selectedExperience.endDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
                                                        : "Present"}
                                                </p>
                                            </div>
                                        </div>
                                        <motion.button
                                            onClick={() => setSelectedExperience(null)}
                                            className="p-2 rounded-full transition-colors duration-200"
                                            style={{ color: "hsl(var(--muted-foreground))" }}
                                            whileHover={{ backgroundColor: "hsl(var(--muted) / 0.3)" }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </motion.button>
                                    </div>
                                    <motion.ul
                                        className="mt-4 space-y-2 ml-16"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        {selectedExperience.description.map((desc, i) => (
                                            <li
                                                key={i}
                                                className="text-sm leading-relaxed flex items-start gap-3"
                                                style={{ color: "hsl(var(--foreground))" }}
                                            >
                                                <span
                                                    className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                    style={{ backgroundColor: `hsl(${CATEGORY_COLORS[selectedExperience.category].light})` }}
                                                />
                                                {desc}
                                            </li>
                                        ))}
                                    </motion.ul>
                                </div>
                            )}

                            {selectedAward && (
                                <div className="max-w-4xl mx-auto">
                                    <div className="flex items-start justify-between gap-6">
                                        <div className="flex items-start gap-4">
                                            <div
                                                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                                                style={{
                                                    backgroundColor: selectedAward.type === "trophy"
                                                        ? "hsl(45 90% 50% / 0.15)"
                                                        : selectedAward.type === "medal"
                                                            ? "hsl(210 80% 60% / 0.15)"
                                                            : "hsl(150 60% 45% / 0.15)",
                                                    color: selectedAward.type === "trophy"
                                                        ? "hsl(45 90% 50%)"
                                                        : selectedAward.type === "medal"
                                                            ? "hsl(210 80% 60%)"
                                                            : "hsl(150 60% 45%)",
                                                }}
                                            >
                                                {selectedAward.type === "trophy" ? <TrophyIcon className="w-6 h-6" /> :
                                                    selectedAward.type === "medal" ? <MedalIcon className="w-6 h-6" /> :
                                                        <FlagIcon className="w-6 h-6" />}
                                            </div>
                                            <div>
                                                <h3
                                                    className="text-xl md:text-2xl font-serif font-bold tracking-tight"
                                                    style={{ color: "hsl(var(--foreground))" }}
                                                >
                                                    {selectedAward.title}
                                                </h3>
                                                <p
                                                    className="text-base mt-1"
                                                    style={{ color: "hsl(var(--muted-foreground))" }}
                                                >
                                                    {selectedAward.organization} · {selectedAward.date.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                                </p>
                                            </div>
                                        </div>
                                        <motion.button
                                            onClick={() => setSelectedAward(null)}
                                            className="p-2 rounded-full transition-colors duration-200"
                                            style={{ color: "hsl(var(--muted-foreground))" }}
                                            whileHover={{ backgroundColor: "hsl(var(--muted) / 0.3)" }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </motion.button>
                                    </div>
                                    <motion.p
                                        className="mt-4 text-sm leading-relaxed ml-16"
                                        style={{ color: "hsl(var(--foreground))" }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        {selectedAward.description}
                                    </motion.p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
