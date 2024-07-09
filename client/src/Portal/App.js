import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [leftWidth, setLeftWidth] = useState(20);
  const [rightWidth, setRightWidth] = useState(20);
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
    const dxPercent = (dx / window.innerWidth) * 100;

    if (draggingDiv === "left") {
      const newLeftWidth = Math.min(Math.max(leftWidth + dxPercent, 5), 65);
      const newCenterWidth = 100 - newLeftWidth - rightWidth;
      if (newCenterWidth >= 5) {
        setLeftWidth(newLeftWidth);
      }
    } else if (draggingDiv === "right") {
      const newRightWidth = Math.min(Math.max(rightWidth - dxPercent, 20), 65);
      const newCenterWidth = 100 - leftWidth - newRightWidth;
      if (newCenterWidth >= 5) {
        setRightWidth(newRightWidth);
      }
    }

    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingDiv(null);
  };

  return (
    <div id="mainContainer">
      <div id="header">Header</div>
      <div id="appContainer" className="section" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        <div
          id="appLeft"
          style={{ width: `${leftWidth}%`, borderRight: "2px solid #000" }}
        >
          <div
            className="resizer"
            onMouseDown={(e) => handleMouseDown(e, "left")}
          />
        </div>
        <div id="appCenter" className="section" style={{ width: `${100 - leftWidth - rightWidth}%` }} />
        <div
          id="appRight" className="section"
          style={{ width: `${rightWidth}%`, borderLeft: "2px solid #000" }}
        >
          <div
            className="resizer"
            onMouseDown={(e) => handleMouseDown(e, "right")}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
