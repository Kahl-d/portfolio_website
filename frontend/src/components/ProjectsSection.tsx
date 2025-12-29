"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { PROJECTS } from "@/lib/projects";

export default function ProjectsSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openProject = (index: number) => {
    setSelectedIndex(index);
  };

  const closeProject = () => {
    setSelectedIndex(null);
  };

  const navigateProject = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <div className="projects-grid">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => openProject(index)}
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <ProjectModal
          projects={PROJECTS}
          currentIndex={selectedIndex}
          onClose={closeProject}
          onNavigate={navigateProject}
        />
      )}
    </>
  );
}

