// Simplified answer validation without complex regex patterns
export function normalizeAnswer(answer: string): string {
  // Basic cleaning and normalization
  let cleanAnswer = answer.trim();
  
  // Replace commas with dots for decimals
  cleanAnswer = cleanAnswer.replace(',', '.');
  
  // Handle simple fractions
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

// Simple text normalization
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[àâä]/g, 'a')
    .replace(/[éèêë]/g, 'e')
    .replace(/[îï]/g, 'i')
    .replace(/[ôö]/g, 'o')
    .replace(/[ûùü]/g, 'u')
    .replace(/[ÿ]/g, 'y')
    .replace(/[ç]/g, 'c')
    .replace(/\s+/g, ' ')
    .replace(/[.,!?;:]/g, '');
}

// Simple answer comparison
export function compareAnswers(userAnswer: string, correctAnswer: string): boolean {
  const normalizedUser = normalizeAnswer(userAnswer);
  const normalizedCorrect = normalizeAnswer(correctAnswer);
  
  // Direct comparison
  if (normalizedUser === normalizedCorrect) {
    return true;
  }
  
  // Numerical comparison with tolerance
  const userNum = parseFloat(normalizedUser);
  const correctNum = parseFloat(normalizedCorrect);
  
  if (!isNaN(userNum) && !isNaN(correctNum)) {
    return Math.abs(userNum - correctNum) < 0.01;
  }
  
  // Text comparison
  return compareTextAnswers(userAnswer, correctAnswer);
}

// Simple text comparison
export function compareTextAnswers(userAnswer: string, correctAnswer: string): boolean {
  const normalizedUser = normalizeText(userAnswer);
  const normalizedCorrect = normalizeText(correctAnswer);
  
  return normalizedUser === normalizedCorrect;
}

// Simple answer formatting
export function formatAnswerForDisplay(answer: string): string {
  const normalized = normalizeAnswer(answer);
  const num = parseFloat(normalized);
  
  if (!isNaN(num)) {
    return num.toString();
  }
  
  return answer;
}

// Get basic accepted forms
export function getAcceptedForms(answer: string): string[] {
  const variations = [answer];
  
  // Basic variations
  variations.push(answer.toLowerCase());
  variations.push(answer.toUpperCase());
  
  // Without spaces
  if (answer.includes(' ')) {
    variations.push(answer.replace(/\s+/g, ''));
  }
  
  return [...new Set(variations)];
} 