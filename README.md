# Reviseo - Plateforme de Révision Interactive

Une application web moderne pour la révision et la préparation aux examens, spécialement conçue pour le brevet des collèges.

## 🎯 Fonctionnalités

- **📚 Matières Multiples** : Mathématiques, Français, Sciences, Histoire-Géographie
- **🎓 Leçons Structurées** : Contenu progressif et adapté au niveau
- **🎲 Questions Aléatoires** : Évite la mémorisation par cœur
- **📊 Suivi de Progression** : Statistiques détaillées et objectifs
- **🔄 Interface Intuitive** : Navigation fluide et responsive

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone [url-du-repo]
cd reviseo

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
reviseo/
├── app/                    # Pages Next.js (App Router)
├── src/
│   ├── components/         # Composants React réutilisables
│   ├── data/              # Données des leçons
│   ├── hooks/             # Hooks personnalisés
│   └── utils/             # Utilitaires
├── public/                # Assets statiques
└── docs/                  # Documentation technique
    ├── CHANGELOG.md       # Historique des versions
    └── changelog/         # Détails des améliorations
```

## 🛠️ Technologies

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **État** : React Hooks
- **Déploiement** : Vercel

## 📚 Documentation

- **[Changelog complet](./docs/CHANGELOG.md)** - Historique des versions et améliorations
- **[Documentation technique](./docs/)** - Détails d'implémentation
- **[Améliorations détaillées](./docs/changelog/)** - Documentation spécifique

## 🎨 Fonctionnalités Clés

### Système de Questions
- Mélange aléatoire des options (algorithme Fisher-Yates)
- Questions non répétitives pour un apprentissage optimal
- Validation intelligente des réponses

### Navigation Améliorée
- Bouton de retour contextuel
- Historique de navigation
- Interface responsive

### Suivi de Progression
- Barres de progression visuelles
- Statistiques par matière
- Système de récompenses

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Reviseo** - Rendez l'apprentissage plus efficace et engageant ! 🚀
