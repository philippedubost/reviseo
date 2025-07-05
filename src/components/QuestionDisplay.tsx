'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnswerOptions from './AnswerOptions';
import { renderMathText } from '../utils/mathRenderer';

interface QuestionDisplayProps {
  question: string;
  latex?: string;
  type: 'multiple-choice' | 'calculation' | 'input';
  selectedAnswer: string;
  showResult: boolean;
  onAnswerChange: (answer: string) => void;
  onAnswerSelect: (answer: string) => void;
  onSubmit?: () => void;
  // Multiple choice props
  options?: string[];
  correctAnswer?: string;
  // Difficulty prop
  difficulty?: number;
  // Action button props for calculation and input types
  showOverlay?: boolean;
  isCorrect?: boolean;
  countdown?: number | null;
  isLastQuestion?: boolean;
  isPaused?: boolean;
  isLoading?: boolean;
  onVerify?: () => void;
  onNext?: () => void;
  onSkip?: () => void;
}

// Composant pour afficher le label de difficulté
function DifficultyLabel({ difficulty }: { difficulty: number }) {
  const getDifficultyInfo = (diff: number) => {
    switch (diff) {
      case 1:
        return { label: 'Facile', color: '#10b981', bgColor: '#d1fae5' };
      case 2:
        return { label: 'Moyen', color: '#f59e0b', bgColor: '#fef3c7' };
      case 3:
        return { label: 'Difficile', color: '#ef4444', bgColor: '#fee2e2' };
      default:
        return { label: 'Facile', color: '#10b981', bgColor: '#d1fae5' };
    }
  };

  const { label, color, bgColor } = getDifficultyInfo(difficulty);

  return (
    <motion.div
      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-3"
      style={{ 
        backgroundColor: bgColor,
        color: color
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {label}
    </motion.div>
  );
}

// Fonction pour détecter si une réponse est numérique
function isNumericAnswer(answer: string): boolean {
  // Nettoyer la réponse des espaces
  const cleanAnswer = answer.trim();
  
  // Vérifier si c'est un nombre entier ou décimal
  if (/^\d+$/.test(cleanAnswer)) return true; // Nombre entier
  if (/^\d+[.,]\d+$/.test(cleanAnswer)) return true; // Nombre décimal
  
  // Vérifier si c'est un pourcentage
  if (/^\d+%$/.test(cleanAnswer)) return true;
  
  // Vérifier si c'est une année (4 chiffres)
  if (/^\d{4}$/.test(cleanAnswer)) return true;
  
  return false;
}

// Fonction pour détecter si une réponse nécessite un clavier avec slash (fractions)
function needsSlashKeyboard(answer: string): boolean {
  // Nettoyer la réponse des espaces
  const cleanAnswer = answer.trim();
  
  // Vérifier si c'est une fraction simple (ex: 1/2, 3/4)
  if (/^\d+\/\d+$/.test(cleanAnswer)) return true;
  
  return false;
}

export default function QuestionDisplay({
  question,
  latex,
  type,
  selectedAnswer,
  showResult,
  onAnswerChange,
  onAnswerSelect,
  onSubmit,
  options = [],
  correctAnswer = '',
  difficulty = 1,
  // Action button props
  showOverlay = false,
  isCorrect = false,
  countdown = null,
  isLastQuestion = false,
  isPaused = false,
  isLoading = false,
  onVerify,
  onNext,
  onSkip
}: QuestionDisplayProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus automatique sur l'input pour les questions de type 'input'
  useEffect(() => {
    if (type === 'input' && !showResult && inputRef.current) {
      // Petit délai pour s'assurer que le DOM est rendu
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [type, showResult]);

  // Handle Enter key for input/calculation questions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        
        if (showOverlay && onNext) {
          // If overlay is showing, trigger Suivant
          onNext();
        } else if (!showResult) {
          // If not showing result, trigger Vérifier for input/calculation
          if ((type === 'calculation' || type === 'input') && onVerify) {
            if (selectedAnswer.trim()) {
              onVerify();
            }
          }
        }
      }
    };

    if (type === 'calculation' || type === 'input') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [showOverlay, showResult, type, selectedAnswer, onVerify, onNext]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResult && e.key === 'Enter' && selectedAnswer.trim()) {
      if ((type === 'calculation' || type === 'input') && onSubmit) {
        onSubmit();
      } else {
        onAnswerSelect(selectedAnswer.trim());
      }
    }
  };

  // Déterminer le type de clavier à afficher
  const getKeyboardType = () => {
    if (type !== 'calculation' && type !== 'input') return 'text';
    if (!correctAnswer) return 'text';
    
    if (needsSlashKeyboard(correctAnswer)) {
      return 'text'; // Clavier alphabétique pour avoir accès au slash
    }
    
    if (isNumericAnswer(correctAnswer)) {
      return 'decimal'; // Clavier numérique pour les nombres
    }
    
    return 'text'; // Clavier alphabétique par défaut
  };

  const keyboardType = getKeyboardType();
  const shouldShowNumericPattern = keyboardType === 'decimal';

  return (
    <motion.div 
      className="flex flex-col items-center mb-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <div className="text-center max-w-2xl w-full">
        {(type === 'calculation' || type === 'input') ? (
          <>
            <motion.div 
              className="text-lg font-bold mb-3 flex items-center justify-center gap-3"
              style={{ color: 'var(--mascot-color)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="font-normal">{renderMathText(question)}</div>
              <DifficultyLabel difficulty={difficulty} />
            </motion.div>
            {latex && (
              <motion.div 
                className="flex justify-center items-center gap-2 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-lg font-mono bg-gray-100 p-2 rounded"
                >
                  {latex}
                </motion.div>
                <motion.span 
                  className="text-2xl font-bold"
                  style={{ color: 'var(--mascot-color)' }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  =
                </motion.span>
              </motion.div>
            )}
            <motion.div 
              className="w-full flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.input
                ref={inputRef}
                type="text"
                inputMode={getKeyboardType() as any}
                pattern={getKeyboardType() === 'decimal' ? "[0-9,.]*" : undefined}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                className="input text-center text-lg font-bold w-full max-w-md mb-4"
                placeholder="Votre réponse"
                value={selectedAnswer}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => !showResult && onAnswerChange(e.target.value)}
                onKeyDown={handleInputKeyDown}
                disabled={showResult}
                whileFocus={{ 
                  scale: 1.02,
                  boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)"
                }}
                transition={{ duration: 0.2 }}
              />

              {/* Action buttons directly below input for calculation and input types */}
              {!showResult && (
                <motion.div 
                  className="flex flex-col gap-2 w-full max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <div className="flex flex-row gap-2 w-full">
                    {/* Skip button */}
                    {onSkip && (
                      <motion.button
                        className="btn bg-[#6c757d] text-white text-sm hover:bg-[#5a6268] transition-colors border border-[#495057] flex-1 relative overflow-hidden"
                        onClick={onSkip}
                        style={{ minWidth: 0 }}
                        whileHover={{ 
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ 
                          scale: 0.98,
                          transition: { duration: 0.1 }
                        }}
                        disabled={isLoading}
                      >
                        {/* Ripple effect */}
                        <motion.div
                          className="absolute inset-0 bg-white opacity-0"
                          whileHover={{ opacity: 0.1 }}
                          transition={{ duration: 0.2 }}
                        />
                        
                        {/* Animated emoji */}
                        <motion.span
                          animate={{ 
                            rotate: [0, -10, 10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        >
                          ⏭️
                        </motion.span>
                        <span className="ml-1">Passer</span>
                      </motion.button>
                    )}
                    
                    {/* Valider button - always visible but disabled when no answer */}
                    {onVerify && (
                      <motion.button
                        className={`btn text-lg font-bold transition-colors flex-1 relative overflow-hidden ${
                          selectedAnswer.trim() 
                            ? 'bg-[#2ecc71] text-white hover:bg-[#27ae60]' 
                            : 'bg-[#6c757d] text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={selectedAnswer.trim() ? onVerify : undefined}
                        disabled={isLoading || !selectedAnswer.trim()}
                        whileHover={{ 
                          scale: isLoading || !selectedAnswer.trim() ? 1 : 1.02,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ 
                          scale: isLoading || !selectedAnswer.trim() ? 1 : 0.98,
                          transition: { duration: 0.1 }
                        }}
                      >
                        {/* Ripple effect */}
                        <motion.div
                          className="absolute inset-0 bg-white opacity-0"
                          whileHover={{ opacity: isLoading || !selectedAnswer.trim() ? 0 : 0.1 }}
                          transition={{ duration: 0.2 }}
                        />
                        
                        {/* Loading spinner ou texte */}
                        <div className="flex items-center justify-center gap-2 relative z-10">
                          {isLoading ? (
                            <>
                              <motion.div
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                              />
                              <span>Vérification...</span>
                            </>
                          ) : (
                            <>
                              <motion.span
                                animate={selectedAnswer.trim() ? { 
                                  scale: [1, 1.2, 1]
                                } : {}}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  repeatType: "reverse"
                                }}
                              >
                                ✓
                              </motion.span>
                              <span>Valider</span>
                            </>
                          )}
                        </div>
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </>
        ) : (
          <>
            <motion.div 
              className="text-lg font-bold mb-3 flex items-center justify-center gap-3"
              style={{ color: 'var(--mascot-color)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="font-normal">{renderMathText(question)}</div>
              <DifficultyLabel difficulty={difficulty} />
            </motion.div>
            {latex && (
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-lg font-mono bg-gray-100 p-2 rounded"
                >
                  {latex}
                </motion.div>
              </motion.div>
            )}
            {type === 'multiple-choice' && options.length > 0 && (
              <AnswerOptions
                options={options}
                correctAnswer={correctAnswer}
                selectedAnswer={selectedAnswer}
                showResult={showResult}
                onAnswerSelect={onAnswerSelect}
              />
            )}
          </>
        )}
      </div>
    </motion.div>
  );
} 