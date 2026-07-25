import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const adminName = localStorage.getItem('adminName');
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch stats
      const statsResponse = await fetch('http://localhost:5001/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const statsData = await statsResponse.json();
      if (statsData.success) {
        setStats(statsData.data);
      }

      // Fetch recent contacts
      const contactsResponse = await fetch('http://localhost:5001/api/admin/contacts/recent?limit=10', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const contactsData = await contactsResponse.json();
      if (contactsData.success) {
        setContacts(contactsData.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminEmail');
    onLogout();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Admin Portal</h2>
          <p>Portfolio Dashboard</p>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="icon">📊</span>
            Overview
          </button>
          <button
            className={`nav-item ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            <span className="icon">📧</span>
            Contacts
            {stats && stats.overview.unreadContacts > 0 && (
              <span className="badge">{stats.overview.unreadContacts}</span>
            )}
          </button>
          <button
            className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <span className="icon">🚀</span>
            Projects
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-info">
            <div className="admin-avatar">
              {adminName?.charAt(0).toUpperCase()}
            </div>
            <div className="admin-details">
              <p className="admin-name">{adminName}</p>
              <p className="admin-role">Administrator</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1>Welcome back, {adminName}!</h1>
          <p>Here's what's happening with your portfolio</p>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="dashboard-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📧</div>
                <div className="stat-details">
                  <h3>{stats.overview.totalContacts}</h3>
                  <p>Total Contacts</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🔔</div>
                <div className="stat-details">
                  <h3>{stats.overview.unreadContacts}</h3>
                  <p>Unread Messages</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🚀</div>
                <div className="stat-details">
                  <h3>{stats.overview.totalProjects}</h3>
                  <p>Total Projects</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-details">
                  <h3>{stats.overview.featuredProjects}</h3>
                  <p>Featured Projects</p>
                </div>
              </div>
            </div>

            <div className="recent-section">
              <h2>Recent Contact Messages</h2>
              <div className="contacts-list">
                {contacts.length === 0 ? (
                  <p className="no-data">No contact messages yet</p>
                ) : (
                  contacts.map(contact => (
                    <div key={contact.id} className="contact-item">
                      <div className="contact-header">
                        <h4>{contact.name}</h4>
                        <span className={`status-badge ${contact.status}`}>
                          {contact.status}
                        </span>
                      </div>
                      <p className="contact-email">{contact.email}</p>
                      <p className="contact-subject"><strong>Subject:</strong> {contact.subject}</p>
                      <p className="contact-message">{contact.message}</p>
                      <p className="contact-date">{formatDate(contact.created_at)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="dashboard-content">
            <h2>All Contact Messages</h2>
            <div className="contacts-list">
              {contacts.length === 0 ? (
                <p className="no-data">No contact messages</p>
              ) : (
                contacts.map(contact => (
                  <div key={contact.id} className="contact-item">
                    <div className="contact-header">
                      <h4>{contact.name}</h4>
                      <span className={`status-badge ${contact.status}`}>
                        {contact.status}
                      </span>
                    </div>
                    <p className="contact-email">{contact.email}</p>
                    <p className="contact-subject"><strong>Subject:</strong> {contact.subject}</p>
                    <p className="contact-message">{contact.message}</p>
                    <p className="contact-date">{formatDate(contact.created_at)}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="dashboard-content">
            <h2>Project Management</h2>
            <p className="coming-soon">Project management interface coming soon...</p>
            <p>For now, you can manage projects via the API or directly in the database.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
