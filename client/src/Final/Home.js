import React from "react";
import './home.css'

import HomePic from '../Resources/homepic.png'

const Home = () => {
    return (
        <div id="homeContainer">
            <img src={HomePic} alt="Home" id="homePic" />

            <div id="homeText">
            <div id="hiText">
                Hi I'm
            </div>
            <div id="nameText">
                Khalid Mehtab Khan
            </div>
            <div id="roleText">
                <div id="roleText1">
                    Full Stack Developer
                </div>
                <div id="roleText2">
                    Statistical Modeling Enthusiast
                </div>
                <div id="roleText3">
                    Creative Designer
                </div>
            </div>
            </div>
        </div>

    )
};


export default Home;