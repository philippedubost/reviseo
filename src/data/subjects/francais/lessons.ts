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
    title: 'Grammaire et Conjugaison',
    description: 'Classes grammaticales, temps verbaux',
    icon: '📝',
    difficulty: 'easy',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la classe grammaticale du mot "rapidement" ?',
        options: ['Adverbe', 'Adjectif', 'Nom', 'Verbe'],
        correctAnswer: 'Adverbe',
        explanation: '"Rapidement" est un adverbe car il modifie le verbe et se termine par -ment.',
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est le temps du verbe "nous aurons fini" ?',
        options: ['Futur simple', 'Futur antérieur', 'Conditionnel présent', 'Plus-que-parfait'],
        correctAnswer: 'Futur antérieur',
        explanation: '"Nous aurons fini" est au futur antérieur (avoir au futur + participe passé).',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la fonction de "le livre" dans "Je lis le livre" ?',
        options: ['Sujet', 'Complément d\'objet direct', 'Complément d\'objet indirect', 'Attribut'],
        correctAnswer: 'Complément d\'objet direct',
        explanation: '"Le livre" est COD car il répond à la question "quoi ?" après le verbe.',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel est le mode du verbe "qu\'il vienne" ?',
        options: ['Indicatif', 'Subjonctif', 'Conditionnel', 'Impératif'],
        correctAnswer: 'Subjonctif',
        explanation: '"Qu\'il vienne" est au subjonctif présent, utilisé après certaines conjonctions.',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la classe grammaticale de "beau" dans "un beau livre" ?',
        options: ['Adjectif qualificatif', 'Adverbe', 'Nom', 'Pronom'],
        correctAnswer: 'Adjectif qualificatif',
        explanation: '"Beau" est un adjectif qualificatif car il qualifie le nom "livre".',
        points: 10
      },
      {
        id: 6,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel est le temps du verbe "ils eurent terminé" ?',
        options: ['Passé simple', 'Passé antérieur', 'Plus-que-parfait', 'Futur antérieur'],
        correctAnswer: 'Passé antérieur',
        explanation: '"Ils eurent terminé" est au passé antérieur (avoir au passé simple + participe passé).',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la fonction de "à Paris" dans "Je vais à Paris" ?',
        options: ['Complément d\'objet direct', 'Complément d\'objet indirect', 'Complément circonstanciel de lieu', 'Attribut'],
        correctAnswer: 'Complément circonstanciel de lieu',
        explanation: '"À Paris" indique le lieu et répond à la question "où ?".',
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quel est le mode du verbe "sois" dans "Sois courageux" ?',
        options: ['Indicatif', 'Subjonctif', 'Conditionnel', 'Impératif'],
        correctAnswer: 'Impératif',
        explanation: '"Sois" est à l\'impératif présent, mode qui exprime un ordre ou une prière.',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la classe grammaticale de "lequel" ?',
        options: ['Pronom relatif', 'Pronom démonstratif', 'Pronom personnel', 'Pronom possessif'],
        correctAnswer: 'Pronom relatif',
        explanation: '"Lequel" est un pronom relatif qui introduit une proposition relative.',
        points: 10
      },
      {
        id: 10,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel est le temps du verbe "nous serions partis" ?',
        options: ['Futur simple', 'Conditionnel présent', 'Conditionnel passé', 'Plus-que-parfait'],
        correctAnswer: 'Conditionnel passé',
        explanation: '"Nous serions partis" est au conditionnel passé (être au conditionnel + participe passé).',
        points: 10
      }
    ]
  },
  {
    id: 2,
    title: 'Orthographe et Vocabulaire',
    description: 'Règles d\'orthographe, étymologie',
    icon: '✍️',
    difficulty: 'medium',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la bonne orthographe : "Il s\'est ... la jambe" ?',
        options: ['cassé', 'cassée', 'cassés', 'cassées'],
        correctAnswer: 'cassé',
        explanation: 'Avec "se", le participe passé s\'accorde avec le COD placé après le verbe.',
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la bonne orthographe : "Les enfants se sont ..." ?',
        options: ['amusé', 'amusés', 'amusée', 'amusées'],
        correctAnswer: 'amusés',
        explanation: 'Avec "se", le participe passé s\'accorde avec le sujet "les enfants" (masculin pluriel).',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la bonne orthographe : "Il a ... ses devoirs" ?',
        options: ['fini', 'finis', 'finie', 'finies'],
        correctAnswer: 'fini',
        explanation: 'Le participe passé avec "avoir" s\'accorde avec le COD placé après le verbe.',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la bonne orthographe : "Les fleurs que j\'ai ..." ?',
        options: ['cueilli', 'cueillies', 'cueillis', 'cueillie'],
        correctAnswer: 'cueillies',
        explanation: 'Le participe passé s\'accorde avec le COD "que" qui représente "les fleurs" (féminin pluriel).',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la bonne orthographe : "Il fait ..." ?',
        options: ['beau', 'beaux', 'belle', 'belles'],
        correctAnswer: 'beau',
        explanation: 'Avec "faire", l\'adjectif reste au masculin singulier.',
        points: 10
      },
      {
        id: 6,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la bonne orthographe : "Ils se sont ..." ?',
        options: ['téléphoné', 'téléphonés', 'téléphonée', 'téléphonées'],
        correctAnswer: 'téléphoné',
        explanation: 'Avec "se téléphoner", le participe passé reste invariable car il n\'y a pas d\'accord.',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quelle est la bonne orthographe : "Les lettres qu\'elle a ..." ?',
        options: ['écrit', 'écrite', 'écrites', 'écrits'],
        correctAnswer: 'écrites',
        explanation: 'Le participe passé s\'accorde avec le COD "que" qui représente "les lettres" (féminin pluriel).',
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la bonne orthographe : "Il a ... la table" ?',
        options: ['mis', 'mise', 'mises', 'mits'],
        correctAnswer: 'mise',
        explanation: 'Le participe passé s\'accorde avec le COD "la table" (féminin singulier).',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la bonne orthographe : "Les pommes que j\'ai ..." ?',
        options: ['mangé', 'mangée', 'mangées', 'mangés'],
        correctAnswer: 'mangées',
        explanation: 'Le participe passé s\'accorde avec le COD "que" qui représente "les pommes" (féminin pluriel).',
        points: 10
      },
      {
        id: 10,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la bonne orthographe : "Elle s\'est ..." ?',
        options: ['levé', 'levée', 'levés', 'levées'],
        correctAnswer: 'levée',
        explanation: 'Avec "se lever", le participe passé s\'accorde avec le sujet "elle" (féminin singulier).',
        points: 10
      }
    ]
  },
  {
    id: 3,
    title: 'Analyse Littéraire',
    description: 'Figures de style, genres littéraires',
    icon: '📖',
    difficulty: 'hard',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle figure de style est utilisée dans "Le soleil brille comme un diamant" ?',
        options: ['Métaphore', 'Comparaison', 'Personnification', 'Hyperbole'],
        correctAnswer: 'Comparaison',
        explanation: 'C\'est une comparaison car elle utilise "comme" pour comparer le soleil à un diamant.',
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle figure de style est utilisée dans "Le temps est un voleur" ?',
        options: ['Comparaison', 'Métaphore', 'Métonymie', 'Synecdoque'],
        correctAnswer: 'Métaphore',
        explanation: 'C\'est une métaphore car le temps est directement assimilé à un voleur sans mot de comparaison.',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel genre littéraire est caractérisé par des vers et des rimes ?',
        options: ['Poésie', 'Roman', 'Théâtre', 'Essai'],
        correctAnswer: 'Poésie',
        explanation: 'La poésie est caractérisée par l\'utilisation de vers et de rimes.',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle figure de style est utilisée dans "Il pleut des cordes" ?',
        options: ['Comparaison', 'Métaphore', 'Hyperbole', 'Litote'],
        correctAnswer: 'Métaphore',
        explanation: 'C\'est une métaphore car la pluie est assimilée à des cordes sans mot de comparaison.',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel genre littéraire raconte une histoire fictive en prose ?',
        options: ['Poésie', 'Roman', 'Théâtre', 'Biographie'],
        correctAnswer: 'Roman',
        explanation: 'Le roman est un genre littéraire qui raconte une histoire fictive en prose.',
        points: 10
      },
      {
        id: 6,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle figure de style est utilisée dans "Les murs ont des oreilles" ?',
        options: ['Personnification', 'Métaphore', 'Hyperbole', 'Antithèse'],
        correctAnswer: 'Personnification',
        explanation: 'C\'est une personnification car les murs sont dotés d\'une qualité humaine (des oreilles).',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quelle figure de style est utilisée dans "Ce n\'est pas mal" pour dire "c\'est bien" ?',
        options: ['Litote', 'Euphémisme', 'Antiphrase', 'Oxymore'],
        correctAnswer: 'Litote',
        explanation: 'C\'est une litote car on dit moins pour faire entendre plus.',
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel genre littéraire est destiné à être joué sur scène ?',
        options: ['Roman', 'Poésie', 'Théâtre', 'Nouvelle'],
        correctAnswer: 'Théâtre',
        explanation: 'Le théâtre est un genre littéraire destiné à être joué sur scène.',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle figure de style est utilisée dans "Il est géant" pour dire "il est grand" ?',
        options: ['Comparaison', 'Métaphore', 'Hyperbole', 'Personnification'],
        correctAnswer: 'Hyperbole',
        explanation: 'C\'est une hyperbole car on exagère en utilisant "géant" pour "grand".',
        points: 10
      },
      {
        id: 10,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle figure de style est utilisée dans "Un silence assourdissant" ?',
        options: ['Oxymore', 'Antithèse', 'Paradoxe', 'Contradiction'],
        correctAnswer: 'Oxymore',
        explanation: 'C\'est un oxymore car on associe deux termes contradictoires : silence et assourdissant.',
        points: 10
      }
    ]
  },
  {
    id: 4,
    title: 'Compréhension de Texte',
    description: 'Lecture analytique, argumentation',
    icon: '🔍',
    difficulty: 'medium',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Qu\'est-ce qu\'un argument ?',
        options: ['Une opinion', 'Un fait qui soutient une thèse', 'Une conclusion', 'Une question'],
        correctAnswer: 'Un fait qui soutient une thèse',
        explanation: 'Un argument est un fait, une preuve ou un raisonnement qui soutient une thèse.',
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Qu\'est-ce qu\'un connecteur logique ?',
        options: ['Un mot qui relie des idées', 'Un verbe', 'Un adjectif', 'Un nom'],
        correctAnswer: 'Un mot qui relie des idées',
        explanation: 'Un connecteur logique est un mot ou une expression qui relie des idées et indique leur relation.',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Qu\'est-ce qu\'une thèse ?',
        options: ['Une question', 'Une opinion défendue', 'Un fait', 'Une conclusion'],
        correctAnswer: 'Une opinion défendue',
        explanation: 'Une thèse est l\'opinion ou la position que l\'on défend dans un texte argumentatif.',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel type de texte vise à convaincre le lecteur ?',
        options: ['Texte narratif', 'Texte argumentatif', 'Texte descriptif', 'Texte informatif'],
        correctAnswer: 'Texte argumentatif',
        explanation: 'Le texte argumentatif vise à convaincre le lecteur en défendant une thèse.',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Qu\'est-ce qu\'un contre-argument ?',
        options: ['Un argument qui soutient la thèse', 'Un argument qui s\'oppose à la thèse', 'Une conclusion', 'Une question'],
        correctAnswer: 'Un argument qui s\'oppose à la thèse',
        explanation: 'Un contre-argument est un argument qui s\'oppose à la thèse défendue.',
        points: 10
      },
      {
        id: 6,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel connecteur exprime l\'opposition ?',
        options: ['Donc', 'Mais', 'Car', 'Ainsi'],
        correctAnswer: 'Mais',
        explanation: '"Mais" est un connecteur qui exprime l\'opposition entre deux idées.',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel connecteur exprime la cause ?',
        options: ['Donc', 'Mais', 'Car', 'Ainsi'],
        correctAnswer: 'Car',
        explanation: '"Car" est un connecteur qui exprime la cause ou l\'explication.',
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Qu\'est-ce qu\'une conclusion ?',
        options: ['Une question', 'Un argument', 'Un fait', 'Un bilan final'],
        correctAnswer: 'Un bilan final',
        explanation: 'Une conclusion est un bilan final qui reprend les points essentiels du raisonnement.',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel connecteur exprime la conséquence ?',
        options: ['Car', 'Mais', 'Donc', 'Cependant'],
        correctAnswer: 'Donc',
        explanation: '"Donc" est un connecteur qui exprime la conséquence ou la conclusion.',
        points: 10
      },
      {
        id: 10,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Qu\'est-ce qu\'un exemple ?',
        options: ['Un argument', 'Un cas concret qui illustre', 'Une conclusion', 'Une question'],
        correctAnswer: 'Un cas concret qui illustre',
        explanation: 'Un exemple est un cas concret qui illustre et soutient un argument.',
        points: 10
      }
    ]
  },
  {
    id: 5,
    title: 'Expression Écrite',
    description: 'Rédaction, cohérence textuelle',
    icon: '✏️',
    difficulty: 'medium',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Qu\'est-ce qu\'un paragraphe ?',
        options: ['Une phrase', 'Un ensemble de phrases sur un même thème', 'Un mot', 'Une ponctuation'],
        correctAnswer: 'Un ensemble de phrases sur un même thème',
        explanation: 'Un paragraphe est un ensemble de phrases qui développent un même thème ou une même idée.',
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Qu\'est-ce que la cohérence textuelle ?',
        options: ['La longueur du texte', 'L\'organisation logique des idées', 'La ponctuation', 'L\'orthographe'],
        correctAnswer: 'L\'organisation logique des idées',
        explanation: 'La cohérence textuelle est l\'organisation logique des idées dans un texte.',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Qu\'est-ce qu\'une introduction ?',
        options: ['La fin du texte', 'Le début qui présente le sujet', 'Le développement', 'La conclusion'],
        correctAnswer: 'Le début qui présente le sujet',
        explanation: 'L\'introduction est le début du texte qui présente le sujet et annonce le plan.',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Qu\'est-ce qu\'un développement ?',
        options: ['L\'introduction', 'La partie principale du texte', 'La conclusion', 'Le titre'],
        correctAnswer: 'La partie principale du texte',
        explanation: 'Le développement est la partie principale du texte où on développe les arguments.',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Qu\'est-ce qu\'une transition ?',
        options: ['Une phrase de liaison', 'Une conclusion', 'Une introduction', 'Un titre'],
        correctAnswer: 'Une phrase de liaison',
        explanation: 'Une transition est une phrase de liaison qui permet de passer d\'une idée à une autre.',
        points: 10
      },
      {
        id: 6,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Qu\'est-ce que la progression thématique ?',
        options: ['La longueur du texte', 'L\'évolution du thème dans le texte', 'La ponctuation', 'L\'orthographe'],
        correctAnswer: 'L\'évolution du thème dans le texte',
        explanation: 'La progression thématique est l\'évolution du thème principal dans le texte.',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Qu\'est-ce qu\'un connecteur temporel ?',
        options: ['Un mot qui indique le temps', 'Un verbe', 'Un adjectif', 'Un nom'],
        correctAnswer: 'Un mot qui indique le temps',
        explanation: 'Un connecteur temporel est un mot qui indique le temps ou l\'ordre chronologique.',
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Qu\'est-ce qu\'une reprise anaphorique ?',
        options: ['Une répétition', 'Le retour sur un élément précédent', 'Une conclusion', 'Une introduction'],
        correctAnswer: 'Le retour sur un élément précédent',
        explanation: 'Une reprise anaphorique est le retour sur un élément mentionné précédemment dans le texte.',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Qu\'est-ce qu\'un plan ?',
        options: ['Le titre', 'L\'organisation des idées', 'La conclusion', 'L\'introduction'],
        correctAnswer: 'L\'organisation des idées',
        explanation: 'Un plan est l\'organisation logique des idées dans un texte.',
        points: 10
      },
      {
        id: 10,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Qu\'est-ce que l\'enchaînement logique ?',
        options: ['La longueur du texte', 'La liaison entre les idées', 'La ponctuation', 'L\'orthographe'],
        correctAnswer: 'La liaison entre les idées',
        explanation: 'L\'enchaînement logique est la liaison cohérente entre les différentes idées du texte.',
        points: 10
      }
    ]
  },
  {
    id: 6,
    title: 'Culture Littéraire',
    description: 'Mouvements littéraires, auteurs',
    icon: '🎭',
    difficulty: 'hard',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel mouvement littéraire du XIXe siècle privilégie les sentiments ?',
        options: ['Le classicisme', 'Le romantisme', 'Le réalisme', 'Le naturalisme'],
        correctAnswer: 'Le romantisme',
        explanation: 'Le romantisme privilégie l\'expression des sentiments et l\'imagination.',
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel auteur a écrit "Les Misérables" ?',
        options: ['Victor Hugo', 'Émile Zola', 'Gustave Flaubert', 'Honoré de Balzac'],
        correctAnswer: 'Victor Hugo',
        explanation: 'Victor Hugo est l\'auteur du roman "Les Misérables" (1862).',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel mouvement littéraire du XIXe siècle décrit la réalité sociale ?',
        options: ['Le romantisme', 'Le réalisme', 'Le classicisme', 'Le symbolisme'],
        correctAnswer: 'Le réalisme',
        explanation: 'Le réalisme décrit la réalité sociale et quotidienne de manière objective.',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel auteur a écrit "Madame Bovary" ?',
        options: ['Émile Zola', 'Gustave Flaubert', 'Victor Hugo', 'Honoré de Balzac'],
        correctAnswer: 'Gustave Flaubert',
        explanation: 'Gustave Flaubert est l\'auteur du roman "Madame Bovary" (1857).',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel siècle correspond au classicisme ?',
        options: ['XVIe siècle', 'XVIIe siècle', 'XVIIIe siècle', 'XIXe siècle'],
        correctAnswer: 'XVIIe siècle',
        explanation: 'Le classicisme correspond au XVIIe siècle, notamment sous le règne de Louis XIV.',
        points: 10
      },
      {
        id: 6,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel auteur a écrit "Le Petit Prince" ?',
        options: ['Antoine de Saint-Exupéry', 'Albert Camus', 'Jean-Paul Sartre', 'André Gide'],
        correctAnswer: 'Antoine de Saint-Exupéry',
        explanation: 'Antoine de Saint-Exupéry est l\'auteur du conte philosophique "Le Petit Prince" (1943).',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quel mouvement littéraire du XXe siècle explore l\'inconscient ?',
        options: ['Le surréalisme', 'L\'existentialisme', 'Le nouveau roman', 'Le théâtre de l\'absurde'],
        correctAnswer: 'Le surréalisme',
        explanation: 'Le surréalisme explore l\'inconscient et les rêves, notamment avec André Breton.',
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel auteur a écrit "L\'Étranger" ?',
        options: ['Jean-Paul Sartre', 'Albert Camus', 'André Gide', 'Marcel Proust'],
        correctAnswer: 'Albert Camus',
        explanation: 'Albert Camus est l\'auteur du roman "L\'Étranger" (1942).',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel siècle correspond aux Lumières ?',
        options: ['XVIe siècle', 'XVIIe siècle', 'XVIIIe siècle', 'XIXe siècle'],
        correctAnswer: 'XVIIIe siècle',
        explanation: 'Le siècle des Lumières correspond au XVIIIe siècle, avec Voltaire, Rousseau, Diderot.',
        points: 10
      },
      {
        id: 10,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel auteur a écrit "Les Fleurs du Mal" ?',
        options: ['Charles Baudelaire', 'Arthur Rimbaud', 'Paul Verlaine', 'Stéphane Mallarmé'],
        correctAnswer: 'Charles Baudelaire',
        explanation: 'Charles Baudelaire est l\'auteur du recueil de poèmes "Les Fleurs du Mal" (1857).',
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