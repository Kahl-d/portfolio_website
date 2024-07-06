import React, { useEffect } from "react";
import './appn.css';
import { IoBuild } from "react-icons/io5";
import { GiSkills } from "react-icons/gi";
import { MdContacts } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import Projects from "./Projects";

const AppN = () => {

    useEffect(() => {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        const sections = document.querySelectorAll('.part');
        const options = {
            root: null,
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                const navLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (entry.isIntersecting) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }

                if (entry.target.id === 'projects') {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('highlight');
                    } else {
                        entry.target.classList.remove('highlight');
                    }
                }
            });
        }, options);

        sections.forEach(section => {
            observer.observe(section);
        });

        const handleScroll = () => {
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 0 && rect.bottom > window.innerHeight / 2) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            });
        };

        document.getElementById('appContent').addEventListener('scroll', handleScroll);

        // Clean up the event listeners on unmount
        return () => {
            navLinks.forEach(link => {
                link.removeEventListener('click', (event) => {
                    event.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });

            sections.forEach(section => {
                observer.unobserve(section);
            });

            document.getElementById('appContent').removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div id="appContainer">
            <div id="appContent">
                <div className="part" id="landing">Landing</div>
                <div className="part" id="home">
                    <div className="sticky-tag">Home</div>
                </div>
                <div className="part" id="skills">
                    <div className="sticky-tag">Skills</div>
                </div>
                <div className="part" id="projects">
                    {/* <div className="sticky-tag">Projects</div> */}
                    <Projects />
                </div>
                <div className="part" id="contact">
                    <div className="sticky-tag">Contact</div>
                </div>
            </div>
            <div id="appNav">
                <div>
                    <a href="#landing" className="nav-link">
                        <span>Home</span>
                    </a>
                </div>
                <div>
                    <a href="#home" className="nav-link">
                        <IoPersonCircle />
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
        </div>
    );
}

export default AppN;
