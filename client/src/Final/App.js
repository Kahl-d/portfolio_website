import React, { useState } from "react";
import './app.css';
import { IoHomeSharp } from "react-icons/io5";
import { GrTools } from "react-icons/gr";
import { GiFilmProjector } from "react-icons/gi";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import Projects from "./Projects";
const App = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        <div>Page 1</div>,
        <div>Page 2</div>,
        <Projects />,
        <div>Page 4</div>
    ];

    return (
        <div id="appContainer">
            <div id="appContent">
                {pages[currentPage]}
            </div>

            <div id="appFooter">
                <div id="navBar">
                    <div className={`navItem ${currentPage === 0 ? 'left' : ''}`}></div>
                    <div className={`navItem ${currentPage === 0 ? 'active' : ''} ${currentPage === 1 ? 'left' : ''}`} onClick={() => setCurrentPage(0)}>
                        <IoHomeSharp />
                        <span className="navText">Home</span>
                    </div>
                    <div className={`navItem ${currentPage === 1 ? 'active' : ''} ${currentPage === 0 ? 'right' : ''} ${currentPage === 2 ? 'left' : ''}`} onClick={() => setCurrentPage(1)}>
                        <GrTools />
                        <span className="navText">Skills</span>
                    </div>
                    <div className={`navItem ${currentPage === 2 ? 'active' : ''} ${currentPage === 1 ? 'right' : ''} ${currentPage === 3 ? 'left' : ''}`} onClick={() => setCurrentPage(2)}>
                        <GiFilmProjector />
                        <span className="navText">Projects</span>
                    </div>
                    <div className={`navItem ${currentPage === 3 ? 'active' : ''} ${currentPage === 2 ? 'right' : ''}`} onClick={() => setCurrentPage(3)}>
                        <MdOutlinePermContactCalendar />
                        <span className="navText">Contact</span>
                    </div>
                    <div className={`navItem ${currentPage === 3 ? 'right' : ''}`}></div>
                </div>
            </div>
        </div>
    );
}

export default App;
