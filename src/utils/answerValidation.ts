// Fonction pour normaliser une réponse (gérer virgules, points, fractions, expressions mathématiques)
export function normalizeAnswer(answer: string): string {
  // Nettoyer les espaces et normaliser
  let cleanAnswer = answer.trim();
  
  // Normaliser les expressions mathématiques avec variables
  cleanAnswer = normalizeMathExpression(cleanAnswer);
  
  // Remplacer les virgules par des points pour les décimaux
  cleanAnswer = cleanAnswer.replace(',', '.');
  
  // Gérer les fractions
  if (cleanAnswer.includes('/')) {
    const parts = cleanAnswer.split('/');
    if (parts.length === 2) {
      const numerator = parseFloat(parts[0].trim());
      const denominator = parseFloat(parts[1].trim());
      if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
        const decimal = numerator / denominator;
        return decimal.toString();
      }
    }
  }
  
  return cleanAnswer;
}

// Fonction pour normaliser les expressions mathématiques
function normalizeMathExpression(expression: string): string {
  let normalized = expression.trim();
  
  // Supprimer les espaces autour des égalités et dans les fonctions
  normalized = normalized.replace(/\s*=\s*/g, '=');
  normalized = normalized.replace(/\s*\(\s*/g, '(');
  normalized = normalized.replace(/\s*\)\s*/g, ')');
  
  // Normaliser les espaces multiples
  normalized = normalized.replace(/\s+/g, ' ');
  
  // Gérer les cas comme "x = ln(7)" → "ln(7)"
  // Si l'expression contient "= " suivi d'une expression, extraire juste l'expression
  const equalMatch = normalized.match(/^[a-zA-Z]\s*=\s*(.+)$/);
  if (equalMatch) {
    normalized = equalMatch[1].trim();
  }
  
  // Supprimer les espaces dans les fonctions mathématiques courantes
  const mathFunctions = ['ln', 'log', 'sin', 'cos', 'tan', 'exp', 'sqrt', 'abs'];
  for (const func of mathFunctions) {
    // Remplacer "ln( 7 )" par "ln(7)"
    const regex = new RegExp(`${func}\\s*\\(\\s*([^)]+)\\s*\\)`, 'gi');
    normalized = normalized.replace(regex, (match, content) => {
      return `${func}(${content.trim()})`;
    });
  }
  
  return normalized;
}

// Fonction pour normaliser le texte (accents, casse, caractères spéciaux)
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Normaliser les accents
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les diacritiques
    // Remplacer les caractères similaires
    .replace(/[àâä]/g, 'a')
    .replace(/[éèêë]/g, 'e')
    .replace(/[îï]/g, 'i')
    .replace(/[ôö]/g, 'o')
    .replace(/[ûùü]/g, 'u')
    .replace(/[ÿ]/g, 'y')
    .replace(/[ç]/g, 'c')
    // Supprimer les espaces multiples
    .replace(/\s+/g, ' ')
    // Supprimer la ponctuation
    .replace(/[.,!?;:]/g, '');
}

// Fonction pour calculer la distance de Levenshtein (similarité entre chaînes)
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Fonction pour calculer la similarité entre deux chaînes (0 à 1)
function calculateSimilarity(str1: string, str2: string): number {
  const distance = levenshteinDistance(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);
  return maxLength === 0 ? 1 : (maxLength - distance) / maxLength;
}

// Fonction pour comparer deux réponses en tenant compte des différentes formes
export function compareAnswers(userAnswer: string, correctAnswer: string): boolean {
  // Normalisation pour les réponses numériques et mathématiques
  const normalizedUser = normalizeAnswer(userAnswer);
  const normalizedCorrect = normalizeAnswer(correctAnswer);
  
  // Comparaison directe après normalisation
  if (normalizedUser === normalizedCorrect) {
    return true;
  }
  
  // Vérifier toutes les variations acceptées de la réponse correcte
  const acceptedVariations = getCommonVariations(correctAnswer);
  for (const variation of acceptedVariations) {
    const normalizedVariation = normalizeAnswer(variation);
    if (normalizedUser === normalizedVariation) {
      return true;
    }
  }
  
  // Vérifier les variations de la réponse utilisateur contre la réponse correcte
  const userVariations = getCommonVariations(userAnswer);
  for (const userVariation of userVariations) {
    const normalizedUserVariation = normalizeAnswer(userVariation);
    if (normalizedUserVariation === normalizedCorrect) {
      return true;
    }
  }
  
  // Comparaison numérique
  const userNum = parseFloat(normalizedUser);
  const correctNum = parseFloat(normalizedCorrect);
  
  if (!isNaN(userNum) && !isNaN(correctNum)) {
    // Tolérance pour les erreurs d'arrondi
    return Math.abs(userNum - correctNum) < 0.01;
  }
  
  // Si ce n'est pas numérique, utiliser la comparaison textuelle avec tolérance
  return compareTextAnswers(userAnswer, correctAnswer);
}

