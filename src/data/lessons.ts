export interface Question {
  id: number;
  type: 'multiple-choice' | 'calculation';
  difficulty: 1 | 2 | 3;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  completedQuestions: number;
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Nombres et Calculs',
    description: 'Fractions, puissances, racines carrées',
    icon: '🔢',
    difficulty: 'easy',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la valeur de √25 ?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '5',
        explanation: 'La racine carrée de 25 est 5 car 5 × 5 = 25',
        points: 10
      },
      {
        id: 2,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule 2³ × 2²',
        correctAnswer: '32',
        explanation: '2³ = 8 et 2² = 4, donc 8 × 4 = 32',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle fraction est équivalente à 0.75 ?',
        options: ['1/4', '2/3', '3/4', '4/5'],
        correctAnswer: '3/4',
        explanation: '0.75 = 75/100 = 3/4',
        points: 10
      },
      {
        id: 4,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule √16 + √9',
        correctAnswer: '7',
        explanation: '√16 = 4 et √9 = 3, donc 4 + 3 = 7',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la valeur de 5⁻² ?',
        options: ['1/25', '1/10', '25', '10'],
        correctAnswer: '1/25',
        explanation: '5⁻² = 1/5² = 1/25',
        points: 10
      },
      {
        id: 6,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule (2/3) × (3/4)',
        correctAnswer: '0.5',
        explanation: '(2/3) × (3/4) = 6/12 = 1/2 = 0.5 (ou 0,5)',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quelle est la valeur de √50 ?',
        options: ['5√2', '7', '5', '10'],
        correctAnswer: '5√2',
        explanation: '√50 = √(25 × 2) = √25 × √2 = 5√2',
        points: 10
      },
      {
        id: 8,
        type: 'calculation',
        difficulty: 3,
        question: 'Calcule 3⁴ ÷ 3²',
        correctAnswer: '9',
        explanation: '3⁴ ÷ 3² = 3^(4-2) = 3² = 9',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la valeur de √36 ?',
        options: ['4', '5', '6', '7'],
        correctAnswer: '6',
        explanation: 'La racine carrée de 36 est 6 car 6 × 6 = 36',
        points: 10
      },
      {
        id: 10,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule 4² + 3²',
        correctAnswer: '25',
        explanation: '4² = 16 et 3² = 9, donc 16 + 9 = 25',
        points: 10
      },
      {
        id: 11,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle fraction est équivalente à 0.5 ?',
        options: ['1/3', '1/2', '2/3', '3/4'],
        correctAnswer: '1/2',
        explanation: '0.5 = 5/10 = 1/2',
        points: 10
      },
      {
        id: 12,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule 5 × 2³',
        correctAnswer: '40',
        explanation: '2³ = 8, donc 5 × 8 = 40',
        points: 10
      },
      {
        id: 13,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la valeur de 2⁻³ ?',
        options: ['1/8', '1/6', '8', '6'],
        correctAnswer: '1/8',
        explanation: '2⁻³ = 1/2³ = 1/8',
        points: 10
      },
      {
        id: 14,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule √49 + √16',
        correctAnswer: '11',
        explanation: '√49 = 7 et √16 = 4, donc 7 + 4 = 11',
        points: 10
      },
      {
        id: 15,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle fraction est équivalente à 0.8 ?',
        options: ['3/4', '4/5', '5/6', '6/7'],
        correctAnswer: '4/5',
        explanation: '0.8 = 8/10 = 4/5',
        points: 10
      },
      {
        id: 16,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule (3/4) ÷ (1/2)',
        correctAnswer: '1.5',
        explanation: '(3/4) ÷ (1/2) = (3/4) × (2/1) = 6/4 = 1.5',
        points: 10
      },
      {
        id: 17,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quelle est la valeur de √72 ?',
        options: ['6√2', '8', '6', '12'],
        correctAnswer: '6√2',
        explanation: '√72 = √(36 × 2) = √36 × √2 = 6√2',
        points: 10
      },
      {
        id: 18,
        type: 'calculation',
        difficulty: 3,
        question: 'Calcule 4⁵ ÷ 4³',
        correctAnswer: '16',
        explanation: '4⁵ ÷ 4³ = 4^(5-3) = 4² = 16',
        points: 10
      },
      {
        id: 19,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la valeur de √64 ?',
        options: ['6', '7', '8', '9'],
        correctAnswer: '8',
        explanation: 'La racine carrée de 64 est 8 car 8 × 8 = 64',
        points: 10
      },
      {
        id: 20,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule 6² - 4²',
        correctAnswer: '20',
        explanation: '6² = 36 et 4² = 16, donc 36 - 16 = 20',
        points: 10
      },
      {
        id: 21,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle fraction est équivalente à 0.25 ?',
        options: ['1/3', '1/4', '2/5', '3/8'],
        correctAnswer: '1/4',
        explanation: '0.25 = 25/100 = 1/4',
        points: 10
      },
      {
        id: 22,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule 3 × 3²',
        correctAnswer: '27',
        explanation: '3² = 9, donc 3 × 9 = 27',
        points: 10
      },
      {
        id: 23,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la valeur de 3⁻² ?',
        options: ['1/9', '1/6', '9', '6'],
        correctAnswer: '1/9',
        explanation: '3⁻² = 1/3² = 1/9',
        points: 10
      },
      {
        id: 24,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule √81 + √25',
        correctAnswer: '14',
        explanation: '√81 = 9 et √25 = 5, donc 9 + 5 = 14',
        points: 10
      },
      {
        id: 25,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle fraction est équivalente à 0.6 ?',
        options: ['2/3', '3/5', '4/7', '5/8'],
        correctAnswer: '3/5',
        explanation: '0.6 = 6/10 = 3/5',
        points: 10
      },
      {
        id: 26,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule (5/6) × (2/3)',
        correctAnswer: '0.56',
        explanation: '(5/6) × (2/3) = 10/18 = 5/9 ≈ 0.56',
        points: 10
      },
      {
        id: 27,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quelle est la valeur de √98 ?',
        options: ['7√2', '9', '7', '14'],
        correctAnswer: '7√2',
        explanation: '√98 = √(49 × 2) = √49 × √2 = 7√2',
        points: 10
      },
      {
        id: 28,
        type: 'calculation',
        difficulty: 3,
        question: 'Calcule 5⁴ ÷ 5²',
        correctAnswer: '25',
        explanation: '5⁴ ÷ 5² = 5^(4-2) = 5² = 25',
        points: 10
      },
      {
        id: 29,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la valeur de √100 ?',
        options: ['8', '9', '10', '11'],
        correctAnswer: '10',
        explanation: 'La racine carrée de 100 est 10 car 10 × 10 = 100',
        points: 10
      },
      {
        id: 30,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule 7² + 5²',
        correctAnswer: '74',
        explanation: '7² = 49 et 5² = 25, donc 49 + 25 = 74',
        points: 10
      },
      {
        id: 31,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle fraction est équivalente à 0.4 ?',
        options: ['1/3', '2/5', '3/7', '4/9'],
        correctAnswer: '2/5',
        explanation: '0.4 = 4/10 = 2/5',
        points: 10
      },
      {
        id: 32,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule 4 × 4²',
        correctAnswer: '64',
        explanation: '4² = 16, donc 4 × 16 = 64',
        points: 10
      },
      {
        id: 33,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la valeur de 4⁻² ?',
        options: ['1/16', '1/8', '16', '8'],
        correctAnswer: '1/16',
        explanation: '4⁻² = 1/4² = 1/16',
        points: 10
      }
    ]
  },
  {
    id: 2,
    title: 'Géométrie',
    description: 'Théorème de Pythagore, trigonométrie',
    icon: '📐',
    difficulty: 'medium',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Dans un triangle rectangle, le carré de l\'hypoténuse est égal à...',
        options: [
          'la somme des carrés des deux autres côtés',
          'le produit des deux autres côtés',
          'la différence des carrés des deux autres côtés',
          'la moyenne des carrés des deux autres côtés'
        ],
        correctAnswer: 'la somme des carrés des deux autres côtés',
        explanation: 'C\'est le théorème de Pythagore : a² + b² = c²',
        points: 10
      },
      {
        id: 2,
        type: 'calculation',
        difficulty: 1,
        question: 'Dans un triangle rectangle, si les côtés de l\'angle droit mesurent 3 cm et 4 cm, quelle est la longueur de l\'hypoténuse ?',
        correctAnswer: '5',
        explanation: 'D\'après le théorème de Pythagore : 3² + 4² = 9 + 16 = 25 = 5²',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel est le cosinus de 60° ?',
        options: ['1/2', '√3/2', '1', '0'],
        correctAnswer: '1/2',
        explanation: 'cos(60°) = 1/2',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: "Dans un triangle rectangle, si l'hypoténuse mesure 10 cm et un angle aigu mesure 30°, quelle est la longueur du côté adjacent à cet angle ?",
        options: ['5 cm', '8.66 cm', '10 cm', '15 cm'],
        correctAnswer: '8.66 cm',
        explanation: 'cos(30°) = côté adjacent / hypoténuse, donc côté adjacent = 10 × cos(30°) ≈ 8.66 cm',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la formule de l\'aire d\'un cercle ?',
        options: ['πr', 'πr²', '2πr', 'πd'],
        correctAnswer: 'πr²',
        explanation: 'L\'aire d\'un cercle est donnée par la formule A = πr²',
        points: 10
      },
      {
        id: 6,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule l\'aire d\'un cercle de rayon 5 cm',
        correctAnswer: '78.54',
        explanation: 'A = πr² = π × 5² = 25π ≈ 78.54 cm²',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quel est le sinus de 45° ?',
        options: ['1/2', '√2/2', '1', '0'],
        correctAnswer: '√2/2',
        explanation: 'sin(45°) = √2/2',
        points: 10
      },
      {
        id: 8,
        type: 'calculation',
        difficulty: 3,
        question: 'Dans un triangle rectangle, si l\'hypoténuse mesure 13 cm et un côté mesure 5 cm, quelle est la longueur du troisième côté ?',
        correctAnswer: '12',
        explanation: 'D\'après Pythagore : 13² = 5² + x², donc 169 = 25 + x², donc x² = 144, donc x = 12',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la formule du périmètre d\'un rectangle ?',
        options: ['2 × (longueur + largeur)', 'longueur × largeur', 'longueur + largeur', '2 × longueur × largeur'],
        correctAnswer: '2 × (longueur + largeur)',
        explanation: 'Le périmètre d\'un rectangle est P = 2 × (L + l)',
        points: 10
      },
      {
        id: 10,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule le périmètre d\'un rectangle de 6 cm sur 4 cm',
        correctAnswer: '20',
        explanation: 'P = 2 × (6 + 4) = 2 × 10 = 20 cm',
        points: 10
      },
      {
        id: 11,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la formule de l\'aire d\'un triangle ?',
        options: ['base × hauteur', '(base × hauteur) / 2', 'base + hauteur', 'base × hauteur × 2'],
        correctAnswer: '(base × hauteur) / 2',
        explanation: 'L\'aire d\'un triangle est A = (b × h) / 2',
        points: 10
      },
      {
        id: 12,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule l\'aire d\'un triangle de base 8 cm et hauteur 6 cm',
        correctAnswer: '24',
        explanation: 'A = (8 × 6) / 2 = 48 / 2 = 24 cm²',
        points: 10
      },
      {
        id: 13,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel est le sinus de 30° ?',
        options: ['1/2', '√3/2', '1', '0'],
        correctAnswer: '1/2',
        explanation: 'sin(30°) = 1/2',
        points: 10
      },
      {
        id: 14,
        type: 'multiple-choice',
        difficulty: 2,
        question: "Dans un triangle rectangle, si l'hypoténuse mesure 15 cm et un angle aigu mesure 45°, quelle est la longueur du côté opposé ?",
        options: ['10.61 cm', '7.5 cm', '12 cm', '15 cm'],
        correctAnswer: '10.61 cm',
        explanation: 'sin(45°) = côté opposé / hypoténuse, donc côté opposé = 15 × sin(45°) ≈ 10.61 cm',
        points: 10
      },
      {
        id: 15,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la formule du volume d\'un cube ?',
        options: ['côté²', 'côté³', '6 × côté²', '12 × côté'],
        correctAnswer: 'côté³',
        explanation: 'Le volume d\'un cube est V = côté³',
        points: 10
      },
      {
        id: 16,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule le volume d\'un cube de côté 4 cm',
        correctAnswer: '64',
        explanation: 'V = 4³ = 64 cm³',
        points: 10
      },
      {
        id: 17,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quel est le cosinus de 45° ?',
        options: ['1/2', '√2/2', '1', '0'],
        correctAnswer: '√2/2',
        explanation: 'cos(45°) = √2/2',
        points: 10
      },
      {
        id: 18,
        type: 'calculation',
        difficulty: 3,
        question: 'Dans un triangle rectangle, si l\'hypoténuse mesure 17 cm et un côté mesure 8 cm, quelle est la longueur du troisième côté ?',
        correctAnswer: '15',
        explanation: 'D\'après Pythagore : 17² = 8² + x², donc 289 = 64 + x², donc x² = 225, donc x = 15',
        points: 10
      },
      {
        id: 19,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la formule de l\'aire d\'un carré ?',
        options: ['côté²', '4 × côté', '2 × côté', 'côté × 2'],
        correctAnswer: 'côté²',
        explanation: 'L\'aire d\'un carré est A = côté²',
        points: 10
      },
      {
        id: 20,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule l\'aire d\'un carré de côté 7 cm',
        correctAnswer: '49',
        explanation: 'A = 7² = 49 cm²',
        points: 10
      },
      {
        id: 21,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la formule du périmètre d\'un cercle ?',
        options: ['πr', 'πr²', '2πr', 'πd'],
        correctAnswer: '2πr',
        explanation: 'Le périmètre d\'un cercle est P = 2πr',
        points: 10
      },
      {
        id: 22,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule le périmètre d\'un cercle de rayon 3 cm',
        correctAnswer: '18.85',
        explanation: 'P = 2πr = 2π × 3 ≈ 18.85 cm',
        points: 10
      },
      {
        id: 23,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel est le sinus de 90° ?',
        options: ['0', '1/2', '1', '√3/2'],
        correctAnswer: '1',
        explanation: 'sin(90°) = 1',
        points: 10
      },
      {
        id: 24,
        type: 'multiple-choice',
        difficulty: 2,
        question: "Dans un triangle rectangle, si l'hypoténuse mesure 20 cm et un angle aigu mesure 60°, quelle est la longueur du côté adjacent ?",
        options: ['10 cm', '20 cm', '17.32 cm', '15 cm'],
        correctAnswer: '10 cm',
        explanation: 'cos(60°) = côté adjacent / hypoténuse, donc côté adjacent = 20 × cos(60°) = 20 × 0.5 = 10 cm',
        points: 10
      },
      {
        id: 25,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la formule de l\'aire d\'un rectangle ?',
        options: ['longueur + largeur', 'longueur × largeur', '2 × (longueur + largeur)', 'longueur × 2 + largeur × 2'],
        correctAnswer: 'longueur × largeur',
        explanation: 'L\'aire d\'un rectangle est A = L × l',
        points: 10
      },
      {
        id: 26,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule l\'aire d\'un rectangle de 9 cm sur 5 cm',
        correctAnswer: '45',
        explanation: 'A = 9 × 5 = 45 cm²',
        points: 10
      },
      {
        id: 27,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quel est le cosinus de 90° ?',
        options: ['0', '1/2', '1', '√3/2'],
        correctAnswer: '0',
        explanation: 'cos(90°) = 0',
        points: 10
      },
      {
        id: 28,
        type: 'calculation',
        difficulty: 3,
        question: 'Dans un triangle rectangle, si l\'hypoténuse mesure 25 cm et un côté mesure 7 cm, quelle est la longueur du troisième côté ?',
        correctAnswer: '24',
        explanation: 'D\'après Pythagore : 25² = 7² + x², donc 625 = 49 + x², donc x² = 576, donc x = 24',
        points: 10
      },
      {
        id: 29,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la formule du volume d\'un parallélépipède rectangle ?',
        options: ['longueur × largeur', 'longueur × largeur × hauteur', '2 × (longueur + largeur + hauteur)', 'longueur + largeur + hauteur'],
        correctAnswer: 'longueur × largeur × hauteur',
        explanation: 'Le volume d\'un parallélépipède rectangle est V = L × l × h',
        points: 10
      },
      {
        id: 30,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule le volume d\'un parallélépipède de 6 cm × 4 cm × 3 cm',
        correctAnswer: '72',
        explanation: 'V = 6 × 4 × 3 = 72 cm³',
        points: 10
      },
      {
        id: 31,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la formule de l\'aire d\'un trapèze ?',
        options: ['(base + hauteur) / 2', '(petite base + grande base) × hauteur / 2', 'base × hauteur', '(base + hauteur) × 2'],
        correctAnswer: '(petite base + grande base) × hauteur / 2',
        explanation: 'L\'aire d\'un trapèze est A = (B + b) × h / 2',
        points: 10
      },
      {
        id: 32,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule l\'aire d\'un trapèze de bases 8 cm et 4 cm, hauteur 6 cm',
        correctAnswer: '36',
        explanation: 'A = (8 + 4) × 6 / 2 = 12 × 6 / 2 = 36 cm²',
        points: 10
      },
      {
        id: 33,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel est le sinus de 0° ?',
        options: ['0', '1/2', '1', '√3/2'],
        correctAnswer: '0',
        explanation: 'sin(0°) = 0',
        points: 10
      }
    ]
  },
  {
    id: 3,
    title: 'Fonctions',
    description: 'Fonctions linéaires et affines',
    icon: '📈',
    difficulty: 'medium',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la forme générale d\'une fonction affine ?',
        options: ['y = ax', 'y = ax + b', 'y = x²', 'y = 1/x'],
        correctAnswer: 'y = ax + b',
        explanation: 'Une fonction affine est de la forme y = ax + b',
        points: 10
      },
      {
        id: 2,
        type: 'calculation',
        difficulty: 1,
        question: 'Quel est le coefficient directeur de la fonction f(x) = 2x + 3 ?',
        correctAnswer: '2',
        explanation: 'Dans une fonction affine f(x) = ax + b, a est le coefficient directeur',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est l\'ordonnée à l\'origine de la fonction f(x) = 3x - 5 ?',
        options: ['3', '-5', '5', '-3'],
        correctAnswer: '-5',
        explanation: 'Dans f(x) = ax + b, b est l\'ordonnée à l\'origine',
        points: 10
      },
      {
        id: 4,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule f(2) pour la fonction f(x) = 4x + 1',
        correctAnswer: '9',
        explanation: 'f(2) = 4 × 2 + 1 = 8 + 1 = 9',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la représentation graphique d\'une fonction linéaire ?',
        options: ['Une droite passant par l\'origine', 'Une parabole', 'Une hyperbole', 'Un cercle'],
        correctAnswer: 'Une droite passant par l\'origine',
        explanation: 'Une fonction linéaire f(x) = ax a pour représentation graphique une droite passant par l\'origine',
        points: 10
      },
      {
        id: 6,
        type: 'calculation',
        difficulty: 2,
        question: 'Trouve l\'antécédent de 7 par la fonction f(x) = 2x + 3',
        correctAnswer: '2',
        explanation: 'f(x) = 7 donc 2x + 3 = 7, donc 2x = 4, donc x = 2',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quelle est la fonction inverse de f(x) = 3x + 2 ?',
        options: ['f⁻¹(x) = (x-2)/3', 'f⁻¹(x) = 3x-2', 'f⁻¹(x) = x/3+2', 'f⁻¹(x) = (x+2)/3'],
        correctAnswer: 'f⁻¹(x) = (x-2)/3',
        explanation: 'Pour f(x) = 3x + 2, on a y = 3x + 2, donc x = (y-2)/3, donc f⁻¹(x) = (x-2)/3',
        points: 10
      },
      {
        id: 8,
        type: 'calculation',
        difficulty: 3,
        question: 'Calcule f(-1) pour la fonction f(x) = -2x + 5',
        correctAnswer: '7',
        explanation: 'f(-1) = -2 × (-1) + 5 = 2 + 5 = 7',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la forme générale d\'une fonction linéaire ?',
        options: ['y = ax + b', 'y = ax', 'y = x²', 'y = 1/x'],
        correctAnswer: 'y = ax',
        explanation: 'Une fonction linéaire est de la forme y = ax (b = 0)',
        points: 10
      },
      {
        id: 10,
        type: 'calculation',
        difficulty: 1,
        question: 'Quel est le coefficient directeur de la fonction f(x) = 5x ?',
        correctAnswer: '5',
        explanation: 'Dans une fonction linéaire f(x) = ax, a est le coefficient directeur',
        points: 10
      },
      {
        id: 11,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est l\'ordonnée à l\'origine de la fonction f(x) = 2x + 7 ?',
        options: ['2', '7', '5', '9'],
        correctAnswer: '7',
        explanation: 'Dans f(x) = ax + b, b est l\'ordonnée à l\'origine',
        points: 10
      },
      {
        id: 12,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule f(3) pour la fonction f(x) = 3x + 2',
        correctAnswer: '11',
        explanation: 'f(3) = 3 × 3 + 2 = 9 + 2 = 11',
        points: 10
      },
      {
        id: 13,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la représentation graphique d\'une fonction affine ?',
        options: ['Une droite', 'Une parabole', 'Une hyperbole', 'Un cercle'],
        correctAnswer: 'Une droite',
        explanation: 'Une fonction affine f(x) = ax + b a pour représentation graphique une droite',
        points: 10
      },
      {
        id: 14,
        type: 'calculation',
        difficulty: 2,
        question: 'Trouve l\'antécédent de 10 par la fonction f(x) = 3x + 1',
        correctAnswer: '3',
        explanation: 'f(x) = 10 donc 3x + 1 = 10, donc 3x = 9, donc x = 3',
        points: 10
      },
      {
        id: 15,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la fonction inverse de f(x) = 2x + 3 ?',
        options: ['f⁻¹(x) = (x-3)/2', 'f⁻¹(x) = 2x-3', 'f⁻¹(x) = x/2+3', 'f⁻¹(x) = (x+3)/2'],
        correctAnswer: 'f⁻¹(x) = (x-3)/2',
        explanation: 'Pour f(x) = 2x + 3, on a y = 2x + 3, donc x = (y-3)/2, donc f⁻¹(x) = (x-3)/2',
        points: 10
      },
      {
        id: 16,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule f(0) pour la fonction f(x) = 4x - 6',
        correctAnswer: '-6',
        explanation: 'f(0) = 4 × 0 - 6 = 0 - 6 = -6',
        points: 10
      },
      {
        id: 17,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quelle est la fonction inverse de f(x) = 5x + 2 ?',
        options: ['f⁻¹(x) = (x-2)/5', 'f⁻¹(x) = 5x-2', 'f⁻¹(x) = x/5+2', 'f⁻¹(x) = (x+2)/5'],
        correctAnswer: 'f⁻¹(x) = (x-2)/5',
        explanation: 'Pour f(x) = 5x + 2, on a y = 5x + 2, donc x = (y-2)/5, donc f⁻¹(x) = (x-2)/5',
        points: 10
      },
      {
        id: 18,
        type: 'calculation',
        difficulty: 3,
        question: 'Calcule f(-2) pour la fonction f(x) = -3x + 4',
        correctAnswer: '10',
        explanation: 'f(-2) = -3 × (-2) + 4 = 6 + 4 = 10',
        points: 10
      },
      {
        id: 19,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est le coefficient directeur de la fonction f(x) = 7x + 3 ?',
        options: ['3', '7', '10', '4'],
        correctAnswer: '7',
        explanation: 'Dans une fonction affine f(x) = ax + b, a est le coefficient directeur',
        points: 10
      },
      {
        id: 20,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule f(1) pour la fonction f(x) = 6x - 2',
        correctAnswer: '4',
        explanation: 'f(1) = 6 × 1 - 2 = 6 - 2 = 4',
        points: 10
      },
      {
        id: 21,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est l\'ordonnée à l\'origine de la fonction f(x) = 4x - 5 ?',
        options: ['4', '-5', '5', '-4'],
        correctAnswer: '-5',
        explanation: 'Dans f(x) = ax + b, b est l\'ordonnée à l\'origine',
        points: 10
      },
      {
        id: 22,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule f(2) pour la fonction f(x) = 5x + 1',
        correctAnswer: '11',
        explanation: 'f(2) = 5 × 2 + 1 = 10 + 1 = 11',
        points: 10
      },
      {
        id: 23,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Trouve l\'antécédent de 15 par la fonction f(x) = 4x + 3',
        options: ['2', '3', '4', '5'],
        correctAnswer: '3',
        explanation: 'f(x) = 15 donc 4x + 3 = 15, donc 4x = 12, donc x = 3',
        points: 10
      },
      {
        id: 24,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule f(-3) pour la fonction f(x) = 2x + 8',
        correctAnswer: '2',
        explanation: 'f(-3) = 2 × (-3) + 8 = -6 + 8 = 2',
        points: 10
      },
      {
        id: 25,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la fonction inverse de f(x) = 4x + 1 ?',
        options: ['f⁻¹(x) = (x-1)/4', 'f⁻¹(x) = 4x-1', 'f⁻¹(x) = x/4+1', 'f⁻¹(x) = (x+1)/4'],
        correctAnswer: 'f⁻¹(x) = (x-1)/4',
        explanation: 'Pour f(x) = 4x + 1, on a y = 4x + 1, donc x = (y-1)/4, donc f⁻¹(x) = (x-1)/4',
        points: 10
      },
      {
        id: 26,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule f(4) pour la fonction f(x) = 3x - 5',
        correctAnswer: '7',
        explanation: 'f(4) = 3 × 4 - 5 = 12 - 5 = 7',
        points: 10
      },
      {
        id: 27,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quelle est la fonction inverse de f(x) = 6x + 4 ?',
        options: ['f⁻¹(x) = (x-4)/6', 'f⁻¹(x) = 6x-4', 'f⁻¹(x) = x/6+4', 'f⁻¹(x) = (x+4)/6'],
        correctAnswer: 'f⁻¹(x) = (x-4)/6',
        explanation: 'Pour f(x) = 6x + 4, on a y = 6x + 4, donc x = (y-4)/6, donc f⁻¹(x) = (x-4)/6',
        points: 10
      },
      {
        id: 28,
        type: 'calculation',
        difficulty: 3,
        question: 'Calcule f(-4) pour la fonction f(x) = -2x + 3',
        correctAnswer: '11',
        explanation: 'f(-4) = -2 × (-4) + 3 = 8 + 3 = 11',
        points: 10
      },
      {
        id: 29,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est le coefficient directeur de la fonction f(x) = 8x - 1 ?',
        options: ['-1', '7', '8', '9'],
        correctAnswer: '8',
        explanation: 'Dans une fonction affine f(x) = ax + b, a est le coefficient directeur',
        points: 10
      },
      {
        id: 30,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule f(5) pour la fonction f(x) = 2x + 6',
        correctAnswer: '16',
        explanation: 'f(5) = 2 × 5 + 6 = 10 + 6 = 16',
        points: 10
      },
      {
        id: 31,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est l\'ordonnée à l\'origine de la fonction f(x) = 6x + 9 ?',
        options: ['6', '9', '15', '3'],
        correctAnswer: '9',
        explanation: 'Dans f(x) = ax + b, b est l\'ordonnée à l\'origine',
        points: 10
      },
      {
        id: 32,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule f(0) pour la fonction f(x) = 7x - 3',
        correctAnswer: '-3',
        explanation: 'f(0) = 7 × 0 - 3 = 0 - 3 = -3',
        points: 10
      },
      {
        id: 33,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Trouve l\'antécédent de 20 par la fonction f(x) = 5x + 5',
        options: ['2', '3', '4', '5'],
        correctAnswer: '3',
        explanation: 'f(x) = 20 donc 5x + 5 = 20, donc 5x = 15, donc x = 3',
        points: 10
      }
    ]
  },
  {
    id: 4,
    title: 'Statistiques',
    description: 'Moyenne, médiane, étendue',
    icon: '📊',
    difficulty: 'easy',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la moyenne des nombres 2, 4, 6, 8 ?',
        options: ['4', '5', '6', '7'],
        correctAnswer: '5',
        explanation: 'Moyenne = (2 + 4 + 6 + 8) ÷ 4 = 20 ÷ 4 = 5',
        points: 10
      },
      {
        id: 2,
        type: 'calculation',
        difficulty: 1,
        question: 'Quelle est l\'étendue de la série 2, 5, 8, 11, 14 ?',
        correctAnswer: '12',
        explanation: 'Étendue = valeur maximale - valeur minimale = 14 - 2 = 12',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la médiane de la série 3, 7, 9, 12, 15 ?',
        options: ['7', '9', '12', '8'],
        correctAnswer: '9',
        explanation: 'La médiane est la valeur centrale quand les données sont ordonnées',
        points: 10
      },
      {
        id: 4,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule la moyenne de 10, 15, 20, 25, 30',
        correctAnswer: '20',
        explanation: 'Moyenne = (10 + 15 + 20 + 25 + 30) ÷ 5 = 100 ÷ 5 = 20',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la fréquence relative de la valeur 3 dans la série 1, 2, 3, 3, 4, 5 ?',
        options: ['1/6', '1/3', '1/2', '2/3'],
        correctAnswer: '1/3',
        explanation: 'La valeur 3 apparaît 2 fois sur 6 valeurs, donc fréquence = 2/6 = 1/3',
        points: 10
      },
      {
        id: 6,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule l\'étendue de 5, 8, 12, 15, 18, 22',
        correctAnswer: '17',
        explanation: 'Étendue = 22 - 5 = 17',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quelle est la médiane de 2, 4, 6, 8, 10, 12, 14 ?',
        options: ['6', '8', '7', '10'],
        correctAnswer: '8',
        explanation: 'Avec 7 valeurs, la médiane est la 4ème valeur quand ordonnées',
        points: 10
      },
      {
        id: 8,
        type: 'calculation',
        difficulty: 3,
        question: 'Calcule la moyenne pondérée de 5 (poids 2), 10 (poids 3), 15 (poids 1)',
        correctAnswer: '9.17',
        explanation: 'Moyenne pondérée = (5×2 + 10×3 + 15×1) ÷ (2+3+1) = (10+30+15) ÷ 6 = 55÷6 ≈ 9.17',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la médiane de la série 1, 3, 5, 7, 9 ?',
        options: ['3', '5', '7', '4'],
        correctAnswer: '5',
        explanation: 'La médiane est la valeur centrale quand les données sont ordonnées',
        points: 10
      },
      {
        id: 10,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule la moyenne de 5, 10, 15, 20',
        correctAnswer: '12.5',
        explanation: 'Moyenne = (5 + 10 + 15 + 20) ÷ 4 = 50 ÷ 4 = 12.5',
        points: 10
      },
      {
        id: 11,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est l\'étendue de la série 3, 6, 9, 12, 15 ?',
        options: ['9', '12', '15', '18'],
        correctAnswer: '12',
        explanation: 'Étendue = 15 - 3 = 12',
        points: 10
      },
      {
        id: 12,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule la moyenne de 2, 4, 6, 8, 10, 12',
        correctAnswer: '7',
        explanation: 'Moyenne = (2 + 4 + 6 + 8 + 10 + 12) ÷ 6 = 42 ÷ 6 = 7',
        points: 10
      },
      {
        id: 13,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la fréquence relative de la valeur 4 dans la série 2, 3, 4, 4, 5, 6 ?',
        options: ['1/6', '1/3', '1/2', '2/3'],
        correctAnswer: '1/3',
        explanation: 'La valeur 4 apparaît 2 fois sur 6 valeurs, donc fréquence = 2/6 = 1/3',
        points: 10
      },
      {
        id: 14,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule l\'étendue de 1, 5, 9, 13, 17, 21',
        correctAnswer: '20',
        explanation: 'Étendue = 21 - 1 = 20',
        points: 10
      },
      {
        id: 15,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la médiane de 1, 2, 3, 4, 5, 6, 7, 8 ?',
        options: ['4', '4.5', '5', '5.5'],
        correctAnswer: '4.5',
        explanation: 'Avec 8 valeurs, la médiane est la moyenne des 4ème et 5ème valeurs',
        points: 10
      },
      {
        id: 16,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule la moyenne pondérée de 3 (poids 1), 6 (poids 2), 9 (poids 3)',
        correctAnswer: '7',
        explanation: 'Moyenne pondérée = (3×1 + 6×2 + 9×3) ÷ (1+2+3) = (3+12+27) ÷ 6 = 42÷6 = 7',
        points: 10
      },
      {
        id: 17,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quelle est la variance de la série 2, 4, 6, 8, 10 ?',
        options: ['4', '6', '8', '10'],
        correctAnswer: '8',
        explanation: 'Moyenne = 6, variance = [(2-6)² + (4-6)² + (6-6)² + (8-6)² + (10-6)²] ÷ 5 = 40÷5 = 8',
        points: 10
      },
      {
        id: 18,
        type: 'calculation',
        difficulty: 3,
        question: 'Calcule l\'écart-type de la série 1, 3, 5, 7, 9',
        correctAnswer: '2.83',
        explanation: 'Moyenne = 5, variance = 8, écart-type = √8 ≈ 2.83',
        points: 10
      },
      {
        id: 19,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la moyenne de 10, 20, 30, 40, 50 ?',
        options: ['25', '30', '35', '40'],
        correctAnswer: '30',
        explanation: 'Moyenne = (10 + 20 + 30 + 40 + 50) ÷ 5 = 150 ÷ 5 = 30',
        points: 10
      },
      {
        id: 20,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule l\'étendue de 5, 8, 11, 14, 17',
        correctAnswer: '12',
        explanation: 'Étendue = 17 - 5 = 12',
        points: 10
      },
      {
        id: 21,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la médiane de 2, 4, 6, 8, 10, 12, 14 ?',
        options: ['6', '8', '10', '7'],
        correctAnswer: '8',
        explanation: 'Avec 7 valeurs, la médiane est la 4ème valeur quand ordonnées',
        points: 10
      },
      {
        id: 22,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule la moyenne de 3, 6, 9, 12, 15, 18',
        correctAnswer: '10.5',
        explanation: 'Moyenne = (3 + 6 + 9 + 12 + 15 + 18) ÷ 6 = 63 ÷ 6 = 10.5',
        points: 10
      },
      {
        id: 23,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la fréquence relative de la valeur 5 dans la série 1, 3, 5, 5, 7, 9 ?',
        options: ['1/6', '1/3', '1/2', '2/3'],
        correctAnswer: '1/3',
        explanation: 'La valeur 5 apparaît 2 fois sur 6 valeurs, donc fréquence = 2/6 = 1/3',
        points: 10
      },
      {
        id: 24,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule l\'étendue de 2, 6, 10, 14, 18, 22',
        correctAnswer: '20',
        explanation: 'Étendue = 22 - 2 = 20',
        points: 10
      },
      {
        id: 25,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la médiane de 1, 3, 5, 7, 9, 11, 13, 15 ?',
        options: ['7', '8', '9', '10'],
        correctAnswer: '8',
        explanation: 'Avec 8 valeurs, la médiane est la moyenne des 4ème et 5ème valeurs',
        points: 10
      },
      {
        id: 26,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule la moyenne pondérée de 4 (poids 2), 8 (poids 3), 12 (poids 1)',
        correctAnswer: '7.33',
        explanation: 'Moyenne pondérée = (4×2 + 8×3 + 12×1) ÷ (2+3+1) = (8+24+12) ÷ 6 = 44÷6 ≈ 7.33',
        points: 10
      },
      {
        id: 27,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quelle est la variance de la série 1, 3, 5, 7, 9, 11 ?',
        options: ['8', '10', '12', '14'],
        correctAnswer: '10',
        explanation: 'Moyenne = 6, variance = [(1-6)² + (3-6)² + (5-6)² + (7-6)² + (9-6)² + (11-6)²] ÷ 6 = 60÷6 = 10',
        points: 10
      },
      {
        id: 28,
        type: 'calculation',
        difficulty: 3,
        question: 'Calcule l\'écart-type de la série 2, 4, 6, 8, 10, 12',
        correctAnswer: '3.16',
        explanation: 'Moyenne = 7, variance = 10, écart-type = √10 ≈ 3.16',
        points: 10
      },
      {
        id: 29,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la moyenne de 15, 25, 35, 45, 55 ?',
        options: ['30', '35', '40', '45'],
        correctAnswer: '35',
        explanation: 'Moyenne = (15 + 25 + 35 + 45 + 55) ÷ 5 = 175 ÷ 5 = 35',
        points: 10
      },
      {
        id: 30,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule l\'étendue de 7, 10, 13, 16, 19',
        correctAnswer: '12',
        explanation: 'Étendue = 19 - 7 = 12',
        points: 10
      },
      {
        id: 31,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la médiane de 3, 5, 7, 9, 11, 13, 15, 17 ?',
        options: ['9', '10', '11', '12'],
        correctAnswer: '10',
        explanation: 'Avec 8 valeurs, la médiane est la moyenne des 4ème et 5ème valeurs',
        points: 10
      },
      {
        id: 32,
        type: 'calculation',
        difficulty: 1,
        question: 'Calcule la moyenne de 4, 8, 12, 16, 20, 24',
        correctAnswer: '14',
        explanation: 'Moyenne = (4 + 8 + 12 + 16 + 20 + 24) ÷ 6 = 84 ÷ 6 = 14',
        points: 10
      },
      {
        id: 33,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la fréquence relative de la valeur 6 dans la série 2, 4, 6, 6, 8, 10 ?',
        options: ['1/6', '1/3', '1/2', '2/3'],
        correctAnswer: '1/3',
        explanation: 'La valeur 6 apparaît 2 fois sur 6 valeurs, donc fréquence = 2/6 = 1/3',
        points: 10
      }
    ]
  },
  {
    id: 5,
    title: 'Probabilités',
    description: 'Probabilités simples et conditionnelles',
    icon: '🎲',
    difficulty: 'medium',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la probabilité d\'obtenir un 6 en lançant un dé à 6 faces ?',
        options: ['1/6', '1/3', '1/2', '1'],
        correctAnswer: '1/6',
        explanation: 'Il y a une chance sur 6 d\'obtenir un 6',
        points: 10
      },
      {
        id: 2,
        type: 'calculation',
        difficulty: 1,
        question: 'Dans un sac contenant 3 boules rouges et 2 boules bleues, quelle est la probabilité de tirer une boule rouge ?',
        correctAnswer: '0.6',
        explanation: '3 boules rouges sur 5 boules au total = 3/5 = 0.6',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la probabilité d\'obtenir pile en lançant une pièce ?',
        options: ['1/4', '1/2', '1', '0'],
        correctAnswer: '1/2',
        explanation: 'Il y a deux faces possibles, donc probabilité = 1/2',
        points: 10
      },
      {
        id: 4,
        type: 'calculation',
        difficulty: 2,
        question: 'Dans une urne avec 4 boules blanches et 6 boules noires, quelle est la probabilité de tirer une boule blanche ?',
        correctAnswer: '0.4',
        explanation: '4 boules blanches sur 10 boules = 4/10 = 0.4',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la probabilité d\'obtenir un nombre pair en lançant un dé ?',
        options: ['1/6', '1/3', '1/2', '2/3'],
        correctAnswer: '1/2',
        explanation: 'Les nombres pairs sont 2, 4, 6 sur 6 faces = 3/6 = 1/2',
        points: 10
      },
      {
        id: 6,
        type: 'calculation',
        difficulty: 2,
        question: 'Calcule la probabilité d\'obtenir au moins un 6 en lançant deux dés',
        correctAnswer: '0.31',
        explanation: 'Probabilité = 1 - probabilité d\'aucun 6 = 1 - (5/6)² = 1 - 25/36 = 11/36 ≈ 0.31',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Dans un jeu de 52 cartes, quelle est la probabilité de tirer un as ?',
        options: ['1/13', '1/4', '1/52', '4/52'],
        correctAnswer: '1/13',
        explanation: '4 as sur 52 cartes = 4/52 = 1/13',
        points: 10
      },
      {
        id: 8,
        type: 'calculation',
        difficulty: 3,
        question: 'Calcule la probabilité d\'obtenir exactement 2 piles en lançant 3 pièces',
        correctAnswer: '0.375',
        explanation: 'Probabilité = C(3,2) × (1/2)² × (1/2)¹ = 3 × 1/4 × 1/2 = 3/8 = 0.375',
        points: 10
      }
    ]
  },
  {
    id: 6,
    title: 'Équations',
    description: 'Équations du premier degré',
    icon: '⚖️',
    difficulty: 'medium',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la solution de l\'équation 2x + 3 = 7 ?',
        options: ['2', '3', '4', '5'],
        correctAnswer: '2',
        explanation: '2x + 3 = 7 donc 2x = 4 donc x = 2',
        points: 10
      },
      {
        id: 2,
        type: 'calculation',
        difficulty: 1,
        question: 'Résoudre l\'équation 4x + 5 = 17',
        correctAnswer: '3',
        explanation: '4x + 5 = 17 donc 4x = 12 donc x = 3',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la solution de 3x - 2 = 2x + 1 ?',
        options: ['1', '2', '3', '4'],
        correctAnswer: '3',
        explanation: '3x - 2 = 2x + 1 donc 3x - 2x = 1 + 2 donc x = 3',
        points: 10
      },
      {
        id: 4,
        type: 'calculation',
        difficulty: 2,
        question: 'Résoudre 5x + 3 = 2x + 12',
        correctAnswer: '3',
        explanation: '5x + 3 = 2x + 12 donc 5x - 2x = 12 - 3 donc 3x = 9 donc x = 3',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la solution de 2(x + 3) = 10 ?',
        options: ['2', '3', '4', '5'],
        correctAnswer: '2',
        explanation: '2(x + 3) = 10 donc x + 3 = 5 donc x = 2',
        points: 10
      },
      {
        id: 6,
        type: 'calculation',
        difficulty: 2,
        question: 'Résoudre 3(x - 2) = 2x + 1',
        correctAnswer: '7',
        explanation: '3(x - 2) = 2x + 1 donc 3x - 6 = 2x + 1 donc 3x - 2x = 1 + 6 donc x = 7',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quelle est la solution de (x + 2)/3 = 2 ?',
        options: ['2', '4', '6', '8'],
        correctAnswer: '4',
        explanation: '(x + 2)/3 = 2 donc x + 2 = 6 donc x = 4',
        points: 10
      },
      {
        id: 8,
        type: 'calculation',
        difficulty: 3,
        question: 'Résoudre 2x/3 + 1 = 5',
        correctAnswer: '6',
        explanation: '2x/3 + 1 = 5 donc 2x/3 = 4 donc 2x = 12 donc x = 6',
        points: 10
      }
    ]
  },
  {
    id: 7,
    title: 'Inéquations',
    description: 'Inéquations du premier degré',
    icon: '📉',
    difficulty: 'hard',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la solution de l\'inéquation 2x + 3 > 7 ?',
        options: ['x > 2', 'x < 2', 'x ≥ 2', 'x ≤ 2'],
        correctAnswer: 'x > 2',
        explanation: '2x + 3 > 7 donc 2x > 4 donc x > 2',
        points: 10
      },
      {
        id: 2,
        type: 'calculation',
        difficulty: 1,
        question: 'Résoudre l\'inéquation 3x - 2 ≤ 10',
        correctAnswer: '4',
        explanation: '3x - 2 ≤ 10 donc 3x ≤ 12 donc x ≤ 4. La plus grande valeur entière est 4',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la solution de 4x + 1 ≥ 2x + 5 ?',
        options: ['x ≥ 2', 'x ≤ 2', 'x > 2', 'x < 2'],
        correctAnswer: 'x ≥ 2',
        explanation: '4x + 1 ≥ 2x + 5 donc 4x - 2x ≥ 5 - 1 donc 2x ≥ 4 donc x ≥ 2',
        points: 10
      },
      {
        id: 4,
        type: 'calculation',
        difficulty: 2,
        question: 'Résoudre 5x - 3 < 2x + 6',
        correctAnswer: '3',
        explanation: '5x - 3 < 2x + 6 donc 5x - 2x < 6 + 3 donc 3x < 9 donc x < 3. La plus grande valeur entière est 2',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la solution de 2(x + 1) > 6 ?',
        options: ['x > 2', 'x < 2', 'x ≥ 2', 'x ≤ 2'],
        correctAnswer: 'x > 2',
        explanation: '2(x + 1) > 6 donc x + 1 > 3 donc x > 2',
        points: 10
      },
      {
        id: 6,
        type: 'calculation',
        difficulty: 2,
        question: 'Résoudre 3(x - 2) ≤ 2x + 1',
        correctAnswer: '7',
        explanation: '3(x - 2) ≤ 2x + 1 donc 3x - 6 ≤ 2x + 1 donc 3x - 2x ≤ 1 + 6 donc x ≤ 7',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quelle est la solution de (x + 3)/2 ≥ 4 ?',
        options: ['x ≥ 5', 'x ≤ 5', 'x > 5', 'x < 5'],
        correctAnswer: 'x ≥ 5',
        explanation: '(x + 3)/2 ≥ 4 donc x + 3 ≥ 8 donc x ≥ 5',
        points: 10
      },
      {
        id: 8,
        type: 'calculation',
        difficulty: 3,
        question: 'Résoudre 2x/3 - 1 > 3',
        correctAnswer: '6',
        explanation: '2x/3 - 1 > 3 donc 2x/3 > 4 donc 2x > 12 donc x > 6',
        points: 10
      }
    ]
  },
  {
    id: 8,
    title: 'Systèmes d\'équations',
    description: 'Résolution de systèmes linéaires',
    icon: '🔗',
    difficulty: 'hard',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la solution du système {x + y = 5, x - y = 1} ?',
        options: ['x=3, y=2', 'x=2, y=3', 'x=4, y=1', 'x=1, y=4'],
        correctAnswer: 'x=3, y=2',
        explanation: 'En additionnant les deux équations : 2x = 6 donc x = 3, puis y = 2',
        points: 10
      },
      {
        id: 2,
        type: 'calculation',
        difficulty: 1,
        question: 'Résoudre le système {2x + y = 7, x - y = 1}',
        correctAnswer: '2.67',
        explanation: 'En additionnant : 3x = 8 donc x = 8/3 ≈ 2.67, puis y = 7 - 2(8/3) = 5/3',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle méthode utilise-t-on pour résoudre {3x + 2y = 8, 2x + y = 5} ?',
        options: ['Substitution', 'Combinaison', 'Graphique', 'Toutes ces méthodes'],
        correctAnswer: 'Toutes ces méthodes',
        explanation: 'On peut utiliser substitution, combinaison ou méthode graphique',
        points: 10
      },
      {
        id: 4,
        type: 'calculation',
        difficulty: 2,
        question: 'Résoudre {x + 2y = 6, 2x - y = 3}',
        correctAnswer: '2.4',
        explanation: 'Par substitution : y = 2x - 3, donc x + 2(2x - 3) = 6, donc 5x = 12, donc x = 2.4',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la solution de {2x + 3y = 12, x - y = 2} ?',
        options: ['x=4, y=2', 'x=3, y=1', 'x=5, y=3', 'x=2, y=0'],
        correctAnswer: 'x=4, y=2',
        explanation: 'Par substitution : x = y + 2, donc 2(y + 2) + 3y = 12, donc 5y = 8, donc y = 1.6, x = 3.6',
        points: 10
      },
      {
        id: 6,
        type: 'calculation',
        difficulty: 2,
        question: 'Résoudre {3x + y = 10, x + 2y = 8}',
        correctAnswer: '2.4',
        explanation: 'Par combinaison : 6x + 2y = 20 et x + 2y = 8, donc 5x = 12, donc x = 2.4',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quelle est la solution de {4x + 3y = 15, 2x + y = 7} ?',
        options: ['x=3, y=1', 'x=2, y=3', 'x=1, y=5', 'x=4, y=-1'],
        correctAnswer: 'x=3, y=1',
        explanation: 'Par substitution : y = 7 - 2x, donc 4x + 3(7 - 2x) = 15, donc -2x = -6, donc x = 3, y = 1',
        points: 10
      },
      {
        id: 8,
        type: 'calculation',
        difficulty: 3,
        question: 'Résoudre {5x + 2y = 16, 3x - y = 5}',
        correctAnswer: '2.73',
        explanation: 'Par substitution : y = 3x - 5, donc 5x + 2(3x - 5) = 16, donc 11x = 26, donc x ≈ 2.73',
        points: 10
      }
    ]
  }
];

