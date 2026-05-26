<div align="center">

# 🚗 CarManagement

**Application web full-stack de gestion de flotte automobile**

[![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=openjdk)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.5-brightgreen?style=flat-square&logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Minikube-326CE5?style=flat-square&logo=kubernetes&logoColor=white)](https://minikube.sigs.k8s.io/)

*Développé dans le cadre du Master MIOLA*

</div>

---

## Présentation

CarManagement est une application web permettant de gérer une flotte de voitures. Elle offre une interface moderne pour effectuer les opérations CRUD, ainsi qu'un **assistant IA intégré** capable de répondre à des questions en langage naturel sur les données de la flotte.

### Fonctionnalités principales

| Fonctionnalité | Description |
|---|---|
| Ajouter une voiture | Formulaire avec validation visuelle en temps réel et aperçu live |
| Liste des voitures | Tableau avec recherche instantanée, badges colorés, statistiques |
| Modifier / Supprimer | Actions directes depuis la liste avec confirmation |
| Assistant IA | Chatbot qui interroge l'API REST en langage naturel |

---

## Aperçu

### Page d'accueil
![Page d'accueil](Captures/Capture%20d'écran%202026-05-25%20232029.png)

### Liste des voitures
![Liste des voitures](Captures/Capture%20d'écran%202026-05-25%20232215.png)

### Ajouter une voiture
![Ajouter une voiture](Captures/Capture%20d'écran%202026-05-26%20013553.png)

### Assistant IA
![Assistant IA](Captures/Capture%20d'écran%202026-05-26%20013617.png)

### Modifier une voiture
![Modifier une voiture](Captures/Capture%20d'écran%202026-05-26%20013642.png)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Utilisateur                          │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   Frontend — React :3000                    │
│                                                             │
│   ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│   │ Liste       │  │ Formulaire   │  │  Assistant IA    │  │
│   │ Voitures    │  │ Ajout/Edit   │  │  (chatbot NLP)   │  │
│   └─────────────┘  └──────────────┘  └──────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │ REST API (Axios)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              Backend — Spring Boot :8080                    │
│                                                             │
│   ┌──────────────────┐     ┌──────────────────────────┐    │
│   │  VoitureController│     │  Spring Data REST        │    │
│   │  /voitures        │     │  /api/voitures           │    │
│   └──────────────────┘     └──────────────────────────┘    │
│                                                             │
│   ┌──────────────────┐     ┌──────────────────────────┐    │
│   │  Spring Security │     │  Actuator /actuator/**   │    │
│   └──────────────────┘     └────────────┬─────────────┘    │
└────────────────────────────┬────────────┼──────────────────┘
                             │            │ /actuator/prometheus
                             │ JPA        ▼
                             │   ┌─────────────────┐
                             │   │   Prometheus    │
                             │   │    :9090        │
                             │   └────────┬────────┘
                             │            │
                             │            ▼
                             │   ┌─────────────────┐
                             │   │    Grafana      │
                             │   │    :3000        │
                             │   └─────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    MySQL :3306                              │
│                    base : car_db                            │
│                                                             │
│   ┌──────────────────┐     ┌──────────────────────────┐    │
│   │    voiture       │     │      proprietaire        │    │
│   └──────────────────┘     └──────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

> En production (Minikube), un **Ingress Nginx** route le trafic :
> `car-management.local/` → Frontend · `car-management.local/voitures` → Backend

---



<details>
<summary><strong>Backend</strong></summary>

| Technologie | Version | Rôle |
|---|---|---|
| Java | 17 | Langage principal |
| Spring Boot | 3.3.5 | Framework applicatif |
| Spring Data JPA | — | Accès base de données (ORM) |
| Spring Data REST | — | Exposition automatique des endpoints REST |
| Spring Security | — | Sécurisation des routes |
| MySQL | 8 | Base de données relationnelle |
| Lombok | 1.18.34 | Réduction du code boilerplate |
| Spring Actuator | — | Métriques et health checks |
| Micrometer Prometheus | — | Export des métriques |
| SpringDoc OpenAPI | 2.6.0 | Documentation Swagger UI |

</details>

<details>
<summary><strong>Frontend</strong></summary>

| Technologie | Version | Rôle |
|---|---|---|
| React | 19 | Framework UI |
| React Router | 7 | Navigation SPA |
| Axios | 1 | Appels HTTP vers le backend |
| Bootstrap | 5.3 | Composants UI |
| Nginx | alpine | Serveur web en production |

</details>

<details>
<summary><strong>Infrastructure</strong></summary>

| Technologie | Rôle |
|---|---|
| Docker | Conteneurisation des services |
| Kubernetes (Minikube) | Orchestration des conteneurs |
| Ingress Nginx | Routage HTTP |
| Prometheus | Collecte des métriques |
| Grafana | Visualisation des métriques |

</details>

---

## Structure du projet

```
CarManagement/
├── backend/                  # API Spring Boot
│   ├── src/
│   │   └── main/java/org/cours/
│   │       ├── modele/       # Entités JPA + Repositories
│   │       ├── web/          # Controllers REST
│   │       └── security/     # Configuration Spring Security
│   └── Dockerfile
├── frontend/                 # Application React
│   ├── src/
│   │   ├── Components/       # Composants React
│   │   └── config.js         # URL du backend
│   └── Dockerfile
├── k8s/                      # Manifests Kubernetes
│   ├── backend/
│   ├── frontend/
│   ├── ingress/
│   └── monitoring/           # Prometheus + Grafana
└── README.md
```

---

## Démarrage rapide

### Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installé et démarré
- Java 17+ et Maven *(pour builder le backend)*

---

### Lancement avec Docker

#### 1. Créer le réseau Docker

```bash
docker network create car-network
```

#### 2. Lancer MySQL

```bash
docker run -d \
  --name mysql \
  --network car-network \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=car_db \
  -p 3306:3306 \
  mysql:8
```

> Attendre ~10 secondes que MySQL soit prêt avant de continuer.

#### 3. Builder et lancer le Backend

```bash
cd backend

# Compiler le projet
./mvnw package -DskipTests

# Builder l'image
docker build -t car-management-backend .

# Lancer le conteneur
docker run -d \
  --name backend \
  --network car-network \
  -e MYSQL_HOST=mysql \
  -e MYSQL_PORT=3306 \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=root \
  -p 8080:8080 \
  car-management-backend
```

#### 4. Builder et lancer le Frontend

```bash
cd frontend

# Builder l'image (inclut npm install + build React)
docker build -t car-management-frontend .

# Lancer le conteneur
docker run -d \
  --name frontend \
  --network car-network \
  -p 3000:80 \
  car-management-frontend
```

#### 5. Accéder à l'application

| Service | URL |
|---|---|
| Application | http://localhost:3000 |
| API REST | http://localhost:8080/voitures |
| Swagger UI | http://localhost:8080/swagger-ui/index.html |
| Health Check | http://localhost:8080/actuator/health |

---

### Lancement en développement local

<details>
<summary>Voir les instructions</summary>

**Prérequis :** Java 17+, Maven, Node.js 20+, MySQL sur le port 3306 avec une base `car_db`

**Backend**
```bash
cd backend
./mvnw spring-boot:run
```

**Frontend**
```bash
cd frontend
npm install
npm start
```

L'application est accessible sur `http://localhost:3000`.  
L'URL du backend est configurable dans `frontend/src/config.js`.

</details>

---

### Déploiement Kubernetes (Minikube)

<details>
<summary>Voir les instructions</summary>

```bash
# Namespace et application
kubectl apply -f k8s/backend/backend.yaml
kubectl apply -f k8s/frontend/frontend.yaml
kubectl apply -f k8s/ingress/ingress.yaml

# Monitoring
kubectl apply -f k8s/monitoring/namespace.yaml
kubectl apply -f k8s/monitoring/prometheus.yaml
kubectl apply -f k8s/monitoring/grafana.yaml
```

Ajouter dans `/etc/hosts` (ou `C:\Windows\System32\drivers\etc\hosts`) :
```
127.0.0.1    car-management.local
```

Puis lancer le tunnel :
```bash
minikube tunnel
```

L'application est accessible sur `http://car-management.local`.

</details>

---

## API Reference

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/voitures` | Récupérer toutes les voitures |
| `GET` | `/voitures/{id}` | Récupérer une voiture par ID |
| `POST` | `/voitures` | Ajouter une voiture |
| `PUT` | `/voitures/{id}` | Modifier une voiture |
| `DELETE` | `/voitures/{id}` | Supprimer une voiture |

---

<div align="center">

*Master MIOLA — Gestion de voitures*

</div>
