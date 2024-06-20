import React from "react";
import "./home.css";
import ProfilePicture from '../Resources/profile7.png';



const Home = () => {
    return (
        <div id="homeContainer">
            <div id="homeContent">
                <div id="homeText">
                    <h1>Hi, I'm Khalid M Khan</h1>
                    <p>Creative Developer</p>
                </div>
                <div id="homeImage">
                    <img src={ProfilePicture} alt="Profile" />
                </div>
            </div>
        </div>
    );
}


export default Home;