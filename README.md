# Nutritechagro

Une plateforme pour gérer les demandes d'essai gratuit, les commandes et les comptes clients pour un service TV. Elle comprend un site web client pour parcourir les offres, demander des essais gratuits et passer des commandes, ainsi qu'un tableau de bord administrateur pour gérer les essais, les commandes, les produits et les informations clients.

## Logique du Projet

### Aperçu
Ce projet simplifie la gestion des essais gratuits et des commandes de services TV, offrant une expérience utilisateur fluide pour les clients et les administrateurs.

### Fonctionnalités Clés
- **Site Web Client** :
  - Parcourir les offres TV disponibles
  - Demander des essais gratuits avec des mesures anti-spam (détection IP et empreinte, Google reCAPTCHA)
  - Passer et gérer des commandes
  - Enregistrement et connexion des utilisateurs (Firebase Authentication)
  - Pré-pied de page pour les abonnements à la newsletter

- **Tableau de Bord Administrateur** :
  - Gérer les comptes clients
  - Ajouter, mettre à jour et supprimer des offres TV
  - Voir et gérer les commandes
  - Approuver, rejeter et suivre les demandes d'essai
  - Gestion automatique de l'expiration des essais via Firebase Cloud Functions
  - Contrôle d'accès basé sur les rôles (Firebase Authentication)

- **Localisation** :
  - Support multilingue (Anglais, Français, Espagnol)
  - Emails traduits en fonction de la langue du navigateur

## Logique de Conception

### Considérations sur l'Expérience Utilisateur (UX)
- **Facilité de Navigation** : Des chemins de navigation clairs et simples pour garantir que les utilisateurs puissent facilement trouver et accéder aux fonctionnalités dont ils ont besoin.
- **Design Réactif** : Assurer que la plateforme soit entièrement fonctionnelle sur divers appareils (ordinateurs de bureau, tablettes et téléphones mobiles).
- **Interface Minimaliste** : Réduire l'encombrement pour aider les utilisateurs à se concentrer sur les tâches principales telles que parcourir les offres ou gérer les commandes.

### Défis Techniques et Solutions
- **Évolutivité** : Conçu pour gérer efficacement un nombre croissant d'utilisateurs et d'entrées de données.
- **Sécurité** : Mise en œuvre de mesures anti-spam, d'une authentification sécurisée des utilisateurs et de la protection des données.
- **Gestion des Données Utilisateurs** : Assurer des opérations CRUD fluides et fiables pour la gestion des données et des préférences des utilisateurs.

## Instructions pour Exécuter l'Application

### Prérequis
- Node.js (v21.6.1 or higher)
- Compte Firebase
- Compte Heroku (pour le service backend d'email)
- Git
- Compte Resend

### Instructions d'Installation

1. **Cloner le Répertoire** :
   ```bash
   git clone https://github.com/yourusername/nutritechagro.git
   cd nutritechagro
   ```

2. **Installer les Dépendances** :
   ```bash
   npm install
   ```

3. **Configurer les Variables d'Environnement** :
   Créez un fichier `.env` dans le répertoire racine et ajoutez les variables d'environnement suivantes :
   ```env
   BROWSER=none
   REACT_APP_DEFAULT_WEBSITE_LANGUAGE=en
   REACT_APP_SITE_KEY=6Le_qYIpAAAAAKP_GGVZx5zhMe3yH3g4UYwgD1Uk
   REACT_APP_SUPPORT_PHONE=+1 (929) 230-1875
   REACT_APP_BACKEND_URL=https://slex-backend-bf2d75baa3ef.herokuapp.com
   REACT_APP_SUPPORT_MAIL=contact@nutritechagro.com
   REACT_APP_ENV=production
   REACT_APP_WEBSITE_LINK=https://nutritechagro.com/
   PORT=4002
   SKIP_PREFLIGHT_CHECK=true
   ```

4. **Démarrer l'Application** :
   ```bash
   npm start
   ```

5. **Accéder à l'Application** :
   - Site Web Client : `http://localhost:4002`
   - Tableau de Bord Administrateur : `http://localhost:4002/admin`

## Observations de Conception et de Développement

### Choix de Conception
- **Schéma de Couleurs Cohérent** : Créer une apparence cohésive sur toute la plateforme.
- **Éléments Interactifs** : Utilisation de boutons, formulaires et modales pour améliorer l'interaction utilisateur.

### Améliorations Futures
- **Analyses Améliorées** : Intégrer des fonctionnalités d'analyse et de reporting plus détaillées pour de meilleures insights.
- **Fonctionnalités de Sécurité Avancées** : Mise en œuvre de l'authentification multi-facteurs et de techniques de chiffrement des données améliorées.
