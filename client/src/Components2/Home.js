import React from "react";
import "./home.css";
import ProfilePicture from '../Resources/profile7.png';
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { TiSocialInstagram } from "react-icons/ti";




const Home = () => {
    return (
        <div id="homeContainer">
            <div id="homeContent">
                <div id="homeText">
                    <h1>Hi, I'm Khalid M Khan</h1>
                    <p>Creative Designer</p>
                    <p>Web Developer</p>
                    <p>AI Graduate (MSc)</p>
                    <p>NLP & Statistical Modeling Expert</p>

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
                    <a href="tel:404-263-7813" className="infoDiv">
                        <IoIosCall />
                        <div className="info">(404) 263 7813</div>
                    </a>
                    <a href="mailto:email.khalidmkhan@gmail.com" className="infoDiv">
                        <MdEmail />
                        <div className="info">email.khalidmkhan@gmail.com</div>
                    </a>

                    <a href="https://www.linkedin.com/in/khalid-mehtab-khan-0982b1173/" className="infoDiv">
                        <CiLinkedin />
                        <div className="info">www.linkedin.com/in/khalid-mehtab-khan</div>
                    </a>

                    {/* github */}
                    <a href="https://github.com/Kahl-d" className="infoDiv">
                        <FaGithub />
                        <div className="info">github.com/Kahl-d</div>
                    </a>

                    {/* twitter */}
                    <a href="https://x.com/ashvatthamaa" className="infoDiv">
                        <FaSquareXTwitter />
                        <div className="info">x.com/ashvatthamaa</div>
                    </a>
                    
                    {/* instagram */}
                    <a href="https://www.instagram.com/ashvatthama.__/" className="infoDiv">
                        <TiSocialInstagram />
                        <div className="info">@ashvatthama.__</div>
                    </a>

                </div>
                <div id="homeImage">
                    <img src={ProfilePicture} alt="Profile" />
                </div>

                <div id="wave">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FFFFFF" fillOpacity="1" d="M0,224L48,224C96,224,192,224,288,208C384,192,480,160,576,144C672,128,768,128,864,138.7C960,149,1056,171,1152,154.7C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                </div>
            </div>
        </div>
    );
}


export default Home;