// App3.js
import React, { useState } from "react";
import "./App.css";
import Skills from "./Skills";
import Profile from "./Profile";
import Projects from "./Projects";

const App3 = () => {
  const [rightWidth, setRightWidth] = useState(35);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [draggingDiv, setDraggingDiv] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDraggingDiv("right");
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dxPercent = (dx / window.innerWidth) * 100;

    const newRightWidth = Math.min(Math.max(rightWidth - dxPercent, 5), 65);
    const newCenterWidth = 100 - newRightWidth;
    if (newCenterWidth >= 5) {
      setRightWidth(newRightWidth);
    }

    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingDiv(null);
  };

  return (
    <div id="mainContainer" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div id="appContainer" className="section">
        <div id="appCenter" className="section" style={{ width: `${100 - rightWidth}%` }}>
          <Projects setTheSelectedProject={setSelectedProject} />
        </div>
        <div id="appRight" className="section" style={{ width: `${rightWidth}%`, borderLeft: "2px solid #000" }}>
          <div className="resizer" onMouseDown={handleMouseDown} />
          {selectedProject ? (
            <div>
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  padding: "5px 10px",
                  fontSize: "16px",
                }}
              >
                X
              </button>
              <div className="projectDetail">
                <div className="projectText">
                  <h2>{selectedProject.name}</h2>
                  <img src={selectedProject.image} alt={selectedProject.name} className="projectImg" />
                  <p>{selectedProject.description}</p>
                  <button>
                    <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                      View Project
                    </a>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Skills />
          )}
        </div>
      </div>
    </div>
  );
};

export default App3;
