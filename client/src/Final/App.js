import React, { useState } from "react";
import './app.css';
import { IoHomeSharp } from "react-icons/io5";
import { GrTools } from "react-icons/gr";
import { GiFilmProjector } from "react-icons/gi";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import Projects from "./Projects";
import SkillsPage from "./SkillsPage";


const App = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false); // State to manage hamburger menu

    const pages = [
        <div>Page 1</div>,
        <SkillsPage />,
        <Projects />,
        <div>Page 4</div>
    ];

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div id="appContainer">
            <div id="appContent" className={menuOpen ? 'blur' : ''}>
                {pages[currentPage]}
            </div>

            <div id="hamburgerMenu" onClick={toggleMenu} className={menuOpen ? 'open' : ''}>
                <div className="menuLine top"></div>
                <div className="menuLine middle"></div>
                <div className="menuLine bottom"></div>
            </div>

            <div id="sidebar" className={menuOpen ? 'open' : ''}>
                <div className="navItem" onClick={() => { setCurrentPage(0); setMenuOpen(false); }}>
                    <IoHomeSharp />
                    <span className="navText">Home</span>
                </div>
                <div className="navItem" onClick={() => { setCurrentPage(1); setMenuOpen(false); }}>
                    <GrTools />
                    <span className="navText">Skills</span>
                </div>
                <div className="navItem" onClick={() => { setCurrentPage(2); setMenuOpen(false); }}>
                    <GiFilmProjector />
                    <span className="navText">Projects</span>
                </div>
                <div className="navItem" onClick={() => { setCurrentPage(3); setMenuOpen(false); }}>
                    <MdOutlinePermContactCalendar />
                    <span className="navText">Contact</span>
                </div>
            </div>
        </div>
    );
}

export default App;