// Simple shuffle function
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get random questions from a lesson
export function getRandomQuestions(lessonId: number, count: number = 10): Question[] {
  // Use the new difficulty-ordered function by default
  if (count === 10) {
    return getRandomQuestionsInDifficultyOrder(lessonId);
  }
  
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) return [];
  return shuffle(lesson.questions).slice(0, Math.min(count, lesson.questions.length));
}

// New function: Get 10 random questions in difficulty order
export function getRandomQuestionsInDifficultyOrder(lessonId: number): Question[] {
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) return [];
  
  // Group questions by difficulty
  const questionsByDifficulty: { [key: number]: Question[] } = {
    1: lesson.questions.filter(q => q.difficulty === 1),
    2: lesson.questions.filter(q => q.difficulty === 2),
    3: lesson.questions.filter(q => q.difficulty === 3)
  };
  
  const selectedQuestions: Question[] = [];
  
  // Select questions from each difficulty level
  // Try to get 4 from difficulty 1, 4 from difficulty 2, and 2 from difficulty 3
  const targetCounts = [4, 4, 2];
  
  for (let difficulty = 1; difficulty <= 3; difficulty++) {
    const availableQuestions = questionsByDifficulty[difficulty];
    const targetCount = targetCounts[difficulty - 1];
    
    if (availableQuestions.length > 0) {
      const shuffled = shuffle(availableQuestions);
      const count = Math.min(targetCount, availableQuestions.length);
      selectedQuestions.push(...shuffled.slice(0, count));
    }
  }
  
  // If we don't have enough questions, fill with random questions from any difficulty
  if (selectedQuestions.length < 10) {
    const remainingQuestions = lesson.questions.filter(q => 
      !selectedQuestions.some(selected => selected.id === q.id)
    );
    const additionalQuestions = shuffle(remainingQuestions).slice(0, 10 - selectedQuestions.length);
    selectedQuestions.push(...additionalQuestions);
  }
  
  // Sort by difficulty and return exactly 10 questions
  return selectedQuestions
    .sort((a, b) => a.difficulty - b.difficulty)
    .slice(0, 10);
}

