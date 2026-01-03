"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, MotionValue, useTransform, useSpring, AnimatePresence, useMotionValue } from "framer-motion";
import {
    SKILL_CATEGORIES,
    getSkillsByCategory,
    type CategoryConfig,
} from "@/lib/skillsData";
import {
    SiPython, SiPytorch, SiTensorflow, SiHuggingface, SiScikitlearn, SiOpenai,
    SiNumpy, SiPandas, SiDocker, SiGit, SiPostgresql, SiLinux, SiJupyter, SiFastapi,
} from "@icons-pack/react-simple-icons";
import {
    Brain, Database, Server, Code, BookOpen, Cpu, Eye, Sparkles,
    BarChart3, MessageSquare, Layers, Zap, Search, FileText,
    FlaskConical, GraduationCap, Settings, Network,
    Crosshair, Activity, Terminal
} from "lucide-react";

// ===================================
// ICON MAPPING
// ===================================
const skillIcons: Record<string, React.ReactNode> = {
    python: <SiPython className="w-full h-full" />,
    pytorch: <SiPytorch className="w-full h-full" />,
    tensorflow: <SiTensorflow className="w-full h-full" />,
    huggingface: <SiHuggingface className="w-full h-full" />,
    sklearn: <SiScikitlearn className="w-full h-full" />,
    openai: <SiOpenai className="w-full h-full" />,
    numpy: <SiNumpy className="w-full h-full" />,
    pandas: <SiPandas className="w-full h-full" />,
    docker: <SiDocker className="w-full h-full" />,
    git: <SiGit className="w-full h-full" />,
    postgresql: <SiPostgresql className="w-full h-full" />,
    linux: <SiLinux className="w-full h-full" />,
    jupyter: <SiJupyter className="w-full h-full" />,
    fastapi: <SiFastapi className="w-full h-full" />,
    brain: <Brain className="w-full h-full" />,
    database: <Database className="w-full h-full" />,
    server: <Server className="w-full h-full" />,
    code: <Code className="w-full h-full" />,
    book: <BookOpen className="w-full h-full" />,
    cpu: <Cpu className="w-full h-full" />,
    eye: <Eye className="w-full h-full" />,
    sparkles: <Sparkles className="w-full h-full" />,
    chart: <BarChart3 className="w-full h-full" />,
    message: <MessageSquare className="w-full h-full" />,
    layers: <Layers className="w-full h-full" />,
    zap: <Zap className="w-full h-full" />,
    search: <Search className="w-full h-full" />,
    file: <FileText className="w-full h-full" />,
    flask: <FlaskConical className="w-full h-full" />,
    graduation: <GraduationCap className="w-full h-full" />,
    settings: <Settings className="w-full h-full" />,
    network: <Network className="w-full h-full" />,
};

// ===================================
// LEFT HUD NAVIGATION
// ===================================

