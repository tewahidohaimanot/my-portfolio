import React from 'react';
import './Hero.css';
import { personalInfo } from '../../data/personalData';
import { scrollToSection } from '../../utils/helpers';

const Hero = () => {
  const downloadResume = () => {
    // For demo, you can replace with actual resume download
    window.open(personalInfo.resumeUrl, '_blank');
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Available for opportunities
          </div>
          <h1 className="hero-greeting">Hi, I'm 👋</h1>
          <h2 className="hero-name">{personalInfo.name}</h2>
          <h3 className="hero-title">
            <span className="typing-text">{personalInfo.title}</span>
          </h3>
          <p className="hero-subtitle">{personalInfo.subtitle}</p>
          <p className="hero-description">
            {personalInfo.bio[0]}
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollToSection('contact')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Hire Me
            </button>
            <button className="btn btn-secondary" onClick={downloadResume}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download CV
            </button>
            <button className="btn btn-outline" onClick={() => scrollToSection('projects')}>
              View Work
            </button>
          </div>
          <div className="hero-stats">
            {personalInfo.statistics.map((stat, index) => (
              <div className="hero-stat" key={index}>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="hero-social">
            <a href="https://github.com/tewahidohaimanot" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/tewahido-haimanot-252562325" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0  0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://t.me/tewahido_haimanot" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.55-1.11.55l.4-5.6L19.78 6.5c.44-.4-.1-.6-.68-.23L7.74 13.3l-5.43-1.7c-1.18-.37-1.2-1.18.24-1.75L22.5 2.15c.98-.37 1.85.22 1.41 1.64z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-container">
            <div className="animated-border"></div>
            <div className="profile-placeholder">
              {personalInfo.profileImage && (
                <img 
                  src={personalInfo.profileImage} 
                  alt={personalInfo.name}
                  className="profile-img"
                  onError={(e) => {
                    console.error('Failed to load profile image');
                    e.target.style.display = 'none';
                    const svg = e.target.parentElement.querySelector('svg');
                    if (svg) svg.style.display = 'block';
                  }}
                />
              )}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                style={{ display: personalInfo.profileImage ? 'none' : 'block' }}
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse"></div>
      </div>
    </section>
  );
};

export default Hero;
