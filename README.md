. Ce projet utilise React 18 pour la construction de l'interface utilisateur, avec des composants Material UI pour une UI cohérente et ergonomique.

---

## 🚀 Installation et Lancement

1️⃣ Cloner le projet
git clone git@github.com:ThibaultBardinetLanglois/weeb_frontend.git
cd weeb_frontend
git checkout feature/sprint_3_integration_maquettes

2️⃣ Installer les dépendances
npm install

3️⃣ Démarrer l'application en mode développement
npm start

---

## 🛠️ Technologies utilisées :

🟢 React 18 (react, react-dom)
React est utilisé comme bibliothèque principale pour la construction de l'interface utilisateur.

🎨 Material UI (@mui/material, @mui/icons-material)
Material UI est utilisé pour un design moderne et réactif. Dans le projet cette librairie permet de générer des champs de formulaires, des loaders, etc.

🔄 React Router DOM (react-router-dom)
Gère la navigation entre les différentes pages de l'application.

🔌 Axios (axios)
Utilisé pour les requêtes HTTP vers l'API backend, permettant une gestion simple des appels réseau.

📏ESLint & Testing Library (@testing-library/react, @testing-library/jest-dom, @testing-library/user-event)

- ESLint garantit un code propre et maintenable.
- La Testing Library permet de tester l'application avec une approche orientée utilisateur.

🎨 Sass (sass, sass-loader)
Utilisé pour des styles plus modulaires et une gestion plus avancée des styles CSS.

📊 Web Vitals (web-vitals)
Permet de mesurer et d'améliorer les performances de l'application.

---

## 📄 Structure du projet

weeb_frontend/
├── public/ # Fichiers statiques
├── src/ # Code source principal
│ ├── components/ # Composants réutilisables
│ ├── pages/ # Pages principales
│ ├── styles/ # Fichiers de styles (Sass/Emotion)
│ ├── utils/ # Fonctions utilitaires
│ ├── hooks/ # Hooks personnalisés
│ ├── App.js # Point d'entrée principal
│ ├── index.js # Bootstrapping de l'application
├── package.json # Configuration des dépendances
├── .eslintrc.json # Configuration ESLint
├── .gitignore # Fichiers à exclure du repository
└── README.md # Documentation

---

## 👥 Contribuer au projet

1. Forker le repository
2. Créer une branche (git checkout -b feature/ma-nouvelle-fonction)
3. Committer vos changements (git commit -m 'Ajout d'une nouvelle fonctionnalité')
4. Pousser la branche (git push origin feature/ma-nouvelle-fonction)
5. Ouvrir une Pull Request

---

## 📞 Contact

Si vous avez des questions, n'hésitez pas à me contacter via GitHub ! 🚀