// Fonction pour comparer les réponses textuelles avec tolérance
export function compareTextAnswers(userAnswer: string, correctAnswer: string): boolean {
  // Normalisation du texte
  const normalizedUser = normalizeText(userAnswer);
  const normalizedCorrect = normalizeText(correctAnswer);
  
  // Comparaison exacte après normalisation
  if (normalizedUser === normalizedCorrect) {
    return true;
  }
  
  // Calcul de la similarité
  const similarity = calculateSimilarity(normalizedUser, normalizedCorrect);
  
  // Seuil de tolérance : 85% de similarité
  const toleranceThreshold = 0.85;
  
  // Vérifications supplémentaires pour les cas particuliers
  if (similarity >= toleranceThreshold) {
    return true;
  }
  
  // Vérifier si c'est juste une différence d'accent ou de casse
  const userLower = userAnswer.toLowerCase().trim();
  const correctLower = correctAnswer.toLowerCase().trim();
  
  if (userLower === correctLower) {
    return true;
  }
  
  // Vérifier les variations communes
  const variations = getCommonVariations(correctAnswer);
  for (const variation of variations) {
    if (normalizeText(userAnswer) === normalizeText(variation)) {
      return true;
    }
  }
  
  return false;
}

// Fonction pour obtenir les variations communes d'une réponse
function getCommonVariations(answer: string): string[] {
  const variations = [answer];
  
  // Variations d'accents
  const accentMap: { [key: string]: string[] } = {
    'a': ['à', 'â', 'ä'],
    'e': ['é', 'è', 'ê', 'ë'],
    'i': ['î', 'ï'],
    'o': ['ô', 'ö'],
    'u': ['û', 'ù', 'ü'],
    'y': ['ÿ'],
    'c': ['ç']
  };
  
  // Ajouter des variations sans accents
  let withoutAccents = answer;
  for (const [base, accents] of Object.entries(accentMap)) {
    for (const accent of accents) {
      withoutAccents = withoutAccents.replace(new RegExp(accent, 'g'), base);
    }
  }
  if (withoutAccents !== answer) {
    variations.push(withoutAccents);
  }
  
  // Variations de casse
  variations.push(answer.toLowerCase());
  variations.push(answer.toUpperCase());
  
  // Variations avec/sans espaces
  if (answer.includes(' ')) {
    variations.push(answer.replace(/\s+/g, ''));
  }
  
  // Variations d'expressions mathématiques
  variations.push(...getMathExpressionVariations(answer));
  
  // Variations spécifiques pour les mots avec déterminants
  const normalizedAnswer = normalizeText(answer);
  
  // Déterminants étendus avec plus de variantes
  const determinants = [
    'le ', 'la ', 'les ', "l'", 'un ', 'une ', 'des ',
    'du ', 'de la ', 'de l\' ', 'de ', 'd\'',
    'ce ', 'cette ', 'ces ', 'cet ',
    'mon ', 'ma ', 'mes ', 'ton ', 'ta ', 'tes ', 'son ', 'sa ', 'ses ',
    'notre ', 'votre ', 'leur ', 'leurs ',
    'quelque ', 'quelques ', 'chaque ', 'tout ', 'toute ', 'tous ', 'toutes '
  ];
  
  // Si la réponse correcte contient un déterminant, accepter aussi sans déterminant
  for (const det of determinants) {
    const normalizedDet = normalizeText(det);
    if (normalizedAnswer.startsWith(normalizedDet)) {
      const withoutDeterminant = normalizedAnswer.substring(normalizedDet.length).trim();
      if (withoutDeterminant) {
        variations.push(withoutDeterminant);
        // Ajouter aussi la version originale sans déterminant
        const originalWithoutDet = answer.substring(det.length).trim();
        if (originalWithoutDet) {
          variations.push(originalWithoutDet);
        }
      }
    }
  }
  
  // Si la réponse correcte ne contient pas de déterminant, accepter aussi avec déterminants
  const hasNoDeterminant = !determinants.some(det => normalizeText(answer).startsWith(normalizeText(det)));
  if (hasNoDeterminant) {
    // Ajouter les déterminants les plus courants
    const commonDeterminants = ['le ', 'la ', 'les ', "l'", 'un ', 'une ', 'des '];
    for (const det of commonDeterminants) {
      variations.push(det + answer);
      variations.push(det + answer.toLowerCase());
    }
  }
  
  // Variations avec prépositions courantes
  const prepositions = ['à ', 'de ', 'en ', 'dans ', 'sur ', 'avec ', 'pour ', 'par '];
  for (const prep of prepositions) {
    const normalizedPrep = normalizeText(prep);
    if (normalizedAnswer.startsWith(normalizedPrep)) {
      const withoutPreposition = normalizedAnswer.substring(normalizedPrep.length).trim();
      if (withoutPreposition) {
        variations.push(withoutPreposition);
      }
    }
  }
  
  return [...new Set(variations)]; // Supprimer les doublons
}

