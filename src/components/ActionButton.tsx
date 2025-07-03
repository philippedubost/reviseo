import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface ActionButtonProps {
  showResult: boolean;
  showOverlay: boolean;
  questionType: 'multiple-choice' | 'calculation' | 'input';
  selectedAnswer: string;
  isCorrect: boolean;
  countdown: number | null;
  isLastQuestion: boolean;
  isPaused: boolean;
  isLoading?: boolean;
  onVerify: () => void;
  onNext: () => void;
  onSkip?: () => void;
}

export default function ActionButton({
  showResult,
  showOverlay,
  questionType,
  selectedAnswer,
  isCorrect,
  countdown,
  isLastQuestion,
  isPaused,
  isLoading = false,
  onVerify,
  onNext,
  onSkip
}: ActionButtonProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        
        if (showOverlay) {
          // If overlay is showing, trigger Suivant
          onNext();
        } else if (!showResult) {
          // If not showing result, trigger Vérifier for input/calculation or handle multiple choice
          if (questionType === 'calculation' || questionType === 'input') {
            if (selectedAnswer.trim()) {
              onVerify();
            }
          }
          // For multiple choice, the answer is already selected when clicked
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showOverlay, showResult, questionType, selectedAnswer, onVerify, onNext]);

  return (
    <motion.div 
      className="flex flex-col gap-2 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      {!showResult ? (
        <div className="flex flex-row gap-2 w-full">
          {/* Skip button - visible pour les questions calculation et input */}
          {(questionType === 'calculation' || questionType === 'input') && onSkip && (
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
          
          {/* Skip button for multiple choice when no answer selected */}
          {questionType === 'multiple-choice' && !selectedAnswer && onSkip && (
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
          
          {/* Verify button - visible pour les questions calculation et input quand une réponse est saisie */}
          {(questionType === 'calculation' || questionType === 'input') && selectedAnswer && (
            <motion.button
              className="btn bg-[#2ecc71] text-white text-lg font-bold hover:bg-[#27ae60] transition-colors flex-1 relative overflow-hidden"
              onClick={onVerify}
              disabled={isLoading}
              whileHover={{ 
                scale: isLoading ? 1 : 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: isLoading ? 1 : 0.98,
                transition: { duration: 0.1 }
              }}
            >
              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 bg-white opacity-0"
                whileHover={{ opacity: isLoading ? 0 : 0.1 }}
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
                      animate={{ 
                        scale: [1, 1.2, 1]
                      }}
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
      ) : null}
    </motion.div>
  );
} 