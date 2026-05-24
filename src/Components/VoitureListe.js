import React, { Component } from 'react';
import { Card, Table, Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import MyToast from './MyToast';
import { Link } from 'react-router-dom';

export default class VoitureListe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      voitures: [],
      show: false
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8080/voitures")
      .then(response => {
        this.setState({
          voitures: response.data
        });
      });
  }

  deleteVoiture = (voitureId) => {
    axios.delete("http://localhost:8080/voitures/" + voitureId)
      .then(response => {

        this.setState({
          show: true,
          voitures: this.state.voitures.filter(
            voiture => voiture.id !== voitureId
          )
        });

        setTimeout(() => this.setState({ show: false }), 3000);
      });
  };

  render() {
    return (
      <>
        {
          this.state.show ?
            <MyToast
              title="Deleted"
              message="Voiture supprimée avec succès"
              type="danger"
            />
            : null
        }

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>Liste Voitures</Card.Header>

          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Marque</th>
                  <th>Modele</th>
                  <th>Couleur</th>
                  <th>Annee</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {
                  this.state.voitures.length === 0 ?
                    <tr align="center">
                      <td colSpan="6">Aucune Voiture Disponible</td>
                    </tr>
                    :
                    this.state.voitures.map((voiture) => (
                      <tr key={voiture.id}>
                        <td>{voiture.marque}</td>
                        <td>{voiture.modele}</td>
                        <td>{voiture.couleur}</td>
                        <td>{voiture.annee}</td>
                        <td>{voiture.prix}</td>
                        <td>
                          <ButtonGroup>
                            <Link
                              to={"/edit/" + voiture.id}
                              className="btn btn-sm btn-outline-primary"
                            >
                              Modifier
                            </Link>

                            {' '}

                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={this.deleteVoiture.bind(this, voiture.id)}
                            >
                              Supprimer
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </>
    );
  }
}