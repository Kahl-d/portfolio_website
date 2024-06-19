import React from "react";
import "./app.css"
import Home from './Components/Home'
import Skills from './Components/Skills'
import Projects from './Components/Projects'
import Gallery from './Components/Gallery'


const App = () => {
    return (
        <div id="appContainer1">
            <div className="part">
                <Home />
            </div>

            <div className="part">
                <Skills />
            </div>

            

            {/* <div className="part">
                <Projects />
            </div> */}

            <div className="part">
                <Gallery />
            </div>



        </div>
    );
    }


export default App;