'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLessonProgress, SubjectType } from '@/src/hooks/useLessonProgress';
import { getSubjectById, getAllLessonsForSubject } from '@/src/data/subjects';
import type { Question, Lesson } from '@/src/data/types';
import { getLessonById, getRandomQuestions } from '@/src/data/subjects';
import QuestionDisplay from './QuestionDisplay';
import ResponseOverlay from './ResponseOverlay';
import ProgressBar from './ProgressBar';
import StatsBadges from './StatsBadges';
import BackToLessonsButton from './BackToLessonsButton';
import FlagButton from './FlagButton';
import ActionButton from './ActionButton';
import AnswerOptions from './AnswerOptions';
import { useQuestionLogic } from '@/src/hooks/useQuestionLogic';

interface GenericLessonPageProps {
  subjectPath: string;
}

// Mapping from subject path to Subject type
const subjectPathToType: Record<string, SubjectType> = {
  'maths': 'maths',
  'francais': 'francais',
  'sciences': 'sciences'
};

export default function GenericLessonPage({ 
  subjectPath
}: GenericLessonPageProps) {
  const params = useParams();
  const router = useRouter();
  const lessonId = parseInt(params.id as string);
  
  const subject = subjectPathToType[subjectPath];
  const { updateLessonProgress, addXP, updateStreak, totalXP, currentStreak, bestStreak, calculateSubjectProgress } = useLessonProgress(subject);
  
  // Get lesson and questions based on subject
  const [lesson, setLesson] = useState<Lesson | undefined>(undefined);
  const [lessonQuestions, setLessonQuestions] = useState<Question[]>([]);
  
  useEffect(() => {
    const currentLesson = getLessonById(subject, lessonId);
    setLesson(currentLesson);
    
    if (currentLesson) {
      const randomQuestions = getRandomQuestions(subject, lessonId, 10);
      setLessonQuestions(randomQuestions);
    }
  }, [subject, lessonId]);
  
  // Debug logging
  console.log(`${subject} lesson page loaded:`, { 
    lessonId, 
    lesson: !!lesson, 
    questionsCount: lessonQuestions.length,
    lessonTitle: lesson?.title,
    firstQuestion: lessonQuestions[0]?.question
  });
  
  const [sessionScore, setSessionScore] = useState(0);

  // Handle session completion
  const handleSessionComplete = (finalScore: number, totalQuestions: number, correctAnswers: number) => {
    console.log('Session completed:', { finalScore, totalQuestions, correctAnswers });
    // Redirect to completion page with session data
    router.push(`/${subjectPath}/lesson/${lessonId}/complete?score=${finalScore}&total=${totalQuestions}&correct=${correctAnswers}`);
  };

  // Handle individual answer for XP and streak updates
  const handleAnswer = (isCorrect: boolean) => {
    addXP(isCorrect);
    updateStreak(isCorrect);
  };
  
  const {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    showResult,
    isCorrect,
    sessionScore: currentSessionScore,
    correctAnswers,
    totalQuestions,
    streak,
    countdown,
    showOverlay,
    isExiting,
    currentEmoji,
    progress,
    isLastQuestion,
    isPaused,
    skippedQuestions,
    setSelectedAnswer,
    handleAnswerSelect,
    handleSubmit,
    handleSkip,
    handleNext,
    togglePause
  } = useQuestionLogic({ 
    questions: lessonQuestions,
    onComplete: handleSessionComplete,
    onAnswer: handleAnswer
  });

  // Handle Enter key to trigger "suivant" when overlay is shown
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && showOverlay && !isExiting) {
        handleNext();
      }
    };

    if (showOverlay) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showOverlay, isExiting]);

  // Debug logging for questions
  console.log('Questions passed to hook:', { 
    questionsCount: lessonQuestions.length || 0,
    currentQuestionIndex,
    isLastQuestion,
    correctAnswers,
    totalQuestions
  });

  // Save progress when session is completed
  useEffect(() => {
    if (isLastQuestion && showResult && lesson) {
      setSessionScore(currentSessionScore);
      // Save lesson progress with session score, completed questions, and correct answers
      updateLessonProgress(lessonId, currentSessionScore, totalQuestions, correctAnswers);
    }
  }, [isLastQuestion, showResult, lesson, lessonId, updateLessonProgress, currentSessionScore, totalQuestions, correctAnswers]);

  // Calculate subject progress percentage
  const subjectProgressPercentage = calculateSubjectProgress();

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#181c24] flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Leçon non trouvée</h1>
          <BackToLessonsButton subject={subjectPath as 'maths' | 'francais' | 'sciences'} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#181c24] flex flex-col">
      {/* Lesson title */}
      <div className="text-center pt-2 pb-1 px-4">
        <h1 className="text-lg font-bold text-white mb-1">{lesson.title}</h1>
        <p className="text-[#b0b8c1] text-xs">{lesson.description}</p>
      </div>

      {/* Progress Bar */}
      <ProgressBar 
        progress={progress}
        score={currentSessionScore}
        showScore={false}
      />

      {/* Stats Badges */}
      <StatsBadges 
        xp={totalXP}
        currentStreak={currentStreak}
        bestStreak={bestStreak}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        showProgress={false}
        showStreaks={true}
        subjectProgress={subjectProgressPercentage}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-start px-4 pt-4">
        {currentQuestion && (
          <>
            <QuestionDisplay
              question={currentQuestion.question}
              type={currentQuestion.type}
              selectedAnswer={selectedAnswer}
              showResult={showResult}
              onAnswerChange={setSelectedAnswer}
              onAnswerSelect={handleAnswerSelect}
              onSubmit={handleSubmit}
              questionId={currentQuestion.id}
              subjectId={subject}
              lessonId={lessonId}
            />

            {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
              <AnswerOptions
                options={currentQuestion.options}
                selectedAnswer={selectedAnswer}
                showResult={showResult}
                correctAnswer={currentQuestion.correctAnswer}
                onAnswerSelect={handleAnswerSelect}
              />
            )}

            <ActionButton
              showResult={showResult}
              showOverlay={showOverlay}
              questionType={currentQuestion.type}
              selectedAnswer={selectedAnswer}
              isCorrect={isCorrect}
              countdown={countdown}
              isLastQuestion={isLastQuestion}
              isPaused={isPaused}
              onVerify={handleSubmit}
              onNext={handleNext}
              onSkip={handleSkip}
            />
          </>
        )}

        {/* Response Overlay */}
        {showOverlay && (
          <ResponseOverlay
            show={showOverlay}
            isExiting={isExiting}
            isCorrect={isCorrect}
            explanation={currentQuestion.explanation}
            countdown={countdown}
            emoji={currentEmoji}
            isPaused={isPaused}
            onTogglePause={togglePause}
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  );
} 