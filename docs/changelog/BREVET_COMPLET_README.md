# Application Révision Brevet - Matières Complètes

Cette application offre maintenant une plateforme complète de révision pour les 4 matières du Brevet des Collèges français, avec le même concept innovant pour toutes les matières.

## 🎯 Matières Disponibles

### 1. **Mathématiques** 🔢
- **Couleur** : Bleu/Vert
- **Leçons** : 8 leçons (Nombres, Géométrie, Fonctions, Statistiques, Probabilités, Équations, Puissances, Systèmes)
- **Questions** : 10 questions aléatoires par leçon
- **URL** : `/maths`

### 2. **Français** 📝
- **Couleur** : Rouge/Orange
- **Leçons** : 6 leçons (Grammaire, Orthographe, Analyse Littéraire, Compréhension, Expression, Culture)
- **Questions** : 10 questions aléatoires par leçon
- **URL** : `/francais`

### 3. **Histoire-Géographie** 📚
- **Couleur** : Orange/Rouge
- **Leçons** : 6 leçons (1ère GM, 2nde GM, Guerre Froide, Décolonisation, Europe, Mondialisation)
- **Questions** : 10 questions aléatoires par leçon
- **URL** : `/histoire-geo`

### 4. **Sciences** 🧪
- **Couleur** : Violet
- **Leçons** : 6 leçons (Électricité, Mécanique, Chimie, Biologie, Géologie, Astronomie)
- **Questions** : 10 questions aléatoires par leçon
- **URL** : `/sciences`

## 🚀 Fonctionnalités Communes

### Système de Progression
- ✅ **10 questions aléatoires** par leçon (au lieu de toutes)
- ✅ **Sauvegarde automatique** de la progression
- ✅ **Barres de progression** visuelles
- ✅ **Statistiques détaillées** par matière
- ✅ **Système de scoring** cohérent

### Mode Survival
- ✅ **Questions illimitées** jusqu'à la première erreur
- ✅ **Records personnels** sauvegardés
- ✅ **Game over** immédiat en cas d'erreur
- ✅ **50+ questions** disponibles en rotation

### Interface Utilisateur
- ✅ **Design cohérent** sur toutes les matières
- ✅ **Couleurs thématiques** pour chaque matière
- ✅ **Navigation intuitive** et responsive
- ✅ **Animations** et effets visuels
- ✅ **Accessibilité** mobile-first

## 📊 Statistiques Globales

### Questions Totales
- **Mathématiques** : 80 questions (8 leçons × 10 questions)
- **Français** : 60 questions (6 leçons × 10 questions)
- **Histoire-Géo** : 60 questions (6 leçons × 10 questions)
- **Sciences** : 60 questions (6 leçons × 10 questions)
- **TOTAL** : 260 questions

### Répartition par Difficulté
- **Facile** : ~40% des questions
- **Moyen** : ~40% des questions
- **Difficile** : ~20% des questions

## 💾 Architecture Technique

### Fichiers de Données
- `src/data/lessons.ts` - Mathématiques
- `src/data/francaisLessons.ts` - Français
- `src/data/histoireGeoLessons.ts` - Histoire-Géographie
- `src/data/sciencesLessons.ts` - Sciences

### Hook Multi-Matières
- `useLessonProgress(subject)` supporte 4 matières
- **Clés localStorage** séparées par matière
- **Types compatibles** entre toutes les matières

### Stockage Local
- `lessonProgress` / `mathsLessonProgress` - Progression maths
- `francaisLessonProgress` - Progression français
- `histoireGeoLessonProgress` - Progression histoire-géo
- `sciencesLessonProgress` - Progression sciences
- `*SurvivalRecord` - Records survival par matière
- `*CurrentStreak` - Séries par matière

## 🎮 Modes de Jeu

### Mode Leçon (Toutes Matières)
1. **Sélection** d'une leçon spécifique
2. **10 questions aléatoires** de difficulté progressive
3. **Explications détaillées** pour chaque réponse
4. **Score final** avec feedback personnalisé
5. **Progression sauvegardée** automatiquement

