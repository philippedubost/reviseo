// Test des fonctions de détection de type de clavier
function isNumericAnswer(answer) {
  const cleanAnswer = answer.trim();
  
  if (/^\d+$/.test(cleanAnswer)) return true; // Nombre entier
  if (/^\d+[.,]\d+$/.test(cleanAnswer)) return true; // Nombre décimal
  if (/^\d+%$/.test(cleanAnswer)) return true; // Pourcentage
  if (/^\d{4}$/.test(cleanAnswer)) return true; // Année
  
  return false;
}

function needsSlashKeyboard(answer) {
  const cleanAnswer = answer.trim();
  
  if (/^\d+\/\d+$/.test(cleanAnswer)) return true; // Fraction
  
  return false;
}

function getKeyboardType(type, correctAnswer) {
  if (type !== 'calculation' && type !== 'input') return 'text';
  if (!correctAnswer) return 'text';
  
  if (needsSlashKeyboard(correctAnswer)) {
    return 'text'; // Clavier alphabétique pour avoir accès au slash
  }
  
  if (isNumericAnswer(correctAnswer)) {
    return 'decimal'; // Clavier numérique pour les nombres
  }
  
  return 'text'; // Clavier alphabétique par défaut
}

// Tests
const tests = [
  // Réponses numériques (clavier decimal)
  { type: 'input', answer: "27", expected: 'decimal', description: "Nombre entier" },
  { type: 'input', answer: "3.5", expected: 'decimal', description: "Nombre décimal avec point" },
  { type: 'input', answer: "16,5", expected: 'decimal', description: "Nombre décimal avec virgule" },
  { type: 'input', answer: "25%", expected: 'decimal', description: "Pourcentage" },
  { type: 'input', answer: "1789", expected: 'decimal', description: "Année" },
  { type: 'calculation', answer: "1000", expected: 'decimal', description: "Nombre entier (calculation)" },
  
  // Fractions (clavier text pour avoir slash)
  { type: 'input', answer: "1/2", expected: 'text', description: "Fraction simple" },
  { type: 'input', answer: "3/4", expected: 'text', description: "Fraction" },
  { type: 'input', answer: "6/5", expected: 'text', description: "Fraction impropre" },
  { type: 'calculation', answer: "1/2", expected: 'text', description: "Fraction (calculation)" },
  
  // Réponses textuelles (clavier text)
  { type: 'input', answer: "dort", expected: 'text', description: "Verbe" },
  { type: 'input', answer: "chat", expected: 'text', description: "Nom" },
  { type: 'input', answer: "bleu", expected: 'text', description: "Adjectif" },
  { type: 'input', answer: "Paris", expected: 'text', description: "Nom propre" },
  { type: 'input', answer: "Alliés", expected: 'text', description: "Nom propre" },
  
  // Cas spéciaux
  { type: 'multiple-choice', answer: "27", expected: 'text', description: "Multiple choice (ignoré)" },
  { type: 'input', answer: "", expected: 'text', description: "Réponse vide" },
];

console.log("Tests de détection du type de clavier:\n");

let passed = 0;
let failed = 0;

tests.forEach((test, index) => {
  const result = getKeyboardType(test.type, test.answer);
  const success = result === test.expected;
  
  if (success) {
    passed++;
    console.log(`✅ Test ${index + 1}: "${test.answer}" (${test.description}) - ${result}`);
  } else {
    failed++;
    console.log(`❌ Test ${index + 1}: "${test.answer}" (${test.description}) - Attendu: ${test.expected}, Obtenu: ${result}`);
  }
});

console.log(`\nRésultats: ${passed} tests réussis, ${failed} tests échoués`);
console.log(`Taux de réussite: ${((passed / tests.length) * 100).toFixed(1)}%`);

console.log("\n📱 Types de claviers par type de réponse:");
console.log("🔢 decimal: Nombres entiers, décimaux, pourcentages, années");
console.log("⌨️  text: Fractions, mots, textes (accès au slash pour fractions)"); 