import React, { useEffect, useRef } from "react";
import './sp.css';

const SideProjects = () => {
    const spRef = useRef(null);

    useEffect(() => {
        const handleScroll = (event) => {
            if (spRef.current) {
                const rect = spRef.current.getBoundingClientRect();
                if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
                    spRef.current.scrollLeft += 10 * event.deltaY;
                    event.preventDefault();
                }
            }
        };

        window.addEventListener('wheel', handleScroll, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, []);

    return (
        <div className="sp-container">
            <div className="sp" ref={spRef}>
                <div className="pz">Project 1</div>
                <div className="pz">Project 2</div>
                <div className="pz">Project 3</div>
                <div className="pz">Project 4</div>
                <div className="pz">Project 5</div>
                <div className="pz">Project 6</div>
            </div>
        </div>
    );
};

export default SideProjects;
