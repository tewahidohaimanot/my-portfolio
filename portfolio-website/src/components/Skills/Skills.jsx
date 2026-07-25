import React from 'react';
import './Skills.css';
import { skillsData } from '../../data/skillsData';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const Skills = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, once: true });

  const getIcon = (iconType) => {
    const icons = {
      code: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 10.935v2.131l-8 3.947v-2.23l5.64-2.783-5.64-2.79v-2.223l8 3.948zm-16 3.848l-5.64-2.783 5.64-2.79v-2.223l-8 3.948v2.131l8 3.947v-2.23zm7.047-10.783h-2.078l-4.011 16h2.073l4.016-16z"/>
        </svg>
      ),
      server: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
        </svg>
      ),
      tools: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
      )
    };
    return icons[iconType] || icons.code;
  };

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="section-header">
        <h2>Technical Expertise</h2>
        <p className="section-subtitle">
          Comprehensive skill set built through years of hands-on experience and continuous learning
        </p>
      </div>
      <div className={`skills-container ${isVisible ? 'animate-in' : ''}`}>
        {skillsData.map((category, index) => (
          <div className="skill-category" key={index}>
            <div className="skill-category-header">
              <div className={`skill-icon ${category.color}`}>{getIcon(category.icon)}</div>
              <h3>{category.category}</h3>
            </div>
            <div className="skill-list">
              {category.skills.map((skill, idx) => (
                <div className="skill-item" key={idx}>
                  <div className="skill-name">
                    <span className="skill-title">{skill.name}</span>
                    <div className="skill-meta">
                      <span className="skill-years">{skill.years}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
