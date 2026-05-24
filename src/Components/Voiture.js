import React, { Component } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import MyToast from './MyToast';

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
      show: false
    };

    this.voitureChange = this.voitureChange.bind(this);
    this.submitVoiture = this.submitVoiture.bind(this);
    this.resetVoiture = this.resetVoiture.bind(this);
  }

  componentDidMount() {
    const voitureId = this.props.voitureId;

    if (voitureId) {
      axios.get("http://localhost:8080/voitures/" + voitureId)
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
      [event.target.name]: event.target.value
    });
  }

  submitVoiture(event) {
    event.preventDefault();

    const voiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      annee: this.state.annee,
      prix: this.state.prix
    };

    const voitureId = this.props.voitureId;

    if (voitureId) {
      axios.put("http://localhost:8080/voitures/" + voitureId, voiture)
        .then(response => {
          if (response.data != null) {
            this.setState({ show: true });
            setTimeout(() => this.setState({ show: false }), 3000);
          }
        });
    } else {
      axios.post("http://localhost:8080/voitures", voiture)
        .then(response => {
          if (response.data != null) {
            this.setState({ show: true });

            setTimeout(() => this.setState({ show: false }), 3000);

            this.setState({
              marque: '',
              modele: '',
              couleur: '',
              annee: '',
              prix: ''
            });
          }
        });
    }
  }

  resetVoiture() {
    this.setState({
      marque: '',
      modele: '',
      couleur: '',
      annee: '',
      prix: ''
    });
  }

  render() {
    const isEdit = this.props.voitureId;

    return (
      <>
        {
          this.state.show ?
            <MyToast
              title="Success"
              message={isEdit ? "Voiture modifiée avec succès" : "Voiture ajoutée avec succès"}
              type="success"
            />
            : null
        }

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            {isEdit ? "Modifier Voiture" : "Ajouter Voiture"}
          </Card.Header>

          <Form
            onSubmit={this.submitVoiture}
            onReset={this.resetVoiture}
            id="VoitureFormId"
          >
            <Card.Body>
              <Row>
                <Form.Group as={Col} controlId="formGridMarque">
                  <Form.Label>Marque</Form.Label>
                  <Form.Control
                    required
                    name="marque"
                    value={this.state.marque}
                    onChange={this.voitureChange}
                    type="text"
                    className="bg-dark text-white"
                    placeholder="Entrez Marque Voiture"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridModele">
                  <Form.Label>Modele</Form.Label>
                  <Form.Control
                    required
                    name="modele"
                    value={this.state.modele}
                    onChange={this.voitureChange}
                    type="text"
                    className="bg-dark text-white"
                    placeholder="Entrez Modele Voiture"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCouleur">
                  <Form.Label>Couleur</Form.Label>
                  <Form.Control
                    required
                    name="couleur"
                    value={this.state.couleur}
                    onChange={this.voitureChange}
                    type="text"
                    className="bg-dark text-white"
                    placeholder="Entrez Couleur Voiture"
                  />
                </Form.Group>
              </Row>

              <Row className="mt-3">
                <Form.Group as={Col} controlId="formGridAnnee">
                  <Form.Label>Annee</Form.Label>
                  <Form.Control
                    required
                    name="annee"
                    value={this.state.annee}
                    onChange={this.voitureChange}
                    type="number"
                    className="bg-dark text-white"
                    placeholder="Entrez Annee"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPrix">
                  <Form.Label>Prix</Form.Label>
                  <Form.Control
                    required
                    name="prix"
                    value={this.state.prix}
                    onChange={this.voitureChange}
                    type="number"
                    className="bg-dark text-white"
                    placeholder="Entrez Prix"
                  />
                </Form.Group>
              </Row>
            </Card.Body>

            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="info" type="reset" className="mr-2">
                Reset
              </Button>

              <Button size="sm" variant="success" type="submit">
                {isEdit ? "Update" : "Submit"}
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </>
    );
  }
}