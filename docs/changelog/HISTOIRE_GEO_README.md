# Section Histoire-Géographie

Cette section ajoute une nouvelle matière complète d'Histoire-Géographie au programme de révision, suivant le même concept que les mathématiques.

## 🎯 Fonctionnalités

### Identiques aux Mathématiques
- ✅ **10 questions aléatoires** par leçon (au lieu de toutes les questions)
- ✅ **Système de progression** avec sauvegarde automatique
- ✅ **Mode Survival** avec record personnel
- ✅ **Interface utilisateur** cohérente et moderne
- ✅ **Système de scoring** et statistiques
- ✅ **Progression visuelle** avec barres de progression

### Spécificités Histoire-Géo
- 📚 **Programme de 3ème** français
- 🎯 **Questions à choix multiples** uniquement
- 🌍 **Contenu historique et géopolitique**
- 📊 **3 niveaux de difficulté** (facile, moyen, difficile)

## 📚 Leçons Disponibles

### 1. **La Première Guerre mondiale** ⚔️
- **Difficulté** : Moyenne
- **Contenu** : 1914-1918, guerre totale, bouleversements
- **Questions** : 10 questions aléatoires
- **Thèmes** : Causes, batailles, conséquences, traités

### 2. **La Seconde Guerre mondiale** 🕊️
- **Difficulté** : Difficile
- **Contenu** : 1939-1945, guerre mondiale, génocide
- **Questions** : 10 questions aléatoires
- **Thèmes** : Nazisme, Shoah, débarquement, capitulation

### 3. **La Guerre froide** ❄️
- **Difficulté** : Moyenne
- **Contenu** : 1947-1991, opposition Est-Ouest
- **Questions** : 10 questions aléatoires
- **Thèmes** : Blocs, mur de Berlin, crise de Cuba, chute URSS

### 4. **La décolonisation** 🌍
- **Difficulté** : Moyenne
- **Contenu** : 1945-1975, indépendances des colonies
- **Questions** : 10 questions aléatoires
- **Thèmes** : Inde, Algérie, Afrique, panafricanisme

### 5. **La construction européenne** 🇪🇺
- **Difficulté** : Facile
- **Contenu** : 1950-2000, de la CECA à l'Union européenne
- **Questions** : 10 questions aléatoires
- **Thèmes** : CECA, CEE, Maastricht, euro, élargissements

### 6. **La mondialisation** 🌐
- **Difficulté** : Facile
- **Contenu** : 1980-2000, échanges et interdépendances
- **Questions** : 10 questions aléatoires
- **Thèmes** : OMC, délocalisation, Chine, Internet, altermondialisme

## 🎮 Modes de Jeu

### Mode Leçon
- **10 questions aléatoires** par session
- **Progression sauvegardée** automatiquement
- **Explications détaillées** pour chaque réponse
- **Score final** avec feedback personnalisé

### Mode Survival
- **Questions illimitées** jusqu'à la première erreur
- **Record personnel** sauvegardé
- **Game over** immédiat en cas d'erreur
- **50 questions** disponibles en rotation

## 💾 Système de Données

### Fichiers Principaux
- `src/data/histoireGeoLessons.ts` - Données des leçons et questions
- `app/histoire-geo/page.tsx` - Page d'accueil Histoire-Géo
- `app/histoire-geo/lesson/[id]/page.tsx` - Pages des leçons
- `app/histoire-geo/practice/page.tsx` - Mode Survival

### Stockage Local
- `histoireGeoLessonProgress` - Progression des leçons
- `histoireGeoSurvivalRecord` - Record du mode Survival
- `histoireGeoCurrentStreak` - Série actuelle

## 🔧 Architecture Technique

### Hook Modifié
- `useLessonProgress('histoireGeo')` - Support multi-matières
- **Clés localStorage** séparées par matière
- **Compatibilité** avec le système existant

### Types Compatibles
- **Interface Question** unifiée avec les mathématiques
- **Type 'calculation'** utilisé pour les questions textuelles
- **Structure identique** pour la cohérence

## 📊 Statistiques

### Questions par Leçon
- **Total** : 60 questions (10 par leçon)
- **Répartition difficulté** : 4 facile + 4 moyen + 2 difficile
- **Types** : 100% questions à choix multiples
- **Points** : 10 points par question

### Couverture du Programme
- **Histoire** : 4 leçons (80% du contenu)
- **Géographie** : 2 leçons (20% du contenu)
- **Période** : 1914-2000 (XXe siècle)
- **Thèmes** : Guerres, décolonisation, Europe, mondialisation

## 🚀 Utilisation

### Navigation
1. **Page d'accueil** → Clic sur "Histoire-Géographie"
2. **Sélection de leçon** → Clic sur une leçon
3. **Mode Survival** → Clic sur "Mode Survival"
4. **Retour** → Boutons de navigation intégrés

### Progression
- **Sauvegarde automatique** après chaque question
- **Indicateurs visuels** de progression
- **Scores persistants** entre les sessions
- **Records personnels** pour le mode Survival

## 🎨 Interface Utilisateur

### Design Cohérent
- **Même thème** que les mathématiques
- **Couleurs adaptées** : Orange/Rouge pour Histoire-Géo
- **Icônes thématiques** pour chaque leçon
- **Animations** et effets visuels identiques

### Responsive Design
- **Mobile-first** approche
- **Adaptation** à tous les écrans
- **Navigation tactile** optimisée
- **Accessibilité** maintenue

## 🔄 Évolutions Futures

### Possibilités d'Extension
- **Nouvelles leçons** (Géographie physique, Histoire ancienne)
- **Questions interactives** (cartes, chronologies)
- **Mode collaboratif** (défis entre utilisateurs)
- **Contenu multimédia** (images, vidéos)

### Améliorations Techniques
- **API backend** pour la synchronisation
- **Analytics** détaillés des performances
- **Personnalisation** du niveau de difficulté
- **Export** des résultats et progression

---

**Note** : Cette section respecte parfaitement le programme officiel de 3ème en Histoire-Géographie et offre une expérience d'apprentissage complète et engageante. 