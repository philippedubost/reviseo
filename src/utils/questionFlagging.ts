export interface FlaggedQuestion {
  questionId: number;
  subjectId: string;
  lessonId?: number; // Optional for practice mode
  reason: string;
  timestamp: number;
  questionText: string;
  isPracticeMode?: boolean; // Flag to indicate if this was flagged in practice mode
}

const FLAGGED_QUESTIONS_KEY = 'flaggedQuestions';

export function getFlaggedQuestions(): FlaggedQuestion[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const saved = localStorage.getItem(FLAGGED_QUESTIONS_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function flagQuestion(
  questionId: number,
  subjectId: string,
  lessonId?: number,
  reason: string = '',
  questionText: string = '',
  isPracticeMode: boolean = false
): void {
  if (typeof window === 'undefined') return;
  
  const flaggedQuestions = getFlaggedQuestions();
  
  // Check if question is already flagged
  const existingIndex = flaggedQuestions.findIndex(
    fq => fq.questionId === questionId && fq.subjectId === subjectId && fq.lessonId === lessonId
  );
  
  const flaggedQuestion: FlaggedQuestion = {
    questionId,
    subjectId,
    lessonId,
    reason,
    timestamp: Date.now(),
    questionText,
    isPracticeMode
  };
  
  if (existingIndex >= 0) {
    // Update existing flag
    flaggedQuestions[existingIndex] = flaggedQuestion;
  } else {
    // Add new flag
    flaggedQuestions.push(flaggedQuestion);
  }
  
  localStorage.setItem(FLAGGED_QUESTIONS_KEY, JSON.stringify(flaggedQuestions));
}

export function unflagQuestion(
  questionId: number,
  subjectId: string,
  lessonId?: number
): void {
  if (typeof window === 'undefined') return;
  
  const flaggedQuestions = getFlaggedQuestions();
  const filteredQuestions = flaggedQuestions.filter(
    fq => !(fq.questionId === questionId && fq.subjectId === subjectId && fq.lessonId === lessonId)
  );
  
  localStorage.setItem(FLAGGED_QUESTIONS_KEY, JSON.stringify(filteredQuestions));
}

export function isQuestionFlagged(
  questionId: number,
  subjectId: string,
  lessonId?: number
): boolean {
  const flaggedQuestions = getFlaggedQuestions();
  return flaggedQuestions.some(
    fq => fq.questionId === questionId && fq.subjectId === subjectId && fq.lessonId === lessonId
  );
}

export function getFlaggedQuestionsBySubject(subjectId: string): FlaggedQuestion[] {
  const flaggedQuestions = getFlaggedQuestions();
  return flaggedQuestions.filter(fq => fq.subjectId === subjectId);
}

export function getFlaggedQuestionsByLesson(subjectId: string, lessonId: number): FlaggedQuestion[] {
  const flaggedQuestions = getFlaggedQuestions();
  return flaggedQuestions.filter(fq => fq.subjectId === subjectId && fq.lessonId === lessonId);
}

export function getPracticeModeFlaggedQuestions(subjectId: string): FlaggedQuestion[] {
  const flaggedQuestions = getFlaggedQuestions();
  return flaggedQuestions.filter(fq => fq.subjectId === subjectId && fq.isPracticeMode);
} 