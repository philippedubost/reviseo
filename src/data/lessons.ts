import type { Question, Lesson } from './types';
import { subjects } from './subjects';
import { 
  getRandomQuestions as getRandomQuestionsFromArray, 
  getRandomQuestionsFromAllLessons as getRandomFromAllLessons,
  getQuestionsByDifficulty as getQuestionsByDifficultyFromArray 
} from './utils';

/**
 * Get all lessons from all subjects
 */
export function getAllLessons(): Lesson[] {
  return subjects.flatMap(subject => subject.lessons);
}

/**
 * Get random questions from a specific lesson
 */
export function getRandomQuestions(lessonId: number, count: number = 10): Question[] {
  const allLessons = getAllLessons();
  const lesson = allLessons.find(l => l.id === lessonId);
  if (!lesson) return [];
  
  return getRandomQuestionsFromArray(lesson.questions, count);
}

/**
 * Get random questions from all lessons across all subjects
 */
export function getRandomQuestionsFromAllLessons(count: number = 10): Question[] {
  const allLessons = getAllLessons();
  return getRandomFromAllLessons(allLessons, count);
}

/**
 * Get questions by difficulty from all subjects
 */
export function getQuestionsByDifficulty(difficulty: 1 | 2 | 3, count: number = 10): Question[] {
  const allLessons = getAllLessons();
  const allQuestions = allLessons.flatMap(lesson => lesson.questions);
  return getQuestionsByDifficultyFromArray(allQuestions, difficulty, count);
}

// Export the Question type
export type { Question }; 