import type { Lesson, Question } from '../../types';
import { lessons } from './lessons';
import { getRandomQuestions, getRandomQuestionsFromAllLessons as getRandomFromAll, getQuestionsByDifficulty, getQuestionsInDifficultyOrder } from '../../utils';

export { lessons };
export type { Lesson, Question };

// Subject-specific functions
export function getLessonById(id: number): Lesson | undefined {
  return lessons.find(lesson => lesson.id === id);
}

export function getAllLessons(): Lesson[] {
  return lessons;
}

export function getQuestionsByLessonId(lessonId: number): Question[] {
  const lesson = getLessonById(lessonId);
  return lesson?.questions || [];
}

export function getRandomQuestionsFromLesson(lessonId: number, count: number = 10): Question[] {
  const lesson = getLessonById(lessonId);
  if (!lesson) return [];
  return getRandomQuestions(lesson.questions, count);
}

export function getRandomQuestionsFromAllLessons(count: number = 10): Question[] {
  return getRandomFromAll(lessons, count);
}

export function getQuestionsByDifficultyFromLesson(lessonId: number, difficulty: 1 | 2 | 3, count: number = 10): Question[] {
  const lesson = getLessonById(lessonId);
  if (!lesson) return [];
  return getQuestionsByDifficulty(lesson.questions, difficulty, count);
}

export function getQuestionsInDifficultyOrderFromLesson(lessonId: number): Question[] {
  const lesson = getLessonById(lessonId);
  if (!lesson) return [];
  return getQuestionsInDifficultyOrder(lesson.questions);
} 