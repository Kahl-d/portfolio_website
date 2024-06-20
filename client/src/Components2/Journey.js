import React from "react";
import './journey.css';

const Journey = () => {

    return (
        <div id="journeyContainer">
            <div className="thing" id="thing1">
                <div className="thing-title">
                    <span>The LNM Institute of Information Technology</span>
                    <span>Bachelor of Technology</span>
                    <span>Computer Science and Engineering</span>
                </div>
                <div className="thing-content">
                    <span>2017 - 2021</span>
                    <span>Jaipur, Rajasthan</span>
                    <p>During my journey at The LNM Institute of Information Technology, I pursued a Bachelor's degree in Computer Science and Engineering. This program provided a solid foundation in computer science principles and practical skills. Key highlights of my educational journey include:</p>
                    <ul>
                        <li>Studying core subjects such as Data Structures and Algorithms, Database Management Systems, Web Development, and Software Engineering.</li>
                        <li>Completing a major project on [specific topic or project name], which involved [brief description of your project]. This experience enhanced my understanding of software development lifecycle and project management.</li>
                        <li>Being an active member of [campus organization or club], where I organized [specific event or initiative] and developed leadership and organizational skills.</li>
                    </ul>
                </div>
            </div>
            <div className="thing" id="thing2">
                <div className="thing-title">
                    <span>Innovaccer</span>
                    <span>Healthcare Data Associate</span>
                </div>
                <div className="thing-content">
                    <span>January 2021 - September 2022</span>
                    <span>Noida, Uttar Pradesh</span>
                    <ul>
                        <li>Enhanced lead generation by analyzing historical data, resulting in a 20% improvement through targeted strategy adjustments.</li>
                        <li>Created SQL dashboards with advanced visualization tools, significantly enhancing the assessment of network campaign performances and enabling more data-driven decision-making.</li>
                        <li>Boosted conversion rates by 10% by integrating interactive elements into our web platforms, enriching user engagement.</li>
                        <li>Led a 3-person team in establishing key relationships with healthcare professionals nationwide, focusing on gathering in-depth requirements and conducting use case studies to inform our project strategy.</li>
                    </ul>
                </div>
            </div>
            <div className="thing" id="thing3">
                <div className="thing-title">
                    <span>San Francisco State University</span>
                    <span>Master of Science</span>
                    <span>Data Science & Artificial Intelligence</span>
                </div>
                <div className="thing-content">
                    <span>August 2023 - Present</span>
                    <span>San Francisco, California</span>
                    <p>Currently pursuing a Master's degree in Data Science & Artificial Intelligence at San Francisco State University. Key areas of study include:</p>
                    
                    <p>Research Projects:</p>
                    <ul>
                        <li>Performance Analysis Visualization System for Classifier Models: Python, JavaScript, React, Flask, D3.js</li>
                        <li>Developed a visualization system tailored for deep analytical evaluation of AI models, specifically multi-class image classifiers. This tool facilitates a deeper understanding of model behaviors and performance metrics, enhancing the interpretability and transparency of complex AI systems for both technical and non-technical stakeholders.</li>
                        <li>Research project on NLP TACCTI ALMA project (details to be added).</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Journey;
