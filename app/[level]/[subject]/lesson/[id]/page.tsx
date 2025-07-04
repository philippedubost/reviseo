'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { dataService } from '@/src/data/simplified-service';
import { useQuestionLogic } from '@/src/hooks/useQuestionLogic';
import { useLessonProgress, SubjectType } from '@/src/hooks/useLessonProgress';
import QuestionDisplay from '@/src/components/QuestionDisplay';
import ResponseOverlay from '@/src/components/ResponseOverlay';
import StatsBadges from '@/src/components/StatsBadges';
import ConfettiManager from '@/src/components/ConfettiManager';
import ProgressBar from '@/src/components/ProgressBar';
import ExitButton from '@/src/components/ExitButton';
import BreadcrumbHeader from '@/src/components/BreadcrumbHeader';

import ActionButton from '@/src/components/ActionButton';
import type { Question } from '@/src/data/simplified-service';

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = Number(params.id as string);
  const subjectId = params.subject as SubjectType;
  const levelId = params.level as string;
  
  const lesson = dataService.getLessonById(subjectId, lessonId, levelId);
  const subject = dataService.getSubjectById(subjectId, levelId);
  
  // Pre-select 10 random questions once when component mounts
  const [randomQuestions, setRandomQuestions] = useState<Question[]>([]);
  
  const [previousStreak, setPreviousStreak] = useState(0);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);

  // Load random questions once when component mounts
  useEffect(() => {
    if (lesson) {
      const questions = dataService.getRandomQuestions(subjectId, lessonId, 10, levelId);
      // Sort questions by difficulty (1 = easy, 2 = medium, 3 = hard)
      const sortedQuestions = questions.sort((a, b) => a.difficulty - b.difficulty);
      setRandomQuestions(sortedQuestions);
    }
  }, [lesson, subjectId, lessonId, levelId]);

  const {
    updateLessonProgress,
    addXP,
    updateStreak,
    totalXP,
    currentStreak,
    bestStreak
  } = useLessonProgress(subjectId, levelId);

  const {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    showResult,
    isCorrect,
    isSkipped,
    sessionScore,
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
    handleSkip,
    handleNext,
    togglePause
  } = useQuestionLogic({
    questions: randomQuestions,
    onComplete: (score, totalQuestions, correctAnswers) => {
      updateLessonProgress(lessonId, score, totalQuestions, correctAnswers);
      router.push(`/${levelId}/${subjectId}/lesson/${lessonId}/complete?score=${score}&total=${totalQuestions}&correct=${correctAnswers}`);
    },
    onAnswer: (isCorrect) => {
      addXP(isCorrect);
      updateStreak(isCorrect);
      
      setLastAnswerCorrect(isCorrect);
      setShowAnswerFeedback(true);
      setTimeout(() => setShowAnswerFeedback(false), 1000);
    }
  });

  useEffect(() => {
    setPreviousStreak(currentStreak);
  }, [currentStreak]);

  const handleExit = () => {
    router.push(`/${levelId}/${subjectId}`);
  };

  if (!lesson || !subject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#181c24] text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Leçon non trouvée</h2>
          <Link href={`/${levelId}/${subjectId}`}>
            <button className="btn">Retour aux leçons</button>
          </Link>
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
        isCorrect={isCorrect}
        subjectColor={subject.color}
      />

      {/* Enhanced Header with Breadcrumb - Level > Subject > Lesson */}
      <BreadcrumbHeader 
        level={levelId}
        subject={subjectId}
        lesson={{
          id: lessonId,
          title: lesson.title
        }}
        showBackButton={true}
        backHref={`/${levelId}/${subjectId}`}
      />

      {/* Stats Badges */}
      <div className="px-4 mt-4">
        <StatsBadges
          xp={totalXP}
          currentStreak={currentStreak}
          bestStreak={bestStreak}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          lastAnswerCorrect={lastAnswerCorrect}
          showAnswerFeedback={showAnswerFeedback}
          isSkipped={isSkipped}
        />
      </div>

      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Main Content */}
      <div className="flex-1 px-4 pb-24">
        {currentQuestion && (
          <QuestionDisplay
            question={currentQuestion.question}
            type={currentQuestion.type}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            onAnswerChange={setSelectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            onSubmit={handleSubmit}
            options={currentQuestion.options}
            correctAnswer={currentQuestion.correctAnswer}
            difficulty={currentQuestion.difficulty}
            // Action button props for calculation and input types
            showOverlay={showOverlay}
            isCorrect={isCorrect}
            countdown={countdown}
            isLastQuestion={isLastQuestion}
            isPaused={isPaused}
            isLoading={isLoading}
            onVerify={handleSubmit}
            onNext={handleNext}
            onSkip={handleSkip}
          />
        )}
      </div>

      {/* Response Overlay */}
      <ResponseOverlay
        show={showOverlay}
        isCorrect={isCorrect}
        isSkipped={isSkipped}
        explanation={currentQuestion?.explanation || ''}
        emoji={currentEmoji}
        countdown={countdown}
        isExiting={isExiting}
        isPaused={isPaused}
        onTogglePause={togglePause}
        onNext={handleNext}
        questionId={currentQuestion?.id}
        subjectId={subjectId}
        lessonId={lessonId}
        questionText={currentQuestion?.question}
        isPracticeMode={false}
        questionType={currentQuestion?.type}
      />

      {/* Action Button - only for multiple-choice questions */}
      {currentQuestion?.type === 'multiple-choice' && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center px-4">
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
            onSkip={handleSkip}
          />
        </div>
      )}
    </div>
  );
} 