# Research Findings and Question Replacement Strategy

## Overview of Placeholder Questions Found

Based on my analysis of the database, I found numerous placeholder questions across multiple files with the pattern:
- `"Question de [subject] niveau [level] - Question [number]"`

### Locations of Placeholder Questions:
- `new_levels.json` (main file)
- `data/levels/seconde.json`
- `public/data/levels/seconde.json`
- `src/data/simplified-data.json`
- `public/data/index.json`
- `data/index.json`

### Subjects with Placeholder Questions:
1. **Mathématiques (Seconde):**
   - Équations
   - Inéquations
   - Géométrie analytique
   - Statistiques
   - Probabilités
   - Trigonométrie
   - Vecteurs

2. **Français (Seconde):**
   - Genres littéraires
   - Registres littéraires
   - Versification
   - Argumentation
   - Analyse de texte
   - Expression écrite

## Research-Based Question Content

### 1. Inéquations (Niveau Seconde)

Based on research from XM1Math and other educational sources:

**Question 1:**
```json
{
  "question": "Quel est l'ensemble solution de l'inéquation 3x - 15 < 0 ?",
  "options": [
    "]5 ; +∞[",
    "]-∞ ; 5[",
    "]-∞ ; -5[",
    "[5 ; +∞["
  ],
  "correctAnswer": "]-∞ ; 5[",
  "explanation": "3x - 15 < 0 ⟺ 3x < 15 ⟺ x < 5. L'ensemble solution est donc ]-∞ ; 5[."
}
```

**Question 2:**
```json
{
  "question": "Quel est l'ensemble solution de l'inéquation -2x + 4 ≥ 0 ?",
  "options": [
    "[-2 ; +∞[",
    "[2 ; +∞[",
    "]-∞ ; 2]",
    "]-∞ ; -2]"
  ],
  "correctAnswer": "]-∞ ; 2]",
  "explanation": "-2x + 4 ≥ 0 ⟺ 4 ≥ 2x ⟺ 2 ≥ x. L'ensemble solution est donc ]-∞ ; 2]."
}
```

### 2. Équations (Niveau Seconde)

**Question 1:**
```json
{
  "question": "L'ensemble des solutions de l'équation (2x+1)(x-3) = 0 est :",
  "options": [
    "{-1/2 ; 3}",
    "{1/2 ; -3}",
    "∅",
    "{-1/2 ; -3}"
  ],
  "correctAnswer": "{-1/2 ; 3}",
  "explanation": "Un produit est nul si et seulement si l'un de ses facteurs est nul. 2x+1 = 0 donne x = -1/2 et x-3 = 0 donne x = 3."
}
```

**Question 2:**
```json
{
  "question": "L'équation x² + 4 = 0 :",
  "options": [
    "n'admet aucune solution",
    "admet une unique solution",
    "admet deux solutions",
    "admet une infinité de solutions"
  ],
  "correctAnswer": "n'admet aucune solution",
  "explanation": "x² + 4 = 0 ⟺ x² = -4. Comme un carré est toujours positif, cette équation n'a pas de solution dans ℝ."
}
```

### 3. Géométrie Analytique (Niveau Seconde)

**Question 1:**
```json
{
  "question": "Comment définit-on un repère orthonormal du plan ?",
  "options": [
    "Grâce à trois points O, I et J, non alignés",
    "Grâce à trois points O, I et J, tels que OIJ est rectangle en O",
    "Grâce à trois points O, I et J, tels que OIJ est rectangle et isocèle en O, avec OI=OJ=1 unité",
    "Grâce à trois points O, I et J, tels que OIJ est isocèle en O"
  ],
  "correctAnswer": "Grâce à trois points O, I et J, tels que OIJ est rectangle et isocèle en O, avec OI=OJ=1 unité",
  "explanation": "Un repère orthonormal nécessite que les axes soient perpendiculaires (orthogonal) et de même longueur unitaire (normal)."
}
```

### 4. Trigonométrie (Niveau Seconde)

**Question 1:**
```json
{
  "question": "Quelle est la mesure en radians d'un angle de 60° ?",
  "options": [
    "π/6",
    "π/3",
    "π/4",
    "π/2"
  ],
  "correctAnswer": "π/3",
  "explanation": "Pour convertir des degrés en radians : 60° × π/180° = π/3 radians."
}
```

