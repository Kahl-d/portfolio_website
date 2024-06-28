import React, { useEffect, useRef } from "react";
import './c.css';

const Object = () => {
    const objectRef = useRef(null);
    const bElementsRef = useRef([]);

    useEffect(() => {
        const object = objectRef.current;
        const bElements = Array.from(document.querySelectorAll('.b'));
        bElementsRef.current = bElements;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: Array.from({ length: 101 }, (_, i) => i / 100) // 0 to 1 in increments of 0.01
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const objectRect = object.getBoundingClientRect();
                    const entryRect = entry.target.getBoundingClientRect();

                    const intersectionTop = Math.max(objectRect.top, entryRect.top);
                    const intersectionBottom = Math.min(objectRect.bottom, entryRect.bottom);
                    const intersectionHeight = Math.max(0, intersectionBottom - intersectionTop);

                    console.log(`Object is intersecting with ${entry.target.id}, Intersection height: ${intersectionHeight}px`);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        bElements.forEach(element => {
            observer.observe(element);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div id="mainContainer">
            <div id="object1" className="object" ref={objectRef}></div>
            <div className="b" id="b1"></div>
            <div className="b" id="b2"></div>
            <div className="b" id="b3"></div>
            <div className="b" id="b4"></div>
            <div className="b" id="b5"></div>
        </div>
    );
};

export default Object;
