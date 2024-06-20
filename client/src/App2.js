import React, { useEffect } from "react";
import './app2.css';
import Skills from "./Components/Skills";
import Gallery from "./Components/Gallery";
import Home from "./Components2/Home";
import Journey from "./Components2/Journey";
import { IoMdHome } from "react-icons/io";
import { GiJourney } from "react-icons/gi";
import { IoBuild } from "react-icons/io5";
import { GiSkills } from "react-icons/gi";
import { MdContacts } from "react-icons/md";
import Projects from "./Components2/Projects";

const App2 = () => {
    useEffect(() => {
        const links = document.querySelectorAll(".nav-link");

        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.6
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (entry.isIntersecting) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        document.querySelectorAll(".part").forEach(section => {
            observer.observe(section);
        });

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
                    <a href="#home" className="nav-link">
                        <IoMdHome />
                        <span>Home</span>
                    </a>
                </div>
                <div>
                    <a href="#journey" className="nav-link">
                        <GiJourney />
                        <span>Journey</span>
                    </a>
                </div>
                <div>
                    <a href="#skills" className="nav-link">
                        <GiSkills />
                        <span>Skills</span>
                    </a>
                </div>
                <div>
                    <a href="#projects" className="nav-link">
                        <IoBuild />
                        <span>Projects</span>
                    </a>
                </div>
                <div>
                    <a href="#contact" className="nav-link">
                        <MdContacts />
                        <span>Contact</span>
                    </a>
                </div>
            </div>
            <div id="appContent">
                <div id="home" className="part">
                    <div className="sticky-tag">About</div>
                    <Home />
                </div>
                <div id="journey" className="part">
                    <div className="sticky-tag">Journey</div>
                    <Journey />
                </div>
                <div id="skills" className="part">
                    <div className="sticky-tag">Skills</div>
                    <Skills/>
                </div>
                <div id="projects" className="part">
                    <div className="sticky-tag">Projects</div>
                    <Projects />
                </div>
                <div id="contact" className="part">
                    <div className="sticky-tag">Contact</div>
                </div>
            </div>
        </div>
    );
}

export default App2;
