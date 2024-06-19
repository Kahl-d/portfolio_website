import React, { useEffect } from "react";
import './app2.css';
import Skills from "./Components/Skills";


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
            top: targetElement.offsetTop - 16,
            behavior: "smooth"
        });
    };

    return (
        <div id="appContainer">
            <div id="appNav">
                <div>
                    <a href="#home" className="nav-link">Home</a>
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
                <div id="home" className="part">Home</div>
                <div id="education" className="part">
                </div>
                <div id="experience" className="part">Experience</div>
                <div id="skills" className="part">
                    <Skills />
                </div>
                <div id="projects" className="part">Projects</div>
                <div id="contact" className="part">Contact</div>
            </div>
        </div>
    );
}

export default App2;