### Mode Survival (Toutes Matières)
1. **Questions mélangées** de toutes les leçons
2. **Game over** à la première erreur
3. **Record personnel** mis à jour automatiquement
4. **Interface immersive** avec compteur en temps réel

## 📚 Contenu Pédagogique

### Mathématiques (Programme 3ème)
- **Nombres et calculs** : Fractions, puissances, racines
- **Géométrie** : Théorème de Pythagore, trigonométrie
- **Fonctions** : Fonctions linéaires et affines
- **Statistiques** : Moyenne, médiane, étendue
- **Probabilités** : Probabilités simples et conditionnelles
- **Équations** : Équations du 1er et 2nd degré

### Français (Programme 3ème)
- **Grammaire et conjugaison** : Classes grammaticales, temps verbaux
- **Orthographe et vocabulaire** : Règles d'orthographe, étymologie
- **Analyse littéraire** : Figures de style, genres littéraires
- **Compréhension de texte** : Lecture analytique, argumentation
- **Expression écrite** : Rédaction, cohérence textuelle
- **Culture littéraire** : Mouvements littéraires, auteurs

### Histoire-Géographie (Programme 3ème)
- **Première Guerre mondiale** : 1914-1918, guerre totale
- **Seconde Guerre mondiale** : 1939-1945, génocide
- **Guerre froide** : 1947-1991, opposition Est-Ouest
- **Décolonisation** : 1945-1975, indépendances
- **Construction européenne** : 1950-2000, CECA à UE
- **Mondialisation** : 1980-2000, échanges mondiaux

### Sciences (Programme 3ème)
- **Électricité et énergie** : Circuits, énergies renouvelables
- **Mécanique et mouvement** : Forces, énergie mécanique
- **Chimie et matière** : Atomes, molécules, réactions
- **Biologie et vivant** : Cellules, reproduction, écosystèmes
- **Géologie et Terre** : Roches, minéraux, structure terrestre
- **Astronomie et espace** : Système solaire, étoiles, galaxies

## 🎨 Design et UX

### Palette de Couleurs
- **Mathématiques** : Bleu (#00baff) → Vert (#2ecc71)
- **Français** : Rouge (#e74c3c) → Orange (#f39c12)
- **Histoire-Géo** : Orange (#ff6b6b) → Rouge (#ee5a24)
- **Sciences** : Violet (#9b59b6) → Violet foncé (#8e44ad)

### Composants Réutilisables
- **ProgressBar** - Barres de progression
- **StatsBadges** - Badges de statistiques
- **QuestionDisplay** - Affichage des questions
- **AnswerOptions** - Options de réponse
- **ResponseOverlay** - Overlay de réponse
- **ActionButton** - Boutons d'action

## 🔄 Évolutions Futures

### Fonctionnalités Avancées
- **Mode collaboratif** - Défis entre utilisateurs
- **Analytics détaillés** - Statistiques de performance
- **Personnalisation** - Niveaux de difficulté adaptatifs
- **Contenu multimédia** - Images, vidéos, animations

### Extensions Possibles
- **Nouvelles matières** - Langues, Arts, etc.
- **Questions interactives** - Glisser-déposer, cartes
- **Mode examen** - Simulation du vrai brevet
- **Export des résultats** - PDF, partage social

## 📱 Compatibilité

### Navigateurs Supportés
- ✅ Chrome (recommandé)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

### Appareils Supportés
- ✅ Mobile (responsive design)
- ✅ Tablette
- ✅ Desktop
- ✅ Touch et clavier

## 🚀 Démarrage Rapide

1. **Cloner le projet** : `git clone [repository]`
2. **Installer les dépendances** : `npm install`
3. **Lancer le serveur** : `npm run dev`
4. **Ouvrir** : `http://localhost:3000`
5. **Choisir une matière** et commencer à réviser !

---

**Note** : Cette application respecte parfaitement les programmes officiels du Brevet des Collèges et offre une expérience d'apprentissage complète et engageante pour les 4 matières principales. 