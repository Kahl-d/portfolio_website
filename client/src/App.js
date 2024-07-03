import React, { useEffect, useState } from "react";
import './app.css';
import Home from "./Components2/Home";
import { IoMdHome } from "react-icons/io";
import { IoBuild } from "react-icons/io5";
import { GiSkills } from "react-icons/gi";
import { MdContacts } from "react-icons/md";
import SkillGrid from "./Experiments/SkillGrid";
import GenericGrid from "./Experiments/GenericGrid";
import { IoPersonCircle } from "react-icons/io5";
import Projects from "./Components3/Projects";

const App = () => {
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        const links = document.querySelectorAll(".nav-link");

        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.3
        };

        const observerCallback = (entries) => {
            if (!isScrolling) {
                entries.forEach(entry => {
                    const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                    if (entry.isIntersecting) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            }
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
    }, [isScrolling]);

    const smoothScroll = (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        setIsScrolling(true);
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth"
        });

        setTimeout(() => {
            setIsScrolling(false);
        }, 1000);
    };

    useEffect(() => {
        const sections = document.querySelectorAll('.part');

        const handleScroll = () => {
            if (!isScrolling) {
                sections.forEach(section => {
                    const sectionTop = section.getBoundingClientRect().top;
                    if (sectionTop <= 10 && sectionTop >= -10) {
                        window.scrollTo({
                            top: section.offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isScrolling]);

    return (
        <div id="appContainer">
            <div id="appNav">
                <div>
                    <a href="#landing" className="nav-link">
                        <span>Home</span>
                    </a>
                </div>
                <div>
                    <a href="#home" className="nav-link">
                        <IoPersonCircle/>
                        <span>Profile</span>
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
                <div id="landing">
                    <GenericGrid />
                </div>
                <div id="home" className="part">
                    <Home />
                </div>
                <div id="skills" className="part">
                    
                </div>
                <div id="projects" className="part">
                    <Projects />
                </div>
                <div id="contact" className="part">
                    Contact
                </div>
            </div>
        </div>
    );
}

export default App;
