import React, { useState } from "react";
import "./gallery.css";

const projects = [
  {
    name: "Visualizing the Housing Landscape in San Francisco",
    description: "This project visualizes the housing market trends in San Francisco over the past decade.",
    link: "https://github.com/your-repo",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "Analyzing Traffic Patterns in Los Angeles",
    description: "A comprehensive analysis of traffic patterns in Los Angeles using real-time data.",
    link: "https://github.com/your-repo",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "Climate Change Impact on Coastal Cities",
    description: "Studying the effects of climate change on coastal cities and potential mitigation strategies.",
    link: "https://github.com/your-repo",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "Renewable Energy Adoption Trends",
    description: "Tracking the adoption of renewable energy sources across different regions.",
    link: "https://github.com/your-repo",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "Urbanization and Its Effects on Wildlife",
    description: "Exploring the impact of urbanization on local wildlife populations.",
    link: "https://github.com/your-repo",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "Data Visualization Techniques for Big Data",
    description: "Various techniques for visualizing and interpreting large datasets effectively.",
    link: "https://github.com/your-repo",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "Machine Learning in Healthcare",
    description: "Applications of machine learning algorithms in improving healthcare outcomes.",
    link: "https://github.com/your-repo",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "Blockchain Technology and Its Applications",
    description: "Understanding blockchain technology and its potential use cases beyond cryptocurrencies.",
    link: "https://github.com/your-repo",
    image: "https://via.placeholder.com/150"
  }
];

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  return (
    <div className="wrapper">
      <div className="items">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`item ${selectedIndex === index ? "expanded" : ""}`}
            tabIndex="0"
            onClick={() => handleClick(index)}
          >
            <div className="project-name">
              {project.name}
            </div>
            {selectedIndex === index && (
              <div className="project-details">
                <ProjectCard project={project} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project }) => (
  <div className="card">
    <img src={project.image} alt={project.name} className="card-image" />
    <div className="card-content">
      <h2 className="card-title">{project.name}</h2>
      <p className="card-description">{project.description}</p>
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="card-button">
        View on GitHub
      </a>
    </div>
  </div>
);

export default Gallery;
