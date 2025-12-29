"use client";

import Image from "next/image";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      className="group relative block w-full text-left cursor-pointer transition-transform duration-500 hover:scale-[1.02] hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Content overlay */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end pointer-events-none">
          <h3 className="text-white text-xl md:text-2xl font-bold leading-tight tracking-tight">
            {project.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

