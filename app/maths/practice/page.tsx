'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRandomQuestionsFromAllLessons, type Question } from '@/src/data/lessons';
import { useQuestionLogic } from '@/src/hooks/useQuestionLogic';
import ProgressBar from '@/src/components/ProgressBar';
import StatsBadges from '@/src/components/StatsBadges';
import QuestionDisplay from '@/src/components/QuestionDisplay';
import AnswerOptions from '@/src/components/AnswerOptions';
import ResponseOverlay from '@/src/components/ResponseOverlay';
import ActionButton from '@/src/components/ActionButton';

export default function PracticePage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [survivalScore, setSurvivalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [survivalRecord, setSurvivalRecord] = useState(0);

  useEffect(() => {
    // Charger le record existant
    if (typeof window !== 'undefined') {
      const savedRecord = localStorage.getItem('survivalRecord');
      setSurvivalRecord(savedRecord ? parseInt(savedRecord) : 0);
    }
  }, []);

  useEffect(() => {
    // Get random questions from all lessons
    const randomQuestions = getRandomQuestionsFromAllLessons(50); // Plus de questions pour le survival
    setQuestions(randomQuestions);
  }, []);

  const {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    showResult,
    isCorrect,
    score,
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
  } = useQuestionLogic({ questions });

  // Gérer le game over en mode survival
  useEffect(() => {
    if (showResult && !isCorrect) {
      setGameOver(true);
      setSurvivalScore(currentQuestionIndex);
      
      // Mettre à jour le record si nécessaire
      if (currentQuestionIndex > survivalRecord) {
        const newRecord = currentQuestionIndex;
        setSurvivalRecord(newRecord);
        localStorage.setItem('survivalRecord', newRecord.toString());
      }
    }
  }, [showResult, isCorrect, currentQuestionIndex, survivalRecord]);

  const handleRestart = () => {
    setGameOver(false);
    setSurvivalScore(0);
    window.location.reload(); // Recharger avec de nouvelles questions
  };

  const handleBackToMenu = () => {
    router.push('/maths');
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#181c24] flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Chargement...</h1>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-[#181c24] flex items-center justify-center">
        <div className="text-white text-center max-w-md mx-4">
          <div className="text-6xl mb-6">💀</div>
          <h1 className="text-3xl font-bold mb-4 text-[#ff6b6b]">GAME OVER</h1>
          <div className="text-xl mb-2">Score: {survivalScore} questions</div>
          <div className="text-lg mb-6 text-[#ffd700]">
            🏆 Record: {survivalRecord} questions
          </div>
          {survivalScore === survivalRecord && survivalScore > 0 && (
            <div className="text-lg mb-6 text-[#2ecc71]">
              🎉 Nouveau record !
            </div>
          )}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleRestart}
              className="btn bg-[#ff6b6b] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#ff5252] transition-colors"
            >
              🔄 Recommencer
            </button>
            <button
              onClick={handleBackToMenu}
              className="btn bg-[#232a36] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#2c3440] transition-colors"
            >
              🏠 Retour au menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181c24] flex flex-col">
      {/* Titre du mode Survival */}
      <div className="text-center mt-4 mb-2 px-4">
        <h1 className="text-xl font-bold text-white mb-1">Mode Survival</h1>
        <p className="text-[#b0b8c1] text-sm">Répondez au plus de questions sans vous tromper</p>
        <div className="text-sm text-[#ffd700] mt-1">
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
        streak={streak}
        score={survivalScore}
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