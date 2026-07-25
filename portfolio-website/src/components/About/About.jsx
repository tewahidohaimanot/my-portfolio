import React from 'react';
import './About.css';
import { personalInfo } from '../../data/personalData';

const About = () => {
  return (
    <section className="about" id="about">
      <div className="section-header">
        <h2>About Me</h2>
        <p className="section-subtitle">
          Dedicated professional committed to excellence in software development
        </p>
      </div>
      <div className="about-content">
        <div className="about-image">
          <div className="about-image-container">
            <div className="about-image-border"></div>
            <div className="about-placeholder">
              {personalInfo.aboutImage && (
                <img 
                  src={personalInfo.aboutImage} 
                  alt={personalInfo.name}
                  className="about-img"
                  onError={(e) => {
                    console.error('Failed to load about image');
                    e.target.style.display = 'none';
                    const svg = e.target.parentElement.querySelector('svg');
                    if (svg) svg.style.display = 'flex';
                  }}
                />
              )}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                style={{ display: personalInfo.aboutImage ? 'none' : 'block' }}
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="about-text">
          <h3>{personalInfo.title}</h3>
          {personalInfo.bio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          
          <div className="about-highlights">
            <div className="highlight-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Problem solver with analytical mindset</span>
            </div>
            <div className="highlight-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Team player & effective communicator</span>
            </div>
            <div className="highlight-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Committed to continuous learning</span>
            </div>
          </div>
          
          <div className="about-stats">
            {personalInfo.statistics.map((stat, index) => (
              <div className="stat-item" key={index}>
                <span className="stat-number">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
