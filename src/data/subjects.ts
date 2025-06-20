import type { Question } from './lessons';

export type { Question };
export interface Lesson {
  id: number;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
  difficulty: 'easy' | 'medium' | 'hard';
  completed?: boolean;
  completedQuestions?: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  lessons: Lesson[];
}

// Unified subjects data
export const subjects: Subject[] = [
  {
    id: 'maths',
    name: 'Mathématiques',
    icon: '🔢',
    description: 'Algèbre, géométrie, statistiques',
    color: 'from-[#00baff] to-[#2ecc71]',
    lessons: [
      {
        id: 1,
        title: 'Fractions',
        description: 'Additionner et soustraire des fractions',
        icon: '🍕',
        difficulty: 'medium',
        questions: [
          {
            id: 1,
            question: 'Quelle est la somme de 1/4 + 1/4 ?',
            type: 'multiple-choice',
            difficulty: 2,
            options: ['1/2', '1/8', '2/4', '1/4'],
            correctAnswer: '1/2',
            explanation: '1/4 + 1/4 = 2/4 = 1/2',
            points: 10
          },
          {
            id: 2,
            question: 'Quelle est la différence de 3/4 - 1/4 ?',
            type: 'multiple-choice',
            difficulty: 2,
            options: ['1/2', '1/4', '2/4', '1/8'],
            correctAnswer: '1/2',
            explanation: '3/4 - 1/4 = 2/4 = 1/2',
            points: 10
          },
          {
            id: 3,
            question: 'Quelle fraction est équivalente à 2/4 ?',
            type: 'multiple-choice',
            difficulty: 1,
            options: ['1/2', '1/4', '3/4', '4/8'],
            correctAnswer: '1/2',
            explanation: '2/4 = 1/2 (simplification)',
            points: 10
          }
        ]
      },
      {
        id: 2,
        title: 'Équations du premier degré',
        description: 'Résoudre des équations simples',
        icon: '⚖️',
        difficulty: 'medium',
        questions: [
          {
            id: 4,
            question: 'Résoudre : x + 5 = 12',
            type: 'multiple-choice',
            difficulty: 2,
            options: ['7', '17', '6', '8'],
            correctAnswer: '7',
            explanation: 'x + 5 = 12 → x = 12 - 5 = 7',
            points: 10
          },
          {
            id: 5,
            question: 'Résoudre : 2x = 10',
            type: 'multiple-choice',
            difficulty: 2,
            options: ['5', '8', '12', '20'],
            correctAnswer: '5',
            explanation: '2x = 10 → x = 10/2 = 5',
            points: 10
          }
        ]
      },
      {
        id: 3,
        title: 'Géométrie - Périmètres',
        description: 'Calculer les périmètres des figures',
        icon: '📐',
        difficulty: 'easy',
        questions: [
          {
            id: 6,
            question: 'Quel est le périmètre d\'un carré de côté 5 cm ?',
            type: 'multiple-choice',
            difficulty: 1,
            options: ['20 cm', '25 cm', '10 cm', '15 cm'],
            correctAnswer: '20 cm',
            explanation: 'Périmètre = 4 × côté = 4 × 5 = 20 cm',
            points: 10
          },
          {
            id: 7,
            question: 'Quel est le périmètre d\'un rectangle de 6 cm × 4 cm ?',
            type: 'multiple-choice',
            difficulty: 1,
            options: ['20 cm', '24 cm', '10 cm', '12 cm'],
            correctAnswer: '20 cm',
            explanation: 'Périmètre = 2 × (L + l) = 2 × (6 + 4) = 20 cm',
            points: 10
          }
        ]
      }
    ]
  },
  {
    id: 'francais',
    name: 'Français',
    icon: '📝',
    description: 'Grammaire, littérature, expression',
    color: 'from-[#e74c3c] to-[#f39c12]',
    lessons: [
      {
        id: 1,
        title: 'Conjugaison - Présent',
        description: 'Conjuguer les verbes au présent',
        icon: '📚',
        difficulty: 'easy',
        questions: [
          {
            id: 1,
            question: 'Conjuguez "manger" à la 1ère personne du singulier',
            type: 'multiple-choice',
            difficulty: 1,
            options: ['je mange', 'je manges', 'je mangent', 'je mangons'],
            correctAnswer: 'je mange',
            explanation: 'Au présent, "manger" se conjugue : je mange, tu manges, il mange...',
            points: 10
          },
          {
            id: 2,
            question: 'Conjuguez "finir" à la 3ème personne du pluriel',
            type: 'multiple-choice',
            difficulty: 2,
            options: ['ils finissent', 'ils finissent', 'ils finissent', 'ils finissent'],
            correctAnswer: 'ils finissent',
            explanation: 'Au présent, "finir" se conjugue : je finis, tu finis, il finit, nous finissons, vous finissez, ils finissent',
            points: 10
          }
        ]
      },
      {
        id: 2,
        title: 'Grammaire - Les déterminants',
        description: 'Identifier et utiliser les déterminants',
        icon: '🔤',
        difficulty: 'medium',
        questions: [
          {
            id: 3,
            question: 'Quel type de déterminant est "mon" dans "mon livre" ?',
            type: 'multiple-choice',
            difficulty: 2,
            options: ['Article défini', 'Article indéfini', 'Déterminant possessif', 'Déterminant démonstratif'],
            correctAnswer: 'Déterminant possessif',
            explanation: '"Mon" est un déterminant possessif qui indique la possession',
            points: 10
          },
          {
            id: 4,
            question: 'Quel déterminant utiliser avec "livre" (masculin singulier) ?',
            type: 'multiple-choice',
            difficulty: 1,
            options: ['la', 'le', 'les', 'un'],
            correctAnswer: 'le',
            explanation: 'Avec un nom masculin singulier, on utilise "le"',
            points: 10
          }
        ]
      }
    ]
  },
  {
    id: 'histoire-geo',
    name: 'Histoire-Géographie',
    icon: '📚',
    description: 'Histoire moderne, géopolitique, mondialisation',
    color: 'from-[#ff6b6b] to-[#ee5a24]',
    lessons: [
      {
        id: 1,
        title: 'La Révolution française',
        description: 'Les événements de 1789',
        icon: '🏛️',
        difficulty: 'medium',
        questions: [
          {
            id: 1,
            question: 'En quelle année a eu lieu la prise de la Bastille ?',
            type: 'multiple-choice',
            difficulty: 1,
            options: ['1789', '1790', '1788', '1791'],
            correctAnswer: '1789',
            explanation: 'La prise de la Bastille a eu lieu le 14 juillet 1789',
            points: 10
          },
          {
            id: 2,
            question: 'Quel document a été adopté le 26 août 1789 ?',
            type: 'multiple-choice',
            difficulty: 2,
            options: ['La Constitution', 'La Déclaration des Droits de l\'Homme', 'Le Code civil', 'Le Concordat'],
            correctAnswer: 'La Déclaration des Droits de l\'Homme',
            explanation: 'La Déclaration des Droits de l\'Homme et du Citoyen a été adoptée le 26 août 1789',
            points: 10
          }
        ]
      },
      {
        id: 2,
        title: 'La mondialisation',
        description: 'Les échanges internationaux',
        icon: '🌍',
        difficulty: 'hard',
        questions: [
          {
            id: 3,
            question: 'Qu\'est-ce que la mondialisation ?',
            type: 'multiple-choice',
            difficulty: 3,
            options: ['Un phénomène local', 'L\'intensification des échanges internationaux', 'Un phénomène uniquement économique', 'Un phénomène récent'],
            correctAnswer: 'L\'intensification des échanges internationaux',
            explanation: 'La mondialisation est l\'intensification des échanges internationaux dans tous les domaines',
            points: 10
          }
        ]
      }
    ]
  },
  {
    id: 'sciences',
    name: 'Sciences',
    icon: '🧪',
    description: 'Physique, chimie, biologie, géologie',
    color: 'from-[#9b59b6] to-[#8e44ad]',
    lessons: [
      {
        id: 1,
        title: 'La photosynthèse',
        description: 'Comment les plantes produisent leur nourriture',
        icon: '🌱',
        difficulty: 'medium',
        questions: [
          {
            id: 1,
            question: 'Quels sont les ingrédients nécessaires à la photosynthèse ?',
            type: 'multiple-choice',
            difficulty: 2,
            options: ['Eau, CO2, lumière', 'Oxygène, glucose, eau', 'Azote, phosphore, potassium', 'Soleil, air, terre'],
            correctAnswer: 'Eau, CO2, lumière',
            explanation: 'La photosynthèse nécessite de l\'eau, du dioxyde de carbone et de la lumière',
            points: 10
          },
          {
            id: 2,
            question: 'Quel gaz est produit lors de la photosynthèse ?',
            type: 'multiple-choice',
            difficulty: 1,
            options: ['CO2', 'O2', 'N2', 'H2O'],
            correctAnswer: 'O2',
            explanation: 'La photosynthèse produit de l\'oxygène (O2)',
            points: 10
          }
        ]
      },
      {
        id: 2,
        title: 'Les états de la matière',
        description: 'Solide, liquide, gazeux',
        icon: '❄️',
        difficulty: 'easy',
        questions: [
          {
            id: 3,
            question: 'Quel est l\'état de l\'eau à 100°C ?',
            type: 'multiple-choice',
            difficulty: 1,
            options: ['Solide', 'Liquide', 'Gazeux', 'Plasma'],
            correctAnswer: 'Gazeux',
            explanation: 'À 100°C, l\'eau passe de l\'état liquide à l\'état gazeux (vapeur)',
            points: 10
          }
        ]
      }
    ]
  }
];

// Helper functions
export function getSubjectById(id: string): Subject | undefined {
  return subjects.find(subject => subject.id === id);
}

export function getAllSubjects(): Subject[] {
  return subjects;
}

export function getLessonById(subjectId: string, lessonId: number): Lesson | undefined {
  const subject = getSubjectById(subjectId);
  return subject?.lessons.find(lesson => lesson.id === lessonId);
}

export function getRandomQuestions(subjectId: string, lessonId: number, count: number): Question[] {
  const lesson = getLessonById(subjectId, lessonId);
  if (!lesson) return [];
  
  const shuffled = [...lesson.questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, lesson.questions.length));
}

export function getRandomQuestionsFromAllLessons(subjectId: string, count: number): Question[] {
  const subject = getSubjectById(subjectId);
  if (!subject) return [];
  
  const allQuestions = subject.lessons.flatMap(lesson => lesson.questions);
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, allQuestions.length));
}

export function getAllLessonsForSubject(subjectId: string): Lesson[] {
  const subject = getSubjectById(subjectId);
  return subject?.lessons || [];
} 