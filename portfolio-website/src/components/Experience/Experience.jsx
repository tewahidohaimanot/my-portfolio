import React from 'react';
import './Experience.css';
import { experienceData } from '../../data/experienceData';

const Experience = () => {
  return (
    <section className="experience" id="experience">
      <div className="section-header">
        <h2>Professional Experience</h2>
        <p className="section-subtitle">
          Track record of delivering impactful solutions and driving technical excellence
        </p>
      </div>
      <div className="timeline">
        {experienceData.map((exp) => (
          <div className="timeline-item" key={exp.id}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <div>
                  <div className="timeline-date">{exp.period}</div>
                  <h3>{exp.position}</h3>
                  <h4>{exp.company}</h4>
                  <div className="timeline-meta">
                    <span className="location">📍 {exp.location}</span>
                    <span className="duration">⏱️ {exp.duration}</span>
                    <span className="type">💼 {exp.type}</span>
                  </div>
                </div>
                {exp.current && <span className="current-badge">Current</span>}
              </div>
              <p className="exp-description">{exp.description}</p>
              
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <div className="exp-section">
                  <h5>Key Responsibilities:</h5>
                  <ul className="exp-list">
                    {exp.responsibilities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {exp.achievements && exp.achievements.length > 0 && (
                <div className="exp-section">
                  <h5>Achievements:</h5>
                  <ul className="exp-achievements">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx}>🏆 {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="experience-skills">
                {exp.technologies.map((skill, idx) => (
                  <span className="experience-skill" key={idx}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
