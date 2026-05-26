import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavigationBar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-custom">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

        {/* Brand */}
        <Link to="/" className="navbar-brand-custom">
          <div className="navbar-brand-icon">🚗</div>
          <span>CarManagement</span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Link to="/add" className={`nav-link-custom ${isActive('/add') ? 'active' : ''}`}>
            <span>➕</span> Ajouter
          </Link>
          <Link to="/list" className={`nav-link-custom ${isActive('/list') ? 'active' : ''}`}>
            <span>📋</span> Liste
          </Link>
          <Link to="/assistant" className={`nav-link-custom ${isActive('/assistant') ? 'active' : ''}`}>
            <span>🤖</span> Assistant IA
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default NavigationBar;
