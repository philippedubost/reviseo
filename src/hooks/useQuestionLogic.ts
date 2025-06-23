import { useState, useEffect, useCallback } from 'react';
import type { Question } from '../data/types';
import { compareAnswers } from '../utils/answerValidation';

interface UseQuestionLogicProps {
  questions: Question[];
  onComplete?: (score: number, totalQuestions: number, correctAnswers: number) => void;
  onAnswer?: (isCorrect: boolean) => void; // Callback for XP and streak updates
}

export function useQuestionLogic({ questions, onComplete, onAnswer }: UseQuestionLogicProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [streak, setStreak] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState('🎉');
  const [isPaused, setIsPaused] = useState(false);
  const [skippedQuestions, setSkippedQuestions] = useState<number[]>([]);

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
      setIsSkipped(false);
      setShowResult(true);
      
      if (correct) {
        setCorrectAnswers(prev => prev + 1);
        setStreak(prev => prev + 1);
      } else {
        setStreak(0);
      }
      
      // Call the onAnswer callback for XP and streak updates (only for actual answers, not skips)
      if (onAnswer) {
        onAnswer(correct);
      }
    }
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    const correct = compareAnswers(selectedAnswer, currentQuestion.correctAnswer);
    setIsCorrect(correct);
    setIsSkipped(false);
    setShowResult(true);
    
    if (correct) {
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
    
    // Call the onAnswer callback for XP and streak updates (only for actual answers, not skips)
    if (onAnswer) {
      onAnswer(correct);
    }
  };

  const handleSkip = () => {
    // Mark question as skipped (no XP gain/loss, no streak change)
    setSkippedQuestions(prev => [...prev, currentQuestionIndex]);
    setShowResult(true);
    setIsSkipped(true);
    setIsCorrect(false); // Keep false for UI purposes but we know it's a skip
    // Note: We don't call onAnswer here, so no XP/streak changes occur
  };

  const handleNext = useCallback(() => {
    // Reset pause state
    setIsPaused(false);
    setCountdown(null);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      // Session completed - stop countdown and overlay
      setShowOverlay(false);
      setCountdown(null);
      setIsPaused(false);
      setShowResult(false);
      
      // Calculate final session score (percentage of correct answers)
      const finalScore = questions.length > 0 ? Math.round((correctAnswers / questions.length) * 100) : 0;
      
      // Debug logging
      console.log('Lesson completed in hook:', { 
        currentQuestionIndex, 
        questionsLength: questions.length, 
        correctAnswers,
        totalQuestions: questions.length,
        finalScore,
        onComplete: !!onComplete 
      });
      
      // Session completed
      if (onComplete) {
        onComplete(finalScore, questions.length, correctAnswers);
      }
    }
  }, [currentQuestionIndex, questions.length, correctAnswers, onComplete]);

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
  }, [countdown, isPaused, currentQuestionIndex, questions.length, handleNext]);

  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  // Calculate session score as percentage
  const sessionScorePercentage = questions.length > 0 ? Math.round((correctAnswers / questions.length) * 100) : 0;

  return {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    showResult,
    isCorrect,
    isSkipped,
    sessionScore: sessionScorePercentage,
    correctAnswers,
    totalQuestions: questions.length,
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
  };
} 