import React from 'react';
import './App.css';

import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Footer from './Components/Footer';
import Voiture from './Components/Voiture';
import VoitureListe from './Components/VoitureListe';

function VoitureWrapper() {
  const { id } = useParams();
  return <Voiture voitureId={id} />;
}

function App() {
  const marginTop = {
    marginTop: "20px"
  };

  return (
    <Router>
      <NavigationBar />

      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <Routes>
              <Route path="/" element={<Bienvenue />} />
              <Route path="/add" element={<Voiture />} />
              <Route path="/edit/:id" element={<VoitureWrapper />} />
              <Route path="/list" element={<VoitureListe />} />
            </Routes>
          </Col>
        </Row>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;