# 🚀 Guide de Démarrage Rapide - LLM Reviseo

## 1. Configuration de l'API OpenAI

### Étape 1: Obtenir une clé API
1. Allez sur [OpenAI Platform](https://platform.openai.com/)
2. Créez un compte ou connectez-vous
3. Dans "API Keys", cliquez sur "Create new secret key"
4. Copiez la clé (commence par `sk-`)

### Étape 2: Configurer l'environnement
Créez un fichier `.env.local` à la racine du projet :

```bash
# Configuration OpenAI API
OPENAI_API_KEY=sk-votre-cle-api-ici

# Configuration de l'application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## 2. Tester la Génération

### Démarrage de l'application
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3001`

### Test rapide
1. Allez sur la page d'accueil
2. Tapez un prompt comme "Les équations du second degré"
3. Cliquez sur "Créer mon quizz"
4. Vérifiez que les paramètres sont détectés automatiquement
5. Cliquez sur "Générer 10 questions personnalisées"

## 3. Vérification de la Qualité

### Indicateurs visuels
- ✅ **Indicateur de qualité** : Affiche le pourcentage de questions valides
- 📊 **Statistiques** : Temps de génération, modèle utilisé
- ⚠️ **Messages d'erreur** : Si la qualité est insuffisante

### Logs de la console
Ouvrez les outils de développement (F12) et regardez la console :

```bash
🚀 Génération de leçon en cours...
🤖 Appel API OpenAI...
✅ Réponse reçue, parsing JSON...
📊 Qualité des questions: 8/10 valides
✅ Leçon générée avec succès!
```

## 4. Amélioration de la Qualité

### Si les questions sont de mauvaise qualité :

1. **Vérifiez votre clé API** :
   ```bash
   # Dans .env.local
   OPENAI_API_KEY=sk-votre-vraie-cle-ici
   ```

2. **Utilisez des prompts plus spécifiques** :
   - ❌ "Maths"
   - ✅ "Les équations du second degré en 3ème"
   - ✅ "La Révolution française de 1789"
   - ✅ "Les volcans et séismes en 5ème"

3. **Ajustez les paramètres** :
   - **Difficulté** : Commencez par "Moyen"
   - **Niveau** : Correspondant à votre prompt
   - **Matière** : Sélectionnez la bonne discipline

### Régénération automatique
Si moins de 70% des questions sont valides, le système régénère automatiquement.

## 5. Exemples de Prompts de Qualité

### Maths
- "Les équations du second degré en 3ème"
- "Le théorème de Pythagore en 4ème"
- "Les fonctions linéaires en 2nde"

### Histoire
- "La Révolution française de 1789"
- "La Première Guerre mondiale"
- "La décolonisation après 1945"

### SVT
- "Les volcans et séismes en 5ème"
- "La photosynthèse en 6ème"
- "L'évolution des espèces en 3ème"

### Français
- "Les figures de style en 4ème"
- "La grammaire française en 6ème"
- "L'analyse de texte en 2nde"

## 6. Dépannage

### Erreur "API key invalide"
```bash
# Vérifiez votre .env.local
OPENAI_API_KEY=sk-votre-vraie-cle-ici
```

### Erreur "Rate limit"
- Attendez quelques minutes
- Vérifiez votre quota OpenAI
- Considérez un upgrade de votre plan

### Questions de mauvaise qualité
- Utilisez des prompts plus spécifiques
- Vérifiez que la matière et le niveau correspondent
- Essayez une difficulté différente

### L'application ne démarre pas
```bash
# Réinstallez les dépendances
npm install

# Redémarrez
npm run dev
```

## 7. Coûts Estimés

### GPT-4 (Recommandé)
- **1 leçon de 10 questions** : ~$0.10-0.20
- **50 leçons par mois** : ~$5-10
- **100 leçons par mois** : ~$10-20

### GPT-4 Turbo (Haute Qualité)
- **1 leçon de 10 questions** : ~$0.15-0.30
- **50 leçons par mois** : ~$8-15
- **100 leçons par mois** : ~$15-30

## 8. Prochaines Étapes

1. **Testez différents prompts** pour voir la variété
2. **Ajustez les paramètres** selon vos besoins
3. **Consultez les logs** pour optimiser
4. **Partagez vos retours** pour améliorer le système

## 9. Support

Si vous rencontrez des problèmes :
1. Vérifiez ce guide
2. Consultez les logs de la console
3. Testez avec une API key valide
4. Contactez l'équipe de développement

---

**🎯 Objectif** : Générer des questions éducatives de haute qualité adaptées au niveau scolaire français ! 