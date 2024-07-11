import React, { useState } from "react";
import './app.css';

const ExpandedContent = ({ index }) => {
    // Example expanded content for each screen
    const contents = [
        <div>Expanded Content 1</div>,
        <div>Expanded Content 2</div>,
        <div>Expanded Content 3</div>,
        <div>Expanded Content 4</div>
    ];
    return contents[index];
};

const App = () => {
    const [expandedScreen, setExpandedScreen] = useState(null);

    const handleScreenClick = (index) => {
        setExpandedScreen(index);
    };

    const handleCloseClick = (event) => {
        event.stopPropagation(); // Prevent the click event from propagating to the screen
        setExpandedScreen(null);
    };

    return (
        <div id="appContainer">
            {['Title 1', 'Title 2', 'Title 3', 'Title 4'].map((title, index) => (
                <div
                    key={index}
                    className={`screen ${expandedScreen === index ? `expanded ${getScreenPosition(index)}` : expandedScreen !== null ? 'shrink' : ''}`}
                    onClick={() => handleScreenClick(index)}
                >
                    {expandedScreen === index ? (
                        <ExpandedContent index={index} />
                    ) : (
                        <div>{title}</div>
                    )}
                    {expandedScreen === index && (
                        <button className="close-button" onClick={handleCloseClick}>×</button>
                    )}
                </div>
            ))}
        </div>
    );
};

const getScreenPosition = (index) => {
    switch (index) {
        case 0:
            return 'top-left';
        case 1:
            return 'top-right';
        case 2:
            return 'bottom-left';
        case 3:
            return 'bottom-right';
        default:
            return '';
    }
};

export default App;
