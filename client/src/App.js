import React from "react";
import "./app.css"
import Home from './Components/Home'


const App = () => {
    return (
        <div id="appContainer">
            <div className="part">
                <Home />
            </div>

            <div className="part">
                Part2
            </div>


        </div>
    );
    }


export default App;