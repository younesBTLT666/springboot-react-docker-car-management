import React from 'react';

class Bienvenue extends React.Component {
  render() {
    return (
      <div className="bg-dark text-white p-5 rounded">
        <h1>Bienvenue dans votre Magasin de Voitures</h1>

        <blockquote className="blockquote mb-0">
          <p>Le meilleur de nos voitures est exposé près de chez vous</p>
          <footer className="blockquote-footer">
            Master MIOLA
          </footer>
        </blockquote>
      </div>
    );
  }
}

export default Bienvenue;