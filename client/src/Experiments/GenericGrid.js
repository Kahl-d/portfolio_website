import React, { useState } from 'react';
import './kl.css';  // Make sure to include the CSS file
import { FaArrowDown } from "react-icons/fa6";

const GridItem = ({ index, children, handleMouseEnter, handleMouseLeave, ishighlighted }) => {
    return (
        <div
            className={`item ${ishighlighted ? 'highlighted' : ''}`}
            data-index={index}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
};

const Grid = ({ items }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const calculateDistance = (i, j, gridSize) => {
        const x1 = i % gridSize;
        const y1 = Math.floor(i / gridSize);
        const x2 = j % gridSize;
        const y2 = Math.floor(j / gridSize);
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    };

    return (
        <div className="wrapper_lp">
            <div id='downarrow'><FaArrowDown/></div>
            <div className="grid_lp">
                {items.map((item, index) => {
                    const distance =
                        hoveredIndex !== null
                            ? calculateDistance(index, hoveredIndex, 12)
                            : null;
                    return (
                        <div
                            key={index}
                            className={`item ${item.ishighlighted ? 'highlighted' : ''}`}
                            data-distance={distance <= 2 ? distance : ''}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* {item.icon ? <>{item.icon} {item.name}</> : item.name} */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const GenericGrid = ({ numberOfBoxes }) => {
    const Kindices = [29,33,41, 44, 53, 55, 65, 66, 77,78, 89, 91, 101, 104,113,117];
    
    // Generating generic items with highlighted class for specified indices
    const items = Array.from({ length: 144 }, (_, index) => ({
        name: `Item ${index + 1}`,
        ishighlighted: Kindices.includes(index)
    }));

    return <Grid items={items} />;
};

export default GenericGrid;
