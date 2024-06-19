import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import './skillscloud.css';


const skills = [
  { text: 'C++', value: 50 },
  { text: 'Python', value: 60 },
  { text: 'JavaScript', value: 70 },
  { text: 'Go', value: 40 },
  { text: 'SQL', value: 50 },
  { text: 'HTML', value: 60 },
  { text: 'CSS', value: 60 },
  { text: 'React', value: 70 },
  { text: 'Flask', value: 40 },
  { text: 'Tableau', value: 50 },
  { text: 'd3.js', value: 30 },
  { text: 'Pytorch', value: 50 },
  { text: 'Tensorflow', value: 50 },
  { text: 'Keras', value: 40 },
  { text: 'Pandas', value: 60 },
  { text: 'Numpy', value: 60 },
  { text: 'Scikit-learn', value: 50 },
  { text: 'Machine Learning', value: 70 },
  { text: 'Deep Learning', value: 70 },
  { text: 'Statistical Data Analysis', value: 50 },
  { text: 'Natural Language Processing', value: 60 },
  { text: 'Computer Vision', value: 50 },
  { text: 'Big Data', value: 50 },
  { text: 'Data Mining', value: 50 },
  { text: 'Artificial Intelligence', value: 60 },
  { text: 'Generative AI', value: 60 },
];

const options = {
  rotations: 2,
  rotationAngles: [-90, 0],
  fontSizes: [20, 60],
};

const SkillsCloud = () => {
  return (
    <div className="wordcloud-container">
      <ReactWordcloud words={skills} options={options} />
    </div>
  );
};

export default SkillsCloud;
