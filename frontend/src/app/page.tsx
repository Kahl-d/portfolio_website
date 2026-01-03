"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import AboutSection from "@/components/AboutSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkillsBlueprint from "@/components/SkillsBlueprint";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

import WritingSection from "@/components/WritingSection";
import HighlightsGallery from "@/components/HighlightsGallery";
import ContactSection from "@/components/ContactSection";
import NoMiOverlay from "@/components/NoMiOverlay";

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

// SCROLL CONFIGURATION
// Tuned for 2800vh total height
const SCROLL_HEIGHT = 28; // Total height in viewports

const PHASES = {
  LANDING: {
    start: 0,
    end: 0.15, // Landing -> About transition
    snap: 0,
  },
  ABOUT: {
    start: 0.15,
    end: 0.35, // Reading phase
    snap: 0.25, // Center of reading phase
  },
  EXPERIENCE: {
    entry: 0.40,
    visibleStart: 0.45,
    visibleEnd: 0.72, // Extended visibility
    exit: 0.75,
    snap: 0.55, // Center of timeline
  },
  SKILLS: {
    entry: 0.73, // Smoother handoff
    visibleStart: 0.76,
    visibleEnd: 0.85,
    exit: 0.88,
    snap: 0.80,
  },
  WRITING: {
    entry: 0.87,
    visibleStart: 0.89,
    visibleEnd: 0.92,
    exit: 0.93,
    snap: 0.905,
  },
  HIGHLIGHTS: {
    entry: 0.93,
    visibleStart: 0.94,
    visibleEnd: 0.97,
    exit: 0.98,
    snap: 0.955,
  },
  CONTACT: {
    entry: 0.98,
    visibleStart: 0.99,
    visibleEnd: 1.0,
    snap: 0.995,
  },
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ===== PHASE 1: LANDING → ABOUT =====

  // About box expansion
  const aboutTop = useTransform(scrollYProgress, [PHASES.LANDING.start, PHASES.LANDING.end], ["12.5vh", "0vh"]);
  const aboutLeft = useTransform(scrollYProgress, [PHASES.LANDING.start, PHASES.LANDING.end], ["10vw", "0vw"]);
  const aboutRight = useTransform(scrollYProgress, [PHASES.LANDING.start, PHASES.LANDING.end], ["10vw", "0vw"]);
  const aboutBottom = useTransform(scrollYProgress, [PHASES.LANDING.start, PHASES.LANDING.end], ["50vh", "0vh"]);
  const aboutBorderRadius = useTransform(scrollYProgress, [PHASES.LANDING.start, PHASES.LANDING.end], ["1rem", "0rem"]);
  const aboutBgOpacity = useTransform(scrollYProgress, [0.1, PHASES.LANDING.end], [0, 1]);

  // About Text Animations
  const aboutInitialTextScale = useTransform(scrollYProgress, [0, PHASES.LANDING.end], [1, 1]);
  const aboutTitleScale = useTransform(scrollYProgress, [PHASES.LANDING.end, 0.25], [1, 0.6]); // Shrink to header
  const aboutTitleY = useTransform(scrollYProgress, [PHASES.LANDING.end, 0.25], ["0vh", "-35vh"]);
  const aboutTitleOpacity = useTransform(scrollYProgress, [PHASES.LANDING.end, 0.25], [1, 1]);

  // About Content Appearance
  const aboutExtraContentOpacity = useTransform(scrollYProgress, [0.2, 0.25], [0, 1]);
  const aboutExtraContentY = useTransform(scrollYProgress, [0.2, 0.25, 0.35], ["20vh", "0vh", "0vh"]);

  // Landing Grid Fade Out
  const otherBoxesOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const otherBoxesScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const gridContainerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // About Exit
  const aboutContentOpacity = useTransform(scrollYProgress, [PHASES.ABOUT.end, 0.45], [1, 0]);

  // ===== PHASE 2: EXPERIENCE =====
  const experienceOpacity = useTransform(
    scrollYProgress,
    [PHASES.EXPERIENCE.entry, PHASES.EXPERIENCE.visibleStart, PHASES.EXPERIENCE.visibleEnd, PHASES.EXPERIENCE.exit],
    [0, 1, 1, 0]
  );
  const experienceX = useTransform(scrollYProgress, [PHASES.EXPERIENCE.entry, PHASES.EXPERIENCE.visibleStart], ["100vw", "0vw"]);
  const experienceTitleOpacity = useTransform(scrollYProgress, [PHASES.EXPERIENCE.entry + 0.02, PHASES.EXPERIENCE.visibleStart], [0, 1]);
  const timelineProgress = useTransform(scrollYProgress, [PHASES.EXPERIENCE.visibleStart, PHASES.EXPERIENCE.visibleEnd], [0, 1]);

  // ===== PHASE 3: SKILLS =====
  const skillsOpacity = useTransform(
    scrollYProgress,
    [PHASES.SKILLS.entry, PHASES.SKILLS.visibleStart, PHASES.SKILLS.visibleEnd, PHASES.SKILLS.exit],
    [0, 1, 1, 0]
  );
  const skillsY = useTransform(
    scrollYProgress,
    [PHASES.SKILLS.entry, PHASES.SKILLS.visibleStart, PHASES.SKILLS.visibleEnd, PHASES.SKILLS.exit],
    ["20vh", "0vh", "0vh", "-20vh"]
  );
  const skillsProgress = useTransform(scrollYProgress, [PHASES.SKILLS.visibleStart, PHASES.SKILLS.visibleEnd], [0, 1]);

  // ===== PHASE 4: WRITING =====
  const writingOpacity = useTransform(
    scrollYProgress,
    [PHASES.WRITING.entry, PHASES.WRITING.visibleStart, PHASES.WRITING.visibleEnd, PHASES.WRITING.exit],
    [0, 1, 1, 0]
  );
  const writingY = useTransform(
    scrollYProgress,
    [PHASES.WRITING.entry, PHASES.WRITING.visibleStart, PHASES.WRITING.visibleEnd, PHASES.WRITING.exit],
    ["20vh", "0vh", "0vh", "-20vh"]
  );
  const writingPointerEvents = useTransform(
    scrollYProgress,
    (v) => (v > PHASES.WRITING.visibleStart && v < PHASES.WRITING.visibleEnd ? "auto" : "none") as string
  );

  // ===== PHASE 5: HIGHLIGHTS =====
  const highlightsOpacity = useTransform(
    scrollYProgress,
    [PHASES.HIGHLIGHTS.entry, PHASES.HIGHLIGHTS.visibleStart, PHASES.HIGHLIGHTS.visibleEnd, PHASES.HIGHLIGHTS.exit],
    [0, 1, 1, 0]
  );
  const highlightsPointerEvents = useTransform(
    scrollYProgress,
    (v) => (v > PHASES.HIGHLIGHTS.visibleStart && v < PHASES.HIGHLIGHTS.visibleEnd ? "auto" : "none") as string
  );
  const highlightsX = useTransform(scrollYProgress, [PHASES.HIGHLIGHTS.visibleStart, PHASES.HIGHLIGHTS.visibleEnd], ["0%", "-60%"]);

  // ===== PHASE 6: CONTACT =====
  const contactOpacity = useTransform(scrollYProgress, [PHASES.CONTACT.entry, PHASES.CONTACT.visibleStart], [0, 1]);
  const contactY = useTransform(scrollYProgress, [PHASES.CONTACT.entry, PHASES.CONTACT.visibleStart], ["20vh", "0vh"]);
  const contactPointerEvents = useTransform(scrollYProgress, (v) => (v > PHASES.CONTACT.entry ? "auto" : "none") as string);


  // No-Mi.ai State
  const [showNoMi, setShowNoMi] = useState(false);
  const openNoMi = () => setShowNoMi(true);
  const closeNoMi = () => setShowNoMi(false);

  // Scroll Helpers
  const performScroll = (targetRatio: number) => {
    const targetY = window.innerHeight * (SCROLL_HEIGHT * targetRatio);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative h-[2800vh]">

      {/* ===== OVERLAYS ===== */}
      <NoMiOverlay isOpen={showNoMi} onClose={closeNoMi} />

      {/* ===== FIXED HEADER - Always on top ===== */}
      <header className="fixed top-0 left-0 right-0 z-[100] p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Logo
            onHomeClick={() => performScroll(0)}
            onExperienceClick={() => performScroll(PHASES.EXPERIENCE.snap)}
            onSkillsClick={() => performScroll(PHASES.SKILLS.snap)}
            onWritingClick={() => performScroll(PHASES.WRITING.snap)}
            onHighlightsClick={() => performScroll(PHASES.HIGHLIGHTS.snap)}
            onContactClick={() => performScroll(PHASES.CONTACT.snap)}
            onNoMiClick={openNoMi}
          />
          <ThemeToggle />
        </div>
      </header>

      {/* ===== CONTACT SECTION (z-40) ===== */}
      <ContactSection
        opacity={contactOpacity}
        y={contactY}
        pointerEvents={contactPointerEvents}
        onNoMiClick={openNoMi}
      />

      {/* ===== HIGHLIGHTS SECTION (z-25) ===== */}
      <HighlightsGallery
        opacity={highlightsOpacity}
        x={highlightsX}
        pointerEvents={highlightsPointerEvents}
      />

      {/* ===== WRITING SECTION (z-20) ===== */}
      <WritingSection
        opacity={writingOpacity}
        y={writingY}
        pointerEvents={writingPointerEvents}
      />

      {/* ===== SKILLS SECTION (z-18) ===== */}
      <SkillsBlueprint
        scrollProgress={skillsProgress}
        opacity={skillsOpacity}
        slideY={skillsY}
      />

      {/* ===== EXPERIENCE TIMELINE (z-15) ===== */}
      <motion.div style={{ opacity: experienceOpacity }}>
        <ExperienceTimeline
          timelineProgress={timelineProgress}
          opacity={experienceOpacity}
          sectionTitleOpacity={experienceTitleOpacity}
          slideX={experienceX}
        />
      </motion.div>

      {/* ===== ABOUT SECTION (z-10) ===== */}
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

      {/* ===== BOTTOM GRID (z-5) ===== */}
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
              onClick={() => performScroll(PHASES.EXPERIENCE.snap)}
            >
              <span className="text-card-title text-white tracking-wide drop-shadow-lg">Experience</span>
            </GridBox>
            <GridBox
              gridColumn="3 / 5"
              gridRow="1 / 3"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://artstormer.com/wp-content/uploads/2011/04/127685475_28a1267609.jpg?w=640"
              onClick={() => performScroll(PHASES.WRITING.snap)}
            >
              <span className="text-card-title text-white tracking-wide drop-shadow-lg">Writing</span>
            </GridBox>
            <GridBox
              gridColumn="3 / 5"
              gridRow="3 / 5"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://mir-s3-cdn-cf.behance.net/projects/404/a7e44868993189.Y3JvcCwzMTIzLDI0NDMsMjcwLDA.jpg"
              onClick={openNoMi}
            >
              <span className="text-card-title text-white tracking-wide drop-shadow-lg">no-mi.ai</span>
            </GridBox>
            {/* Skills: Spans 3 rows (Row 1-4) - Fixed span */}
            <GridBox
              gridColumn="5 / 7"
              gridRow="1 / 4"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://d7hftxdivxxvm.cloudfront.net/?height=570&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FrJc4mlDJy3odqIdUvHzHCw%2Flarger.jpg&width=445"
              onClick={() => performScroll(PHASES.SKILLS.snap)}
            >
              <span className="text-card-title text-white tracking-wide drop-shadow-lg">Skills</span>
            </GridBox>
            {/* Contact: Spans 1 row (Row 4-5) - Fixed span */}
            <GridBox
              gridColumn="5 / 7"
              gridRow="4 / 5"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://d7hftxdivxxvm.cloudfront.net/?height=292&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FXGb5KQgDEqN69YTnefQi5w%2Flarger.jpg&width=445"
              onClick={() => performScroll(PHASES.CONTACT.snap)}
            >
              <span className="text-card-title text-white tracking-wide drop-shadow-lg">Contact</span>
            </GridBox>
            {/* Highlights: Spans 4 rows */}
            <GridBox
              gridColumn="7 / 8"
              gridRow="1 / 5"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://d7hftxdivxxvm.cloudfront.net/?height=296&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fv8hp_ExsDv2wIh3jtXuv3A%2Flarger.jpg&width=445"
              onClick={() => performScroll(PHASES.HIGHLIGHTS.snap)}
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
              onClick={() => performScroll(PHASES.EXPERIENCE.snap)}
            >
              <span className="text-card-title text-white drop-shadow-md">Experience</span>
            </GridBox>
            <GridBox
              gridColumn="3 / 5"
              gridRow="1 / 3"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://artstormer.com/wp-content/uploads/2011/04/127685475_28a1267609.jpg?w=640"
              onClick={() => performScroll(PHASES.WRITING.snap)}
            >
              <span className="text-card-title text-white drop-shadow-md">Writing</span>
            </GridBox>
            <GridBox
              gridColumn="3 / 5"
              gridRow="3 / 5"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://mir-s3-cdn-cf.behance.net/projects/404/a7e44868993189.Y3JvcCwzMTIzLDI0NDMsMjcwLDA.jpg"
              onClick={openNoMi}
            >
              <span className="text-card-title text-white drop-shadow-md">no-mi.ai</span>
            </GridBox>
            {/* Skills: Row 5-6 (2 rows), Col 1-3 */}
            <GridBox
              gridColumn="1 / 4"
              gridRow="5 / 7"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://d7hftxdivxxvm.cloudfront.net/?height=570&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FrJc4mlDJy3odqIdUvHzHCw%2Flarger.jpg&width=445"
              onClick={() => performScroll(PHASES.SKILLS.snap)}
            >
              <span className="text-card-title text-white drop-shadow-md">Skills</span>
            </GridBox>
            {/* Contact: Row 7 (1 row), Col 1-3 */}
            <GridBox
              gridColumn="1 / 4"
              gridRow="7 / 8"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://d7hftxdivxxvm.cloudfront.net/?height=292&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FXGb5KQgDEqN69YTnefQi5w%2Flarger.jpg&width=445"
              onClick={() => performScroll(PHASES.CONTACT.snap)}
            >
              <span className="text-card-title text-white drop-shadow-md">Contact</span>
            </GridBox>
            {/* Highlights: Row 5-8 (3 rows), Col 4 */}
            <GridBox
              gridColumn="4 / 5"
              gridRow="5 / 8"
              opacity={otherBoxesOpacity}
              scale={otherBoxesScale}
              backgroundImage="https://d7hftxdivxxvm.cloudfront.net/?height=296&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fv8hp_ExsDv2wIh3jtXuv3A%2Flarger.jpg&width=445"
              onClick={() => performScroll(PHASES.HIGHLIGHTS.snap)}
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
