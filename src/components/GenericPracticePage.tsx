'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLessonProgress, SubjectType } from '@/src/hooks/useLessonProgress';
import { getSubjectById, getAllLessonsForSubject, getRandomQuestionsFromAllLessons } from '@/src/data/simplified-service';
import type { Question } from '@/src/data/simplified-service';
import QuestionDisplay from './QuestionDisplay';
import ResponseOverlay from './ResponseOverlay';
import ProgressBar from './ProgressBar';
import StatsBadges from './StatsBadges';
import BackToLessonsButton from './BackToLessonsButton';
import FlagButton from './FlagButton';
import ActionButton from '@/src/components/ActionButton';
import AnswerOptions from './AnswerOptions';
import ExitButton from './ExitButton';
import ConfettiManager from './ConfettiManager';
import { useQuestionLogic } from '@/src/hooks/useQuestionLogic';

interface GenericPracticePageProps {
  subject: SubjectType;
  subjectPath: string;
  subjectName: string;
}

export default function GenericPracticePage({ 
  subject, 
  subjectPath, 
  subjectName
}: GenericPracticePageProps) {
  const router = useRouter();
  const { addXP, updateStreak, totalXP, currentStreak, bestStreak, calculateSubjectProgress } = useLessonProgress(subject);
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [survivalScore, setSurvivalScore] = useState(0);
  const [survivalRecord, setSurvivalRecord] = useState(0);
  
  // State for answer feedback animations
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const [previousStreak, setPreviousStreak] = useState(0);

  // Load survival record from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedRecord = localStorage.getItem(`${subject}SurvivalRecord`);
      setSurvivalRecord(savedRecord ? parseInt(savedRecord) : 0);
    }
  }, [subject]);

  // Generate random questions from unified data structure
  useEffect(() => {
    const randomQuestions = getRandomQuestionsFromAllLessons(subject, 50);
    // Sort questions by difficulty (1 = easy, 2 = medium, 3 = hard)
    const sortedQuestions = randomQuestions.sort((a, b) => a.difficulty - b.difficulty);
    setQuestions(sortedQuestions);
  }, [subject]);

  // Calculate subject progress percentage
  const subjectProgressPercentage = calculateSubjectProgress();

  // Handle session completion (game over)
  const handleSessionComplete = (finalScore: number, totalQuestions: number, correctAnswers: number) => {
    console.log('Survival mode completed:', { finalScore, totalQuestions, correctAnswers });
    
    // Update survival record if better
    if (correctAnswers > survivalRecord) {
      setSurvivalRecord(correctAnswers);
      if (typeof window !== 'undefined') {
        localStorage.setItem(`${subject}SurvivalRecord`, correctAnswers.toString());
      }
    }
    
    // Redirect to home page or show game over screen
    router.push(`/${subjectPath}`);
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
    
    if (isCorrect) {
      setSurvivalScore(prev => prev + 1);
    } else {
      // Game over on wrong answer
      handleSessionComplete(0, 0, survivalScore);
    }
    
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
    isLoading,
    setSelectedAnswer,
    handleAnswerSelect,
    handleSubmit,
    handleSkip: handleSkipFromHook,
    handleNext,
    togglePause
  } = useQuestionLogic({ 
    questions,
    onComplete: handleSessionComplete,
    onAnswer: handleAnswer
  });

  // Handle exit
  const handleExit = () => {
    router.push(`/${subjectPath}`);
  };

  return (
    <div className="min-h-screen bg-[#181c24] flex flex-col">
      {/* Confetti Manager */}
      <ConfettiManager 
        currentStreak={currentStreak} 
        previousStreak={previousStreak}
        isCorrect={lastAnswerCorrect ?? undefined}
      />

      {/* Survival Mode Title with exit button */}
      <div className="relative text-center pt-2 pb-1 px-4">
        {/* Exit Button - Top Right */}
        <div className="absolute right-4 top-2 z-10">
          <ExitButton onExit={handleExit} />
        </div>
        
        <h1 className="text-lg font-bold text-white mb-1">Mode Survival - {subjectName}</h1>
        <p className="text-[#b0b8c1] text-xs">Répondez au plus de questions sans vous tromper</p>
        <div className="text-xs text-[#ffd700] mt-1">
          🏆 Record: {survivalRecord} questions
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar 
        progress={progress}
        score={survivalScore}
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
              isPracticeMode={true}
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
              isLoading={isLoading}
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