// Get random questions from all lessons
export function getRandomQuestionsFromAllLessons(count: number = 10): Question[] {
  const allQuestions: Question[] = [];
  lessons.forEach(lesson => {
    lesson.questions.forEach(q => {
      allQuestions.push({ ...q, id: allQuestions.length + 1 });
    });
  });
  return shuffle(allQuestions).slice(0, Math.min(count, allQuestions.length));
}

// Get questions by difficulty
export function getQuestionsByDifficulty(difficulty: 1 | 2 | 3, count: number = 10): Question[] {
  const filteredQuestions: Question[] = [];
  lessons.forEach(lesson => {
    lesson.questions.forEach(q => {
      if (q.difficulty === difficulty) {
        filteredQuestions.push({ ...q, id: filteredQuestions.length + 1 });
      }
    });
  });
  return shuffle(filteredQuestions).slice(0, Math.min(count, filteredQuestions.length));
}

// Get lesson by ID
export function getLessonById(id: number): Lesson | undefined {
  return lessons.find(lesson => lesson.id === id);
}

// Get all lessons
export function getAllLessons(): Lesson[] {
  return lessons;
}

// Get questions from a specific lesson
export function getQuestionsByLessonId(lessonId: number): Question[] {
  const lesson = lessons.find(l => l.id === lessonId);
  return lesson ? lesson.questions : [];
}

// Export for compatibility
export { lessons as allLessons };
