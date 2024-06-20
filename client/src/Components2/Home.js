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

                <div id="homeAbout">
                    <p>
                    Innovative data science enthusiast with a keen aptitude for identifying patterns and insights within numbers and data. Passionate
                    about leveraging IT solutions in public sector, with proven ability to adapt and excel in collaborative, cross-departmental projects.
                    Driven towards advancing technology through creative solutions and meticulous learning. Excels in applying comprehensive
                    tatistical analysis and machine learning techniques to develop and optimize predictive models and AI-driven applications.
                    </p>
                </div>

                <div id="homeContact">

                    {/* Call */}
                    <a href="tel:647-832-5980">
                        Call Me : 647-832-5980
                    </a>
                    <a href="mailto:email.khalidmkhan@gmail.com">
                        Email Me : email.khalidmkhan@gmail.com
                    </a>

                    <a href="https://www.linkedin.com/in/khalidmkhan/">
                        LinkedIn : linkedin.com/in/khalidmkhan
                    </a>

                    {/* github */}
                    <a href="github.com">
                        GitHub : github.com/khalidmkhan
                    </a>

                    {/* twitter */}
                    <a href="twitter.com">
                        Twitter : twitter.com/khalidmkhan
                    </a>
                    

                </div>
                <div id="homeImage">
                    <img src={ProfilePicture} alt="Profile" />
                </div>
            </div>
        </div>
    );
}


export default Home;