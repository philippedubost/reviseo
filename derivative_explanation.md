# Qu'est-ce que la dérivée d'une fonction en un point?

## Définition intuitive

La **dérivée** d'une fonction en un point représente la **pente** de la tangente à la courbe de la fonction en ce point. Elle mesure la **vitesse de changement instantanée** de la fonction à cet endroit.

## Définition mathématique

Pour une fonction \(f(x)\) et un point \(a\), la dérivée en \(a\) est notée \(f'(a)\) et est définie par:

\[f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}\]

Cette limite, si elle existe, donne la **pente de la tangente** à la courbe au point \((a, f(a))\).

## Bonnes pratiques LaTeX

**Important**: Dans les expressions mathématiques, les mots doivent être formatés comme du texte:

### Exemples de formatage correct:
- ✅ Fonctions: \(\sin(x)\), \(\cos(x)\), \(\ln(x)\), \(\exp(x)\)
- ✅ Limites: \(\lim_{h \to 0}\), \(\lim_{x \to \infty}\)
- ✅ Conditions: \(\text{si } x > 0\), \(\text{pour tout } x \in \mathbb{R}\)
- ✅ Unités: \(5\,\text{m/s}\), \(10\,\text{kg}\)

### Exemples incorrects:
- ❌ \(lim_{h \to 0}\) (traite "lim" comme le produit l×i×m)
- ❌ \(sin(x)\) (traite "sin" comme s×i×n)
- ❌ \(si x > 0\) (traite "si" comme s×i)

### Commandes utiles:
- `\text{}` pour du texte normal
- `\mathrm{}` pour du texte en romain
- `\sin, \cos, \ln, \exp, \lim` pour les fonctions standard

## Interprétation géométrique

- **Géométriquement**: La dérivée \(f'(a)\) est la pente de la droite tangente à la courbe \(y = f(x)\) au point \((a, f(a))\)
- **Physiquement**: Si \(f(x)\) représente la position d'un objet au temps \(x\), alors \(f'(a)\) représente la vitesse instantanée à l'instant \(a\)

## Exemples concrets

### Exemple 1: Fonction polynomiale
Pour \(f(x) = x^2\) au point \(a = 3\):
- \(f'(3) = 2 \cdot 3 = 6\)
- La tangente au point \((3, 9)\) a une pente de 6

### Exemple 2: Fonction linéaire
Pour \(f(x) = 2x + 1\):
- \(f'(a) = 2\) pour tout point \(a\)
- La pente est constante car c'est une droite

## Conditions d'existence

Une fonction a une dérivée en un point \(a\) si et seulement si:
1. La fonction est **continue** en \(a\)
2. La **limite** \(\lim_{h \to 0} \frac{f(a+h) - f(a)}{h}\) existe

## Applications pratiques

- **Optimisation**: Trouver les maxima et minima (où \(f'(x) = 0\))
- **Physique**: Calcul de vitesse, accélération
- **Économie**: Analyse de taux de variation des coûts, revenus
- **Ingénierie**: Analyse de systèmes dynamiques

La dérivée est donc un outil fondamental pour comprendre le **comportement local** d'une fonction et ses **variations**.