**Question 2:**
```json
{
  "question": "Combien valent cos(π/4) et sin(π/4) ?",
  "options": [
    "cos(π/4) = √3/2 et sin(π/4) = 1/2",
    "cos(π/4) = 1/2 et sin(π/4) = √3/2",
    "cos(π/4) = √2/2 et sin(π/4) = √2/2",
    "cos(π/4) = 1 et sin(π/4) = 0"
  ],
  "correctAnswer": "cos(π/4) = √2/2 et sin(π/4) = √2/2",
  "explanation": "π/4 correspond à 45°. Pour cet angle remarquable, cos(π/4) = sin(π/4) = √2/2."
}
```

### 5. Vecteurs (Niveau Seconde)

**Question 1:**
```json
{
  "question": "Deux vecteurs sont égaux si et seulement si ils ont :",
  "options": [
    "La même direction",
    "Le même sens",
    "La même longueur",
    "La même direction, le même sens et la même longueur"
  ],
  "correctAnswer": "La même direction, le même sens et la même longueur",
  "explanation": "Deux vecteurs sont égaux s'ils ont exactement les mêmes caractéristiques : direction, sens et norme."
}
```

### 6. Statistiques et Probabilités (Niveau Seconde)

**Question 1:**
```json
{
  "question": "Quelle est la probabilité de l'événement impossible ?",
  "options": [
    "P(∅) = 0",
    "P(∅) = 1",
    "P(∅) = 1/2",
    "P(∅) = -1"
  ],
  "correctAnswer": "P(∅) = 0",
  "explanation": "L'événement impossible ne peut jamais se réaliser, sa probabilité est donc nulle."
}
```

### 7. Genres Littéraires (Niveau Seconde)

**Question 1:**
```json
{
  "question": "Quels sont les trois grands genres littéraires traditionnels ?",
  "options": [
    "Roman, nouvelle, conte",
    "Épique, lyrique, dramatique",
    "Comédie, tragédie, drame",
    "Récit, poésie, théâtre"
  ],
  "correctAnswer": "Épique, lyrique, dramatique",
  "explanation": "Les trois grands genres traditionnels selon Aristote sont l'épique (récit), le lyrique (poésie) et le dramatique (théâtre)."
}
```

### 8. Registres Littéraires (Niveau Seconde)

**Question 1:**
```json
{
  "question": "Quel est l'objectif du registre pathétique ?",
  "options": [
    "Faire frémir le lecteur",
    "Indigner le lecteur",
    "Faire compatir le lecteur",
    "Faire imaginer le lecteur"
  ],
  "correctAnswer": "Faire compatir le lecteur",
  "explanation": "Le registre pathétique vise à émouvoir le lecteur et à susciter sa compassion face à la souffrance des personnages."
}
```

**Question 2:**
```json
{
  "question": "Qu'est-ce qui caractérise une situation au registre tragique ?",
  "options": [
    "La situation est sans issue",
    "La situation est inquiétante",
    "La situation est drôle",
    "La situation est confuse"
  ],
  "correctAnswer": "La situation est sans issue",
  "explanation": "Le registre tragique présente des personnages face à un destin inéluctable, dans une situation sans échappatoire possible."
}
```

## Implementation Strategy

1. **Priority Order:**
   - Start with mathematics subjects (most structured)
   - Then move to French literature topics
   - Focus on Seconde level first as it appears most frequently

2. **Quality Assurance:**
   - Each question should be pedagogically sound
   - Explanations should be clear and educational
   - Difficulty should match the specified level
   - Options should be plausible but clearly distinguishable

3. **File Updates:**
   - Update all instances of placeholder questions across all files
   - Maintain consistency in JSON structure
   - Preserve existing working questions

4. **Subject-Specific Considerations:**
   - **Mathematics:** Focus on fundamental concepts, step-by-step reasoning
   - **French:** Emphasize literary analysis, cultural knowledge, language skills
   - **Other subjects:** Research appropriate curriculum standards

This research provides a solid foundation for replacing placeholder questions with accurate, educational content that aligns with French educational standards for each level.