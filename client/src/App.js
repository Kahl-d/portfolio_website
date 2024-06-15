import React from "react";
import "./app.css"
import Home from './Components/Home'
import Skills from './Components/Skills'
import Projects from './Components/Projects'


const App = () => {
    return (
        <div id="appContainer">
            <div className="part">
                <Home />
            </div>

            <div className="part">
                <Skills />
            </div>

            <div className="part">
                <Projects />
            </div>



        </div>
    );
    }


export default App;