function HUDNavigation({
    categories,
    activeIndex,
    onSelect,
    pointerEvents
}: {
    categories: typeof SKILL_CATEGORIES;
    activeIndex: number;
    onSelect: (index: number) => void;
    pointerEvents: MotionValue<string>;
}) {
    return (
        <motion.div
            className="hidden md:flex absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-40 flex-col items-start gap-1"
            style={{ pointerEvents }}
        >
            {/* List */}
            <div className="flex flex-col gap-2 w-full">
                {categories.map((cat, idx) => {
                    const isActive = activeIndex === idx;
                    return (
                        <motion.button
                            key={cat.id}
                            onClick={() => onSelect(idx)}
                            className="group relative flex items-center gap-3 pl-4 pr-6 py-2 w-full text-left transition-colors"
                            initial={false}
                            animate={{
                                opacity: isActive ? 1 : 0.5,
                            }}
                        >
                            {/* Active Indicator Line */}
                            <div
                                className="absolute left-0 top-0 bottom-0 w-[2px] bg-current transition-colors duration-300"
                                style={{
                                    backgroundColor: isActive ? `hsl(${cat.color})` : "transparent",
                                    height: "100%"
                                }}
                            />

                            {/* Hover/Active Background */}
                            <div
                                className="absolute inset-0 -z-10 bg-current transition-opacity duration-300"
                                style={{
                                    backgroundColor: isActive ? `hsl(${cat.color})` : "white",
                                    opacity: isActive ? 0.05 : 0
                                }}
                            />

                            {/* Icon / Number */}
                            <div className="font-mono text-[10px] w-6 text-right opacity-60">
                                {idx < 10 ? `0${idx}` : idx}
                            </div>

                            {/* Label */}
                            <div
                                className="text-sm font-bold uppercase tracking-wider whitespace-nowrap"
                                style={{ color: isActive ? `hsl(${cat.color})` : "inherit" }}
                            >
                                {cat.name}
                            </div>

                            {/* Connecting Line (visual only) */}
                            {isActive && (
                                <motion.div
                                    layoutId="active-line"
                                    className="absolute right-0 top-1/2 w-8 h-[1px] bg-current translate-x-full"
                                    style={{ color: `hsl(${cat.color})` }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </motion.div>
    );
}

// ===================================
// 3D TRANSFORMER BLOCK
// ===================================

interface TransformerBlockProps {
    category: CategoryConfig;
    isActive: boolean; // Kept for specific active-only effects like pulse
    isPast: boolean;   // New: true if index <= activeIndex
    index: number;
    total: number;
    gap: MotionValue<number>;
    onClick: () => void;
}

function TransformerBlock({ category, isActive, isPast, index, total, gap, onClick }: TransformerBlockProps) {
    // Use useTransform directly inside the component
    const yPos = useTransform(gap, (currentGap) => {
        return (index - (total - 1) / 2) * -60 - (index - (total - 1) / 2) * currentGap;
    });

    return (
        <motion.div
            className="absolute top-1/2 left-1/2"
            style={{
                transformStyle: "preserve-3d",
                y: yPos,
            }}
            animate={{
                scale: isActive ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
        >
            <div
                className="relative group cursor-pointer"
                style={{ width: 340, height: 40, transformStyle: "preserve-3d", transform: "translate(-50%, -50%)" }}
            >
                {/* FRONT FACE - VISUAL STATE */}
                <div
                    className={`absolute inset-0 border flex items-center justify-between px-4 transition-all duration-500 ${isPast ? "backdrop-blur-md" : "backdrop-blur-[2px]"
                        }`}
                    style={{
                        transform: "translateZ(170px)",
                        // PAST/ACTIVE: Colored & Filled
                        // FUTURE: Blueprint (Dashed, Monochromatic). Increased opacity for light mode visibility.
                        borderColor: isPast ? `hsl(${category.color})` : "hsl(var(--foreground)/0.3)", // Increased from 0.3 muted to 0.3 foreground
                        backgroundColor: isPast ? `hsl(${category.color}/0.15)` : "hsla(var(--background), 0.1)", // Slight tint
                        borderStyle: isPast ? "solid" : "dashed",
                        boxShadow: isActive ? `0 0 30px hsl(${category.color}/0.3)` : undefined,
                        borderWidth: isPast ? "1px" : "1.5px", // Slightly thicker dashed lines
                    }}
                >
                    {/* Tech Code */}
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-3 bg-current" style={{ color: isPast ? `hsl(${category.color})` : "hsl(var(--foreground)/0.6)" }} />
                        <span className="text-[10px] font-mono tracking-wider font-semibold" style={{ color: isPast ? "inherit" : "hsl(var(--foreground)/0.6)" }}>
                            {isPast ? `VER_${index}.0` : `BLPRNT_${index}`}
                        </span>
                    </div>

                    {/* Category Name - Outline for Blueprint */}
                    <span
                        className="text-sm font-bold uppercase tracking-wider"
                        style={{
                            color: isPast ? `hsl(${category.color})` : "hsl(var(--foreground))",
                            opacity: isPast ? 1 : 0.7 // Increased opacity
                        }}
                    >
                        {category.name}
                    </span>

                    {/* Processing Indicator (Only for Past/Real layers) */}
                    <div className="flex gap-1 h-1">
                        {[1, 2, 3].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-3 rounded-full bg-current"
                                style={{
                                    color: isPast ? `hsl(${category.color})` : "hsl(var(--foreground))",
                                    opacity: isPast ? (isActive ? 1 : 0.5) : 0.3 // Increased opacity
                                }}
                                animate={{ opacity: isActive ? [0.2, 1, 0.2] : (isPast ? 0.5 : 0.3) }}
                                transition={{
                                    duration: isActive ? 0.5 : 2,
                                    delay: i * 0.1,
                                    repeat: Infinity
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* BACK FACE */}
                <div
                    className="absolute inset-0 border bg-[hsl(var(--background)/0.9)]"
                    style={{
                        transform: "rotateY(180deg) translateZ(170px)",
                        borderColor: isPast ? `hsl(${category.color}/0.2)` : "hsl(var(--foreground)/0.15)",
                        borderStyle: isPast ? "solid" : "dashed",
                        borderWidth: isPast ? "1px" : "1.5px",
                    }}
                />

                {/* SIDE FACES (Left/Right) */}
                <div
                    className="absolute inset-0 border bg-[hsl(var(--background)/0.7)]"
                    style={{
                        width: 340,
                        transform: "rotateY(-90deg) translateZ(170px)",
                        borderColor: isPast ? `hsl(${category.color}/0.2)` : "hsl(var(--foreground)/0.15)",
                        borderStyle: isPast ? "solid" : "dashed",
                        borderWidth: isPast ? "1px" : "1.5px",
                    }}
                />
                <div
                    className="absolute inset-0 border bg-[hsl(var(--background)/0.7)]"
                    style={{
                        width: 340,
                        transform: "rotateY(90deg) translateZ(170px)",
                        borderColor: isPast ? `hsl(${category.color}/0.2)` : "hsl(var(--foreground)/0.15)",
                        borderStyle: isPast ? "solid" : "dashed",
                        borderWidth: isPast ? "1px" : "1.5px",
                    }}
                />

                {/* TOP FACE - Circuitry vs Grid */}
                <div
                    className="absolute inset-0 border bg-[hsl(var(--card)/0.95)] overflow-hidden"
                    style={{
                        width: 340,
                        height: 340,
                        transform: "rotateX(90deg) translateZ(20px)",
                        borderColor: isPast ? `hsl(${category.color}/0.2)` : "hsl(var(--foreground)/0.15)",
                        borderStyle: isPast ? "solid" : "dashed",
                        borderWidth: isPast ? "1px" : "1.5px",
                    }}
                >
                    {/* Circuit Grid - Colored for Past, Gray for Blueprint */}
                    <div className="absolute inset-0"
                        style={{
                            opacity: isPast ? 0.1 : 0.05, // Subtle grid
                            backgroundImage: isPast
                                ? `linear-gradient(hsl(${category.color}) 1px, transparent 1px), linear-gradient(90deg, hsl(${category.color}) 1px, transparent 1px)`
                                : `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                            backgroundSize: "20px 20px"
                        }}
                    />
                    {/* Active Core Connection - Only for Past */}
                    {isPast && isActive && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                className="w-full h-full border-2 rounded-full opacity-20"
                                style={{ borderColor: `hsl(${category.color})` }}
                                animate={{ scale: [0.8, 1], opacity: [0.5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </div>
                    )}
                </div>

                {/* BOTTOM FACE */}
                <div
                    className="absolute inset-0 border bg-[hsl(var(--background)/0.9)]"
                    style={{
                        width: 340,
                        height: 340,
                        transform: "rotateX(-90deg) translateZ(20px)",
                        borderColor: isPast ? `hsl(${category.color}/0.2)` : "hsl(var(--foreground)/0.15)",
                        borderWidth: isPast ? "1px" : "1.5px",
                    }}
                />
            </div>
        </motion.div>
    );
}

// ===================================
// SKILLS PANEL
// ===================================

function SkillsPanel({ category, pointerEvents }: { category: CategoryConfig; pointerEvents: MotionValue<string> }) {
    const skills = getSkillsByCategory(category.id);

    return (
        <motion.div
            key={category.id}
            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-80 md:w-96 z-40"
            style={{ pointerEvents }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="pl-6 border-l-2" style={{ borderColor: `hsl(${category.color})` }}>
                {/* Tech Header */}
                <div className="flex items-center gap-2 mb-2 opacity-70">
                    <Terminal size={14} style={{ color: `hsl(${category.color})` }} />
                    <span className="text-eyebrow text-[hsl(var(--muted-foreground))]">
                        EXEC_CTX: {category.id.toUpperCase()}
                    </span>
                </div>

                <h3 className="text-section-title mb-1" style={{ color: `hsl(${category.color})` }}>
                    {category.name}
                </h3>
                <div className="text-eyebrow text-[hsl(var(--muted-foreground))] mb-6">
                    {category.title}
                </div>

                <p className="text-body text-[hsl(var(--foreground)/0.9)] mb-8 drop-shadow-sm border-l border-dashed border-[hsl(var(--border))] pl-4 py-2">
                    {category.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center gap-2 group cursor-default"
                        >
                            <div className="w-5 h-5 p-1 rounded bg-[hsl(var(--muted)/0.5)] group-hover:bg-[hsl(var(--muted))] transition-colors text-[hsl(var(--foreground))]" style={{ color: `hsl(${category.color})` }}>
                                {skillIcons[skill.icon] || <Code className="w-full h-full" />}
                            </div>
                            <span className="text-xs font-medium text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// ===================================
// MAIN COMPONENT
// ===================================

export default function SkillsBlueprint({
    scrollProgress,
    opacity,
    slideY,
}: {
    scrollProgress: MotionValue<number>;
    opacity: MotionValue<number>;
    slideY?: MotionValue<string>;
}) {
    const [activeIndex, setActiveIndex] = useState(0);

    // DRAG INTERACTION STATE
    const [isDragging, setIsDragging] = useState(false);
    const dragRotation = useMotionValue(0);
    const lastX = useRef(0);

    // SCROLL-DRIVEN ROTATION & GAP
    // Full rotation 0->360 controlled by scroll
    const scrollRotation = useTransform(scrollProgress, [0, 1], [0, 360]);
    const stackGap = useTransform(scrollProgress, [0, 0.4, 1], [2, 60, 100]); // More expansion

    // COMBINED ROTATION
    const smoothDragRotation = useSpring(dragRotation, { stiffness: 400, damping: 30 });
    const finalRotation = useTransform(
        [scrollRotation, smoothDragRotation],
        (latest: number[]) => latest[0] + latest[1]
    );

    // Dynamic pointer events to prevent blocking clicks when transparent
    const displayEvents = useTransform(opacity, (v) => (v > 0.5 ? "auto" : "none") as string);

    // Sync active index with scroll
    useEffect(() => {
        const unsubscribe = scrollProgress.on("change", (v) => {
            if (!isDragging) {
                const effectiveProgress = Math.max(0, (v - 0.2) / 0.8);
                const count = SKILL_CATEGORIES.length;
                const newIndex = Math.min(Math.floor(effectiveProgress * count), count - 1);
                if (newIndex !== activeIndex) setActiveIndex(newIndex);
            }
        });
        return unsubscribe;
    }, [scrollProgress, activeIndex, isDragging]);

    const activeCategory = SKILL_CATEGORIES[activeIndex] as CategoryConfig;

    // Manual Drag Handlers
    const handlePointerDown = (e: React.PointerEvent) => {
        setIsDragging(true);
        lastX.current = e.clientX;
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (isDragging) {
            const delta = e.clientX - lastX.current;
            dragRotation.set(dragRotation.get() + delta * 0.5); // Sensitivity
            lastX.current = e.clientX;
        }
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    return (
        <motion.div
            className="fixed inset-0 z-[18] flex items-center justify-center pointer-events-none"
            style={{ opacity, y: slideY }}
        >
            {/* Background Gradients - Adjusted for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.05)_0%,transparent_70%)] origin-center" />

            {/* HUD Navigation (Left) */}
            <HUDNavigation
                categories={SKILL_CATEGORIES}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
                pointerEvents={displayEvents}
            />
            {/* Title - HD Clarity */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
                <h2 className="text-display font-black text-[hsl(var(--foreground)/0.4)] uppercase tracking-widest drop-shadow-sm">
                    SKILLS
                </h2>
            </div>

            {/* 3D SCENE CONTAINER - INTERACTIVE AREA */}
            <motion.div
                className="relative w-full h-full flex items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing opacity-20 md:opacity-100 transition-opacity duration-300"
                style={{ pointerEvents: displayEvents }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            >
                <motion.div
                    className="relative"
                    style={{
                        transformStyle: "preserve-3d",
                        rotateX: 75,
                        rotateZ: finalRotation,
                    }}
                >
                    {SKILL_CATEGORIES.map((cat, idx) => (
                        <TransformerBlock
                            key={cat.id}
                            category={cat}
                            isActive={idx === activeIndex}
                            isPast={idx <= activeIndex}
                            index={idx}
                            total={SKILL_CATEGORIES.length}
                            gap={stackGap}
                            onClick={() => setActiveIndex(idx)}
                        />
                    ))}

                    {/* Center Core Pulse - REMOVED */}
                </motion.div>
            </motion.div>

            {/* Info Panel (Right) */}
            <AnimatePresence mode="wait">
                <SkillsPanel category={activeCategory} pointerEvents={displayEvents} />
            </AnimatePresence>

            {/* Status Footer */}
            <div className="absolute bottom-8 right-12 text-[10px] font-mono text-right text-[hsl(var(--muted-foreground))] opacity-50">
                <div className="flex items-center justify-end gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>SYSTEM ONLINE</span>
                </div>
                <div>LATENCY: 12ms</div>
            </div>
        </motion.div>
    );
}
