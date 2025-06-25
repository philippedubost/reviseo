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
import FlagButton from '@/src/components/FlagButton';
import ActionButton from '@/src/components/ActionButton';

interface LessonPageProps {
  params: {
    level: string;
    subject: string;
    id: string;
  };
}

export default function LessonPage({ params }: LessonPageProps) {
  const router = useRouter();
  const lessonId = Number(params.id);
  const subjectId = params.subject as SubjectType;
  const levelId = params.level;
  
  const lesson = dataService.getLessonById(subjectId, lessonId, levelId);
  const subject = dataService.getSubjectById(subjectId, levelId);
  
  const [previousStreak, setPreviousStreak] = useState(0);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);

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
    setSelectedAnswer,
    handleAnswerSelect,
    handleSubmit,
    handleSkip,
    handleNext,
    togglePause
  } = useQuestionLogic({
    questions: lesson?.questions || [],
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

      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-400 truncate">
              {subject?.name}
            </div>
            <div className="text-base font-semibold text-white truncate">
              {lesson?.title}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {currentQuestion && (
              <FlagButton
                questionId={currentQuestion.id}
                subjectId={subjectId}
                lessonId={lessonId}
                questionText={currentQuestion.question}
              />
            )}
            <ExitButton onExit={handleExit} />
          </div>
        </div>
      </div>

      {/* Stats Badges */}
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
            options={currentQuestion.options}
            correctAnswer={currentQuestion.correctAnswer}
            questionId={currentQuestion.id}
            subjectId={subjectId}
            lessonId={lessonId}
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
      />

      {/* Action Button */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center px-4">
        <ActionButton
          showResult={showResult}
          showOverlay={showOverlay}
          questionType={currentQuestion?.type || 'multiple-choice'}
          selectedAnswer={selectedAnswer}
          isCorrect={isCorrect}
          countdown={countdown}
          isLastQuestion={isLastQuestion}
          isPaused={isPaused}
          onVerify={handleSubmit}
          onNext={handleNext}
          onSkip={handleSkip}
        />
      </div>
    </div>
  );
} 