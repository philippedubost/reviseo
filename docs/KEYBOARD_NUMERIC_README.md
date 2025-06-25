# Amélioration du Clavier Numérique

## Description

Cette amélioration permet d'afficher automatiquement le clavier numérique sur les appareils mobiles lors de la saisie de réponses pour les questions de type "input" et "calculation".

## Fonctionnalités

### Attributs HTML ajoutés

- `inputMode="decimal"` : Force l'affichage du clavier numérique avec virgule/point décimal
- `pattern="[0-9,.]*"` : Autorise les chiffres, virgules et points
- `autoComplete="off"` : Désactive l'auto-complétion
- `autoCorrect="off"` : Désactive la correction automatique
- `autoCapitalize="off"` : Désactive la capitalisation automatique
- `spellCheck="false"` : Désactive la vérification orthographique

### Types de questions concernés

Cette amélioration s'applique aux questions de type :
- `input` : Questions de saisie manuelle
- `calculation` : Questions de calcul

### Exemples de questions

- Calculs mathématiques : "12 + 15 = ___"
- Conversions : "3,5 kg = ___ g"
- Pourcentages : "10% de 50 = ___"
- Géométrie : "L'aire d'un carré de côté 5 cm est ___ cm²"
- Statistiques : "La moyenne de 4 et 6 est ___"

## Compatibilité

- ✅ iOS Safari
- ✅ Android Chrome
- ✅ Android Firefox
- ✅ Samsung Internet
- ✅ Autres navigateurs mobiles modernes

## Implémentation

La modification a été appliquée dans le composant `QuestionDisplay.tsx` et s'applique automatiquement à toutes les pages utilisant ce composant :

- Pages de leçons (`/app/[level]/[subject]/lesson/[id]/page.tsx`)
- Pages de pratique (`/app/[level]/[subject]/practice/page.tsx`)
- Composants génériques (`src/components/GenericLessonPage.tsx`)

## Avantages

1. **Expérience utilisateur améliorée** : Plus besoin de basculer manuellement vers le clavier numérique
2. **Saisie plus rapide** : Accès direct aux chiffres et symboles mathématiques
3. **Réduction des erreurs** : Moins de risque de saisir des lettres au lieu de chiffres
4. **Cohérence** : Comportement uniforme sur tous les appareils mobiles

## Validation

Le système de validation existant continue de fonctionner normalement et accepte :
- Nombres entiers : "27", "1000"
- Nombres décimaux : "3.5", "16,5"
- Fractions : "1/2", "3/4"
- Pourcentages : "25%"

## Notes techniques

- L'attribut `inputMode="decimal"` est supporté par tous les navigateurs mobiles modernes
- Le pattern `[0-9,.]*` permet la saisie de chiffres, virgules et points
- Les attributs d'auto-complétion sont désactivés pour éviter les interférences
- La validation côté serveur reste inchangée et gère la normalisation des réponses 