// Script de test pour la nouvelle structure de données simplifiée
const fs = require('fs');
const path = require('path');

// Charger les données
const dataPath = path.join(__dirname, 'src/data/simplified-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log('🧪 Test de la structure de données simplifiée\n');

// Test 1: Structure générale
console.log('✅ Test 1: Structure générale');
console.log(`- Niveaux: ${data.levels.length}`);
console.log(`- Premier niveau: ${data.levels[0].name} (${data.levels[0].id})`);
console.log(`- Matières dans ${data.levels[0].name}: ${data.levels[0].subjects.length}`);

// Test 2: Matières
console.log('\n✅ Test 2: Matières');
data.levels[0].subjects.forEach(subject => {
  console.log(`- ${subject.name} (${subject.id}): ${subject.lessons.length} leçon(s)`);
});

// Test 3: Leçons et questions
console.log('\n✅ Test 3: Leçons et questions');
data.levels[0].subjects.forEach(subject => {
  subject.lessons.forEach(lesson => {
    console.log(`- ${subject.name} > ${lesson.title}: ${lesson.questions.length} questions`);
    
    // Vérifier les types de questions
    const types = [...new Set(lesson.questions.map(q => q.type))];
    const difficulties = [...new Set(lesson.questions.map(q => q.difficulty))];
    console.log(`  Types: ${types.join(', ')} | Difficultés: ${difficulties.join(', ')}`);
  });
});

// Test 4: Validation des questions
console.log('\n✅ Test 4: Validation des questions');
let totalQuestions = 0;
let validQuestions = 0;

data.levels[0].subjects.forEach(subject => {
  subject.lessons.forEach(lesson => {
    lesson.questions.forEach(question => {
      totalQuestions++;
      
      // Vérifier les champs requis
      const hasRequiredFields = 
        question.id && 
        question.type && 
        question.difficulty && 
        question.question && 
        question.correctAnswer && 
        question.explanation && 
        question.points;
      
      // Vérifier les options pour les questions à choix multiples
      const hasOptions = question.type === 'multiple-choice' ? question.options && question.options.length > 0 : true;
      
      if (hasRequiredFields && hasOptions) {
        validQuestions++;
      } else {
        console.log(`  ❌ Question invalide: ${question.id} dans ${subject.name} > ${lesson.title}`);
      }
    });
  });
});

console.log(`Questions valides: ${validQuestions}/${totalQuestions}`);

// Test 5: Logique de tirage au sort
console.log('\n✅ Test 5: Logique de tirage au sort');
data.levels[0].subjects.forEach(subject => {
  subject.lessons.forEach(lesson => {
    const totalQuestions = lesson.questions.length;
    const questionsToDraw = 10;
    const canDraw = totalQuestions >= questionsToDraw;
    
    console.log(`- ${subject.name} > ${lesson.title}: ${totalQuestions} questions disponibles, ${questionsToDraw} à tirer au sort - ${canDraw ? '✅' : '❌'}`);
  });
});

console.log('\n🎉 Tests terminés !');
console.log('\n📊 Résumé:');
console.log(`- Structure: ${data.levels.length} niveau(x)`);
console.log(`- Matières: ${data.levels[0].subjects.length} matière(s)`);
console.log(`- Leçons: ${data.levels[0].subjects.reduce((acc, subject) => acc + subject.lessons.length, 0)} leçon(s)`);
console.log(`- Questions: ${totalQuestions} question(s) total`);
console.log(`- Questions valides: ${validQuestions}/${totalQuestions}`);

if (validQuestions === totalQuestions) {
  console.log('\n✅ Toutes les questions sont valides !');
} else {
  console.log('\n❌ Certaines questions ont des problèmes.');
} 