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
        type: 'calculation',
        difficulty: 2,
        question: 'Dans un triangle rectangle, si l\'hypoténuse mesure 10 cm et un angle aigu mesure 30°, quelle est la longueur du côté adjacent à cet angle ?',
        correctAnswer: '8.66',
        explanation: 'cos(30°) = côté adjacent / hypoténuse, donc côté adjacent = 10 × cos(30°) ≈ 8.66',
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
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) return [];
  return shuffle(lesson.questions).slice(0, Math.min(count, lesson.questions.length));
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
