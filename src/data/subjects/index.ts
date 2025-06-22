import type { Subject, Lesson, Question, SubjectType } from '../types';
import { lessons as mathsLessons } from './mathematiques';
import { lessons as francaisLessons } from './francais';
import { lessons as sciencesLessons } from './sciences';

// Unified subjects data
export const subjects: Subject[] = [
  {
    id: 'maths',
    name: 'Mathématiques',
    icon: '🔢',
    description: 'Algèbre, géométrie, statistiques',
    color: 'from-[#00baff] to-[#2ecc71]',
    lessons: mathsLessons
  },
  {
    id: 'francais',
    name: 'Français',
    icon: '📝',
    description: 'Grammaire, littérature, expression',
    color: 'from-[#e74c3c] to-[#f39c12]',
    lessons: francaisLessons
  },
  {
    id: 'sciences',
    name: 'Sciences',
    icon: '🧪',
    description: 'Physique, chimie, biologie, géologie',
    color: 'from-[#9b59b6] to-[#8e44ad]',
    lessons: sciencesLessons
  }
];

// Helper functions
export function getSubjectById(id: string): Subject | undefined {
  return subjects.find(subject => subject.id === id);
}

export function getAllSubjects(): Subject[] {
  return subjects;
}

export function getLessonById(subjectId: string, lessonId: number): Lesson | undefined {
  const subject = getSubjectById(subjectId);
  return subject?.lessons.find(lesson => lesson.id === lessonId);
}

export function getRandomQuestions(subjectId: string, lessonId: number, count: number): Question[] {
  const lesson = getLessonById(subjectId, lessonId);
  if (!lesson) return [];
  
  const shuffled = [...lesson.questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, lesson.questions.length));
}

export function getRandomQuestionsFromAllLessons(subjectId: string, count: number): Question[] {
  const subject = getSubjectById(subjectId);
  if (!subject) return [];
  
  const allQuestions = subject.lessons.flatMap(lesson => lesson.questions);
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, allQuestions.length));
}

export function getAllLessonsForSubject(subjectId: string): Lesson[] {
  const subject = getSubjectById(subjectId);
  return subject?.lessons || [];
}

// Export types
export type { Subject, Lesson, Question, SubjectType }; 