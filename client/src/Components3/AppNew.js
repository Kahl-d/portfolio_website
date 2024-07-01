import React, { useEffect } from "react";
import './a.css';
import { IoBuild } from "react-icons/io5";
import { GiSkills } from "react-icons/gi";
import { MdContacts } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";

const AppNew = () => {
    useEffect(() => {
        const sections = document.querySelectorAll('.part');
        const handleScroll = () => {
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop <= 10 && sectionTop >= -10) {
                    window.scrollTo({
                        top: section.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
                <div id="landing" className="part">
                    Landing
                </div>
                <div id="home" className="part">
                    HOME
                </div>
                <div id="skills" className="part">
                    SKILLS
                </div>
                <div id="projects" className="part">
                    Projects
                </div>
                <div id="contact" className="part">
                    Contact
                </div>
            </div>
        </div>
    );
}

export default AppNew;
