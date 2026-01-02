"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDelay: number;
  twinkleDuration: number;
}

interface Cloud {
  id: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  speed: number;
}

export default function EnvironmentBackground({ isNight }: { isNight: boolean }) {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate stars for night mode
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      twinkleDelay: Math.random() * 5,
      twinkleDuration: Math.random() * 3 + 2,
    }));
  }, []);

  // Generate clouds for day mode
  const clouds = useMemo<Cloud[]>(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 120 - 10,
      y: Math.random() * 40 + 5,
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.3,
      speed: Math.random() * 40 + 60,
    }));
  }, []);

  // Parallax transforms
  const moonY = useTransform(scrollY, [0, 1000], [0, 150]);
  const sunY = useTransform(scrollY, [0, 1000], [0, 100]);
  const starsY = useTransform(scrollY, [0, 1000], [0, 50]);
  const cloudsY = useTransform(scrollY, [0, 1000], [0, 80]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          isNight
            ? "bg-gradient-to-b from-[#0a0a1a] via-[#0d1033] to-[#1a1a2e]"
            : "bg-gradient-to-b from-[#87CEEB] via-[#B0E0E6] to-[#F0E68C]"
        }`}
      />

      {/* Night Mode Elements */}
      {isNight && (
        <>
          {/* Stars Layer */}
          <motion.div
            className="absolute inset-0"
            style={{ y: starsY }}
          >
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size,
                  height: star.size,
                }}
                animate={{
                  opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: star.twinkleDuration,
                  delay: star.twinkleDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          {/* Moon */}
          <motion.div
            className="absolute"
            style={{
              right: "10%",
              top: "8%",
              y: moonY,
            }}
          >
            {/* Moon Glow */}
            <div className="absolute inset-0 -m-8 rounded-full bg-[#ffd89b]/20 blur-3xl" />
            {/* Moon Body */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#e6d5b8] shadow-[0_0_60px_rgba(255,236,210,0.4)]">
              {/* Moon Craters */}
              <div className="absolute top-4 left-6 w-4 h-4 rounded-full bg-[#d4c4a8]/40" />
              <div className="absolute top-10 right-8 w-6 h-6 rounded-full bg-[#d4c4a8]/30" />
              <div className="absolute bottom-6 left-10 w-3 h-3 rounded-full bg-[#d4c4a8]/35" />
              <div className="absolute bottom-10 right-6 w-5 h-5 rounded-full bg-[#d4c4a8]/25" />
            </div>
          </motion.div>

          {/* Shooting Star (occasional) */}
          <motion.div
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: "20%",
              top: "15%",
            }}
            animate={{
              x: [0, 200],
              y: [0, 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              delay: 5,
              repeat: Infinity,
              repeatDelay: 10,
            }}
          >
            <div className="absolute -left-20 top-0 w-20 h-0.5 bg-gradient-to-r from-transparent to-white" />
          </motion.div>

          {/* Aurora Effect (subtle) */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/3 opacity-20"
            style={{
              background: "linear-gradient(180deg, transparent, rgba(100, 200, 150, 0.1), rgba(50, 150, 200, 0.1), transparent)",
            }}
            animate={{
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Day Mode Elements */}
      {!isNight && (
        <>
          {/* Sun */}
          <motion.div
            className="absolute flex items-center justify-center"
            style={{
              right: "10%",
              top: "5%",
              y: sunY,
              width: "160px",
              height: "160px",
            }}
          >
            {/* Sun Rays - Centered on sun */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-20 bg-gradient-to-t from-[#FFD700]/50 to-transparent"
                  style={{
                    transform: `rotate(${i * 30}deg) translateY(-60px)`,
                    transformOrigin: "center center",
                  }}
                />
              ))}
            </motion.div>
            {/* Sun Glow */}
            <div className="absolute w-32 h-32 rounded-full bg-[#FFD700]/30 blur-3xl" />
            {/* Sun Body */}
            <motion.div
              className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#FFF8DC] via-[#FFD700] to-[#FFA500] shadow-[0_0_80px_rgba(255,215,0,0.6)]"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Clouds Layer */}
          <motion.div
            className="absolute inset-0"
            style={{ y: cloudsY }}
          >
            {clouds.map((cloud) => (
              <motion.div
                key={cloud.id}
                className="absolute"
                style={{
                  left: `${cloud.x}%`,
                  top: `${cloud.y}%`,
                  scale: cloud.scale,
                  opacity: cloud.opacity,
                }}
                animate={{
                  x: [0, 50, 0],
                }}
                transition={{
                  duration: cloud.speed,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {/* Cloud Shape */}
                <div className="relative">
                  <div className="w-32 h-12 bg-white/80 rounded-full blur-sm" />
                  <div className="absolute -top-4 left-4 w-16 h-12 bg-white/80 rounded-full blur-sm" />
                  <div className="absolute -top-2 left-14 w-20 h-10 bg-white/80 rounded-full blur-sm" />
                  <div className="absolute top-2 -left-4 w-12 h-8 bg-white/70 rounded-full blur-sm" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Birds (distant, subtle) */}
          <motion.div
            className="absolute"
            style={{ left: "30%", top: "20%" }}
            animate={{
              x: [0, 300],
              y: [0, -20, 0, 20, 0],
            }}
            transition={{
              x: { duration: 30, repeat: Infinity, ease: "linear" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <svg width="30" height="15" viewBox="0 0 30 15" className="opacity-40">
              <path d="M0 7 Q7.5 0 15 7" stroke="#333" fill="none" strokeWidth="1.5" />
              <path d="M15 7 Q22.5 0 30 7" stroke="#333" fill="none" strokeWidth="1.5" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute"
            style={{ left: "50%", top: "25%" }}
            animate={{
              x: [0, 250],
              y: [0, 15, 0, -15, 0],
            }}
            transition={{
              x: { duration: 35, repeat: Infinity, ease: "linear", delay: 5 },
              y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <svg width="24" height="12" viewBox="0 0 30 15" className="opacity-30">
              <path d="M0 7 Q7.5 0 15 7" stroke="#333" fill="none" strokeWidth="1.5" />
              <path d="M15 7 Q22.5 0 30 7" stroke="#333" fill="none" strokeWidth="1.5" />
            </svg>
          </motion.div>

          {/* Subtle Light Rays from Sun */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-20 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at top right, rgba(255, 215, 0, 0.3), transparent 60%)",
              }}
            />
          </div>
        </>
      )}

      {/* Overlay for content readability */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          isNight
            ? "bg-gradient-to-b from-transparent via-[#0a0a1a]/30 to-[#0a0a1a]/60"
            : "bg-gradient-to-b from-transparent via-white/20 to-white/50"
        }`}
      />
    </div>
  );
}

