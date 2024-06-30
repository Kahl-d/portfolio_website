import React, { useEffect } from "react";
import './appnew.css';
import { IoMdHome } from "react-icons/io";
import { GiJourney } from "react-icons/gi";
import { IoBuild } from "react-icons/io5";
import { GiSkills } from "react-icons/gi";
import { MdContacts } from "react-icons/md";
import GenericGrid from "./Experiments/GenericGrid";

const App = () => {
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
            

                <div id="landing">
                    <GenericGrid />
                </div>

                <div id="parts-container">

                <div id="appNav">
                <div>
                    <a href="#landing" className="nav-link">
                        <IoMdHome />
                        <span>Landing</span>
                    </a>
                </div>
                
                <div>
                    <a href="#home" className="nav-link">
                        <IoMdHome />
                        <span>Home</span>
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
                        {/* <Home /> */}
                    </div>
                    
                    <div id="skills" className="part">
                        <div className="sticky-tag">Skills</div>
                        {/* <SkillGrid /> */}
                    </div>
                    <div id="projects" className="part">
                        <div className="sticky-tag">Projects</div>
                        {/* <Projects /> */}
                    </div>
                    <div id="contact" className="part">
                        <div className="sticky-tag">Contact</div>
                    </div>
                    </div>

                </div>
                
            
        </div>
    );
}

export default App;
