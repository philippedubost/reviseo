import simplifiedData from './simplified-data.json';

// Types simplifiés
export interface Question {
  id: number;
  type: 'multiple-choice' | 'calculation' | 'input';
  difficulty: 1 | 2 | 3;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  lessons: Lesson[];
}

export interface Level {
  id: string;
  name: string;
  subjects: Subject[];
}

// Service principal
export class DataService {
  private static instance: DataService;
  private data: { levels: Level[] };

  private constructor() {
    this.data = simplifiedData as { levels: Level[] };
  }

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  // Getters principaux
  public getAllLevels(): Level[] {
    return this.data.levels;
  }

  public getLevelById(levelId: string): Level | undefined {
    return this.data.levels.find(level => level.id === levelId);
  }

  public getAllSubjects(levelId?: string): Subject[] {
    if (levelId) {
      const level = this.getLevelById(levelId);
      return level?.subjects || [];
    }
    // Si pas de levelId, retourne tous les sujets de tous les niveaux
    return this.data.levels.flatMap(level => level.subjects);
  }

  public getSubjectById(subjectId: string, levelId?: string): Subject | undefined {
    const subjects = this.getAllSubjects(levelId);
    return subjects.find(subject => subject.id === subjectId);
  }

  public getLessonById(subjectId: string, lessonId: number, levelId?: string): Lesson | undefined {
    const subject = this.getSubjectById(subjectId, levelId);
    return subject?.lessons.find(lesson => lesson.id === lessonId);
  }

  // Fonctions pour les questions
  public getRandomQuestions(subjectId: string, lessonId: number, count: number = 10, levelId?: string): Question[] {
    const lesson = this.getLessonById(subjectId, lessonId, levelId);
    if (!lesson) return [];
    
    const shuffled = [...lesson.questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, lesson.questions.length));
  }

  public getRandomQuestionsFromAllLessons(subjectId: string, count: number = 10, levelId?: string): Question[] {
    const subject = this.getSubjectById(subjectId, levelId);
    if (!subject) return [];
    
    const allQuestions = subject.lessons.flatMap(lesson => lesson.questions);
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, allQuestions.length));
  }

  public getQuestionsByDifficulty(subjectId: string, difficulty: 1 | 2 | 3, count: number = 10, levelId?: string): Question[] {
    const subject = this.getSubjectById(subjectId, levelId);
    if (!subject) return [];
    
    const filteredQuestions = subject.lessons.flatMap(lesson => 
      lesson.questions.filter(q => q.difficulty === difficulty)
    );
    const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, filteredQuestions.length));
  }

  // Fonctions utilitaires
  public getAllLessonsForSubject(subjectId: string, levelId?: string): Lesson[] {
    const subject = this.getSubjectById(subjectId, levelId);
    return subject?.lessons || [];
  }

  public getQuestionById(subjectId: string, lessonId: number, questionId: number, levelId?: string): Question | undefined {
    const lesson = this.getLessonById(subjectId, lessonId, levelId);
    return lesson?.questions.find(q => q.id === questionId);
  }
}

// Export d'une instance singleton
export const dataService = DataService.getInstance();

// Fonctions d'aide pour compatibilité avec l'ancien code
export function getAllSubjects(): Subject[] {
  return dataService.getAllSubjects();
}

export function getSubjectById(id: string): Subject | undefined {
  return dataService.getSubjectById(id);
}

export function getLessonById(subjectId: string, lessonId: number): Lesson | undefined {
  return dataService.getLessonById(subjectId, lessonId);
}

export function getRandomQuestions(subjectId: string, lessonId: number, count: number = 10): Question[] {
  return dataService.getRandomQuestions(subjectId, lessonId, count);
}

export function getRandomQuestionsFromAllLessons(subjectId: string, count: number = 10): Question[] {
  return dataService.getRandomQuestionsFromAllLessons(subjectId, count);
}

export function getAllLessonsForSubject(subjectId: string): Lesson[] {
  return dataService.getAllLessonsForSubject(subjectId);
} 