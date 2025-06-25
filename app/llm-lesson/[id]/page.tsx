'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import type { LLMQuestion, LLMLesson } from '@/src/services/llm-service';
import QuestionDisplay from '@/src/components/QuestionDisplay';
import ResponseOverlay from '@/src/components/ResponseOverlay';
import ProgressBar from '@/src/components/ProgressBar';
import StatsBadges from '@/src/components/StatsBadges';
import ExitButton from '@/src/components/ExitButton';
import ConfettiManager from '@/src/components/ConfettiManager';
import { useQuestionLogic } from '@/src/hooks/useQuestionLogic';

export default function LLMLessonPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id as string;

  const [lesson, setLesson] = useState<LLMLesson | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [previousStreak, setPreviousStreak] = useState(0);

  // Récupérer la leçon depuis le localStorage
  useEffect(() => {
    const savedLesson = localStorage.getItem(`llm_lesson_${lessonId}`);
    if (savedLesson) {
      const parsedLesson = JSON.parse(savedLesson);
      setLesson(parsedLesson);
      setTotalQuestions(parsedLesson.questions.length);
    } else {
      // Rediriger vers la page d'accueil si la leçon n'existe pas
      router.push('/');
    }
  }, [lessonId, router]);

  const currentQuestion = lesson?.questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleAnswerChange = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!currentQuestion) return;

    const isCorrect = selectedAnswer.toLowerCase().trim() === 
                     currentQuestion.correctAnswer.toLowerCase().trim();
    
    setShowResult(true);
    
    if (isCorrect) {
      setScore(prev => prev + currentQuestion.points);
      setPreviousStreak(correctAnswers);
      setCorrectAnswers(prev => prev + 1);
    }

    // Attendre un peu avant de passer à la question suivante
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer('');
        setShowResult(false);
      } else {
        setIsComplete(true);
        setShowConfetti(true);
      }
    }, 2000);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setShowResult(false);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowResult(false);
    setScore(0);
    setCorrectAnswers(0);
    setPreviousStreak(0);
    setIsComplete(false);
    setShowConfetti(false);
  };

  const handleExit = () => {
    router.push('/');
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#181c24] flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#181c24] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-6xl mb-6"
          >
            🎉
          </motion.div>
          
          <h1 className="text-2xl font-bold text-white mb-4">
            Leçon terminée !
          </h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Score total</span>
                <span className="text-2xl font-bold text-green-400">{score}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Réponses correctes</span>
                <span className="text-xl text-blue-400">
                  {correctAnswers}/{totalQuestions}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Pourcentage</span>
                <span className="text-xl text-purple-400">
                  {Math.round((correctAnswers / totalQuestions) * 100)}%
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <motion.button
              onClick={handleRetry}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Recommencer
            </motion.button>
            
            <motion.button
              onClick={handleExit}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🏠 Retour à l'accueil
            </motion.button>
          </div>
        </motion.div>
        
        {showConfetti && (
          <ConfettiManager
            currentStreak={correctAnswers}
            previousStreak={previousStreak}
            isLessonComplete={true}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181c24] flex flex-col">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="text-2xl"
            >
              {lesson.icon}
            </motion.div>
            <div>
              <h1 className="text-lg font-bold text-white">{lesson.title}</h1>
              <p className="text-sm text-gray-400">{lesson.description}</p>
            </div>
          </div>
          <ExitButton onExit={handleExit} />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4">
        <ProgressBar 
          progress={((currentQuestionIndex + 1) / totalQuestions) * 100}
          score={score}
          showScore={true}
        />
      </div>

      {/* Stats */}
      <div className="px-4 mb-4">
        <StatsBadges
          xp={score}
          currentStreak={correctAnswers}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
        />
      </div>

      {/* Question Display */}
      <div className="flex-1 px-4 pb-4">
        {currentQuestion && (
          <QuestionDisplay
            question={currentQuestion.question}
            latex={currentQuestion.latex}
            type={currentQuestion.type}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            onAnswerChange={handleAnswerChange}
            onAnswerSelect={handleAnswerSelect}
            options={currentQuestion.options}
            correctAnswer={currentQuestion.correctAnswer}
            difficulty={currentQuestion.difficulty}
          />
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4">
        {!showResult ? (
          <motion.button
            onClick={handleSubmit}
            disabled={!selectedAnswer.trim()}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
            whileHover={{ scale: selectedAnswer.trim() ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
          >
            ✅ Valider ma réponse
          </motion.button>
        ) : (
          <motion.button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentQuestionIndex < totalQuestions - 1 ? '⏭️ Question suivante' : '🏁 Terminer'}
          </motion.button>
        )}
      </div>

      {/* Response Overlay */}
      {showResult && currentQuestion && (
        <ResponseOverlay
          show={showResult}
          isExiting={false}
          isCorrect={selectedAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim()}
          explanation={currentQuestion.explanation}
          countdown={2}
          emoji={selectedAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim() ? '✅' : '❌'}
          isPaused={false}
          onTogglePause={() => {}}
          onNext={handleNext}
        />
      )}
    </div>
  );
} 