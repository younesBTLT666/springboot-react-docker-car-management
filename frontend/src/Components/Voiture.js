import React, { Component } from 'react';
import axios from 'axios';
import MyToast from './MyToast';
import API_BASE_URL from '../config';

export default class Voiture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      marque: '',
      modele: '',
      couleur: '',
      annee: '',
      prix: '',
      show: false,
      toastType: 'success',
      toastMsg: '',
      touched: {},
      submitting: false
    };
    this.voitureChange = this.voitureChange.bind(this);
    this.submitVoiture = this.submitVoiture.bind(this);
    this.resetVoiture = this.resetVoiture.bind(this);
  }

  componentDidMount() {
    const voitureId = this.props.voitureId;
    if (voitureId) {
      axios.get(`${API_BASE_URL}/voitures/` + voitureId)
        .then(response => {
          if (response.data != null) {
            this.setState({
              id: response.data.id,
              marque: response.data.marque,
              modele: response.data.modele,
              couleur: response.data.couleur,
              annee: response.data.annee,
              prix: response.data.prix
            });
          }
        });
    }
  }

  voitureChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      touched: { ...this.state.touched, [event.target.name]: true }
    });
  }

  isFieldValid(name) {
    const val = this.state[name];
    if (!this.state.touched[name]) return null;
    return val !== '' && val !== null && val !== undefined;
  }

  getFieldClass(name) {
    const valid = this.isFieldValid(name);
    if (valid === null) return 'form-control-custom';
    return `form-control-custom ${valid ? 'is-valid' : 'is-invalid'}`;
  }

  submitVoiture(event) {
    event.preventDefault();
    this.setState({ submitting: true });

    const voiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      annee: this.state.annee,
      prix: this.state.prix
    };

    const voitureId = this.props.voitureId;

    if (voitureId) {
      axios.put(`${API_BASE_URL}/voitures/` + voitureId, voiture)
        .then(response => {
          if (response.data != null) {
            this.setState({ show: true, toastType: 'success', toastMsg: 'Voiture modifiée avec succès', submitting: false });
            setTimeout(() => this.setState({ show: false }), 3000);
          }
        })
        .catch(() => {
          this.setState({ show: true, toastType: 'danger', toastMsg: 'Erreur lors de la modification', submitting: false });
          setTimeout(() => this.setState({ show: false }), 3000);
        });
    } else {
      axios.post(`${API_BASE_URL}/voitures`, voiture)
        .then(response => {
          if (response.data != null) {
            this.setState({
              show: true, toastType: 'success', toastMsg: 'Voiture ajoutée avec succès', submitting: false,
              marque: '', modele: '', couleur: '', annee: '', prix: '', touched: {}
            });
            setTimeout(() => this.setState({ show: false }), 3000);
          }
        })
        .catch(() => {
          this.setState({ show: true, toastType: 'danger', toastMsg: "Erreur lors de l'ajout", submitting: false });
          setTimeout(() => this.setState({ show: false }), 3000);
        });
    }
  }

  resetVoiture() {
    this.setState({ marque: '', modele: '', couleur: '', annee: '', prix: '', touched: {} });
  }

  render() {
    const isEdit = !!this.props.voitureId;
    const { marque, modele, couleur, annee, prix, submitting } = this.state;
    const isFormValid = marque && modele && couleur && annee && prix;

    return (
      <div className="page-wrapper">
        {this.state.show && (
          <MyToast
            title={this.state.toastType === 'success' ? 'Succès' : 'Erreur'}
            message={this.state.toastMsg}
            type={this.state.toastType}
          />
        )}

        {/* Header */}
        <div className="page-header">
          <h2 className="page-title">
            {isEdit ? '✏️ Modifier la Voiture' : '➕ Ajouter une Voiture'}
          </h2>
          <p className="page-subtitle">
            {isEdit ? 'Mettez à jour les informations de la voiture' : 'Remplissez le formulaire pour enregistrer une nouvelle voiture'}
          </p>
        </div>

        <div style={{ maxWidth: '700px' }}>
          <div className="card-custom">
            <div className="card-header-custom">
              <h3 className="card-header-title">
                🚗 {isEdit ? 'Informations de la voiture' : 'Nouvelle voiture'}
              </h3>
              {isEdit && (
                <span className="badge-custom badge-year">ID #{this.state.id}</span>
              )}
            </div>

            <form onSubmit={this.submitVoiture} onReset={this.resetVoiture}>
              <div className="card-body-custom">

                {/* Row 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label className="form-label-custom">Marque *</label>
                    <input
                      type="text"
                      name="marque"
                      value={marque}
                      onChange={this.voitureChange}
                      className={this.getFieldClass('marque')}
                      placeholder="ex: Toyota, BMW..."
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label-custom">Modèle *</label>
                    <input
                      type="text"
                      name="modele"
                      value={modele}
                      onChange={this.voitureChange}
                      className={this.getFieldClass('modele')}
                      placeholder="ex: Corolla, X5..."
                      required
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label-custom">Couleur *</label>
                  <input
                    type="text"
                    name="couleur"
                    value={couleur}
                    onChange={this.voitureChange}
                    className={this.getFieldClass('couleur')}
                    placeholder="ex: Rouge, Bleu, Noir..."
                    required
                  />
                </div>

                {/* Row 3 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="form-label-custom">Année *</label>
                    <input
                      type="number"
                      name="annee"
                      value={annee}
                      onChange={this.voitureChange}
                      className={this.getFieldClass('annee')}
                      placeholder="ex: 2022"
                      min="1900"
                      max="2030"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label-custom">Prix (DH) *</label>
                    <input
                      type="number"
                      name="prix"
                      value={prix}
                      onChange={this.voitureChange}
                      className={this.getFieldClass('prix')}
                      placeholder="ex: 150000"
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* Preview */}
                {(marque || modele) && (
                  <div style={{
                    marginTop: '1.5rem',
                    padding: '1rem',
                    background: 'rgba(99,102,241,0.08)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Aperçu</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      🚗 {marque} {modele}
                      {couleur && <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}> — {couleur}</span>}
                      {annee && <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>, {annee}</span>}
                      {prix && <span style={{ color: '#4ade80', fontWeight: 600 }}> · {Number(prix).toLocaleString()} DH</span>}
                    </div>
                  </div>
                )}

              </div>

              {/* Footer */}
              <div style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px'
              }}>
                <button type="reset" className="btn-secondary-custom">
                  🔄 Réinitialiser
                </button>
                <button
                  type="submit"
                  className="btn-primary-custom"
                  disabled={!isFormValid || submitting}
                >
                  {submitting
                    ? '⏳ En cours...'
                    : isEdit ? '✅ Mettre à jour' : '➕ Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
