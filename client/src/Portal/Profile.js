import React from "react";
import './profile.css';

import ProfilePicture from '../Resources/profile7.png';


const Profile = () =>{
    return (
        <div id="profileContainer">
            <div id="profileImageDiv">
                <img src={ProfilePicture} alt="Profile" />
                <span className="name">Hi, I'm Khalid</span>
            </div>
        </div>
    )
}

export default Profile