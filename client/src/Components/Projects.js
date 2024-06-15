import React, { useState } from 'react';
import './projects.css';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';

const Projects = () => {
    const items = [
        {
            id: 1,
            title: 'Project 1',
            description: 'Description for Project 1',
            image: 'https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg'
        },
        {
            id: 2,
            title: 'Project 2',
            description: 'Description for Project 2',
            image: 'https://i.redd.it/tc0aqpv92pn21.jpg'
        },
        {
            id: 3,
            title: 'Project 3',
            description: 'Description for Project 3',
            image: 'https://wharferj.files.wordpress.com/2015/11/bio_north.jpg'
        },
        {
            id: 4,
            title: 'Project 4',
            description: 'Description for Project 4',
            image: 'https://images7.alphacoders.com/878/878663.jpg'
        },
        {
            id: 5,
            title: 'Project 5',
            description: 'Description for Project 5',
            image: 'https://theawesomer.com/photos/2017/07/simon_stalenhag_the_electric_state_6.jpg'
        }
    ];

    const [highlighted, setHighlighted] = useState(0);

    const nextSlide = () => {
        setHighlighted((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = () => {
        setHighlighted((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    return (
        <div
            className='section'
            id="projectsContainer"
            style={{ backgroundImage: `url(${items[highlighted].image})` }}
        >
            <main>
                <div className='slider'>
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className={`item ${index === highlighted ? 'highlighted' : ''}`}
                            style={{ backgroundImage: `url(${item.image})` }}
                        >
                            {index === highlighted && (
                                    <h2 className='title'>{item.title}</h2>
                            )}
                           
                        </div>
                    ))}
                </div>
                <nav className='nav'>
                    <IoArrowBackOutline className='btn prev' onClick={prevSlide} />
                    <IoArrowForwardOutline className='btn next' onClick={nextSlide} />
                </nav>
            </main>
            <div className='content'>
                <h2 className='title'>{items[highlighted].title}</h2>
                <p className='description'>{items[highlighted].description}</p>
                <button>Read More</button>
            </div>
        </div>
    );
};

export default Projects;
