export interface LLMConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

export const LLM_CONFIGS = {
  // Configuration pour l'analyse de prompt (rapide et précis)
  PROMPT_ANALYSIS: {
    model: 'gpt-4',
    temperature: 0.3,
    maxTokens: 200,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0
  },

  // Configuration pour la génération de questions (créatif mais contrôlé)
  QUESTION_GENERATION: {
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 4000,
    topP: 0.9,
    frequencyPenalty: 0.1,
    presencePenalty: 0.1
  },

  // Configuration pour des questions de très haute qualité (plus conservateur)
  HIGH_QUALITY_GENERATION: {
    model: 'gpt-4-turbo',
    temperature: 0.5,
    maxTokens: 6000,
    topP: 0.8,
    frequencyPenalty: 0.2,
    presencePenalty: 0.2
  }
};

export const SUBJECT_SPECIFIC_PROMPTS = {
  maths: {
    additionalContext: "Inclus des calculs progressifs, des formules LaTeX, et des problèmes contextualisés.",
    examples: [
      "Résous l'équation 2x + 5 = 13",
      "Calcule l'aire d'un cercle de rayon 5 cm",
      "Factorise l'expression x² - 4"
    ]
  },
  histoire: {
    additionalContext: "Focalise sur les dates importantes, les personnages clés, et les événements marquants.",
    examples: [
      "En quelle année a eu lieu la prise de la Bastille?",
      "Qui était Napoléon Bonaparte?",
      "Quelles sont les causes de la Révolution française?"
    ]
  },
  geo: {
    additionalContext: "Inclus des questions sur les pays, capitales, reliefs, et phénomènes géographiques.",
    examples: [
      "Quelle est la capitale du Japon?",
      "Quel est le plus haut sommet du monde?",
      "Explique le phénomène des marées"
    ]
  },
  francais: {
    additionalContext: "Focalise sur la grammaire, la littérature, et l'analyse de texte.",
    examples: [
      "Identifie la nature grammaticale du mot 'rapidement'",
      "Quel est le registre de langue utilisé dans ce texte?",
      "Analyse la figure de style dans cette phrase"
    ]
  },
  svt: {
    additionalContext: "Inclus des questions sur la biologie, l'écologie, et les sciences de la Terre.",
    examples: [
      "Explique le rôle des chloroplastes dans la photosynthèse",
      "Qu'est-ce qu'un écosystème?",
      "Décris le cycle de l'eau"
    ]
  },
  physique: {
    additionalContext: "Focalise sur les lois physiques, les calculs, et les phénomènes naturels.",
    examples: [
      "Calcule la vitesse d'un objet qui parcourt 100m en 10s",
      "Qu'est-ce que la gravitation universelle?",
      "Explique le principe d'Archimède"
    ]
  }
};

export const QUALITY_VALIDATION_RULES = {
  minQuestionLength: 20,
  maxQuestionLength: 200,
  minExplanationLength: 50,
  maxExplanationLength: 300,
  requiredElements: [
    'question_claire',
    'reponse_exacte',
    'explication_detaille',
    'difficulte_adaptee'
  ],
  forbiddenElements: [
    'ambiguite',
    'erreur_factuelle',
    'vocabulaire_inadapte',
    'complexite_excessive'
  ]
};

export function getOptimalConfig(subject: string, difficulty: 'easy' | 'medium' | 'hard'): LLMConfig {
  // Configuration de base
  const baseConfig = LLM_CONFIGS.QUESTION_GENERATION;
  
  // Ajustements selon la difficulté
  const difficultyAdjustments = {
    easy: { temperature: -0.1, maxTokens: -500 },
    medium: { temperature: 0, maxTokens: 0 },
    hard: { temperature: 0.1, maxTokens: 500 }
  };
  
  const adjustment = difficultyAdjustments[difficulty];
  
  return {
    ...baseConfig,
    temperature: Math.max(0.1, Math.min(1.0, baseConfig.temperature + adjustment.temperature)),
    maxTokens: Math.max(1000, baseConfig.maxTokens + adjustment.maxTokens)
  };
}

export function validateQuestionQuality(question: any): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];
  
  // Vérifications de base
  if (!question.question || question.question.length < QUALITY_VALIDATION_RULES.minQuestionLength) {
    issues.push('Question trop courte');
  }
  
  if (question.question && question.question.length > QUALITY_VALIDATION_RULES.maxQuestionLength) {
    issues.push('Question trop longue');
  }
  
  if (!question.explanation || question.explanation.length < QUALITY_VALIDATION_RULES.minExplanationLength) {
    issues.push('Explication insuffisante');
  }
  
  if (!question.correctAnswer || question.correctAnswer.trim() === '') {
    issues.push('Réponse manquante');
  }
  
  // Vérifications spécifiques par type
  if (question.type === 'multiple-choice') {
    if (!question.options || question.options.length !== 4) {
      issues.push('QCM doit avoir exactement 4 options');
    }
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
} 