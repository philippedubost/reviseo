// Export all types
export * from './types';

// Export all utilities
export * from './utils';

// Export main subjects functions
export { 
  subjects, 
  getSubjectById, 
  getAllSubjects, 
  getLessonById, 
  getRandomQuestions, 
  getRandomQuestionsFromAllLessons, 
  getAllLessonsForSubject 
} from './subjects';

// Export individual subject modules for direct access
export * as Mathematiques from './subjects/mathematiques';
export * as Francais from './subjects/francais';
export * as Sciences from './subjects/sciences'; 