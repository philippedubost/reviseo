export interface ValidatedQuestion {
  questionId: number;
  subjectId: string;
  lessonId: number;
  timestamp: number;
  questionText: string;
}

const VALIDATED_QUESTIONS_KEY = 'validatedQuestions';

export function getValidatedQuestions(): ValidatedQuestion[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const saved = localStorage.getItem(VALIDATED_QUESTIONS_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function validateQuestion(
  questionId: number,
  subjectId: string,
  lessonId: number,
  questionText: string = ''
): void {
  if (typeof window === 'undefined') return;
  
  const validatedQuestions = getValidatedQuestions();
  
  // Check if question is already validated
  const existingIndex = validatedQuestions.findIndex(
    vq => vq.questionId === questionId && vq.subjectId === subjectId && vq.lessonId === lessonId
  );
  
  const validatedQuestion: ValidatedQuestion = {
    questionId,
    subjectId,
    lessonId,
    timestamp: Date.now(),
    questionText
  };
  
  if (existingIndex >= 0) {
    // Update existing validation
    validatedQuestions[existingIndex] = validatedQuestion;
  } else {
    // Add new validation
    validatedQuestions.push(validatedQuestion);
  }
  
  localStorage.setItem(VALIDATED_QUESTIONS_KEY, JSON.stringify(validatedQuestions));
}

export function unvalidateQuestion(
  questionId: number,
  subjectId: string,
  lessonId: number
): void {
  if (typeof window === 'undefined') return;
  
  const validatedQuestions = getValidatedQuestions();
  const filteredQuestions = validatedQuestions.filter(
    vq => !(vq.questionId === questionId && vq.subjectId === subjectId && vq.lessonId === lessonId)
  );
  
  localStorage.setItem(VALIDATED_QUESTIONS_KEY, JSON.stringify(filteredQuestions));
}

export function isQuestionValidated(
  questionId: number,
  subjectId: string,
  lessonId: number
): boolean {
  const validatedQuestions = getValidatedQuestions();
  return validatedQuestions.some(
    vq => vq.questionId === questionId && vq.subjectId === subjectId && vq.lessonId === lessonId
  );
}

export function getValidatedQuestionsBySubject(subjectId: string): ValidatedQuestion[] {
  const validatedQuestions = getValidatedQuestions();
  return validatedQuestions.filter(vq => vq.subjectId === subjectId);
}

export function getValidatedQuestionsByLesson(subjectId: string, lessonId: number): ValidatedQuestion[] {
  const validatedQuestions = getValidatedQuestions();
  return validatedQuestions.filter(vq => vq.subjectId === subjectId && vq.lessonId === lessonId);
}