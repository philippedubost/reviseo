import type { Question } from '../types';

/**
 * Shuffles an array using the Fisher-Yates algorithm
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Gets random questions from a lesson
 */
export function getRandomQuestions(questions: Question[], count: number = 10): Question[] {
  const shuffled = shuffle(questions);
  return shuffled.slice(0, Math.min(count, questions.length));
}

/**
 * Gets random questions from all lessons
 */
export function getRandomQuestionsFromAllLessons(lessons: any[], count: number = 10): Question[] {
  const allQuestions = lessons.flatMap(lesson => lesson.questions);
  const shuffled = shuffle(allQuestions);
  return shuffled.slice(0, Math.min(count, allQuestions.length));
}

/**
 * Gets questions by difficulty level
 */
export function getQuestionsByDifficulty(questions: Question[], difficulty: 1 | 2 | 3, count: number = 10): Question[] {
  const filteredQuestions = questions.filter(q => q.difficulty === difficulty);
  const shuffled = shuffle(filteredQuestions);
  return shuffled.slice(0, Math.min(count, filteredQuestions.length));
}

/**
 * Gets questions in difficulty order (easy, medium, hard)
 */
export function getQuestionsInDifficultyOrder(questions: Question[]): Question[] {
  return questions.sort((a, b) => a.difficulty - b.difficulty);
} 