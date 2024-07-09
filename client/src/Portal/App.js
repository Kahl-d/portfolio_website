import React, { useState } from "react";
import "./appp.css";

const App = () => {
  const [leftWidth, setLeftWidth] = useState(20);
  const [rightWidth, setRightWidth] = useState(30);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [draggingDiv, setDraggingDiv] = useState(null);

  const handleMouseDown = (e, div) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDraggingDiv(div);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;

    if (draggingDiv === "left") {
      setLeftWidth((prevWidth) => Math.min(Math.max(prevWidth + (dx / window.innerWidth) * 100, 10), 70));
    } else if (draggingDiv === "right") {
      setRightWidth((prevWidth) => Math.min(Math.max(prevWidth - (dx / window.innerWidth) * 100, 10), 70));
    }

    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingDiv(null);
  };

  return (
    <div id="appContainer" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div
        id="appLeft"
        style={{ minWidth: `${leftWidth}%`, borderRight: "2px solid #000" }}
      >
        <div
          className="resizer"
          onMouseDown={(e) => handleMouseDown(e, "left")}
        />
      </div>
      <div id="appCenter" style={{ minWidth: `${100 - leftWidth - rightWidth}%` }} />
      <div
        id="appRight"
        style={{ minWidth: `${rightWidth}%`, borderLeft: "2px solid #000" }}
      >
        <div
          className="resizer"
          onMouseDown={(e) => handleMouseDown(e, "right")}
        />
      </div>
    </div>
  );
};

export default App;
