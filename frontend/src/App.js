import React from 'react';
import './index.css';

import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Footer from './Components/Footer';
import Voiture from './Components/Voiture';
import VoitureListe from './Components/VoitureListe';
import AssistantVoiture from './Components/AssistantVoiture';

function VoitureWrapper() {
  const { id } = useParams();
  return <Voiture voitureId={id} />;
}

function App() {
  return (
    <Router>
      <NavigationBar />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <Routes>
          <Route path="/"          element={<Bienvenue />} />
          <Route path="/add"       element={<Voiture />} />
          <Route path="/edit/:id"  element={<VoitureWrapper />} />
          <Route path="/list"      element={<VoitureListe />} />
          <Route path="/assistant" element={<AssistantVoiture />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
