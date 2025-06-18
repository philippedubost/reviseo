import { useState, useEffect } from 'react';
import type { Question } from '../data/lessons';
import { compareAnswers } from '../utils/answerValidation';

interface UseQuestionLogicProps {
  questions: Question[];
  onComplete?: (score: number) => void;
}

export function useQuestionLogic({ questions, onComplete }: UseQuestionLogicProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState('🎉');
  const [isPaused, setIsPaused] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const getCelebrationEmoji = () => {
    const emojis = ['🎉', '🎊', '🏆', '⭐', '🌟', '💫', '✨', '🔥', '💪', '👏', '🎯', '🥇'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    
    // For multiple choice questions, automatically validate the answer
    if (currentQuestion.options) {
      const correct = compareAnswers(answer, currentQuestion.correctAnswer);
      setIsCorrect(correct);
      setShowResult(true);
      if (correct) {
        setScore(score + currentQuestion.points);
        setStreak(streak + 1);
      } else {
        setStreak(0);
      }
    }
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    const correct = compareAnswers(selectedAnswer, currentQuestion.correctAnswer);
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      setScore(score + currentQuestion.points);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    // Réinitialiser l'état de pause
    setIsPaused(false);
    setCountdown(null);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      // Session completed - arrêter le countdown et l'overlay
      setShowOverlay(false);
      setCountdown(null);
      setIsPaused(false);
      setShowResult(false);
      
      // Debug logging
      console.log('Lesson completed in hook:', { 
        currentQuestionIndex, 
        questionsLength: questions.length, 
        score, 
        onComplete: !!onComplete 
      });
      
      // Session completed
      if (onComplete) {
        onComplete(score);
      }
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Handle overlay animations
  useEffect(() => {
    if (showResult && currentQuestionIndex < questions.length) {
      setShowOverlay(true);
      setIsExiting(false);
      setCountdown(5);
      setCurrentEmoji(getCelebrationEmoji());
      setIsPaused(false);
    } else {
      if (showOverlay) {
        setIsExiting(true);
        setTimeout(() => {
          setShowOverlay(false);
          setIsExiting(false);
        }, 400);
      }
      setCountdown(null);
      setIsPaused(false);
    }
  }, [showResult, currentQuestionIndex, questions.length]);

  // Handle countdown
  useEffect(() => {
    if (countdown === null || isPaused || currentQuestionIndex >= questions.length) return;
    if (countdown === 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => (c !== null ? c - 1 : null)), 1000);
    return () => clearTimeout(timer);
  }, [countdown, isPaused, currentQuestionIndex, questions.length]);

  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  // Calculer le score en pourcentage
  const totalPossiblePoints = questions.reduce((total, q) => total + q.points, 0);
  const scorePercentage = totalPossiblePoints > 0 ? Math.round((score / totalPossiblePoints) * 100) : 0;

  return {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    showResult,
    isCorrect,
    score: scorePercentage, // Retourner le pourcentage au lieu du score brut
    rawScore: score, // Score brut pour la sauvegarde
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
  };
} 