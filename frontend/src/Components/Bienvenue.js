import React from 'react';
import { Link } from 'react-router-dom';

class Bienvenue extends React.Component {
  render() {
    return (
      <div className="page-wrapper">

        {/* Hero */}
        <div className="welcome-hero">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚗</div>
          <h1>Bienvenue dans CarManagement</h1>
          <p>Gérez votre flotte de voitures simplement et efficacement</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/add" className="btn-primary-custom" style={{ textDecoration: 'none' }}>
              ➕ Ajouter une voiture
            </Link>
            <Link to="/list" className="btn-secondary-custom" style={{ textDecoration: 'none' }}>
              📋 Voir la liste
            </Link>
            <Link to="/assistant" className="btn-secondary-custom" style={{ textDecoration: 'none' }}>
              🤖 Assistant IA
            </Link>
          </div>
        </div>

        {/* Feature cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div className="stat-card">
            <div className="stat-icon stat-icon-blue">➕</div>
            <div>
              <div className="stat-value" style={{ fontSize: '1rem', fontWeight: 600 }}>Ajouter</div>
              <div className="stat-label">Enregistrez de nouvelles voitures</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-green">📋</div>
            <div>
              <div className="stat-value" style={{ fontSize: '1rem', fontWeight: 600 }}>Gérer</div>
              <div className="stat-label">Consultez, modifiez, supprimez</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-yellow">🤖</div>
            <div>
              <div className="stat-value" style={{ fontSize: '1rem', fontWeight: 600 }}>Assistant IA</div>
              <div className="stat-label">Recherche intelligente par chat</div>
            </div>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '2rem' }}>
          Master MIOLA — Application de gestion de voitures
        </p>
      </div>
    );
  }
}

export default Bienvenue;
