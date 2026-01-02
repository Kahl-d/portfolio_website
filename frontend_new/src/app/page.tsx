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
  backgroundImage,
  onClick,
}: {
  children: React.ReactNode;
  gridColumn: string;
  gridRow: string;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  backgroundImage?: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      className={`group relative rounded-lg flex items-center justify-center transition-all duration-500 overflow-hidden bg-cover bg-center ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      style={{
        gridColumn,
        gridRow,
        opacity,
        scale,
        backgroundColor: "hsl(var(--card) / 0.8)", // More glass-like
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        border: "1px solid hsl(var(--border))",
        backdropFilter: "blur(12px)",
      }}
      whileHover={{
        backgroundColor: "hsl(var(--card))",
        borderColor: "hsl(var(--primary) / 0.2)",
        translateY: -4,
        boxShadow: "0 10px 40px -10px hsl(var(--primary) / 0.1)"
      }}
    >
      {/* Dark overlay for readability if bg image exists, else subtle gradient */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${backgroundImage ? "bg-black/40 group-hover:bg-black/50" : "bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100"}`} />
      <span
        className="relative z-10 font-medium font-serif text-sm md:text-base transition-colors duration-300 group-hover:text-[hsl(var(--primary))]"
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

  // ===== PHASE 1: LANDING → ABOUT (0% - 20%) =====

  // About box expands to full screen
  const aboutTop = useTransform(scrollYProgress, [0, 0.2], ["12.5vh", "0vh"]);
  const aboutLeft = useTransform(scrollYProgress, [0, 0.2], ["10vw", "0vw"]);
  const aboutRight = useTransform(scrollYProgress, [0, 0.2], ["10vw", "0vw"]);
  const aboutBottom = useTransform(scrollYProgress, [0, 0.2], ["50vh", "0vh"]);
  const aboutBorderRadius = useTransform(scrollYProgress, [0, 0.2], ["1rem", "0rem"]);

  // Background opacity
  const aboutBgOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

  // Text animations
  // Title stays visible but moves to top and scales down to become "Page Heading"
  const aboutInitialTextScale = useTransform(scrollYProgress, [0, 0.2], [1, 1]);
  const aboutTitleScale = useTransform(scrollYProgress, [0.2, 0.3], [1, 0.6]); // Shrink to header size
  const aboutTitleY = useTransform(scrollYProgress, [0.2, 0.3], ["0vh", "-42vh"]); // Move to top (assuming center is 50vh, 50-8 = 42)
  const aboutTitleOpacity = useTransform(scrollYProgress, [0.2, 0.3], [1, 1]); // Stay visible

  // Extra content appears and STAYS (Reading Phase: 0.2 - 0.45)
  // Enters from bottom, then holds position while user scrolls
  const aboutExtraContentOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]); // Dalayed slightly to let title move
  const aboutExtraContentY = useTransform(scrollYProgress, [0.25, 0.35, 0.45], ["20vh", "0vh", "0vh"]);

  // Other boxes fade out faster
  const otherBoxesOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const otherBoxesScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const gridContainerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // ===== PHASE 2: RESISTANCE & TRANSITION (35% - 45%) =====

  // About content fades out LATER (after reading phase)
  const aboutContentOpacity = useTransform(scrollYProgress, [0.4, 0.5], [1, 0]);

  // Experience section slides in from right + fades in
  const experienceOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const experienceX = useTransform(scrollYProgress, [0.45, 0.55], ["100vw", "0vw"]);

  // Section title appears
  const experienceTitleOpacity = useTransform(scrollYProgress, [0.47, 0.55], [0, 1]);

  // ===== PHASE 3: TIMELINE NAVIGATION (50% - 100%) =====

  // Timeline horizontal progress
  const timelineProgress = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  // Scroll to Experience section
  const scrollToExperience = () => {
    const targetY = window.innerHeight * 6; // Adjusted for new timing
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  // Scroll to Home (Top)
  const scrollToHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div ref={containerRef} className="relative h-[1200vh]">
      {/* ===== FIXED HEADER - Always on top ===== */}
      <header className="fixed top-0 left-0 right-0 z-[100] p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Logo
            onHomeClick={scrollToHome}
            onExperienceClick={scrollToExperience}
          />
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
        aboutTitleScale={aboutTitleScale}
        aboutTitleY={aboutTitleY}
        aboutTitleOpacity={aboutTitleOpacity}
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
          {/* Desktop Grid - 7 columns x 4 rows */}
          <div className="hidden md:grid h-full w-full gap-4 grid-cols-7 grid-rows-4">
            <GridBox
              gridColumn="1 / 3"
              gridRow="1 / 5"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://www.thames-sidestudios.co.uk/user/pages/04.news/exhibitions/2022/10.counter/JonathanCallan_DSC_1863Counter2022_2000px.jpg"
              onClick={scrollToExperience}
            >
              <span className="text-3xl font-serif font-bold text-white tracking-wide drop-shadow-lg">Experience</span>
            </GridBox>
            <GridBox
              gridColumn="3 / 5"
              gridRow="1 / 3"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://artstormer.com/wp-content/uploads/2011/04/127685475_28a1267609.jpg?w=640"
            >
              <span className="text-3xl font-serif font-bold text-white tracking-wide drop-shadow-lg">Writing</span>
            </GridBox>
            <GridBox
              gridColumn="3 / 5"
              gridRow="3 / 5"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://mir-s3-cdn-cf.behance.net/projects/404/a7e44868993189.Y3JvcCwzMTIzLDI0NDMsMjcwLDA.jpg"
            >
              <span className="text-3xl font-serif font-bold text-white tracking-wide drop-shadow-lg">Projects</span>
            </GridBox>
            {/* Skills: Spans 3 rows (Row 1-4) - Fixed span */}
            <GridBox
              gridColumn="5 / 7"
              gridRow="1 / 4"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://d7hftxdivxxvm.cloudfront.net/?height=570&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FrJc4mlDJy3odqIdUvHzHCw%2Flarger.jpg&width=445"
            >
              <span className="text-3xl font-serif font-bold text-white tracking-wide drop-shadow-lg">Skills</span>
            </GridBox>
            {/* Contact: Spans 1 row (Row 4-5) - Fixed span */}
            <GridBox
              gridColumn="5 / 7"
              gridRow="4 / 5"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://d7hftxdivxxvm.cloudfront.net/?height=292&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FXGb5KQgDEqN69YTnefQi5w%2Flarger.jpg&width=445"
            >
              <span className="text-3xl font-serif font-bold text-white tracking-wide drop-shadow-lg">Contact</span>
            </GridBox>
            {/* Highlights: Spans 4 rows */}
            <GridBox
              gridColumn="7 / 8"
              gridRow="1 / 5"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://d7hftxdivxxvm.cloudfront.net/?height=296&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fv8hp_ExsDv2wIh3jtXuv3A%2Flarger.jpg&width=445"
            >
              <div className="h-full w-full flex flex-col items-center justify-center py-6">
                <span className="text-lg font-serif font-bold text-white writing-vertical-rl tracking-widest uppercase drop-shadow-lg">Highlights</span>
              </div>
            </GridBox>
          </div>

          {/* Mobile Grid - 4 columns x 7 rows */}
          <div className="grid md:hidden h-full w-full gap-2 grid-cols-4 grid-rows-7">
            <GridBox
              gridColumn="1 / 3"
              gridRow="1 / 5"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://www.thames-sidestudios.co.uk/user/pages/04.news/exhibitions/2022/10.counter/JonathanCallan_DSC_1863Counter2022_2000px.jpg"
              onClick={scrollToExperience}
            >
              <span className="text-2xl font-serif font-bold text-white drop-shadow-md">Experience</span>
            </GridBox>
            <GridBox
              gridColumn="3 / 5"
              gridRow="1 / 3"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://artstormer.com/wp-content/uploads/2011/04/127685475_28a1267609.jpg?w=640"
            >
              <span className="text-xl font-serif font-bold text-white drop-shadow-md">Writing</span>
            </GridBox>
            <GridBox
              gridColumn="3 / 5"
              gridRow="3 / 5"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://mir-s3-cdn-cf.behance.net/projects/404/a7e44868993189.Y3JvcCwzMTIzLDI0NDMsMjcwLDA.jpg"
            >
              <span className="text-xl font-serif font-bold text-white drop-shadow-md">Projects</span>
            </GridBox>
            {/* Skills: Row 5-6 (2 rows), Col 1-3 */}
            <GridBox
              gridColumn="1 / 4"
              gridRow="5 / 7"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://d7hftxdivxxvm.cloudfront.net/?height=570&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FrJc4mlDJy3odqIdUvHzHCw%2Flarger.jpg&width=445"
            >
              <span className="text-xl font-serif font-bold text-white drop-shadow-md">Skills</span>
            </GridBox>
            {/* Contact: Row 7 (1 row), Col 1-3 */}
            <GridBox
              gridColumn="1 / 4"
              gridRow="7 / 8"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://d7hftxdivxxvm.cloudfront.net/?height=292&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FXGb5KQgDEqN69YTnefQi5w%2Flarger.jpg&width=445"
            >
              <span className="text-xl font-serif font-bold text-white drop-shadow-md">Contact</span>
            </GridBox>
            {/* Highlights: Row 5-8 (3 rows), Col 4 */}
            <GridBox
              gridColumn="4 / 5"
              gridRow="5 / 8"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://d7hftxdivxxvm.cloudfront.net/?height=296&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fv8hp_ExsDv2wIh3jtXuv3A%2Flarger.jpg&width=445"
            >
              <div className="h-full w-full flex flex-col items-center justify-center py-2">
                <span className="text-xs font-serif font-bold text-white writing-vertical-rl tracking-widest uppercase drop-shadow-md">Highlights</span>
              </div>
            </GridBox>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
