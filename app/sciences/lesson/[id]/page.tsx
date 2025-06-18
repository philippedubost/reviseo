'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getLessonById, getRandomQuestions, type Question } from '@/src/data/sciencesLessons';
import { useQuestionLogic } from '@/src/hooks/useQuestionLogic';
import ProgressBar from '@/src/components/ProgressBar';
import StatsBadges from '@/src/components/StatsBadges';
import QuestionDisplay from '@/src/components/QuestionDisplay';
import AnswerOptions from '@/src/components/AnswerOptions';
import ResponseOverlay from '@/src/components/ResponseOverlay';
import ActionButton from '@/src/components/ActionButton';
import BackToLessonsButton from '@/src/components/BackToLessonsButton';
import { useLessonProgress } from '@/src/hooks/useLessonProgress';

export default function SciencesLessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = parseInt(params.id as string);
  
  const { updateLessonProgress } = useLessonProgress('sciences');
  const lesson = getLessonById(lessonId);
  
  // Get 10 random questions from the lesson
  const [lessonQuestions, setLessonQuestions] = useState<Question[]>([]);
  
  useEffect(() => {
    if (lesson) {
      const randomQuestions = getRandomQuestions(lessonId, 10);
      setLessonQuestions(randomQuestions);
    }
  }, [lesson, lessonId]);
  
  // Debug logging
  console.log('Sciences lesson page loaded:', { 
    lessonId, 
    lesson: !!lesson, 
    questionsCount: lessonQuestions.length,
    lessonTitle: lesson?.title,
    firstQuestion: lessonQuestions[0]?.question
  });
  
  const [lessonScore, setLessonScore] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState(0);

  // Gérer la fin de session
  const handleSessionComplete = (finalScore: number) => {
    console.log('Session completed with score:', finalScore, 'rawScore:', rawScore);
    // Rediriger vers la page de completion avec le score brut (points)
    router.push(`/sciences/lesson/${lessonId}/complete?score=${rawScore}`);
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
    questions: lessonQuestions,
    onComplete: handleSessionComplete
  });

  // Debug logging for questions
  console.log('Questions passed to hook:', { 
    questionsCount: lessonQuestions.length || 0,
    currentQuestionIndex,
    isLastQuestion,
    rawScore
  });

  // Sauvegarder la progression quand une question est terminée
  useEffect(() => {
    if (showResult && lesson && currentQuestionIndex < lessonQuestions.length) {
      const newCompletedQuestions = completedQuestions + 1;
      
      setCompletedQuestions(newCompletedQuestions);
      setLessonScore(score); // Utiliser le pourcentage pour l'affichage
      
      // Sauvegarder dans localStorage avec le score brut du hook
      updateLessonProgress(lessonId, newCompletedQuestions, rawScore);
    }
  }, [showResult, isCorrect, lesson, lessonId, updateLessonProgress, currentQuestionIndex, score, rawScore, completedQuestions, lessonQuestions.length]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#181c24] flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Leçon non trouvée</h1>
          <BackToLessonsButton subject="sciences" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#181c24] flex flex-col">
      {/* Titre de la leçon */}
      <div className="text-center pt-2 pb-1 px-4">
        <h1 className="text-lg font-bold text-white mb-1">{lesson.title}</h1>
        <p className="text-[#b0b8c1] text-xs">{lesson.description}</p>
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