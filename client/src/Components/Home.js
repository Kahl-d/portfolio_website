import React from "react";
import './home.css'


const Home = () => {
    return ( 
        <div className="section" id="homeContainer">
            <div id="top">
                <div>logo</div>
                <div>
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div id="main">
                <h1>Home</h1>
                <p>Home page content</p>
            </div>
        </div>
    )
}



export default Home;