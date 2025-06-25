# Application LLM - Génération de Leçons Personnalisées

## Vue d'ensemble

Cette application permet de générer des leçons éducatives personnalisées en utilisant l'intelligence artificielle (LLM). Les utilisateurs peuvent créer des quiz adaptés à leur niveau scolaire avec des questions générées automatiquement.

## Fonctionnalités Principales

### 1. Génération de Leçons IA
- **Génération rapide** : Création de quiz à partir d'un simple prompt
- **Génération avancée** : Personnalisation complète des paramètres
- **Écran d'attente** : Interface animée pendant la génération
- **10 questions personnalisées** : Contenu adapté au niveau scolaire

### 2. Interface Utilisateur
- **Design moderne** : Interface sombre avec animations fluides
- **Responsive** : Adapté aux mobiles et tablettes
- **Animations** : Transitions et effets visuels engageants
- **Accessibilité** : Navigation clavier et focus visible

### 3. Personnalisation
- **6 matières** : Mathématiques, Histoire, Géographie, Français, SVT, Physique-Chimie
- **7 niveaux** : De la 6ème à la Terminale
- **3 difficultés** : Facile, Intermédiaire, Expert
- **5-15 questions** : Nombre de questions ajustable

## Architecture Technique

### Structure des Fichiers

```
src/
├── services/
│   └── llm-service.ts          # Service LLM principal
├── components/
│   ├── LessonGenerationScreen.tsx  # Écran d'attente
│   └── ...                     # Composants existants
app/
├── generate-lesson/
│   └── page.tsx               # Page de génération
├── llm-lesson/
│   └── [id]/
│       └── page.tsx           # Page de leçon générée
└── page.tsx                   # Page d'accueil mise à jour
```

### Services

#### LLMService (`src/services/llm-service.ts`)

```typescript
interface GenerationRequest {
  prompt: string;
  subject: string;
  level: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
}

interface LLMLesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: LLMQuestion[];
  subject: string;
  level: string;
  estimatedTime: number;
}
```

**Méthodes principales :**
- `generateLesson(request)` : Génération via API OpenAI
- `generateMockLesson(request)` : Génération de test pour développement

### Composants

#### LessonGenerationScreen
- **Fonction** : Écran d'attente animé pendant la génération
- **Animations** : Étapes de progression, particules flottantes
- **Informations** : Affichage des paramètres de génération

#### GenerateLessonPage
- **Fonction** : Interface de configuration des paramètres
- **Fonctionnalités** :
  - Sélection de matière avec icônes
  - Choix du niveau scolaire
  - Configuration de la difficulté
  - Ajustement du nombre de questions
  - Récupération du prompt depuis l'URL

#### LLMLessonPage
- **Fonction** : Affichage et interaction avec la leçon générée
- **Fonctionnalités** :
  - Navigation entre les questions
  - Validation des réponses
  - Affichage des explications
  - Calcul du score
  - Écran de fin avec statistiques

## Flux Utilisateur

### 1. Génération Rapide
```
Accueil → Saisie prompt → Génération → Leçon
```

### 2. Génération Avancée
```
Accueil → Configuration → Génération → Leçon
```

### 3. Interaction avec la Leçon
```
Leçon → Questions → Réponses → Validation → Progression → Fin
```

## Configuration

### Variables d'Environnement

```env
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

### Mode Développement

En mode développement, l'application utilise `generateMockLesson()` pour éviter les appels API coûteux :

```typescript
const lesson = process.env.NODE_ENV === 'development' 
  ? llmService.generateMockLesson(request)
  : await llmService.generateLesson(request);
