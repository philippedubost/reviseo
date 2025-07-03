# Amélioration du Menu Flag - Suggestions Rapides

## 🎯 Objectif
Ajouter une option bouton plus rapide "Proposer en choix multiple" dans le menu flag pour les questions en saisie manuelle, car c'est la demande qui revient le plus souvent.

## ✅ Fonctionnalités Implémentées

### 1. **Suggestions Rapides dans le Menu Flag**
- Ajout de boutons de suggestions prédéfinies dans la popup de signalement
- **"Proposer en choix multiple"** mis en évidence avec un style distinctif (bleu) pour les questions de type `input` ou `calculation`
- Autres suggestions communes : "Erreur dans la question", "Réponse incorrecte", "Question trop difficile", etc.

### 2. **Détection Intelligente du Type de Question**
- Le bouton "Proposer en choix multiple" n'apparaît que pour les questions en saisie manuelle (`input` et `calculation`)
- Les questions de type `multiple-choice` affichent uniquement les suggestions communes

### 3. **Interface Utilisateur Améliorée**
- Animation fluide des boutons de suggestions avec `framer-motion`
- Sélection visuelle des suggestions choisies
- Possibilité de personnaliser la raison après avoir sélectionné une suggestion
- Popup redimensionnée pour accueillir les nouvelles options

## 🔧 Modifications Techniques

### Composants Modifiés :
1. **`FlagButton.tsx`** : 
   - Ajout du paramètre `questionType`
   - Implémentation des suggestions rapides
   - Logique conditionnelle pour afficher "Proposer en choix multiple"

2. **`ResponseOverlay.tsx`** :
   - Ajout du paramètre `questionType` à l'interface
   - Transmission du type de question au `FlagButton`

3. **Pages de questions** :
   - `GenericLessonPage.tsx`
   - `GenericPracticePage.tsx` 
   - `app/[level]/[subject]/practice/page.tsx`
   - `app/[level]/[subject]/lesson/[id]/page.tsx`
   - Transmission du `currentQuestion.type` vers `ResponseOverlay`

## 🎨 Design et Expérience Utilisateur

### Style Visuel :
- **Bouton principal** : "Proposer en choix multiple" en bleu avec bordure accentuée
- **Boutons secondaires** : Suggestions communes en gris foncé
- **État sélectionné** : Ring bleu autour du bouton choisi
- **Animations** : Entrée échelonnée des boutons pour un effet visuel agréable

### Workflow Utilisateur :
1. L'utilisateur clique sur le bouton flag 🚩
2. Une popup s'ouvre avec les suggestions rapides
3. Pour les questions en saisie manuelle, "Proposer en choix multiple" apparaît en premier
4. L'utilisateur peut cliquer sur une suggestion ou taper manuellement
5. La suggestion sélectionnée remplit automatiquement le champ de texte

## 🚀 Avantages

1. **Gain de temps** : Plus besoin de taper manuellement "proposer en choix multiple"
2. **Standardisation** : Messages de signalement plus cohérents
3. **Facilité d'utilisation** : Interface intuitive avec suggestions contextuelle
4. **Flexibilité** : Possibilité de modifier la suggestion après sélection

## 📊 Impact

Cette amélioration répond directement au besoin exprimé d'avoir un accès plus rapide à l'option "proposer en choix multiple", qui est la demande de signalement la plus fréquente pour les questions en saisie manuelle.