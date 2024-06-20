import React, { useEffect } from "react";
import './app2.css';
import Skills from "./Components/Skills";
import Gallery from "./Components/Gallery";
import Home from "./Components2/Home";
import Journey from "./Components2/Journey";


const App2 = () => {
    useEffect(() => {
        const links = document.querySelectorAll(".nav-link");
        links.forEach(link => {
            link.addEventListener("click", smoothScroll);
        });

        return () => {
            links.forEach(link => {
                link.removeEventListener("click", smoothScroll);
            });
        };
    }, []);

    const smoothScroll = (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth"
        });
    };

    return (
        <div id="appContainer">
            <div id="appNav">
                <div>
                    <a href="#home" className="nav-link">About</a>
                </div>
                <div>
                    <a href="#education" className="nav-link">Education</a>
                </div>
                <div>
                    <a href="#experience" className="nav-link">Work</a>
                </div>
                <div>
                    <a href="#skills" className="nav-link">Skills</a>
                </div>
                <div>
                    <a href="#projects" className="nav-link">Projects</a>
                </div>
                <div>
                    <a href="#contact" className="nav-link">Contact</a>
                </div>
            </div>
            <div id="appContent">
                <div id="home" className="part">
                    <div className="sticky-tag">About</div>
                    <Home />
                </div>
                <div id="education" className="part">
                    <div className="sticky-tag">Education</div>
                    <Journey />
                </div>
                <div id="experience" className="part">
                    <div className="sticky-tag">Work</div>
                    <p>Content for Work section...</p>
                </div>
                <div id="skills" className="part">
                    <div className="sticky-tag">Skills</div>
                    
                </div>
                <div id="projects" className="part">
                    <div className="sticky-tag">Projects</div>
                    <Gallery />
                </div>
                <div id="contact" className="part">
                    <div className="sticky-tag">Contact</div>
                    <p>Content for Contact section...</p>
                </div>
            </div>
        </div>
    );
}

export default App2;
