export interface Question {
  id: number;
  type: 'multiple-choice' | 'calculation';
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
  questions: Question[];
  difficulty: 'easy' | 'medium' | 'hard';
  completed?: boolean;
  completedQuestions?: number;
  correctAnswers?: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  lessons: Lesson[];
}

export type SubjectType = 'maths' | 'francais' | 'sciences'; 