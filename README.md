# Full-Stack Car Management Application

Application web full-stack de gestion de voitures développée avec Spring Boot, ReactJS, MySQL et Docker.

## Objectif du projet

Ce projet permet de gérer une liste de voitures à travers une application web complète.  
Il met en place une architecture full-stack avec un backend REST, un frontend ReactJS et une base de données MySQL conteneurisée avec Docker.

## Technologies utilisées

### Backend
- Java 17
- Spring Boot 3
- Spring Data JPA
- Hibernate
- Spring Security
- REST API
- Maven

### Frontend
- ReactJS
- React Bootstrap
- Axios
- React Router DOM

### Base de données
- MySQL
- H2 Database pour les premiers tests

### DevOps
- Docker
- Docker Network
- Docker Volumes
- Fichiers d’environnement `.env`

## Fonctionnalités

- Affichage de la liste des voitures
- Ajout d’une voiture
- Modification d’une voiture
- Suppression d’une voiture
- API REST complète
- Interface React responsive
- Notifications Toast
- Communication React ↔ Spring Boot avec Axios
- Base de données MySQL persistante
- Déploiement backend + MySQL avec Docker

## Architecture du projet

```text
Frontend ReactJS
        |
        | Axios
        v
Backend Spring Boot REST API
        |
        | Spring Data JPA / Hibernate
        v
MySQL Database