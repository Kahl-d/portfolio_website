"use client";

import { useState, useMemo, useEffect } from "react";
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

import {
    EducationIcon,
    WorkIcon,
    ResearchIcon,
    DefaultIcon,
    TrophyIcon,
    MedalIcon,
    ScrollIcon
} from "./ExperienceIcons";

const CategoryIcon = ({ category, className }: { category: ExperienceCategory; className?: string }) => {
    switch (category) {
        case "education": return <EducationIcon className={className} />;
        case "professional": return <WorkIcon className={className} />;
        case "research": return <ResearchIcon className={className} />;
        default: return <DefaultIcon className={className} />;
    }
};

const AwardIcon = ({ type, className }: { type: string; className?: string }) => {
    switch (type) {
        case "medal": return <MedalIcon className={className} />;
        case "scroll": return <ScrollIcon className={className} />;
        case "trophy": default: return <TrophyIcon className={className} />;
    }
};

// ===================================
// DATA HELPERS
// ===================================

function generateTimelineMonths() {
    const months = [];
    const current = new Date(TIMELINE_START);
    while (current <= TIMELINE_END) {
        months.push({
            date: new Date(current),
            label: current.toLocaleDateString("en-US", { month: "short" }),
            year: current.getFullYear(),
            month: current.getMonth(), // 0-11
            isYearStart: current.getMonth() === 0,
        });
        current.setMonth(current.getMonth() + 1);
    }
    return months;
}

const TIMELINE_MONTHS = generateTimelineMonths();

// Calculate rows for experience cards to prevent overlapping
function calculateExperienceRows(experiences: Experience[]): Map<string, number> {
    const sorted = [...experiences].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    const rows = new Map<string, number>();
    const rowEndDates: (Date | null)[] = [];

    for (const exp of sorted) {
        let assignedRow = -1;
        // Try to fit in existing row
        for (let i = 0; i < rowEndDates.length; i++) {
            const endDate = rowEndDates[i];
            // Add a 3-month buffer space for better separation
            const bufferDate = new Date(endDate || 0);
            bufferDate.setMonth(bufferDate.getMonth() + 3);

            if (!endDate || bufferDate < exp.startDate) {
                assignedRow = i;
                break;
            }
        }
        // If no row found, create new one
        if (assignedRow === -1) {
            assignedRow = rowEndDates.length;
        }

        // CONSTRAINT: Clamp rows to prevent vertical overflow (max 10 rows total, helps spread out)
        const constrainedRow = assignedRow % 10;

        rows.set(exp.id, constrainedRow);
        rowEndDates[constrainedRow] = exp.endDate || new Date(2030, 0, 1);
    }
    return rows;
}

// ===================================
// COMPONENT
// ===================================

interface ExperienceTimelineProps {
    timelineProgress: MotionValue<number>;
    opacity: MotionValue<number>;
    sectionTitleOpacity: MotionValue<number>;
    slideX?: MotionValue<string>;
}

