import React from "react";
import './con.css';
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { TiSocialInstagram } from "react-icons/ti";


const Contact = () => {
    return (
        <div id="contactContainer" className="section">

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

        </div>
    )

}


export default Contact;