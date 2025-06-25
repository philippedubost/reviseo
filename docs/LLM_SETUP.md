# Configuration LLM pour Reviseo

## 🚀 Génération de Questions de Qualité

### 1. Configuration OpenAI API

Pour générer de vraies questions de qualité, vous devez configurer l'API OpenAI :

1. **Créez un compte OpenAI** : https://platform.openai.com/
2. **Générez une clé API** dans les paramètres de votre compte
3. **Créez un fichier `.env.local`** à la racine du projet :

```bash
# Configuration OpenAI API
OPENAI_API_KEY=sk-your-actual-api-key-here

# Configuration de l'application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 2. Modèles LLM Recommandés

L'application utilise différents modèles selon le contexte :

- **GPT-4** : Génération de questions standard (équilibré qualité/coût)
- **GPT-4 Turbo** : Questions de très haute qualité (plus cher mais meilleur)
- **GPT-3.5 Turbo** : Alternative économique (qualité correcte)

### 3. Améliorations de Qualité

#### Prompts Spécialisés par Matière
- **Maths** : Formules LaTeX, calculs progressifs
- **Histoire** : Dates, personnages, événements
- **Géographie** : Pays, capitales, phénomènes
- **Français** : Grammaire, littérature, analyse
- **SVT** : Biologie, écologie, sciences
- **Physique** : Lois physiques, calculs

#### Validation Automatique
- Longueur des questions (20-200 caractères)
- Qualité des explications (50-300 caractères)
- Cohérence des réponses
- Adaptation au niveau scolaire

#### Progression Pédagogique
- Questions 1-3 : Niveau facile (concepts de base)
- Questions 4-7 : Niveau intermédiaire (application)
- Questions 8-10 : Niveau avancé (analyse/synthèse)

### 4. Types de Questions

#### Répartition Recommandée
- **40% QCM** : 4 options, une seule correcte
- **30% Calculs** : Exercices avec LaTeX
- **30% Ouvertes** : Questions courtes

#### Exemples de Qualité

**Maths (3ème) :**
```
Question: Résous l'équation 2x + 5 = 13
Type: calculation
Réponse: x = 4
Explication: Pour résoudre 2x + 5 = 13, on soustrait 5 des deux côtés : 2x = 8, puis on divise par 2 : x = 4
LaTeX: 2x + 5 = 13 \Rightarrow 2x = 8 \Rightarrow x = 4
```

**Histoire (3ème) :**
```
Question: En quelle année a eu lieu la prise de la Bastille?
Type: multiple-choice
Options: [1789, 1790, 1788, 1791]
Réponse: 1789
Explication: La prise de la Bastille le 14 juillet 1789 marque le début de la Révolution française
```

### 5. Coûts Estimés

#### GPT-4 (Recommandé)
- **Analyse de prompt** : ~$0.01 par requête
- **Génération 10 questions** : ~$0.10-0.20 par leçon
- **Coût mensuel** : ~$5-10 pour 50 leçons

#### GPT-4 Turbo (Haute Qualité)
- **Génération 10 questions** : ~$0.15-0.30 par leçon
- **Coût mensuel** : ~$8-15 pour 50 leçons

### 6. Optimisations

#### Paramètres de Génération
```typescript
// Configuration optimale
{
  temperature: 0.7,        // Créativité équilibrée
  maxTokens: 4000,         // Suffisant pour 10 questions
  topP: 0.9,              // Diversité contrôlée
  frequencyPenalty: 0.1,   // Évite la répétition
  presencePenalty: 0.1     // Encourage la variété
}
```

#### Gestion d'Erreurs
- **Régénération automatique** si qualité insuffisante
- **Fallback vers mock** en cas d'erreur API
- **Validation de structure** JSON
- **Logs détaillés** pour debugging

### 7. Développement vs Production

#### Mode Développement
- Utilise des données mock si pas d'API key
- Logs détaillés pour debugging
- Validation moins stricte

#### Mode Production
- Validation stricte de qualité
- Gestion d'erreurs robuste
- Monitoring des coûts API
- Cache des leçons générées

### 8. Prochaines Améliorations

1. **Cache intelligent** : Réutiliser les leçons similaires
2. **Feedback utilisateur** : Améliorer les prompts
3. **Modèles spécialisés** : Fine-tuning pour l'éducation
4. **Validation humaine** : Interface de modération
5. **Analytics** : Mesurer la qualité des questions

### 9. Dépannage

#### Erreurs Communes
- **"API key invalide"** : Vérifiez votre clé dans `.env.local`
- **"Rate limit"** : Attendez ou upgradez votre plan OpenAI
- **"JSON invalide"** : Le modèle a généré un format incorrect
- **"Questions de mauvaise qualité"** : Régénération automatique

#### Logs Utiles
```bash
# Vérifiez les logs dans la console
🚀 Génération de leçon en cours...
🤖 Appel API OpenAI...
✅ Réponse reçue, parsing JSON...
📊 Qualité des questions: 8/10 valides
✅ Leçon générée avec succès!
```

### 10. Support

Pour toute question sur la configuration LLM :
1. Vérifiez ce guide
2. Consultez les logs de la console
3. Testez avec une API key valide
4. Contactez l'équipe de développement 