export default function ExperienceTimeline({
    timelineProgress,
    opacity,
    sectionTitleOpacity,
    slideX,
}: ExperienceTimelineProps) {
    const [selectedItem, setSelectedItem] = useState<{ type: 'exp' | 'award', data: Experience | Award } | null>(null);
    const [windowWidth, setWindowWidth] = useState(1200);
    const [currentYear, setCurrentYear] = useState(TIMELINE_START.getFullYear());

    // CONFIG: Compact Mode
    // Reduce month width significantly to reduce scroll distance & speed
    const MONTH_WIDTH = windowWidth < 768 ? 20 : 35;
    const TOTAL_WIDTH = TIMELINE_MONTHS.length * MONTH_WIDTH;

    // Memoized rows
    const experienceRows = useMemo(() => calculateExperienceRows(EXPERIENCES), []);

    // Track interactions
    useEffect(() => {
        // Initialize width on mount to match client
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setWindowWidth(window.innerWidth);

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Scroll Logic
    const timelineX = useTransform(
        timelineProgress,
        [0, 1],
        [windowWidth / 2, -(TOTAL_WIDTH - windowWidth / 2)]
    );

    // Update Sticky Year
    useEffect(() => {
        const unsubscribe = timelineProgress.on("change", (v) => {
            const totalDuration = TIMELINE_END.getTime() - TIMELINE_START.getTime();
            const currentMs = TIMELINE_START.getTime() + (totalDuration * v);
            const date = new Date(currentMs);
            if (date.getFullYear() !== currentYear) {
                setCurrentYear(date.getFullYear());
            }
        });
        return unsubscribe;
    }, [timelineProgress, currentYear]);

    return (
        <motion.div
            className="fixed inset-0 z-[15] flex flex-col pointer-events-none"
            style={{ opacity, x: slideX }}
        >
            {/* --- TOP LAYER: Sticky Year & Title (Pointer events auto to allow interaction if needed) --- */}
            <div className="absolute top-0 left-0 right-0 h-40 z-20 pointer-events-none bg-gradient-to-b from-[hsl(var(--background))] to-transparent" />

            <motion.div className="absolute top-8 w-full text-center z-30 opacity-100 mix-blend-difference" style={{ opacity: sectionTitleOpacity }}>
                <h2 className="text-8xl md:text-9xl font-serif font-bold text-[hsl(var(--foreground))] opacity-5 tracking-tighter select-none">
                    {currentYear}
                </h2>
            </motion.div>

            <motion.div
                className="absolute top-24 left-0 right-0 text-center z-30"
                style={{ opacity: sectionTitleOpacity }}
            >
                <h3 className="text-xl md:text-2xl font-serif tracking-widest uppercase text-[hsl(var(--muted-foreground))]">
                    Experience
                </h3>
            </motion.div>

            {/* --- MAIN TIMELINE TRACK --- */}
            <div className="flex-1 flex items-center justify-start relative pointer-events-auto overflow-hidden">
                <motion.div
                    className="relative flex items-center"
                    style={{
                        x: timelineX,
                        width: TOTAL_WIDTH,
                        height: "80vh", // Confined height for the track
                        minWidth: TOTAL_WIDTH, // Ensure explicit width
                    }}
                >
                    {/* 1. The Central Line */}
                    <div className="absolute left-0 w-full top-1/2 h-0.5 bg-[hsl(var(--border))]" />

                    {/* 2. Month Ticks (Only start of year and mid-year) */}
                    {TIMELINE_MONTHS.map((m, i) => {
                        const isStart = m.isYearStart;
                        const isMid = m.month === 6;
                        if (!isStart && !isMid) return null; // Simplify: only show Jan and Jul

                        return (
                            <div
                                key={`${m.year}-${m.month}`}
                                className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                                style={{ left: i * MONTH_WIDTH }}
                            >
                                <div className={`w-0.5 ${isStart ? "h-8 bg-[hsl(var(--foreground))]" : "h-4 bg-[hsl(var(--border))]"}`} />
                                <span className={`mt-4 text-[10px] uppercase tracking-wider ${isStart ? "font-bold text-[hsl(var(--foreground))]" : "text-[hsl(var(--muted-foreground))]"}`}>
                                    {isStart ? m.year : "Jul"}
                                </span>
                            </div>
                        )
                    })}

                    {/* 3. Experiences Cards */}
                    {EXPERIENCES.map((exp) => {
                        const startPos = getTimelinePosition(exp.startDate) * TOTAL_WIDTH;
                        const width = Math.max(getExperienceWidth(exp.startDate, exp.endDate) * TOTAL_WIDTH, 60);
                        const row = experienceRows.get(exp.id) || 0;

                        // Alternating rows: Even rows above, Odd rows below
                        // We clamp the visual vertical distance to ensure it fits in viewport
                        const isAbove = row % 2 === 0;
                        const level = Math.floor(row / 2) + 1;
                        // Increase vertical spread to prevent overlap
                        const verticalOffset = isAbove ? -(level * 80 + 20) : (level * 80 + 20);

                        const colors = CATEGORY_COLORS[exp.category];

                        return (
                            <motion.button
                                key={exp.id}
                                className="absolute group text-left z-20"
                                style={{
                                    left: startPos,
                                    width: width,
                                    top: "50%",
                                    y: verticalOffset,
                                    height: 60
                                }}
                                whileHover={{ scale: 1.05, zIndex: 50 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedItem({ type: 'exp', data: exp })}
                            >
                                {/* Connector Line to Main Track */}
                                <div className={`absolute left-4 w-px bg-[hsl(var(--border))] -z-10
                                    ${isAbove ? "top-full" : "bottom-full"}
                                `} style={{
                                        height: Math.abs(verticalOffset) - 10,
                                    }} />

                                {/* Card Body */}
                                <div className={`
                                    relative h-full w-full rounded-lg border border-[hsl(var(--border))] 
                                    bg-[hsl(var(--card))] overflow-hidden shadow-sm transition-all duration-300
                                    group-hover:shadow-md group-hover:border-[hsl(${colors.light})]
                                `}>
                                    <div
                                        className="absolute left-0 top-0 bottom-0 w-1 transition-colors"
                                        style={{ backgroundColor: `hsl(${colors.light})` }}
                                    />
                                    <div className="pl-3 pr-2 py-1.5 flex flex-col justify-center h-full">
                                        <h4 className="font-serif font-medium text-sm truncate text-[hsl(var(--foreground))]">
                                            {exp.title}
                                        </h4>
                                        <p className="text-[10px] text-[hsl(var(--muted-foreground))] truncate">
                                            {exp.organization}
                                        </p>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}

                    {/* 4. Award Milestones (Pinned to the timeline track) */}
                    {AWARDS.map((award) => {
                        const pos = getTimelinePosition(award.date) * TOTAL_WIDTH;
                        return (
                            <motion.button
                                key={award.id}
                                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 group"
                                style={{ left: pos }}
                                whileHover={{ scale: 1.2 }}
                                onClick={() => setSelectedItem({ type: 'award', data: award })}
                            >
                                <div className="relative">
                                    <AwardIcon type={award.type} className="w-8 h-8 text-amber-500 drop-shadow-md" />
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full animate-ping opacity-75" />
                                </div>
                            </motion.button>
                        );
                    })}

                </motion.div>
            </div>

            {/* --- DETAIL DRAWER --- */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        className="fixed bottom-0 left-0 right-0 p-6 md:p-8 z-50 pointer-events-auto"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "110%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        <div className="max-w-3xl mx-auto rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.95)] backdrop-blur-xl shadow-2xl p-6 md:p-8 relative">
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 p-2 hover:bg-[hsl(var(--muted))] rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5 text-[hsl(var(--muted-foreground))]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>

                            {selectedItem.type === 'exp' ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[hsl(var(--muted))]">
                                            <CategoryIcon category={(selectedItem.data as Experience).category} className="w-6 h-6 text-[hsl(var(--foreground))]" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-serif font-bold text-[hsl(var(--foreground))]">{(selectedItem.data as Experience).title}</h3>
                                            <p className="text-[hsl(var(--muted-foreground))]">{(selectedItem.data as Experience).organization}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-xs font-mono text-[hsl(var(--primary))] opacity-80">
                                        <span>{(selectedItem.data as Experience).startDate.getFullYear()}</span>
                                        <span>—</span>
                                        <span>{(selectedItem.data as Experience).endDate?.getFullYear() ?? "Present"}</span>
                                    </div>
                                    <ul className="space-y-2 text-sm text-[hsl(var(--foreground)/0.8)] leading-relaxed">
                                        {(selectedItem.data as Experience).description.map((d, i) => (
                                            <li key={i} className="flex gap-2">
                                                <span className="block w-1 h-1 mt-2 rounded-full bg-[hsl(var(--primary))]" />
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="text-center space-y-4">
                                    {/* Use AwardIcon instead of hardcoded TrophyIcon */}
                                    <AwardIcon type={(selectedItem.data as Award).type} className="w-16 h-16 mx-auto text-amber-500" />
                                    <h3 className="text-2xl font-serif font-bold text-[hsl(var(--foreground))]">{(selectedItem.data as Award).title}</h3>
                                    <p className="text-[hsl(var(--muted-foreground))]">{(selectedItem.data as Award).organization} • {(selectedItem.data as Award).date.getFullYear()}</p>
                                    <p className="max-w-lg mx-auto text-sm leading-relaxed">{(selectedItem.data as Award).description}</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
