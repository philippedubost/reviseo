import { LLM_CONFIGS, SUBJECT_SPECIFIC_PROMPTS, getOptimalConfig, validateQuestionQuality } from './llm-config';

export interface LLMQuestion {
  id: number;
  type: 'multiple-choice' | 'calculation' | 'input';
  difficulty: 1 | 2 | 3;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
  latex?: string;
}

export interface LLMLesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: LLMQuestion[];
  subject: string;
  level: string;
  estimatedTime: number; // en minutes
}

export interface GenerationRequest {
  prompt: string;
  subject: string;
  level: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
}

export interface PromptAnalysis {
  subject: string;
  level: string;
  difficulty: 'easy' | 'medium' | 'hard';
  suggestedTitle: string;
  confidence: number;
}

class LLMService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';
    this.baseUrl = 'https://api.openai.com/v1/chat/completions';
  }

  async analyzePrompt(prompt: string): Promise<PromptAnalysis> {
    try {
      const systemPrompt = `Tu es un expert en analyse de contenu éducatif français. Analyse le prompt et extrait les informations suivantes au format JSON :

{
  "subject": "matière détectée (maths, histoire, geo, francais, svt, physique)",
  "level": "niveau scolaire (sixieme, cinquieme, quatrieme, troisieme, seconde, premiere, terminale)",
  "difficulty": "difficulté (easy, medium, hard)",
  "suggestedTitle": "titre suggéré pour la leçon",
  "confidence": nombre_entre_0_et_1
}

Règles :
- Matière : détecte la matière principale mentionnée
- Niveau : cherche des indices comme "6eme", "3eme", "terminale", "brevet", "bac"
- Difficulté : easy pour débutant, medium pour intermédiaire, hard pour expert
- Réponds UNIQUEMENT en JSON valide`;

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Analyse ce prompt: "${prompt}"` }
          ],
          temperature: 0.3,
          max_tokens: 200,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Nettoyer et parser la réponse JSON
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Réponse LLM invalide');
      }

      const analysis = JSON.parse(jsonMatch[0]);
      
      return {
        subject: analysis.subject || 'maths',
        level: analysis.level || 'troisieme',
        difficulty: analysis.difficulty || 'medium',
        suggestedTitle: analysis.suggestedTitle || `Leçon sur ${prompt}`,
        confidence: analysis.confidence || 0.5
      };
    } catch (error) {
      console.error('Erreur lors de l\'analyse du prompt:', error);
      // Fallback vers une analyse basique
      return this.analyzePromptFallback(prompt);
    }
  }

  analyzePromptFallback(prompt: string): PromptAnalysis {
    const lowerPrompt = prompt.toLowerCase();
    
    // Détection de matière
    let subject = 'maths';
    if (lowerPrompt.includes('histoire') || lowerPrompt.includes('révolution') || lowerPrompt.includes('guerre')) {
      subject = 'histoire';
    } else if (lowerPrompt.includes('geo') || lowerPrompt.includes('géographie') || lowerPrompt.includes('pays')) {
      subject = 'geo';
    } else if (lowerPrompt.includes('français') || lowerPrompt.includes('littérature') || lowerPrompt.includes('grammaire')) {
      subject = 'francais';
    } else if (lowerPrompt.includes('svt') || lowerPrompt.includes('biologie') || lowerPrompt.includes('volcan')) {
      subject = 'svt';
    } else if (lowerPrompt.includes('physique') || lowerPrompt.includes('chimie') || lowerPrompt.includes('atome')) {
      subject = 'physique';
    }

    // Détection de niveau
    let level = 'troisieme';
    if (lowerPrompt.includes('6eme') || lowerPrompt.includes('sixième')) {
      level = 'sixieme';
    } else if (lowerPrompt.includes('5eme') || lowerPrompt.includes('cinquième')) {
      level = 'cinquieme';
    } else if (lowerPrompt.includes('4eme') || lowerPrompt.includes('quatrième')) {
      level = 'quatrieme';
    } else if (lowerPrompt.includes('2de') || lowerPrompt.includes('seconde')) {
      level = 'seconde';
    } else if (lowerPrompt.includes('1ere') || lowerPrompt.includes('première')) {
      level = 'premiere';
    } else if (lowerPrompt.includes('terminale') || lowerPrompt.includes('bac')) {
      level = 'terminale';
    }

    // Détection de difficulté
    let difficulty: 'easy' | 'medium' | 'hard' = 'medium';
    if (lowerPrompt.includes('facile') || lowerPrompt.includes('débutant')) {
      difficulty = 'easy';
    } else if (lowerPrompt.includes('difficile') || lowerPrompt.includes('expert')) {
      difficulty = 'hard';
    }

    return {
      subject,
      level,
      difficulty,
      suggestedTitle: `Leçon sur ${prompt}`,
      confidence: 0.3
    };
  }

  async generateLesson(request: GenerationRequest): Promise<LLMLesson> {
    try {
      console.log('🚀 Génération de leçon en cours...', request);

      // En mode développement, utiliser les données mock
      if (process.env.NODE_ENV === 'development' && !process.env.OPENAI_API_KEY) {
        console.log('📝 Mode développement: utilisation des données mock');
        return this.generateMockLesson(request);
      }

      // Configuration optimale selon le sujet et la difficulté
      const config = getOptimalConfig(request.subject, request.difficulty);
      const subjectPrompts = SUBJECT_SPECIFIC_PROMPTS[request.subject as keyof typeof SUBJECT_SPECIFIC_PROMPTS];

      // Construction des prompts améliorés
      const systemPrompt = this.buildEnhancedSystemPrompt(request, subjectPrompts);
      const userPrompt = this.buildEnhancedUserPrompt(request, subjectPrompts);

      console.log('🤖 Appel API OpenAI...');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: config.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: config.temperature,
          max_tokens: config.maxTokens,
          top_p: config.topP,
          frequency_penalty: config.frequencyPenalty,
          presence_penalty: config.presencePenalty
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur API OpenAI: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('Réponse vide de l\'API OpenAI');
      }

      console.log('✅ Réponse reçue, parsing JSON...');
      
      // Tentative de parsing JSON avec gestion d'erreur
      let lessonData;
      try {
        lessonData = JSON.parse(content);
      } catch (error) {
        console.error('❌ Erreur parsing JSON:', error);
        console.log('📄 Contenu reçu:', content);
        throw new Error('Format de réponse invalide de l\'API');
      }

      // Validation de la structure
      if (!lessonData.lesson || !lessonData.lesson.questions) {
        throw new Error('Structure de leçon invalide');
      }

      // Validation de la qualité de chaque question
      const validationResults = lessonData.lesson.questions.map((q: any, index: number) => {
        const validation = validateQuestionQuality(q);
        if (!validation.isValid) {
          console.warn(`⚠️ Question ${index + 1} a des problèmes:`, validation.issues);
        }
        return { question: q, validation };
      });

      // Statistiques de qualité
      const validQuestions = validationResults.filter((r: { validation: { isValid: boolean } }) => r.validation.isValid).length;
      const totalQuestions = validationResults.length;
      console.log(`📊 Qualité des questions: ${validQuestions}/${totalQuestions} valides`);

      // Si trop de questions sont invalides, régénérer
      if (validQuestions < totalQuestions * 0.7) {
        console.warn('⚠️ Trop de questions invalides, régénération...');
        return this.generateLesson(request); // Récursion avec nouvelle tentative
      }

      // Transformation en format Lesson
      const lesson: LLMLesson = {
        id: `llm-${Date.now()}`,
        title: lessonData.lesson.title,
        description: lessonData.lesson.description,
        icon: lessonData.lesson.icon,
        difficulty: lessonData.lesson.difficulty,
        estimatedTime: lessonData.lesson.estimatedTime || 15,
        subject: request.subject,
        level: request.level,
        questions: lessonData.lesson.questions.map((q: any, index: number) => ({
          id: index + 1,
          type: q.type,
          difficulty: q.difficulty || 2,
          question: q.question,
          options: q.options || [],
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          points: q.points || 10,
          latex: q.latex || null
        }))
      };

      console.log('✅ Leçon générée avec succès!', lesson);
      return lesson;

    } catch (error) {
      console.error('❌ Erreur lors de la génération:', error);
      
      // En cas d'erreur, retourner une leçon mock avec un message d'erreur
      const mockLesson = this.generateMockLesson(request);
      mockLesson.title = `Erreur: ${mockLesson.title}`;
      mockLesson.description = `Impossible de générer la leçon: ${error instanceof Error ? error.message : 'Erreur inconnue'}`;
      
      return mockLesson;
    }
  }

  private buildEnhancedSystemPrompt(request: GenerationRequest, subjectPrompts?: any): string {
    const levelInfo = this.getLevelInfo(request.level);
    const subjectInfo = this.getSubjectInfo(request.subject);
    
    let basePrompt = `Tu es un professeur expert français spécialisé dans la création de quiz éducatifs de haute qualité.

CONTEXTE:
- Niveau: ${levelInfo.name} (${levelInfo.description})
- Matière: ${subjectInfo.name}
- Difficulté: ${this.getDifficultyText(request.difficulty)}
- Nombre de questions: ${request.questionCount}

RÈGLES STRICTES POUR DES QUESTIONS DE QUALITÉ:

1. CONTENU PÉDAGOGIQUE:
   - Respecte strictement le programme scolaire français
   - Utilise un vocabulaire adapté à l'âge (${levelInfo.description})
   - Progression logique: commence par des concepts de base, puis plus complexes
   - Questions contextualisées et réalistes

2. TYPES DE QUESTIONS VARIÉS:
   - 40% QCM (4 options, une seule correcte)
   - 30% Calculs/Exercices (avec LaTeX si nécessaire)
   - 30% Questions ouvertes courtes

3. DIFFICULTÉ PROGRESSIVE:
   - Questions 1-3: Niveau facile (concepts de base)
   - Questions 4-7: Niveau intermédiaire (application)
   - Questions 8-10: Niveau avancé (analyse/synthèse)

4. QUALITÉ DES RÉPONSES:
   - Réponses exactes et sans ambiguïté
   - Explications pédagogiques claires et détaillées
   - Points attribués selon la difficulté (5-15 points)

5. FORMAT TECHNIQUE:
   - Utilise LaTeX pour les formules mathématiques
   - Questions claires et concises
   - Options de QCM plausibles et distracteurs efficaces`;

    // Ajout de contexte spécifique à la matière
    if (subjectPrompts) {
      basePrompt += `\n\nCONTEXTE SPÉCIFIQUE À ${subjectInfo.name.toUpperCase()}:
${subjectPrompts.additionalContext}

EXEMPLES DE QUESTIONS POUR ${subjectInfo.name}:
${subjectPrompts.examples.map((ex: string) => `- ${ex}`).join('\n')}`;
    }

    basePrompt += `

STRUCTURE JSON REQUISE:
{
  "lesson": {
    "title": "Titre précis et engageant",
    "description": "Description claire du contenu",
    "icon": "emoji approprié",
    "difficulty": "${request.difficulty}",
    "estimatedTime": nombre_minutes,
    "questions": [
      {
        "id": 1,
        "type": "multiple-choice|calculation|input",
        "difficulty": 1|2|3,
        "question": "Question claire et précise",
        "options": ["A", "B", "C", "D"] (pour QCM uniquement),
        "correctAnswer": "Réponse exacte",
        "explanation": "Explication pédagogique détaillée avec étapes",
        "points": 5-15,
        "latex": "formule_laTeX" (si nécessaire)
      }
    ]
  }
}

IMPORTANT: Réponds UNIQUEMENT en JSON valide. Pas de texte avant ou après le JSON.`;

    return basePrompt;
  }

  private buildEnhancedUserPrompt(request: GenerationRequest, subjectPrompts?: any): string {
    const levelInfo = this.getLevelInfo(request.level);
    const subjectInfo = this.getSubjectInfo(request.subject);
    
    let prompt = `Crée une leçon de ${request.questionCount} questions de haute qualité sur: "${request.prompt}"

CONTEXTE DÉTAILLÉ:
- Sujet: ${request.subject} (${subjectInfo.description})
- Niveau: ${request.level} - ${levelInfo.name} (${levelInfo.description})
- Difficulté: ${request.difficulty}
- Public: Élèves français de ${levelInfo.description}

EXIGENCES SPÉCIFIQUES:
1. Questions adaptées au niveau ${levelInfo.name}
2. Contenu conforme au programme scolaire français
3. Progression pédagogique logique
4. Mélange équilibré de types de questions
5. Explications détaillées pour chaque réponse
6. Utilisation de LaTeX pour les formules si nécessaire`;

    // Ajout d'instructions spécifiques à la matière
    if (subjectPrompts) {
      prompt += `\n7. ${subjectPrompts.additionalContext}`;
    }

    prompt += `\n\nLa leçon doit être engageante, éducative et parfaitement adaptée au niveau scolaire français.`;

    return prompt;
  }

  private getLevelInfo(level: string) {
    const levels: Record<string, { name: string; description: string }> = {
      'sixieme': { name: 'Sixième', description: 'Début du collège (11-12 ans)' },
      'cinquieme': { name: 'Cinquième', description: 'Collège (12-13 ans)' },
      'quatrieme': { name: 'Quatrième', description: 'Collège (13-14 ans)' },
      'troisieme': { name: 'Troisième', description: 'Fin du collège, Brevet (14-15 ans)' },
      'seconde': { name: 'Seconde', description: 'Début du lycée (15-16 ans)' },
      'premiere': { name: 'Première', description: 'Lycée (16-17 ans)' },
      'terminale': { name: 'Terminale', description: 'Fin du lycée, Bac (17-18 ans)' }
    };
    return levels[level] || { name: level, description: 'Niveau scolaire' };
  }

  private getSubjectInfo(subject: string) {
    const subjects: Record<string, { name: string; description: string }> = {
      'maths': { name: 'Mathématiques', description: 'Calcul, géométrie, algèbre' },
      'histoire': { name: 'Histoire', description: 'Histoire de France et du monde' },
      'geo': { name: 'Géographie', description: 'Géographie physique et humaine' },
      'francais': { name: 'Français', description: 'Littérature et grammaire' },
      'svt': { name: 'SVT', description: 'Sciences de la vie et de la Terre' },
      'physique': { name: 'Physique-Chimie', description: 'Sciences physiques' }
    };
    return subjects[subject] || { name: subject, description: 'Matière scolaire' };
  }

  private getDifficultyText(difficulty: string): string {
    const difficulties = {
      'easy': 'Facile - Niveau débutant',
      'medium': 'Intermédiaire - Niveau confirmé', 
      'hard': 'Difficile - Niveau expert'
    };
    return difficulties[difficulty as keyof typeof difficulties] || 'Intermédiaire';
  }

  // Méthode de fallback pour les tests/développement
  generateMockLesson(request: GenerationRequest): LLMLesson {
    const lessonId = `mock_${Date.now()}`;
    const questions: LLMQuestion[] = [];

    for (let i = 1; i <= request.questionCount; i++) {
      questions.push({
        id: i,
        type: i % 3 === 0 ? 'multiple-choice' : i % 3 === 1 ? 'calculation' : 'input',
        difficulty: (i % 3) + 1 as 1 | 2 | 3,
        question: `Question ${i} sur ${request.prompt}`,
        options: i % 3 === 0 ? ['Option A', 'Option B', 'Option C', 'Option D'] : undefined,
        correctAnswer: `Réponse ${i}`,
        explanation: `Explication pour la question ${i}`,
        points: 10,
        latex: i % 2 === 0 ? `x^2 + ${i}x + ${i+1}` : undefined
      });
    }

    return {
      id: lessonId,
      title: `Leçon sur ${request.prompt}`,
      description: `Leçon personnalisée sur ${request.prompt} pour le niveau ${request.level}`,
      icon: '🎯',
      difficulty: request.difficulty,
      estimatedTime: 15,
      subject: request.subject,
      level: request.level,
      questions
    };
  }
}

export const llmService = new LLMService(); 