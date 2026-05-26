import React, { Component } from 'react';
import axios from 'axios';
import MyToast from './MyToast';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config';

export default class VoitureListe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      voitures: [],
      filtered: [],
      search: '',
      show: false,
      toastType: 'danger',
      toastMsg: ''
    };
  }

  componentDidMount() {
    axios.get(`${API_BASE_URL}/voitures`)
      .then(response => {
        this.setState({ voitures: response.data, filtered: response.data });
      });
  }

  handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    this.setState({
      search: e.target.value,
      filtered: this.state.voitures.filter(v =>
        v.marque.toLowerCase().includes(q) ||
        v.modele.toLowerCase().includes(q) ||
        v.couleur.toLowerCase().includes(q) ||
        String(v.annee).includes(q) ||
        String(v.prix).includes(q)
      )
    });
  };

  deleteVoiture = (voitureId) => {
    if (!window.confirm('Supprimer cette voiture ?')) return;
    axios.delete(`${API_BASE_URL}/voitures/` + voitureId)
      .then(() => {
        const updated = this.state.voitures.filter(v => v.id !== voitureId);
        const q = this.state.search.toLowerCase();
        this.setState({
          show: true,
          toastType: 'danger',
          toastMsg: 'Voiture supprimée avec succès',
          voitures: updated,
          filtered: updated.filter(v =>
            v.marque.toLowerCase().includes(q) ||
            v.modele.toLowerCase().includes(q) ||
            v.couleur.toLowerCase().includes(q) ||
            String(v.annee).includes(q) ||
            String(v.prix).includes(q)
          )
        });
        setTimeout(() => this.setState({ show: false }), 3000);
      });
  };

  // Couleur du badge selon la couleur de la voiture
  getCouleurStyle = (couleur) => {
    const map = {
      rouge: { bg: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'rgba(239,68,68,0.3)' },
      bleu:  { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: 'rgba(59,130,246,0.3)' },
      blanc: { bg: 'rgba(241,245,249,0.15)', color: '#e2e8f0', border: 'rgba(241,245,249,0.3)' },
      noir:  { bg: 'rgba(15,23,42,0.5)',    color: '#94a3b8', border: 'rgba(148,163,184,0.3)' },
      gris:  { bg: 'rgba(100,116,139,0.15)', color: '#94a3b8', border: 'rgba(100,116,139,0.3)' },
      vert:  { bg: 'rgba(34,197,94,0.15)',  color: '#4ade80', border: 'rgba(34,197,94,0.3)' },
      jaune: { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
    };
    const key = Object.keys(map).find(k => couleur.toLowerCase().includes(k));
    return key ? map[key] : { bg: 'rgba(99,102,241,0.15)', color: '#818cf8', border: 'rgba(99,102,241,0.3)' };
  };

  render() {
    const { filtered, search, show, toastType, toastMsg } = this.state;
    const totalVoitures = this.state.voitures.length;
    const avgPrix = totalVoitures > 0
      ? Math.round(this.state.voitures.reduce((s, v) => s + v.prix, 0) / totalVoitures)
      : 0;

    return (
      <div className="page-wrapper">
        {show && <MyToast title={toastType === 'success' ? 'Succès' : 'Supprimé'} message={toastMsg} type={toastType} />}

        {/* Header */}
        <div className="page-header">
          <h2 className="page-title">📋 Liste des Voitures</h2>
          <p className="page-subtitle">{totalVoitures} voiture{totalVoitures > 1 ? 's' : ''} enregistrée{totalVoitures > 1 ? 's' : ''}</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="stat-card">
            <div className="stat-icon stat-icon-blue">🚗</div>
            <div>
              <div className="stat-value">{totalVoitures}</div>
              <div className="stat-label">Total voitures</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-green">💰</div>
            <div>
              <div className="stat-value" style={{ fontSize: '1.1rem' }}>{avgPrix.toLocaleString()}</div>
              <div className="stat-label">Prix moyen (DH)</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-yellow">🔍</div>
            <div>
              <div className="stat-value">{filtered.length}</div>
              <div className="stat-label">Résultats filtrés</div>
            </div>
          </div>
        </div>

        {/* Table card */}
        <div className="card-custom">
          <div className="card-header-custom">
            <h3 className="card-header-title">🚘 Inventaire</h3>
            {/* Search */}
            <div className="search-wrapper" style={{ width: '260px' }}>
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Rechercher..."
                value={search}
                onChange={this.handleSearch}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🚗</div>
                <div className="empty-state-title">
                  {search ? 'Aucun résultat trouvé' : 'Aucune voiture enregistrée'}
                </div>
                <div className="empty-state-text">
                  {search
                    ? `Aucune voiture ne correspond à "${search}"`
                    : 'Commencez par ajouter votre première voiture'}
                </div>
                {!search && (
                  <Link to="/add" className="btn-primary-custom" style={{ textDecoration: 'none', marginTop: '1rem', display: 'inline-flex' }}>
                    ➕ Ajouter une voiture
                  </Link>
                )}
              </div>
            ) : (
              <table className="table-custom">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Marque</th>
                    <th>Modèle</th>
                    <th>Couleur</th>
                    <th>Année</th>
                    <th>Prix</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((voiture, idx) => {
                    const couleurStyle = this.getCouleurStyle(voiture.couleur);
                    return (
                      <tr key={voiture.id}>
                        <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{idx + 1}</td>
                        <td style={{ fontWeight: 600 }}>{voiture.marque}</td>
                        <td style={{ color: 'var(--text-secondary)' }}>{voiture.modele}</td>
                        <td>
                          <span className="badge-custom" style={{
                            background: couleurStyle.bg,
                            color: couleurStyle.color,
                            border: `1px solid ${couleurStyle.border}`
                          }}>
                            ● {voiture.couleur}
                          </span>
                        </td>
                        <td>
                          <span className="badge-custom badge-year">📅 {voiture.annee}</span>
                        </td>
                        <td>
                          <span className="badge-custom badge-price">
                            {voiture.prix.toLocaleString()} DH
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <Link to={`/edit/${voiture.id}`} className="btn-edit-custom">
                              ✏️ Modifier
                            </Link>
                            <button
                              className="btn-danger-custom"
                              onClick={() => this.deleteVoiture(voiture.id)}
                            >
                              🗑️ Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  }
}
