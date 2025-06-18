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
    title: 'La Première Guerre mondiale',
    description: '1914-1918 : Guerre totale et bouleversements',
    icon: '⚔️',
    difficulty: 'medium',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'En quelle année a commencé la Première Guerre mondiale ?',
        options: ['1914', '1915', '1916', '1917'],
        correctAnswer: '1914',
        explanation: 'La Première Guerre mondiale a commencé en 1914 avec l\'assassinat de l\'archiduc François-Ferdinand à Sarajevo.',
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel événement a déclenché la Première Guerre mondiale ?',
        options: ['L\'assassinat de l\'archiduc François-Ferdinand', 'La bataille de Verdun', 'La révolution russe', 'Le traité de Versailles'],
        correctAnswer: 'L\'assassinat de l\'archiduc François-Ferdinand',
        explanation: 'L\'assassinat de l\'archiduc François-Ferdinand à Sarajevo le 28 juin 1914 a déclenché la Première Guerre mondiale.',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle bataille symbolise la guerre de position en 1916 ?',
        options: ['La bataille de la Marne', 'La bataille de Verdun', 'La bataille de la Somme', 'La bataille de Tannenberg'],
        correctAnswer: 'La bataille de Verdun',
        explanation: 'La bataille de Verdun (février-décembre 1916) symbolise la guerre de position avec ses tranchées et ses pertes massives.',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel traité met fin à la Première Guerre mondiale ?',
        options: ['Le traité de Versailles', 'Le traité de Saint-Germain', 'Le traité de Trianon', 'Le traité de Sèvres'],
        correctAnswer: 'Le traité de Versailles',
        explanation: 'Le traité de Versailles, signé le 28 juin 1919, met officiellement fin à la Première Guerre mondiale.',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quels sont les deux camps qui s\'opposent pendant la guerre ?',
        options: ['Alliés vs Empires centraux', 'Axe vs Alliés', 'OTAN vs Pacte de Varsovie', 'Entente vs Triple Alliance'],
        correctAnswer: 'Alliés vs Empires centraux',
        explanation: 'Les Alliés (France, Royaume-Uni, Russie, puis États-Unis) s\'opposent aux Empires centraux (Allemagne, Autriche-Hongrie, Empire ottoman).',
        points: 10
      },
      {
        id: 6,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel pays entre en guerre en 1917 et change le cours du conflit ?',
        options: ['Les États-Unis', 'L\'Italie', 'Le Japon', 'La Chine'],
        correctAnswer: 'Les États-Unis',
        explanation: 'Les États-Unis entrent en guerre en 1917 aux côtés des Alliés, apportant un soutien militaire et économique décisif.',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quelle révolution éclate en Russie en 1917 ?',
        options: ['La Révolution française', 'La Révolution bolchevique', 'La Révolution industrielle', 'La Révolution américaine'],
        correctAnswer: 'La Révolution bolchevique',
        explanation: 'La Révolution bolchevique de 1917 en Russie, menée par Lénine, renverse le tsar et instaure un régime communiste.',
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Combien de soldats français sont morts pendant la Première Guerre mondiale ?',
        options: ['Environ 1,4 million', 'Environ 2 millions', 'Environ 500 000', 'Environ 3 millions'],
        correctAnswer: 'Environ 1,4 million',
        explanation: 'Environ 1,4 million de soldats français sont morts pendant la Première Guerre mondiale, soit près de 10% de la population masculine.',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel type de guerre caractérise la Première Guerre mondiale ?',
        options: ['Guerre de mouvement', 'Guerre de position', 'Guerre froide', 'Guerre civile'],
        correctAnswer: 'Guerre de position',
        explanation: 'La Première Guerre mondiale est caractérisée par la guerre de position avec les tranchées et les fronts stabilisés.',
        points: 10
      },
      {
        id: 10,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel est le surnom donné aux soldats français de la Première Guerre mondiale ?',
        options: ['Les Poilus', 'Les Bleus', 'Les Braves', 'Les Héros'],
        correctAnswer: 'Les Poilus',
        explanation: 'Les soldats français de la Première Guerre mondiale sont surnommés "les Poilus" en raison de leur barbe non rasée dans les tranchées.',
        points: 10
      }
    ]
  },
  {
    id: 2,
    title: 'La Seconde Guerre mondiale',
    description: '1939-1945 : Guerre mondiale et génocide',
    icon: '🕊️',
    difficulty: 'hard',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'En quelle année a commencé la Seconde Guerre mondiale ?',
        options: ['1939', '1940', '1941', '1942'],
        correctAnswer: '1939',
        explanation: 'La Seconde Guerre mondiale a commencé le 1er septembre 1939 avec l\'invasion de la Pologne par l\'Allemagne nazie.',
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel traité de paix de 1919 a contribué à la montée du nazisme ?',
        options: ['Le traité de Versailles', 'Le traité de Saint-Germain', 'Le traité de Trianon', 'Le traité de Sèvres'],
        correctAnswer: 'Le traité de Versailles',
        explanation: 'Le traité de Versailles, jugé trop dur par les Allemands, a contribué à la montée du nazisme et d\'Hitler.',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel événement marque l\'entrée en guerre des États-Unis ?',
        options: ['L\'attaque de Pearl Harbor', 'Le débarquement de Normandie', 'La bataille de Stalingrad', 'La capitulation de l\'Allemagne'],
        correctAnswer: 'L\'attaque de Pearl Harbor',
        explanation: 'L\'attaque japonaise sur Pearl Harbor le 7 décembre 1941 provoque l\'entrée en guerre des États-Unis.',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel est le nom du débarquement allié en Normandie ?',
        options: ['Opération Overlord', 'Opération Barbarossa', 'Opération Torch', 'Opération Market Garden'],
        correctAnswer: 'Opération Overlord',
        explanation: 'L\'opération Overlord est le nom donné au débarquement allié en Normandie le 6 juin 1944.',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel régime politique dirige l\'Allemagne pendant la guerre ?',
        options: ['Le nazisme', 'Le communisme', 'La démocratie', 'La monarchie'],
        correctAnswer: 'Le nazisme',
        explanation: 'L\'Allemagne est dirigée par le régime nazi d\'Adolf Hitler pendant la Seconde Guerre mondiale.',
        points: 10
      },
      {
        id: 6,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quel génocide a été perpétré par les nazis pendant la guerre ?',
        options: ['La Shoah', 'Le génocide arménien', 'Le génocide rwandais', 'Le génocide cambodgien'],
        correctAnswer: 'La Shoah',
        explanation: 'La Shoah est le génocide des Juifs d\'Europe perpétré par les nazis, causant la mort de 6 millions de personnes.',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel pays capitule le premier en 1945 ?',
        options: ['L\'Allemagne', 'Le Japon', 'L\'Italie', 'La France'],
        correctAnswer: 'L\'Allemagne',
        explanation: 'L\'Allemagne capitule le 8 mai 1945, marquant la fin de la guerre en Europe.',
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel événement met fin à la guerre dans le Pacifique ?',
        options: ['Les bombes atomiques sur Hiroshima et Nagasaki', 'La bataille de Midway', 'L\'attaque de Pearl Harbor', 'La capitulation du Japon'],
        correctAnswer: 'Les bombes atomiques sur Hiroshima et Nagasaki',
        explanation: 'Les bombes atomiques larguées sur Hiroshima et Nagasaki en août 1945 provoquent la capitulation du Japon.',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est le nom du chef de la France libre ?',
        options: ['Charles de Gaulle', 'Philippe Pétain', 'Georges Clemenceau', 'Léon Blum'],
        correctAnswer: 'Charles de Gaulle',
        explanation: 'Charles de Gaulle est le chef de la France libre qui résiste à l\'occupation allemande depuis Londres.',
        points: 10
      },
      {
        id: 10,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel est le nom du régime français qui collabore avec l\'Allemagne ?',
        options: ['Le régime de Vichy', 'La République', 'La Commune', 'L\'Empire'],
        correctAnswer: 'Le régime de Vichy',
        explanation: 'Le régime de Vichy, dirigé par Philippe Pétain, collabore avec l\'Allemagne nazie pendant l\'occupation.',
        points: 10
      }
    ]
  },
  {
    id: 3,
    title: 'La Guerre froide',
    description: '1947-1991 : Opposition Est-Ouest',
    icon: '❄️',
    difficulty: 'medium',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quels sont les deux blocs qui s\'opposent pendant la Guerre froide ?',
        options: ['Est et Ouest', 'Nord et Sud', 'Est et Sud', 'Ouest et Nord'],
        correctAnswer: 'Est et Ouest',
        explanation: 'La Guerre froide oppose le bloc de l\'Est (URSS et pays communistes) au bloc de l\'Ouest (États-Unis et démocraties).',
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel discours marque le début de la Guerre froide en 1947 ?',
        options: ['Le discours de Fulton', 'Le discours de Truman', 'Le discours de Churchill', 'Le discours de Staline'],
        correctAnswer: 'Le discours de Truman',
        explanation: 'Le discours de Truman en 1947 annonce la doctrine de l\'endiguement et marque le début de la Guerre froide.',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel événement symbolise la division de l\'Europe en 1961 ?',
        options: ['La construction du mur de Berlin', 'Le blocus de Berlin', 'La crise de Cuba', 'La guerre de Corée'],
        correctAnswer: 'La construction du mur de Berlin',
        explanation: 'La construction du mur de Berlin en 1961 symbolise la division de l\'Europe entre Est et Ouest.',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle crise en 1962 a failli déclencher une guerre nucléaire ?',
        options: ['La crise de Cuba', 'La crise de Berlin', 'La guerre de Corée', 'La guerre du Vietnam'],
        correctAnswer: 'La crise de Cuba',
        explanation: 'La crise de Cuba en 1962, avec l\'installation de missiles soviétiques, a failli déclencher une guerre nucléaire.',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est le nom de l\'alliance militaire occidentale créée en 1949 ?',
        options: ['L\'OTAN', 'Le Pacte de Varsovie', 'L\'ONU', 'L\'UE'],
        correctAnswer: 'L\'OTAN',
        explanation: 'L\'OTAN (Organisation du traité de l\'Atlantique Nord) est créée en 1949 pour défendre l\'Europe occidentale.',
        points: 10
      },
      {
        id: 6,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel événement marque la fin de la Guerre froide en 1989 ?',
        options: ['La chute du mur de Berlin', 'La dissolution de l\'URSS', 'La fin de la guerre du Vietnam', 'La crise de Cuba'],
        correctAnswer: 'La chute du mur de Berlin',
        explanation: 'La chute du mur de Berlin le 9 novembre 1989 symbolise la fin de la Guerre froide.',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel président américain a mis fin à la Guerre froide ?',
        options: ['Ronald Reagan', 'John F. Kennedy', 'Richard Nixon', 'Jimmy Carter'],
        correctAnswer: 'Ronald Reagan',
        explanation: 'Ronald Reagan, président américain de 1981 à 1989, a contribué à mettre fin à la Guerre froide.',
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quel concept américain vise à empêcher l\'expansion du communisme ?',
        options: ['L\'endiguement', 'La coexistence pacifique', 'La détente', 'La glasnost'],
        correctAnswer: 'L\'endiguement',
        explanation: 'L\'endiguement (containment) est la politique américaine visant à empêcher l\'expansion du communisme.',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est le nom de l\'alliance militaire soviétique créée en 1955 ?',
        options: ['Le Pacte de Varsovie', 'L\'OTAN', 'L\'ONU', 'L\'UE'],
        correctAnswer: 'Le Pacte de Varsovie',
        explanation: 'Le Pacte de Varsovie est l\'alliance militaire créée par l\'URSS en 1955 en réponse à l\'OTAN.',
        points: 10
      },
      {
        id: 10,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel événement marque la fin définitive de la Guerre froide en 1991 ?',
        options: ['La dissolution de l\'URSS', 'La chute du mur de Berlin', 'La fin de la guerre du Vietnam', 'La crise de Cuba'],
        correctAnswer: 'La dissolution de l\'URSS',
        explanation: 'La dissolution de l\'URSS en décembre 1991 marque la fin définitive de la Guerre froide.',
        points: 10
      }
    ]
  },
  {
    id: 4,
    title: 'La décolonisation',
    description: '1945-1975 : Indépendances des colonies',
    icon: '🌍',
    difficulty: 'medium',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel pays obtient son indépendance en 1947 après une lutte non-violente ?',
        options: ['L\'Inde', 'L\'Algérie', 'Le Vietnam', 'Le Maroc'],
        correctAnswer: 'L\'Inde',
        explanation: 'L\'Inde obtient son indépendance en 1947 grâce à la lutte non-violente menée par Gandhi.',
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel leader indien a mené la lutte pour l\'indépendance ?',
        options: ['Gandhi', 'Nehru', 'Jinnah', 'Tagore'],
        correctAnswer: 'Gandhi',
        explanation: 'Gandhi a mené la lutte pour l\'indépendance de l\'Inde par la non-violence et la désobéissance civile.',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel pays africain obtient son indépendance en 1957 ?',
        options: ['Le Ghana', 'Le Nigeria', 'Le Kenya', 'L\'Algérie'],
        correctAnswer: 'Le Ghana',
        explanation: 'Le Ghana (ex-Gold Coast) est le premier pays d\'Afrique subsaharienne à obtenir son indépendance en 1957.',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel conflit oppose la France à l\'Algérie de 1954 à 1962 ?',
        options: ['La guerre d\'Algérie', 'La guerre d\'Indochine', 'La guerre de Suez', 'La guerre du Vietnam'],
        correctAnswer: 'La guerre d\'Algérie',
        explanation: 'La guerre d\'Algérie oppose la France aux nationalistes algériens de 1954 à 1962.',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel président français accorde l\'indépendance à l\'Algérie ?',
        options: ['Charles de Gaulle', 'François Mitterrand', 'Georges Pompidou', 'Valéry Giscard d\'Estaing'],
        correctAnswer: 'Charles de Gaulle',
        explanation: 'Charles de Gaulle accorde l\'indépendance à l\'Algérie en 1962 après les accords d\'Évian.',
        points: 10
      },
      {
        id: 6,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel pays obtient son indépendance en 1960 ?',
        options: ['Le Congo', 'Le Sénégal', 'Le Mali', 'Tous ces pays'],
        correctAnswer: 'Tous ces pays',
        explanation: 'En 1960, de nombreux pays africains obtiennent leur indépendance, dont le Congo, le Sénégal et le Mali.',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel leader congolais est assassiné en 1961 ?',
        options: ['Patrice Lumumba', 'Mobutu Sese Seko', 'Joseph Kasa-Vubu', 'Laurent-Désiré Kabila'],
        correctAnswer: 'Patrice Lumumba',
        explanation: 'Patrice Lumumba, premier ministre du Congo indépendant, est assassiné en 1961.',
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quel concept défend l\'unité africaine après les indépendances ?',
        options: ['Le panafricanisme', 'Le nationalisme', 'Le socialisme', 'Le capitalisme'],
        correctAnswer: 'Le panafricanisme',
        explanation: 'Le panafricanisme défend l\'unité africaine et la solidarité entre les pays africains.',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel pays asiatique obtient son indépendance en 1949 ?',
        options: ['L\'Indonésie', 'La Malaisie', 'Les Philippines', 'La Birmanie'],
        correctAnswer: 'L\'Indonésie',
        explanation: 'L\'Indonésie obtient son indépendance des Pays-Bas en 1949 après une guerre d\'indépendance.',
        points: 10
      },
      {
        id: 10,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel leader indonésien a mené la lutte pour l\'indépendance ?',
        options: ['Sukarno', 'Suharto', 'Megawati', 'Jokowi'],
        correctAnswer: 'Sukarno',
        explanation: 'Sukarno a mené la lutte pour l\'indépendance de l\'Indonésie et en est devenu le premier président.',
        points: 10
      }
    ]
  },
  {
    id: 5,
    title: 'La construction européenne',
    description: '1950-2000 : De la CECA à l\'Union européenne',
    icon: '🇪🇺',
    difficulty: 'easy',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel traité crée la CECA en 1951 ?',
        options: ['Le traité de Paris', 'Le traité de Rome', 'Le traité de Maastricht', 'Le traité de Lisbonne'],
        correctAnswer: 'Le traité de Paris',
        explanation: 'Le traité de Paris de 1951 crée la CECA (Communauté européenne du charbon et de l\'acier).',
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quels sont les six pays fondateurs de la CECA ?',
        options: ['France, Allemagne, Italie, Belgique, Pays-Bas, Luxembourg', 'France, Allemagne, Royaume-Uni, Espagne, Portugal, Grèce', 'France, Allemagne, Italie, Espagne, Portugal, Grèce', 'France, Allemagne, Italie, Belgique, Espagne, Portugal'],
        correctAnswer: 'France, Allemagne, Italie, Belgique, Pays-Bas, Luxembourg',
        explanation: 'Les six pays fondateurs de la CECA sont la France, l\'Allemagne, l\'Italie, la Belgique, les Pays-Bas et le Luxembourg.',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel traité crée la CEE en 1957 ?',
        options: ['Le traité de Rome', 'Le traité de Paris', 'Le traité de Maastricht', 'Le traité de Lisbonne'],
        correctAnswer: 'Le traité de Rome',
        explanation: 'Le traité de Rome de 1957 crée la CEE (Communauté économique européenne).',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel homme politique français est considéré comme un des pères de l\'Europe ?',
        options: ['Jean Monnet', 'Robert Schuman', 'Charles de Gaulle', 'François Mitterrand'],
        correctAnswer: 'Robert Schuman',
        explanation: 'Robert Schuman, ministre français des Affaires étrangères, est considéré comme un des pères de l\'Europe.',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel traité transforme la CEE en Union européenne ?',
        options: ['Le traité de Maastricht', 'Le traité de Rome', 'Le traité de Paris', 'Le traité de Lisbonne'],
        correctAnswer: 'Le traité de Maastricht',
        explanation: 'Le traité de Maastricht de 1992 transforme la CEE en Union européenne.',
        points: 10
      },
      {
        id: 6,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel pays rejoint l\'Union européenne en 1995 ?',
        options: ['La Suède', 'La Finlande', 'L\'Autriche', 'Tous ces pays'],
        correctAnswer: 'Tous ces pays',
        explanation: 'La Suède, la Finlande et l\'Autriche rejoignent l\'Union européenne en 1995.',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel traité introduit l\'euro en 1999 ?',
        options: ['Le traité de Maastricht', 'Le traité d\'Amsterdam', 'Le traité de Nice', 'Le traité de Lisbonne'],
        correctAnswer: 'Le traité de Maastricht',
        explanation: 'Le traité de Maastricht de 1992 prévoit la création de l\'euro, qui est introduit en 1999.',
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'En quelle année l\'euro devient-il la monnaie fiduciaire ?',
        options: ['2002', '1999', '2000', '2001'],
        correctAnswer: '2002',
        explanation: 'L\'euro devient la monnaie fiduciaire (billets et pièces) en 2002 dans les pays de la zone euro.',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel élargissement de l\'UE est le plus important en 2004 ?',
        options: ['L\'élargissement à l\'Est', 'L\'élargissement au Sud', 'L\'élargissement au Nord', 'L\'élargissement à l\'Ouest'],
        correctAnswer: 'L\'élargissement à l\'Est',
        explanation: 'L\'élargissement de 2004 à l\'Est est le plus important, avec l\'adhésion de 10 nouveaux pays.',
        points: 10
      },
      {
        id: 10,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel traité réforme l\'Union européenne en 2007 ?',
        options: ['Le traité de Lisbonne', 'Le traité de Maastricht', 'Le traité de Rome', 'Le traité de Paris'],
        correctAnswer: 'Le traité de Lisbonne',
        explanation: 'Le traité de Lisbonne de 2007 réforme l\'Union européenne et ses institutions.',
        points: 10
      }
    ]
  },
  {
    id: 6,
    title: 'La mondialisation',
    description: '1980-2000 : Échanges et interdépendances',
    icon: '🌐',
    difficulty: 'easy',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Qu\'est-ce que la mondialisation ?',
        options: ['L\'accélération des échanges mondiaux', 'La fin des frontières', 'L\'uniformisation culturelle', 'La domination américaine'],
        correctAnswer: 'L\'accélération des échanges mondiaux',
        explanation: 'La mondialisation est l\'accélération des échanges de biens, services, capitaux et informations à l\'échelle mondiale.',
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel accord commercial crée l\'OMC en 1995 ?',
        options: ['L\'accord de Marrakech', 'L\'accord de Tokyo', 'L\'accord de Doha', 'L\'accord de Genève'],
        correctAnswer: 'L\'accord de Marrakech',
        explanation: 'L\'accord de Marrakech de 1994 crée l\'OMC (Organisation mondiale du commerce) en 1995.',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel phénomène caractérise la mondialisation économique ?',
        options: ['La délocalisation', 'La relocalisation', 'La nationalisation', 'La privatisation'],
        correctAnswer: 'La délocalisation',
        explanation: 'La délocalisation, transfert d\'activités vers des pays à bas coûts, caractérise la mondialisation économique.',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel pays devient l\'"atelier du monde" dans les années 2000 ?',
        options: ['La Chine', 'L\'Inde', 'Le Brésil', 'La Russie'],
        correctAnswer: 'La Chine',
        explanation: 'La Chine devient l\'"atelier du monde" dans les années 2000 grâce à sa main-d\'œuvre bon marché.',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel réseau révolutionne les communications dans les années 1990 ?',
        options: ['Internet', 'Le téléphone', 'La télévision', 'La radio'],
        correctAnswer: 'Internet',
        explanation: 'Internet révolutionne les communications dans les années 1990 et accélère la mondialisation.',
        points: 10
      },
      {
        id: 6,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel phénomène critique la mondialisation ?',
        options: ['L\'altermondialisme', 'Le libéralisme', 'Le capitalisme', 'Le socialisme'],
        correctAnswer: 'L\'altermondialisme',
        explanation: 'L\'altermondialisme critique la mondialisation libérale et propose une mondialisation plus juste.',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel événement marque la fin de la Guerre froide et accélère la mondialisation ?',
        options: ['La chute du mur de Berlin', 'La dissolution de l\'URSS', 'La fin de la guerre du Vietnam', 'La crise de Cuba'],
        correctAnswer: 'La dissolution de l\'URSS',
        explanation: 'La dissolution de l\'URSS en 1991 marque la fin de la Guerre froide et accélère la mondialisation.',
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel type d\'entreprise domine l\'économie mondialisée ?',
        options: ['Les multinationales', 'Les PME', 'Les coopératives', 'Les entreprises publiques'],
        correctAnswer: 'Les multinationales',
        explanation: 'Les multinationales (ou transnationales) dominent l\'économie mondialisée.',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel phénomène culturel accompagne la mondialisation ?',
        options: ['L\'uniformisation culturelle', 'La diversité culturelle', 'Le nationalisme', 'Le régionalisme'],
        correctAnswer: 'L\'uniformisation culturelle',
        explanation: 'L\'uniformisation culturelle, notamment par l\'américanisation, accompagne la mondialisation.',
        points: 10
      },
      {
        id: 10,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel sommet altermondialiste a lieu à Seattle en 1999 ?',
        options: ['Le sommet de l\'OMC', 'Le sommet du G7', 'Le sommet de l\'ONU', 'Le sommet de l\'UE'],
        correctAnswer: 'Le sommet de l\'OMC',
        explanation: 'Le sommet de l\'OMC à Seattle en 1999 est marqué par des manifestations altermondialistes.',
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