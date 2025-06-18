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
    title: 'Électricité et Énergie',
    description: 'Circuits électriques, énergies renouvelables',
    icon: '⚡',
    difficulty: 'medium',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est le symbole de l\'unité de tension électrique ?',
        options: ['A (Ampère)', 'V (Volt)', 'W (Watt)', 'Ω (Ohm)'],
        correctAnswer: 'V (Volt)',
        explanation: 'Le volt (V) est l\'unité de tension électrique dans le système international.',
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est le symbole de l\'unité d\'intensité électrique ?',
        options: ['V (Volt)', 'A (Ampère)', 'W (Watt)', 'Ω (Ohm)'],
        correctAnswer: 'A (Ampère)',
        explanation: 'L\'ampère (A) est l\'unité d\'intensité électrique dans le système international.',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la formule de la puissance électrique ?',
        options: ['P = U × I', 'P = U ÷ I', 'P = U + I', 'P = U - I'],
        correctAnswer: 'P = U × I',
        explanation: 'La puissance électrique P est égale au produit de la tension U par l\'intensité I.',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel type d\'énergie est l\'énergie solaire ?',
        options: ['Énergie fossile', 'Énergie renouvelable', 'Énergie nucléaire', 'Énergie thermique'],
        correctAnswer: 'Énergie renouvelable',
        explanation: 'L\'énergie solaire est une énergie renouvelable car elle est inépuisable à l\'échelle humaine.',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel composant électrique limite le passage du courant ?',
        options: ['Générateur', 'Résistance', 'Interrupteur', 'Ampoule'],
        correctAnswer: 'Résistance',
        explanation: 'Une résistance limite le passage du courant électrique dans un circuit.',
        points: 10
      },
      {
        id: 6,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la loi d\'Ohm ?',
        options: ['U = R × I', 'U = R ÷ I', 'U = R + I', 'U = R - I'],
        correctAnswer: 'U = R × I',
        explanation: 'La loi d\'Ohm s\'écrit U = R × I où U est la tension, R la résistance et I l\'intensité.',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel type d\'énergie produit une éolienne ?',
        options: ['Énergie électrique', 'Énergie thermique', 'Énergie chimique', 'Énergie nucléaire'],
        correctAnswer: 'Énergie électrique',
        explanation: 'Une éolienne transforme l\'énergie cinétique du vent en énergie électrique.',
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quelle est l\'unité de l\'énergie électrique ?',
        options: ['Watt (W)', 'Joule (J)', 'Volt (V)', 'Ampère (A)'],
        correctAnswer: 'Joule (J)',
        explanation: 'Le joule (J) est l\'unité de l\'énergie électrique dans le système international.',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel appareil mesure l\'intensité électrique ?',
        options: ['Voltmètre', 'Ampèremètre', 'Ohmmètre', 'Wattmètre'],
        correctAnswer: 'Ampèremètre',
        explanation: 'L\'ampèremètre mesure l\'intensité électrique dans un circuit.',
        points: 10
      },
      {
        id: 10,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel type de circuit permet à plusieurs lampes de fonctionner indépendamment ?',
        options: ['Circuit en série', 'Circuit en dérivation', 'Circuit mixte', 'Circuit fermé'],
        correctAnswer: 'Circuit en dérivation',
        explanation: 'Un circuit en dérivation permet aux composants de fonctionner indépendamment.',
        points: 10
      }
    ]
  },
  {
    id: 2,
    title: 'Mécanique et Mouvement',
    description: 'Forces, mouvement, énergie mécanique',
    icon: '🔧',
    difficulty: 'medium',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est l\'unité de la force dans le système international ?',
        options: ['Joule (J)', 'Newton (N)', 'Watt (W)', 'Pascal (Pa)'],
        correctAnswer: 'Newton (N)',
        explanation: 'Le newton (N) est l\'unité de la force dans le système international.',
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est l\'unité de la vitesse ?',
        options: ['m/s', 'm/s²', 'N', 'J'],
        correctAnswer: 'm/s',
        explanation: 'La vitesse s\'exprime en mètres par seconde (m/s).',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la formule de l\'énergie cinétique ?',
        options: ['Ec = ½ × m × v²', 'Ec = m × v', 'Ec = m × v²', 'Ec = ½ × m × v'],
        correctAnswer: 'Ec = ½ × m × v²',
        explanation: 'L\'énergie cinétique s\'écrit Ec = ½ × m × v² où m est la masse et v la vitesse.',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle force attire les objets vers le centre de la Terre ?',
        options: ['Force de frottement', 'Poids', 'Force de tension', 'Force de réaction'],
        correctAnswer: 'Poids',
        explanation: 'Le poids est la force qui attire les objets vers le centre de la Terre.',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est l\'unité de l\'accélération ?',
        options: ['m/s', 'm/s²', 'N', 'J'],
        correctAnswer: 'm/s²',
        explanation: 'L\'accélération s\'exprime en mètres par seconde au carré (m/s²).',
        points: 10
      },
      {
        id: 6,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la formule du poids ?',
        options: ['P = m × g', 'P = m ÷ g', 'P = m + g', 'P = m - g'],
        correctAnswer: 'P = m × g',
        explanation: 'Le poids P est égal au produit de la masse m par l\'intensité de la pesanteur g.',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel type d\'énergie possède un objet en mouvement ?',
        options: ['Énergie potentielle', 'Énergie cinétique', 'Énergie thermique', 'Énergie chimique'],
        correctAnswer: 'Énergie cinétique',
        explanation: 'Un objet en mouvement possède de l\'énergie cinétique.',
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quelle est la valeur approximative de g sur Terre ?',
        options: ['9,8 m/s²', '9,8 m/s', '9,8 N', '9,8 J'],
        correctAnswer: '9,8 m/s²',
        explanation: 'Sur Terre, l\'intensité de la pesanteur g vaut environ 9,8 m/s².',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel type de mouvement a un objet qui va de plus en plus vite ?',
        options: ['Mouvement uniforme', 'Mouvement accéléré', 'Mouvement ralenti', 'Mouvement circulaire'],
        correctAnswer: 'Mouvement accéléré',
        explanation: 'Un objet qui va de plus en plus vite a un mouvement accéléré.',
        points: 10
      },
      {
        id: 10,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle force s\'oppose au mouvement d\'un objet ?',
        options: ['Poids', 'Force de frottement', 'Force de tension', 'Force de réaction'],
        correctAnswer: 'Force de frottement',
        explanation: 'La force de frottement s\'oppose au mouvement d\'un objet.',
        points: 10
      }
    ]
  },
  {
    id: 3,
    title: 'Chimie et Matière',
    description: 'Atomes, molécules, réactions chimiques',
    icon: '🧪',
    difficulty: 'hard',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est le symbole chimique de l\'hydrogène ?',
        options: ['H', 'He', 'O', 'N'],
        correctAnswer: 'H',
        explanation: 'H est le symbole chimique de l\'hydrogène.',
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est le symbole chimique de l\'oxygène ?',
        options: ['H', 'He', 'O', 'N'],
        correctAnswer: 'O',
        explanation: 'O est le symbole chimique de l\'oxygène.',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la formule chimique de l\'eau ?',
        options: ['H2O', 'CO2', 'O2', 'N2'],
        correctAnswer: 'H2O',
        explanation: 'H2O est la formule chimique de l\'eau (2 atomes d\'hydrogène + 1 atome d\'oxygène).',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la formule chimique du dioxyde de carbone ?',
        options: ['H2O', 'CO2', 'O2', 'N2'],
        correctAnswer: 'CO2',
        explanation: 'CO2 est la formule chimique du dioxyde de carbone.',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est le symbole chimique du carbone ?',
        options: ['C', 'Ca', 'Co', 'Cu'],
        correctAnswer: 'C',
        explanation: 'C est le symbole chimique du carbone.',
        points: 10
      },
      {
        id: 6,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel type de réaction produit de l\'énergie ?',
        options: ['Réaction endothermique', 'Réaction exothermique', 'Réaction neutre', 'Réaction équilibrée'],
        correctAnswer: 'Réaction exothermique',
        explanation: 'Une réaction exothermique produit de l\'énergie (chaleur).',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel est le pH d\'une solution neutre ?',
        options: ['0', '7', '14', '10'],
        correctAnswer: '7',
        explanation: 'Une solution neutre a un pH égal à 7.',
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quel est le nombre atomique de l\'hydrogène ?',
        options: ['1', '2', '3', '4'],
        correctAnswer: '1',
        explanation: 'L\'hydrogène a un nombre atomique de 1 (1 proton).',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est le symbole chimique de l\'azote ?',
        options: ['A', 'Az', 'N', 'Ni'],
        correctAnswer: 'N',
        explanation: 'N est le symbole chimique de l\'azote.',
        points: 10
      },
      {
        id: 10,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la formule chimique du dioxygène ?',
        options: ['O', 'O2', 'O3', 'O4'],
        correctAnswer: 'O2',
        explanation: 'O2 est la formule chimique du dioxygène (molécule d\'oxygène).',
        points: 10
      }
    ]
  },
  {
    id: 4,
    title: 'Biologie et Vivant',
    description: 'Cellules, reproduction, écosystèmes',
    icon: '🧬',
    difficulty: 'easy',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est l\'organe principal de la respiration ?',
        options: ['Cœur', 'Poumons', 'Foie', 'Estomac'],
        correctAnswer: 'Poumons',
        explanation: 'Les poumons sont l\'organe principal de la respiration.',
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est l\'organe principal de la circulation sanguine ?',
        options: ['Poumons', 'Cœur', 'Foie', 'Estomac'],
        correctAnswer: 'Cœur',
        explanation: 'Le cœur est l\'organe principal de la circulation sanguine.',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel type de reproduction nécessite deux parents ?',
        options: ['Reproduction asexuée', 'Reproduction sexuée', 'Clonage', 'Bourgeonnement'],
        correctAnswer: 'Reproduction sexuée',
        explanation: 'La reproduction sexuée nécessite deux parents (mâle et femelle).',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel est le nom de la division cellulaire qui produit des cellules identiques ?',
        options: ['Mitose', 'Méiose', 'Fécondation', 'Ovulation'],
        correctAnswer: 'Mitose',
        explanation: 'La mitose est la division cellulaire qui produit des cellules identiques.',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est l\'organe principal de la digestion ?',
        options: ['Cœur', 'Poumons', 'Estomac', 'Cerveau'],
        correctAnswer: 'Estomac',
        explanation: 'L\'estomac est l\'organe principal de la digestion.',
        points: 10
      },
      {
        id: 6,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel est le nom de la molécule qui contient l\'information génétique ?',
        options: ['ARN', 'ADN', 'Protéine', 'Glucide'],
        correctAnswer: 'ADN',
        explanation: 'L\'ADN (acide désoxyribonucléique) contient l\'information génétique.',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel type de reproduction ne nécessite qu\'un seul parent ?',
        options: ['Reproduction sexuée', 'Reproduction asexuée', 'Fécondation', 'Ovulation'],
        correctAnswer: 'Reproduction asexuée',
        explanation: 'La reproduction asexuée ne nécessite qu\'un seul parent.',
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est l\'organe principal du système nerveux ?',
        options: ['Cœur', 'Poumons', 'Cerveau', 'Estomac'],
        correctAnswer: 'Cerveau',
        explanation: 'Le cerveau est l\'organe principal du système nerveux.',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel est le nom de la division cellulaire qui produit des gamètes ?',
        options: ['Mitose', 'Méiose', 'Fécondation', 'Ovulation'],
        correctAnswer: 'Méiose',
        explanation: 'La méiose est la division cellulaire qui produit des gamètes.',
        points: 10
      },
      {
        id: 10,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est l\'organe principal de la filtration du sang ?',
        options: ['Cœur', 'Poumons', 'Reins', 'Foie'],
        correctAnswer: 'Reins',
        explanation: 'Les reins sont l\'organe principal de la filtration du sang.',
        points: 10
      }
    ]
  },
  {
    id: 5,
    title: 'Géologie et Terre',
    description: 'Roches, minéraux, structure terrestre',
    icon: '🌍',
    difficulty: 'easy',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la couche la plus externe de la Terre ?',
        options: ['Noyau', 'Manteau', 'Croûte terrestre', 'Centre'],
        correctAnswer: 'Croûte terrestre',
        explanation: 'La croûte terrestre est la couche la plus externe de la Terre.',
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel type de roche se forme par refroidissement du magma ?',
        options: ['Roche sédimentaire', 'Roche métamorphique', 'Roche magmatique', 'Roche organique'],
        correctAnswer: 'Roche magmatique',
        explanation: 'Une roche magmatique se forme par refroidissement du magma.',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel minéral est principalement composé de silice ?',
        options: ['Calcite', 'Quartz', 'Feldspath', 'Mica'],
        correctAnswer: 'Quartz',
        explanation: 'Le quartz est principalement composé de silice (SiO2).',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel type de roche se forme par accumulation de sédiments ?',
        options: ['Roche magmatique', 'Roche métamorphique', 'Roche sédimentaire', 'Roche organique'],
        correctAnswer: 'Roche sédimentaire',
        explanation: 'Une roche sédimentaire se forme par accumulation de sédiments.',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est le nom de la couche la plus interne de la Terre ?',
        options: ['Croûte', 'Manteau', 'Noyau', 'Centre'],
        correctAnswer: 'Noyau',
        explanation: 'Le noyau est la couche la plus interne de la Terre.',
        points: 10
      },
      {
        id: 6,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel type de roche se forme par transformation d\'une roche existante ?',
        options: ['Roche magmatique', 'Roche sédimentaire', 'Roche métamorphique', 'Roche organique'],
        correctAnswer: 'Roche métamorphique',
        explanation: 'Une roche métamorphique se forme par transformation d\'une roche existante.',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel minéral est principalement composé de carbonate de calcium ?',
        options: ['Quartz', 'Calcite', 'Feldspath', 'Mica'],
        correctAnswer: 'Calcite',
        explanation: 'La calcite est principalement composée de carbonate de calcium (CaCO3).',
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quel est le nom de la couche entre la croûte et le noyau ?',
        options: ['Centre', 'Manteau', 'Noyau', 'Croûte'],
        correctAnswer: 'Manteau',
        explanation: 'Le manteau est la couche entre la croûte et le noyau.',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel type de roche est le granite ?',
        options: ['Roche sédimentaire', 'Roche métamorphique', 'Roche magmatique', 'Roche organique'],
        correctAnswer: 'Roche magmatique',
        explanation: 'Le granite est une roche magmatique qui s\'est formée par refroidissement du magma.',
        points: 10
      },
      {
        id: 10,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel type de roche est le calcaire ?',
        options: ['Roche magmatique', 'Roche métamorphique', 'Roche sédimentaire', 'Roche organique'],
        correctAnswer: 'Roche sédimentaire',
        explanation: 'Le calcaire est une roche sédimentaire qui s\'est formée par accumulation de sédiments.',
        points: 10
      }
    ]
  },
  {
    id: 6,
    title: 'Astronomie et Espace',
    description: 'Système solaire, étoiles, galaxies',
    icon: '🌌',
    difficulty: 'medium',
    completed: false,
    completedQuestions: 0,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est l\'étoile la plus proche de la Terre ?',
        options: ['Proxima Centauri', 'Le Soleil', 'Alpha Centauri', 'Sirius'],
        correctAnswer: 'Le Soleil',
        explanation: 'Le Soleil est l\'étoile la plus proche de la Terre.',
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la planète la plus proche du Soleil ?',
        options: ['Terre', 'Vénus', 'Mercure', 'Mars'],
        correctAnswer: 'Mercure',
        explanation: 'Mercure est la planète la plus proche du Soleil.',
        points: 10
      },
      {
        id: 3,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle est la planète la plus éloignée du Soleil ?',
        options: ['Uranus', 'Neptune', 'Pluton', 'Saturne'],
        correctAnswer: 'Neptune',
        explanation: 'Neptune est la planète la plus éloignée du Soleil.',
        points: 10
      },
      {
        id: 4,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel type d\'objet céleste est la Lune ?',
        options: ['Planète', 'Étoile', 'Satellite naturel', 'Astéroïde'],
        correctAnswer: 'Satellite naturel',
        explanation: 'La Lune est un satellite naturel de la Terre.',
        points: 10
      },
      {
        id: 5,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle est la galaxie dans laquelle se trouve la Terre ?',
        options: ['Andromède', 'Voie lactée', 'Triangle', 'Grand Nuage de Magellan'],
        correctAnswer: 'Voie lactée',
        explanation: 'La Terre se trouve dans la galaxie de la Voie lactée.',
        points: 10
      },
      {
        id: 6,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quelle planète est connue pour ses anneaux ?',
        options: ['Jupiter', 'Saturne', 'Uranus', 'Neptune'],
        correctAnswer: 'Saturne',
        explanation: 'Saturne est connue pour ses anneaux spectaculaires.',
        points: 10
      },
      {
        id: 7,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel est le nom de la plus grande planète du système solaire ?',
        options: ['Saturne', 'Jupiter', 'Uranus', 'Neptune'],
        correctAnswer: 'Jupiter',
        explanation: 'Jupiter est la plus grande planète du système solaire.',
        points: 10
      },
      {
        id: 8,
        type: 'multiple-choice',
        difficulty: 3,
        question: 'Quelle est l\'unité de distance utilisée en astronomie ?',
        options: ['Kilomètre', 'Mètre', 'Année-lumière', 'Mile'],
        correctAnswer: 'Année-lumière',
        explanation: 'L\'année-lumière est une unité de distance utilisée en astronomie.',
        points: 10
      },
      {
        id: 9,
        type: 'multiple-choice',
        difficulty: 1,
        question: 'Quelle planète est appelée la planète rouge ?',
        options: ['Vénus', 'Terre', 'Mars', 'Jupiter'],
        correctAnswer: 'Mars',
        explanation: 'Mars est appelée la planète rouge à cause de sa couleur.',
        points: 10
      },
      {
        id: 10,
        type: 'multiple-choice',
        difficulty: 2,
        question: 'Quel type d\'objet céleste est le Soleil ?',
        options: ['Planète', 'Étoile', 'Satellite', 'Astéroïde'],
        correctAnswer: 'Étoile',
        explanation: 'Le Soleil est une étoile qui émet sa propre lumière.',
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