// Fonction pour obtenir les variations d'expressions mathématiques
function getMathExpressionVariations(answer: string): string[] {
  const variations: string[] = [];
  
  // Variations avec/sans variable
  const withVariableMatch = answer.match(/^([a-zA-Z])\s*=\s*(.+)$/);
  if (withVariableMatch) {
    const variable = withVariableMatch[1];
    const expression = withVariableMatch[2];
    
    // Ajouter la version sans variable
    variations.push(expression);
    variations.push(expression.trim());
    
    // Ajouter des variations d'espacement
    variations.push(`${variable}=${expression}`);
    variations.push(`${variable} = ${expression}`);
    variations.push(`${variable}  =  ${expression}`);
  }
  
  // Variations d'espacement dans les fonctions mathématiques
  const mathFunctionRegex = /(ln|log|sin|cos|tan|exp|sqrt|abs)\s*\(\s*([^)]+)\s*\)/gi;
  let match;
  while ((match = mathFunctionRegex.exec(answer)) !== null) {
    const func = match[1];
    const content = match[2];
    
    // Différentes variations d'espacement
    variations.push(`${func}(${content})`);
    variations.push(`${func}( ${content} )`);
    variations.push(`${func}(  ${content}  )`);
    variations.push(`${func} (${content})`);
    variations.push(`${func} ( ${content} )`);
  }
  
  // Variations de parenthèses pour les nombres
  const numberInParensRegex = /\(\s*([0-9.,-]+)\s*\)/g;
  while ((match = numberInParensRegex.exec(answer)) !== null) {
    const number = match[1];
    variations.push(number);
    variations.push(number.trim());
  }
  
  return variations;
}

// Fonction pour trouver le PGCD (Plus Grand Commun Diviseur)
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

// Fonction pour simplifier une fraction
function simplifyFraction(numerator: number, denominator: number): { num: number; den: number } {
  const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
  return {
    num: numerator / divisor,
    den: denominator / divisor
  };
}

// Fonction pour convertir un décimal en fraction simplifiée
function decimalToFraction(decimal: number, maxDenominator: number = 100): string {
  // Gérer les nombres entiers
  if (Number.isInteger(decimal)) {
    return decimal.toString();
  }
  
  // Gérer les nombres négatifs
  const isNegative = decimal < 0;
  const absDecimal = Math.abs(decimal);
  
  // Trouver la meilleure approximation fractionnaire
  let bestNumerator = 0;
  let bestDenominator = 1;
  let bestError = Math.abs(absDecimal);
  
  for (let den = 1; den <= maxDenominator; den++) {
    const num = Math.round(absDecimal * den);
    const error = Math.abs(absDecimal - num / den);
    
    if (error < bestError) {
      bestError = error;
      bestNumerator = num;
      bestDenominator = den;
    }
  }
  
  // Si l'erreur est très petite, on a trouvé une bonne fraction
  if (bestError < 0.001) {
    const simplified = simplifyFraction(bestNumerator, bestDenominator);
    const sign = isNegative ? '-' : '';
    
    if (simplified.den === 1) {
      return sign + simplified.num.toString();
    }
    
    return sign + simplified.num + '/' + simplified.den;
  }
  
  // Sinon, retourner le décimal
  return decimal.toFixed(2).replace(/\.?0+$/, '');
}

// Fonction pour formater une réponse pour l'affichage
export function formatAnswerForDisplay(answer: string): string {
  const normalized = normalizeAnswer(answer);
  const num = parseFloat(normalized);
  
  if (!isNaN(num)) {
    return decimalToFraction(num);
  }
  
  return answer;
}

// Fonction pour obtenir toutes les formes acceptables d'une réponse
export function getAcceptedForms(answer: string): string[] {
  const normalized = normalizeAnswer(answer);
  const num = parseFloat(normalized);
  
  if (isNaN(num)) {
    return [answer];
  }
  
  const forms = new Set<string>();
  
  // Forme originale
  forms.add(answer);
  
  // Forme normalisée
  forms.add(normalized);
  
  // Forme avec point décimal
  if (normalized.includes('.')) {
    forms.add(normalized.replace('.', ','));
  }
  
  // Forme avec virgule
  if (normalized.includes(',')) {
    forms.add(normalized.replace(',', '.'));
  }
  
  // Forme fractionnaire
  const fractionForm = decimalToFraction(num);
  if (fractionForm !== normalized) {
    forms.add(fractionForm);
  }
  
  // Forme entière si applicable
  if (Number.isInteger(num)) {
    forms.add(num.toString());
  }
  
  // Forme avec zéros inutiles supprimés
  const cleanDecimal = num.toFixed(2).replace(/\.?0+$/, '');
  if (cleanDecimal !== normalized) {
    forms.add(cleanDecimal);
  }
  
  return Array.from(forms);
} 