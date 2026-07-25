import React, { useState } from 'react';
import './Projects.css';
import { projectsData, projectCategories } from '../../data/projectsData';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  return (
    <section className="projects" id="projects">
      <div className="section-header">
        <h2>Featured Projects</h2>
        <p className="section-subtitle">
          Showcase of real-world applications demonstrating expertise in modern web development
        </p>
      </div>
      <div className="project-filters">
        {projectCategories.map((cat) => (
          <button 
            key={cat.value}
            className={`filter-btn ${filter === cat.value ? 'active' : ''}`}
            onClick={() => setFilter(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div className={`project-card ${project.featured ? 'featured' : ''}`} key={project.id}>
            {project.featured && <span className="featured-badge">Featured</span>}
            <div className="project-image" data-color={project.imageColor}>
              <span className="project-emoji">{project.image}</span>
              <div className="project-overlay">
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link" title="View Code">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link" title="Live Demo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="project-content">
              <div className="project-header">
                <h3>{project.title}</h3>
                <span className="project-year">{project.year}</span>
              </div>
              <p>{project.description}</p>
              {project.metrics && (
                <div className="project-metrics">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div className="metric" key={key}>
                      <span className="metric-value">{value}</span>
                      <span className="metric-label">{key}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="project-technologies">
                {project.technologies.map((tech, index) => (
                  <span className="tech-tag" key={index}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
