'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getLessonById, type Question } from '@/src/data/lessons';
import { useQuestionLogic } from '@/src/hooks/useQuestionLogic';
import ProgressBar from '@/src/components/ProgressBar';
import StatsBadges from '@/src/components/StatsBadges';
import QuestionDisplay from '@/src/components/QuestionDisplay';
import AnswerOptions from '@/src/components/AnswerOptions';
import ResponseOverlay from '@/src/components/ResponseOverlay';
import ActionButton from '@/src/components/ActionButton';
import { useLessonProgress } from '@/src/hooks/useLessonProgress';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = parseInt(params.id as string);
  
  const { updateLessonProgress } = useLessonProgress();
  const lesson = getLessonById(lessonId);
  
  const [lessonScore, setLessonScore] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState(0);

  // Gérer la fin de session
  const handleSessionComplete = (finalScore: number) => {
    // Rediriger vers la page principale après un court délai
    setTimeout(() => {
      router.push('/maths');
    }, 2000);
  };
  
  const {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    showResult,
    isCorrect,
    score,
    rawScore,
    streak,
    countdown,
    showOverlay,
    isExiting,
    currentEmoji,
    progress,
    isLastQuestion,
    isPaused,
    setSelectedAnswer,
    handleAnswerSelect,
    handleSubmit,
    handleNext,
    togglePause
  } = useQuestionLogic({ 
    questions: lesson?.questions || [],
    onComplete: handleSessionComplete
  });

  // Sauvegarder la progression quand une question est terminée
  useEffect(() => {
    if (showResult && lesson && currentQuestionIndex < lesson.questions.length) {
      const newCompletedQuestions = completedQuestions + 1;
      
      setCompletedQuestions(newCompletedQuestions);
      setLessonScore(score); // Utiliser le pourcentage pour l'affichage
      
      // Sauvegarder dans localStorage avec le score brut du hook
      updateLessonProgress(lessonId, newCompletedQuestions, rawScore);
    }
  }, [showResult, isCorrect, lesson, lessonId, updateLessonProgress, currentQuestionIndex, score, rawScore, completedQuestions]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#181c24] flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Leçon non trouvée</h1>
          <button 
            onClick={() => router.push('/maths')}
            className="btn bg-[#00baff] text-white font-bold px-6 py-2 rounded-lg"
          >
            Retour aux leçons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181c24] flex flex-col">
      {/* Titre de la leçon */}
      <div className="text-center mt-4 mb-2 px-4">
        <h1 className="text-xl font-bold text-white mb-1">{lesson.title}</h1>
        <p className="text-[#b0b8c1] text-sm">{lesson.description}</p>
      </div>

      {/* Progress Bar */}
      <ProgressBar 
        progress={progress}
        score={lessonScore}
        showScore={false}
      />

      {/* Stats Badges */}
      <StatsBadges 
        streak={streak}
        score={lessonScore}
        completedLessons={0}
        totalLessons={1}
        showProgress={false}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
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