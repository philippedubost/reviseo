// Fonction pour normaliser une réponse (gérer virgules, points, fractions)
export function normalizeAnswer(answer: string): string {
  // Nettoyer les espaces
  let cleanAnswer = answer.trim();
  
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

// Fonction pour comparer deux réponses en tenant compte des différentes formes
export function compareAnswers(userAnswer: string, correctAnswer: string): boolean {
  const normalizedUser = normalizeAnswer(userAnswer);
  const normalizedCorrect = normalizeAnswer(correctAnswer);
  
  // Comparaison directe
  if (normalizedUser === normalizedCorrect) {
    return true;
  }
  
  // Comparaison numérique
  const userNum = parseFloat(normalizedUser);
  const correctNum = parseFloat(normalizedCorrect);
  
  if (!isNaN(userNum) && !isNaN(correctNum)) {
    // Tolérance pour les erreurs d'arrondi
    return Math.abs(userNum - correctNum) < 0.01;
  }
  
  return false;
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