```

## Prompts LLM

### Prompt Système

Le service LLM utilise un prompt système structuré qui :
- Définit le rôle (professeur expert)
- Spécifie le contexte (niveau, matière, difficulté)
- Impose des règles strictes (format JSON, vocabulaire adapté)
- Guide la création de questions variées

### Prompt Utilisateur

Le prompt utilisateur contient :
- Le sujet de la leçon
- Les spécifications techniques
- Les exigences pédagogiques

## Stockage

### LocalStorage

Les leçons générées sont stockées localement :

```typescript
localStorage.setItem(`llm_lesson_${lesson.id}`, JSON.stringify(lesson));
```

### Structure des Données

```typescript
{
  id: "llm_1234567890_abc123",
  title: "Leçon sur les équations",
  description: "Leçon personnalisée...",
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      difficulty: 2,
      question: "Quelle est la solution de x² + 5x + 6 = 0 ?",
      options: ["x = -2 et x = -3", "x = 2 et x = 3", "x = -1 et x = -6"],
      correctAnswer: "x = -2 et x = -3",
      explanation: "En utilisant la formule quadratique...",
      points: 10,
      latex: "x^2 + 5x + 6 = 0"
    }
  ]
}
```

## Animations et Effets Visuels

### Framer Motion

L'application utilise Framer Motion pour :
- **Transitions de page** : Animations d'entrée/sortie
- **Interactions** : Hover, tap, scale
- **États de chargement** : Spinners, progressions
- **Feedback** : Confettis, badges animés

### CSS Animations

Animations CSS personnalisées :
- **jumpIn/jumpOut** : Animations de modal
- **bounceLoop** : Animations d'icônes
- **badgeFlash** : Feedback de réponses
- **popupFloat** : Notifications flottantes

## Gestion d'Erreurs

### Erreurs LLM

```typescript
try {
  const lesson = await llmService.generateLesson(request);
} catch (error) {
  console.error('Erreur lors de la génération:', error);
  alert('Erreur lors de la génération de la leçon. Veuillez réessayer.');
  setIsGenerating(false);
}
```

### Fallback

En cas d'échec de l'API :
- Utilisation du mode mock en développement
- Messages d'erreur informatifs
- Possibilité de réessayer

## Performance

### Optimisations

- **Lazy loading** : Chargement des composants à la demande
- **Memoization** : Cache des leçons générées
- **Animations optimisées** : Utilisation de `transform` et `opacity`
- **Bundle splitting** : Séparation des chunks

### Métriques

- **Temps de génération** : 5-15 secondes selon la complexité
- **Taille des leçons** : ~2-5KB par leçon
- **Responsivité** : < 100ms pour les interactions

## Tests

### Tests de Développement

```bash
# Test du service LLM
npm run test:llm

# Test des composants
npm run test:components

# Test d'intégration
npm run test:integration
```

### Scénarios de Test

1. **Génération rapide** : Prompt simple → Leçon valide
2. **Génération avancée** : Tous paramètres → Leçon personnalisée
3. **Gestion d'erreurs** : API indisponible → Fallback
4. **Navigation** : Flux complet utilisateur

## Déploiement

### Prérequis

- Node.js 18+
- OpenAI API Key
- Vercel (recommandé)

### Variables d'Environnement

```env
# Production
NEXT_PUBLIC_OPENAI_API_KEY=sk-...

# Développement
NODE_ENV=development
```

### Build

```bash
npm run build
npm run start
```

## Maintenance

### Mise à Jour des Prompts

Les prompts LLM peuvent être ajustés dans `llm-service.ts` :
- Amélioration de la qualité des questions
- Adaptation aux nouveaux niveaux
- Optimisation des performances

### Ajout de Nouvelles Matières

1. Ajouter la matière dans `getSubjectInfo()`
2. Mettre à jour les icônes et couleurs
3. Tester la génération

### Monitoring

- **Logs** : Erreurs de génération
- **Métriques** : Temps de réponse, taux de succès
- **Feedback** : Qualité des questions générées

## Roadmap

### Fonctionnalités Futures

- [ ] **Mode collaboratif** : Partage de leçons
- [ ] **Historique** : Sauvegarde des leçons créées
- [ ] **Export** : PDF, Word, LaTeX
- [ ] **Analytics** : Statistiques d'utilisation
- [ ] **IA avancée** : Modèles spécialisés par matière

### Améliorations Techniques

- [ ] **Cache intelligent** : Réutilisation des leçons similaires
- [ ] **Génération progressive** : Questions une par une
- [ ] **Mode hors ligne** : Fonctionnement sans API
- [ ] **PWA** : Application web progressive

## Support

### Documentation

- [Guide utilisateur](./USER_GUIDE.md)
- [API Reference](./API_REFERENCE.md)
- [Troubleshooting](./TROUBLESHOOTING.md)

### Contact

Pour toute question ou suggestion :
- Issues GitHub
- Email : support@reviseo.com
- Discord : [Serveur communautaire]

---

**Version** : 1.0.0  
**Dernière mise à jour** : Décembre 2024  
**Auteur** : Équipe Reviseo 