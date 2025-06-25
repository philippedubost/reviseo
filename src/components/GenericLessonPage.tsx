'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLessonProgress, SubjectType } from '@/src/hooks/useLessonProgress';
import { getSubjectById, getAllLessonsForSubject, getLessonById, getRandomQuestions } from '@/src/data/simplified-service';
import type { Question, Lesson } from '@/src/data/simplified-service';
import QuestionDisplay from './QuestionDisplay';
import ResponseOverlay from './ResponseOverlay';
import ProgressBar from './ProgressBar';
import StatsBadges from './StatsBadges';
import BackToLessonsButton from './BackToLessonsButton';
import FlagButton from './FlagButton';
import ActionButton from './ActionButton';
import AnswerOptions from './AnswerOptions';
import ExitButton from './ExitButton';
import ConfettiManager from './ConfettiManager';
import { useQuestionLogic } from '@/src/hooks/useQuestionLogic';

interface GenericLessonPageProps {
  subjectPath: string;
}

// Mapping from subject path to Subject type
const subjectPathToType: Record<string, SubjectType> = {
  'maths': 'maths',
  'francais': 'francais',
  'sciences': 'sciences',
  'histoire-geo': 'histoire-geo'
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
  
  // State for answer feedback animations
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const [previousStreak, setPreviousStreak] = useState(0);
  
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
    // Set answer feedback state for animations
    setLastAnswerCorrect(isCorrect);
    setShowAnswerFeedback(true);
    
    // Store previous streak for confetti comparison
    setPreviousStreak(currentStreak);
    
    // Add XP and update streak
    addXP(isCorrect);
    updateStreak(isCorrect);
    
    // Reset feedback state after animation (3 seconds)
    setTimeout(() => {
      setShowAnswerFeedback(false);
    }, 3000);
  };

  // Handle skip (no XP/streak changes)
  const handleSkip = () => {
    // Skip doesn't affect XP or streak, so we don't call handleAnswer
    // The useQuestionLogic hook will handle the skip internally
    setIsSkipped(true);
    setShowAnswerFeedback(true);
    
    // Reset skip state after animation
    setTimeout(() => {
      setIsSkipped(false);
      setShowAnswerFeedback(false);
    }, 3000);
  };
  
  const {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    showResult,
    isCorrect,
    isSkipped: isSkippedFromHook,
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
    handleSkip: handleSkipFromHook,
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

  // Handle exit
  const handleExit = () => {
    router.push(`/${subjectPath}`);
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#181c24] flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Leçon non trouvée</h1>
          <BackToLessonsButton subject={subjectPath as 'maths' | 'francais' | 'sciences' | 'histoire-geo'} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181c24] flex flex-col">
      {/* Confetti Manager */}
      <ConfettiManager 
        currentStreak={currentStreak} 
        previousStreak={previousStreak}
        isCorrect={lastAnswerCorrect ?? undefined}
      />

      {/* Lesson title with exit button */}
      <div className="relative text-center pt-2 pb-1 px-4">
        {/* Exit Button - Top Right */}
        <div className="absolute right-4 top-2 z-10">
          <ExitButton onExit={handleExit} />
        </div>
        
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
        lastAnswerCorrect={lastAnswerCorrect}
        showAnswerFeedback={showAnswerFeedback}
        isSkipped={isSkipped}
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
              onSkip={handleSkipFromHook}
            />
          </>
        )}

        {/* Response Overlay */}
        {showOverlay && (
          <ResponseOverlay
            show={showOverlay}
            isExiting={isExiting}
            isCorrect={isCorrect}
            isSkipped={isSkippedFromHook}
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