"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import AboutSection from "@/components/AboutSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

// Reusable Grid Box component with proper theme colors
function GridBox({
  children,
  gridColumn,
  gridRow,
  opacity,
  scale,
}: {
  children: React.ReactNode;
  gridColumn: string;
  gridRow: string;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
}) {
  return (
    <motion.div
      className="rounded-lg flex items-center justify-center transition-all duration-300"
      style={{
        gridColumn,
        gridRow,
        opacity,
        scale,
        backgroundColor: "hsl(var(--card))",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "hsl(var(--border))",
      }}
    >
      <span
        className="font-medium font-serif text-sm md:text-base transition-colors duration-300"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        {children}
      </span>
    </motion.div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress (now 400vh for more scroll room)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ===== PHASE 1: LANDING → ABOUT (0% - 50%) =====

  // About box expands to full screen
  const aboutTop = useTransform(scrollYProgress, [0, 0.25], ["12.5vh", "0vh"]);
  const aboutLeft = useTransform(scrollYProgress, [0, 0.25], ["10vw", "0vw"]);
  const aboutRight = useTransform(scrollYProgress, [0, 0.25], ["10vw", "0vw"]);
  const aboutBottom = useTransform(scrollYProgress, [0, 0.25], ["50vh", "0vh"]);
  const aboutBorderRadius = useTransform(scrollYProgress, [0, 0.25], ["1rem", "0rem"]);

  // Background opacity - card color fades to background color
  const aboutBgOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

  // Text animations
  const aboutInitialTextScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.2]);
  const aboutExtraContentOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const aboutExtraContentY = useTransform(scrollYProgress, [0.2, 0.35], [30, 0]);

  // Other boxes fade out
  const otherBoxesOpacity = useTransform(scrollYProgress, [0, 0.125], [1, 0]);
  const otherBoxesScale = useTransform(scrollYProgress, [0, 0.125], [1, 0.95]);
  const gridContainerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // ===== PHASE 2: ABOUT → EXPERIENCE TIMELINE =====

  // About content fades out (container stays)
  const aboutContentOpacity = useTransform(scrollYProgress, [0.2, 0.3], [1, 0]);

  // Experience section slides in from right + fades in
  const experienceOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
  const experienceX = useTransform(scrollYProgress, [0.25, 0.35], ["100vw", "0vw"]);

  // Section title appears
  const experienceTitleOpacity = useTransform(scrollYProgress, [0.28, 0.35], [0, 1]);

  // ===== PHASE 3: TIMELINE NAVIGATION (35% - 100%) =====

  // Timeline horizontal progress - VERY SLOW: maps 65% of scroll to timeline
  const timelineProgress = useTransform(scrollYProgress, [0.35, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[1200vh]">
      {/* ===== FIXED HEADER - Always on top ===== */}
      <header className="fixed top-0 left-0 right-0 z-[100] p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Logo />
          <ThemeToggle />
        </div>
      </header>

      {/* ===== EXPERIENCE TIMELINE (z-15) ===== */}
      <ExperienceTimeline
        timelineProgress={timelineProgress}
        opacity={experienceOpacity}
        sectionTitleOpacity={experienceTitleOpacity}
        slideX={experienceX}
      />

      {/* ===== ABOUT SECTION - Expands to full screen (z-10) ===== */}
      <AboutSection
        scrollProgress={scrollYProgress}
        aboutTop={aboutTop}
        aboutLeft={aboutLeft}
        aboutRight={aboutRight}
        aboutBottom={aboutBottom}
        aboutBorderRadius={aboutBorderRadius}
        aboutBgOpacity={aboutBgOpacity}
        aboutInitialTextScale={aboutInitialTextScale}
        aboutExtraContentOpacity={aboutExtraContentOpacity}
        aboutExtraContentY={aboutExtraContentY}
        contentOpacity={aboutContentOpacity}
      />

      {/* ===== BOTTOM GRID - Other boxes that fade out ===== */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-[45vh] p-4 md:p-8 lg:p-12 z-[5]"
        style={{ opacity: gridContainerOpacity }}
      >
        <div className="h-full max-w-5xl mx-auto">
          {/* Desktop Grid - 5 boxes with simpler corners */}
          <div className="hidden md:grid h-full w-full gap-3 grid-cols-6 grid-rows-4">
            <GridBox gridColumn="1 / 3" gridRow="1 / 5" opacity={otherBoxesOpacity} scale={otherBoxesScale}>
              Experience
            </GridBox>
            <GridBox gridColumn="3 / 5" gridRow="1 / 3" opacity={otherBoxesOpacity} scale={otherBoxesScale}>
              Writing
            </GridBox>
            <GridBox gridColumn="3 / 5" gridRow="3 / 5" opacity={otherBoxesOpacity} scale={otherBoxesScale}>
              Projects
            </GridBox>
            <GridBox gridColumn="5 / 7" gridRow="1 / 4" opacity={otherBoxesOpacity} scale={otherBoxesScale}>
              Skills
            </GridBox>
            <GridBox gridColumn="5 / 7" gridRow="4 / 5" opacity={otherBoxesOpacity} scale={otherBoxesScale}>
              Contact
            </GridBox>
          </div>

          {/* Mobile Grid */}
          <div className="grid md:hidden h-full w-full gap-2 grid-cols-4 grid-rows-6">
            <GridBox gridColumn="1 / 3" gridRow="1 / 4" opacity={otherBoxesOpacity} scale={otherBoxesScale}>
              Experience
            </GridBox>
            <GridBox gridColumn="3 / 5" gridRow="1 / 3" opacity={otherBoxesOpacity} scale={otherBoxesScale}>
              Writing
            </GridBox>
            <GridBox gridColumn="3 / 5" gridRow="3 / 5" opacity={otherBoxesOpacity} scale={otherBoxesScale}>
              Projects
            </GridBox>
            <GridBox gridColumn="1 / 3" gridRow="4 / 7" opacity={otherBoxesOpacity} scale={otherBoxesScale}>
              Skills
            </GridBox>
            <GridBox gridColumn="3 / 5" gridRow="5 / 7" opacity={otherBoxesOpacity} scale={otherBoxesScale}>
              Contact
            </GridBox>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
