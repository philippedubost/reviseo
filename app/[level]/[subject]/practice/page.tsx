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

import ActionButton from '@/src/components/ActionButton';
import BackToLessonsButton from '@/src/components/BackToLessonsButton';
import type { Question } from '@/src/data/simplified-service';

export default function PracticePage() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params.subject as SubjectType;
  const levelId = params.level as string;
  
  const subject = dataService.getSubjectById(subjectId, levelId);
  const [questions, setQuestions] = useState<Question[]>([]);
  
  const [previousStreak, setPreviousStreak] = useState(0);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);

  // Load random questions once when component mounts
  useEffect(() => {
    if (subject) {
      const randomQuestions = dataService.getRandomQuestionsFromAllLessons(subjectId, 10, levelId);
      // Sort questions by difficulty (1 = easy, 2 = medium, 3 = hard)
      const sortedQuestions = randomQuestions.sort((a, b) => a.difficulty - b.difficulty);
      setQuestions(sortedQuestions);
    }
  }, [subject, subjectId, levelId]);

  const {
    updateLessonProgress,
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
    questions: questions,
    onComplete: (score, totalQuestions, correctAnswers) => {
      // En mode pratique, on ne met pas à jour la progression des leçons
      router.push(`/${levelId}/${subjectId}/practice/complete?score=${score}&total=${totalQuestions}&correct=${correctAnswers}`);
    },
    onAnswer: (isCorrect) => {
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

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#181c24] text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Matière non trouvée</h2>
          <Link href={`/${levelId}`}>
            <button className="btn">Retour aux matières</button>
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
          <BackToLessonsButton 
            subject={subjectId}
          />
          <div className="flex items-center gap-2">
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
        questionText={currentQuestion?.question}
        isPracticeMode={true}
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
          isLoading={isLoading}
          onVerify={handleSubmit}
          onNext={handleNext}
          onSkip={handleSkip}
        />
      </div>
    </div>
  );
} 