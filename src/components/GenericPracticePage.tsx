'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuestionLogic } from '@/src/hooks/useQuestionLogic';
import ProgressBar from '@/src/components/ProgressBar';
import StatsBadges from '@/src/components/StatsBadges';
import QuestionDisplay from '@/src/components/QuestionDisplay';
import AnswerOptions from '@/src/components/AnswerOptions';
import ResponseOverlay from '@/src/components/ResponseOverlay';
import ActionButton from '@/src/components/ActionButton';
import { useLessonProgress, type Subject } from '@/src/hooks/useLessonProgress';
import type { Question } from '@/src/data/lessons';

interface GenericPracticePageProps {
  subject: Subject;
  subjectPath: string;
  subjectName: string;
}

export default function GenericPracticePage({ 
  subject, 
  subjectPath, 
  subjectName
}: GenericPracticePageProps) {
  const router = useRouter();
  const { addXP, updateStreak, totalXP, currentStreak, bestStreak } = useLessonProgress(subject);
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [survivalScore, setSurvivalScore] = useState(0);
  const [survivalRecord, setSurvivalRecord] = useState(0);

  // Load survival record from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedRecord = localStorage.getItem(`${subject}SurvivalRecord`);
      setSurvivalRecord(savedRecord ? parseInt(savedRecord) : 0);
    }
  }, [subject]);

  // Generate random questions - import function based on subject
  useEffect(() => {
    let getRandomQuestionsFromAllLessons: (count: number) => Question[];
    
    switch (subject) {
      case 'maths':
        getRandomQuestionsFromAllLessons = require('@/src/data/lessons').getRandomQuestionsFromAllLessons;
        break;
      case 'francais':
        getRandomQuestionsFromAllLessons = require('@/src/data/francaisLessons').getRandomQuestionsFromAllLessons;
        break;
      case 'histoireGeo':
        getRandomQuestionsFromAllLessons = require('@/src/data/histoireGeoLessons').getRandomQuestionsFromAllLessons;
        break;
      case 'sciences':
        getRandomQuestionsFromAllLessons = require('@/src/data/sciencesLessons').getRandomQuestionsFromAllLessons;
        break;
      default:
        getRandomQuestionsFromAllLessons = require('@/src/data/lessons').getRandomQuestionsFromAllLessons;
    }
    
    const randomQuestions = getRandomQuestionsFromAllLessons(50);
    setQuestions(randomQuestions);
  }, [subject]);

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
    addXP(isCorrect);
    updateStreak(isCorrect);
    
    if (isCorrect) {
      setSurvivalScore(prev => prev + 1);
    } else {
      // Game over on wrong answer
      handleSessionComplete(0, 0, survivalScore);
    }
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
    questions,
    onComplete: handleSessionComplete,
    onAnswer: handleAnswer
  });

  return (
    <div className="h-screen bg-[#181c24] flex flex-col">
      {/* Survival Mode Title */}
      <div className="text-center pt-2 pb-1 px-4">
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