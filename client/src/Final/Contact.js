import React from "react";
import './con.css';
import { FaBoltLightning } from "react-icons/fa6";
import { GiLightBulb } from "react-icons/gi";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import ContactPic from '../Resources/contactpic.png'


const Contact = ()=>{
    return (
        <div id="contactContainer">
            <div id="contactTop"  className="contactSection">
                <img src={ContactPic} id="contactPic"/>
                <h1>I'd love to work with you</h1>
                <p>Here are some of my previous work reviews</p>
                <div id="contactReviews">
                        <div className="review">
                            <FaBoltLightning/>
                            <span>Quick at resolution</span>
                        </div>
                        <div className="review">
                            <GiLightBulb/>
                            <span>Innovative</span>
                        </div>
                        <div className="review">
                            <MdOutlineConnectWithoutContact/>
                            <span>Great communication</span>
                        </div>
                </div>
            </div>

            <div id="contactBottom">
                <div id="bottomLeft" className="contactSection">
                    <div id="contactInfo">
                        <div className="contactItem">
                            <div className="innerItem">
                                <span>You can e-mail me here</span>
                                <span>email.khalidmkhan@gmail.com</span>
                            </div>
                            <div className="btn">
                                <FaSquareArrowUpRight className="takeArrow"/>
                            </div>
                        </div>
                        <div className="contactItem">
                            <div className="innerItem">
                                <span>Give me a call</span>
                                <span>+1 404 263 7813</span>
                            </div>
                            <div className="btn">
                                <FaSquareArrowUpRight className="takeArrow"/>
                            </div>
                        </div>
                        <div className="contactItem">
                            <div className="innerItem">
                                <span>You can find me in</span>
                                <span>San Francisco</span>
                            </div>
                            <div className="btn">
                                <FaSquareArrowUpRight className="takeArrow"/>
                            </div>
                        </div>
                        
                        <div className="socialProfiles">
                            <div className="socialProfileItem">
                                <FaGithubSquare className="icons"/>
                            </div>
                            <div className="socialProfileItem">
                                <FaLinkedin className="icons"/>
                            </div>
                            <div className="socialProfileItem">
                                <FaSquareXTwitter className="icons"/>
                            </div>
                            <div className="socialProfileItem">
                                <FaSquareInstagram className="icons"/>
                            </div>
                        </div>
                        <div id="resumeDiv">
                            <button>Download</button>
                        </div>
                    </div>
                </div>

                <div id="bottomRight" className="contactSection">
                    <form id="conForm">
                        <div id="formTop">
                            <input type="text" placeholder="First Name"/>
                            <input type="text" placeholder="Last Name"/>
                            <input type="text" placeholder="Your Email"/>
                            <input type="text" placeholder="Phone"/>
                        </div>
                        <div id="formMid">
                            <div>Reason for contact</div>
                            <div id="radioOptions">
                                <div>
                                    <input type="radio" name="reason" value="work"/>
                                    <label>Work</label>
                                </div>
                                <div>
                                    <input type="radio" name="reason" value="collab"/>
                                    <label>Collaboration</label>
                                </div>
                                <div>
                                    <input type="radio" name="reason" value="other"/>
                                    <label>Other</label>
                                </div>
                            </div>
                        </div>
                        <div id="formBottom">
                            <textarea placeholder="Message"></textarea>
                            <button>Submit</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}


export default Contact;


