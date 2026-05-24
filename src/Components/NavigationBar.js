import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Link to="/" className="navbar-brand">
          <img
            src="https://cdn-icons-png.flaticon.com/512/741/741407.png"
            width="25"
            height="25"
            alt="logo"
          />
        </Link>

        <Nav className="mr-auto">
          <Link to="/add" className="nav-link">Ajouter Voiture</Link>
          <Link to="/list" className="nav-link">Liste Voitures</Link>
        </Nav>
      </Navbar>
    );
  }
}

export default NavigationBar;