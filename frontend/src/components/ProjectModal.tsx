"use client";

import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Award } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectModalProps {
  projects: Project[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ProjectModal({
  projects,
  currentIndex,
  onClose,
  onNavigate,
}: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);
  const project = projects[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < projects.length - 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrev = useCallback(() => {
    if (hasPrev) onNavigate(currentIndex - 1);
  }, [hasPrev, currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (hasNext) onNavigate(currentIndex + 1);
  }, [hasNext, currentIndex, onNavigate]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, handlePrev, handleNext]);

  const modalContent = (
    <div
      className="project-modal-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        overflowY: "auto",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: "24px",
          right: "24px",
          zIndex: 1000000,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: "1px solid var(--color-border)",
          backgroundColor: "var(--color-card)",
          color: "var(--color-foreground)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1) rotate(90deg)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1) rotate(0deg)";
        }}
        aria-label="Close"
      >
        <X size={20} />
      </button>

      {/* Left Arrow */}
      {hasPrev && (
        <button
          onClick={handlePrev}
          style={{
            position: "fixed",
            left: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1000000,
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-card)",
            color: "var(--color-foreground)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
          aria-label="Previous project"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Right Arrow */}
      {hasNext && (
        <button
          onClick={handleNext}
          style={{
            position: "fixed",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1000000,
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-card)",
            color: "var(--color-foreground)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
          aria-label="Next project"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Page indicator */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000000,
          padding: "10px 20px",
          borderRadius: "9999px",
          border: "1px solid var(--color-border)",
          backgroundColor: "var(--color-card)",
          color: "var(--color-muted-foreground)",
          fontSize: "14px",
          fontWeight: 500,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        {currentIndex + 1} / {projects.length}
      </div>

      {/* Main Content */}
      <div style={{ minHeight: "100vh" }}>
        {/* Hero Image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "60vh",
            minHeight: "350px",
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          {/* Gradient overlay */}
          <div
            className="modal-gradient-overlay"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            position: "relative",
            padding: "0 24px 120px",
            maxWidth: "800px",
            margin: "-80px auto 0",
          }}
        >
          {/* Subtitle */}
          <p
            style={{
              color: "var(--color-accent)",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: "16px",
            }}
          >
            {project.subtitle}
          </p>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginBottom: "16px",
              color: "var(--color-foreground)",
            }}
          >
            {project.title}
          </h1>

          {/* Meta */}
          <p
            style={{
              color: "var(--color-muted-foreground)",
              fontSize: "16px",
              marginBottom: "24px",
            }}
          >
            {project.organization} · {project.period}
          </p>

          {/* Award */}
          {project.award && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                borderRadius: "9999px",
                backgroundColor: "rgba(245, 158, 11, 0.12)",
                color: "#f59e0b",
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "32px",
              }}
            >
              <Award size={16} />
              {project.award}
            </div>
          )}

          {/* Description */}
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.8,
              color: "var(--color-muted-foreground)",
              marginBottom: "40px",
            }}
          >
            {project.description}
          </p>

          {/* Signals */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {project.signals.map((signal, i) => (
              <span
                key={i}
                className="modal-card"
                style={{
                  padding: "10px 18px",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: 500,
                  border: "1px solid var(--color-border)",
                  color: "var(--color-foreground)",
                }}
              >
                {signal}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Use portal to render at document body level
  if (!mounted) return null;
  
  return createPortal(modalContent, document.body);
}
