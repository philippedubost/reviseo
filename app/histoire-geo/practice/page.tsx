'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRandomQuestionsFromAllLessons, type Question } from '@/src/data/histoireGeoLessons';
import { useQuestionLogic } from '@/src/hooks/useQuestionLogic';
import ProgressBar from '@/src/components/ProgressBar';
import StatsBadges from '@/src/components/StatsBadges';
import QuestionDisplay from '@/src/components/QuestionDisplay';
import AnswerOptions from '@/src/components/AnswerOptions';
import ResponseOverlay from '@/src/components/ResponseOverlay';
import ActionButton from '@/src/components/ActionButton';

export default function HistoireGeoPracticePage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [survivalRecord, setSurvivalRecord] = useState(0);
  const [currentRecord, setCurrentRecord] = useState(0);

  // Charger le record de survival depuis localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedRecord = localStorage.getItem('histoireGeoSurvivalRecord');
      setSurvivalRecord(savedRecord ? parseInt(savedRecord) : 0);
    }
  }, []);

  // Générer des questions aléatoires
  useEffect(() => {
    const randomQuestions = getRandomQuestionsFromAllLessons(50); // Plus de questions pour le survival
    setQuestions(randomQuestions);
  }, []);

  // Gérer la fin de session (game over)
  const handleSessionComplete = (finalScore: number) => {
    console.log('Survival session ended with score:', finalScore, 'questionsAnswered:', currentRecord);
    
    // Mettre à jour le record si nécessaire
    if (currentRecord > survivalRecord) {
      localStorage.setItem('histoireGeoSurvivalRecord', currentRecord.toString());
      setSurvivalRecord(currentRecord);
    }
    
    // Rediriger vers une page de game over ou retour à l'accueil
    router.push('/histoire-geo');
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
    questions,
    onComplete: handleSessionComplete
  });

  // Mettre à jour le compteur de questions répondues
  useEffect(() => {
    if (showResult) {
      setCurrentRecord(currentQuestionIndex + 1);
    }
  }, [showResult, currentQuestionIndex]);

  // Gérer la réponse incorrecte (game over immédiat)
  useEffect(() => {
    if (showResult && !isCorrect) {
      // Mettre à jour le record si nécessaire
      if (currentRecord > survivalRecord) {
        localStorage.setItem('histoireGeoSurvivalRecord', currentRecord.toString());
        setSurvivalRecord(currentRecord);
      }
      
      // Attendre un peu avant de rediriger
      setTimeout(() => {
        router.push('/histoire-geo');
      }, 2000);
    }
  }, [showResult, isCorrect, currentRecord, survivalRecord, router]);

  return (
    <div className="h-screen bg-[#181c24] flex flex-col">
      {/* Titre */}
      <div className="text-center pt-2 pb-1 px-4">
        <h1 className="text-lg font-bold text-white mb-1">Mode Survival - Histoire-Géo</h1>
        <p className="text-[#b0b8c1] text-xs">Réponds au plus de questions sans te tromper</p>
      </div>

      {/* Progress Bar */}
      <ProgressBar 
        progress={progress}
        score={currentRecord}
        showScore={false}
      />

      {/* Stats Badges */}
      <StatsBadges 
        streak={currentRecord}
        score={currentRecord}
        completedLessons={0}
        totalLessons={1}
        showProgress={false}
      />

      {/* Record Display */}
      <div className="px-4 py-2">
        <div className="card p-3 text-center">
          <div className="text-sm text-[#b0b8c1] mb-1">Questions répondues</div>
          <div className="text-2xl font-bold text-white">{currentRecord}</div>
          <div className="text-xs text-[#ffd700] mt-1">
            🏆 Record: {survivalRecord} questions
          </div>
        </div>
      </div>

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

      {/* Game Over Warning */}
      {showResult && !isCorrect && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="card p-6 text-center max-w-sm mx-4">
            <div className="text-4xl mb-4">💀</div>
            <h2 className="text-xl font-bold text-white mb-2">Game Over !</h2>
            <p className="text-[#b0b8c1] mb-4">
              Tu as répondu à {currentRecord} questions correctement.
              {currentRecord > survivalRecord && ' Nouveau record ! 🏆'}
            </p>
            <button 
              onClick={() => router.push('/histoire-geo')}
              className="btn bg-[#00baff] text-white font-bold px-6 py-2 rounded-lg"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 