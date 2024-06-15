import React from 'react';
import './skills.css'
import { SiCplusplus } from "react-icons/si";
import { FaPython } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io5";
import { FaGolang } from "react-icons/fa6";
import { PiFileSqlFill } from "react-icons/pi";
import { FaHtml5 } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io";
import { FaReact } from "react-icons/fa";
import { SiFlask } from "react-icons/si";



const Skills = () => {
    return (
        <div className='section' id='skillContainer'>
            <div className='skillRow'>
                <div className='skillBox'>
                    {/* c++ */}
                    <div className='skillIcon'>
                        <SiCplusplus />
                    </div>
                    <div className='skillText'>
                        <h3>C++</h3>
                    </div>
                </div>

                <div className='skillBox'>
                    <div className='skillIcon'>
                        <FaPython/>
                    </div>
                    <div className='skillText'>
                        <h3>Python</h3>
                    </div>
                </div>

                <div className='skillBox'>
                    <div className='skillIcon'>
                        <IoLogoJavascript/>
                    </div>
                    <div className='skillText'>
                        <h3>JavaScript</h3>
                    </div>
                </div>

                {/* go */}
                <div className='skillBox'>
                    <div className='skillIcon'>
                        <FaGolang/>
                    </div>
                    <div className='skillText'>
                        <h3>Go</h3>
                    </div>
                </div>

                {/* SQL */}
                <div className='skillBox'>
                    <div className='skillIcon'>
                        <PiFileSqlFill/>
                    </div>
                    <div className='skillText'>
                        <h3>SQL</h3>
                    </div>
                </div>

                
            </div>

            <div className='skillRow'>
                {/* HTML */}
                <div className='skillBox'>
                    <div className='skillIcon'>
                        <FaHtml5/>
                    </div>
                    <div className='skillText'>
                        <h3>HTML</h3>
                    </div>
                </div>
                    
                    {/* CSS */}
                <div className='skillBox'>
                    <div className='skillIcon'>
                        <IoLogoCss3/>
                    </div>
                    <div className='skillText'>
                        <h3>CSS</h3>
                    </div>
                </div>

                {/* React */}

                <div className='skillBox'>
                    <div className='skillIcon'>
                        <FaReact/>
                    </div>
                    <div className='skillText'>
                        <h3>React</h3>
                    </div>
                </div>

                {/* Flask */}
                <div className='skillBox'>
                    <div className='skillIcon'>
                        <SiFlask/>
                    </div>
                    <div className='skillText'>
                        <h3>Flask</h3>
                    </div>
                </div>
            </div>
        
        </div>
    );
    }


export default Skills;