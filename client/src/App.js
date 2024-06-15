import React from "react";
import "./app.css"
import Home from './Components/Home'
import Skills from './Components/Skills'


const App = () => {
    return (
        <div id="appContainer">
            <div className="part">
                <Home />
            </div>

            <div className="part">
                <Skills />
            </div>


        </div>
    );
    }


export default App;